---
title: seeder-fleet-gaps
status: starter
tags: [seed-unattended, fleet-feedback]
created: 2026-11-09
touches:
  - SPEC/unattended-candidacy.md
  - SPEC/plan-filing.md
  - claude/skills/ft-seed-unattended/
---

# CORE-897 | seeder-fleet-gaps

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-09)

## 🌱 Starter context

_Captured 2026-11-09 by Natabula NAT-551 from the 2026-11-07 fleet seeding walk. Drift-checked against flaitron HEAD `19bbe25030cde6b05e5d52755640dd17ef46c2de` (`v8.4.0-7-g19bbe250`). Promote in the owning flaitron checkout; this filing does not authorize implementation decisions._

### Why this exists

The v8.3.0 fleet walk found ten gaps or ambiguities. They remain in the current markdown procedure/contract. These are static procedure reproductions, not a claim that a new live fleet walk was executed. Historical repository examples below are evidence captured by NAT-551's original starter, not freshly verified application state.

| # | Current evidence and minimal case | Required outcome to decide upstream |
|---|---|---|
| 1 | `SPEC/unattended-candidacy.md` / Never autonomous requires a stay and says never a split. A mixed row containing an independent local code slice plus a real deployment act cannot reach the otherwise clean Split test. Historical cases: adppro DATA-48/DEPLOY-12, fakeneuron-nas NAS-19, cloutomaton CORE-57, siteguy CORE-129, stockshock SS-65. | Decide a narrow attended split exception; keep the person act in the remainder, require the slice to work and ship without it, and screen the exact new row. Never admit the person act. |
| 2 | Seeder Step 2 immediately makes an admitted row a mark; preparations are only for declined rows. An otherwise admitted light row with a Verify grep matching its own PLAN description gets no correction path. Historical cases: pidlyse PID-104, aetherlace AL-045, blastimage BI-083, marscharts CORE-495 (Verify hand-fixed Nov 7); stale refs BE-530 and false fact FS-042. | Offer bounded factual corrections under the same attended review, re-screen exact bytes, and re-scan before writing. Decide evidence limits; do not silently repair already-marked rows. |
| 3 | Seeder Step 1 collects every open checkbox bullet, including ID-less prose that `SPEC/plan-parser.md` excludes. Conversely, `- **PID-030** ...` has no checkbox: both the reference parser (`BULLET_CHECKBOX`) and seeder exclude it. The original report's implication that the parser accepts it was incorrect. Comments/fences and legacy Critical headings also need an explicit policy. | Align eligible tasks with parser grammar/exclusions and report malformed ID-bearing bullets separately. Do not silently count or seed them as valid tasks. Historical invisibrain ID-less count: 10/11; pidlyse PID-030 malformed bullet. |
| 4 | Seeder Step 2 and module / Seeding an existing plan demand the first failed clause, but collision stays have no clause. A heavy epic parent fails clause 1 before structural clause 5; a heavy .N can likewise be reported merely as a tier stay. | Specify whether semantic/structural dispositions override predicate-order reporting, and give collisions/caps a non-clause reason. Keep candidacy conservative. |
| 5 | Clause 3 says words deploy, secret, migration etc., without defining case, boundaries or inflections. Cases such as deploys, Redeploy, secrets, migrations can yield different mechanical screens; the semantic layer still applies. | Specify normalization/matching with positive and negative examples; preserve skipped own-ID/backtick spans and the independent semantic refusal. Do not assume arbitrary substring matching. |
| 6 | The general active-row cap exists in `SPEC/tasknote-selection.md`, but seeder Step 2 explicitly applies 50 words only to split rows. Pin and question-option drafting/re-scan have no corresponding explicit check. Historical studio3pnf CORE-055 option a reached 81 words. | Enforce the existing target/hard cap for every drafted rewritten row and option, excluding only the established pointer suffix; specify over-cap handling without inventing an override. |
| 7 | `SPEC/plan-filing.md` / ID allocation says zero-pad like existing IDs, without resolving mixed padded/unpadded history (historical cloutomaton CORE-58). | State a deterministic tie-break or bounded operator decision; preserve numeric max+1 and collision rules. This is an ambiguity in the shared rule, not an absent allocation rule. |
| 8 | Seeder Step 2 requires new mechanical rows as [light]🔧 or [moderate]🧩, while parser docs call these glyphs decorative. Historical glyph-free plans: wandora and natabula. | Decide whether mechanical rows follow the plan's glyph style; preserve model tiers and token placement. |
| 9 | Clause 4 checks row-text Blocked by, not an active note's status: blocked. Step 2 Basis read only reads starters; an otherwise admitted light row whose note is parked can become a mark before collision checks for declined rows run. Historical NAT-537 and delparte DP-136. | Define parked-note handling before admitting marks; preserve blocked runner semantics, record the reason, and never mutate/restart the note here. |
| 10 | Seeder Step 2 and Stay bullet make every source note/stub collision a stay, even for a pin or standalone question that creates no starter. Historical bidviz TEST-005 and marscharts FE-547. | Decide operation-specific collision rules with consistency and re-scan duties; retain protection against overwriting notes/orphaning stubs. A pre-existing stub may itself need a consistency rule, so simply removing the guard is insufficient. |

### Solution shape

- Resolve the open policy choices in Phase 1, then update canonical candidacy rules and their seeder procedure/fragment together. Shared padding belongs in plan-filing, not a seeder-only duplicate.
- Preserve one attended review, exact proposed bytes, fresh re-scan, dependency cascades, filing commit verification, no autonomous token write, and no second fleet-wrapper predicate.
- Use table-driven worked cases for marks/preparations/stays, skipped and malformed counts, blocked notes, collisions, caps and dependency drops. Do not add an executable seeder, schema validator, or cross-project API.
- If Discovery finds implementation too broad, split through the owning workflow before source changes; this starter preserves the full intake without pretending the policy is settled.

### Files to touch (preliminary survey — drift-check at promotion)

- `SPEC/unattended-candidacy.md` — authoritative eligibility/preparation/reporting policy.
- `claude/skills/ft-seed-unattended/SKILL.md` — collect/classify/draft/review/re-scan/write/report.
- `claude/skills/ft-seed-unattended/scope-and-question.md` — question options and operation-specific collisions.
- `SPEC/plan-filing.md` — mixed-padding ambiguity only, if resolved here.
- Read `SPEC/plan-parser.md`, `viz/src/parser.ts`, and `SPEC/tasknote-selection.md` as authorities; no grammar change implied. Update mirrors/docs only where the chosen implementation requires them.

### Explicitly out of scope

- Natabula wrappers (NAT-547/NAT-548), audit-filer hygiene (NAT-549), and Caobunga hints/coverage (NAT-550).
- Editing adopter application rows or rerunning fleet seeding; changing Natabula's submodule pin; release, push, merge or deploy.
- Relaxing Never autonomous for actual external/person acts or granting unanswered choices approval.

### Acceptance that decides it

- Every finding above has a recorded disposition and an exact before/after worked case for changed behavior; retained restrictions have rationale — judgment: markdown procedure behavior requires semantic review, not a grep that merely finds its own words.
- Canonical rules, the seeder body and its question fragment agree; parser grammar remains authoritative and dependency/drop/re-scan invariants remain intact — judgment: review against the ten cases and existing workflow contracts.
- Section citations, mirrors and context budgets pass — `bash tools/drift-checks.sh`.

### Open at promotion (Phase 1 should resolve)

- Settle the narrow split exception, bounds on admitted-row corrections, parser diagnostic policy, reason precedence and keyword matching from cases 1–5.
- Settle over-cap handling, mixed-padding style, glyph policy, parked-note eligibility and operation-specific note/stub consistency from cases 6–10.
- Decide whether the implementation should be decomposed after Discovery; do not mark this unresolved policy work unattended.

### Related

- Natabula NAT-551 — source routing task and original fleet evidence.
- Natabula NAT-547/NAT-548 — wrapper scale and research precedent; target pin owns dispositions.
- Natabula NAT-549 — existing Verify self-match/backtick hygiene in audit filing, not a seeder correction path.
- CORE-619, CORE-EPIC-812, CORE-850.4 — prior seeder work named by current candidacy module.
