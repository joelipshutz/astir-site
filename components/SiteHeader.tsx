import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { MobileSiteNav } from "@/components/MobileSiteNav";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" href="/" aria-label="Astir home">
          <BrandMark compact />
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/extensions">Extensions</Link>
          <Link href="/support">Support</Link>
          <a className="button button--small" href={primaryDownloadURL}>
            {primaryDownloadLabel}
          </a>
        </nav>
        <MobileSiteNav />
      </div>
    </header>
  );
}
