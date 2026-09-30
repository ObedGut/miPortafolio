# William Gutierrez · Scroll product stories

Apple-inspired product presentation using Emil Kowalski's apple-design and design engineering principles: direct, reversible motion, clear typography, readable content and user control.

The palette remains nearly black (#080a09), ivory (#f3f5ef) and pale lime (#d6ec99). Manrope has size-specific tracking and comfortable body leading. Desktop body copy is 21–24 px; mobile body copy is 20 px. Navigation is at least 16 px. No micro labels, decorative numbering, project counters, bullet lists or drag affordances.

## Composition

A cinematic introduction, six continuous product stories, interactive technologies, approach, biography and contact. Desktop stories hold one viewport while the document scroll controls camera movement, image transitions and split-word headlines. Mobile uses the same vertical progression with stacked compositions. Hover is restrained and supports actual links. Technology chapters reveal in a shared sticky eclipse stage, beginning with AI and vibe coding and ending with WhatsApp API. Product scenes use 400vh of sticky travel on desktop and 380vh on mobile, with 20vh handoffs between projects. Product media occupy a 76vh stage on desktop.

## Motion

Native word splitting creates masked spans while maintaining full accessible text. GSAP and ScrollTrigger animate transform and opacity with reversible scrub timelines. CSS sticky establishes product stages without scroll locking. The hero uses a generated raster black-hole composition. Product stories use original images as directly animated camera planes, avoiding video seek latency. Native vertical scrolling remains the only scene input; no drag, wheel interception or project pagination.

Reduced motion or user pause removes cinematic positioning and exposes all content statically. Keyboard users can focus a case link and immediately reveal its reading position. ES/EN retain the same content and behavior.

## Truthful imagery

Five 6.4-second films are deterministic compositions from the user's original screenshots, not fictional app recordings. Skyfleeter uses typography because its screens are confidential. The original CVs and six cases remain. New tools are services only.

Each project owns an accent and a subtle radial light field. Large titles exit at full size before the product enters. Three real interface planes share a single reversible timeline: reveal, camera push, deliberate hold, then a spatial transition. Mobile apps move in depth; wide web screens zoom into legible detail on narrow devices. The last screen leaves before the full-sized personal contribution statement appears. There are no detached detail cards or shrinking headlines. AI has a typographic idea → judgment → product sequence, and the close foregrounds William's name and disciplines.

## Eclipse technology sequence

Six scroll chapters share a raster eclipse artwork, slowly rotating and moving closer. AI first, then web, mobile, systems, automation and WhatsApp API. Technology buttons expose specific capability text on hover, focus and tap. Reduced motion and Pause expose every chapter in normal document flow. Typography remains native HTML for accessibility and both languages.

Artwork: `images/eclipse.png`, generated with the built-in image-generation tool. Prompt: bespoke cinematic total eclipse on near-black, charcoal disk, fine ivory corona, pale lime diamond-ring flare, tactile texture, generous negative space, editorial composition; no stars, nebula, orbital lines, diagrams, text or logos. The image is composited in CSS; no SVG or procedural planet geometry is used.

## Eclipse continuity and optical polish

The earlier eclipse horizon was superseded by a black-hole reveal. Technology hover, keyboard focus and touch activate a localized flare at a technology-specific point on the corona; it clears when the scene changes. The flare is a transparent raster asset, not procedural geometry. Split-word masks include optical padding on every edge, and short viewports use adapted type and spacing. Font readiness triggers a fresh scroll measurement.

Additional artwork: `images/eclipse-flare.png`, generated with the built-in image tool. Prompt: isolated ivory diamond-ring flare, pale chartreuse core, photographic optical rays, feathered bloom and transparent background; no planet, stars, text or logos.

## Black-hole opening and corona response

`images/black-hole.png` is an original generated artwork inspired by Gargantua: a centered event horizon, near-edge-on ivory/gold disk and gravitationally lensed arcs on a black background. Built-in image prompt: cinematic physically inspired VFX, fine filament detail, restrained warm light, 16:9 composition; no stars, ships, planets, text or logos.

The hero uses a single reversible scroll timeline: close detail below the initial copy, pull back to the whole image and William's name, then push through the disk with a warm light transition. The eclipse stays in technologies. Hover sends the raster flare through an 85-degree arc, increases the corona's presence, dims other names and reveals capability text. Interrupted movement is canceled; pause/reduced motion keeps content readable without camera movement.


## Living disk and technology marks

The hero now contains one original 1280×720, 30fps H.264 render: black-hole-journey.mp4. It is an artistic 3D ray-bending scene with an emissive accretion disk, periodic angular texture advection, optical bloom and an inward camera trajectory. This is not a scientific simulation or telescope footage. NASA clips and their two-movie crossfade have been removed.

The camera remains still during the first six seconds (a seamless periodic orbit phase), then travels inward in the same scene. The light exposure peaks during the approach and fades inside the horizon, all encoded into the film. The page never transforms the film's scale or substitutes another shot. On scroll takeover it retains the current playback phase, completes that orbit during the cover's exit, and then seeks through the continuous camera journey. A latest-target seek loop supports stopping and reversing. Paused/reduced motion uses the first-frame poster. Hidden documents pause decoding.

The source renderer is tools/render-blackhole-journey.py (Python, ModernGL/EGL, NumPy, Pillow, ffmpeg); these are offline tools, not browser dependencies. GPU rendering happens only at asset-authoring time. The browser uses a single local video decoder with five-frame keyframe intervals.

Each branded technology reveals a local Simple Icons 16.24.1 mark through the corona flare, with a stable, legible foreground placement. Generic capabilities use typographic labels rather than invented logos. Vite replaces WooCommerce and React joins the web group; React Native remains in mobile. Focus and touch use the same selection behavior. Scene changes clear selection and cancel interrupted effects.


## Hosting seek compatibility

The static demo host responds with HTTP 200 and the full file even to a byte Range request. The hero now fetches the MP4 once and gives the decoder a Blob URL, providing local random access to the complete movie. A shared promise reuses the same buffer across language/motion rebuilds. The poster stays visible while loading. Timeline updates keep recording the newest position during the fetch; loadeddata applies that position once the decoder is ready. Validation uses HTTP 200-only video responses and real wheel events, and checks decoded pixels as well as currentTime.
