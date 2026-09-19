import { notFound } from "next/navigation";
import { validActivityID } from "@/lib/site";
import type { Metadata } from "next";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { publicPreviewMetadata } from "@/lib/previews";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  if (!validActivityID(id)) notFound();
  return publicPreviewMetadata({ kind: "activity", identifier: id, preview: null,
    fallbackTitle: "A shared Check-in or Wanna Go", fallbackDescription: "Open this exact activity in ASTIR.",
    alwaysNoIndex: true });
}

export default async function ActivitySharePage({ params }: Props) {
  const { id } = await params;
  if (!validActivityID(id)) notFound();
  return <PublicPreviewPage kind="activity" identifier={id} preview={null} />;
}
