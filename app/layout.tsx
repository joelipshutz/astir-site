import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPANY_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import "./globals.css";
import "./astir-ui.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Astir — places worth remembering",
    template: "%s · Astir"
  },
  description:
    "Remember places worth returning to and discover where trusted people have checked in.",
  applicationName: "Astir",
  publisher: COMPANY_NAME,
  openGraph: {
    title: "Astir — places worth remembering",
    description:
      "A searchable map of places you and the people you trust actually recommend.",
    url: SITE_URL,
    siteName: "Astir",
    type: "website",
    images: [
      {
        url: "/brand/astir-wordmark.png",
        width: 1600,
        height: 764,
        alt: "Astir — places worth remembering"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Astir — places worth remembering",
    description:
      "A searchable map of places you and the people you trust actually recommend.",
    images: ["/brand/astir-wordmark.png"]
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY_NAME,
  legalName: COMPANY_NAME,
  url: SITE_URL,
  email: SUPPORT_EMAIL,
  brand: { "@type": "Brand", name: "Astir" },
  description: "The company that develops and operates Astir, a social map for remembering places and discovering recommendations from trusted people.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SUPPORT_EMAIL,
    url: `${SITE_URL}/support`
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c")
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
