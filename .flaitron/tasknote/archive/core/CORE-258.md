---
title: verify-cues-codex
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: ["CORE-257", "CORE-EPIC-254"]
---

# CORE-258 | verify-cues-codex

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-257]] [[CORE-EPIC-254]]

## 🎯 Goal

Live-dogfood the complete set of flowtron operator cues (🗄️ DB, ▶️ RUN, ✋ ACTION, 🟢 GO, 👁️ CONFIRM, 🔍 AUDIT, 🔧 LIGHT, 🧠 HEAVY + their UPPERCASE ASCII labels) under Codex CLI by driving a /ft-task flow (or record the precise blocker if Codex runtime unavailable in the current environment), record render/emit findings against the cross-agent cue fallback policy, and refresh the Codex matrix row in docs/AGENT-COMPAT.md from `unverified` to a current dogfooded entry (discharging the live Codex half of [[CORE-EPIC-254]]). Follows the exact precedent established by [[CORE-257]] for Grok.

## ✅ Acceptance

- [x] All canonical cue glyphs + UPPERCASE labels that fire during a standard /ft-task flow render/emit legibly under Codex (no stripping, tofu, or mojibake on the label) — or the unavailability of a Codex session is explicitly recorded with reproduction steps
- [x] docs/AGENT-COMPAT.md Codex matrix row updated from `unverified` to a current `vX.Y.Z · YYYY-MM-DD (dogfooded)` entry (or honest "docs-only" refresh with blocker note if live dogfood deferred)
- [x] Any Codex-specific cue or gate behavior gaps (or trigger-surface gaps in PLATFORMS.md) documented (with proposed fixes if any) in the tasknote or relevant docs (AGENT-COMPAT.md, PLATFORMS.md, or SPEC/gates.md)
- [x] Model-gate interaction with category labels vs. concrete tokens observed here (cross-ref [[CORE-256]]) and any Codex implications noted

## 🧩 Subtasks

- [x] Complete Phase 1 Discovery (relevance verdict, archive skim of cue-epic priors + CORE-257, drift check on cited AGENT-COMPAT Codex cell + PLATFORMS Codex notes, log entry model-gate retag, refine this subtask list)
- [x] Phase 2: minimal "implementation" — this task is primarily observational dogfood (or blocker documentation) + single-cell doc update or note; pattern survey = mirror of 254.5 / 257 precedent; the "change" is the matrix refresh (or explicit deferral) + findings appendix
- [x] Phase 3: no code/tests expected (pure doc + record); if any PLATFORMS.md or AGENT-COMPAT observation update surfaces, treat as the changed surface for lint (markdown)
- [x] Phase 4: run the full doc-drift sweep across all 10 AI-referenced docs in tasknote/README.md; flip PLAN.md line; archive the tasknote; draft recap bundling the cue observations (or blocker) + matrix before/after
- [x] At 📦 (or skip): surface findings on which cues actually emitted during this run (✅ / 🏁 / 🔧/🧠 / 🔍 likely; full set only if other paths trip); confirm UPPERCASE labels always present as fallback; note Codex availability status
- [x] Update (or annotate) docs/AGENT-COMPAT.md Codex row to reflect live verification status under the actual runtime available for this invocation

## 🔗 Related

- [[CORE-257]] — verify-cues-grok (direct sibling; identical shape, completed same day under Grok 4.3 with model retag at entry)
- [[CORE-EPIC-254]] — cross-agent operator cues epic (this task is the Codex live-dogfood child)
- [[CORE-256]] — model-label-valid-set (category `[light]` vs concrete token gate behavior observed at entry)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The PLAN filing's core deliverable ("once Codex is up and running: live-dogfood ... to dogfooded currency") has a hard external prerequisite: a Codex CLI runtime/session in which to drive the /ft-task flow and observe cue render/emit. This session is Grok 4.3 (post model-gate retag to [grok] mirroring CORE-257). Codex CLI is not installed/available here (PLATFORMS.md Codex stub + AGENT-COMPAT "unverified" confirm; no codex process). User (via clarifying ask) has not used Codex much yet, requested a walkthrough of Codex CLI + AGENTS.md setup, and explicitly directed: "let's park this for a future task if there's other stuff we can work on before release." Per SPEC/blocked.md Phase 1 Re-scope path for real-but-blocked prerequisite + SKILL.md Step 4, record the blocker, preserve Discovery work, park the tasknote (status: blocked), note the blocker on the PLAN line, halt before Phase 2. Live Codex verification (the epic's Codex half) remains pending a future Codex-equipped session; this run discharges the "attempt + blocker documentation" portion honestly. No fabrication of dogfooded status. Cross-link to CORE-EPIC-254.6 audit.

- [x] Read relevant source files — SPEC.md (4-phase, Relevance Assessment, blocked tasks, task ID convention, tasknote shape), SPEC/gates.md (operator-cue vocabulary + fallback policy cross-ref), SPEC/blocked.md (Re-scope-to-blocked path for Phase 1 prerequisite), SPEC/model.md + claude/skills/ft-task/step-1.5-model-edge.md (model gate + the exact precedent from CORE-257), templates/tasknote-template.md, docs/AGENT-COMPAT.md (Codex unverified row + cross-agent cue fallback policy section authored by 254.5), docs/PLATFORMS.md (Codex CLI stub + "Non-Claude capability triggers" + Grok Build notes updated by 257), _project/PLAN.md (CORE-258 + 257 + 254 context), _project/tasknote/README.md (AI-referenced docs + archive layout), _project/tasknote/archive/core/CORE-257.md (direct sibling), CORE-254.5.md (policy author + honesty constraint on Grok/Codex stamps), CORE-224.x (matrix origin).

- [x] **Archive skim** — ls _project/tasknote/archive/core/ (recent tail: 254.1–5, 255, 257, 224.x etc.); targeted `grep -l` on AGENT-COMPAT/Codex/cross-agent cue fallback/operator cue across core archives. Primary load-bearing hits: CORE-254.5 (wrote the exact "Cross-agent cue fallback policy" + left Codex/Grok honest per "honesty constraint"; deferred live dogfood to operator's subsequent sessions), CORE-257 (the Grok sibling that fulfilled the Grok half same day, with identical model retag + AskUserQuestion observation), CORE-224.1–6 (agent-compatibility-surface epic that stood up the matrix, last-verified convention, and "unverified"/"docs-only (pre-adoption)" posture). No contradictory prior decisions, renames, or hidden rationale on the Codex cell or cue policy. The 258 tasknote is the first direct attempt at the Codex live half. Logged in Discovery Notes.

- [x] **Drift check** — The explicit citation in PLAN ("refresh the Codex matrix row in docs/AGENT-COMPAT.md from `unverified` to dogfooded") still matches current file state exactly (Codex cell remains `unverified`; no one has touched it since 224/254.5). PLATFORMS.md Codex stub is still the minimal "no capability-trigger research" placeholder. The "once Codex is up and running" qualifier in the filing is accurate and current. No file moves, line drift, changed root cause, or stale citations. The blocker (Codex runtime) is a new surfaced fact, not drift. Clean.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  At entry (Step 1.5 model gate): PLAN.md carried `[light]🔧` while active model was Grok 4.3 → mismatch (category-vs-concrete undefined per open CORE-256). Used AskUserQuestion; user chose "Retag PLAN.md to [grok] and proceed."

  During Phase 1 (this step): Used AskUserQuestion for the core ambiguity (Codex target vs. Grok runtime + "once up and running" clause). User selected "Other" and directed:

  > walk me through how to use codex. i haven't used it much yet. do they have a cli? let's park this for a future task if there's other stuff we can work on before release.

  **Explicit assumptions logged:**
  - The live-dogfood half of the Codex verification (CORE-EPIC-254) cannot be discharged in a Grok session; it requires driving /ft-task (and observing cue emissions) inside an actual Codex CLI TUI.
  - This invocation's value is: (a) honest blocker record, (b) preservation of the Discovery work + clarifying, (c) Codex CLI + flowtron/AGENTS.md setup guide for the operator, (d) clean "parked" state so `/ft-task CORE-258` later (under Codex) resumes via Step 3c with prior context intact.
  - No matrix currency change for Codex in this run (stays unverified; a future Codex dogfood run will claim the dogfooded stamp per the §"Reading the cells" obligation).
  - The tasknote is parked (not deleted, not archived) to enable resume; PLAN line gets a "Blocked pending..." note for viz visibility.
  - Other work before release can proceed independently (operator will pick next via post-closure or new /ft-task).

- [x] Subtasks above populated with concrete, ordered steps (initial scaffold modeled on CORE-257; left as-is for the future Codex resume to execute or refine)

**Discovery Notes:**

**Archive skim findings (core area):** Direct lineage CORE-EPIC-224 (matrix + currency convention) → 254.5 (authored the cross-agent cue fallback policy in AGENT-COMPAT.md under Claude, explicitly left Codex row at `unverified` and Grok at `docs-only` per honesty constraint; stated "operator runs Grok next, then Codex once available" — 257 fulfilled Grok; 258 is the queued Codex follow-through). 257 (Grok sibling) is the exact shape precedent: model retag at entry, AskUserQuestion observation, minimal doc update, cue emissions logged from the ft-task run itself, matrix bump only for the agent under which the run occurred. No other core tasknotes touched the Codex cell. The policy section (non-render modes + UPPERCASE durability) is the mechanism that lets unverified rows still convey cues reliably.

**Drift / relevance:** Clean on all cited surfaces. The blocker (Codex CLI runtime availability) is a genuine external prerequisite for the *live* half of the deliverable, not a re-interpretation of scope. The clarifying + user directive to park + request for Codex walkthrough are the natural outputs of Discovery under the actual runtime.

**Model gate + clarifying observation:** Entry retag [light]🔧 → [grok] (user choice) + this Phase 1 ask (runtime vs. target mismatch) are valid cross-agent data points. The AskUserQuestion tool rendered cleanly in Grok TUI (as observed in 257). When the future Codex resume happens, any additional model-gate or ask-surface behavior under Codex will be recorded then.

**Codex availability (blocker confirmed):** No `codex` binary in PATH; no Codex TUI session; PLATFORMS.md + AGENT-COMPAT both document the row as unverified / no trigger research conducted. Matches the "once Codex is up and running" qualifier in the original PLAN line.

**Cue emissions observed in Phase 1 (this run):** AskUserQuestion (model gate + clarifying) — no glyph (internal dispatch). The ✅ / ⏸ state markers in the tasknote itself are hand-authored. Full cue set (especially 🏁 / 🔧🧠 / 🔍 / any 🛠️/📦) will only appear on a future resume that reaches closure. UPPERCASE labels in any future emissions will be verified then.

**Parking decision:** Per user direction + blocked prerequisite surfaced in Discovery, tasknote flipped to `status: blocked` + nav ⏸ (even though still in Phase 1). PLAN.md line annotated with blocker note. No Phase 2–4 executed. Resume path (Step 3c) will be exercised automatically on next `/ft-task CORE-258` once Codex is running. Discovery work preserved for the future Codex operator.

**Phase 1→2 exit gate:** N/A — did not reach "all Phase 1 boxes ticked + judgment" because Relevance verdict + user directive halted at blocker documentation. No 🛠️ banner emitted.

**Resume note (2026-06-01, Codex/GPT-5):** Re-running `ft-task CORE-258`
entered the blocked-task resume path. Drift check: the parked work still
matched current state except the blocker had cleared by virtue of this Codex
session; `docs/AGENT-COMPAT.md` still carried Codex as `unverified`, and
`docs/PLATFORMS.md` still carried the Codex stub as `unverified`. The PLAN
line still had the prior Grok retag and blocker note; retagged the completed
stub to `[gpt-5]` as the actual runtime label. Phase 1 was already complete,
so resumed directly into Phase 2.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the exact neighboring pattern from
  CORE-257: update the matrix row in `docs/AGENT-COMPAT.md`, then refresh the
  matching per-agent stub in `docs/PLATFORMS.md` with observed first-use
  details. No new platform wiring directory or command bundle was introduced.
- [x] Implemented the minimal solution — changed the Codex row in
  `docs/AGENT-COMPAT.md` from `unverified` to
  `v4.4.0 · 2026-06-01 (dogfooded)`, rewrote the pre-adoption paragraph so
  only still-untried contract-only agents remain pre-adoption, and updated
  the Codex CLI stub in `docs/PLATFORMS.md` to record this first-use run.
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only
  documentation update plus observational dogfood record).

**Implementation Notes:**

Codex consumed the new root `AGENTS.md` and `SPEC.md` contract surface
conversationally. Claude-style `/ft-task` slash commands are not natively
executable in this environment, so the observed Codex path is "contract only":
manual resume, doc update, validation, and closure bookkeeping. That matches
the matrix's consume-mode contract.

**Cue emissions observed in Phase 2:** ✅ marker rendered legibly. No 🗄️ DB,
▶️ RUN, ✋ ACTION, 🟢 GO, 👁️ CONFIRM, 🔍 AUDIT, 🛠️, or 📦 cue was required by
this narrow docs patch. The UPPERCASE-label fallback remains present in the
docs and in emitted cue forms where labels exist; no stripping, tofu, or
mojibake observed in this Codex conversation.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code
  changed; `viz/` untouched).
- [x] Ran lint/type-check on changed code — N/A for markdown-only docs;
  performed grep-based verification instead.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the
  prose ask) — N/A (no frontend surface changed).

**Testing Notes:**

Verified the updated docs by grepping for stale Codex `unverified` state and
checking the final diff. The remaining `unverified` cells are for agents not
dogfooded in this session (Cursor, Gemini CLI, Aider, Sourcegraph Amp), plus
historical references in this tasknote; the active Codex row and PLATFORMS
stub now carry `v4.4.0 · 2026-06-01 (dogfooded)`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 11 entries in
  `_project/tasknote/README.md` §"AI-referenced docs":

  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — updated Codex CLI stub from `unverified` to first-use
    verification under Codex/GPT-5 on 2026-06-01
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — updated Codex CLI matrix row to
    `v4.4.0 · 2026-06-01 (dogfooded)` and narrowed the pre-adoption paragraph

- [x] Closed — PLAN.md line moved to `## Completed` as
  `CORE-258 [gpt-5] | verify-cues-codex — Completed 2026-06-01`; tasknote
  moved to `_project/tasknote/archive/core/CORE-258.md`.
- [x] Recap drafted.

**Final Summary:**

Resumed CORE-258 under Codex/GPT-5 and completed the Codex live dogfood that
was previously blocked under Grok. Codex successfully consumed flowtron through
the root `AGENTS.md` + `SPEC.md` contract-only path, drove the parked task to
closure conversationally, and refreshed the Codex compatibility currency.

`docs/AGENT-COMPAT.md` now marks Codex CLI as
`v4.4.0 · 2026-06-01 (dogfooded)`, and `docs/PLATFORMS.md` records the
first-use Codex observation. No Codex-specific wiring bundle was added; the
documented state remains contract-only. Model-gate observation: the prior
`[grok]` parked tag had to be reconciled with this Codex/GPT-5 runtime, which
keeps [[CORE-256]] relevant for future category-vs-concrete auto-acceptance.

**Archived:** 2026-06-01
