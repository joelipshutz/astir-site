// Test-process transport only. This module is never imported by the website.
const originalFetch = globalThis.fetch;
const id = '41000000-0000-0000-0000-000000000001';
const identifiers = { profile: 'user_fixture', place: id, list: id, activity: id, invite: 'b'.repeat(48) };
globalThis.fetch = async (input, options) => {
  if (String(input) === 'https://share-fixture.supabase.co/rest/v1/rpc/share_card_context') {
    const body = JSON.parse(options.body);
    const generic = body.input_token === 'c'.repeat(48);
    const publicContext = body.input_token === 'd'.repeat(48);
    const valid = (body.input_token === 'a'.repeat(48) || generic || publicContext) && identifiers[body.input_kind] === body.input_identifier;
    return new Response(JSON.stringify(valid ? generic ? { preview_mode: 'generic' } : publicContext ? { preview_mode: 'public', title: body.input_kind === 'profile' ? 'Ryan Example' : 'Coffee House', subtitle: 'Coffee · Los Angeles', description: 'A neighborhood coffee spot', image_url: body.input_kind === 'profile' ? 'https://images.example/avatar.png' : null } : {
      preview_mode: 'snapshot', description: 'Selected contextual description',
      title: 'Approved card preview', image_path: 'user_fixture/11111111-2222-4333-8444-555555555555/preview.png'
    } : null), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  if (String(input).startsWith('https://share-fixture.supabase.co/'))
    return new Response('null', { headers: { 'Content-Type': 'application/json' } });
  return originalFetch(input, options);
};
