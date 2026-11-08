---
title: ft-import-task
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: []
touches:
  - claude/skills/ft-import-task/SKILL.md
  - codex/skills/ft-import-task/SKILL.md
  - SPEC/starter.md
  - SPEC/plan-filing.md
  - SPEC/layout.md
  - AGENTS.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - README.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
  - docs/AGENT-NEUTRALITY.md
---

# CORE-895 | ft-import-task

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Ship a read-only `/ft-import-task` skill that files a starter-shaped note (a file, a folder or pasted text) into this repo's plan. It assigns real IDs, normalizes frontmatter, writes a provenance line, dedupes, sizes each note and commits, with an optional fail-closed claim hook that an adopter overlay supplies. Transport and fleet routing stay out of scope.

## ✅ Acceptance

- [x] Both skill bodies exist — `test -f claude/skills/ft-import-task/SKILL.md && test -f codex/skills/ft-import-task/SKILL.md`.
- [x] Drift checks pass — `bash tools/drift-checks.sh`.
- [x] Both rosters list the skill — `grep -q "ft-import-task" CLAUDE.md && grep -q "ft-import-task" claude/AGENTS-snippet.md`.
- [x] Wired in all four adopter `ln -s` blocks — `for f in claude codex cursor grok; do grep -qE 'ln -s .*skills/ft-import-task +\.[a-z]+/skills/ft-import-task' $f/AGENTS-snippet.md || exit 1; done`.
- [x] Portable input format published — `grep -q '^## Importing a starter' SPEC/starter.md`.
- [x] Registered as a filing motion — `grep -q 'ft-import-task' SPEC/plan-filing.md && grep -q 'ft-import-task' claude/skills/ft-release/step-7.1-mirror-pairs.md`.
- [x] Claim-hook contract and the read-only rule stated in the body — `grep -q '## Claim hook' claude/skills/ft-import-task/SKILL.md && grep -q 'never writes to the source' claude/skills/ft-import-task/SKILL.md`; plus `judgment`: no step in the body writes, renames, or moves a source file (no command decides an absence of writes across prose steps).
- [x] Release-gate suites pass — `node --test tools/drift-checks.test.mjs && node --test tools/update-adopters.test.mjs`.

## 🧩 Subtasks

- [x] 1. `SPEC/starter.md` §"Importing a starter" — the portable input format: starter-shaped body, `NOT A TASKNOTE` skip line, placeholder IDs, optional `repo:` / `read_at:` / `task:` / `priority:` keys, status words that classify.
- [x] 2. `claude/skills/ft-import-task/SKILL.md` — Step 0 paths + skill/pin guard; read input (file / folder / paste); vet (skip, classify, repo match, dedupe, size); one proposal gate; optional claim hook; write + filing commit; receipt block. `## Claim hook` contract and overlay pattern; read-only rule.
- [x] 3. `codex/skills/ft-import-task/SKILL.md` wrapper.
- [x] 4. `SPEC/plan-filing.md` — trigger line, §"ID allocation" minters, §"Filing commits" motion list, approval list, message table row, post-stage recognized hunks.
- [x] 5. `step-7.1-mirror-pairs.md` — Pair O runner list; starter-template consumer row.
- [x] 6. `tools/drift-checks.sh` skill/pin guard parity 6 → 7 (and its test if it hardcodes the count).
- [x] 7. Wiring + rosters — four `AGENTS-snippet.md` files (`ln -s` + subset sentence; Claude utilities bullet), `AGENTS.md` utility roster, `SPEC/layout.md` §"Skill namespace".
- [x] 8. Docs — README quickstart subset, MIGRATION §1.2 + roster history, PLATFORMS standalone list + subset cells, GLOSSARY entry, AGENT-NEUTRALITY plan-filing row, CONTEXT-BUDGET only if a measured row needs it.
- [x] 9. Validate — the Acceptance commands, `bash tools/drift-checks.sh`, the two release-gate suites.

## 🔗 Related

- (none in this repo) — cross-repo context: natabula NAT-558 (source skill), NAT-556 (Drive gate → claim hook), NAT-559 (overlay thinning, blocked on this)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No flaitron skill imports an externally written note today. The only implementation is natabula's personal `tasknote-intake` (natabula `853c68f`), still unchanged: HEAD `b2863b5` only files NAT-559. The work is unstarted and still wanted, since NAT-559 is blocked on it.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Source read.** `~/Code/natabula/configs/claude/skills/tasknote-intake/SKILL.md` (sibling repo, read-only). Generic parts lifted: skip `NOT A TASKNOTE`; classify; dedupe order (source id → `task:` → existing `Source:` line); split by urgency; fresh-session bar; relabel decisions as Discovery questions; one batch table, one go; normalize frontmatter; placeholder → real-ID substitution, cross-refs included; a source's `[unattended]` is never proposed. Natabula-only parts left out: Drive folder ids, `PENDING`/`ADOPTED` prefixes, the INDEX, the checkout gate steps, the standing allowance, completion, America/Toronto receipts.

**Drift check.** Every path the starter cites exists: `SPEC/layout.md` §"Skill namespace" (line 66), the `CLAUDE.md` → `AGENTS.md` symlink, `claude/AGENTS-snippet.md`, `SPEC/plan-filing.md` §"ID allocation". The starter's preliminary `touches:` (5 paths) was too narrow for an adopter-subset skill. Precedent [[CORE-783.3]] (`/ft-prep-unattended`, a new adopter-subset filing skill) touched 21 paths: four snippets, Pair O, the skill/pin guard parity list, plan-filing, PLATFORMS, MIGRATION, GLOSSARY, AGENT-NEUTRALITY, CONTEXT-BUDGET, README. `touches:` is widened to match (19 paths). PLAN row matches the starter; SPEC read directly, not recalled.

**Archive skim.** `archive/core/` (1,148 notes; `CORE-*` → `archive/core/` confirmed in the README table). Hits read: [[CORE-783.3]] (shape of adding an adopter-subset skill: wrapper, four `ln -s` blocks, plan-filing motion lists, Pair O, guard parity); [[CORE-729]] (skill/pin guard: one byte-identical paragraph per adopter-subset body that resolves `<root>`, counted by `skill_pin_guard_parity`); [[CORE-717]] (filing commits contract; Pair O requires a runner to carry a post-stage `git diff --cached` fence and a path-bearing `SPEC/plan-filing.md` §"Filing commits" citation, keyed on the `auto-commit = ` literal); [[CORE-619]] (seed: thin procedural skill, no tasknote, its own commit-message row).

**Best practices.** Layering follows `ft-audit` + `templates/audit-overlay-template.md`. Generic procedure upstream; source adapters and claim protocols live in an unprefixed adopter overlay that runs this skill by reference. The write path reuses `/ft-file-task --starter`'s Step S4 (template copy, row suffix, two-path stage, post-stage read) by reference instead of restating it. Epic-sized notes follow the existing documented path: a starter that carries an epic brief for `/ft-open-epic` to read (`starter-mode.md` §Notes). No new epic-filing code path.

**Clarifications (AskUserQuestion, 2026-11-08):**
- Q1 Shape: **new skill `/ft-import-task`, adopter subset**. Wired in all four `ln -s` blocks, so install.sh, `/ft-update` and the fleet updater pick it up from the snippets; the skill/pin guard goes 6 → 7.
- Q2 Format: **a section in `SPEC/starter.md`** (§"Importing a starter"). No new module.
- Q3 Claim hook: **an overlay `## Claim hook` section, fail-closed per note.** Input per note: locator, source id/hash, reserved real ID, this repo's `owner/name`, HEAD. It runs after the batch go and before any repo write, and returns `claimed` or `refused <reason>`. Anything else counts as refused, and that note drops out (a batch sibling's cross-ref names its locator).
- Q4 `repo:` mismatch: **skip by default; the operator can flip it at the single go.** A multi-repo `repo:` is always skipped (fleet tooling's job).
- Q5 (decided, not asked): "no write to source" is checked with a `grep` for the stated rule plus a `judgment` criterion. A mechanical check for an absence of writes across prose steps would be fake.

Assumptions: a single filing commit for the whole batch, message `chore: import <N> tasks` (`1 task` when N is 1), with a body listing `<locator> → <ID>`. No flags: no `--fast`, and no `--unattended` (a starter body exists to be reviewed, the same reason `--starter` refuses it). A row-sized note files a plain row carrying a `Source: …` suffix, excluded from the word count like the starter pointer.

Starter context preserved verbatim (filed 2026-11-08):

> ## 🌱 Starter context
>
> _Captured 2026-11-08 in a natabula design discussion after natabula NAT-558 closed. Promote to a full tasknote at `/ft-task` checkout._
>
> ### Why this exists
>
> Adopters receive tasknotes written somewhere else: by an outside bot (natabula's Grok Task Notes on Drive), another repo or another agent. Natabula NAT-558 built this import as a personal skill, `tasknote-intake` (`~/Code/natabula/configs/claude/skills/tasknote-intake/SKILL.md` at natabula `853c68f`). About two thirds of that skill is generic, with no Drive or Grok dependency: §"Vet each note once" and §"File a starter". That part belongs in flaitron, so every adopter gets it through the pin. Natabula keeps only the Drive-specific overlay (natabula NAT-559).
>
> ### Solution shape
>
> - **Input:** a file, a folder or pasted text.
> - **Steps:**
>   - Skip non-tasknotes.
>   - Classify each note: candidate, parked or done.
>   - Dedupe: provenance line first, then the `task:` key, then plan text.
>   - Replace `<PREFIX>-<next>` placeholders using `SPEC/plan-filing.md` §"ID allocation", including cross-references between notes in the batch.
>   - Normalize frontmatter to the pinned SPEC.
>   - Write a provenance line, `Source: <locator> (<hash or id>), read at <sha>`.
>   - Keep the source's wording.
>   - Relabel the source's Decisions / Open questions as Discovery questions, keeping its leans as evidence. Decisions the operator actually answered stay locked.
>   - Size each note as a row, starter or epic, then file and commit through the normal filing workflow.
> - **Batch:** one proposal table and one go.
> - **Output:** a receipt block (`imported <source> as <ID> at <sha>`) the operator can copy back by hand.
> - It writes no `[unattended]` or `[handoff]` marker. Marking stays with `/ft-seed-unattended`.
>
> ### Files to touch (preliminary survey — drift-check at promotion)
>
> - `claude/skills/ft-import-task/SKILL.md` and `codex/skills/ft-import-task/SKILL.md` — the new skill body and its Codex wrapper.
> - `SPEC/layout.md` §"Skill namespace" — add it to the roster.
> - `CLAUDE.md` and `claude/AGENTS-snippet.md` — the two skill rosters, kept in sync (see the KEEP IN SYNC comment).
> - Possibly a `SPEC/` module for a portable starter format (Open at promotion 2).
>
> ### Explicitly out of scope
>
> - Any transport: Drive, connectors, fetching. The source is already readable.
> - A source-side index or any other write to the source.
> - Fleet routing: notes for several repos, standards notes. That stays in natabula's `natabula-tasknote-intake`.
> - Natabula's overlay, which keeps the Drive checkout gate, allowance and receipts (natabula NAT-559).
>
> ### Decisions locked in this conversation
>
> | Decision | Choice | Rationale |
> |---|---|---|
> | Core access | Read-only; the skill never writes to the source | Writing a shared source needs a claim protocol (natabula NAT-556's gate), many sources can't be written (paste, read-only mounts, other people's repos), and writes trigger Path Access approvals or count as publishing |
> | Import record | The destination's provenance line; no source-side index | The plan stays the one tracker. Cross-repo visibility comes from a read-only scan of provenance lines |
> | Write-back | Only through an optional, fail-closed claim hook an adopter overlay supplies; if defined, it must pass before any repo write | Natabula's Drive gate becomes that hook; other adopters get a pure read |
> | Layering | Generic import upstream; source adapters and claim protocols in adopter overlays | Same pattern as `ft-audit` and adopter audit overlays |
>
> ### Acceptance that decides it
>
> - Both skill bodies exist — `test -f claude/skills/ft-import-task/SKILL.md && test -f codex/skills/ft-import-task/SKILL.md`.
> - Drift checks pass — `bash tools/drift-checks.sh`.
> - Both rosters list the skill — `grep -q "ft-import-task" CLAUDE.md && grep -q "ft-import-task" claude/AGENTS-snippet.md`.
>
> ### Open at promotion (Phase 1 should resolve)
>
> 1. A new skill, or an `/ft-file-task --import` mode? Leaning toward a new skill, since import doesn't start from an active tasknote, which `/ft-file-task` assumes.
> 2. Should flaitron publish a portable starter format spec (placeholder IDs, `read_at`, `repo:`) for outside authors?
> 3. The claim hook's contract: what it receives, what it must return, and how failure is reported.
> 4. Should a note whose `repo:` names a different repo be refused, or only warned about?
> 5. Acceptance for "no write to the source" — judgment or a mechanical check?
>
> ### Related
>
> - natabula NAT-558 — the personal `tasknote-intake` this generalizes.
> - natabula NAT-556 — the Drive checkout gate that becomes natabula's claim hook.
> - natabula NAT-559 — natabula's overlay thinning, blocked on this plus a pin bump.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: [[CORE-783.3]]'s adopter-subset skill shape (body + Codex wrapper + four `ln -s` blocks + plan-filing motion lists + Pair O + guard parity). The write path cites `ft-file-task/starter-mode.md` Step S4 instead of restating it; the overlay mirrors `templates/audit-overlay-template.md`.
- No refactor. The guard-parity count went 6 → 7 in `tools/drift-checks.sh`, and its self-test expectation `(1 5|5 1)` → `(1 6|6 1)`. The filing-motion count went seven → eight in `SPEC/plan-filing.md`, Pair O and AGENT-NEUTRALITY.
- `claude/AGENTS-snippet.md` utilities bullet trimmed to one clause (+257 bytes total, 13,489 of 13,800, NEAR CAP 97.7%: informational, not over).
- `docs/CONTEXT-BUDGET.md` not edited: its §"Skill bodies" ledger is re-measured at release, so the new 16,416-byte body lands in the next cut's reading.
- Tests: no new behavior-bearing code (markdown skill), so nothing new to test. The existing guard self-test is updated.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (markdown skill + docs)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (run after the review fixes):
- `test -f claude/skills/ft-import-task/SKILL.md && test -f codex/skills/ft-import-task/SKILL.md` → 0
- `bash tools/drift-checks.sh` → 0 (NEAR CAP informational only, including `claude/AGENTS-snippet.md` 13,489 of 13,800)
- `grep -q "ft-import-task" CLAUDE.md && grep -q "ft-import-task" claude/AGENTS-snippet.md` → 0
- four-snippet `ln -s` loop → 0
- `grep -q '^## Importing a starter' SPEC/starter.md` → 0
- plan-filing + mirror-pairs grep → 0
- `## Claim hook` + `never writes to the source` grep → 0. Judgment: no step writes, renames or moves a source file. The only source-side command is `git hash-object` without `-w`, which is a read.
- `node --test tools/drift-checks.test.mjs` → 0 (43 pass, after updating the guard self-test from `(1 5|5 1)` to `(1 6|6 1)`); `node --test tools/update-adopters.test.mjs` → 0 (122 pass); `node --check tools/update-adopters.mjs` → 0.
- Lint/type-check: N/A, no TS or JS changed beyond one regex literal in the self-test (syntax-checked with `node --check`).

External review: `/code-review medium` over this task's uncommitted diff only (the tree was clean at start; the new files were marked intent-to-add). 10 notes, 0 blockers, all fixed in this diff:
1. Dedupe matched on the locator, so every `paste` collided → now matches on source id only.
2. The candidacy exception was undocumented → `/ft-import-task` row added to the `SPEC/unattended-candidacy.md` §"Surfaces and mirrors" table, and the EXTERNAL-AGENTS step 2 and `ft-seed-unattended` intro claims are updated.
3. The receipt promised a `read at` drift check that `/ft-task` never runs → reworded to say the commit is evidence for the ordinary drift check.
4–5. The reply grammar → `file <n>` flips parked or `repo:`-skipped rows only, never multi-repo, done or duplicate rows.
6. An amend-only run would commit `import 0 tasks` → `<N>` now counts filed plus amended, with an `(amended)` body line; the plan-filing table row is updated.
7. A claim followed by a failed Step 4 had no report → new `claimed, not filed — <reason>` disposition; an existing starter path stops before the first write.
8. The AGENT-NEUTRALITY registry list was missing the skill → added.
9. No fallback when `origin` is missing → ask once, else skip `repo:` notes as `origin unknown`.
10. The glossary header count → 74 (it was a correct 73 before this entry; the reviewer's 76 counted bold lines in the intro).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Shipped `/ft-import-task`, a read-only attended importer. It files starter-shaped notes written elsewhere (a file, a folder or a paste) into this repo's plan: it skips non-notes, classifies, dedupes by source id, allocates real IDs, normalizes frontmatter, writes a `Source:` provenance line, sizes each note as a row, starter or epic brief, and commits from one proposal table. Adopters get an optional fail-closed `## Claim hook` through an overlay, and outside authors get a portable input format in `SPEC/starter.md` §"Importing a starter". The skill is wired into the adopter subset for all four agents.

Doc-drift sweep: `README.md` updated (adopter subset). `AGENTS.md` updated (utility roster four → five). `SPEC.md` no change (it names no skill roster). `docs/MIGRATION.md` updated (§1.2 subset + roster history). `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` updated. `docs/CONVENTIONS.md` no change. `CONTRIBUTING.md` no change. `SECURITY.md` no change; the body already treats note content as evidence, never instructions. `docs/AGENT-NEUTRALITY.md` updated (eight filing motions; registry list). `docs/PLATFORMS.md` updated (standalone list, both subset cells, skill count 11 → 12). `claude/CAPABILITIES.md` no change. `docs/AGENT-COMPAT.md` no change (it names the subset without slugs). `docs/EXTERNAL-AGENTS.md` updated (the candidacy exception in step 2). `docs/WORKTREES.md` no change. `docs/VISION.md` no change.

Recap: 2 new files (claude body 16.4 KB, Codex wrapper) and 19 edited (+SPEC/starter.md §"Importing a starter", +SPEC/plan-filing.md motion registration, +SPEC/unattended-candidacy.md surface row, guard parity 6 → 7). No refactor. `touches:` reconciliation: declared 18 after Phase 2 dropped CONTEXT-BUDGET (its ledger is re-measured at release). The diff adds `SPEC/unattended-candidacy.md`, `docs/EXTERNAL-AGENTS.md` and `claude/skills/ft-seed-unattended/SKILL.md` (review finding 2) plus `.flaitron/` workflow files. Maintainability: the import procedure lives once upstream; natabula NAT-559 can now thin its `tasknote-intake` into an overlay supplying a source adapter, a `## Classify` delta and the Drive checkout as its `## Claim hook`. Watch item: `claude/AGENTS-snippet.md` is at 97.7% of its budget.

Learnings: N/A. The always-loaded utility roster was updated in this commit.

**Archived:** 2026-11-08
