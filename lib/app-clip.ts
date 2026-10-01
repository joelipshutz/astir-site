const hosts = new Set(["astirmovement.com", "www.astirmovement.com", "getrec.me"]);

// Discovery is enabled only after the associated build/experience is available.
// Keep the exact destination and published-card token in the invocation URL.
export function appClipBanner(url: string, available: boolean, enabled?: string): string | undefined {
  if (enabled !== "true" || !available) return undefined;
  try {
    const invocation = new URL(url);
    if (invocation.protocol !== "https:" || !hosts.has(invocation.hostname) ||
        invocation.username || invocation.password || invocation.port ||
        !/^\/(?:cards\/)?(?:profiles|places|lists|activities|invites)\/[^/]+$/.test(invocation.pathname)) {
      return undefined;
    }
    return `app-id=6776850787, app-clip-bundle-id=com.grayline.wander.Clip, app-argument=${invocation.href}`;
  } catch { return undefined; }
}
