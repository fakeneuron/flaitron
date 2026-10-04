---
title: wiring-and-doc-sync
status: completed
tags: []
created: 2026-08-06
due:
related-tasks: [CORE-EPIC-408, CORE-408.1, CORE-408.2, CORE-408.3, CORE-224.3, CORE-154.2]
---

# CORE-408.4 | wiring-and-doc-sync

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-408]]

## 🎯 Goal

Land the platform-wiring and ledger tail of `CORE-EPIC-408`: a sub-agent capability-trigger row in `claude/CAPABILITIES.md`, its non-Claude approximations in `docs/PLATFORMS.md`, a contract-layer `docs/AGENT-NEUTRALITY.md` row for the delegation-guidance section, GLOSSARY entries for the epic's new vocabulary, and a decision on the `docs/EXTERNAL-AGENTS.md` AI-referenced-docs ledger gap.

## ✅ Acceptance

- [x] `claude/CAPABILITIES.md` §"The triggers" carries a **Sub-agent / isolated exploration** row in the fixed four-column shape (*what it is · syntax · what it controls in flowtron · when to reach for it*), naming the Claude Code sub-agent primitive as the probe/delegate spawn mechanism
- [x] `claude/CAPABILITIES.md` §"Agent-neutrality cross-check" stale "five triggers" claim corrected against the real row count, with a coverage bullet for the new row (Q3) — corrected by *replacing* the blanket claim with a per-trigger list rather than incrementing it; see Design decisions for why "nine" would have been newly false
- [x] `docs/PLATFORMS.md` §"Non-Claude capability triggers" gains a matching isolated-exploration row in **both** non-stub tables (Grok Build, Codex CLI); the four stub sections stay stubs
- [x] `docs/AGENT-NEUTRALITY.md` §"Intentional Claude-specific surfaces" gains a row for `README.md` §"Agent memory" + §"Sessions, loops, and sub-agents" — three unledgered Claude references in the section this epic extended (Q2)
- [x] `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger" `claude/CAPABILITIES.md` bullet's stale five-trigger enumeration refreshed to cover the sub-agent trigger
- [x] `docs/GLOSSARY.md` carries three new alphabetized entries — **probe**, **delegate**, **Handoff (🔄)** — with the maintenance footer's count + last-update line refreshed (Q4: three, not four; "sub-agent" stays defined in place)
- [x] `.flowtron/tasknote/README.md` §"AI-referenced docs" gains `docs/EXTERNAL-AGENTS.md` **and** `docs/WORKTREES.md`, closing [[CORE-408.1]] Drift #3 (Q1)
- [x] No new skill, symlink fan-out, runner, or mandatory field ([[CORE-408.1]] Q4; [[CORE-328.1]] won't-file) — zero files added; `git diff --stat` shows 5 files edited, all documentation
- [x] Phase 4 doc-drift sweep across the AI-referenced-docs ledger (14 entries after this task's own edit)

## 🧩 Subtasks

- [x] Add the sub-agent trigger row to `claude/CAPABILITIES.md` §"The triggers"
- [x] Correct §"Agent-neutrality cross-check" (row count + coverage bullet for the new row)
- [x] Add the matching isolated-exploration rows to `docs/PLATFORMS.md` Grok Build + Codex CLI trigger tables
- [x] Add the `README.md` delegation-guidance row to the `docs/AGENT-NEUTRALITY.md` ledger table
- [x] Refresh the `claude/CAPABILITIES.md` bullet in §"Out of scope for this ledger"
- [x] Write the three `docs/GLOSSARY.md` entries in alphabetical position + refresh the maintenance footer
- [x] Add `docs/EXTERNAL-AGENTS.md` + `docs/WORKTREES.md` to `.flowtron/tasknote/README.md` §"AI-referenced docs"
- [x] Phase 3: markdown mental-pass, table-shape parity, link-target resolution, trailing-whitespace checks; `npm --prefix viz test` release-gate sanity
- [x] Phase 4: doc-drift sweep (now 14 entries) + flip `.4` PLAN line to stub form nested under the active parent + archive tasknote

## 🔗 Related

- [[CORE-EPIC-408]] — parent epic
- [[CORE-408.1]] — Discovery; Drift #3 (ledger gap) and Drift #4 (no CAPABILITIES sub-agent row) are this task's two filed surfaces
- [[CORE-408.2]] — landed the probe/delegate vocabulary this task glosses and wires
- [[CORE-408.3]] — landed the `## 🔄 Handoff` section this task glosses
- [[CORE-224.3]] — authored `claude/CAPABILITIES.md`, its fixed four-column trigger shape, and the §"Agent-neutrality cross-check" this task corrects
- [[CORE-154.2]] — authored the `docs/AGENT-NEUTRALITY.md` ledger this task adds a row to

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The last implementation child of `CORE-EPIC-408`, scoped by [[CORE-408.1]] and re-verified at HEAD. Both filed surfaces are still exactly as Discovery described: `claude/CAPABILITIES.md` has no sub-agent row, and `docs/EXTERNAL-AGENTS.md` is still absent from the AI-referenced-docs ledger despite being edited by *both* [[CORE-408.2]] and [[CORE-408.3]]. Deliverables are table rows and glossary lines — no runner, no skill, no mandatory field — clearing [[CORE-328.1]]'s won't-file.

- [x] Read relevant source files — `claude/CAPABILITIES.md` (full), `docs/PLATFORMS.md` (full), `docs/AGENT-NEUTRALITY.md` (full), `docs/GLOSSARY.md` (full), `docs/EXTERNAL-AGENTS.md` (full), `docs/AGENT-COMPAT.md` (§Scope + matrix + reading-the-cells), `README.md` §"Agent memory" + §"Sessions, loops, and sub-agents" + §"Repo layout", `SPEC.md` (§"Working in the flowtron repo itself", §"📝 Phase 1: Discovery", §"Tasknote body shape"), `SPEC/epic.md`, `templates/subagent-probe-template.md`, `templates/tasknote-README.md`, `.flowtron/tasknote/README.md`, `.flowtron/PLAN.md`. Archives: `CORE-408.1`, `CORE-408.2`, `CORE-408.3`. No probe spawned — the read set was fully enumerated by [[CORE-408.1]]'s design-surface table and is narrow enough that briefing a probe would cost more than reading it.

- [x] **Best Practices Review** — `N/A`. Documentation tables and glossary prose; no code module, dependency direction, or abstraction boundary in scope. The one structural judgment — whether the epic earns a contract-layer ledger row — is recorded as Q2 below.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/` for `CAPABILITIES`, `AGENT-NEUTRALITY`, `GLOSSARY`, and `AI-referenced docs`. Load-bearing findings:
  - **[[CORE-224.3]] (decisive for the row shape).** Authored `claude/CAPABILITIES.md` including the fixed four-column pattern note that explicitly declares itself portable ("nothing about it is Claude-coupled except the cell contents") and directs non-Claude agents to reuse it in `docs/PLATFORMS.md` §"Non-Claude capability triggers". That is precisely the seam [[CORE-408.1]] Drift #4 identified — this task adds cells, not structure. It also authored the §"Agent-neutrality cross-check" whose "five triggers" claim has since gone stale (Q3).
  - **[[CORE-154.2]] / [[CORE-154.3]] / [[CORE-154.4]].** Established the ledger, the two-layer model, and the rule that wiring-layer content takes no ledger table row — the constraint that makes Q2's answer non-obvious and required checking what the *contract* layer actually says.
  - **[[CORE-408.2]] Q4 and [[CORE-408.3]] Q2 (shape precedent for Q3).** Both closed a pre-existing gap on lines they were already editing rather than leaving a knowingly-incomplete artifact behind. Q3 is the same move at the same epic's third surface.
  - **[[CORE-390]] / [[CORE-392]] (roster pressure, still binding).** Skills were *retired* to fight bloat; [[CORE-408.1]] Q4 already resolved no new skill for this epic. Nothing here reopens it — zero new files.
  - No archive precedent for a sub-agent capability trigger under any platform; the row is new content in an existing shape.

- [x] **Drift check** — every path and claim from the `PLAN.md` line and [[CORE-408.1]] re-verified at HEAD. `claude/CAPABILITIES.md` §"The triggers" present, still no sub-agent row; `docs/PLATFORMS.md` §"Non-Claude capability triggers" present with two populated tables (Grok Build, Codex CLI) + four stubs; `docs/AGENT-NEUTRALITY.md` ledger present; `docs/GLOSSARY.md` has zero hits for `probe` / `delegate` / `handoff` / `sub-agent`; `.flowtron/tasknote/README.md` ledger still 12 entries with `docs/EXTERNAL-AGENTS.md` absent. **Three findings:**

  1. **The PLAN line says "AGENT-NEUTRALITY ledger" but the epic's contract-layer prose is neutral throughout (load-bearing, drove Q2).** [[CORE-408.2]] and [[CORE-408.3]] each closed their sweeps with "no change — `.4` owns any ledger row for the Claude-specific *invocation mechanics*." But those mechanics land in `claude/CAPABILITIES.md`, which is **wiring layer** and by its own §"Agent-neutrality cross-check" takes *no* ledger table row; and the contract-layer prose names no platform primitive at all (`templates/subagent-probe-template.md` explicitly punts it: "Which sub-agent primitive spawns the probe is the operator's and the platform's business"). Taken literally, the filed deliverable had no valid target. **Re-verified and resolved:** `README.md` §"Agent memory" (`Claude Code sessions`, :179) and §"Sessions, loops, and sub-agents" (`--fast` on `/ft-task`, :221; Claude Code's `/loop`, :241) carry three Claude-specific contract-layer references that the ledger's two README rows (§"Repo layout", §"Quickstart") do **not** cover — and that is the exact section this epic extended with the probe/delegate split. The row is genuine and in-scope, not a courtesy entry.
  2. **`claude/CAPABILITIES.md` §"Agent-neutrality cross-check" is stale by three rows (drove Q3).** It reads "each of these five triggers already carries its contract-layer ledger coverage" against a table that has **eight** rows today — `--debug`, `--worktree`, and `--park` landed after [[CORE-224.3]] wrote the sentence and were never counted. Adding the sub-agent row makes it nine. The same stale five-item enumeration is mirrored in `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger". Pre-existing drift that this task's edit makes measurably worse.
  3. **The ledger gap is wider than the one doc [[CORE-408.1]] flagged (drove Q1).** `docs/EXTERNAL-AGENTS.md` is absent from the 12-entry AI-referenced-docs list — but so is `docs/WORKTREES.md`, which `EXTERNAL-AGENTS.md` names as "the isolation layer" and which this epic cited repeatedly. Adding only the doc Discovery happened to trip over would be arbitrary. (`docs/GLOSSARY.md`'s absence is *deliberate* — its own maintenance footer says it "must never be added to the AI-referenced docs list" — so it is not part of this gap.)

  No drift against a SPEC contract: table rows, glossary lines, and ledger entries add no phase, gate, banner, checklist box, or frontmatter key.

- [x] Asked clarifying questions — four surfaced via structured ask; all four resolved (see "Resolved scoping" below). Three widen scope beyond the filed line, which is the significant scope deviation firing the 🛠️ gate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Resolved scoping

| # | Question | Resolution | Consequence |
|---|---|---|---|
| Q1 | AI-referenced-docs ledger gap — `docs/EXTERNAL-AGENTS.md` only, both it and `docs/WORKTREES.md`, or decline? | **Add both.** 12 → 14 entries. | Closes Drift #3 without the arbitrariness of fixing only the doc Discovery tripped over. Costs +2 lines at every future Phase 4 sweep — accepted deliberately; both are convention docs that contract edits routinely drift against, and this epic amended one of them twice. |
| Q2 | Does the epic earn a contract-layer `docs/AGENT-NEUTRALITY.md` table row, given the prose is neutral? | **Yes — one row**, for `README.md` §"Agent memory" + §"Sessions, loops, and sub-agents". | Re-verification (Drift #1) found three genuinely unledgered Claude references in that section, so the row records a real gap rather than the epic's own neutral prose. The probe/delegate contract itself is explicitly *not* claimed as Claude-specific — the row's "why it stays" says so. |
| Q3 | Fix the stale "five triggers" count while editing, or leave it? | **Fix while editing.** | Directly the [[CORE-408.2]] Q4 / [[CORE-408.3]] Q2 precedent. +~3 lines. Leaving a count this task makes wronger by one, on a section this task edits, is the artifact-degrading option. |
| Q4 | GLOSSARY — three entries as filed, or four with a "sub-agent" umbrella? | **Three as filed** — probe, delegate, Handoff (🔄). | "sub-agent" stays defined in place by `README.md` §"Sessions, loops, and sub-agents", which both new entries point at. One fewer line to keep current; consistent with the glossary's "pointers only" charter. |

### Surfaces in scope

| File | Layer | Edit |
|---|---|---|
| `claude/CAPABILITIES.md` | Wiring | §"The triggers": +1 sub-agent row (9th). §"Agent-neutrality cross-check": count corrected, coverage bullet added (Q3) |
| `docs/PLATFORMS.md` | Contract | §"Non-Claude capability triggers": +1 isolated-exploration row in each of the Grok Build and Codex CLI tables |
| `docs/AGENT-NEUTRALITY.md` | Contract | Ledger table: +1 `README.md` delegation-guidance row (Q2). §"Out of scope": `claude/CAPABILITIES.md` enumeration refreshed |
| `docs/GLOSSARY.md` | Contract (lazy) | +3 alphabetized entries; maintenance footer count + last-update line |
| `.flowtron/tasknote/README.md` | Project | §"AI-referenced docs": +`docs/EXTERNAL-AGENTS.md`, +`docs/WORKTREES.md` (Q1) |

### Deliberately out of scope

- **`docs/AGENT-COMPAT.md`** — its §"Scope of this matrix" explicitly keeps per-agent capability triggers *out* of the matrix; a sub-agent trigger is trigger detail by definition. No row, no column.
- **The four stub sections** in `docs/PLATFORMS.md` (Cursor / Gemini CLI / Aider / Sourcegraph Amp) — each states no research has been conducted. Adding a speculative row would falsify the stub's own claim.
- **`templates/tasknote-README.md`** §"AI-referenced docs" — the adopter seed. Adopters declare their *own* doc set; flowtron's upstream docs are not in it.
- **`docs/GLOSSARY.md`'s misfiled `sidequest` entry** — sits between `follow-up` and `/ft-update`, out of alphabetical order. Pre-existing, on lines this task does not otherwise touch; noted, not fixed (contrast Q3, where the drift is *on* an edited section).
- **The `claude/CAPABILITIES.md` "Last verified" stamp** — a version/dogfood stamp for the doc as a whole, currently `v5.15.0 · 2026-08-02`, i.e. current. A newly documented (not newly dogfooded) row does not re-date it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three patterns extended, none invented:
  - **The fixed four-column trigger shape** ([[CORE-224.3]]) — its own pattern note declares it portable ("nothing about it is Claude-coupled except the cell contents") and directs non-Claude agents to reuse it in `docs/PLATFORMS.md`. All three new trigger rows fill that shape verbatim; no new structure anywhere.
  - **"No documented equivalent" honesty in a non-Claude row** — the pre-existing Grok `Force-skip (--fast equivalent)` row already answers a missing primitive by naming the approximation rather than leaving the cell blank or inventing a syntax. Both new non-Claude rows copy that move.
  - **Concept-pinned-by-negatives** — [[CORE-408.2]]'s probe phrasing (owns no tasknote · never runs Phase 1 · never trips a gate · never closes or archives) is reused verbatim in the GLOSSARY `probe` entry and the CAPABILITIES row, so the vocabulary reads identically at all three surfaces.

- [x] **Minimal refactor gate** — two corrections beyond the strict additions, both operator-approved in Phase 1: the `claude/CAPABILITIES.md` §"Agent-neutrality cross-check" stale-count fix (Q3) and the matching `docs/AGENT-NEUTRALITY.md` §"Out of scope" enumeration refresh. Rather than bump "five" to "nine" — which would have asserted a *false* universal, since `--worktree` has no ledger coverage — the blanket claim was replaced with a per-trigger list that states coverage honestly and records the `--worktree` gap as surfaced-not-fixed. No unrelated cleanup; the misfiled `sidequest` glossary entry was left alone per the Phase 1 out-of-scope note.

- [x] Implemented the minimal solution — five files edited, zero added; see the table below.

- [x] Updated/added tests for non-trivial behavior — `N/A`. Documentation tables and glossary prose; no executable surface. `viz/`'s parser is untouched (no `PLAN.md` grammar or frontmatter change).

**Implementation Notes:**

| File | Layer | Change |
|---|---|---|
| `claude/CAPABILITIES.md` | Wiring | §"The triggers": +1 **Sub-agent / isolated exploration** row (9th) naming the Task-tool/`subagent_type` primitive, `.claude/agents/*.md`, and `/agents`, mapped to the probe/delegate split and the Phase 1 probe clause. §"Agent-neutrality cross-check": blanket "five triggers" claim replaced by a seven-bullet per-trigger coverage list. +7/-2 |
| `docs/PLATFORMS.md` | Contract | §"Non-Claude capability triggers": +1 isolated-exploration row in the Grok Build table and +1 in the Codex CLI table, each stating "no documented sub-agent spawn primitive" and naming the second-session approximation. +2 |
| `docs/AGENT-NEUTRALITY.md` | Contract | Ledger table: +1 row for `README.md` §"Agent memory" + §"Sessions, loops, and sub-agents" (three unledgered Claude references), whose "why it stays" explicitly disclaims the probe/delegate split as Claude-specific. §"Out of scope": `claude/CAPABILITIES.md` enumeration refreshed 5 → 9 triggers + the `--worktree` note. +6/-2 |
| `docs/GLOSSARY.md` | Contract (lazy) | +3 entries in alphabetical position — `delegate` (:39, between `deep pre-pass` and `Discovery`), `Handoff (🔄)` (:69, between `grammar elements` and `heartbeat`), `probe` (:103, between `privileged-ops` and `ready-to-commit`). Header count ~60 → ~63; maintenance footer re-dated CORE-301.5 → CORE-408.4. +8/-2 |
| `.flowtron/tasknote/README.md` | Project | §"AI-referenced docs": +`docs/EXTERNAL-AGENTS.md`, +`docs/WORKTREES.md` (12 → 14 entries). +2 |

**Design decisions:**

- **The stale count was replaced, not incremented.** Q3 asked whether to fix "five triggers" against an 8-row (now 9-row) table. Incrementing to "nine" would have been *newly* false: `--worktree`'s only contract-layer site is `docs/WORKTREES.md`, which holds no ledger row. The blanket sentence became a per-trigger list, and the uncovered case is named rather than absorbed. This is the one place this task deliberately reports a gap instead of closing it — closing it would mean filing a ledger row for a doc this task was not scoped to audit.
- **The AGENT-NEUTRALITY row records the gap it found, not the epic that found it.** Drift #1 established the filed deliverable had no valid target. The row's Reference cell therefore names `Claude Code sessions` / `--fast` / `/loop` — genuinely unledgered contract-layer references in the section — and the "why it stays" cell states in the negative that the probe/delegate split is *not* Claude-specific. A future audit reading the row learns the true boundary rather than inheriting the PLAN line's mistaken framing.
- **Both non-Claude rows say "no documented equivalent" rather than guessing.** Neither Grok Build nor Codex CLI exposes a documented operator-facing sub-agent spawn primitive. Asserting one would have falsified rows that both carry `Last verified` stamps and first-use dogfood records. The rows also note the *delegate* half needs no primitive at all — a fresh session handed one tasknote already is one — which is the accurate and more useful observation for a contract-only agent.
- **Three glossary entries, not four.** Q4: `sub-agent` stays defined in place by `README.md` §"Sessions, loops, and sub-agents", which both new entries point at. The glossary's charter is "pointers only".
- **`docs/AGENT-COMPAT.md` deliberately untouched** — its §"Scope of this matrix" keeps per-agent capability triggers *out* of the matrix by design; a sub-agent trigger is trigger detail by definition.
- **Downstream-impact reconciliation scan** — **no downstream impact.** Active PLAN entries re-read and classified: `CORE-408.N` **unaffected** (the terminal audit child; its fixed doc-drift sweep line now walks 14 entries instead of 12, which is the intended effect of Q1, not drift against its scope); `CORE-EPIC-408` **unaffected** (this was its last implementation child — the parent is now eligible for `/ft-close-epic`). `## Medium` / `## Low` / `## Future Opportunities` are empty. No reconcile action proposed; no user-confirm required.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → **18 files / 245 tests passed** (4.19s). Not a targeted surface (no grammar or frontmatter change); run as the registered release-gate sanity check.

- [x] Ran lint/type-check on changed code — `N/A`. Markdown only; no linted or typed surface changed. Substituted the structural checks below.

- [x] **Quality assertions** — no duplication introduced: the probe/delegate definitions exist at three surfaces by design (README contract, GLOSSARY pointer, CAPABILITIES wiring row) but the glossary and wiring copies are *pointers* that cite the README rather than restating the contract, and the shared negative-clause phrasing is deliberate lockstep, not divergence. No dead prose — every new row and entry is reachable from a table its own doc already indexes. Public-surface growth is zero files, zero flags, zero keys; +2 AI-referenced-docs entries is the one deliberate ongoing cost, accepted at Q1. No stale code-facing docs: the new content names no skill, API, or line number that can drift out from under it, and the one *doc* claim it does make (the `--worktree` coverage gap) was verified by grep, not recalled.

- [x] (frontend) Asked the user for visual confirmation — `N/A`. No frontend surface.

**Testing Notes:**

| Check | Command / method | Result |
|---|---|---|
| Viz suite (release gate) | `npm --prefix viz test` | 18 files / 245 tests passed (4.19s) |
| Changed-file set | `git diff --stat` | exactly 5 files, +25/-6; zero files added |
| Table column integrity | pipe count on all 3 new trigger rows + the ledger row | 5 pipes = 4 columns on each; no cell-internal pipes |
| CAPABILITIES row count | `awk` over §"The triggers" | **9** rows — matches the corrected cross-check text |
| AI-referenced-docs count | `awk` over the ledger section | **14** entries (was 12) |
| Glossary alphabetization | `grep -n` on each new entry + its two neighbours | `deep pre-pass` < **delegate** < `Discovery`; `grammar elements` < **Handoff** < `heartbeat`; `privileged-ops` < **probe** < `ready-to-commit` — all correct |
| `--worktree` coverage claim | `grep -rn "\-\-worktree" SPEC.md SPEC/ templates/ docs/ README.md` | 2 hits (`docs/WORKTREES.md:45`, `docs/PLATFORMS.md:31`); neither file holds a ledger row → the "not ledgered today" claim is verified, not assumed |
| New link targets resolve | `README.md`, `templates/subagent-probe-template.md`, `docs/WORKTREES.md`, `docs/EXTERNAL-AGENTS.md`, `SPEC/procedures/ft-task.md`, `SPEC/tasknote-selection.md` — incl. the `../` forms from `claude/` | all resolve |
| Wikilink integrity | every `[[ID]]` in this tasknote + the two `[[CORE-408.4]]` links added to docs | 10/10 archived notes exist; `[[CORE-EPIC-408]]` + `[[CORE-408.4]]` live in PLAN.md |
| Trailing whitespace | `grep -n " $"` over all 5 changed files | none |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all **14** AI-referenced-docs entries walked (the list this task itself grew from 12); **3 updated, 11 no change**:
  - `README.md` — no change. Its §"Agent memory" and §"Sessions, loops, and sub-agents" are now *described* by a new ledger row, but the README text itself is untouched (confirmed absent from `git diff --stat`). The row documents the file; it does not require editing it.
  - `SPEC.md` — no change. This task added no phase, gate, banner, checklist box, or frontmatter key. The epic's two SPEC edits (the Phase 1 probe clause, the `### 🔄 Handoff` subsection) landed in [[CORE-408.2]] and [[CORE-408.3]] respectively and are unaffected.
  - `docs/MIGRATION.md` — no change. Nothing new to copy and no skill to symlink ([[CORE-408.1]] Q4 stands: no new skill for this epic). Adopters inherit all five edited docs on their next submodule bump with no adoption or bump step changing.
  - `claude/AGENTS-snippet.md` — no change. It names templates an adopter must *copy* and the one-time symlink wiring; this task added neither a template nor a skill.
  - `codex/AGENTS-snippet.md` — no change. The Codex row added to `docs/PLATFORMS.md` documents an *absent* primitive and its manual approximation — it prescribes no wiring step, so the install commands are untouched.
  - `docs/CONVENTIONS.md` — no change. No commit, versioning, or formatting convention touched.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change, checked deliberately rather than by default. The new CAPABILITIES row documents *invocation syntax* for a primitive whose flowtron use is read-only by brief (`templates/subagent-probe-template.md` forbids edits, writes, network, and commits). This matches the assessment [[CORE-408.2]] already recorded when the probe concept landed: §"Prompt injection via user-authored markdown" scopes its threat model to "any AI assistant reading the same files", which covers a probe exactly, and a probe reads files the parent would have read anyway. No new tool-allowlist surface and no new trust boundary — naming the spawn syntax does not widen what a probe may do.
  - `docs/AGENT-NEUTRALITY.md` — **UPDATED.** +1 ledger row (`README.md` §"Agent memory" + §"Sessions, loops, and sub-agents"); §"Out of scope" `claude/CAPABILITIES.md` enumeration refreshed 5 → 9 triggers plus the `--worktree` coverage note.
  - `docs/PLATFORMS.md` — **UPDATED.** +1 isolated-exploration row in the Grok Build table, +1 in the Codex CLI table. Both `Last verified` stamps left as-is: the rows document vendor-documentation absence, not a new dogfood observation.
  - `claude/CAPABILITIES.md` — **UPDATED.** +1 Sub-agent / isolated exploration trigger row; §"Agent-neutrality cross-check" blanket claim replaced by a per-trigger coverage list. **`Last verified` stamp deliberately unchanged** (`v5.15.0 · 2026-08-02`, still current): the new row is documented, not newly dogfooded, and the stamp tracks the doc's verification currency rather than its edit date.
  - `docs/AGENT-COMPAT.md` — no change, checked deliberately. Its §"Scope of this matrix" excludes per-agent capability triggers by explicit design ("Keeping triggers out of the matrix keeps it a stable index rather than a second copy of the trigger detail"). A sub-agent trigger is trigger detail; adding a row or column would violate the doc's own stated scope.
  - `docs/EXTERNAL-AGENTS.md` — **no content change**; newly *added to this ledger* by this task (Q1), closing [[CORE-408.1]] Drift #3. Its two epic-relevant sections (§"The Core Rule" probe carve-out from `.2`, §"The Handoff Contract" reciprocal pointer from `.3`) are current and consistent with everything landed here.
  - `docs/WORKTREES.md` — **no content change**; newly *added to this ledger* by this task (Q1). Verified current: its `--worktree` reference at :45 still matches `/ft-goal-task`'s behavior. Separately noted in `claude/CAPABILITIES.md` as the one contract-layer `--worktree` site lacking an AGENT-NEUTRALITY row — surfaced, not fixed.
  - **Not in the ledger by design:** `docs/GLOSSARY.md` was edited by this task but is deliberately excluded — its own maintenance footer states it "must never be added to the AI-referenced docs list" (lazy-loaded, protects one-task-per-window). Confirmed still excluded; the exclusion is intentional, not the gap Q1 closed.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept 2-space nested beneath the active `CORE-EPIC-408` parent per SPEC/epic.md §"Child placement invariant", then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary; surfaced at the 📦 gate.

**Final Summary:**

Wired `CORE-EPIC-408`'s vocabulary into the platform and ledger layers, closing the epic's implementation arc. `claude/CAPABILITIES.md` gained a **Sub-agent / isolated exploration** trigger row (the Task tool's `subagent_type`, `.claude/agents/*.md`, `/agents`) mapped to the probe/delegate split; `docs/PLATFORMS.md` gained matching rows in the Grok Build and Codex CLI tables; `docs/GLOSSARY.md` gained `probe`, `delegate`, and `Handoff (🔄)`; and the AI-referenced-docs ledger grew 12 → 14.

**The filed deliverable had no valid target, and saying so was the work.** The PLAN line assigned this task an `AGENT-NEUTRALITY` row for the epic's "Claude-specific invocation mechanics" — but those mechanics live in `claude/CAPABILITIES.md`, which is wiring-layer and takes no ledger row by that doc's own rule, and the contract-layer prose `.2`/`.3` landed names no platform primitive anywhere (`templates/subagent-probe-template.md` explicitly punts it to "the operator's and the platform's business"). Rather than file a courtesy row or silently skip the deliverable, re-verification found a *real* gap in the same section: `README.md` §"Agent memory" and §"Sessions, loops, and sub-agents" carry three unledgered Claude references (`Claude Code sessions`, `--fast` on `/ft-task`, Claude Code's `/loop`) that the ledger's two existing README rows never covered. The row records that gap and states in the negative that the probe/delegate split is *not* Claude-specific — so a future audit inherits the true boundary instead of the PLAN line's framing.

**A stale count was replaced rather than incremented.** `claude/CAPABILITIES.md` claimed "each of these five triggers already carries its contract-layer ledger coverage" against an eight-row table (`--debug`/`--worktree`/`--park` landed after the sentence was written); this task made it nine. Bumping the number would have been *newly* false — `--worktree`'s only contract-layer site, `docs/WORKTREES.md:45`, holds no ledger row. The blanket claim became a seven-bullet per-trigger list that states coverage honestly and names the `--worktree` gap as surfaced-not-fixed, verified by grep rather than asserted.

**Q1 widened deliberately.** [[CORE-408.1]] Drift #3 flagged `docs/EXTERNAL-AGENTS.md`'s absence from the ledger, but `docs/WORKTREES.md` — which that very doc names as "the isolation layer" — was equally absent. Fixing only the doc Discovery happened to trip over would have been arbitrary, so both landed. Cost: +2 lines at every future Phase 4 sweep, accepted knowingly.

**Constraint honoured.** [[CORE-328.1]] won't-filed "programmatic sub-agent delegation machinery"; [[CORE-408.1]] Q4 resolved no new skill. Nothing here is machinery: zero files added, zero skills, zero symlinks, zero flags, zero frontmatter keys, zero gates. The one primitive named is Claude Code's own, documented in the wiring layer where naming it is correct, and both non-Claude rows say plainly that no documented equivalent exists rather than inventing one.

**Verification.** `npm --prefix viz test` 18 files / 245 tests passed; exactly 5 files changed (+25/-6), zero added; all three new trigger rows and the ledger row carry 5 pipes / 4 columns; CAPABILITIES row count 9 matches the corrected text; ledger count 14; all three glossary entries verified in correct alphabetical position against both neighbours; the `--worktree` coverage claim verified by grep over `SPEC.md SPEC/ templates/ docs/ README.md`; all new link targets resolve including the `../` forms from `claude/`; 10/10 wikilinked archives exist; zero trailing whitespace. Doc-drift sweep: 3 updated, 11 no change (`SECURITY.md`, `docs/AGENT-COMPAT.md`, and the `docs/GLOSSARY.md` exclusion all checked deliberately). Downstream-impact reconciliation: no impact — `CORE-408.N`'s scope intact, its sweep now simply walks 14 entries.

**Maintainability effect.** +25/-6 across five docs, no new files. The epic's vocabulary is now reachable from three directions — contract (README/SPEC), lookup (GLOSSARY), and syntax (CAPABILITIES/PLATFORMS) — so a reader hitting "probe" or "delegate" cold lands somewhere authoritative regardless of which door they came in. Two convention docs that contract edits routinely drift against are now sweep-guarded, and one previously-invisible ledger gap (`--worktree`) is recorded where the next audit will find it.

**Archived:** 2026-08-06
