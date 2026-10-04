---
title: audit-skill
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [CORE-069, CORE-070, CORE-071]
---

# CORE-072 | audit-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-069]] [[CORE-070]] [[CORE-071]]

## 🎯 Goal

Ship a stack-neutral `/audit` skill in flowtron that adopters fork per stack, generalizing the 5-pass / capped-findings / writes-tickets-to-PLAN.md pattern from InvisiPaw's `audit-backend` and `audit-frontend` skills.

## ✅ Acceptance

- [ ] `claude/skills/audit/SKILL.md` ships the stack-neutral 5-pass scaffold (scope resolution from `$ARGUMENTS`, rubric load, verification gates, 5 passes, finding format with Critical/High/Medium/Low severity, closing-section contract, mandatory PLAN.md write step, hard rules).
- [ ] SKILL.md uses generic placeholders (no FastAPI/React worked examples); each pass describes its category and tells the forker what to fill in.
- [ ] SKILL.md carries an explicit "fork, don't symlink" note + a forker checklist enumerating fields to customize (description, rubric file paths, verification gate commands, per-pass examples, area-prefix list, sacred invariants).
- [ ] `claude/commands/audit.md` slash command stub matches the shape of `release.md` / `new-project.md` (1-line `description:` frontmatter + 1-paragraph "Invoke the `audit` skill" body).
- [ ] `docs/MIGRATION.md` adds a new §1.3 "Fork-per-stack skills (`/audit`)" with the copy-customize-stage workflow, sibling to §1.2 symlink wiring, citing why fork (per-stack rubric divergence).
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" entries (README, SPEC, MIGRATION, CLAUDE-snippet) at Phase 4 — per-entry verdict.
- [ ] PLAN.md line flipped to stub form (`Completed 2026-05-10.`) and tasknote moved to `_project/tasknote/archive/core/`.

## 🧩 Subtasks

- [ ] Draft `claude/skills/audit/SKILL.md` — stack-neutral scaffold with `name:` + `description:` frontmatter (flowtron house style), 5 sections (scope / 5 passes / finding format / closing sections / PLAN.md write / hard rules), and an explicit forker checklist.
- [ ] Draft `claude/commands/audit.md` slash command stub (mirror `release.md` shape).
- [ ] Add `docs/MIGRATION.md` §1.3 "Fork-per-stack skills (`/audit`)" with copy-customize-stage workflow.
- [ ] Phase 3: cross-read the three new/edited files for consistency, SPEC grammar alignment (task-line, area prefixes, priority sections, model tags), and cross-link integrity.
- [ ] Phase 4: doc-drift sweep over `_project/tasknote/README.md` §"AI-referenced docs", flip PLAN.md line to stub form, move tasknote to `archive/core/`.

## 🔗 Related

- [[CORE-069]] — Sibling audit-derived task (Finding #1, 2026-05-10); template `status:` default fix.
- [[CORE-070]] — Sibling audit-derived task; repo-layout / doc-currency.
- [[CORE-071]] — Sibling audit-derived task (Finding #4); release global-install doc.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit 2026-05-10 produced 4 findings — Findings #1, #2, #3, #4 closed via [[CORE-069]] (template `status:` default), [[CORE-070]] (repo-layout / doc-currency), [[CORE-071]] (release global-install doc). CORE-072 is the meta-finding: the audit itself was run manually (no shipped skill); InvisiPaw's `audit-backend` + `audit-frontend` skills hold a reusable scaffold worth promoting. Generalizing into a single shipped flowtron skill prevents adopters from re-deriving the same 5-pass / capped-findings / writes-to-PLAN.md scaffold per-stack and locks in flowtron's conventions (task-line grammar, area-prefix list, priority sections, model tagging).

- [x] Read relevant source files
- [x] **Archive skim** — `_project/tasknote/archive/core/` searched for prior audit-pattern tasknotes:
  - [[CORE-069]], [[CORE-070]], [[CORE-071]] (2026-05-10) — sibling audit-derived tasks closed today; same audit cycle.
  - [[CORE-042.8]], [[CORE-057.6]] — epic-internal "audit" subtasks (epic-shape verification, not skill-shipping). No prior decision contradicts shipping `/audit` as a generalized skill.
  - No prior tasknote re-examined InvisiPaw's audit skills as a flowtron-source pattern.
- [x] **Drift check** — verified at HEAD 2026-05-10:
  - `~/code/invisipaw/.claude/skills/audit-backend/SKILL.md` (8571B) and `~/code/invisipaw/.claude/skills/audit-frontend/SKILL.md` (7167B) live at cited paths.
  - 5-pass structure (Security & hardening / Idioms / Hygiene & naming / Orphans / Doc drift) identical across both InvisiPaw skills.
  - "Cap each pass at 5 findings max" and "Write tickets, not fixes" rules identical across both.
  - PLAN.md write-step mandate cites `_project/flowtron/SPEC.md §"Task-line format"` for grammar.
  - flowtron house frontmatter style: `name:` + `description:` only (release / new-project / epic-discovery / file-followup all confirmed); InvisiPaw's `when_to_use:` / `argument-hint:` / `disable-model-invocation:` fields are not used. Shipped `/audit` will follow flowtron house style.
  - No drift from task-description hypotheses.
- [x] Asked clarifying questions — three design questions resolved via AskUserQuestion:
  1. Skill location → `claude/skills/audit/SKILL.md` alongside other shipped skills, SKILL.md self-documents fork-don't-symlink.
  2. Worked examples → generic placeholders only (no per-stack worked examples).
  3. MIGRATION.md → add new §1.3 "Fork-per-stack skills (`/audit`)".
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source pattern (InvisiPaw skeleton — what's universal vs. stack-specific):**

| Universal (ships in flowtron's scaffold) | Stack-specific (forker fills in) |
|------------------------------------------|----------------------------------|
| Scope resolution from `$ARGUMENTS` (`all` / path / `last-commit` / `staged`, "stop and ask" on ambiguous) | Default-`all` glob (e.g. `backend/**/*.py` vs `frontend/src/**`) |
| Load project rubric step + "ask if unclear" | Which rubric files to load (CLAUDE.md, project skills, README) |
| Run verification gates step | Concrete commands (`ruff` + `pytest` vs. `tsc` + `npm run build`) |
| 5 passes in order: Security · Idioms · Hygiene · Orphans · Doc drift | Per-pass examples & stack-specific invariants (e.g. "paper-mode is sacred") |
| Cap 5 findings/pass + tail-count footnote | — |
| Finding format (Critical/High/Medium/Low + Location + Issue + Why + Fix) | Severity threshold examples (e.g. "paper-mode bypass = Critical") |
| Closing-section contract (Summary / Insights / Proposed tasks / Questions) | — |
| PLAN.md write step using flowtron task-line grammar + `Surfaced by audit YYYY-MM-DD (Finding #N, <severity>)` parenthetical + priority-section routing | Area-prefix list valid for this project (cite `_project/tasknote/README.md` §"Area prefixes") |
| Hard rules: targeted not exhaustive · tickets not fixes · don't repeat linter · don't audit adjacent · no final-summary-of-what-I-did | Project-specific hard rules (e.g. "paper-mode is sacred") |

**Pattern survey (flowtron skill shape conventions):**
- Flat `SKILL.md`-only directory (no lazy fragments) — matches release/, new-project/, epic-discovery/, close-epic/, file-followup/, micro-task/, starter-task/. Only `task/` has lazy fragments. `/audit` will be flat.
- Slash-command stub `claude/commands/<name>.md` — 1-line frontmatter (`description:`) + 1-paragraph "Invoke the `<name>` skill" body. Matches release.md / new-project.md.
- Frontmatter: `name:` + `description:` only. No `when_to_use:` / `argument-hint:` / `disable-model-invocation:`.
- Doc-set: flowtron's "AI-referenced docs" (per `_project/tasknote/README.md`) is README + SPEC + docs/MIGRATION.md + claude/CLAUDE-snippet.md. The `/audit` skill's "load rubric" placeholder will tell forkers to cite their own equivalents.

**Adopter wiring (the fork-vs-symlink decision):**
- MIGRATION.md §1.2 currently symlinks 6 adopter-installed skills (task, starter-task, micro-task, file-followup, epic-discovery, close-epic). Symlinks track the submodule and update on bump.
- `/audit` is the **fork-per-stack exception** because rubric files, verification commands, per-pass examples, and sacred invariants diverge by stack. Symlinking would freeze adopters to flowtron's generic scaffold; forking lets each adopter customize freely without breaking on flowtron bumps (their fork is their own).
- New MIGRATION.md §1.3 documents the copy-customize-stage flow + the rationale.

**Open verification (deferred to Phase 3):**
- Smoke-read all three new/edited files for cross-link integrity and SPEC grammar alignment.
- No automated tests apply (flowtron itself has no test suite for `claude/` content; viz tests are scoped to viz/).

**No clarifications remaining.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey verdict (matched existing shapes, no new shapes invented):**
- Skill frontmatter: `name:` + `description:` only — matches `release/`, `new-project/`, `epic-discovery/`, `close-epic/`, `file-followup/`, `micro-task/`, `starter-task/`. InvisiPaw's `when_to_use:` / `argument-hint:` / `disable-model-invocation:` extras dropped to align with flowtron house style.
- Skill directory shape: flat `SKILL.md`-only — matches all shipped skills except `task/` (which is special-cased with lazy fragments). `/audit` is a single SKILL.md.
- Slash-command stub: 1-line `description:` frontmatter + 1-paragraph "Invoke the `<name>` skill" body — matches `release.md` and `new-project.md`.

**Files shipped:**
- `claude/skills/audit/SKILL.md` (NEW, ~5.6KB) — stack-neutral 5-pass scaffold: §0 Forker checklist, §1 Scope & ground rules, §2 The 5 passes (Security / Idioms / Hygiene / Orphans / Doc drift), §3 Finding format with Critical/High/Medium/Low severity guide, §4 Required closing sections, §5 Write-tickets-to-PLAN.md mandate, §6 Hard rules. Generic-placeholder examples with `_(forker: ...)_` annotations marking the spots to customize; final §0 instruction to delete §0 from the fork once filled in.
- `claude/commands/audit.md` (NEW) — slash-command stub matching release.md / new-project.md shape, cites `docs/MIGRATION.md` §1.2.1 for install workflow.
- `docs/MIGRATION.md` — added new §1.2.1 "Optional: fork `/audit` per stack" with the copy-customize workflow + rationale (per-stack rubric divergence) + the option to split into per-stack forks. Marked optional so adopters can skip cleanly.

**Divergence from AskUserQuestion answer (worth flagging at the 📦 gate):**
The AskUserQuestion option for MIGRATION docs said "Add MIGRATION.md §1.3 … sibling to existing §1.2 symlink wiring." Implementing strict §1.3 would have required renumbering existing §1.3 → §1.4, §1.4 → §1.5, … §1.7 → §1.8, AND updating ~13 cross-refs across `claude/skills/new-project/SKILL.md` (cites §1.1–§1.7), `docs/MIGRATION.md` itself (cites §1.3, §1.6, §1.7), `SPEC.md` (cites §1.0), `SPEC/epic.md` (cites §1.2), `claude/skills/epic-discovery/SKILL.md` and `close-epic/SKILL.md` (both cite §1.2), `README.md` (cites §1.0). Chose §1.2.1 sub-subsection of §1.2 instead — same position in the doc (right after §1.2, before §1.3 CLAUDE-snippet paste), same narrative (wiring section, fork-not-symlink), zero cross-ref breakage. Functionally identical; numbering is the only diff.

**Cross-link integrity (built-in to authoring):**
- SKILL.md cites `docs/MIGRATION.md` §1.2.1 → resolves (just shipped).
- audit.md cites `docs/MIGRATION.md` §1.2.1 → resolves.
- MIGRATION.md §1.2.1 cites `_project/flowtron/claude/skills/audit/` and `_project/flowtron/claude/skills/audit/SKILL.md` → resolves from the adopter side (the flowtron submodule path).
- SKILL.md cites `_project/flowtron/SPEC.md` §"Task-line format" (with the flowtron-self alternative cite) — both surfaces present.
- SKILL.md cites `_project/tasknote/README.md` §"Area prefixes" — section exists in both the flowtron-self README and adopter tasknote-README template.

**No tests apply.** Flowtron itself has no test suite for `claude/` content; viz tests are scoped to viz/ only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only diff; flowtron has no test suite for `claude/` content).
- [x] Ran lint/type-check on changed code — N/A (markdown-only).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

**Verification gates run (in lieu of automated tests):**
1. **MIGRATION.md heading sequence smoke-test** — `grep "^### " docs/MIGRATION.md` confirms the §1 hierarchy reads 1.0 → 1.1 → 1.2 → 1.2.1 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7. Clean insertion, no orphaned headings, no out-of-order numbers.
2. **Cross-link target test** — all `§1.2.1` cites from the new SKILL.md (frontmatter `description:` + body §0 intro) and audit.md stub resolve to `docs/MIGRATION.md:92` (the new section heading).
3. **Preserved-cross-ref test** — pre-existing §1.3–§1.7 cites in `claude/skills/new-project/SKILL.md` (5 cites) and self-cites in `MIGRATION.md` (line 199 and line 316) still resolve to their original sections (since renumbering was avoided). Independent of CORE-072's edits — confirms the §1.2.1 choice was the right one.
4. **Skill frontmatter shape parity** — new SKILL.md frontmatter uses only `name:` + `description:`, matching the 7 other shipped flowtron skills (`release`, `new-project`, `epic-discovery`, `close-epic`, `file-followup`, `micro-task`, `starter-task`).
5. **Slash-command stub shape parity** — `claude/commands/audit.md` (7 lines, 136 chars) mirrors `release.md` / `new-project.md` shape: 1-line `description:` frontmatter + 1-paragraph "Invoke the `<name>` skill" body + closing pointer to install docs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep results:**
- `README.md` — **no change** (§"Repo layout" `claude/` line is illustrative, not exhaustive).
- `SPEC.md` — **no change** (§"Working in the flowtron repo itself" uses `…` ellipsis; covers `/audit` implicitly).
- `docs/MIGRATION.md` — **updated** (new §1.2.1 "Optional: fork `/audit` per stack" inserted at line 92, between §1.2 and §1.3). This is the CORE-072 deliverable, not drift.
- `claude/CLAUDE-snippet.md` — **no change** (paste-block + symlink-wiring section are tightly scoped to default-installed skills; `/audit` is optional + forked).

**Final Summary:**

Shipped a stack-neutral `/audit` skill in flowtron at `claude/skills/audit/SKILL.md` (~5.6KB) that generalizes InvisiPaw's two-skill audit pattern (`audit-backend` + `audit-frontend`) into a single 5-pass / capped-findings / writes-tickets-to-PLAN.md scaffold. The scaffold ships with generic placeholders marked `_(forker: …)_` at the customization points (default glob, rubric files, verification gates, per-pass examples, Critical-severity sacred invariants, project-specific hard rules); a §0 Forker checklist lists what to fill in and instructs the forker to delete §0 from their fork once filled in. Sibling slash-command stub at `claude/commands/audit.md`. Adopter-side install workflow documented in a new `docs/MIGRATION.md` §1.2.1 covering copy semantics (fork-not-symlink because per-stack rubrics diverge), the `cp` commands, and the per-stack split option. Numbering choice: §1.2.1 (sub-subsection of §1.2 wiring) was used instead of strict §1.3 to preserve ~13 existing cross-refs (new-project SKILL.md §1.3–§1.7 cites, MIGRATION self-cites at §1.3/§1.6/§1.7, SPEC §1.0 cite, epic.md §1.2 cite, README §1.0 cite). Functionally identical placement; flag at the gate if strict §1.3 numbering matters.

**Archived:** 2026-05-10
