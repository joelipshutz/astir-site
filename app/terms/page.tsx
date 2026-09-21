import Link from "next/link";
import { DocumentPage } from "@/components/DocumentPage";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Use",
  description: "The terms that apply when you use Astir."
};

export default function TermsPage() {
  return (
    <DocumentPage
      eyebrow="Terms"
      title="Use Astir like a good guest."
      intro="These Terms govern access to the Astir (formerly rec.me) app, website, and related services. By creating an account or using Astir, you agree to them."
    >
      <section>
        <h2>Who may use Astir</h2>
        <p>
          You must be at least 13 years old, or the minimum age required in
          your country, and legally able to agree to these Terms. You are
          responsible for accurate account information and for activity under
          your account.
        </p>
      </section>

      <section>
        <h2>Your content and your license to us</h2>
        <p>
          You keep ownership of content you create. You give Astir a limited,
          worldwide, non-exclusive license to host, store, reproduce, process,
          adapt for technical display, and show that content only as needed to
          operate, secure, improve, and provide the service according to your
          visibility choices.
        </p>
        <p>
          You must have the rights needed to upload or share your content.
          Please do not submit confidential information that you do not want
          processed by the service.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          Follow our <Link href="/community">Community Standards</Link>. You
          may not use Astir to harass, threaten, impersonate, exploit, stalk,
          expose private information, infringe rights, distribute malware,
          scrape or reverse engineer the service, evade access controls, or
          interfere with other people or our systems.
        </p>
        <p>
          Do not use Astir as an emergency service, a live-location tracker,
          or a source of professional medical, legal, safety, or financial
          advice.
        </p>
      </section>

      <section>
        <h2>Places, recommendations, and third parties</h2>
        <p>
          Place information and recommendations can be incomplete, personal,
          outdated, or wrong. Verify hours, accessibility, safety, pricing,
          reservations, and other important details with the venue or another
          authoritative source. Maps, authentication, hosting, media, and
          linked services are provided partly by third parties with their own
          terms.
        </p>
      </section>

      <section>
        <h2>Safety, moderation, and enforcement</h2>
        <p>
          We may investigate reports and remove, limit, or preserve content;
          restrict features; suspend or terminate accounts; and cooperate with
          lawful requests when reasonably necessary to protect people, enforce
          these Terms, or secure Astir. We are not required to monitor every
          piece of content.
        </p>
      </section>

      <section>
        <h2>Service changes and availability</h2>
        <p>
          Astir is evolving. We may add, change, suspend, or discontinue
          features, and we may limit use to protect reliability or comply with
          law. We try to preserve user data and provide notice when practical,
          but uninterrupted or error-free operation is not guaranteed.
        </p>
      </section>

      <section>
        <h2>Disclaimers and liability</h2>
        <p>
          To the extent permitted by law, Astir is provided “as is” and “as
          available,” without warranties of merchantability, fitness for a
          particular purpose, or non-infringement. We are not responsible for
          decisions, travel, venue conditions, conduct of other users, or
          third-party services based on content in Astir.
        </p>
        <p>
          To the extent permitted by law, Astir and its operators will not be
          liable for indirect, incidental, special, consequential, or punitive
          damages, or loss of data, profits, goodwill, or opportunities. Rights
          that cannot legally be waived remain unaffected.
        </p>
      </section>

      <section>
        <h2>Ending use</h2>
        <p>
          You may stop using Astir at any time and delete your account from
          Settings. Provisions that logically survive termination—including
          ownership, enforcement, disclaimers, and liability limits—continue
          to apply.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          We may update these Terms. Continued use after an effective update
          means you accept the revised Terms where permitted by law. Questions
          can be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>
    </DocumentPage>
  );
}
