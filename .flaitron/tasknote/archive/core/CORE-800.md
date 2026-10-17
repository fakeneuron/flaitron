---
title: brand-chamber-reference
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: [CORE-788]
touches:
  - brand/assets.json
  - brand/PROMPTS.md
  - brand/README.md
  - brand/chamber-reference.jpg
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-800 | brand-chamber-reference

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-788]]

## 🎯 Goal

Generate Flaitron's 16:9 `chamber-reference`, record `origin: generated` and the prompt, and declare the asset at review draft so a person can confirm `in-review` → `approved`.

## ✅ Acceptance

- [x] The raster is png, jpeg, or webp, at least 1280×720, and an exact 16:9 ratio (`width * 9 == height * 16`) — `python3 -c` dimension check on `brand/chamber-reference.jpg`
- [x] `brand/PROMPTS.md` records `origin: generated` and the prompt used for this asset, and says this file is not `promo-16x9.webp` — `grep -n 'origin: generated' brand/PROMPTS.md`
- [x] `brand/assets.json` is schema 2, keeps project id `a7118fc2-2807-4b01-b316-80d562dfe195`, and declares `chamber-reference` with role `visual-reference` — `python3` JSON check
- [x] Before the person's confirm, that asset's review state is `draft`; after confirm it is `approved` — `python3` JSON check of `review.state`
- [x] `symbol` and `favicon` stay the same paths and stay taste-approved; only their review field becomes the v2 object dated 2026-09-21 — `python3` JSON check
- [x] A filled `in-review` → `approved` transition checks clean — `bash ~/Code/natabula/scripts/brand-workflow.sh transition <file>`
- [x] The manifest validates against committed bytes — `bash ~/Code/natabula/scripts/validate-brand.sh` on an isolated snapshot, then on the closure SHA
- [x] A person confirms the pixels — `👁️` (producer taste; the checker cannot decide it)

## 🧩 Subtasks

- [x] Generate a 16:9 still from the existing mark; keep it only when the ratio and minimum size hold, with no crop and no upscale
- [x] Record `origin: generated` and the prompt in `brand/PROMPTS.md`
- [x] Opt `brand/assets.json` into schema 2 and declare `chamber-reference` at review `draft`
- [x] Point `brand/README.md` at the v2 manifest and state that this still is not the missing promo
- [x] Check the approval transition, then ask the person to confirm before `approved`
- [x] Validate a committed snapshot

## 🔗 Related

- [[CORE-788]] — related-decision: v1 manifest and provenance this asset extends
- fakeneuron FE-127 — consumer import, blocked on this approval and on blastimage CORE-012

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The kit has no `visual-reference`, and fakeneuron FE-127 is blocked on this producer asset. The line matches that gap.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Area is `archive/core/` per the README table. The only archive hit for `brand/assets.json` / `brand/PROMPTS.md` is CORE-788 (brand-pilot-provenance, archived 2026-10-14). Its Related notes (CORE-643, CORE-329.3, CORE-632.2, CORE-711.4) are the mark's source chain, already summarized in `brand/PROMPTS.md`. CORE-643's visual confirm is archived 2026-09-21. No superseded-claim pointer on CORE-788. No `chamber-reference` tasknote exists.

Natabula `templates/brand/profiles-v1.json` profile `chamber-reference`: role `visual-reference`, png/jpeg/webp, fit `minimum-ratio`, 1280×720, exact 16:9 (`width * 720 == height * 1280`). No tunnel crop. `templates/brand/README.md` says new pixels start at asset review `draft`, the prompt lives in `brand/PROMPTS.md`, and a person confirms before `in-review` → `approved`. The checker is `scripts/brand-workflow.sh transition` and writes nothing. The example the PLAN names is `templates/brand/examples/visual-reference-approval.json`.

Manifest v1 stores review as `pending` | `approved`. `pending` normalizes to `draft` and cannot store `in-review`. Schema v2 replaces that string with `review: {state, updated_on, evidence_paths}`. Readers already accept v2; nothing auto-rewrites a producer file. This task opts in so the declared state can be `draft`. `marketing_readiness` stays omitted. Project UUID and the two mark IDs stay. Their approved taste moves into a v2 object dated 2026-09-21 with evidence `.flaitron/tasknote/archive/core/CORE-643.md`.

`validate-brand.sh` reads committed blobs only. Preflight uses an isolated snapshot, same as CORE-788. `image_edit` on the square mark would keep a square frame, so the still is a new 16:9 generation anchored on that mark. File-level `PROMPTS.md` `origin: mined` stays the identity-kit recovery; the new section carries `origin: generated`.

No clarifications needed. Assumptions: the subject is Flaitron's own mark in a dark 16:9 chamber, not a Fakeneuron tunnel; `audience` is `public` because the consumer presents it, and taste approval does not set that field; the raster is kept at the generator's type and size when the ratio holds; the transition JSON is a check file, not a kit file; `promo-16x9.webp` stays absent; `approved` is not written until the person confirms the pixels.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the CORE-788 manifest, `PROMPTS.md`, and brand README. No new schema or tool in this repo. Schema v2 is required so `review.state` can be `draft`; `marketing_readiness` stays omitted. Symbol and favicon paths are unchanged. Their review strings became v2 objects, `approved`, dated 2026-09-21, evidenced by the CORE-643 note.

The still is `brand/chamber-reference.jpg`, 1280×720 JPEG. The operator kept the portal direction and asked for the digital chamber inside the fleshy tunnel. The 2026-10-16 pass was cyan holographic schematics in the round opening, with the mark as a loose wave-gear and a screen-headed rider in scan light. The mist pass and the literal badge were set aside. The logo raster was not an image input. `brand/logo.svg` is not the source.

2026-10-17, from the blastimage CORE-012 session: the operator liked the chamber and asked for flaitron's hologram to be growth and structure, an idea becoming an actuated project. That pass replaces the gear still. Image input was blastimage's chamber, for the tunnel and the green ring. `source_paths` is empty. Review stays `draft`, updated 2026-10-17. The receipt below is for the 2026-10-16 gear still. Tests: N/A, no executable behavior. The Natabula validator is the check.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted suite: N/A, no executable behavior. Structural check: the diff adds one asset and the v2 review object the schema requires. No dead code. README now names schema v2 and says the still is not the missing promo.

The receipt below replaces the earlier one. Snapshot `06312dd` belonged to the first still and was discarded.

```text
python3 JPEG SOF + JSON assertions on brand/chamber-reference.jpg and brand/assets.json → 0
    jpeg 1280 720, review draft, three assets
grep -n 'origin: generated' brand/PROMPTS.md → 0
    72:- origin: generated
bash ~/Code/natabula/scripts/brand-workflow.sh transition /tmp/core-800-approve.json → 0
    {"axis":"asset-review","kind":"transition","ok":true,"to":"approved"}
bash ~/Code/natabula/scripts/validate-brand.sh /tmp/core-800-snap → 0
    status valid, manifest_valid true, three assets valid, findings empty
    snapshot e36f353e66ba1e69973e4f4d4ff72454342b56b5
    chamber review draft updated_on 2026-10-16
bash tools/drift-checks.sh → 0
```

The transition document checks the shape only. The manifest stays `draft` until the person confirms. Closure-SHA validation waits for that commit. Changed-code duplication / dead code / stale docs: N/A, no code.

2026-10-17 growth still, after the gear pass above. Same dimensions. `source_paths` is now empty. Review `updated_on` is 2026-10-17.

```text
python3 JPEG SOF on brand/chamber-reference.jpg → 0
    jpeg 1280 720, width*9 == height*16, 234812 bytes
bash ~/Code/natabula/scripts/validate-brand.sh /tmp/flaitron-core-800.VyDSvr/producer --revision 89c7c30330c231eda48b272a9b101d0ff04a830a → 0
    status valid, manifest_valid true, three assets valid, findings empty
```

That snapshot is not product history.

2026-10-17 confirm. The person said the digital chamber was good, then chose it over the growth scaffold that had replaced the file. The shipped bytes are the 2026-10-16 digital chamber again. Review is `approved`.

```text
python3 JPEG SOF + JSON assertions → 0
    jpeg 1280 720, review approved, updated_on 2026-10-17
    symbol and favicon approved 2026-09-21
grep -n 'origin: generated' brand/PROMPTS.md → 0
    72:- origin: generated
bash ~/Code/natabula/scripts/brand-workflow.sh transition /tmp/core-800-approve.json → 0
    {"axis":"asset-review","kind":"transition","ok":true,"to":"approved"}
bash ~/Code/natabula/scripts/validate-brand.sh /tmp/core-800-snap → 0
    status valid, manifest_valid true, three assets valid, findings empty
    snapshot c11f4eddf0f32cb7a298fc739b57ad2e4f71a2b5
    chamber review approved
bash tools/drift-checks.sh → 0
```

Closure-SHA validation runs on the closure commit after this note is archived.

External review (read-only probe, not the author): blockers none. Note — `brand/README.md` still said every record declares SVG viewBox dimensions. Fixed in place: dimensions are an SVG viewBox or raster pixels. That note does not reopen a phase. The probe did not run the transition checker or the committed-byte validator; this session did, and both exited 0. Pixel taste was left for the person.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift: no change. The sweep set was not edited. The brand kit sits outside that list.

Learnings: N/A.

**Final Summary:**

Flaitron now has a 16:9 chamber reference: a digital hologram inside a fleshy tunnel. The person confirmed that still on 2026-10-17 and chose it over a later growth scaffold. Review is `approved`. That is producer taste, not export approval.

Changed: `brand/chamber-reference.jpg` (new, 1280×720 JPEG), `brand/assets.json` (schema 2; symbol and favicon stay approved, dated 2026-09-21; chamber-reference approved 2026-10-17), `brand/PROMPTS.md` (origin generated and the prompt), `brand/README.md` (v2 manifest; this still is not the missing promo). No refactor. Verification is the Phase 3 receipt, including snapshot `c11f4edd`. Doc-drift: no change. Declared 4 files, changed 4. Undeclared: none. The kit gains one uncounted visual reference. `promo-16x9.webp` stays absent.

**Archived:** 2026-10-17
