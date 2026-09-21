import { DocumentPage } from "@/components/DocumentPage";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/community" },
  title: "Community Standards",
  description: "The standards for safe, useful participation in Astir."
};

export default function CommunityPage() {
  return (
    <DocumentPage
      eyebrow="Community"
      title="Recommendations should feel like they came from someone you trust."
      intro="These standards apply to profiles, notes, lists, photos, tags, invitations, and every other shared surface in Astir."
    >
      <section>
        <h2>Be honest and useful</h2>
        <p>
          Share places you genuinely know or want to remember. Do not
          impersonate people or venues, manipulate ratings, coordinate spam,
          or present ads and promotions as personal recommendations.
        </p>
      </section>

      <section>
        <h2>Respect privacy</h2>
        <p>
          Do not share someone’s home address, precise location, contact
          information, private messages, photos, or other personal information
          without permission. Never use Astir to track, stalk, or intimidate
          someone. Respect Private Profile, Stealth, block, and invitation
          boundaries.
        </p>
      </section>

      <section>
        <h2>No harassment, hate, or exploitation</h2>
        <p>
          We do not allow threats, bullying, targeted harassment, hateful
          conduct, sexual exploitation, non-consensual intimate content, or
          content that promotes violence against a person or protected group.
          Content involving the sexual exploitation of minors is prohibited
          and may be reported to authorities.
        </p>
      </section>

      <section>
        <h2>No dangerous or illegal activity</h2>
        <p>
          Do not use Astir to facilitate violence, trafficking, fraud,
          unauthorized sales, illegal drugs, weapons transactions, malware, or
          other unlawful activity. Do not encourage dangerous behavior or
          provide instructions intended to cause harm.
        </p>
      </section>

      <section>
        <h2>Respect intellectual property</h2>
        <p>
          Post only content you created or have permission to use. Give
          attribution when a provider or creator requires it. We may remove
          content in response to a valid rights complaint.
        </p>
      </section>

      <section>
        <h2>Report, block, and step away</h2>
        <p>
          Use in-app reporting when available for content or behavior that
          breaks these standards. Blocking is a hard boundary: blocked users
          should not be able to see each other’s profiles or shared content.
          For immediate danger, contact local emergency services rather than
          relying on Astir.
        </p>
      </section>

      <section>
        <h2>What happens after a report</h2>
        <p>
          We may review relevant account and content records, limit reach,
          remove content, disable features, suspend or terminate accounts, and
          preserve information when required for safety or law. Context,
          severity, intent, history, and the risk of harm inform enforcement.
        </p>
      </section>

      <section>
        <h2>Appeals and questions</h2>
        <p>
          If you believe we made an enforcement mistake, reply to the notice
          you received or email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Moderation%20appeal`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          with “Moderation appeal” in the subject. Include your Astir username
          and the decision you want reviewed, but do not send passwords,
          verification codes, private notes, or precise location.
        </p>
      </section>
    </DocumentPage>
  );
}
