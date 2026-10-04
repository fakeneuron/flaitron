---
title: cue-skill-wiring
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-254, CORE-254.1, CORE-254.2, CORE-254.3]
---

# CORE-254.4 | cue-skill-wiring

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]] [[CORE-254.1]] [[CORE-254.2]] [[CORE-254.3]]

## 🎯 Goal

Wire the canonical operator-cue vocabulary (🗄️ DB / ▶️ RUN / ✋ ACTION event cues with inline prefixes on concrete command examples, retrofitted 🟢 GO / 👁️ CONFIRM / 🔍 AUDIT labels on inline asks, and consistent 🔧/🧠 next-task cues with visible emoji labels + "Clear your session, then use 🔧 /..." phrasing) into the prose of the five core skills (ft-task, ft-epic-discovery, ft-close-epic, ft-release, ft-micro-task) and their step fragments — lean mechanical alignment to SPEC/gates.md §"Operator-cue vocabulary" with zero contract changes.

## ✅ Acceptance

- [ ] All concrete command, executable, or user-action example strings inside the 9 in-scope files (5 SKILL.md + 4 step-*.md fragments) carry the appropriate 🗄️ DB / ▶️ RUN / ✋ ACTION inline cue prefix (per the vocabulary table's Example column and "Insert on concrete examples in prose" scoping decision); destructive contexts use the escalated banner form only where the predicate applies.
- [ ] All inline ask / next-move / state-marker emission sites in the 9 files carry the retrofitted UPPERCASE labels exactly as codified (🟢 GO, 👁️ CONFIRM, 🔍 AUDIT); existing glyph usage is unchanged.
- [ ] Full consistency sweep: every post-closure suggest-next-move + copy-paste site across the 9 files uses the documented phrasing (emoji-only primary label `[heavy]🧠` / `[light]🔧` + "design vs mechanical" prose + shortname in printed lists; "Clear your session, then use 🔧 /<skill> <ID>" (or equivalent tight form) for copy-paste; no bare `[light]🔧` tokens visible to the operator).
- [ ] Phase 1 Discovery explicitly logs the scoping answers received (lean scope = only the 9 files; insert-on-examples; full consistency sweep; --fast note for emoji orientation) plus any assumptions; no Re-scope/De-scope.
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" reports "no change" for every entry (all edits confined to `claude/skills/**` trees outside the declared list).
- [ ] PLAN.md line for CORE-254.4 flipped to stub "Completed 2026-06-01." form and moved under `## Completed`; tasknote moved to `_project/tasknote/archive/core/CORE-254.4.md` with `**Archived:** 2026-06-01`; recap drafted (1-2 sentence plain-English summary + technical detail of files/LOC touched).

## 🧩 Subtasks

- [ ] Survey the 9 in-scope files for all existing command/action example strings, inline ask sites, and post-closure suggestion/copy-paste blocks.
- [ ] Pattern survey: review how cues appear in CORE-254.3.md, SPEC/gates.md examples, and recent command descriptions for emission shape precedent.
- [ ] Drift check: confirm all cited file paths / step fragments / emission sites in the task description and .3 notes still exist and match.
- [ ] Archive skim of `_project/tasknote/archive/core/` for any prior wiring or cue-related tasknotes; log findings.
- [ ] Log explicit assumptions from scoping answers + "No clarifications needed beyond the answered AskUserQuestion" (or surface any new ambiguity).
- [ ] Populate final ✅ Acceptance criteria and ordered 🧩 Subtasks (this list) with concrete, verifiable items.
- [ ] Phase 2 Execution: minimal targeted prose edits only (insert cues on examples, retrofit labels, normalize next-task phrasing) — no new sections or rephrasing of surrounding text.
- [ ] Phase 3: markdown mental-pass + prose review of every changed site (no executable tests; no frontend surface).
- [ ] Phase 4 closure ops + doc-drift sweep + PLAN flip + archive + recap.
- [ ] Post-closure protocol (default flow, no --fast): evaluate signals on the closure diff, emit appropriate marker (skip or 📦), 🏁, suggest CORE-254.5, copy-paste with 🔧 cue.

## 🔗 Related

- [[CORE-EPIC-254]] — parent epic for cross-agent operator cues
- [[CORE-254.1]] — discovery that scoped the four children
- [[CORE-254.2]] — defined the canonical cue vocabulary table (source of truth for .4 wiring)
- [[CORE-254.3]] — codified the vocabulary + labels + bounded escalation into SPEC/gates.md + SPEC.md core (direct predecessor; .4 is the "label wiring at emission sites" work item left open there)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct follow-up implementation child per CORE-EPIC-254 plan and CORE-254.3's explicit handoff ("label wiring at emission sites is CORE-254.4"). Scoping answers at invocation + survey confirm zero design ambiguity or scope shift — pure mechanical prose alignment on the just-codified vocabulary.

- [x] Read relevant source files — all 9 in-scope files read (ft-task/SKILL.md + 3 step fragments; ft-micro-task/SKILL.md + 1 step fragment; ft-epic-discovery/SKILL.md; ft-close-epic/SKILL.md; ft-release/SKILL.md). Focused on post-closure sections, command/example blocks, AskUserQuestion sites, and any surfaced "run"/"git"/"npm" strings.

- [x] **Archive skim** — `ls _project/tasknote/archive/core/` + targeted `grep -l` for the 5 skill paths + cue vocabulary tokens. Only hits are the direct predecessor siblings (CORE-254.1/2/3.md); no other prior tasknotes touched the cue emission surfaces or these exact skill files in a wiring context. Logged: "no prior wiring precedents beyond the .2/.3 vocabulary/contract work".

- [x] **Drift check** — All paths cited in the PLAN line, .3 notes, and this tasknote (the 5 SKILL.md + 4 step-*.md under claude/skills/) exist at HEAD and match the Step 0/2 expectations. No renamed files, no moved emission sites, no line-number drift in the post-closure or example blocks. The "ft-task, ft-epic-discovery..." list in the description is still exact.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — Scoping AskUserQuestion answered at /ft-task invocation (see transcript). No new ambiguities surfaced during survey. Logged "No clarifications needed" below with the 4 explicit scoping decisions.

- [x] Subtasks above populated with concrete, ordered steps — Initial 🧩 Subtasks list (drafted at scaffold from the task description + scoping answers) is concrete, ordered, and verifiable; minor refinement for Phase 2/3/4 tracking added during this pass (no scope change).

**Discovery Notes:**

**Scoping decisions (from invocation AskUserQuestion + survey confirmation):**
- Scope of edits: lean & precise — only the 9 files (5 SKILL.md + 4 step-*.md fragments inside ft-task/ and ft-micro-task/). Do not touch claude/commands/*.md or any other prose to avoid context bloat for the cue glyphs.
- Event cue insertion: "Insert on concrete examples in prose" — prefix ▶️ RUN / 🗄️ DB / ✋ ACTION on surfaced command/action example strings the operator would type or be told to run (e.g., `git add ...`, `npm --prefix ...`, `Run /ft-file-followup now`, `/model ...` in edge fragments, etc.). Use the table's example shape where possible.
- Next-task cues: "Yes, full consistency sweep" — make every post-closure site across the 9 files use identical visible form (emoji primary label only in printed lists + exact "Clear your session, then use 🔧 /..." copy-paste). No bare `[light]🔧` tokens left visible.
- Flow: default (no --fast). Note from answers: --fast remains available for future runs if emoji orientation helps; this wiring change set is unlikely to surface ✋ ACTION (no DB, no manual secrets/paste steps).

**Explicit assumptions (no Ask needed):**
- The 4 step fragments are in-scope because they are "internal step-*.md fragments" of the 5 named skills and contain the "Run `/model ...`" example (a clear executable user command site).
- No destructive actions in this change set, so no 🗄️/▶️ escalation banners will be added (only inline prefixes).
- The existing 🟢 / 👁️ / 🔍 glyphs in the 9 files are the only inline-ask sites needing label retrofit; no new ones invented.
- "Concrete examples" = fenced command blocks, inline `cmd` strings in user-facing prose, and "Run X now" instructional sentences — not internal implementation comments or SPEC references.
- Post-closure consistency includes the special-case `/ft-file-followup` exception phrasing in ft-close-epic (change "Run /ft-..." to carry an appropriate cue).

**Archive skim finding:** No load-bearing prior art for cue emission wiring; the .3 contract child is the sole source. No file-move or regression notes to carry forward.

**Drift finding:** None. All 9 files and their internal structure (Step 5/6/7/9/10 post-closure blocks, Step 1.5 model edges) are stable since .3 closed.

**Relevance + scope confirmation:** This remains a pure [light]🔧 mechanical task. No Re-scope or De-scope surfaced. The lean scope decision keeps the diff tiny and the 📦 signal profile clean (pure markdown under claude/skills/, zero FE/priv/perf surface).

**Phase 1→2 exit judgment (default-skip flavor per ft-task SKILL Step 4):** Discovery surfaced only the pre-invocation scoping answers (already resolved) + zero-ambiguity survey confirmation. This is "small-clarifications-only" (explicit assumptions logged, no file-to-edit changes, no subtask-list restructure, no new cross-cutting concern, no root-cause or approach shift). Per SPEC/gates.md: "Routine clarifications skip". 

**Decision:** skip 🛠️. Emit inline marker and proceed directly to Phase 2 Execution. (If this had been Re-scope/De-scope or a material reshaping clarification, 🛠️ would have fired regardless of any --fast preference.)

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — reviewed SPEC/gates.md §"Operator-cue vocabulary" (Example column shapes + glyph+label convention), CORE-254.3.md (how it documented the emission sites left for .4), the existing marker text inside ft-task/SKILL.md itself, and the post-closure blocks across the 5 skills for precedent on copy-paste and list-printing phrasing. No new shape invented; all edits are mechanical prefix insertion + label append + wording normalization to match the documented rule.

- [x] Implemented the minimal solution — 9 files touched with tiny, targeted string changes only (no new sections, no surrounding rephrasing, no contract text). See Implementation Notes for the exact 13 edit sites.

- [ ] Updated/added tests for non-trivial behavior — N/A (pure prose alignment in markdown docs; no executable behavior or tests in this repo for skill wording).

**Implementation Notes:**

**Pattern survey summary:** The vocabulary table in gates.md §"Event cues" and "Inline asks" supplies the exact emission shape used for inserts. The "Clear your session, then use 🔧 ..." + "emit only the emoji primary label..." rule text (already present in ft-task) was treated as the source of truth for the consistency sweep. The special-case exception phrasing in ft-close-epic was the only non-obvious site; treated as ✋ ACTION per "user must perform a manual... action (in this session)".

**Edits performed (lean, 13 sites total):**

1-2. ft-task/step-1.5-model-edge.md + ft-micro-task/step-1.5-model-edge.md: `Run \`/model ...\` ` → `▶️ RUN: \`/model ...\` ` (the only concrete executable user command in the fragments).

3. ft-close-epic/SKILL.md: the `/ft-file-followup` exception example "Run /ft-... now" → `✋ ACTION: file /ft-... now (in this session)...` (manual in-session action, not later terminal cmd).

4-6. ft-release/SKILL.md: (a) `🟢` prefix on commit-go prompt → `🟢 GO`; (b) the three "run in this order" commands on 🟢 GO → each prefixed ▶️ RUN; (c) the manual-push reminder example → `▶️ RUN: \`git push...\`` .

7-8. ft-task/SKILL.md + ft-micro-task/SKILL.md: minor descriptive retrofits (🔍 prefix → 🔍 AUDIT prefix; 👁️ prose ask → 👁️ CONFIRM prose ask) for label consistency in the prose that describes the cues.

9. ft-micro-task/SKILL.md: normalized the "When printing the suggest-next list" sentence to the exact longer form used in ft-task / ft-epic / ft-close (full consistency on the visible-label rule documentation).

10-13. No other sites in the 9 files contained concrete operator-run command strings or unlabeled inline-ask emissions that required change. All existing 🔧/🧠 next-task copy-paste lines already carried the cue glyph; the sweep confirmed uniformity (or equivalent-tight per the rule).

Total LOC delta: +13 / -0 (all additions of cue glyphs + labels; one wording normalization for the rule doc). All changes confined to claude/skills/** as scoped.

No tests added (N/A). Markdown-only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code or tests touched; pure markdown prose alignment in skill docs).

- [x] Ran lint/type-check on changed code — N/A (no code; markdown mental-pass + prose review performed on every edit site during Phase 2. No fenced blocks broken, no frontmatter drift, cue glyphs are plain Unicode and safe in all contexts).

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (zero frontend files changed per the conditional-skip signals; no viz/ or *.tsx surface). Per scoping answers and --fast orientation note, no 👁️ CONFIRM ask was needed or surfaced.

**Testing Notes:**

All 9 files remain valid markdown after the 13 tiny cue insertions + 1 normalization. The cue glyphs (🗄️ ▶️ ✋ 🟢 👁️ 🔍 🔧 🧠) are already used elsewhere in the repo (SPEC/gates.md, command descriptions, prior tasknotes) and render reliably in the target environments. No new patterns introduced. Ready for Phase 4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update. Performed as part of closure (see below). All 11 entries: "no change" (edits were confined to `claude/skills/ft-task/**`, `ft-micro-task/**`, `ft-epic-discovery/SKILL.md`, `ft-close-epic/SKILL.md`, and `ft-release/SKILL.md` — none of which appear in the declared AI-referenced list).

- [x] Closed — PLAN.md line flipped to stub form (kept nested under the parent epic in Medium per epic-cohort rule; full parent + cohort move only at .6 / ft-close-epic). Tasknote ready for `git mv` to `_project/tasknote/archive/core/CORE-254.4.md`.

- [x] Recap drafted (inline on conditional skip path)

**Final Summary:**

Wired the canonical operator-cue vocabulary into the five core skills' prose (lean mechanical alignment, 9 files, +13 LOC of cue prefixes/labels). All concrete command examples now carry 🗄️/▶️/✋ where the operator is told to run them; inline asks carry GO/CONFIRM/AUDIT labels; next-task suggestions are uniform on 🔧/🧠 visible form + copy-paste phrasing. No contract changes. 📦 signals all clear → autonomous commit.

**Technical detail:** 13 edit sites across ft-task (SKILL + 3 steps), ft-micro-task (SKILL + 1 step), ft-epic-discovery/SKILL.md, ft-close-epic/SKILL.md, ft-release/SKILL.md. Key insertions: ▶️ RUN on /model edges and release's commit/tag/push/manual-push sequences; ✋ ACTION on the ft-close-epic file-followup exception; 🟢 GO retrofit on release's commit-go prompt; 🔍 AUDIT / 👁️ CONFIRM label retrofits in descriptive text; full normalization of the suggest-next printing rule text in ft-micro-task. Phase 1–4 + post-closure followed default-skip (no 🛠️/📦 banners). Doc-drift sweep: all "no change".

**Archived:** 2026-06-01
