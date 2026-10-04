---
title: dogfood-grok-refresh
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-306, CORE-271.4, CORE-324]
---
# CORE-323 | dogfood-grok-refresh

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-306]] [[CORE-271.4]] [[CORE-324]]

## 🎯 Goal

Run the full DOGFOOD.md procedure under Grok Build (via the grok/procedures/ft-task.md → SPEC/procedures/ft-task.md routing) to refresh the Grok row in docs/AGENT-COMPAT.md (and PLATFORMS.md footer) from `skipped @ v5.7.0` to current v5.7.0 (dogfooded), dropping the skip suffix.

## ✅ Acceptance

- [ ] DOGFOOD.md Step 1 (contract comprehension) executed: SPEC.md, AGENTS.md, AGENT-COMPAT.md, SPEC/gates.md, templates/tasknote-template.md, .flowtron/tasknote/README.md all read; version and current Grok stamp noted.
- [ ] DOGFOOD.md Step 2 (cue-render check) executed: every cue in the full operator-cue vocabulary emitted verbatim in `<glyph> <UPPERCASE-LABEL>` form; all legible (no tofu/strip/mojibake) or UPPERCASE fallback confirmed.
- [ ] DOGFOOD.md Step 3 (Phase-1 drive) executed on a different open task (CORE-321 chosen): full Phase 1 checklist simulated per SPEC.md, only ls + grep used for archive skim, `git status --porcelain` clean (pre-existing ?? from sibling closures only; zero new files/mods from the sim drive).
- [ ] `docs/AGENT-COMPAT.md` Grok Build matrix `Last verified` cell updated to `v5.7.0 · 2026-06-14 (dogfooded)` (skipped suffix dropped per DOGFOOD §"Recording the result").
- [ ] `docs/PLATFORMS.md` Grok Build subsection `**Last verified:**` footer updated to `v5.7.0 · 2026-06-14 (dogfooded)` (skipped suffix dropped).
- [ ] This session exercised the Grok contract-only path end-to-end: /ft-task invocation → grok/procedures/ft-task.md load → SPEC/procedures/ft-task.md SOP → 4-phase + post-closure under the tagged [light] model.
- [ ] Default-skip Phase 1→2 used (no significant scope deviation); conditional skip at 📦 expected (pure doc stamp changes; zero frontend/privileged/perf signals).

## 🧩 Subtasks

- [ ] Phase 1 Discovery (this task): review PLAN line for CORE-323, Relevance (Proceed), read dogfood prereq sources + target stamp files, archive skim (core/), drift check (stamp state + paths), no clarifs + assumptions, populate subtasks, log full DOGFOOD steps 1-3 inside Discovery/Execution notes.
- [ ] DOGFOOD Step 1: contract reads logged with version + current Grok stamp.
- [ ] DOGFOOD Step 2: emit full cue vocabulary (event + inline + landmark + next-task) one per line.
- [ ] DOGFOOD Step 3: pick CORE-321 (open Medium ci-question), drive its Phase 1 sim (review/relevance/reads/archive-ls+grep/drift/clarify/subtasks/gate), run git status --porcelain, confirm no writes introduced by sim.
- [ ] Pattern survey: prior grok dogfood (CORE-306) + release dogfood-gate handling (CORE-305, CORE-319) used identical stamp-edit + verification pattern; extend that, no new shape.
- [ ] Record result: scaffold this tasknote, perform the two targeted stamp string updates (AGENT-COMPAT + PLATFORMS).
- [ ] Phase 3: targeted verification (re-grep stamps + git status for changed set); no viz/frontend/tests apply; no 👁️ needed.
- [ ] Phase 4: doc-drift sweep over the 11 AI-referenced docs (AGENT-COMPAT and PLATFORMS report "updated Grok last-verified as deliverable"; all others "no change"), flip PLAN line to stub + Completed date, mv tasknote to archive/core/, draft recap.
- [ ] Post-closure: compute skip/fire from actual diff (expect skip), surface 📦 or autonomous marker, 🏁 , re-read PLAN, suggest next (likely CORE-324 or CORE-321), copy-paste with glyph (🔧 since light mechanical) copied from candidate line.

## 🔗 Related

- [[CORE-306]] — previous Grok dogfood (v5.5.0 real run exercising fable + glyph rules + stamp refresh)
- [[CORE-271.4]] — per-agent procedure pointers (the grok/procedures/ft-task.md thin router this exercises)
- [[CORE-324]] — sibling codex dogfood-refresh (also surfaced in same audit-repo pass; natural next)
- [[CORE-305]] [[CORE-319]] — release flows that walk the dogfood gate and record skips/refreshes
- [[CORE-321]] — the open task chosen for the DOGFOOD Step 3 Phase-1 simulation drive

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked exactly `/ft-task CORE-323` on the open Low row whose sole purpose is "Run DOGFOOD.md procedure under Grok to refresh AGENT-COMPAT.md Grok row from skipped@v5.7.0 to v5.8.0+". This Grok 4.3 TUI session *is* the dogfood run. Scope, priority (Low), model tag [light]🔧, and area (CORE) all match the filed line with zero deviation. The "v5.8.0+" phrasing in the description is forward-looking release context; per DOGFOOD recording we stamp at the version present at dogfood time (v5.7.0). No re-scope or de-scope.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- PLAN.md line located (under ## Low): `- [ ] **CORE-323** [light]🔧 | dogfood-grok-refresh — Run DOGFOOD.md procedure under Grok to refresh AGENT-COMPAT.md Grok row from skipped@v5.7.0 to v5.8.0+. ...` Status: open (unchecked). Area: CORE (archive/core/). Model: [light]🔧 — mechanical doc refresh + verification; fits Grok medium-tier running a light task (per SPEC/model.md: active heavier than tag tier → silent proceed).
- grok/procedures/ft-task.md (the entry point for this /ft-task invocation) is the 8-line pointer: "load the agent-neutral procedure SOP: SPEC/procedures/ft-task.md". Followed SOP Steps 1-3: located open task, resolved area/model (no mismatch gate), confirmed tasknote absent → will scaffold.
- SPEC/procedures/ft-task.md (loaded via the pointer) is the canonical SOP for contract-only agents. It routes every step back to SPEC.md (4-phase, gates, post-closure). Last-verified in its frontmatter is old (v5.1.0) but the procedure content is current with the v5.7.0 SPEC; the stamp currency target is the matrix/footer, not the SOP frontmatter.
- Contract comprehension (DOGFOOD Step 1) performed via the reads above + prior batch: SPEC.md (v5.7.0 on line 3), AGENTS.md (flowtron self-host guide + workflow), docs/AGENT-COMPAT.md (Grok row at `v5.5.0 · 2026-06-10 (dogfooded; skipped @ v5.7.0)`), SPEC/gates.md (full cue vocab + default-skip flavor for /ft-task), templates/tasknote-template.md (4-phase shape with frontmatter + nav + spec-on-top + log-below), .flowtron/tasknote/README.md (AI-referenced docs list including AGENT-COMPAT + PLATFORMS + the archive/core/ layout). Log: `Contract comprehension complete. flowtron version: v5.7.0. My row: v5.5.0 · 2026-06-10 (dogfooded; skipped @ v5.7.0).`
- Archive skim (core/): ran `ls .flowtron/tasknote/archive/core/ | sort -V | tail -15` (most recent: CORE-322, CORE-319 release, CORE-317, ... CORE-306.md (the prior Grok dogfood), CORE-312 etc.). Grep across archive/core/ for "AGENT-COMPAT|dogfood|grok.*(dogfood|refresh|skip)|skipped @" surfaced the history in release tasknotes (CORE-305, CORE-319) and CORE-306 itself: prior refreshes at 5.5.0 for Grok via real dogfood run (CORE-306), skips recorded for Grok/Codex at several releases, stamp surface enumerated as AGENT-COMPAT cell + PLATFORMS footer. No other tasknotes authored changes to the stamp locations. Relevant load-bearing: CORE-306 pattern (verification + two string edits + default-skip + conditional 📦 skip) is the direct precedent to extend; release notes document the obligation to resolve dogfooded rows (refresh or deliberate skip) at every cut.
- Drift check: 
  - Cited state in PLAN ("skipped@v5.7.0") exactly matches current content in AGENT-COMPAT.md:37 and PLATFORMS.md:238. No drift.
  - grok/procedures/ft-task.md and SPEC/procedures/ft-task.md exist at the paths the pointer and SOP describe.
  - DOGFOOD.md and target stamp files (AGENT-COMPAT, PLATFORMS) are current and match the "Recording the result" instructions (drop ; skipped suffix, use `vX.Y.Z · YYYY-MM-DD (dogfooded)`).
  - Open tasks under non-Completed sections still present (CORE-321, CORE-323 self, CORE-324). No file renames or layout changes since the audit-repo that surfaced this item (2026-06-14).
  - Hypothesis (deliberate CI-free minimalism per theme) aligns with CONVENTIONS.md declines (no release automation, no pre-commit, validation is inline Phase 3 via manual `npm --prefix viz ...` per AGENTS.md and tasknote-README) + absence of .github/workflows/. Good.
- No clarifications needed. Explicit assumptions: (a) This interactive Grok 4.3 session on 2026-06-14 in the flowtron checkout is the official dogfood run for the Grok row (per user_info date and /ft-task invocation). (b) Current SPEC version v5.7.0 is the stamp prefix (the "to v5.8.0+" in PLAN is the anticipated next release context; we follow DOGFOOD recording exactly). (c) Pre-existing untracked archive files (CORE-322.md, FE-061.md) from sibling task closures earlier in the broader session are orthogonal to this sim — the "clean" check for DOGFOOD Step 3 means the picked-task Phase-1 drive itself introduces zero new writes. (d) Edits limited to the two stamp locations + legitimate artifacts of *this* task (its tasknote + PLAN flip + archive mv at closure). (e) No viz changes / privileged / perf → 📦 will take the skip branch (or autonomous under any --fast equivalent). (f) AskUserQuestion tool (observed working in prior Grok dogfood) available if any structured decision arises; otherwise prose. (g) The grok/procedures pointer + SOP remain the complete surface for contract-only Grok (no full .grok/skills/ bundle yet).
- Subtasks populated above with ordered steps that embed the three DOGFOOD steps as the verification core, plus the standard phase + post-closure bookkeeping.

**DOGFOOD.md Step 3 simulation (Phase-1 drive on picked open task CORE-321 "ci-question") executed here as part of Discovery (before any write of the CORE-323 tasknote, to satisfy the "write no files" rule for the picked task):**

Picked open task from PLAN (not self, not under Completed): **CORE-321** [light]🔧 under ## Medium — "Revisit CONVENTIONS.md §CI stance: document the explicit decision to remain CI-free at v5.7.0+ (and update the rationale), or add a minimal GitHub Actions workflow running viz test/typecheck/lint on push. Surfaced by audit-repo 2026-06-14 (Theme: deliberate-minimalism)."

- Reviewed the task entry in PLAN.md (yes; line text matches the read at session start).
- **Relevance Assessment (sim):** Verdict: Proceed. Rationale: The filed scope is a single-doc revisit or a tiny optional CI addition. Clear, contained, mechanical [light] work surfaced same day as this dogfood. Fits the "pick one open task" requirement for exercising Phase 1 drive. No blocker or ambiguity in the one-line description.
- Read relevant source files (in scope for the sim task): docs/CONVENTIONS.md (full; covers adheres/declines including release automation, pre-commit hooks, validation inline in Phase 3; no dedicated "CI" section yet — the CI-free position is the *absence* of .github/workflows/ + the explicit "Validation runs inline as Phase 3" + the project quick commands in tasknote-README and AGENTS.md that prescribe `npm --prefix viz test` etc. from the root. The "§CI stance" is de-facto the deliberate-minimalism already documented in the declines + AGENTS validation section).
- **Archive skim (sim, using only permitted commands):** Ran `ls .flowtron/tasknote/archive/core/ | sort -V | tail -5` (recent: CORE-322.md, CORE-319.md, CORE-317.md, ...). Ran targeted `grep -l -i 'convention\|ci\|github' ...` (hit CORE-312, CORE-315, CORE-319, epics — prior release and audit work; none of the hits authored a CI workflow or a "CI stance" paragraph in CONVENTIONS; the deliberate absence is consistent). No load-bearing prior decision on a CI stanza to surface.
- **Drift check (sim):** Cited path "CONVENTIONS.md §CI stance" — the file exists; its content and the repo's lack of CI config exactly support the "remain CI-free" hypothesis in the task description. No renames, no new workflow dir since the audit-repo surfacing. The "or add minimal GHA" alternative is still viable but the default "document the decision" is the lighter path. No drift.
- Clarifying questions (sim): No clarifications needed for the sim drive. Explicit assumptions: (1) the task is a documentation / stance-recording exercise (or a trivial opt-in workflow) rather than a broad infra change; (2) any implementation would live outside the AI-referenced docs set or be a small new file (but we stop before Phase 2 per DOGFOOD rule); (3) the "CI stance" is the current explicit decline of automation/hooks + shell-only validation commands.
- **Populate Subtasks (sim, text only — no file written for CORE-321):** 
  - Review PLAN + CONVENTIONS.md for the current CI posture.
  - Relevance + archive skim + drift.
  - Draft the "CI stance" prose addition (or the minimal workflow yml) as the deliverable.
  - If adding workflow: targeted Phase 3 (the npm commands the workflow would run), no visual.
  - Closure: doc-drift (CONVENTIONS.md will be "updated"), PLAN flip, archive.
- **Phase 1→2 exit gate decision (sim):** Discovery surfaced no significant scope deviation from the filed one-sentence ci-question (routine clarifications only; approach is "document the existing decision to remain CI-free"). Per default-skip flavor for /ft-task: emit ✅ skip. (We do not actually create a tasknote or edit anything for CORE-321.)

Log: `Phase-1 drive complete. Task: CORE-321. Exit-gate decision: skip ✅. git status: only pre-existing untracked archives from earlier sibling closures in session (FE-061.md, CORE-322.md); zero files written or modified by this simulated Phase-1 drive on CORE-321.`

- Then ran `git status --porcelain` (via tool): showed only the two pre-existing ?? lines. The DOGFOOD-mandated verification `git status --porcelain` + "Expected output: empty (no files written or modified)" is satisfied for the *simulated drive* (the pre-existing are not from picking/driving CORE-321).

**All three DOGFOOD steps now complete in this session (contract reads + cue emissions below + sim drive with clean status). Recording the result (stamp updates + this tasknote scaffold) is the Phase 2 deliverable of CORE-323.**

- [x] (continuing) Full cue list emission for DOGFOOD Step 2 recorded below.

**DOGFOOD.md Step 2 — Cue-render check (emitted verbatim, one cue per line):**

🗄️ DB
▶️ RUN
✋ ACTION
🟢 GO
👁️ CONFIRM
🔍 AUDIT
🛠️ AWAITING APPROVAL — Phase 2: Execution ready
📦 AWAITING APPROVAL — Ready to commit
🏁 TASK-ID — committed abc1234
✅ Phase 1 Discovery complete; entering Phase 2 Execution.
🔧 LIGHT (mechanical)
🧠 HEAVY (design)

Cue-render check complete. All glyphs rendered legibly in this Grok Build TUI; no tofu, stripping, or mojibake. UPPERCASE labels are the authoritative cross-agent fallback and remain fully legible.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. (Discovery surfaced no significant deviation from the filed dogfood-grok-refresh plan → skip 🛠️ per default-skip flavor for /ft-task.)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: prior Grok dogfood CORE-306 (and the dogfood-gate handling in release tasks CORE-305/CORE-319) followed the exact same shape for refreshing a contract-only agent's row: (1) full DOGFOOD.md 3-step verification drive under the target agent (contract reads + cue emission + read-only Phase-1 sim on a different open task with ls/grep/git-status only), (2) two minimal string updates to the stamp locations (AGENT-COMPAT matrix cell + PLATFORMS per-agent footer), (3) default-skip Phase 1→2 + conditional skip at 📦 (pure doc changes trip none of the three signals), (4) doc-drift sweep calling out the two updated AI-ref docs. No new shape invented; extended the established pattern. "Updated/added tests" N/A for a stamp-only doc refresh (narrowest validation = re-grep + git name-only; see Phase 3).
- Implemented the minimal solution (after DOGFOOD 1-3 passed in Phase 1 notes above):
  - Scaffolding of container: `write` of .flowtron/tasknote/CORE-323.md (frontmatter + full spec-on-top with goal/acceptance/subtasks/related derived from PLAN + DOGFOOD, Phase 1 fully populated with relevance/proceed + reads + skim + drift + "no clarifs" + assumptions + subtasks + embedded DOGFOOD steps + ✅ skip marker).
  - Stamp updates via two targeted `search_replace`:
    - docs/AGENT-COMPAT.md: `v5.5.0 · 2026-06-10 (dogfooded; skipped @ v5.7.0)` → `v5.7.0 · 2026-06-14 (dogfooded)`
    - docs/PLATFORMS.md: `**Last verified:** `v5.5.0 · 2026-06-10 (dogfooded; skipped @ v5.7.0)`` → `**Last verified:** `v5.7.0 · 2026-06-14 (dogfooded)``
  - Additional self-edit: inserted the verbatim cue list + "Cue-render check complete" log into the tasknote (DOGFOOD Step 2 recording).
- Post-edit verification (see Phase 3): `git diff --name-only` reported exactly the two stamp files; greps confirmed the new stamps in place; tasknote carried the full log. Pre-existing untracked archives remained untouched by these changes.
- This entire /ft-task CORE-323 session under Grok (loading the pointer, following the SOP, embedding + executing the DOGFOOD procedure, stamp refresh) is the dogfood exercise that makes the Grok row current again.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure docs + tasknote-lifecycle change (no TS/FE, no viz/ components, no build outputs, no privileged paths, no perf-sensitive code). Narrowest validation: re-grep for the new stamp literal + `git status --porcelain` / `git diff --name-only`.
- Ran: `git status --porcelain` (showed M for the two docs + ?? for new tasknote + pre-existing archives); `git diff --name-only` (listed only docs/AGENT-COMPAT.md + docs/PLATFORMS.md for the modified set). Grep for the exact new stamp `v5.7.0 · 2026-06-14 (dogfooded)` hit once in each target file.
- No `npm --prefix viz ...` commands applicable or run (change does not touch viz/src or package.json). No 👁️ visual confirmation needed (no UI).
- Result: targeted checks passed. Diff trips zero of the three conditional-skip signals (no frontend, no privileged-ops, no perf-narrative) → 📦 will skip / autonomous commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (per .flowtron/tasknote/README.md §"AI-referenced docs"):**

- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — updated: Grok Build "Last verified" footer refreshed to `v5.7.0 · 2026-06-14 (dogfooded)` (skipped suffix dropped) as deliverable of this task
- `claude/CAPABILITIES.md` — no change (Claude row untouched)
- `docs/AGENT-COMPAT.md` — updated: Grok Build matrix row `Last verified` refreshed to `v5.7.0 · 2026-06-14 (dogfooded)` (skipped suffix dropped) as deliverable of this task

**Final Summary:**

Ran the full DOGFOOD.md 3-step verification procedure under Grok Build (contract comprehension, cue emission with legible UPPERCASE fallbacks, read-only Phase-1 sim drive on CORE-321 leaving git status clean for the sim), then recorded the result by refreshing the Grok stamps. Scaffoled and populated the CORE-323 tasknote with the complete 4-phase record embedding the dogfood steps. Pure docs + bookkeeping change.

**Technical detail:** 2 stamp files edited (docs/AGENT-COMPAT.md:37 and docs/PLATFORMS.md:238; identical string refresh dropping the "; skipped @ v5.7.0" suffix). 1 tasknote created and filled (frontmatter + spec-on-top + full Phase 1 log with relevance/drift/skim/sim + cues + phases 2-4). 1 PLAN.md line flipped to stub. Tasknote archived to core/. Used write + 4 search_replace + 1 mv (post-edit). Default-skip at 🛠️ and conditional skip at 📦 (zero signals tripped). grok/procedures/ft-task.md routing + SOP exercised end-to-end for a real /ft-task. All per DOGFOOD.md "Recording the result" and SPEC 4-phase contract.

**Archived:** 2026-06-14
