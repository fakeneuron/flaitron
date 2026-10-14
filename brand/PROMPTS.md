---
origin: mined
date: 2026-09-21
model: ""
---

# Brand provenance

Recovered on 2026-10-14 from committed assets and tasknotes. The date above
is CORE-643's recorded closure date for the SVG kit; it is not the original
raster's creation date. `origin: mined` describes reuse of the producer's
existing mark. The manifest's per-asset `origin: authored` describes the
code-drawn SVG redraws, rather than an automated conversion or a new image
generation. A blank model is unknown, not evidence that no model was used.

## Source chain

- CORE-329.3, commit `9c43b1425a88c39d3e5577322f9a878cfbb7423a`, adopted
  the supplied root `LOGO.png` (705×705). It records
  `cwebp -resize 96 96 -q 85 LOGO.png -o viz/public/LOGO.webp` and
  `sips -z 32 32 LOGO.png --out viz/public/favicon.png`.
- CORE-632.2, commit `02d2526ae8a5773a8fd0704dfec434e1a13fa1b8`, copied
  `viz/public/LOGO.webp` to root `LOGO.webp` and removed the large PNG.
  The two current WebP files remain byte-identical. The old PNG is historical
  evidence in Git, not a current manifest source path.
- CORE-643, commit `0f286bd88043db5e84b4a315ccc38c81284c3afb`, added
  the brand SVGs. Its tasknote records the operator's choice of a simplified
  redraw and “good proceed” visual confirmation at 32 px / 16 px.
- CORE-711.4, commit `b44ffbaac530f35ee0866966e2485f773315cb8a`, changed
  the SVG accessible labels from Flowtron to Flaitron; geometry and palette
  were preserved. The project rename is not a new mark or product identity.

The original raster's creator, creation date, generation model, prompt and
reference-image history are **unknown** in the recovered evidence. No new
prompt is reconstructed or attributed to that image.

## logo.svg

- Source: `LOGO.webp`, the producer's 96×96 gear/wave/robot-surfer mark.
- Evidence: `.flaitron/tasknote/archive/core/CORE-643.md`.
- Method: authored SVG paths/shapes, simplified redraw rather than tracing or
  embedding the raster. CORE-643 records a temporary Python script for the
  regular gear polygon and inner circle, and ImageMagick palette sampling.
  That script, its exact invocation and the sampling invocation were not
  retained; a reproducible conversion recipe is **unknown**.
- Current extent: 64×64 viewBox; transparent background; symbol without text.
- Preserve the 12-tooth ring, three wave lines, surfer silhouette and palette
  (`#3b5660`, `#7f8f8e`, `#28343a`).

## favicon.svg

- Source: `LOGO.webp`; evidence:
  `.flaitron/tasknote/archive/core/CORE-643.md`.
- Method: separately authored, further simplified companion SVG redraw.
  CORE-643 describes the favicon as a logo derivative in the visual sense:
  eight teeth, one bolder wave, no surfer. It does not establish a repeatable
  SVG-to-SVG recipe, version or parameters. The manifest therefore records
  an authored asset with source evidence, not an invented derivation graph.
- Current extent: square 32×32 viewBox; transparent background.
- Preserve the eight-tooth ring and single wave (`#3b5660`, `#c7d1cf`).

## Missing promo

`promo-16x9.webp` remains absent. CORE-643 found no real 1600×900 producer
hero, and CORE-788 adds none. The two identity SVGs do not satisfy landscape
card, promo or social-image demand. No absent asset record or placeholder is
declared in the manifest.

## Review and boundaries

`audience: public` describes the existing public-facing identity marks.
`review: approved` carries CORE-643's documented producer taste approval;
CORE-788 does not claim a new visual review. Both declarations are separate
from operator approval of exact public bundle bytes and revisions.

This file and the manifest's source/copy evidence are internal provenance,
not implicitly approved export content. No public bundle, approval record,
consumer import, derivative receipt or reciprocal read edge is created here.
Do not mine consumer crops as producer originals, replace these SVGs with
embedded rasters, recolor the marks, or recut the existing `viz/` tab chrome
as part of provenance work.
