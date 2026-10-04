---
title: release v1.2.0
status: completed
tags: []
created: 2026-05-08
due:
related-tasks: [FE-012, CORE-047]
---

# CORE-048 | release v1.2.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[FE-012]] [[CORE-047]]

## 🎯 Goal

Cut v1.2.0 minor release tagging the additive features that have accumulated on main since v1.1.0 — FE-012 (viz inbound wikilink back-refs) and CORE-047 (doc-set drift contract).

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v1.1.0` → `v1.2.0`
- [ ] SPEC/versioning.md patch/minor examples shifted off the just-cut release (per CORE-043 / CORE-046 precedent)
- [ ] docs/MIGRATION.md example pin bumped `v1.1.0` → `v1.2.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-048 — flowtron v1.2.0 (...)` commit lands
- [ ] Annotated `v1.2.0` tag created with adopter-facing release notes (covers FE-012, CORE-047, doc currency, migration call-out)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-048.md`

## 🧩 Subtasks

- [ ] `SPEC.md` line 3 — bump `**Version:** v1.1.0` → `**Version:** v1.2.0`
- [ ] `SPEC/versioning.md` lines 8-15 — shift patch example `v1.1.0 → v1.1.1` to `v1.2.0 → v1.2.1`; minor `v1.1.x → v1.2.0` to `v1.2.x → v1.3.0`; major unchanged (already future-looking)
- [ ] `docs/MIGRATION.md` line 294 — bump example pin `(e.g., v1.1.0)` → `(e.g., v1.2.0)`
- [ ] Phase 3 — markdown lint mental-pass on edited paragraphs; viz suite unaffected (no viz change), not re-run
- [ ] Phase 4 — doc-drift sweep over `_project/tasknote/README.md` §"AI-referenced docs" (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md); flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit `feat: CORE-048 — flowtron v1.2.0 (FE-012 viz back-refs + CORE-047 doc-drift contract)`; draft + cut annotated tag `v1.2.0` (subject + summary + Changes since v1.1.0 + adopter migration block); push tag to origin

## 🔗 Related

- [[FE-012]] — viz inbound wikilink back-refs (additive feature included in v1.2.0)
- [[CORE-047]] — doc-set drift contract (additive feature included in v1.2.0; commit message explicitly deferred bump to "next minor")
- [[CORE-046]] — flowtron v1.1.0 (precedent release task; mirror its closure shape)
- [[CORE-043]] — release v1.0.0 (earlier precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task — two additive `feat:` commits sit on main untagged since v1.1.0 (FE-012 viz back-refs + CORE-047 doc-set drift contract). No new code or SPEC content to write; just version bump + doc-currency shifts + annotated tag + push. Pattern is well-established (v0.4.0 / v1.0.0 / v1.1.0 release tasknote precedents).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes (CORE-046 + CORE-043 release precedents)
- [x] **Drift check** — see Discovery Notes; no drift on cited paths/lines
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live + on-spec):**
  - `SPEC.md:3` — currently `**Version:** v1.1.0`
  - `SPEC/versioning.md:8-15` — patch example `v1.1.0 → v1.1.1`; minor `v1.1.x → v1.2.0`; major `v1.x.y → v2.0.0`
  - `docs/MIGRATION.md:294` — example pin `(e.g., v1.1.0)`
  - `_project/PLAN.md` — CORE-048 line under Critical (filed dda539a)
- **Out of scope (verified clean):**
  - `README.md` — no version refs (grep confirmed)
  - `claude/CLAUDE-snippet.md` — no version refs (grep confirmed)
  - `viz/package.json` — `"version": "0.1.0"` is independent component versioning, not flowtron contract version
- **Commits since v1.1.0** (6 total — verified via `git log v1.1.0..HEAD`):
  - `cda70d4` feat: FE-012 — viz inbound wikilink back-refs (additive feature)
  - `e7e786b` chore: pin viz dev server to port 5173 (chore — minor entry in tag notes or omitted)
  - `ea2da7d` chore: file CORE-047 (filing-only — omit from tag notes)
  - `1e31666` feat: CORE-047 — doc-set drift contract (additive feature with adopter action item)
  - `a6ee0fc` docs: tighten tasknote-README template wording (chore — minor entry or omitted)
  - `0c5478e` chore: close CORE-016 + CORE-EPIC-009 (chore — omit, project-internal)
- **Archive skim hits (release-task precedents):**
  - `CORE-046.md` (v1.1.0) — most recent precedent. Single commit + annotated tag pattern. Tag-message shape: subject + summary + "Changes since vP.Q.R:" grouped (SPEC contract / Doc currency) + Migration block. Doc-currency precedent: shift `SPEC/versioning.md` examples off the just-cut release; bump `docs/MIGRATION.md` example pin.
  - `CORE-043.md` (v1.0.0) — established the doc-currency-shift convention.
- **Adopter migration impact (v1.1.0 → v1.2.0):**
  - **CORE-047 introduces an adopter action item** — existing adopters bumping to v1.2.0 must add a `## AI-referenced docs` section to their `_project/tasknote/README.md` (per `templates/tasknote-README.md` shape) for the new Phase 4 doc-drift sweep to walk. New adopters via `/new-project` get it pre-populated automatically (no `/new-project` Step 6 logic change). v1.1.0's "no required project-side edits" boilerplate doesn't fit — the migration block must call this out explicitly.
  - **FE-012** — viz/-only feature; adopters who use the viz get inbound back-refs automatically on submodule bump. No project-side action.
- **Drift check details:**
  - `SPEC.md:3` confirmed `**Version:** v1.1.0` at HEAD
  - `SPEC/versioning.md:8` confirmed `v1.1.0 → v1.1.1` (patch); `:10` confirmed `v1.1.x → v1.2.0` (minor)
  - `docs/MIGRATION.md:294` confirmed `(e.g., v1.1.0)`
  - `docs/MIGRATION.md:293` historical "v1.0 additions" reference — leave per CORE-046 precedent (write-once historical, not a current pin)
- **Clarifying questions:** None. Two assumptions made explicit:
  1. Tag-message Changes section will include only the two `feat:` commits (FE-012, CORE-047) plus the Doc currency block; the four chore/docs commits are project-internal housekeeping and won't appear in adopter-facing notes.
  2. The tag's adopter migration block will call out the CORE-047 `## AI-referenced docs` action item (deviates from v1.1.0's "no required project-side edits" boilerplate).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-046 / CORE-043 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Three edits in order:

1. `SPEC.md:3` — `**Version:** v1.1.0` → `**Version:** v1.2.0`.
2. `SPEC/versioning.md:8-12` — patch example shifted `v1.1.0 → v1.1.1` to `v1.2.0 → v1.2.1`; minor `v1.1.x → v1.2.0` to `v1.2.x → v1.3.0`. Major (`v1.x.y → v2.0.0`) unchanged — already future-looking.
3. `docs/MIGRATION.md:294` — example pin `(e.g., v1.1.0)` → `(e.g., v1.2.0)`.

Verified post-edit: `grep -rn 'v1\.1\.0'` across live doc set (`SPEC.md`, `SPEC/`, `docs/`, `README.md`, `templates/`, `claude/`) returns empty. Archive references stay as-is per write-once policy. Total diff: 3 files, +4/-4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: edits are single-token version-string substitutions; surrounding prose unchanged. Viz suite is untouched (no viz change in this task) and not re-run.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — verdicts per `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (general "current contract version" pointer; no FE-012 / CORE-047 user-facing concept requires update)
  - `SPEC.md` — version-line bump (Phase 2); CORE-047's §"🚀 Phase 4: Closure" prose already at HEAD via its own commit
  - `docs/MIGRATION.md` — example-pin bump v1.1.0 → v1.2.0 (Phase 2); CORE-047's §1.5 extension already at HEAD via its own commit
  - `claude/CLAUDE-snippet.md` — no change (FE-012 is viz-only; CORE-047's adopter surface is `_project/tasknote/README.md`, not CLAUDE.md)
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Cut flowtron v1.2.0 — minor release tagging the additive features that accumulated on main since v1.1.0: FE-012 (viz inbound wikilink back-refs) and CORE-047 (doc-set drift contract). Pure release task — no new code or SPEC content; three doc-only edits (`SPEC.md:3` version bump, `SPEC/versioning.md:8-12` patch/minor examples shifted off the just-cut release per CORE-043 precedent, `docs/MIGRATION.md:294` example pin → v1.2.0). Single commit + annotated `v1.2.0` tag with adopter-facing release notes. Adopter migration block deviates from v1.1.0's "no required project-side edits" boilerplate to call out CORE-047's action item: existing adopters bumping must add a `## AI-referenced docs` section to their `_project/tasknote/README.md` (new adopters get it pre-populated via `/new-project`). Tag pushed to origin alongside the commit.

**Archived:** 2026-05-08
