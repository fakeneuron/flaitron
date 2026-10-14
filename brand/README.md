# brand/

This project's public identity kit — four files with fixed names, so any
consumer can copy them without asking what they are called here.

| File | What | Minimum |
|---|---|---|
| `BRAND.md` | The blurb: `tagline` / `one_liner` / `description` front-matter + free body | Three fields filled |
| `logo.svg` | The mark, transparent ground | Legible at 32 px; no embedded raster |
| `favicon.svg` | Tab icon (optional `favicon.png` fallback, not counted) | Square; reads at 16 px |
| `promo-16x9.webp` | One hero still for cards, link previews, posts | 1600 × 900 |

`PROMPTS.md` is provenance for mined or generated assets (origin date,
optional model, per-asset source path or prompt, what not to change).
Present, **not counted** — same class as this README, never a fifth kit
file.

Only `BRAND.md` and this README are deposited by kit setup; assets and
`PROMPTS.md` are producer-owned additions. This kit has the two SVG marks
and provenance notes; `promo-16x9.webp` is explicitly absent (3/4).
Presence of the
four counted files is reported (never enforced) by an operator-side drift
tool. This README is the self-contained contract.

## Manifest v1

`assets.json` is an optional, uncounted producer declaration. This kit opts
in with one allocated UUID v4, the public display name, `copy_source` pointing
to BRAND, committed evidence paths for its three fields, and records for the
existing symbol and favicon. Copy stays in `BRAND.md`. Keep the project UUID
across renames, moves and remote changes; a distinct fork/product needs a new
UUID. Keep asset IDs stable while they identify the same marks.

Each record declares actual role, SVG viewBox dimensions, variant, background,
audience, producer review and provenance. `PROMPTS.md` explains the source
chain and honest unknowns. Optional product-state declarations and public
URLs are omitted here; omission means unknown. Paths/evidence and detailed
provenance are internal, not implicitly public export content.

Validation must read committed bytes at one resolved producer revision.
The v1 validator uses the asset schema plus committed-path, strict BRAND-copy,
media and provenance checks; JSON syntax validation alone is insufficient.
With a checkout of the tooling that supplies this contract, run:

```sh
bash /path/to/natabula/scripts/validate-brand.sh . --revision <full-commit-sha>
```

The tool requires Git, uv and Python ≥3.11, and reads its pinned parser
requirements. It reports internal findings; it does not approve or export.
Legacy consumers still read the four fixed kit paths without a manifest.
README, PROMPTS and assets.json never add baseline bits. Missing promo is
valid missing coverage, not an invitation to crop/upscale an identity SVG
or invent a hero. Public eligibility and producer taste approval remain
separate from exact-revision operator approval of a public bundle.
