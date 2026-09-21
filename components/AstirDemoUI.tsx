import Image from "next/image";
import type { ReactNode } from "react";

export function DemoMasthead({ action }: { action?: ReactNode }) {
  return <div className="demo-masthead"><span><strong>ASTIR</strong><small>OCEAN PARK</small></span>{action}</div>;
}

export function DemoPhoto({ className = "" }: { className?: string }) {
  return <div className={`demo-photo ${className}`}><Image src="/product/astir/place-collage.webp" alt="" fill sizes="(max-width: 620px) 280px, 380px" /></div>;
}

export function DemoPlaceCard({ title = "Bar Nido", meta = "Restaurant · Ocean Park", note = "Warm room. Great pasta. Get the bar seats.", person = "Maya", onOpen }: { title?: string; meta?: string; note?: string; person?: string; onOpen?: () => void }) {
  const content = <><DemoPhoto /><div className="demo-place-card__body"><small>{person === "You" ? "FROM YOUR MAP" : `FROM ${person.toUpperCase()}’S MAP`}</small><strong>{title}</strong><span>{meta}</span><p>“{note}”</p></div></>;
  return onOpen ? <button type="button" className="demo-place-card" aria-label={`Open ${title}`} onClick={onOpen}>{content}</button> : <div className="demo-place-card">{content}</div>;
}

export function DemoMap() {
  return <svg className="demo-map" viewBox="0 0 360 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><pattern id="astir-streets" width="76" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)"><rect width="76" height="80" fill="#e8e8db" /><rect x="7" y="7" width="62" height="66" rx="3" fill="#f7f5e9" /><path d="M0 0H76M0 0V80" stroke="#bdcbc5" strokeWidth="3" /></pattern></defs>
    <rect width="360" height="520" fill="url(#astir-streets)" />
    <path d="M-20 500L120 540L-20 150Z" fill="#a2d4cf" />
    <path d="M240 80l65-33 42 72-65 34zM82 324l30-16 22 43-30 16z" fill="#bbd69f" />
    <path d="M-10 285L370 90" stroke="#d5d4bc" strokeWidth="19" /><path d="M-10 285L370 90" stroke="#fff7da" strokeWidth="13" />
    <text x="142" y="251" transform="rotate(-28 142 251)" fill="#6a7971" fontSize="10" fontFamily="sans-serif" letterSpacing="2">OCEAN PARK BLVD</text>
    <text x="138" y="390" fill="#6a7971" fontSize="10" fontFamily="sans-serif" letterSpacing="3">OCEAN PARK</text>
  </svg>;
}

export function DemoField({ label, children }: { label: string; children: ReactNode }) {
  return <div className="demo-field"><small>{label}</small><div>{children}</div></div>;
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return <p className="demo-notice"><span aria-hidden="true">✓</span>{children}</p>;
}
