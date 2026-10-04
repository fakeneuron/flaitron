---
title: phase1-2-gate-default-skip
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-131, CORE-087, CORE-088, CORE-065]
---

# CORE-183 | phase1-2-gate-default-skip

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-131]] [[CORE-087]] [[CORE-088]] [[CORE-065]]

## 🎯 Goal

Flip the Phase 1→2 operator gate from default-fire (conditional on clarifying questions) to default-skip (auto-progress), with the banner firing only on significant deviation from the original plan.

## ✅ Acceptance

- [x] **C1 — SPEC §"📝 Phase 1: Discovery" exit gate** documents TWO flavors with explicit per-skill mapping: `default-skip` (used by `/ft-task`) and `default-fire-on-clarifications` (used by `/ft-epic-discovery`, `/ft-close-epic`). Per-flavor branching rules listed with the marker text + when 🛠️ fires.
- [x] **C2 — SPEC §"Operator-gate cues" intro + table** updated to reflect the new `/ft-task` default (🛠️ now described as "fires on significant scope deviation" for /ft-task, "fires on surfaced clarifications" for the epic skills). Banner-format and 2-gate ceiling preserved.
- [x] **C3 — SPEC §"Operator-gate cues" `--fast` footnote** updated: `--fast`'s 🛠️ suppression is documented as a no-op for `/ft-task` (default already skips routine fires); the drift carve-out (Re-scope/De-scope still fires) remains the only 🛠️ behavior `--fast` interacts with.
- [x] **C4 — `/ft-task` SKILL.md Step 4 exit-gate branch** rewritten: default = skip (emit single neutral marker `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` and start Phase 2 immediately); fire 🛠️ only on significant scope deviation. Includes concrete skip/fire judgment examples.
- [x] **C5 — `/ft-task` SKILL.md Step 4 `--fast` drift carve-out paragraph** updated: documents that `--fast` is no-op for routine 🛠️ trips (default already skips); Re-scope/De-scope fires 🛠️ regardless of `--fast` (existing carve-out preserved).
- [x] **C6 — `/ft-task` SKILL.md Step 0 `⚡ --fast active` marker text** updated to drop the now-misleading "Phase 1→2 banner" mention (it's no-op under the new default); marker now reads `⚡ --fast active — 👁️ frontend ask and 📦 signal trips suppressed; Re-scope/De-scope still fires 🛠️ (🛠️ banner is no-op for routine trips under default-skip flavor).`
- [x] **C7 — `claude/commands/ft-task.md` Usage section** updated: default-flow bullet describes 🛠️ as "fires on significant scope deviation"; `--fast` bullet drops the misleading "suppresses the 🛠️ Phase 1→2 banner" claim and clarifies the no-op for routine trips.
- [x] **C8 — `/ft-epic-discovery` SKILL.md Step 6 conclusion + `/ft-close-epic` SKILL.md Step 4 conclusion** each gained a one-sentence callout noting they intentionally follow the SPEC `default-fire-on-clarifications` flavor (not /ft-task's default-skip). Divergence now visible in both SPEC (per-skill mapping table) and each SKILL (inline callout).
- [x] **C9 — Templates** — `templates/tasknote-template.md` Phase 1 third checkbox wording unchanged ("Asked clarifying questions OR logged 'No clarifications needed'"); sync-confirmed at Phase 1 read.
- [x] **C10 — Out-of-scope skills untouched** — `/ft-micro-task` / `/ft-release` / `/ft-file-followup` / `/ft-starter-task` not edited.
- [x] **C11 — Default-flow preservation for the epic skills** — `/ft-epic-discovery` Step 6 and `/ft-close-epic` Step 4 retain their verbatim branching rules; only the framing sentence ("apply the SPEC exit gate" → "apply the SPEC exit gate's `default-fire-on-clarifications` flavor") changed plus the marker text dropping `(no clarifications needed)` for parity with the new neutral marker.
- [x] **C12 — Phase 4 doc-drift sweep** across `_project/tasknote/README.md` §"AI-referenced docs" complete; all 9 docs swept; only SPEC.md changed; cross-refs resolve.

## 🧩 Subtasks

- [ ] **S1** — `SPEC.md` §"📝 Phase 1: Discovery" exit gate (L331-357): rewrite the conditional section into two named flavors (`default-skip` + `default-fire-on-clarifications`) with per-flavor branch rules, per-skill mapping table, and the single neutral marker text. Preserve the `--fast` drift carve-out paragraph; update its framing to reference the new default-skip context.
- [ ] **S2** — `SPEC.md` §"Operator-gate cues" intro paragraph (L290) + gate table 🛠️ row (L304): update the trigger description to reflect per-skill behavior (e.g., table row trigger becomes "fires on significant scope deviation (/ft-task) or surfaced clarifications (/ft-epic-discovery, /ft-close-epic)").
- [ ] **S3** — `SPEC.md` §"Operator-gate cues" `--fast` footnote (L307): clarify that `--fast`'s 🛠️ suppression is no-op for `/ft-task` (default already skips); 👁️ + 📦 suppressions remain operative; drift carve-out unchanged.
- [ ] **S4** — `claude/skills/ft-task/SKILL.md` Step 0 (L33): update the `⚡ --fast active` marker text to drop the now-misleading "Phase 1→2 banner" mention.
- [ ] **S5** — `claude/skills/ft-task/SKILL.md` Step 4 last bullet (L119-121): rewrite the exit-gate branch — default = skip + single neutral marker; fire 🛠️ only on significant scope deviation. Include concrete skip-vs-fire judgment examples (small clarifications skip; moderate-or-larger fire; Re-scope/De-scope always fire).
- [ ] **S6** — `claude/skills/ft-task/SKILL.md` Step 4 `--fast drift carve-out` paragraph (L123): update to note `--fast` is no-op for routine 🛠️ under the new default; Re-scope/De-scope drift carve-out preserved.
- [ ] **S7** — `claude/commands/ft-task.md` Usage section (L12-13): update default-flow + `--fast` bullets to reflect the new behavior. Drop the "suppresses the 🛠️ Phase 1→2 banner" claim from the `--fast` line.
- [ ] **S8** — `claude/skills/ft-epic-discovery/SKILL.md` Step 6 conclusion (L186-189): add one-sentence callout that this skill follows the SPEC `default-fire-on-clarifications` flavor (not /ft-task's default-skip). Keep the existing branching rules verbatim.
- [ ] **S9** — `claude/skills/ft-close-epic/SKILL.md` Step 4 conclusion (L119-122): same callout, scoped to epic-close.
- [ ] **S10** — Templates spot-check (`templates/tasknote-template.md` Phase 1 third box): confirm wording unchanged; sync-confirm only.
- [ ] **S11** — Phase 3 verification: grep cross-refs to edited SPEC sections still resolve; verify 2-banner cap intact; verify the per-skill flavor mapping is unambiguous; verify default-flow paragraphs in the epic skills remain byte-identical (only the callout added).
- [ ] **S12** — Phase 4 closure: doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; PLAN.md flip to stub form; archive tasknote.

## 🔗 Related

- [[CORE-131]] — introduced `--fast` flag; today's `--fast` 🛠️ suppression becomes a no-op for `/ft-task` after this flip (still meaningful for 👁️ + 📦)
- [[CORE-087]] — original introduction of the conditional Phase 2 gate (current default behavior); this task inverts the default for `/ft-task` while preserving CORE-087's contract for the epic skills
- [[CORE-088]] — gate-UX check-in 2; prior UX iteration
- [[CORE-065]] — trim gates to 2; established the up-to-two-banner contract (unchanged by this task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The Phase 1→2 banner is the highest-frequency gate in the workflow — fires on every tasknote where any clarifying question surfaced, even when the clarification was a trivial format pick. Operator has accumulated UX signal that this is over-gated (CORE-067/CORE-088 both flagged it; CORE-131 added `--fast` as the operator-side opt-in). CORE-183 closes the loop by inverting the default for `/ft-task` (the highest-volume skill) while preserving today's behavior for the lower-volume, higher-stakes epic skills. Surface is pure SPEC + SKILL prose; no executable code; clear precedent in CORE-087/CORE-131.

- [x] Read relevant source files

  Read at HEAD: `SPEC.md` (full), `claude/skills/ft-task/SKILL.md` (full), `claude/skills/ft-epic-discovery/SKILL.md` Step 6 region, `claude/skills/ft-close-epic/SKILL.md` Step 4 region, `claude/commands/ft-task.md` (full), `templates/tasknote-template.md` Phase 1 checklist.

- [x] **Archive skim** — `grep -l "Phase 1.?2\|🛠️ banner\|conditional gate\|default-skip\|--fast" _project/tasknote/archive/core/*.md` returned hits primarily for CORE-{059,065,066,067,087,088,089,131} (deep-read CORE-087 + CORE-131 as the most load-bearing). Findings:

  - **CORE-087** is the direct ancestor — made 🛠️ conditional on clarifying questions; defined the inline marker shape (`✅ Phase 1 Discovery complete (no clarifications needed); …`); applied symmetrically to all three skills (/ft-task + /ft-epic-discovery + /ft-close-epic). CORE-183 inverts the default for /ft-task only — explicit user decision to keep the epic skills on the CORE-087 rule.
  - **CORE-131** added `--fast`; today's `--fast` 🛠️ suppression mirrors what CORE-183 makes the new default for /ft-task. After CORE-183: `--fast`'s 🛠️ suppression becomes a no-op for /ft-task (still meaningful for 👁️ + 📦). CORE-131's drift carve-out (Re-scope/De-scope still fires 🛠️ even under `--fast`) merges into the new default rule: Re-scope/De-scope always fires 🛠️ regardless of flags.
  - **CORE-065 / CORE-066 / CORE-067 / CORE-088** — 2-gate cap + R1-R4 banner UX refinements; CORE-183 operates strictly within this ceiling (no new banners; gate ceiling stays at 2; banner-format and 🟢 commit-go conventions preserved).
  - **CORE-089** — `conditional-precommit-gate`; orthogonal to CORE-183 (📦 gate is untouched).
  - **CORE-097.4 / CORE-097.6** — heavy-sections observation + `--<flag>` precedent; CORE-183 keeps edits surgical (per CORE-097.4's tightness advice).

- [x] **Drift check** — concepts cited in the PLAN.md description hold; one framing nuance flagged.

  - SPEC.md §"Operator-gate cues" intro (L290), gate table (L304), `--fast` footnote (L307) all present at cited lines.
  - SPEC.md §"📝 Phase 1: Discovery" exit gate paragraph present at L331-357 with the current conditional + `--fast` drift carve-out.
  - `/ft-task` SKILL.md Step 0 `⚡ --fast active` marker present at L33; Step 4 exit-gate branch at L119-121; `--fast` drift carve-out at L123.
  - `/ft-epic-discovery` SKILL.md Step 6 conclusion at L186-189; `/ft-close-epic` SKILL.md Step 4 conclusion at L119-122 — both mirror the SPEC's current branch rules verbatim.
  - `claude/commands/ft-task.md` Usage section at L12-13.
  - `templates/tasknote-template.md` Phase 1 third box at L45: `Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions` — wording unchanged by CORE-183 (the judgment lives in SPEC/SKILL prose, not the checkbox).
  - **PLAN.md framing nuance:** "Flip Phase 1→2 gate from default-gate to default-skip" reads as if today's default is "always gate", but today's default is already conditional (skips on "No clarifications needed" per CORE-087). The flip is widening the skip default to also cover clarifications-surfaced cases that don't constitute meaningful scope deviation. Logged here so the implementation prose accurately describes the delta from today's state, not from a strawman "default-gate".

- [x] Asked clarifying questions (4 AskUserQuestion answers resolved Q1-Q4)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Files in scope (drift-checked, all current at HEAD):**

- `SPEC.md` — 3 sections: §"Operator-gate cues" (intro L290 + table L304 + `--fast` footnote L307); §"📝 Phase 1: Discovery" exit gate (L331-357)
- `claude/skills/ft-task/SKILL.md` — 3 sites: Step 0 marker (L33); Step 4 exit-gate branch (L119-121); Step 4 `--fast` drift carve-out (L123)
- `claude/commands/ft-task.md` — 1 site: Usage section (L12-13)
- `claude/skills/ft-epic-discovery/SKILL.md` — 1 site: Step 6 conclusion (L186-189) — callout only; branching rules unchanged
- `claude/skills/ft-close-epic/SKILL.md` — 1 site: Step 4 conclusion (L119-122) — callout only; branching rules unchanged

**Clarifications resolved (via AskUserQuestion 2026-05-24):**

| Q | Resolution |
|---|---|
| Q1 — Drift threshold | Judgment-based continuum: **small deviations → skip; moderate-or-larger deviations → fire 🛠️**. Concrete examples — Skip: typo confirmation, format pick, file naming, comment style. Fire: changed which file to edit, restructured subtask list, added cross-cutting concern, discovered different root cause. Always fire: Re-scope and De-scope verdicts (moderate-or-larger by definition). Assistant judges from Discovery Notes content. |
| Q2 — Skill scope | **`/ft-task` only.** `/ft-epic-discovery` and `/ft-close-epic` keep today's `default-fire-on-clarifications` rule. Rationale: epics and epic-closures are lower-volume, higher-stakes flows where the operator wants more checkpoints. |
| Q3 — `--fast` fate | **Keep as-is; document 🛠️ as no-op for /ft-task.** `--fast`'s 👁️ + 📦 suppressions remain operative; drift carve-out (Re-scope/De-scope still fires) preserved. No flag-shape changes. |
| Q4 — Marker text | **Single neutral marker for all skip paths**: `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` (drop the `(no clarifications needed)` parenthetical). The Phase 1 checklist already records whether clarifications fired; the marker doesn't need to restate. |

**Design choices flowing from Q1-Q4:**

- **SPEC documents two flavors with explicit per-skill mapping.** Rather than letting `/ft-epic-discovery` and `/ft-close-epic` silently inherit the new default-skip rule from a shared SPEC section, SPEC §"📝 Phase 1: Discovery" exit gate carries TWO named flavors (`default-skip` + `default-fire-on-clarifications`) with a per-skill mapping. Makes the divergence visible at the contract layer.
- **Epic SKILLs gain a one-sentence callout.** Each of `/ft-epic-discovery` Step 6 and `/ft-close-epic` Step 4 gets one sentence noting they intentionally follow the `default-fire-on-clarifications` flavor. Defense-in-depth: the divergence is visible both in SPEC (per-skill mapping table) and in each SKILL (inline callout).
- **`--fast` marker text in /ft-task Step 0 drops the "Phase 1→2 banner" mention.** Otherwise the marker would mislead: it lists 🛠️ banner suppression as if it were active, when under the new default it's a no-op. Keep 👁️ + 📦 suppressions (still active) and the Re-scope/De-scope carve-out (still relevant).
- **Templates untouched.** `templates/tasknote-template.md` Phase 1 third checkbox keeps its existing wording. The new judgment-call rule lives in SPEC + SKILL prose; the tasknote checkbox is the older "Asked clarifying questions OR logged 'No clarifications needed'" — the new judgment is about *whether the resolved clarifications constituted a meaningful deviation*, not about whether they were asked. The checkbox is correct for both flavors.
- **No template edit means adopters pick up the contract change at next submodule bump with zero migration work** (same precedent as CORE-087 / CORE-131).

**Out of scope:**

- `/ft-epic-discovery` and `/ft-close-epic` branching rules — explicit user decision per Q2
- `/ft-micro-task` (no Phase 1→2 banner — single ⚡ Notes section)
- `/ft-release`, `/ft-file-followup`, `/ft-starter-task` (don't drive the 4-phase workflow)
- 📦 ready-to-commit gate behavior (orthogonal — covered by CORE-089)
- 👁️ frontend visual-confirmation ask (orthogonal — its own rule)
- `--fast` flag shape changes (Q3 — keep as-is)
- Templates (no edit; sync-confirm only)
- `docs/MIGRATION.md` (purely additive contract change; adopters pick up on next submodule bump per CORE-087 / CORE-131 precedent)
- Release version bump (handled by next `/ft-release` cohort separately)

**Diff envelope estimate:** ~5 files (SPEC + 2 SKILLs gaining callouts + /ft-task SKILL + /ft-task command stub); SPEC carries the bulk (§"Operator-gate cues" intro + table row + footnote + §"📝 Phase 1: Discovery" exit gate rewrite); /ft-task SKILL gets ~3 small hunks; command stub gets ~1 small hunk; epic SKILLs each get a one-sentence callout. Total likely +50/-25.

**No new tests / no executable code surface** — pure markdown / SKILL prose (same shape as CORE-087 / CORE-131).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-087 (introduced conditional) + CORE-131 (added `--fast`) both used the same SPEC-canonical + per-SKILL override pattern; CORE-183 mirrors it: SPEC documents the contract (now with two flavors), each SKILL applies its flavor with a localized override. No new structure; gate-count contract (up to 2) preserved.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **SPEC.md edits (3 sections, 3 hunks):**
  - §"Operator-gate cues" intro paragraph (L290) — softened "Both are conditional" prose; 🛠️ now described as "fires per the skill's exit-gate flavor" with inline per-skill summary cross-referencing the exit-gate section for full rule.
  - §"Operator-gate cues" gate table 🛠️ row (L304) — Trigger column updated to "**Conditional (per-skill flavor)**" with one-line per-skill rule; cross-ref to §"📝 Phase 1: Discovery" exit gate for full contract.
  - §"Operator-gate cues" `--fast` footnote (L307) — restructured: now leads with the still-operative behavior (👁️ + 📦), then documents the 🛠️ no-op for /ft-task under `default-skip`, with the drift carve-out preserved.
  - §"📝 Phase 1: Discovery" exit gate (L331-374) — full rewrite into TWO flavors with explicit per-skill mapping table + per-flavor branching rules + concrete `default-skip` judgment guidance (Skip/Fire/Always-fire bullet examples) + `--fast` interaction paragraph that documents the no-op-for-routine-trips + drift-carve-out preservation. Single neutral marker text `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` shared by both flavors on the skip path.
- **/ft-task SKILL.md edits (3 sites):**
  - Step 0 marker text (L33) — dropped the now-misleading "Phase 1→2 banner" suppression mention; new marker reads `⚡ --fast active — 👁️ frontend ask and 📦 signal trips suppressed; Re-scope/De-scope still fires 🛠️ (🛠️ banner is no-op for routine trips under default-skip flavor).`
  - Step 4 exit-gate branch (L119-123) — rewritten to apply the `default-skip` flavor: default = Skip + neutral marker; Fire only on significant scope deviation. Includes concrete skip/fire cases (small clarifications skip; moderate-or-larger fire; Re-scope/De-scope always fire). Adds the inline judgment-recording requirement so misjudgments are operator-visible.
  - Step 4 `--fast interaction` paragraph (L125) — reframed: 🛠️ suppression is no-op under default-skip; drift carve-out preserved; on Proceed Verdict with fast-mode, Skip branch fires; 👁️ + 📦 suppressions remain operative.
- **/ft-epic-discovery + /ft-close-epic SKILL edits (1 site each):**
  - Each "Do not enter Phase 2 until..." paragraph gained one inline clause noting the skill follows the SPEC `default-fire-on-clarifications` flavor (not /ft-task's `default-skip`) — epic-opening / epic-closure is lower-volume + higher-stakes, so any surfaced clarification gates.
  - Marker text on the "No clarifications needed" branch also dropped `(no clarifications needed)` for parity with the unified neutral marker (tiny operator-facing UX shift, documented in C11).
  - Branching rules themselves (Skip vs. Fire decision) preserved verbatim.
- **/ft-task command stub (1 site):** Usage section updated — default-flow bullet now describes 🛠️ as fires-on-significant-scope-deviation under the `default-skip` flavor; `--fast` bullet drops the misleading 🛠️-suppression claim and clarifies the no-op-for-routine-trips + drift-carve-out shape.
- **Pattern survey adherence:** CORE-087's "shared SPEC contract; SKILLs cross-reference" pattern is preserved; CORE-183 just makes the shared contract carry two named flavors instead of one universal rule. Per-skill mapping table inside SPEC §"📝 Phase 1: Discovery" exit gate keeps the flavor assignment unambiguous and machine-greppable.
- **No tests added** — pure markdown / SKILL prose, same shape as CORE-087 / CORE-131.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Flowtron has no automated test or lint suite for markdown contract surface — verification is structural greps + conceptual re-read.
- **2-banner cap intact:** `grep "AWAITING APPROVAL"` returns 3 hits in SPEC.md (banner template L295 + 2 table rows L304/L305 — all pre-existing); 0 hits in any SKILL or command stub. No new banner blocks introduced; the gate ceiling stays at 2.
- **No stale `(no clarifications needed)` markers:** `grep '(no clarifications needed)'` across SPEC.md + claude/ + templates/ + docs/ returns 0 hits — all updated to the unified neutral marker.
- **No stale `clarifying-questions outcome` framing:** `grep "clarifying-questions outcome"` across claude/skills/ returns 0 hits — all updated to flavor-based language.
- **Cross-ref integrity:** `§"📝 Phase 1: Discovery"` resolves at SPEC.md L315 (the section header); 8 cross-refs across SPEC + 5 SKILLs + 1 command stub all point to the section that exists.
- **Per-skill flavor mapping unambiguous:** `default-skip` appears 6× (SPEC + /ft-task command stub + /ft-task SKILL × 3 + /ft-epic-discovery + /ft-close-epic — last two cite it negatively to clarify their own flavor); `default-fire-on-clarifications` appears 4× (SPEC × 2 + /ft-epic-discovery + /ft-close-epic). All references map consistently to the per-skill mapping table.
- **Doc-drift sweep cross-checked at Phase 4:** `docs/PLATFORMS.md` and `docs/AGENT-NEUTRALITY.md` reference `--fast` at the conceptual level only; both correctly cite SPEC as source of truth; no edits required.
- **Frontend N/A** — no UI changes.
- **`git diff --stat`** (pre-archive-move): 6 files changed in non-tasknote scope (SPEC.md, /ft-task SKILL.md, /ft-epic-discovery SKILL.md, /ft-close-epic SKILL.md, /ft-task command stub, PLAN.md flip) — markdown only; no frontend / privileged-ops / perf-narrative surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (9 AI-referenced docs):**

| Doc | Verdict |
|---|---|
| `README.md` | no change — public overview; gate UX is SPEC-internal |
| `SPEC.md` | **updated** — §"Operator-gate cues" intro + table row + `--fast` footnote (3 hunks); §"📝 Phase 1: Discovery" exit gate rewritten into two flavors with per-skill mapping + judgment-guidance bullets + reframed `--fast` paragraph (1 hunk, +44/-27) |
| `docs/MIGRATION.md` | no change — adoption + bump doc; CORE-183 is additive contract change; adopters pick up on next submodule bump (CORE-087 / CORE-131 precedent) |
| `claude/AGENTS-snippet.md` | no change — paste-block; gates/flavors not enumerated; runtime behavior surfaces from SPEC + SKILLs |
| `docs/CONVENTIONS.md` | no change — conventions doc (commits / versioning / formatting); flag/gate UX not in scope |
| `CONTRIBUTING.md` | no change — solo-maintenance + issue/PR doc |
| `SECURITY.md` | no change — threat model |
| `docs/AGENT-NEUTRALITY.md` | no change — references `--fast` at conceptual level only; cites SPEC §"Operator-gate cues" + §"📝 Phase 1: Discovery" as source of truth (still accurate) |
| `docs/PLATFORMS.md` | no change — references `--fast` as the Claude-Code wiring of the operator force-skip concept; cites SPEC for syntax (still accurate) |

**Final Summary:**

_Plain English:_ Flipped the 🛠️ Phase 1→2 operator-gate banner from default-fire-on-clarifications to default-skip for `/ft-task` only. Routine clarifications (typo/format/naming/style picks) no longer pause execution; the banner fires only on significant scope deviation (Re-scope/De-scope verdicts always; clarifications that materially reshape the plan via assistant judgment). The two epic-flow skills (`/ft-epic-discovery`, `/ft-close-epic`) intentionally keep the prior default-fire-on-clarifications behavior — lower-volume, higher-stakes flows where the operator wants more checkpoints. The divergence is now explicit at both the SPEC layer (per-skill mapping table) and inside each SKILL (one-sentence flavor callout).

_Technical:_ 5 files edited across the markdown contract surface — `SPEC.md` (3 sections: §"Operator-gate cues" intro + table row + `--fast` footnote; §"📝 Phase 1: Discovery" exit gate rewritten into two named flavors with per-skill mapping table, per-flavor branch rules, concrete `default-skip` Skip/Fire/Always-fire judgment examples, and a reframed `--fast` interaction paragraph); `claude/skills/ft-task/SKILL.md` (3 sites: Step 0 marker text trimmed of the now-misleading "Phase 1→2 banner" mention; Step 4 exit-gate branch rewritten to apply the `default-skip` flavor with inline judgment-recording requirement; Step 4 `--fast interaction` paragraph reframed); `claude/skills/ft-epic-discovery/SKILL.md` Step 6 conclusion and `claude/skills/ft-close-epic/SKILL.md` Step 4 conclusion (each gained a one-sentence flavor callout citing `default-fire-on-clarifications`; branching rules verbatim; marker text dropped `(no clarifications needed)` for parity with the new unified neutral marker); `claude/commands/ft-task.md` Usage section updated. Pattern mirrored from CORE-087 (shared SPEC contract; per-SKILL overrides) — CORE-183 just makes the contract carry two named flavors. 2-banner cap intact (3 `AWAITING APPROVAL` hits in SPEC.md, all pre-existing; 0 in SKILLs). `git diff --stat`: 6 files (5 surface + PLAN.md flip), markdown only. Doc-drift sweep across 9 AI-referenced docs: only SPEC.md updated; `docs/PLATFORMS.md` + `docs/AGENT-NEUTRALITY.md` reference `--fast` conceptually + cite SPEC for syntax, so their references remain accurate. Verification ask: skim `SPEC.md` §"📝 Phase 1: Discovery" exit gate (L331-374) for the two-flavor table + `default-skip` judgment bullets, and `claude/skills/ft-task/SKILL.md` Step 4 (L119-125) for the SKILL-side application of the new rule.

**Archived:** 2026-05-24
