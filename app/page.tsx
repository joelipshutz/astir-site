import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InteractiveProductDemo } from "@/components/InteractiveProductDemo";
import { DemoPhoto } from "@/components/AstirDemoUI";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const trustNotes = [
  {
    label: "Useful before social",
    copy: "Search your own memory and the places people you trust chose to share."
  },
  {
    label: "Private by design",
    copy: "Stealth saves stay yours. Astir never broadcasts live location."
  },
  {
    label: "Fast to capture",
    copy: "Save from nearby, search, a link, a photo, or your share sheet."
  }
];

const memoryMoments = [
  {
    number: "01",
    eyebrow: "Maya · last Friday",
    title: "Save the part you’ll forget.",
    copy: "Maya checks in at Bar Nido and keeps the useful detail: warm room, great pasta, easy to talk.",
    actor: "Maya",
    initials: "M",
    ticketEyebrow: "CHECKED IN · LAST FRIDAY",
    artifact: "Bar Nido",
    meta: "Restaurant · Los Angeles · ★ 4",
    note: "Good service and easy to talk.",
    tone: "social"
  },
  {
    number: "02",
    eyebrow: "The trusted layer",
    title: "See the people behind the pin.",
    copy: "Joe and Ryan check in too. Their notes stay attached, so the recommendation has a point of view.",
    actor: "Joe + Ryan",
    initials: "+2",
    ticketEyebrow: "CHECKED IN TOO",
    artifact: "Bar Nido",
    meta: "3 trusted check-ins",
    note: "Warm room · great pasta · get the bar seats.",
    tone: "social"
  },
  {
    number: "03",
    eyebrow: "Six months later",
    title: "Ask the way you actually think.",
    copy: "Search “date night where we can talk” and Bar Nido comes back with the people and reasons that made it useful.",
    actor: "Your search",
    initials: "Y",
    ticketEyebrow: "FOUND FROM CHECK-INS",
    artifact: "Bar Nido",
    meta: "date night where we can talk",
    note: "Recommended by Maya + 2 friends.",
    tone: "you"
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero psychedelic-hero">
        <Image className="psychedelic-hero__art" src="/art/astir-contours.webp" alt="" fill priority sizes="100vw" />
        <div className="hero__copy">
          <p className="eyebrow">Your world, remembered together</p>
          <h1>
            Remember the places
            <span>worth going back to.</span>
          </h1>
          <p className="hero__lede">
            Astir turns your saves—and the places trusted people choose to
            share—into a map you can actually use.
          </p>
          <div className="hero__actions">
            <a className="button" href={primaryDownloadURL}>
              {primaryDownloadLabel}
            </a>
            <Link className="button button--secondary" href="/how-it-works">
              See how it works
            </Link>
          </div>
          <p className="hero__note">
            Made for iPhone · Private saves stay private
          </p>
        </div>

        <InteractiveProductDemo />
      </section>

      <section className="trust-strip" aria-label="Product principles">
        {trustNotes.map((note) => (
          <article key={note.label}>
            <strong>{note.label}</strong>
            <p>{note.copy}</p>
          </article>
        ))}
      </section>

      <section className="section section--how" id="how-it-works">
        <header className="section__header">
          <p className="eyebrow">A map with a memory</p>
          <h2>Less collecting. More remembering.</h2>
          <p>
            Astir keeps the useful human details that disappear inside a
            generic bookmark folder.
          </p>
        </header>
        <div className="memory-story">
          {memoryMoments.map((moment) => (
            <article className="memory-moment" key={moment.number}>
              <div className="memory-moment__rail" aria-hidden="true">
                <span>{moment.number}</span>
              </div>
              <div className="memory-moment__copy">
                <p className="eyebrow">{moment.eyebrow}</p>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </div>
              <div className={`memory-ticket memory-ticket--${moment.tone}`}>
                <DemoPhoto />
                <div className="memory-ticket__header">
                  <span className="memory-ticket__avatar" aria-hidden="true">
                    {moment.initials}
                  </span>
                  <span className="memory-ticket__identity">
                    <strong>{moment.actor}</strong>
                    <small>{moment.ticketEyebrow}</small>
                  </span>
                  <span className="memory-ticket__status" aria-hidden="true">✓</span>
                </div>
                <strong className="memory-ticket__place">{moment.artifact}</strong>
                <span className="memory-ticket__meta">{moment.meta}</span>
                <em>“{moment.note}”</em>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--feature">
        <div className="feature-map feature-map--screenshot">
          <Image
            alt="Astir Feed interface preview with editorial typography, floating search, and a photo place card."
            className="feature-map__screen"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            src="/product/astir/feed-light.webp"
          />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">Trust travels with the place</p>
          <h2>Know whose recommendation you’re following.</h2>
          <p>
            Internet ratings answer what everyone thinks. Astir helps you
            remember what your people thought—and whether it fits this moment.
          </p>
          <p className="screenshot-note">Astir interface preview with example places.</p>
          <ul className="check-list">
            <li>One map for Check-ins and Wanna Go</li>
            <li>Follower and friend visibility, never a public feed</li>
            <li>Notes, ratings, tags, lists, and check-ins in context</li>
          </ul>
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">Your next place is already in someone’s memory</p>
          <h2>Start building the map you’ll actually come back to.</h2>
        </div>
        <a className="button button--dark" href={primaryDownloadURL}>
          {primaryDownloadLabel}
        </a>
      </section>
    </main>
  );
}
