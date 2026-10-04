---
title: refactor-and-structure-audit discovery
status: completed
tags: []
created: 2026-08-23
due:
related-tasks: [CORE-EPIC-463]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-463.1 | refactor-and-structure-audit discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-463]]

## 🎯 Goal

Scope the `CORE-EPIC-463` epic (`refactor-and-structure-audit`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-463.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-463.2 .. CORE-463.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-463.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-463.2 .. CORE-463.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-463 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-463]] — parent epic
- [[CORE-EPIC-389]] — audit-family-consolidation; prior consolidation of the audit skill family (`related-decision:`)

## 🌳 Fan-out

- **Parallel:** [[CORE-463.2]] · [[CORE-463.3]] · [[CORE-463.4]] — disjoint surfaces (new `passes/structure.md` · new `ft-refactor/` skill dir · `ft-audit` dispatcher §1 + `ft-update`)
- **Sequential:** [[CORE-463.5]] after [[CORE-463.2]], [[CORE-463.3]], [[CORE-463.4]] — reconciles symlink and roster count mirrors, which must reflect the final shipped set
- **Synthesis:** [[CORE-463.N]] — final-subtask audit; no extra parent synthesis task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery` after surfacing three linked concerns — no refactor skill exists, `/ft-audit` feels like "mostly re-running tests", and no pass covers stray scripts. Investigation confirmed all three as genuine gaps with a shared root (see below). Multi-child scope; not a single-task filing.

- [x] Read relevant source files — `claude/skills/ft-audit/SKILL.md` + all six `passes/*.md`; `claude/skills/ft-audit-repo/SKILL.md`; `claude/skills/ft-new-project/SKILL.md` Step 3; filled adopter forks at `bidviz/.claude/skills/audit-backend/` and `marscharts/.claude/skills/audit/`.

- [x] **Best Practices Review** — N/A for this Discovery: deliverable is PLAN.md child lines, no code surface touched. Responsibility boundaries between the two new skills were resolved as a scoping question instead (see "Resolved scoping").

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-389.{1,2,3,4,N}.md`. Load-bearing findings logged below.

- [x] **Drift check** — all cited paths verified against HEAD. No drift; two count invariants captured for `.5`.

- [x] Asked clarifying questions — resolved across three `AskUserQuestion` rounds; see "Resolved scoping".

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Root-cause finding (motivating the epic)

The operator's "`/ft-audit` is mostly re-running the tests" is a real symptom with a cause one layer below the skill design. `~/.claude/skills/ft-audit` is a **symlink to flowtron's unfilled scaffold** — every rubric slot reads `<forker: set this>` and every gate reads `<lint command for your stack>`. Only **6 of 24** repos under `~/code` carry a filled fork (`adppro`, `bananapeel`, `bidviz`, `marscharts`, `siteguy`, `InvisiPaw`); the filled ones are genuinely strong (bidviz names real sacred invariants and `uv run pyright` gates, 0 placeholders remaining). In the other **18 repos** the auditor loads placeholder rubrics, cannot ground findings in project contracts, and the only concrete grounded move left is the test suite.

Corroborated by PLAN.md itself: nearly every recent `Surfaced by audit-*` ticket is doc drift or a Low nit (`readme-task-counter`, `glossary-entry-count`, `platforms-model-hint-drift`) — a proofreader, not a structural reviewer.

### Gap inventory

- **No refactor skill anywhere.** Zero hits across flowtron's 18 bundled skills, 35 global skills, and every adopter fork. "refactor" appears only as incidental prose in `SPEC.md` (7×) and `ft-task`/`ft-goal-task`/`ft-micro-task`.
- **No structural audit domain.** Six domains exist (general · backend · frontend · security · performance · docs). `general`'s Hygiene (pass 3) and Orphans (pass 4) graze dead code and >60-line functions, but nothing targets duplication clusters, coupling, abstraction drift, god-files, or stray scripts. `ft-audit-repo` is explicitly first-contact-only and one-shot.
- **No refactor execution discipline.** The whole audit family is hard-ruled read-only ("Write tickets, not fixes"). A refactor ticket then falls to plain `/ft-task`, which carries no characterization-test-first step and no behavior-preservation contract.

### Shared design surface inventory

- **Skills (claude):** new `claude/skills/ft-refactor/` · new `claude/skills/ft-audit/passes/structure.md` · edits to `claude/skills/ft-audit/SKILL.md` §1 (bootstrap) and `claude/skills/ft-update/SKILL.md` (fork refresh).
- **Command wrappers:** new `claude/commands/ft-refactor.md`.
- **Codex mirror:** new `codex/skills/ft-refactor/SKILL.md` (thin read-the-claude-skill wrapper; `claude/skills` and `codex/skills` are at 18/18 parity today).
- **Cursor / Grok:** no `skills/` dirs by design — `cursor/AGENTS-snippet.md` + `grok/AGENTS-snippet.md` enumerate the roster instead.
- **Count invariants (CORE-374 class):** `ft-new-project` Step 3 wires 11 skills / "twenty-two symlinks" (line 124) → 12 skills / twenty-four. `ft-flowtron` roster 18 → 19.
- **Docs enumerating the family:** `docs/MIGRATION.md` §1.2.1 · `SPEC.md` §"Skill namespace" · `docs/PLATFORMS.md` · `docs/GLOSSARY.md` · `docs/CONVENTIONS.md` · `docs/VISION.md` · `docs/AGENT-NEUTRALITY.md` · `SECURITY.md` · `SPEC/tasknote-selection.md`.
- **Known mirror gap (pre-existing, not this epic's):** `ft-spec` exists in `claude/skills` and `codex/skills` but has no `~/.claude/skills` symlink.

### Archive precedent — CORE-EPIC-389 (`audit-family-consolidation`, closed 2026-08-01)

The closest structural precedent, and the reason this epic's shape is M=4.

- Its child split was **build · build · docs/migration · audit** (`.2` parameterized-survivor `[heavy]`, `.3` sibling-retirement `[light]`, `.4` migration-and-docs `[medium]`, `.N` audit `[medium]`). This epic mirrors it: three build children plus a consolidated wiring/docs child.
- It established the **four-surface wiring pattern** (claude skill · command wrapper · codex mirror · doc enumerations) and the **roster-count-mirror invariant** — both reused verbatim in `.5`'s scope.
- It recorded a deliberate **model deviation on `.N`** (`[medium]` where the parent was `[heavy]`), which is the precedent for this epic filing `.N` as `[light]🔧`.
- It confirmed `ft-audit-repo` / `ft-audit-context` are **not** family members (different shape and install tier, per CORE-309 / CORE-186) — so neither is in scope here.

### Install-tier landscape (drove the `/ft-refactor` placement question)

Three tiers exist today: **symlinked** (11 stack-neutral drivers), **forked** (`ft-audit` alone — needs per-stack rubrics), and **by-reference from the submodule** (`ft-audit-repo`, `ft-audit-context`). `/ft-refactor` joins the symlinked tier.

### Resolved scoping

| Question | Resolution |
|---|---|
| Do we already have a refactor skill? | **No** — confirmed absent across flowtron, global, and all adopter forks |
| Capability shape | **Both** a find surface and a plan surface — but `/ft-refactor` **files follow-ups/epics, never fixes inline** |
| `/ft-refactor` vs `structure` domain boundary | `structure` = breadth sweep, 5 capped passes, flat tickets. `/ft-refactor` = **depth planner on one named target**, emitting a sequenced epic; code changes happen in normal `/ft-task` cycles |
| Safety contract | **Strict** — characterization tests pin behavior before restructuring; refactor commits behavior-preserving and never mixed with feature change. Encoded as acceptance criteria on the filed children, not executed by the skill |
| Unfilled-scaffold problem | **In scope** — make `/ft-audit` self-filling (detect placeholders, auto-derive gates from `package.json` / `pyproject.toml` / CI config, offer fork+fill inline) |
| Stray scripts | **A pass inside the new `structure` domain** |
| Where the skill lives | **flowtron** (layer 2, bundled). Global `ft-*` skills are already symlinks into flowtron; natabula is the layer-3 personal-config deposit layer |
| `/ft-refactor` install tier | **Symlinked**, like `/ft-task` and `/ft-spec` (22 → 24 symlinks) |
| Existing-fork propagation | Teach **`/ft-update`** to detect a local `ft-audit` fork missing newly-shipped pass files and offer to add them without clobbering filled rubrics — folded into `.4` |
| Area / priority / model / M | **CORE** · **Medium** · **`[heavy]🧠`** · **M=4** |
| Audit bracket | Included as `CORE-463.N`, filed `[light]🔧` (fixed doc-drift sweep; matches CORE-460.N / 459.N / 457.N precedent) |

### Drafted child lines (word-counted, ≤50w target / 70w hard cap)

- **.2** `structure-domain` `[heavy]🧠` — 35w
- **.3** `refactor-planner` `[heavy]🧠` — 34w
- **.4** `audit-scaffold-bootstrap` `[heavy]🧠` — 38w
- **.5** `wiring-and-docs` `[medium]🧩` — 38w (deliberate deviation from the parent's `[heavy]`; mirrors CORE-389.4's `[medium]🧩` for the same work shape)

### Downstream-impact reconciliation scan

`## High`, `## Low`, and `## Future Opportunities` are all `(none)`, and `## Medium` contains only this epic's own freshly-filed cohort. **No downstream impact** — no existing active entry shares a surface with any new child.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-EPIC-389 cohort-children filing pattern verbatim (2-space indent under the parent, `[model]` tag on every line, em-dash separator, per-child description under the 50w target). No new shape introduced.

- [x] **Minimal refactor gate** — N/A. Pure PLAN.md filing; no code surface touched, nothing to refactor or defer.

- [x] Implemented the minimal solution — four child lines written under `CORE-EPIC-463`, positioned after `.1` and before the reserved `.N`.

- [x] Updated/added tests — N/A (pure PLAN.md filing; no executable code surface).

**Implementation Notes:**

- **Lines written:** 4 (`CORE-463.2` … `CORE-463.5`), each nested at 2-space indent beneath `CORE-EPIC-463` in `## Medium`.
- **Word counts:** `.2` 35w · `.3` 34w · `.4` 40w · `.5` 41w — all under the 50w target, well under the 70w hard cap.
- **M unchanged from filing-time estimate:** M=4 as locked in Step 2. The `.N` audit suffix is untouched and never renumbers.
- **Model deviations from the parent's `[heavy]🧠`, both deliberate:** `.5` filed `[medium]🧩` (wiring + doc sweep against an established pattern — mirrors CORE-389.4's `[medium]🧩` for the same work shape); `.N` filed `[light]🔧` (fixed doc-drift sweep — matches CORE-460.N / 459.N / 457.N).
- **Scope absorbed into `.4`:** the `/ft-update` fork-refresh capability resolved in scoping. It shares the scaffold-lifecycle surface with the self-filling bootstrap, so folding it in avoids a fifth child that would touch the same file.
- **Fan-out populated:** `.2`/`.3`/`.4` parallel (disjoint surfaces), `.5` sequential after all three (reconciles count mirrors), `.N` synthesis. No `blocked-by:` / `parallel-safe-with:` keys written onto the PLAN lines — those land on each child's tasknote at `/ft-task` scaffold.
- **Downstream-impact reconciliation:** **no downstream impact.** `## High`, `## Low`, and `## Future Opportunities` are all `(none)`; `## Medium` holds only this epic's own cohort. No existing active entry shares a surface with any new child, so no reconcile edits were proposed or applied.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits only; no test surface).

- [x] Ran lint/type-check on changed code — N/A (no lintable code surface).

- [x] **Quality assertions** — markdown mental-pass on the edited PLAN.md block; results below.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the `CORE-EPIC-463` block:

- 2-space child indent preserved on all six child lines ✅
- `**CORE-463.<M>**` bold IDs intact ✅
- `[model]` tag present on every line ✅
- `| <shortname>` present and ≤30 chars — `structure-domain` 16 · `refactor-planner` 16 · `audit-scaffold-bootstrap` 24 · `wiring-and-docs` 15 · parent `refactor-and-structure-audit` 28 ✅
- Em-dash separator (` — `) consistent across all lines ✅
- Long descriptions ≤50w target / ≤70w hard cap ✅
- Trailing whitespace — `grep -nE " +$" .flowtron/PLAN.md` returned nothing ✅
- `## 🌳 Fan-out` present and populated; wikilinks resolve to the four filed children plus `.N` ✅
- No reconcile-edited existing lines to re-check (no downstream impact) ✅

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change |
  | `AGENTS.md` | no change |
  | `SPEC.md` | no change |
  | `docs/MIGRATION.md` | no change — §1.2.1 rewrite is `.5`'s deliverable |
  | `claude/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `codex/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `cursor/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `grok/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `docs/CONVENTIONS.md` | no change — enumeration edit lands in `.5` |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — enumeration edit lands in `.5` |
  | `docs/AGENT-NEUTRALITY.md` | no change — enumeration edit lands in `.5` |
  | `docs/PLATFORMS.md` | no change — enumeration edit lands in `.5` |
  | `claude/CAPABILITIES.md` | no change |
  | `docs/AGENT-COMPAT.md` | no change |
  | `docs/EXTERNAL-AGENTS.md` | no change |
  | `docs/WORKTREES.md` | no change — `.2`/`.3`/`.4` are marked parallel-safe, but no worktree convention change is implied |

  As expected for a pure Discovery filing: contract edits live inside the implementation children, not here.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.1` line flipped to stub form and kept nested beneath the active `CORE-EPIC-463` parent per the epic-cohort grouping rule, tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Filed `CORE-EPIC-463` (`refactor-and-structure-audit`) and closed its `.1` Discovery, scoping four implementation children.

The Discovery's load-bearing finding was diagnostic rather than architectural: the operator's report that `/ft-audit` is "mostly re-running the tests" traces not to the skill's design — which is substantive, with six domain pass-libraries, capped findings, severity guides, and an anti-rationalization table — but to its **install state**. `~/.claude/skills/ft-audit` symlinks flowtron's unfilled scaffold, so in the 18 of 24 `~/code` repos without a filled fork, every rubric slot reads `<forker: set this>` and every gate reads `<lint command for your stack>`. With no project contracts to audit against, the test suite is the only grounded move left. The six filled forks (notably `bidviz/.claude/skills/audit-backend/`, 0 placeholders remaining) confirm the design works when filled — making this a distribution defect, not a design defect. That reframing produced `.4`, which was not in the original brief.

Two genuine capability gaps were confirmed absent across flowtron's 18 bundled skills, 35 global skills, and every adopter fork: no refactor skill of any kind, and no structural audit domain (`general`'s Hygiene and Orphans passes graze dead code and long functions but never reach duplication clusters, coupling, abstraction drift, or stray scripts).

**Changed files:** `.flowtron/PLAN.md` (+7 lines — parent, `.1`, four children, `.N`) and this tasknote.
**Verification:** markdown mental-pass (indent, bold IDs, model tags, shortname lengths, em-dashes, word counts, trailing whitespace, Fan-out wikilinks) — all pass. No test or lint surface.
**Refactors:** none made, none deferred — no code surface.
**Documentation verdict:** 17/17 AI-referenced docs "no change"; every contract edit is assigned to a named child.
**Maintainability effect:** converts a diffuse "our audits feel shallow" intuition into four independently-executable children with an explicit read-only boundary — `/ft-refactor` plans and files, never edits, keeping the audit family's read-only contract intact rather than carving an exception into it.

**Archived:** 2026-08-23
