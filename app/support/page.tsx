import Link from "next/link";
import { DocumentPage } from "@/components/DocumentPage";
import { COMPANY_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/support" },
  title: "Support",
  description: `Contact ${COMPANY_NAME}, the company behind Astir, for help with your account, places, imports, and safety.`
};

export default function SupportPage() {
  return (
    <DocumentPage
      eyebrow="Support"
      title="Tell us what happened, not just that it broke."
      intro="The fastest support request includes your device, app build, approximate time, and the exact step where things went wrong."
      updated="September 23, 2026"
    >
      <section className="support-callout">
        <h2>Contact Astir support</h2>
        <p>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
        <a
          className="button"
          href={`mailto:${SUPPORT_EMAIL}?subject=Astir%20support%20request`}
        >
          Start a support email
        </a>
      </section>

      <section id="company">
        <h2>The company behind Astir</h2>
        <p>
          Astir is developed and operated by {COMPANY_NAME}. We build software
          that helps people remember places worth returning to and discover
          places through people they trust.
        </p>
        <p>
          <a href={SITE_URL}>astirmovement.com</a> is the official website for
          Astir, a product of {COMPANY_NAME}. Astir was previously known as rec.me.
        </p>
        <p>
          For company, product, or support inquiries, contact {COMPANY_NAME} at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>What to include</h2>
        <ul>
          <li>iPhone model and iOS version</li>
          <li>Astir version and build from TestFlight or the App Store</li>
          <li>Your username or account email when the problem is account-specific</li>
          <li>Approximate date, time, and time zone</li>
          <li>Exact steps and what you expected to happen</li>
          <li>A screenshot or screen recording with private details removed</li>
        </ul>
        <p>
          Never email a password, verification code, API key, private place
          note, or precise home location.
        </p>
      </section>

      <section>
        <h2>Imports</h2>
        <p>
          For help saving from Google Maps, Instagram, TikTok, texts, notes, or
          photos, use our <Link href="/import-help">Import Help guide</Link>.
        </p>
      </section>

      <section>
        <h2>Privacy and account deletion</h2>
        <p>
          Review <Link href="/privacy-choices">Privacy Choices</Link>. Account
          deletion is available inside Astir under Profile → Settings → Delete
          my account.
        </p>
      </section>

      <section>
        <h2>Safety</h2>
        <p>
          Block an account immediately when you need separation. Use the
          in-app Report action for abusive content or behavior so the safety
          team receives the relevant private evidence. If the Report action is
          unavailable, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Astir%20safety%20report`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          with “Safety report” in the subject and include the profile or
          content involved. Do not forward private notes or precise location.
          For immediate danger, contact local emergency services.
        </p>
      </section>

      <section>
        <h2>Service status</h2>
        <p>
          If sign-in, sync, or imports are temporarily unavailable, keep Astir
          installed and avoid repeatedly recreating the same item. Local saves
          and drafts are designed to retry when the connection recovers.
        </p>
      </section>
    </DocumentPage>
  );
}
