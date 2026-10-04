---
title: release v2.0.1
status: completed
tags: []
created: 2026-05-11
due:
related-tasks: [CORE-082, CORE-081, CORE-080]
---

# CORE-083 | release v2.0.1

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-082]] [[CORE-081]] [[CORE-080]]

## 🎯 Goal

Cut flowtron v2.0.1 — patch release tagging the audit doc-drift sweep (CORE-082) and release-skill example genericize (CORE-081) since v2.0.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v2.0.0` → `v2.0.1`
- [ ] SPEC/versioning.md patch example shifted off the just-cut release (v2.0.0 → v2.0.1 becomes v2.0.1 → v2.0.2)
- [ ] docs/MIGRATION.md example pin bumped `v2.0.0` → `v2.0.1`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-083 — flowtron v2.0.1 (...)` commit lands
- [ ] Annotated `v2.0.1` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-083.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v2.0.0` → `**Version:** v2.0.1`
- [ ] `SPEC/versioning.md:8` — shift patch example `v2.0.0 → v2.0.1` to `v2.0.1 → v2.0.2` (minor + major stay — both still future-looking)
- [ ] `docs/MIGRATION.md:330` — bump example pin `(e.g., \`v2.0.0\`)` → `(e.g., \`v2.0.1\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep; flip PLAN.md; move tasknote to archive
- [ ] Post-closure — single commit; draft + cut annotated tag `v2.0.1`; push tag to origin

## 🔗 Related

- [[CORE-082]] — audit doc-drift sweep (primary trigger for this patch)
- [[CORE-081]] — release-skill example genericize (chore bundled in patch)
- [[CORE-080]] — release v2.0.0 (most recent precedent; mirror its closure shape)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure patch release. Two commits since v2.0.0 — both `fix:` / `chore:` → patch. No new features, no breaking changes. Pattern is well-established (CORE-080 / CORE-060 / CORE-048 precedents).

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live, confirmed on-spec):**
  - `SPEC.md:3` — `**Version:** v2.0.0` ✓
  - `SPEC/versioning.md:8` — patch example `v2.0.0 → v2.0.1` (needs shift to `v2.0.1 → v2.0.2`)
  - `SPEC/versioning.md:10` — minor example `v2.0.x → v2.1.0` (stays — still future-looking)
  - `SPEC/versioning.md:13` — major example `v2.x.y → v3.0.0` (stays — still future-looking)
  - `docs/MIGRATION.md:330` — `(e.g., \`v2.0.0\`)` (needs bump to `v2.0.1`)
  - `git describe --tags` → `v2.0.0` — matches SPEC.md:3, no drift
- **Commits since v2.0.0** (2 total):
  - `d541352` fix: CORE-082 — audit-doc-drift-sweep (patch)
  - `6ac4d44` chore: CORE-081 — release-skill-example-genericize (patch)
- **Archive skim:** CORE-080 (v2.0.0), CORE-060 (v1.3.0), CORE-048 (v1.2.0) — canonical precedents. No structural drift.
- **Adopter migration impact:** None required. No new symlinks, no new slash commands, no breaking changes. CORE-082 doc fixes consumed automatically on submodule bump. CORE-081 is flowtron-self internal.
- **No clarifications needed.** Patch bump confirmed by commit log. User elected v2.0.1 explicitly.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-080 / CORE-060 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits)

**Implementation Notes:**

Three edits:
1. `SPEC.md:3` — `**Version:** v2.0.0` → `**Version:** v2.0.1`
2. `SPEC/versioning.md:8` — patch example `v2.0.0 → v2.0.1` shifted to `v2.0.1 → v2.0.2` (minor + major unchanged — still future-looking)
3. `docs/MIGRATION.md:330` — `(e.g., \`v2.0.0\`)` → `(e.g., \`v2.0.1\`)`

Verified post-edit: `grep -rn 'v2\.0\.0'` across live doc set returns empty — clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Markdown lint mental-pass: single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: version bump (Phase 2) · docs/MIGRATION.md: pin bump (Phase 2) · claude/CLAUDE-snippet.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-11.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v2.0.1 — patch release bundling the audit doc-drift sweep (CORE-082: two stale §3.2→§1.2 cross-refs in MIGRATION.md + bare template paths in skill fragments) and the release-skill example genericize chore (CORE-081). Three doc-only edits: SPEC.md version bump, SPEC/versioning.md patch example shift, MIGRATION.md pin bump. No project-side changes required for adopters.

**Archived:** 2026-05-11
