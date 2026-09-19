import { cache } from "react";
import type { Metadata } from "next";
import { publicProfileShareTitle, websiteURL, type SharedRouteKind } from "@/lib/site";

export type PublicPreview = {
  kind: "profile" | "place" | "list" | "invite" | "activity";
  title: string;
  subtitle?: string;
  description?: string;
  eyebrow?: string;
  image_url?: string;
  item_count?: number;
  is_available: boolean;
};

const allowedKinds = new Set(["profile", "place", "list", "invite", "activity"]);

export const fetchPublicPreview = cache(async function fetchPublicPreview(
  kind: PublicPreview["kind"],
  identifier: string
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
  const url = websiteURL(kind, identifier);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "rec.me",
      type: "website",
      images: ["/og.png"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"]
    },
    robots:
      alwaysNoIndex || !preview ? { index: false, follow: false } : undefined
  };
}
