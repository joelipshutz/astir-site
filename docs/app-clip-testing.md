# App Clip branch testing

This branch includes the REC-598 native preview metadata fix and REC-408 App Clip
discovery. All three served AASA files declare
`Y7TVK75RZ8.com.grayline.wander.Clip` without widening the parent app's URL rules.

`ASTIR_APP_CLIP_ENABLED` defaults to off. Set it to `true` only on a controlled
preview deployment or after the corresponding Apple experience is available.
Available share routes then emit the `apple-itunes-app` tag with the full app ID,
Clip bundle ID and exact invocation URL, including a published-card token.
Unavailable links never advertise the Clip. Map shares use the profile route.

Run the production build, lint, typecheck and `node --test lib/*.test.mjs`.
The HTTP tests start loopback-only servers with synthetic RPC responses and test
discovery both off and on, every share route, all served association variants,
native icon metadata and unavailable links.

A Vercel preview can verify HTML and AASA responses. It does not prove a Messages
App Clip footer, and its preview hostname is not an approved native invocation
host. For development, run the signed Clip from Xcode with a fresh canonical
share URL in `_XCAppClipURL`; configure a local experience on the device for QR
launch-card checks. Real website/Messages discovery has additional Apple release
requirements. Follow [Apple's launch-testing guide](https://developer.apple.com/documentation/appclip/testing-the-launch-experience-of-your-app-clip).

Coordinate final production deployment with the native PR and verify both Astir
hosts and the legacy host before enabling discovery. Existing sent preview
caches and old published artwork require fresh sharing for visual verification.
