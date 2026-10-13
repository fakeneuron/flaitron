---
title: candidacy-prep-boundary
status: completed
tags: []
created: 2026-10-13
due:
related-tasks: [CORE-EPIC-783, CORE-783.1, CORE-783.3, CORE-783.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/unattended-candidacy.md
  - /Users/fakeneuron/Code/caobunga/.flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-783.2 | candidacy-prep-boundary

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-783]]

## 🎯 Goal

Pin unattended-candidacy clause 3 as two layers: the keyword list stays the mechanical screen, a keyword miss is not a semantic pass, and an LLM filer plus /ft-prep-unattended decline a row that reads as needing a person, with no new visual keywords and Caobunga's mirror left as a handoff.

## ✅ Acceptance

- [x] Clause 3 states two layers: the existing keyword list is the mechanical screen, and a keyword miss is not a semantic pass — `grep -q 'A keyword miss is not a semantic pass' SPEC/unattended-candidacy.md && grep -q 'Two layers' SPEC/unattended-candidacy.md`
- [x] An LLM filer and `/ft-prep-unattended` are the ones that decline a person-shaped row — `grep -q '/ft-prep-unattended' SPEC/unattended-candidacy.md && grep -q 'An LLM filer' SPEC/unattended-candidacy.md && grep -q 'decline a row that reads as needing a person' SPEC/unattended-candidacy.md`
- [x] The keyword list is unchanged and gains no visual or raster entries. The sentence forbids adding those words; it does not insert them into the list — `grep -F -q '*operator*, *hand-off* / *handoff*, *manual*,' SPEC/unattended-candidacy.md && grep -F -q '*deploy*, *migration*' SPEC/unattended-candidacy.md && grep -F -q 'do not add visual or raster keywords' SPEC/unattended-candidacy.md && ! grep -F -q 'not a semantic judgment' SPEC/unattended-candidacy.md`
- [x] The `[handoff]` marker stays definitive, and the new sentence is not copied into a skill body — `grep -F -q 'is **definitive**' SPEC/unattended-candidacy.md && ! grep -R -F -q 'A keyword miss is not a semantic pass' claude/skills`
- [x] Caobunga's mirror is a filed PLAN row, and `selection.py` is not edited from this cycle — `judgment` (the row is in the sibling repo; this checkout's diff does not contain that file)
- [x] Drift checks pass after the markdown edit — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the clause 3 tail in `SPEC/unattended-candidacy.md`. Leave the keyword list and the `[handoff]` short-circuit as they are.
- [x] Allocate the next `CBN-*` id and file the caobunga Medium row. Do not edit `selection.py`. Commit that row only when caobunga's filing pre-check allows it.
- [x] Run the drift checks and the verification receipt.

## 🔗 Related

- [[CORE-EPIC-783]] — parent epic
- [[CORE-783.1]] — discovery; filed this child's scope
- [[CORE-783.3]] — sequential after this child; prep skill
- [[CORE-783.N]] — synthesis audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The open Medium row is the clause 3 pin Discovery already scoped. `.1` is closed, and the Fan-out sequential claim names this child as the head, so nothing blocks it.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

  The predicate lives once in `SPEC/unattended-candidacy.md`. Filers Read it and do not restate a clause. This pin extends clause 3's existing paragraph. It does not add a heading, and it does not copy the sentence into a skill.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/core/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

  `<area>` is `archive/core/` (README table). The path grep was past a handful of notes, so a read-only probe read the clause 3 precedents. Findings are in Discovery Notes. No ⚠️ pointer on those hits.

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

  Clause 3 at HEAD still has the keyword list Discovery named, then "a keyword screen, not a semantic judgment" plus "still declined under the conservative default." The PLAN line asks to pin that as two layers and to name the LLM filer and `/ft-prep-unattended`. The skill does not exist yet; naming it is the forward obligation `.3` implements. Caobunga `selection.py` still comments a keyword miss as `obvious` and returns `OBVIOUS` when nothing else denies. No path or line drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: the pin stays in the module; the keyword tokens and the `[handoff]` short-circuit stay; `/ft-prep-unattended` is named and not built here; the caobunga change is a new Medium PLAN row, not a `selection.py` edit, and this filing does not write `[unattended]`.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Clause 3's list (glyphs plus operator / hand-off / handoff / manual / credential / secret / password / physical / cross-repo / production / deploy / migration) stays the mechanical screen. The sentence after it is what caobunga mirrored into the wrong conclusion: a miss became `obvious`. The rewrite says a miss is not a semantic pass, and names who declines a person-shaped row.

Archive probe: the rewrite contradicts no archived decision. [[CORE-577.2]] shipped the list and the conservative default (a person-shaped miss is still declined). [[CORE-598.3]] kept that screen as the fallback and made `[handoff]` definitive. [[CORE-724.4]] and [[CORE-736]] say mirrors must not restate the predicate. [[CORE-783.1]] filed this pin, including no new visual or raster keywords and the caobunga handoff. No archived note says a miss means the row passes. No superseded-claim pointer: the old sentence was ambiguous, not a false factual claim about a file.

Fan-out echo: Sequential `[[CORE-783.3]] after [[CORE-783.2]]` names this child as the predecessor, so `blocked-by:` stays omitted. No Parallel row.

Caobunga, read only so far: `backend/caobunga/flaitron/selection.py` lines 306–310 and `_unmarked_triage` (a keyword hit returns `needs_judgment`; a miss falls through to `OBVIOUS`). Prefix `CBN-*` archives to `archive/cbn/`. The row will be allocated at the write.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended clause 3's existing paragraph. The predicate stays in this module; skill bodies keep their labeled mirror and do not restate the clause.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor. The keyword list and the `[handoff]` short-circuit are untouched. Unrelated cleanup deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  No new code test. The change is a contract sentence; Acceptance names the greps and `bash tools/drift-checks.sh`.

**Implementation Notes:**

Replaced the "keyword screen, not a semantic judgment — still declined" tail with two layers. The list stays the mechanical screen, a miss is not a semantic pass, and an LLM filer plus `/ft-prep-unattended` decline a person-shaped row. No visual or raster keyword was added to the list.

Caobunga's tree already carried unrelated CBN-360 edits, so the filing pre-check committed only `.flaitron/PLAN.md`. Row `CBN-361` [medium] `clause3-miss-not-obvious`, under Medium. Commit `07fe6cf0f1c2f733d3d5618d5dbf562b4b89b475`. The raster wording fix is `a543ec0a766637a3b36812d43f24c206a8741e96`. That second commit also contains the CBN-360 PLAN stub that was already in the working tree (last-updated line, open row removed, completed stub). CBN-360's code and archive are `362467ef69e361dc8364922e5f456cde58e8388e`. Those commits were not rewritten. `selection.py` was not edited. No `[unattended]` token: this filing had no confirm gate. A later seed still applies both layers. The mechanical screen misses, and the semantic layer also admits — the work is a classifier correction, not a person-shaped step. That judgment stays off the row until an operator confirms it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

N/A for a code test suite, lint, and type-check. The deliverable is a contract sentence. No frontend surface, so no 👁️ ask.

Verification receipt:

- `grep -q 'A keyword miss is not a semantic pass' SPEC/unattended-candidacy.md && grep -q 'Two layers' SPEC/unattended-candidacy.md` → 0
- `grep -q '/ft-prep-unattended' SPEC/unattended-candidacy.md && grep -q 'An LLM filer' SPEC/unattended-candidacy.md && grep -q 'decline a row that reads as needing a person' SPEC/unattended-candidacy.md` → 0
- `grep -F -q '*operator*, *hand-off* / *handoff*, *manual*,' SPEC/unattended-candidacy.md && grep -F -q '*deploy*, *migration*' SPEC/unattended-candidacy.md && grep -F -q 'do not add visual or raster keywords' SPEC/unattended-candidacy.md && ! grep -F -q 'not a semantic judgment' SPEC/unattended-candidacy.md` → 0
- `grep -F -q 'is **definitive**' SPEC/unattended-candidacy.md && ! grep -R -F -q 'A keyword miss is not a semantic pass' claude/skills` → 0
- `bash tools/drift-checks.sh` → 0
- Judgment: CBN-361 is the open row in caobunga `.flaitron/PLAN.md`. This repo's diff does not contain `selection.py`.

Structural half: N/A. One paragraph in the existing clause. No new code, no duplicated predicate, no skill restatement.

External review (read-only probe): no blockers. Note — the filed row said visual and not raster. Fixed in the caobunga row. Note — the seed remark cited only the mechanical miss. Fixed in Implementation Notes: both layers admit, and the token stays unwritten.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  No change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. The sentence lives in the lazy module. None of these restate it. Not a stable-surface move, so no caller-side row in this plan. The caobunga row is the handoff.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The predicate stays in `SPEC/unattended-candidacy.md`. The always-loaded layer does not restate it.

**Final Summary:**

Clause 3 is two layers. The keyword list stays the mechanical screen, and a keyword miss is not a semantic pass. An LLM filer and `/ft-prep-unattended` decline a row that reads as needing a person. No visual or raster keyword was added. `[handoff]` stays definitive.

Caobunga mirror: `CBN-361` filed, not `selection.py`. Commits `07fe6cf0f1c2f733d3d5618d5dbf562b4b89b475` and `a543ec0a766637a3b36812d43f24c206a8741e96`. The second also holds the CBN-360 PLAN stub that was already in that working tree. Not rewritten.

`touches:` reconciliation: declared `SPEC/unattended-candidacy.md` and `/Users/fakeneuron/Code/caobunga/.flaitron/PLAN.md`. This repo's diff is the module. The sibling path landed in caobunga, so it is absent here on purpose. This tasknote and the PLAN stub are the closure's own files.

No superseded-claim pointer. The old sentence was ambiguous. The archives that quote it record what it said then.

**Archived:** 2026-10-13
