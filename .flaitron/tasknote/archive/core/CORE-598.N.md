---
title: flowtron-caobunga-concert audit
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: [CORE-EPIC-598, CORE-598.1, CORE-598.2, CORE-598.3, CORE-598.4, CORE-565.3, CORE-565.N]
---

# CORE-598.N | flowtron-caobunga-concert audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-598]]

## 🎯 Goal

Verify the completed `CORE-EPIC-598` (`flowtron-caobunga-concert`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, a re-run of [[CORE-565.3]]'s contract-fit checks against both readers (`viz/src/parser.ts` and caobunga's), and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] Contract-fit re-run: every §"Stable surfaces for callers" row in `docs/EXTERNAL-AGENTS.md` resolves at HEAD against flowtron's own parser (`viz/src/parser.ts`) and, path-approved, against caobunga's reader — `judgment` + grep receipts in Testing Notes
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-598.N — audit CORE-EPIC-598` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-598.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-598.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — fires in the 📦 bundle — user confirms or declines flipping `CORE-EPIC-598` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Contract-fit re-run — stable-surface rows vs `viz/src/parser.ts`; vs caobunga's reader if path-approved
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-598.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-598]] — parent epic (flowtron-caobunga-concert)
- [[CORE-598.1]] — Discovery; §B findings table, §F resolved scoping; Fan-out names `.N` as synthesis
- [[CORE-598.2]] — caller-write boundary (EXTERNAL-AGENTS step 9), plain-scalar `park-reason:` rule, adopter-ID strip
- [[CORE-598.3]] — `[handoff]` ratified (grammar + parser + candidacy + stable-surface rows), VISION carve-out
- [[CORE-598.4]] — eight CBN rows pasted into caobunga; cite v5.28.0 as the uncut Minor carrying `.2` + `.3`
- [[CORE-565.3]] — first-pass contract-fit; §A consumption table + §E resolution table are what this audit re-runs
- [[CORE-565.N]] — prior audit of the same concert; F2 (CBN numbers go stale) was honoured by `.4`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-598.N` invoked by the operator; Step 2 pre-flight passed — parent `CORE-EPIC-598` active under `## High`, `.N` is the canonical audit child, all four siblings (`.1`–`.4`) closed 2026-09-14, no early-audit decision needed. Full cohort; audit scope is the whole epic.

- [x] Read relevant source files — the four cohort archives whole ([[CORE-598.1]] – [[CORE-598.4]]); [[CORE-565.3]] §A consumption table + §E resolution table (the checks this audit re-runs); every cohort deliverable at HEAD: `docs/EXTERNAL-AGENTS.md` steps 6 + 9 and §"Stable surfaces for callers" (whole table + out-of-contract list), `SPEC.md:70-124` §"Task-line format", `SPEC/plan-parser.md` `[handoff]` sites, `SPEC/unattended-candidacy.md:57-68` clause 3, `SPEC/blocked.md:118-126` plain-scalar paragraph, `SPEC/scope-boundaries.md:52`, `docs/VISION.md:36`, `docs/GLOSSARY.md:75-79`, `SPEC/plan-filing.md:54`. Sweep-set keyword scan (`trailing|park-reason|two-project|status snippet|orchestrat|caller`) over all 18 AI-referenced docs — hits read in `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`; none describes a surface the cohort changed.

- [x] **Best Practices Review** — `N/A` — verification pass over shipped markdown + one parser field; no code boundary is touched by the audit itself.

- [x] **Archive skim** — cohort children are the archive entries under audit (read whole). Non-cohort: [[CORE-565.3]] (the contract-fit pass being re-run; §A / §E tables), [[CORE-565.N]] (prior audit of the same concert — F1 was scaffold residue in an archived note, F2 was the CBN-number staleness that `.4` honoured; no `/ft-file-followup` candidates then). Residue scan on the four cohort archives: `**Archived:**` stamp ×1 each, no `YYYY-MM-DD` placeholder, no trailing whitespace. `.2` has 7 unticked `## 🧩 Subtasks` boxes and `.4` has 8 unticked `- [ ]` lines — the latter are the CBN paste-block content, the former are exempt by `SPEC.md:577-581` ("Unticked Subtasks boxes at archive time are correct, not drift"). Not findings.

- [x] **Drift check** — every cohort Acceptance receipt re-run at HEAD and green: `.2` four `grep -q` receipts → 0, `SPEC/plan-filing.md:54` reads `(seen in an adopter 2026-09-13; the fix is CORE-591)`; `.3` grammar / plan-parser (4) / candidacy / EXTERNAL-AGENTS (3) / VISION + scope-boundaries receipts → 0, stale-mirror grep → no hits; adopter-ID grep over `SPEC.md SPEC docs claude README.md templates` → no hits; budgets `SPEC.md` 53,007 / 57,000, `ft-task/SKILL.md` 28,291 / 33,000, `SPEC/gates.md` 35,910 unchanged. `[handoff]` mention census outside archives: 12 files, all cohort deliverables or their mirrors — no stray pre-`.3` "one canonical member" phrasing survives (`grep -i 'only canonical|sole canonical|one canonical|only member'` → hits are unrelated PLATFORMS/MIGRATION install-path prose). `npm --prefix viz test` → 29 files / 561 passed; `typecheck` → 0; `lint` → 0. The plan contradicts no SPEC contract and matches the `.N` PLAN line (re-run of 565.3's checks against both readers).

- [x] Asked clarifying questions — one: the `.N` line's "against both readers" needs caobunga's reader source (`~/Code/caobunga/backend/caobunga/flowtron/` + named `CONTRACT.md` sections), which is outside this repo and needs per-session path approval. Asked via AskUserQuestion at the Phase 1→2 gate; outcome recorded in Discovery Notes §C. Assumptions carried: (1) caobunga still pins v5.27.0, so its reader predates `.2` / `.3` by construction — the check is *does the declared surface still match what it consumes, and is every gap a filed CBN row*, not *has caobunga updated*; (2) the audit applies inline fixes only for scaffold residue or a stale path in a cohort deliverable; anything larger is a `/ft-file-followup` candidate; (3) no `touches:` — the audit expects no file deliverable beyond PLAN.md + this note (an inline fix, if one lands, is named in the reconciliation).

- [x] Subtasks above populated with concrete, ordered steps; YAML `touches:` omitted — no file deliverable expected (see assumption 3).

**Discovery Notes:**

### A. Cohort deliverables (from the archives, verified at HEAD)

| Child | Deliverable | Files |
|---|---|---|
| `.1` discovery | Six findings (§B table), four scoping answers (§F), three sequential children + `.N` synthesis; VISION principle stated by the operator | `.flowtron/PLAN.md` only |
| `.2` caller-write-boundary-fixes | EXTERNAL-AGENTS step 9 "Commit nothing of your own into the producer repo" + step 6 cross-ref; `SPEC/blocked.md` plain-scalar `park-reason:` rule, mirrored one clause each at the two runner writers; adopter ID stripped from `SPEC/plan-filing.md:54` | 5 files, +20 / −4 |
| `.3` handoff-token-ratify | `[handoff]` = second canonical trailing token: `SPEC.md` grammar + segment row + example, `SPEC/plan-parser.md` footguns, candidacy clause 3 definitive, `viz/src/parser.ts` `Task.handoff` + 5 tests, EXTERNAL-AGENTS two rows + out-of-contract bullet, VISION carve-out + scope-boundaries mirror, GLOSSARY entry, three grammar-line mirrors | 18 files, +142 / −48 |
| `.4` caobunga-handoff-rows | Eight CBN rows (`CBN-EPIC-188` + `.1` + `.N`, `CBN-189..193`) pasted by the operator from caobunga's session; the 565.3 trio re-emitted; every pin-dependent row cites v5.27.0 or v5.28.0 | none in flowtron |

### B. Coherence read (flowtron side)

- **Naming.** `[handoff]` is spelled identically across SPEC, plan-parser, candidacy, EXTERNAL-AGENTS, GLOSSARY, VISION, parser comment, template. GLOSSARY carries both `**[handoff]**` (marker) and `**Handoff (🔄)**` (tasknote section) with an explicit "Distinct from" cross-ref each way — no collision.
- **Cross-refs.** Step 6 → step 9 ("never a commit (step 9)") and step 9 → step 6 ("Step 6's two frontmatter writes are the one caller write") agree. The stable-surface "Trailing bracket-token run" row names two canonical members; `SPEC/plan-parser.md:27-28` says "tolerated and dropped — *except* `[unattended]` and `[handoff]`"; the out-of-contract bullet excludes both. The `[handoff]` row's semantics (declines even beside `[unattended]`; attended read never denies; never written, never proposed) match `SPEC.md:91` and GLOSSARY word-for-word in substance. Candidacy clause 3 says "Candidacy never proposes `[handoff]`" and the `[handoff]` stable row says "no filer proposes it" — same claim, consistent.
- **VISION ↔ scope-boundaries.** VISION §36 carries the long form and names EXTERNAL-AGENTS; `SPEC/scope-boundaries.md:52` carries the terse form and names VISION — the mirror pair `.3` intended. `docs/CONVENTIONS.md:155` cites the two-project rule for override shapes (unaffected: it is about adopters, not callers).
- **`.4` ↔ `.2`/`.3`.** `.4`'s rows cite "step 9" (exists), "`SPEC/blocked.md` §"Park reason" plain scalar" (exists), "v5.28.0 ratifies `[handoff]`" (`.3` landed; the tag is not cut — `/ft-release` after this audit is the named follow-through in `.4`'s Final Summary). Consistent.
- **Version claim.** `SPEC.md` still reads `v5.27.0`; `.3` classed the next release Minor. No cohort deliverable claims v5.28.0 is cut.

### C. Contract-fit re-run — caobunga side (operator-approved, read-only, this session)

Read set: `~/Code/caobunga/backend/caobunga/flowtron/{grammar,reader,layout,selection,tasknote}.py` (grep + named ranges), `backend/caobunga/{loop,close}.py` (grep), `docs/CONTRACT.md` (grep for the claims `.4`'s rows cite), `.flowtron/PLAN.md` (the CBN-188..193 rows). Pin: `.flowtron/core` at **v5.27.0** (`git submodule status`; `core/SPEC.md` `**Version:** v5.27.0`) — the reader predates `.2` / `.3` by construction.

| 565.3 §A surface | Flowtron declares (HEAD) | Caobunga consumes (HEAD) | Fit |
|---|---|---|---|
| Task-line grammar | `SPEC.md` §"Task-line format"; `viz/src/parser.ts:131-143` `TASK_LINE` = bullet · glyph · ID · `[!critical]` · `[model]` · glyph · trailing run · glyph · `[!critical]` · shortname · description | `grammar.py:112-125` `TASK_LINE` — the same eleven slots in the same order, glyph on either side of the trailing run (CBN-167) | **parity** |
| Trailing run — two canonical members | `[unattended]` + `[handoff]` captured into `Task.unattended` / `Task.handoff` (`.3`) | `reader.py:72-83`: `EXTRA_TOKEN.findall(extras)` → `unattended=UNATTENDED_MARKER in markers`, `handoff=HANDOFF_MARKER in markers` (`grammar.py:28,36`) | **parity** — caobunga read the token by name before `.3`; flowtron now captures the same two, so the readers agree on both booleans |
| `[handoff]` semantics | Declines operator-less dispatch even beside `[unattended]`; attended read never denies; never written by flowtron | `selection.py:404-455`: handoff dimension denies any `[handoff]` row (CBN-136); operator-presence gate is separate | **fit** |
| `park-reason:` | `<code> — <prose>`, split on first ` — `; **plain scalar** (`.2`) | `tasknote.py:33` line-wise fallback `FRONTMATTER_KEY_LINE` when YAML fails (CBN-186); `CONTRACT.md:260` split on ` — `; `:1098` explains the fallback by the writer bug with no upstream cite | **fit**; cite pending → **CBN-193 open** |
| `Blocked by [[ID]]` vs closed-row set | Both `PLAN.md` `## Completed` and `PLAN-ARCHIVE.md` (565.3) | `selection.py:54` `completed_task_ids` over `PLAN.md` tasks only; `:605` acknowledges the rotation gap | known gap → **CBN-192 open** (annotation only; deny outcome unchanged) |
| Tasknote `status:` set | five statuses; open = all but `completed` | `tasknote.py:26` `OPEN_STATUSES = {starter, not-started, in-progress, blocked}` | **fit** |
| Capability probes | `claude/skills/ft-task/unattended-mode.md` + `--unattended` in two `SKILL.md`s | `layout.py:37,52-77,98-124` — same two probes via `_probe_skill_dir` (pinned vs self layout) | **fit** |
| Continue prompt path | EXTERNAL-AGENTS step 6 two caller paths | `loop.py:185-191,253-264` — `CONTINUE_UNATTENDED.format(module=…)` rendered from `layout.py:84-94` through the probe dir | **fixed** — CBN-189 + CBN-190 `Completed 2026-09-14` (closed by caobunga's session after `.4`'s paste) |
| `**Suggested next task:**` / `### Follow-up…` / template labels | out of contract / out of contract / three labels stable | `close.py:35,38,46` regexes on `**Final Summary:**` … `**Archived:**`, `**Verdict:** De-scope`, `### Follow-ups?`; `close.py:561` + `CONTRACT.md:1037` still say "prose flowtron wrote … no notion of the `[unattended]` marker" | labels **fit**; stale provenance prose → **CBN-191 open** |
| Caller-write boundary (new, `.2` step 9) | a caller commits nothing of its own into the producer | `loop.py:510-512` still refuses a target that gitignores `caobunga-status.md` | known conflict → **CBN-EPIC-188 open** (`## High`, `Suggested next task` → `CBN-188.1`) |
| Three endings / `.flowtron/sidequest/` | unchanged since 565.3 | `close.py:274+`, `layout.py:19` | **fit** (unchanged both sides) |

**Verdict.** Every mismatch that remains on caobunga's side is a filed, open CBN row from `.4` (188 / 191 / 192 / 193); two of the six singles already closed today (189 / 190). Nothing on caobunga's side consumes a surface flowtron does not declare, and nothing flowtron declares is contradicted by what caobunga reads. The three rows that depend on v5.28.0 (188 / 191 / 193) become actionable when that Minor is cut — the follow-through `.4`'s Final Summary already names (`/ft-release` after this audit).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` — verification pass; the one precedent followed is [[CORE-565.N]]'s findings shape (numbered `F<n>` with an explicit "inline fix / heads-up / candidate" disposition each).

- [x] **Minimal refactor gate** — `N/A` — no code or contract edit lands; no fix was small-and-in-scope enough to apply inline (see F3 for the one wording observation deliberately left alone).

- [x] Implemented the minimal solution — the audit findings below; no file edits outside PLAN.md + this note.

- [x] Updated/added tests for non-trivial behavior — `N/A` — nothing changed; the existing 5 `[handoff]` parser tests from `.3` are the regression net and pass.

**Implementation Notes:**

- **Cohort inventoried** — four children, deliverables in Discovery §A; every Acceptance receipt of `.2` / `.3` / `.4` re-run green at HEAD (Drift check).
- **Coherence** — no inconsistencies surfaced (Discovery §B): `[handoff]` naming and semantics identical across nine surfaces; step 6 ↔ step 9 cross-refs reciprocal; VISION ↔ scope-boundaries mirror pair intact; `.4`'s rows cite anchors that exist.
- **Contract-fit re-run** — parity on the grammar, both trailing markers, the probes, the status set, the labels, the endings; every residual gap is an open CBN row (Discovery §C).
- **F1 — no scaffold residue.** The 565.N F1 class (stray `**Archived:** YYYY-MM-DD`) does not recur: each cohort archive carries exactly one stamp, no placeholder, no trailing whitespace. Unticked `## 🧩 Subtasks` in `.2` are exempt per `SPEC.md:577-581`.
- **F2 — heads-up, no flowtron filing: v5.28.0 is the gate for three caobunga rows.** `CBN-EPIC-188`, `CBN-191`, `CBN-193` cite `docs/EXTERNAL-AGENTS.md` step 9 / the `[handoff]` ratification / the plain-scalar rule "at v5.28.0", which is uncut; caobunga pins v5.27.0. `.4` recorded this as `/ft-release`'s job, not a PLAN row — confirmed. The audit's own next-move suggestion is that release.
- **F3 — wording observation, no action.** `docs/EXTERNAL-AGENTS.md:88` "Trailing bracket-token run" row reads "tolerated and dropped — `[unattended]` and `[handoff]` are the two canonical members"; `SPEC/plan-parser.md:27-28` says the same with an explicit "*except*". A reader could momentarily parse the two markers as members of the dropped set; the two rows immediately below say they parse into `Task` fields, so the table as a whole is unambiguous. Left as-is: it is a stable-surface row, `.3` chose the phrasing deliberately, and a taste edit to a declared surface is not worth the churn.
- **Deferred from `.3`, surfaced here as an optional candidate (not a miss):** a viz chip for `[handoff]` beside `UnattendedChip` (`.3` Discovery §E). Parser field exists; one-component follow-up if the operator wants the marker visible in the visualizer.
- **`/ft-file-followup` candidates:** none required. Optional: `FE-<next>` `handoff-chip` (the deferred viz chip above) — operator's call.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code changed; the cohort's regression net was run anyway: `npm --prefix viz test -- --run` → 29 files / 561 passed.

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 (nothing changed; run as the cohort's regression check).

- [x] **Verification receipt** — see Testing Notes; for changed code `N/A` — no code changed.

- [x] (frontend) Asked the user for visual confirmation — `N/A` — no rendered surface changed.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
npm --prefix viz test -- --run                                              → 0   (29 files, 561 passed)
npm --prefix viz run typecheck                                              → 0
npm --prefix viz run lint                                                   → 0
grep -q 'commits nothing' docs/EXTERNAL-AGENTS.md                           → 0
grep -q 'plain scalar' SPEC/blocked.md && … unattended-mode.md && … procedures/ft-task.md → 0
grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md templates --exclude=VERSION-HISTORY.md → 1 (no hits — pass)
grep -q '\[handoff\]' SPEC.md && grep -q 'model\] \[unattended\] \[handoff\]' SPEC.md → 0
grep -c '\[handoff\]' SPEC/plan-parser.md → 4 · docs/EXTERNAL-AGENTS.md → 3 · SPEC/unattended-candidacy.md → present
grep -q 'out-of-repo consumer' docs/VISION.md && … SPEC/scope-boundaries.md  → 0
grep -rn 'model\] \[unattended\] |' SPEC.md templates viz/src/parser.ts claude/skills/ft-task/SKILL.md → 1 (no stale mirrors — pass)
wc -c SPEC.md → 53,007 ≤ 57,000 · claude/skills/ft-task/SKILL.md → 28,291 ≤ 33,000 · SPEC/gates.md → 35,910 (unchanged)
cohort archive residue: **Archived:** ×1 each · YYYY-MM-DD → 0 · trailing whitespace → 0     (4 / 4 notes)
caobunga (read-only): submodule status → v5.27.0 · CBN-189/190 [x] 2026-09-14 · CBN-EPIC-188/191/192/193 [ ] · TASK_LINE slot-for-slot parity · reader captures unattended + handoff
judgment: contract-fit table (Discovery §C) — 11 / 11 rows fit or map to an open CBN row
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 / 18 walked, cumulative across the cohort; **no change** on every entry: `README.md` (`:106-116` names the orchestration contract without a step count; `:244-256` `--unattended` prose unaffected) · `AGENTS.md` (repo-layout + validation only) · `SPEC.md` (`.3`'s grammar edits landed and verified; `:208` `park-reason:` pointer still correct; `**Version:** v5.27.0` correct until `/ft-release`) · `docs/MIGRATION.md` (no grammar or caller claims) · `claude/AGENTS-snippet.md` (`:23` `--unattended` roster unchanged) · `codex/` / `cursor/` / `grok/AGENTS-snippet.md` (wiring only) · `docs/CONVENTIONS.md` (`:155` cites the two-project rule for adopter override shapes — the carve-out is caller-scoped, so the citation still holds) · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` (`:50` ledgers `unattended-mode.md` by path; the path did not move) · `docs/PLATFORMS.md` (flag tables carry no row-marker claims) · `claude/CAPABILITIES.md` (flag reference; no marker claims) · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` (`.2` step 9 + `.3` rows landed; re-verified against the real reader in Discovery §C) · `docs/WORKTREES.md` · `docs/VISION.md` (`.3` carve-out landed; mirror at `SPEC/scope-boundaries.md:52` agrees).

- [x] Closed — every Acceptance criterion ticked; YAML `status:` → `completed`; PLAN.md `.N` line flipped to stub form, kept nested under `CORE-EPIC-598` in `## High` (epic child placement invariant — the cohort moves only on the parent-flip confirm); tasknote moved to `.flowtron/tasknote/archive/core/`. No superseded-claim pointer: nothing in an archived note was falsified by the audit.

- [x] **Evidence-based recap** drafted — see Final Summary; surfaces at the 📦 ready-to-commit gate (parent-flip prompt bundled, per skill Step 9).

**Final Summary:**

Audited the `CORE-EPIC-598` (`flowtron-caobunga-concert`) cohort and found it coherent: every `.2` / `.3` receipt is green at HEAD, `[handoff]` reads identically across nine surfaces, the step 6 ↔ step 9 caller-write cross-refs are reciprocal, and re-running [[CORE-565.3]]'s contract-fit table against both readers shows parity on the grammar and both trailing markers, with every residual caobunga-side gap already a filed CBN row from `.4` — two of which (189 / 190) caobunga closed the same day. No inline fixes, no misses, no required follow-ups.

- **Changed:** `.flowtron/PLAN.md` (`.N` stub flip; parent flip + cohort move if confirmed at the 📦 gate), `.flowtron/tasknote/archive/core/CORE-598.N.md` (this note, scaffold → archive). No contract, doc, or code edits.
- **Verification:** viz 561 / 561, typecheck 0, lint 0; ten cohort grep receipts re-run → pass; adopter-ID grep → no hits; budgets unchanged; cohort archives residue-free; caobunga read-only cross-check → 11 / 11 contract-fit rows fit or map to an open CBN row (Discovery §C).
- **Refactors:** none.
- **Documentation:** 18 / 18 sweep entries no change (cumulative across the cohort).
- **`touches:` reconciliation:** omitted at Phase 1 (no file deliverable); `git diff --name-only` shows PLAN.md + this note only — both excluded by construction.
- **Findings:** F1 no scaffold residue · F2 heads-up — v5.28.0 (uncut Minor carrying `.2` + `.3`) gates `CBN-EPIC-188` / `191` / `193` on caobunga's side; `/ft-release` is the follow-through, no PLAN row · F3 wording observation on the "Trailing bracket-token run" stable row, deliberately left alone.
- **`/ft-file-followup` candidates:** none required. Optional, operator's call: the viz `[handoff]` chip `.3` deferred.
- **Parent-flip decision:** **Yes** at the 📦 gate — `CORE-EPIC-598` flipped to stub form and the six-row cohort moved atomically from `## High` to the top of `## Completed` in this commit; `## High` left bare (the file's convention for an empty section).
- **Maintainability effect:** the second pass over the concert closes with the boundary declared on both sides and the hand-off actually landed — the two failures the first pass left (an undeclared caller-write boundary; findings that never crossed the repo line) now have a contract anchor and a closure condition respectively, so a third pass has a checklist to re-run rather than an archaeology to redo.

**Archived:** 2026-09-14
