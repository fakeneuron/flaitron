---
title: retire-command-wrappers
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.3, CORE-769.7, CORE-769.N, CORE-465, CORE-554, CORE-475]
touches:
  - claude/commands/
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - tools/update-adopters.mjs
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-audit/scaffold-bootstrap.md
  - claude/skills/ft-audit/passes/context.md
  - codex/skills/ft-audit/SKILL.md
  - codex/skills/ft-new-project/SKILL.md
  - SPEC/layout.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - docs/CONTEXT-BUDGET.md
  - docs/CONVENTIONS.md
  - docs/AGENT-NEUTRALITY.md
  - docs/AGENT-COMPAT.md
  - docs/GLOSSARY.md
  - README.md
  - CONTRIBUTING.md
  - SECURITY.md
  - AGENTS.md
  - .flaitron/PLAN.md
---

# CORE-769.2 | retire-command-wrappers

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-769.1]] [[CORE-769.3]] [[CORE-769.7]] [[CORE-769.N]] [[CORE-465]] [[CORE-554]] [[CORE-475]]

## 🎯 Goal

Retire the 12 `claude/commands/` wrapper stubs. Each `argument-hint:` moves into its SKILL.md frontmatter, the snippet's command half and every surface derived from it go, and each gate that assumed a stub exists is retired or re-pointed. A MIGRATION retired row records the change, shipped as a `feat!:` breaking change.

## ✅ Acceptance

- [x] `claude/commands/` no longer exists — `test ! -e claude/commands`
- [x] The six `argument-hint:` lines live in their SKILL.md frontmatter, byte-identical to the retired stubs — `grep -c '^argument-hint:' claude/skills/*/SKILL.md` shows 6 files at 1
- [x] No live surface still *relies on* a flaitron command stub — `git grep -nE 'claude/commands/|commands/ft-|wrapper_name_invariant|command stub|MISSING STUB'` over non-archive files, each remaining hit classified in Testing Notes (`judgment`: a kept decision, a historical provenance note, or the retired row)
- [x] Stub-assuming gates retired or re-pointed: `wrapper_name_invariant`, `pair_j`, `pair_m`, `skill_frontmatter_yaml`'s glob, §7.1 standing checks, `/ft-update` Step 5 smoke check — `bash tools/drift-checks.sh` → 0
- [x] Drift-check self-test covers the re-pointed checks — `node --test tools/drift-checks.test.mjs` → 0
- [x] Fleet updater still passes with the Claude surface narrowed to skills — `node --test tools/update-adopters.test.mjs` + `node --check tools/update-adopters.mjs` → 0
- [x] §7.1 installed-surface derivation diffs clean with no command half — run the four `diff -u` lines from `step-7.1-standing-checks.md` → empty
- [x] MIGRATION §"Skills retired so far" carries a row for the command stubs naming the replacement and the adopter cleanup — `grep -n 'claude/commands' docs/MIGRATION.md`
- [x] flaitron-self `.claude/commands/` wiring removed so the §7.1 self-wiring check stays clean — `judgment`: gitignored per-machine state, so no commit carries it
- [x] Closure commit is `feat!:` with a `BREAKING CHANGE:` footer — `git log -1 --format=%B | grep -q '^BREAKING CHANGE:'` (`judgment` at closure: the message is drafted with the footer; the grep runs post-commit)

## 🧩 Subtasks

- [x] Move the six `argument-hint:` lines into SKILL.md frontmatter; `git rm -r claude/commands/`
- [x] Snippets: drop the command half from `claude/AGENTS-snippet.md` (mkdir, ln lines, verify paragraph); drop the "`claude/commands/` lines dropped" substitution clause and the wrapper paragraphs from the codex/cursor/grok snippets
- [x] `tools/drift-checks.sh`: re-point `wrapper_name_invariant` → `skill_name_invariant` (SKILL.md `name:` == dir slug); re-point `pair_j` + `pair_m` to SKILL.md; drop `claude/commands/*.md` from `skill_frontmatter_yaml`; refresh header comments
- [x] `tools/drift-checks.test.mjs`: re-seed the J/M cases and the renamed invariant case against SKILL.md
- [x] `tools/update-adopters.mjs`: Claude `WIRING_SURFACES` entry narrowed to `claude/skills/`
- [x] `/ft-release`: §7.1 standing checks (drop the command-half diff and the local `.claude/commands` scans), mirror-pairs runner line + J/M entries, SKILL.md §7.1 bullet
- [x] `/ft-update`: Step 4 Claude list wording, Step 5 smoke check → `readlink .claude/skills/ft-task`
- [x] Audit fork recipe: drop the stub `cp` lines (scaffold-bootstrap §5, MIGRATION §1.2.1 ×2), the "matching the `audit.md` wrapper" clause, codex ft-audit note, context pass's bundled-name reference
- [x] Docs sweep: SPEC/layout.md invariant paragraph, MIGRATION §1.0 / §1.7 / §3.1 / gotchas, PLATFORMS (rows 35/74, self-checkout paragraph, install-location bullet, worked example), CONTEXT-BUDGET ledger, CONVENTIONS CI paragraph, AGENT-NEUTRALITY rows, AGENT-COMPAT, GLOSSARY, README quickstart + layout, CONTRIBUTING wiring block + heading (and its 3 citations), SECURITY, AGENTS.md layout bullet, codex ft-new-project clause
- [x] MIGRATION retired row (v7.0.0)
- [x] Remove flaitron-self's local `.claude/commands/` symlinks (incl. `audit.md`)
- [x] Phase 3: drift checks + self-test + updater suite + §7.1 diffs + residue grep; `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]] — Discovery that scoped this child (Probe B's gate list)
- [[CORE-769.3]] — next in sequence; renames move only skill dirs once stubs are gone
- [[CORE-769.7]] — rename-aware migrate mode + MIGRATION manual recipe for v7.0.0
- [[CORE-769.N]] — terminal audit
- [[CORE-465]] — made the snippet `ln -s` block the wiring SSOT
- [[CORE-554]] — minted Pair M
- [[CORE-475]] — minted Pair J

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today by CORE-769.1. All 12 stubs still ship, and flaitron-self still wires them. The stub-assuming gates Probe B named are all live at HEAD. Nothing has landed against it.

- [x] Read relevant source files — the 12 stubs, `tools/drift-checks.sh` (invariant, frontmatter YAML, B/J/M), `drift-checks.test.mjs` cases, `update-adopters.mjs` `WIRING_SURFACES`, §7.1 standing + mirror-pair fragments, `/ft-update` Steps 4–5, `/ft-new-project` Steps 0/3/7/8, audit fork recipes, the four snippets, and every doc hit from a `git grep` over `commands/` + command-stub prose

- [x] **Best Practices Review** — the snippet `ln -s` block stays the wiring SSOT (CORE-465). `/ft-new-project` Steps 7–8 and MIGRATION §1.6 derive from it, so they need no edit. Pair J/M keep their one-file, no-join shape: both halves now sit in SKILL.md, which simplifies them. `update-adopters.mjs`'s Claude surface becomes identical to `thinClaudeSkillsSurface`; decide reuse vs. in-place edit in Phase 2.

- [x] **Archive skim** — `archive/core/` confirmed against README (`CORE-*`). The CORE-769.1 Probe D skim covers this surface (CORE-057.2/072 origin, CORE-465 SSOT, CORE-475/554 Pair J/M, CORE-572 retire shape). Re-read 769.1's notes; no new hits needed.

- [x] **Drift check** — Probe B's gate list matches HEAD. It missed a few surfaces, which the sweep subtask now covers: `skill_frontmatter_yaml`'s glob, CONTRIBUTING's heading (cited from `SPEC/layout.md` + `scaffold-bootstrap.md` ×2), the context pass's bundled-name reference, `codex/skills/ft-{audit,new-project}`, SECURITY, AGENT-COMPAT, GLOSSARY, `AGENTS.md` layout bullet, and the `/ft-release` SKILL.md §7.1 bullet. The PLAN line matches the SPEC; `feat!:` is per the CORE-712 learning.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 2 asks via AskUserQuestion; see Resolved scoping

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Re-pointed Pair J dry run** (description + own-slug spans read from SKILL.md, hint from today's stubs): every skill's flag set is covered by its stub hint. ft-task `--debug --fast --loop --unattended`, ft-file-followup `--park --starter --unattended`, ft-micro-task `--fast --unattended`, ft-refactor `--fast`, ft-close-epic `--unattended`, ft-epic-discovery `--deep`; the six flagless skills are empty. So J and M can be re-pointed at SKILL.md with no finding at birth.
- **Kept on purpose** (platform facts or leftover detectors, not stub-assuming wiring):
  - Grok's documented `.claude/commands/` compat path (PLATFORMS 367/398/495, grok snippet intro)
  - the generic `<platform>/commands/` guidance for future platforms (PLATFORMS 221/282)
  - the context pass's scan of *project-side* `.claude/commands/` (adopters may own commands, and a leftover `ft-*` stub is a real finding)
  - `/ft-new-project` Step 0's `.claude/commands/ft-task.md` adoption detector
- **Resolved scoping (AskUserQuestion, 2026-10-09):**
  - `wrapper_name_invariant` → **re-point** as `skill_name_invariant`: every `claude/skills/*/SKILL.md` and `codex/skills/*/SKILL.md` `name:` equals its directory slug. All 24 pass at HEAD. The unprefixed audit overlay is out of scope: it lives outside both dirs and is named for its fork.
  - Global `~/.claude/commands` probes (`/ft-update` Step 4.7, §7.1 machine-global) → **keep**, to surface pre-v7 leftovers.
  - Assumptions (not asked): rename CONTRIBUTING §"Developing flaitron skills & commands" → §"Developing flaitron skills" and fix its 3 citations (Pair Q guards them). The MIGRATION row's release is v7.0.0, the epic's target. VERSION-HISTORY is left to the release.
- **Adopter fallout:** `/ft-update` Step 4.6 already scans `.claude` recursively for dangling links, so the retired `.claude/commands/ft-*.md` links surface on bump. A copied audit stub (`.claude/commands/audit.md`, a real file) does not; the MIGRATION row names it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — CORE-572's retire-and-record shape (delete the surface, sweep rosters, add a MIGRATION retired row, check `git grep` residue). The re-pointed checks keep their one-file, no-join form; `skill_name_invariant` reuses `skill_frontmatter_yaml`'s frontmatter awk and the house `bad=`/`n` floor.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — one refactor, to prevent duplication: with commands dropped, `update-adopters.mjs`'s Claude surface was byte-identical to `thinClaudeSkillsSurface`, so Claude now uses the helper, renamed `claudeSkillsSurface`. The snippet `ln -s` columns were realigned, since their padding existed only to line up with the removed command lines. The other drifted CONTEXT-BUDGET ledger rows are left for the release re-measure.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `drift-checks.test.mjs`: `skill_name_invariant` seed (a `claude/skills/ft-zz-drift/` with `name: ft-zz-old`), and J/M re-seeded against `claude/skills/ft-task/SKILL.md`. Updater tests needed no change (none exercised the command surface).

**Implementation Notes:**

- 12 stubs `git rm`'d. Six `argument-hint:` lines were inserted after `description:`, byte-identical to the stubs, adding one line per file.
- `drift-checks.sh`:
  - `skill_name_invariant` replaces `wrapper_name_invariant`: `name:` must equal the dir slug across `claude/skills` + `codex/skills`, which is 24 SKILL.md files, all clean at HEAD.
  - `pair_j` now reads the description and own-slug spans from SKILL.md. The dry run against the bodies found no new hits.
  - `pair_m` reads both halves from SKILL.md, and `MISSING STUB` is gone.
  - `skill_frontmatter_yaml` drops the stub glob.
- Added from the drift check: CONTRIBUTING's heading was renamed to §"Developing flaitron skills", with its 4 citations fixed (3 named in Discovery plus one in §7.1 standing checks). The overlay recipe comment now says to set `name:`, which is the slash name now that no stub supplies one. The MIGRATION §3.1 collision bullet was reworded: a legacy command is shadowed, not a symlink failure. The ft-audit fork-install carve-out lost its "plus its `.claude/commands/` wrapper" clause, and the audit-overlay docs-pass example was re-worded off "command stub".
- Local: removed the 13 dangling `.claude/commands/` symlinks and the directory (gitignored).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — drift-check self-test + updater suite

- [x] Ran lint/type-check on changed code — `node --check` on both updater files. The shell checks have no linter in the roster (`bash tools/drift-checks.sh` executes every function). Markdown is guarded by the drift checks (Pair Q citations, final newline, frontmatter YAML).

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `/code-review medium` on the working-tree diff: 7 findings, 2 blockers fixed (Phase 3 re-run from the top), 3 notes fixed, 2 notes declined with reasons

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after the review fixes):

```text
test ! -e claude/commands                                  → 0
grep -c '^argument-hint:' claude/skills/*/SKILL.md         → 6 files at 1, byte-identical to HEAD's stubs; each SKILL.md +1/−0
bash tools/drift-checks.sh                                 → 0 (17 ok, incl. skill_name_invariant, pair_j, pair_m)
node --test tools/drift-checks.test.mjs                    → 0 (19 pass)
node --check tools/update-adopters{,.test}.mjs             → 0
node --test tools/update-adopters.test.mjs                 → 0 (65 pass)
§7.1 consumer-derivation greps (MIGRATION §1.6, new-project Steps 7–8) → no output, rc 1 (as required)
§7.1 installed-surface: 4 × diff -u                        → empty, rc 0
§7.1 local self-wiring: diff + dangling + non-symlink + overlay pin → empty
grep -n 'claude/commands' docs/MIGRATION.md                → retired row at §"Skills retired so far"
```

Residue classification (`git grep -nE 'claude/commands/|commands/ft-|wrapper_name_invariant|command stub|MISSING STUB'`, non-archive):

- **Kept by decision:**
  - context pass project-side `.claude/commands/` scans
  - `/ft-new-project` Step 0 detector, now labeled pre-v7
  - `/ft-update` Step 4.7 and §7.1 global `~/.claude/commands` probes
  - Grok compat-path facts (PLATFORMS 367/398/495, grok snippet 9/25)
  - MIGRATION §3.1 legacy-command collision
  - CONTRIBUTING's dangling-link cleanup line
- **Historical provenance:**
  - `drift-checks.sh` and `update-adopters.mjs` comments naming CORE-769.2
  - CONTEXT-BUDGET ledger
  - PLATFORMS worked example
  - mirror-pairs Pair F/J history
  - MIGRATION `ft-flowtron` row
- **The retired row** (MIGRATION) and **this PLAN row**.

External review (`/code-review medium`, working-tree diff), graded against Acceptance:

1. **blocker — fixed.** The MIGRATION §1.2.1 full-copy fork kept `name: ft-audit` once the stub that supplied `/audit` was gone. Added a "set name: to $SKILL" line, matching the overlay block.
2. **note — declined.** `update-adopters.mjs` no longer reports a newly added `claude/commands/` stub on pre-v7 ranges. Every stub shipped beside a new skill dir, which the Claude surface still reports, so no wiring hint is lost. v7.0.0 itself is migration-bearing, so the sweep skips it.
3. **note — fixed.** The self-wiring scan no longer looks at `.claude/commands`, while old maintainer wiring is all dangling. CONTRIBUTING's setup block now deletes only the dangling links there (a scoped `find -delete`, never a blanket `rm -r`). Mine are already removed.
4. **blocker — fixed.** Stale "Claude Code commands + skills" wording in `SPEC/layout.md` and its AGENT-NEUTRALITY ledger row, plus "skill or command" / "`/ft-*` commands" in CONTRIBUTING.
5. **note — declined.** `skill_name_invariant` doesn't strip YAML quotes or CR. Every shipped `name:` is a plain, unquoted slug, and `.editorconfig` pins LF; a quoted name would be a house-style change, and the check failing loud on it is acceptable.
6. **note — fixed.** The `/ft-new-project` Step 0 `.claude/commands/ft-task.md` detector is now labeled as pre-v7.0.0 wiring.
7. **note — fixed.** The CONTEXT-BUDGET sum now counts the +78 hint line: `ft-task/SKILL.md` 25,430, sum **111,136**.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - README.md — updated: quickstart global install and `claude/` layout bullet
  - AGENTS.md — updated: `claude/` layout bullet
  - SPEC.md — no change: names no command stub
  - docs/MIGRATION.md — updated: §1.0, §1.2.1 ×2, §1.7, §3.1, gotchas, retired row
  - claude/AGENTS-snippet.md — updated: command half dropped
  - codex/, cursor/, grok/ AGENTS-snippet.md — updated: substitution clause and wrapper paragraphs
  - docs/CONVENTIONS.md — updated: invariant name in the CI paragraph
  - CONTRIBUTING.md — updated: wiring block, heading, wording
  - SECURITY.md — updated: bump-review path
  - docs/AGENT-NEUTRALITY.md — updated: 4 rows
  - docs/PLATFORMS.md — updated: rows, self-checkout paragraph, worked example
  - claude/CAPABILITIES.md — no change
  - docs/AGENT-COMPAT.md — updated: Claude row
  - docs/EXTERNAL-AGENTS.md — no change
  - docs/WORKTREES.md — no change
  - docs/VISION.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. The one durable rule, that a fork's `name:` is now its slash name, lives in the MIGRATION recipes and the §0 checklist where forkers read it.

**Final Summary:**

Flaitron no longer ships `claude/commands/`. The 12 wrapper stubs are gone, and each of the six `argument-hint:` lines now lives in its SKILL.md frontmatter, byte-identical. The adopter snippet's command half and every surface derived from it are removed. Stub-assuming gates were re-pointed:
- `wrapper_name_invariant` → `skill_name_invariant` (SKILL.md `name:` == dir slug, claude + codex), which guards the coming renames
- Pair J/M read SKILL.md
- the frontmatter-YAML glob no longer includes stubs
- §7.1 standing checks drop the command half
- the `/ft-update` smoke check reads `.claude/skills/ft-task`

The fleet updater's Claude surface now reuses the shared skills-surface helper. MIGRATION carries a v7.0.0 retired row with the adopter cleanup, including the copied audit stub that the dangling scan cannot see.

- **Changed files:** 36 modified + 12 deleted (`git diff --name-only HEAD`), plus `.flaitron/PLAN.md` and this note at closure.
- **Verification:** see the receipt above. Everything exited 0, and Phase 3 was re-run after the review fixes.
- **Refactors:** `thinClaudeSkillsSurface` → `claudeSkillsSurface`, now shared by Claude; snippet `ln -s` columns realigned.
- **Docs verdict:** updated. See the doc-drift sweep.
- **`touches:` reconciliation:** declared 35 paths. Three edits were not declared, all found during review: `.flaitron/audit-overlay/SKILL.md`, `claude/skills/ft-audit/SKILL.md`, `claude/skills/ft-new-project/SKILL.md`. Every declared path changed.
- **Maintainability:** one surface per skill instead of two. `.3`–`.6` renames now move only skill dirs, under a check that catches a stale `name:`.
- **Local, uncommitted:** flaitron-self's 13 dangling `.claude/commands/` links were removed (gitignored).

**Archived:** 2026-10-09
