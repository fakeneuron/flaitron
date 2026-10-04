---
title: README markdown-vaults
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.1, CORE-022]
---

# CORE-099.5 | README markdown-vaults

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]]

## 🎯 Goal

Rename and expand the README's "Working in Obsidian" section to "Working in markdown vaults", naming Foam and Logseq parity with caveats (notably Logseq's frontmatter-via-block-properties).

## ✅ Acceptance

- [x] `README.md` §"Working in Obsidian" renamed to §"Working in markdown vaults"
- [x] Section retains editor-agnostic opt-in framing (no tool positioned as required)
- [x] Section retains the two existing bullets naming flowtron features that map natively (`[[TASK-ID]]` wikilinks from [[CORE-018]] + YAML frontmatter from [[CORE-017]])
- [x] Dataview snippet retained and explicitly labeled Obsidian-only
- [x] Foam parity stated (wikilinks + graph view work; no built-in query plugin)
- [x] Logseq parity stated with frontmatter caveat (wikilinks work; frontmatter stored as block-properties `key:: value`; flat YAML files still load but querying uses Logseq's `:query`)
- [x] Section length lands in the ~25-35 line range (soft cap; let it grow as needed) — 35 content lines, right at the upper edge of the soft target
- [x] `docs/CONVENTIONS.md` line 37 cross-reference updated from `§"Working in Obsidian"` to `§"Working in markdown vaults"`
- [x] No other docs reference the old section title (grep verified)

## 🧩 Subtasks

- [x] Update `README.md` §"Working in Obsidian" → §"Working in markdown vaults": retain editor-agnostic framing + two existing bullets; reframe Dataview block as Obsidian-only; add Foam paragraph (wikilinks ✓, graph view ✓, no query plugin); add Logseq paragraph (wikilinks ✓, frontmatter block-property caveat); keep closing opt-in line
- [x] Update `docs/CONVENTIONS.md` line 37 cross-reference (`§"Working in Obsidian"` → `§"Working in markdown vaults"`)
- [x] Grep the repo for any other references to "Working in Obsidian" and update if found
- [x] Phase 3: markdown mental-pass (heading anchors, code-fence balance, link integrity, line count in ~25-35 target)
- [x] Phase 4: doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" + flip PLAN.md line to stub form + move tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)
- [[CORE-099.1]] — discovery subtask that filed this child
- [[CORE-022]] — original "Working in Obsidian" README section

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct implementation child of [[CORE-EPIC-099]]. The parent Discovery [[CORE-099.1]] explicitly recommended this as P2.b: "Rename + expand current 'Working in Obsidian' to name Foam + Logseq parity (wikilinks ✓, frontmatter caveat for Logseq). Small (README section edit)." Per-axis findings row #4 grounds the Foam (actively maintained, standard wikilinks + sections + aliases, YAML-compatible) and Logseq (wikilinks ✓, frontmatter via block-properties `key:: value`, flat-YAML still readable) facts. Scope is bounded (one README section edit + one cross-ref update). [[CORE-022]] establishes the opt-in framing and the quad-backtick-wrap trick for the Dataview block — both carry forward.

- [x] Read relevant source files (`README.md` §"Working in Obsidian" lines 58-84; `docs/CONVENTIONS.md` line 37 cross-reference; archived [[CORE-022]] for opt-in framing precedent; [[CORE-099.1]] per-axis findings row #4)
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `README.md` lines 58-84 — current "Working in Obsidian" section (17 content lines; quad-backtick-wrapped Dataview block; closing opt-in disclaimer)
- `docs/CONVENTIONS.md` line 37 — explicit cross-reference to `README.md §"Working in Obsidian"` that will break if not updated alongside the rename
- `_project/tasknote/README.md` §"AI-referenced docs" — Phase 4 sweep target (4 docs: README.md, SPEC.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md)

### Archive skim findings

- **[[CORE-099.1]]** (Discovery, 2026-05-18) — direct parent. Per-axis row #4 records the Foam + Logseq facts this task implements: Foam actively maintained (vscode@0.40.4, May 2026), standard `[[wikilink]]` + sections + aliases, YAML-compatible. Logseq native wikilinks + block-property frontmatter (`key:: value`), reads flat-markdown-with-wikilinks vaults with partial fidelity. Shortlist row P2.b explicitly names this task's adoption shape and size estimate (Small, README section edit).
- **[[CORE-022]]** (Working in Obsidian section, 2026-05-01) — established the opt-in framing precedent + the quad-backtick-wrap trick for the Dataview block (so the example renders as literal text on GitHub *and* doesn't auto-execute when someone reads README.md inside an Obsidian vault). Both carry forward. Section length acceptance there was ≤ 20 lines; CORE-099.5 lifts the cap to ~25-35 (user-confirmed, this Phase 1) to accommodate Foam + Logseq paragraphs.
- **[[CORE-099.3]]** (CONVENTIONS.md, 2026-05-18) — landed the cross-reference on CONVENTIONS.md line 37 that will need to track this rename.
- **Other touched files (grep):** [[CORE-095]] (wikilink-form self-sweep) and [[CORE-076]] (wikilink-token placeholder hygiene) confirm the `[[TASK-ID]]` grammar in the section's bullets is settled; no syntax drift to worry about.

### Drift check (verified at HEAD)

- `README.md` §"Working in Obsidian" header present at line 58 ✓
- Current section: 17 content lines (CORE-022's reported size unchanged) ✓
- Quad-backtick-wrapped `dataview` block intact at lines 75-82 ✓
- Closing opt-in line at line 84 ✓
- `docs/CONVENTIONS.md` line 37 contains: "See `README.md` §\"Working in Obsidian\" for the opt-in vault-tool integration surface." ✓
- Grep across the repo for "Working in Obsidian" produced exactly two hits (README.md heading + CONVENTIONS.md cross-ref); no other docs reference the old title. Update both, done.
- Foam (CORE-099.1 fetch: vscode@0.40.4, 1519 commits, 17.1k stars, released 2026-05-14) and Logseq (block-property frontmatter convention) facts captured then are stable enough that re-fetching now adds nothing.

### Resolved scoping (from AskUserQuestion 2026-05-18)

| Question | Answer |
|---|---|
| Dataview snippet treatment | **Keep + label Obsidian-only** — retain block, scope it explicitly ("Dataview is Obsidian-only; Foam has no query layer; Logseq uses its own `:query`"). Smallest delta from current section; preserves the concrete copy-paste affordance CORE-022 deliberately added. |
| Section length budget | **Let it grow (~25-35 lines)** — soft cap; lifts CORE-022's strict ≤ 20 to accommodate Foam + Logseq paragraphs cleanly. |

### Out of scope (recorded to prevent creep)

- Touching `docs/CONVENTIONS.md` §"GitHub Flavored Markdown" content (already names Obsidian/Foam/Logseq in the right shape — only the cross-ref line at line 37 needs the title update).
- Adding a Logseq `:query` example block — user chose option (a) "keep + label Obsidian-only", explicitly declining option (b) which would add Logseq-side syntax.
- Cross-linking the section to CONVENTIONS.md (the CONVENTIONS.md → README direction already exists; reverse direction not requested).
- Touching archived tasknotes (write-once policy).
- Adding adoption guidance for fresh adopter projects (the section is positioning, not a how-to; out of scope per CORE-022's framing).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — README.md's existing section shape (short prose + occasional fenced code block) carried over from [[CORE-022]]; new section follows the same pattern with `**Bold paragraph headers.**` for each vault tool (Obsidian / Foam / Logseq), matching the lightweight prose-paragraph shape used throughout the README. No new pattern introduced.
- [x] Implemented the minimal solution — rewrote `README.md` §"Working in Obsidian" → §"Working in markdown vaults" (lines 58-93) and updated the single back-reference in `docs/CONVENTIONS.md` line 37.
- [x] Updated/added tests for non-trivial behavior — N/A (markdown prose; no code, no testable behavior).

**Implementation Notes:**

- Preserved CORE-022's quad-backtick wrap around the inner triple-backtick `dataview` block — renders as literal text on GitHub *and* doesn't auto-execute when someone reads README.md inside an Obsidian vault.
- Foam paragraph names the wikilink features CORE-099.1's per-axis findings row #4 captured (standard `[[wikilink]]` + `[[note#Section]]` + `[[note|alias]]`) and explicitly notes "no built-in query plugin equivalent to Dataview" to set adopter expectations.
- Logseq paragraph carries the frontmatter caveat verbatim from CORE-099.1's per-axis findings: block-properties `key:: value` preferred, flat YAML still loads, `:query` syntax differs from Dataview. No example query block (user-chosen Phase 1 design call — option a "keep + label Obsidian-only", explicitly declining option b "add Logseq :query equivalent").
- Closing line generalized from "Obsidian is opt-in companion tooling" to "These tools are opt-in companion surfaces" — broadens to all three named tools while preserving the opt-in framing.
- CONVENTIONS.md cross-reference update is purely the section-title swap; surrounding prose untouched (CONVENTIONS.md already names Obsidian/Foam/Logseq correctly in its §"GitHub Flavored Markdown" paragraph).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose; no executable surface).
- [x] Ran lint/type-check on changed code — manual markdown mental-pass (no markdownlint config in repo per [[CORE-099.1]] decline rationale).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend UI; README renders on GitHub + in vault tools, and per [[CORE-022]] precedent the user doesn't run Obsidian/Foam/Logseq personally so live-validation in vault tools isn't available).

**Testing Notes:**

Markdown mental-pass on the new README §"Working in markdown vaults" (lines 58-93): heading anchor present (`## Working in markdown vaults`); code-fence balance preserved (outer quad-backtick at 75/82, inner triple-backtick at 76/81 — both balanced pairs); two existing bullets intact at 64-67 with 2-space hanging indent on continuation lines; three bold paragraph headers (`**Obsidian.**` / `**Foam.**` / `**Logseq.**`) consistent shape; inline code (`` `_project/` ``, `` `[[TASK-ID]]` ``, frontmatter field names, `` `[[note#Section]]` ``, `` `[[note|alias]]` ``, `` `key:: value` ``, `` `:query` ``) all backtick-wrapped; em-dashes at lines 60 + 89 properly spaced (` — `); Dataview link `[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)` intact (CORE-022 verified this URL against the canonical Dataview docs, no re-fetch needed); closing opt-in disclaimer present at line 93; no trailing whitespace introduced; 35 content lines (within the user-confirmed ~25-35 soft target, at the upper edge). CONVENTIONS.md line 37 update is a single-phrase swap with no structural impact.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.5` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/` (line stays under [[CORE-EPIC-099]] in `## Future Opportunities` since the parent epic isn't done yet — children `.6` and `.7` still pending)
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | **UPDATED** — §"Working in Obsidian" renamed to §"Working in markdown vaults"; section expanded from 17 to 35 content lines; Foam + Logseq paragraphs added; Dataview block reframed as Obsidian-only; opt-in framing preserved + closing line generalized. |
| `SPEC.md` | no change (workflow contract unrelated to README positioning). |
| `docs/MIGRATION.md` | no change (adoption procedure unrelated to vault-tool integration). |
| `claude/CLAUDE-snippet.md` | no change (adopter-CLAUDE.md wiring snippet unrelated). |

**Note for [[CORE-099.7]] audit:** `docs/CONVENTIONS.md` (landed in [[CORE-099.3]] today) is referenced by AI-coding adopter workflows but is **not** in `_project/tasknote/README.md` §"AI-referenced docs" — its line 37 cross-reference was updated alongside README.md as part of this task's repo-wide grep verification, but the canonical AI-referenced doc list itself doesn't yet include CONVENTIONS.md. The audit subtask should decide whether to add it.

### Recap

Renamed `README.md` §"Working in Obsidian" → §"Working in markdown vaults" and expanded the body from a single-tool positioning paragraph to three-tool parity (Obsidian / Foam / Logseq) with caveats grounded in [[CORE-099.1]]'s per-axis findings. Foam paragraph names supported wikilink shapes (`[[note#Section]]`, `[[note|alias]]`) and graph view; Logseq paragraph carries the frontmatter-via-block-properties caveat (`key:: value`) and the `:query` substitution for Dataview. Dataview block retained per user-chosen design call (option a — keep + label Obsidian-only), preserving CORE-022's quad-backtick-wrap trick that renders the snippet as literal text on GitHub *and* prevents auto-execution inside Obsidian vaults. Updated the one back-reference in `docs/CONVENTIONS.md` line 37 to track the new section title; grep-verified no other live docs reference the old title (remaining hits are write-once archived tasknotes + PLAN.md's frozen CORE-022 stub).

**Files changed:** `README.md` (§"Working in Obsidian" → §"Working in markdown vaults", +18 net lines); `docs/CONVENTIONS.md` (1-line cross-ref update).

**Archived:** 2026-05-18
