---
title: skill-rationalizations-redflags
status: completed
tags: []
created: 2026-08-01
due:
related-tasks: [CORE-388, CORE-EPIC-389]
---

# CORE-386 | skill-rationalizations-redflags

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-388]] [[CORE-EPIC-389]]

## 🎯 Goal

Adopt the agent-skills anatomy's **Rationalizations** and **Red Flags** sections into the two flowtron surfaces whose whole job is resisting shortcut-taking — `SPEC/gates.md` and the consolidated `/ft-audit` skill — so an agent tempted to skip a gate meets the excuse and the symptom in writing.

## ✅ Acceptance

- [x] `SPEC/gates.md` carries a `## Rationalizations` and a `## Red Flags` section, scoped to the gate surface the module already owns (🛠️/📦 banners, conditional skip rule, `--fast`, destructive escalation, control-marker integrity, 🏁 emission) — no reach into Discovery/Phase-3 checklists that SPEC.md core owns
- [x] `claude/skills/ft-audit/SKILL.md` carries the parallel pair, scoped to the audit skill's own shortcut surface (§6 hard rules), stack-neutral and inherited verbatim by forkers — §0's forker checklist gains no new fillable slot
- [x] Every Rationalization entry names the contract section that refutes it; grounding is real observed failure with sparing inline citation
- [x] Both sections are advisory prose/table — no new gate, no checklist to tick, no scorecard or validator (`docs/VISION.md` §"What we won't accept")
- [x] No retrofit to any other skill; `SPEC.md` core gains at most a pointer clause, never restated content
- [x] All `§"…"` cross-references in the new prose resolve to real headings (grep-verified); `claude/commands/ft-audit.md` + `codex/skills/ft-audit/SKILL.md` verified as needing no change

## 🧩 Subtasks

- [x] Draft the gates.md `## Rationalizations` table — gate-surface excuses, each with refutation + owning §
- [x] Draft the gates.md `## Red Flags` list — observable symptoms an agent can self-check mid-run
- [x] Insert both into `SPEC/gates.md` after §"`--fast` operator override", matching module voice
- [x] Draft + insert the parallel §7/§8 pair into `claude/skills/ft-audit/SKILL.md` after §6 Hard rules
- [x] Add the pointer clause from `SPEC.md` §"The 4-phase workflow" → §"Operator-gate cues" anchor list (no restatement)
- [x] Verify: heading refs resolve, no new forker placeholder, wrappers unchanged, repo quick commands green

## 🔗 Related

- [[CORE-388]] — verdict source; resolved the coordination question (target one audit skill, not eight)
- [[CORE-EPIC-389]] — audit consolidation epic; prerequisite that produced the single `/ft-audit` skill

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `## Medium`, unchecked, `[medium]🧩`. Description is ~85w (>70w cap); advisory warning surfaced at scaffold, filing left as-is.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task's stated prerequisite is satisfied — `CORE-EPIC-389` closed 2026-08-01, so the "consolidated `/ft-audit` skill" the line targets exists on disk as one dispatcher + six pass files. The coordination hedge in the line ("target one audit skill, not eight") was resolved by [[CORE-388]]'s verdict table. Nothing in the repo pre-empts the work: zero `Rationalizations` / `Red Flags` content exists on any live surface.

- [x] Read relevant source files — `SPEC.md` (full), `SPEC/gates.md` (307 lines, full), `claude/skills/ft-audit/SKILL.md` (88 lines, full), `claude/skills/ft-audit/passes/` inventory, `claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`, `SPEC/procedures/ft-task.md` (gates.md refs), `docs/VISION.md` §"What we won't accept", `.flowtron/tasknote/README.md` §"AI-referenced docs".

- [x] **Best Practices Review** — markdown contract surface, no code modules. Touched responsibilities stay clean: `SPEC/gates.md` owns the gate machinery, `ft-audit/SKILL.md` owns the audit procedure, and each file gets sections about *its own* shortcut surface — parallel in shape, not duplicated in content. Dependency direction preserved: `SPEC.md` core → `gates.md` by anchor (core gains a pointer clause, never restated prose); `passes/<domain>.md` → dispatcher by section number, so appending §7/§8 after §6 renumbers nothing. Deferred cleanup: none — the explicit no-retrofit bound in the task line is honored, so the other 20 skills are untouched.

- [x] **Archive skim** — `grep -l` over `archive/core/*.md` (487 files) for `SPEC/gates.md` (20 hits) and `ft-audit` (20 hits); read the two load-bearing ones in full. Findings in Discovery Notes.

- [x] **Drift check** — two deviations, neither changing the thrust: (1) the line's "not a retrofit across all **26** skills" is a stale count — `CORE-389.3` cut the roster to **21**. It's a negative bound (what *not* to do), so the clause still reads correctly; not worth a PLAN edit on its own. (2) The prerequisite clause "post-[[CORE-EPIC-389]]" verified satisfied — parent + all five children `[x]` under `## Completed`, dispatcher + 6 pass files on disk. Everything else the line cites (the `SPEC/gates.md` path, the agent-skills anatomy's six-section shape) matches current state.

- [x] Asked clarifying questions — two `AskUserQuestion` asks, both resolved to the recommended default:
  1. **gates.md scope** → *gate surface only*. The new sections cover what `gates.md` already owns; Discovery shortcuts, hollow `N/A`, and the phase checklists stay with `SPEC.md` core.
  2. **Grounding** → *grounded, sparingly cited*. Entries come from real observed failures with inline task-ID / precedent citations where load-bearing.

  Explicit assumptions carried forward: (a) the `/ft-audit` sections ship in the **forked** scaffold and are inherited verbatim — they must stay stack-neutral and must not add a fillable `<placeholder>`, so §0's forker checklist stays as-is (a lesson from [[CORE-389.N]] Finding 2, where a stale §0 pointed at placeholders that didn't exist); (b) `codex/skills/ft-audit/SKILL.md` is a 15-line read-the-Claude-file pointer, so it inherits the new sections with no edit; (c) the sections add **no glyph** to the operator-cue vocabulary — the §"Casing rule" uniqueness constraint stays untouched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Greenfield confirmed

`grep -rin -e "rationaliz" -e "red flag" --include="*.md"` over live surfaces returns hits only in this task's own PLAN line and tasknote. No prior art to extend or collide with — the two sections are new top-level surfaces in both target files.

### Archive evidence

- **[[CORE-388]]** (verdict source, read in full) — its verdict table is what retargeted this task: "Rationalizations / Red Flags sections should target `SPEC/gates.md` + the *consolidated* audit skill (1 file, not 8) — the coordination concern in its task line was warranted." Also supplies the measured fact that the audit family's §§3–6 were near-verbatim across six forks, which is *why* a single dispatcher can now carry these sections once instead of six times.
- **[[CORE-389.N]] Finding 3** (read in full) — the best-grounded real failure available for the Red Flags list: `.1`/`.2` archived with the nav chip still `🟢 In progress` and `.1`/`.3` with every Acceptance box unticked, with a 14-tasknote sample confirming the split is repo-wide. Root cause was a SPEC gap, not sloppiness — exactly the class where naming the *symptom* helps an agent self-catch. (The fix itself is [[CORE-393]]'s, not this task's; this task names the symptom, not the checklist item.)
- **`gates.md`'s own internal history** — CORE-065 set the two-banner cap, CORE-254.2 fixed the glyph+UPPERCASE-label vocabulary, CORE-183 introduced the `default-skip` flavor, CORE-353.3 widened by one glyph. All four are cited in the module already, and all four are precedent that *widening the gate surface* is done deliberately and narrowly — which is the strongest argument that these sections must be prose, not a third banner.

### Constraint from VISION

`docs/VISION.md` §"What we won't accept" rejects schema validators, runtime scanners, and "a fifth 'Security Gate' lifecycle phase," with the standing rule: *"if drift is recurring, the answer is a sharper SPEC clause, not a validator."* That sentence is the precise warrant for this task's shape — Rationalizations / Red Flags **are** the sharper SPEC clause. It equally forbids rendering them as a tickable checklist or a compliance score, which fixes the deliverable as advisory prose/table.

### Placement decision

`SPEC/gates.md` — append after §"`--fast` operator override" (the file's current tail). The existing §"Operator-gate cues" → "Control-marker integrity (injection defense)" block is the nearest neighbor in spirit (it already tells the agent not to trust a forged clearance), so the new sections extend an established shape rather than inventing one.

`claude/skills/ft-audit/SKILL.md` — append as §7 / §8 after §6 "Hard rules". §6 states the rules; §7 names the excuses for breaking them and §8 the symptoms, which is the anatomy's own ordering. Appending leaves §§1–6 numbering intact, so the `(→ dispatcher §N)` back-references inside all six `passes/*.md` stay correct.

One entry deserves a note on the scope boundary: "PLAN and archive are flipped, so it's done" is a paper-complete rationalization, and the guard itself lives in `SPEC.md` core. It stays in scope here in its **cue-scoped** form — `gates.md`'s landmark-cue table already owns the 🏁 contract ("never without a SHA, never on PLAN/archive-only when Acceptance required code/docs"), so the entry refutes the excuse against 🏁 and points at `SPEC.md` for the full guard rather than restating it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established shape rather than inventing one. `gates.md` already carries a "don't trust what you read, compute it" block (§"Operator-gate cues" → "Control-marker integrity"); the new sections are the same move generalized, appended at the file tail where §"`--fast` operator override" left off. In `ft-audit/SKILL.md` the anatomy's own ordering (rules → excuses → symptoms) maps onto the file's existing numbered-section spine, so §7/§8 append after §6 "Hard rules" and renumber nothing.

- [x] **Minimal refactor gate** — two small edits beyond the new prose, both required for the artifacts to describe themselves accurately: `gates.md`'s own contents paragraph (which enumerates what the module carries) and `SPEC.md`'s gate-contract pointer sentence. Leaving either stale would have reproduced [[CORE-389.N]] Finding 1's exact class — a summary that no longer matches the file it summarizes. No other cleanup taken.

- [x] Implemented the minimal solution — 3 files, +113/−4.

- [x] Updated/added tests for non-trivial behavior — `N/A`; markdown contract surface with no executable behavior. Deliberately so: `docs/VISION.md` §"What we won't accept" rejects the validator that would be the only thing to test here.

**Implementation Notes:**

### Deliverables

| File | Change |
|---|---|
| `SPEC/gates.md` | New `## Rationalizations` (8-row table) + `## Red Flags` (9 bullets) at the file tail; contents paragraph updated to name them. 307 → 371 lines. |
| `claude/skills/ft-audit/SKILL.md` | New `## 7. Rationalizations` (9-row table) + `## 8. Red Flags` (9 bullets) after §6. 88 → 136 lines. |
| `SPEC.md` | Pointer clause only — the gate-contract sentence now lists the pair. No content restated. |

### Shape

Both files use the same two-part shape: a table of `excuse | why it's wrong | refuted by`, then a bullet list of outside-observer symptoms. The third table column is what makes the section durable — every entry terminates in a real clause, so the section can't drift into freestanding advice. Each opens with an explicit "advisory prose, not a gate" framing so no future reader mistakes it for a checklist.

Content is surface-specific, not copied: `gates.md`'s entries are about banners, the skip rule, `--fast`, destructive escalation, and 🏁; `ft-audit`'s are about fixing-while-auditing, the 5-finding cap, scope creep, the required PLAN write, and subroutine mode. Parallel in form, zero shared sentences — so no DRY violation and no second place to update when one surface's rules change.

### Boundary calls

- **Scope held to the gate surface** (the Discovery answer). The one entry that brushes `SPEC.md` core — "PLAN and the archive are flipped, so the task is done" — is written in its **cue-scoped** form: it refutes the excuse against the 🏁 emission rule that `gates.md` already owns, and links to `SPEC.md` §"Paper-complete guard" for the full contract rather than restating it.
- **No new glyph.** The sections reference existing cues only, so the §"Casing rule" uniqueness constraint and the CORE-065 two-banner cap are both untouched. One entry actively defends the cap (an agent reading "two-banner cap" as forbidding a destructive-action escalation).
- **Fork-safe.** The `ft-audit` sections contain no fillable `<placeholder>` (grep-verified: 0) and cite only §§1/2/5/6, all of which survive a fork — §0 is deleted by the forker, so nothing in §7/§8 points at it. §0's checklist is unchanged, per the Discovery assumption.
- **Grounded citations kept sparing:** InvisiPaw FE-64 (the paper-complete motivating case, already named in `SPEC.md`) and `SECURITY.md` for the forged-clearance vector. `gates.md`'s internal precedent (CORE-065 cap, control-marker integrity) is referenced by section, not by task ID, since those clauses already carry their own history.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — both repo quick commands run green despite the change being markdown-only, since neither had changed input: `npm --prefix viz test -- --run` → **18 files / 242 tests passed**; `node --test tools/update-adopters.test.mjs` → **24/24 pass, 0 fail** (~115 s). Confirmed first that nothing under `viz/src` or `tools/` references `gates.md` or `ft-audit` (grep, zero hits), so no test was coupled to the edited files.

- [x] Ran lint/type-check on changed code — `N/A`; the repo ships no markdown linter (its quick commands are the two suites above, both run).

- [x] **Quality assertions** — verified against the actual diff:
  - **No duplication.** The two files' tables share form but not a single sentence; each entry is specific to the surface its file governs.
  - **No stale self-description.** Both summary surfaces that enumerate the module's contents were updated in the same diff (`gates.md`'s own contents paragraph, `SPEC.md`'s pointer clause) — the [[CORE-389.N]] Finding 1 failure class, checked for deliberately.
  - **No public-surface growth.** No new glyph, gate, banner, phase, frontmatter key, or forker placeholder. `grep -c '<…placeholder…>' claude/skills/ft-audit/SKILL.md` → 0.
  - **Every cross-reference resolves.** All `§"…"` targets confirmed present via `grep -n '^#\{2,3\} '` on both files plus the bold lead-ins cited ("Control-marker integrity", "Bound", "Bundled-prompt override", and the five §6 hard-rule titles). All three new relative links (`../docs/VISION.md`, `../SECURITY.md`, `../SPEC.md`) resolve to real files.
  - **Wrappers need no change** — `codex/skills/ft-audit/SKILL.md` is a 15-line "read the Claude file" pointer (inherits automatically) and `claude/commands/ft-audit.md` summarizes behavior without enumerating sections. Both re-read to confirm.

- [x] (frontend) Asked the user for visual confirmation — `N/A`; no frontend surface (`viz/` untouched).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 entries walked; **11 no change, 1 updated**:
  - `README.md` — no change (grep-verified: zero `gates.md` / `ft-audit` references; describes the workflow, never enumerates SPEC-module sections)
  - `SPEC.md` — **updated**: §"The 4-phase workflow" → §"Operator-gate cues" gate-contract pointer sentence now lists the Rationalizations / Red Flags pair. Pointer only, per the no-restatement Acceptance criterion
  - `docs/MIGRATION.md` — no change (§1.2.1 describes the fork mechanics and the dispatcher/`passes/` split; it enumerates domains, never `SKILL.md` sections, so §7/§8 are inherited by forkers with no adoption-step change)
  - `claude/AGENTS-snippet.md` — no change (grep-verified: zero hits; audit is fork-only and never symlinked)
  - `codex/AGENTS-snippet.md` — no change (names `ft-audit-context` / `ft-audit-repo` as global installs only; no section-level claims)
  - `docs/CONVENTIONS.md` — no change (its `:122` single-customization-seam argument is about the fork *mechanism*, unaffected by section count)
  - `CONTRIBUTING.md` — no change (grep-verified: zero hits)
  - `SECURITY.md` — no change, and re-verified in both directions: its `:92` pointer to `SPEC/gates.md` §"Operator-gate cues" → "Control-marker integrity" and its `:152`/`:176` pointers to §"Conditional skip rule" all still resolve, and the new Rationalizations row that cites `SECURITY.md` for the forged-clearance vector points at a real document
  - `docs/AGENT-NEUTRALITY.md` — no change; see the note below on a pre-existing count imprecision this task deliberately did not fix
  - `docs/PLATFORMS.md` — no change (its inventories count skills and files, not sections; `ft-audit` still one skill with a `passes/` library)
  - `claude/CAPABILITIES.md` — no change (`:44`'s `--fast` ledger row points at `SPEC.md` + `SPEC/gates.md` as a pair without a site count)
  - `docs/AGENT-COMPAT.md` — no change (`:107` points at §"Operator-cue vocabulary", which is untouched; no new glyph was added, so the per-agent render matrix is unaffected)

  **Not fixed inline (pre-existing, follow-up candidate).** `docs/AGENT-NEUTRALITY.md:36` ledgers the `--fast` flag's appearances as "§"Conditional skip rule" (1 site in `SPEC/gates.md`)". That count was already imprecise before this task — `gates.md` carries a whole `## \`--fast\` operator override` section plus mentions in §"Operator-gate cues", §"Phase 1→2 exit gate", and §"Destructive-action escalation". This task adds one more mention, so it extends a pre-existing count-mirror drift (the [[CORE-374]] class) rather than introducing one. The row's actual load-bearing content — the "Why it stays" neutrality rationale — is unaffected. Correcting the count is a one-line edit that belongs with a proper re-count of all listed sites, not smuggled into this diff.

  **Out-of-sweep surface checked:** `SPEC/procedures/ft-task.md` (the agent-neutral SOP projection, not part of the cold-start sweep) references `gates.md` at three points, all by section anchor. A contract-only agent following any of them loads the module including its new tail, so no pointer edit is needed and none was made.

- [x] Closed — YAML `status:` flipped to `completed`, nav chip flipped to `✅ Completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed` (standalone task), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Gave flowtron's two anti-shortcut surfaces a written record of how agents talk themselves out of following them. `SPEC/gates.md` and the consolidated `/ft-audit` skill each gained a **Rationalizations** table (the excuse, why it's wrong, the clause that refutes it) and a **Red Flags** list (the same failures phrased as symptoms an outside observer would notice) — adopted from the agent-skills anatomy, scoped exactly as [[CORE-388]]'s verdict directed: these two files, one audit skill instead of eight, no retrofit anywhere else.

**Changed (3 files, +113/−4):**
- `SPEC/gates.md` 307 → 371 — `## Rationalizations` (8 rows) + `## Red Flags` (9 bullets) at the file tail; the module's own contents paragraph updated to name them.
- `claude/skills/ft-audit/SKILL.md` 88 → 136 — `## 7. Rationalizations` (9 rows) + `## 8. Red Flags` (9 bullets) after §6 "Hard rules". Appending leaves §§1–6 intact, so the `(→ dispatcher §N)` back-references in all six `passes/*.md` stay correct.
- `SPEC.md` — one pointer clause; no content restated.

**Verification:** `npm --prefix viz test -- --run` → 18 files / 242 tests passed; `node --test tools/update-adopters.test.mjs` → 24/24 pass, 0 fail. Neither suite had changed input (grep confirmed nothing under `viz/src` or `tools/` references the edited files), but both were run rather than assumed. Every `§"…"` target and all three new relative links checked to resolve; `grep -c` for fillable placeholders in the audit dispatcher → 0. The closure diff's skip signals were computed from `git status` + a `git diff` keyword scan, not asserted.

**Refactors:** two, both minimal and both required for accuracy — `gates.md`'s contents paragraph and `SPEC.md`'s pointer sentence, since a summary that no longer matches the file it summarizes is precisely [[CORE-389.N]] Finding 1's failure class. Deferred: the `AGENT-NEUTRALITY.md:36` site count (pre-existing, documented above), and any retrofit to the other 20 skills (explicitly out of scope per the task line).

**Documentation verdict:** 12 AI-referenced entries swept — 11 no change, `SPEC.md` updated as a deliverable.

**Maintainability effect:** the rules in both files were already correct; what was missing was any record of *how they get broken*. Every Rationalization terminates in a real section reference, which is what keeps the sections from decaying into freestanding advice — if a rule moves, the citation breaks visibly. Both sections are advisory prose by construction, satisfying `docs/VISION.md` §"What we won't accept", whose standing remedy for recurring drift is a sharper SPEC clause rather than a validator. Adopters inherit the audit half verbatim on their next bump with no new fork step: the sections are stack-neutral and add no fillable slot.

**Archived:** 2026-08-01
