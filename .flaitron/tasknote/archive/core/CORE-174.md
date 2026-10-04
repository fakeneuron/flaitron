---
title: ft-release operator-gate alignment
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-171, CORE-172, CORE-173]
---

# CORE-174 | ft-release operator-gate alignment

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-171]] [[CORE-172]] [[CORE-173]]

## 🎯 Goal

Align `claude/skills/ft-release/SKILL.md` Step 7.4–7.5 with SPEC §"Operator-gate cues" + §"Post-closure protocol" — replace the prose commit-go with the 📦 banner block (mandatory preview line), add the 🟢 commit-go prefix and 🏁 post-commit state-marker, and bundle push-go as a discrete in-📦 prompt parallel to ft-close-epic's parent-flip Yes/No.

## ✅ Acceptance

- [ ] Step 7.4 surfaces the canonical 📦 banner block (`---` / `📦 **AWAITING APPROVAL — Ready to commit**` / preview line / `---`) per SPEC §"Operator-gate cues", with the 1-2 sentence preview line stating commit + tag + push (or local-only) intent.
- [ ] The 📦 bundle in Step 7.4 lists the SPEC-defined items (closure review, recap, proposed commit message) plus the release-specific push-go Yes/No prompt (default Yes) and the locked tag message reference from Step 7.2.
- [ ] The commit-go cue carries the `🟢` prefix (e.g., `🟢 Reply commit / go to land.`).
- [ ] Step 7.5 reframes as "On 🟢 commit-go (push-go captured in the 📦 bundle)" and runs commit → tag → push-branch + push-tag (Yes) or commit → tag only (No, with manual-push note in the 🏁 marker); the separate "Surface the tag and ask explicitly before pushing" pause is removed.
- [ ] A `🏁` post-commit state-marker fires after commit + tag + push lands, parallel to `🛠️ → 📦 → 🏁` per SPEC §"Post-closure protocol" step 2 (with the 1-2 sentence accomplishment summary).
- [ ] Step 8 is reframed to reference the bundled motion: commit-go satisfied at the 📦 gate, 🏁 marker fires after push (or after commit on push-go No), then suggest-next-move + copy-paste line.
- [ ] No regressions in other ft-release contracts (tag-message review at Step 7.2 still happens; explicit `git add` stays defensive; CORE-048/046/043 precedent references intact).

## 🧩 Subtasks

- [ ] Pattern survey: re-read SPEC §"Operator-gate cues" banner format + ft-close-epic Step 9 bundled-📦 surface as the canonical parallel.
- [ ] Draft the new Step 7.4 body (📦 banner + bundle contents + push-go Yes/No prompt + 🟢 commit-go cue).
- [ ] Draft the new Step 7.5 body (atomic sequence on 🟢 commit-go branching on push-go Yes/No; 🏁 marker emission).
- [ ] Draft the Step 8 reframe (post-closure protocol references 🏁 marker; recap bundles into 📦 not separately).
- [ ] Apply the three edits to `claude/skills/ft-release/SKILL.md`.
- [ ] Markdown mental-pass on the edited Steps 7.4 / 7.5 / 8 (banner format verbatim from SPEC, no broken fences).
- [ ] Phase 4 closure: doc-drift sweep + flip PLAN line + archive.

## 🔗 Related

- [[CORE-171]] — two enumerative-claim fixes from same 2026-05-24 audit-docs run (sibling finding)
- [[CORE-172]] — /ft-file-followup special-case in ft-close-epic Step 9 (sibling finding from same audit)
- [[CORE-173]] — cross-session AI-handoff trigger for /ft-starter-task (sibling finding from same audit)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit 2026-05-24 surfaced a real divergence between ft-release/SKILL.md Step 7.4–7.5 and the SPEC's canonical operator-gate contract. The current skill uses prose ("Surface the commit message and wait for commit-go") instead of the 📦 banner block; lacks the 🟢 prefix and 🏁 post-commit marker; and treats push-go as a separate prose pause rather than a bundled in-📦 prompt. SPEC.md:313 explicitly declares "release push-go bundles into 📦"; this task implements that declaration in the skill.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Drift check (cited locations):** All confirmed at HEAD —
  - `claude/skills/ft-release/SKILL.md` Step 7.4 — present at lines 209-226. Current body uses prose "Surface the commit message and wait for commit-go (e.g. 'yes', 'go', 'commit')" with a fenced commit message block. No 📦 banner, no 🟢 prefix.
  - `claude/skills/ft-release/SKILL.md` Step 7.5 — present at lines 228-237. Current step 3 reads "Surface the tag and ask explicitly before pushing — the tag is harder to revise after push." This is the separate push-go pause that needs to bundle into 📦.
  - `claude/skills/ft-release/SKILL.md` Step 8 — present at lines 239-246. Currently conflates "recap" + "post-closure protocol"; SPEC has them as separate motions (recap bundles into 📦; post-closure protocol is the 🏁 + suggest-next-move + copy-paste tail).
  - `SPEC.md:313` — confirmed: "Skill-level extensions (epic parent-flip, release push-go) **bundle into 📦** rather than adding their own banners."
  - `SPEC.md:474` — confirmed: 🟢 prefix canonical phrasing "🟢 Reply commit / go to land."
  - `SPEC.md:478-483` — confirmed: 🏁 post-commit marker shape `🏁 **<TASK-ID> — committed \`<sha>\`** · archived to \`<archive-path>\`` followed by 1-2 sentence accomplishment summary.
- **Archive skim findings (CORE archive, ft-release-touching tasknotes):**
  - CORE-129 (ft-release Step 7.2 tag-message draft restructure) — established tag-message review as an explicit gate at Step 7.2. **Preserved by this task.**
  - CORE-106 (ft-release initial skill filing) — CORE-048 / CORE-046 / CORE-043 recipe codified. **Preserved.**
  - CORE-141 / CORE-144 (ft-release subsequent edits) — small tweaks to staging + commit message shape. **Preserved.**
  - CORE-154.5 (audit-docs subroutine wiring into ft-release Step 7.1) — established the ft-audit-docs subroutine call. **Preserved.**
  - No prior tasknote has touched ft-release's commit-go / push-go surface. This is new alignment work.
- **Pattern survey — canonical 📦 surface across skills:**
  - SPEC §"Operator-gate cues" defines the banner block: `---` + `<emoji>  **AWAITING APPROVAL — <label>**` + preview line in italics + `---`.
  - SPEC §"Post-closure protocol" step 1 defines the 📦 bundle: closure review + recap + proposed commit message, with 🟢 prefix on the commit-go cue. Bundled-prompt override (line 452): skill-level prompts queued inside 📦 force fire regardless of signals (ft-close-epic's parent-flip Yes/No is the canonical example).
  - ft-close-epic Step 9 (lines 174-188) is the canonical implementation of a bundled in-📦 prompt — parent-flip Yes/No with default Yes, presented alongside the commit message inside the same 📦 bundle, single 🟢 commit-go authorizes everything.
- **Design decision (from AskUserQuestion):** Push-go is a discrete Yes/No prompt inside the 📦 bundle (default Yes), parallel to ft-close-epic's parent-flip. Yes → atomic commit + tag + push branch + push tag; No → commit + tag only, with a manual-push note in the 🏁 marker.
- **Out-of-scope (noted, not addressed):** ft-release Step 4 (Drive Phase 1: Discovery) lacks an explicit Phase 1→2 transition cue (per SPEC §"📝 Phase 1: Discovery" exit gate, the inline `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` marker should fire). The audit's Finding #1 scoped to commit-go / push-go alignment only; this Phase 1→2 alignment is a separate (smaller) drift worth filing as a follow-up after closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — re-read SPEC §"Operator-gate cues" banner format (lines 288-313) + SPEC §"Post-closure protocol" step 1 bundle (lines 468-476) + ft-close-epic Step 9 (lines 174-188) as the canonical parallel for bundled in-📦 prompts. Extended the same shape rather than inventing a new one.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Four surgical edits to `claude/skills/ft-release/SKILL.md`:

1. **Step 7 intro (line 155)** — clarified the two gates: tag-message review (§7.2) and the bundled 📦 commit-go (§7.4).
2. **Step 7.4 (rewritten)** — replaced the prose "Surface the commit message and wait for commit-go" + fenced `feat:` block with a description of the canonical 📦 banner block (referencing SPEC §"Operator-gate cues"), the mandatory preview-line example, and the bundle contents: closure review · recap · proposed commit message · push-go Yes/No bundled prompt (parallel to ft-close-epic's parent-flip, with the default-Yes / No-leaves-local semantics) · locked tag message (from §7.2) as reference. Added 🟢 prefix on the commit-go cue.
3. **Step 7.5 (renamed + reframed)** — heading now reads "Commit, tag, push (atomic on 🟢 commit-go)". The numbered list collapses from 4 steps (with a separate push-go pause) to 3 steps (commit → tag → push-or-stop on push-go answer). Removed step 3's "Surface the tag and ask explicitly before pushing — the tag is harder to revise after push." Added explicit cite to SPEC.md:313.
4. **Step 8 (reframed)** — heading now reads "Post-closure protocol (🏁 marker + suggest-next-move + copy-paste)". Body restructured to: recap bundles into §7.4 📦 (not re-surfaced here); 🏁 post-commit state-marker shape (with both Yes-and-No branches for push-go) per SPEC §"Post-closure protocol" step 2; suggest-next-move + copy-paste line follow in the same response as 🏁.

No new test surface (markdown-prose edits to a single SKILL.md file). Cite-don't-restate preserved: ft-release/SKILL.md cites the SPEC banner format rather than restating it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only edits to one SKILL.md file. No test suite, no lint surface, no frontend changes. Markdown mental-pass confirmed:

- Heading structure intact: §7 with 5 subsections (7.1–7.5), then §8, then `## Notes`. Verified via `awk` line-extraction.
- Fenced blocks intact (no broken ``` markers); inline code spans paired correctly.
- Banner shape cited (not embedded literally) — matches ft-close-epic Step 9 style.
- Bullet structure consistent with surrounding SKILL.md sections (bold-prefix bullets with em-dash separators).
- Backtick escapes inside the 🏁 marker example use `\`...\`` form to render `git push origin ...` inside a markdown code-block (legitimate escape).

No regressions: Step 7 intro still flags two explicit gates; CORE-048/046/043 precedent references (lines 1, 8, 93) intact; explicit `git add` defensive staging (line 211-216) intact.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/CORE-174.md`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Aligned `claude/skills/ft-release/SKILL.md` Step 7.4–7.5 + Step 8 with SPEC §"Operator-gate cues" + §"Post-closure protocol". Replaced the prose commit-go ("Surface the commit message and wait for commit-go") with a description of the canonical 📦 banner block (referencing SPEC banner format with a mandatory preview line). Bundled push-go as a discrete Yes/No prompt inside the 📦, parallel to /ft-close-epic's parent-flip — default Yes pushes branch + tag, No leaves the commit + tag local with a manual-push reminder in the 🏁 marker. Added 🟢 prefix on commit-go and 🏁 post-commit state-marker (with adopter-impact summary). Step 8 reframed: recap bundles into §7.4 not re-surfaced; 🏁 fires after §7.5 operations land; suggest-next-move + copy-paste line follow in the same response. Four surgical edits, ~30 lines net change. SPEC.md:313 ("release push-go bundles into 📦") now implemented in the skill.

**Archived:** 2026-05-24
