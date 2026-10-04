---
title: grok-thin-wiring audit
status: completed
tags: []
created: 2026-08-20
due:
related-tasks:
  - CORE-EPIC-456
  - CORE-456.2
  - CORE-456.3
  - CORE-456.4
---

# CORE-456.N | grok-thin-wiring audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-456]]

## 🎯 Goal

Verify the completed `CORE-EPIC-456` (`grok-thin-wiring`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-456.N — audit CORE-EPIC-456` (or `chore: ...` if no code edits land) commit lands (`chore:` — no product-file edits)
- [x] PLAN.md line for `CORE-456.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-456.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-456` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-456.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-456]] — parent epic: grok-thin-wiring
- [[CORE-456.2]] — grok-compat-docs (Cursor-shaped consume-mode)
- [[CORE-456.3]] — grok-agents-snippet (thin `grok/` snippet + surface registration)
- [[CORE-456.4]] — grok-dogfood-restamp
- [[CORE-438.N]] — related-decision: Cursor-wiring audit shape this note follows
- [[CORE-271.4]] — related-decision: `grok/procedures/ft-task.md` pointer origin
- [[CORE-257]] — related-decision: first Grok dogfood / structured-ask observation

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-456.N`. Parent `CORE-EPIC-456` is open under `## Medium`. Implementation children `.2` / `.3` / `.4` all closed 2026-08-20; no `.1` (Discovery supplied by audit-repo 2026-08-20); no open siblings; early-audit gate N/A.

- [x] Read relevant source files — archived `CORE-456.2`–`.4`; live `grok/` (2 files), `docs/PLATFORMS.md` Grok sections, `docs/AGENT-COMPAT.md` Grok row, `docs/MIGRATION.md` Grok install/verify, `tools/update-adopters.mjs` `WIRING_SURFACES`, `claude/skills/{ft-release,ft-update,ft-new-project,ft-flowtron}/SKILL.md`, layout bullets (README / SPEC / AGENTS), `.gitignore`, `grok/AGENTS-snippet.md` vs `cursor/AGENTS-snippet.md` slug set

- [x] **Best Practices Review** — N/A (audit is verification over existing deliverables; trigger-table rewrite is a follow-up, not an in-scope one-line stale-path fix)

- [x] **Archive skim** — cohort archives are the primary inventory. Load-bearing non-cohort context already cited by children: [[CORE-438.3]] / [[CORE-438.4]] / [[CORE-438.N]] (Cursor analog this epic copied), [[CORE-271.4]] (`grok/procedures/ft-task.md` pointer origin — still the two-file thin shape), [[CORE-257]] (first Grok dogfood; structured-ask observation the trigger table still carries), [[CORE-406]] (stamp-write ownership `.4` inherited). No extra non-cohort re-read required.

- [x] **Drift check** — HEAD still matches each child's shipped shape:
  - `grok/` exists as two files only (`AGENTS-snippet.md` + `procedures/ft-task.md`); no `grok/skills/` or `grok/commands/`
  - Stale phrases `Grok is contract-only` / `remaining thin-bundle` / `no --fast without grok/ bundle` / `hypothetical Grok` are gone from live `*.md` (remaining `no flowtron bundle` / `unverified` are Gemini / Aider / Amp only)
  - AGENT-COMPAT Grok row: Consume mode `Wiring + contract (thin, Cursor-shaped)`; primitive names snippet + compat scans; stamp `v5.18.0 · 2026-08-20 (dogfooded)`
  - PLATFORMS: Grok split from Amp/Aider/Gemini; Installed-surface Grok row; Worked example: Grok Build present; Grok footer stamp lockstep with AGENT-COMPAT
  - `WIRING_SURFACES` has a Grok entry keyed to `claude/skills/` adds + `grok/AGENTS-snippet.md` (Cursor-shaped)
  - `.gitignore` ignores `.grok/` and the comment names the Grok-only `ln -s` path
  - `grok/AGENTS-snippet.md` is on the AI-referenced list
  - 11/11 `ln -s` slug parity vs Cursor's adopter subset
  - PLAN epic still under `## Medium`; children stubs nested; `.N` was the open audit line
  - Known leftover (not a HEAD-path miss): PLATFORMS Grok **Sub-agent** / **Model / session switch** / **Context freshness** rows still read as 2026-06 launch-coverage. This Grok 4.6 session exposes native `spawn_subagent`; vendor user-guide `16-subagents.md` documents it (plus `explore` / `plan` types); `04-slash-commands.md` documents `/model` and `/clear`. `.2` scoped the refresh out of PLAN; `.4` left it for this audit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) full-cohort audit (`.2`–`.4` closed; no `.1`); (2) trigger-table sub-agent / `/model` / `/clear` refresh is a post-closure `/ft-file-followup`, not an inline rewrite — epic PLAN was consume-mode + snippet + restamp, and rewriting three trigger rows needs vendor-doc judgment plus a possible restamp; (3) VERSION-HISTORY Grok highlight is correctly deferred to `/ft-release` per that doc's Maintenance rule; (4) `CORE-EPIC-457` remains complementary currency work, not this epic's miss.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Closed | Surface | Deliverable |
|---|---|---|---|
| **CORE-456.2** | 2026-08-20 | PLATFORMS / AGENT-COMPAT / MIGRATION (+ README / AGENT-NEUTRALITY Phase 4) | Split Grok out of contract-only; Cursor-shaped discovery + `--fast` / `--debug`; last-verified left for `.4`; snippet deferred |
| **CORE-456.3** | 2026-08-20 | `grok/AGENTS-snippet.md` + ~surface-registration sites | Shipped thin sibling; already-wired Claude/Codex/Cursor → stop; Grok-only `.grok/skills/` 11/11; registered `ft-update` / `ft-new-project` / `ft-release` §7.1 / updater / `.gitignore`; SPEC layout bullet only |
| **CORE-456.4** | 2026-08-20 | AGENT-COMPAT Grok stamp + PLATFORMS Grok footer | Dogfooded at `v5.18.0 · 2026-08-20`; consume-mode / trigger table left as `.2`/`.3` shipped them |

### Epic theme check

Theme: *Cursor-parity Grok surface*. Strictly ordered: document the compat fact → ship the Grok-only snippet and register consumers → restamp last-verified. Thin-bundle story is consistent `.2`→`.4` (no wrappers, canonical `claude/skills/` bodies, `.grok/skills/` only as Grok-only variant). No `.1` is correct: audit-repo supplied Discovery.

### Adjacent, not this epic

- **[[CORE-EPIC-457]]** (open under Low) — currency-surfaces; complementary, filed the same audit-repo day.
- **VERSION-HISTORY** Grok highlight — `/ft-release` Maintenance rule.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass. No inline fix; the one miss is a three-row trigger-table refresh, not a stale-path one-liner.

- [x] **Minimal refactor gate** — no refactor. Trigger-table leftover logged as `/ft-file-followup CORE-458` rather than rewritten here.

- [x] Implemented the minimal solution — verification only; no product-file edits

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-prose audit; no executable surface)

**Implementation Notes:**

### Cohort children inventoried

- **CORE-456.2** — Grok no longer reads as contract-only. PLATFORMS Today's surface / Installed-surface / adoption notes / `--fast`+`--debug` trigger rows, AGENT-COMPAT consume-mode + primitive, MIGRATION §1.2 / §1.7 / §3.8 all state Cursor-shaped discovery. Snippet and last-verified correctly left for siblings.
- **CORE-456.3** — Two-file `grok/` bundle (`AGENTS-snippet.md` + existing procedure pointer). Stop-if-already-wired includes Cursor because Grok scans `.cursor/skills/` by default. Surface registration covers the same consumers Cursor's `.4` did (this epic has no surface-integration child). SPEC.md contract semantics untouched except the repo-layout path fact.
- **CORE-456.4** — Stamp pair `v5.18.0 · 2026-08-20 (dogfooded)` on AGENT-COMPAT Grok row + PLATFORMS Grok footer. Consume-mode and trigger table left as shipped. Observed `spawn_subagent` and explicitly deferred it here.

### Coherence findings

- **Thin-bundle story is consistent** across snippet, PLATFORMS Today's-surface / Installed-surface / Worked example: Grok Build, AGENT-COMPAT Consume mode, `ft-new-project` Grok note, `ft-update` Grok re-wire, `ft-release` §7.1 (slug parity against Grok-only `ln -s` block, no `grok/skills/` inventory), SECURITY.md threat-model intro, and `.gitignore`.
- **Style parity:** `grok/procedures/ft-task.md` is the `cursor/` / `codex/` router with only the platform word in the H1 changed. `grok/AGENTS-snippet.md` extends `cursor/AGENTS-snippet.md` (paste-block reference, already-wired stop, Grok-only `.grok/skills/` `ln -s`, pinning notes) without copying Cursor's YAML-colon caveat.
- **Naming:** PLAN shortnames match tasknote titles (`grok-thin-wiring`, `grok-compat-docs`, `grok-agents-snippet`, `grok-dogfood-restamp`, `grok-thin-wiring audit`).
- **No contradictory cross-refs.** `.2` deferred the snippet; `.3` shipped it; `.4` restamped without rewriting consume-mode. `pointer only` in PLATFORMS Today's surface means "snippet + procedure pointer" (the thin shape), not the pre-`.3` "procedure pointer only today" claim.
- **No regressions** on earlier-shipped surfaces: `grok/` still two files; 11/11 `ln -s` parity vs Cursor still the §7.1 expected set; Grok `WIRING_SURFACES` entry present; Grok still split from Amp/Aider/Gemini; `--fast` / `--debug` still documented as loaded-body flags.

### Inline fix

- None. The leftover is not a one-line stale path.

### Misses / follow-up candidates

- **`/ft-file-followup CORE-458`** — Grok trigger-table currency. PLATFORMS.md §"Non-Claude capability triggers" → Grok **Sub-agent / isolated exploration** still says "No documented sub-agent spawn primitive"; **Model / session switch** still says no `/model`; **Context freshness** still says no `/clear`. This Grok 4.6 session exposes native `spawn_subagent` (plus `enter_plan_mode`); vendor user-guide `16-subagents.md` documents `spawn_subagent` with `explore` / `plan` types; `04-slash-commands.md` documents `/model` and `/clear`. `.2` scoped the refresh out of this epic; `.4` restamped last-verified without touching those rows (intentional per its Acceptance). Not an inline audit rewrite: three rows plus probe/delegate mapping, and a possible stamp-pair restamp after the facts change. File after this audit closes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: verification-only audit; no executable surface. Cohort's updater suite is unchanged by this audit's diff.

- [x] Ran lint/type-check on changed code — N/A: no lintable or typed surface

- [x] **Quality assertions** — N/A with reason: no product-file diff. Live-doc greps and file-set checks are the verification.

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface

**Testing Notes:**

Markdown-prose verification.

| Check | Result |
|---|---|
| `ls grok/` | `AGENTS-snippet.md` + `procedures/` only |
| Grok vs Cursor `ln -s` slugs | 11/11 identical |
| Live `Grok is contract-only` / `remaining thin-bundle` / `hypothetical Grok` grep | 0 hits |
| AGENT-COMPAT Grok consume-mode | `Wiring + contract (thin, Cursor-shaped)` |
| Stamp lockstep | `v5.18.0 · 2026-08-20 (dogfooded)` on AGENT-COMPAT Grok row + PLATFORMS Grok footer |
| `WIRING_SURFACES` Grok entry | present, Cursor-shaped (`diffPaths: claude/skills/`, snippet `grok/AGENTS-snippet.md`) |
| Frontend 👁️ | N/A |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — Grok Cursor-shaped quickstart + `grok/` layout already landed in `.2`/`.3` |
  | `AGENTS.md` | no change — layout + Platform Notes already name the thin sibling (`.3`) |
  | `SPEC.md` | no change — repo-layout `grok/` bullet already landed in `.3`; no contract semantics |
  | `docs/MIGRATION.md` | no change — Grok already-wired + Grok-only paths already landed in `.2`/`.3` |
  | `claude/AGENTS-snippet.md` | no change — Grok verify sentence already landed in `.3` |
  | `codex/AGENTS-snippet.md` | no change |
  | `cursor/AGENTS-snippet.md` | no change |
  | `grok/AGENTS-snippet.md` | no change — added to this list by `.3`; content still matches locked mechanism |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — Grok thin surface already in threat-model intro (`.3`) |
  | `docs/AGENT-NEUTRALITY.md` | no change — wiring-layer list + MIGRATION ledger already include `grok/` (`.2`/`.3`) |
  | `docs/PLATFORMS.md` | no change this audit — tree / Today's surface / Worked example / stamp already current (`.3` + `.4`). Sub-agent / `/model` / `/clear` rows are the CORE-458 follow-up, not a silent rewrite here |
  | `claude/CAPABILITIES.md` | no change — Claude-only trigger reference; last-verified unaffected |
  | `docs/AGENT-COMPAT.md` | no change this audit — Grok row already `dogfooded` (`.4`) |
  | `docs/EXTERNAL-AGENTS.md` | no change — handoff/isolation contract; no platform-wiring enumeration owed |
  | `docs/WORKTREES.md` | no change |

  Cumulative sweep: all seventeen cold-start entries current for the thin-wiring facts this epic shipped. The stale trigger-table rows live in `docs/PLATFORMS.md` but are a scoped leftover, not slice-local doc drift of the AI-referenced one-liners.

- [x] Closed — Acceptance ticked; YAML `status: completed`; PLAN.md parent stubbed + cohort moved to top of `## Completed`; tasknote → `archive/core/CORE-456.N.md`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Grok-thin-wiring audit found the three-child cohort coherent: Cursor-shaped consume-mode, thin `grok/` snippet + surface registration, and dogfood restamp agree with each other and with HEAD. No inline fixes. One follow-up: `/ft-file-followup CORE-458` to refresh the Grok trigger-table Sub-agent / `/model` / `/clear` rows against current vendor docs and this session's primitives.

**Parent-flip:** Yes — parent stubbed + full cohort moved to top of `## Completed` (2026-08-20).

**Archived:** 2026-08-20

