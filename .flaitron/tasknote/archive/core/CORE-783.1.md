---
title: unattended-prep discovery
status: completed
tags: []
created: 2026-10-13
due:
related-tasks: [CORE-EPIC-783]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-783.1 | unattended-prep discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-783]]

## 🎯 Goal

Scope the `CORE-EPIC-783` epic (`unattended-prep`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-783.2..CORE-783.3` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-783.2 .. CORE-783.3 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-783.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-783.2 .. CORE-783.3; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-783 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-783]] — parent epic
- [[CORE-783.2]] — sequential head; clause 3 pin
- [[CORE-783.3]] — after [[CORE-783.2]]; prep skill
- [[CORE-783.N]] — synthesis audit

## 🌳 Fan-out

- **Sequential:** [[CORE-783.3]] after [[CORE-783.2]]
- **Synthesis:** [[CORE-783.N]] (audit; no extra parent synthesis task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator confirmed CORE-EPIC-783 at the `/ft-open-epic` ID gate (Medium, `[heavy]`, M=2, audit kept). The work is a new attended skill plus a candidacy-contract pin, which is epic scope.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

  N/A — no code module. The boundary is a SPEC sentence plus a markdown skill.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/core/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

### Surface inventory

Predicate and seed, read at HEAD:

- `SPEC/unattended-candidacy.md` — recommend-never-write; six-clause predicate; three postures; seed is the bulk path for rows already on disk. Clause 3 is a keyword screen (glyphs plus operator / hand-off / manual / credential / secret / password / physical / cross-repo / production / deploy / migration). The same paragraph says a row that reads as needing a person but trips no keyword is still declined under the conservative default.
- `claude/skills/ft-seed-unattended/SKILL.md` — attended, flagless, one prose gate, edits existing rows only, never scaffolds a tasknote, never repairs a row. Codex wrapper is a pointer at `codex/skills/ft-seed-unattended/SKILL.md`.
- `claude/skills/ft-file-task/starter-mode.md` — `--starter` already files a PLAN row plus a `status: starter` note, and its review gate already proposes `[unattended]` when the predicate admits the line. `--starter` refuses `--unattended`.
- Adopter wiring for a utility in the seed class touches the `ln -s` blocks and roster prose in `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, plus `SPEC/layout.md` §"Skill namespace", `docs/PLATFORMS.md`, `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `docs/EXTERNAL-AGENTS.md`, `docs/CONTEXT-BUDGET.md`, `AGENTS.md`, and `tools/drift-checks.sh` (`skill_pin_guard_parity` hardcodes six adopter-subset bodies; `shipped_skill_parity` requires a matching `codex/skills/<slug>/SKILL.md`).
- `docs/CONTEXT-BUDGET.md` skill-body row lists `ft-seed-unattended` at 12,457. A new `SKILL.md` needs its own measured row.
- Templates: `templates/tasknote-starter-template.md` is the starter body a prep pass would fill. No new template is assumed.

Out of this repo, recorded so the handoff is specific: project-07 `backend/project-07/flaitron/selection.py` mirrors clause 3 as keywords only, and its comment treats a keyword miss as `obvious`. `project-07 run` does not drive Playwright against adopter UI. Playwright there is the status UI suite. A `👁️` ask under `--unattended` parks `visual-confirm` (`claude/skills/ft-task/unattended-mode.md`).

### Archive skim

`<area>` for `CORE-*` is `archive/core/` (`.flaitron/tasknote/README.md`). Load-bearing precedents, not a full-text sweep:

- [[CORE-619]] — added `/ft-seed` (renamed `/ft-seed-unattended` at v7.0.0). Its `touches:` is the wiring list a sibling utility repeats: both skill trees, four snippets, layout, candidacy module, plan-filing, glossary, platforms, context budget, external agents, migration.
- [[CORE-577.2]] — authored the predicate. [[CORE-736]] later fixed the `.N` sibling rule and warned that mirrors must not restate the predicate.
- [[CORE-EPIC-577]] cohort is the candidacy origin. This epic extends the prep path. It does not reopen who writes the token.

### Drift

Cited flaitron paths exist at HEAD and match the reads above. PLAN parent, `.1`, and `.N` match the locked filing (`1ba288e8`).

One wording split is live, not bit-rot: `SPEC/unattended-candidacy.md` clause 3 says a person-shaped row with no keyword is still declined. Project-07's mirror comment says that same miss is still `obvious`. This epic can clarify the SPEC sentence. The mirror edit is a handoff, filed in project-07, not written here.

Parent placeholder overclaim, refined in this closure: "stays the only writer of `[unattended]`" was stronger than the contract. Every attended filer already writes the token when its own confirm keeps it. The parent line now says this pass never writes the token and `/ft-seed-unattended` stays the marker walk.

### Resolved before the open questions

| Decision | Answer |
|---|---|
| Shape | Sibling attended skill. Seed stays a one-gate marker walk. |
| What may be proposed | A factual pin (file, command, or which of two existing patterns). A visual phrase may be rewritten only when an existing test command is named. A row may be split into a mechanical child plus an attended remainder. Taste, credentials, deploy, and a true look stay declined. The worker does not gain a new Playwright spec as its acceptance. |
| Where | Flaitron only. Project-07 mirror of any SPEC clarification is a handoff. |
| Epic | CORE-EPIC-783, Medium, `[heavy]`, M=2, audit kept. `.1` is `[frontier]` by the heavy-epic Discovery trigger. |

### Resolved scoping

| Question | Answer |
|---|---|
| Skill slug | `/ft-prep-unattended`. Attended, flagless. Never writes `[unattended]`. |
| What a confirm writes | Rewritten lines, a split's mechanical child plus attended remainder, and a starter note when the remainder needs context. No token. A later `/ft-seed-unattended` marks a child the predicate admits. Existing filers keep their own gates. |
| Clause 3 | Two layers. The keyword list stays the mechanical screen. A keyword miss is not a semantic pass: an LLM filer and this prep pass decline a row that reads as needing a person. No new visual or raster keywords. Project-07's miss-means-obvious comment is a handoff. |
| Shipping | Adopter subset, same class as `/ft-seed-unattended`: Claude body, Codex wrapper, four snippet `ln -s` blocks, drift pin-guard list, glossary, platforms, migration, context budget. |

### Draft child lines (written in Phase 2)

Both `[heavy]`, uniform with the epic seed. `.2` clarifies an existing sentence, so the contract-design frontier trigger was noted and not taken.

- `CORE-783.2` `| candidacy-prep-boundary` — 45w. Pin clause 3 as two layers: the keyword list stays the mechanical screen, and a keyword miss is not a semantic pass. An LLM filer and /ft-prep-unattended decline a row that reads as needing a person. No new visual keywords. Project-07's mirror is a handoff.
- `CORE-783.3` `| prep-unattended-skill` — 34w. Add attended flagless /ft-prep-unattended. It classifies declined rows, pins a fact, splits a mechanical child from an attended remainder, and files starters. It never writes [unattended]. Ship it in the adopter subset beside seed.

Fan-out to fill at the write: Sequential `CORE-783.3` after `CORE-783.2`. Synthesis `CORE-783.N`. No parallel row. Candidacy over these two lines plus `.N` admits nothing (clause 1, all `[heavy]`). The only other open PLAN row is CORE-641, a parked TypeScript wait. No downstream impact.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: CORE-EPIC-057 cohort shape — 2-space children, `[model]` plus glyph, em dash, descriptions under the cap. Parent description refined in place. Checkbox flip is `.1` only.

Lines written: 2. `CORE-783.2` 45w. `CORE-783.3` 34w. Parent refined description 47w. M stayed 2. Audit line confirmed as filed.

No downstream impact. The only other open row is CORE-641, a parked TypeScript wait. It shares no surface with this cohort.

Candidacy: no candidates. Clause 1 fails on `CORE-783.2`, `CORE-783.3`, and `CORE-783.N` (all `[heavy]`). `.2` also contains the word handoff, so a later retag to `[light]` or `[medium]` would still fail clause 3. Models uniform with the `[heavy]` seed. Frontier trigger for `.2` noted and not taken.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

N/A — pure PLAN.md filing plus this tasknote. No test, lint, or frontend surface. External review N/A: the deliverable is filed PLAN lines, not a diff to grade.

Markdown mental-pass on the Medium block: 2-space indent on `.1`, `.2`, `.3`, and `.N`. Bold IDs intact. `[model]` plus glyph on every line. No `[unattended]` token. Shortnames `unattended-prep` (15), `unattended-prep discovery` (25), `candidacy-prep-boundary` (23), `prep-unattended-skill` (21), `unattended-prep audit` (21), all ≤30. Em dash separator. Descriptions 47 / stub / 45 / 34 / 23 words. Fan-out present: Sequential `[[CORE-783.3]] after [[CORE-783.2]]`, Synthesis `[[CORE-783.N]]`, Parallel omitted.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Discovery closed for CORE-EPIC-783. Two implementation children are filed. The prep pass never writes `[unattended]`, and the parent no longer claims seed is the only writer.

Doc-drift, each AI-referenced entry: no change. `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. Contract edits land in CORE-783.2 and CORE-783.3. The project-07 mirror is not a stable-surface move, so no caller-side row is filed in this closure. CORE-783.2 files that handoff when the sentence actually changes.

`touches:` declared `.flaitron/PLAN.md`. The closure also archives this note. Nav chip left `🟢 In progress` — the completed chip is render-derived from YAML.

Learnings: N/A. The roster line belongs to CORE-783.3.

**Archived:** 2026-10-13
