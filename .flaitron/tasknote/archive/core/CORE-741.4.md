---
title: routing-skill-sweep
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-741.2, CORE-741.3, CORE-741.5]
blocked-by: [CORE-741.3]
parallel-safe-with: [CORE-741.5]
touches:
  - SPEC/model.md
  - SPEC/post-closure.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/CAPABILITIES.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
  - README.md
---

# CORE-741.4 | routing-skill-sweep

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Teach every model-choosing surface the `[frontier]`💎 rung and the tier × platform map, so post-closure next-move suggestions print `model @ effort` for the active platform and automated choosers cap at `[frontier]`.

## ✅ Acceptance

- [x] `SPEC/model.md` §"Effort recommendations" owns the print rule: primary pick at the top of the range, `(alt …)` dropped, ⚠️ kept; no suffix for `[xheavy]`, a concrete token, or an unmapped platform — `grep -q 'Printing a cell' SPEC/model.md`
- [x] `SPEC/post-closure.md` step 2 candidate line ends `· <model @ effort>` and step 3 label line reads `<glyph> Clear your session, then run on <model @ effort>:`; every glyph list there carries 💎 — `grep -c '💎' SPEC/post-closure.md` ≥ 3 and `grep -q 'then run on <model @ effort>:' SPEC/post-closure.md`
- [x] Step 1.5 edge fragment: category lists include `[frontier]`, the under-tier ⚠️ note names the active platform's map pick, the chooser cap reads `[frontier]`, the legacy ask offers `[frontier]` only on a trigger — `grep -c 'frontier' claude/skills/ft-task/step-1.5-model-edge.md` ≥ 4 and `! grep -q 'cap at \`\[heavy\]\`' claude/skills/ft-task/step-1.5-model-edge.md`
- [x] `/ft-epic-discovery`: `.1` of a `[heavy]`/`[frontier]` epic files `[frontier]`, `.N` caps at `[heavy]`, child cap `[frontier]` (trigger-reached) in Step 7 and the Step 8 check — `! grep -q 'capped at \`\[heavy\]\`\|no heavier than \`\[heavy\]\`' claude/skills/ft-epic-discovery/SKILL.md`
- [x] `ft-audit`, `ft-audit-repo`, `ft-refactor` filing sentences offer `[frontier]💎` only on a `SPEC/model.md` trigger; `[xheavy]` exclusion kept — `grep -l '\[frontier\]💎' claude/skills/{ft-audit,ft-audit-repo,ft-refactor}/SKILL.md | wc -l` = 3
- [x] Render mirrors carry 💎 and the new label line: `claude/CAPABILITIES.md` (effort + `/model` rows, ledger), `SPEC/procedures/ft-task.md` cue list, `docs/PLATFORMS.md` Grok/Codex/Cursor model-switch rows + Codex effort row, `docs/GLOSSARY.md` copy-paste line, `ft-refactor` label-line restatement, README quote — residual grep `grep -rn '🔭' --include='*.md' claude SPEC/procedures docs/PLATFORMS.md | grep -v '💎'` prints only the PLATFORMS `[xheavy]` map row, and `grep -rn 'Clear your session, then run:'` over live docs prints nothing
- [x] Codex wrappers carry no tier text (they route to canonical bodies) — `grep -rlE 'heavy\]|xheavy|🧠' codex/` prints nothing
- [x] Byte budgets hold — `bash tools/drift-checks.sh` → 0
- [x] Viz suite unaffected — `npm --prefix viz test` → 0

## 🧩 Subtasks

- [x] `SPEC/model.md` §"Effort recommendations": add the "Printing a cell" bullet
- [x] `SPEC/post-closure.md` steps 2–3 + 👇 paragraph: 💎 in glyph lists, candidate `· <model @ effort>` suffix, label line `then run on <model @ effort>:`
- [x] `claude/skills/ft-task/step-1.5-model-edge.md`: category list, under-tier note names the pick, cap → `[frontier]`, legacy ask
- [x] `claude/skills/ft-epic-discovery/SKILL.md`: Step 4 model item + filing template placeholders (`.1` / `.N`), Step 7 child cap, Step 8 check, `.1` stub flip placeholder
- [x] `ft-audit` / `ft-audit-repo` / `ft-refactor` filing sentences; `ft-refactor` label-line restatement
- [x] `claude/CAPABILITIES.md` rows 31 / 39 / ledger; `SPEC/procedures/ft-task.md` cue list; `docs/PLATFORMS.md` rows; `docs/GLOSSARY.md` copy-paste line; README quote
- [x] Phase 3: verify commands, drift checks, viz suite, `/code-review medium` on this diff

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers)
- [[CORE-741.2]] — predecessor: frontier-rung contract (`SPEC/model.md` rule this sweep cites)
- [[CORE-741.3]] — predecessor: `docs/PLATFORMS.md` §"Tier × platform map" (the cells this sweep prints); handed off the §"Codex CLI" effort / model-switch rows
- [[CORE-741.5]] — parallel sibling (viz)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** .2 landed the `[frontier]`💎 rung + §"Effort recommendations" rule and .3 landed the map, but no chooser or render site prints a `model @ effort` yet, the edge fragment still says choosers "cap at `[heavy]`", and `/ft-epic-discovery` still caps children at `[heavy]` — the contract and its executors disagree until this sweep lands.

- [x] Read relevant source files — `SPEC/model.md` (whole), `docs/PLATFORMS.md` §"Tier × platform map", `SPEC/post-closure.md` steps 2–3, `claude/skills/ft-task/{preamble,step-1.5-model-edge}.md`, `ft-epic-discovery` Steps 4/7/8, `ft-audit`/`ft-audit-repo`/`ft-refactor` filing sentences, `claude/CAPABILITIES.md`, `SPEC/procedures/ft-task.md`, `codex/skills/*`

- [x] **Best Practices Review** — markdown contract sweep; one boundary call: the print rule (pick from a cell) lives once in `SPEC/model.md` §"Effort recommendations", and post-closure + the gate fragment cite it rather than restating it

- [x] **Archive skim** — CORE-482.4 (xheavy emitter propagation: 13 files) and CORE-489.2 (mirrors it missed) are the binding precedent; .2/.3 notes for handoffs

- [x] **Drift check** — PLAN line matches; drift found and in scope: `step-1.5-model-edge.md:26` "they cap at `[heavy]`" contradicts `SPEC/model.md` (cap is `[frontier]` since .2); `ft-epic-discovery` :204/:224 cap at `[heavy]`; PLATFORMS §"Codex CLI" effort row maps only the trio (.3 handoff). Codex wrappers carry no tier text at all.

- [x] Asked clarifying questions — AskUserQuestion, four answers (see "Resolved scoping")

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Archive skim.** [[CORE-482.4]] set the binding edit shapes: *render sites* get the literal glyph list; *filing-recommendation sites* get an explicit clause rather than a free option. [[CORE-489.2]] / [[CORE-482.N]] show the miss pattern — human mirrors (GLOSSARY, DOGFOOD) and 👇-paragraph glyph lists slipped. Since CORE-724 the skill bodies (`ft-task`, `ft-micro-task`, `ft-close-epic`) defer the next-move print to `SPEC/post-closure.md`, so the render sites shrank to post-closure, CAPABILITIES, PLATFORMS ×3, procedures cue list, GLOSSARY. .2 already landed 💎 in cue-vocabulary, gates, GLOSSARY `[model]` + copy-paste glyph list, AGENT-COMPAT, DOGFOOD. .3 handed off the PLATFORMS §"Codex CLI" effort + model-switch rows.

**Resolved scoping**

| # | Question | Resolution |
|---|---|---|
| 1 | Where does `model @ effort` print? | Candidate line suffix `· <model @ effort>` **and** the label line `<glyph> Clear your session, then run on <model @ effort>:` |
| 2 | Range / alt cells | One concrete pick: primary model, top of the range, `(alt …)` dropped (`Fable @ high–xhigh` → `Fable @ xhigh`) |
| 3 | `/ft-epic-discovery` tokens | Apply the trigger: `.1` of a `[heavy]`/`[frontier]` epic files `[frontier]`; `.N` caps at `[heavy]`; children cap `[frontier]` (trigger-reached) |
| 4 | Step 1.5 ⚠️ note | Names the active platform's map pick for the tagged tier; Grok `[frontier]` keeps the no-frontier ⚠️ and names the switch. Gate stays tier-only. |

**Assumptions (not asked):** the active platform is the one the runner is executing on (Claude Code → Claude column); Cursor/Gemini/other platforms have no map column → no suffix, label line unchanged. A concrete token prints no suffix (the pin already names the model). `[xheavy]` prints no suffix (manual-only; no cell). An `[xheavy]` epic keeps `[xheavy]` on `.1` (operator's deliberate filing outranks the trigger floor); `.N` still caps at `[heavy]`. `ft-release`'s 🧠 re-entry cue is a context reset for the same task, not a model choice — left alone. `ft-file-followup` Step 3 defers wholly to `SPEC/model.md` — no change.

**Budget headroom.** `ft-epic-discovery/SKILL.md` 32,302 / 33,000; `SPEC/procedures/ft-task.md` 33,800 / 34,200; `post-closure.md` 7,787 / 10,000; `preamble.md` untouched.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-482.4's two shapes: render sites get the literal glyph list (now with 💎) plus the pick; filing-recommendation sites get a "`[frontier]`💎 only on a trigger" clause beside the kept `[xheavy]` exclusion

- [x] **Minimal refactor gate** — no refactor; one paragraph in `ft-refactor` re-wrapped only because the lengthened label line overran it

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (prose contract; no parser or tooling reads these sentences)

**Implementation Notes:**

- `SPEC/model.md` §"Effort recommendations": new **Printing a cell** bullet — the one owner of the pick rule (primary model, top of range, `(alt …)` dropped, ⚠️ kept; no pick for `[xheavy]`, concrete tokens, unmapped platforms).
- `SPEC/post-closure.md`: step 2 label list + prose gain `[frontier]💎` / "high-stakes"; candidates end `· <model @ effort>` (examples updated); step 3 label line `<glyph> Clear your session, then run on <model @ effort>:` with the no-pick fallback `then run:`; 👇 paragraph glyph list + "and pick".
- `claude/skills/ft-task/step-1.5-model-edge.md`: category list; under-tier example is now `[frontier]` on opus naming `Fable @ xhigh`, plus a paragraph telling the branch to Read the map and print the pick (⚠️ cell keeps its switch advice; no pick → generic wording; gate stays tier-only); xheavy paragraph cap `[heavy]`→`[frontier]` (stale since .2); legacy ask offers `[frontier]` only on a trigger.
- `claude/skills/ft-epic-discovery/SKILL.md` (32,302 → 32,595 / 33,000): Step 4 model item defines `<.1-model>` / `<.N-model>` (`[heavy]`/`[frontier]` epic → `.1` `[frontier]`; `.N` caps `[heavy]`); filing template + `.1` stub-flip placeholders; Step 7 cap `[frontier]`, trigger-only; Step 8 check.
- `ft-audit`, `ft-audit-repo`, `ft-refactor`: `[frontier]💎` trigger clause; `ft-refactor` label-line restatement.
- Mirrors: `claude/CAPABILITIES.md` effort row / `/model` row / ledger; `SPEC/procedures/ft-task.md` cue list (+5 bytes, 33,805 / 34,200); `docs/PLATFORMS.md` Grok + Codex effort rows (route through the map; .3 handoff) and Grok / Codex / Cursor model-switch rows (Cursor: 💎, explicitly no pick — no map column); `docs/GLOSSARY.md` copy-paste line; README cue quote.
- Codex wrappers: no tier text anywhere under `codex/` — they route to the canonical bodies, so they inherit this sweep with no edit.
- Downstream-impact: the print rule is a new contract sentence inside the epic's own scope (.2's §"Effort recommendations" anticipated it); [[CORE-741.5]] (viz) and [[CORE-741.N]] unaffected by it → no reconcile action.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (no viz change; regression guard)

- [x] Ran lint/type-check on changed code — N/A (markdown only); `tools/drift-checks.sh` covers the markdown contract checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after review fixes):
- A1 `grep -q 'Printing a cell' SPEC/model.md` → 0
- A2 `grep -c '💎' SPEC/post-closure.md` → 3; `grep -q 'then run on <model @ effort>:'` → 0
- A3 `grep -c frontier step-1.5-model-edge.md` → 6; `! grep -q 'cap at [heavy]'` → 0
- A4 `! grep -q 'capped at [heavy]\|no heavier than [heavy]' ft-epic-discovery/SKILL.md` → 0
- A5 `grep -l '[frontier]💎'` over the three skills → 3
- A6 residual 🔭-without-💎 grep → only `docs/PLATFORMS.md:431` (`[xheavy]` map row, correct); stale `then run:` label grep → none
- A7 `grep -rlE 'heavy]|xheavy|🧠' codex/` → exit 1 (no matches)
- A8 `bash tools/drift-checks.sh` → 0 (`ft-epic-discovery` 32,663 / 33,000; procedures 33,842 / 34,200)
- A9 `npm --prefix viz test` → 0 (587/587)
- trailing whitespace over changed files → none

External review (`/code-review medium`, working-tree diff) — 10 findings; Phase 2 fixes applied, Phase 3 verification re-run from the top:
1. **blocker** — under-tier note always said `/model` though the pick is often the same model at higher effort. Fixed: "change model and/or effort"; effort-only case named.
2. **blocker** — Grok ⚠️ cell names no switch; the fragment claimed it did. Fixed: the fragment adds the map note's switch in prose (worked example).
3. **blocker** — "Printing a cell" left ⚠️ cell print extent open. Fixed: prints `⚠️ <model @ effort>`, trailing note dropped, switch only in prose.
4. **blocker** — "always top of range" vs "upper end when in doubt". Fixed: the bullet says a one-line pick cannot weigh doubt, so it always takes the upper end (reconciles with the bullet above).
5. **blocker** — `[frontier]` epic child seed undefined vs "never by seed". Fixed: a `[frontier]` or `[xheavy]` epic seeds `[heavy]`.
6. **blocker** — `CAPABILITIES.md` `/clear` row quoted the old label. Fixed.
7. **note** — post-closure duty summaries in `ft-task` / `ft-micro-task` / `ft-close-epic` / `ft-epic-discovery` / `SPEC/procedures/ft-task.md` omitted the pick. Fixed (extra touched paths).
8. **blocker** — concrete / `[xheavy]` epic `.1` case unstated. Fixed: "a concrete or `[xheavy]` token stays as filed" (a pin outranks the trigger, per §"Pinning a named model").
9. **blocker** — `ft-release` claims the canonical cue but hard-coded `then run:`. Fixed: label now `then run on <model @ effort>:` (reverses the Discovery assumption to leave it alone).
10. **blocker** — GLOSSARY lacked the no-pick `then run:` fallback; README line overran the wrap. Fixed both.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md, docs/PLATFORMS.md, claude/CAPABILITIES.md: updated (this diff). AGENTS, SPEC.md (§"Model field" already names the `model @ effort` rule as the module's), MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY (new model.md examples fall under row 52's "specific models as examples"), AGENT-COMPAT (`FRONTIER` landed in .2), EXTERNAL-AGENTS (no chooser-cap or label row), WORKTREES, VISION: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Taught every chooser and render site the `[frontier]`💎 rung and the tier × platform map. Next-move candidates now end `· <model @ effort>` and the copy-paste label reads `<glyph> Clear your session, then run on <model @ effort>:` (falls back to `then run:` with no pick). The one print rule — primary model, top of range, `(alt …)` dropped, ⚠️ cells as `⚠️ <pick>` — lives in `SPEC/model.md` §"Effort recommendations". The Step 1.5 under-tier note names the platform's pick (effort vs `/model` distinguished; Grok frontier names the platform switch); the stale `[heavy]` chooser cap is now `[frontier]`. `/ft-epic-discovery` files `.1` `[frontier]` for a `[heavy]`/`[frontier]` epic, caps `.N` at `[heavy]`, and caps children at `[frontier]` by trigger only. `ft-audit` / `ft-audit-repo` / `ft-refactor` offer `[frontier]💎` on a trigger. Mirrors updated: CAPABILITIES, PLATFORMS (Grok/Codex effort + model-switch rows, Cursor with no pick), GLOSSARY, README, procedures, `ft-release`. Codex wrappers carry no tier text and inherit the change. Verification: drift checks 0, viz 587/587, all nine Acceptance commands pass; review 9 blockers + 1 note, all fixed. `touches:` reconciliation: declared 12; actual adds `claude/skills/{ft-task,ft-micro-task,ft-close-epic,ft-release}/SKILL.md` (review findings 7 and 9). Maintainability: one rule owner in `SPEC/model.md`; every other site cites it.

**Archived:** 2026-10-08
