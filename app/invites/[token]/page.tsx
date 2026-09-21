import type { Metadata } from "next";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { fetchPublicPreview, publicPreviewMetadata } from "@/lib/previews";

type PageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ card?: string | string[] }>;
};

export async function generateMetadata({
  params, searchParams
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const preview = await fetchPublicPreview("invite", token, (await searchParams).card);
  return publicPreviewMetadata({
    kind: "invite",
    identifier: token,
    preview,
    fallbackTitle: "List invitation",
    fallbackDescription:
      "Open Astir to review this collaborative-list invitation.",
    alwaysNoIndex: true
  });
}

export default async function InviteSharePage({ params, searchParams }: PageProps) {
  const { token } = await params;
  const preview = await fetchPublicPreview("invite", token, (await searchParams).card);
  return (
    <PublicPreviewPage kind="invite" identifier={token} preview={preview} />
  );
}
