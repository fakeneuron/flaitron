---
title: full-repo flaitron sweep
status: completed
tags: []
created: 2026-10-04
due:
related-tasks: [CORE-EPIC-711, CORE-711.4, CORE-711.5, CORE-712, CORE-711.N]
touches:
  - README.md
  - docs/VERSION-HISTORY.md
  - docs/CODEX-VERIFICATION.md
  - docs/HARNESS-SURVEY.md
  - .flaitron/screenshots/viz-board.png
  - .flaitron/PLAN.md
---

# CORE-711.9 | full-repo flaitron sweep

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-10-04 · 🔗 [[CORE-EPIC-711]] · [[CORE-711.4]] · [[CORE-712]]

## 🎯 Goal

Every tracked file — text and image — is free of live `flowtron` references outside the deliberate fences, and one canonical "formerly flowtron" note in `README.md` is the place other surfaces point to.

## ✅ Acceptance

- [x] README carries one canonical note: a one-line pointer under the tagline linking to a `### Formerly flowtron` heading in §Version that holds the rename sentence — `grep -c '^### Formerly flowtron$' README.md` = 1 and `grep -c '(#formerly-flowtron)' README.md` = 1
- [x] The surfaces that must clarify the old name point at that anchor: VERSION-HISTORY header, CODEX-VERIFICATION header, HARNESS-SURVEY header — `grep -l 'README.md#formerly-flowtron' docs/VERSION-HISTORY.md docs/CODEX-VERIFICATION.md docs/HARNESS-SURVEY.md | wc -l` = 3
- [x] README hero `.flaitron/screenshots/viz-board.png` re-captured from an isolated single-project workspace: renders flaitron, no other project names, 1440×598 — `file .flaitron/screenshots/viz-board.png` + `👁️` (image content is not grep-able)
- [x] No unfenced text `flowtron` in the tree — `git grep -il flowtron -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` prints exactly the Discovery Notes inventory (20 files, `README.md` already among them) plus this note once tracked; each added hit is the canonical note or a pointer — `judgment` on the residual list
- [x] CI drift job's local run stays green (Pair Q link/path resolution covers the new anchors) — the `drift` job's `run:` blocks under `bash -e` → 0

## 🧩 Subtasks

- [x] README: one-line note under the tagline; turn §Version's rename sentence into `### Formerly flowtron`
- [x] Pointers: VERSION-HISTORY L3 (link its existing parenthetical), CODEX-VERIFICATION + HARNESS-SURVEY headers (one sentence each)
- [x] Re-capture `viz-board.png` per CORE-383's recipe (isolated workspace symlink → `FLAITRON_VIZ_WORKSPACE`, dev server :5120, Playwright 1440×598, Completed expanded); stop the server
- [x] Residual grep + CI drift job locally

## 🔗 Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.4]] — ran the 111-file text sweep; its §Fence is the baseline this task re-checks
- [[CORE-711.5]] — GitHub + folder renames (predecessor; URL and path now final)
- [[CORE-712]] — v6.0.0 cut, blocked-by this task
- [[CORE-711.N]] — terminal audit; repeats the zero-stray grep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** .5 closed (repo URL + folder final). The text sweep in .4 left no unfenced text hit, but the image surface was never checked — the README hero screenshot still renders the old name — and the canonical transition note does not exist yet.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — `N/A`, docs + one image asset; no code

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Text inventory.** `git grep -Il -i flowtron` outside `.flaitron/tasknote/archive/` + `PLAN-ARCHIVE.md` → 20 files; no tracked filename contains `flowtron`. Every hit falls inside CORE-711.4's §Fence or the PLAN line's fence list:
- PLAN.md — open CORE-711 rows (describe the rename) + closed rows.
- CORE-712.md — another task's active note; its hits are the rename's own tag-message draft.
- VERSION-HISTORY entries; MIGRATION v5.x + v4.x recipes and the retired-skill `ft-flowtron` row; CONTEXT-BUDGET L259 + ci.yml L156 (`ft-flowtron`, a retired skill name).
- ci.yml L436/462-463 (Pair Q pre-rename resolution); step-7.1-mirror-pairs L244 (its Reads: line).
- SECURITY L180/225, `/ft-update` skill + command (pre-rename layout stop); PLATFORMS L152 ("`.flowtron/core/` before v6.0.0").
- `tools/update-adopters*` (pre-rename reads); `viz/src/parser*`, `SPEC/plan-parser.md`, `SPEC/fixtures/plan/exclusions.md` (`flowtron v5.2.0 bump` legacy fixture).
- `docs/CODEX-VERIFICATION.md` (dated CORE-677 receipt, pinned to v5.33.0 SHA `7b35a17`) and `docs/HARNESS-SURVEY.md` dated passes — .4 fenced both wholesale.

**Image inventory** (not reachable by grep; viewed each): `LOGO.webp`, `viz/public/LOGO.webp`, `viz/public/favicon.png`, `brand/*.svg` carry no wordmark. **`.flaitron/screenshots/viz-board.png` — the README hero image — renders "Flowtron — flowtron", project chip `flowtron`, "flowtron v5.14.1", 622 tasks.** Live, user-facing, and stale; the README caption beside it says "flaitron's own PLAN.md".

**Residual live-path gap.** CODEX-VERIFICATION's §Reproduce (L154-236) and §"Reproduce the fixture and prompts" are runnable recipes; their local clone path `/Users/fakeneuron/Code/flowtron` (L48, L173) stopped resolving at .5. Their `.flowtron/core` adopter paths are correct *at the pinned v5.33.0 SHA* the receipt reproduces.

**Transition note today.** README §Version (L325-330) already carries the rename sentence + MIGRATION link, but there is no single anchored note, and VERSION-HISTORY L3 / PLATFORMS L152 restate it inline with no pointer. The fenced dated docs (CODEX-VERIFICATION, HARNESS-SURVEY) have no pointer at all.

**Archive skim.** `ls archive/core/` → 912 notes; area confirmed `CORE-*` → `archive/core/` from the README table. Sibling notes CORE-711.1–.5 read: .4 is load-bearing — perl sweep (`FLOWTRON`/`Flowtron`/`flowtron` → flaitron) over 111 files, sentinels `ft-flowtron`, `.flowtron/flowtron`, `flowtron v5.2.0 bump`; §Fence items 1-4 (VERSION-HISTORY entries, CODEX-VERIFICATION + HARNESS-SURVEY dated passes, archives, MIGRATION v4 + v6 recipe names). .2 fenced the parser fixture. CORE-712's park note: .9 exists because "no full-repo sweep had run" before the cut.

**Drift check.** PLAN line matches the tree; .5 is closed. The fence list in the PLAN line omits two .4-approved fences — CODEX-VERIFICATION and HARNESS-SURVEY dated passes, and the `ft-flowtron` retired-skill name — which this task inherits rather than re-litigates. No SPEC contract touched (archive write-once honored).

**Clarifications (AskUserQuestion, 2026-10-04).**
- *Operator stance (governs every judgment call):* don't rewrite records from when the repo really was flowtron; every forward-facing document is fully rebranded; `flowtron` survives only where it clarifies the old name — **sparingly**.
- Screenshot → operator deferred to judgment → **re-capture now**: it is the README hero, forward-facing, and contradicts its own caption.
- CODEX-VERIFICATION → **pointer only**: one header line; body (incl. Reproduce clone paths) untouched.
- Transition note → **top line + anchored `### Formerly flowtron` section** in §Version; other surfaces point at the anchor.
- PLATFORMS L152 "(`.flowtron/core/` before v6.0.0)" stays — it is exactly the needed clarification (old symlink targets), and d43ad4d2 placed it deliberately. MIGRATION's v5.x section already names the old name in its heading; no pointer added there (sparing).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling — one canonical anchor + link pointers (DRY: the rename is stated once; VERSION-HISTORY's existing parenthetical became the link rather than a second statement); screenshot re-shot with CORE-383's reusable recipe

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup — `N/A`, no refactor; dated-record bodies untouched per operator stance

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown + one image asset

**Implementation Notes:**

- `README.md`: tagline gains `Formerly flowtron — [renamed in v6.0.0](#formerly-flowtron).`; §Version's rename sentence moves under a new `### Formerly flowtron` (old repo + dir names, the hard cut, "pre-rename records keep the old name", MIGRATION link).
- Pointers (one clause each, linking `../README.md#formerly-flowtron`): VERSION-HISTORY L3 (existing parenthetical linked, no new mention), HARNESS-SURVEY header, CODEX-VERIFICATION header (names that its reproduce steps use the pinned v5.33.0 checkout's paths — the operator's "pointer only" choice).
- Not touched (sparing): PLATFORMS L152 parenthetical; MIGRATION v5.x heading already names the old dir.
- `viz-board.png` re-captured: isolated workspace `<scratchpad>/viz-workspace/flaitron → ~/Code/flaitron`, `FLAITRON_VIZ_WORKSPACE=… npm --prefix viz run dev`, Playwright 1440×598, Board view, Completed expanded (List view was rejected — it auto-expands CORE-EPIC-711, whose open rows quote `flowtron` paths). Result: "Flaitron — flaitron", 1242 tasks, single project chip, 71,733 B (was 64 KB). Drafts kept outside the repo in `~/Code/_screenshots/flaitron/`. Server stopped, browser closed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, markdown + image; CI drift job stands in (below)

- [x] Ran lint/type-check on changed code — `git diff --check` → clean

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — asked at the 📦 gate for the re-captured hero image (no UI code changed)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipts:
- `grep -c '^### Formerly flowtron$' README.md` → 1; `grep -c '(#formerly-flowtron)' README.md` → 1
- `grep -l 'README.md#formerly-flowtron' docs/VERSION-HISTORY.md docs/CODEX-VERIFICATION.md docs/HARNESS-SURVEY.md | wc -l` → 3
- `file .flaitron/screenshots/viz-board.png` → PNG 1440 x 598; content viewed (Flaitron — flaitron, single project chip, no `flowtron` text) → 👁️ at the gate
- `git grep -il flowtron -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md' | wc -l` → 20, same set as the Discovery inventory; `git diff -U0` added `flowtron` lines are only the README note + three pointers
- CI `drift` job, 15 `run: |` blocks extracted from `ci.yml` and run under `bash -e` → 0 each (Pair Q resolves the new anchors)
- `git diff --check` → clean

Structural quality: no code; no duplication (the rename is stated once, other surfaces link to it).

External review (`/code-review medium`): the reviewer read `origin/main...HEAD` + working tree, which is wider than this task's diff. Graded against Acceptance:
- **note** — CORE-712's PLAN row `Blocked by [[CORE-711.5]] + [[CORE-711.9]]` and its frontmatter `blocked-by:` still list CORE-711.5 (closed), so viz shows a stale blocked chip. The text came from earlier commits, not this diff. SPEC/blocked.md §"Re-scope to blocked" lets a blocker's own closure strike its wikilink *on operator confirmation* → queued as an in-📦 prompt (strike both, since this closure clears the last blocker).
- The reviewer confirmed the anchor, the three pointers, and the acceptance counts.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** The full-repo scan found no unfenced text `flowtron`: CORE-711.4's 111-file sweep plus .2/.3 already covered it, and all 20 residual files are deliberate fences. The one live miss was an image that grep can't see. The README hero `viz-board.png` still rendered "Flowtron — flowtron v5.14.1"; it was re-captured on flaitron. Added the canonical README note (tagline line + `### Formerly flowtron` in §Version) and linked VERSION-HISTORY, CODEX-VERIFICATION and HARNESS-SURVEY to it. Six paths changed, about +16/−5 markdown lines plus one PNG (64 → 72 KB).

Doc-drift sweep: `README.md` — updated (this task). `AGENTS.md`, `SPEC.md`, the four snippets, `docs/CONVENTIONS.md` (its §"Version" cite concerns tag notes, which are still in place), `CONTRIBUTING.md`, `SECURITY.md` (fenced migrate bullets), `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md` (L152 parenthetical kept as needed clarification), `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (no stable-surface row moved → no caller row), `docs/WORKTREES.md`, `docs/VISION.md`, `docs/MIGRATION.md` (fenced recipes) — no change.

`touches:` reconciliation: `git diff --name-only` = README, CODEX-VERIFICATION, HARNESS-SURVEY, VERSION-HISTORY, viz-board.png, PLAN.md, all declared; plus this tasknote. If the operator confirms the CORE-712 blocker strike at the 📦 gate, `.flaitron/tasknote/CORE-712.md` is the one undeclared path.

Learnings: the image surface is never covered by a text sweep. CORE-711.N's zero-stray grep should also view the tracked images (5 files). That belongs on the .N audit, not the always-loaded layer, so it is recorded here for .N to pick up.

**Archived:** 2026-10-04
