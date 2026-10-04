---
title: sidequest-fold
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-388, CORE-390, CORE-392, CORE-EPIC-342]
---

# CORE-391 | sidequest-fold

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-388]] [[CORE-390]] [[CORE-392]] [[CORE-EPIC-342]]

## 🎯 Goal

Retire `/ft-sidequest` as a standalone skill and fold its entire delta — priority flags, the `.flowtron/sidequest/` stub with resume anchor, the no-gate ≤70w reply, and the resume-inline contract — into `/ft-file-followup` behind a `--park` flag backed by a lazy SKILL fragment.

## ✅ Acceptance

- [x] `claude/skills/ft-file-followup/park-mode.md` fragment created, carrying the full park flow (auto-allocate ID, priority flags / one-line ask, stub write, ≤70w reply, resume inline), loaded only when `--park` is present
- [x] `/ft-file-followup` Step 0 accepts `--park` / `-p` plus the four priority flags as an unordered flag set; unknown tokens still surface a usage notice rather than proceeding silently
- [x] `/ft-file-followup` dispatches to the fragment when `park-mode = true`, bypassing Steps 2–5 (AskUserQuestion collection, review gate, reconcile scan, conversational paragraph)
- [x] `/ft-file-followup` frontmatter `description:` extended so park/quick-fix phrasing still routes here (CORE-388's named NL-dispatch cost)
- [x] Three `ft-sidequest` paths deleted: `claude/skills/ft-sidequest/`, `claude/commands/ft-sidequest.md`, `codex/skills/ft-sidequest/`
- [x] The sidequest **artifact** survives intact — `templates/sidequest-template.md`, `.flowtron/sidequest/<ID>.md`, `status: sidequest`, and the GLOSSARY term are unchanged; only the invocation surface moves
- [x] Every live `ft-sidequest` reference resolved across the ~27 referencing files (roster, snippets, SPEC + 3 modules, GLOSSARY, AGENT-NEUTRALITY, PLATFORMS, MIGRATION, CAPABILITIES, README, AGENTS.md, spec-template, 4× context-dependent-skills lists, 3 sibling commands, ft-new-project ×5, ft-release gate literals, ft-spec ×2)
- [x] `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains an `ft-sidequest` row pointing at `/ft-file-followup --park`
- [x] `ft-release`'s three exact-set `diff` gates pass with `ft-sidequest` removed from the expected adopter subset (12 → 11 slugs), plus the three forbidden-install gates
- [x] Roster lands at **18** across all four independent counts + the `docs/PLATFORMS.md` literals — CORE-388's target
- [x] `git status --porcelain` shows only intended paths

## 🧩 Subtasks

- [x] Write `park-mode.md` (port ft-sidequest Steps 0–4 verbatim where possible; drop the path-resolution duplication the host SKILL already owns)
- [x] Extend `/ft-file-followup` Step 0 to a flag set; add the park-mode dispatch + flag-semantics paragraph
- [x] Extend `/ft-file-followup` frontmatter description + `claude/commands/ft-file-followup.md` usage block
- [x] Delete the 3 `ft-sidequest` paths
- [x] Sweep references across the ~27 live files (skill → flag rewording; artifact mentions left intact)
- [x] Add the `ft-sidequest` row to the MIGRATION retired-skills table
- [x] Verify: ft-release gates, repo-wide grep, roster count 19 → 18, adopter subset 12 → 11
- [x] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-388]] — verdict source: row 7 `ft-sidequest` → **MERGE** → `/ft-file-followup --park`
- [[CORE-390]] — immediate predecessor and the mechanical template for this fold (`/ft-debug` → `/ft-task --debug`)
- [[CORE-392]] — first landing of the same fold cohort (`ft-quality` retire, roster 21→20)
- [[CORE-EPIC-342]] — the epic that shipped `/ft-sidequest` in v5.10.0; its artifact design is what ports, not what's discarded

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Last of CORE-388's three folds; landing it hits the verdict's roster target of 18 exactly. The premise verifies on inspection: `/ft-sidequest` (94 lines) and `/ft-file-followup` (137 lines) both self-describe as the "lightest" filing motion, and `SPEC/tasknote-selection.md` spends its longest disambiguation block separating them. A flag collapses the ambiguity without losing behavior.

- [x] Read relevant source files

- [x] **Best Practices Review** — the fold removes a *contradiction* rather than introducing an abstraction: two skills claiming the same superlative is the duplication the selection doc has been patching around since CORE-057.5. Dependency direction preserved — the fragment is loaded *by* `/ft-file-followup`, never the reverse, matching the four `claude/skills/ft-task/step-*.md` fragments and [[CORE-390]]'s `step-4-debug-mode.md`. Responsibility boundary to respect: the fragment owns the park *flow*; ID resolution / pre-flight / area rules stay in the host SKILL so the two modes cannot drift on validation.

- [x] **Archive skim** — grepped `.flowtron/tasknote/archive/core/` for `sidequest`; 12 hits across 5 threads.
  - [[CORE-EPIC-342]] + `CORE-342.2` / `CORE-342.4` built and shipped `/ft-sidequest` in v5.10.0. The audit records the wiring surfaces to unwind: AGENTS.md, AGENTS-snippet, MIGRATION, PLATFORMS ("nine tasknote skills"), ft-flowtron roster, GLOSSARY.
  - `CORE-359.3` (orphan-sidequest-cleanup) is the load-bearing operational note: **the stub must be deleted after promotion**, and it wasn't once, leaving an orphan for eight days. That contract must survive the fold verbatim — it is the only lifecycle obligation the artifact carries.
  - `CORE-348` (suggested-id-filers) established the `.flowtron/sidequest/` scan in the ID-allocation path of `/ft-file-followup` and `/ft-starter-task` — those two references are **artifact** references and must NOT be swept.
  - [[CORE-390]] supplies the retirement mechanics wholesale, including the adopter-symlink question it already answered.

- [x] **Drift check** — every technical claim in the task line verifies. `/ft-sidequest` = 94 lines; its delta is priority flags + stub + resume anchor + no-gate reply, exactly as filed. `SPEC/tasknote-selection.md` carries a 15-line sidequest block (lines 56–70) plus the loader list at line 7. Two facts the task line does not anticipate, both surfaced below rather than silently absorbed:
  1. **`ft-sidequest` is in the 12-slug adopter symlink subset** — same situation [[CORE-390]] hit first. Unlike that task, the precedent now exists: hard-delete + a row in `docs/MIGRATION.md` §"Retired skills leave dangling symlinks". No new decision required.
  2. **The `sidequest` noun is broader than the skill.** `templates/sidequest-template.md`, the `.flowtron/sidequest/` directory, `status: sidequest`, the GLOSSARY entry, and the ID-allocation scans in two sibling skills all name the *artifact*, which this fold keeps. The sweep is therefore selective, not a blanket rename — roughly a third of the live hits must be left alone.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** [[CORE-390]] resolved the one question this class of fold raises (adopter-symlinked skill retirement → hard-delete + bump note), and CORE-388's verdict already names the exact behaviors that port. Explicit assumptions carried into Phase 2:
  1. **The artifact survives, the skill doesn't.** `.flowtron/sidequest/`, its template, `status: sidequest`, and the GLOSSARY term stay as-is — renaming them would break adopters holding live parks for no gain. Only the invocation moves.
  2. **`--park` preserves sidequest's flow verbatim, not file-followup's.** One-line prose priority ask (no AskUserQuestion widget), auto-allocated ID without confirmation, no review gate, no reconcile scan, no conversational paragraph, ≤70w reply, resume inline. Where the two contracts conflict, park mode wins.
  3. **Word budgets:** park mode keeps the ≤80w Idea / ≤30w PLAN-description caps. Being a strict subset of file-followup's ≤50w target, park filings never trip the >70w filing-discipline gate.
  4. **NL dispatch is in scope**, per [[CORE-390]]'s handling of the same named cost: `/ft-file-followup`'s frontmatter `description:` must absorb "park an idea", "quick fix", "don't lose this" phrasing or routing silently regresses.
  5. **Roster lands at exactly 18**, per CORE-388's arithmetic; adopter subset 12 → 11.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**CORE-388's verdict (row 7, verbatim):** `ft-sidequest` → **MERGE** → `/ft-file-followup --park` — "Only skill in the roster with no Discovery record (ad-hoc commit `8747539`); its 'lightest' claim collides head-on with file-followup's (CORE-057.5). Distinct behavior (priority flags, stub + resume anchor, no-gate ≤70w reply, resume-inline contract) ports intact as a mode."

**The delta being ported (all of it):**

| Source | Content |
|---|---|
| `ft-sidequest` intro | Auto-allocate ID from active tasknote / PLAN prefix / `CORE-`; don't ask unless area is genuinely ambiguous |
| Step "Priority flags" | `--low`→Low/`next-chat` · `--med`/`--medium`→Medium/`soon` · `--fut`/`--future`→Future/`later` · `--high`→High/`soon`; **no flag → one-line prose ask, stop, wait** |
| Step 2 | Draft: Idea ≤80w · shortname ≤30 chars · long description ≤30w · resume anchor · `parent:` · `[light]` default model |
| Step 3 | Write: `mkdir -p`, copy template → `.flowtron/sidequest/<ID>.md`, append PLAN line under the priority heading |
| Step 4 | ≤70w `📌` reply (park confirmation + priority + resume anchor), then **continue the interrupted work inline** |
| Notes | Promotion routing + the `CORE-359.3` obligation: delete the stub after promotion |

Steps 0 (path resolution) and 1 (area/ID pre-flight) are duplicates of what `/ft-file-followup` already owns and die with the file.

**Live reference inventory (27 files outside `archive/`), split by what the sweep does to each:**

| Class | Files | Action |
|---|---|---|
| Delete | `claude/skills/ft-sidequest/`, `claude/commands/ft-sidequest.md`, `codex/skills/ft-sidequest/` | `git rm` |
| Skill→flag reword | `SPEC.md` ×2, `SPEC/tasknote-selection.md` ×4, `SPEC/gates.md`, `SPEC/procedures/ft-task.md`, `AGENTS.md`, `README.md`, `docs/MIGRATION.md` ×5, `docs/PLATFORMS.md` ×4, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/AGENTS-snippet.md` ×3, `codex/AGENTS-snippet.md`, `claude/CAPABILITIES.md` (new `--park` row), `claude/skills/ft-flowtron` (roster row + count), `claude/skills/ft-release` ×4 (gate literals), `claude/skills/ft-new-project` ×5, `claude/skills/ft-spec` ×2, `claude/skills/{ft-task,ft-micro-task,ft-close-epic,ft-epic-discovery}` (context-dependent lists), `claude/commands/{ft-starter-task,ft-spec,ft-epic-discovery,ft-file-followup}`, `templates/spec-template.md` | rewrite invocation |
| Artifact — leave intact | `templates/sidequest-template.md`, `claude/skills/ft-starter-task` ×2 + `ft-file-followup` (`.flowtron/sidequest/` ID scans), `README.md:238` / `SPEC.md:55` / `ft-flowtron:74` (templates enumeration) | no change |

**Context-dependent-skills list.** Four skills plus `SPEC.md`, `SPEC/gates.md`, and `SPEC/procedures/ft-task.md` carry the 👇 `HERE` trio `/ft-sidequest` · `/ft-file-followup` · `/ft-epic-discovery`. It collapses to a pair — park mode is a flag on a member already in the list, so the semantics are unchanged and no `--park` mention is needed there.

**Roster arithmetic:** 19 after [[CORE-390]] → **18** here, hitting CORE-388's target exactly.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced no significant deviation → skip 🛠️ (the two drift findings are scope *detail* — an already-precedented symlink question and a selective-sweep boundary — not a change of approach).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the fragment follows `step-4-debug-mode.md`'s shape exactly: an H1 naming the mode, a `> Lazy-loaded SKILL fragment. Loaded by …` prose line declaring its trigger, then executable sections. Dispatch follows the same shape — the host SKILL names the condition and the path, the fragment holds the flow. One deliberate departure from `--debug`: `--debug` *adds* content to the host's phases, while `--park` *replaces* Steps 2–5, so the fragment numbers its own steps `P1`–`P5` rather than hooking into the host's numbering. Retirement mechanics reuse [[CORE-390]] / [[CORE-392]]: `git rm`, then sync every enumeration surface.

- [x] **Minimal refactor gate** — no refactor. Two in-passing corrections, both in files this task already edits and both caused by the fold: (1) `README.md` said "the **ten** tasknote skills" while listing nine — a leftover from [[CORE-390]]'s `ft-debug` removal; now eight and correct; (2) `docs/MIGRATION.md`'s §1.2 count said "nine tasknote family" while its own list also drifted — now eight. Both are enumeration statements this fold had to touch anyway, so leaving them stale would have shipped a known-wrong count.

- [x] Implemented the minimal solution — 1 new fragment (127 lines) + 6 edits to `/ft-file-followup`'s SKILL, a rewritten command stub, 3 deletions, 26 reference edits

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown-only; no test-bearing code (`viz/`, `tools/`) touched

**Implementation Notes:**

**The fragment.** `claude/skills/ft-file-followup/park-mode.md` (127 lines vs. the deleted skill's 94) carries the complete delta as Steps P1–P5: ID auto-allocation, the priority-flag table + the one-line prose ask, the six drafting fields, the stub-and-PLAN write motion, and the ≤70w `📌` reply that resumes inline. It is *longer* than the retired skill for one honest reason — it has to state explicitly which host-SKILL behaviors it overrides (review gate, reconcile scan, hand-off, ID confirmation), which a standalone skill never needed to say. The three deleted-skill sections that don't reappear are path resolution and area/ID pre-flight, both already owned by the host.

**Arg grammar.** Step 0 becomes an unordered flag set plus free text — `park-mode` initialized false, tokens walked independently, priority flags recognized and carried, unrecognized `--` tokens routed to a usage notice instead of being ignored. Priority flags outside park mode now surface that notice rather than silently doing nothing, which the standalone skill's arg space made impossible to get wrong.

**Dispatch.** A single dispatch point at Step 0 (not two like `--debug`), because park mode replaces the flow rather than augmenting phases of it. Step 1a keeps one park-only pre-flight line (`.flowtron/sidequest/<ID>.md` must not exist) so both modes share one validation home.

**The artifact/skill split — the fold's defining constraint.** `sidequest` names two different things: the retired *skill* and the surviving *artifact*. `templates/sidequest-template.md`, `.flowtron/sidequest/`, `status: sidequest`, the GLOSSARY term, and the `.flowtron/sidequest/` ID-allocation scans in `/ft-file-followup` and `/ft-starter-task` all describe the artifact and were deliberately left untouched — renaming them would break adopters holding live parks for no gain. Roughly a third of the pre-fold `sidequest` hits fall in that class. The GLOSSARY entry keeps the term and gains a one-clause note that the invocation moved in v5.15.0.

**NL-dispatch mitigation.** `/ft-file-followup`'s frontmatter `description:` now names parking, quick fixes, tangential ideas, and "don't lose this" phrasing plus the `--park` arg shape. The live skill listing refreshed mid-session and confirmed both the new description and `ft-sidequest`'s disappearance from the roster.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, markdown-only skill/doc changes; no `viz/` or `tools/` code touched

- [x] Ran lint/type-check on changed code — `N/A`, same reason

- [x] **Quality assertions** — verified against the actual diff: three independent counts agree at **18** (`claude/commands/*.md`, `claude/skills/*/`, `codex/skills/*/`) and match the three `docs/PLATFORMS.md` literals; Claude↔Codex shipped-inventory parity `diff` is clean; repo-wide `grep -rn ft-sidequest` outside `archive/` returns only the intentional MIGRATION retired-skills row, the GLOSSARY historical clause, this tasknote, and its PLAN line. The fragment is reachable from exactly one dispatch path and duplicates nothing left in the host SKILL — path resolution and pre-flight live only in the host, the park flow lives only in the fragment. No dead cross-references: the four context-dependent-skills lists collapsed from a trio to a pair rather than dropping a member silently, and every "lighter than `/ft-sidequest`" routing clause was rewritten to point at the flag, not deleted.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

`ft-release`'s six release gates were **run** rather than inspected, since this task edits the expected-set literals inside all three `diff` gates: the three exact-set gates PASS (adopter subset now 11 slugs, `ft-sidequest` removed from the Claude skills, Claude commands, and Codex skills lists) and the three forbidden-install `grep` gates PASS (no output, rc=1). The Claude↔Codex shipped-inventory parity check also passes. Run under `bash` with explicit word-splitting — the same zsh pitfall [[CORE-390]] recorded.

Not machine-verifiable and therefore stated as a limitation: whether `--park` *dispatches* correctly in a live run. The wiring is verified structurally (flag parsed at Step 0, fragment path correct and present on disk, single dispatch point references it, pre-flight extended) and the mid-session skill-listing refresh confirmed the new frontmatter description loaded — but the first real `/ft-file-followup --park` invocation is the actual proof. Same limitation shape [[CORE-390]] carried for `--debug`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — **updated** (adopter wiring list: ten→eight tasknote skills, `/ft-sidequest` dropped)
  - `SPEC.md` — **updated** (§"Skill namespace" 18 slugs; §"Post-closure protocol" context-dependent trio → pair)
  - `docs/MIGRATION.md` — **updated** (§1.2 subset nine→eight, `git add` block, smoke list ten→nine, menu list, and the new `ft-sidequest` retired-skills row)
  - `claude/AGENTS-snippet.md` — **updated** (paste-block filing bullet rewritten around `--park`; two symlink lines removed)
  - `codex/AGENTS-snippet.md` — **updated** (symlink line removed)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated** (skill-name ledger row)
  - `docs/PLATFORMS.md` — **updated** (surface table nine→eight, installed-surface policy, `commands/` tree + enumeration, three counts 19→18, new `--park` flag entry, `park-mode.md` named in the lazy-fragment list)
  - `claude/CAPABILITIES.md` — **updated** (new `--park` row)
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed` (standalone task), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Folded `/ft-sidequest` into `/ft-file-followup --park`, closing the roster consolidation CORE-388 scoped: 19 → **18**, the verdict's exact target. The retired skill and its host both claimed to be the "lightest filing motion" — the contradiction `SPEC/tasknote-selection.md` spent its longest disambiguation block patching around — and a flag collapses it without losing a single behavior: priority flags, the `.flowtron/sidequest/` stub with resume anchor, the skipped review gate and reconciliation scan, the ≤70w reply, and the resume-inline contract all port to a lazy fragment the flag loads.

The fold's defining constraint was that `sidequest` names two things. The **skill** is retired; the **artifact** — `templates/sidequest-template.md`, `.flowtron/sidequest/`, `status: sidequest`, the GLOSSARY term, and the ID-allocation scans in two sibling skills — is untouched, so adopters holding live parks keep working across the bump. About a third of the pre-fold references fall in that class, which made the sweep selective rather than a rename.

**Changed** — 2 new files, 3 deletions, 29 modified, markdown only:
- New: `claude/skills/ft-file-followup/park-mode.md` (127 lines) + this tasknote
- Deleted: `claude/skills/ft-sidequest/SKILL.md` (94 lines), `claude/commands/ft-sidequest.md`, `codex/skills/ft-sidequest/SKILL.md`
- `/ft-file-followup` SKILL: frontmatter description, park-mode carve-out paragraph, Step 0 (paths → paths + unordered flag set + dispatch), Steps 1 / 1a, routing note
- `claude/commands/ft-file-followup.md`: `argument-hint`, description, new `--park` paragraph, routing block
- 27 further reference edits across SPEC + 3 modules, roster, both snippets, CAPABILITIES, PLATFORMS, MIGRATION, GLOSSARY, AGENT-NEUTRALITY, README, AGENTS.md, spec-template, four context-dependent-skills lists, three sibling command stubs, `ft-new-project` ×5, `ft-release` gate literals, `ft-spec` ×2

**Verification:** all six `ft-release` gates run and passing (three exact-set `diff` at 11 adopter slugs, three forbidden-install `grep`) — run rather than inspected, since this task edits the expected-set literals inside them; Claude↔Codex shipped-inventory parity clean; three independent skill counts agree at 18 and match the three `docs/PLATFORMS.md` literals; repo-wide grep leaves only the four intentional `ft-sidequest` mentions (MIGRATION retired-skills row, GLOSSARY historical clause, PLAN line, this tasknote). Stated limitation: live `--park` dispatch is verified structurally, not by invocation.

**Refactors:** none. Two in-passing count corrections in files already being edited — `README.md` said "ten tasknote skills" while listing nine (a leftover from [[CORE-390]]'s `ft-debug` removal) and `docs/MIGRATION.md` §1.2 said "nine" against a drifted list; both now read eight. Same class as the `ft-quality` leftover [[CORE-390]] fixed in passing.

**Documentation verdict:** eight of twelve AI-referenced docs updated; four verified unaffected. The adopter-facing addition is the `ft-sidequest` row in `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" — the second entry in a table [[CORE-390]] created, which is now doing the job it was built for. Its row states explicitly that the stubs and template are unchanged, so a bumping adopter knows the dangling symlink is the *only* cleanup.

**Maintainability effect:** roster 19 → 18, completing CORE-388's consolidation (26 → 18 across four tasks). The durable win is not the slot but the removed ambiguity: two skills can no longer both claim "lightest", and the selection doc's longest disambiguation block is gone — park mode is now documented as a mode of the skill it used to compete with, so there is one entry point to reason about instead of a pair separated by adjectives.

**Follow-up still open (not actioned, carried from [[CORE-390]]):** `/ft-update` wires symlinks for newly shipped skills but never prunes retired ones. This fold is the second retirement to leave adopters manual cleanup, which strengthens the case for a prune step.

**Archived:** 2026-08-02
