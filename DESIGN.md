# Astir website design

Astir is a native social map for places worth remembering through trusted people.
The website explains that experience and provides compatible public share links.

## Direction

Psychedelic print around a clear editorial interface. Original topographic ribbons
connect the sense of place with a 1960s screen-print palette and paper texture.
Keep decorative complexity outside reading areas. Never distort the approved logo,
icon, native share-card images, body copy, or functional controls.

## Current UI grammar

Use the approved Astir app's Paper / Ink / Signal tokens, editorial serif titles,
Avenir Next body copy, independently floating glass controls, underlined selections,
soft continuous rectangles, and photo-led cards. The website preview uses example
content and is labeled illustrative; never call a recreation a real app capture.

The source references are the approved REC-460 / REC-452 native component previews.
`public/product/astir/map-light.webp` and `feed-light.webp` are approved UI mockups,
not screenshots of the full application. The photo collage is the existing app's
onboarding asset. All source logo/icon pixels remain unchanged.

## Tokens and typography

- Paper: #F2E9DB; raised paper: #FBF6ED; Ink: #141714.
- Signal: #F05A3C. Use ink on Signal buttons, #B23620 for small accent text on paper.
- Decorative acid: #D2DF58; aqua: #B4DCD4. Keep semantic state colors distinct.
- Display: Iowan Old Style / Palatino / Georgia; body: Avenir Next / Avenir with
  system fallbacks. Condensed labels are metadata only. No remote font dependency.
- Base spacing: 4px; layout gaps 16 / 24 / 32 / 48 / 64 / 96px.
- Corners: 14–18px controls, 22–28px panels, large arched image frames for emphasis.
- Content maximum: 1240px. Spacious editorial layouts collapse to one column.

## Interaction and accessibility

Controls have visible keyboard focus and at least 44px tap targets. Selected
filters expose pressed state; navigation exposes the current page. Demos offer
previous/next and pause, stop autoplay offscreen or in background tabs, and disable
autoplay for reduced motion. Search is confined to clearly labeled example data.
Text always sits on an opaque or near-opaque surface with readable contrast.
Published native share cards and their links remain intact.

## Artwork

`public/art/astir-contours.webp` is original generated abstract artwork. Use it for
hero, supporting print accents, and calm crops on document/share surfaces. Do not
add rainbow treatments to every control or use gradients as the default CTA.
