---
title: cross-agent-operator-cues discovery
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: [CORE-EPIC-254]
---

# CORE-254.1 | cross-agent-operator-cues discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]]

## 🎯 Goal

Scope the CORE-EPIC-254 epic (cross-agent-operator-cues) before any implementation child fires; deliverable = filed concrete child scopes for CORE-254.2..5 in `_project/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-254.2 .. CORE-254.5 filed in _project/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-254.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim _project/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-254.2 .. CORE-254.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into _project/PLAN.md under CORE-EPIC-254 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-254]] — parent epic (cross-agent-operator-cues)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` to bracket the operator-cue clarity/reliability problem; scope spans the gate contract, five skills, the template, and the cross-agent docs — multi-child epic territory, not single-task.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Shared design surface inventoried:**

- `SPEC/gates.md` §"Operator-gate cues" — the cue contract: the two banners (🛠️ Phase 1→2, 📦 ready-to-commit), the **"up to two banners" cap**, inline markers (✅ phase/closure), the conditional skip rule, `--fast`.
- `SPEC.md` core §"The 4-phase workflow" + §"Post-closure protocol" — where the inline cues are specced: 🟢 commit-go prefix, 🏁 committed state-marker, 👁️ visual-confirm ask, 🔧/🧠 light/heavy next-task cues (steps 2-3 + copy-paste line), 🔍 audit-family flag.
- Skill prose (cue firing sites): `claude/skills/ft-task`, `ft-epic-discovery`, `ft-close-epic`, `ft-release`, `ft-micro-task`.
- `templates/tasknote-template.md` — section-heading glyphs (🎯 ✅ 🧩 🔗 📝 🛠️ 🧪 🚀).
- Cross-agent docs: `docs/AGENT-COMPAT.md` (matrix — only Claude `dogfooded`; Grok/Codex `unverified`), `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`.

**Gap analysis (brief asks vs current cues):**

| Brief ask | Current state | Gap |
|---|---|---|
| DB / migration commands | privileged-ops *skip-rule* names migrations; no operator cue | no "run this DB command" glyph |
| Executable / run steps | only 🟢 (commit-go), 👁️ (visual-confirm) | no general "run this" cue |
| User must act | only 👁️ / 🟢 specific asks | no unified "you must act" cue |
| Light/heavy next-task | 🔧/🧠 specced in Post-closure §2-3 | reported as not firing reliably |
| Cross-agent familiarity | AGENT-COMPAT: only Claude dogfooded | no render/emit fallback policy |

**Archive precedents (load-bearing):** CORE-059 (visual gate cues), CORE-065 (trim gates to 2 — origin of the 2-banner cap), CORE-066/067/088 (gate-UX check-ins), CORE-068 (committed-state-marker 🏁), CORE-184/190 (audit 🔍 flag), CORE-189 (copy-paste grammar), CORE-208.x (heavy/light 🔧🧠 suggestions), CORE-211.x (gate-clarity-agent-neutral), CORE-224.x (agent-compatibility-surface — AGENT-COMPAT origin). The 2-banner cap (CORE-065) and agent-neutral cue framing (CORE-211) are the two invariants this epic must respect or deliberately revise.

**Drift check:** No drift. Every cited path (`SPEC/gates.md`, `SPEC.md` core, the five skills, the template, `AGENT-COMPAT.md`) exists at HEAD and matches the cited structure.

**Resolved scoping (AskUserQuestion):**

| # | Question | Resolution |
|---|---|---|
| 1 | Which event types get dedicated cues? | **All four** — DB/migration commands, executable/run steps, explicit user-action prompts, AND reaffirm landmark + light/heavy next-task cues |
| 2 | How to mint new cues? | **New glyph + UPPERCASE word label** (e.g. `🗄️ DB:`, `▶️ RUN:`, `✋ ACTION:`) — label survives non-render for cross-agent reliability |
| 3 | Inline prefix vs gate? | **Allow gate escalation** — a destructive DB/executable cue MAY become a blocking (third) banner. *Revises the 2-banner-cap invariant from CORE-065* → `.3` must bound the escalation so cues default to inline prefixes |
| 4 | Cross-agent reach? | **Policy + verify across Claude/Grok/Codex** — write the fallback policy into the contract AND verify rendering/emission, updating AGENT-COMPAT/CAPABILITIES rows |

**Scope-shift note:** Q3's gate-escalation answer is a deliberate revision of the CORE-065 "up to two banners" invariant — the `.3` contract child carries that load. Audit `.6` confirmed as-filed (generic doc-drift sweep + integration check covers the new invariant). N stays 6.

**Refined child scopes (drafted for Phase 2; word-counts ≤50w target):**

- `.2` [heavy]🧠 `cue-vocabulary` (~34w)
- `.3` [heavy]🧠 `cue-contract-codify` (~36w)
- `.4` [light]🔧 `cue-skill-wiring` (~36w)
- `.5` [heavy]🧠 `cue-cross-agent` (~36w)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: the CORE-EPIC-057 children are the closest cohort-filing precedent (2-space indent under the parent, `[model]` tag on every line, em-dash separator, ≤50w descriptions). Followed it.

Wrote **4 child lines** into `_project/PLAN.md` under CORE-EPIC-254, between `.1` and the `.6` audit line:

- `.2` [heavy]🧠 cue-vocabulary — 34w
- `.3` [heavy]🧠 cue-contract-codify — 36w (carries the 2-banner-cap revision from scoping Q3)
- `.4` [light]🔧 cue-skill-wiring — 36w
- `.5` [heavy]🧠 cue-cross-agent — 36w

All ≤50w target / 70w hard cap. **N unchanged (6)** — audit `.6` number did not shift; the gate-escalation scope-shift landed inside `.3`, not as a new child. Tests N/A (pure PLAN.md filing, no executable surface).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-prose edits only — no test/lint/frontend surface (all three N/A). Markdown mental-pass on the new PLAN.md block: 2-space child indent preserved on all four lines; `**CORE-254.<M>**` bold IDs intact; `[model]` tag present on every line; `| <shortname>` ≤30 chars each (`cue-vocabulary` 13, `cue-contract-codify` 19, `cue-skill-wiring` 16, `cue-cross-agent` 15); em-dash separators consistent; all descriptions ≤50w; no trailing whitespace.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Pure Discovery filing — no contract/code edits (those land inside `.3` and `.5`). Per-entry verdict:
  - `README.md` — no change
  - `SPEC.md` — no change (cue-table/glossary edits land in `.3`)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (new cue glyphs are agent-neutral; ledger review belongs to `.3`/`.5`)
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change (cross-agent verification currency lands in `.5`)
  - `docs/AGENT-COMPAT.md` — no change (matrix-row refresh lands in `.5`)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed epic **CORE-EPIC-254** (`cross-agent-operator-cues`) and drove its `.1` Discovery to closure. The epic brackets making operator-facing emoji cues clear and reliable at gated/landmark moments — dedicated glyph+word-label cues for DB-command, executable/run, and user-action events, dependable light/heavy next-task cues, and cross-agent (Claude/Grok/Codex) rendering reliability.

Discovery inventoried the cue surface (`SPEC/gates.md` cue contract, `SPEC.md` Post-closure inline cues, five skills, the template, the cross-agent docs) and the gap between the brief's asks and today's cues. Four scoping questions resolved: all four event types in scope; new glyphs minted with UPPERCASE word labels for non-render survival; **gate escalation allowed** (a destructive DB/executable cue may become a third banner — a deliberate revision of the CORE-065 two-banner cap, carried by `.3`); cross-agent reach = policy + verification across the three named agents.

Deliverable: 4 implementation children filed in PLAN.md — `.2` cue-vocabulary, `.3` cue-contract-codify (holds the banner-cap revision), `.4` cue-skill-wiring, `.5` cue-cross-agent (34–36w each). N unchanged at 6; audit `.6` confirmed as-filed.

**Archived:** 2026-05-31
