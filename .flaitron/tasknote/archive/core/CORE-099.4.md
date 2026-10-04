---
title: .editorconfig
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.1, CORE-099.3]
---

# CORE-099.4 | .editorconfig

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]] · [[CORE-099.1]] · [[CORE-099.3]]

## 🎯 Goal

Add a repo-root `.editorconfig` so md/ts/jsx/json/yaml files keep consistent line endings, encoding, and whitespace across solo + adopter editors.

## ✅ Acceptance

- [ ] `.editorconfig` exists at repo root with `root = true`
- [ ] `[*]` defaults present: `charset = utf-8`, `end_of_line = lf`, `indent_style = space`, `indent_size = 2`, `trim_trailing_whitespace = true`, `insert_final_newline = true` (per PLAN-line scope + user-confirmed indent inclusion)
- [ ] `[*.md]` block present codifying that flowtron docs inherit `[*]` defaults (no hard-break trailing-spaces in flowtron markdown — verified zero hits across `SPEC.md`, `README.md`, `docs/*.md`)
- [ ] File dogfoods its own rules (LF line endings, UTF-8, ends with newline, no trailing whitespace)
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Write `.editorconfig` at repo root with `root = true` + `[*]` block (charset, end_of_line, indent_style, indent_size, trim_trailing_whitespace, insert_final_newline) + `[*.md]` codification block
- [ ] Verify file dogfoods its own rules (read back; confirm LF + final newline + no trailing whitespace)
- [ ] Phase 4: doc-drift sweep + flip PLAN.md `.4` line to stub form + move tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)
- [[CORE-099.1]] — Discovery subtask that filed this child
- [[CORE-099.3]] — sibling: `docs/CONVENTIONS.md` (the convention this enforces mechanically)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-099.1]] Discovery axis #8 (EditorConfig) recommended adoption with verdict "Gap-to-adopt" (rank P2.a in shortlist). PLAN-line description matches the Discovery adoption-shape exactly ("Add `.editorconfig` (md, ts, jsx, json, yaml)"). Drift check: `.editorconfig` still absent at repo root ✓; sibling cohort siblings (`LICENSE` via [[CORE-099.2]], `docs/CONVENTIONS.md` via [[CORE-099.3]]) have landed cleanly. [[CORE-099.3]] explicitly carved EditorConfig out of CONVENTIONS.md scope: "EditorConfig — belongs to sibling [[CORE-099.4]]" — confirming clean boundaries.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Clarifying question resolved via AskUserQuestion (indent rules in scope) — see Discovery Notes
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `_project/tasknote/archive/core/CORE-099.1.md` — Discovery prior; per-axis findings table row #8 (EditorConfig) + ranked shortlist P2.a + adoption shape `Add .editorconfig (md, ts, jsx, json, yaml)` + cost "Small (1 file)". Primary source for this task's scope.
- `_project/tasknote/archive/core/CORE-099.3.md` — sibling Phase 1 explicitly carved EditorConfig out of CONVENTIONS.md scope (line 119): *"EditorConfig — belongs to sibling [[CORE-099.4]]. CONVENTIONS.md may mention LF endings as part of GFM stance but won't duplicate the `.editorconfig` rationale."* No doc-cross-link work needed back to CONVENTIONS.md.
- Repo file-type survey (`find` + indent inspection):
  - **Markdown** (`*.md`) — predominant; 2-space list nesting; zero trailing-double-space hard-breaks across `SPEC.md`, `README.md`, `docs/*.md` (verified via grep — all 0 hits)
  - **TypeScript / TSX** (`viz/src/*.ts`, `viz/src/*.tsx`) — 2-space indent (`parser.ts` line 2, `main.tsx` lines 8/14)
  - **JSON** (`viz/package.json`, `viz/tsconfig.json`) — 2-space indent
  - **CSS** (`viz/src/styles.css`) — 2-space indent
  - **HTML** (`viz/index.html`) — 1 file
  - **YAML** files (`.yaml`/`.yml`) — **none**; YAML in flowtron lives as frontmatter inside `.md` files (rules apply via `[*.md]` inheritance)
  - **No `.prettierrc` / `.eslintrc` / `.editorconfig`** anywhere in flowtron
- Sibling `~/code/` projects: zero `.editorconfig` files in adopter projects either (only an unrelated third-party `searxng/` clone has one) — flowtron leads on this convention.

### Archive skim findings

Skimmed `_project/tasknote/archive/core/` (110+ tasknotes); grep for `editorconfig` / `EditorConfig` / `.editor.config` hit zero archived tasknotes — no prior `.editorconfig`-touching work, no historical decisions to honor or invert. Load-bearing precedents are the two cohort siblings ([[CORE-099.1]] Discovery + [[CORE-099.3]] CONVENTIONS scope-carve, both already cited above).

### Drift check (verified at HEAD)

- `.editorconfig` at repo root — **absent** ✓ (gap from [[CORE-099.1]] Discovery still present)
- `LICENSE` at repo root — present (landed by [[CORE-099.2]]) ✓
- `docs/CONVENTIONS.md` — present (landed by [[CORE-099.3]]) ✓
- Cohort siblings still open: `.5` (README markdown-vaults), `.6` (CONTRIBUTING.md), `.7` (audit) — confirms `.4` is the next-in-cohort and dependencies cleared
- Markdown hard-break audit: `grep -c '  $'` across `SPEC.md`, `README.md`, `docs/*.md` returned 0 hits per file — safe to apply `trim_trailing_whitespace = true` universally without a `[*.md]` exception (codifies the de-facto convention)
- File-type list in PLAN-line ("md/ts/jsx/json/yaml"): no `.jsx` (TSX only) and no standalone `.yaml`/`.yml` in flowtron-self; the glob listing is defensive/generic for adopter projects that fork. Using `[*]` defaults (rather than language-by-language overrides) cleanly covers the actual file inventory + future adopter file types.

### Clarifying question (resolved 2026-05-18)

| Question | User's answer | Implication for Phase 2 |
|---|---|---|
| Include indent rules (`indent_style = space`, `indent_size = 2`) in `[*]` defaults? | **Yes — include** | Indent rules codify the de-facto 2-space convention uniformly observed across `.md` / `.ts` / `.tsx` / `.json` / `.css`; defends against editor-introduced indent drift, which is one of the most common editor-drift sources (in-spirit with the PLAN line's rationale, mildly outside its literal scope) |

### Adoption shape (locked at Phase 1 close)

Repo-root `/Users/fakeneuron/Code/flowtron/.editorconfig` carrying:

```text
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
# inherit defaults (no hard-break trailing-spaces used in flowtron docs)
```

Single `[*]` defaults block covers all current + likely-future file types (md/ts/tsx/jsx/json/yaml/css/html/sh). Explicit `[*.md]` block included to codify that markdown inherits the trim rule (rather than the standard editor convention of disabling trim for `.md` to preserve hard-break trailing-spaces) — flowtron's docs don't use the hard-break form, so the convention can be safe and uniform. The comment serves as the rationale-of-record. Out-of-scope: `viz/dist/**` (git-ignored build artifacts; not normally opened in an editor; no `.editorconfig` exception needed).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — No prior `.editorconfig` in flowtron or any `~/code/` sibling project; the file is its own canonical pattern (editorconfig.org spec). Shape drawn from Phase 1 adoption-shape lock — codebase audit confirmed 2-space indent across all file types, zero markdown hard-break trailing-spaces, no `.yaml`/`.yml` standalone files. New shape justified: single file at repo root, single `[*]` defaults block covering all current + future file types, no language-specific overrides needed.
- [x] Implemented the minimal solution — `/Users/fakeneuron/Code/flowtron/.editorconfig` (12 lines): `root = true` + `[*]` defaults block (charset, end_of_line, indent_style, indent_size, trim_trailing_whitespace, insert_final_newline) + `[*.md]` block with inheritance-codification comment.
- [x] Updated/added tests for non-trivial behavior — N/A (`.editorconfig` is a static config consumed by editors; no executable surface; no test fixture conventions in flowtron).

**Implementation Notes:**

### Files changed

| File | Change | LOC |
|---|---|---|
| `.editorconfig` (repo root) | new file | +12 |

### Self-dogfood verification (deferred to Phase 3)

The file must obey its own rules: LF line endings, UTF-8, ends with newline, no trailing whitespace, 2-space indent (n/a — no indented lines in the file). Verified in Phase 3 testing notes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (`.editorconfig` is a static config consumed by editors; no executable surface)
- [x] Ran lint/type-check on changed code — N/A (no linter for `.editorconfig` in flowtron; manual self-dogfood verification substitutes)
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

Self-dogfood verification (the file must obey its own rules):

| Rule | Check | Result |
|---|---|---|
| `charset = utf-8` | `file .editorconfig` | `ASCII text` (UTF-8 ASCII-subset) ✓ |
| `end_of_line = lf` | `grep -lU $'\r' .editorconfig` | no CRLF hits ✓ |
| `trim_trailing_whitespace = true` | `grep -nP '[ \t]+$' .editorconfig` | no matches ✓ |
| `insert_final_newline = true` | `tail -c 1 .editorconfig \| xxd` | `0x0a` (LF) ✓ |
| `indent_style = space` / `indent_size = 2` | manual inspection | n/a — no indented lines in the file |

Length: 12 lines.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.4` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol")

**Final Summary:**

### Acceptance verification

- [x] `.editorconfig` exists at repo root with `root = true` ✓
- [x] `[*]` defaults present: `charset = utf-8`, `end_of_line = lf`, `indent_style = space`, `indent_size = 2`, `trim_trailing_whitespace = true`, `insert_final_newline = true` ✓
- [x] `[*.md]` block present with inheritance-codification comment ✓
- [x] File dogfoods its own rules (LF, UTF-8, final newline, no trailing whitespace) ✓
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" ✓

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — `## Repo layout` is curated for AI-walkable surfaces, not a complete file listing; `.gitignore` and `LICENSE` (added by [[CORE-099.2]]) are also absent from this list. Same shape as those existing omissions. |
| `SPEC.md` | no change — workflow contract; no file/editor-config surface |
| `docs/MIGRATION.md` | no change — adoption procedure; `.editorconfig` is flowtron-self internal and does not propagate to adopter repo roots via submodule. Recommending it to adopters is a separate consideration, out of this task's scope. |
| `claude/CLAUDE-snippet.md` | no change — adopter-facing assistant snippet; no editor-conventions surface |

**Out-of-sweep note (potential follow-up):** `docs/CONVENTIONS.md` (satellite-reference, not in AI-referenced docs list per [[CORE-099.3]]) currently has no `### EditorConfig` subsection under `## Adheres to`. The cohort audit [[CORE-099.7]] can flag whether adding one is worth doing for symmetry with the four existing adherence sections (Conv-Commits, SemVer, GFM, Diátaxis). Out of this task's filed Acceptance.

### Recap

Added `/Users/fakeneuron/Code/flowtron/.editorconfig` (12 lines): `root = true` + `[*]` block (charset=utf-8, end_of_line=lf, indent_style=space, indent_size=2, trim_trailing_whitespace=true, insert_final_newline=true) + `[*.md]` block with inheritance-codification comment. Defends against editor-introduced drift (line endings, indent, trailing whitespace, final newline) across solo flowtron-self work and any future adopter-side forks. File dogfoods its own rules (LF, UTF-8, final newline, no trailing whitespace, ASCII content). Phase 1 audit confirmed zero markdown hard-break trailing-double-spaces across `SPEC.md` / `README.md` / `docs/*.md`, so the `trim_trailing_whitespace = true` rule is safe to apply universally without a `[*.md]` exception — the explicit `[*.md]` block codifies that convention with a one-line comment.

Indent rules were the one user-resolved clarification (AskUserQuestion 2026-05-18): included per user choice, codifying the de-facto 2-space convention uniformly observed across `.md` / `.ts` / `.tsx` / `.json` / `.css`. Out-of-sweep follow-up surfaced for the cohort audit [[CORE-099.7]]: whether `docs/CONVENTIONS.md` should add an `### EditorConfig` subsection for symmetry with its other adherence sections.

**Archived:** 2026-05-18
