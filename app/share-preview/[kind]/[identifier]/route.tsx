import { ImageResponse } from "next/og";
import { fetchPublicPreview, type PublicPreview } from "@/lib/previews";

export const dynamic = "force-dynamic";

// A contextual fallback when no photo exists. Resolve from the same authorized
// contract as the page; query-string text can never become preview content.
export async function GET(request: Request, { params }: {
  params: Promise<{ kind: string; identifier: string }>
}) {
  const { kind, identifier } = await params;
  if (!["profile", "place", "list", "invite", "activity"].includes(kind)) return new Response(null, { status: 404 });
  const tokens = new URL(request.url).searchParams.getAll("card");
  if (tokens.length > 1) return new Response(null, { status: 404 });
  const preview = await fetchPublicPreview(kind as PublicPreview["kind"], identifier, tokens[0]);
  if (!preview) return new Response(null, { status: 404 });
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 72, background: "#141714", color: "#F2E9DB", borderBottom: "24px solid #F05A3C" }}>
      <div style={{ display: "flex", color: "#F05A3C", fontSize: 28, marginBottom: 24 }}>{kind === "invite" ? "INVITATION" : kind.toUpperCase()}</div>
      <div style={{ display: "flex", fontSize: 64, lineHeight: 1.15 }}>{preview.title.slice(0, 140)}</div>
      <div style={{ display: "flex", fontSize: 30, marginTop: 28, opacity: 0.8 }}>{(preview.subtitle || preview.description || "").slice(0, 180)}</div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }
  );
}
