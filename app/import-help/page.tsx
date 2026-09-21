import { DocumentPage } from "@/components/DocumentPage";

export const metadata = {
  alternates: { canonical: "/import-help" },
  title: "Import Help",
  description:
    "How to bring places into Astir from maps, social posts, messages, and photos."
};

const sources = [
  {
    title: "Google Maps",
    steps: [
      "Open the place or public saved-list link in Google Maps.",
      "Tap Share, then choose Astir. If Astir is not visible, tap More.",
      "Review the matched places before adding them to your map."
    ]
  },
  {
    title: "Instagram and TikTok",
    steps: [
      "Share the post or copy its public link.",
      "Choose Astir in the share sheet, or paste the link under Add → Import.",
      "Keep the source available while Astir resolves the mentioned place.",
      "Choose the right candidate when a post mentions more than one place."
    ]
  },
  {
    title: "Texts, notes, and copied links",
    steps: [
      "Copy the place name, address, or link.",
      "Open Add → Import → Texts & Notes.",
      "Paste the useful lines and remove unrelated private conversation.",
      "Confirm the candidate before saving."
    ]
  },
  {
    title: "Photos and screenshots",
    steps: [
      "From Add, use the camera menu in search.",
      "Choose Take a Photo or Photo Library.",
      "Allow photo or camera access only when iOS asks.",
      "Review any name, location, or text Astir finds before saving."
    ]
  }
];

export default function ImportHelpPage() {
  return (
    <DocumentPage
      eyebrow="Import help"
      title="Bring the place. Leave the clutter."
      intro="Astir turns shared links, screenshots, and copied text into place candidates. You always review the match before it reaches your map."
    >
      {sources.map((source) => (
        <section key={source.title}>
          <h2>{source.title}</h2>
          <ol>
            {source.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ))}

      <section>
        <h2>When a place does not match</h2>
        <ul>
          <li>Check that the original link is public and still opens.</li>
          <li>Try sharing the specific place instead of a profile or home page.</li>
          <li>Add the city or neighborhood when the name is common.</li>
          <li>Use manual search and keep the import as an unresolved draft.</li>
        </ul>
      </section>

      <section>
        <h2>Privacy tips</h2>
        <p>
          Import only content you have permission to use. Remove unrelated
          conversation, account information, and home addresses before pasting
          text. Low-confidence results do not auto-save.
        </p>
      </section>
    </DocumentPage>
  );
}
