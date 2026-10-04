---
title: natabula-ref-inventory
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [CORE-EPIC-652, CORE-652.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flowtron/tasknote/README.md
  - .github/workflows/ci.yml
  - .gitleaks.toml
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - SPEC/scope-boundaries.md
  - brand/BRAND.md
  - brand/README.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-task/SKILL.md
  - docs/CONVENTIONS.md
  - justfile
  - templates/tasknote-README.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-652.2 | natabula-ref-inventory

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-652]]

## 🎯 Goal

Inventory every non-archive `natabula` reference in the tracked tree, classify each hit as operator-private (label it) or adopter-facing (reword to stand alone), so a public reader of flowtron never needs the private `~/Code/natabula` layer.

## ✅ Acceptance

- [x] Inventory grep returns zero unlabelled hits — `git grep -n -i natabula -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!.flowtron/PLAN.md' ':!.flowtron/tasknote/CORE-652.2.md' | grep -v operator-private` prints nothing (every surviving mention sits on a line carrying the `operator-private` label); private fleet repo names (`marscharts`, `InvisiPaw`, `bidviz`, `bananapeel`, `polymarket`) likewise absent from `.gitleaks.toml` — `grep -c -i -E 'marscharts|invisipaw|bidviz|bananapeel|polymarket' .gitleaks.toml` prints 0
- [x] Every retained operator-side pointer is labelled with the literal phrase `operator-private` so the `.N` audit can grep it — `git grep -n 'operator-private' -- . ':!.flowtron'` lists the labelled sites
- [x] `.gitleaks.toml` rules unchanged — `git diff HEAD -- .gitleaks.toml | grep '^[-+]' | grep -v '^[-+]#' | grep -v '^[-+]title' | grep -vE '^(\+\+\+|---)'` prints nothing (only comment / title lines differ; allowlist paths and descriptions untouched except the `Measured hits:` provenance lines)
- [x] Context budgets hold — `SPEC.md` ≤ 53,000, each `claude/skills/*/SKILL.md` ≤ 33,000, `SPEC/procedures/ft-task.md` ≤ 38,000 (`wc -c`)
- [x] The three skill bodies + `SPEC/procedures/ft-task.md` keep their shared Area bullet identical — `judgment`: diff the bullet across the four files by eye
- [x] Archives and PLAN history untouched — `git diff --name-only HEAD` lists no path under `.flowtron/tasknote/archive/`, nor `.flowtron/PLAN-ARCHIVE.md`
- [x] Validation roster green on changed files — `npm --prefix viz run lint` not needed (no viz change); `node --check` not needed; `judgment`: markdown/YAML/TOML edits only, CI gitleaks scan unaffected (rules unchanged)

## 🧩 Subtasks

- [x] Neutralize the `NAT-*` → `archive/natabula/` example to `OPS-*` → `archive/operations/` in the 7 sites: `SPEC.md`, `SPEC/procedures/ft-task.md`, `claude/skills/{ft-task,ft-micro-task,ft-file-followup}/SKILL.md`, `.flowtron/tasknote/README.md`, `templates/tasknote-README.md`
- [x] `.github/workflows/ci.yml` — reword the gitleaks step comment to stand alone (deposited copy read in place at repo root; no named upstream)
- [x] `.gitleaks.toml` — reword header comments: provenance labelled `operator-private`, drop `/natabula-*` tool pointers, drop `.pre-commit-config.yaml` consumer (not deposited here), strip private repo names from `Measured hits:` lines and the allowlist rationale; retitle; rules untouched
- [x] `SPEC/scope-boundaries.md` — reword the CORE-483.3 exception to "two `.gitignore` files in a sibling operator-private repo"
- [x] `brand/BRAND.md` + `brand/README.md` — label the `Standard:` pointer `operator-private`; reword the drift-tool sentence to stand alone
- [x] `docs/CONVENTIONS.md` — reword "copied from natabula's canonical baseline" to an operator-private fleet baseline
- [x] `justfile` — reword header: hand-authored vs an operator-private fleet template; label the doc pointer `operator-private`
- [x] Re-run inventory grep + budget `wc -c`; record receipts

## 🔗 Related

- [[CORE-EPIC-652]] — parent epic (public-surface-decoupling); Discovery supplied by audit-repo 2026-09-21, no `.1` child
- [[CORE-652.N]] — follow-up audit child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The inventory grep reproduces the epic's count exactly — 14 non-archive tracked files, 22 hit lines. Every hit is live and none has been addressed since the audit-repo filing (2026-09-21). No sibling `.1` Discovery exists; the epic line states Discovery was supplied by audit-repo, so this `.2` is the sole implementation child and no Fan-out claim applies.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Inventory (22 lines / 14 files) and per-site verdict:**

| Site | Class | Action |
|---|---|---|
| `SPEC.md:56`, `SPEC/procedures/ft-task.md:193`, `claude/skills/ft-task/SKILL.md:98`, `claude/skills/ft-micro-task/SKILL.md:85`, `claude/skills/ft-file-followup/SKILL.md:83`, `.flowtron/tasknote/README.md:38`, `templates/tasknote-README.md:62` | adopter-facing — illustrative example `NAT-*` → `archive/natabula/`; already self-contained but names the private layer | neutralize to `OPS-*` → `archive/operations/` (operator chose) |
| `.github/workflows/ci.yml:40-41` | adopter-facing — CI comment explains `--config` relative to natabula's workflow | reword to stand alone |
| `.gitleaks.toml:1-13` + `Measured hits:` lines + allowlist rationale | operator-private provenance inside an adopter-visible file; names private fleet repos and `/natabula-*` tools; byte-identical deposit (CORE-578) | reword comments + title, label `operator-private`, rules untouched; accept `/natabula-layer-refresh` drift (operator chose; the file itself documents deliberate divergence) |
| `SPEC/scope-boundaries.md:19` | adopter-facing — historical precedent names the sibling repo | reword to "sibling operator-private repo" |
| `brand/BRAND.md:18`, `brand/README.md:20-22` | operator-private pointers (`~/Code/natabula/docs/DESIGN-STANDARDS.md`, `/natabula-layer-drift`) inside the public kit | label `operator-private`; drift sentence reworded to stand alone |
| `docs/CONVENTIONS.md:54` | adopter-facing — "copied from natabula's canonical baseline" | reword to operator-private fleet baseline |
| `justfile:1,7` | operator-private provenance (template + doc pointer) | reword header, label pointer `operator-private` |

**Label convention:** the literal phrase `operator-private` marks every retained pointer, so the `.N` audit can `git grep operator-private` to find them.

**Best Practices Review:** prose/comment edits only — no code module, no dependency direction. The one structural risk is the four-way shared Area bullet (3 skill bodies + `SPEC/procedures/ft-task.md`); edit identically. `.gitleaks.toml` allowlist `paths` arrays are the executable surface and stay byte-identical; only comments, `title`, and `description` provenance prose change.

**Archive skim:** `CORE-578` (gitleaks deposit — "copied byte-identical", `--config` path difference is path-only), `CORE-637` (justfile hand-authored because `viz/`-only layout falls outside the fleet template's auto-adapt set), `CORE-643` (brand kit copied from natabula's `templates/brand/`; `BRAND.md` is customize-by-design, README presence-only in the drift tool — so brand edits are drift-safe). `CORE-483.3` is the scope-boundaries precedent being reworded — record only, not re-litigated. No prior tasknote addressed the public/private coupling itself.

**Drift check:** all 14 files and the cited line numbers match current code; the epic's "14 non-archive tracked files" and the PLAN line's grep command hold verbatim. Plan contradicts no SPEC contract: `SPEC/scope-boundaries.md` forbids editing natabula from here, and every action is flowtron-side. `.flowtron/tasknote/README.md` is flowtron's own live copy of the template — both the copy and `templates/tasknote-README.md` are edited so a fresh adopter and this repo agree.

**Clarifications (AskUserQuestion, 2026-09-21):** NAT example → neutralize; `.gitleaks.toml` → reword here. Assumptions: `OPS-*` → `archive/operations/` is the replacement example (prefix lowercases to `ops/`, folder is the long form — same teaching point); `.pre-commit-config.yaml` is not deposited in flowtron so the gitleaks header drops that consumer line; `.flowtron/tasknote/CORE-652.2.md` itself is excluded from the acceptance grep since it records the word by necessity and archives on closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose and comment edits only; the machine-checkable surface (`.gitleaks.toml` `paths`, `ci.yml` steps) is byte-identical

**Implementation Notes:**

- Pattern: the existing "label the private pointer" shape is the parenthetical `(operator-private)` / `operator-private:` prefix placed on the **same line** as the path so a single `grep -v operator-private` filter proves coverage. Applied uniformly to the five retained pointers (`brand/BRAND.md`, `brand/README.md`, `justfile`, `.gitleaks.toml` ×2). Everything else reworded to stand alone with no path.
- The NAT example became `OPS-*` → `archive/operations/` in all 7 sites (the `SPEC/procedures/ft-task.md` occurrence is line-wrapped across 192-193). Area bullet md5 identical across the three skill bodies.
- `.gitleaks.toml`: title → `flowtron gitleaks baseline`; header drops the pre-commit consumer (flowtron has no `.pre-commit-config.yaml`) and the `/natabula-*` tool pointers; `Measured hits:` provenance now counts repos instead of naming them; the `[extend]` block and all three `paths` arrays verified equal to HEAD via `tomllib`. The header itself now states the deliberate comment divergence so a future operator-side refresh diff is expected, not alarming.
- `ci.yml`: comment-only diff (verified: no non-`#` lines changed).
- No refactor beyond Acceptance; nothing deferred.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code under test changed; `just --list` parses, `tomllib` parses `.gitleaks.toml`

- [x] Ran lint/type-check on changed code — `N/A`: markdown / YAML-comment / TOML-comment / justfile-comment edits only

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend change (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git grep -n -i natabula -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!.flowtron/PLAN.md' ':!.flowtron/tasknote/CORE-652.2.md' | grep -v operator-private` → exit 1 (no unlabelled hits)
- `grep -c -i -E 'marscharts|invisipaw|bidviz|bananapeel|polymarket' .gitleaks.toml` → `0`
- `git grep -n 'operator-private' -- . ':!.flowtron'` → 8 lines across `.gitleaks.toml`, `SPEC/scope-boundaries.md`, `brand/BRAND.md`, `brand/README.md`, `docs/CONVENTIONS.md`, `justfile` → exit 0
- `tomllib` HEAD-vs-worktree: `extend` equal, all `allowlists[].paths` equal → `True True`
- `git diff HEAD -- .github/workflows/ci.yml` non-comment lines → none (exit 1 on the filter)
- `wc -c`: `SPEC.md` 47,833 ≤ 53,000 · `SPEC/procedures/ft-task.md` 35,935 ≤ 38,000 · `ft-task` 28,105 / `ft-micro-task` 21,321 / `ft-file-followup` 26,179 ≤ 33,000 → exit 0
- Area bullet md5 across the three skill bodies → identical (`415ebe36…`)
- `git diff --name-only HEAD` → 14 files, none under `archive/` or `PLAN-ARCHIVE.md` → exit 0
- `just --list` → exit 0
- Structural: no duplication, dead code, or public-surface growth — comment/prose deltas only; no code-facing doc went stale (the two swept docs edited here are the deliverable).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep:** `SPEC.md` — updated (NAT example neutralized §"Task ID convention"); `docs/CONVENTIONS.md` — updated (§"GitHub Actions CI" gitleaks provenance); `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (none mention natabula; validation roster unchanged).

**Recap:** 14 files, comment/prose only (~40 lines changed). 22 inventory lines resolved: 17 reworded to stand alone (7 example sites → `OPS-*` → `archive/operations/`, `ci.yml`, `scope-boundaries.md`, `CONVENTIONS.md`, `.gitleaks.toml` body), 5 retained as labelled `operator-private` pointers (`brand/BRAND.md`, `brand/README.md`, `justfile`, `.gitleaks.toml` header + audit-register mention). Verification as recorded in Testing Notes — every command exit-clean. No refactors. `touches:` reconciliation: `git diff --name-only HEAD` = the 14 declared paths exactly; no undeclared paths. Maintainability effect: a public reader of flowtron now meets no bare pointer into the private fleet layer; every remaining one is self-labelled and greppable, which is what `CORE-652.N` will audit. Known trade-off (operator-chosen): `.gitleaks.toml` comments now diverge from the fleet baseline, so the operator-side refresh will show a comment-only diff — the file's own header says so.

**Archived:** 2026-09-21
