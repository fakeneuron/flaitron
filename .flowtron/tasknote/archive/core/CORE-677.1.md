---
title: codex-flowtron discovery
status: completed
tags: []
created: 2026-10-01
due:
related-tasks: [CORE-EPIC-677, CORE-439, CORE-258, CORE-670.3, CORE-675]
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

# CORE-677.1 | codex-flowtron discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-677]] · 🔗 [[CORE-439]] · 🔗 [[CORE-258]] · 🔗 [[CORE-670.3]] · 🔗 [[CORE-675]]

## 🎯 Goal

Scope CORE-EPIC-677 before implementation starts; deliver concrete CORE-677.2–.4 scopes in .flowtron/PLAN.md with a bounded verification protocol and terminal audit.

## ✅ Acceptance

- [x] Shared surface inventoried (installation, wrappers, SOP, contracts, templates, adopter wiring, and existing verification) — judgment: Discovery Notes distinguish observed defects from untested hypotheses.
- [x] Scoping decisions resolved with the user — judgment: Resolved scoping table records the proposed inputs and the user's authorization.
- [x] CORE-677.2–.4 filed under CORE-EPIC-677, each description ≤50 words and shortname ≤30 characters — Python filing check recorded in Testing Notes.
- [x] CORE-677.N reviewed with the fixed per-entry doc-drift sweep — judgment: audit row matches the refined scope.
- [x] Phase 4 doc-drift sweep records a verdict for every declared AI-referenced doc — judgment: filing alone makes no compatibility or implementation claim.

## 🧩 Subtasks

- [x] Inventory source, installation, and validation surfaces; record direct observations.
- [x] Skim relevant core archives and check cited paths, policy, and compatibility claims.
- [x] Resolve area, ID, priority, model, child count, and comparison boundaries with the user.
- [x] Draft three child descriptions and establish sequential dependencies.
- [x] Phase 2: file child rows and scan the remaining active PLAN for downstream impact and unattended candidacy.
- [x] Phase 3: verify row grammar, description lengths, cross-references, indentation, and whitespace.
- [x] Phase 4: doc-drift sweep, Acceptance tick-through, .1 closure/archive, and atomic filing commit.

## 🔗 Related

- [[CORE-EPIC-677]] — parent epic; installation, behavior, and bounded comparison.
- [[CORE-439]] — repo-scoped installation policy and global duplicate/collision precedent.
- [[CORE-258]] — first Codex live dogfood; conversational resume predates native skill-bundle verification.
- [[CORE-670.3]] — SOP routes debug mode to the existing lazy fragment rather than duplicating it.
- [[CORE-675]] — recent SOP Learnings parity fix; targeted correction did not bump its verification stamp.

## 🌳 Fan-out

- **Sequential:** [[CORE-677.2]] after [[CORE-677.1]]; [[CORE-677.3]] after [[CORE-677.2]]; [[CORE-677.4]] after [[CORE-677.3]].
- **Synthesis:** [[CORE-677.N]] after all implementation children (terminal audit).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The user requested a Codex verification epic. Installed inventory drift is observed; shipped static parity alone does not prove live skill adherence.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### Shared design surface

| Surface | Responsibility / child |
|---|---|
| `codex/skills/*/SKILL.md`, `codex/AGENTS-snippet.md` | All 12 shipped wrappers, translation rules, self/adopter installation; .2/.3 |
| Local `.agents/skills/`, user `~/.agents/skills/` | Actual discovery, missing/retired links, duplicate/platform collision exposure; .2 |
| `claude/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/MIGRATION.md` | Canonical adopter roster, derived Codex/Grok wiring, migration instructions; .2/.3 |
| `SPEC/procedures/ft-task.md`, `SPEC/procedures/README.md`, canonical `claude/skills/` bodies/fragments | SOP-first route versus canonical skill route; currency and mode/phase parity; .3 |
| `SPEC.md`, `SPEC/{epic,model,gates,gate-postures,blocked,post-closure}.md`, tasknote template | Model checks, four-phase order, modes, gates, receipts, archive/atomic closure; .3/.4 |
| `docs/{PLATFORMS,AGENT-COMPAT,DOGFOOD}.md` | Installed-surface policy, observed capability claims, report-only dogfood and evidence-qualified stamps; .3/.4 |
| `.github/workflows/ci.yml`, release standing checks, updater wiring consumer | Existing flag/inventory/roster checks; declaration checks do not prove fresh runtime discovery; .2/.3 |
| Proposed `docs/CODEX-VERIFICATION.md` | Durable reproduction steps, installed inventory receipts, behavior matrix, bounded comparison results; .2 establishes it, .3/.4 extend it |

Implementation keeps the existing thin-wrapper / canonical-body / neutral-SOP architecture. No second skill inventory, new workflow runtime, benchmark service, or per-agent copy of the full contract. Templates change only if a reproduced contract defect requires it. Self-host full inventory and adopter subset remain distinct.

### Observations and limits

- Initial `git status --short` was empty. No repo-scoped `.agents/skills/` exists in this checkout. This session's Flowtron skills come from the global links shown in its catalog, not a verified self-host install.
- Shipped inventories each contain 12 skills. An inline Python check asserted slug parity, frontmatter names, relative wrapper target existence, and description-flag parity: exit 0. This is a static routing check, not a runtime invocation result.
- User inventory has ten working Flowtron links, eight broken links, and lacks shipped `ft-refactor` and `ft-seed`. Broken names: `ft-audit-context`, `ft-flowtron`, `ft-goal-task`, `ft-spec`, `ft-starter-task`, `ft-stats`, `ft-worktree-end`, `ft-worktree-start`. Retired targets must be verified before link removal; unrelated user skills are outside repair scope.
- `codex --version` reported `codex-cli 0.159.2`; both Codex and Grok executables resolve locally. No fresh child CLI session, authentication test, model enumeration, or Grok workflow was run in Discovery. The current session is Codex/GPT-6; app-session observations are not automatically CLI observations.
- The async multiple-choice question tool is available and returned `accepted: true`; the user subsequently replied "proceed as you see best fit." This supports capability-aware question handling in this session, not a claim about every CLI surface or visual rendering. `codex/AGENTS-snippet.md` already makes the prose fallback conditional; `docs/PLATFORMS.md`'s broader structured-ask description needs review, not a second translation implementation.
- [Official OpenAI skill guidance](https://learn.chatgpt.com/docs/build-skills) was consulted on 2026-10-01: repo/user `.agents/skills` discovery and symlink support align with the wiring instructions. The separately approved docs-MCP install succeeded; its tools require a session restart and were unavailable here, so web documentation was the fallback. No model pricing/performance claim is inferred.
- Current compatibility stamps say `v5.33.0 · 2026-09-23 (dogfooded)`. They remain as-filed: Discovery neither invalidates the past run nor substitutes a new qualifying dogfood receipt. Historical first-use documentation described conversational Codex consumption before a native bundle; live tests must name exactly what they invoke.

### Archive skim and drift

Archive area was looked up in `.flowtron/tasknote/README.md`: `CORE-*` → `archive/core/`. Targeted archive searches and reads surfaced CORE-439 (one repo-scoped install; duplicate/global collision failure), CORE-258 (actual Codex resume/cue observations and their narrow limits), CORE-670.3 (load existing debug fragment; route rather than copy), and CORE-675 (missing SOP Learnings item repaired without a full currency re-check). CORE-603.3 corroborates `ft-audit-context` retirement.

Paths resolve at the current checkout. Root `SPEC.md` is v5.33.0. Policy explicitly forbids globally installing the tasknote family and self-only release skill, while this machine still has those links: installed drift, not a missing shipped port. The SOP stamp is `v5.27.0 · 2026-09-12`; later fixes exist, so .3 must do a full watched-surface re-check before changing that stamp. Existing tests are scoped declarations/flag checks, not live lifecycle tests. No implementation root cause beyond installed drift is claimed.

**Best Practices Review:** N/A for the current pure filing. Child architecture follows established dependency direction: wrappers route to SOP/canonical bodies; translation rules stay centralized; tests and docs refer to the same contract. No in-Discovery refactor.

### Resolved scoping

| Decision | Resolution |
|---|---|
| Area / ID / title | CORE-EPIC-677 / `codex-flowtron`; suffix 677 rechecked against PLAN and core archive |
| Priority / model | Medium / `[heavy]` on every new row; cross-surface verification and empirical test design warrant the tier |
| Child count / audit | Three implementation children (.2–.4), terminal .N audit retained |
| User confirmation | Proposed together with ID and scopes in the prior turn; user: "proceed as you see best fit" |
| Gate authorization | The prior concrete scope review included filing these children; user's go authorizes Phase 2 without a repeat confirmation. No further scoping clarification needed |
| Installation repair | .2 handles self-host full inventory and isolated adopter-subset check; home writes require normal filesystem escalation; no unrelated global cleanup |
| Evidence boundaries | Static parity, current-session capability, fresh CLI discovery, and lifecycle behavior reported separately |
| A/B | Codex wrapper vs direct neutral SOP at the same model/effort, then Grok Build baseline on identical clean fixtures; cross-provider results do not isolate model from harness effects |
| Sequence / scope | .2 → .3 → .4; no parallel dispatch. Changes justified by observed failures; larger fixes get scoped follow-ups |
| Deep mode / markers | Default Discovery, no `--deep`; no unattended tokens proposed because every new row is `[heavy]` |

### Child Acceptance seeds

- **CORE-677.2:** establish `docs/CODEX-VERIFICATION.md`; record before/after link targets and fresh-session roster; verify all 12 self-host wrappers and the derived adopter subset in an isolated pinned layout; record duplicate/global scope handling and preserved unrelated skills. A symlink inventory alone cannot decide fresh discovery. If a runtime cannot be started, record the precise blocker and retain an open verification obligation.
- **CORE-677.3:** matrix covering every exported skill's route, applicable/unsupported flags, lazy fragments, and expected self-host/adopter applicability. Exercise representative .2-discovered routes in disposable fixtures: entry/model checks, clarification fallback, phase order, `--fast`, `--unattended`, `--debug`, `--loop`, receipt/review duties, archive/atomic closure, and epic filing/audit boundaries. Report tested versus static-only cells; fix reproduced drift and re-run its deciding check. Full SOP currency check uses both `source:` and `restates:` per `SPEC/procedures/README.md`; no stamp bump for a targeted patch alone.
- **CORE-677.4:** at most two initial scenarios across three routes (six isolated runs): (A) a small change with a meaningful verification command and complete closure; (B) a seeded scope deviation requiring an attended gate or an unattended park. Codex wrapper and direct-SOP control share model/effort/mode; Grok baseline uses the same fixture revision, acceptance, and mode, with model/effort recorded. Keep prompts, invocation provenance, command exit receipts, session artifacts/diff/commit paths, stops, elapsed time and token usage only where supplied. A single run per cell is conformance evidence, not a statistically established model ranking. Re-run only a failure/uncertainty that needs resolution. Gate cases require genuine replies or documented parks, never simulated operator assent. Keep execution fixtures outside this real PLAN and don't merge their closure commits. Obtain a separate report-only DOGFOOD receipt when refreshing compatibility is desired; end-to-end fixture runs cannot masquerade as that procedure.
- **CORE-677.N:** audit every claimed result against raw evidence, verify remaining failures are fixed or filed with dependencies, and sweep each AI-referenced doc. Preserve report-only dogfood boundaries and stamp authority. Parent closure only after implementation children close.

Pure Discovery has no non-workflow file deliverable: `touches:` omitted under SPEC's filing exemption. Phase 1 scope and Acceptance are populated from the approved proposal; no new clarifications needed.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: pure PLAN filing; no executable surface changed

**Implementation Notes:**

Filed three implementation rows (.2–.4) between .1 and the terminal .N. Count M remains 3. Refined the parent around installation, behavior, and comparison, and .N around evidence/claim review and the mandatory per-entry doc-drift sweep. Every row keeps `[heavy]`; child titles stay within 30 characters. Shortened the epic label to `codex-flowtron` so its Discovery suffix also fits that limit. Description counts (whitespace-delimited): CORE-EPIC-677: 36, CORE-677.1: 9, CORE-677.2: 39, CORE-677.3: 40, CORE-677.4: 43, CORE-677.N: 32. All are ≤50w target / 70w hard cap.

**Pattern survey:** extended existing two-space epic cohort nesting, one shared model tier, numeric implementation children, terminal .N, and optional sequential Fan-out. No parallel dispatch or child tasknote scaffold in Discovery. Child Acceptance seeds remain in Discovery Notes for later scaffold.

**Minimal refactor gate:** N/A — no source/contract implementation in this filing.

**Downstream-impact scan:** enumerated the rest of the active PLAN (CORE-660, CORE-641, CORE-676). CORE-676 shares `docs/PLATFORMS.md`: Unaffected / Leave, since .3 explicitly excludes its Grok model/effort calibration refresh. CORE-660's blocked decay-window premise remains unchanged; no progress count or threshold invented. CORE-641 shares no implementation surface. No downstream impact requiring a reconcile edit or further confirmation; all existing rows preserved byte-for-byte.

**Unattended candidacy:** .2, .3, .4, and .N each fail clause 1 (`[heavy]`); parent and .1 excluded by construction. No candidates, no proposals, no tokens written. Fan-out is sequential and .N synthesis; no parallel row applies.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: pure filing; targeted row assertions passed.
- [x] Ran lint/type-check on changed code — N/A: Markdown only; grammar and whitespace checks passed.
- [x] **Verification receipt** — commands/results below; source-structure checks N/A because no code changed.
- [x] **External review** — N/A: pure epic Discovery filing, per ft-epic-discovery Step 8; no implementation diff to grade.
- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Testing Notes:**

- `python3 - <<'PY'` (initial shipped-wrapper assertions) → 0: 12 matching slugs, frontmatter names, resolving relative targets, and description-flag parity; static evidence only.
- `python3 - <<'PY'` (initial draft budget check) → 1: `AssertionError: ('codex-flowtron-verify discovery', 31)`. Phase 2 shortened the shared label to `codex-flowtron`; final budgets pass.
- `python3 /private/tmp/flowtron-core677-check.py` → 0: cohort grammar, nesting/order, budgets, model, Fan-out, whitespace, existing PLAN preservation.
- `git diff --check` → 0.
- Judgment criteria: shared-surface inventory, approved scoping, child seeds and fixed audit sweep present; 18 per-document verdicts below. Compatibility stamps unchanged.

The temporary filing checker is reproduced here; before the closure commit, `HEAD` is the pre-filing baseline. No persistent validation tool was added to the repo.

```python
from pathlib import Path
import re, subprocess
plan=Path('.flowtron/PLAN.md').read_text()
rows=[l for l in plan.splitlines() if re.search(r'\*\*CORE-(?:EPIC-)?677(?:\.[1-4N])?\*\*',l)]
assert [l.split('**')[1] for l in rows]==['CORE-EPIC-677','CORE-677.1','CORE-677.2','CORE-677.3','CORE-677.4','CORE-677.N']
for i,l in enumerate(rows):
 assert re.fullmatch(r'(?:  )?- \[[ x]\] \*\*CORE-(?:EPIC-)?677(?:\.[1-4N])?\*\* \[heavy\] \| [^\n]+ — [^\n]+',l),l
 assert l.startswith('  - ') == (i>0),l
 title,desc=l.split(' | ',1)[1].split(' — ',1)
 assert len(title)<=30 and len(desc.split())<=50,(title,desc)
 assert '[unattended]' not in l
original=subprocess.check_output(['git','show','HEAD:.flowtron/PLAN.md'],text=True)
assert plan.replace('\n'.join(rows)+'\n\n','',1)==original,'Existing PLAN content changed'
note=Path('.flowtron/tasknote/CORE-677.1.md')
if not note.exists(): note=Path('.flowtron/tasknote/archive/core/CORE-677.1.md')
text=note.read_text()
assert '**Sequential:** [[CORE-677.2]]' in text and '**Synthesis:** [[CORE-677.N]]' in text
for path in [Path('.flowtron/PLAN.md'),note]:
 data=path.read_text()
 assert data.endswith('\n') and all(l==l.rstrip() for l in data.splitlines()),path
print('PASS: cohort order, grammar, indentation, model, budgets, Fan-out, whitespace, and existing PLAN preservation.')
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line


### Doc-drift sweep

| Document | Verdict |
|---|---|
| `README.md` | no change — pure filing; no implementation or contract change |
| `AGENTS.md` | no change — pure filing; no implementation or contract change |
| `SPEC.md` | no change — pure filing; no implementation or contract change |
| `docs/MIGRATION.md` | no change in Discovery — installed drift and guidance verification scoped to .2/.3 |
| `claude/AGENTS-snippet.md` | no change — pure filing; no implementation or contract change |
| `codex/AGENTS-snippet.md` | no change in Discovery — installed drift and guidance verification scoped to .2/.3 |
| `cursor/AGENTS-snippet.md` | no change — pure filing; no implementation or contract change |
| `grok/AGENTS-snippet.md` | no change — pure filing; no implementation or contract change |
| `docs/CONVENTIONS.md` | no change — pure filing; no implementation or contract change |
| `CONTRIBUTING.md` | no change — pure filing; no implementation or contract change |
| `SECURITY.md` | no change — pure filing; no implementation or contract change |
| `docs/AGENT-NEUTRALITY.md` | no change — pure filing; no implementation or contract change |
| `docs/PLATFORMS.md` | no change in Discovery — capability/evidence review scoped to .3/.4; stamps preserved |
| `claude/CAPABILITIES.md` | no change — pure filing; no implementation or contract change |
| `docs/AGENT-COMPAT.md` | no change in Discovery — capability/evidence review scoped to .3/.4; stamps preserved |
| `docs/EXTERNAL-AGENTS.md` | no change — pure filing; no implementation or contract change |
| `docs/WORKTREES.md` | no change — pure filing; no implementation or contract change |
| `docs/VISION.md` | no change — pure filing; no implementation or contract change |

**Final Summary:** Filed CORE-EPIC-677 (Medium, `[heavy]`) with three sequential implementation children and terminal audit. Discovery inventoried 12 matching shipped Codex wrappers, absent repo wiring, eight broken global links, two missing skills, and current-session structured-question capability. Static parity and filing checks passed; installation repair, live mode behavior, and at most six initial comparison runs remain open in .2–.4. No source/contract refactor or compatibility stamp write. Durable child Acceptance seeds preserve the existing thin-wrapper architecture. Description counts: parent 36w; .1 initial 9w; .2 39w; .3 40w; .4 43w; .N 32w. Existing PLAN rows unchanged.

**Scope reconciliation:** N/A — no non-workflow file deliverable; `touches:` omitted under the pure-filing exemption. Diff is PLAN plus this tasknote archive.

**Learnings:** N/A — repo-scoped wiring is already documented; this task found installed drift, not a new general rule.

**Closure authorization:** User accepted the concrete proposal. Commit PLAN and this archive atomically; do not push or close implementation children.

**Archived:** 2026-10-01
