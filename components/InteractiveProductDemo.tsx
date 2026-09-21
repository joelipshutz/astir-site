"use client";

import { useState } from "react";
import { DemoMap, DemoMasthead, DemoPhoto, DemoPlaceCard } from "@/components/AstirDemoUI";

const places = [
  { id: "nido", title: "Bar Nido", icon: "🍝", meta: "Restaurant · Ocean Park", note: "Warm room. Great pasta. Get the bar seats.", person: "Maya", source: "friends", x: 64, y: 39 },
  { id: "coffee", title: "Circuit Coffee", icon: "☕", meta: "Coffee · Ocean Park", note: "Slow mornings, a window seat, and a very good flat white.", person: "You", source: "you", x: 34, y: 53 },
  { id: "noodles", title: "Larchmont Noodles", icon: "🍜", meta: "Restaurant · Los Angeles", note: "Saved for a rainy night.", person: "Ryan", source: "friends", x: 78, y: 59 }
] as const;
const sources = [{ id: "featured", label: "Featured" }, { id: "friends", label: "Friends" }, { id: "you", label: "You" }] as const;

export function InteractiveProductDemo() {
  const [view, setView] = useState<"map" | "feed">("map");
  const [source, setSource] = useState<string>("featured");
  const [selected, setSelected] = useState<string>("nido");
  const [detail, setDetail] = useState(false);
  const [query, setQuery] = useState("");
  const visible = places.filter(place => (source === "featured" || place.source === source) && `${place.title} ${place.note} ${place.person}`.toLowerCase().includes(query.trim().toLowerCase()));
  const place = visible.find(item => item.id === selected) ?? visible[0];
  return <div className="hero__product astir-showcase">
    <div className="astir-tabs" aria-label="Explore Astir screens">
      <button type="button" aria-pressed={view === "map"} onClick={() => { setView("map"); setDetail(false); }}>Map</button>
      <button type="button" aria-pressed={view === "feed"} onClick={() => { setView("feed"); setDetail(false); }}>Feed</button>
    </div>
    <div className={`interactive-phone ${view === "map" && !detail ? "interactive-phone--map" : ""}`}>
      {view === "map" && !detail && <DemoMap />}
      <div className="interactive-phone__status" aria-hidden="true"><span>9:41</span><i /><span>••• ▰</span></div>
      <DemoMasthead action={detail ? <button className="demo-round" onClick={() => setDetail(false)} aria-label="Close place details" type="button">×</button> : <span className="demo-location">Your places<br />Your people</span>} />
      {detail && place ? <div className="demo-place-detail">
        <DemoPhoto />
        <div><p className="eyebrow">From {place.person === "You" ? "your" : `${place.person}’s`} map</p><h3>{place.title}</h3><p>{place.meta}</p><blockquote>“{place.note}”</blockquote><p className="demo-detail-note">The place, the person, and the reason—all together.</p></div>
      </div> : <>
        <div className="demo-source-filters" aria-label="Filter example places">{sources.map(item => <button type="button" key={item.id} aria-pressed={source === item.id} onClick={() => setSource(item.id)}>{item.label}</button>)}</div>
        {view === "map" ? <div className="interactive-phone__map-content">
          {visible.map(item => <button className="demo-map-pin" type="button" key={item.id} style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-label={`Select ${item.title}`} aria-pressed={place?.id === item.id} onClick={() => setSelected(item.id)}><span aria-hidden="true">{item.icon}</span></button>)}
          <div className="demo-map-selection">{place ? <button type="button" className="demo-map-card" aria-label={`Open ${place.title}`} onClick={() => setDetail(true)}><DemoPhoto /><span><strong>{place.title}</strong><small>{place.meta}</small><em>{place.person === "You" ? "Saved by you" : `Saved by ${place.person}`} <b aria-hidden="true">↗</b></em></span></button> : <p className="demo-empty">No example places match. Try “coffee” or clear your search.</p>}</div>
        </div> : <div className="demo-feed"><h3>Worth coming<br /><em>back for.</em></h3><p>Places from your people</p>{visible.map(item => <DemoPlaceCard key={item.id} {...item} onOpen={() => { setSelected(item.id); setDetail(true); }} />)}{!visible.length && <p className="demo-empty">No example places match. Try “coffee” or clear your search.</p>}</div>}
        <label className="demo-search"><span aria-hidden="true">⌕</span><input aria-label="Search example places" type="search" placeholder="Search example places" value={query} onChange={event => setQuery(event.target.value)} /></label>
      </>}
      <div className="demo-phone-footer"><span>ASTIR</span><span>Places worth remembering.</span></div>
    </div>
    <p className="astir-showcase__caption">Try the filters or open a place · illustrative preview</p>
  </div>;
}
