---
title: release-publish-step
status: completed
tags: []
created: 2026-08-22
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-461 | release-publish-step

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Make `/ft-release` publish a GitHub Release (`gh release create`) after tagging, and repoint README's version badge at the latest *release* instead of the latest tag.

## ✅ Acceptance

- [x] `claude/skills/ft-release/SKILL.md` §7.5 runs `gh release create vA.B.C --latest` (title + body derived from the already-locked §7.2 tag message) as part of the atomic commit→tag→push sequence, gated the same way push is (skipped when push-go is No, since an unpushed tag can't be released)
- [x] `codex/skills/ft-release` thin wrapper (defers to the claude copy by reference — confirmed, not a twin) needs no edit
- [x] README.md's version badge (`README.md:9`) uses the shields.io `github/v/release` endpoint linking to `/releases` instead of `github/v/tag` linking to `/tags`
- [x] Existing unpublished tags are not silently left further behind — noted in the recap: manual backfill left out of scope (low value, no adopter impact); badge will read empty until the next release is cut

## 🧩 Subtasks

- [x] Read `claude/skills/ft-release/SKILL.md` §7.4–7.5 and §7.2 in full to confirm the exact insertion point and what variables (`vA.B.C`, locked tag message) are already in scope
- [x] Confirm `codex/skills/ft-release` is a symlink to the claude copy (vs. an independently-maintained twin) — if a twin, edit both
- [x] Add the `gh release create` step to §7.5, deriving `--title`/`--notes` from the locked §7.2 tag message (title = first line, notes = remainder) and passing `--latest` (per the PLAN.md line), gated on push-go Yes
- [x] Update the §7.5 verification line and the §8 🏁 marker / push-go-No manual-followup note to mention the release publish step
- [x] Update the 📦 ready-to-commit preview line (§7.4) so it names the release-create step in the bundled action summary
- [x] Repoint `README.md:9` badge to `github/v/release` + `/releases`
- [x] Doc-drift sweep: check `.flowtron/tasknote/README.md` §"AI-referenced docs" for any other doc describing the release recipe (e.g. docs referencing "tags and pushes")

## 🔗 Related

(none — first-time gap, no prior tasknote touched `gh release create`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed against current code — SKILL.md §7.5 really does stop at `git tag` + `git push`, never `gh release create`, and README.md:9's badge really does use the `github/v/tag` shields.io endpoint. Both match the task description exactly; small, well-scoped, no re-scope needed.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` (§7.2 tag-message draft, §7.4 stage/gate, §7.5 commit/tag/push, §8 post-closure marker), `codex/skills/ft-release/SKILL.md`, `README.md` (badge line 9), `.github/workflows/ci.yml` (confirmed no existing release-publish automation)

- [x] **Best Practices Review** — this is a skill-procedure edit (markdown instructions), not application code; the new step slots into the existing atomic commit→tag→push sequence at §7.5 rather than introducing a new phase or gate. `gh` CLI is present on the machine (`/opt/homebrew/bin/gh`). No refactor needed beyond the insertion.

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/core/` + grepped for `gh release`, `ft-release`, and the cloutomaton CORE-035.3 backfill mention across the archive. No prior tasknote ever touched `gh release create` — this is a genuine first-time gap, not a regression of earlier work. CORE-043/046/048 (the release-recipe precedents cited in SKILL.md) predate the gap and don't mention publishing.

- [x] **Drift check** — no drift: task description's claims (`/ft-release` never runs `gh release create`; README badge is tag-based) both verified live against current SKILL.md and README.md. Plan is additive to the existing §7.5 sequence and doesn't contradict SPEC.md or SPEC/gates.md's push-go bundling contract.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions: (1) release publish should be gated the same as push (skip on push-go No, since you can't publish a release for an unpushed tag); (2) title/notes derive from the already-locked §7.2 tag message (first line = title, rest = notes) rather than inventing a second draft-and-approve step; (3) the existing 45 unpublished tags are out of scope for automated backfill — SKILL.md doesn't own historical repair, just note it in the recap per Acceptance.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `README.md:9` — `<img src="https://img.shields.io/github/v/tag/fakeneuron/flowtron?...">` wrapped in `<a href="https://github.com/fakeneuron/flowtron/tags">`. Target: `github/v/release/fakeneuron/flowtron` + `/releases`.
- `claude/skills/ft-release/SKILL.md:660-669` (§7.5) — the atomic sequence is: 1) `git commit`, 2) `git tag -a vA.B.C -F -`, 3) if push-go Yes: `git push origin <branch>` then `git push origin vA.B.C`. The `gh release create` call belongs as step 4, only on push-go Yes (a release needs the tag on origin first).
- `claude/skills/ft-release/SKILL.md:552-577` (§7.2) — tag message is already drafted and user-approved before §7.5 runs; first line is `flowtron vA.B.C — <headline>` (title), everything after is body (Changes/Migration blocks) — reusable directly as `--title`/`--notes`.
- `claude/skills/ft-release/SKILL.md:676-683` (§8 🏁 marker) — needs a mention of the published release URL/tag alongside the existing commit-sha/tag/archive marker; the push-go-No manual-followup note needs a parallel manual `gh release create` reminder.
- `codex/skills/ft-release/SKILL.md` is a thin wrapper that reads "Read and follow `../../../claude/skills/ft-release/SKILL.md`" — no independent edit needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing §7.5 atomic commit→tag→push sequence with a 4th step (`gh release create`) gated the same way as push, rather than inventing a new gate or phase; extended §7.4's preview line and §8's 🏁 marker in place to match the existing prose shape

- [x] **Minimal refactor gate** — no refactor; pure additive insertion at the three touch points (§7.4 preview, §7.5 sequence + verify line, §8 marker/manual-followup) plus the one-line README badge swap

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, this is a markdown skill-procedure edit + a README badge URL swap; no executable code, nothing to unit test

**Implementation Notes:**

- `claude/skills/ft-release/SKILL.md` §7.4 preview line: now names the release-publish step in the bundled commit-go summary.
- `claude/skills/ft-release/SKILL.md` §7.5: added step 3's second half — `gh release create vA.B.C --latest --title ... --notes ...` (title = §7.2 message's first line, notes = the rest, `--latest` per the PLAN.md line since flowtron cuts releases linearly), running only after the tag push on push-go Yes; push-go No path now names the manual `gh release create --latest` follow-up too. Verify line now also checks `gh release view vA.B.C`.
- `claude/skills/ft-release/SKILL.md` §8: 🏁 marker now says "published release"; push-go-No manual-followup reminder now includes the `gh release create` command.
- `README.md:9`: badge + link swapped from `github/v/tag` + `/tags` to `github/v/release` + `/releases`.
- `codex/skills/ft-release/SKILL.md` — no edit; it's a thin wrapper that defers to the claude copy by reference.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no executable code touched (`.github/workflows/ci.yml` confirmed: viz tests/typecheck/lint + update-adopters tests don't cover skill-procedure markdown or the README badge)

- [x] Ran lint/type-check on changed code — N/A, same reason; grepped README.md + docs/*.md for other `github/v/tag` / stale badge references — none found, so no drift left behind

- [x] **Quality assertions** — no duplication, dead code, or unexplained complexity introduced; the new step reuses the already-locked §7.2 message rather than adding a second draft/approve round; no public-surface growth beyond the one new CLI call the skill now issues

- [x] (frontend) Asked the user for visual confirmation — N/A, no UI surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

No automated suite exercises `/ft-release`'s prose recipe or the README badge markup — this is a doc/procedure change, verified by re-reading the edited sections for internal consistency rather than by running code. Confirmed CI (`.github/workflows/ci.yml`) has no job that would catch or need updating for this change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — updated (this task's target — badge repointed to releases; no other content drift)
  - All other 17 listed docs (`AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, both `AGENTS-snippet.md` variants ×4, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`) — no change; grepped for "tag and push" / "release recipe" / "annotated tag" phrasing that could now be stale, found only unrelated mentions (`docs/CONVENTIONS.md:25`, `docs/MIGRATION.md:465` — both describe reading the tag message for migration steps, still accurate). `claude/skills/ft-release/SKILL.md` itself is the edited target and is a lazily-loaded skill file, not part of the default cold-start sweep.

- [x] Closed — every Acceptance criterion ticked below; `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and moved to top of `## Completed`; tasknote to be moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted (below)

**Final Summary:**

Added a `gh release create` step to `/ft-release`'s §7.5 atomic commit→tag→push sequence (gated on push-go Yes, running immediately after the tag push, reusing the already-locked §7.2 tag message as `--title`/`--notes`) so every future release cut publishes a GitHub Release instead of leaving a bare tag — closing the gap that let all 45 prior tags since v0.1.0 go unpublished (cloutomaton CORE-035.3 backfilled those by hand). Also updated §7.4's commit-go preview line, §7.5's verify line (`gh release view`), and §8's 🏁 marker + push-go-No manual-followup reminder to match. Repointed `README.md`'s version badge from the `github/v/tag`/`/tags` shields.io endpoint to `github/v/release`/`/releases`. `codex/skills/ft-release/SKILL.md` needed no edit (thin wrapper deferring to the claude copy). Pure documentation/procedure change — no executable code, no tests to run; verified by re-reading the edited sections and confirming CI has no job covering this surface. The 45 existing unpublished tags are left as-is; a manual `gh release create` backfill for them is a separate, optional follow-up (not filed — low value, cosmetic, no adopter impact) and the badge will simply show no version until the next release is cut and published.

**Archived:** 2026-08-22
