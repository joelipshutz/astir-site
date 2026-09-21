import Link from "next/link";
import { DocumentPage } from "@/components/DocumentPage";

export const metadata = {
  title: "TikTok Share",
  description: "Return to Astir after sharing a place ticket to TikTok."
};

export default function TikTokShareCallbackPage() {
  return (
    <DocumentPage
      eyebrow="TikTok Share"
      title="Finish sharing in Astir."
      intro="If Astir did not open automatically, return to the app to see the result of your TikTok share."
      updated="August 12, 2026"
    >
      <section>
        <h2>What to do next</h2>
        <p>
          Open Astir again. Your place ticket is still available, and you can
          retry TikTok or choose another sharing option.
        </p>
        <Link className="button" href="/">
          Back to Astir
        </Link>
      </section>
    </DocumentPage>
  );
}
