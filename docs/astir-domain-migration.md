# Astir website migration (REC-586)

The existing Next.js website remains on the Hotchkiss Technologies Vercel
project `astir-site`, connected to `joelipshutz/astir-site`. The new public
canonical origin is `https://astirmovement.com`.

## Brand

The site uses approved Astir direction 55 (the unmodified app icon) and the
direction 56 static wordmark. Their source of truth is the Wander repository's
`docs/brand/approved/astir-55/` and `docs/brand/astir-splash-56/`.
Paper `#F2E9DB`, raised paper `#FBF6ED`, Ink `#141714`, and Signal `#F05A3C`
form the palette. The darker Signal companion `#B23620` supports small text
and white-on-color buttons. Editorial serif headings pair with Avenir Next
body text and condensed labels, with local system fallbacks.

The website now uses current Astir component previews and illustrative
walkthroughs (REC-595). Example content and approved native UI mockups are
labeled as previews, not represented as screenshots of the full application.
See `DESIGN.md` for the website's psychedelic print and editorial UI treatment.

## Cutover sequence

1. Validate the branch build and preview, including all shared-card routes.
2. Add `astirmovement.com` and `www.astirmovement.com` to the existing Vercel
   project. Use the DNS records Vercel provides for this project; preserve mail,
   verification, and other unrelated Squarespace records.
3. Confirm DNS and TLS for both domains, then deploy the validated revision.
   Check homepage, navigation, legal/support pages, Apple association files,
   and unavailable shared-link states on the new domain.
4. Set `ASTIR_DOMAIN_REDIRECT_ENABLED=true` for Production and redeploy only
   after the destination serves the new site. Verify old marketing URLs return
   308 redirects to the same new path, with their query string intact.
5. Keep `getrec.me` and `www.getrec.me` attached to this project. Never replace
   them with registrar forwarding or a blanket redirect to the new domain.
   The existing `www.getrec.me` → `getrec.me` redirect preserves paths; the
   apex applies the marketing-only redirects above. Shared links, cards, plans,
   invitations, TikTok callbacks, and AASA files remain available on the old
   host for already-installed apps and previously shared URLs.

The existing `recme://` native scheme, backend RPCs, environment variable names,
support mailbox, app store ID, bundle/team IDs and authentication settings stay
stable. REC-599 adds both Astir domains to iOS Associated Domains and changes
newly generated app/share links to their matching Astir paths. It requires an
app update; the web fallback continues to offer the existing native scheme.

## Shared links on Astir (REC-599)

Both Apple association endpoints are internally rewritten on the exact Astir
hosts to `public/.well-known/astir-apple-app-site-association.json`. This adds
the five supported `/cards/<entity>/*` paths for new clients. The same endpoints
on legacy hosts keep their existing rules and REC-577's rollout gate. Older
apps have no Astir associated-domain entitlement, so the new rules cannot
capture their unsupported card URLs. This host split must remain until the
legacy rollout is explicitly approved.

Generated web metadata and links already use Astir's origin. Existing card
tokens, opaque IDs, plan URLs, query strings, and native actions are preserved.
Previously sent URLs and uploaded bitmap artwork cannot be rewritten; legacy
links remain available. Verify new-domain links from Messages on the updated
app and the web fallback without it after distribution.

TikTok verifies the canonical origin using its public signature file at
`/tiktokMHKXAKV8YdMLPoUXQVoKU9mqDiNtglua.txt`. Keep this file available
for ownership verification of the existing developer app.

## Validation and rollback

Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, then
`node --test lib/*.test.mjs`. The HTTP tests use deterministic synthetic fixtures.
Run a build with `ASTIR_DOMAIN_REDIRECT_ENABLED=true` and verify host-based
redirects as well as the exempt shared-link routes before enabling the setting.

To pause the cutover, disable `ASTIR_DOMAIN_REDIRECT_ENABLED` and redeploy.
To roll back the UI, promote the preceding production deployment. Keep both
domains attached so existing links remain reachable. Permanent redirects may
be cached by clients, so the destination must stay available during rollback.
