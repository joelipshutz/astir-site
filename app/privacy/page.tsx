import Link from "next/link";
import { DocumentPage } from "@/components/DocumentPage";
import { COMPANY_NAME, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description: "How Astir collects, uses, shares, and deletes information."
};

export default function PrivacyPage() {
  return (
    <DocumentPage
      eyebrow="Privacy"
      title="Your map is personal. Our privacy rules should be plain."
      intro="Astir (formerly rec.me). This policy explains what Astir collects, why we need it, which services help us operate, and the choices you have."
      updated="September 23, 2026"
    >
      <section>
        <h2>Who we are</h2>
        <p>
          {COMPANY_NAME} develops and operates Astir and its official website,
          astirmovement.com. In this policy, “we,” “us,” and “our” refer to
          {" "}{COMPANY_NAME}. For company information and contact details, visit
          {" "}our <Link href="/support#company">Support page</Link>.
        </p>
      </section>

      <section>
        <h2>At a glance</h2>
        <ul>
          <li>Astir does not sell personal information.</li>
          <li>Astir does not broadcast or sell live location.</li>
          <li>Stealth saves are visible only to you.</li>
          <li>
            Non-stealth saves are shared inside Astir according to the
            visibility shown in the app; they are not a public internet feed.
          </li>
          <li>You can delete your account from Settings.</li>
        </ul>
      </section>

      <section>
        <h2>Information we collect</h2>
        <h3>Account and profile information</h3>
        <p>
          We process account identifiers and the information you provide, such
          as your email address, optional phone number, username, display name,
          profile photo, bio, and home area. Authentication is provided by
          Clerk.
        </p>

        <h3>Places and content you create</h3>
        <p>
          Astir stores the places you save, Check-in or Wanna Go status, ratings,
          notes, tags, answers, lists, collaborative-list activity, check-ins,
          imported links, source information, and photos you choose to add.
          Some content may include location information associated with a
          place.
        </p>

        <h3>Social and safety information</h3>
        <p>
          We store follow relationships, collaboration and invitation state,
          blocks, mutes, notification preferences, and safety reports when
          available. Blocks are designed to hide both accounts and their
          content from each other.
        </p>

        <h3>Device, usage, and diagnostic information</h3>
        <p>
          We may process device and app version, notification tokens, sync
          state, coarse error categories, crash diagnostics, and product
          interactions needed to operate and improve the service. Product
          analytics are disabled when Astir is not configured with an
          analytics provider.
        </p>
      </section>

      <section>
        <h2>Location, maps, contacts, and imports</h2>
        <p>
          When you choose a nearby-place feature, Astir asks iOS for location
          to suggest nearby places. We use that reading for the requested
          feature and do not provide a live-location broadcast. Place search
          and directions may use Apple MapKit. Representative venue photos may
          be requested from Google Places under the attribution shown in the
          app.
        </p>
        <p>
          Links, photos, and text you submit for import may be processed to
          extract place candidates. Low-confidence results remain drafts for
          you to review. Source artifacts are access-controlled and retained
          only as needed to complete, recover, secure, and audit the import.
        </p>
        <p>
          If Astir offers Contacts matching, it will request permission first
          and use the permission only for the feature described in the app.
          You can change system permission access in iOS Settings.
        </p>
      </section>

      <section>
        <h2>How we use information</h2>
        <ul>
          <li>Provide, sync, personalize, and secure your account and map.</li>
          <li>Apply your visibility, block, mute, and collaboration choices.</li>
          <li>Resolve imports, search for places, and show requested media.</li>
          <li>Send notifications you enable.</li>
          <li>Prevent abuse, investigate failures, and maintain the service.</li>
          <li>Measure and improve Astir using privacy-limited diagnostics.</li>
          <li>Comply with law and enforce our Terms and Community Standards.</li>
        </ul>
      </section>

      <section>
        <h2>Services that help us operate</h2>
        <p>
          We disclose information to processors only as needed for their role.
          Current or planned service categories include Clerk for identity,
          Supabase for database, storage, and server functions, Apple services
          for app distribution, maps, notifications, and diagnostics, Google
          Places for requested venue media, Vercel for this website, and
          PostHog if privacy-limited product analytics are enabled. An
          extraction provider may process content you explicitly submit for an
          import.
        </p>
        <p>
          These providers process information under their own terms and
          security commitments. We may also disclose information when required
          by law, to protect people or the service, or as part of a business
          transaction with appropriate safeguards.
        </p>
      </section>

      <section>
        <h2>Visibility and public links</h2>
        <p>
          Astir is not a public-location feed. Inside the app, your content is
          shown according to the visibility displayed when you save or share
          it. Stealth content stays private. A public link can reveal the
          limited preview shown on that web page; private notes and live
          location are never included. List invitations use hard-to-guess
          tokens and can expire or be revoked.
        </p>
      </section>

      <section>
        <h2>Retention and deletion</h2>
        <p>
          We keep account and product information while your account is active
          and as needed to operate, secure, and comply with legal obligations.
          Temporary files, caches, diagnostics, and import artifacts use
          shorter operational retention where practical. Deleted product
          records may briefly remain in backups or minimal sync tombstones
          before scheduled deletion.
        </p>
        <p>
          You can permanently delete your account in Astir under Profile →
          Settings → Delete my account. The deletion flow is designed to remove
          your identity, owned database records, stored media, notification
          tokens, and dependent content, subject to limited legal, fraud, and
          backup retention.
        </p>
        <p>
          Safety reports and the evidence attached to them are private and
          access-controlled. We retain them while a report is active and for up
          to 24 months after it is resolved so we can prevent repeat abuse,
          review enforcement, and protect the service. We may retain specific
          records longer only when required by law or covered by a legal or
          immediate-safety hold. When that retention ends, we delete or
          anonymize the report and its evidence where practical.
        </p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <p>
          You can edit your profile, choose save visibility, enable Private
          Profile, change system permissions, control notifications, block or
          mute accounts, and delete your account. Depending on where you live,
          you may also have rights to access, correct, delete, export, restrict,
          or object to certain processing.
        </p>
        <p>
          Visit <Link href="/privacy-choices">Privacy Choices</Link> for request
          instructions. We may need to verify that the request belongs to you.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Astir is not directed to children under 13, or the minimum age
          required in their country. If you believe a child provided personal
          information without appropriate permission, contact us.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          We may update this policy as the product or law changes. Material
          changes will be reflected by a new date and, when appropriate, an
          in-app notice.
        </p>
        <p>
          Privacy questions can be sent to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or through
          our <Link href="/support">Support page</Link>.
        </p>
      </section>
    </DocumentPage>
  );
}
