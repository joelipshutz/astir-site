"use client";

import Image from "next/image";
import { useState } from "react";

const productScreens = [
  { id: "map", label: "Map" },
  { id: "tickets", label: "Check-in tickets" }
] as const;

const mapStates = [
  {
    id: "you",
    label: "You",
    stampTitle: "Your place memory",
    stampCopy: "personal places appearing on one fixed map"
  },
  {
    id: "social",
    label: "Social",
    stampTitle: "From people you trust",
    stampCopy: "shared places appearing on the same map"
  },
  {
    id: "check-ins",
    label: "Check-ins",
    stampTitle: "Places worth returning to",
    stampCopy: "check-ins appearing without moving the map"
  },
  {
    id: "wanna",
    label: "Wanna",
    stampTitle: "Saved for later",
    stampCopy: "Wanna places appearing in the same viewport"
  }
] as const;

const mapPins = {
  you: [
    { position: "northwest", icon: "☕", label: "Circuit Coffee" },
    { position: "center", icon: "☕", label: "Woodcat Coffee" },
    { position: "southeast", icon: "🍜", label: "Larchmont" }
  ],
  social: [
    { position: "north", icon: "🍝", label: "Bar Nido" },
    { position: "west", icon: "🍽", label: "Juniper Table" },
    { position: "east", icon: "🥪", label: "The Window" }
  ],
  "check-ins": [
    { position: "northwest", icon: "☕", label: "Circuit Coffee" },
    { position: "center", icon: "🍝", label: "Bar Nido" },
    { position: "west", icon: "🍽", label: "Juniper Table" },
    { position: "east", icon: "☕", label: "Fern Desk" }
  ],
  wanna: [
    { position: "south", icon: "🍜", label: "Larchmont" },
    { position: "northeast", icon: "🥪", label: "Wax Paper" }
  ]
} as const;

const fixedMapScreen = {
  src: "/product/recme-map-you.jpg",
  alt: "A fixed Astir map viewport where place pins appear and disappear as filters change."
} as const;

const ticketScreen = {
  src: "/product/recme-feed-tickets.jpg",
  alt: "The Astir iPhone Feed showing a Bar Nido check-in and a Larchmont Noodles Wanna save as notched tickets.",
  stampTitle: "Real check-in tickets",
  stampCopy: "tap either glowing ticket"
} as const;

const ticketPlaces = [
  {
    id: "bar-nido",
    label: "Bar Nido",
    src: "/product/recme-map-social.jpg",
    icon: "🍝",
    kicker: "MAYA + RYAN CHECKED IN",
    meta: "Restaurant · Los Angeles · ★ 4.5",
    summary: "A warm date-night room where conversation is still easy.",
    notes: [
      { person: "Maya", when: "3h ago", note: "Good service and easy to talk." },
      { person: "Ryan", when: "last Friday", note: "Get the bar seats and share the pasta." }
    ],
    tags: ["date night", "easy conversation", "great pasta"],
    stampTitle: "Full Bar Nido place card",
    stampCopy: "notes and context from people you trust"
  },
  {
    id: "larchmont-noodles",
    label: "Larchmont Noodles",
    src: "/product/recme-map-wanna.jpg",
    icon: "🍜",
    kicker: "RYAN SAVED TO WANNA",
    meta: "Restaurant · Larchmont · Wanna",
    summary: "A rainy-night noodle stop saved with the reason attached.",
    notes: [
      { person: "Ryan", when: "5h ago", note: "Saved for a rainy night." }
    ],
    tags: ["rainy night", "noodles", "casual"],
    stampTitle: "Full Larchmont Noodles card",
    stampCopy: "the Wanna reason stays attached"
  }
] as const;

function StaticPlaceCard({ place }: { place: (typeof ticketPlaces)[number] }) {
  return (
    <div className="static-place-card">
      <div className="static-place-card__topbar">
        <span aria-hidden="true">‹</span>
        <strong>Place</strong>
        <span aria-hidden="true">•••</span>
      </div>
      <div className="static-place-card__hero">
        <Image alt="" fill sizes="360px" src={place.src} />
        <span aria-hidden="true">{place.icon}</span>
      </div>
      <div className="static-place-card__body">
        <small>{place.kicker}</small>
        <h2>{place.label}</h2>
        <p className="static-place-card__meta">{place.meta}</p>
        <p className="static-place-card__summary">{place.summary}</p>
        <div className="static-place-card__tags">
          {place.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <section>
          <h3>From people you trust</h3>
          {place.notes.map((note) => (
            <article key={`${note.person}-${note.when}`}>
              <span aria-hidden="true">{note.person.slice(0, 1)}</span>
              <div><strong>{note.person}</strong><small>{note.when}</small><p>“{note.note}”</p></div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export function InteractiveProductDemo() {
  const [selectedID, setSelectedID] =
    useState<(typeof productScreens)[number]["id"]>("map");
  const [selectedMapID, setSelectedMapID] =
    useState<(typeof mapStates)[number]["id"]>("check-ins");
  const [selectedTicketID, setSelectedTicketID] =
    useState<(typeof ticketPlaces)[number]["id"] | null>(null);
  const selectedMap =
    mapStates.find((state) => state.id === selectedMapID) ?? mapStates[2];
  const selectedTicket = ticketPlaces.find((place) => place.id === selectedTicketID);
  const selectedScreen =
    productScreens.find((screen) => screen.id === selectedID) ?? productScreens[0];
  const displayedCopy =
    selectedID === "map" ? selectedMap : (selectedTicket ?? ticketScreen);

  return (
    <div className="hero__product" aria-label="Explore real Astir app screens">
      <p className="screenshot-note">Explore the app · Screens from the rec.me era</p>
      <div className="product-demo__switcher" aria-label="Choose an app screen">
        {productScreens.map((screen) => (
          <button
            aria-pressed={screen.id === selectedScreen.id}
            className={screen.id === selectedScreen.id ? "is-active" : undefined}
            key={screen.id}
            onClick={() => {
              setSelectedID(screen.id);
              setSelectedTicketID(null);
            }}
            type="button"
          >
            {screen.label}
          </button>
        ))}
      </div>

      <div className="product-demo__phone-wrap">
        {selectedID === "tickets" ? (
          <div className="product-demo__hint" aria-live="polite">
            {selectedTicket ? (
              <button onClick={() => setSelectedTicketID(null)} type="button">
                <span aria-hidden="true">←</span> Back to the tickets
              </button>
            ) : (
              <span className="product-demo__hint--glow"><i aria-hidden="true" /> Try it: tap a glowing ticket</span>
            )}
          </div>
        ) : null}

        <div className="phone phone--app-screen">
          {selectedTicket ? (
            <StaticPlaceCard place={selectedTicket} />
          ) : (
            <>
              <Image
                alt={selectedID === "map" ? fixedMapScreen.alt : ticketScreen.alt}
                className="product-demo__screen"
                fill
                key={selectedID === "map" ? "fixed-map" : "ticket-feed"}
                priority={selectedID === "map"}
                sizes="(max-width: 620px) 320px, 360px"
                src={selectedID === "map" ? fixedMapScreen.src : ticketScreen.src}
              />

              {selectedID === "map" ? (
                <>
                  <div className="fixed-map-wash" aria-hidden="true" />
                  <div
                    className={`fixed-map-pins fixed-map-pins--${selectedMap.id}`}
                    key={selectedMap.id}
                    aria-hidden="true"
                  >
                    {mapPins[selectedMap.id].map((pin) => (
                      <span
                        className={`fixed-map-pin fixed-map-pin--${pin.position}`}
                        key={`${pin.position}-${pin.label}`}
                      >
                        <i>{pin.icon}</i><small>{pin.label}</small>
                      </span>
                    ))}
                  </div>
                  <div className="map-filter-controls" aria-label="Filter the example map">
                    {mapStates.map((state) => (
                      <button
                        aria-label={`Show ${state.label} places on the example map`}
                        aria-pressed={state.id === selectedMap.id}
                        className={`map-filter-button map-filter-button--${state.id}`}
                        key={state.id}
                        onClick={() => setSelectedMapID(state.id)}
                        type="button"
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {selectedID === "tickets" ? (
                <div className="ticket-hotspots" aria-label="Open a Feed place card" role="group">
                  {ticketPlaces.map((place) => (
                    <button
                      aria-label={`Open the full ${place.label} place card`}
                      className={`ticket-hotspot ticket-hotspot--${place.id}`}
                      key={place.id}
                      onClick={() => setSelectedTicketID(place.id)}
                      type="button"
                    />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {selectedID === "tickets" ? (
        <div
          className="hero__stamp"
          key={`${selectedID}-${selectedTicketID ?? "feed"}-stamp`}
          aria-live="polite"
        >
          <strong>{displayedCopy.stampTitle}</strong>
          <span>{displayedCopy.stampCopy}</span>
        </div>
      ) : null}
    </div>
  );
}
