export function validShareCardToken(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{48}$/.test(value);
}

export function readShareCard(value: unknown, endpoint: string): { title: string; imageURL: string } | null {
  if (!value || typeof value !== "object") return null;
  const card = value as Record<string, unknown>;
  if (typeof card.title !== "string" || !card.title.trim() || card.title.length > 500 ||
      typeof card.image_path !== "string" ||
      !/^[A-Za-z0-9_-]+\/[a-f0-9-]{36}\/preview\.png$/.test(card.image_path)) return null;
  try {
    const root = new URL(endpoint);
    if (root.protocol !== "https:") return null;
    return { title: card.title,
      imageURL: `${root.origin}/storage/v1/object/public/share-card-previews/${card.image_path}` };
  } catch { return null; }
}
