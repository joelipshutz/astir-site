"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export type HowItWorksDemoKind = "capture" | "trust" | "search" | "nearby";

const captureTiming = [2200, 3600, 2600, 2800, 2800, 3200, 4200] as const;
const trustTiming = [2600, 3000, 4400] as const;
const searchTiming = [2200, 4200, 2800, 3800, 2200, 4200, 2800, 4200] as const;
const nearbyTiming = [2600, 2400, 4400] as const;

export function useDemoSequence(timing: readonly number[]) {
  const demoRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const demo = demoRef.current;
    if (!demo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setFrame(0);
      },
      { threshold: 0.25 }
    );

    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !inView) return;

    const timeout = window.setTimeout(() => {
      setFrame((current) => (current + 1) % timing.length);
    }, timing[frame]);

    return () => window.clearTimeout(timeout);
  }, [frame, inView, paused, reducedMotion, timing]);

  return {
    demoRef,
    frame: reducedMotion ? timing.length - 1 : frame,
    paused,
    reducedMotion,
    togglePaused: () => setPaused((current) => !current),
    previousFrame: () => {
      setPaused(true);
      setFrame((current) => (current - 1 + timing.length) % timing.length);
    },
    nextFrame: () => {
      setPaused(true);
      setFrame((current) => (current + 1) % timing.length);
    }
  };
}

export function DemoShell({
  children,
  demoRef,
  frame,
  frameCount,
  label,
  paused,
  previousFrame,
  reducedMotion,
  status,
  nextFrame,
  togglePaused,
  viewportClassName
}: {
  children: ReactNode;
  demoRef: RefObject<HTMLDivElement | null>;
  frame: number;
  frameCount: number;
  label: string;
  paused: boolean;
  previousFrame?: () => void;
  reducedMotion: boolean;
  status: string;
  nextFrame?: () => void;
  togglePaused: () => void;
  viewportClassName?: string;
}) {
  return (
    <div className="app-demo" aria-label={label} ref={demoRef}>
      <div className="app-demo__chrome">
        <span>Astir demo</span>
        {reducedMotion ? (
          <span className="app-demo__motion-state">Static view</span>
        ) : (
          <button
            aria-label={`${paused ? "Play" : "Pause"} ${label}`}
            aria-pressed={paused}
            onClick={togglePaused}
            type="button"
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
      <div className={`app-demo__viewport${viewportClassName ? ` ${viewportClassName}` : ""}`} aria-hidden="true">
        {children}
      </div>
      <p aria-atomic="true" aria-live="polite" className="app-demo__status">
        {status}
      </p>
      {previousFrame && nextFrame ? (
        <div className="app-demo__guided-progress">
          <button aria-label={`Previous step in ${label}`} onClick={previousFrame} type="button">←</button>
          <span aria-live="polite">Step {frame + 1} of {frameCount}</span>
          <div aria-hidden="true">
            {Array.from({ length: frameCount }, (_, index) => (
              <i className={index === frame ? "is-active" : undefined} key={index} />
            ))}
          </div>
          <button aria-label={`Next step in ${label}`} onClick={nextFrame} type="button">→</button>
        </div>
      ) : (
        <div className="app-demo__progress" aria-hidden="true">
          {Array.from({ length: frameCount }, (_, index) => (
            <span className={index === frame ? "is-active" : undefined} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

type FocusBox = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius?: number;
};

const screenshotWidth = 944;
const screenshotHeight = 2052;

function focusBox(
  left: number,
  top: number,
  width: number,
  height: number,
  radius = 22
): FocusBox {
  return {
    left: (left / screenshotWidth) * 100,
    top: (top / screenshotHeight) * 100,
    width: (width / screenshotWidth) * 100,
    height: (height / screenshotHeight) * 100,
    radius
  };
}

const focus = {
  mapSearch: focusBox(29, 164, 768, 114, 999),
  mapSearchResults: focusBox(27, 294, 890, 568, 30),
  rating: focusBox(37, 987, 870, 277, 30),
  moreOptions: focusBox(37, 1404, 870, 104, 28),
  note: focusBox(37, 1353, 870, 208, 30),
  trustedMapTicket: focusBox(28, 1420, 888, 410, 30),
  feedSearch: focusBox(37, 296, 870, 105, 999),
  resultSearch: focusBox(158, 163, 750, 106, 999),
  quietResult: focusBox(37, 667, 870, 520, 30),
  ryanResult: focusBox(37, 589, 870, 519, 30),
  mapAddButton: focusBox(808, 164, 111, 114, 999),
  nearbyCards: focusBox(54, 1147, 837, 299, 28)
} as const;

type RealFrame = {
  src: string;
  caption: string;
  focus?: FocusBox;
  view?: "top" | "upper" | "middle" | "lower" | "bottom";
  captionAt?: "top" | "bottom";
  query?: {
    text: string;
    target: "map" | "feed";
    type?: boolean;
  };
};

const captureFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-map.jpg", caption: "Tap the real Map search", focus: focus.mapSearch, view: "top" },
  {
    src: "/product/recme-live-map.jpg",
    caption: "Type Woodcat Coffee",
    focus: focus.mapSearch,
    view: "top",
    query: { text: "Woodcat Coffee", target: "map", type: true }
  },
  {
    src: "/product/recme-live-map-search.jpg",
    caption: "Choose Woodcat Coffee",
    focus: focus.mapSearchResults,
    view: "top",
    query: { text: "Woodcat Coffee", target: "map" }
  },
  { src: "/product/recme-live-checkin-editor.jpg", caption: "Adjust the real rating", focus: focus.rating, view: "middle", captionAt: "top" },
  { src: "/product/recme-live-checkin-details.jpg", caption: "Open note, tags, and privacy", focus: focus.moreOptions, view: "lower", captionAt: "top" },
  { src: "/product/recme-live-checkin-filled.jpg", caption: "Add the detail future-you needs", focus: focus.note, view: "lower", captionAt: "top" },
  { src: "/product/recme-live-place-woodcat.jpg", caption: "The memory lives on Woodcat’s full place profile", view: "top" }
];

const trustFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-map.jpg", caption: "Browse places from people you trust", view: "upper" },
  { src: "/product/recme-live-trusted-map.jpg", caption: "Tap Bar Nido’s real map ticket", focus: focus.trustedMapTicket, view: "bottom", captionAt: "top" },
  { src: "/product/recme-live-trusted-place.jpg", caption: "See the full profile, ratings, tags, and context", view: "top" }
];

const searchFrames: readonly RealFrame[] = [
  {
    src: "/product/recme-live-feed.jpg",
    caption: "Tap the real Feed search",
    focus: focus.feedSearch,
    view: "top",
    query: { text: "Search places or people…", target: "feed" }
  },
  {
    src: "/product/recme-live-feed.jpg",
    caption: "Ask for quiet coffee with good wifi",
    focus: focus.feedSearch,
    view: "top",
    query: { text: "quiet coffee shop with good wifi", target: "feed", type: true }
  },
  { src: "/product/recme-live-feed-search.jpg", caption: "Astir understands the context", focus: focus.resultSearch, view: "top" },
  { src: "/product/recme-live-feed-search.jpg", caption: "Then ranks real places with trusted notes", focus: focus.quietResult, view: "upper" },
  {
    src: "/product/recme-live-feed.jpg",
    caption: "Start another search",
    focus: focus.feedSearch,
    view: "top",
    query: { text: "Search places or people…", target: "feed" }
  },
  {
    src: "/product/recme-live-feed.jpg",
    caption: "Ask for Ryan’s favorite places in LA",
    focus: focus.feedSearch,
    view: "top",
    query: { text: "Ryan’s favorite places in LA", target: "feed", type: true }
  },
  { src: "/product/recme-live-feed-search-ryan.jpg", caption: "Astir understands Ryan and the location", focus: focus.resultSearch, view: "top" },
  { src: "/product/recme-live-feed-search-ryan.jpg", caption: "The results keep Ryan’s notes and ratings attached", focus: focus.ryanResult, view: "upper" }
];

const nearbyFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-map.jpg", caption: "Tap the actual Map action button", focus: focus.mapAddButton, view: "top" },
  { src: "/product/recme-live-add-nearby.jpg", caption: "The real Add sheet opens over your map", view: "middle", captionAt: "top" },
  { src: "/product/recme-live-add-nearby.jpg", caption: "Nearby suggestions appear in the real Add flow", focus: focus.nearbyCards, view: "middle", captionAt: "top" }
];

function TypedQuery({
  animate,
  paused,
  reducedMotion,
  text
}: {
  animate: boolean;
  paused: boolean;
  reducedMotion: boolean;
  text: string;
}) {
  const shouldAnimate = animate && !reducedMotion;
  const [visibleCharacters, setVisibleCharacters] = useState(shouldAnimate ? 0 : text.length);

  useEffect(() => {
    if (!shouldAnimate || paused) return;

    const interval = window.setInterval(() => {
      setVisibleCharacters((current) => {
        if (current >= text.length) {
          window.clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 72);

    return () => window.clearInterval(interval);
  }, [paused, shouldAnimate, text]);

  return (
    <span>
      {text.slice(0, visibleCharacters)}
      {shouldAnimate ? <i className="real-app-demo__caret" /> : null}
    </span>
  );
}

function RealAppSequence({
  frame,
  frames,
  paused,
  reducedMotion
}: {
  frame: number;
  frames: readonly RealFrame[];
  paused: boolean;
  reducedMotion: boolean;
}) {
  const current = frames[Math.min(frame, frames.length - 1)];
  const view = current.view ?? "top";

  return (
    <div className={`real-app-demo real-app-demo--caption-${current.captionAt ?? "bottom"}${paused ? " is-paused" : ""}`}>
      <div className="real-app-demo__phone">
        <div className={`real-app-demo__canvas real-app-demo__canvas--${view}`}>
          <Image
            alt=""
            className="real-app-demo__screen"
            fill
            key={`${frame}-${current.src}`}
            sizes="(max-width: 620px) 420px, 720px"
            src={current.src}
          />
          {current.query ? (
            <span className={`real-app-demo__typing real-app-demo__typing--${current.query.target}`}>
              <TypedQuery
                animate={Boolean(current.query.type)}
                key={`${frame}-${current.query.text}-${reducedMotion}`}
                paused={paused}
                reducedMotion={reducedMotion}
                text={current.query.text}
              />
            </span>
          ) : null}
          {current.focus ? (
            <span
              className="real-app-demo__focus"
              style={{
                "--focus-left": `${current.focus.left}%`,
                "--focus-top": `${current.focus.top}%`,
                "--focus-width": `${current.focus.width}%`,
                "--focus-height": `${current.focus.height}%`,
                "--focus-radius": `${current.focus.radius ?? 22}px`
              } as CSSProperties}
            />
          ) : null}
        </div>
      </div>
      <div className="real-app-demo__caption" key={`${frame}-${current.caption}`}>
        <small>FOCUSED APP DEMO</small>
        <strong>{current.caption}</strong>
      </div>
    </div>
  );
}

function RealDemo({
  frames,
  label,
  timing
}: {
  frames: readonly RealFrame[];
  label: string;
  timing: readonly number[];
}) {
  const sequence = useDemoSequence(timing);

  return (
    <DemoShell
      demoRef={sequence.demoRef}
      frame={sequence.frame}
      frameCount={timing.length}
      label={label}
      paused={sequence.paused}
      reducedMotion={sequence.reducedMotion}
      status={`Step ${sequence.frame + 1} of ${frames.length}: ${frames[sequence.frame].caption}`}
      togglePaused={sequence.togglePaused}
      viewportClassName="app-demo__viewport--focused"
    >
      <RealAppSequence
        frame={sequence.frame}
        frames={frames}
        paused={sequence.paused}
        reducedMotion={sequence.reducedMotion}
      />
    </DemoShell>
  );
}

export function HowItWorksDemo({ kind }: { kind: HowItWorksDemoKind }) {
  switch (kind) {
    case "capture":
      return (
        <RealDemo
          frames={captureFrames}
          label="Real Astir app sequence for searching Woodcat Coffee and completing a check-in"
          timing={captureTiming}
        />
      );
    case "trust":
      return (
        <RealDemo
          frames={trustFrames}
          label="Real Astir app sequence for opening a trusted place from the map"
          timing={trustTiming}
        />
      );
    case "search":
      return (
        <RealDemo
          frames={searchFrames}
          label="Real Astir app sequence for natural-language Feed searches"
          timing={searchTiming}
        />
      );
    case "nearby":
      return (
        <RealDemo
          frames={nearbyFrames}
          label="Real Astir app sequence for opening Add and seeing nearby places"
          timing={nearbyTiming}
        />
      );
  }
}
