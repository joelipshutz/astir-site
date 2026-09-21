import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

// Exercise the built Next application with a deterministic RPC transport.
test('published cards render metadata and exact app actions for every route', { timeout: 30000 }, async () => {
  const socket = createServer();
  await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const fixture = fileURLToPath(new URL('./test-fixtures/share-card-fetch.cjs', import.meta.url));
  const child = spawn(process.execPath, ['--require', fixture, 'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: { ...process.env, SUPABASE_URL: 'https://share-fixture.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'fixture-public-key' },
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
    const id = '41000000-0000-0000-0000-000000000001';
    const paths = { profiles: 'user_fixture', places: id, lists: id, activities: id, invites: 'b'.repeat(48) };
    const aasa = JSON.parse(await readFile(new URL('../public/.well-known/apple-app-site-association', import.meta.url), 'utf8'));
    assert.ok(!aasa.applinks.details[0].components.some(rule => rule['/'] === '/*' || rule['/'] === '/cards/*'));
    for (const path of ['/.well-known/apple-app-site-association', '/apple-app-site-association']) {
      const response = await fetch(base + path, { redirect: 'manual' });
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /application\/json/);
      assert.deepEqual(await response.json(), aasa);
    }
    for (const [root, identifier] of Object.entries(paths)) {
      assert.ok(aasa.applinks.details[0].components.some(rule => rule['/'] === `/cards/${root}/*` && !rule.exclude));
      const response = await fetch(`${base}/cards/${root}/${identifier}?card=${'a'.repeat(48)}`, { headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, /property="og:image" content="https:\/\/share-fixture.supabase.co\/storage\/v1\/object\/public\/share-card-previews\//);
      assert.ok(html.includes(`href="recme://${root}/${identifier}"`));
      assert.ok(html.includes(`https://getrec.me/cards/${root}/${identifier}?card=`));
      assert.ok(html.includes('noindex'));
      assert.ok(!html.includes('content="https://getrec.me/og.png"'));
      const browserResponse = await fetch(`${base}/cards/${root}/${identifier}?card=${'a'.repeat(48)}`);
      assert.equal(browserResponse.status, 200);
      const browserHTML = await browserResponse.text();
      assert.ok(browserHTML.includes(`href="recme://${root}/${identifier}"`));
      assert.match(browserHTML, /https:\/\/(?:testflight\.apple\.com|apps\.apple\.com)\//);
    }
    for (const path of ['/cards/profiles/user_fixture', '/cards/unknown/user_fixture?card=' + 'a'.repeat(48), '/cards/profiles/wrong?card=' + 'a'.repeat(48), '/cards/profiles/user_fixture?card=bad'])
      assert.equal((await fetch(base + path, { headers: { 'User-Agent': 'facebookexternalhit/1.1' } })).status, 404);
  } finally {
    child.kill('SIGTERM');
    await new Promise(resolve => child.once('exit', resolve));
  }
});
