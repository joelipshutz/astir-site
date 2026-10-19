import { publicImageURL, readShareCard, validShareCardToken } from "./share-card-contract";
import { cache } from "react";
import { appClipBanner } from "./app-clip";
import type { Metadata } from "next";
import { publicProfileShareTitle, websiteURL, SITE_URL, type SharedRouteKind } from "@/lib/site";

export type PublicPreview = {
  kind: "profile" | "place" | "list" | "invite" | "activity";
  title: string;
  subtitle?: string;
  description?: string;
  eyebrow?: string;
  image_url?: string;
  card_image_url?: string;
  card_token?: string;
  item_count?: number;
  is_available: boolean;
};

const allowedKinds = new Set(["profile", "place", "list", "invite", "activity"]);

// Match the native category labels; only the category segment is formatted.
const placeCategoryLabels: Record<string, string> = {
  restaurants_food: "Restaurants & Food", coffee_tea_sweets: "Coffee, Tea, & Sweets",
  bars_nightlife: "Bars & Nightlife", outdoors_nature: "Outdoors & Nature",
  things_to_do: "Things To Do", shopping: "Shopping", wellness_fitness: "Wellness & Fitness",
  stays: "Stays", services_errands: "Services & Errands", travel_transit: "Travel & Transit",
  work_education: "Work & Education", civic_faith: "Civic & Faith",
  areas_addresses: "Areas & Addresses", facilities_other: "Facilities & Other", place: "Place"
};

function placeSubtitle(value: string | undefined): string | undefined {
  if (!value) return value;
  const [category, ...locality] = value.split(" · ");
  const label = placeCategoryLabels[category] ?? category.replaceAll("_", " ");
  return [label, ...locality].join(" · ");
}

export const fetchPublicPreview = cache(async function fetchPublicPreview(
  kind: PublicPreview["kind"],
  identifier: string,
  cardToken?: string | string[]
): Promise<PublicPreview | null> {
  if (
    !allowedKinds.has(kind) ||
    identifier.length < 1 ||
    identifier.length > 256
  ) {
    return null;
  }

  const endpoint = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!endpoint || !publishableKey) {
    return null;
  }

  if (cardToken !== undefined) {
    if (!validShareCardToken(cardToken)) return null;
    try {
      const response = await fetch(`${endpoint}/rest/v1/rpc/share_card_context`, {
        method: "POST",
        headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ input_token: cardToken, input_kind: kind, input_identifier: identifier }),
        cache: "no-store"
      });
      if (!response.ok) return null;
      const card = readShareCard(await response.json(), endpoint);
      if (!card) return null;
      const subtitle = card.publicContext && kind === "place" ? placeSubtitle(card.subtitle) : card.subtitle;
      return { kind,
        title: card.publicContext && kind === "profile" ? publicProfileShareTitle(card.title)
          : card.publicContext && subtitle ? `${card.title} · ${subtitle}` : card.title,
        description: card.description ?? subtitle,
        card_image_url: card.imageURL, card_token: cardToken, is_available: true };
    } catch { return null; }
  }

  try {
    const response = await fetch(
      `${endpoint}/rest/v1/rpc/public_web_preview`,
      {
        method: "POST",
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input_kind: kind,
          input_identifier: identifier
        }),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as PublicPreview | null;
    if (!payload?.is_available) return null;
    return kind === "profile"
      ? { ...payload, title: publicProfileShareTitle(payload.title), subtitle: undefined }
      : kind === "place" ? { ...payload, subtitle: placeSubtitle(payload.subtitle) } : payload;
  } catch {
    return null;
  }
});

export function publicPreviewMetadata({
  kind,
  identifier,
  preview,
  fallbackTitle,
  fallbackDescription,
  alwaysNoIndex = false
}: {
  kind: SharedRouteKind;
  identifier: string;
  preview: PublicPreview | null;
  fallbackTitle: string;
  fallbackDescription: string;
  alwaysNoIndex?: boolean;
}): Metadata {
  const title = preview?.title || fallbackTitle;
  const description = preview?.description || preview?.subtitle || fallbackDescription;
  const canonicalURL = websiteURL(kind, identifier);
  const url = preview?.card_token
    ? canonicalURL.replace(`${SITE_URL}/`, `${SITE_URL}/cards/`) + `?card=${preview.card_token}`
    : canonicalURL;
  const previewImage = preview?.card_image_url || publicImageURL(preview?.image_url);
  const imageURL = previewImage || (preview?.is_available
    ? `${SITE_URL}/share-preview/${kind}/${encodeURIComponent(identifier)}${preview.card_token ? `?card=${preview.card_token}` : ""}`
    : `${SITE_URL}/brand/astir-wordmark.png`);
  const images = [{ url: imageURL, alt: title }];
  const clipBanner = appClipBanner(url, preview?.is_available === true, process.env.ASTIR_APP_CLIP_ENABLED);

  return {
    title: { absolute: title },
    description,
    referrer: "no-referrer",
    other: clipBanner ? { "apple-itunes-app": clipBanner } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ASTIR",
      type: "website",
      images
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images
    },
    robots:
      alwaysNoIndex || !!preview?.card_token || !preview ? { index: false, follow: false } : undefined
  };
}
