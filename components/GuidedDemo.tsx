"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DemoField, DemoMasthead, DemoNotice, DemoPlaceCard } from "@/components/AstirDemoUI";

export type DemoStep = {
  title: string;
  detail: string;
  heading: string;
  eyebrow?: string;
  fields?: readonly { label: string; value: string }[];
  rows?: readonly string[];
  selected?: number;
  photo?: boolean;
  notice?: string;
};

export function GuidedDemo({ label, steps }: { label: string; steps: readonly DemoStep[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const step = steps[index];
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    const visibility = () => setForeground(document.visibilityState === "visible");
    update(); visibility();
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    return () => { query.removeEventListener("change", update); document.removeEventListener("visibilitychange", visibility); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible || !foreground) return;
    const timer = setTimeout(() => setIndex(current => (current + 1) % steps.length), 5500);
    return () => clearTimeout(timer);
  }, [index, paused, reduced, visible, foreground, steps.length]);
  function move(delta: number) { setPaused(true); setIndex(current => (current + delta + steps.length) % steps.length); }
  return <div className="guided-demo" aria-label={label} ref={root}>
    <div className="guided-demo__chrome"><span>ASTIR / WALKTHROUGH</span>{!reduced && <button type="button" aria-label={`${paused ? "Play" : "Pause"} ${label}`} aria-pressed={paused} onClick={() => setPaused(current => !current)}>{paused ? "Play" : "Pause"}</button>}</div>
    <div className="guided-demo__screen" aria-hidden="true">
      <DemoMasthead action={<Image src="/icon.png" width={36} height={36} alt="" />} />
      <div className="guided-demo__content" key={index}>
        <p className="eyebrow">{step.eyebrow ?? "Your world, remembered"}</p>
        <h3>{step.heading}</h3>
        {step.photo && <DemoPlaceCard />}
        {step.fields?.map(field => <DemoField key={field.label} label={field.label}>{field.value}</DemoField>)}
        {step.rows && <div className="demo-option-list">{step.rows.map((row, rowIndex) => <div className={rowIndex === step.selected ? "is-selected" : ""} key={row}><span>{row}</span><span>{rowIndex === step.selected ? "✓" : "↗"}</span></div>)}</div>}
        {step.notice && <DemoNotice>{step.notice}</DemoNotice>}
      </div>
    </div>
    <div className="guided-demo__caption" aria-live={paused || reduced ? "polite" : "off"} aria-atomic="true"><small>STEP {index + 1} / {steps.length}</small><strong>{step.title}</strong><p>{step.detail}</p></div>
    <div className="guided-demo__controls"><button type="button" aria-label={`Previous step: ${label}`} onClick={() => move(-1)}>←</button><span>{index + 1} of {steps.length}</span><div aria-hidden="true">{steps.map((_, i) => <i className={index === i ? "is-active" : ""} key={i} />)}</div><button type="button" aria-label={`Next step: ${label}`} onClick={() => move(1)}>→</button></div>
    <p className="guided-demo__disclaimer">Illustrative walkthrough · example content</p>
  </div>;
}
