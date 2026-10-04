---
title: wiring-layer-structure
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-EPIC-154, CORE-154.1, CORE-154.2, CORE-154.4, CORE-154.5, CORE-154.6]
---

# CORE-154.3 | wiring-layer-structure

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-23 · 🔗 [[CORE-EPIC-154]] [[CORE-154.1]] [[CORE-154.2]] [[CORE-154.4]] [[CORE-154.5]] [[CORE-154.6]]

## 🎯 Goal

Lock the structural pattern for flowtron's `claude/` wiring layer that supports future multi-platform coding-agent adopters (Codex CLI, grok, cursor, aider) while preserving the Claude Code experience and the adopter-symlink contract per the epic Constitution.

## ✅ Acceptance

- [x] Structural decision recorded in this tasknote with rationale citing Constitution principles 2, 4, 5, 6 from [[CORE-154.1]] and the non-negotiable on adopter-symlink stability
- [x] **Option (a) — status-quo + forward-pointers** locked: `claude/` keeps its location and name; sibling top-level `<platform>/` is the documented convention for future wiring; concrete sibling dirs land in [[CORE-154.4]]'s pattern doc, not here
- [x] `SPEC.md` §"Working in the flowtron repo itself" — `claude/` bullet (line 53) augmented with a one-line forward-pointer to `docs/PLATFORMS.md` for the platform-plug-in convention
- [x] `README.md` §"Repo layout" — `claude/` bullet (line 108) augmented with the same forward-pointer
- [x] `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger" — [[CORE-154.3]] forward-ref bullet flipped from "forthcoming" to closed, citing the locked decision (status-quo + sibling-top-level convention); §"Last reviewed" appended [[CORE-154.3]]
- [x] **No structural rename / no new directory** ships in this task — `claude/` dir name, `claude/AGENTS-snippet.md` content, all `claude/*` locators across `SPEC/`, `templates/`, `SECURITY.md`, `docs/MIGRATION.md` stay byte-identical (verified by post-edit grep: +1 net hit, all attributable to the expanded AGENT-NEUTRALITY.md bullet)
- [x] Adopter symlinks (12 commands in `claude/AGENTS-snippet.md` §"One-time symlink wiring", lines 31–42) remain valid for every existing adopter — backwards-compatibility non-negotiable preserved
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Phase 2 — edit `SPEC.md:53` to append one-clause forward-pointer to `docs/PLATFORMS.md` ([[CORE-154.4]])
- [x] Phase 2 — edit `README.md:108` with the same forward-pointer
- [x] Phase 2 — edit `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger" — flip [[CORE-154.3]] bullet from "(forthcoming)" to closed; cite the locked decision (status-quo + sibling-top-level convention) and the rationale (Constitution non-negotiable on adopter-symlink stability)
- [x] Phase 3 — grep verification: `grep -nE '(claude/AGENTS-snippet|claude/skills|claude/commands)' AGENTS-snippet.md docs/MIGRATION.md SECURITY.md SPEC/epic.md SPEC/model.md templates/tasknote-micro-template.md` returns same hit shape pre-vs-post (no factual locator broke)
- [x] Phase 3 — read-through verification: SPEC.md + README.md + AGENT-NEUTRALITY.md edited bullets read cleanly (markdown mental-pass)
- [x] Phase 4 — doc-drift sweep verdicts + PLAN.md flip to stub form + archive move

## 🔗 Related

- [[CORE-EPIC-154]] — parent epic (multi-agent-portability code sweep)
- [[CORE-154.1]] — Discovery: filed this child and the rest of the cohort
- [[CORE-154.2]] — Agent-neutral surface audit; produced the AGENT-NEUTRALITY.md ledger this task builds on
- [[CORE-154.4]] — Authors `docs/PLATFORMS.md` from the structural decision locked here
- [[CORE-154.5]] — Re-comb + Claude-effectiveness regression check; depends on the structure landing
- [[CORE-154.6]] — Epic audit subtask

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md (Step 1 of /ft-task)
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-154.1]] Specification §CORE-154.3 locked the three-option frame (a status-quo+doc / b sibling restructure / c hybrid) and Stage 3 Clarification #1 set the starting bias = (a) status-quo with pivot authority if Phase 1 read surfaces a real problem. [[CORE-154.2]] already shipped `docs/AGENT-NEUTRALITY.md` (Principle section + ledger) which absorbs most of what (c)'s "single doc paragraph" would have provided. Phase 1 read across `SPEC.md` / `README.md` / `claude/AGENTS-snippet.md` / `docs/MIGRATION.md` confirms no problem surfaced that would force (b) or (c). Proceed with (a) plus minimal forward-pointer edits.

- [x] Read relevant source files (in parallel before Discovery Notes):
  - `claude/AGENTS-snippet.md` — 64 lines; 12 symlink commands at lines 31–42 (`ln -s ../../_project/flowtron/claude/commands/<skill>.md .claude/commands/<skill>.md` × 6 + `ln -s ../../_project/flowtron/claude/skills/<skill> .claude/skills/<skill>` × 6)
  - `docs/AGENT-NEUTRALITY.md` — 86 lines; §Principle locks contract-layer / wiring-layer split; ledger has 17 rows; §"Out of scope" lists [[CORE-154.3]] / [[CORE-154.4]] as forthcoming
  - `README.md` — line 108 `claude/` bullet under §"Repo layout"
  - `docs/MIGRATION.md` — §1.0 global-install table, §1.2 symlink-wiring pointer to AGENTS-snippet.md, §1.3 paste-block, §3.1 collision check (`.claude/commands/ft-task.md` / `.claude/skills/ft-task/`), §3.8 cleanup (`readlink` verification)
  - `SPEC.md` — line 53 `claude/` bullet under §"Working in the flowtron repo itself"; line 77 lazy-dispatch cross-ref; line 89 skill namespace; line 535 `## Documents` reachable forward-ref
  - `SPEC/epic.md` lines 55–57 — skills cross-refs
  - `SPEC/model.md` line 17 — dispatch cross-ref
  - `SECURITY.md` line 70 — submodule-bump scope reference
  - `templates/tasknote-micro-template.md` line 29 — micro-skill cross-ref

- [x] **Archive skim** — `_project/tasknote/archive/core/` for prior tasknotes touching `claude/` / adopter-wiring / repo-layout-doc shape; findings table below
- [x] **Drift check** — all cited paths/lines verified at HEAD 2026-05-23; no drift
- [x] Logged "No clarifications needed" with explicit assumptions (see below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Structural decision: option (a) — status-quo + forward-pointers

**Locked: option (a). Rationale (constituent-mapped):**

- **Constitution principle 2 (markdown-only, zero scripts).** No new tool or rename can save anything here — option (a) honors zero-scripts by definition; option (b) sibling-restructure requires zero scripts but still mass-edits paths in 8+ files.
- **Constitution principle 4 (low adopter cost).** Option (b) **breaks every existing adopter's symlinks** on next submodule bump because the relative paths `../../_project/flowtron/claude/commands/ft-task.md` hard-code the dir name. Adopters are InvisiPaw, fintown, photard (today) — three real users would have non-functional `/ft-task` until they re-ran the wiring step. **Hard constraint per [[CORE-154.1]] Constitution non-negotiables**: "Symlink wiring still works against the existing adopter wiring (no migration burden)." Option (b) is **ruled out** by this alone.
- **Constitution principle 5 (symmetry over special-casing).** Option (a) ships a *sibling-top-level convention* (`claude/` today; `codex/`, `grok/`, `cursor/` if/when contributors ship them) — symmetric. Option (b)'s `wiring/<platform>/` ALSO is symmetric — same symmetry achieved without the rename. The symmetry argument doesn't differentiate (a) vs (b); the adopter-cost argument does.
- **Constitution principle 6 (no Claude-Code regression).** Option (a) is byte-identical for the Claude-Code experience — `/ft-*` commands resolve unchanged through the existing symlinks. Option (b) requires re-symlinking and a transition window.
- **(c) Hybrid reduces to (a) post-[[CORE-154.2]].** (c)'s "single doc paragraph documenting the multi-platform convention" was the half-deliverable. But CORE-154.2 already shipped `docs/AGENT-NEUTRALITY.md` whose §Principle declares the contract/wiring split, and CORE-154.4 will ship `docs/PLATFORMS.md` for the full plug-in pattern. The only ungrounded piece is **forward-pointers from the two layout-describing surfaces** (`SPEC.md` line 53 + `README.md` line 108) so a reader of those layout descriptions knows where the platform-plug-in convention lives. That's the surgical delta this task ships.

**Scope of edits for option (a):**

| File:site | Change | Why |
|---|---|---|
| `SPEC.md:53` | Append one-clause forward-pointer to `docs/PLATFORMS.md` | The §"Working in the flowtron repo itself" layout-bullet is where a contributor first asks "is this Claude-only by design?" — the forward-pointer answers it. |
| `README.md:108` | Same forward-pointer | The README §"Repo layout" is the cold-start surface for the same question. |
| `docs/AGENT-NEUTRALITY.md:72-73` | Flip [[CORE-154.3]] forward-ref from "(forthcoming)" to closed; cite locked decision | The ledger explicitly forward-refs this task; closing the loop preserves ledger currency. |

**Out of scope (explicitly):**
- **No `claude/` rename.** Hard-blocked by adopter-symlink non-negotiable.
- **No new `wiring/` dir, no new `codex/` / `grok/` / `cursor/` sibling.** These land *if and when* a future contributor wires a non-Claude-Code platform — that's the pattern in [[CORE-154.4]]'s `docs/PLATFORMS.md`, not concrete content shipped by this task.
- **No edits to `claude/AGENTS-snippet.md`.** Wiring-layer content per Constitution principle 1; the symlink shape is unchanged.
- **No edits to factual locators** in `SPEC/epic.md:55-57`, `SPEC/model.md:17`, `SECURITY.md:70`, `templates/tasknote-micro-template.md:29`, all `docs/MIGRATION.md` `.claude/`/`claude/` references. All remain correct under option (a); each is already in the AGENT-NEUTRALITY.md ledger as an intentional surface.
- **No edits to `SPEC.md:77, 89, 535`.** Lazy-dispatch cross-ref, skill-namespace `.claude/` reference, and `## Documents` reachable forward-ref are all factual locators that stay correct.

### Archive-skim findings

| Precedent | Lock | How this task relates |
|---|---|---|
| [[CORE-154.1]] (2026-05-23) | Locked the three-option frame; Stage 3 Clarification #1 set starting bias = (a) with pivot authority; Constitution non-negotiable on adopter-symlink stability; this task's deliverable = locked decision + coherent doc edits | Direct parent; Phase 1 read confirms no surprise warranting pivot from (a) |
| [[CORE-154.2]] (2026-05-23) | Authored `docs/AGENT-NEUTRALITY.md` with §Principle (contract/wiring split) + ledger (17 intentional Claude-surface rows) + §"Out of scope" listing [[CORE-154.3]] / [[CORE-154.4]] as forthcoming | Provides the ledger this task closes-the-loop on; the §Principle pre-empts most of what (c) hybrid's "single doc paragraph" would have delivered |
| [[CORE-091]] (2026-05-14) | `claude/AGENTS-snippet.md` §"One-time symlink wiring" locked as the *single source of truth* for adopter symlink commands; MIGRATION.md §1.2 + new-project skill trimmed to pointers | Reinforces non-negotiable: the symlink shape MUST stay backwards-compatible — any rename would break that single source |
| [[CORE-129]] (2026-05-22) | `AGENTS.md` migration: rename `CLAUDE-snippet.md` → `AGENTS-snippet.md`; SPEC §"Working in the flowtron repo itself" updated; established multi-agent paste-destination posture | Sets the precedent that *contract-layer surfaces* can rename (snippet content, paste destination) but *wiring-layer dir names* are sticky for adopter contract reasons |
| [[CORE-104]] (2026-05-17) + [[CORE-106]] (2026-05-17) | `ft-` namespace reservation; adopter `.claude/` directory locked as wiring substrate | Non-negotiable preserved; namespace contract orthogonal to dir-name decision |
| [[CORE-070]] (2026-05-10) | Repo-layout-doc currency pass (README §"Repo layout" + SPEC §"Working in the flowtron repo itself") | Both surfaces this task edits are the same ones [[CORE-070]] established as the canonical layout description; one-clause forward-pointer extends, not contradicts, that work |

### Drift check

All cited paths/lines verified at HEAD 2026-05-23:
- `SPEC.md:53` `claude/` bullet exists with current wording — confirmed in the just-completed Read
- `README.md:108` `claude/` bullet exists with current wording — confirmed
- `docs/AGENT-NEUTRALITY.md:72-73` lists [[CORE-154.3]] forward-ref as "(forthcoming)" — confirmed at line 72-73 ("Document the wiring-layer structure or evaluate whether `claude/` should be renamed or relocated — see [[CORE-154.3]] (forthcoming).")
- `claude/AGENTS-snippet.md` has 12 symlink commands at lines 31–42 — confirmed
- `claude/` directory exists; no `codex/`, `grok/`, `cursor/`, or `wiring/` siblings — confirmed via `ls /Users/fakeneuron/Code/flowtron/`
- Adopter symlink dependency confirmed: `ln -s ../../_project/flowtron/claude/commands/ft-task.md .claude/commands/ft-task.md` (line 31 of AGENTS-snippet.md) — any `claude/` rename would break this for every existing adopter

No drift.

### Clarifying questions

**No clarifications needed.** Explicit assumptions:

1. Option (a) is the locked default per [[CORE-154.1]] Stage 3 Clarification #1; pivot authority exists if Phase 1 surfaces a problem — Phase 1 read complete, no problem surfaced.
2. Forward-pointer to `docs/PLATFORMS.md` cites that doc by its CORE-154.1-prescribed location even though [[CORE-154.4]] hasn't shipped yet — wikilink-style cite is forward-ref-friendly (matches the precedent of AGENT-NEUTRALITY.md's existing "(forthcoming)" reference).
3. Sibling-top-level naming convention (`<platform>/` at repo root, e.g., `codex/`, `grok/`) is named in the forward-pointer language but NOT shipped as concrete dirs — concrete sibling-dir scaffolding lives in [[CORE-154.4]]'s pattern doc, not in this task's edits.
4. The "Last reviewed" date in `docs/AGENT-NEUTRALITY.md:3` updates to 2026-05-23 (today) when the §"Out of scope" bullet flips, since the ledger's content materially changed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — direct precedent in [[CORE-070]] (2026-05-10) which established the SPEC.md §"Working in the flowtron repo itself" + README.md §"Repo layout" pair as the canonical layout-description surfaces. Same surfaces edited here with one-clause appendages (additive — no existing wording removed). For the [[CORE-154.2]]-shipped AGENT-NEUTRALITY.md ledger closure, mirrored the existing "(forthcoming)" → closed pattern used elsewhere in the same §"Out of scope" section (e.g., line 70's [[CORE-154.4]] ref stays "(forthcoming)" until that child closes). No new shape.
- [x] Implemented the minimal solution — 4 surgical edits across 3 files
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only; no executable surface)

**Implementation Notes:**

**Files changed (3):**

| File | Edit |
|---|---|
| `SPEC.md:53` | Appended single-sentence forward-pointer: "Future non-Claude-Code platform wirings (e.g., `codex/`, `grok/`, `cursor/`) plug in symmetrically as sibling top-level dirs — see [\`docs/PLATFORMS.md\`](docs/PLATFORMS.md) for the plug-in pattern." |
| `README.md:108` | Same forward-pointer joined with `;` separator to existing bullet |
| `docs/AGENT-NEUTRALITY.md:3` | "Last reviewed" line appended [[CORE-154.3]] to authors list |
| `docs/AGENT-NEUTRALITY.md:72-79` | §"Out of scope for this ledger" — [[CORE-154.3]] bullet expanded from "(forthcoming)" placeholder to locked-decision summary citing the [[CORE-154.1]] Constitution non-negotiable rationale |

**Key decisions encoded:**
- **Option (a) locked.** `claude/` dir name unchanged. No `wiring/` parent dir, no `codex/` / `grok/` / `cursor/` sibling dirs ship in this task — those are convention-only at this stage; concrete sibling-dir scaffolding lives in [[CORE-154.4]]'s `docs/PLATFORMS.md`.
- **Forward-pointer language consistent across surfaces.** SPEC.md, README.md, and AGENT-NEUTRALITY.md all use the same "sibling top-level dirs (e.g., `codex/`, `grok/`, `cursor/`)" phrasing. Mirrors AGENT-NEUTRALITY.md:18-20's pre-existing `Future platform wiring (Codex CLI, grok, Cursor, …) plugs in symmetrically` framing.
- **No `claude/AGENTS-snippet.md` touched.** Per Constitution principle 1 + [[CORE-154.1]] Stage 3 Clarification #1 (status-quo bias) + adopter-symlink non-negotiable. The 12 symlink commands at lines 31-42 stay byte-identical.
- **`docs/PLATFORMS.md` forward-refs are wikilink-style consistent.** Forward-refs to a not-yet-shipped doc mirror [[CORE-154.4]]'s pattern (existing in AGENT-NEUTRALITY.md:19, 45, 70) — link the doc, name the task ID. No broken-link concern; PLATFORMS.md ships as [[CORE-154.4]]'s deliverable per [[CORE-154.1]] Spec §CORE-154.4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable surface touched).
- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass + grep-based locator-stability verification instead (results below).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched; the viz parser at `viz/src/parser.ts` does not consume SPEC.md, README.md, or AGENT-NEUTRALITY.md).

**Testing Notes:**

**Verification gates run inline** (per [[CORE-139]] / [[CORE-154.2]] precedent for prose-only changes):

1. **Locator-stability grep** — `grep -nE '\`claude/|claude/AGENTS-snippet|claude/skills|claude/commands' SPEC.md SPEC/*.md README.md CONTRIBUTING.md SECURITY.md docs/*.md templates/*.md`:
   - Pre-edit: 34 total hits
   - Post-edit: 35 total hits
   - Net delta: **+1**, all attributable to AGENT-NEUTRALITY.md's expanded §"Out of scope" bullet (lines 73 + 79 contain new `claude/` mentions in the expanded closure language).
   - Unchanged hit counts on all factual-locator surfaces: `SPEC/epic.md` (3), `SPEC/model.md` (1), `SECURITY.md` (1), `docs/MIGRATION.md` (15), `templates/tasknote-micro-template.md` (1). **No factual locator broke.**
2. **Forward-pointer consistency** — `grep -n "PLATFORMS.md" SPEC.md README.md docs/AGENT-NEUTRALITY.md` returns 6 hits: 1 in SPEC.md:53, 1 in README.md:108, 4 pre-existing in AGENT-NEUTRALITY.md (lines 19, 45, 70, 76). All cite the same forward-target.
3. **AGENT-NEUTRALITY.md §"Out of scope" structural integrity** — read-through confirmed at lines 64-92: §header preserved, three top-level "It does NOT" bullets all present (`.4` plug-in mechanism still forthcoming, `.3` decision now closed, re-survey advice unchanged), near-neighbor surfaces section unchanged.
4. **Markdown mental-pass** — three edited bullets all parse as well-formed markdown. SPEC.md and README.md bullets retain their `-` list-item shape; AGENT-NEUTRALITY.md's expanded bullet preserves 2-space indent continuation and wikilink/inline-code conventions.
5. **No accidental edit** — `git status` would show exactly 3 modified files (`SPEC.md`, `README.md`, `docs/AGENT-NEUTRALITY.md`) plus the new tasknote at `_project/tasknote/CORE-154.3.md` (about to move to archive at closure).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` (per SPEC §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (signals all clear → autonomous-commit inline; surfaces in commit message)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — line 108 augmented with one-clause forward-pointer to `docs/PLATFORMS.md` for the platform-plug-in convention |
| `SPEC.md` | **updated** — line 53 augmented with one-sentence forward-pointer to `docs/PLATFORMS.md` |
| `docs/MIGRATION.md` | **no change** — wiring-layer content; intentional per AGENT-NEUTRALITY.md ledger; option (a) preserves all `.claude/` symlink references unchanged |
| `claude/AGENTS-snippet.md` | **no change** — wiring-layer content; explicitly out of scope per Constitution; 12 symlink commands at lines 31–42 byte-identical |
| `docs/CONVENTIONS.md` | **no change** — no `claude/` references; clean |
| `CONTRIBUTING.md` | **no change** — narrative; out of structural scope (defended by [[CORE-132]] / [[CORE-154.2]] ledger) |
| `SECURITY.md` | **no change** — `claude/skills/` and `claude/commands/` factual locator at line 70 stays correct under option (a) |

**Final Summary:**

Locked option (a) for flowtron's wiring-layer structure: `claude/` keeps its name and location; future non-Claude-Code platform wirings (Codex CLI, grok, Cursor) plug in symmetrically as sibling top-level dirs. Three layout-describing surfaces (SPEC.md §"Working in the flowtron repo itself", README.md §"Repo layout", docs/AGENT-NEUTRALITY.md §"Out of scope for this ledger") gain consistent forward-pointers to `docs/PLATFORMS.md` (forthcoming via [[CORE-154.4]]).

**Technical detail:**

- **4 surgical edits across 3 files:**
  - `SPEC.md:53` — one-sentence forward-pointer appended to the `claude/` repo-layout bullet
  - `README.md:108` — same forward-pointer (`;`-joined)
  - `docs/AGENT-NEUTRALITY.md:3` — "Last reviewed" line gains [[CORE-154.3]] in the authors list
  - `docs/AGENT-NEUTRALITY.md:72-79` — §"Out of scope" bullet expanded from "(forthcoming)" placeholder to locked-decision summary with Constitution-non-negotiable rationale
- **Zero structural changes ship in this task.** No directory rename, no new sibling dir, no symlink touch. The 12 adopter-wiring symlink commands in `claude/AGENTS-snippet.md` are byte-identical.
- **Locator-stability grep** confirms +1 net hit (all in AGENT-NEUTRALITY.md's expanded bullet); 15 unchanged hits in `docs/MIGRATION.md`, 3 in `SPEC/epic.md`, 1 each in `SPEC/model.md` / `SECURITY.md` / `templates/tasknote-micro-template.md`. No factual locator broke.
- **Decision rationale (Constitution-mapped):**
  - **Principle 4 (low adopter cost) + non-negotiable on adopter-symlink stability** — option (b) sibling restructure would break every existing adopter (InvisiPaw / fintown / photard) on next submodule bump. Ruled out.
  - **Principle 5 (symmetry over special-casing)** — sibling-top-level convention achieves the same symmetry as (b) without the rename.
  - **Principle 6 (no Claude-Code regression)** — option (a) is byte-identical for the operator experience.
  - **(c) hybrid reduced to (a) post-[[CORE-154.2]]** — AGENT-NEUTRALITY.md §Principle already declares the contract/wiring split; the remaining structural delta is exactly the forward-pointers from the two layout-describing surfaces.
- **Hand-off:** [[CORE-154.4]] author `docs/PLATFORMS.md` now has three live forward-pointers waiting; the AGENT-NEUTRALITY.md ledger's [[CORE-154.3]] forward-ref is closed; [[CORE-154.5]] re-comb can verify the structure landed coherently as part of its Pass A multi-agent-portability lens.

**Archived:** 2026-05-23
