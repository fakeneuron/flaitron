---
title: fable-effort-split
status: completed
tags: []
created: 2026-10-22
due:
related-tasks: [CORE-816]
touches:
  - docs/PLATFORMS.md
---

# CORE-821 | fable-effort-split

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-10-22 · 🔗 [[CORE-816]]

## 🎯 Goal

Decide whether Fable @ medium earns its own cell in the `docs/PLATFORMS.md` model ladder, displaces Opus @ high as `[heavy]`, or adds nothing — and record that decision where the ladder lives.

## ✅ Acceptance

- [x] Verdict recorded: Fable @ medium gets no cell, with the dated vendor numbers and a [[CORE-821]] citation in the tier × platform map prose — `grep -q 'Fable @ medium has no cell' docs/PLATFORMS.md && grep -q 'CORE-821' docs/PLATFORMS.md`
- [x] Map cells and roster rows unchanged — `git diff -U0 docs/PLATFORMS.md | grep -E '^[-+]\|' ` prints nothing
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add one dated "Fable @ medium has no cell" passage to `docs/PLATFORMS.md` §"Tier × platform map" prose, citing the measured numbers and source URL
- [x] Run drift checks

## 🔗 Related

- [[CORE-816]] — predecessor: set the current quality-first Claude Code column (Opus @ high for `[heavy]`, Fable @ high–xhigh for `[frontier]`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The question is live. The map still jumps from Opus @ high (`[heavy]`) to Fable @ high–xhigh (`[frontier]`), and current vendor measurements answer it directly.

- [x] Read relevant source files — `docs/PLATFORMS.md:435-502` (map + roster), `SPEC/model.md:95-220` (calibration baseline, effort axis, §"Effort recommendations")

- [x] **Best Practices Review** — N/A: a docs-only calibration note, not a code or module-boundary change

- [x] **Archive skim** — `archive/core/` (confirmed against the README table) has 24 Fable + PLATFORMS hits. The ones that matter: CORE-816 (current map, operator-calibrated cells, quality-first bias), CORE-741.2/.3 (frontier rung and map origin), and CORE-688. CORE-688 dropped a "fable@low beats prior xhigh" claim because it was sourced for Fable 5, not 5.1, so cite only Fable 5.1 / Opus 5.5 measurements here.

- [x] **Drift check** — no drift. The PLAN line's "[frontier] is Fable @ high–xhigh and [heavy] is Opus @ high" matches `docs/PLATFORMS.md:443-444`. No Fable @ medium cell or note exists anywhere.

- [x] Asked clarifying questions — operator picked "Map prose note": record the no-cell verdict in the map prose only, with roster and cells unchanged

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Vendor evidence (fetched 2026-10-22):** `platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence`. All runs are Anthropic-internal and directional, and most are single runs.
  - Internal agentic-coding benchmark: **Fable 5.1 @ medium 84.2%, $2.68/attempt** vs **Opus 5.5 @ medium (default) 86.6%, $0.84/attempt**. Fable @ medium scored lower at about 3.2× the cost.
  - SWE-bench Pro subset: Fable 5.1 @ high (default) 92.3%, $1.19/solved vs Opus 5.5 @ medium 92.8%, $0.21–0.22. Opus 5.5 sweep: low 87.4% $0.11 · medium 92.8% $0.21 · **high 95.3% $0.29** · xhigh 96.7% $0.74.
  - DeepResearch Bench II: Fable 5.1 @ low 66% $4.48 vs @ high 65% $6.89. Research curves are flat, but nothing compares this run to Opus @ high.
  - Latency: no direct Fable vs Opus wall-clock figure. Price: Fable 5.1 $10/$50 vs Opus 5.5 $4/$20 per MTok (claude-api skill, cached 2026-10-06).
  - Vendor starting point: "start with Claude Opus 5.5 at its default effort (`medium`)". Escalate to Fable 5.1 "for demanding reasoning and long-horizon agentic work, or when your evals on Claude Opus 5.5 at higher effort still fall short". That matches the `[frontier]` triggers.
  - Effort page (`platform.claude.com/docs/en/build-with-claude/effort`): for Fable 5.1, "step down to `medium` or `low` for routine or latency-sensitive work once your evals show quality holds". Routine work is `[light]`/`[moderate]` territory, which is already served more cheaply by Opus/Sonnet cells.
- **Comparison:** quality runs Fable @ medium < Opus @ medium ≤ Opus @ high, and cost per task runs Opus @ high < Fable @ medium. Fable @ medium loses on both axes to the cell it would sit beside. It cannot sit between `[heavy]` and `[frontier]`, because it measures *below* `[heavy]`'s pick, and it cannot displace Opus @ high.
- **Verdict:** the split adds nothing. No new cell and no `[heavy]` change. The vendor does not report Fable @ medium on SWE-bench Pro, so the verdict rests on one direct run plus the transitive SWE-bench chain. The note says so.
- **Not re-opened:** the `[frontier]` cell itself. On SWE-bench Pro, Fable @ high only ties Opus @ medium, but `[frontier]` is trigger-reached for the hardest work, which is where the vendor itself says to escalate. Out of scope here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the map prose's existing bold-lead "no X" shape (`**Haiku is off the map.**`, `**⚠️ Grok has no frontier-band model:**`), placed between those two passages, with the same inline dated-source style the CORE-816 verification sentence uses

- [x] **Minimal refactor gate** — no refactor; the map's `As of 2026-10-20` stamp is left as is because no cell changed

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose-only change; acceptance is decided by grep + drift checks

**Implementation Notes:**

- `docs/PLATFORMS.md` §"Tier × platform map": one 10-line passage, **Fable @ medium has no cell** ([[CORE-821]]), giving the agentic-coding numbers, the SWE-bench Pro Opus @ high vs Fable @ high comparison ($0.29 vs $1.19 per solved task ≈ a quarter), the conclusion, the source URL and date, and the caveat that no run directly compares the two.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only diff; no test covers PLATFORMS prose (drift checks are the suite)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (final newlines, context budgets, Pair Q citations, …)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Receipt, re-run after the review fixes:
  - `grep -q 'Fable @ medium has no cell' docs/PLATFORMS.md && grep -q 'CORE-821' docs/PLATFORMS.md` → 0
  - `git diff -U0 docs/PLATFORMS.md | grep -E '^[-+]\|'` → 1 (nothing printed: no map or roster row changed)
  - `bash tools/drift-checks.sh` → 0
- **External review** (`/code-review medium`, working-tree diff only): every Acceptance check passed and the numbers are internally consistent. No blockers. Six notes:
  1. The SWE-bench sentence showed the `[frontier]` pick (Fable @ high) losing to the `[heavy]` pick, unreconciled with the frontier cell and Grok advice → **fixed**: that sentence is replaced with Opus's own same-benchmark effort sweep, and a closing sentence scopes the verdict to Fable below its default, pointing at the `[frontier]` triggers.
  2. "Therefore" chained two different benchmarks and settings → **fixed**: the prose now says "Chained across those two benchmarks" and gives the no-direct-run caveat before the conclusion.
  3. Put a `fable@medium` band in the roster equivalences so the Step 1.5 gate sees it → **declined**. At the clarifying step the operator chose map prose only, with the roster unchanged. The gate stays a tier self-assessment, and nothing here claims a band.
  4. "Single runs" overstated the evidence → **fixed**: "directional vendor runs".
  5. The section's as-of stamp did not cover the new fact → **fixed**: the stamp now reads `2026-10-22 per [[CORE-821]]`, following the roster's dated-update pattern.
  6. The passage was spliced mid-paragraph → **fixed**: it is now its own paragraph.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/PLATFORMS.md` updated (this task's deliverable). No change to `README.md`, `AGENTS.md`, `SPEC.md`, `SPEC/model.md` (its "Effort recommendations" rule is unchanged, since no cell moved), `docs/AGENT-NEUTRALITY.md` (no new model-name restatement outside PLATFORMS), `docs/MIGRATION.md`, the `*/AGENTS-snippet.md` set, `docs/CONVENTIONS.md`, `docs/GLOSSARY.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/VISION.md`

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Verdict: the Fable @ medium split adds nothing. In the vendor's agentic-coding run, Fable 5.1 @ medium scored below Opus 5.5 @ medium (84.2% vs 86.6%) at about 3.2× the cost per attempt, and Opus's own sweep puts `high` above `medium`. So Fable @ medium neither earns a band between `[heavy]` and `[frontier]` nor displaces Opus @ high. The verdict is recorded as one dated paragraph in `docs/PLATFORMS.md` §"Tier × platform map" with the source URL and a caveat that the comparison is chained across two benchmarks. The section stamp notes the change, and cells and roster are unchanged. Verification: the A1/A3 greps and drift checks exit 0, and the A2 row-diff grep printed nothing. External review returned no blockers and six notes: five fixed, one declined per the operator's choice. No refactor. `touches:` reconciliation: declared `docs/PLATFORMS.md`, and `git diff --name-only` shows the same path (plus the closure pair PLAN.md and this tasknote). Maintainability: the next reader asking "why no Fable @ medium?" finds the answer and its evidence beside the map.

**Archived:** 2026-10-22
