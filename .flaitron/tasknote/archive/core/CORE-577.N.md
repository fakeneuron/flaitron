---
title: unattended-candidacy audit
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-577.1, CORE-577.2, CORE-577.3, CORE-577.4, CORE-577.5, CORE-577.6]
touches:
  - .flowtron/PLAN.md
---

# CORE-577.N | unattended-candidacy audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-577]]

## 🎯 Goal

Verify the completed `CORE-EPIC-577` (`unattended-candidacy`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables (every filing surface emits `[unattended]` candidacy identically under attended / `--fast` / `--unattended`), and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] Every filing surface degrades identically under `--fast` / `--unattended` (PLAN line mandate) — `judgment`: each surface's candidacy clause names the same `unattended-candidates:` emit-and-write-nothing shape
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-577.N — audit CORE-EPIC-577` commit lands (no code edits landed → `chore:`)
- [x] PLAN.md line for `CORE-577.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-577.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-577` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-577.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-577.1]] — discovery (filed the cohort)
- [[CORE-577.2]] — candidacy-contract
- [[CORE-577.3]] — epic-discovery-candidacy
- [[CORE-577.4]] — file-followup-candidacy
- [[CORE-577.5]] — audit-refactor-candidacy
- [[CORE-577.6]] — repo-context-candidacy

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-577.N` invoked explicitly; Step 2 pre-flight passed with all six implementation children `[x]` (all closed 2026-09-11, same day as filing — the whole cohort landed in one session series). Full cohort, no early-audit decision.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A: verification pass over prose contract + skill bodies, no code or module-boundary work — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Cohort inventory** (read each child's Goal / Implementation Notes / Final Summary from `archive/core/`):
  - `.1` discovery — filed `.2`–`.6`; settled module home (`SPEC/unattended-candidacy.md`, unbudgeted), `--park` skips candidacy, `--unattended` persists via the discharging runner, M=5 with two slot substitutions (runners are not writers; `/ft-starter-task` retired) and two added writers (`/ft-audit-repo`, `/ft-audit-context`).
  - `.2` candidacy-contract — the module (5 sections: rule · predicate · three postures · persistence · surfaces + mirrors); `SPEC.md` §"Task-line format" pointer; `docs/EXTERNAL-AGENTS.md` step 2; enumerations in `SPEC/layout.md` / `README.md` / `AGENTS.md`; §7.1 **Pair N** + Pair L row; CI `drift` step; `docs/CONVENTIONS.md` lifted roster; `ft-release/SKILL.md` catalogue A–N.
  - `.3` epic-discovery-candidacy — `/ft-epic-discovery` Step 7 mirror (attended-only; `.2..M+1` + `.N`; parent + `.1` never; clause-6 reads `.1` as closed), Step 8 token-position line.
  - `.4` file-followup-candidacy — `/ft-file-followup` Step 3 mirror + Step 4 write + Step 5 `--unattended` report; `starter-mode.md` S3/S4 ride the host; `park-mode.md` + Step 0 state no candidacy; runner persistence hook in shared `ft-task/unattended-mode.md` (label §"Persistence") + one SOP clause in `SPEC/procedures/ft-task.md`.
  - `.5` audit-refactor-candidacy — `/ft-audit` §4 item 3 + §5 step 1/3 mirror (attended-only; carve-out rows never evaluated; fork note); `/ft-refactor` Step 3 mirror + Step 4 review / `--fast` emit + Step 5 write + Step 6 hand-off line.
  - `.6` repo-context-candidacy — `/ft-audit-repo` §6 mirror (parent + `.N` never); `/ft-audit-context` §5 new item 2 (draft-early) + item 3 offer + item 4 write; items renumbered 2→4.
- **Archive skim** — self-referential (cohort children are the archive entries). Non-cohort context: CORE-494 (marker minted; "flowtron never writes it") and CORE-065 (two-banner cap) are cited verbatim by the module; no further pre-cohort history on `SPEC/unattended-candidacy.md` (new file).
- **Drift check** — every path the children cite exists at HEAD; Pair N block run locally → exit 0, printing nothing, bound to 7 files (`ft-epic-discovery`, `ft-file-followup`, `ft-audit`, `ft-refactor`, `ft-audit-repo`, `ft-audit-context` SKILL bodies + `ft-task/unattended-mode.md`); Pair L block → prints nothing (CI copy of Pair N matches §7.1). Budgets: `SPEC.md` 51,817 / 57,000; all six skill bodies ≤ 30,882 / 33,000. PLAN line for `.N` matches this tasknote's scope (fixed doc-drift line + per-surface degrade walk).
- **No clarifications needed.** Assumption: the `.N` mandate "every surface degrades identically under `--fast`/`--unattended`" is satisfied by (a) every *flagged* filer emitting the same literal with the same always-emit / `none` rule and zero tokens written, and (b) every *unflagged* filer carrying the identical attended-only sentence — not by every filer accepting both flags (none does; `/ft-file-followup` has only `--unattended`, `/ft-refactor` only `--fast`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no new surface — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — N/A: no edits outside closure paths — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution — audit findings below; no inline fixes applied

- [x] Updated/added tests for non-trivial behavior — N/A: no code change

**Implementation Notes:**

- **Per-surface degrade walk (the `.N` PLAN mandate)** — verdict: **identical**.
  | Surface | Flags accepted | Attended | Flagged posture |
  |---|---|---|---|
  | `/ft-epic-discovery` Step 7 | none | candidates ride the reconcile review prompt; token only on confirmed rows | — (literal present, stated never fires) |
  | `/ft-file-followup` default / `--starter` | `--unattended` | candidates ride the Step 3 / S3 prose review; Step 4 / S4 writes only on confirm | `--unattended`: zero tokens, `unattended-candidates: <ID>` \| `none` on its own line in the Step 5 report, always emits; discharging runner copies it into Final Summary / `## ✅ Recap` |
  | `/ft-file-followup --park` | — | **no candidacy** (no gate), stated on host + fragment | — |
  | `/ft-audit` §5 | none | candidates in the report + write-step `AskUserQuestion`; step 3 writes only on confirm; carve-out rows never evaluated; §6 subroutine skips §5 wholesale | — (literal present, stated never fires) |
  | `/ft-refactor` Step 5 | `--fast` | Step 4 review shows candidates; Step 5 writes only on confirm; parent never | `--fast`: zero tokens, `unattended-candidates: <IDs>` \| `none` in the Step 6 hand-off, always emits |
  | `/ft-audit-repo` §6 | none | item-3 preview shows candidates; write after confirm; parent + `.N` never | — (literal present, stated never fires) |
  | `/ft-audit-context` §5 | none | new item 2 drafts early; item 3 offer shows candidates; item 4 writes only on kept rows | — (literal present, stated never fires) |
  | `/ft-task` · `/ft-micro-task` · `/ft-close-epic` | (runners) | not filers | shared `unattended-mode.md` §"never relaxes" persistence hook; `/ft-close-epic`'s own fragment loads the shared one |
  Both flagged branches use the same literal, the same bare-ID comma-separated PLAN-order shape, the same "always emits so *ran, found none* ≠ *never ran*" rule, and write no token — the module's "degrade identically" holds across surfaces, not just within each.
- **Coherence findings**
  - Mirror sentence idiom: five of six filers carry the fixed paragraph shape verbatim (label parenthetical → predicate clause → "proposed, never seeded" → attended-only / posture sentence → CORE-494 sentence). `/ft-refactor`'s mirror paraphrases the third sentence ("the token lands only through the Step 4 review, never on a starter note") because its posture sentence lives in Step 4 rather than inline — semantically identical; the label + literal are what Pair N binds. **No action.**
  - `/ft-audit-context`'s mirror lists `[model]` + description but not `[!critical]` in its scan gloss; the predicate is invoked whole ("Run its §Candidacy predicate") and that surface files no `[!critical]` rows. **No action.**
  - Cross-refs: `SPEC/unattended-candidacy.md` §"Surfaces and mirrors" table rows match shipped behavior on all eight rows; owners resolve to the right children; `docs/CONVENTIONS.md` roster reads "Pairs A, B, C, E, and N"; `ft-release/SKILL.md` catalogue reads A–N; `README.md` / `AGENTS.md` / `SPEC/layout.md` enumerations all carry the module. No contradictory cross-refs.
  - No regressions in earlier-shipped children's surfaces: `.2`'s Pair N still passes with `.3`–`.6` bound (it was vacuous at `.2`); `.3`'s Step 7 order and `.4`'s fragment split are untouched by `.5` / `.6` (disjoint dirs, as each child's downstream scan predicted).
  - Platform wrappers: `codex/` / `cursor/` / `grok/` name neither the module nor the literal — correct, they are thin pointers to the Claude bodies; Pair N's `claude/skills` scope is the right one.
- **Inline fixes applied:** none.
- **Misses → `/ft-file-followup` candidates (file after closure):**
  1. **`docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" does not classify the `unattended-candidates:` line.** Step 2 (edited by `.2`) now tells a caller "a caller reading that line has a shortlist for the next attended session"; Pair N + CI fix its string shape on every surface; and under `--unattended` it persists into a Final Summary — a file surface, next to the `**Final Summary:**` template label the table already promises. Yet the table has no row for it and the out-of-contract list (which does disclaim the `⏸ --unattended stop/park` markers as transcript prose) is silent. A caller cannot tell whether hooking the line is contract or courtesy. Recommendation: add a stable-surface row (owner `SPEC/unattended-candidacy.md` §"Three postures" · §"Persistence"; what a caller may rely on: literal `unattended-candidates:` prefix, bare comma-separated IDs in PLAN order or `none`, transcript-only under `--fast` / standalone `--unattended`, persisted in the discharging runner's Final Summary / `## ✅ Recap`). Per the section's own rule this is a versioned-release doc edit, so it is a filed follow-up, not an inline audit fix. `[light]`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; Pair N + Pair L blocks run as the audit's own verification (both clean)

- [x] Ran lint/type-check on changed code — N/A: markdown only; trailing-whitespace grep on cohort files → 0 hits

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Pair N block (`step-7.1-mirror-pairs.md`) at HEAD → exit 0, printed nothing; 7 files bound.
- Pair L block at HEAD → printed nothing (CI `drift` copy ≡ §7.1 source for all seven lifted steps incl. Pair N).
- `wc -c`: `SPEC.md` 51,817 < 57,000; `ft-file-followup` 30,882 · `ft-epic-discovery` 29,508 · `ft-audit` 26,972 · `ft-refactor` 15,861 · `ft-audit-context` 11,438 · `ft-audit-repo` 9,873 — all < 33,000.
- `grep -n ' $'` on module + `.5`/`.6` skill bodies → 0.
- Acceptance "degrades identically" — `judgment`, table in Implementation Notes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (fixed line — every entry in `.flowtron/tasknote/README.md` §"AI-referenced docs"):**

- `README.md` — no change (module already in the `SPEC/` enumeration since `.2`)
- `AGENTS.md` — no change (`` `[unattended]` candidacy `` in the `SPEC/` bullet since `.2`)
- `SPEC.md` — no change (§"Task-line format" pointer paragraph accurate; 51,817 / 57,000)
- `docs/MIGRATION.md` — no change (no `[unattended]` surface; fork-refresh path is `/ft-update`'s and described in the `/ft-audit` mirror)
- `claude/AGENTS-snippet.md` — no change (names the posture on the three runners; candidacy is skill-internal)
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `grok/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change (§"GitHub Actions CI" roster reads "Pairs A, B, C, E, and N" since `.2`; §"Canonical source with labeled mirrors" already names the posture as a mirror application)
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change (two posture mentions, neither about filing)
- `docs/AGENT-NEUTRALITY.md` — no change (module uses *structured ask*; skill-body `AskUserQuestion` is Claude wiring, not contract layer)
- `docs/PLATFORMS.md` — no change (flag-availability rows unchanged; no filer gained a flag)
- `claude/CAPABILITIES.md` — no change (flag rows unchanged)
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change **in this audit**; step 2 already cites the module (`.2`). Miss #1 above (§"Stable surfaces for callers" classification of the `unattended-candidates:` line) is filed as a follow-up rather than edited here, per that section's versioned-release rule.
- `docs/WORKTREES.md` — no change
- `docs/VISION.md` — no change (the module's "No autonomy chain" boundary restates §"What we won't accept" without adding a mirror)

**Final Summary:**

Audited `CORE-EPIC-577` (`unattended-candidacy`): the six-child cohort is coherent. Every filing surface proposes `[unattended]` inside the confirm gate it already had, and the two flagged filers (`/ft-file-followup --unattended`, `/ft-refactor --fast`) degrade identically — same `unattended-candidates:` literal, same always-emit / `none` rule, zero tokens written — while the four unflagged filers carry the identical attended-only sentence and the three runners share one persistence hook. Pair N and Pair L both run clean at HEAD; no inline fix was needed.

- **Changed:** `.flowtron/PLAN.md` (`.N` stub flip; parent flip + cohort move per the decision below) · this tasknote scaffolded and archived. `touches:` reconciliation: declared `.flowtron/PLAN.md`; `git diff --name-only` adds only the tasknote paths — no undeclared paths.
- **Verification:** Pair N → 0 / silent, 7 files bound · Pair L → silent · six skill budgets + `SPEC.md` budget hold · whitespace clean.
- **Findings:** one miss → `/ft-file-followup` candidate: `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" neither promises nor disclaims the `unattended-candidates:` line (`[light]`; versioned-release doc edit). Two observations, no action: `/ft-refactor`'s mirror paraphrases one sentence; `/ft-audit-context`'s scan gloss omits `[!critical]`.
- **Documentation:** all 18 AI-referenced docs swept "no change" (list above).
- **Parent flip:** operator confirmed Yes at the 📦 gate — `CORE-EPIC-577` flipped to stub form and the parent + seven children moved atomically from `## High` to the top of `## Completed` in this commit.
- **Maintainability effect:** one rule in one module, seven labeled mirrors bound by a CI step that fails the day a label or literal drifts; the deny-everything dispatch queue now gets a per-row candidacy decision at the point of fullest context with no new gate and no posture gaining a write.

**Archived:** 2026-09-11
