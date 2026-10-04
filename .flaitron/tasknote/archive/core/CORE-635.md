---
title: plan-stub-shape-ratchet
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: []
touches:
  - .flowtron/PLAN.md
  - .github/workflows/ci.yml
  - AGENTS.md
  - SPEC/fixtures/plan/exclusions.md
  - SPEC/fixtures/plan/exclusions.json
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
---

# CORE-635 | plan-stub-shape-ratchet

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Repair `CORE-632.2`'s malformed `## Completed` stub row and add a CI guard so a
checked-but-malformed PLAN.md stub (missing `| shortname` / its trailing
bracket-token run) never lands silently again.

## ✅ Acceptance

- [x] `CORE-632.2`'s PLAN.md row restores `[light]🔧 [unattended] | readme-logo-webp` — `grep -n 'CORE-632.2' .flowtron/PLAN.md`
- [x] A checked-but-malformed case is pinned in the plan-parser conformance fixtures — `npm --prefix viz test -- -t "SPEC/fixtures/plan conformance"`
- [x] A CI check greps checked PLAN.md/PLAN-ARCHIVE.md stub rows for `| shortname` and fails on the pre-repair shape — verified locally by running the new `Pair R` step against both current content (clean) and the original malformed line (flags it); see Testing Notes
- [x] The new check is mirrored into `AGENTS.md` §"Validation" per the task line — `grep -n 'Pair R' AGENTS.md`
- [x] `/ft-release` §7.1's mirror-pair catalogue and local runner stay in sync with the new pair (count + letter roster + Pair L's own paths check) — `judgment`; verified by running Pair L's catalogue-rows loop locally (see Testing Notes)

## 🧩 Subtasks

- [x] Diagnose the real malformed shape (missing separator entirely, not just missing `| shortname`) against `viz/src/parser.ts`'s `TASK_LINE`/`LEGACY_LABEL_LINE` grammar
- [x] Restore `CORE-632.2`'s original bracket tokens + shortname in `.flowtron/PLAN.md`, copied verbatim from its pre-closure git history
- [x] Add `FX-462` to `SPEC/fixtures/plan/exclusions.md` + `.json` (checked, real-ID-shaped, no separator → surfaces as `unparsed`)
- [x] Add `Pair R` to `.github/workflows/ci.yml`'s `drift` job, grepping `.flowtron/PLAN.md` / `.flowtron/PLAN-ARCHIVE.md` for checked stub rows lacking `| `
- [x] Add a `Pair R` catalogue entry to `claude/skills/ft-release/step-7.1-mirror-pairs.md`, and update the pair count/letter roster in that file, `docs/CONVENTIONS.md`, and `claude/skills/ft-release/SKILL.md`
- [x] Update Pair L's own catalogue-rows loop and "fourteen drift checks" count in `step-7.1-mirror-pairs.md` so Pair R is covered, not silently unbound
- [x] Add the "mirrored in AGENTS.md §Validation" note the task line asked for

## 🔗 Related

(none — standalone task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task is current and unambiguous once the actual parser
  behavior is traced; no scope change needed.

- [x] Read relevant source files — `viz/src/parser.ts` (TASK_LINE /
  LEGACY_LABEL_LINE grammar), `SPEC/plan-filing.md` §"`## Completed` archive
  convention", `.github/workflows/ci.yml` (drift job, Pair H/J/L/Q shapes),
  `claude/skills/ft-release/step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`
  §"GitHub Actions CI", `SPEC/fixtures/plan/README.md` + `exclusions.md`/`.json`.

- [x] **Best Practices Review** — followed the existing lettered-pair pattern
  exactly (bad= accumulator, `- name:`/`run: |` shape, catalogue entry with
  `Reads:`/`CI step:`) rather than inventing a new check shape; reused Pair
  P's "content ↔ contract paragraph" title pattern since Pair R checks one
  surface against `SPEC/plan-filing.md` prose rather than two mirrored files.

- [x] **Archive skim** — `archive/core/CORE-632.2.md` read directly (it's the
  row under repair) to recover the pre-closure `title:` (`readme-logo-webp`)
  as the shortname source of truth; `git log`/`git show` on the two relevant
  commits (`9362667` filing, `02d2526` closing) confirmed the exact bracket
  tokens the buggy Phase 4 rewrite dropped.

- [x] **Drift check** — the task line's characterization ("no `| shortname`")
  undersells the actual defect: the row has no ` — ` separator at all, so it
  fails `TASK_LINE` outright and already surfaces as `unparsed` in
  `viz/src/parser.ts` — just with nothing wiring that parser into a gate over
  the live `PLAN.md`. Plan adjusted (not re-scoped) to reflect this: the CI
  check greps the raw stub tail directly rather than depending on the full
  grammar parser.

- [x] No clarifications needed (--fast) — assumptions: (1) "Pair-H shape"
  means the lettered `- name: Pair <letter>`/`bad=` drift-job convention,
  not literally joining the AGENTS.md §Validation byte-for-byte roster Pair H
  binds (a PLAN.md content check is not a build/test command); (2) "mirrored
  in AGENTS.md §Validation" is satisfied by a documented, additive note there
  (same relationship the gitleaks scan already has to that roster), not by
  adding an 8th roster command; (3) next unused pair letter is `R` (not the
  historically-retired-and-unlisted `E`), matching this repo's practice of
  never reusing a letter once it shipped.

- [x] Subtasks above populated with concrete, ordered steps, and `touches:`
  declared.

**Discovery Notes:**

`CORE-632.2`'s Phase 4 close wrote `- [x] **CORE-632.2** Completed
2026-09-20.` with no ` — ` separator at all (confirmed via `xxd`), not merely
a missing `| shortname` on an otherwise-valid stub. Tracing
`viz/src/parser.ts`'s `TASK_LINE` and `LEGACY_LABEL_LINE` regexes by hand
(later confirmed by the `viz` test suite) showed this exact shape already
fails both and surfaces as an `unparsed` diagnostic — the grammar parser was
never the gap; nothing runs it as a gate over the real `PLAN.md`. That reframed
the CI deliverable from "teach the parser" to "grep the stub tail directly,"
which is both simpler and consistent with how the other lettered pairs work
(plain `grep`/`awk`, not the TS parser).

An unrelated row (`CORE-637`, filed by something else mid-session) appeared in
`.flowtron/PLAN.md` after the Step 2 foreign-dirt gate had already passed
clean. Left untouched and kept out of this task's `touches:`/commit scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing lettered-pair convention
  (`ci.yml` drift job + `step-7.1-mirror-pairs.md` catalogue) rather than
  inventing a new check family; reused Pair P's single-surface/contract-title
  pattern for Pair R's name.

- [x] **Minimal refactor gate** — touched only the roster/count restatements
  that Pair R's addition itself made stale (the letter list and "ten"/"ten
  pairs" counts in `step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`, and
  `claude/skills/ft-release/SKILL.md`, plus Pair L's own catalogue-rows loop
  and "thirteen checks" count) — these are direct, mechanical consequences of
  adding an 11th pair, not unrelated cleanup. No other refactor.

- [x] Implemented the minimal solution — see Subtasks above for the full
  file list; core deliverable is the `Pair R` step in `ci.yml` plus its
  catalogue entry.

- [x] Updated/added tests for non-trivial behavior — `SPEC/fixtures/plan/exclusions.md`
  + `.json` gained `FX-462`, exercised by the existing generic
  `viz/src/parser.test.ts` "SPEC/fixtures/plan conformance" loop (no test-code
  change needed).

**Implementation Notes:**

`Pair R`'s grep pattern is
`^[[:space:]]*- \[[xX]\] \*\*[^*]+\*\*.*Completed [0-9]{4}-[0-9]{2}-[0-9]{2}\.$`
matched against `.flowtron/PLAN.md` and `.flowtron/PLAN-ARCHIVE.md`, then
filtered for lines with no `| ` — deliberately not requiring an em-dash before
`Completed`, since the real bug had none. The inline-audit-fix exception rows
(`SPEC/plan-filing.md` §"Exception — inline audit fixes") end in "fixed
inline." rather than "Completed YYYY-MM-DD.", so they never match the tail and
need no carve-out (verified: none of the live exception rows trip the check).

AGENTS.md's Validation section gained a short additive note (not a roster
addition) documenting Pair R, modeled on how `docs/CONVENTIONS.md` already
frames the gitleaks scan as additive to the Pair-H-bound seven-command roster.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded below; no avoidable duplication,
  dead code, unexplained complexity, or public-surface growth beyond the one
  new CI step + catalogue entry; AGENTS.md/CONVENTIONS.md/SKILL.md updates are
  the required mirror-consistency fixes, not incidental drift.

- [x] (frontend) N/A — no UI-facing change.

**Testing Notes:**

- `npm --prefix viz test -- -t "SPEC/fixtures/plan conformance"` → 0 (7/7 passed, including `exclusions.md`'s new `FX-462`)
- `npm --prefix viz test` → 0 (568/568 passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (54/54 passed)
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0
- `ruby -ryaml -e "YAML.load_file('.github/workflows/ci.yml')"` → 0 (YAML OK)
- Local `drift`-job Pair-runner (from `step-7.1-mirror-pairs.md`'s own script) — 10/11 `ok` (A, B, C, H, J, M, N, O, P, R); **Pair Q FAILED**, pre-existing and unrelated: `STALE SECTION .flowtron/PLAN.md — SPEC/plan-filing.md §"Completed archive convention"` is CORE-635's own task-line citation (filed before this session, untouched by this change) missing the backtick-wrapped `` `## Completed` `` the actual heading carries. Out of this task's scope; not fixed.
- Standing checks (Wrapper-name invariant, Shipped-skill parity, Context budget, Final newline) → all `ok`
- Pair L's catalogue-rows self-check (extended locally to include `R`) → prints nothing (Pair R's `Reads:` line matches what the CI step actually reads)
- Manually verified the grep against the pre-repair malformed line (`- [x] **CORE-632.2** Completed 2026-09-20.`) — flags it; against the repaired line — passes

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `AGENTS.md` and `docs/CONVENTIONS.md` are both in
  `.flowtron/tasknote/README.md` §"AI-referenced docs" and are the two docs
  this change edits from that set; both updated in place as part of this
  task (not a separate sweep finding). No other AI-referenced doc references
  the mirror-pair letter roster or count.

**Final Summary:**

Restored `CORE-632.2`'s dropped `[light]🔧 [unattended] | readme-logo-webp`
tokens (the row had no ` — ` separator at all, not just a missing shortname).
Added `FX-462` to the plan-parser conformance fixtures pinning that shape as
`unparsed`. Added `Pair R` — a new lettered CI drift-job check, grepping
`.flowtron/PLAN.md`/`.flowtron/PLAN-ARCHIVE.md` for checked stub rows missing
`| shortname` — plus its `step-7.1-mirror-pairs.md` catalogue entry, and
mirrored its existence into `AGENTS.md` §"Validation" as an additive note
(same framing as the gitleaks step). Updated the pair-count/letter-roster
restatements in `step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`, and
`claude/skills/ft-release/SKILL.md` (ten → eleven pairs, A–Q → A–R), and
Pair L's own catalogue-rows loop + count (thirteen → fourteen), so the new
pair is actually covered by the release-time drift-binding check rather than
shipping unbound. `touches:` — 8 files, all listed above; verification
commands all green except the pre-existing, unrelated Pair Q citation finding
on CORE-635's own task line (not fixed — out of scope).

**Archived:** 2026-09-20
