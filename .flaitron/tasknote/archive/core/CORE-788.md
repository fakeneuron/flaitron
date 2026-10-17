---
title: brand-pilot-provenance
status: completed
tags: [brand]
created: 2026-10-14
due:
related-tasks: [CORE-643, CORE-329.3, CORE-632.2, CORE-711.4, NAT-415.5]
touches:
  - brand/assets.json
  - brand/PROMPTS.md
  - brand/README.md

---

# CORE-788 | brand-pilot-provenance

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-643]] [[NAT-415.5]]

## 🎯 Goal

Declare the existing Flaitron brand kit with stable identity, committed copy evidence and truthful mark provenance for NAT-415.5, preserving artwork and missing promo without approving public export.

## ✅ Acceptance

- [x] Manifest v1 has a newly allocated immutable UUID, exactly the two existing SVG records with truthful roles/dimensions/review/provenance, three committed copy-evidence lists, and valid referenced bytes — Project-20 `validate-brand.sh <isolated committed snapshot>` before closure and `validate-brand.sh . --revision <closure-sha>` afterward.
- [x] Existing BRAND copy, SVG pixels, root/viz source images and tab chrome are byte-preserved; promo stays absent — `python3 /private/tmp/core-788-verify.py <snapshot> <base-sha>`.
- [x] PROMPTS reconstructs the documented redraw/source chain, records unrecovered original prompt/model and geometry-script unknowns honestly, and distinguishes producer review from export permission — `judgment`: compare git history and CORE-643/329.3/632.2/711.4 records.
- [x] The pinned NAT-415.5 evidence pilot reports a valid 3/4 kit, two valid declared assets, evidenced copy and missing landscape/social coverage, with no export/approval/consumer claims — `python3 /private/tmp/core-788-pilot.py <snapshot>`.
- [x] Brand README documents identity stability, uncounted opt-in files, current missing promo and committed-input validation without reinstating removed private coupling — `judgment`; `bash tools/drift-checks.sh`.


## 🧩 Subtasks

- [x] Reconstruct mark provenance from committed history; write detailed notes and a v1 manifest without altering the assets.
- [x] Update the self-contained brand README with declaration and validation boundaries.
- [x] Validate an isolated committed snapshot using Project-20's pinned runtime, check evidence/coverage and byte preservation, and obtain external review.
- [x] Sweep docs, close atomically and validate the final producer commit for the existing NAT-415.5 pilot.


## 🔗 Related

- [[CORE-643]] — original SVG redraw and visual confirmation.
- [[CORE-329.3]] — source PNG adoption and WebP conversion.
- [[CORE-632.2]] — root WebP reuse and PNG removal.
- [[CORE-711.4]] — Flaitron rename, SVG accessible-label change only.
- [[NAT-415.5]] — existing HQ pilot owns later exact export approval and consumer receipts.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — Medium, [heavy], no unattended marker; active model satisfies the category.
- [x] **Relevance Assessment** — **Verdict:** Proceed. **Rationale:** The existing 3/4 kit has neither manifest nor detailed provenance; this matches the routed NAT-415.5 prerequisite.
- [x] Read relevant source files — brand kit, root/viz images' history, Project-20 DESIGN-STANDARDS manifest section, schema/example, validator, inventory and parked NAT-415.5 receipts. Project-20 tool revision: a78a1d9562f8aafb6c6c9a7b1c746d76f895c4cc; its dirty pilot note is read-only input, left untouched.
- [x] **Best Practices Review** — N/A for code/module boundaries. Extend the existing producer contract; keep copy in BRAND, provenance in PROMPTS, and machine declarations in assets.json. Reuse HQ validation without depositing a new Flaitron schema/tool.
- [x] **Archive skim** — README resolves CORE to archive/core. Read CORE-643, CORE-329.3 and CORE-632.2; targeted CORE-652.2/711.4/724.6 sections preserve the self-contained README and rename history. No factual correction to archived notes.
- [x] **Drift check** — existing logo/favicon are 64×64/32×32 viewBoxes, renamed aria-label only since the redraw. BRAND has 5/21/75 words under current parsing, not the historical pre-rename count. Promo remains absent. Current SPEC scope boundaries forbid implementing HQ or consumer work here.
- [x] No clarifications needed — retain copy/artwork, use documented prior visual approval for producer review, record unrecovered source-generation details as unknown, omit unsupported optional public metadata/URLs. Hand-authored SVG redraws are authored records with source references; no fictional repeatable derivation recipe. Exact export approval remains NAT-415.5's separate operator decision.
- [x] Subtasks above populated; YAML touches declared.

**Discovery Notes:**

CORE-329.3 adopted a supplied 705×705 PNG and generated the 96×96 WebP; CORE-632.2 copied that WebP to root and removed the PNG; CORE-643 authored simplified SVG redraws using that source and records the operator's “good proceed” at 32/16 px. CORE-711.4 changed accessible labels to Flaitron without changing geometry. The old raster's original creator/model/prompt is not established by those records. CORE-724.6 removed private HQ pointers from the kit: retain that decision rather than copy the current HQ README wholesale.

Validation reads committed bytes only. Before closure use a disposable local Git snapshot under /private/tmp with the exact producer tree plus declared deliverables; record that as preflight, then validate the real atomic closure SHA. The existing HQ pilot and Fakeneuron FE-122.1 already own the later approval/import/receipt work; no new downstream task is needed. No scope deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — adapted HQ assets.example.json/schema; detailed PROMPTS follows the existing uncounted provenance convention; README remains self-contained.
- [x] **Minimal refactor gate** — N/A, static declaration/docs only. No producer asset rewrite, consumer/HQ edit, schema deposit or new repo tool.
- [x] Implemented the minimal solution.
- [x] Updated/added tests for non-trivial behavior — N/A, no executable behavior added. Used the existing committed-byte validator/inventory plus disposable preservation/coverage assertions.

**Implementation Notes:**

Allocated project UUID `a7118fc2-2807-4b01-b316-80d562dfe195` once. Asset IDs `symbol` and `favicon`; 64×64/32×32 SVG viewBoxes, default/transparent, public audience, prior approved producer review. Authored source references point to committed LOGO.webp and CORE-643; PROMPTS documents why no repeatable derivation recipe is asserted. No optional state/URL declarations or promo record. Copy evidence for every field is README.md + SPEC.md, which support the workflow description; evidence is not automatic semantic proof or export permission.

Preflight uses isolated producer snapshot `4ceeffdaea698c4b4de0c240aad533ecb155a994` based on entry SHA `a5806a9e9ffea78932d54405e7ae7988d8b6a9d3`. Tool files were extracted from Project-20 commit `a78a1d9562f8aafb6c6c9a7b1c746d76f895c4cc` into `/private/tmp/core-788-rfi4u0sc/project-20`; no HQ writes. The snapshot is a local test artifact, not a real public/export/consumer receipt. Real producer SHA is the atomic closure commit containing this note.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — existing HQ validation plus pilot and preservation assertions; no new code/test suite surface.
- [x] Ran lint/type-check on changed code — N/A for JS/TS; git whitespace and all repository drift checks passed.
- [x] **Verification receipt** — recorded below; no executable code, duplicated blurbs or public-surface tooling added.
- [x] **External review** — read-only non-author probe returned no blockers and no notes. Independently checked preserved bytes, schema, source paths and history; deliverables match the committed preflight snapshot byte-for-byte. Relied on recorded HQ runtime receipts (local bare Python lacked jsonschema); final closure SHA validation follows in the same turn. No new visual/export/consumer review claimed.
- [x] (frontend) Visual confirmation — N/A, no pixels or rendered UI changed; prior producer confirmation is documented, not repeated.

**Testing Notes:**

Receipt (pinned tool directory abbreviated below as `/private/tmp/core-788-rfi4u0sc/project-20`, producer snapshot as `/private/tmp/core-788-rfi4u0sc/producer`):

- `bash /private/tmp/core-788-rfi4u0sc/project-20/scripts/validate-brand.sh /private/tmp/core-788-rfi4u0sc/producer` → 2 initially, uv cache access denied by sandbox. Re-ran the wrapper's exact uv invocation with approved cache access.
- `uv run --no-project --with-requirements /private/tmp/core-788-rfi4u0sc/project-20/scripts/brand-requirements.txt python /private/tmp/core-788-rfi4u0sc/project-20/scripts/validate-brand.py /private/tmp/core-788-rfi4u0sc/producer` → 0; valid manifest, both assets valid, no findings.
- `python3 /private/tmp/core-788-verify.py /private/tmp/core-788-rfi4u0sc/producer a5806a9e9ffea78932d54405e7ae7988d8b6a9d3` → 0; compares preserved files against base Git blobs, identical root/viz WebP, no promo, changed paths restricted to declared deliverables/workflow.
- `uv run --no-project --with-requirements /private/tmp/core-788-rfi4u0sc/project-20/scripts/brand-requirements.txt python /private/tmp/core-788-pilot.py /private/tmp/core-788-rfi4u0sc/producer` → 0; asserts inventory validation, two asset hashes/fingerprints, evidenced copy, baseline 3/4, all profiles missing (not undeclared/available). Temporary helpers are verification artifacts, not shipped Flaitron tools.
- `bash tools/drift-checks.sh` → 0 (all checks).
- `git diff --check` → 0.
- Provenance judgment: notes agree with the committed source/adoption/redraw/rename chain and the known unknowns. README judgment: opt-in identity/presence/validation/review boundaries agree with HQ v1, while retaining CORE-724.6's self-contained public-kit decision.

Pilot receipt at preflight SHA: kit valid; copy word counts 5/21/75 under 8/25/80; each copy field has two hashed evidence files, a fingerprint and `semantic_freshness: unknown`. Symbol SHA-256 `72d08899fc5d614ce2cad1c0352631d0ef4ce50654bcc81db2405507e15def16`; favicon SHA-256 `19e27f7201f42a90f01afe3dea15778467cf9b278319d7a67adefce2c22d4637`. Both asset fingerprints nonnull. `card-landscape`, `promo-landscape`, `social-og`: missing, no qualifying asset IDs. No bundle selection/digest/approval/export/import or reciprocal new read-edge receipt asserted. Existing NAT-415.5 and FE-122.1 own that later work.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below. No changed workflow contract, template, tool, platform wiring, stable caller surface, public copy or pixels.

  | Doc | Verdict |
  |---|---|
  | README.md | No change — workflow overview and root logo preserved. |
  | AGENTS.md | No change — no new repo validation tool or workflow requirement. |
  | SPEC.md | No change — brand declaration is producer content, not tasknote schema/runtime. |
  | docs/MIGRATION.md | No change — no adoption or upgrade motion changed. |
  | claude/AGENTS-snippet.md | No change — adopter workflow untouched. |
  | codex/AGENTS-snippet.md | No change — wiring untouched. |
  | cursor/AGENTS-snippet.md | No change — wiring untouched. |
  | grok/AGENTS-snippet.md | No change — wiring untouched. |
  | docs/CONVENTIONS.md | No change — conventions and CI roster untouched. |
  | CONTRIBUTING.md | No change — contributor process untouched. |
  | SECURITY.md | No change — no new workflow tool or integration. |
  | docs/AGENT-NEUTRALITY.md | No change — no agent-specific contract introduced. |
  | docs/PLATFORMS.md | No change — platform layer untouched. |
  | claude/CAPABILITIES.md | No change — no capability or release change. |
  | docs/AGENT-COMPAT.md | No change — agent compatibility untouched. |
  | docs/EXTERNAL-AGENTS.md | No change — no stable caller surface moved. |
  | docs/WORKTREES.md | No change — isolation convention untouched. |
  | docs/VISION.md | No change — no shipped schema validator/runtime; external brand validation remains a producer-content check. |

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A, asset-specific provenance belongs in PROMPTS and this tasknote, not the always-loaded workflow guide.

**Final Summary:**

Declared Flaitron's existing brand kit with immutable producer identity and committed copy evidence; recovered source/redraw/rename provenance with original raster prompt/model and temporary geometry-script details honestly unknown. Existing copy, source images, SVGs and tab chrome remain byte-identical, promo explicitly absent, public export approval separate.

Deliverables: assets.json added (66 lines); PROMPTS.md added (81 lines); README.md +36/−2 lines. Extended the established v1 producer shape; no code refactor or deferred cleanup. Verification: pinned HQ validator, inventory/preservation assertions, all drift checks and whitespace checks passed; external review no blockers/notes. Doc sweep: each AI-referenced entry no change (table above). Declared 3 deliverable files, changed 3; undeclared: none, excluding this task's PLAN/archive writes. Maintainability effect: HQ can identify and fingerprint this valid 3/4 kit without guessing roles, copy evidence, approval or source history.

NAT-415.5 already owns subsequent exact-revision export approval and consumer/read-edge receipts; this task adds no new deferred operator step. Producer handoff: use the closure commit containing this archived note as the real source revision (`git log -1 --format=%H -- .flaitron/tasknote/archive/core/CORE-788.md`), UUID `a7118fc2-2807-4b01-b316-80d562dfe195`, symbol/favicon IDs and preserved hashes above. Validate that real revision using the pinned HQ validator; the isolated snapshot receipt is explicitly preflight, not the real producer/export receipt. The runner performs real-commit validation and the same inventory assertions immediately after landing. No public artifacts or external writes are authorized by this closure.

Proposed commit: `feat: CORE-788 — brand-pilot-provenance`. Local commit only.

**Archived:** 2026-10-14
