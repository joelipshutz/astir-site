import Link from "next/link";
import { DocumentPage } from "@/components/DocumentPage";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/privacy-choices" },
  title: "Privacy Choices",
  description: "Manage Astir privacy, permissions, and data requests."
};

export default function PrivacyChoicesPage() {
  return (
    <DocumentPage
      eyebrow="Privacy choices"
      title="You should be able to change your mind."
      intro="Most privacy controls live directly in Astir. This page explains where to find them and how to make a data request."
    >
      <section>
        <h2>Control what people can see</h2>
        <p>
          In Profile → Settings → Privacy and trust, you can enable Private
          Profile and choose whether new saves start in Stealth. You can also
          change visibility while saving or editing a place.
        </p>
      </section>

      <section>
        <h2>Block or mute someone</h2>
        <p>
          Use the options on a member profile, then manage your blocked and
          muted accounts in Profile → Settings → Blocked and muted accounts.
        </p>
      </section>

      <section>
        <h2>Permissions and notifications</h2>
        <p>
          Change location, photo, camera, contact, and notification permission
          in iOS Settings. Manage Astir notification categories under Profile
          → Settings → Notifications.
        </p>
      </section>

      <section>
        <h2>Delete your account</h2>
        <p>
          Open Profile → Settings → Delete my account. After two confirmations,
          Astir requests permanent deletion of the account, owned records,
          stored media, and notification registrations. If deletion fails, the
          app tells you that nothing was removed so you can retry safely.
        </p>
      </section>

      <section>
        <h2>Access, correction, export, or deletion request</h2>
        <p>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the
          address connected to your account. Include the type of request and
          your Astir username. Do not include passwords, authentication codes,
          private notes, or precise location in the message.
        </p>
        <p>
          We may ask for reasonable verification. Applicable privacy rights
          vary by location. We do not discriminate against people for making a
          privacy request.
        </p>
      </section>

      <section>
        <h2>Read the complete policy</h2>
        <p>
          See the <Link href="/privacy">Privacy Policy</Link> for collected
          information, purposes, providers, visibility, and retention.
        </p>
      </section>
    </DocumentPage>
  );
}
