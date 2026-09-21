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
  const preview = await fetchPublicPreview("list", id, (await searchParams).card);
  return publicPreviewMetadata({
    kind: "list",
    identifier: id,
    preview,
    fallbackTitle: "Shared list",
    fallbackDescription:
      "Open this shared list in Astir. Access follows the owner’s privacy settings.",
    alwaysNoIndex: true
  });
}

export default async function ListSharePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const preview = await fetchPublicPreview("list", id, (await searchParams).card);
  return <PublicPreviewPage kind="list" identifier={id} preview={preview} />;
}
