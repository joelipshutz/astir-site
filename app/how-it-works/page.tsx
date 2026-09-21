import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HowItWorksDemo } from "@/components/HowItWorksDemo";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "How it works",
  description:
    "See how Astir turns a check-in, trusted context, and a future search into one useful place memory."
};

const chapters = [
  {
    number: "01",
    eyebrow: "Capture the useful part",
    title: "Check in with the reason attached.",
    copy: "Search Woodcat Coffee, confirm the category and rating, then add the note and tags future-you will actually need.",
    demo: "capture"
  },
  {
    number: "02",
    eyebrow: "Add the trusted layer",
    title: "A pin carries a point of view.",
    copy: "Tap a place someone you trust already saved and their useful note arrives with the place card—not in a separate feed you have to hunt through.",
    demo: "trust"
  },
  {
    number: "03",
    eyebrow: "Find it when it matters",
    title: "Search the way you remember.",
    copy: "Ask for “quiet coffee with good wifi” or “Ryan’s favorite sandwiches in LA.” Astir searches the human context, not just the category.",
    demo: "search"
  },
  {
    number: "04",
    eyebrow: "Capture where you are",
    title: "Nearby places, one action away.",
    copy: "Tap Add and Astir brings up useful places around you immediately, so saving the moment is faster than organizing it later.",
    demo: "nearby"
  }
] as const;

export default function HowItWorksPage() {
  return (
    <main className="motion-page">
      <section className="motion-hero">
        <div className="motion-hero__copy motion-reveal">
          <p className="eyebrow">How Astir works</p>
          <h1>A place becomes useful when its story stays attached.</h1>
          <p>
            Astir turns a quick check-in into a trusted place memory you can
            actually find again.
          </p>
          <div className="motion-hero__actions">
            <a className="button" href={primaryDownloadURL}>
              {primaryDownloadLabel}
            </a>
            <Link className="text-link" href="#the-journey">
              Follow one place ↓
            </Link>
          </div>
        </div>

        <div className="motion-hero__visual motion-reveal" aria-hidden="true">
          <div className="motion-hero__phone">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 340px, 380px"
              src="/product/astir/map-light.webp"
            />
          </div>
          <div className="motion-hero__ticket motion-card-to-map">
            <span className="motion-ticket__eyebrow">CHECKED IN · FRIDAY</span>
            <strong>Bar Nido</strong>
            <small>Maya · date night · ★ 4.5</small>
            <em>“Easy to talk. Get the bar seats.”</em>
          </div>
          <span className="motion-pin motion-pin--hero motion-pin--social" />
        </div>
      </section>

      <section className="motion-principles" aria-label="The Astir loop">
        <span>Check in</span>
        <i aria-hidden="true">→</i>
        <span>Keep the context</span>
        <i aria-hidden="true">→</i>
        <span>Find it later</span>
        <i aria-hidden="true">→</i>
        <span>Add nearby</span>
      </section>

      <section className="motion-story" id="the-journey">
        <header className="motion-story__header motion-reveal">
          <p className="eyebrow">One place, still useful later</p>
          <h2>Follow the memory from map pin to future plan.</h2>
          <p className="motion-story__proof">Explore illustrative walkthroughs of the Astir interface. Pause or step through each example at your own pace.</p>
        </header>

        <div className="motion-story__route" aria-hidden="true">
          <span className="motion-story__route-progress" />
        </div>

        <div className="motion-chapters">
          {chapters.map((chapter) => (
            <article className="motion-chapter" key={chapter.number}>
              <div className="motion-chapter__copy motion-reveal">
                <span className="motion-chapter__number">{chapter.number}</span>
                <p className="eyebrow">{chapter.eyebrow}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.copy}</p>
              </div>

              <HowItWorksDemo kind={chapter.demo} />
            </article>
          ))}
        </div>
      </section>

      <section className="motion-page__cta motion-reveal">
        <div>
          <p className="eyebrow">A map that gets more useful</p>
          <h2>Build the place memory you’ll actually come back to.</h2>
        </div>
        <a className="button button--dark" href={primaryDownloadURL}>
          {primaryDownloadLabel}
        </a>
      </section>
    </main>
  );
}
