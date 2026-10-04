---
title: audit-family pass-name layering
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-185 | audit-family pass-name layering

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align pass names across canonical SKILL.md body §2, frontmatter description, MIGRATION.md §1.2.1 table, and ft-flowtron SKILL.md roster for all six ft-audit-* skills — picking one short canonical form per pass and propagating.

## ✅ Acceptance

- [ ] Across the six fork-and-customize specialists (ft-audit, ft-audit-docs, ft-audit-security, ft-audit-frontend, ft-audit-backend, ft-audit-performance), the **same short canonical pass name** appears in all four layers: SKILL.md body §2 bold heading, frontmatter `description:`, MIGRATION.md §1.2.1 table, and ft-flowtron SKILL.md roster Description column
- [ ] ft-audit-context is left untouched (out of scope per Phase 1 clarification)
- [ ] No semantics lost — inline prose after each renamed heading still conveys the unpacked scope (e.g., `Hygiene — module / function / variable naming, …`)
- [ ] Doc-drift sweep clears — `_project/tasknote/README.md` §"AI-referenced docs" verdict per entry

## 🧩 Subtasks

- [ ] Update ft-audit SKILL.md body §2: rename 5 pass headings to short canonical (Security · Idioms · Hygiene · Orphans · Doc drift)
- [ ] Update ft-audit-docs SKILL.md body §2: rename passes 3/4/5 (Cross-references, Currency, Stale content)
- [ ] Update ft-audit-security SKILL.md body §2: rename passes 1 and 5 (Secrets, Dependencies)
- [ ] Update ft-audit-frontend SKILL.md: body pass 3 + frontmatter description (Render perf)
- [ ] Update ft-audit-backend SKILL.md: body passes 1/2/3 + frontmatter description (Input & contracts, Error & lifecycle, Persistence)
- [ ] Update ft-audit-performance SKILL.md body §2: rename pass 5 (Caching)
- [ ] Update ft-flowtron SKILL.md roster: change `A11y` → `Accessibility` in ft-audit-frontend row
- [ ] Verify MIGRATION.md §1.2.1 table needs no edits (already aligned with chosen canonical)
- [ ] Phase 3: grep across the six SKILL files + ft-flowtron + MIGRATION to confirm zero remaining drift on each canonical pass-name token

## 🔗 Related

- (none filed; surfaced by audit-docs 2026-05-24 Finding #1)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Drift is real and confirmed against all four layers (body §2, frontmatter, MIGRATION.md §1.2.1, ft-flowtron roster). Audit-docs surfaced it 2026-05-24 as Finding #1 (Medium). Low-risk mechanical alignment that improves adopter clarity — every reader who scans pass names should see the same token in every doc layer.

- [x] Read relevant source files
- [x] **Archive skim** — No prior tasknote formalized a canonical-pass-name picking convention. The audit family grew incrementally (CORE-097.x → CORE-104 → CORE-130 cohort + CORE-186 added ft-audit-context yesterday); each addition picked its own forms without cross-referencing the others. This task is the first attempt to formalize one short canonical per pass.
- [x] **Drift check** — All four cited locations verified: body §2 (numbered list under `## 2. The 5 passes (in order)`), frontmatter `description:` field, MIGRATION.md §1.2.1 table at lines 65-77, ft-flowtron SKILL.md roster table at lines 42-62. PLAN line says "all six ft-audit-* skills" — confirmed as the MIGRATION.md §1.2.1 specialists (ft-audit-context excluded; per Phase 1 clarification).
- [x] Asked clarifying questions — 3 picks resolved: scope = 6 specialists only; frontend pass 2 = Accessibility (3-1 majority); backend pass 2 = Error & lifecycle (shorter, per directive).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Drift matrix (canonical picks bolded):**

| Skill | Pass # | Canonical (pick) | Body §2 today | Frontmatter today | MIGRATION today | Roster today |
|---|---|---|---|---|---|---|
| ft-audit | 1 | **Security** | Security & hardening ✗ | Security ✓ | Security ✓ | Security ✓ |
|  | 2 | **Idioms** | Canonical / idiomatic for your stack ✗ | Idioms ✓ | Idioms ✓ | Idioms ✓ |
|  | 3 | **Hygiene** | Code hygiene & naming ✗ | Hygiene ✓ | Hygiene ✓ | Hygiene ✓ |
|  | 4 | **Orphans** | Orphaned / depleted / historical leftovers ✗ | Orphans ✓ | Orphans ✓ | Orphans ✓ |
|  | 5 | **Doc drift** | Documentation drift ✗ | Doc drift ✓ | Doc drift ✓ | Doc drift ✓ |
| ft-audit-docs | 3 | **Cross-references** | Cross-references & navigation ✗ | ✓ | ✓ | ✓ |
|  | 4 | **Currency** | Currency & version pins ✗ | ✓ | ✓ | ✓ |
|  | 5 | **Stale content** | Stale / archived content ✗ | ✓ | ✓ | ✓ |
| ft-audit-security | 1 | **Secrets** | Secrets & credentials ✗ | ✓ | ✓ | ✓ |
|  | 5 | **Dependencies** | Dependencies & supply chain ✗ | ✓ | ✓ | ✓ |
| ft-audit-frontend | 2 | **Accessibility** | ✓ | ✓ | ✓ | A11y ✗ |
|  | 3 | **Render perf** | Render performance ✗ | Render performance ✗ | ✓ | ✓ |
| ft-audit-backend | 1 | **Input & contracts** | Input validation & contracts ✗ | ✓ | ✓ | ✓ |
|  | 2 | **Error & lifecycle** | Error handling & lifecycle ✗ | Error handling & lifecycle ✗ | ✓ | ✓ |
|  | 3 | **Persistence** | Persistence patterns ✗ | ✓ | ✓ | ✓ |
| ft-audit-performance | 5 | **Caching** | Caching & invalidation ✗ | ✓ | ✓ | ✓ |

**Total edits: 18 across 7 files** — ft-audit (5 body), ft-audit-docs (3 body), ft-audit-security (2 body), ft-audit-frontend (1 body + 1 frontmatter), ft-audit-backend (3 body + 1 frontmatter), ft-audit-performance (1 body), ft-flowtron (1 roster). MIGRATION.md §1.2.1 is **already aligned** — it's the de-facto reference layer that the others drifted from.

**Insight:** the long-form body §2 headings appear to be vestiges of an earlier "describe the pass in the heading" convention. The inline prose under each heading already unpacks the topic (e.g., `Security & hardening — input validation, injection risk, secrets handling, …`); the "& hardening" qualifier in the heading was redundant with the prose. Trimming to the short canonical loses no semantics.

**Out of scope:** ft-audit-context (per Phase 1 clarification). Its 4-pass `Bloat / Redundancy / Namespace / Drift` is already consistent across frontmatter ↔ roster, and the body's `Pass (a)…(d)` prose form is the deliberate distinction from the `/ft-audit*` family per its own §6 comment.

**Exit-gate judgment:** Discovery surfaced no significant deviation (all three clarifications were canonical-form picks for a known-shape alignment task — the SPEC §"default-skip judgment rule" cites "format/style pick" explicitly as a skip case) → **skip 🛠️**.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at MIGRATION.md §1.2.1 as the de-facto canonical shape (already aligned with the chosen short canonical for every pass; the body §2 / frontmatter / roster layers drifted away from it incrementally). Decided to align everything to that shape rather than invent a new convention.
- [x] Implemented the minimal solution (18 edits across 7 files; MIGRATION.md untouched as already-aligned reference)
- [x] No code under test — pure doc-string alignment in markdown SKILL.md files; flowtron itself doesn't parse pass names.

**Implementation Notes:**

Per-file edit count:
- `claude/skills/ft-audit/SKILL.md` — 5 body §2 heading swaps (Security · Idioms · Hygiene · Orphans · Doc drift)
- `claude/skills/ft-audit-docs/SKILL.md` — 3 body swaps (Cross-references · Currency · Stale content)
- `claude/skills/ft-audit-security/SKILL.md` — 2 body swaps (Secrets · Dependencies)
- `claude/skills/ft-audit-frontend/SKILL.md` — 1 frontmatter swap + 1 body swap (Render perf)
- `claude/skills/ft-audit-backend/SKILL.md` — 1 frontmatter swap + 3 body swaps (Input & contracts · Error & lifecycle · Persistence)
- `claude/skills/ft-audit-performance/SKILL.md` — 1 body swap (Caching)
- `claude/skills/ft-flowtron/SKILL.md` — 1 roster row swap (A11y → Accessibility)
- `docs/MIGRATION.md` — 0 edits (already aligned; the de-facto canonical)

Long-form trailing qualifiers were folded into the inline prose that follows each heading (e.g., `Dependencies — supply-chain risks: known CVEs…` preserves the "& supply chain" emphasis from the prior heading). Zero semantics lost.

## 🧪 Phase 3: Testing & Linting

- [x] No targeted test suite for SKILL.md prose changes — verification is grep-driven
- [x] Verification grep — confirmed zero remnants of the 15 long-form headings across all 7 files + MIGRATION.md; confirmed each canonical token (e.g., `Render perf`, `Accessibility`, `Error & lifecycle`) appears across all four expected layers (body §2 + frontmatter + MIGRATION + ft-flowtron roster)
- [x] Not a frontend change — no visual confirmation required.

**Testing Notes:**

Two grep sweeps run after the edits:

1. **Negative sweep** — `grep -nE '<15 long-form headings>'` against all six audit SKILL.mds + ft-flowtron + MIGRATION.md returned 0 hits. No long-form vestiges remain.
2. **Positive sweep** — confirmed each canonical token lands in all four layers. Examples:
   - `Render perf` → 4 hits (MIGRATION + roster + frontmatter + body)
   - `Accessibility` (ft-audit-frontend) → 4 hits across the same layers
   - `Error & lifecycle` → 4 hits
3. **Sanity:** ft-audit-context untouched (Bloat · Redundancy · Namespace · Drift still consistent across its 3 layers).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 9 AI-referenced docs walked:
  - `README.md` — no change (no audit-pass-name references)
  - `SPEC.md` — no change (mentions audit family by skill ID only, lines 87-96)
  - `docs/MIGRATION.md` — no change (§1.2.1 was the de-facto canonical; already aligned)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (mentions `/ft-audit`, `/ft-release`, `/ft-audit-docs` by skill ID only, line 20)
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change (enumerates audit-family slash commands lines 31, 173; no pass-name references)
- [x] Closed — PLAN.md line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Aligned audit-family pass names across four canonical layers (SKILL.md body §2, frontmatter `description:`, MIGRATION.md §1.2.1 table, ft-flowtron SKILL.md roster) for the six fork-and-customize specialists per MIGRATION.md §1.2.1 (excluding ft-audit-context, which uses a deliberately different 4-pass conversational shape). 18 edits across 7 files; MIGRATION.md needed no changes (already the de-facto canonical the other layers drifted from). Every reader who scans pass names now sees the same short canonical token in every doc layer.

**Archived:** 2026-05-24
