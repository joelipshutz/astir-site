export const SITE_URL = "https://getrec.me";
export const APP_STORE_URL = "https://apps.apple.com/app/id6776850787";
export const TESTFLIGHT_URL = "https://testflight.apple.com/join/knEhRa6t";
export const SUPPORT_EMAIL = "getrec.me@gmail.com";

export const releaseChannel =
  process.env.NEXT_PUBLIC_RECME_RELEASE_CHANNEL === "app-store"
    ? "app-store"
    : "testflight";

export const primaryDownloadURL =
  releaseChannel === "app-store" ? APP_STORE_URL : TESTFLIGHT_URL;
export const primaryDownloadLabel =
  releaseChannel === "app-store"
    ? "Download on the App Store"
    : "Join the TestFlight";

export type SharedRouteKind = "profile" | "place" | "list" | "invite" | "activity";

export function appSchemeURL(kind: SharedRouteKind, identifier: string): string {
  const root = kind === "invite" ? "invites" : kind === "activity" ? "activities" : `${kind}s`;
  return `recme://${root}/${encodeURIComponent(identifier)}`;
}

export function websiteURL(kind: SharedRouteKind, identifier: string): string {
  const root = kind === "invite" ? "invites" : kind === "activity" ? "activities" : `${kind}s`;
  return `${SITE_URL}/${root}/${encodeURIComponent(identifier)}`;
}

export function validActivityID(identifier: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
}
