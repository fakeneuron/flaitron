---
title: prune-settings-local-debt
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-292 | prune-settings-local-debt

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove one-time `ln -s` setup commands, version-pinned debugging one-liners, and the blanket `Bash(cd *)` allow from `.claude/settings.local.json`, reducing accumulated permission debt.

## ✅ Acceptance

- [ ] All `ln -s` one-time setup entries removed
- [ ] `Bash(cd *)` blanket allow removed
- [ ] Version-pinned `sed -n '<N>p'` and version-string `grep` debugging one-liners removed
- [ ] Echo exit-code debug patterns removed (`echo "exit $?"` etc.)
- [ ] Other clearly single-use debugging artifacts removed
- [ ] File is valid JSON after edits
- [ ] Entry count substantially reduced from current ~141

## 🧩 Subtasks

- [ ] Read `.claude/settings.local.json` and classify all entries
- [ ] Define keep-list (high-signal, genuinely recurring) vs. remove-list (one-time / version-pinned / debug)
- [ ] Apply prune via Python parse→filter→re-emit (same pattern as CORE-291)
- [ ] Validate JSON and verify entry count
- [ ] Phase 4 closure

## 🔗 Related

- [[CORE-291]] — prune-stale-project-allows (same session, removed _project/ entries 152→140)
- [[CORE-220]] — settings-local-allowlist-growth (46→33 prune on 2026-05-30)
- [[CORE-214]] — settings-local-hygiene (SECURITY.md three-layer doc)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** File confirmed at ~141 entries (after CORE-291's 152→140 prune). All three named categories are present: 6 `ln -s` natabula/ft-update symlink commands, 1 `Bash(cd *)`, and a large set of version-pinned `sed -n '<N>p'` + version-grep + echo exit-code debugging one-liners. Debt is real; task is correctly scoped.

- [x] Read relevant source files

- [x] **Archive skim** — prior tasknotes on `.claude/settings.local.json`

- [x] **Drift check** — all three categories confirmed present in current file; `_project/` entries already gone (CORE-291). No semantic drift from the PLAN.md filing.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **CORE-291 (2026-06-06):** just completed today in the same audit-context session; removed 12 `_project/`-path entries (152→140). Current file is post-CORE-291 state (~141 entries).
- **CORE-220 (2026-05-30):** the last comprehensive prune, 46→33. The file grew from 33 back to ~141 in the months since. Echo exit-code patterns dropped in CORE-220 have re-accumulated along with many new debugging one-liners.
- **CORE-214 (2026-05-27):** SECURITY.md hygiene only; did not touch the settings.local.json allowlist.
- **Pattern:** Python parse→filter→re-emit (same as CORE-291 and CORE-220) to avoid malformed JSON. Whitelist approach (keep only high-signal entries) is safer than blacklist for this density.
- **No clarifications needed.** Explicit assumptions:
  - Keep: all 12 playwright MCP tools, abs-path viz npm/test entries, lsof/pkill 5120 variants, WebSearch, Skill(ft-task/ft-audit-docs), gh api *, git *, git add *, git commit *, npm audit *, gitleaks *, npm run *, npm *, curl 5120 health checks, pkill vitest/node.*viz, npx vitest *, Read(//tmp/**), Read(//Users/fakeneuron/Code/**), awk *.
  - Remove: all `ln -s` entries, `Bash(cd *)`, all `sed -n '<N>p'` with hardcoded line numbers, all version-string greps, all `echo "exit $?"` / `echo "=COMMIT-EXIT=$?"` etc. patterns, `jobs -l`, all single-use awk/sort/grep/node/python3 debugging one-liners.
  - No test suite exists for a JSON config; validation = `python3 json.load` post-edit.

Discovery surfaced no significant deviation → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Python parse→filter→re-emit, same pattern as CORE-291 and CORE-220; whitelist approach (keep only high-signal entries) safer than blacklist at this density.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (JSON config, no executable surface)

**Implementation Notes:**

**Before:** 140 entries (post CORE-291). **After:** 38 entries (73% reduction).

Whitelist kept: 12 playwright MCP tools, abs-path viz npm/test, npx vitest/tsc, lsof/pkill/curl 5120 variants, WebSearch, Skill(ft-task/ft-audit-docs), gh api *, git add/commit/*, npm audit/run/*, gitleaks *, awk *, Read(//tmp/** and //Users/fakeneuron/Code/**).

Removed categories:
- **6 one-time `ln -s` setup commands** (natabula symlinks + ft-update global symlink)
- **1 blanket `Bash(cd *)` allow**
- **17 `sed -n '<N>p'` line-specific debugging one-liners** (hardcoded line numbers tied to specific doc versions)
- **2 version-pinned `grep -rn "4.2.0"`** and related version-string greps
- **10+ echo exit-code debug patterns** (`echo "exit $?"`, `echo "=COMMIT-EXIT=$?"`, etc.) and `jobs -l`
- **~66 other single-use debugging artifacts**: GLOSSARY.md greps/awk, PLAN.md section awk, single-use sort/pipe fragments, node/python3 one-liners, specific awk section extractors, migration-check `[ -d $HOME/code/$d/.flowtron ]`, duplicate grep patterns, etc.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (JSON config)

- [x] Ran lint/type-check on changed code — validated JSON with `python3 json.load` post-edit (valid, 38 entries, all three named categories absent)

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change)

**Testing Notes:**

No test suite for JSON config. JSON validated clean post-edit. All `ln -s` entries absent, `cd *` absent, all sed/echo debugging one-liners absent. Entry count: 38 (confirmed).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: no change · docs/PLATFORMS.md: no change · claude/CAPABILITIES.md: no change · docs/AGENT-COMPAT.md: no change (only `.claude/settings.local.json` touched, which is personal/not in AI-ref docs list)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-06.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Pruned `.claude/settings.local.json` from 140 to 38 allow entries (73% reduction) by removing all three named categories — 6 one-time `ln -s` natabula/ft-update symlink commands, the blanket `Bash(cd *)`, and 17 version-pinned `sed -n '<N>p'` debugging one-liners — plus ~77 additional single-use debugging artifacts: echo exit-code patterns, GLOSSARY.md one-off greps, PLAN.md section extractors, single-use sort/pipe fragments, node/python3 one-liners, and other session-specific noise.

**Technical detail:** 1 file edited (`.claude/settings.local.json`, 140→38 entries, −102 rules). Python parse→filter→re-emit (whitelist approach). JSON validated clean. No other files touched; no frontend; no privileged-ops surface → autonomous commit expected.

**Archived:** 2026-06-06
