---
title: caobunga-contract-fit
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-565, CORE-565.1, CORE-565.2, CORE-494, CORE-551, CORE-533, CORE-473.6, CORE-470]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/EXTERNAL-AGENTS.md
  - SPEC/blocked.md
  - docs/AGENT-NEUTRALITY.md
  - .flowtron/tasknote/README.md
blocked-by:
  - CORE-565.2
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-565.3 | caobunga-contract-fit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-565]] [[CORE-565.1]] [[CORE-565.2]]

## 🎯 Goal

Verify the caller contract flowtron declares against what caobunga's reader and dispatcher actually consume (approved read-only paths), declare every surface a caller may rely on — and the ones it may not — in `docs/EXTERNAL-AGENTS.md`, resolve each known mismatch on flowtron's side or list it as a ready-to-paste CBN row in the Final Summary.

## ✅ Acceptance

- [x] `docs/EXTERNAL-AGENTS.md` carries a caller-facing stability list naming every surface a caller may rely on, each with its canonical owner, plus an explicit out-of-contract set — `grep -q '^## Stable surfaces' docs/EXTERNAL-AGENTS.md` → 0; completeness is `judgment` against Discovery Notes §E (10 rows + 5 out-of-contract entries cover every §A surface)
- [x] Capability-probe surfaces declared stable — `grep -q 'unattended-mode.md' docs/EXTERNAL-AGENTS.md`; the probed facts hold at HEAD: `test -f claude/skills/ft-task/unattended-mode.md` and `grep -c -- '--unattended' claude/skills/ft-task/SKILL.md claude/skills/ft-file-followup/SKILL.md` both ≥ 1
- [x] Stranded `in-progress` note: both caller paths (two-write `interrupted` conversion; prose continue against the note) named in EXTERNAL-AGENTS step 6, and `SPEC/blocked.md` §"Resuming an interrupted run" no longer calls the state a dead end — `grep -c 'dead end' SPEC/blocked.md` → 0; `grep -q 'Two caller paths' docs/EXTERNAL-AGENTS.md`
- [x] `**Suggested next task:**`, `### Follow-up…` headings, and unratified trailing tokens declared out-of-contract — `grep -q 'Suggested next task' docs/EXTERNAL-AGENTS.md`; `grep -q 'Follow-up' docs/EXTERNAL-AGENTS.md`
- [x] Closed-row set declared as `PLAN.md` `## Completed` **plus** `PLAN-ARCHIVE.md` after rotation — `grep -q 'PLAN-ARCHIVE' docs/EXTERNAL-AGENTS.md`
- [x] Template labels a caller may hook (`**Final Summary:**` / `**Archived:**` / `**Verdict:**`) declared, with the micro-template carve-out (no `**Final Summary:**`) — `grep -q 'Final Summary' docs/EXTERNAL-AGENTS.md`
- [x] Task-line grammar parity between `viz/src/parser.ts` and caobunga's `grammar.py` verified and recorded — `judgment` (Discovery Notes §D: in parity; one deliberate caller-side gap; no flowtron edit)
- [x] No adopter IDs or names in contract prose — `grep -ci 'caobunga\|CBN-' SPEC.md SPEC/blocked.md docs/EXTERNAL-AGENTS.md` → 0
- [x] Neutrality ledger carries a row for the `claude/` probe path now named by a `docs/` contract doc — `grep -q 'EXTERNAL-AGENTS' docs/AGENT-NEUTRALITY.md`
- [x] caobunga-side findings listed as ready-to-paste CBN rows in the Final Summary, numbered from caobunga's next free ID — `judgment` (three rows, CBN-148..150; max filed ID at read time was CBN-147)
- [x] Markdown hygiene — `git diff --check` → 0

## 🧩 Subtasks

- [ ] Phase 2: add `## Stable surfaces for callers` to `docs/EXTERNAL-AGENTS.md` (table: surface · what a caller may rely on · owner), plus an `Out of contract` list, placed after §"The Orchestration Contract" and before §"Not an Orchestration Runtime"
- [ ] Phase 2: widen step 6 in `docs/EXTERNAL-AGENTS.md` to name both caller paths for a stranded `in-progress` note
- [ ] Phase 2: soften the "dead end" sentence in `SPEC/blocked.md` §"Resuming an interrupted run" to name the prose-continue path as the other legal route
- [ ] Phase 2: add a `docs/AGENT-NEUTRALITY.md` ledger row for `docs/EXTERNAL-AGENTS.md` naming `claude/skills/ft-task/unattended-mode.md` as a probe surface
- [ ] Phase 2: refresh the `docs/EXTERNAL-AGENTS.md` one-liner in `.flowtron/tasknote/README.md` §"AI-referenced docs" if the new section changes its purpose statement
- [ ] Phase 3: run the Acceptance greps; `git diff --check`; re-read the new section against Discovery Notes §E for completeness
- [ ] Phase 4: doc-drift sweep (18 entries), Acceptance tick-through, CBN rows in Final Summary, stub flip nested under the epic, archive

## 🔗 Related

- [[CORE-EPIC-565]] — parent epic (harness-value-review)
- [[CORE-565.1]] — Discovery: Constitution #3/#4, Q1 (flowtron declares, caobunga adapts), Q3 (CBN rows in Final Summary), Q5 (caobunga read scope) bind this child; Drift check §C seeds the five mismatches
- [[CORE-565.2]] — blocked-by: Sequential predecessor (Fan-out); fixed `step-3c` to clear `park-reason:` on resume; filed [[CORE-567]] (`park-reason:` table home) after this task
- [[CORE-473.6]] — depends-on: the layering decision — `docs/EXTERNAL-AGENTS.md` is the *convention* layer that names canonical owners in `SPEC/` and never copies them
- [[CORE-494]] — `[unattended]` marker upstreamed from caobunga's reference reader; deny-by-default; "adopter reader is the consumer" stance
- [[CORE-470]] — related-decision: consumers of the closed-row set read `PLAN.md` **and** `PLAN-ARCHIVE.md`; a missing archive is empty, never an error
- [[CORE-551]] — unattended filing authority; assumed caobunga's need because the path was unapproved
- [[CORE-533]] — adopter IDs stay out of SPEC prose; `docs/CONVENTIONS.md` §"Verify behavioral claims…" applies in both directions

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The five `.1` seeds reproduce at HEAD in caobunga's source (line numbers unchanged) and caobunga's own `docs/CONTRACT.md` — approved this session for the first time — confirms it treats four of them as *its* contract surface while flowtron declares none of them. The PLAN line's scope (declare probes stable; resolve continue-vs-`interrupted`, the two unspecified tokens, PLAN-ARCHIVE blocker resolution, the four reader hooks, grammar parity; CBN rows for the rest) matches exactly what the read surfaced. No re-scope.

- [x] Read relevant source files — flowtron: `SPEC.md`, `SPEC/epic.md`, `SPEC/blocked.md`, `SPEC/plan-parser.md`, `SPEC/gates.md` §"`--unattended` operator posture", `SPEC/tasknote-selection.md` §"`## Completed` rotation" + §archive convention, `claude/skills/ft-task/unattended-mode.md`, `viz/src/parser.ts` TASK_LINE block, `docs/EXTERNAL-AGENTS.md`, `docs/CONVENTIONS.md` §"Verify behavioral claims…", `docs/AGENT-NEUTRALITY.md` ledger shape, `docs/PLATFORMS.md` posture rows, templates (full + micro), tasknote README. caobunga (operator-approved, read-only, one `ls` level then named files): `backend/caobunga/flowtron/{layout,grammar,selection,tasknote,reader}.py`, `loop.py`, `close.py`, greps over `dto.py` / `brief.py`; `.flowtron/PLAN.md` (header, open rows, max ID); `docs/CONTRACT.md` §"Flowtron reader" → §"Unattended capability probe", §"Continue prompt", §"Follow-up capture" → §"Park reason", §"Fleet boundary", header. Archive skim via one read-only probe (§C).

- [x] **Best Practices Review** — `N/A`: markdown contract + one caller-facing doc. The one boundary in play is [[CORE-473.6]]'s layering — EXTERNAL-AGENTS names owners in `SPEC/` and never restates them — and the new section is written to that rule (every row cites its owner; no code table is copied).

- [x] **Archive skim** — probe over `archive/core/` (170+ hits on the paths in scope); load-bearing subset in §C. `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`).

- [x] **Drift check** — §D. Every `.1`-cited caobunga line resolves at HEAD; the one `.1` assumption that has moved is Q5's "CONTRACT.md not approved" (approved now). No SPEC contract is contradicted by declaring surfaces that already exist; the plan diverges from nothing on the PLAN line.

- [x] Asked clarifying questions — one (per-session path approval for the three caobunga paths, AskUserQuestion): **all three approved**, read-only, one `ls` level then named files. Assumptions carried: (1) "flowtron declares" (Q1) means a surface is either *declared stable*, *declared out-of-contract*, or *specified upstream* only where it shows value in flowtron's own terms — nothing is specified merely because caobunga reads it; (2) the stability list lives in `docs/EXTERNAL-AGENTS.md` (the `.1` spec's named home) as a section, not a new file; (3) no template edit — the labels are declared as they ship, and [[CORE-568]]'s pending blockquote change does not touch them; (4) `SPEC/blocked.md` may take a one-sentence factual correction (its "dead end" claim is false against a caller that exists) without re-opening the resume contract.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (four paths; `.flowtron/PLAN.md` excluded by construction)

**Discovery Notes:**

**Bar (Constitution #3):** the contract caobunga reads must be *complete, stable, verified against its actual reader and dispatcher, and no larger than caobunga needs*. Completeness and stability are judged from flowtron's side (what a caller may rely on); "no larger than needed" is judged by refusing to specify anything caobunga reads that flowtron never writes.

### A. What caobunga actually consumes (verified in source, HEAD 2026-09-10)

| Surface | Where caobunga reads it | Flowtron owner today | Declared? |
|---|---|---|---|
| Task-line grammar (`TASK_LINE`, `TASK_ID_BODY`, `Blocked by [[ID]]`, `[[ID]]`) | `grammar.py:44-93`, `parse_blocked_by` :135 — a port of `viz/src/parser.ts`, pinned per bump (`CONTRACT` §"Parse contract") | `SPEC.md` §"Task-line format", `SPEC/plan-parser.md`, `viz/src/parser.ts` | yes (SPEC) — not on the caller doc |
| `[unattended]` marker, deny-by-default | `selection.py:353-355`; `reader.py:102` | `SPEC.md` §"Task-line format"; EXTERNAL-AGENTS step 2 | yes |
| Trailing bracket-token run as a place to read *its own* tokens (`[handoff]`, `grammar.py:34`; `selection.py:348`) | `reader.py:92` `EXTRA_TOKEN.findall` | `SPEC/plan-parser.md` (tolerated-and-dropped) | tolerance documented; never stated as a surface a caller may rely on |
| `Blocked by [[ID]]` resolved against checked `PLAN.md` rows only | `selection.py:52-54`, `:212-237` | `SPEC/blocked.md`; rotation in `SPEC/tasknote-selection.md` §rotation | rotation unmentioned on the caller doc |
| Tasknote frontmatter `status:` (open set = SPEC's five minus `completed`, `tasknote.py:22`) and `park-reason:` split on first ` — ` (`reader.py:36-52`) | `tasknote.py`, `reader.py` | `SPEC.md` §"Tasknote frontmatter" | yes (steps 4-5) |
| Capability probes: `.flowtron/core/claude/skills/ft-task/unattended-mode.md` present **and** `--unattended` in `ft-task/SKILL.md` (`layout.py:35-59`); `--unattended` in `ft-file-followup/SKILL.md` (`:62-86`) | `loop.py:626,634` | nothing — a `claude/` fragment path, not named by any contract doc | **no** |
| Continue prompt for a stranded `in-progress` note — prose, "do not re-invoke /ft-task", points at `unattended-mode.md` by path (`loop.py:162-167, 232-238`); caobunga **never** writes `interrupted` (`CONTRACT` §"Continue prompt": its loop refuses to launch a `blocked` note, so the write would stop the run it meant to resume) | `loop.py` | `SPEC/blocked.md` §"Resuming an interrupted run" (two-write path as the only path; calls the state "a dead end" for an operator-less caller); EXTERNAL-AGENTS step 6 | the path caobunga takes is *not* the one declared |
| `**Suggested next task:** **ID**` — read as `suggested_next`, "not the selector", validated under a drain (`grammar.py:66`, `close.py:357-386`) | `reader.py:230` | nothing — flowtron writes this line nowhere (`grep` over SPEC/, claude/, templates/, docs/ → 0); it is caobunga's own PLAN header convention (`caobunga/.flowtron/PLAN.md:13`) | **no** |
| `**Final Summary:**` … `**Archived:**` lede (`close.py:25-28`, `brief.py:32`); `**Verdict:** De-scope` → `de-scoped` outcome (`:29`); `### Follow-up…` list items (`:37`, prefix family, CONTRACT says flowtron defines no such heading) | `close.py` | template labels (`templates/tasknote-template.md`); no follow-up heading anywhere in flowtron | **no** |
| Three endings as filesystem facts: `[x]` + HEAD moved; `archive/*/<ID>.md`; open note `status: blocked` | `close.py:274-354` | EXTERNAL-AGENTS §"The Return" | yes |
| `.flowtron/sidequest/` path (never read; presence classification only) | `layout.py:19` | `SPEC/layout.md` | yes |

Not consumed by caobunga (so nothing to declare for it): the `⏸ --unattended stop — <cause>:` / `⏸ --unattended park — …` markers (caobunga classifies from the worker status + repo, never the transcript); `unattended-close-epic.md` (it never invokes `/ft-close-epic`); YAML `blocked-by:` (deliberately not a gate, `grammar.py:143-146`); the 📦/🛠️ cue vocabulary.

### B. Archive skim — load-bearing decisions (probe return)

- [[CORE-473.6]] (`:87`, `:224`, `:228`) — **layering**: EXTERNAL-AGENTS = convention layer; `SPEC/*` = contract layer; `docs/PLATFORMS.md` = wiring. Its numbered rules each *name a canonical owner* and never copy — rule 3 states the `<code> — <prose>` shape and closed-set property without copying the codes (`:132`). The new section follows the same rule.
- [[CORE-494]] (`:99`, `:91`, `:71`, `:143`) — `Task.unattended` is "a deliberate contract surface with an out-of-repo consumer"; `parser.ts` is the canonical grammar reference; flowtron states *flowtron's* behavior (`parsePlanWithDiagnostics().unparsed`), never caobunga's reader's.
- [[CORE-533]] (`:51`) + [[CORE-534]] — adopter IDs stay out of contract prose; verify behavioral claims against `parser.ts`.
- [[CORE-495]] (`:49`, `:134`, `:174`) + [[CORE-536]] (`:294`) — marker + deny-by-default is a rule of the orchestration contract; codes are a closed set extended only by adding a row; the marker implies `--fast`, never the posture.
- [[CORE-535.5]] (`:295`) — `SPEC.md` owns the `park-reason:` code set; `gates.md` owns gate→behavior; the duplicate table was deleted. ([[CORE-567]] may move the table; the caller doc cites the section by name, so a move carries the pointer.)
- [[CORE-473.5]] (`:30`, `:98`, `:154`, `:177`) + [[CORE-473.6]] (`:84`) — `interrupted` is the one code **a caller** writes; flowtron ships no crash detector.
- [[CORE-467]] / [[CORE-470]] (`:25`) / `docs/MIGRATION.md:285` — rotation to `PLAN-ARCHIVE.md` is adopter-general (MIGRATION tells adopters it "appears later"); consumers read both files, missing archive = empty. No prior decision links rotation to blocker resolution.
- [[CORE-527]] → [[CORE-533]] — blocker-clause handling narrowed to one sentence in `SPEC/blocked.md` (clause removal clears the gate).
- [[CORE-502]] — glyph-then-marker footgun; caobunga's `seeded_line` and `unparsed_plan_rows` are built around it and its CBN-127 declined the before-tokens glyph slot deliberately.
- [[CORE-551]] (`:254`) / [[CORE-552]] — EXTERNAL-AGENTS step 1's roster + step 8; `/ft-epic-discovery` refuses the flag terminally.
- No prior decision anywhere on `**Suggested next task:**`, `[handoff]`, or `### Follow-up` (the only hits are `.1` and CORE-208.2's post-closure UX text).

### C. Archive skim — what it changes here

Nothing in the archive contradicts declaring the surfaces above; [[CORE-473.6]] fixes the *shape* (owner-naming rows, no copies) and [[CORE-533]] the *voice* (no adopter names in the doc). The one thing the archive does not settle — and this task must — is whether the `claude/` probe path may be named by a `docs/` contract doc: it may, as a **ledgered** Claude-specific surface (`docs/AGENT-NEUTRALITY.md`), the same way `SPEC/procedures/ft-task.md` names `step-4-debug-mode.md` as a derivation anchor.

### D. Drift check

- `.1` seeds vs HEAD: `layout.py` probes at `:35-59` (`supports_unattended`) and `:62-86` (`supports_unattended_filing`, added CBN-138.2 — a *second* probe `.1` did not list); `loop.py:203-240` continue prompt ✓; `grammar.py:34` `HANDOFF_MARKER`, `:66` `SUGGESTED_NEXT` ✓; `selection.py:52` `completed_task_ids` ✓; `close.py:25-37` hooks ✓; `tasknote.py:22` `OPEN_STATUSES` ✓ (in sync with SPEC's set).
- **Grammar parity** (`viz/src/parser.ts:116-140` vs `grammar.py:81-93`): `TASK_ID_BODY` byte-identical; fragment order identical *except* caobunga omits the before-tokens `SUGGESTION_GLYPH` slot (flowtron [[CORE-502]] / caobunga CBN-127 — a deliberate, reported gap surfaced through `unparsed_plan_rows`). `BLOCKED_BY_BLOCK` / `WIKILINK` / `CODE_SPAN` are ports. **No flowtron-side drift; nothing to change.** caobunga pins v5.26.0, which is HEAD's `SPEC.md` version.
- Template labels: full template ships `**Verdict:** Proceed | Re-scope | De-scope` (placeholder does not match `\*\*Verdict:\*\*\s*De-scope` — first token is `Proceed`), `**Final Summary:**`, `**Archived:**`. **Micro template ships `## ✅ Recap` + `**Archived:**` and no `**Final Summary:**`** — a micro closure's `summary` in caobunga falls back to the PLAN stub. Caller-visible fact; declare it.
- `SPEC/blocked.md:94-97` claims an operator-less caller "has neither the session nor a flag, so the state is a dead end" — **false against the caller that exists**: caobunga points a fresh worker at the note with a prose continue, and the tasknote (not the session) carries the context. The runner's own recommendation ("continue conversationally") is that path. One-sentence correction, no contract change.
- Cross-artifact: EXTERNAL-AGENTS step 6 declares only the two-write path — narrower than what `/ft-task` itself recommends and than what the caller does. Widening to name both is declaration, not new mechanism.
- Adopter names: `docs/EXTERNAL-AGENTS.md`, `SPEC.md`, `SPEC/blocked.md` carry none today (grep → 0); the edit keeps it so.

### E. Resolution table — what flowtron declares (Q1: declare and list; specify upstream only on shown value)

| # | Mismatch (from `.1`) | Verdict | Flowtron-side action | caobunga-side (→ CBN row) |
|---|---|---|---|---|
| 1 | Capability probes keyed on `claude/skills/ft-task/unattended-mode.md` + `--unattended` token in two `SKILL.md` bodies — undeclared | **Declare stable** | Stability list row: the fragment's path/name and the literal token in those two bodies are the probe surface; a rename or move is a versioned change. Ledger row in `docs/AGENT-NEUTRALITY.md` | none |
| 2 | `in-progress` continue prompt vs step 6's `interrupted` (caobunga writes none) | **Declare both paths legal** | Step 6 names two caller paths: (a) two-write conversion + re-invoke; (b) prose continue pointing an agent at the note, posture carried in prose. Flowtron performs neither. Fix the "dead end" sentence in `SPEC/blocked.md` | CBN: cite the declaration in `CONTRACT` §"Continue prompt" after the next flowtron release; wording only |
| 3 | `[handoff]` token — parsed, never specified | **Out of contract** (VISION two-project precedent; caobunga's own CBN-137 reached the same verdict) | Stability list: the trailing-token run is tolerated-and-dropped; a caller may read its own lowercase tokens there and flowtron never fails a row on one or assigns it meaning. No `[handoff]` mention | CBN: `grammar.py:25,33` comments say "flowtron formalizes the grammar later" / "filed upstream separately" — stale (v5.22.0 formalized `[unattended]`; CBN-137 de-scoped `[handoff]`) |
| 4 | `**Suggested next task:** **ID**` — parsed, never specified | **Out of contract** — flowtron writes this line nowhere; it is an adopter's own PLAN header | Stability list "out of contract" entry names it | CBN: `CONTRACT:896` "prose flowtron wrote" and `close.py:364` "flowtron has no notion of the `[unattended]` marker" are both false — flowtron never writes the line and has captured the marker since v5.22.0. Wording only; behavior (`dispatchable` validation) is already right |
| 5 | `Blocked by` resolved against `PLAN.md` only; rotation to `PLAN-ARCHIVE.md` unread | **Declare** the closed-row set as both files | Stability list row: closed rows live in `PLAN.md` `## Completed` and, after rotation, `PLAN-ARCHIVE.md`; a caller resolving an ID against completion reads both ([[CORE-470]] precedent) | CBN: `completed_task_ids` reads `PLAN.md` only, so a blocker rotated to `PLAN-ARCHIVE.md` loses the `(completed; clause is stale, remove it)` annotation and reads as unconfirmed. Deny outcome unchanged (clause removal clears the gate either way); annotation only. `marker_drift` is already scoped to survive rotation |
| 6 | Reader hooks: `**Final Summary:**` / `**Archived:**` / `**Verdict:** De-scope` / `### Follow-up…` / frontmatter keys | **Declare** the three template labels stable (with the micro carve-out); **out of contract** for `### Follow-up…` (flowtron files follow-ups as PLAN rows — §"Deferred hand-off filing" — and defines no heading; a caller may ask *its own* worker for one); frontmatter keys already declared | Stability list rows | none — `CONTRACT` §"Follow-up capture" already records the heading as caobunga-originated |
| 7 | Grammar parity with `viz/src/parser.ts` | **Verified, in parity** (one deliberate gap on caobunga's side) | Stability list row naming `parser.ts` as the canonical grammar reference and `SPEC/plan-parser.md` as the tolerance list | none |

Also declared, because a caller already relies on them and no row said so: the `[unattended]` marker survives the Phase 4 stub rewrite (closure copies the trailing token run verbatim — `SPEC/tasknote-selection.md` §archive convention); the archive folder is per the project's README table, so `archive/*/<ID>.md` is the portable glob; the `⏸ --unattended …` markers are transcript prose, **not** a surface.

**Not done, on purpose:** no `[handoff]` or `**Suggested next task:**` specification upstream (no shown value in flowtron's terms; VISION precedent); no template edit; no `park-reason:` relocation ([[CORE-567]]); no edit to caobunga.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-473.6]]'s shape for `docs/EXTERNAL-AGENTS.md`: owner-naming rows that copy nothing (the `park-reason:` row states the split rule and points at the code table, as step 4 already does). The ledger row follows the `SPEC/procedures/ft-task.md` precedent (a wiring-layer path named from the contract layer as a derivation anchor). No new shape.

- [x] **Minimal refactor gate** — no refactor. Three prose edits, each a declaration of something that already exists; the one correction (`SPEC/blocked.md` "dead end") is a single sentence and leaves the two-write contract intact.

- [x] Implemented the minimal solution — 4 files, +36/−7 lines

- [x] Updated/added tests for non-trivial behavior — N/A (markdown; no code surface)

**Implementation Notes:**

**`docs/EXTERNAL-AGENTS.md` (+27/−2, 15,299 → 20,603 chars; unbudgeted, lazy-loaded, swept).** New §"Stable surfaces for callers" between the orchestration contract and the runtime boundary: a ten-row table (task-line grammar · trailing token run · `[unattended]` · `Blocked by` · closed-row set incl. `PLAN-ARCHIVE.md` · `status:` + location · `park-reason:` · template labels with the micro carve-out · capability probes · the three endings) plus a five-item **Out of contract** list (`**Suggested next task:**`, `### Follow-up…`, other trailing tokens, YAML `blocked-by:` as a gate, the `⏸` markers). Step 6 retitled "Annotate *or continue*" and now names **two caller paths** — the two-write conversion and the prose continue — with flowtron performing neither. The bridge sentence before the runtime section gained a forward pointer so the new section reads as the positive half of the boundary.

**`SPEC/blocked.md` (+6/−4).** §"Resuming an interrupted run": the "dead end" sentence replaced by one that names the prose-continue route (the runner's own recommendation, executed by a new session) as the alternative to the conversion below. The conversion paragraph and "Flowtron performs neither write" are untouched — `interrupted` stays the one code a caller writes.

**`docs/AGENT-NEUTRALITY.md` (+1).** Ledger row for the Capability-probes row: the three `claude/` paths are a stable *probe surface*; the posture they prove stays SPEC-owned.

**`.flowtron/tasknote/README.md` (+1/−1).** The EXTERNAL-AGENTS one-liner now names the stable-surface list and widens its drift triggers to template labels and the task-line grammar.

**Not done, on purpose:** no `[handoff]` / `**Suggested next task:**` specification upstream (declared out of contract — VISION two-project precedent; no value in flowtron's terms); no template edit; no `park-reason:` relocation ([[CORE-567]], sequenced after this task — its move carries EXTERNAL-AGENTS step 4's and the new row's by-name pointer); no caobunga edit (CBN rows in the Final Summary). Downstream-impact scan: the only active PLAN entries are the 565 cohort and [[CORE-566]]–[[CORE-569]]; none plans an edit to the three files touched except [[CORE-567]], which is already ordered after `.3`. **No downstream impact; no reconcile edit.**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; `viz/` and `tools/` untouched)

- [x] Ran lint/type-check on changed code — N/A; substituted `git diff --check` and the Acceptance greps below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
grep -q '^## Stable surfaces' docs/EXTERNAL-AGENTS.md                         → 0
grep -q 'unattended-mode.md' docs/EXTERNAL-AGENTS.md                           → 0
test -f claude/skills/ft-task/unattended-mode.md                               → 0
grep -c -- '--unattended' claude/skills/ft-task/SKILL.md                        → 12
grep -c -- '--unattended' claude/skills/ft-file-followup/SKILL.md               → 16
grep -c 'dead end' SPEC/blocked.md                                             → 0 hits
grep -q 'Two caller paths' docs/EXTERNAL-AGENTS.md                             → 0
grep -q 'Suggested next task' docs/EXTERNAL-AGENTS.md                          → 0
grep -q 'Follow-up' docs/EXTERNAL-AGENTS.md                                    → 0
grep -q 'PLAN-ARCHIVE' docs/EXTERNAL-AGENTS.md                                 → 0
grep -q 'Final Summary' docs/EXTERNAL-AGENTS.md                                → 0
grep -ci 'caobunga\|CBN-' SPEC.md SPEC/blocked.md docs/EXTERNAL-AGENTS.md      → 0 / 0 / 0
grep -q 'EXTERNAL-AGENTS' docs/AGENT-NEUTRALITY.md                             → 0
git diff --check                                                               → 0
grep -c '^## The Return\|^## Not an Orchestration Runtime' docs/EXTERNAL-AGENTS.md → 2 (both in-doc anchors used by the new section resolve)
git diff | grep -cE 'API_KEY|SECRET|TOKEN|PASSWORD'                            → 0 (keyword clause clear)
```

Grammar parity (judgment, recorded in Discovery §D): `TASK_ID_BODY` byte-identical; fragment order identical except caobunga's deliberately omitted before-tokens glyph slot. No flowtron drift.

**Structural assertions (changed prose):** no duplication — every table row names an owner and states one fact; the `park-reason:` row and step 6 point at the code table and `SPEC/blocked.md` rather than copying either. No dead prose: the bridge sentence before the runtime section still names both halves. Public-surface growth is the deliverable (a declared stability list) and is bounded to what a verified caller consumes — nothing caobunga does not read was declared. No stale code-facing docs: the ledger row registers the one new `claude/` reference; `docs/PLATFORMS.md`'s posture rows already describe `unattended-mode.md` as the shared fragment and need no edit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` no change (its EXTERNAL-AGENTS descriptor lists the doc's topics at summary level; the orchestration-contract phrase still covers the new section) · `AGENTS.md` no change · `SPEC.md` no change (its `interrupted` row already says "the one code a *caller* writes"; nothing there claims the conversion is the only path) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (§"Verify behavioral claims…" was applied, not amended) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` **deliverable** (one ledger row) · `docs/PLATFORMS.md` no change (posture rows already name the shared fragment; the probe row cites PLATFORMS as owner of per-agent availability) · `claude/CAPABILITIES.md` no change (no version bump; its `--park`/`--unattended` row is unaffected) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` **deliverable** · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (the two-project precedent was applied to `[handoff]`, not amended) — **18 / 18**, two deliverables. Also refreshed: the sweep list's own EXTERNAL-AGENTS one-liner in `.flowtron/tasknote/README.md`.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Verified flowtron's caller contract against the one out-of-repo reader and dispatcher that exists, and found the contract *behaviorally* in sync and *declaratively* short: every surface caobunga hooks parses correctly against HEAD (task-line grammar in parity with `viz/src/parser.ts`, `status:` open set in sync, `park-reason:` split as specified), but four of the surfaces it treats as its own contract — the `claude/` capability-probe paths, the template labels, the closed-row set after rotation, and the prose-continue route for a stranded note — were named by no flowtron doc, and two things it reads (`**Suggested next task:**`, `### Follow-up…`) flowtron never writes. `docs/EXTERNAL-AGENTS.md` now carries §"Stable surfaces for callers": ten owner-naming rows a caller may hook and a five-item out-of-contract list, sized to what a verified caller consumes and no larger. Step 6 declares both caller paths for a stranded `in-progress` note, and `SPEC/blocked.md` no longer calls that state a dead end — a claim the caller's practice already falsified. The one `claude/` path now named from the contract layer is ledgered in `docs/AGENT-NEUTRALITY.md`.

Verdicts per `.1` seed: probes **declared stable**; continue-vs-`interrupted` **both declared legal** (flowtron performs neither); `[handoff]` and `**Suggested next task:**` **out of contract** (VISION two-project precedent; flowtron writes neither); `PLAN-ARCHIVE.md` **declared** part of the closed-row set (adopter-general per `docs/MIGRATION.md`); the four reader hooks **declared** for the three template labels (with the micro-template carve-out — no `**Final Summary:**` there) and **out of contract** for the follow-up heading; grammar parity **verified**, no edit. Nothing was specified upstream merely because a caller reads it.

**caobunga-side findings — ready-to-paste CBN rows** (next free ID at read time: CBN-148; paste under `## Low` from caobunga's own session, per `.1` Q3):

```markdown
- [ ] **CBN-148** [light] | contract-provenance-refresh — Three stale claims about flowtron, wording only: `docs/CONTRACT.md` §"Flowtron reader" and `close._next_after` call `**Suggested next task:**` "prose flowtron wrote" (flowtron writes it nowhere — it is this repo's own PLAN header, and the flowtron release carrying `CORE-565.3` lists it out-of-contract in `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers"); `close.py` says "flowtron has no notion of the `[unattended]` marker" (captured since v5.22.0); `grammar.py`'s `UNATTENDED_MARKER` / `HANDOFF_MARKER` comments say "flowtron formalizes the grammar later" / "filed upstream separately" (done at v5.22.0; CBN-137 de-scoped the second). No behavior change.
- [ ] **CBN-149** [light] | blocker-resolution-plan-archive — `selection.completed_task_ids` resolves `Blocked by [[ID]]` against `PLAN.md` only; flowtron's `## Completed` rotation moves checked rows verbatim to `.flowtron/PLAN-ARCHIVE.md` (adopter-general, `docs/MIGRATION.md`), and the release carrying `CORE-565.3` declares the closed-row set as both files. A rotated blocker still denies (clause removal clears the gate) but loses the `(completed; clause is stale, remove it)` annotation and reads as unconfirmed. Read both files, or record the gap in CONTRACT §"Flowtron reader"; `marker_drift` already survives rotation.
- [ ] **CBN-150** [light] | continue-prompt-upstream-cite — The flowtron release carrying `CORE-565.3` declares the prose-continue path for a stranded `in-progress` note contract-legal (`docs/EXTERNAL-AGENTS.md` step 6 "Two caller paths"; `SPEC/blocked.md` §"Resuming an interrupted run" no longer calls it a dead end). Update CONTRACT §"Continue prompt" to cite the declaration instead of explaining the deviation. Blocked by the `.flowtron/core` pin bump that carries it.
```

**Hand-off to `.N`:** the three verdict tables (`.2` §B keep/trim, this §E declare/out-of-contract, `.4`'s roster) use one bar — value to the solo reviewer / no larger than the caller needs; no `.3` declaration cites a section `.2` trimmed (all nine `.2` trims were narrative; every owner named here is a rule sentence that survived). [[CORE-567]] may move the `park-reason:` table — step 4 and the new row cite it by section name, so the pointer moves with it.

**Evidence.** 4 deliverable files: `docs/EXTERNAL-AGENTS.md` +27/−2, `SPEC/blocked.md` +6/−4, `docs/AGENT-NEUTRALITY.md` +1, `.flowtron/tasknote/README.md` +1/−1; plus `.flowtron/PLAN.md` (stub flip) and this tasknote. Verification in Testing Notes: 11/11 Acceptance commands green, 18/18 doc-drift entries walked (2 deliverables), `git diff --check` clean, keyword clause clear, no adopter names in contract prose. `touches:` reconciliation: declared 4 paths; `git diff --name-only` shows exactly those 4 (PLAN.md and this note excluded by construction) — **no undeclared paths**. Maintainability effect: a caller now has one place that says what it may hook and what it may not, each row pointing at the section that owns it, so the next flowtron release can check its own edits against a declared list instead of discovering a downstream break; the one behavioral mismatch (the "dead end" claim) is corrected at its source.

**Archived:** 2026-09-10
