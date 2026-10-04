---
title: brand-kit-back-port
status: completed
tags: [brand]
created: 2026-09-20
due:
related-tasks: [NAT-306]
touches:
  - brand/BRAND.md
  - brand/logo.svg
  - brand/favicon.svg
  - brand/README.md
---

# CORE-643 | brand-kit-back-port

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[NAT-306]]

## 🎯 Goal

Give flowtron a standard `brand/` identity kit (logo.svg + favicon.svg + filled BRAND.md, copying natabula's README) sourced from the existing producer mark (`LOGO.webp`), not the site's lens copy.

## ✅ Acceptance

- [x] `brand/README.md` and `brand/BRAND.md` present, copied from natabula's `templates/brand/` — `test -f brand/README.md && test -f brand/BRAND.md`
- [x] `BRAND.md` front-matter fully filled (`tagline` ≤8 words, `one_liner` ≤25 words, `description` ≤80 words), public-safe, fact-checked against (not copied from) the site's art-piece card copy — `judgment`: word counts verified mechanically (5/20/74, all under cap); content fact-checked against fakeneuron.com's live Flowtron card copy (fetched during Execution) and written in flowtron's own voice, not pasted
- [x] `brand/logo.svg` present, no embedded raster, legible at 32 px — `test -f brand/logo.svg && ! grep -q '<image' brand/logo.svg`; legibility at 32 px `👁️` confirmed by the user
- [x] `brand/favicon.svg` present, square viewBox, reads at 16 px — `test -f brand/favicon.svg && ! grep -q '<image' brand/favicon.svg`; square + 16 px legibility `👁️` confirmed by the user
- [x] `brand/promo-16x9.webp` added only if a real 1600×900 asset exists in-repo — `judgment`: no such asset was found in-repo (Discovery's `find`, re-confirmed unchanged during Execution); correctly omitted
- [x] Neither `LOGO.webp` copy deleted, `viz/` favicon chrome untouched — `git diff --name-only | grep -E '^(LOGO\.webp|viz/public/favicon)'` → no match

## 🧩 Subtasks

- [x] Copy `templates/brand/{BRAND.md,README.md}` from `~/Code/natabula` into `flowtron/brand/`
- [x] Draw `brand/logo.svg`: simplified gear-ring + wave-spoke silhouette with a simplified astronaut/surfer mark, sourced from `LOGO.webp`; no embedded raster; check legibility at 32 px
- [x] Draw `brand/favicon.svg`: square-cropped, further-simplified derivative of `logo.svg`; check legibility at 16 px
- [x] Fill `BRAND.md` front-matter (`tagline`/`one_liner`/`description`), public-safe, fact-checked against fakeneuron.com's flowtron card copy without copying its art-piece voice
- [x] Confirm no real 1600×900 promo still exists before skipping `brand/promo-16x9.webp`
- [x] 👁️ CONFIRM the two SVGs with the user at both target sizes before closing

## 🔗 Related

- [[NAT-306]] — natabula featured-set index; flowtron's brand kit fills a gap it flagged

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Matches PLAN.md line and starter context exactly; no scope change surfaced.

- [x] Read relevant source files — read `LOGO.webp` and `viz/public/LOGO.webp` (image content), natabula's `templates/brand/{BRAND.md,README.md}`, and confirmed `brand/` does not yet exist in this repo.

- [x] **Best Practices Review** — `N/A`: this is asset/content creation into a brand-new, self-contained `brand/` directory (natabula's fixed four-file kit shape), not a code-module change. No existing abstraction to extend, no dependency direction to reconcile.

- [x] **Archive skim** — `grep -l "brand/"` across `archive/core/*.md` returned no hits (no prior tasknote actually touched `brand/`). A looser `grep -l "brand"` surfaced 6 incidental matches; spot-checked CORE-642 (mentions CORE-643's own filing during the v5.31.0 dogfood release walk — not substantive brand-kit work) and CORE-272 (unrelated symlink discussion). Logged as no prior tasknotes for this scope.

- [x] **Drift check** — starter's cited paths/facts all confirmed current: `LOGO.webp` (repo root) and `viz/public/LOGO.webp` are byte-identical (md5 `0ad38c97...`, both 96×96 WebP) so source-copy choice is moot; `LOGO.png` is indeed gone; no `1600×900` promo asset exists anywhere in the repo (confirmed via `find`); `brand/` does not exist yet. No drift from the starter's captured context.

- [x] Asked clarifying questions — used AskUserQuestion on the one open item the starter flagged ("Open at promotion: Trace vs redraw for SVG"). **Decision: simplified redraw** — keep the gear-ring + wave-spoke silhouette as the core mark; simplify the astronaut/surfer to a clean, legible silhouette rather than a literal trace, since the source is only 96×96 and the fine detail won't survive at 16 px favicon / 32 px logo size. The starter's second open item (recutting `viz/public/favicon.png` from `brand/favicon.svg`) was explicitly marked "separate, optional" by the starter itself — treating it as out of scope for this task, consistent with the starter's own "Explicitly out of scope: Rewriting `viz/` favicon chrome."

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (already declared at scaffold time; unchanged)

**Discovery Notes:**

Starter context (filed 2026-09-20, absorbed above) drove this Discovery with no surprises. Source mark: `LOGO.webp`, 96×96 WebP, a gear/cog ring with wave-like radiating spokes containing a small astronaut/robot on a surfboard — matches natabula's flowtron card art direction. `viz/public/LOGO.webp` is a byte-identical copy, so "pick the better original" is moot; either can be traced from. Out-of-scope boundaries carried forward unchanged from the starter: do not touch `fakeneuron.com`'s lens copies, do not delete either `LOGO.webp` copy, do not rewrite `viz/` favicon chrome, do not invent a new mark.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended natabula's established `brand/` four-file kit shape verbatim (`README.md`/`BRAND.md` copied from the canonical template, `logo.svg`/`favicon.svg` added per its stated minimums); no new abstraction introduced.

- [x] **Minimal refactor gate** — `N/A`: no existing code touched; pure asset/content addition into a new directory.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: static markdown + SVG assets, no test surface.

**Implementation Notes:**

- Copied `README.md` and `BRAND.md` from `~/Code/natabula/templates/brand/`. Note: natabula's `templates/brand/README.md` had an uncommitted local edit (adding a `PROMPTS.md` provenance-file convention) at the moment I first read it; by the time I copied it, that edit had been committed upstream (confirmed via `git -C ~/Code/natabula status` going from dirty to clean between reads — a concurrent natabula session landed it mid-task). Re-pulled from `git show HEAD` to confirm the copied content matches the committed version, not a stale in-flight edit. `PROMPTS.md` itself is optional ("yours to add when the kit is filled") and wasn't in this task's declared `touches:` scope, so it was not added — flagging as a possible small follow-up, not done here.
- Fetched fakeneuron.com's live Flowtron project card (WebFetch) to fact-check `BRAND.md` copy against the public-facing description already in use, per the starter's instruction to fact-check without pasting the site's art-piece voice.
- `logo.svg` / `favicon.svg`: generated gear-ring path geometry with a small Python script (even-tooth gear polygon + inner-hole circle, combined via `fill-rule="evenodd"`) rather than hand-eyeballing coordinates, for a mechanically regular tooth spacing. Sampled the source `LOGO.webp`'s dominant colors (ImageMagick `-unique-colors`) to keep the redrawn mark's teal palette consistent with the original (`#3b5660` primary). Per the "simplified redraw" decision: `logo.svg` keeps the gear ring + 3 wave lines + a simplified surfer silhouette; `favicon.svg` drops the surfer entirely and uses a single bolder wave accent, on an 8-tooth (vs. 12-tooth) gear for cleaner legibility at 16 px.
- Self-verification tooling note: this machine's ImageMagick had no `rsvg-convert` delegate installed, so it silently fell back to ImageMagick's limited built-in MSVG renderer, which failed to render stroked (`fill="none"`) paths at all — a renderer bug, not an SVG-authoring bug. Installed `librsvg` via Homebrew (`brew install librsvg`, a local reversible dev-tool install) to get spec-accurate rendering before self-checking or asking for 👁️ confirmation.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no test surface (static assets/markdown); substituted `xmllint --noout` on both SVGs for well-formedness.

- [x] Ran lint/type-check on changed code — `N/A`: no JS/TS touched; not in `viz/` scope, so `npm --prefix viz` lint/typecheck don't apply. Checked `.editorconfig` conventions by hand (final newline, no trailing whitespace) on all four new files instead.

- [x] **Verification receipt** — see Testing Notes below for the command → exit-code table. No duplication, dead code, or stray complexity: each file is exactly the kit shape natabula's README specifies, nothing more.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — asked with both SVGs rendered at full size and at their true target sizes (32 px logo, 16 px favicon); user replied "good proceed".

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (Acceptance → command → exit code):

- `test -f brand/README.md && test -f brand/BRAND.md` → 0
- `test -f brand/logo.svg && ! grep -q '<image' brand/logo.svg` → 0
- `test -f brand/favicon.svg && ! grep -q '<image' brand/favicon.svg` → 0
- `git diff --name-only | grep -E '^(LOGO\.webp|viz/public/favicon)'` → 1 (no match, as required)
- `xmllint --noout brand/logo.svg` → 0
- `xmllint --noout brand/favicon.svg` → 0
- Word counts (`tagline`/`one_liner`/`description`): 5 / 20 / 74 words — all under the 8 / 25 / 80 caps
- `find . -iname "*1600*900*" -o -iname "*promo*"` (repo-wide, re-checked at Execution) → no real asset hit, confirming the promo-asset omission

All four new files end with a final newline and have no trailing whitespace (`.editorconfig` compliance, checked by hand).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked the full `.flowtron/tasknote/README.md` §"AI-referenced docs" list: **no change** across all entries. This task adds only content/asset files under a brand-new `brand/` directory (no `.claude/`, `SPEC*`, workflow-contract, or platform-wiring surface touched), so none of `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, or `docs/VISION.md` reference anything this diff touched.

- [x] Closed — every `## ✅ Acceptance` criterion ticked above; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and moved to `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Added flowtron's `brand/` identity kit: `README.md` + `BRAND.md` copied verbatim from natabula's canonical `templates/brand/` (both filled, `BRAND.md` front-matter fact-checked against fakeneuron.com's live Flowtron card copy, word counts 5/20/74 against 8/25/80 caps), plus two newly authored SVGs — `logo.svg` (16 lines) and `favicon.svg` (10 lines) — a simplified gear-ring + wave-spoke mark redrawn from the existing 96×96 `LOGO.webp` producer mark, per the user's "simplified redraw" call (👁️ confirmed at both 32 px and 16 px target sizes). No `promo-16x9.webp`: no real 1600×900 asset exists in-repo, confirmed twice (Discovery + Execution).

Verification: all Acceptance verify commands passed (receipt in Phase 3 Testing Notes); both SVGs are well-formed XML (`xmllint --noout`); no embedded raster in either SVG; `git diff --name-only` confirms neither `LOGO.webp` copy nor `viz/` favicon chrome was touched.

Refactors: none — pure addition into a brand-new, self-contained directory; nothing existing was touched or needed restructuring.

Documentation verdict: doc-drift sweep found no drift (see above) — this is a content-only addition with no contract surface.

`touches:` scope reconciliation: declared `brand/BRAND.md`, `brand/logo.svg`, `brand/favicon.svg`, `brand/README.md` — matches `git diff --name-only` / untracked-file list exactly (plus this tasknote's own edits). No undeclared paths.

Maintainability effect: closes the 0/4 brand-kit gap `natabula-fleet-audit` and `/natabula-layer-drift` were flagging for flowtron; future automation reading `brand/` now finds a complete kit. Deliberately deferred (not done here, out of this task's declared scope): recutting `viz/public/favicon.png` from `brand/favicon.svg`, and adding an optional `PROMPTS.md` provenance file (natabula's template now documents this convention — landed upstream mid-task, see Implementation Notes) — both are cheap, separate follow-ups if wanted.

**Archived:** 2026-09-21
