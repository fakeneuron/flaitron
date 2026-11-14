---
title: supply-chain-yaml-edges
status: completed
tags: [security, ci, drift-checks]
created: 2026-11-14
due:
related-tasks: [CORE-904, CORE-910, CORE-911]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONVENTIONS.md
  - SECURITY.md
---

# CORE-907 | supply-chain-yaml-edges

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-904]] · [[CORE-910]] · [[CORE-911]]

## 🎯 Goal

Close or document the YAML and shell spellings that `supply_chain` in `tools/drift-checks.sh` misreads because it reads line by line: the bypasses (`uses :`, a quoted `"uses":` key, a next-line `permissions:` scalar) and the fail-closed false positives (`uses:` text in a `run:` script, a multi-line top-level `install.sh` assignment).

## ✅ Acceptance

- [x] Bypasses now fail: `uses :`, a quoted `"uses":` key, a quoted `"permissions": write-all`, and a `permissions:` scalar on the next line each surface as a finding in the seeded case — `node --test tools/drift-checks.test.mjs`
- [x] False positives now pass: `uses:` text in a one-line `run:` and inside a `run: |` block body, and a multi-line single-quoted top-level `install.sh` assignment, trip nothing (seeded beside the bypasses; an extra finding breaks the case's contiguous finding block) — `node --test tools/drift-checks.test.mjs`
- [x] HEAD stays green and the full drift suite passes — `bash tools/drift-checks.sh`
- [x] The fetch-spelling limits deferred from CORE-910/911 (gh flags before `release`, `\` continuations, hoisted URL variables, `browser_download_url`) are written down as known limits in the function comment and `SECURITY.md` — `grep -q 'browser_download_url' tools/drift-checks.sh && grep -q 'browser_download_url' SECURITY.md`

## 🧩 Subtasks

- [x] `install.sh` trap: replace newlines in `$BASH_COMMAND` with spaces before printing (no backslash in the replacement, so bash 3.2 and 5.2 agree)
- [x] Workflows: column-0 presence accepts a quoted / spaced `permissions` key; replace the grep BROAD check and the `uses:` awk with one awk pass that skips comment lines and block-scalar bodies, accepts quoted / spaced keys, flags a non-mapping scalar on the line after an empty `permissions:`, and skips a block-mapping `run:` line with a plain (non-flow) value for the `uses:` rule; keep output order (BROAD then UNPINNED per file)
- [x] Function comment: state the hardening and the known limits
- [x] Seed the edges in `tools/drift-checks.test.mjs` (new `zz.yml` workflow + multi-line install.sh assignment) and extend the finding regex
- [x] `SECURITY.md` known-limits line; `docs/CONVENTIONS.md` entry if its wording needs it
- [x] Full validation (`just check`)

## 🔗 Related

- [[CORE-904]] — added `supply_chain`; its Testing Notes round 4 filed this row (predecessor)
- [[CORE-910]] — release-fetch pin rule; deferred its line-parsing limits here
- [[CORE-911]] — `latest/download` and `gh release download` rule; deferred other fetch spellings here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Reproduced all five named edges in a scratch copy (HEAD `5d5b576d`): `uses :`, `"uses":`, and a next-line `permissions:` scalar pass silently, and a quoted `"permissions": write-all` passes too (one more bypass, same class). `run: echo uses: x`, a `uses:` line in a `run: |` body, and `X='a<NL>b'` in install.sh each fail. Still live.

- [x] Read relevant source files — `tools/drift-checks.sh` `supply_chain()` (lines 483–570), `tools/drift-checks.test.mjs` `supply_chain` case (128–189), `SECURITY.md` lines 157/211/224, `docs/CONVENTIONS.md` line 58.

- [x] **Best Practices Review** — stays one check function per the header's shape rules; merging the BROAD grep and the `uses:` awk into one awk pass shares the block-scalar tracking rather than duplicating it. The fetch rules (CORE-910/911) keep reading `run:` bodies — that is where the fetches live — so the block-scalar skip applies to key detection only.

- [x] **Archive skim** — area `core` confirmed against the README table. Hits: CORE-904 (origin; Testing Notes round 4 names these edges), CORE-910 (declined notes 3–4: inline `# sha256sum -c` counts, hoisted pin fails closed — "CORE-907-class"), CORE-911 (declined notes 1–2: trailing-comment matches and other fetch spellings — "[[CORE-907]] covers this class"). CORE-901/902/903/905/909 touch `drift-checks.sh` for other checks; nothing load-bearing here.

- [x] **Drift check** — PLAN line matches the code and the repro. SPEC: no contract on this check's internals. One addition beyond the PLAN line: the quoted `"permissions":` bypass (same class, fixed in scope).

- [x] Asked one question: scope. Operator picked "fix the YAML edges; document the fetch spellings" over "also chase fetch spellings" and "document only". Assumptions: a `run:` line is skipped for `uses:` only when its value is a plain (non-flow) scalar, so `{ run: x, uses: y }` still checks; block-scalar bodies are lines indented past the key's column (fail-closed for odd indents); a next-line `permissions:` value that is not a `key:` line (scalar, flow map, sequence) is BROAD; quoted `*_SHA256` / `"steps":` keys stay fail-closed, unchanged.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Size estimate: ~70 lines.

Discovery surfaced no significant deviation (one extra same-class bypass, settled in the scope answer) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `supply_chain` awk pass (same `match`/`sub` idioms, block tracking modeled on the CORE-910 `steps:` indent tracker) and the existing `CASES` seed + whole-block regex.

- [x] **Minimal refactor gate** — one merge for Acceptance: the `permissions:` grep pipeline and the `uses:` awk became one awk pass so both share the block-scalar skip; findings are buffered so BROAD still prints ahead of UNPINNED per file. Nothing else touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `install.sh`: the DEBUG trap prints `${BASH_COMMAND//$nl/ }` (newline → space, no backslash in the replacement so bash 3.2 and 5.2's `patsub_replacement` agree). A newline inside a single-quoted value stays inside the quoted word, so the assignment regex still decides it. Verified on bash 3.2.57.
- Workflows: column-0 presence accepts `"permissions":` / `permissions :`. One awk pass: skips blank and comment lines and block-scalar bodies (lines indented past the key column of a `key: |`/`>` line; for `- key: |` the column after `- `, so a sibling key after the body is still read); a `permissions` key (quoted / spaced / after `- `) with an empty value arms a next-line check that flags any more-indented non-`key:` line; a block-mapping `run:` line with a plain non-flow value is skipped for `uses:`; the `uses:` matcher accepts quotes and a space before `:`.
- Function comment and `SECURITY.md` now name the fetch-spelling limits (operator's scope answer).
- Scratch probes: flow `{ run: echo, uses: x/y@v1 }` still checked; a heredoc `permissions: write-all` inside `run: |` skipped; a quoted pinned ref passes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface (shell check + markdown).

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:

- `node --test tools/drift-checks.test.mjs` → 0 (44/44)
- Mutation: same test against HEAD's `tools/drift-checks.sh` → 1 (`supply_chain fails on its seeded drift`), so the new seed bites.
- `bash tools/drift-checks.sh` → 0 (`supply_chain ok` on HEAD's workflows and install.sh)
- `grep -q 'browser_download_url' tools/drift-checks.sh && grep -q 'browser_download_url' SECURITY.md` → 0
- `just check` → 0 (full validation roster + drift checks)
- `shellcheck tools/drift-checks.sh` → no finding in the changed block (pre-existing SC lines elsewhere only).

External review — `/code-review medium` over this task's working-tree diff:

- Round 1: **blocker** — a trailing comment ending `: |` / `: >` (`jobs:   # note: |`, `permissions:   # see: >`) opened a block scalar and skipped every line beneath it (fail-open; reproduced) → fixed: the indicator must follow the first key's colon directly; seeded both comments. **note** — an empty, null `permissions:` with nothing under it passed (pre-existing, same logic) → fixed: BROAD `(null)`; seeded. **note** — `k = $0` temp → folded into a ternary. **note — declined:** a plain `run:` scalar continued on more-indented lines and an anchored / merge-key `permissions:` still fail closed (false positives, never bypasses; rare in workflows). Receipt re-run after the fixes: `just check` → 0, `bash tools/drift-checks.sh` → 0, self-test 44/44.
- Round 2 (no fail-open found): `- permissions:` null measured from the dash → fixed (key column, like the block opener). Tag / anchor openers (`run: !!str |`) and `.`/`/` keys missed → fixed. CRLF lines → `\r` stripped per record (probe: `permissions: {}\r` passes, tagged-opener body skipped, `@main` still caught). Header comment, `SECURITY.md`, and `docs/CONVENTIONS.md` wording (null fails; script-body text not read) → updated. **note — declined:** quoted `"steps":` / `*_SHA256` keys in the fetch rule stay fail-closed (Discovery assumption); flattened multi-line command text in INSTALL reports (still fails; reporting only); the key pattern repeats across regexes (explicit over an awk-variable indirection in a dense check); "parse YAML for real" conflicts with the script's zero-dependency rule — a design call, not a fix, and every remaining miss found fails closed. Final receipt: `just check` → 0, `bash tools/drift-checks.sh supply_chain` → 0, `supply_chain` self-test case → pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SECURITY.md`: updated in scope (known fetch-spelling limits; null permissions; script-body text). `docs/CONVENTIONS.md`: updated in scope ("shorthand or null value"). All other AI-referenced docs: no change (none describe `supply_chain`'s parsing).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer. Local note: when a line reader skips text it judges to be non-key (block bodies), the skip trigger must be anchored to real syntax (the key's colon), or a comment becomes a switch that silences the check; skips are the fail-open side of a fail-closed check.

**Final Summary:**

`supply_chain` now reads quoted and spaced workflow keys (`uses :`, `"uses":`, `"permissions":`), fails a `permissions:` value on the next line or a null `permissions:`, and no longer misreads `uses:` / `permissions:` text in `run:` values or block-scalar bodies, or a multi-line single-quoted install.sh assignment. The fetch spellings a line grep cannot see are documented as known limits. Changed: `tools/drift-checks.sh` (+37/−14), `tools/drift-checks.test.mjs` (+23/−2), `SECURITY.md` (+8/−3), `docs/CONVENTIONS.md` (+1/−1). `touches:` declared 4 files, changed 4 (plus this note and PLAN.md). One refactor for Acceptance: the `permissions:` grep and the `uses:` awk merged into one awk pass sharing the block-scalar skip. Two review rounds; round 1's fail-open (comment-opened block) fixed and seeded. Maintainability: the check stays a line reader; remaining misses all fail closed, and a real YAML parse is a separate zero-dependency design call. Live CI on ubuntu/bash 5 not yet observed (needs a push).

**Archived:** 2026-11-14
