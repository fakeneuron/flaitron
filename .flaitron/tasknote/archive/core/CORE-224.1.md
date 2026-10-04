---
title: agent-compatibility-surface discovery
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-224]
---

# CORE-224.1 | agent-compatibility-surface discovery

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-EPIC-224]]

## 🎯 Goal

Scope the `CORE-EPIC-224` epic (`agent-compatibility-surface`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-224.2..5` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (supported-agents matrix location, per-agent trigger-wiring surfaces in platform dirs, SPEC contract impact, `docs/PLATFORMS.md` + `docs/AGENT-NEUTRALITY.md` impact) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-224.2 .. CORE-224.5 filed in _project/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-224.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (matrix location, per-agent trigger-wiring surfaces in platform dirs, SPEC contract impact, `docs/PLATFORMS.md` + `docs/AGENT-NEUTRALITY.md`) — log in Discovery Notes
- [ ] Skim _project/tasknote/archive/core/ for relevant precedents (platform wiring, agent-neutrality) — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-224.2 .. CORE-224.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into _project/PLAN.md under CORE-EPIC-224 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-224]] — parent epic (agent-compatibility-surface); carries the locked direction from the 2026-05-30 audit-context Q&A

## 🧭 Deep Pre-pass

### Constitution

**Locked direction (from CORE-EPIC-224 parent line, 2026-05-30 audit-context Q&A):**
A living agent-compatibility surface = (a) a **supported-agents matrix** covering big-N+ CLI/IDE agents (Grok a priority) and (b) **per-agent explicit capability-trigger wiring** (e.g. Claude effort levels) in the platform dirs, kept current via per-agent "last-verified vX/date" notes. Deferral condition ("after the next release ships") is now satisfied — v4.3.0 shipped via CORE-225 on 2026-05-30.

**Principles (load-bearing, inherited from the CORE-154 cohort):**

1. **The contract/wiring split is non-negotiable** ([[CORE-154.1]] P1). The matrix and per-agent capability-trigger wiring are *wiring-layer / platform-content*, not contract. Nothing in this epic may leak agent-specific capability triggers (Claude effort levels, Grok context-load quirks, etc.) into the contract layer (`SPEC.md`, `SPEC/`, `templates/`). Agent-specific content lives in `docs/` (neutral framing) and the platform dirs.
2. **Don't rename or move `claude/`** ([[CORE-154.1]] adopter-symlink stability). Per-agent trigger wiring for Claude lands inside `claude/`; future agents plug in as sibling top-level dirs per the `docs/PLATFORMS.md` symmetric pattern.
3. **Zero scripts** (`PHILOSOPHY.md`). "Kept current" means **manual per-agent `last-verified vX/date` notes**, mirroring the existing Grok Build "_Pre-adoption verification only_" footer in `docs/PLATFORMS.md` — never a validator, CLI, or daemon.
4. **`ft-` namespace reserved cross-platform** (SPEC §"Skill namespace") — unchanged by this epic.
5. **Single-source-of-truth posture** ([[CORE-091]]). Each agent's capability-trigger wiring is documented once (in its own dir/snippet or one matrix row); the matrix references, never duplicates.
6. **Consult the `AGENT-NEUTRALITY.md` ledger** before adding/flagging any Claude-specific reference. New intentional Claude-specific surfaces get a ledger row; the ledger is not re-litigated.

**Invariants to preserve:**

- `AGENTS.md` paste-block stays agent-neutral.
- `docs/PLATFORMS.md` "Today's surface" table + Grok Build notes and `docs/AGENT-NEUTRALITY.md` remain authoritative; this epic **extends** them, never contradicts.
- Grok is a priority agent in the matrix.

**Out of scope (explicit):**

- **Shipping actual `grok/` / `codex/` / `cursor/` wiring bundles.** This epic documents the *matrix + capability-trigger surface*, not new per-platform skill bundles (that's the separate symmetric plug-in pattern in `docs/PLATFORMS.md`).
- Any currency-automation (validator/CLI/CI check) — ruled out by principle 3.
- Re-opening the wiring-layer structure decision (locked at [[CORE-154.3]]).

### Specification

The epic delivers a **living agent-compatibility surface**: one canonical matrix + per-agent capability-trigger documentation + a manual currency convention. Anticipated decomposition into the four implementation children (`.2..5`). This is the *current best read* — Stage 3 clarifications and Phase 1 Discovery may shift the split before children are filed in Phase 2.

**`.2` — supported-agents matrix (scaffold + populate).**
- *Deliverable:* the canonical matrix listing the in-scope agents (candidate set from the `.1` line: Claude Code, Grok Build, Codex CLI, Cursor, Gemini CLI, Aider — plus Sourcegraph Amp already in `PLATFORMS.md`). Columns capture: how the agent consumes flowtron (contract-only vs wiring-shipped), context-load entry point (`AGENTS.md`/etc.), skill/command primitive, and a `last-verified` cell.
- *Acceptance shape:* matrix renders; every agent has a row; no agent-specific capability trigger leaks into the contract layer; reconciles with (does not duplicate/contradict) `PLATFORMS.md` "Today's surface".
- *Interaction:* establishes the table `.3`/`.4` populate the capability-trigger detail behind; `.5` adds the currency mechanism for its `last-verified` column.

**`.3` — Claude Code capability-trigger wiring.**
- *Deliverable:* per-agent capability-trigger reference for Claude Code in the `claude/` wiring layer — effort/thinking levels, `--fast`/`-f`, `/model`, `/clear`, structured-ask. Establishes the *pattern* every other agent's trigger section mirrors.
- *Acceptance shape:* triggers documented in `claude/`; each existing intentional Claude-specific surface cross-checked against the `AGENT-NEUTRALITY.md` ledger (new rows added if needed); contract layer untouched.
- *Interaction:* the reference shape `.4` reuses for non-Claude agents.

**`.4` — priority non-Claude capability-trigger wiring (Grok-first).**
- *Deliverable:* capability-trigger + quirk documentation for the contract-only agents (Grok Build priority; then Codex/Cursor/Gemini/Aider/Amp), reusing `.3`'s pattern, with explicit *pre-adoption-verification* framing (mirrors the existing Grok Build footer in `PLATFORMS.md`).
- *Acceptance shape:* each priority agent has a trigger section; every claim carries pre-adoption-verification framing; no `grok/`/`codex/` wiring bundle is shipped (out of scope per Constitution).
- *Interaction:* depends on `.3`'s pattern; feeds rows/cells into `.2`'s matrix.

**`.5` — `last-verified` currency convention + wiring.**
- *Deliverable:* the manual per-agent `last-verified vX/date` note convention, plus wiring it into the maintenance loop (doc-drift sweep entry in `tasknote/README.md` §"AI-referenced docs" if the matrix becomes a canonical doc; possibly a line in the epic audit `.6` acceptance).
- *Acceptance shape:* convention documented; matrix/trigger docs carry initial `last-verified` stamps; a Phase 4 / audit touchpoint references it; zero automation introduced (Constitution principle 3).
- *Interaction:* closes the loop on `.2`'s `last-verified` column and the `.3`/`.4` trigger docs; likely the last child before audit `.6`.

**Audit `.6`** (already filed): final doc-drift sweep + verify doc currency, per-agent trigger wiring, and last-verified notes. Reviewed as-fitting; rewrite only if the split above shifts materially.

### Clarifications

Resolved with the user via structured ask, 2026-05-30:

| # | Question | Resolution |
|---|---|---|
| 1 | Where does the matrix live? | **New `docs/AGENT-COMPAT.md`** — dedicated living matrix (capability + last-verified focus), cross-linked from `PLATFORMS.md`, added to `tasknote/README.md` §"AI-referenced docs". Keeps PLATFORMS.md's structural concern separate. |
| 2 | Agent set in scope? | **All 7** — Claude Code, Grok Build, Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp (superset of the `.1` line + PLATFORMS.md roster). |
| 3 | Trigger-wiring depth? | **Tiered** — Claude (`.3`) + Grok (`.4` priority) get full detail; the rest get shallow stubs with pre-adoption-verification framing. |
| 4 | `.5` currency scope? | **Convention + maintenance touchpoint** — define + stamp `last-verified vX/date` notes AND wire a touchpoint into the audit `.6` acceptance + doc-drift sweep. Still zero automation. |

**Scope deltas these resolutions lock in:**
- `.2` deliverable is a **new doc** (`docs/AGENT-COMPAT.md`), not a `PLATFORMS.md` edit — and it joins the AI-referenced-docs set.
- `.4` is bounded: deep only for Grok; Codex/Cursor/Gemini/Aider/Amp are shallow stubs.
- `.5` touches the audit `.6` acceptance line — the audit may need a one-line rewrite at Phase 2 to name the `last-verified` check explicitly.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-epic-discovery --deep` against the already-filed `CORE-EPIC-224`; deferral condition (post-release) satisfied by v4.3.0 (CORE-225). Epic scope is multi-child and warrants the Discovery+Audit bracket.

- [x] Read relevant source files — `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`, `templates/tasknote-template.md`, `_project/tasknote/README.md` §"AI-referenced docs".

- [x] **Archive skim** — `_project/tasknote/archive/core/` for the CORE-154 cohort + PLATFORMS/agent-neutrality refs (see findings below).

- [x] **Drift check** — all cited paths exist (`docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PHILOSOPHY.md`, `claude/AGENTS-snippet.md`); `docs/AGENT-COMPAT.md` does not yet exist (correct — `.2` creates it). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **Resolved during deep pre-pass; see `## 🧭 Deep Pre-pass` §Clarifications.** No new clarifications surfaced in Phase 1.

- [x] Subtasks above populated with concrete, ordered steps — scaffold pre-fill confirmed accurate; no scope shift.

**Discovery Notes:**

- **Load-bearing precedent — CORE-154 cohort (`.1`–`.6`, archived).** Same epic shape this epic extends: `.1` Discovery carried a Constitution + Specification; children delivered the contract/wiring split (`PLATFORMS.md`, `AGENT-NEUTRALITY.md`), the wiring-structure decision (`.3`), and the platform plug-in pattern (`.4`); `.6` audited. CORE-EPIC-224 builds the *capability/currency* layer on top of CORE-154's *structural* layer.
- **Shared design surface inventoried:**
  - *Matrix home:* new `docs/AGENT-COMPAT.md` (locked in Clarifications Q1) — cross-linked from `PLATFORMS.md`, added to `tasknote/README.md` §"AI-referenced docs".
  - *Per-agent trigger wiring:* Claude triggers in `claude/`; non-Claude triggers documented (not bundle-shipped) with pre-adoption-verification framing — mirrors the existing Grok Build footer in `PLATFORMS.md`.
  - *SPEC contract impact:* **none expected** — all new content is wiring/`docs/` layer per Constitution P1; `SPEC/` + `templates/` stay clean. The `AGENT-NEUTRALITY.md` ledger may gain rows (handled inside `.3`).
  - *Currency mechanism:* manual `last-verified vX/date` notes; touchpoint wired into audit `.6` + doc-drift sweep (Q4). Zero automation (Constitution P3).
- **Agent set (Q2):** Claude Code, Grok Build, Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp (7).
- **Audit-number note:** N stays 6; audit remains `.6`. `.5` may add a one-line rewrite to the `.6` acceptance to name the `last-verified` check (handled at Phase 2 if needed).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-EPIC-057 cohort + the existing CORE-EPIC-224 `.1`/`.6` lines are the format precedent: 2-space child indent, `[model]` on every line, ` — ` em-dash separator, `| shortname` ≤30 chars.

- [x] Implemented the minimal solution — wrote `.2..5` child lines into `_project/PLAN.md` between `.1` and `.6`.

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface).

**Implementation Notes:**

- 4 child lines written under `CORE-EPIC-224` (Medium section). Word counts: `.2` ≈38w, `.3` ≈38w, `.4` ≈37w, `.5` ≈38w — all under the 50w target / 70w hard cap.
- Models: `.2`/`.3` `[opus]` (new-doc + pattern-establishing design); `.4`/`.5` `[sonnet]` (follows the established pattern; smaller surface).
- **No audit-number bump** — N stays 6; audit remains `.6`. `.5`'s deliverable includes a one-line rewrite of the `.6` acceptance to name the `last-verified` check (deferred to `.5`'s own Phase 2; not edited now).
- Shortnames: `compat-matrix`, `claude-triggers`, `nonclaude-triggers`, `last-verified-currency` (all ≤30 chars).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose filing only).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the 4 new PLAN.md lines: 2-space child indent ✓ · bold `**CORE-224.N**` IDs ✓ · `[model]` token present ✓ · `| <shortname>` ≤30 chars ✓ · ` — ` em-dash separator ✓ · ≤70w hard cap ✓ · no trailing whitespace ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 9 AI-referenced docs: **no change**. `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md` — all untouched. Contract/doc edits (new `AGENT-COMPAT.md`, PLATFORMS.md cross-link, neutrality-ledger rows, AI-referenced-docs entry) land inside children `.2`/`.3`/`.5`, not in this pure Discovery filing.

- [x] Closed — `.1` PLAN.md line flipped to stub form `Completed 2026-05-30.`; tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the 📦 conditional-skip marker below).

**Final Summary:**

Filed the four implementation children for `CORE-EPIC-224` (agent-compatibility-surface) and closed the `.1` Discovery via the `--deep` flow. Deep pre-pass locked a Constitution (6 CORE-154-inherited principles; contract/wiring split + don't-rename-`claude/` + zero-scripts as the load-bearing non-negotiables), a Specification (4-child decomposition: matrix → Claude triggers → non-Claude triggers → currency convention), and a Clarifications table resolving 4 scoping questions (new `docs/AGENT-COMPAT.md`; 7-agent set incl. Amp; tiered trigger depth with Grok priority; currency convention + audit/doc-drift touchpoint). Phase 2 wrote `.2..5` into PLAN.md (≈37–38w each, all under cap). N unchanged at 6; audit stays `.6` with a `.5`-deferred one-line acceptance rewrite. No contract-layer or doc edits in this filing — all land inside the children.

**Archived:** 2026-05-30
