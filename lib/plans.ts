import { cache } from "react";
import { planImageURL, readPlacePlan, validPlanToken } from "./plan-contract";

export const fetchPlacePlan = cache(async (token: string) => {
  if (!validPlanToken(token)) return null;
  const endpoint = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!endpoint || !key) return null;
  try {
    const response = await fetch(`${endpoint}/rest/v1/rpc/place_plan_preview`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ input_token: token }),
      cache: "no-store"
    });
    if (!response.ok) return null;
    const plan = readPlacePlan(await response.json());
    if (!plan) return null;
    const imageURL = planImageURL(endpoint, plan.image_path);
    return imageURL ? { ...plan, imageURL } : null;
  } catch {
    // Never log invitation tokens, message contents, or private response bodies.
    return null;
  }
});
