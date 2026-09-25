import { readShareCard, validShareCardToken } from "./share-card-contract";
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
      const response = await fetch(`${endpoint}/rest/v1/rpc/share_card_preview`, {
        method: "POST",
        headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ input_token: cardToken, input_kind: kind, input_identifier: identifier }),
        cache: "no-store"
      });
      if (!response.ok) return null;
      const card = readShareCard(await response.json(), endpoint);
      return card ? { kind, title: card.title, card_image_url: card.imageURL, card_token: cardToken, is_available: true } : null;
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
      : payload;
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
  const description = preview?.description || fallbackDescription;
  const canonicalURL = websiteURL(kind, identifier);
  const url = preview?.card_token
    ? canonicalURL.replace(`${SITE_URL}/`, `${SITE_URL}/cards/`) + `?card=${preview.card_token}`
    : canonicalURL;
  const images = preview?.card_image_url
    // Published images can predate the image-only Messages preview. Let crawlers
    // inspect their actual size instead of imposing the old baked-in footer ratio.
    ? [{ url: preview.card_image_url, alt: title }]
    : ["/brand/astir-wordmark.png"];
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
