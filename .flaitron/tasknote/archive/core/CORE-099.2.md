---
title: LICENSE
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.1]
---

# CORE-099.2 | LICENSE

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]]

## 🎯 Goal

Add an MIT `LICENSE` file at flowtron's repo root, resolving the adoption-positioning gap for submodule-consumed flowtron (per [[CORE-099.1]] Discovery row #5).

## ✅ Acceptance

- [x] `LICENSE` file exists at flowtron repo root containing the canonical SPDX-MIT text (per choosealicense.com/licenses/mit; body identical to opensource.org/licenses/MIT, with the `MIT License` header + `Copyright (c)` form that 5/6 CORE-097 candidates ship)
- [x] Header line is exactly `MIT License`
- [x] Copyright line is exactly `Copyright (c) 2026 fakeneuron`
- [x] Permission text matches the standard MIT body verbatim (no edits, no boilerplate substitutions beyond the copyright line)
- [x] File is UTF-8 (ASCII subset), LF line endings, final newline, no trailing whitespace
- [x] No other repo surfaces touched — README + `docs/CONVENTIONS.md` license prose is out-of-scope per [[CORE-099.1]] bundling (lands in [[CORE-099.3]])
- [x] Phase 4 doc-drift sweep recorded per-entry verdict across the 4 AI-referenced docs

## 🧩 Subtasks

- [x] Compose canonical MIT text with `Copyright (c) 2026 fakeneuron` (single new file at repo root; no other edits)
- [x] Write `LICENSE` to flowtron repo root
- [x] Mental-pass: header form, copyright line, permission paragraphs verbatim, LF endings, final newline, no trailing whitespace
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)
- [[CORE-099.1]] — Discovery (recommended MIT per row #5; matches all 6 CORE-097 candidates' license)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line is unambiguous; [[CORE-099.1]] Discovery row #5 directly recommends MIT (matches 5/6 surveyed CORE-097 adopter-projects) as the resolution for the adoption-positioning gap. Repo confirmed unlicensed (no `LICENSE` / `COPYING` at root; viz/package.json is `"private": true` with no `license:` field). Scope is one new file; README + conventions-doc prose is intentionally deferred to [[CORE-099.3]] per the parent epic's bundling decision (CORE-099.1 §"Bundling justification" — CONVENTIONS.md gathers 8 axes; LICENSE stays a standalone file).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `_project/PLAN.md` — confirmed [[CORE-099.2]] line at line 32 under `## Future Opportunities`, child of `CORE-EPIC-099` (line 30); `[opus]` model tag; word count of long description well under the 70w hard cap.
- `_project/tasknote/archive/core/CORE-099.1.md` — parent epic's Discovery output; row #5 of the per-axis findings table directly resolves this task (canonical: OSI MIT text from opensource.org/licenses/MIT; verdict: **Gap-to-adopt**; cost: Small/1-file).
- `README.md`, `SPEC.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md` — grepped for `license` / `copyright` / `MIT`: no copyright or license statements anywhere; flowtron's user-facing positioning ("submodule-adoptable across `~/code/`") motivates the LICENSE but doesn't constrain its form.
- `viz/package.json` — `"private": true` with no `license:` field; a repo-root LICENSE will cover the viz subtree without needing per-package metadata edits (npm's `private: true` suppresses the no-license warning, so no follow-up needed).
- `templates/tasknote-template.md` — canonical scaffold (consumed at Step 3b of `/ft-task`); confirms Acceptance/Subtasks are Phase-1-populated, not scaffold-populated.

### Archive skim findings

`grep -l "license\|LICENSE\|copyright"` across `_project/tasknote/archive/core/` returned 3 hits:

- **[[CORE-099.1]]** — direct parent (already read in full above). Row #5 of the findings table is the load-bearing precedent: canonical = MIT, verdict = Gap-to-adopt, adoption shape = "Add `LICENSE` file (recommend MIT — most permissive simple, matches all 6 CORE-097 candidates' license)". Note: CORE-099.1's claim "matches all 6" is slightly off — 5 of 6 are MIT explicitly; #4 (nicholasmartin/claude-workflow-template) is "not stated ⚠️". The recommendation still stands (MIT is the dominant convention in the surveyed set), but the audit subtask [[CORE-099.7]] should not re-cite "all 6" verbatim.
- **[[CORE-097.1]]** — external skill survey; per-row `License` column for the 6 surveyed claude-skills repos (5 MIT, 1 "not stated"). Source of the CORE-099.1 recommendation. No further scope implications for this task.
- **[[CORE-097.3]]** — `paths:` frontmatter adoption; one prose mention "license blocks vendoring" referring to the absent license on candidate #4. Not relevant to flowtron-self's LICENSE choice.

No prior LICENSE-touching tasknotes (the repo has never had a LICENSE).

### Drift check (verified at HEAD)

- No `LICENSE` / `LICENSE.md` / `LICENSE.txt` / `COPYING` at repo root — confirmed via `ls -la /Users/fakeneuron/Code/flowtron/LICENSE* /Users/fakeneuron/Code/flowtron/COPYING*` (no matches).
- `viz/package.json` has `"private": true` and no `license:` field — npm convention: `private: true` suppresses the missing-license warning for private packages, so no companion edit needed when LICENSE lands at repo root.
- Git author identity in commits: `fakeneuron <judedelparte@gmail.com>` — single identity, no ambiguity for the copyright line.
- Repo positioning claim ("submodule-adoptable across `~/code/`") cited in CORE-099.1 still present in `README.md` + `SPEC.md` + `docs/PHILOSOPHY.md`; the adoption-positioning gap CORE-099.2 closes is real and current.
- [[CORE-099.1]] (Discovery) is closed and archived at `_project/tasknote/archive/core/CORE-099.1.md` — predecessor relationship valid; the per-axis findings table is the canonical input for this task.
- Today's date: 2026-05-18 (flowtron started 2026-04-28 per [[CORE-001]]); copyright year = `2026` (single year; no range needed).

### Clarifying questions (resolved via AskUserQuestion 2026-05-18)

| Question | Answer | Effect |
|---|---|---|
| License variant | **MIT** | Use canonical OSI MIT text (opensource.org/licenses/MIT) verbatim |
| Copyright holder name | **fakeneuron** | Matches git author handle; copyright line = `Copyright (c) 2026 fakeneuron` |
| Year (implicit assumption) | **2026** | Flowtron-self started 2026-04-28; single year, no range |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no in-repo precedent (flowtron has never had a LICENSE). External pattern: SPDX-MIT canonical form as published at choosealicense.com is the de-facto standard shipped by 5/6 CORE-097 candidates and by `npm init` / `gh repo create` / GitHub's "Add license" UI. Adopted that form verbatim with `[year]` → `2026` and `[fullname]` → `fakeneuron`.
- [x] Implemented the minimal solution — single new file at `/LICENSE`, 21 lines, 1067 bytes.
- [x] Updated/added tests for non-trivial behavior — N/A (plain text license; verbatim canonical form needs no test fixture).

**Implementation Notes:**

### Canonical-source decision (SPDX form vs OSI prose form)

Two canonical sources both publish "the MIT license":

- **opensource.org/licenses/MIT** — body prose only; `Copyright <YEAR> <COPYRIGHT HOLDER>` (no `(c)`, no `MIT License` header).
- **choosealicense.com/licenses/mit/** — SPDX-shaped, paste-ready form; `MIT License` header + `Copyright (c) [year] [fullname]`. Identical permission/disclaimer body to OSI.

Chose the SPDX form because (a) it's what `npm init`, `gh repo create`, and GitHub's "Add license" UI produce, (b) it's what 5/6 CORE-097 surveyed claude-skills repos actually ship, and (c) the `MIT License` header is load-bearing for SPDX-Identifier auto-detection by license scanners. Both fetched and diffed to confirm body equivalence before write.

### Substitutions applied

- `[year]` → `2026` (single year; flowtron-self started 2026-04-28 per [[CORE-001]])
- `[fullname]` → `fakeneuron` (git author handle; user choice via AskUserQuestion 2026-05-18)

No other substitutions. Permission/disclaimer paragraphs identical to upstream verbatim.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (plain-text license; no executable behavior).
- [x] Ran lint/type-check on changed code — N/A (plain text). Substitute mental-pass: `file` reports `ASCII text` (UTF-8-compatible subset); `wc -lc` confirms 21 lines / 1067 bytes; `tail -c 1 | xxd` shows final byte `0a` (LF newline present); `grep -nP " +$"` returned no trailing whitespace; `grep -nP "\r"` returned no CR characters (LF-only).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

All mental-pass criteria satisfied — file form matches the Acceptance contract verbatim.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.2` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs per `_project/tasknote/README.md`)

| Doc | Verdict |
|---|---|
| `README.md` | no change — README has no license language; [[CORE-099.1]] §"Bundling justification" defers the conventions-doc license prose to [[CORE-099.3]] (CONVENTIONS.md). Naked LICENSE file at repo root is sufficient for adoption-positioning; cross-references land with the conventions bundle. |
| `SPEC.md` | no change — workflow contract; no license/copyright surface. |
| `docs/MIGRATION.md` | no change — adoption procedure unaffected (LICENSE doesn't change how adopters pin or bump submodules). |
| `claude/CLAUDE-snippet.md` | no change — adopter-facing assistant block; no license surface. |

### Recap

Added an SPDX-canonical MIT `LICENSE` file at flowtron's repo root, closing the adoption-positioning gap CORE-099.1 surfaced — flowtron is now formally adoptable as a submodule under a permissive license matching the dominant convention (5/6 CORE-097 candidates, `npm init`, GitHub's "Add license" UI). One new file, 21 lines, copyright line `Copyright (c) 2026 fakeneuron`. Body text fetched from choosealicense.com and diffed against opensource.org/licenses/MIT to confirm verbatim equivalence; chose the SPDX form (header + `(c)`) for license-scanner auto-detection. No other surfaces touched — README + conventions-doc license prose remain deferred to [[CORE-099.3]] per the parent epic's bundling decision.

### Audit note for [[CORE-099.7]]

CORE-099.1's row #5 claim "matches all 6 CORE-097 candidates' license" is slightly off — 5 of 6 are MIT explicitly; candidate #4 (nicholasmartin/claude-workflow-template) is "not stated ⚠️" per CORE-097.1's table. The MIT recommendation still stands (dominant convention in the surveyed set), but the audit subtask should not re-cite "all 6" verbatim if it cross-references this rationale.

**Archived:** 2026-05-18
