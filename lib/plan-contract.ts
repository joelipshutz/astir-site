export type PlacePlan = {
  title: string;
  place_name: string;
  location: string;
  sender_name: string;
  sender_avatar_url: string | null;
  message: string;
  connection: string;
  date_label: string;
  suggested_at: string | null;
  image_path: string;
};

export function validPlanToken(token: string): boolean {
  return /^[a-f0-9]{48}$/.test(token);
}

export function planImageURL(endpoint: string, path: string): string | null {
  if (!/^[A-Za-z0-9_-]+\/[a-f0-9-]{36}\/preview\.png$/.test(path)) return null;
  const root = new URL(endpoint);
  if (root.protocol !== "https:") return null;
  return `${root.origin}/storage/v1/object/public/place-plan-previews/${path.split("/").map(encodeURIComponent).join("/")}`;
}

export function readPlacePlan(value: unknown): PlacePlan | null {
  if (!value || typeof value !== "object") return null;
  const plan = value as Record<string, unknown>;
  for (const key of ["title", "place_name", "location", "sender_name", "message", "connection", "date_label", "image_path"]) {
    if (typeof plan[key] !== "string") return null;
  }
  if (typeof plan.title !== "string" || !plan.title || typeof plan.message !== "string" || plan.message.length > 1000) return null;
  if (plan.sender_avatar_url !== null && typeof plan.sender_avatar_url !== "string") return null;
  if (plan.suggested_at !== null && typeof plan.suggested_at !== "string") return null;
  return plan as PlacePlan;
}
