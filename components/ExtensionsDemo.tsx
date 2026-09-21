"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { DemoShell, useDemoSequence } from "@/components/HowItWorksDemo";

export type ExtensionsDemoKind = "imports" | "action" | "widgets" | "share";

type ViewportPosition = "top" | "upper" | "middle" | "lower" | "bottom" | "deep";

type TapCue = {
  left: number;
  top: number;
};

type ExtensionFrame = {
  src: string;
  caption: string;
  detail: string;
  view?: ViewportPosition;
  captionAt?: "top" | "bottom";
  hardwarePress?: boolean;
  tap?: TapCue;
  typing?: {
    text: string;
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

const importsTiming = [3800, 4000, 4200, 6500, 5200] as const;
const actionTiming = [4000, 4400, 5000, 4400, 4600, 4800, 5200] as const;
const widgetsTiming = [3600, 4200, 4200, 4200, 4800] as const;
const shareTiming = [3800, 4200, 4400, 4400, 4800] as const;

const importsFrames: readonly ExtensionFrame[] = [
  {
    src: "/product/extensions/import-entry.png",
    caption: "Open Add, then tap Import from",
    detail: "The real app accepts Google Maps, Instagram, TikTok, Notes, and more",
    view: "deep",
    captionAt: "top",
    tap: { left: 50, top: 89 }
  },
  {
    src: "/product/extensions/share-sheet-google-maps.png",
    caption: "Choose Astir from the real iPhone share sheet",
    detail: "Google Maps · Instagram · TikTok",
    view: "top",
    captionAt: "top",
    tap: { left: 61.5, top: 27.6 }
  },
  {
    src: "/product/extensions/share-extension-ready.png",
    caption: "Tap Add to Astir",
    detail: "The source link comes with the place",
    view: "middle",
    tap: { left: 50, top: 55.1 }
  },
  {
    src: "/product/extensions/import-hub.png",
    caption: "Paste links or type one place per line",
    detail: "Watch the places appear in Astir’s real Import form",
    view: "middle",
    captionAt: "top",
    typing: {
      text: "Woodcat Coffee, Los Angeles\nBar Nido, Los Angeles\nWax Paper, Frogtown",
      left: 6.5,
      top: 43.1,
      width: 87,
      height: 22
    }
  },
  {
    src: "/product/extensions/import-review.png",
    caption: "Review every match before you save it",
    detail: "Choose Wanna or Check in, resolve uncertain matches, and keep control",
    view: "middle",
    captionAt: "top"
  }
];

const actionFrames: readonly ExtensionFrame[] = [
  {
    src: "/product/extensions/action-settings.png",
    caption: "In Settings, tap Action Button",
    detail: "It sits below Accessibility on supported iPhones",
    view: "middle",
    tap: { left: 49, top: 47.8 }
  },
  {
    src: "/product/extensions/action-checkin-selected.jpg",
    caption: "Swipe until the Controls option is centered",
    detail: "Tap the control name beneath the iPhone preview to change it",
    view: "lower",
    captionAt: "top",
    tap: { left: 49.5, top: 72.8 }
  },
  {
    src: "/product/extensions/action-control-search.jpg",
    caption: "Search for Astir in the Controls picker",
    detail: "Under Astir, tap the Check-in control",
    view: "middle",
    tap: { left: 15.5, top: 47.2 }
  },
  {
    src: "/product/extensions/action-checkin-selected.jpg",
    caption: "Confirm that Controls now says Check-in",
    detail: "There is no extra Save button—the Action Button is ready",
    view: "lower",
    captionAt: "top"
  },
  {
    src: "/product/extensions/action-checkin-selected.jpg",
    caption: "Press and hold the physical Action Button",
    detail: "A quick tap is not enough; hold until the control runs",
    view: "middle",
    hardwarePress: true
  },
  {
    src: "/product/recme-live-add-nearby.jpg",
    caption: "Astir opens Nearby places",
    detail: "Tap the place you are actually at",
    view: "middle",
    captionAt: "top",
    tap: { left: 49, top: 42 }
  },
  {
    src: "/product/recme-live-checkin-editor.jpg",
    caption: "Add the detail you want to remember",
    detail: "Finish the Check-in with a rating, note, categories, and tags",
    view: "middle",
    captionAt: "top"
  }
];

const widgetsFrames: readonly ExtensionFrame[] = [
  {
    src: "/product/extensions/widgets-edit-home.png",
    caption: "Touch and hold the Home Screen, then tap Edit",
    detail: "Choose Add Widget and search for Astir",
    view: "top",
    tap: { left: 17.5, top: 3.7 }
  },
  {
    src: "/product/extensions/widget-nearby.png",
    caption: "Nearby Rich Visit keeps close places one tap away",
    detail: "Large widget · choose a nearby place to check in",
    view: "middle",
    captionAt: "top"
  },
  {
    src: "/product/extensions/widget-here-now.png",
    caption: "I’m here now starts a Check-in immediately",
    detail: "Small widget · ideal for fast capture",
    view: "middle",
    captionAt: "top"
  },
  {
    src: "/product/extensions/widget-search.png",
    caption: "Search Astir jumps straight to place search",
    detail: "Medium widget · type the moment you land",
    view: "middle",
    captionAt: "top"
  },
  {
    src: "/product/recme-live-add-nearby.jpg",
    caption: "Every shortcut lands in the real Astir flow",
    detail: "Activity Calendar and Check-in Control are available too",
    view: "middle",
    captionAt: "top"
  }
];

const shareFrames: readonly ExtensionFrame[] = [
  {
    src: "/product/extensions/share-sheet-google-maps.png",
    caption: "Look for Astir in the first row",
    detail: "The same share target appears in Maps, Safari, social apps, and Notes",
    view: "top",
    captionAt: "top",
    tap: { left: 61.5, top: 27.6 }
  },
  {
    src: "/product/extensions/share-sheet-google-maps.png",
    caption: "If it is hidden, tap More",
    detail: "This opens the complete list of share targets",
    view: "top",
    captionAt: "top",
    tap: { left: 85.5, top: 27.6 }
  },
  {
    src: "/product/extensions/share-more-apps.png",
    caption: "Find Astir under Apps, then tap Edit",
    detail: "You only have to set this up once",
    view: "top",
    tap: { left: 90.2, top: 8.7 }
  },
  {
    src: "/product/extensions/share-edit-favorites.png",
    caption: "Add Astir to Favorites",
    detail: "It stays within reach the next time you share a place",
    view: "top",
    tap: { left: 12.9, top: 29.3 }
  },
  {
    src: "/product/extensions/share-extension-ready.png",
    caption: "The real extension queues the link for Astir",
    detail: "Tap Add to Astir, then review the place in the app",
    view: "middle",
    captionAt: "top",
    tap: { left: 50, top: 55.1 }
  }
];

function ExtensionRealSequence({
  frame,
  frames,
  paused,
  reducedMotion
}: {
  frame: number;
  frames: readonly ExtensionFrame[];
  paused: boolean;
  reducedMotion: boolean;
}) {
  const current = frames[Math.min(frame, frames.length - 1)];

  return (
    <div className={`real-app-demo extension-real-demo real-app-demo--caption-${current.captionAt ?? "bottom"}${paused ? " is-paused" : ""}`}>
      <div className="real-app-demo__phone">
        <div className={`real-app-demo__canvas real-app-demo__canvas--${current.view ?? "top"}`}>
          <Image
            alt=""
            className="real-app-demo__screen"
            fill
            key={`${frame}-${current.src}`}
            loading="eager"
            sizes="(max-width: 620px) 420px, 720px"
            src={current.src}
          />
          {current.tap ? (
            <span
              className="extension-real-demo__tap"
              style={{
                "--tap-left": `${current.tap.left}%`,
                "--tap-top": `${current.tap.top}%`
              } as CSSProperties}
            />
          ) : null}
          {current.typing ? (
            <TypedImportText
              frame={frame}
              paused={paused}
              reducedMotion={reducedMotion}
              typing={current.typing}
            />
          ) : null}
        </div>
        {current.hardwarePress ? (
          <span className="extension-real-demo__hardware-press" aria-hidden="true">
            <i />
            Press &amp; hold
          </span>
        ) : null}
      </div>
      <div className="real-app-demo__caption extension-real-demo__caption" key={`${frame}-${current.caption}`}>
        <small>STEP {frame + 1} OF {frames.length} · REAL IPHONE</small>
        <strong>{current.caption}</strong>
        <span>{current.detail}</span>
      </div>
    </div>
  );
}

function TypedImportText({
  frame,
  paused,
  reducedMotion,
  typing
}: {
  frame: number;
  paused: boolean;
  reducedMotion: boolean;
  typing: NonNullable<ExtensionFrame["typing"]>;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(reducedMotion ? typing.text.length : 0);
  const renderedCharacters = reducedMotion ? typing.text.length : visibleCharacters;

  useEffect(() => {
    if (reducedMotion || paused) return;

    const interval = window.setInterval(() => {
      setVisibleCharacters((current) => {
        if (current >= typing.text.length) {
          window.clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 58);

    return () => window.clearInterval(interval);
  }, [frame, paused, reducedMotion, typing.text]);

  return (
    <span
      className="extension-real-demo__typing"
      style={{
        "--typing-left": `${typing.left}%`,
        "--typing-top": `${typing.top}%`,
        "--typing-width": `${typing.width}%`,
        "--typing-height": `${typing.height}%`
      } as CSSProperties}
    >
      {typing.text.slice(0, renderedCharacters)}
      {!reducedMotion ? <i className="real-app-demo__caret" /> : null}
    </span>
  );
}

function RealExtensionDemo({
  frames,
  label,
  timing
}: {
  frames: readonly ExtensionFrame[];
  label: string;
  timing: readonly number[];
}) {
  const sequence = useDemoSequence(timing);

  return (
    <DemoShell
      {...sequence}
      frameCount={frames.length}
      label={label}
      status={`Step ${sequence.frame + 1} of ${frames.length}: ${frames[sequence.frame].caption}`}
      viewportClassName="app-demo__viewport--focused"
    >
      <ExtensionRealSequence
        frame={sequence.frame}
        frames={frames}
        paused={sequence.paused}
        reducedMotion={sequence.reducedMotion}
      />
    </DemoShell>
  );
}

export function ExtensionsDemo({ kind }: { kind: ExtensionsDemoKind }) {
  switch (kind) {
    case "imports":
      return <RealExtensionDemo frames={importsFrames} label="Real iPhone walkthrough for importing a place into Astir" timing={importsTiming} />;
    case "action":
      return <RealExtensionDemo frames={actionFrames} label="Real iPhone walkthrough for setting up and using the Astir Action Button" timing={actionTiming} />;
    case "widgets":
      return <RealExtensionDemo frames={widgetsFrames} label="Real iPhone walkthrough for adding and using Astir widgets" timing={widgetsTiming} />;
    case "share":
      return <RealExtensionDemo frames={shareFrames} label="Real iPhone walkthrough for finding and favoriting the Astir share extension" timing={shareTiming} />;
  }
}
