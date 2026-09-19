import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { fetchPublicPreview, publicPreviewMetadata } from "@/lib/previews";
import { type SharedRouteKind } from "@/lib/site";

const kinds: Record<string, SharedRouteKind> = { profiles: "profile", places: "place", lists: "list", activities: "activity", invites: "invite" };
type Props = { params: Promise<{ root: string; id: string }>; searchParams: Promise<{ card?: string | string[] }> };
async function resolve({ params, searchParams }: Props) {
  const { root, id } = await params;
  const kind = Object.hasOwn(kinds, root) ? kinds[root] : undefined;
  if (!kind) notFound();
  const token = (await searchParams).card;
  if (token === undefined) notFound();
  const preview = await fetchPublicPreview(kind, id, token);
  if (!preview) notFound();
  return { kind, id, preview };
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { kind, id, preview } = await resolve(props);
  return publicPreviewMetadata({ kind, identifier: id, preview, fallbackTitle: "Shared card", fallbackDescription: "Open this shared place in ASTIR.", alwaysNoIndex: true });
}
export default async function CardPage(props: Props) {
  const { kind, id, preview } = await resolve(props);
  return <PublicPreviewPage kind={kind} identifier={id} preview={preview} />;
}
