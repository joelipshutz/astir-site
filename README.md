# Astir website

The public website and Universal Link fallback for Astir (formerly rec.me).

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` to enable live public previews. The site
renders privacy-safe fallback pages when Supabase is unavailable.

## Production

The Vercel project is `astir-site` in Hotchkiss Technologies. The canonical
website is `https://astirmovement.com`; both Astir domains attach to this project.
Keep the old `getrec.me` domains attached for previously shared app links.
Enable the marketing redirects only after the new domains serve the validated site.

The primary download CTA defaults to TestFlight. For the public App Store
launch, set `NEXT_PUBLIC_RECME_RELEASE_CHANNEL=app-store` in the Vercel
Production environment and redeploy. The only accepted App Store value is
`app-store`; missing or unexpected values fail safely back to TestFlight.

See [`docs/astir-domain-migration.md`](docs/astir-domain-migration.md) for the
current domain cutover, compatibility checks, and rollback procedure.
[`docs/launch-dns-and-site.md`](docs/launch-dns-and-site.md) preserves the historical
August launch baseline; its deferred Clerk and mail tasks are not part of this migration.
