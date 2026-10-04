---
title: README-license-ref
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.2, CORE-099.7]
---

# CORE-099.8 | README-license-ref

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-099.7]]

## 🎯 Goal

Add a top-level README license reference so visitors discover the MIT license in one hop, not two.

## ✅ Acceptance

- [x] README.md gains a `## License` section pointing to `LICENSE`, sited after the existing `## Version` section
- [x] Visitor discovers the MIT license from README without leaving README (1-hop, not the prior 2-hop README → CONTRIBUTING → §"Licensing" chain documented in [[CORE-099.7]])
- [x] No drift introduced in the four AI-referenced docs beyond the README addition (verified at Phase 4 doc-drift sweep)

## 🧩 Subtasks

- [x] Add `## License` section to `README.md` after `## Version` (text: `Flowtron is [MIT-licensed](LICENSE).`) — single Edit operation appending to current end of file
- [x] Verify the new section: link resolves to `LICENSE`, heading level matches sibling sections (`##`), trailing newline preserved
- [x] Confirm the 1-hop chain (README → LICENSE) now exists and matches the audit-prescribed shape from [[CORE-099.7]]
- [x] Phase 3: markdown mental-pass on the diff (no test/lint targets — markdown-only change)
- [x] Phase 4: doc-drift sweep of the 4 AI-referenced docs, flip PLAN line to stub form, cascade-close parent epic [[CORE-EPIC-099]] per [[CORE-099.7]] Final Summary directive, archive tasknote, and prepare recap for the autonomous-commit motion

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey); flipped to Completed in this closure (final child)
- [[CORE-099.2]] — added the LICENSE file (MIT) that this section links to
- [[CORE-099.7]] — audit subtask that surfaced this finding with the exact gap analysis

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit follow-up filed by [[CORE-099.7]] §"Findings" with full diagnostic context (current 2-hop chain README → CONTRIBUTING → §"Licensing" L41 → "MIT-licensed", desired 1-hop). The gap is concrete (README has no §"License", no badge, no footer license line — verified at HEAD), the fix is well-scoped (one new section in `README.md`), and the parent epic CORE-EPIC-099 is blocked on this child before it can flip to Completed per `SPEC/epic.md` §"Audit follow-ups". No re-scope or de-scope warranted.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `README.md` (116 LOC) — Sections in order: lead (L1-9) → `## Documents` (L10-22) → `## Bootstrapping a new project` (L24-29) → `## Visualizer` (L31-58) → `## Working in markdown vaults` (L60-95) → `## Repo layout` (L97-106) → `## Version` (L108-115). **No `## License` section, no license badge, no footer license line.** Confirmed at HEAD — matches the audit's finding verbatim.
- `LICENSE` — MIT, copyright "fakeneuron" 2026, 21 LOC; present at repo root. GitHub auto-detects and surfaces "MIT License" in the sidebar (per [[CORE-099.7]] mitigating-context note), but the README's *own text* still lacks a pointer.
- `CONTRIBUTING.md` §"Licensing" (L39-41) — "Flowtron is [MIT-licensed](LICENSE)." Prior 2-hop terminus; this `.8` adds a parallel 1-hop surface in README, not a replacement.
- `_project/tasknote/archive/core/CORE-099.7.md` — Finding 1 (L186-194) documents the gap, the 2-hop vs 1-hop framing, the GitHub-sidebar mitigation, and the filing rationale. Acceptance for this `.8` should satisfy that audit's framing.

### Archive skim findings

`_project/tasknote/archive/core/` skim for prior README / LICENSE / docs-currency tasknotes:

- [[CORE-099.7]] — **Direct predecessor.** Surfaced this gap; its Finding 1 (lines 186-194) and Final Summary doc-drift table (line 228) are the precise specification. No re-interpretation needed — implement as specified.
- [[CORE-099.2]] — Added the `LICENSE` file (MIT). Closed 2026-05-18 with its own per-task doc-drift sweep; that sweep didn't surface the README-pointer gap (exactly the cumulative-slice miss `.7`'s audit-level sweep was designed to catch — see [[CORE-099.7]] Final Summary).
- [[CORE-099.6]] — Added `CONTRIBUTING.md` (which includes the §"Licensing" terminus); confirmed cross-ref to `LICENSE` resolves.
- [[CORE-099.5]] — Added README §"Working in markdown vaults"; pattern precedent for adding a new top-level `##` section to README via append/insert.
- [[CORE-022]] (2026-05-01) — original "Working in Obsidian" README section (since rewritten by `.5`); confirms that adding a `##` section to README is the established shape, not a novel surface.

No prior tasknote attempted a README license reference. No conflicting work, no superseded scope, no orphan risk.

### Drift check (verified at HEAD)

- `README.md` lacks `## License` — confirmed (sections enumerated above end at `## Version` L108-115) ✓
- `LICENSE` exists at repo root, MIT — confirmed ✓
- `CONTRIBUTING.md` §"Licensing" at L39-41 — confirmed (the 2-hop terminus is real) ✓
- `_project/tasknote/README.md` §"AI-referenced docs" — 4-doc list still at L34-37 (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`) ✓
- PLAN.md `.8` line at L38, `[opus]` after Step 1.5 retag, under `## Future Opportunities` indented under `CORE-EPIC-099` ✓

No drift between [[CORE-099.7]]'s finding and current HEAD. Implementation matches the audit-prescribed shape.

### Resolved scoping (from AskUserQuestion 2026-05-18)

| Question | Answer | Implication |
|---|---|---|
| Shape (footer / §"License" / inline-in-Version)? | **§"License" section** | New `## License` section in README; mirrors `## Version` sibling shape; most discoverable; matches the recommended path from [[CORE-099.7]] Finding 1 |
| Position relative to `## Version`? | **After `## Version` (last)** | New section lands at the very bottom of README, after `## Version` (L115); matches the README convention of Version + License as a trailing-meta block |

Resolution: Append a `## License` section to `README.md` with the text `Flowtron is [MIT-licensed](LICENSE).` immediately after the existing `## Version` section (which ends at L115). Single Edit operation; no other files touched.

### Phase 2 plan

One edit to `README.md`:

```markdown
## License

Flowtron is [MIT-licensed](LICENSE).
```

Appended after the current trailing line of `## Version` (L115). Preserves existing trailing newline; no other formatting changes.

No tests (markdown only). No lint targets (existing README has no markdown linter wired — per `docs/CONVENTIONS.md` §"markdownlint" decline). Phase 3 reduces to a mental-pass on the diff.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `README.md` already uses `##`-level top-level section headings throughout (`## Documents`, `## Bootstrapping…`, `## Visualizer`, `## Working in markdown vaults`, `## Repo layout`, `## Version`). The new `## License` section adopts that established shape — same heading level, single-paragraph body, parallel to sibling `## Version` immediately above it. No new pattern introduced.
- [x] Implemented the minimal solution — single Edit to `README.md` appending the `## License` section after the existing `## Version` block. 4 lines added (blank separator + heading + blank + body line). No other files touched.
- [x] Updated/added tests for non-trivial behavior — N/A (markdown content only; no executable change)

**Implementation Notes:**

Diff: `README.md` gains 4 lines at the tail:

```markdown

## License

Flowtron is [MIT-licensed](LICENSE).
```

Body link `[MIT-licensed](LICENSE)` mirrors `CONTRIBUTING.md` §"Licensing" L41 exactly — same phrasing, same link target — so the two terminus surfaces stay in sync.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only doc change)
- [x] Ran lint/type-check on changed code — N/A (per `docs/CONVENTIONS.md` §"markdownlint" decline, no markdown linter wired). Markdown mental-pass on the diff: heading level `##` matches sibling sections ✓; relative link `[MIT-licensed](LICENSE)` resolves (LICENSE exists at repo root) ✓; single trailing newline preserved (no double-newline at EOF) ✓; no trailing whitespace on either new line ✓; section sits after `## Version` per Phase 1 resolution ✓.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; markdown rendering in GitHub / Obsidian / Foam / Logseq follows the standard `##` heading + link conventions already used elsewhere in README)

**Testing Notes:**

Markdown-only diff; no test/lint targets fire. Verification reduces to: (a) the link target exists (`LICENSE` at repo root — confirmed), (b) the heading level matches siblings (`##` — confirmed), (c) the prior 2-hop chain still works as a secondary surface (`CONTRIBUTING.md` §"Licensing" unchanged), and (d) no other files touched (`git status` will show one modified file at commit time).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.8` line flipped to stub form; parent epic [[CORE-EPIC-099]] cascade-closed per [[CORE-099.7]] Final Summary directive ("After `.8` closes, the parent epic CORE-EPIC-099 can flip to Completed and the cohort moves to `## Completed`"); collapsed-children annotation matches the [[CORE-EPIC-097]] / [[CORE-EPIC-098]] / [[FE-EPIC-033]] shape ("Children CORE-099.1–.8 archived; closure consumed the subtask list per epic-close convention"); tasknote moved to `_project/tasknote/archive/core/CORE-099.8.md`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" §"Conditional skip rule" — markdown-only diff; no frontend / privileged-ops / perf surface)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | **Updated.** Added `## License` section (4 lines: blank separator + heading + blank + `Flowtron is [MIT-licensed](LICENSE).` body) after `## Version` per [[CORE-099.7]] Finding 1. Closes the 2-hop chain — visitors now reach MIT in 1 hop. |
| `SPEC.md` | no change — workflow contract is orthogonal to license-meta surface |
| `docs/MIGRATION.md` | no change — adoption mechanics unaffected |
| `claude/CLAUDE-snippet.md` | no change — adopter-assistant block unaffected |

### Recap

Audit follow-up filed by [[CORE-099.7]] Finding 1: README lacked a top-level license reference, leaving visitors with a 2-hop chain (README → CONTRIBUTING → §"Licensing") to reach the MIT license. Added a 4-line `## License` section to `README.md` after `## Version`, with body `Flowtron is [MIT-licensed](LICENSE).` mirroring the CONTRIBUTING terminus exactly. One file modified, no other surfaces touched.

This is the final child of [[CORE-EPIC-099]] (external-conventions-survey). Cascade-closed the parent epic per the audit's directive — parent flipped to Completed, children collapsed into the annotated "Children CORE-099.1–.8 archived" line, and the whole block moved to `## Completed`. Cohort delivers: LICENSE (MIT) + `docs/CONVENTIONS.md` (8 axes: 4 adheres / 4 declines) + `.editorconfig` + README §"Working in markdown vaults" (Obsidian/Foam/Logseq) + `CONTRIBUTING.md` (solo-maintained framing) + this README license-ref. 3 user-declined adoptions from [[CORE-099.1]] Discovery (markdownlint, spec-kit upfront staging, `.github/` templates) remain correctly not adopted.

**Archived:** 2026-05-18
