---
title: screenshot-policy-rewrite
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-483, CORE-483.1]
---

# CORE-483.2 | screenshot-policy-rewrite

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-483]] · [[CORE-483.1]]

## 🎯 Goal

Rewrite the personal-layer screenshot policy so screenshots become an ephemeral agent-self-verification tool landing in absolute `~/Code/_screenshots/<project>/`, and retire the contradictory `/tmp/playwright-mcp` memory.

## ✅ Acceptance

- [x] Global `~/.claude/CLAUDE.md` Playwright-screenshot rule rewritten: trigger is agent self-verification of rendered UI (or explicit operator ask) only — never routine per-task evidence — and `👁️ CONFIRM` is named as the acceptance mechanism
- [x] The same rule names the destination as absolute `~/Code/_screenshots/<project>/<name>.png`; `.flowtron/screenshots/` no longer appears as a global instruction
- [x] `~/.claude.json` playwright MCP `--output-dir` repointed off `/tmp/playwright-mcp` to the literal absolute path `/Users/fakeneuron/Code/_screenshots` (JSON args are not shell-expanded, so no `~`), verified by re-grep after the write
- [x] Memory `feedback_playwright_artifact_paths.md` rewritten in place to the new trigger + destination (no duplicate memory file), and its `MEMORY.md` index hook updated to match
- [x] Flowtron stays silent: no flowtron contract doc gains a screenshot rule, and the tracked `.flowtron/screenshots/viz-board.png` README asset ([[CORE-383]]) is untouched
- [x] Phase 4 doc-drift sweep run across all 17 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries

## 🧩 Subtasks

- [x] Draft the replacement `~/.claude/CLAUDE.md` bullet — trigger clause + absolute destination + `👁️ CONFIRM` pointer, matching the surrounding "Tech Stack Tendencies" bullet style
- [x] Edit `~/.claude/CLAUDE.md:54` in place (surgical single-bullet replacement; touch nothing adjacent)
- [x] Edit `~/.claude.json` playwright `args` `--output-dir` value → `/Users/fakeneuron/Code/_screenshots`; re-grep to confirm the write persisted (live config, app-owned)
- [x] Rewrite the memory body + `description:` frontmatter to the new policy; update the one-line `MEMORY.md` index hook
- [x] Re-grep the whole global layer (`~/.claude/`, `~/Code/CLAUDE.md`) for surviving `/tmp/playwright-mcp` or `.flowtron/screenshots` instructions
- [x] Phase 3: re-read all three edited surfaces; confirm no flowtron-repo file changed beyond the tasknote/PLAN, and `README.md:21` viz-board reference is intact
- [x] Phase 4: doc-drift sweep (17 entries), flip the `.2` PLAN line to stub form keeping 2-space nesting under the active parent, archive the tasknote, commit

## 🔗 Related

- [[CORE-EPIC-483]] — parent epic (screenshot-discipline)
- [[CORE-483.1]] — Discovery; locked the policy this task writes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Policy was locked by the operator one day ago in [[CORE-483.1]]'s "Resolved scoping" table and every cited surface still reads exactly as Discovery described it. This is the epic's load-bearing child — `.3` and `.4` are both declared Sequential after it.

- [x] Read relevant source files — `~/.claude/CLAUDE.md` (rule at :54), memory `feedback_playwright_artifact_paths.md` + `MEMORY.md` index, `~/.claude.json` playwright `mcpServers` block (:3885–3894), `SPEC.md` §Phase 3 (`👁️ CONFIRM`, :782), `.flowtron/tasknote/README.md` §"AI-referenced docs", `README.md:21`

- [x] **Best Practices Review** — N/A: no code and no module boundary. The work is three surgical single-value edits across personal-layer config/instruction files.

- [x] **Archive skim** — `grep -rl screenshot archive/core/` → 12 hits, all incidental (evidence-type mentions) except [[CORE-383]]; see Discovery Notes

- [x] **Drift check** — every cited path verified live at HEAD; two findings that change *how* the edits are made (tilde expansion, live-config ownership) but not what they say; see Discovery Notes

- [x] Asked clarifying questions — none genuinely ambiguous; [[CORE-483.1]] resolved all six scoping decisions with the operator. Explicit assumptions logged below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Surface inventory (verified live, 2026-08-27).** Three edit targets, all outside any git repo:

| Surface | Current state | Target |
|---|---|---|
| `~/.claude/CLAUDE.md:54` | *"Playwright screenshots (`browser_take_screenshot`) must always be saved to `.flowtron/screenshots/<name>.png` — never a bare filename at the project root. Create the directory first if it doesn't exist."* | Trigger clause (self-verification only) + absolute `~/Code/_screenshots/<project>/` + `👁️ CONFIRM` pointer |
| `~/.claude.json:3892` | `"--output-dir", "/tmp/playwright-mcp"` | `"/Users/fakeneuron/Code/_screenshots"` |
| memory `feedback_playwright_artifact_paths.md` (117d old) + `MEMORY.md:5` | prescribes `/tmp/playwright-mcp/` | rewritten in place to the new policy |

**Drift finding 1 — no tilde expansion in MCP args.** The `args` array in `~/.claude.json` is passed to `npx` as an argv vector; no shell is involved, so a `~/Code/_screenshots` value would be taken literally as a relative directory named `~`. The existing `/tmp/playwright-mcp` value is already absolute, confirming the convention. The JSON gets the fully-expanded `/Users/fakeneuron/Code/_screenshots`; the human-facing `CLAUDE.md` rule keeps the readable `~/Code/_screenshots/<project>/` form.

**Drift finding 2 — `~/.claude.json` is app-owned and live.** `mtime` was 17:23 today, i.e. Claude Code rewrites this file during a session. An external edit can in principle be clobbered by a later flush. Mitigation: write it, immediately re-grep to confirm persistence (Acceptance criterion 3), and note in the recap that the MCP server only picks up the new `--output-dir` on the next session start.

**Drift finding 3 — `~/Code/_screenshots/` does not exist yet.** Correct per the epic split: creating it is explicitly [[CORE-483.4]]'s first step. `@playwright/mcp` creates its `--output-dir` on demand, so the repoint is safe in the interim. Not pulled forward.

**Archive skim findings.**

- **[[CORE-383]]** — the one legitimate *tracked* use: `README.md:21` embeds `.flowtron/screenshots/viz-board.png` as the hero shot, privacy-vetted against an isolated `FLOWTRON_VIZ_WORKSPACE`. Untouched by this task, and named as an explicit Acceptance guard so a later reader doesn't "clean it up".
- The other 11 archive hits (`CORE-008`, `-024`, `-098.5`, `-098.10`, `-207`, `-329.3`, `-382`, `-421.3`, `-425.3`, `-425.N`, `-483.1`) mention screenshots only as an evidence type or in the CORE-383 lineage. No archived tasknote establishes a competing path convention.

**Flowtron-silence check (verifies the `.3` resolution holds from this side).** `grep -rn screenshots` over the flowtron repo, archive excluded, returns four files: `README.md:21` (the CORE-383 asset), `claude/skills/ft-task/step-4-debug-mode.md:18` (lists "log lines, screenshots, stack traces" as debug evidence — no path, no mandate), `.flowtron/PLAN.md` (this epic), and this tasknote. Flowtron's `.gitignore` carries no screenshot entry, consistent with tracking `viz-board.png`. **Flowtron mandates nothing today and gains nothing here** — confirmed, no flowtron edit in scope.

**Global-layer completeness.** `~/fakeneuron/CLAUDE.md` does not exist; `~/Code/CLAUDE.md` covers git workflow only. `~/.claude/settings.json` references playwright tool *names* and a `pkill -f playwright-mcp` hook (process cleanup, unaffected by an output path). `~/.claude/skills/clean-stray/SKILL.md` matches `playwright-mcp` as a *process* pattern, not a path. So `~/.claude/CLAUDE.md:54` is the sole global instruction surface.

**Explicit assumptions (no clarifications needed):**

1. **Memory is rewritten, not deleted.** Its anti-pattern half — never let a bare relative `filename` drop debris in the repo cwd — is still correct and still worth carrying; only the destination changed. Memory guidance says update the existing file rather than create a duplicate.
2. **Closure commits PLAN + archive only.** All three deliverables live outside any git repo (`~/.claude` is not a working tree). This is the shape [[CORE-483.1]] already recorded and the operator accepted ("the epic's edits land in personal-layer files … by design"), so the paper-complete guard's workflow-only carve-out applies; the tasknote's verification evidence is the durable record.
3. **`.flowtron/screenshots/` survives as an adopter-side gitignored safety net**, documented in natabula by [[CORE-483.3]] — the global rule simply stops naming it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the replacement `CLAUDE.md` bullet keeps the surrounding "Tech Stack Tendencies" shape (single `-` bullet, backticked tool/path tokens, em-dash rationale clause) and mirrors the sibling `- MCP servers …` bullet's absolute-path convention. The memory rewrite keeps the established `fact → **Why:** → **How to apply:**` body shape of its siblings.

- [x] **Minimal refactor gate** — three single-surface replacements, nothing adjacent touched. The memory's frontmatter shape was briefly changed and reverted to whatever the harness normalizes to (`metadata:` + auto `modified:`), so the file matches what the memory layer itself writes.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no executable surface

**Implementation Notes:**

Three edits, all outside any git repo:

1. **`~/.claude/CLAUDE.md:54`** — one bullet replaced. Old text mandated `.flowtron/screenshots/<name>.png` unconditionally. New text leads with the *trigger* (`agent self-verification tool, not evidence`; only for checking rendered UI of a just-made change, or on explicit ask), names `👁️ CONFIRM` against the live view as the acceptance mechanism, then gives the destination as absolute `~/Code/_screenshots/<project>/<name>.png` with both prohibitions kept (no bare filename → repo cwd; never inside a project repo). Generalized `Playwright screenshots` → `Screenshots (browser_take_screenshot, any browser MCP)` so the rule also binds `claude-in-chrome`, which did not exist when the old rule was written.
2. **`~/.claude.json:3892`** — playwright MCP `--output-dir`: `/tmp/playwright-mcp` → `/Users/fakeneuron/Code/_screenshots`. Fully expanded per drift finding 1. Line numbers and the surrounding `mcpServers.playwright` block are otherwise byte-identical.
3. **memory `feedback_playwright_artifact_paths.md` + `MEMORY.md:5`** — rewritten in place (no new file, no duplicate). The still-valid half survives (a bare relative `filename` resolves to the repo cwd and leaves debris in `git status`); the destination and the trigger are new; the **Why:** now cites the CORE-EPIC-483 evidence (~300MB across ~20 repos, 68+ archived tasknotes citing paths git never preserved) and `SPEC.md` §Phase 3. The `.flowtron/screenshots/` mention that survives in **How to apply:** is deliberate and correctly framed — an adopter-side gitignored safety net for tools that ignore the setting, explicitly "never write there deliberately" — which is the [[CORE-483.3]] framing, not the retired global instruction. One carve-out preserved: the [[CORE-383]] tracked README hero shot.

Nothing was pulled forward from [[CORE-483.3]] (natabula deposit wording) or [[CORE-483.4]] (create `~/Code/_screenshots/`, prune adopters).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no executable surface (markdown + JSON config)

- [x] Ran lint/type-check on changed code — JSON validity of `~/.claude.json` confirmed by re-grep returning the intact `args` array; markdown mental-pass on the other two

- [x] **Quality assertions** — no duplication (each policy surface states the rule once, with the memory pointing at behavior rather than restating the destination twice), no dead references, `.flowtron/screenshots/` survives only where it is *correct* (memory safety-net clause), no public-surface growth

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend surface. Fittingly, this is the very ask the new policy elevates.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Post-write verification (all three surfaces re-read, not assumed):**

| Check | Result |
|---|---|
| `sed -n '53,56p' ~/.claude/CLAUDE.md` | New bullet in place at :54; neighbours (:53 MCP servers, :55 defer-to-project) byte-unchanged |
| `grep -A1 '"--output-dir"' ~/.claude.json` | `:3892 "/Users/fakeneuron/Code/_screenshots"` — the write **persisted** through the live app's own flushes (drift finding 2 mitigated) |
| `grep -rn "tmp/playwright-mcp\|flowtron/screenshots"` over `~/.claude/CLAUDE.md`, `~/Code/CLAUDE.md`, memory dir | One hit only: the memory's deliberate adopter-safety-net clause. **Zero** surviving `/tmp/playwright-mcp` instructions anywhere in the global layer |
| `git status --porcelain` | `?? .flowtron/tasknote/CORE-483.2.md` only — no personal-layer edit leaked into the repo |
| `README.md:21` + `ls .flowtron/screenshots/viz-board.png` | Reference intact; asset intact (64507 bytes, Jul 31) — [[CORE-383]] carve-out untouched |

**Not verifiable in-session:** the repointed `--output-dir` takes effect only when the playwright MCP server next starts, i.e. on the operator's next session. The value is correct on disk; runtime confirmation is deferred.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 17 entries: `README.md`: no change · `AGENTS.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/AGENTS-snippet.md`: no change · `codex/AGENTS-snippet.md`: no change · `cursor/AGENTS-snippet.md`: no change · `grok/AGENTS-snippet.md`: no change · `docs/CONVENTIONS.md`: no change · `CONTRIBUTING.md`: no change · `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change · `docs/PLATFORMS.md`: no change · `claude/CAPABILITIES.md`: no change · `docs/AGENT-COMPAT.md`: no change · `docs/EXTERNAL-AGENTS.md`: no change · `docs/WORKTREES.md`: no change. **Flowtron stays silent by design** — the whole deliverable lands in the personal layer (`~/.claude/CLAUDE.md`, `~/.claude.json`, project memory); no flowtron contract doc mandates, or now gains, a screenshot rule. `SPEC.md` §Phase 3's `👁️ CONFIRM` line — which this policy now points *at* — already reads correctly and was deliberately left untouched.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form keeping its 2-space nesting under the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline on conditional skip

**Final Summary:**

Retired the keep-every-screenshot habit at its source. The global `~/.claude/CLAUDE.md` rule that unconditionally mandated `.flowtron/screenshots/<name>.png` now leads with a *trigger* instead of a path: screenshots are an agent self-verification tool, taken only to check the rendered UI of a just-made change or on explicit ask, with `👁️ CONFIRM` against the operator's live view named as the acceptance mechanism — the contract `SPEC.md` §Phase 3 already carried but the personal layer was overriding.

Three surfaces changed, none in a git repo: `~/.claude/CLAUDE.md:54` (one bullet, rewritten and generalized from "Playwright screenshots" to any browser MCP so it binds `claude-in-chrome` too); `~/.claude.json:3892` (playwright MCP `--output-dir`: `/tmp/playwright-mcp` → `/Users/fakeneuron/Code/_screenshots`, fully expanded because MCP `args` are an argv vector with no shell to expand `~`); and the 117-day-old memory `feedback_playwright_artifact_paths.md`, rewritten in place — its still-correct anti-pattern half kept, its stale `/tmp` destination replaced, its **Why:** rebuilt on the epic's own evidence.

Verification: each surface re-read after writing; the `~/.claude.json` edit confirmed to have **persisted** through the live app's flushes; a global-layer grep leaves **zero** surviving `/tmp/playwright-mcp` instructions; `git status` shows the personal-layer edits left no trace in the repo; [[CORE-383]]'s tracked `viz-board.png` hero shot verified intact. Refactors: none — three single-surface replacements, nothing adjacent touched. Documentation verdict: 17/17 "no change", flowtron silent by design. Deferred: the repointed `--output-dir` binds on the next session start (not runtime-verifiable here), and `~/Code/_screenshots/` is created by [[CORE-483.4]] — `@playwright/mcp` makes its output dir on demand, so the gap is safe.

Maintainability effect: the instruction that manufactured ~300MB of gitignored PNGs across ~20 repos and 68+ archived tasknotes citing paths git never preserved is gone, and the two personal-layer surfaces that contradicted each other for 117 days now agree. Unblocks [[CORE-483.3]] and [[CORE-483.4]], which the Fan-out declares Sequential after this child.

**Archived:** 2026-08-27
