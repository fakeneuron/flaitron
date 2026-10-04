---
title: caller-write-boundary-fixes
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: [CORE-EPIC-598, CORE-598.1, CORE-565.3, CORE-597, CORE-591, CORE-598.4]
touches:
  - docs/EXTERNAL-AGENTS.md
  - SPEC/blocked.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/procedures/ft-task.md
  - SPEC/plan-filing.md
---

# CORE-598.2 | caller-write-boundary-fixes

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-598]] [[CORE-598.1]]

## 🎯 Goal

Land the three flowtron-side contract fixes the epic Discovery surfaced: declare the caller-write boundary in `docs/EXTERNAL-AGENTS.md`, make the `park-reason:` value YAML-safe at every writer, and strip the adopter ID from `SPEC/plan-filing.md`.

## ✅ Acceptance

- [x] `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" carries a numbered rule stating a caller commits nothing into a producer repo outside the worker's own flowtron closure and filing commits, that caller-owned state (a status snippet) lives caller-side, and reconciles step 6's two frontmatter writes as the one named caller write — `grep -q 'commits nothing' docs/EXTERNAL-AGENTS.md`
- [x] `SPEC/blocked.md` §"Park reason" states the YAML plain-scalar rule for the value (one line; no `: `, no ` #`, no trailing `:`) — `grep -q 'plain scalar' SPEC/blocked.md`
- [x] Every runner-side writer of the value repeats the rule in one clause: `claude/skills/ft-task/unattended-mode.md` §"The park recipe" step 3 and `SPEC/procedures/ft-task.md` §"Parking, in one paragraph" — `grep -q 'plain scalar' claude/skills/ft-task/unattended-mode.md && grep -q 'plain scalar' SPEC/procedures/ft-task.md`
- [x] The rule is verified against the parser flowtron ships: the three shapes from [[CORE-598.1]] §B#2 (`: ` → error, ` #` → truncation, backticks → ok) re-run through `js-yaml` from `viz/node_modules`, and a rule-conforming rewrite of the CBN-186 live park parses to the full value — `node` one-liner → 0, receipt in Testing Notes
- [x] No adopter ID in SPEC / docs contract prose — `grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md --exclude=VERSION-HISTORY.md` → no hits (VERSION-HISTORY excluded by design)
- [x] The `park-reason:` stable-surface row in `docs/EXTERNAL-AGENTS.md` still describes the same split (`<code> — <prose>`, first ` — `) — `judgment`: the fix must not move a declared stable surface; verified by reading the row after the edit
- [x] Budgeted surfaces untouched or under cap — `grep -c '' /dev/null; awk` per CI: none of the five touched files is a budget row; `wc -c SPEC.md SPEC/gates.md` unchanged

## 🧩 Subtasks

- [ ] Phase 1: read the three target files + every other `park-reason:` writer (grep), confirm the js-yaml failure shapes, resolve quote-vs-forbid with the operator
- [ ] Phase 2a: add the caller-write rule as step 9 of `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract"; adjust step 6 to name its two writes as the one caller write
- [ ] Phase 2b: add the plain-scalar rule to `SPEC/blocked.md` §"Park reason" (after the split-rule paragraph)
- [ ] Phase 2c: mirror the rule as one clause in `unattended-mode.md` recipe step 3 and `SPEC/procedures/ft-task.md` parking paragraph
- [ ] Phase 2d: rewrite `SPEC/plan-filing.md:54` parenthetical without the adopter ID
- [ ] Phase 3: js-yaml receipt; grep receipts; markdown mental-pass; `wc -c` on budgeted files
- [ ] Phase 4: doc-drift sweep, PLAN stub flip (kept nested under CORE-EPIC-598), archive

## 🔗 Related

- [[CORE-EPIC-598]] — parent epic (flowtron-caobunga-concert)
- [[CORE-598.1]] — Discovery that scoped this child; §B#1 (status-file conflict), §B#2 (YAML-unsafe writer), §B#4 (adopter-ID leak); Fan-out: this child runs first
- [[CORE-565.3]] — authored §"Stable surfaces for callers" incl. the `park-reason:` row this task must not move
- [[CORE-597]] — gitignored `caobunga-status.md`; the boundary this task declares is why that choice stands
- [[CORE-591]] — the fix cited at `SPEC/plan-filing.md:54`, whose parenthetical carries the leak
- [[CORE-598.4]] — successor; its status-snippet CBN row cites the step this task adds

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three findings re-verified at HEAD this session — the boundary is undeclared on flowtron's side, the writer still emits an unquoted plain scalar with no prose rule, and the adopter ID is still at `SPEC/plan-filing.md:54`. Fan-out puts this child first; nothing has moved since the Discovery closed today.

- [x] Read relevant source files — `docs/EXTERNAL-AGENTS.md` (whole), `SPEC/blocked.md` (whole), `claude/skills/ft-task/unattended-mode.md` (whole), `SPEC/plan-filing.md:40-64`, `SPEC.md` (core; §"Tasknote frontmatter" park-reason paragraph at `:208`, §"Cross-repo edit remit"), `SPEC/procedures/ft-task.md:62-72`, `SPEC/gates.md:279-284`, `docs/CONTEXT-BUDGET.md` §"Budgets" + §"Lazy `SPEC/` modules". Writer/reader census: `grep -rn park-reason` over SPEC, skills, procedures, docs — see Discovery Notes §A.

- [x] **Best Practices Review** — markdown contract edits; the one boundary in play is *who owns the rule*: `SPEC/blocked.md` §"Park reason" owns the value's shape, the two runner writers (`unattended-mode.md`, `procedures/ft-task.md`) execute it, and `docs/EXTERNAL-AGENTS.md` declares it to callers — so the rule is stated once in `blocked.md` and mirrored as a one-clause pointer at each writer, never restated. No refactor surface.

- [x] **Archive skim** — `grep -l docs/EXTERNAL-AGENTS.md archive/core/*.md` → ~200 notes (every closure's doc-drift sweep cites it), `SPEC/blocked.md` → 43, `unattended-mode.md` → 28; a probe was not briefed because [[CORE-598.1]] (closed today) already read the binding set for this epic (§D). Re-opened directly: [[CORE-565.3]] (authored the stable-surfaces table; its §A row records caobunga's `reader.py:36-52` splitting `park-reason` on first ` — ` — a line-wise read, so the value's *byte shape* is load-bearing for one real caller), [[CORE-597]] (Goal: untrack + gitignore `caobunga-status.md`; the choice stands, this task declares why). Load-bearing: [[CORE-565.1]] Constitution #4 — adopter IDs stay in tasknotes, never SPEC prose.

- [x] **Drift check** — Paths resolve: `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" steps 1–8 present, step 6 names the caller's two frontmatter writes; `SPEC/blocked.md` §"Park reason" split-rule paragraph at `:88-98`; `unattended-mode.md:27` recipe step 3; `SPEC/plan-filing.md:54` reads `(caobunga CBN-179, 2026-09-13 — the fix is CORE-591)` — the only adopter-ID hit across SPEC / docs / claude (VERSION-HISTORY excluded). Root cause re-verified with `js-yaml` from `viz/node_modules`: `: ` → `bad indentation of a mapping entry`, trailing `:` → same error, ` #` → silent truncation, backticks / emoji → ok, double-quoted → ok (receipt in Testing Notes). SPEC cross-reference: the plan contradicts nothing — `SPEC.md` §"Cross-repo edit remit" already states the symmetric edit boundary for *tasknote deliverables*; this task extends the same principle to a caller's commits. PLAN line matches. One reconciliation the PLAN line did not name: step 6 already sanctions a caller *write* (two frontmatter lines into a stranded note), so the new rule is phrased as "commits nothing" and names step 6's writes as the one caller write — otherwise steps 6 and 9 would contradict each other.

- [x] Asked clarifying questions — one AskUserQuestion: quote-vs-forbid. **Operator chose forbid** (plain scalar; no `: `, no ` #`, no trailing `:`). Rationale recorded: the declared stable surface (`<code> — <prose>`, split on first ` — `) and every existing reader — YAML-first (viz) and line-wise (caobunga's CBN-186 fallback) — keep working byte-for-byte; quoting would have moved a stable surface and forced a caller-side change. Assumptions carried: (1) the rule belongs at every *writer*, not only in the contract, because the failure was a writer slip; (2) the caller-write rule goes in §"The Orchestration Contract" as step 9 (a must-do), not in the stable-surfaces table (a may-rely-on); (3) `.4`'s CBN row cites "step 9" — the number is the anchor.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. `park-reason:` writer / reader census (HEAD)

| Role | File | What it says today |
|---|---|---|
| Owner | `SPEC/blocked.md` §"Park reason" | `<code> — <prose>`, split on first ` — `, closed code set. No shape rule for the prose. |
| Core pointer | `SPEC.md:208` | one-paragraph pointer to the owner — no change needed |
| Writer (executable) | `claude/skills/ft-task/unattended-mode.md:27` | recipe step 3: "put the classification in the code and the detail in the prose" — the place the CBN-186 park was written from |
| Writer (SOP mirror) | `SPEC/procedures/ft-task.md:69` | "writes `park-reason: <code> — <one line>` from the closed set" |
| Writer (specific codes) | `SPEC/blocked.md:46,56`, `unattended-mode.md:56,64,66,72`, `step-5-loop-mode.md:75`, `SPEC/loop.md:64`, `SPEC/gates.md:419`, `procedures/ft-task.md:198,342,363,405,471` | each names a code with `— …` prose — they inherit the rule from the owner; no edit |
| Reader (declared) | `docs/EXTERNAL-AGENTS.md:67` step 4, `:92` table row | split on first ` — `, never parse prose — unchanged by the forbid rule |
| Reader (shipped) | `viz/src/tasknote-parse.ts` | js-yaml; catch-and-skip on parse error — the symptom |
| Resume | `step-3c-resume-blocked.md:8` | removes the key — unaffected |

### B. Design of the three edits

1. **Caller-write rule → `docs/EXTERNAL-AGENTS.md` step 9.** "A caller commits nothing into a producer repo." The only commits a dispatched run may add are the worker's own: the atomic closure commit (step 7 / §"The Return") and a filing commit (step 8). Caller-owned state — a status snippet, a dispatch log, a registry — lives caller-side. Step 6's two frontmatter writes are the one caller write the contract names, and they are working-tree edits the resume path consumes, never a commit. Named owner: `SPEC.md` §"Cross-repo edit remit" (the same boundary for tasknote deliverables) + §"Paper-complete guard" (why a foreign commit is a problem: it is foreign dirt to the next run and noise in the closure history). Step 6 gains a half-sentence cross-reference so the two steps read as one rule.
2. **Plain-scalar rule → `SPEC/blocked.md` §"Park reason"**, one paragraph after the split-rule paragraph: the value is written as a YAML **plain scalar** — one line, unquoted — so the prose may not contain `: ` or ` #` and may not end in `:`; a writer that needs a colon rephrases. State the two failure modes in one clause each (mapping error; comment truncation) so the rule reads as a fact, not a taste. Mirrored as one clause at each of the two runner writers.
3. **`SPEC/plan-filing.md:54`** — `(caobunga CBN-179, 2026-09-13 — the fix is CORE-591)` → `(seen in an adopter 2026-09-13; the fix is CORE-591)`. The date and the fix ID carry the provenance; the adopter name and its ticket belong in [[CORE-591]]'s tasknote, which already has them.

**Not done, on purpose:** no edit to the `park-reason:` stable-surface row (the surface does not move — that is the point of the forbid choice); no edit to the seven specific-code writers (they inherit); no template edit; no viz change (`tasknote-parse.ts`'s catch-and-skip is correct behaviour for malformed YAML — the fix is upstream at the writer); no `[handoff]` / VISION work (`.3`); no CBN rows (`.4`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-565.3]]'s shape for `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract": a bold-lead numbered step that states one rule and names its canonical owner (step 9 → `SPEC.md` §"Cross-repo edit remit" + §"Paper-complete guard"). The plain-scalar rule follows `SPEC/blocked.md`'s own bold-lead paragraph shape (`**`drift` vs `dependency`.**`, `**Cleared on resume.**`). The two writer mirrors are one parenthetical clause each, pointing back at the owner section by name — the same owner-once / pointer-at-writer split `unattended-mode.md` already uses for the code set.

- [x] **Minimal refactor gate** — `N/A` — prose contract edits; nothing restructured.

- [x] Implemented the minimal solution — five files, +20 / −4.

- [x] Updated/added tests for non-trivial behavior — `N/A` — no executable surface; the js-yaml check is a Phase 3 receipt, not a shipped test (viz's `tasknote-parse.ts` behaviour is unchanged and already covered).

**Implementation Notes:**

- `docs/EXTERNAL-AGENTS.md` — step 9 "Commit nothing of your own into the producer repo" appended to §"The Orchestration Contract" (the list ran 1–8); step 6 gains one sentence naming its path-(a) writes as the one caller write, cross-referencing step 9. The §"Stable surfaces for callers" `park-reason:` row is untouched — the forbid choice keeps the surface byte-identical.
- `SPEC/blocked.md` §"Park reason" — new paragraph "The value is a YAML plain scalar." between the code-set commentary and "`drift` vs `dependency`": names the two forbidden sequences with their failure mode each, the trailing-colon case, a rephrase example, and why quoting is not the fix.
- `claude/skills/ft-task/unattended-mode.md:27` recipe step 3 and `SPEC/procedures/ft-task.md:69-71` — one clause each; bolded in the skill fragment because it is the line the writer is executing when the slip happens.
- `SPEC/plan-filing.md:54` — `(caobunga CBN-179, 2026-09-13 — the fix is CORE-591)` → `(seen in an adopter 2026-09-13; the fix is CORE-591)`.
- Downstream-impact scan: no direction change — the forbid rule leaves every reader unchanged; `.3` / `.4` scopes stand as filed (`.4`'s status-snippet row now cites "step 9").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown only; no test surface changed.

- [x] Ran lint/type-check on changed code — `N/A` — markdown only; trailing-whitespace grep on the diff → clean.

- [x] **Verification receipt** — see Testing Notes. Structural: no duplication (rule stated once in `blocked.md`, two one-clause pointers, step 9 names owners rather than restating `SPEC.md`); no dead prose; no public-surface growth (the stable-surfaces table is unchanged); no stale code-facing doc (`tasknote-parse.ts` behaviour unchanged).

- [x] (frontend) Asked the user for visual confirmation — `N/A` — no rendered surface changed.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -q 'commits nothing' docs/EXTERNAL-AGENTS.md                       → 0
grep -q 'plain scalar' SPEC/blocked.md                                  → 0
grep -q 'plain scalar' claude/skills/ft-task/unattended-mode.md         → 0
grep -q 'plain scalar' SPEC/procedures/ft-task.md                       → 0
grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md
    --exclude=VERSION-HISTORY.md                                        → 1 (no hits — the pass condition)
wc -c SPEC.md SPEC/gates.md claude/skills/ft-task/SKILL.md              → 51918 / 35910 / 28192 (unchanged; none of the five touched files is a budget row)
git diff | grep -nE '^\+.*[[:space:]]$'                                 → 1 (no trailing whitespace)
node -e '<js-yaml, viz/node_modules>'                                   → 0
    "visual-confirm — Phase 3 👁️ CONFIRM: header renders"         ERR  bad indentation of a mapping entry (2:50)
    "input-needed — which priority? # ask operator"                 OK   "input-needed — which priority?"   (silent truncation)
    "drift — ends with a colon:"                                    ERR  bad indentation of a mapping entry (2:39)
    "visual-confirm — Phase 3 👁️ CONFIRM asks whether the header renders"  OK  full value   (rule-conforming rewrite of the CBN-186 park)
    "destructive — needs a `git push` to the public remote"         OK   full value   (the SPEC example)
judgment: `park-reason:` stable-surface row re-read after the edit         → unchanged (`<code> — <prose>`; split on first ` — `)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (`:208` pointer to `blocked.md` still correct; §"Cross-repo edit remit" now cited as step 9's owner, unchanged itself) · `SPEC/*.md` — **updated** `SPEC/blocked.md`, `SPEC/plan-filing.md`, `SPEC/procedures/ft-task.md` (deliverables); `SPEC/epic.md`, `SPEC/scope-boundaries.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (ledgers `unattended-mode.md` by path; the path did not move) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` — **updated** (deliverable) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (`.3` owns its edit) · `claude/skills/*/SKILL.md` no change (`unattended-mode.md` is a fragment, not a SKILL.md).

- [x] Closed — every Acceptance criterion ticked; YAML `status:` → `completed`; PLAN.md `.2` line flipped to stub form, kept nested under `CORE-EPIC-598` in `## High` (epic child placement invariant); tasknote moved to `.flowtron/tasknote/archive/core/`. No superseded-claim pointer: nothing in an archived note was falsified.

- [x] **Evidence-based recap** drafted — see Final Summary; surfaces inline on the 📦 conditional skip.

**Final Summary:**

Declared on flowtron's side the boundary [[CORE-597]] enforced by gitignore — a caller commits nothing of its own into a producer repo; only the worker's closure and filing commits land — and closed the writer bug that let a `park-reason:` value take a parked note out of every YAML-parsing reader. The value stays a plain scalar (operator's choice over quoting: the declared stable surface and both real readers keep working byte-for-byte), so the fix is a prose rule at the owner plus a one-clause reminder at each runner writer. The one adopter ID in SPEC prose is gone.

- **Changed:** `docs/EXTERNAL-AGENTS.md` (+2 / −1: step 9, step 6 cross-ref), `SPEC/blocked.md` (+12: plain-scalar paragraph), `claude/skills/ft-task/unattended-mode.md` (+1 / −1), `SPEC/procedures/ft-task.md` (+3 / −1), `SPEC/plan-filing.md` (+1 / −1). Total +20 / −4.
- **Verification:** four `grep -q` receipts → 0; adopter-ID grep → no hits; js-yaml re-run confirms the three failure shapes and that a rule-conforming rewrite of the live CBN-186 park parses whole; budgeted files unchanged; no trailing whitespace.
- **Refactors:** none.
- **Documentation:** 3 SPEC modules + 1 doc + 1 skill fragment updated as deliverables; the other 17 sweep entries no change. The `park-reason:` stable-surface row did not move.
- **`touches:` reconciliation:** declared 5 files, changed 5 — no undeclared paths (PLAN.md and this note excluded by construction).
- **Maintainability effect:** the boundary caobunga's own contract already states ("read-only in both directions") now has a flowtron-side anchor (`.4`'s status-snippet row cites step 9), so the next status-file collision is a contract question; and the next `--unattended` park cannot silently vanish from viz or a caller's open set on a colon.

**Archived:** 2026-09-14
