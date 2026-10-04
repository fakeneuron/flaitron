---
title: /ft-quality skill — lint/typecheck/test on changed code
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097, CORE-097.1]
---

# CORE-097.5 | /ft-quality skill — lint/typecheck/test on changed code

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-097]] · [[CORE-097.1]]

## 🎯 Goal

Add a `/ft-quality` skill that sequences lint + typecheck + test against the
project, runnable independently of the tasknote flow — a project-agnostic
quality gate with heuristic stack detection (Node / Python / Go / Rust) and
fail-fast behavior, ported from claude-skills-starter's `/quality` into
flowtron's no-script idiom.

## ✅ Acceptance

- [x] `claude/skills/ft-quality/SKILL.md` created with canonical YAML frontmatter (`name: ft-quality` + 1-line description) and step-by-step body codifying detection + run order
- [x] `claude/commands/ft-quality.md` command stub created (delegates to the skill, per CORE-104 / ft-flowtron / ft-stats precedent)
- [x] **Heuristic stack detection** order codified in SKILL.md: Node.js (`package.json`) → Python (`pyproject.toml` / `setup.cfg` / `ruff.toml`) → Go (`go.mod`) → Rust (`Cargo.toml`). Per-stack default command table (lint / typecheck / test) documented; skipped steps surface a one-line note
- [x] **Project-wide scope** (mirror upstream `/quality`): commands run as the project defines them — no git-diff slicing, no file-list passing
- [x] **Fail-fast behavior**: first failure stops the sweep; emit a labeled error citing which step failed (`❌ Quality check failed at: Lint`) plus the underlying tool's exit; subsequent steps are skipped
- [x] **Multi-stack handling**: if multiple manifests are present, run each detected stack in sequence; fail-fast applies across the whole sweep (not per-stack)
- [x] **Empty-state handling**: zero detected stacks → friendly message ("no recognized stack manifests found at repo root"); detected stack with no available commands → "no quality commands found for `<stack>`; nothing to run"
- [x] Skill is **project-agnostic** — no flowtron-specific assumptions; usable in any repo with one of the recognized manifests
- [x] Skill operates **outside the tasknote flow** — no PLAN.md read/write, no recap, no 📦 commit gate; pure run-and-report
- [x] **Global install pattern** (ft-stats / ft-flowtron precedent): symlink block added to `docs/MIGRATION.md` §1.0 between the `/ft-stats` block and the `/ft-release` block
- [x] `/ft-flowtron`'s "Bundled skills" table includes a `/ft-quality` row (alphabetically with utility skills — between `/ft-stats` and `/ft-new-project`)
- [x] `SPEC.md` §"Skill namespace" slug list includes `/ft-quality`
- [x] Phase 4 doc-drift sweep records updates to every AI-referenced doc that lists shipped skills (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md), per `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Scaffold `claude/skills/ft-quality/SKILL.md` + `claude/commands/ft-quality.md` mirroring `ft-stats`'s shape (frontmatter + numbered-step body + "stop after reporting" footer)
- [x] In SKILL.md Step 0: define inputs (no args; `$ARGUMENTS` empty or surface usage if non-empty)
- [x] Step 1: codify the heuristic stack-detection order (Node → Python → Go → Rust) with the per-stack manifest file check + per-step default command table (lint / typecheck / test)
- [x] Step 2: define the sequenced run loop — for each detected stack, run lint → typecheck → test in order, fail-fast at first non-zero exit, emit per-step status lines (`Step N/M: <label>... ✅ passed` / `❌ failed`)
- [x] Step 3: define the empty-state and skip-step messaging surface
- [x] Step 4: stop motion — print final `✅ All quality checks passed!` / `❌ Quality check failed at: <step>` summary; do NOT open a tasknote, ask follow-ups, or offer the 📦 gate
- [x] Wire `/ft-quality` into `claude/skills/ft-flowtron/SKILL.md` "Bundled skills" table (between `/ft-stats` and `/ft-new-project`)
- [x] Add `/ft-quality` to the bundled-skills slug list in `SPEC.md` §"Skill namespace"
- [x] Add adopter-facing global-install symlink block to `docs/MIGRATION.md` §1.0 (between `/ft-stats` and `/ft-release` blocks)
- [x] Phase 3: markdown mental-pass on SKILL.md + command stub + edited docs (frontmatter valid YAML, fence langtags per CORE-079 / CORE-086, no trailing whitespace, table-row alignment preserved)
- [x] Phase 4: doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; flip PLAN.md `CORE-097.5` to stub form (kept in-place under CORE-EPIC-097 per epic-lifecycle convention); move tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill-survey)
- [[CORE-097.1]] — sibling Discovery (P2.a adoption shape recommended this skill)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed and approved as P2.a by sibling Discovery `CORE-097.1`
  (`/ft-quality` ranked among 5 recommended adoptions; small ~50 LOC est.).
  Parent epic `CORE-EPIC-097` motivates the adoption. PLAN.md description is
  concrete (sequence lint + typecheck + test; project-agnostic with
  stack-graceful detection); user-locked scoping decisions resolve every
  open ambiguity. No scope ambiguity that warrants re-scope or de-scope;
  small bounded surface (~one new skill + one command stub + 3 doc edits).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `_project/tasknote/archive/core/CORE-097.1.md` — sibling Discovery; ranked `/ft-quality` as P2.a with claude-skills-starter's `/quality` as inspiration; locked cost estimate (~50 LOC) and adoption verdict ("Selective adopt — `/ft-quality` (sequence lint+typecheck+test outside tasknote flow)")
- `_project/tasknote/archive/core/CORE-097.2.md` — sibling implementation child (`/ft-stats`); canonical recent precedent for adding a new globally-installed utility skill. Same shape: SKILL.md + command stub + bundled-skills row + SPEC slug + MIGRATION §1.0 symlink block
- `claude/skills/ft-stats/SKILL.md` + `claude/commands/ft-stats.md` — closest existing analogue (globally-installed utility skill, numbered-step body, "stop after reporting" footer); shape to mirror
- `claude/skills/ft-flowtron/SKILL.md` — "Bundled skills" table; row needs to be added between `/ft-stats` and `/ft-new-project`
- `SPEC.md` lines 81-97 §"Skill namespace" — bundled-skills slug list to extend
- `docs/MIGRATION.md` §1.0 (lines 36-48) — adopter-facing global-install symlink blocks; precedent for `/ft-flowtron` and `/ft-stats`; new block goes between `/ft-stats` and `/ft-release`
- `_project/tasknote/README.md` §"AI-referenced docs" — Phase 4 closure sweep target list (README / SPEC / MIGRATION / CLAUDE-snippet)
- Upstream `/quality` (fetched from `github.com/angakh/claude-skills-starter`): markdown command stub (5 lines) delegating to `.claude/commands/scripts/quality.sh`; bash script hardcodes `LINT_COMMAND="npm run lint"` / `TYPECHECK_COMMAND="npm run typecheck"` / `TEST_COMMAND="npm test"` with `RUN_LINT/TYPECHECK/TEST=true` toggles and `set -e` fail-fast

### Archive skim findings

Skimmed `_project/tasknote/archive/core/` (CORE-001 through CORE-097.4). Most relevant precedents:

- **CORE-097.1** (2026-05-18) — sibling Discovery; locks adoption shape, source inspiration, cost estimate. Load-bearing.
- **CORE-097.2** (2026-05-18) — sibling `/ft-stats` implementation; canonical recent template for adding a new globally-installed utility skill. Reusing its file-set (SKILL.md + command stub + bundled-skills row + SPEC slug + MIGRATION §1.0 block) and Phase 4 doc-drift sweep shape.
- **CORE-084 / CORE-090** (2026-05-11 / 2026-05-14) — `flowtron-info-skill` → `ft-flowtron`; canonical info-skill shape (YAML frontmatter + numbered-step body + "stop after printing"). `/ft-quality` mirrors this for the run-and-report shape.
- **CORE-104** (2026-05-17) — skill namespace prefix; `ft-` is canonical for bundled skills + `claude/commands/<name>.md` stub is the wiring shape. Already followed by ft-flowtron, ft-stats.
- **CORE-079 / CORE-086** (2026-05-11 / 2026-05-14) — fence langtag hygiene; relevant for the markdown mental-pass.

No prior tasknote has shipped a skill that **invokes external tooling** via Bash (ft-stats / ft-flowtron are read-only; the audit family writes findings to PLAN.md but doesn't run build tooling). This is the first "run project commands and report" skill — pattern is novel for flowtron but the SKILL.md + command-stub wiring shape is identical to ft-stats.

### Drift check

- `claude/skills/ft-stats/` + `claude/commands/ft-stats.md` — present, mirrors the target shape ✓
- `claude/skills/ft-flowtron/SKILL.md` "Bundled skills" table — present at line 42+; `/ft-stats` row at line 56 between `/ft-audit-performance` and `/ft-new-project`; insertion point for `/ft-quality` is between `/ft-stats` (line 56) and `/ft-new-project` (line 57) ✓
- `SPEC.md` §"Skill namespace" slug list — present at lines 81-91; `/ft-stats` slug is mid-list; `/ft-quality` slug appends naturally ✓
- `docs/MIGRATION.md` §1.0 — present at lines 16-59; `/ft-stats` block at lines 43-48; `/ft-release` block at lines 50-55; insertion point is between them (after line 48, before line 50) ✓
- `_project/tasknote/README.md` §"AI-referenced docs" list — present at line 34-37; 4 docs (README / SPEC / MIGRATION / CLAUDE-snippet) ✓
- Upstream `/quality` source — fetched from `raw.githubusercontent.com/angakh/claude-skills-starter/main/.claude/commands/scripts/quality.sh` ✓
- Stack-graceful detection wording in PLAN.md description — confirmed as user-locked intent; heuristic file-sniffing is the chosen interpretation ✓

### Resolved scoping (from AskUserQuestion)

| Question | Answer |
|---|---|
| Stack detection strategy | **Heuristic file-sniffing** — `package.json` → `pyproject.toml`/`setup.cfg`/`ruff.toml` → `go.mod` → `Cargo.toml` |
| Scope (changed-only vs project-wide) | **Project-wide** (mirror upstream) — commands run as the project defines them; no git-diff slicing |
| Install pattern | **Global** (ft-stats / ft-flowtron precedent) — `docs/MIGRATION.md` §1.0 symlink block |
| Failure mode | **Fail-fast** (mirror upstream `set -e`) — first failure stops the sweep; emit labeled error |

### Implicit assumptions (no further clarification needed)

- **No bash script.** Flowtron's `Zero scripts` core principle (SPEC §"Core principles" #2 and §"What flowtron does NOT provide") forbids the upstream `quality.sh` shape. The SKILL.md body codifies the detection-and-run contract; the assistant invokes commands via its Bash tool inline. This is a literal translation of the upstream behavior into flowtron's idiom.
- **Per-stack default commands** (codified in SKILL.md Step 1 table):
  - **Node** — `npm run lint` / `npm run typecheck` (or `type-check` if present) / `npm test`. Run whichever scripts exist in `package.json`; skip the rest with a one-line note.
  - **Python** — `ruff check .` (lint, if ruff is configured) / `mypy .` (typecheck, if mypy is configured) / `pytest` (test, if present). Adopters with different tooling fork the skill.
  - **Go** — `go vet ./...` (lint) / `go build ./...` (typecheck-equivalent — Go's compile is its type check) / `go test ./...` (test). All three always run when `go.mod` is detected.
  - **Rust** — `cargo clippy --all-targets -- -D warnings` (lint) / `cargo check` (typecheck) / `cargo test` (test). All three always run when `Cargo.toml` is detected.
- **Multi-stack repos** — if multiple manifests are present (e.g., flowtron itself has both `viz/package.json` for the frontend + future Python tooling), run **each detected stack in sequence** (Node → Python → Go → Rust order). Fail-fast applies across the whole sweep (not per-stack).
- **Working directory** — the skill runs from repo root (the cwd where the user invokes `/ft-quality`). Manifest detection is at repo root only, not a recursive walk — adopters with subdirectory frontends (like flowtron's `viz/`) declare their commands via npm scripts in the root `package.json` that delegate (e.g., `"lint": "npm --prefix viz run lint"`). Documented in SKILL.md.
- **Tool-not-installed runtime errors** (e.g., `ruff: command not found`) — treated as a fail-fast hit. Surface the underlying error verbatim plus a one-line hint ("hint: install ruff with `pip install ruff`" or equivalent stack-conditional hint).
- **No `--write`, no args** — first version is zero-arg. Future iterations could add `--all` (force all stacks) or `--only <stack>` (limit to one); deferred until concrete demand surfaces.
- **No PLAN.md interaction** — pure run-and-report; does not flip PLAN.md lines, write to `_project/STATS.md`, or open tasknotes. Independent of `/ft-task` Phase 3 (which carries its own lint/test boxes; users can invoke `/ft-quality` mid-Phase-3 if they want, but the skills don't talk to each other).
- **Stop-after motion** — same as `/ft-stats` / `/ft-flowtron`: print the run output + final summary line, then stop. No follow-up question, no next-move suggestion, no `📦` gate.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `ft-stats` (CORE-097.2) is the canonical recent precedent for a globally-installed utility skill: YAML frontmatter (`name:` + 1-line `description:`) + numbered-step body + "stop after reporting" footer. The same five-file edit shape — new SKILL.md + new command stub + `/ft-flowtron` bundled-skills row + `SPEC.md` namespace slug + `docs/MIGRATION.md` §1.0 symlink block — applies identically. Reusing the ft-stats template wholesale; the run-and-report flow (Steps 1-5) replaces ft-stats's parse-and-render flow.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill body; no executable surface to test directly — the dogfood mental-pass below is the verification)

**Implementation Notes:**

### Files created

| File | Role |
|---|---|
| `claude/skills/ft-quality/SKILL.md` | Skill body — Step 0 inputs/args → Step 1 detect stacks → Step 2 build run plan with per-stack command tables → Step 3 fail-fast sweep with per-step status lines → Step 4 success summary → Step 5 stop |
| `claude/commands/ft-quality.md` | Command stub (delegates to the skill; CORE-104 wiring pattern; 5 lines) |

### Files edited

| File | Edit |
|---|---|
| `claude/skills/ft-flowtron/SKILL.md` | Added `/ft-quality` row to "Bundled skills" table (between `/ft-stats` and `/ft-new-project`) |
| `SPEC.md` | Added `/ft-quality` to bundled-skills slug list in §"Skill namespace" (line 86); rebalanced the line break since the list lengthened |
| `docs/MIGRATION.md` | Added adopter-facing `/ft-quality` global-install symlink block in §1.0 (between `/ft-stats` and `/ft-release` blocks) |

### Key design decisions

- **No bash script** — translated upstream `/quality`'s `quality.sh` into a markdown SKILL.md body that codifies detection + run logic; the assistant invokes commands via its Bash tool inline. Honors flowtron's Zero-scripts core principle.
- **Root-only manifest detection** — no recursive walk. Adopters with subdirectory frontends declare delegating scripts in root `package.json` (e.g., `"lint": "npm --prefix viz run lint"`). Keeps the detection step deterministic and cheap.
- **Step numbering across stacks** — single global `STEP/TOTAL_STEPS` counter across all detected stacks (not per-stack reset). For multi-stack repos, the user sees `Step 4/6: Python — Lint...` etc., which makes the global progress visible.
- **Single-stack shortcut** — when only one stack is detected, omit the `<Stack> —` prefix from step labels for cleaner output (mirrors the upstream's single-stack form). Multi-stack repos retain the prefix.
- **Skipped commands don't increment denominator** — `TOTAL_STEPS` counts surviving (non-skipped) commands only. A repo with Node + Python where Node has no `lint` script renders as `Step 1/5` not `Step 1/6` with a separate `Skipped:` line.
- **Tool-not-installed = fail-fast** — treats `command not found` the same as a non-zero exit. Surfaces the underlying error verbatim. Adopters can pre-flight by reading the per-stack command table in Step 2.
- **No args (zero-arg first version)** — defers `--all` / `--only <stack>` flags until concrete demand surfaces. Matches the upstream's bare invocation.
- **Global install** — `/ft-quality` joins `/ft-stats` and `/ft-flowtron` in `docs/MIGRATION.md` §1.0's adopter-facing symlink blocks. The SKILL.md body is project-agnostic; adopters install once, use everywhere.

### Dogfood pass (against flowtron's own repo root)

Ran `ls -1 package.json pyproject.toml setup.cfg ruff.toml go.mod Cargo.toml` at flowtron root → zero hits. `viz/package.json` exists but is in a subdir, not root.

→ Under the documented contract, `/ft-quality` at flowtron-self root would hit the **empty-state branch** and print:

```text
🔍 /ft-quality: no recognized stack manifests found at repo root.
   Recognized: package.json · pyproject.toml/setup.cfg/ruff.toml · go.mod · Cargo.toml
```

This is the **intended** behavior — flowtron-self's frontend (viz/) is the dev surface, not a project quality gate; the canonical viz commands already live in `_project/tasknote/README.md` §"Project quick commands" (`npm test --prefix viz`, `npm run typecheck --prefix viz`). If flowtron-self ever wants a `/ft-quality`-style gate, adding a root `package.json` with delegating scripts is the documented path. Dogfooded the empty-state branch; no surprises.

For adopters: a typical adopter project (e.g., a Vite + TS frontend with `package.json` at root) would hit Node detection and run the user's three scripts.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown skill body + 3 doc edits; no executable surface)
- [x] Ran lint/type-check on changed code — markdown mental-pass: SKILL.md frontmatter valid YAML (name + description fields); fence langtags `text` per CORE-079 / CORE-086; tables well-formed (4-column run plan + 5-column command table); no trailing whitespace; ft-flowtron table row alignment preserved (pipes lined up); SPEC.md namespace slug list rebalanced cleanly across the line break; MIGRATION.md `/ft-quality` symlink block alignment matches surrounding `/ft-stats` and `/ft-release` blocks
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

No executable code paths touched. The dogfood mental-pass against flowtron's own repo root (recorded in Phase 2 Implementation Notes) validates the empty-state branch. Algorithm correctness for the populated branches relies on the SKILL.md body — a future adopter dogfood (Node repo, Python repo, mixed) would be the next-level verification but isn't blocking for the first ship of the skill.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `CORE-097.5` line flipped to stub form (kept in-place under CORE-EPIC-097 per epic-lifecycle convention — parent stays open until audit `.7` closes the cohort); tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" §"Conditional skip rule")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — only references `/ft-task`, `/ft-release`, `/ft-new-project` as illustrative examples ("skills like …"), not as an exhaustive roster (matches CORE-097.2 precedent) |
| `SPEC.md` | **Updated** — added `/ft-quality` to bundled-skills slug list in §"Skill namespace" (line 86) |
| `docs/MIGRATION.md` | **Updated** — added adopter-facing `/ft-quality` global-install symlink block in §1.0 (between `/ft-stats` and `/ft-release` blocks) |
| `claude/CLAUDE-snippet.md` | no change — adopter snippet lists per-project workflow-lifecycle skills only; `/ft-quality` (like `/ft-stats` and `/ft-flowtron`) is globally installed and discoverable via `/ft-flowtron`'s bundled-skills table (matches CORE-097.2 precedent) |

### Recap

Added `/ft-quality` — a globally-installable run-and-report skill that sequences lint + typecheck + test against the project with heuristic stack detection (Node / Python / Go / Rust) and fail-fast behavior. Second adoption from `CORE-097.1`'s Discovery survey (P2.a; inspired by claude-skills-starter's `/quality`); translated the upstream `bash` script into flowtron's no-script markdown-SKILL idiom — the assistant runs commands inline via its Bash tool guided by the SKILL.md detection-and-run contract.

Files: `claude/skills/ft-quality/SKILL.md` (new, ~80 LOC mirroring `ft-stats`'s numbered-step shape — Step 0 args → Step 1 detect → Step 2 plan → Step 3 fail-fast sweep → Step 4 summary → Step 5 stop) + `claude/commands/ft-quality.md` (new, 5-line command stub per CORE-104). Wiring: row added to `/ft-flowtron`'s bundled-skills table; slug added to `SPEC.md` §"Skill namespace"; adopter-facing global-install symlink block added to `docs/MIGRATION.md` §1.0. Dogfood pass against flowtron's own repo root validated the empty-state branch (no root manifests → friendly message); populated-branch verification deferred to first adopter use.

**Archived:** 2026-05-18
