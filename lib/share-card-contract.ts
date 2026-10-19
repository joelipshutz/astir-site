export function validShareCardToken(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{48}$/.test(value);
}

type ShareCard = {
  title: string;
  imageURL?: string;
  description?: string;
  subtitle?: string;
  publicContext?: boolean;
};

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 500) : undefined;
}

export function publicImageURL(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return undefined;
    return url.href;
  } catch { return undefined; }
}

export function readShareCard(value: unknown, endpoint: string): ShareCard | null {
  if (!value || typeof value !== "object") return null;
  const card = value as Record<string, unknown>;
  if (card.preview_mode === "generic") {
    return { title: "Shared on Astir", imageURL: "https://astirmovement.com/brand/astir-wordmark.png" };
  }
  const title = text(card.title);
  if (!title || typeof card.title !== "string" || card.title.length > 500) return null;
  if (card.preview_mode === "public") return {
    title, subtitle: text(card.subtitle), description: text(card.description),
    imageURL: publicImageURL(card.image_url), publicContext: true
  };
  // Only the new, explicitly published namespace is public. Never resurrect
  // legacy share-card-previews images or accept a caller-supplied image URL.
  if (card.preview_mode !== "snapshot" || typeof card.image_path !== "string" ||
      !/^[A-Za-z0-9_-]+\/[a-f0-9-]{36}\/preview\.png$/.test(card.image_path)) return null;
  try {
    const root = new URL(endpoint);
    if (root.protocol !== "https:" || root.username || root.password || root.port) return null;
    return { title, description: text(card.description),
      imageURL: `${root.origin}/storage/v1/object/public/shared-link-snapshots/${card.image_path}` };
  } catch { return null; }
}
