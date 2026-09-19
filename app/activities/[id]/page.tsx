import { notFound } from "next/navigation";
import { validActivityID } from "@/lib/site";
import type { Metadata } from "next";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { fetchPublicPreview, publicPreviewMetadata } from "@/lib/previews";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ card?: string | string[] }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  if (!validActivityID(id)) notFound();
  const preview = await fetchPublicPreview("activity", id, (await searchParams).card);
  return publicPreviewMetadata({ kind: "activity", identifier: id, preview,
    fallbackTitle: "A shared Check-in or Wanna Go", fallbackDescription: "Open this exact activity in ASTIR.",
    alwaysNoIndex: true });
}

export default async function ActivitySharePage({ params, searchParams }: Props) {
  const { id } = await params;
  if (!validActivityID(id)) notFound();
  const preview = await fetchPublicPreview("activity", id, (await searchParams).card);
  return <PublicPreviewPage kind="activity" identifier={id} preview={preview} />;
}
