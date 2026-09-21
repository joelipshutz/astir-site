# rec.me website

The public website and Universal Link fallback for rec.me.

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` to enable live public previews. The site
renders privacy-safe fallback pages when Supabase is unavailable.

## Production

Vercel owns the production deployment. `getrec.me` and `www.getrec.me` should
point at the Vercel project after a production build passes.

The primary download CTA defaults to TestFlight. For the public App Store
launch, set `NEXT_PUBLIC_RECME_RELEASE_CHANNEL=app-store` in the Vercel
Production environment and redeploy. The only accepted App Store value is
`app-store`; missing or unexpected values fail safely back to TestFlight.

See [`docs/launch-dns-and-site.md`](docs/launch-dns-and-site.md) for the verified
DNS baseline, Clerk production handoff, support-email setup, and launch checks.

## Published-card Universal Links (REC-577)

The five `/cards/{profiles,places,lists,activities,invites}/*` paths associate
with Astir. Compatible installed apps unwrap the card URL to the exact native
entity. Browser recipients and link-preview crawlers retain the published image,
metadata, download fallback, and View action.

Release gate: distribute the iOS card-route parser before deploying these
association rules, verify tester updates, then test taps from Messages on a
physical device. Older app builds cannot parse `/cards/...`; AASA selects an
app identifier, not a version. Keep this website change unmerged until that
gate is satisfied. Apple's association cache may delay device uptake.

Keep both association files identical and preserve these routes during the
REC-586 domain migration, including existing getrec.me links. Verification:
`node --experimental-strip-types --test lib/*contract.test.mjs`, a production
build, then `node --test lib/share-page-http.test.mjs` exercise the route rules,
served JSON, and unchanged browser previews.
