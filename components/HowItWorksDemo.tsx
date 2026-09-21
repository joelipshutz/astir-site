import { GuidedDemo, type DemoStep } from "@/components/GuidedDemo";
export type HowItWorksDemoKind = "capture" | "trust" | "search" | "nearby";
const walkthroughs: Record<HowItWorksDemoKind, { label: string; steps: readonly DemoStep[] }> = {
  capture: { label: "Save a place memory", steps: [
    { title: "Start with the place", detail: "Search by name, then choose the matching place.", heading: "Find your place.", eyebrow: "Search", fields: [{ label: "Place", value: "Woodcat Coffee" }], rows: ["Woodcat Coffee · Los Angeles", "Search another place"], selected: 0 },
    { title: "Keep the useful details", detail: "Add the rating, note, and tags you want to remember.", heading: "How was it?", eyebrow: "Check in · Woodcat Coffee", fields: [{ label: "Rating", value: "★★★★☆" }, { label: "Your note", value: "The window seat. Good coffee. Easy to stay a while." }, { label: "Tags", value: "Quiet · Good wifi" }] },
    { title: "Choose who can see it", detail: "Private saves stay private. Pick visibility before saving.", heading: "Your memory. Your choice.", eyebrow: "Visibility", rows: ["Everyone · People who follow you", "Friends · Mutual follows", "Self · Only you"], selected: 1 },
    { title: "A place you can come back to", detail: "Your context stays with the place on your map.", heading: "Remembered.", notice: "Check-in saved to your map", fields: [{ label: "Woodcat Coffee", value: "Quiet · Good wifi · ★ 4" }, { label: "Your note", value: "The window seat. Good coffee. Easy to stay a while." }] }
  ] },
  trust: { label: "Explore a trusted recommendation", steps: [
    { title: "Start with your people", detail: "Choose Friends to see places shared by mutual follows.", heading: "A familiar point of view.", eyebrow: "Your map", rows: ["Featured", "Friends", "You"], selected: 1 },
    { title: "Open a place", detail: "A photo card keeps the place and its context together.", heading: "Worth a detour.", photo: true },
    { title: "Keep the reason", detail: "Read the notes from people you trust before you decide.", heading: "Why Maya went back.", fields: [{ label: "Maya · last Friday", value: "Warm room. Great pasta. Get the bar seats." }, { label: "Ryan · three days ago", value: "Easy to talk. Stay for dessert." }] }
  ] },
  search: { label: "Search your place memory", steps: [
    { title: "Search the way you remember", detail: "Use the details that matter for this moment.", heading: "What are you looking for?", eyebrow: "Find a place", fields: [{ label: "Search", value: "quiet coffee with good wifi" }] },
    { title: "Find the human context", detail: "Notes and tags help surface a relevant place.", heading: "A little room to focus.", rows: ["Woodcat Coffee · Quiet · Good wifi", "Circuit Coffee · Window seats"], selected: 0 },
    { title: "Or start with a person", detail: "Keep their point of view attached to the result.", heading: "Ryan’s favorite places.", fields: [{ label: "Search", value: "Ryan’s favorite places in LA" }], photo: true }
  ] },
  nearby: { label: "Check in nearby", steps: [
    { title: "Capture where you are", detail: "The coral add button opens ways to save a place.", heading: "Keep this moment.", rows: ["Nearby places", "Search a place", "Import from"], selected: 0 },
    { title: "Choose the right place", detail: "Check the name and distance before saving.", heading: "What’s around you?", eyebrow: "Nearby", rows: ["Circuit Coffee · 0.1 mi", "Bar Nido · 0.2 mi", "Juniper Table · 0.3 mi"], selected: 0 },
    { title: "Add your point of view", detail: "A quick note makes the memory useful later.", heading: "Worth remembering.", fields: [{ label: "Circuit Coffee", value: "Coffee · Ocean Park" }, { label: "Your note", value: "A very good flat white." }], notice: "Ready to check in" }
  ] }
};
export function HowItWorksDemo({ kind }: { kind: HowItWorksDemoKind }) { return <GuidedDemo {...walkthroughs[kind]} />; }
