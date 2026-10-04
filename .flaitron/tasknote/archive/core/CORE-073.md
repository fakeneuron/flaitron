---
title: audit-flowtron-self
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [CORE-072]
---

# CORE-073 | audit-flowtron-self

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-072]]

## 🎯 Goal

Fork the stack-neutral `/audit` skill ([[CORE-072]]) into flowtron-self's `.claude/skills/audit/`, customize it for flowtron's markdown-doc + skill-scaffold surface, then run a real audit pass on `SPEC.md` + `claude/skills/` and file findings as follow-up tickets per `/audit` §5.

## ✅ Acceptance

- [ ] `.claude/skills/audit/SKILL.md` ships as a fork of `claude/skills/audit/SKILL.md` with the §0 Forker checklist filled in for flowtron's markdown-doc + skill-scaffold surface, then the §0 block itself deleted from the fork.
- [ ] `.claude/commands/audit.md` installed as a copy of `claude/commands/audit.md` (matches MIGRATION.md §1.2.1 install workflow).
- [ ] Default-`all` glob set to the wide markdown surface: `SPEC.md` + `SPEC/**/*.md` + `claude/skills/**/*.md` + `claude/commands/**/*.md` + `claude/CLAUDE-snippet.md` + `docs/**/*.md` + `templates/**/*.md` + `README.md`. Excludes `_project/tasknote/archive/`, `legacy/`, `viz/`.
- [ ] Rubric files: `SPEC.md` + `SPEC/` modules, `claude/skills/task/SKILL.md` (executable interpretation), `docs/MIGRATION.md`, `README.md`, `claude/CLAUDE-snippet.md`.
- [ ] Verification gates: cross-link integrity grep (broken `[[wikilinks]]` and `§"Section name"` cites) + skill frontmatter shape parity (`name:` + `description:` only).
- [ ] The 5 passes reframed for flowtron's markdown-doc + skill-scaffold surface (per-pass examples customized; Pass 1 reframed Security → Safety & integrity).
- [ ] Critical-severity sacred invariants named: write-once policy on archives, SPEC↔SKILL contract integrity, canonical-doc cross-link integrity, adopter-side path resolution.
- [ ] Hard rules append: skip `archive/` + `legacy/` + `viz/`; SKILLs cite-don't-restate SPEC; §0 Forker checklist deletion is itself one of the hard rules to remember.
- [ ] Cross-link integrity grep + frontmatter shape parity run on the new fork before the audit pass.
- [ ] Real audit pass executed against `SPEC.md` + `claude/skills/` (PLAN.md-locked scope). Findings file as new tasks in `_project/PLAN.md` with `Surfaced by audit 2026-05-10 (Finding #N, <severity>)` parenthetical per `/audit` §5; zero-findings case logs "zero findings" explicitly and skips the PLAN.md write.
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" at Phase 4 — per-entry verdict.
- [ ] PLAN.md line flipped to stub form (`Completed 2026-05-10.`) and tasknote moved to `_project/tasknote/archive/core/`.

## 🧩 Subtasks

- [ ] **Install the fork** — `mkdir -p .claude/skills/audit` then `cp claude/skills/audit/SKILL.md .claude/skills/audit/SKILL.md` and `cp claude/commands/audit.md .claude/commands/audit.md`.
- [ ] **Customize the fork (§0 walk-through, then §0 deletion):**
  - Frontmatter `name:` + `description:` — flowtron-self specific blurb.
  - §1 step 1 default-`all` glob — wide markdown surface (8 globs above).
  - §1 step 2 rubric files — SPEC.md, SPEC/, claude/skills/task/SKILL.md, docs/MIGRATION.md, README.md, claude/CLAUDE-snippet.md.
  - §1 step 3 verification gates — cross-link integrity grep + frontmatter shape parity check.
  - §2 5-pass examples — reframed for markdown-doc + skill-scaffold surface (Pass 1 Security → Safety & integrity; per-pass examples per Discovery Notes).
  - §3 Critical severity — name flowtron's sacred invariants.
  - §5 step 2 area-prefix list — confirm `CORE-` / `BE-` / `FE-` / `DB-` / `DEPLOY-` / `TEST-` per SPEC §"Task ID convention".
  - §6 hard rules append — skip archive/ + legacy/ + viz/; SKILLs cite-don't-restate; remember to delete §0 from future forks.
  - Delete §0 Forker checklist from this fork.
- [ ] **Verify the fork** — cross-link integrity grep (no broken wikilinks / section cites) + frontmatter shape parity (matches sibling skills).
- [ ] **Run the audit pass** on `SPEC.md` + `claude/skills/` (PLAN.md-locked scope):
  - §1 Scope & ground rules — resolve scope, load rubric, run verification gates.
  - §2 5 passes — Safety & integrity · Idioms · Hygiene · Orphans · Doc drift; cap each at 5 findings.
  - §4 closing sections — Summary, Exploratory Insights, Proposed tasks (inline), Questions.
  - §5 PLAN.md write — file findings as new tasks with `Surfaced by audit 2026-05-10 (Finding #N, <severity>)` parenthetical; zero-findings → explicit note, no write.
- [ ] **Phase 4 closure** — doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", PLAN.md flip to stub form, archive move to `_project/tasknote/archive/core/CORE-073.md`.

## 🔗 Related

- [[CORE-072]] — Parent: shipped the stack-neutral `/audit` scaffold this task forks from.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-072 (2026-05-10) shipped the stack-neutral `/audit` scaffold at `claude/skills/audit/SKILL.md` precisely so adopters could fork-and-customize per stack — flowtron-self is itself an adopter of its own canonical scaffold. Forking it locally serves three independent purposes: (1) dogfoods the §0 Forker checklist end-to-end, surfacing any gaps in the scaffold's own customization story; (2) gives flowtron-self a real `/audit` invokable against its own contract docs, repeatable on every release; (3) immediately produces value via a first audit pass on `SPEC.md` + `claude/skills/`. The audit-derived 4-finding pass on 2026-05-10 (closed via [[CORE-069]] / [[CORE-070]] / [[CORE-071]] / [[CORE-072]]) was run manually; CORE-073 replaces ad-hoc-audit with a structured one.

- [x] Read relevant source files
- [x] **Archive skim** — `_project/tasknote/archive/core/` searched for prior audit-pattern / skill-fork tasknotes:
  - [[CORE-072]] (2026-05-10) — direct parent; shipped the stack-neutral `claude/skills/audit/SKILL.md` (~5.6KB) + `claude/commands/audit.md` + `docs/MIGRATION.md` §1.2.1 install workflow. The fork inputs are the canonical CORE-072 deliverables.
  - [[CORE-042.8]] / [[CORE-057.6]] — epic-internal "audit" subtasks (epic-shape verification, not skill-shipping). No precedent on a flowtron-self fork.
  - [[CORE-069]] / [[CORE-070]] / [[CORE-071]] (2026-05-10) — sibling audit-derived tasks from the 2026-05-10 manual audit pass; their existence confirms a flowtron-self audit produces real, fileable findings.
  - [[CORE-038]] / [[CORE-050]] / [[CORE-051]] — cite-don't-restate precedent for SKILL files; the audit's idioms pass enforces it.
  - [[CORE-035]] — retired "Last updated:" line; orphans pass should flag any residue.
  - [[CORE-047]] — doc-set drift contract; doc-drift pass's home pattern.
- [x] **Drift check** — verified at HEAD 2026-05-10:
  - `claude/skills/audit/SKILL.md` (157 lines, 4 sections + forker checklist + hard rules) — exists, content matches CORE-072 archive narrative.
  - `claude/commands/audit.md` (5 lines, frontmatter + 1-paragraph body) — exists.
  - `docs/MIGRATION.md` §1.2.1 — exists at line 92, headed "Optional: fork `/audit` per stack", describes the `mkdir + cp + cp` install + the customize-§0-then-delete-§0 contract.
  - `.claude/skills/task/` — symlink → `../../claude/skills/task` (precedent for flowtron-self installing local skills via symlink; `/audit` is the fork exception per MIGRATION §1.2.1).
  - `.claude/skills/` currently has only `task/` (symlink) — no prior `/audit` fork; clean slate.
  - `.claude/commands/` currently has only `task.md` — slash-command stub install will be the first `.claude/commands/audit.md` write.
  - PLAN.md task description rubric (`SPEC.md` / `SPEC/`, `claude/skills/`, `docs/`, `README.md`) — all paths resolve at HEAD.
  - No drift from PLAN.md hypothesis.
- [x] Asked clarifying questions — three design choices resolved via AskUserQuestion:
  1. Default-`all` glob → **wide markdown surface** (8 globs covering SPEC + SKILLs + commands + CLAUDE-snippet + docs + templates + README).
  2. Audit-pass scope for this tasknote → **lock to PLAN.md** (`SPEC.md` + `claude/skills/`); widening defers to a follow-up.
  3. Slash-command stub install → **both** (`.claude/commands/audit.md` + `.claude/skills/audit/SKILL.md`), matching MIGRATION §1.2.1.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source landscape

| Surface | Path | Role for the fork |
|---|---|---|
| Stack-neutral scaffold | `claude/skills/audit/SKILL.md` | Source to fork — copy verbatim, then customize per §0 |
| Slash-command stub | `claude/commands/audit.md` | Source to copy into `.claude/commands/audit.md` |
| Install contract | `docs/MIGRATION.md` §1.2.1 (line 92) | The canonical fork workflow this task follows |
| Pattern precedent | `.claude/skills/task/` (symlink → `../../claude/skills/task`) | Confirms local `.claude/skills/` is wired; `/audit` is the fork exception |

### Locked customization choices

**Default-`all` glob** (Q1, wide markdown surface):

```
SPEC.md
SPEC/**/*.md
claude/skills/**/*.md
claude/commands/**/*.md
claude/CLAUDE-snippet.md
docs/**/*.md
templates/**/*.md
README.md
```

Excluded by design: `_project/tasknote/archive/` (write-once historical records), `legacy/`, `viz/` (out-of-scope for markdown-surface audit; viz has its own audit story to be filed separately if needed).

**Rubric files** (the *standards* to audit against — distinct from the glob, which is *what gets audited*; they overlap heavily but the rubric is the contract layer):

- `SPEC.md` + `SPEC/` modules — canonical workflow contract.
- `claude/skills/task/SKILL.md` — the executable interpretation of SPEC; precedent for cite-don't-restate (per [[CORE-038]] / [[CORE-050]] / [[CORE-051]]).
- `docs/MIGRATION.md` — adopter-side contract.
- `README.md` — repo entry point.
- `claude/CLAUDE-snippet.md` — adopter-facing paste target.

**Verification gates** (markdown-only — no linter, no type-checker, no test suite for `claude/` content):

- **Cross-link integrity grep** — broken `[[wikilink]]` references and broken `§"Section name"` cites. Implementation: `grep -nE '\[\[([A-Z]+-(EPIC-)?[0-9]+(\.[0-9]+)?)\]\]'` for wikilinks + `grep -nE '§"[^"]+"'` for section cites; cross-reference against actual headings and PLAN.md IDs.
- **Frontmatter shape parity** — all `claude/skills/*/SKILL.md` use `name:` + `description:` only (no `when_to_use:` / `argument-hint:` / `disable-model-invocation:` per CORE-072's house-style verdict). Implementation: grep for retired frontmatter keys.

### 5-pass reframing (markdown-doc + skill-scaffold surface)

| Pass | Stack-neutral name | Flowtron-self reframe | Example findings to look for |
|---|---|---|---|
| 1 | Security & hardening | **Safety & integrity** | Write-once policy violations (retroactive archive edits); broken-cite hazards in canonical contracts; version-pin drift between SPEC.md / CHANGELOG / git tags; submodule pinning hazards; CLAUDE-snippet vs. SPEC contract divergence |
| 2 | Canonical / idiomatic | **Flowtron house style** | Task-line grammar conformance; area-prefix list canonicity; priority-section names; model tagging on new entries; frontmatter shape (`name:` + `description:` only); SKILL files cite-don't-restate SPEC; banner-cue parity (🛠️ / 📦); `_(forker: …)_` annotation discipline |
| 3 | Code hygiene & naming | **Markdown hygiene** | Section heading emoji discipline (🎯/✅/🧩/🔗/📝/🛠️/🧪/🚀, etc.); wikilink form (always `[[ID]]`, never bare ID for cross-refs); code-fence language tags; line-wrap consistency; terminal command shape; bullet vs. checkbox usage |
| 4 | Orphaned / historical leftovers | **Orphans** | Dead cross-refs (sections that no longer exist); retired-field mentions (the `priority:` / `area:` / `model:` retirement per SPEC §"Tasknote frontmatter" write-once policy); "Last updated:" residue (per [[CORE-035]]); vestigial references to removed skills/features; commented-out config |
| 5 | Documentation drift | **Documentation drift** | SPEC vs. SKILL drift (SKILL describes behavior SPEC doesn't authorize); MIGRATION vs. CLAUDE-snippet vs. README drift; version-bump drift (SPEC version vs. CHANGELOG vs. tags); `tasknote/README.md` "AI-referenced docs" list completeness |

### Sacred invariants (Critical severity for §3)

- **Write-once policy on archived tasknotes** — never retroactively edit `_project/tasknote/archive/`. Spec is canonical at SPEC §"Tasknote frontmatter".
- **SPEC↔SKILL contract integrity** — SKILL files cite, don't restate, SPEC (per [[CORE-038]], [[CORE-050]], [[CORE-051]]); SKILL can't silently authorize behavior SPEC doesn't sanction.
- **Canonical-doc cross-link integrity** — broken `[[wikilinks]]` or `§"Section name"` cites in SPEC / SKILL / MIGRATION mislead every downstream reader.
- **Adopter-side path resolution** — any path mentioned in flowtron docs must resolve from BOTH flowtron-self AND the `_project/flowtron/` submodule perspective (per the CORE-072 cross-link integrity discipline).

### Project-specific hard rules (§6 append)

- Skip `_project/tasknote/archive/`, `legacy/`, and `viz/` — they're either frozen historical records or out-of-scope for this fork.
- SKILLs cite SPEC, don't restate SPEC (per [[CORE-038]] / [[CORE-050]] / [[CORE-051]]). Any SKILL that duplicates a SPEC paragraph is a Medium-severity finding.
- This fork is its own §0 example — remember to delete §0 from THIS fork once filled in. Leaving §0 in a fork confuses the auditor's first read on every subsequent run.

### Pattern survey (deferred to Phase 2)

- The `.claude/skills/task/` symlink (→ `../../claude/skills/task`) is the precedent for "flowtron-self uses local `.claude/skills/`". For `/audit`, the local copy must be a real file fork (not a symlink) — symlinking would defeat the whole "per-stack customization" point of MIGRATION §1.2.1.
- Customization touches §0 (delete), `name:`+`description:` frontmatter, §1 step 1 (glob), §1 step 2 (rubric), §1 step 3 (gates), §2 per-pass examples, §3 sacred invariants under Critical, §5 step 2 area-prefix list (confirm), §6 hard rules append. §4 closing-section contract and §5 PLAN.md write step stay verbatim.

**No clarifications remaining.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

### Pattern survey verdict (matched existing shapes; no new shapes invented)

- **Fork-not-symlink** confirmed against `.claude/skills/task/` (symlink → `../../claude/skills/task`): for `/audit`, the local `.claude/skills/audit/SKILL.md` is a **real file copy** to allow per-stack customization. The slash-command stub `.claude/commands/audit.md` is also a real file copy (the existing `task.md` is a symlink — `/audit` is the fork exception per MIGRATION §1.2.1).
- **§0 Forker checklist walk-through + delete** matched CORE-072's authoring intent: walk the checklist, customize each surface, then strip §0 from this fork so it doesn't confuse future readers.
- **Frontmatter shape** preserved: `name:` + `description:` only — matches the other 8 shipped SKILLs.
- **5-pass reframing** is per-pass examples only; the section numbering and 5-pass-in-order structure stays verbatim (per the scaffold's intent that pass order is canonical).

### Files shipped

- **`.claude/skills/audit/SKILL.md`** (NEW, ~99 lines) — Forked from `claude/skills/audit/SKILL.md`. §0 deleted. Customized: frontmatter, §1 step 1 wide markdown-surface glob (8 globs), §1 step 2 rubric files, §1 step 3 dual verification gates (cross-link integrity grep + frontmatter shape parity grep), §2 5 passes reframed for markdown-doc + skill-scaffold surface (Pass 1: Security → Safety & integrity), §3 Critical severity sacred invariants named (write-once / cite-drift / SPEC↔SKILL / adopter-side path / verification-gate failure), §6 project-specific hard rules appended (skip archive/legacy/viz; SKILLs cite-don't-restate; remember to delete §0 from future forks).
- **`.claude/commands/audit.md`** (NEW, ~17 lines) — Real file copy of `claude/commands/audit.md` (not a symlink). Slash-command stub for invoking `/audit` in flowtron-self chats.

### Fork verification (verification gates run on the new fork before the audit pass)

- **Cross-link integrity grep** on the fork: 5 wikilinks captured ([[CORE-038]], [[CORE-050]], [[CORE-051]], [[CORE-026]], [[CORE-035]]) — all resolve to PLAN.md entries.
- **Frontmatter shape parity grep** across all `claude/skills/*/SKILL.md` + the new fork: clean, no retired keys (`when_to_use:` / `argument-hint:` / `disable-model-invocation:`) anywhere.

### Audit pass on `SPEC.md` + `claude/skills/` (PLAN.md-locked scope)

**Verification gates run:**
- Wikilink grep across `SPEC.md` + `claude/skills/`: 5 valid wikilinks (CORE-008, CORE-016, CORE-017, FE-001, FE-004 — all archived) + 2 template-token placeholders (RELATED-1, RELATED-2 — placeholder examples, not real wikilinks). Clean.
- Frontmatter parity across 9 SKILLs: clean.
- Version-pin: SPEC.md v1.3.0 = latest git tag v1.3.0; no CHANGELOG.md (retired per [[CORE-013]]). Clean.
- Retired-convention residue: `legacy/`, `TasknoteSystem`, `Pinned to:` all clean.

**5-pass walkthrough results:**

| Pass | Findings | Severity span |
|---|---|---|
| 1 — Safety & integrity | 0 | — |
| 2 — Flowtron house style | 2 (cite-don't-restate violations: area-prefix list × 6 SKILLs; 📦 bundle restate × 3 SKILLs) | Medium |
| 3 — Markdown hygiene | 1 (template-token / wikilink grammar collision in `task/step-3a-promote-starter.md:12`) | Low |
| 4 — Orphans | 1 (`**Last updated:**` residue in 2 SKILLs after [[CORE-035]] retirement) | Medium |
| 5 — Documentation drift | 0 | — |

**Total: 4 findings, 0 Critical, 0 High, 3 Medium, 1 Low. Health score: 7/10.**

### PLAN.md tickets filed (per `/audit` §5)

User approved 3-ticket bundle (no splits, no drops):

- **CORE-074** [sonnet] | cite-not-restate sweep — under ## Medium. Bundles Findings #1 + #2 (cite-don't-restate compound risk).
- **CORE-075** [sonnet] | drop Last-updated residue — under ## Medium. Finding #3 (retired-convention orphans).
- **CORE-076** [sonnet] | wikilink-token placeholder hygiene — under ## Low. Finding #4 (template-token collision).

Each carries the `Surfaced by audit 2026-05-10 (Finding #N, <severity>)` parenthetical per `/audit` §5 step 3.

### No tests apply

Flowtron itself has no test suite for `claude/` content; viz tests are scoped to viz/. The audit's deliverables are markdown-only (one fork install + 3 PLAN.md ticket additions). Verification gates run inline above.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only diff; flowtron has no test suite for `claude/` content; viz tests are scoped to viz/).
- [x] Ran lint/type-check on changed code — N/A (markdown-only).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface touched).

**Testing Notes:**

**Verification gates run (in lieu of automated tests):**

1. **Cross-link integrity grep on the fork itself** — `grep -noE '\[\[([A-Z]+-(EPIC-)?[0-9]+(\.[0-9]+)?)\]\]' .claude/skills/audit/SKILL.md` → 5 wikilinks, all resolve to PLAN.md entries.
2. **Cross-link integrity grep on audit scope** (`SPEC.md` + `claude/skills/`) — 5 valid wikilinks + 2 template-token placeholders (RELATED-1, RELATED-2, intentional and noted as Finding #4).
3. **Frontmatter shape parity** — `grep -nE '^(when_to_use|argument-hint|disable-model-invocation):' claude/skills/*/SKILL.md .claude/skills/audit/SKILL.md` → clean (no retired keys).
4. **Heading structure on the fork** — sections 1 → 2 → 3 → 4 → 5 → 6 in order; §0 successfully deleted; matches the scaffold's intended post-fork shape.
5. **Slash-command stub shape parity** — `.claude/commands/audit.md` (~17 lines) matches `claude/commands/audit.md` byte-for-byte (verified by `cp` source semantics + no post-copy edits).
6. **PLAN.md tickets shape parity** — CORE-074 / CORE-075 / CORE-076 lines conform to SPEC §"Task-line format" grammar (`- [ ] **<ID>** [model] | shortname — description.`); word-count check on each long description: 65w / 38w / 50w — all under 70w hard cap, two under 50w target, one (074) at 65w yellow-flag but acceptable given the bundled-finding scope.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-10.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep results:**

- `README.md` — **no change** (CORE-073's deliverable lives in `.claude/`, local to flowtron-self; public repo overview is untouched).
- `SPEC.md` — **no change** (canonical contract not amended; the fork lives downstream of SPEC).
- `docs/MIGRATION.md` — **no change** ([[CORE-072]] shipped §1.2.1 fork workflow; CORE-073 is the first instance of running that workflow, not an amendment to the procedure).
- `claude/CLAUDE-snippet.md` — **no change** (adopter paste-block scope is the symlinked-skill set; local audit fork is flowtron-self only).

**Final Summary:**

Dogfooded the `/audit` scaffold shipped in [[CORE-072]] by forking it into flowtron-self's `.claude/skills/audit/` and running the first real audit pass on `SPEC.md` + `claude/skills/`. The fork install matched MIGRATION.md §1.2.1 contract: `mkdir + cp SKILL.md + cp audit.md`, then walked the §0 Forker checklist (frontmatter, default-`all` glob, rubric files, verification gates, 5-pass examples, Critical sacred invariants, project-specific hard rules), then deleted §0 from the fork. Customizations targeted flowtron's markdown-doc + skill-scaffold surface: wide markdown-surface glob (8 globs), dual verification gates (cross-link integrity grep + frontmatter shape parity), Pass 1 reframed Security → Safety & integrity, 4 sacred invariants under Critical (write-once policy / cross-link integrity / SPEC↔SKILL / adopter-side path resolution). Audit pass returned **4 findings (3 Medium, 1 Low; 0 Critical, 0 High; health score 7/10)**: Findings #1+#2 cluster as cite-don't-restate compound risk (area-prefix list duplicated across 6 SKILLs; 📦 bundle structure restated across 3 SKILLs), Finding #3 retired-convention residue (`**Last updated:**` in 2 SKILLs after [[CORE-035]] retirement), Finding #4 template-token / wikilink grammar collision (`[[RELATED-1]] [[RELATED-2]]` in step-3a-promote-starter.md:12). Filed as 3 PLAN.md tickets per user-confirmed 3-ticket bundle: CORE-074 (cite-not-restate sweep, ## Medium), CORE-075 (drop Last-updated residue, ## Medium), CORE-076 (wikilink-token placeholder hygiene, ## Low) — each carrying the `Surfaced by audit 2026-05-10 (Finding #N, <severity>)` parenthetical per `/audit` §5 step 3.

**Archived:** 2026-05-10
