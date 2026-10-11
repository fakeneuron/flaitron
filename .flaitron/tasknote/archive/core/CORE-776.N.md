---
title: closure-contract-coherence audit
status: completed
tags: [audit, epic]
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-776, CORE-776.2, CORE-776.3, CORE-776.4, CORE-776.5, CORE-776.6]
---

# CORE-776.N | closure-contract-coherence audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-776]]

## 🎯 Goal

Verify the completed `CORE-EPIC-776` (`closure-contract-coherence`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-776` (Step 5), landing in the audit's closure commit — no misses, so no rows filed
- [x] Single `feat: CORE-776.N — audit CORE-EPIC-776` (or `chore: ...` if no code edits land) commit lands — `chore:`, no code edits
- [x] PLAN.md line for `CORE-776.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-776.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-776.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-776]] — parent epic
- [[CORE-776.2]], [[CORE-776.3]], [[CORE-776.4]], [[CORE-776.5]], [[CORE-776.6]] — audited cohort
- [[CORE-EPIC-778]] — successor: folds `/ft-micro-task` into `/ft-task --micro`, reworking the micro surfaces .2 and .5 touched; ordered to run after this audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator-invoked `/ft-close-epic`. All five implementation children (`.2`–`.6`) closed 2026-10-10; no `.1` (Discovery came from audit-repo 2026-10-10). Not an early audit.

- [x] Read relevant source files — the five archived cohort notes, and the current text at every surface they edited

- [x] **Best Practices Review** — N/A: a verification pass, no code or module-boundary change

- [x] **Archive skim** — self-referential: the cohort notes are the archive entries. Non-cohort reads: [[CORE-777]] (owner of three of the routed review findings) and [[CORE-778.1]] (successor epic's scoping, to check it carries the cohort's micro deliverables forward)

- [x] **Drift check** — every surface the cohort edited still carries its edit at HEAD (greps below); `bash tools/drift-checks.sh` → 0

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: the seven review findings `.5` routed here are triaged by this audit, and a real one outside the epic's theme goes to its owner rather than becoming a child row

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — omitted: only PLAN.md and this note change

**Discovery Notes:**

Cohort deliverables:

- **CORE-776.2** (micro-recap-no-wait) — `/ft-micro-task` Step 4 item 5 now says "Continue into Step 5 in the same turn". The old "Wait for confirmation." is gone.
- **CORE-776.3** (refactor-fast-label) — the `--fast` clause in `AGENTS.md` and `claude/AGENTS-snippet.md` (a KEEP-IN-SYNC pair) now says `/ft-refactor`'s own `--fast` only skips its review pause.
- **CORE-776.4** (epic-second-audit) — dropped the unrunnable "file a fresh Audit subtask" sentence from `SPEC/epic.md` lifecycle step 5.
- **CORE-776.5** (micro-unattended-review) — `/ft-micro-task --unattended` now runs Phase 3's External review, graded against the note's 🎯 Goal and its PLAN.md row, and parks `visual-confirm` when the change has a rendered surface. Six surfaces changed: `SPEC.md`, `SPEC/gate-postures.md`, `unattended-mode.md`, the micro `SKILL.md`, `docs/EXTERNAL-AGENTS.md`, and the probe template. Attended runs are unchanged. Its review routed 7 findings outside its own diff to this audit.
- **CORE-776.6** (id-allocation-home) — `SPEC/plan-filing.md` §"ID allocation" is now the one home for allocation rules. Seven allocator sites in six skills cite it (ft-file-task SKILL + park-mode, ft-open-epic, ft-refactor, ft-audit, ft-audit-repo, ft-release), and `SPEC.md` §"Task ID convention" points at it.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no new surface

- [x] **Minimal refactor gate** — no edits beyond the closure writes

- [x] Implemented the minimal solution — the audit findings below

- [x] Updated/added tests for non-trivial behavior — N/A, no code

**Implementation Notes:**

**Coherence, cohort against cohort: no inconsistencies.**

- `.2` × `.5` both edit micro Step 4 item 5, and the two edits read together: the "verification request" clause (from `.5`) comes before the "same turn" continuation (from `.2`). Step 3's `--unattended` paragraph, Step 0, and Step 4.5 also agree with each other.
- `.5`'s grading target ("🎯 Goal and PLAN.md row") reads the same at all six sites: `SPEC.md:445`, `SPEC/gate-postures.md:303`, `unattended-mode.md:95`, micro `SKILL.md:86`, `docs/EXTERNAL-AGENTS.md:79`, and `templates/subagent-probe-template.md:68`.
- `.3`'s clause carries identical prose in `AGENTS.md` (wrapped) and `claude/AGENTS-snippet.md:22`. It also agrees with `claude/CAPABILITIES.md:32`, which already said the refactor `--fast` only skips the review pause. The codex, cursor, and grok snippets carry no `--fast` clause.
- `.4`: `SPEC/epic.md` step 5 and this skill's Notes ("follow-ups are filed before closure") agree, and no surface outside the archive or PLAN mentions a second audit.
- `.6`: the section's scan idiom returns 778, the same as a loose scan over PLAN.md + PLAN-ARCHIVE.md, and the micro runner `.5` touched mints no IDs.

**Routed review findings from `.5` (7): none needs action.**

1. `SPEC/plan-filing.md` ID-allocation grep "drops glyph-decorated rows" — **false positive.** A model glyph comes after the `**ID**`, never between `]` and `**`. No row in PLAN.md or PLAN-ARCHIVE.md has anything in that gap, and the idiom returns the true max (778).
2. `ft-file-task` allocation scans only `archive/<area>/` — **already adjudicated.** `.6` review finding 5 declined it on purpose: the README table is authoritative (CORE-564).
3. `ft-file-task` sidequest collision check runs only in park mode — **covered.** Step 1a's second bullet cites §"ID allocation" item 5, whose scan includes `.flaitron/sidequest/` file names, so an explicit ID held only by a sidequest stub is rejected in every mode. The park-only bullet is a literal-path backstop.
4. `tools/update-adopters.mjs` runs one `git diff --quiet` per symlink path — **nit, not filed.** The loop covers a repo's handful of tracked symlinks.
5. `tools/update-adopters.mjs` skip reason "run /ft-update", whose `git add` skips ignored paths — **not a defect, not filed.** `/ft-update` stages `.claude/` as a directory, and directory adds silently skip ignored files. The bump completes with the links rewired locally and left unstaged, which is what an adopter who gitignores its wiring wants. It belongs to CORE-777, not this epic.
6. `tools/update-adopters.test.mjs` uses a local `const before` that shadows the imported `node:test` hook — **nit, not filed.** It is scoped inside `it` bodies that never call the hook.
7. The PLAN.md CORE-777 stub has a glyph-less `[medium]` — **not a defect.** `SPEC/plan-parser.md` treats the glyph as an optional tolerance, the stub carries the original row's tokens verbatim, and the CORE-777 row was filed without a glyph.

**Style observations (archived notes are historical, so nothing rewritten, nothing filed):**

- Nav chips: `.2`/`.3`/`.4` wrote `✅ Completed` into the archived chip, and `.5`/`.6` left `🟢 In progress`. CORE-042.4 retired that write and no runner instructs it any more (grep over the runners and the template comes up empty), so the three writes were habit, not a contract gap.
- `.5`'s 🧩 Subtasks S1–S6 were left unticked even though every Acceptance criterion holds. The pre-move gate checks only Acceptance.
- `.2`/`.4` link their parent as `[[CORE-776.N]]`, while `.3`/`.5`/`.6` link `[[CORE-EPIC-776]]`.

**Successor hand-off check:** CORE-EPIC-778 retires `/ft-micro-task`, so `.2`'s and `.5`'s micro text must go with it. [[CORE-778.1]] Discovery names `.5`'s probe-template grading target, and 778.4 lists every other `.5` site. The `docs/EXTERNAL-AGENTS.md:79` parenthetical isn't a stable-surface row, but it names `/ft-micro-task`, so 778.5's `grep -rl ft-micro-task` sweep catches it. No gap.

**Misses filed as child rows:** none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown lint of record)

- [x] **Verification receipt** — see Testing Notes

- [x] **External review** — N/A: no inline fix landed. The diff is closure writes (this note, PLAN.md stub and parent flip).

- [x] (frontend) N/A — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh                                         → 0
§"ID allocation" idiom, CORE                                       → 778 (loose PLAN+ARCHIVE scan: 778)
grep rows with text between `] ` and `**` (PLAN + PLAN-ARCHIVE)   → none
grep stale cohort-era phrases over the 18 sweep docs               → none
grep '✅ Completed' write instruction in runners/template          → none (SPEC.md vocabulary only)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry in `.flaitron/tasknote/README.md` §"AI-referenced docs": **no change**. The cohort already updated `SPEC.md` (`.5`, `.6`), `docs/EXTERNAL-AGENTS.md` (`.5`), and `AGENTS.md` + `claude/AGENTS-snippet.md` (`.3`) in its own closures. A cumulative grep over all 18 entries for the retired phrasings ("carries no such item at all", "Wait for confirmation", "fresh Audit", "second wave", "highest existing", "non-epic task number", "nothing changes here", "no separate 👁️") returns nothing. The remaining `/ft-refactor --fast` restatement (`claude/CAPABILITIES.md:32`) already agrees with `.3`, and no sweep doc restates the allocation rule. Entries: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (stamp `v6.1.0 · 2026-10-08` is refreshed at release, not here), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — all no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → stub (nested; parent flip in the post-closure pre-step), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A

**Final Summary:**

The CORE-EPIC-776 cohort is coherent, and the audit found nothing to fix or file. The five drift fixes agree with each other and with every doc in the sweep set, and none of the seven review findings CORE-776.5 routed here is a real defect.

- Inventoried: `.2` micro same-turn continuation · `.3` refactor `--fast` label · `.4` second-audit sentence removed · `.5` micro `--unattended` review + `visual-confirm` · `.6` §"ID allocation" as the one allocation home.
- Routed findings: 2 false or already settled (glyph grep, area-scoped scan), 1 already covered (sidequest via item 5), 3 nits or non-defects in CORE-777's `tools/` code, and 1 stub that is correct as filed (glyph-less CORE-777).
- Inline fixes: none. Misses filed: none, so this closure flips CORE-EPIC-776.
- Verification: `bash tools/drift-checks.sh` → 0. Doc-drift sweep: no change on all 18 entries.
- CORE-EPIC-778 already carries every micro surface `.2` and `.5` touched.

**Archived:** 2026-10-10
