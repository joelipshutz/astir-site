import type { Metadata } from "next";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { fetchPublicPreview, publicPreviewMetadata } from "@/lib/previews";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ card?: string | string[] }>;
};

export async function generateMetadata({
  params, searchParams
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const preview = await fetchPublicPreview("profile", id, (await searchParams).card);
  return publicPreviewMetadata({
    kind: "profile",
    identifier: id,
    preview,
    fallbackTitle: "Shared profile",
    fallbackDescription:
      "Open this shared profile in Astir. Private saves stay private."
  });
}

export default async function ProfileSharePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const preview = await fetchPublicPreview("profile", id, (await searchParams).card);
  return (
    <PublicPreviewPage kind="profile" identifier={id} preview={preview} />
  );
}
