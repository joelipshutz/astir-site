import { GuidedDemo, type DemoStep } from "@/components/GuidedDemo";
export type ExtensionsDemoKind = "imports" | "action" | "widgets" | "share";
const walkthroughs: Record<ExtensionsDemoKind, { label: string; steps: readonly DemoStep[] }> = {
  imports: { label: "Import places into Astir", steps: [
    { title: "Bring a link or a list", detail: "Share from Maps, Instagram, or TikTok. Paste a list from Notes in Astir.", heading: "Good places travel.", eyebrow: "Import from", rows: ["Google Maps", "Instagram or TikTok", "Notes or pasted text"], selected: 2 },
    { title: "One place per line", detail: "Paste your list. Astir looks for matching places.", heading: "Keep them together.", fields: [{ label: "Places to import", value: "Woodcat Coffee, Los Angeles\nBar Nido, Los Angeles\nWax Paper, Frogtown" }] },
    { title: "Review every match", detail: "Resolve uncertain results and choose Wanna or Check in before saving.", heading: "Your call, always.", rows: ["Woodcat Coffee · Matched", "Bar Nido · Matched", "Wax Paper · Review match"], selected: 0, notice: "Review before saving" }
  ] },
  action: { label: "Set up the Action Button", steps: [
    { title: "Open iPhone Settings", detail: "Choose Action Button on a supported iPhone, then swipe to Controls.", heading: "A shortcut you can feel.", eyebrow: "iPhone Settings", rows: ["Action Button", "Controls", "Choose a Control"], selected: 1 },
    { title: "Choose Astir’s Check-in control", detail: "Search Astir, select Check-in, and confirm it appears in Controls. Settings saves automatically.", heading: "Make it Astir.", fields: [{ label: "Find a control", value: "Astir" }], rows: ["Check-in"], selected: 0 },
    { title: "Press and hold", detail: "Hold the physical Action Button until the control opens nearby places.", heading: "Here, now.", eyebrow: "Nearby places", rows: ["Circuit Coffee · 0.1 mi", "Bar Nido · 0.2 mi"], selected: 0 },
    { title: "Finish your check-in", detail: "Choose the place and add the detail worth keeping.", heading: "A moment, remembered.", fields: [{ label: "Your note", value: "Slow morning. A window seat. Great coffee." }], notice: "Ready to check in" }
  ] },
  widgets: { label: "Add an Astir widget", steps: [
    { title: "Find Astir in the widget gallery", detail: "Touch and hold the Home Screen, choose Edit, then Add Widget and search Astir.", heading: "A little closer.", eyebrow: "iPhone widgets", fields: [{ label: "Search widgets", value: "Astir" }] },
    { title: "Choose your shortcut", detail: "Pick a widget and size that suit how you use Astir.", heading: "Your way in.", rows: ["Nearby Places", "I’m Here Now", "Search Astir", "Activity Calendar"], selected: 0 },
    { title: "Keep nearby places in reach", detail: "Tap a widget to continue in Astir. The Check-in Control also works in Control Center.", heading: "Worth stopping for.", photo: true }
  ] },
  share: { label: "Use the Astir share extension", steps: [
    { title: "Start where you found it", detail: "Tap Share in Maps, Safari, Instagram, TikTok, or Notes.", heading: "Found somewhere else?", eyebrow: "iPhone share sheet", rows: ["Copy link", "Astir", "More"], selected: 1 },
    { title: "Make Astir easy to find", detail: "If Astir is hidden, open More, tap Edit, and add it to Favorites.", heading: "Keep Astir close.", eyebrow: "Share favorites", rows: ["Messages", "Astir", "Notes"], selected: 1 },
    { title: "Save with the source", detail: "Choose Astir, review the place, then tap Add to Astir.", heading: "The place comes with you.", fields: [{ label: "Place", value: "Bar Nido · Los Angeles" }, { label: "Source", value: "Your shared link" }], notice: "Add to Astir" }
  ] }
};
export function ExtensionsDemo({ kind }: { kind: ExtensionsDemoKind }) { return <GuidedDemo {...walkthroughs[kind]} />; }
