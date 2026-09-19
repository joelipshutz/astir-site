import Link from "next/link";
import type { PublicPreview } from "@/lib/previews";
import {
  appSchemeURL,
  primaryDownloadLabel,
  primaryDownloadURL,
  type SharedRouteKind
} from "@/lib/site";

type PublicPreviewPageProps = {
  kind: SharedRouteKind;
  identifier: string;
  preview: PublicPreview | null;
};

const fallbackCopy: Record<
  SharedRouteKind,
  { eyebrow: string; title: string; description: string }
> = {
  activity: {
    eyebrow: "Shared activity",
    title: "A place, through someone you trust.",
    description: "Open ASTIR to view this Check-in or Wanna Go. Access follows the owner’s privacy settings."
  },
  profile: {
    eyebrow: "Shared profile",
    title: "Someone wants you to see their map.",
    description:
      "Open rec.me to see the places they chose to share. Private saves always stay private."
  },
  place: {
    eyebrow: "Shared place",
    title: "A place worth remembering.",
    description:
      "Open rec.me to see why this place was shared and save it to your own map."
  },
  list: {
    eyebrow: "Shared list",
    title: "A shortlist from someone you trust.",
    description:
      "Open rec.me to view this list. Access still follows the owner’s privacy settings."
  },
  invite: {
    eyebrow: "List invitation",
    title: "You’re invited to build a list together.",
    description:
      "Open rec.me to review and accept. Invitations can expire or be revoked."
  }
};

export function PublicPreviewPage({
  kind,
  identifier,
  preview
}: PublicPreviewPageProps) {
  const fallback = fallbackCopy[kind];
  const eyebrow = preview?.eyebrow || fallback.eyebrow;
  const title = preview?.title || fallback.title;
  const description = preview?.description || fallback.description;
  const openURL = appSchemeURL(kind, identifier);

  if (preview?.card_image_url) return (
    <main className="share-shell">
      <section className="share-preview share-preview--card">
        <a href={openURL} aria-label={title}>
          {/* The approved SwiftUI card itself is the link, including its action. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview.card_image_url} alt={title} width={1170} height={978}
            className="share-card-image" referrerPolicy="no-referrer" />
        </a>
        <div className="share-preview__actions">
          <a className="button button--secondary" href={primaryDownloadURL}>{primaryDownloadLabel}</a>
        </div>
      </section>
    </main>
  );

  return (
    <main className="share-shell">
      <section className="share-preview">
        <div className="share-preview__visual" aria-hidden="true">
          <div className="share-preview__map">
            <span className="map-road map-road--one" />
            <span className="map-road map-road--two" />
            <span className="map-road map-road--three" />
            <span className="map-pin map-pin--terracotta" />
            <span className="map-pin map-pin--sky" />
            <span className="map-pin map-pin--moss" />
          </div>
          {preview?.image_url ? (
            // The URL comes from rec.me's privacy-filtered preview RPC. Keep
            // it unproxied so the site never downloads a shared avatar itself.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="share-preview__image"
              src={preview.image_url}
              width={128}
              height={128}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="share-preview__badge">{kind.slice(0, 1)}</span>
          )}
        </div>

        <div className="share-preview__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {preview?.subtitle ? (
            <p className="share-preview__subtitle">{preview.subtitle}</p>
          ) : null}
          <p>{description}</p>
          {typeof preview?.item_count === "number" ? (
            <p className="share-preview__count">
              {preview.item_count} saved{" "}
              {preview.item_count === 1 ? "place" : "places"}
            </p>
          ) : null}
          <div className="share-preview__actions">
            <a className="button" href={openURL}>
              {kind === "invite" ? "Join" : "View in ASTIR"}
            </a>
            <a className="button button--secondary" href={primaryDownloadURL}>
              {primaryDownloadLabel}
            </a>
          </div>
          <p className="share-preview__privacy">
            rec.me never publishes private notes or live location. If this
            content is unavailable, it may be private, expired, or revoked.
          </p>
          <Link className="text-link" href="/">
            Learn about rec.me
          </Link>
        </div>
      </section>
    </main>
  );
}
