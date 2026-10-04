---
title: reject-runtime-sec-tooling
status: completed
tags: [security, docs]
created: 2026-05-31
due:
related-tasks: [CORE-250, CORE-EPIC-194]
---

# CORE-251 | reject-runtime-sec-tooling

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-250]] [[CORE-EPIC-194]]

## 🎯 Goal

Record the rejection of the external truvent.ai/MCP "security tooling" proposal in `docs/VISION.md` §"What we won't accept" (+ terse SPEC.md mirror) so the ~80% DNA-collision analysis is citable, not re-derived.

## ✅ Acceptance

- [x] One bullet added to `docs/VISION.md` §"What we won't accept" naming the rejected category (runtime security scanners / agent-callable audit servers) with justification
- [x] Terse PR-rejection mirror added to `SPEC.md` §"PR / suggestion archetypes flowtron does not accept", preserving the 1:1 VISION↔SPEC parity
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Drift-check the starter's cited surfaces against HEAD
- [x] Resolve the open question (VISION-only vs. SPEC mirror → both, for parity)
- [x] Write the VISION.md bullet
- [x] Write the SPEC.md mirror bullet
- [x] Doc-drift sweep + close

## 🔗 Related

- [[CORE-250]] — the threat-model hardening this session shipped (the *yes* half; this task is the *no* half)
- [[CORE-EPIC-194]] — precedent: gsd-pi-learnings "considered-and-declined" list pattern this memo mirrors

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Starter filed today with rich, still-current context; the rejection reasoning is the deliverable and remains accurate. Documentation guardrail, no code surface.

- [x] Read relevant source files — `docs/VISION.md` §"What we won't accept" (4 existing bullets), `SPEC.md` §"PR / suggestion archetypes flowtron does not accept" (4 mirror bullets), `_project/tasknote/README.md` §"AI-referenced docs".

- [x] **Archive skim** — sibling rejection precedent is CORE-EPIC-194's declined-list; no source-path overlap to skim beyond the docs themselves.

- [x] **Drift check** — both target sections exist as cited. **One drift:** the starter claimed `docs/VISION.md` is "already in the AI-referenced list" — it is **not** (only `SECURITY.md` is). Doesn't change scope; means VISION.md is not itself a doc-drift-sweep entry.

- [x] Asked clarifying questions OR logged "No clarifications needed" — Resolved the starter's open question: add to **both** VISION + SPEC mirror (the two sets are an explicit 1:1 pair; adding only one breaks the documented parity; one-line mirror is cheap). No user-facing clarification needed.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Discovery surfaced no significant deviation → skip 🛠️ (clarification was a within-scope wording/surface call, already leaned in the starter).

Starter context preserved verbatim for the citable record:

> **Why this exists:** An external AI proposed adopting a security stack into flowtron: (1) Local MCP repo tools, (2) a FastMCP "Security Auditor" skill (~150 LOC Python), (3) a 5th "Security Gate" SPEC phase, (4) a `flowtron-sec` companion submodule for runtime enforcement / tamper protection. Assessed as ~80% direct DNA collision and rejected. Already-shipped that the proposal missed: `ft-audit-security` + `SECURITY.md` cover the "security auditor" need the flowtron-native way.
>
> **Collision table:** `audit.py` FastMCP daemon → Zero scripts (SPEC #2); `risk_assess()`/`scan_skill_or_plugin()` → Schema validators rejected; 5th "Security Gate" phase → 4-phase rhythm is the hardened core (gates cap at two banners); MCP fs+git servers → redundant + `npx`/`uvx` runtime + breaks agent-neutrality; `flowtron-sec` daemon → daemons/OS hooks are the explicit antithesis.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing 4-bullet "What we won't accept" list (VISION) and its 4-bullet SPEC mirror; matched the bold-lead + justification + "PRs that … are rejected" prose shape (VISION) and the terse "PR-rejection mirror of … above" shape (SPEC).

- [x] Implemented the minimal solution — one VISION bullet + one SPEC mirror bullet.

- [x] Updated/added tests — N/A (markdown-only).

**Implementation Notes:**

`docs/VISION.md`: +1 bullet ("Runtime security scanners / agent-callable audit servers") after Multi-user, ~5 lines. `SPEC.md`: +1 terse mirror bullet after Multi-user, 1 line. VISION↔SPEC parity now 5↔5.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown).
- [x] Ran lint/type-check on changed code — markdown mental-pass: bullet grammar, bold lead, cross-ref links (`SECURITY.md`) resolve, no trailing whitespace.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend; `viz/` untouched).

**Testing Notes:**

Markdown-only doc edit; visually confirmed both bullets read in-voice with their neighbors.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across README.md §"AI-referenced docs":
  - `README.md` — no change · **`SPEC.md` — updated** (task target; terse PR-archetype mirror bullet added) · `docs/MIGRATION.md` — no change · `claude/AGENTS-snippet.md` — no change · `docs/CONVENTIONS.md` — no change · `CONTRIBUTING.md` — no change · `SECURITY.md` — no change (referenced by the new bullet, not modified) · `docs/AGENT-NEUTRALITY.md` — no change (new clauses are agent-neutral; the Claude Code permission-hooks reference matches SECURITY.md's pre-existing ledgered framing) · `docs/PLATFORMS.md` — no change · `claude/CAPABILITIES.md` — no change · `docs/AGENT-COMPAT.md` — no change. (`docs/VISION.md`, the other task target, is not in the AI-referenced list — the drift noted in Phase 1.)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and moved to `## Completed`; tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (surfaces inline on conditional skip — markdown-only, no frontend/privileged surface).

**Final Summary:**

Recorded the rejection of the external truvent.ai/MCP "security tooling" proposal as a permanent, citable guardrail. **`docs/VISION.md`** §"What we won't accept" gained a fifth bullet — *Runtime security scanners / agent-callable audit servers* — arguing that markdown-is-the-schema + human-at-the-gate is the control, an advisory scorer/MCP-auditor adds attack surface and false confidence without an enforcement chokepoint, deterministic enforcement belongs in per-project Claude Code permission hooks, and the markdown-native need is already met by `ft-audit-security` + `SECURITY.md`. **`SPEC.md`** §"PR / suggestion archetypes flowtron does not accept" gained the matching terse mirror, restoring 1:1 VISION↔SPEC parity (5↔5). The full collision analysis lives in this archived tasknote + CORE-250's git history. Sibling rejection [[CORE-252]] (wiki layer) follows.

**Archived:** 2026-05-31
