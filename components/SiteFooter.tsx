import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <BrandMark compact />
        <p>Places worth remembering, from people you trust. Astir, formerly rec.me.</p>
      </div>
      <nav className="site-footer__links" aria-label="Legal and support">
        <Link href="/how-it-works">How it works</Link>
        <Link href="/extensions">Extensions</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/community">Community Standards</Link>
        <Link href="/privacy-choices">Privacy Choices</Link>
        <Link href="/import-help">Import Help</Link>
        <Link href="/support">Support</Link>
      </nav>
      <p className="site-footer__legal">
        © {new Date().getFullYear()} Astir. Built for real recommendations,
        not live location.
      </p>
    </footer>
  );
}
