---
title: refactor-and-structure-audit audit
status: completed
tags: []
created: 2026-08-23
due:
related-tasks: [CORE-EPIC-463, CORE-463.1, CORE-463.2, CORE-463.3, CORE-463.4, CORE-463.5]
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

# CORE-463.N | refactor-and-structure-audit audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-463]]

## 🎯 Goal

Verify the completed `CORE-EPIC-463` (`refactor-and-structure-audit`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-463.N — audit CORE-EPIC-463` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-463.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-463.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-463` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-463.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-463]] — parent epic
- [[CORE-463.1]] — Discovery; scoped the cohort
- [[CORE-463.2]] — structure-domain
- [[CORE-463.3]] — refactor-planner
- [[CORE-463.4]] — audit-scaffold-bootstrap
- [[CORE-463.5]] — wiring-and-docs

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-463.N`. Pre-flight passed (clean tree, PLAN.md exists, no existing/archived CORE-463.N tasknote). All 5 implementation children (`.1`–`.5`) are `[x]` in PLAN.md — no open siblings, full cohort ready for audit.

- [x] Read relevant source files — read all 5 archived cohort tasknotes in full (`CORE-463.1..5.md`) via a forked subagent to capture deliverables without polluting context; also read `SPEC/epic.md` (lifecycle contract) and `.flowtron/tasknote/README.md` (AI-referenced docs list).

- [x] **Archive skim** — self-referential for an epic audit (cohort children are themselves the archive entries just read above). No prior tasknote history on `claude/skills/ft-refactor/` or `claude/skills/ft-audit/passes/structure.md` beyond this cohort.

- [x] **Drift check** — spot-verified against HEAD rather than trusting archived-tasknote claims: `claude/AGENTS-snippet.md` symlink count = 24 ✅, `ft-flowtron` table rows = 19 ✅, `claude/commands/ft-*.md` = 19 ✅, `claude/skills/ft-*/` dirs = 19 ✅, `codex/skills/ft-*/` dirs = 19 ✅ (Claude/Codex parity restored), `passes/structure.md` exists (55 lines) ✅, `claude/skills/ft-refactor/SKILL.md` exists (232 lines) ✅, self-host symlinks `.claude/commands/ft-refactor.md` + `.claude/skills/ft-refactor` both resolve ✅, `structure` domain registered in `ft-audit/SKILL.md` frontmatter + dispatch token list ✅. Grepped for stale "eight tasknote"/"twenty-two symlinks"/"(nine total)" — zero true hits (3 grep matches were unrelated substrings inside "lightweight" and a `/ft-micro-task` roster line). No drift found.

- [x] Asked clarifying questions — **No clarifications needed.** Open-siblings gate (Step 2) found zero open children, so no early-audit scope question arose.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory (from the 5 archived tasknotes):**

- **`.1` (discovery)** — Pure PLAN.md filing; filed the epic + 4 implementation children + `.N`. Root-cause finding: `/ft-audit`'s "mostly re-running the tests" symptom traces to **install state**, not skill design — `~/.claude/skills/ft-audit` symlinks flowtron's unfilled scaffold, so 18/24 `~/code` repos audit against placeholder rubrics with the test suite as the only grounded artifact. Two genuine capability gaps confirmed absent repo-wide: no refactor skill, no structural audit domain.
- **`.2` (structure-domain)** — New `claude/skills/ft-audit/passes/structure.md` (55 lines): 7th audit domain, 5 passes (Duplication clusters · Coupling & boundaries · Abstraction drift · God-files · Stray scripts). Registered across 10 enumeration surfaces. Domain count six→seven everywhere.
- **`.3` (refactor-planner)** — New `claude/skills/ft-refactor/SKILL.md` (232 lines): read-only depth planner, `/ft-refactor <target> [--fast]`. Files a sequenced epic with **no `.1`** (documented deviation — the run itself is the discovery); starter tasknotes per child carry characterization-test + behavior-preservation seeds; review-then-file gate. Deliberately deferred all wiring (codex mirror, command wrapper, roster counts) to `.5`.
- **`.4` (audit-scaffold-bootstrap)** — Extended `ft-audit/SKILL.md` with new §1.5: structural placeholder-detection (any `<…>` span in "Scope & rubric hints", or any `_(forker: …)_` note — deliberately structural, not a literal token list, so it composes correctly with domains not yet written, e.g. `.2`'s `structure`) + 3-branch `AskUserQuestion` (fork+fill / run-once / proceed-degraded). Extended `ft-update/SKILL.md` Step 4.5 with pass-file refresh (newly-shipped vs. deliberately-deleted, discriminated via `git ls-tree <reconciled>`). Two design defects caught and fixed in its own Phase 3 (literal-token draft matched only 1/6 domains; fixed gate whitelist would have refused 4/6 domains' actual gates) — both corrected before shipping.
- **`.5` (wiring-and-docs)** — Wired `/ft-refactor` across every enumeration surface: new `claude/commands/ft-refactor.md` + `codex/skills/ft-refactor/SKILL.md` (restoring Claude↔Codex 19/19 parity), self-host symlinks, all 4 AGENTS-snippets (claude 22→24), `ft-new-project` (22→24), `ft-flowtron` roster (18→19), `SPEC.md` §"Skill namespace", `AGENTS.md`, `README.md`, `MIGRATION.md`, `PLATFORMS.md`, `tasknote-selection.md`, `AGENT-NEUTRALITY.md`, `GLOSSARY.md`, `CAPABILITIES.md`. `docs/CONVENTIONS.md` swept — explicit "no change."

**Cohort coherence check (cross-references verified, not assumed):**

- `.2`'s `structure.md` escalation pointer to `/ft-refactor <target>` was independently verified by `.3` against the shipped contract ("files the staged epic with characterization-test acceptance" — matches).
- `.4`'s §1.5 structural detection rule was tested against `.2`'s actual shipped `structure.md` (6 `<…>` spans in-block + 10 `_(forker: …)_` notes → fires correctly) — confirmed bidirectionally in both `.2`'s and `.4`'s own Testing Notes.
- `.5`'s wiring correctly names the real skill paths/shortnames shipped by `.2`/`.3`/`.4` — no drift between what `.5` wired and what the earlier children actually shipped.
- Shortnames/model tags across the cohort are internally consistent: `.2` structure-domain `[heavy]🧠`, `.3` refactor-planner `[heavy]🧠`, `.4` audit-scaffold-bootstrap `[heavy]🧠`, `.5` wiring-and-docs `[medium]🧩` (deliberate deviation, mirrors CORE-389.4 precedent), `.N` `[light]🔧` (fixed doc-drift sweep, matches CORE-460.N/459.N/457.N precedent).
- **No naming mismatches, dangling references, or stale mentions found across the cohort.**

**Pre-existing gap noted but explicitly out of scope:** `.1`'s Discovery flagged that `ft-spec` has no `~/.claude/skills` symlink — a pre-existing gap that predates this epic and was not caused by it. Not a candidate for follow-up filing from this audit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: no new code surface; audit is a verification pass over existing cohort deliverables.

- [x] **Implemented the minimal solution** — walked the cohort coherence checklist (Acceptance criteria 2–4) and the doc-drift sweep across the remaining AI-referenced docs not already confirmed in Phase 1. No fixes were required — everything checked clean.

- [x] Updated/added tests — N/A: no code fix applied.

**Implementation Notes:**

- **Cohort coherence findings:** no inconsistencies surfaced. See Phase 1 Discovery Notes for the full cross-reference verification (`.2`↔`.3` escalation pointer, `.2`↔`.4` detection-rule fire test, `.5`'s wiring accuracy against `.2`/`.3`/`.4`'s actual shipped names).
- **No regressions surfaced** in earlier-shipped cohort children's surfaces — `structure` domain still registers correctly in the dispatcher (verified live), `ft-refactor` still resolves through both self-host symlinks, Claude/Codex skill-dir counts remain at 19/19 parity.
- **Doc-drift sweep beyond Phase 1's spot-checks:** grepped the remaining AI-referenced docs not already covered — `README.md` (nine tasknote skills incl. `/ft-refactor`, correct), `AGENTS.md` (`/ft-refactor` in the peer-skill roster, correct), `SPEC.md` (`/ft-refactor` in §"Skill namespace", correct), `CONTRIBUTING.md` / `SECURITY.md` / `docs/AGENT-COMPAT.md` / `docs/EXTERNAL-AGENTS.md` / `docs/WORKTREES.md` (no roster/count surface, correctly unchanged). No cumulative slice-local staleness found beyond what `.5`'s Phase 4 sweep already fixed.
- **No misses found.** Nothing to log as a `/ft-file-followup` candidate. The one out-of-scope item noted in Discovery (`ft-spec` missing its `~/.claude/skills` symlink) predates this epic and was not caused by it — not a candidate for follow-up filing from this audit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; markdown-prose verification only.

- [x] Ran lint/type-check on changed code — N/A: no code changed.

- [x] (frontend) N/A — no frontend surface.

**Testing Notes:**

Verification commands re-run to confirm cohort state still holds at audit time (all match the archived tasknotes' claims):

- `grep -c "^ln -s" claude/AGENTS-snippet.md` → 24
- `grep -c "^| \`/ft-" claude/skills/ft-flowtron/SKILL.md` → 19
- `ls claude/commands/ft-*.md | wc -l` → 19
- `ls -d claude/skills/ft-*/ | wc -l` → 19
- `ls -d codex/skills/ft-*/ | wc -l` → 19
- Self-host symlinks `.claude/commands/ft-refactor.md` + `.claude/skills/ft-refactor` both resolve
- Stale-string sweep (`eight tasknote` / `twenty-two symlinks` / `(nine total)`) — zero true hits repo-wide

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line)** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — already correct ("nine tasknote skills" incl. `/ft-refactor`, per `.5`) |
  | `AGENTS.md` | no change — already correct (`/ft-refactor` in peer-skill roster, per `.5`) |
  | `SPEC.md` | no change — already correct (§"Skill namespace" lists `/ft-refactor`, per `.5`) |
  | `docs/MIGRATION.md` | no change — already correct (§1.2/§1.2.1/§1.6/§1.7/smoke list, per `.2`/`.4`/`.5`) |
  | `claude/AGENTS-snippet.md` | no change — 24 `ln -s` lines confirmed live |
  | `codex/AGENTS-snippet.md` | no change — `/ft-refactor` line confirmed live |
  | `cursor/AGENTS-snippet.md` | no change — `/ft-refactor` line confirmed live |
  | `grok/AGENTS-snippet.md` | no change — `/ft-refactor` line confirmed live |
  | `docs/CONVENTIONS.md` | no change — `.5` swept and recorded "no change"; re-confirmed, no roster/count surface |
  | `CONTRIBUTING.md` | no change — no roster surface |
  | `SECURITY.md` | no change — threat model unaffected |
  | `docs/AGENT-NEUTRALITY.md` | no change — already correct (canonical-name row, per `.5`) |
  | `docs/PLATFORMS.md` | no change — already correct (rows 35/74/75 + worked example, per `.2`/`.5`) |
  | `claude/CAPABILITIES.md` | no change — already correct (`--fast` carve-out row, per `.5`) |
  | `docs/AGENT-COMPAT.md` | no change — no skill roster |
  | `docs/EXTERNAL-AGENTS.md` | no change — one-agent-per-tasknote rule unaffected |
  | `docs/WORKTREES.md` | no change — count-free tasknote-family reference stays accurate |

  All 17 entries "no change" — every contract edit the cohort caused was already applied by its owning child (`.2`, `.4`, `.5`); the audit found zero cumulative slice-local staleness.

- [x] **Tick through `## ✅ Acceptance`** — all criteria ticked above; no code edits landed, so the commit type is `chore:`.

- [x] Flip the audit's PLAN.md line to stub form.

- [x] Flip the audit tasknote's YAML `status:` → `completed`.

- [x] Move the audit tasknote to `.flowtron/tasknote/archive/core/CORE-463.N.md`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Audited the completed `CORE-EPIC-463` (`refactor-and-structure-audit`) cohort — 4 implementation children (`.1` discovery, `.2` structure-domain, `.3` refactor-planner, `.4` audit-scaffold-bootstrap, `.5` wiring-and-docs). All deliverables verified live against HEAD, not recalled from the archived tasknotes: `structure` is the dispatcher's 7th domain (55-line pass file, 10 registered surfaces), `/ft-refactor` is a new read-only depth-planner skill (232 lines) wired across 19/19 Claude↔Codex parity plus every roster/doc enumeration, and `ft-audit`'s new §1.5 self-filling bootstrap fires correctly against `.2`'s actual shipped `structure.md` (bidirectionally confirmed in both children's own Testing Notes).

**Cohort coherence:** no naming mismatches, dangling references, or stale cross-refs found. `.5`'s wiring correctly names the real paths/shortnames `.2`/`.3`/`.4` actually shipped.

**Doc-drift sweep:** 17/17 AI-referenced docs "no change" — every contract edit the cohort caused was already applied by its owning child; zero cumulative slice-local staleness found at audit time.

**Regressions:** none — earlier-shipped cohort surfaces (dispatcher registration, self-host symlinks, skill-dir parity counts) all still resolve correctly.

**Follow-ups filed:** none. One out-of-scope item noted (pre-existing `ft-spec` symlink gap, unrelated to this epic) — not a candidate for `/ft-file-followup`.

**Parent-flip:** user confirmed Yes — `CORE-EPIC-463` and its full nested cohort (`.1`–`.5`, `.N`) moved atomically to the top of `## Completed`.

**Changed files:** this tasknote + `.flowtron/PLAN.md` (audit stub flip + parent-epic flip/move). No code or doc edits — pure verification pass.

**Archived:** 2026-08-23
