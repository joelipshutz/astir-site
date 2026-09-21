import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExtensionsDemo } from "@/components/ExtensionsDemo";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/extensions" },
  title: "Extensions",
  description: "Learn how to save places to Astir from other apps, the Action Button, and iPhone widgets."
};

const lessons = [
  {
    number: "01",
    eyebrow: "Import from anywhere",
    title: "Bring the place. Keep the source.",
    copy: "Share a Google Maps place, Instagram post, or TikTok straight to Astir. For a loose list, paste your Notes text and review every place before it is saved.",
    kind: "imports",
    steps: [
      "Maps, Instagram, or TikTok: open the place or post → Share → Astir",
      "In Astir: tap Add to Astir → review the match → choose Wanna or Check in",
      "Notes or text: Add → Import from → Paste one place per line → Review"
    ]
  },
  {
    number: "02",
    eyebrow: "Your Action Button",
    title: "Make checking in a physical shortcut.",
    copy: "Assign Astir’s Check-in control to the iPhone Action Button. Once it is configured, a press and hold opens nearby places, ready for the note you want future-you to remember.",
    kind: "action",
    steps: [
      "Open iPhone Settings → Action Button",
      "Swipe through the choices until Controls is centered",
      "Tap Choose a Control → search Astir → select Check-in",
      "Confirm the Controls screen says Check-in—Settings saves it automatically",
      "Press and hold the Action Button → choose the nearby place → finish the Check-in"
    ]
  },
  {
    number: "03",
    eyebrow: "Home, Lock, and Control Center",
    title: "Put the right shortcut one tap away.",
    copy: "Add I’m Here Now, Search Astir, Activity Calendar, Nearby Places, or the Check-in Control. Choose the surface and size that match how you use Astir.",
    kind: "widgets",
    steps: [
      "Touch and hold the Home Screen → Edit → Add Widget → search Astir",
      "Choose Nearby Rich Visit, I’m Here Now, Search, or Activity Calendar",
      "Control Center or Action Button: add the Astir Check-in Control"
    ]
  },
  {
    number: "04",
    eyebrow: "The Astir share extension",
    title: "Find it once. Keep it within reach.",
    copy: "In another app, tap Share and choose Astir. If it is hidden, open More, tap Edit, and favorite Astir so it stays in the first row next time.",
    kind: "share",
    steps: [
      "In Maps, Safari, Instagram, TikTok, or Notes: tap Share",
      "If Astir is hidden: More → Edit → add Astir to Favorites",
      "Next time: Share → Astir → Add to Astir"
    ]
  }
] as const;

export default function ExtensionsPage() {
  return (
    <main className="extensions-page">
      <section className="extensions-hero">
        <div className="extensions-hero__copy motion-reveal">
          <p className="eyebrow">Astir beyond the app</p>
          <h1>Save a place from wherever it finds you.</h1>
          <p>Turn posts, links, lists, buttons, and widgets into useful place memories—without breaking your flow.</p>
          <div className="extensions-hero__actions">
            <Link className="button" href="#extension-lessons">Show me how</Link>
            <a className="text-link" href={primaryDownloadURL}>{primaryDownloadLabel}</a>
          </div>
        </div>
        <div className="extensions-hero__orbit motion-reveal" aria-hidden="true">
          <span className="extensions-hero__center"><Image src="/icon.png" width={144} height={144} alt="" /><strong>Astir</strong></span>
          <span className="extensions-orbit extensions-orbit--maps">📍<small>Maps</small></span>
          <span className="extensions-orbit extensions-orbit--social">◎<small>Instagram</small></span>
          <span className="extensions-orbit extensions-orbit--video">♪<small>TikTok</small></span>
          <span className="extensions-orbit extensions-orbit--notes">▤<small>Notes</small></span>
          <span className="extensions-orbit extensions-orbit--widgets">▦<small>Widgets</small></span>
        </div>
      </section>

      <section className="extensions-intro">
        <p className="eyebrow">Four small superpowers</p>
        <h2>Astir should be close when a place is worth keeping.</h2>
        <p>Follow these illustrated walkthroughs, then try the steps on your iPhone. Pause or move one step at a time whenever you need.</p>
      </section>

      <section className="extensions-lessons" id="extension-lessons">
        {lessons.map((lesson) => (
          <article className="extension-lesson" key={lesson.number}>
            <div className="extension-lesson__copy motion-reveal">
              <span className="extension-lesson__number">{lesson.number}</span>
              <p className="eyebrow">{lesson.eyebrow}</p>
              <h2>{lesson.title}</h2>
              <p>{lesson.copy}</p>
              <ol className="extension-lesson__steps" aria-label={`${lesson.title} steps`}>
                {lesson.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
            <ExtensionsDemo kind={lesson.kind} />
          </article>
        ))}
      </section>

      <section className="extensions-page__cta motion-reveal">
        <div><p className="eyebrow">Keep the place, not the friction</p><h2>Your next save can start anywhere.</h2></div>
        <a className="button button--dark" href={primaryDownloadURL}>{primaryDownloadLabel}</a>
      </section>
    </main>
  );
}
