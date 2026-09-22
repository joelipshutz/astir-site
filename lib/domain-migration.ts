// Keep native universal links, card previews, invitations and the TikTok callback
// on their original host. A registrar-level wildcard redirect would break them.
export const marketingPaths = [
  "/", "/how-it-works", "/extensions", "/support", "/privacy", "/terms",
  "/community", "/privacy-choices", "/import-help", "/sitemap.xml", "/robots.txt"
];

export function marketingRedirects(enabled: boolean) {
  if (!enabled) return [];
  return marketingPaths.map(source => ({
    source,
    has: [{ type: "host" as const, value: "^(?:www\\.)?getrec\\.me$" }],
    destination: `https://astirmovement.com${source === "/" ? "" : source}`,
    permanent: true
  }));
}

// Only new app builds associate with the Astir hosts and understand card URLs.
// Keep the legacy hosts' association unchanged until REC-577's rollout gate.
export function astirAssociationRewrites() {
  return ["/.well-known/apple-app-site-association", "/apple-app-site-association"].map(source => ({
    source,
    has: [{ type: "host" as const, value: "^(?:www\\.)?astirmovement\\.com$" }],
    destination: "/.well-known/astir-apple-app-site-association.json"
  }));
}
