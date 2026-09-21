# getrec.me DNS and site launch handoff (historical)

For the current Astir migration, use [astir-domain-migration.md](astir-domain-migration.md).
The Vercel project is now named `astir-site`. The records below are a historical baseline.

Verified on August 14, 2026. DNS is managed in Squarespace
(`nsc1`–`nsc4.squarespacedns.com`) and the website is hosted by the Vercel
project `recme-site`.

## Do not change these working website records

| Purpose | Type | Host | Value |
| --- | --- | --- | --- |
| Apex website | A | `@` | `216.198.79.1` |
| `www` website | CNAME | `www` | `837c0166c03511d7.vercel-dns-017.com` |

Both `https://getrec.me` and `https://www.getrec.me` currently resolve to the
production Vercel deployment. Keep the apex on Vercel when adding Clerk or mail
records.

## Blocker 1: create the Clerk production instance, then add its exact records

There is no Clerk production instance yet, so Clerk currently returns no DNS
values. Do not invent targets from examples or add placeholder CNAMEs.

1. In an interactive terminal linked to the rec.me Clerk development app, run:

   ```sh
   npx clerk deploy
   ```

2. Choose `getrec.me` as the production domain and clone the development
   settings.
3. Clerk will print the exact required CNAME and email-authentication records.
   In Squarespace, open Domains → `getrec.me` → DNS → Add record and enter those
   values exactly. Common labels such as `clerk` or `accounts` are not a
   substitute for the values Clerk generates.
4. Do not edit the working `@` A record or `www` CNAME.
5. Verify DNS, SSL, and Clerk email records with:

   ```sh
   npx clerk deploy status --wait
   ```

6. In Clerk production, restrict the allowed subdomains to the surfaces rec.me
   actually uses. Register the native iOS app with:

   - App ID Prefix / Team ID: `Y7TVK75RZ8`
   - Bundle ID: `com.grayline.wander`

7. Configure production Apple and Google OAuth credentials, production
   webhooks, and the production `pk_live_` / `sk_live_` keys before building the
   release candidate. Update the iOS Associated Domains entitlement to the
   production Clerk frontend API host that Clerk generates.

## Launch contact: use getrec.me@gmail.com

Joe selected `getrec.me@gmail.com` as the public Support and App Review contact
for launch, with `joe@grayline-studio.com` as fallback. Apple accepts a Gmail
address, so Google Workspace and `getrec.me` mail DNS are not launch blockers.
Do not change MX, SPF, DKIM, DMARC, Google Workspace, or existing accounts for
the version 1.0 launch.

Before App Store submission:

- Send a message from an unrelated mailbox to `getrec.me@gmail.com` and confirm
  it arrives.
- Reply from `getrec.me@gmail.com` and confirm the reply arrives without a spam
  or authentication warning.
- Confirm the inbox is monitored during the launch coverage window.
- Confirm App Store Connect uses `getrec.me@gmail.com` for the review contact.
- Confirm the App Store support URL is `https://getrec.me/support` and the
  privacy URL is `https://getrec.me/privacy`.

## Deferred: branded support@getrec.me mailbox

Public DNS currently has no MX record, so `support@getrec.me` cannot receive
mail. The domain also publishes `v=spf1 -all`, which explicitly authorizes no
outbound sender. DMARC is already strict:
`v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s`.

This setup is optional after launch. When Joe chooses to enable the branded
address, use the correct existing Grayline Google Workspace rather than
creating another Workspace or buying an unnecessary user seat.

1. In Google Admin, add `getrec.me` as a **secondary domain** and complete the
   ownership-verification TXT record Google generates. Do not add it to an
   unrelated Workspace, and do not use a user-alias domain if the goal is a
   standalone `support@getrec.me` Group.
2. In Directory → Groups, create `support@getrec.me`. Add Joe as the primary
   recipient and at least one monitored backup owner. Configure the Group to
   accept posts from external senders while keeping membership private.
3. In Squarespace, use the **Google Workspace MX** preset, or add this record
   manually:

| Purpose | Type | Host | Priority | Value |
| --- | --- | --- | --- | --- |
| Google Workspace inbound mail | MX | `@` | `1` | `smtp.google.com` |

4. Replace the existing apex SPF TXT value `v=spf1 -all` with the Google-only
   sender policy below. Keep exactly one SPF record at the apex:

   ```text
   v=spf1 include:_spf.google.com ~all
   ```

5. In Google Admin → Gmail → Authenticate email, generate a 2048-bit DKIM key
   for `getrec.me`. Add the exact selector and TXT value Google provides
   (normally host `google._domainkey` and a value beginning `v=DKIM1;`), wait
   for DNS to resolve, then click **Start authentication**. Never copy a DKIM
   value from another domain or Workspace.
6. Activate Gmail for `getrec.me`. Configure Gmail **Send mail as** so replies
   to Group mail leave as `support@getrec.me`, not a personal address.
7. Keep the existing strict DMARC record only after SPF and DKIM both pass:

   ```text
   v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
   ```

   Google recommends having SPF and DKIM in place before enforcing DMARC. If
   authenticated replies do not pass during rollout, do not send production
   support mail until the DNS/authentication issue is fixed; do not weaken the
   policy silently.

## Site release switch

The website defaults to TestFlight until the public App Store listing is live.
After Apple makes version 1.0 available, set the Vercel Production environment
variable below and redeploy:

```text
NEXT_PUBLIC_RECME_RELEASE_CHANNEL=app-store
```

Then verify every header, hero, footer, shared-profile, shared-place, shared-list,
and invite CTA resolves to `https://apps.apple.com/app/id6776850787`. To roll
back, set the value to `testflight` (or remove it) and redeploy.

## Final public checks

- `https://getrec.me`, `https://www.getrec.me`, `/support`, `/privacy`, `/terms`,
  `/community`, `/privacy-choices`, and `/import-help` return 200 over HTTPS.
- `/.well-known/apple-app-site-association` returns JSON without a redirect and
  includes `Y7TVK75RZ8.com.grayline.wander`.
- Clerk production DNS, SSL, native app registration, OAuth, webhooks, and
  associated domains all show complete.
- `getrec.me@gmail.com` passes the inbound and reply tests above and is shown on
  the public Support and Community pages.
- The App Store CTA is switched only after the public listing resolves.
