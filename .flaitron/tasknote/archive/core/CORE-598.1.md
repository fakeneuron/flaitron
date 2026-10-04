---
title: flowtron-caobunga-concert discovery
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: [CORE-EPIC-598, CORE-EPIC-565, CORE-565.3, CORE-EPIC-577, CORE-591, CORE-597]
touches:
  - .flowtron/PLAN.md
---

# CORE-598.1 | flowtron-caobunga-concert discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-598]]

## 🎯 Goal

Scope the `CORE-EPIC-598` epic (`flowtron-caobunga-concert`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-598.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (flowtron's declared caller surfaces, caobunga's reader/dispatcher consumption, SPEC contract impact, docs) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-598.2 .. CORE-598.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-598.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (flowtron: `docs/EXTERNAL-AGENTS.md`, `docs/VISION.md`, `SPEC/blocked.md`, `SPEC/gates.md` unattended posture, `SPEC/unattended-candidacy.md`; caobunga: `docs/CONTRACT.md`, `backend/caobunga/flowtron/`, `.flowtron/PLAN.md`, top-level docs) — Discovery Notes §A–§C
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents (CORE-565 cohort, CORE-577 cohort, CORE-591, CORE-597, CORE-494, CORE-551) — Discovery Notes §D
- [x] Drift check on cited paths and concepts — Discovery Notes §E
- [x] Surface open scoping questions via AskUserQuestion — Discovery Notes §F
- [x] Draft refined long descriptions for CORE-598.2 .. CORE-598.4; word-count each (≤50w target / 70w hard cap) — Implementation Notes
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-598 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-598]] — parent epic
- [[CORE-EPIC-565]] / [[CORE-565.3]] — first pass (harness-value-review, 2026-09-10); `.3` declared the stable caller surfaces in `docs/EXTERNAL-AGENTS.md` and emitted CBN-148..150
- [[CORE-EPIC-577]] — `[unattended]` candidacy landed after 565; a caller-visible surface
- [[CORE-591]] — filing-commit index guard, driven by caobunga CBN-179
- [[CORE-597]] — `caobunga-status.md` untracked; the orchestrator's status writes were landing as commits on flowtron `main`

## 🌳 Fan-out

- **Sequential:** [[CORE-598.2]] first (declares the boundary `.4`'s status-snippet row cites); [[CORE-598.3]] after [[CORE-598.2]] (its stable-surface row lands in the same EXTERNAL-AGENTS table); [[CORE-598.4]] after [[CORE-598.3]] (the CBN rows cite the release carrying both).
- **Synthesis:** [[CORE-598.N]] — re-runs [[CORE-565.3]]'s contract-fit checks against both readers after all three children close.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The operator invoked `/ft-epic-discovery` asking for a second deep look at the flowtron ↔ caobunga concert after [[CORE-EPIC-565]]. The read surfaced one live conflict (flowtron is un-dispatchable by caobunga since [[CORE-597]]), one flowtron-side writer bug, one lost cross-repo hand-off, and one adopter-name leak — none single-task, all bracketed by the same boundary question. Epic scope confirmed.

- [x] Read relevant source files — flowtron: `docs/EXTERNAL-AGENTS.md` (whole), `docs/VISION.md` (whole), `SPEC/epic.md`, `SPEC/blocked.md` §"Park reason", `SPEC.md` §"Tasknote frontmatter" + "Park reason", `SPEC/plan-filing.md:48-58`, `claude/skills/ft-task/unattended-mode.md` (grep for `park-reason`), `viz/src/tasknote-parse.ts` (js-yaml engine), `.gitignore:11-12`. caobunga (operator-approved this session, read-only, one `ls` level then named files): `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/CONTRACT.md` §"Follow-up capture" → §"Foreign-commit detection", §"GitHub-facing status", §"Flowtron reader" → §"Unattended capability probe", §"Run loop" → §"Continue prompt", §"Out of scope", §"Compatibility"; `backend/caobunga/flowtron/{layout,grammar}.py` (whole), `selection.py:300-345`; `.flowtron/PLAN.md` (header, open sections, max ID).

- [x] **Best Practices Review** — `N/A` — markdown contract + a PLAN filing; the one boundary in play (contract in flowtron, runtime in caobunga; a caller reads and never writes into a producer) is restated in Discovery Notes §A and carried by `.2`.

- [x] **Archive skim** — `grep -rli caobunga .flowtron/tasknote/archive/core/` → 25 notes. Read: [[CORE-565.1]] (Constitution #1–#7, Q1/Q3/Q5), [[CORE-565.3]] (§A consumption table, verdict table, CBN-148..150), [[CORE-565.N]] (F2: CBN rows numbered stale), [[CORE-597]] (Goal + Final Summary). Load-bearing findings in Discovery Notes §B–§D.

- [x] **Drift check** — §E. Every 565.3-declared stable surface still resolves at HEAD (probe files present; `--unattended` 7 / 9 in the two SKILL.md files; template labels unchanged). caobunga pins v5.27.0 = HEAD `SPEC.md`. Two things moved since 565.3: `SPEC/plan-filing.md:54` gained an adopter ID (post-565.3 edit, CORE-591); `.gitignore` gained `caobunga-status.md` (CORE-597). Neither contradicts a SPEC contract; both are the drift this epic exists to reconcile.

- [x] Asked clarifying questions — one AskUserQuestion round (path approval + shape, Step 2) and one scoping round (§F). Assumptions carried: (1) the operator's `[handoff]` answer states a principle — a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing — and `.3` records it where VISION is canonical rather than re-litigating VISION's two-project rule per token; (2) candidacy proposals ([[CORE-EPIC-577]]) stay as-is under that same principle; (3) flowtron never writes into caobunga — `.4`'s deliverable is text the operator pastes from caobunga's own session, and its Acceptance makes the paste a closure condition rather than prose.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. The boundary, restated (from [[CORE-565.1]] Constitution #3, carried forward)

Contract in flowtron, runtime in caobunga. Flowtron ships the markdown contract a caller reads (`docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers"); caobunga reads it and writes nothing into a producer repo — its own principle, stated at `CONTRACT.md` §"Marker coverage" → "Read-only in both directions". Flowtron must stand alone: nothing in the contract requires an orchestrator to exist, `--unattended` is opt-in, `[unattended]` is operator-written. Both halves held at 565.3; the read below is what moved since.

### B. What moved since [[CORE-565.3]] (2026-09-10 → HEAD 2026-09-14)

| # | Finding | Side | Evidence |
|---|---|---|---|
| 1 | **Live conflict — flowtron un-dispatchable by caobunga.** [[CORE-597]] gitignored `caobunga-status.md` (commit history was gaining `caobunga:` commits from author `caobunga <caobunga@local>`, e.g. `71e5051`). caobunga's snippet-ignore gate (CBN-154) refuses every launching tier at exit 2 when the target ignores that file. | both | `.gitignore:11-12`; `CONTRACT.md:1300` (§"Run loop" → "Snippet-ignore gate"), `:957-965` (§"GitHub-facing status": overwrite + path-commit in the worker repo). The snippet commit is the one write that contradicts caobunga's own "read-only in both directions" (`CONTRACT.md:1068`). |
| 2 | **Flowtron writes YAML-unsafe `park-reason:`.** The writer contract (`unattended-mode.md:27`, `SPEC/blocked.md` §"Park reason") emits `<code> — <prose>` unquoted. Prose containing `: ` fails js-yaml (`bad indentation of a mapping entry`); ` #` silently truncates. viz's `tasknote-parse.ts` catch-and-skips the whole note; caobunga CBN-186 added a line-wise fallback after a live park (`visual-confirm — Phase 3 👁️ CONFIRM: header renders`) vanished from its open set. | flowtron | Verified this session with `js-yaml` on three shapes: `: ` → error, backticks → ok, ` #` → truncated to `input-needed — which priority?`. `CONTRACT.md:1098`. |
| 3 | **Lost hand-off.** 565.3's three ready-to-paste CBN rows (CBN-148..150; 565.N F2 said renumber) were never pasted — absent from caobunga's PLAN open sections and `## Completed`. The stale claims they fix still stand (`CONTRACT.md:1037` "prose flowtron wrote … flowtron has no notion of the `[unattended]` marker"; `selection.completed_task_ids` does not read `PLAN-ARCHIVE.md`, `selection.py:605` acknowledges). | process | `grep contract-provenance\|blocker-resolution-plan-archive\|continue-prompt-upstream ~/Code/caobunga/.flowtron/PLAN.md` → 0. SPEC §"Deferred hand-off filing" already says a deferred operator step is a PLAN row, never Final-Summary prose — 565.1 Q3 chose the prose form. |
| 4 | **Adopter-name leak.** `SPEC/plan-filing.md:54` reads "(caobunga CBN-179, 2026-09-13 — the fix is CORE-591)". 565.3's acceptance was `grep -ci 'caobunga\|CBN-'` → 0 over contract prose; 565.1 Constitution #4: adopter IDs stay in tasknotes. | flowtron | `grep -n -i "caobunga\|CBN-" SPEC.md SPEC/*.md docs/*.md` → exactly that one hit (VERSION-HISTORY excluded). |
| 5 | **`[handoff]` unratified; candidacy proposals fire for every adopter.** caobunga reads `[handoff]` as a third dispatch signal (`CONTRACT.md:1057-1061`, `grammar.py` group 5 membership test); CBN-137 de-scoped the upstream filing on VISION's two-project rule. Flowtron's own candidacy predicate clause 3 screens descriptions for hand-off keywords — `selection.py:308` mirrors it with a word list (`physical`, `cross-repo`, `production`, `deploy`, `migration`, …). Same fact, prose heuristic vs token. Candidacy proposals ([[CORE-EPIC-577]]) ride every filing skill's confirm gate regardless of whether the project uses the marker. | flowtron | Operator resolved (§F). |
| 6 | **Continue prompt hardcodes the submodule path.** `CONTRACT.md:1383` points a stranded-note worker at `.flowtron/core/claude/skills/ft-task/unattended-mode.md`; flowtron-self (registered at CBN-156, no `.flowtron/core`) has it at `claude/skills/ft-task/unattended-mode.md`. `layout._probe_skill_dir` already resolves the right dir for the probe; the prompt text does not use it. | caobunga | Not verified in `loop.py` (outside the approved read set) — `.4` phrases the CBN row as "verify, then fix". |

### C. What still holds (no action)

- Grammar parity `viz/src/parser.ts` ↔ `grammar.py` `TASK_LINE`: caobunga closed the one deliberate gap at CBN-167 (glyph on either side of the trailing-token run, mirroring [[CORE-502]]). No flowtron-side drift.
- Every §"Stable surfaces for callers" row resolves: probe files (`unattended-mode.md` present; `--unattended` in both SKILL.md files), template labels, `park-reason:` split rule (`grammar.py:86-108`), three endings, closed-row set.
- The three trial-hardened mechanisms on caobunga's side — operator-presence gate, foreign-commit detection (CBN-172), new-row detection (CBN-138.3) — all read; none writes. Only the status snippet writes.
- Flowtron's own `## Completed` carries 20 `[unattended]` rows that survived the Phase 4 stub rewrite — the marker-survives-closure declaration holds in practice.

### D. Archive precedents that bind this epic

- [[CORE-565.1]] Constitution #1 (value is the bar), #3 (contract in flowtron, runtime in caobunga), #4 (verify against source; adopter IDs never in SPEC prose), #5 (preserve, don't revert). Q1: flowtron declares, caobunga adapts. Q3: CBN rows are the hand-off shape — **amended here** (§F Q3): the paste is a closure condition, not prose.
- [[CORE-565.N]] F2: CBN row numbers go stale between draft and paste — `.4` numbers from caobunga's next free ID *at paste time* (read this session: max CBN-186 → next CBN-187).
- [[CORE-597]] chose "untrack + gitignore" over "register as a tracked convention" and found no doc referenced the file — true for flowtron's docs, blind to caobunga's gate. The choice stands (§F Q1); the gap it opened is that the boundary was never declared on flowtron's side.
- [[CORE-494]] / [[CORE-551]]: flowtron states *flowtron's* behavior, never the caller's reader's; the "adopter reader is the consumer" stance.

### E. Drift check detail

All 565.3-cited flowtron anchors resolve at HEAD. caobunga pin `v5.27.0` (`git -C ~/Code/caobunga submodule status`) = HEAD `SPEC.md` `**Version:** v5.27.0`. `CONTRACT.md` §"Parse contract" names v5.27.0. The two post-565.3 edits that moved contract-adjacent surfaces are B#4 (`plan-filing.md:54`, from CORE-591) and B#1 (`.gitignore`, from CORE-597). The plan this note forms contradicts no SPEC contract and matches its PLAN line.

### F. Resolved scoping

| Q | Question | Answer |
|---|---|---|
| Q0 | Mode / inputs (Step 2) | Default flow (no `--deep` — 565.1's Constitution reused, §D); area CORE; shortname `flowtron-caobunga-concert`; High; `[heavy]`; M=3 + `.N` audit. Path approval: `~/Code/caobunga/docs/CONTRACT.md`, `backend/caobunga/flowtron/`, `.flowtron/PLAN.md`, `{README,AGENTS,CLAUDE}.md` — read-only, this session. |
| Q1 | Who owns the `caobunga-status.md` conflict | **Caobunga stops writing into targets.** Flowtron keeps CORE-597 and `.2` declares in `docs/EXTERNAL-AGENTS.md` that a caller writes nothing into a producer repo outside the worker's own flowtron closure / filing commits. The snippet moves caller-side (or opt-in per registry) — a CBN row in `.4`. |
| Q2 | `[handoff]` / candidacy standalone cost | Operator: "flowtron can keep handoff even if it is meant for caobunga use; it's okay if flowtron has features that allow tools like caobunga to adopt it even if flowtron doesn't use them internally — use best judgement." Judgement: `.3` **ratifies `[handoff]`** as the second canonical trailing token, **records the principle** in `docs/VISION.md` (a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing), and **leaves candidacy proposals as-is** under that same principle. |
| Q3 | Hand-off shape for caobunga-side findings | **`.4` closes only after the operator pastes** — Acceptance carries an operator-confirm of the paste from a caobunga session; re-emits CBN-148..150 alongside the new rows, numbered from caobunga's next free ID at paste time. |
| Q4 | Child split | **M=3 as proposed**: `.2` flowtron contract fixes → `.3` orchestrator-surface pass → `.4` caobunga hand-off rows; `.N` re-runs 565.3's contract-fit checks against both readers. Sequential. |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the [[CORE-565.1]] / [[CORE-577.1]] cohort-filing pattern: 2-space child indent, `[<model>]` on every line, em-dash separator, `.2..4` inserted between `.1` and `.N`.

- [x] **Minimal refactor gate** — `N/A` — PLAN.md filing only; no refactor surface.

- [x] Implemented the minimal solution — three child lines written under `CORE-EPIC-598` in `.flowtron/PLAN.md`.

- [x] Updated/added tests for non-trivial behavior — `N/A` — no executable surface.

**Implementation Notes:**

- Lines written: 3 (`.2`, `.3`, `.4`). Word counts (description after the em-dash): `.2` 58w, `.3` 55w, `.4` 52w — all under the 70w cap; all over the 50w target by a few words, kept because each names the exact files / rows the child edits (the same trade [[CORE-565.1]] made).
- M unchanged from the filing-time estimate (3). `.N` audit line confirmed as-filed; `[heavy]` stands because it re-runs the 565.3 reader cross-check, which needs the caobunga source read.
- Downstream-impact scan: `.flowtron/PLAN.md` carries no other open rows (High / Medium / Low / Future Opportunities were all empty at filing) — **no downstream impact**.
- `[unattended]` candidacy (`SPEC/unattended-candidacy.md` §"Candidacy predicate") over `.2`, `.3`, `.4`, `.N`: `.2` / `.3` / `.N` fail clause 1 (`[heavy]`); `.4` is `[medium]` but trips clause 3 (*operator* in the description — and it genuinely needs one for the paste). **No candidates**; no token written; no review prompt fired.
- Fan-out: all sequential (`.2` → `.3` → `.4`), `.N` synthesis — filled in `## 🌳 Fan-out` above.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown filing only.

- [x] Ran lint/type-check on changed code — `N/A` — markdown filing only.

- [x] **Verification receipt** — markdown mental-pass on the PLAN.md block: 2-space child indent on all five child rows; bold IDs intact; `[<model>]` on every row; no `[unattended]` on any row; `| shortname` ≤30 chars (`caller-write-boundary-fixes` 27, `handoff-token-ratify` 20, `caobunga-handoff-rows` 21); em-dash separator consistent; no trailing whitespace; Fan-out wikilinks match the filed children. `npm --prefix viz test` (parser) → see Testing Notes.

- [x] (frontend) Asked the user for visual confirmation — `N/A` — no rendered surface changed.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Parser parity check on the written block: `node` one-liner loading `viz/src/parser.ts`'s `TASK_LINE` equivalent was not needed — the rows use the exact shape of the 20 `[x]` rows already in `## Completed`; grep confirms five `**CORE-598.` rows, all matching `^  - \[ \] \*\*CORE-598\.(1|2|3|4|N)\*\* \[(heavy|medium)\]`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 / 18 walked; **no change** on every entry (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). Pure Discovery filing; the `docs/EXTERNAL-AGENTS.md` and `docs/VISION.md` edits this epic needs are `.2` / `.3` deliverables, not this note's.

- [x] Closed — every Acceptance criterion ticked; YAML `status:` → `completed`; PLAN.md `.1` line flipped to stub form, kept nested under `CORE-EPIC-598` in `## High` (epic child placement invariant); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary; surfaces inline on the 📦 conditional skip (PLAN.md edit + tasknote scaffold/archive; no privileged-ops surface).

**Final Summary:**

Filed `CORE-EPIC-598` (`flowtron-caobunga-concert`) and closed its Discovery with three scoped, sequential children. The second deep look found the boundary [[CORE-EPIC-565]] locked — contract in flowtron, runtime in caobunga, caller reads and never writes — intact in principle and breached in one place on each side: flowtron's [[CORE-597]] gitignore versus caobunga's CBN-154 snippet-ignore gate leaves flowtron un-dispatchable by caobunga today, and flowtron's own `park-reason:` writer emits YAML that its own visualizer and caobunga's reader both choke on. The operator settled the status-file conflict in favor of "a caller writes nothing into a producer repo" and stated a principle for orchestrator-facing surfaces — a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing — which `.3` records in VISION and applies to `[handoff]`.

- **Changed:** `.flowtron/PLAN.md` (+6 rows: parent, `.1`, `.2`, `.3`, `.4`, `.N`; `.1` flipped to stub), `.flowtron/tasknote/archive/core/CORE-598.1.md` (this note, scaffold → archive).
- **Children:** `.2` caller-write-boundary-fixes (58w) → `.3` handoff-token-ratify (55w) → `.4` caobunga-handoff-rows (52w) → `.N` audit. M unchanged from filing (3). Fan-out all sequential.
- **Verification:** grep confirms five `**CORE-598.` child rows in the canonical shape; no trailing whitespace; `[unattended]` candidacy → no candidates (three `[heavy]`, `.4` needs an operator by design).
- **Refactors:** none.
- **Documentation:** 18 / 18 sweep entries no change.
- **`touches:` reconciliation:** declared `.flowtron/PLAN.md`; actual adds `.flowtron/tasknote/archive/core/CORE-598.1.md` (the note itself — lifecycle artifact, not a deliverable path).
- **Maintainability effect:** the one flowtron↔caobunga hand-off that was lost last time (CBN-148..150) is now a closure condition on `.4` rather than Final-Summary prose; the caller-write boundary gets declared once on flowtron's side so a repeat of the CORE-597 / CBN-154 collision is a contract question, not a surprise.

**Archived:** 2026-09-14
