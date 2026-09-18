import type { Metadata } from "next";
import Image from "next/image";
import { fetchPlacePlan } from "@/lib/plans";
import { SITE_URL } from "@/lib/site";
import styles from "./plan.module.css";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const plan = await fetchPlacePlan(token);
  const title = plan?.title ?? "This invitation is unavailable";
  const description = plan?.date_label ?? "Ask your friend for a fresh invitation";
  const images = plan ? [{ url: plan.imageURL, alt: plan.title }] : [];
  return {
    title: { absolute: title }, description, applicationName: "ASTIR",
    referrer: "no-referrer", robots: { index: false, follow: false, nocache: true },
    icons: { icon: "/plan-icon.png", apple: "/plan-icon.png" },
    openGraph: { title, description, siteName: "ASTIR", type: "website", url: `${SITE_URL}/plans/${token}`, images },
    twitter: { card: "summary_large_image", title, description, images: plan ? [plan.imageURL] : [] }
  };
}

export default async function PlanPage({ params }: Props) {
  const { token } = await params;
  const plan = await fetchPlacePlan(token);
  if (!plan) return (
    <main className={styles.plan}>
      <p className={styles.eyebrow}>ASTIR</p>
      <h1>This invitation is unavailable</h1>
      <p>Ask your friend for a fresh invitation</p>
    </main>
  );
  const avatar = plan.sender_avatar_url?.startsWith("https://") ? plan.sender_avatar_url : null;
  return (
    <main className={styles.plan}>
      <div className={styles.sender}>
        {avatar ? <Image src={avatar} alt="" width={48} height={48} unoptimized className={styles.avatar} />
          : <span className={styles.initial}>{plan.sender_name.charAt(0)}</span>}
        <span>{plan.sender_name}’s got a plan</span>
      </div>
      <h1>{plan.title}</h1>
      <p className={styles.date}>{plan.date_label}</p>
      {/* The image is created by the very same SwiftUI card shown before sharing. */}
      <Image src={plan.imageURL} alt={`${plan.place_name} · ${plan.location}`} width={780} height={590} unoptimized className={styles.card} />
      <p className={styles.message}>{plan.message}</p>
      <p className={styles.connection}>{plan.connection}</p>
      <p className={styles.reply}>Make it happen in your chat</p>
    </main>
  );
}
