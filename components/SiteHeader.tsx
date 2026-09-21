"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { MobileSiteNav } from "@/components/MobileSiteNav";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" href="/" aria-label="Astir home">
          <BrandMark compact />
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/how-it-works" aria-current={pathname === "/how-it-works" ? "page" : undefined}>How it works</Link>
          <Link href="/extensions" aria-current={pathname === "/extensions" ? "page" : undefined}>Extensions</Link>
          <Link href="/support" aria-current={pathname === "/support" ? "page" : undefined}>Support</Link>
          <a className="button button--small" href={primaryDownloadURL}>
            {primaryDownloadLabel}
          </a>
        </nav>
        <MobileSiteNav />
      </div>
    </header>
  );
}
