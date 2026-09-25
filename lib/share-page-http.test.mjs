import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { get } from 'node:http';

// Native fetch may replace Host with the URL's loopback host. Use the HTTP
// client for host-routing checks so the request exercises the production rule.
function requestWithHost(url, host, headers = {}) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { ...headers, Host: host } }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('error', reject);
      response.on('end', () => resolve(new Response(Buffer.concat(chunks), {
        status: response.statusCode,
        headers: Object.fromEntries(Object.entries(response.headers).map(([key, value]) =>
          [key, Array.isArray(value) ? value.join(', ') : value ?? '']))
      })));
    }).on('error', reject);
  });
}

// Exercise the built Next application with a deterministic RPC transport.
for (const clipEnabled of [false, true]) {
test(`published cards render exact app actions with Clip discovery ${clipEnabled ? 'on' : 'off'}`, { timeout: 30000 }, async () => {
  const socket = createServer();
  await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const fixture = fileURLToPath(new URL('./test-fixtures/share-card-fetch.cjs', import.meta.url));
  const child = spawn(process.execPath, ['--require', fixture, 'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: { ...process.env, ASTIR_APP_CLIP_ENABLED: String(clipEnabled), SUPABASE_URL: 'https://share-fixture.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'fixture-public-key' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let output = '';
  child.stdout.on('data', data => { output += data; });
  child.stderr.on('data', data => { output += data; });
  const base = `http://127.0.0.1:${port}`;
  try {
    let ready = false;
    for (let i = 0; i < 60; i++) {
      if (child.exitCode !== null) throw new Error(output);
      try { await fetch(base); ready = true; break; } catch { await new Promise(resolve => setTimeout(resolve, 100)); }
    }
    assert.ok(ready, output);
    const cutoverEnabled = process.env.ASTIR_DOMAIN_REDIRECT_ENABLED === 'true';
    for (const host of ['getrec.me', 'www.getrec.me', 'astirmovement.com', 'www.astirmovement.com']) {
      const response = await requestWithHost(`${base}/support?from=old-link`, host);
      const shouldRedirect = cutoverEnabled && host.endsWith('getrec.me');
      assert.equal(response.status, shouldRedirect ? 308 : 200, host);
      if (shouldRedirect) assert.equal(response.headers.get('location'), 'https://astirmovement.com/support?from=old-link');
      else {
        const html = await response.text();
        assert.ok(html.includes('https://astirmovement.com/support'));
        assert.ok(html.includes('Contact Astir support'));
        assert.ok(html.includes('getrec.me@gmail.com'));
      }
      for (const path of ['/.well-known/apple-app-site-association', '/apple-app-site-association']) {
        const aasaResponse = await requestWithHost(base + path, host);
        assert.equal(aasaResponse.status, 200);
        assert.ok(aasaResponse.headers.get('content-type').includes('application/json'));
        const association = await aasaResponse.json();
        assert.ok(association.applinks.details.length > 0);
        assert.deepEqual(association.appclips.apps, ['Y7TVK75RZ8.com.grayline.wander.Clip']);
        const rules = association.applinks.details[0].components.map(rule => rule['/']);
        assert.ok(!rules.includes('/*'));
        for (const root of ['profiles', 'places', 'activities', 'lists', 'invites']) {
          assert.equal(rules.includes(`/cards/${root}/*`), host.endsWith('astirmovement.com'), host);
        }
        assert.ok(!rules.includes('/cards/plans/*'));
      }
      const callback = await requestWithHost(`${base}/share/tiktok`, host);
      assert.equal(callback.status, 200);
    }
    const id = '41000000-0000-0000-0000-000000000001';
    const paths = { profiles: 'user_fixture', places: id, lists: id, activities: id, invites: 'b'.repeat(48) };
    const aasa = JSON.parse(await readFile(new URL('../public/.well-known/apple-app-site-association', import.meta.url), 'utf8'));
    assert.ok(!aasa.applinks.details[0].components.some(rule => rule['/'] === '/*' || rule['/']?.startsWith('/cards')));
    for (const [root, identifier] of Object.entries(paths)) {
      for (const host of ['getrec.me', 'astirmovement.com', 'www.astirmovement.com']) {
        const response = await requestWithHost(`${base}/cards/${root}/${identifier}?card=${'a'.repeat(48)}`, host, { 'User-Agent': 'facebookexternalhit/1.1' });
        assert.equal(response.status, 200);
        const html = await response.text();
        assert.match(html, /property="og:image" content="https:\/\/share-fixture.supabase.co\/storage\/v1\/object\/public\/share-card-previews\//);
        assert.ok(html.includes('property="og:title" content="Approved card preview"'));
        assert.ok(!html.includes('property="og:image:height"'), 'Old and new cards must use their actual image height');
        assert.match(html, /<link[^>]*rel="apple-touch-icon"[^>]*href="\/icon.png"[^>]*sizes="1024x1024"/);
        assert.match(html, /<link[^>]*rel="icon"[^>]*href="\/icon.png"/);
        assert.ok(html.includes(`href="recme://${root}/${identifier}"`));
        assert.ok(html.includes(`https://astirmovement.com/cards/${root}/${identifier}?card=`));
        assert.ok(html.includes('noindex'));
        assert.equal(html.includes('name="apple-itunes-app"'), clipEnabled);
        if (clipEnabled) assert.ok(html.includes(`app-argument=https://astirmovement.com/cards/${root}/${identifier}?card=${'a'.repeat(48)}`));
        assert.ok(!html.includes('content="https://astirmovement.com/brand/astir-wordmark.png"'));
      }
    }
    const unavailable = await fetch(`${base}/profiles/unavailable`);
    assert.ok(!(await unavailable.text()).includes('name="apple-itunes-app"'));
    const iconResponse = await fetch(`${base}/icon.png`);
    assert.equal(iconResponse.status, 200);
    assert.match(iconResponse.headers.get('content-type'), /image\/png/);
    for (const path of ['/cards/profiles/user_fixture', '/cards/unknown/user_fixture?card=' + 'a'.repeat(48), '/cards/profiles/wrong?card=' + 'a'.repeat(48), '/cards/profiles/user_fixture?card=bad'])
      assert.equal((await fetch(base + path, { headers: { 'User-Agent': 'facebookexternalhit/1.1' } })).status, 404);
  } finally {
    child.kill('SIGTERM');
    await new Promise(resolve => child.once('exit', resolve));
  }
});
}
