---
title: gate-tiering-cold-start discovery
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-604, CORE-EPIC-535, CORE-EPIC-558, CORE-555, CORE-595]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-604.1 | gate-tiering-cold-start discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-604]]

## 🎯 Goal

Scope the `CORE-EPIC-604` epic (`gate-tiering-cold-start`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-604.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (always-loaded vs lazy surfaces with byte measurements, the flag-posture sections of `SPEC/gates.md`, runner / command-stub / `model.md` trim targets, rotation bound, CONTEXT-BUDGET ledger, adopter paste-block citations) — captured in Discovery Notes — `judgment`
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes — `judgment`
- [x] Concrete child scopes for CORE-604.2 .. CORE-604.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds") — `grep -c 'CORE-604\.[234]' .flowtron/PLAN.md` → 3, plus per-line `wc -w` (58 / 51 / 63; all under the cap, two over the target — reason in Implementation Notes)
- [x] Audit line CORE-604.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift) — `grep -q 'CORE-604.N' .flowtron/PLAN.md`
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children) — `judgment`

## 🧩 Subtasks

- [ ] Inventory shared design surface (always-loaded vs lazy files with sizes, gates.md section map, runner / stub / model.md trim targets, rotation bound, ledger, paste-block citations) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents (CORE-535.*, CORE-555, CORE-558.*, CORE-595) — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (new module name, `.3` bundle, who performs the flowtron `## Completed` rotation, ledger-sum placement) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-604.2 .. CORE-604.4; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-604 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-604]] — parent epic
- [[CORE-EPIC-535]] — predecessor: context-load-diet (2026-09-06/07); measured ~70k at Phase 1 and split SPEC.md / gates.md; this epic is the next motion on the same problem
- [[CORE-535.5]] — precedent: extracted `cue-vocabulary.md` + `gate-discipline.md` out of `gates.md`; `.2` repeats that motion for the flag-posture material
- [[CORE-EPIC-558]] — precedent and warning: post-shrink fidelity restores after CORE-535.3 / .4 over-trimmed; `.N` reuses its moved-line classification method
- [[CORE-555]] — related-decision: instruction clarity outranks byte discipline; bounds what `.3` may cut
- [[CORE-595]] — precedent: split `tasknote-selection.md` into `plan-filing.md`; `.4` edits the rotation bound that landed there

## 🌳 Fan-out

- **Parallel:** [[CORE-604.4]] with [[CORE-604.2]] — the rotation bound, the rotation itself, and the ledger sum touch `SPEC/plan-filing.md`, `.flowtron/PLAN.md` / `PLAN-ARCHIVE.md`, the runners' Step 1 advisory line, and `docs/CONTEXT-BUDGET.md`; `.2` touches none of those beyond one CONTEXT-BUDGET row, which is a trivial merge
- **Sequential:** [[CORE-604.3]] after [[CORE-604.2]] — `.3`'s fold into `unattended-mode.md` and its stub trim cite the module `.2` creates
- **Synthesis:** [[CORE-604.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator asked, in a read-only discovery session, whether the ~70k-token base prompt at `/ft-task` start is too much and what load-path change (not a workflow rewrite) fixes it, with an external review's "constitution + INDEX" proposal as a hypothesis to attack. Measurement (§A) shows the 70k is roughly 30k host + 40k flowtron, and that flowtron's share is dominated not by `SPEC.md` but by two "lazy" modules that arrive on nearly every run. The operator confirmed the epic scope after the report; no constitution split, no INDEX file.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown contract + skill prose, no code module boundaries. The governing boundary is already locked and applies to every child: cite-don't-restate ([[CORE-535.4]]) and instruction clarity outranks bytes ([[CORE-555]]); `.N` re-verifies both the [[CORE-558]] way.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — four structured asks (Step 2 inputs + three scoping questions), answers in §E

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable) — `touches:` omitted: Discovery child, deliverable is a `PLAN.md` filing

**Discovery Notes:**

### A. Measured surfaces (bytes at HEAD `075530a`, v5.28.0; tokens ≈ chars/4, estimate)

Always Read on a flagless `/ft-task <ID>` before Phase 1 writes (self-host):

| Surface | Chars | Loaded at |
|---|---|---|
| `claude/commands/ft-task.md` | 4,709 | slash dispatch |
| `claude/skills/ft-task/SKILL.md` | 27,389 | Skill tool |
| `SPEC.md` | 52,993 | Step 0 ("always loaded core") |
| `.flowtron/PLAN.md` | 16,140 | Step 1 (145 `## Completed` rows; adopter band ~2–3k) |
| `.flowtron/tasknote/README.md` | 8,816 | Step 2 |
| `templates/tasknote-template.md` | 5,173 | Step 3b |
| **Sum** | **115,220** | **≈ 29k tokens** |

Declared lazy, near-universal in practice:

| Surface | Chars | Why it arrives |
|---|---|---|
| `SPEC/gates.md` | 35,910 | Step 4 routes to §"Phase 1→2 exit gate" as the authoritative judgment rule; Step 6 to §"Conditional skip rule" |
| `SPEC/plan-filing.md` | 15,229 | Phase 4 cites §"`## Completed` archive convention" for placement, though `SPEC.md` states the rule inline |
| `SPEC/epic.md` | 6,127 | any `.<sub>` ID |
| **Sum** | **57,266** | **≈ 14k tokens** |

Plain flagless task through closure ≈ 172k chars ≈ 43k tokens (adopter with 3k PLAN.md ≈ 159k / 40k). Host baseline from this session's own prompt (tool schemas ~38k chars, skills roster ~22k with the Cloudflare plugin listed twice, global CLAUDE.md ~15k incl. the port registry, flowtron CLAUDE.md 6.75k, MCP + deferred-tool text ~11k, memory 2k) ≈ 100–115k chars ≈ 25–30k tokens. Operator confirmed the 70k is read at `/ft-task` start, so it is host + flowtron; the split stands.

**Where the fat is.** `SPEC/gates.md` on the default flagless path needs ≈ 3k (skip/fire lists + privileged-ops globs). The remaining ≈ 17.4k is flag-posture material needed only when a flag or the `[unattended]` row marker is set: §"Flag precedence and surface matrix" (4,459) and the run from §"`--fast` operator override" through §"`/ft-close-epic` under the posture" (12,975, of which the `--fast` override is 2,985 and the `--unattended` posture ≈ 9,990). Archive evidence: `--fast` markers appear in 16 of 948 archived notes across all areas (6 of the last 40 `core` notes), so the split pays on ≈ 85% of runs. `SPEC/model.md` (16,984) is read whenever the tier is uncertain; only §"Category-vs-concrete matching" (4,080) serves Step 1.5 — the calibration table (2,815) and practical guidance (3,667) name dated models (Grok 4.6, Haiku 4.5, Gemini, GPT-5) and belong in docs. Runner bodies carry per-step `unattended-mode = true` branch clauses (5 literal in `ft-task`, 4 in `ft-micro-task`, plus prose variants) whose executable content already lives in `unattended-mode.md` §"Conversion map". `claude/commands/ft-task.md` (4,709) restates the flag semantics the SKILL.md description and Step 0 already carry.

Trend since the diet: `SPEC.md` 74,392 (v5.24.0) → 49,002 (v5.25.0) → 52,993 (v5.28.0); `gates.md` 51,850 → 34,866 → 35,910. Regrowth ≈ 1.3k/release on `SPEC.md`.

### B. Archive skim (load-bearing precedents; counts by path grep, hits read selectively per the probe clause)

Path-grep hit counts over `archive/core/` (2026-09-18): `SPEC/gates.md` 138 · `claude/skills/ft-task/SKILL.md` 106 · `SPEC/model.md` 92 · `docs/CONTEXT-BUDGET.md` 63 · `claude/skills/ft-micro-task/SKILL.md` 38 · `claude/skills/ft-task/unattended-mode.md` 20 · `claude/commands/ft-task.md` 17 · `SPEC/plan-filing.md` 11. Far past the probe line, so the cohort that decides this epic was read instead of every hit:

- [[CORE-535.1]] (2026-09-06) — measured this exact question: ~70k at Phase 1, ~35–40k flowtron-owned, ~30k harness; noted `.claude/rules/` and subagent probes; filed the diet. Its §E3 lazy-load candidates in `SPEC.md` were executed by `.3`; its §E5 gates.md tail by `.5`.
- [[CORE-535.5]] — extracted `cue-vocabulary.md` + `gate-discipline.md` out of `gates.md` (51,809 → 32,299). The flag-posture material was left in place. `.2` of this epic repeats the motion for that material.
- [[CORE-535.3]] / [[CORE-558.2]] — ten `SPEC.md` sections → six lazy modules; three (Cross-repo remit, Loop tasks, What flowtron does NOT provide) were reduced to bare pointers and had to be restored as real losses. **Lesson binding every child:** move rationale and flag-conditional machinery, never an operative rule that fires before any module load; leave stub headings behind so citations resolve.
- [[CORE-535.4]] / [[CORE-558.4]] — cite-don't-restate on the runners, then restores of over-trimmed skill-local imperatives via a citation validator + deleted-sentence classifier. `.N` reuses both instruments.
- [[CORE-555]] / [[CORE-558.5]] — budgets raised to operating ceilings (`SPEC.md` 57k, `gates.md` 40k, skills 33k); "instruction clarity outranks byte discipline" is an operator decision, not a preference.
- [[CORE-595]] — split `tasknote-selection.md` into `plan-filing.md`; the rotation bound `.4` lowers lives there.
- [[CORE-393]] — the incident a thinner hub would recreate: a ticket to re-add the Phase 4 chip flip reached a full tasknote because nobody reread §"Tasknote body shape". Fixed by a one-line "why" at both the body-shape bullet and the Phase 4 checklist. Rules with that shape stay in `SPEC.md`.
- [[CORE-574.2]] — the CI `drift` job runs `wc -c` against the Budgets table on every push; a ledger sum line in `.4` is a hand-refreshed ledger row, not a new budget and not a new script.

### C. Drift check

- All paths and section headings cited in §A exist at HEAD (`wc -c` and heading maps run 2026-09-18). `SPEC/gates.md` section boundaries verified by heading scan; posture sections sized directly.
- `docs/CONTEXT-BUDGET.md` §"Always loaded to run one task" omits `claude/commands/ft-task.md` and `SPEC/epic.md`, and lists `gates.md` / `plan-filing.md` as lazy while calling them near-universal in prose — consistent with §A, not contradicted by it. `.4` adds the sum line rather than reclassifying rows.
- The adopter paste-block (`claude/AGENTS-snippet.md`) cites `SPEC/gates.md` §"`--unattended` operator posture" and `SPEC/model.md` §"Model field". Adopters copy the block; no tooling re-syncs it (`tools/update-adopters.mjs` and `/ft-update` never touch `AGENTS.md`). **Constraint on `.2` / `.3`:** every moved section leaves a stub heading in its old file so copied citations still resolve; the snippet is updated in the same commit for new adopters.
- `SPEC/scope-boundaries.md` check: no child adds a validator, query layer, script, or generated second SPEC. The CI byte check pre-exists ([[CORE-574.2]]).
- Open `PLAN.md` sections were empty before this filing; no downstream-impact targets exist.

### D. What this epic deliberately does not do

- No constitution cut of `SPEC.md` to 8–12k and no `SPEC/INDEX.md`: every `SPEC/*.md` already self-declares its load-when on line 3, the runner's Step 0 lists the lazy set per step, and `docs/CONTEXT-BUDGET.md` is the ledger. A fourth map drifts ([[CORE-465]] lesson).
- No removal of the `SPEC.md` Read from the runners: Phase 4 tick-through, scope reconciliation, post-closure forms and the paper-complete guard are cited, not restated, by the skill, and contract-only agents (Codex/Cursor/Grok) run from `SPEC.md` + the procedure SOP.
- No load tiers keyed to `[light]`/`[heavy]`: the tag classifies the work, not the shape; the micro/full runner split is already the tier.
- No budget raise; no RAG; no compiled `CORE.md`.
- A `SPEC.md` rationale trim (≈ 9–12k of essays whose one-line "why" would stay beside each rule) is deferred to a separate follow-up after `.N` re-measures.

### E. Resolved scoping (AskUserQuestion, 2026-09-18)

| Question | Decision |
|---|---|
| Epic inputs | `CORE-EPIC-604` · `gate-tiering-cold-start` · High · `[heavy]` parent and `.1` / `.N`; M=3 + `.N` audit. Child tags per the report's sketch: `.2` `[heavy]`, `.3` `[medium]`, `.4` `[light]` |
| New module name | `SPEC/gate-postures.md` — matches the contract's own "operator override" / "operator posture" vocabulary |
| Flowtron's own `## Completed` rotation | Performed inside `.4` after the bound is lowered to 60, month blocks confirmed by the operator before the move |
| `model.md` calibration table | Moves to `docs/PLATFORMS.md`; Haiku dropped (unused); tier ladder summarized in `SPEC.md` §"Model field" |
| Host-side pruning + port registry | Outside this epic. Port registry filed as natabula `NAT-281` (`fdf09de`, local). Host profile edits await the operator's own read of the two settings files, which the path guard blocks for agents |
| Measurement point | Operator reads the 70k at `/ft-task` start, so host + flowtron; attribution in §A stands |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the epic-cohort filing pattern (CORE-EPIC-535 / CORE-EPIC-558 children: 2-space indent under the parent, `[model]` on every line, ` — ` separator, per-child description under the 70w cap); no new shape

- [x] **Minimal refactor gate** — `N/A` — pure `PLAN.md` filing; nothing refactored

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` — no executable surface

**Implementation Notes:**

- Wrote 3 child lines (`CORE-604.2` `[heavy]`, `.3` `[medium]`, `.4` `[light]`) between the `.1` and `.N` rows; M unchanged from the filing-time estimate of 3. Word counts after the separator: `.2` 58 · `.3` 51 · `.4` 63 — all under the 70w cap, `.2` and `.4` over the 50w target because each names the surfaces it fans across (accepted; the surfaces are the scope).
- Downstream-impact scan: no downstream impact — the open sections held nothing before this epic.
- `[unattended]` candidacy (`SPEC/unattended-candidacy.md` §"Candidacy predicate"): rows proposed **none**. `.2` and `.N` fail clause 1 (`[heavy]`); `.3` fails clause 6 (Fan-out predecessor `.2` neither `- [x]` nor proposed); `.4` fails clause 3 (keyword screen: "operator-confirmed"). No review prompt fired.
- Fan-out filled from the scoping: `.4` parallel with `.2`; `.3` sequential after `.2`; `.N` synthesis.
- `.N` audit line reviewed and kept as filed; its Discovery should reuse the [[CORE-558.2]] / [[CORE-558.4]] instruments (citation validator + deleted-sentence classifier) over the moved posture material and the trimmed runner bodies, and re-measure §A.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown filing only

- [x] Ran lint/type-check on changed code — `N/A` — markdown filing only

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A` — no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the `## High` block: 2-space child indent on all five child rows; bold IDs intact; `[model]` on every row; no `[unattended]` token on any row (none confirmed); `| shortname` ≤ 30 chars on every row (`gate-tiering-cold-start discovery` is the longest at 33 — the skill's own `<shortname> discovery` / `audit` convention, matching the CORE-535 / CORE-558 precedent rows); ` — ` separator consistent; no trailing whitespace; blank line restored between the cohort and `## Medium`; `## 🌳 Fan-out` wikilinks match the filed IDs.

```text
grep -c 'CORE-604\.[234]' .flowtron/PLAN.md → 0   (output 3)
grep -q 'CORE-604.N' .flowtron/PLAN.md      → 0
grep -n ' $' .flowtron/PLAN.md               → 1   (no trailing whitespace)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change (the paste-block citation into `SPEC/gates.md` §"`--unattended` operator posture" is a `.2` deliverable, recorded there) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change (receives the calibration table in `.3`) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (the unattended posture moves file in `.2`; its citations are `.2`'s sweep) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change. Pure Discovery filing: no contract surface edited.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed `CORE-EPIC-604` (`gate-tiering-cold-start`) and closed its Discovery. The
operator's 70k-token `/ft-task` cold start is roughly 30k host + 40k flowtron,
and flowtron's share is driven by two "lazy" modules that arrive on nearly every
run (`SPEC/gates.md` 35.9k, `SPEC/plan-filing.md` 15.2k), not by `SPEC.md`. The
external review's constitution + INDEX proposal was measured and declined on
the CORE-558 evidence; the epic instead tiers gates.md's ≈ 17.4k of flag-posture
material into `SPEC/gate-postures.md` (`.2`), trims the runner / command-stub /
`model.md` surfaces without removing an operative imperative (`.3`), and lowers
the `## Completed` rotation bound to 60 with the first rotation and a ledger
sum line (`.4`). Expected band after the epic: flowtron ≈ 172k → ≈ 129k chars
on a flagless self-host task (≈ 43k → ≈ 32k tokens), ≈ 116k once flowtron's own
PLAN.md is rotated. Companion filings outside this repo: natabula `NAT-281`
(port registry out of the global CLAUDE.md, committed `fdf09de`, local).

- Files: `.flowtron/PLAN.md` (+6 rows under `## High`, `.1` flipped to stub), this tasknote scaffolded → archived.
- Verification: `grep -c 'CORE-604\.[234]'` → 3; `grep -q 'CORE-604.N'` → 0; word counts 58 / 51 / 63; no trailing whitespace.
- Refactors: none. Documentation verdict: 18 × "no change".
- `touches:` reconciliation: `N/A — no file deliverable` (Discovery child; PLAN.md filing only).
- Maintainability effect: the epic's children each carry a fidelity guard (stub headings left behind, cite-don't-restate, `.N` reuses the CORE-558 instruments), so the byte cut cannot silently repeat the CORE-535.3 / .4 losses.

**Archived:** 2026-09-18
