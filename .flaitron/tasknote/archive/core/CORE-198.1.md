---
title: context-chain-portability discovery
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-198, CORE-154, CORE-010]
---

# CORE-198.1 | context-chain-portability discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-198]]

## 🎯 Goal

Scope the `CORE-EPIC-198` epic (`context-chain-portability`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-198.2..4` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (user's CLAUDE.md files, project CLAUDE.md, flowtron AGENTS.md / PLATFORMS.md / AGENT-NEUTRALITY.md / AGENTS-snippet.md, Grok-adoption requirements) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via structured ask — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-198.2 .. CORE-198.4 filed in _project/PLAN.md (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-198.5 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (user's ~/CLAUDE.md + ~/code/CLAUDE.md, flowtron contract docs that reference either, multi-platform wiring posture, Grok-specific gaps) — log in Discovery Notes
- [ ] Skim _project/tasknote/archive/core/ for relevant precedents (CORE-EPIC-154 multi-agent-portability, CORE-010 ~/Code/CLAUDE.md flowtron pointer) — log load-bearing findings
- [ ] Drift check on cited paths and concepts (PLATFORMS.md Grok mention, AGENT-NEUTRALITY.md ledger, AGENTS-snippet.md paste-block) — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via structured ask (multi-agent-discovery model, redundancy threshold, Grok-specific deliverables, environment-agnostic-lift candidates) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-198.2 .. CORE-198.4; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into _project/PLAN.md under CORE-EPIC-198 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-198]] — parent epic
- [[CORE-EPIC-154]] — multi-agent-portability epic (closest precedent; established the two-layer contract/wiring split and the sibling-platform plug-in pattern)
- [[CORE-010]] — added flowtron pointer to ~/Code/CLAUDE.md (the file the user now wants to retire)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md (filed at Step 4 of /ft-epic-discovery)
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` with a multi-pronged scope description spanning user-machine CLAUDE.md consolidation, Grok adoption, and flowtron-side redundancy audit. Scope is multi-child structural sweep (not single-task), warrants the Discovery + Audit bracket per `SPEC/epic.md`.

- [x] Read relevant source files:
  - `~/.claude/CLAUDE.md` (global) + `~/Code/CLAUDE.md` (workspace) — full read; surfaced four user-CLAUDE.md rule clusters (core principles, surgical-changes, shell discipline, model selection)
  - `SPEC.md` + `SPEC/model.md` + `SPEC/epic.md` — confirmed contract-layer agent-neutrality posture (CORE-EPIC-154 closed 2026-05-23)
  - `docs/PLATFORMS.md` + `docs/AGENT-NEUTRALITY.md` — confirmed Grok already accommodated as sibling-platform slot; AGENTS.md paste-block agent-neutral
  - `claude/AGENTS-snippet.md` — confirmed paste-block + symlink wiring; flowtron-self has no `~/code/CLAUDE.md` references
  - `templates/tasknote-README.md` — confirmed `CLAUDE.md` entry framed as "optional Claude-specific directives"

- [x] **Archive skim** — `_project/tasknote/archive/core/`. Load-bearing precedents below.

- [x] **Drift check** — file paths cited in conversation context all verified at HEAD:
  - `~/.claude/CLAUDE.md` exists ✓
  - `~/Code/CLAUDE.md` exists ✓
  - Flowtron contract surface has **zero references to `~/code/CLAUDE.md`** — confirmed via grep across README/SPEC/docs/templates/CONTRIBUTING/SECURITY. Retiring it has no flowtron-side rename burden.
  - `docs/PLATFORMS.md` references `grok` 5× — all in the sibling-platform-slot framing established at CORE-154.4.
  - `docs/AGENT-NEUTRALITY.md` references `grok` 3× — all in the platform-plug-in-mechanism out-of-scope clarifier.

- [x] Clarifying questions — **Resolved via structured ask above.** Four scoping decisions resolved (scope = hybrid, Grok = verification-only, lift = audit + recommendations only, no new agnostic context-chain doc).

- [x] Subtasks above populated with concrete, ordered steps (pre-filled at Step 5 scaffold; resolved-scoping table below confirms the cohort sizing at N=5).

**Discovery Notes:**

**Load-bearing precedents from archive skim:**

| Precedent | What it locked | How CORE-198 extends it |
|---|---|---|
| [[CORE-EPIC-154]] multi-agent-portability (closed 2026-05-23) | Contract layer is agent-neutral; wiring layer is per-platform; `claude/` keeps its name; sibling-platform pattern documented in `docs/PLATFORMS.md`; `docs/AGENT-NEUTRALITY.md` ledger records intentional Claude-specific surfaces | Most of the heavy-lift for Grok already shipped. CORE-198 is the lens-specific follow-up: verify the existing posture holds for Grok adoption; audit user-side redundancy against the (now agent-neutral) flowtron contract. |
| [[CORE-010]] flowtron pointer in ~/Code/CLAUDE.md (2026-04-30) | Workspace-standards layer references flowtron as "available, not required"; multi-line bullet shape in "Shared Workflow Philosophy" section | CORE-198.3 migrates this pointer to `~/.claude/CLAUDE.md` (the new global home) when `~/Code/CLAUDE.md` retires. |
| [[CORE-132]] user-idiosyncrasy comb (2026-05-22) | 5-pass audit posture for adopter-facing content; findings surfaced as discrete PLAN.md follow-up tickets (no in-place edits in the audit task) | CORE-198.2 uses the same surgical posture: redundancy findings table + recommendations; actual lifts file as follow-up tickets, not as edits inside the audit child. |
| [[CORE-129]] AGENTS.md migration (2026-05-22) | AGENTS.md is the canonical agent-neutral entry point; read by Claude Code, Codex CLI, Cursor, Amp, Aider — and by extension any future tool including Grok | CORE-198.4 verifies Grok-cli reads AGENTS.md the same way (verification-only doc pass; no new wiring). |

**Cohort-sizing read.** N=5 matches the user's selection (`.1` Discovery + 3 impl + `.5` audit). The four resolved clarifications all chose the smaller-scope option — no audit-number bump needed. Each implementation child is single-session opus.

**Resolved scoping table** (via structured ask above):

| # | Question | Resolution | Affects |
|---|---|---|---|
| 1 | Scope split: user-machine vs. flowtron | **Hybrid** — children may touch user-machine files (`~/.claude/CLAUDE.md`, `~/code/CLAUDE.md`) where warranted; CORE-010 precedent confirms this is in-bounds | `.3` deliverable touches user-machine files; `.2` and `.4` flowtron-side |
| 2 | Grok-specific gap-fill | **Verification-only doc pass** — read-through + small PLATFORMS.md subsection if quirks surface; no new wiring; no parallel `grok/` directory | `.4` shape; preserves CORE-EPIC-154 Constitution principles 2 (zero scripts) + 4 (low adopter cost) |
| 3 | Environment-agnostic-guideline-lift aggression | **Audit + recommendations only** — child surfaces redundancies as findings table; user decides; actual lifts file as follow-up tickets per CORE-132 precedent | `.2` shape; no contract-surface edits inside the audit child |
| 4 | Multi-agent context-chain doc | **No new doc** — PLATFORMS.md + audit findings + (if needed) small MIGRATION.md clarifications suffice | Keeps doc set lean; `.2` recommendations may surface a small MIGRATION.md edit as a follow-up |

**Child sequencing decision.** Order matters: `.2` (redundancy audit) produces findings → `.3` (consolidation) uses those findings to decide what stays vs. lifts vs. drops → `.4` (Grok verification) is independent and can run last. Locked sequence:

- `.2` redundancy-audit (audit-first; produces lift/keep/drop classification)
- `.3` claude-md-consolidation (executes the consolidation with `.2`'s findings as input; retires `~/code/CLAUDE.md`)
- `.4` grok-adoption-verification (independent flowtron-side read-through; may add small PLATFORMS.md subsection)
- `.5` audit (canonical epic close; fixed doc-drift sweep acceptance line)

**Audit-line confirmation.** `.5` audit filed at Step 4 stays as-is — `SPEC/epic.md` audit-acceptance shape needs no rewrite for this epic.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest precedent is the [[CORE-EPIC-154]] cohort (closed 2026-05-23, N=6) for cohort-child PLAN.md filing: 2-space indent under parent, `[<model>]` tag preserved on every line, em-dash separator, per-child long description ≤50w target. CORE-198's 5-child cohort uses identical shape with 3 implementation children instead of 4.
- [x] Implemented the minimal solution — three PLAN.md lines (`.2`, `.3`, `.4`) inserted between the existing `.1` and `.5` lines under `CORE-EPIC-198` in `## Medium`; no other edits.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md markdown filing; visualizer parser at `viz/src/parser.ts` already handles this line shape).

**Implementation Notes:**

- **Lines written:** 3 child lines (`.2`, `.3`, `.4`) inserted in order between `.1` Discovery and `.5` Audit under `CORE-EPIC-198` parent in `_project/PLAN.md` `## Medium`.
- **Word counts** (long descriptions, ≤50w target / ≤70w hard cap):
  - `.2` redundancy-audit — 34w
  - `.3` claude-md-consolidation — 33w
  - `.4` grok-adoption-verification — 40w
  - All three under target ✓
- **Shortname char counts** (≤30 char SPEC target): `.2` 16 · `.3` 23 · `.4` 26 — all under target ✓
- **No audit-number bump.** Discovery confirmed N=5 (`.1` + `.2..4` + `.5`); audit line at `.5` filed at Step 4 stays as-is.
- **Cross-references intentional.** The `[[CORE-132]]` (`.2`) and `[[CORE-010]]` (`.3`) wikilinks in long descriptions are deliberate parseable cross-references per SPEC §"Long-description conventions" — these land in `Task.relatedTasks` for the visualizer.
- **Out-of-scope explicitly re-affirmed.** Per the four resolved scoping clarifications: `.2` recommendations-only (no in-place edits to user CLAUDE.md content within the audit child); `.4` verification-only (no new wiring or `grok/` directory); no new agnostic context-chain doc.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure PLAN.md markdown filing; no executable surface).
- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass instead (results below).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

Markdown mental-pass on the edited `_project/PLAN.md` block under `## Medium`:

| Check | `.2` | `.3` | `.4` | `.5` |
|---|---|---|---|---|
| 2-space child indent | ✓ | ✓ | ✓ | ✓ |
| `**TASK-ID**` bold ID | ✓ | ✓ | ✓ | ✓ |
| `[opus]` tag | ✓ | ✓ | ✓ | ✓ |
| `\| <shortname>` ≤30 chars | ✓ (16) | ✓ (23) | ✓ (26) | ✓ (5) |
| Em-dash separator ` — ` | ✓ | ✓ | ✓ | ✓ |
| Long desc ≤50w target | ✓ (34w) | ✓ (33w) | ✓ (40w) | n/a |
| No trailing whitespace | ✓ | ✓ | ✓ | ✓ |

**Wikilink-integrity check.** The two `[[CORE-132]]` (`.2`) and `[[CORE-010]]` (`.3`) wikilinks target IDs that exist in `_project/PLAN.md` `## Completed`. Both verified present.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (inline on conditional skip — signals clear; see Final Summary below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |

Pure Discovery filing — contract-layer edits land inside the implementation children (`.2` / `.3` / `.4`), not here. Expected per `/ft-epic-discovery` skill §Step 9 ("typically no AI-referenced doc updates land in pure Discovery filing").

**Final Summary:**

Filed `CORE-EPIC-198` (context-chain-portability) under `## Medium` with the full five-line cohort: parent epic + `.1` Discovery + `.2..4` implementation children + `.5` audit. Closed the `.1` Discovery itself; the three implementation children now have concrete scope ready for individual `/ft-task` hand-off.

Technical detail:
- **5 PLAN.md lines filed** in `_project/PLAN.md` under `## Medium`: parent `CORE-EPIC-198` + 4 cohort children with 2-space indent.
- **3 implementation children word-counts** (long desc, ≤50w target): `.2` 34w · `.3` 33w · `.4` 40w. All under target.
- **Child sequencing locked:** `.2` redundancy-audit (audit-first; produces lift/keep/drop findings) → `.3` claude-md-consolidation (executes consolidation with `.2`'s findings as input; retires `~/code/CLAUDE.md`) → `.4` grok-adoption-verification (independent flowtron-side read-through). Sequencing matters: `.4` doesn't depend on `.2`/`.3`, but `.3` consumes `.2`'s findings.
- **4 load-bearing scoping clarifications resolved** via structured ask: scope = hybrid (children may touch user-machine files); Grok = verification-only doc pass (no new wiring); lift policy = audit + recommendations only (no in-place contract edits in audit child); no new agnostic context-chain doc.
- **Archive skim surfaced 4 load-bearing precedents:** [[CORE-EPIC-154]] (most of the heavy-lift for multi-agent portability already shipped; CORE-198 is the lens-specific follow-up), [[CORE-010]] (`.3` migrates the flowtron-pointer to `~/.claude/CLAUDE.md`), [[CORE-132]] (`.2` uses the recommendations-only audit posture), [[CORE-129]] (AGENTS.md is the canonical agent-neutral entry point Grok inherits).
- **Drift check key finding:** Flowtron's contract surface has **zero references to `~/code/CLAUDE.md`** — retiring it has no flowtron-side rename burden. The CORE-010 pointer in `~/Code/CLAUDE.md` migrates to `~/.claude/CLAUDE.md` as part of `.3`.
- **N=5 held** — no audit-number bump; `.5` audit line filed at Step 4 stays as-is.

**Archived:** 2026-05-25
