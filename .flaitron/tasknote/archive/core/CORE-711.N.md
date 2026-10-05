---
title: flaitron-rebrand audit
status: completed
tags: [epic-audit, rebrand]
created: 2026-10-04
due:
related-tasks: [CORE-EPIC-711, CORE-711.1, CORE-711.4, CORE-711.9, CORE-712, CORE-713]
touches:
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-711.N.md
---

# CORE-711.N | flaitron-rebrand audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-711]] [[CORE-711.1]] [[CORE-711.4]] [[CORE-711.9]] [[CORE-712]] [[CORE-713]]

## 🎯 Goal

Verify the completed flowtron → flaitron rename sits well across the repo, the adopter fleet, and the routed external work: zero stray `flowtron` outside the approved fences, the fixed doc-drift sweep, and the release gate green.

## ✅ Acceptance

- [x] All implementation children closed — `grep -E '^\s+- \[ \] \*\*CORE-711\.[0-9]' .flaitron/PLAN.md` prints nothing
- [x] Zero stray text `flowtron` — `git grep -Il -i flowtron -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` prints only files inside CORE-711.4 §Fence, `tools/update-adopters*`, the CORE-711 PLAN rows / closed rows, and README's canonical `### Formerly flowtron` note (CORE-711.9); no tracked filename contains `flowtron` — `judgment` on the residual line list
- [x] Image surface clean (CORE-711.9 Learnings) — tracked raster images viewed; none renders the old name — `👁️` (agent-viewed; grep cannot see pixels)
- [x] Fleet landed — every `~/Code/*/.flaitron/core` describes as `v6.0.0` and no `~/Code/*/.flowtron` exists — `ls -d ~/Code/*/.flowtron` (no match) + per-repo `git -C <core> describe --tags`
- [x] Release gate green — the seven AGENTS.md §Validation commands exit 0
- [x] Doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs": for each entry, "no change" or the update — `judgment`
- [x] Out-of-repo remainder is routed, not dropped — CORE-713 open in PLAN.md (global config + `~/fakeneuron/` scan), judedelparte JD-030 filed per CORE-711.8 — `grep -n 'CORE-713' .flaitron/PLAN.md`

## 🧩 Subtasks

- [x] Run the zero-stray grep and adjudicate every residual line against the fences
- [x] View the tracked raster images
- [x] Check fleet layout + pins (read-only, one level)
- [x] Run the seven validation commands
- [x] Doc-drift sweep over the 17 AI-referenced docs
- [x] Record findings (even when nothing is wrong) and file any follow-ups

## 🔗 Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.4]] — §Fence: the historical text that stays `flowtron`
- [[CORE-711.9]] — full-repo sweep; its Learnings hand the image check to this audit
- [[CORE-712]] — v6.0.0 cut, run inside the epic's ordering
- [[CORE-713]] — operator-owned global config handoff routed from CORE-711.8

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every implementation child (.1–.9) and CORE-712 are closed; the audit is the last open child before the parent flip.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — `N/A`: an audit; no code change planned

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Archive skim.** Area `CORE-*` → `archive/core/` (README table). Read CORE-711.1–.9 summaries and CORE-712. Load-bearing: .4 §Fence (items 1–6: VERSION-HISTORY entries; CODEX-VERIFICATION + HARNESS-SURVEY dated passes; retired `ft-flowtron`; MIGRATION v4 + v6 recipes and every pre-rename name v6 text needs — `/ft-update` stop, SECURITY migrate bullets, ci.yml Pair Q mapping, step-7.1 Pair Q Reads line; the `flowtron v5.2.0 bump` parser fixture; closed PLAN rows / archives / CORE-711 rows). .9 added README's canonical `### Formerly flowtron` note plus pointers, re-captured the hero screenshot, and handed the image check to .N. .7: fleet wave local-only commits, NAT-355 open on natabula's side. .8: routed JD-030 (judedelparte) + CORE-713 (operator global config).

**Nav-chip non-finding.** .6/.7/.8 archived with `🟢 In progress` chips while .1–.5/.9 show `✅ Completed`. Correct per SPEC.md §"Tasknote body shape" → Nav header: closure deliberately does not flip the chip; YAML `status: completed` is canonical in all nine.

**Zero-stray grep (2026-10-04).** 19 files (.9 saw 20; the difference is CORE-712.md, now archived). No tracked filename contains `flowtron`. Line-level adjudication, all fenced:
- ci.yml L156 (`ft-flowtron`, §Fence 3); L436/462–463 (Pair Q pre-rename mapping, §Fence 4).
- README L15, L329–332 — the canonical note (.9).
- SECURITY L180/225, `/ft-update` skill L25–29/L221 + command L5 — pre-rename stop / migrate bullets (§Fence 4).
- `SPEC/fixtures/plan/exclusions.md` L65, `SPEC/plan-parser.md` L114, `viz/src/parser.ts` L315, `parser.test.ts` L835 — legacy fixture (§Fence 5).
- step-7.1-mirror-pairs L244 — Pair Q Reads line (§Fence 4). CONTEXT-BUDGET L268 — `ft-flowtron` (§Fence 3). PLATFORMS L152 — "(`.flowtron/core/` before v6.0.0)", .9 kept as needed clarification.
- MIGRATION: L530 (pinning note naming the v6 re-point), L551–553 retired table, L566 updater paragraph, L568–597 v6 recipe, L600–620 v4 recipe — all §Fence 3/4.
- VERSION-HISTORY: L3 header (pointer to the note) + pre-v6 entries + the v6.0.0 entry title (§Fence 1).
- CODEX-VERIFICATION (34) / HARNESS-SURVEY (15): pointer header line + dated body (§Fence 2).
- `tools/update-adopters*` — pre-rename reads, incl. the two old GitHub URLs (test L150/L850).
- PLAN.md — CORE-EPIC-711 + .N rows, closed rows (CORE-677 `codex-flowtron`, CORE-650/653 quoting old paths) (§Fence 6).

**Images.** `viz-board.png` renders "Flaitron — flaitron", project chip `flaitron`; `LOGO.webp` (= `viz/public/LOGO.webp`, `cmp` identical) and `viz/public/favicon.png` carry no wordmark; `brand/*.svg` are text and grep-clean.

**Fleet.** `ls -d ~/Code/*/.flowtron` → no match. All 23 `~/Code/*/.flaitron/core` describe `v6.0.0`. flaitron origin = `github.com/fakeneuron/flaitron.git`; `main` is ahead of origin by 3 local commits (.6/.7/.8 closures) — push is the operator's.

**Unfiled learning from CORE-712.** CORE-712's Learnings box records that the `/ft-release` §7.1 standing context-budget block's `for f in $surface` silently skips glob rows under zsh (zsh does not glob-expand an unquoted parameter), passing only because CI and the cut ran under bash. It was never filed, and `step-7.1-standing-checks.md` §"On the globs" still calls those globs "safe here". Not a rebrand miss — out of this epic's scope.

**Clarifications (AskUserQuestion, 2026-10-04).** The unfiled CORE-712 zsh learning → **park standalone** (Low, outside the epic). Assumptions: fleet state is checked read-only, one level deep, under the `~/Code` sibling exception. `~/.claude` and `~/fakeneuron/` are not read here because they belong to CORE-713. natabula NAT-355 and judedelparte JD-030 are those repos' own open rows, not this epic's misses.

**Drift check.** PLAN line matches the tree. Its fence list omits the README canonical note (added later by .9) — inherited, not re-litigated. No SPEC contract touched; archives write-once honored.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling — follows the epic-audit shape of prior `.N` audits; the zero-stray grep reuses CORE-711.4/.9's exact pathspec

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup — `N/A`, no code change; the out-of-scope zsh finding is deferred to CORE-714

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, audit only

**Implementation Notes:**

- Audit findings: **no rebrand miss.** Text grep, images, fleet, routed remainder, and the release gate all came back clean (see Discovery Notes). No numeric follow-up child filed, so the epic needs no second audit wave.
- One out-of-scope finding, parked as [[CORE-714]] (`4cf9a354`, Low): CORE-712's unfiled zsh glob learning.
- Deliverable is this note + the PLAN.md `.N` flip; no source edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code changed; ran the full release gate as an Acceptance criterion instead

- [x] Ran lint/type-check on changed code — viz lint + typecheck run as part of the release gate

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`, no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:
- `grep -E '^\s+- \[ \] \*\*CORE-711\.[0-9]' .flaitron/PLAN.md` → 1 (no match; all children closed)
- `git grep -Il -i flowtron -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` → 0, 19 files, every line adjudicated as fenced (Discovery Notes); `git ls-files | grep -ci flowtron` → 0 matches
- Images: 4 raster files viewed (the two `LOGO.webp` copies are `cmp`-identical) → no old name
- `ls -d ~/Code/*/.flowtron` → no match; 23/23 `.flaitron/core` → `v6.0.0`
- `npm --prefix viz test` → 0 (29 files, 587 tests); `npm --prefix viz run typecheck` → 0; `npm --prefix viz run lint` → 0; `npm --prefix viz run build` → 0; `node --test tools/update-adopters.test.mjs` → 0 (65/65); `node --check tools/update-adopters.test.mjs` → 0; `node --check tools/update-adopters.mjs` → 0
- `grep -n 'CORE-713' .flaitron/PLAN.md` → 0; caobunga CBN-278 closed; judedelparte JD-030 + natabula NAT-355 open in their own PLANs (routed)
- Structural quality: `N/A`, no code changed.

External review: `N/A`. The diff is this tasknote plus a one-line PLAN.md stub flip. There is no code or doc deliverable to grade, and every finding above is a re-runnable command receipt. (The CORE-714 park landed separately as `4cf9a354`.)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`

**Final Summary:** The epic audit found no rebrand miss. All nine children and CORE-712 are closed. Outside the fences, 19 files still mention `flowtron`, and every line is either one of CORE-711.4's approved historical exceptions, a pre-rename read in `tools/update-adopters*`, a CORE-711 or closed PLAN row, or README's canonical `### Formerly flowtron` note. No tracked filename has the old name, and none of the tracked images renders it. All 23 adopters are on `.flaitron/core` at v6.0.0 with no `.flowtron/` left. The seven release-gate commands all exit 0. The out-of-repo remainder is routed rather than dropped: CORE-713 here, JD-030 in judedelparte, NAT-355 in natabula; caobunga's CBN-278 is closed. The one finding is out of scope: CORE-712's unfiled zsh glob learning, parked as CORE-714 (Low, `4cf9a354`). The epic is ready for its parent flip.

Doc-drift sweep (fixed audit line): `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: **no change**. Since CORE-711.9's sweep (`0955e779`), only README, SECURITY, SPEC, CAPABILITIES, AGENT-COMPAT, MIGRATION and PLATFORMS changed, all through CORE-712's release stamps and counters. Their remaining `flowtron` lines are fenced, README's rename note is accurate, and EXTERNAL-AGENTS' moved stable-surface rows have their caller row closed (CBN-278).

`touches:` reconciliation: closure diff = `.flaitron/PLAN.md` + this note (moved to archive). Both declared.

**Archived:** 2026-10-04
