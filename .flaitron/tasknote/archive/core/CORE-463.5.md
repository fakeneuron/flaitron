---
title: wiring-and-docs
status: completed
tags: []
created: 2026-08-23
due:
related-tasks: [CORE-EPIC-463, CORE-463.2, CORE-463.3, CORE-463.4]
blocked-by:
  - CORE-463.2
  - CORE-463.3
  - CORE-463.4
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-463.5 | wiring-and-docs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-463]]

## 🎯 Goal

Wire the new `/ft-refactor` skill across the claude + codex skill trees and command wrappers, reconcile the `ft-new-project` symlink block and `ft-flowtron` roster counts to the final shipped set, and sweep the affected docs (MIGRATION §1.2.1, SPEC §"Skill namespace", GLOSSARY, CONVENTIONS, PLATFORMS, AGENTS snippets).

## ✅ Acceptance

- [x] `claude/commands/ft-refactor.md` command wrapper exists and names its own basename in the invoke sentence (SPEC §"Skill namespace" wrapper-name invariant check prints nothing)
- [x] `codex/skills/ft-refactor/SKILL.md` wrapper exists, matching the sibling codex wrapper shape (frontmatter + "Read and follow" + translation bullets)
- [x] Flowtron self-host `.claude/commands/ft-refactor.md` + `.claude/skills/ft-refactor` symlinks resolve (PLATFORMS §"Flowtron's own checkout is not an adopter" — full-inventory mirror)
- [x] Adopter symlink blocks carry ft-refactor in all four snippets (`claude` 22→24 lines, `codex`, `cursor`, `grok`)
- [x] `ft-new-project/SKILL.md` Step 3 heading + Step 7 staging + Step 8 verify updated (twenty-two → twenty-four, +2 readlinks)
- [x] `ft-flowtron` bundled-skill table has an `/ft-refactor` row (18 → 19)
- [x] Roster enumerations updated: `SPEC.md` §"Skill namespace", root `AGENTS.md` §Workflow + `claude/AGENTS-snippet.md` paste-block (KEEP-IN-SYNC pair), `README.md` §Bootstrapping, `docs/MIGRATION.md` (§1.2 / §1.6 / §1.7 / smoke list), `docs/PLATFORMS.md` (rows 35/74/75 + stub-count worked example), `SPEC/tasknote-selection.md`, `docs/AGENT-NEUTRALITY.md`
- [x] `docs/GLOSSARY.md` carries a `/ft-refactor` entry in alphabetical position
- [x] `docs/CONVENTIONS.md` swept — verdict recorded ("no change" is a valid outcome)
- [x] Zero stale counts: no remaining "eight tasknote", "twenty-two", "nine total", or `18` stub/skill counts that should have moved

## 🧩 Subtasks

- [x] `claude/commands/ft-refactor.md` — new command wrapper (frontmatter `description` + `argument-hint`, invoke sentence naming `ft-refactor`, peer-comparison paragraph)
- [x] `codex/skills/ft-refactor/SKILL.md` — new codex wrapper mirroring `codex/skills/ft-spec/SKILL.md`
- [x] Self-host wiring — `ln -s` `.claude/commands/ft-refactor.md` + `.claude/skills/ft-refactor`
- [x] `claude/AGENTS-snippet.md` — +2 `ln -s` lines (22→24) and an `/ft-refactor` bullet in the paste-block §Workflow roster
- [x] `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` — one `ln -s` line each, alphabetical placement
- [x] Root `AGENTS.md` §Workflow — add `/ft-refactor` to the peer-skill roster (KEEP-IN-SYNC pair with the paste-block)
- [x] `claude/skills/ft-new-project/SKILL.md` — Step 3 heading, Step 7 staging (+2 paths), Step 8 "twenty-two"→"twenty-four" + 2 readlinks
- [x] `claude/skills/ft-flowtron/SKILL.md` — `/ft-refactor` table row (place next to `/ft-spec` / `/ft-epic-discovery` planning peers)
- [x] `docs/MIGRATION.md` — §1.2 (eight→nine family + purpose clause), §1.6 staging (+2), §1.7 verify menu, §"smoke" list (nine→ten)
- [x] `docs/PLATFORMS.md` — capability row 35, Installed-surface policy rows 74/75, worked-example stub/skill counts (18→19)
- [x] `SPEC.md` §"Skill namespace" — add `/ft-refactor`
- [x] `SPEC/tasknote-selection.md` — add a "Plan a refactor (`/ft-refactor <target>`)" bullet block after the spec pair
- [x] `docs/AGENT-NEUTRALITY.md` — add `/ft-refactor` to the tasknote-selection.md canonical-names row
- [x] `docs/GLOSSARY.md` — new `**/ft-refactor**` entry before `**/ft-update**`
- [x] `docs/CONVENTIONS.md` — sweep and record verdict
- [x] Verification pass — wrapper-name invariant loop, symlink resolution, count/stale-reference greps

## 🔗 Related

- [[CORE-EPIC-463]] — parent epic
- [[CORE-463.1]] — epic Discovery; Fan-out declares this child Sequential after .2/.3/.4
- [[CORE-463.3]] — shipped `claude/skills/ft-refactor/` (`blocked-by:`)
- [[CORE-463.2]] — shipped the `structure` audit domain (`blocked-by:`)
- [[CORE-463.4]] — shipped the self-filling audit scaffold bootstrap (`blocked-by:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2`/`.3`/`.4` shipped; the `ft-refactor` skill body exists with zero wiring, rosters, or docs around it. The three counts in the PLAN line all verify against HEAD.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Relevance:** Proceed. `.2`/`.3`/`.4` all landed (afcd48f / 7ddf41f / a9934b0); `claude/skills/ft-refactor/SKILL.md` exists on disk with zero wiring around it. The Fan-out Sequential claim is satisfied.

**Surface inventory (verified by grep, not recall):**

| Surface | Current state | Needed |
|---|---|---|
| `claude/commands/ft-refactor.md` | absent (18 stubs, 19 skill dirs) | new wrapper |
| `codex/skills/ft-refactor/` | absent (18 codex wrappers) | new wrapper |
| self-host `.claude/{commands,skills}` | no `ft-refactor` link | 2 symlinks |
| `claude/AGENTS-snippet.md` | 22 `ln -s` lines; paste-block roster | 24 lines + bullet |
| `codex` / `cursor` / `grok` snippets | one `ft-spec` line each | +1 line each |
| `ft-new-project/SKILL.md` | Step 3 heading · Step 7 staging · Step 8 "twenty-two" | +2 everywhere |
| `ft-flowtron/SKILL.md` | 18-row bundled table | 19 rows |
| `SPEC.md` §"Skill namespace" | 16-name list | +`/ft-refactor` |
| root `AGENTS.md` §Workflow | peer-skill roster (KEEP-IN-SYNC) | +`/ft-refactor` |
| `README.md` §Bootstrapping | "the eight tasknote skills" | nine |
| `docs/MIGRATION.md` | §1.2 "eight tasknote family" · §1.6 staging · §1.7 menu · smoke "nine total" | nine / +2 / +1 / ten |
| `docs/PLATFORMS.md` | rows 35 ("Eight tasknote skills") · 74 · 75 · worked example "18 stubs / 18 bodies" | nine / 19 / 19 |
| `SPEC/tasknote-selection.md` | `/ft-spec` bullet pair, no refactor entry | new bullet block |
| `docs/AGENT-NEUTRALITY.md` | row 38 canonical-name list | +`/ft-refactor` |
| `docs/GLOSSARY.md` | `**/ft-update**` entry, no refactor term | new entry |
| `docs/CONVENTIONS.md` | no skill roster or count | sweep → expect "no change" |

**Best Practices Review:** Markdown-only wiring; no module boundaries. The load-bearing duplication is *intentional* (per-platform snippets, KEEP-IN-SYNC comment pairs) — extend each mirror, never collapse them. `/ft-refactor`'s own SKILL.md Notes declare **"Install tier: symlinked … wired into adopters via `/ft-new-project` + `docs/MIGRATION.md` §1.2"**, which settles the adopter-subset question: it joins the family as the ninth member rather than becoming a global-only utility or a fork surface.

**Archive skim:** [[CORE-352.3]] (`ft-spec` wiring, 2026-07-12) is a near-exact precedent — same skill class (planning peer, symlinked subset), same surface list, same append-at-end-for-claude / alphabetical-for-codex placement rule. Two lessons carried forward: (a) its Final Summary records that the PLAN description named six surfaces while the real sweep hit nine plus a `README.md` drift finding — so the six named here are a summary, not a closed list; (b) it deliberately skipped `GLOSSARY.md` because `/ft-spec` introduced no vocabulary. Here the PLAN line names GLOSSARY explicitly and `/ft-refactor` does introduce a distinction worth a term (depth planner vs. `/ft-audit structure`'s breadth sweep), so an entry is written. [[CORE-463.2]] already added the `structure` row in `docs/MIGRATION.md` §1.2.1 naming `/ft-refactor` as the depth path, and the `audit-family` GLOSSARY entry — both stay as-is.

**Drift check:** All three counts in the PLAN line verified against HEAD — `claude/AGENTS-snippet.md` block is exactly 22 `ln -s` lines (→24), the `ft-flowtron` table is exactly 18 rows (→19), and `ft-new-project` Step 8 reads "twenty-two". No SPEC contract is contradicted: `/ft-refactor` gets no new banner, no new lifecycle phase, and no schema. One item *beyond* the PLAN line's letter but required by contract: `docs/PLATFORMS.md` §"Flowtron's own checkout is not an adopter" states a shipped `ft-*` slug with no `.claude/` symlink **is a wiring miss, not a policy choice**, citing the month `/ft-spec` sat unrunnable in flowtron's own checkout. `ft-refactor` is in exactly that state today, so self-host wiring is in scope.

**No clarifications needed.** Explicit assumptions: (1) `/ft-refactor` joins the adopter-installed subset as the ninth tasknote-family member (per its own SKILL.md install-tier declaration + the PLAN line's 22→24); (2) the six file names in the PLAN description are a summary — the sweep covers every mirror that enumerates the roster, matching the [[CORE-352.3]] precedent; (3) `docs/CONVENTIONS.md` is swept for drift with "no change" as an acceptable recorded verdict.

**Exit judgment:** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**New files (2):** `claude/commands/ft-refactor.md` (command wrapper — frontmatter `description` + `argument-hint`, invoke sentence naming its own basename per the SPEC wrapper-name invariant, usage pair, peer-comparison paragraph) and `codex/skills/ft-refactor/SKILL.md` (Codex wrapper, byte-parallel to `codex/skills/ft-spec/SKILL.md`).

**Self-host wiring (2 symlinks):** `.claude/commands/ft-refactor.md` + `.claude/skills/ft-refactor`. Confirmed live mid-session — `ft-refactor` appeared in the session skill roster immediately after the `ln -s`, closing the exact gap `docs/PLATFORMS.md` §"Flowtron's own checkout is not an adopter" documents from `/ft-spec`.

**Pattern survey:** every edit extends an existing mirror rather than introducing a shape. Placement rules inherited from [[CORE-352.3]] and confirmed against each file: **append-at-end** for the claude symlink block (chronological by ship order), **alphabetical** for the codex / cursor / grok blocks. No mirror was collapsed or "DRY-ed" — the per-platform duplication is load-bearing (each snippet is pasted independently by adopters) and the `KEEP IN SYNC` comment pair on the roster lines is the intended coupling mechanism.

**Minimal refactor gate:** no refactors. Every changed line adds `/ft-refactor` to an existing enumeration or moves a count. Zero deferred cleanup found.

**Counts moved:** claude symlink block 22 → 24 · `ft-flowtron` table 18 → 19 rows · `ft-new-project` Step 8 twenty-two → twenty-four · MIGRATION §1.2 eight → nine family, smoke list nine → ten · PLATFORMS worked example 18 → 19 stubs and 18 → 19 bodies · PLATFORMS row 35 Eight → Nine · README eight → nine.

**Beyond the six PLAN-named surfaces** (matching [[CORE-352.3]]'s precedent that the named list is a summary): root `AGENTS.md` peer roster, `README.md` §Bootstrapping, `SPEC/tasknote-selection.md` (new "Plan a refactor" bullet block beside the spec pair), `docs/AGENT-NEUTRALITY.md` canonical-name row, and self-host `.claude/`. `docs/MIGRATION.md` §1.2.1 got a **"Depth path: `/ft-refactor` (symlinked, not forked)"** callout mirroring the shape of the existing `/ft-audit-repo` no-fork callout — §1.2.1 is where a reader lands from the `structure` domain row, so the fork-vs-symlink distinction belongs there.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) `N/A` — markdown-only change; no UI surface (`viz/` untouched)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- **Wrapper-name invariant** (SPEC §"Skill namespace" grep loop over `claude/commands/ft-*.md`) — printed nothing; clean including the new stub.
- **Count verification** — `grep -c '^ln -s' claude/AGENTS-snippet.md` → 24; `ft-flowtron` table rows → 19; `claude/commands/*.md` → 19; `claude/skills/*/` → 19; `codex/skills/*/` → 19. Claude and Codex inventories are back in parity (`docs/PLATFORMS.md` row 75 requires it) — before this task Codex sat at 18 against Claude's 19 skill dirs.
- **Presence check** — `ft-refactor` resolves in all 16 target surfaces (0 misses).
- **Symlink resolution** — `.claude/commands/ft-refactor.md` and `.claude/skills/ft-refactor/SKILL.md` both readable through the link.
- **Stale-reference sweep** — no surviving "eight tasknote" / "twenty-two symlinks" / "(nine total)" outside this tasknote's own inventory table (the three grep hits were substring matches inside "lightweight").
- `node --test tools/update-adopters.test.mjs` → **37 pass / 0 fail** (44s). Run because that tool diffs `claude/skills/` + `codex/skills/` and parses the snippet `ln -s` blocks by regex; adding a skill dir and two snippet lines is exactly the input it walks. It needed no code change — its skill list is derived, not hardcoded, which is also why `/ft-update` Step 4 picks `/ft-refactor` up automatically from the bumped snippets.
- No lint/typecheck applicable: markdown-only, `viz/` untouched, CI's jobs are all `viz`/`tools` JS. `git diff --check` clean.

**Quality assertions:** no duplication introduced beyond the deliberate per-platform mirrors; no dead code; no public-surface growth beyond the one intended skill slug; no stale code-facing docs left (the two `--fast` enumerations that would have gone stale were caught in the Phase 4 sweep and fixed).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs", 17 entries):

| Doc | Verdict |
|---|---|
| `README.md` | **Updated** — §Bootstrapping "eight tasknote skills" → nine, `/ft-refactor` added to the list |
| `AGENTS.md` | **Updated** — §Workflow peer-skill roster (KEEP-IN-SYNC pair with the paste-block) |
| `SPEC.md` | **Updated** — §"Skill namespace" bundled-slug list |
| `docs/MIGRATION.md` | **Updated** — §1.2 family enumeration + purpose clause, §1.2.1 depth-path callout, §1.6 staging, §1.7 verify menu, smoke list nine → ten |
| `claude/AGENTS-snippet.md` | **Updated** — +2 `ln -s` lines (22→24) + paste-block §Workflow bullet |
| `codex/AGENTS-snippet.md` | **Updated** — +1 alphabetical `ln -s` line |
| `cursor/AGENTS-snippet.md` | **Updated** — +1 alphabetical `ln -s` line |
| `grok/AGENTS-snippet.md` | **Updated** — +1 alphabetical `ln -s` line |
| `docs/CONVENTIONS.md` | **No change** — swept per the PLAN line; the file documents adhered/declined *conventions* (Conventional Commits, SemVer, GFM, Diátaxis, CI, and the declines) and enumerates no skill roster or skill count. `/ft-refactor` introduces no new convention and contradicts none — notably it reinforces the existing "Zero scripts" and fork-vs-stack-neutral positions rather than bending them. |
| `CONTRIBUTING.md` | No change — solo-maintenance model, no roster |
| `SECURITY.md` | No change — threat model unaffected; the skill is read-only on source |
| `docs/AGENT-NEUTRALITY.md` | **Updated** — `SPEC/tasknote-selection.md` row: canonical-name list + the surface note now cite the `/ft-refactor` bullet block |
| `docs/PLATFORMS.md` | **Updated** — capability row (Eight → Nine), Installed-surface policy rows for Claude + Codex, worked-example stub/body counts 18 → 19, and the `--fast` carve-out bullet |
| `claude/CAPABILITIES.md` | **Updated** — `--fast` row: the "unrelated `--fast`" carve-out now names `/ft-refactor` alongside `/ft-spec` (both skip a review pause, neither touches the gate surface). Last-verified stamp untouched (no capability re-verification performed). |
| `docs/AGENT-COMPAT.md` | No change — per-agent consume-mode matrix, no skill roster |
| `docs/EXTERNAL-AGENTS.md` | No change — one-agent-per-tasknote rule unaffected; `/ft-refactor` files tasknotes, it does not delegate or orchestrate |
| `docs/WORKTREES.md` | No change — its "rest of the tasknote family" reference is count-free and stays accurate |

**Final Summary:** Wired `/ft-refactor` (shipped [[CORE-463.3]]) across every surface that enumerates the flowtron skill roster, completing `CORE-EPIC-463`'s implementation children. **New wrappers (2 files):** `claude/commands/ft-refactor.md` + `codex/skills/ft-refactor/SKILL.md` — this restores Claude↔Codex inventory parity (`docs/PLATFORMS.md` row 75 requires it; Codex sat at 18 vs Claude's 19 skill dirs). **Symlinks:** adopter blocks 22→24 in `claude/AGENTS-snippet.md` plus one alphabetical line each in the codex / cursor / grok snippets, and — separately — the self-host `.claude/{commands,skills}` pair, which was missing and is by contract "a wiring miss, not a policy choice" (`docs/PLATFORMS.md` §"Flowtron's own checkout is not an adopter", the section written after `/ft-spec` sat unrunnable for a month). Confirmed live: the skill appeared in the session roster the moment the link landed. (Those two self-host links are **not** in the commit: flowtron's `.gitignore:22` excludes `.claude/`, so its own wiring is local-only by design — same as the existing `ft-spec` link. The committed deliverable is the snippet/skill/doc set that recreates it.) **Counts moved:** `ft-flowtron` table 18→19 · `ft-new-project` twenty-two→twenty-four (+2 staging paths, +2 readlinks, Step 3 heading) · MIGRATION §1.2 eight→nine family and smoke nine→ten · PLATFORMS 18→19 stubs/bodies and Eight→Nine · README eight→nine. **Rosters/enumerations:** `SPEC.md` §"Skill namespace", root `AGENTS.md` + paste-block (the KEEP-IN-SYNC pair, both edited), `SPEC/tasknote-selection.md` (new "Plan a refactor" bullet block), `docs/AGENT-NEUTRALITY.md`, and a `docs/GLOSSARY.md` entry defining the depth-planner-vs-breadth-sweep distinction — the one place [[CORE-352.3]] deliberately skipped for `/ft-spec` (no new vocabulary) but which this PLAN line names and `/ft-refactor` earns. **Drift found by the Phase 4 sweep, beyond the PLAN description:** two `--fast` enumerations (`claude/CAPABILITIES.md` row 30, `docs/PLATFORMS.md` worked example) called out `/ft-spec` as the sole skill with an unrelated non-gate `--fast`; `/ft-refactor` carries the same, so both now name it. `docs/CONVENTIONS.md` swept with an explicit **no change** verdict — it holds no roster or count. **Verified:** wrapper-name invariant loop silent; 24/19/19/19/19 counts confirmed; `ft-refactor` present in all 16 target surfaces; both self-host symlinks resolve; zero stale "eight tasknote"/"twenty-two"/"nine total"; `node --test tools/update-adopters.test.mjs` 37 pass / 0 fail (that tool derives its skill list from the snippets, so `/ft-update` picks the new skill up with no code change); `git diff --check` clean. Markdown + symlinks only, no code. **Maintainability:** `/ft-refactor` is now reachable — invocable in flowtron's own checkout, installed by `/ft-new-project`, auto-wired by `/ft-update` on the next adopter bump, and discoverable from the `structure` audit domain's depth-escalation path. Epic `CORE-EPIC-463` has only `.N` (audit) remaining.

**Archived:** 2026-08-23
