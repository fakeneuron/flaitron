---
title: lifecycle-value
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-565, CORE-565.1, CORE-EPIC-558, CORE-558.5, CORE-558.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-3c-resume-blocked.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - .flowtron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-565.2 | lifecycle-value

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-565]] [[CORE-565.1]]

## 🎯 Goal

Review one attended `/ft-task` run (cold start → 🏁) for value to a solo vibe coder: measure cold-start cost per runner, name the mistake each gate and cue catches, record a keep / trim / fix verdict per surface (fast paths included), land prose trims in-window, file larger cuts, and decide raise-or-trim on SPEC.md's 1,105-char headroom.

## ✅ Acceptance

- [x] Cold-start cost measured per runner (all seven lifecycle runners), in bytes, with the load set named — `judgment` (Discovery Notes §A; numbers from `wc -c`, reproducible)
- [x] Every gate and cue on the attended `/ft-task` path named with the mistake it catches and a keep / trim / fix / file verdict, fast paths included — `judgment` (Discovery Notes §B, 35 rows)
- [x] `SPEC.md` headroom recorded and resolved: trimmed ≥2,000 chars, cap held at 57,000 — `wc -c SPEC.md` ≤ 53,900; `docs/CONTEXT-BUDGET.md` unchanged in `git diff --name-only`
- [x] `claude/skills/ft-task/SKILL.md` trimmed of flag-contract restatements — `wc -c` < 30,000; both `Read <SKILL_DIR>/…now` imperatives still present: `grep -c 'Read \`<SKILL_DIR>/' claude/skills/ft-task/SKILL.md` ≥ 2
- [x] No rule lost by a trim — every decision-point phrase in the Phase 3 grep list still resolves: `grep -q` per phrase → 0 on all
- [x] `step-3c-resume-blocked.md` clears `park-reason:` on resume — `grep -q 'park-reason' claude/skills/ft-task/step-3c-resume-blocked.md`
- [x] `step-1.5-model-edge.md` no longer carries its own roster copy — `grep -c 'gemini-flash' claude/skills/ft-task/step-1.5-model-edge.md` → 0
- [x] Larger cuts filed as PLAN rows, not executed: `model.md` trim, template blockquote, `park-reason:` relocation (flagged `.3`), `ft-goal-task` Phase 4/5 restatement — `grep -c 'CORE-56[6-9]' .flowtron/PLAN.md` ≥ 4
- [x] All budgeted surfaces under cap after edits — `wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md`

## 🧩 Subtasks

- [ ] Measure: sizes per surface, per-skill lazy-load sets, section sizes (done in Discovery)
- [ ] Probe the four fast-path runners + three `ft-task` fragments + `gate-discipline.md` (done)
- [ ] `SPEC.md` trims T1–T6: nav-chip narrative (§Tasknote body shape), probe-clause rationale ×2 and drift-check narrative (§Phase 1), Subtasks-exempt tail and "five seconds" tail (§Phase 4)
- [ ] `ft-task/SKILL.md` trims S1–S3: Step 0 flag paragraphs, Step 4 `--fast interaction`, Step 5 downstream-impact run
- [ ] Fix `step-3c-resume-blocked.md` (clear `park-reason:`, cite `blocked.md`) and `step-1.5-model-edge.md` (roster copy → cite)
- [ ] File four follow-up PLAN rows under `## Medium` / `## Low`
- [ ] Phase 3: `wc -c` receipts, phrase-preservation grep list, markdown pass, `npm --prefix viz test` not needed (no code)
- [ ] Phase 4: doc-drift sweep (17 entries), Acceptance tick-through, stub flip nested under the epic, archive

## 🔗 Related

- [[CORE-EPIC-565]] — parent epic (harness-value-review)
- [[CORE-565.1]] — Discovery: Constitution / Specification / Q0–Q7 bind this child; surface inventory table A is the measured baseline
- [[CORE-EPIC-558]] — predecessor completeness pass after the v5.25 shrink
- [[CORE-558.5]] — raised the SPEC.md ceiling to 57,000
- [[CORE-558.N]] — measured SPEC.md at 51,566 on 2026-09-09

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line's premise is exact at HEAD (1,105 headroom) and the question it asks — does each surface earn its bytes for a solo reviewer — has not been asked since the shrink; [[CORE-EPIC-558]] checked completeness only. The measurement is decisive: `SPEC.md` is half of every cold start, and the always-loaded surfaces carry ~6k of narrative that no run-time decision needs. Scope matches the line as filed, fast paths included.

- [x] Read relevant source files — `SPEC.md`, `SPEC/gates.md`, `SPEC/cue-vocabulary.md`, `SPEC/epic.md`, `claude/skills/ft-task/SKILL.md`, `claude/AGENTS-snippet.md`, `.flowtron/tasknote/README.md`, `templates/tasknote-template.md`, `docs/CONTEXT-BUDGET.md`, `docs/VISION.md` §"Who it's for" directly; the four fast-path runners, three `ft-task` fragments, `gate-discipline.md`, `purpose-blurb.md`, `model.md` via one read-only **probe** (distilled return in §A/§B rows 26-35)

- [x] **Best Practices Review** — `N/A` with reason in Discovery Notes (markdown contract; the one structural rule is cite-don't-restate with the 558 qualifier)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions — one (SPEC.md cap), answered; assumptions logged in §E

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Bar (from `.1` Constitution #1 + `docs/VISION.md` §"Who it's for"):** the reader is a solo developer who is the agent's *only* reviewer. A surface earns its bytes when it catches a mistake that reviewer would otherwise ship, preserves a decision they would otherwise re-litigate, or makes a run resumable. Rationale and history in an always-loaded surface earn nothing at run time — they belong in the archive, which already holds them.

**Best Practices Review:** `N/A` — markdown contract + one Claude skill body; no code boundary. The one structural rule in play is cite-don't-restate (`docs/CONVENTIONS.md`), with [[CORE-558.N]]'s qualifier: a trim may drop *narrative*, never the *bound or disambiguator at the decision point*.

### A. Cold-start cost per runner (HEAD 2026-09-10, `wc -c`)

Method: bytes read before the task's own source files, on the plain attended path. "Unconditional" = the skill instructs a Read on every run; "typical" adds the module a run reaches in practice.

| Runner | Skill body | Always-read contract | Unconditional total | Typical adds | Typical total (≈ tokens) |
|---|---|---|---|---|---|
| `/ft-task` (this run) | 30,861 | `SPEC.md` 55,895 · tasknote README 8,623 · template 5,592 | **100,971** | `AGENTS.md` 6,816 · `PLAN.md` 8,931 · `SPEC/gates.md` 35,936 (Step 4 flavor + Step 6 skip rule) · `SPEC/epic.md` 6,080 (epic IDs) | **≈158,700 (≈40k tok)**; standalone non-epic ≈152,600 |
| `/ft-micro-task` | 20,689 | `SPEC.md` · micro template 2,241 · README (area lookup) | ≈87,400 | `AGENTS.md` · `PLAN.md` · `gates.md` | ≈139,000 (≈35k tok) |
| `/ft-goal-task` | 27,960 | `SPEC.md` · `SPEC/loop.md` 7,971 · template | ≈97,400 | `AGENTS.md` · `PLAN.md` · `gates.md` | ≈149,000 |
| `/ft-epic-discovery` | 26,986 | `SPEC.md` · `SPEC/epic.md` · template | ≈94,600 | `AGENTS.md` · `PLAN.md` · `gates.md` · `tasknote-selection.md` 27,549 (filing thresholds + downstream scan) | ≈174,000 |
| `/ft-close-epic` | 27,050 | `SPEC.md` · `SPEC/epic.md` · template | ≈94,600 | `AGENTS.md` · `PLAN.md` · `gates.md` | ≈146,000 |
| `/ft-file-followup` (`--park`) | 24,917 (+8,689 `park-mode.md`) | README §Archive layout · PLAN + tasknote/archive scans — **no SPEC module is ever Read** | ≈42,500 (+8.7k park) | `PLAN.md` | ≈51,000 (≈13k tok) |
| `/ft-starter-task` | 14,330 | `starter.md` 2,408 · starter template 1,459 · README — no `SPEC.md` | ≈26,800 | `PLAN.md` | ≈35,700 (≈9k tok) |

Corrections from the probe (verified against the skill bodies): `/ft-micro-task` and `/ft-goal-task` **cite** `gates.md` / `tasknote-selection.md` but never instruct a Read, so their typical ≈ unconditional (≈103k and ≈113k with `AGENTS.md` + `PLAN.md`). The two filing skills load no `SPEC.md` at all — restated prose is *what makes them cheap*, so their skill↔SPEC restatements are the price of not loading a 27.5k module, not waste. Their skill↔skill duplication (area-resolution paragraph ×3, reconciliation paragraph ×2, git-status/post-stage paragraphs ×2, ID-suggestion algorithm ×2) is a `.4` roster question (merge/fragment), not a `.2` trim.

Three facts the table makes visible:

1. **`SPEC.md` is ~50% of every cold start** (55,895 of ~101k unconditional). Nothing else comes close; a byte cut there pays on every run of every runner. The `.1` inventory's 1,105-char headroom (57,000 cap) confirms: [[CORE-558.5]] raised the cap one day ago with 5,434 of room, and four completeness tasks (557/559/562/564) spent 4,329 of it in a day. Every task since the shrink has *added*; a cap raised twice in two days is the ratchet not biting.
2. **`SPEC/gates.md` is de-facto always-loaded** (35,936): Step 4 cites its judgment rule as authoritative and Step 6 needs its privileged-ops glob list to compute the skip signal. `docs/CONTEXT-BUDGET.md` already says "lazy in principle, per-task in practice"; the measurement agrees.
3. **Skill bodies are the second lever, and they restate the first.** `ft-task/SKILL.md` carries ~3,900 chars of `--fast` / `--debug` / `--unattended` prose whose contract is `gates.md`'s flag matrix — loaded anyway. `/ft-file-followup` (24,917 + 8,689 park fragment) is the largest body among the *fast paths*, for a one-row filing.

### B. What each gate and cue catches (attended `/ft-task`, in run order)

| # | Surface | Cost | Mistake it catches | Verdict |
|---|---|---|---|---|
| 1 | Flag parse + ⚡/🔬 markers (Step 0) | 5,173 chars of skill | A typo'd flag silently ignored; operator unaware which posture is active | **trim** — the three flag *description* paragraphs restate `gates.md`; keep the markers + the `Read … now` imperatives |
| 2 | Status gate (`[x]` / `## Completed`) | ~400 | Re-running a closed task from stale context — a known confabulation mode | keep |
| 3 | 🎯 purpose blurb | 2 lines out; `purpose-blurb.md` 4,049 not required | Operator can't tell what the run is about until Phase 2 | keep |
| 4 | >70w filing warning · >150 Completed rows warning | ~900 | PLAN lines growing into tasknotes; PLAN.md bloating the cold start | keep (advisory, cheap) |
| 5 | Step 1.5 model gate | 1,651 + `model.md` 18,699 on any non-Satisfied branch | Design work running on a light model because the operator forgot `/model` | keep the gate; **file** a `model.md` trim (18.7k for a three-way branch) |
| 6 | Area lookup via README table | README 8,623 (also needed at Phase 4 sweep) | `NAT-*` → `archive/nat/` derived-and-wrong folder, which voids the archive skim silently | keep |
| 7 | Foreign-dirt gate | ~500 | Foreign changes swept into the closure commit; paper-complete (InvisiPaw FE-64) | keep |
| 8 | Archive-collision / in-flight check | ~700 | Duplicate scaffold of a closed or open task | keep |
| 9 | Relevance Assessment | 1 box | Executing zombie work — plan staler than the code | keep (identity) |
| 10 | Archive skim | 1 box (~700 chars ×3 copies) | Re-litigating a settled decision (CORE-393 undid CORE-042.4 from the chip list alone) | keep; **trim** the rationale paragraphs in `SPEC.md` (the rule is the box) |
| 11 | Drift check (code + cross-artifact halves) | 1 box + ~830 chars rationale | Plan contradicts a settled contract or its own PLAN line; Phase 4 collapses the line so this is the last cheap place | keep rule; **trim** narrative |
| 12 | Best Practices Review | 1 box | Parallel-shape invention / boundary violation on code tasks | keep — `N/A` costs one line on prose tasks |
| 13 | Clarifying questions / `touches:` + Subtasks | 2 boxes | Silent guessing; undeclared scope (reconciled at Phase 4) | keep |
| 14 | 🛠️ Phase 1→2 (`default-skip`) | 0 when skipped (one marker) | Executing a Re-scoped/De-scoped plan nobody re-read | keep |
| 15 | Pattern survey · Minimal refactor gate | 2 boxes | Parallel solutions; refactor creep | keep |
| 16 | Downstream-impact scan | ~900 chars in Step 5 + `tasknote-selection.md` 27,549 on trigger | A mid-task decision that silently invalidates another PLAN row | keep; **trim** the Step 5 restatement |
| 17 | Park on dependency (`blocked.md` 8,034) | on trigger only | Lost Phase 1/2 work when blocked | keep |
| 18 | Verification receipt · 👁️ CONFIRM | 2 boxes | A ticked box nobody ran; unverified UI | keep |
| 19 | Doc-drift sweep (17 entries here; adopters ~3-5) | per closure | Stale docs — fired for real at CORE-489.N and [[CORE-558.N]] | keep |
| 20 | Acceptance tick-through · scope reconciliation · `status:` flip → PLAN stub → archive | ~3,900 chars Phase 4 prose | "Feels done" vs. stated criteria; undeclared scope growth; stale YAML | keep rules; **trim** the two explanatory tails (§Subtasks-exempt, §five-seconds) |
| 21 | Paper-complete guard (3 parts) | 3,000 | PLAN says done, git says nothing landed | keep (identity-adjacent; no unattended variant) |
| 22 | 📦 conditional skip rule | `gates.md` per run | Auth / migrations / secrets / integrations diffs auto-committing with no eyes — the areas a vibe coder is likeliest to be burned in | keep |
| 23 | 🏁 + fresh-PLAN re-read + next-move + copy-paste | ~3,500 chars SPEC | Suggesting a task from stale context; the PLAN-exhausted confabulation | keep |
| 24 | Nav-chip not flipped at closure (stated 3× in `SPEC.md`) | ~1,800 total | Re-adding the closure chip flip (CORE-393) | keep the rule once + the Phase 4 callout (decision-point copy); **trim** the body-shape narrative |
| 25 | `--fast` (4 surfaces) | 0 | An operator present-but-busy answering asks they'd rubber-stamp | keep |
| 26 | `/ft-micro-task` (fast path) | ≈103k cold start; one-section ceremony, 🟢 GO instead of 📦 | A ~10-line change paying the full 4-phase ceremony | keep — but 55.9k of its 103k is `SPEC.md`, which is the same lever as #1 |
| 27 | `/ft-file-followup --park` (fast path) | ≈51k; Step 3 review gate doubles as commit-go | A follow-up recorded as prose nobody re-reads; a filing that contradicts an active row (reconcile scan) | keep — cheapest runner by construction (no `SPEC.md`); body size is a `.4` merge question |
| 28 | `/ft-starter-task` (fast path) | ≈36k | An idea lost between sessions; a >70w PLAN line | keep |
| 29 | `/ft-goal-task` | ≈113k | Hand-driving an execute→verify loop; committing an unverified iteration | keep; **file** — Steps 4-5 restate Phase 4 + post-closure in full after saying "identical to `/ft-task`" |
| 30 | `step-3c-resume-blocked.md` | 1,361 | — | **fix** — never clears `park-reason:` on resume; `SPEC/blocked.md` §"Exit (resume)" requires it, and a stale code would misroute the next caller |
| 31 | `step-1.5-model-edge.md` | 4,581 | Wrong-tier routing at the edge | **fix** — line 30 carries an undated second copy of `model.md`'s dated roster; `model.md` is Read in parallel, so the copy only drifts |
| 32 | `SPEC/gate-discipline.md` · `purpose-blurb.md` | 15,386 · 4,049 — loaded by no ordinary run (confirmed: this run needed neither until it made them its subject) | Rationalizing past a gate; a third gate minted from the blurb | keep, no action — restatements inside them cost nothing at task time |
| 33 | `SPEC/model.md` | 18,699 on any non-Satisfied branch; ~2.5k is history/anecdote (L71-75, 185-188, 220-223, 269-272, 294-302) | — | **file** trim |
| 34 | `templates/tasknote-template.md` test-strategy blockquote | ~600 chars × every tasknote ever scaffolded; verbatim copy of `SPEC.md` §Phase 3 | — | **file** — adopter-visible template change, needs a release |
| 35 | `SPEC.md` §Tasknote frontmatter `park-reason:` table | ~2,900 always-loaded; needed only at a park | — | **file**, flagged for `.3` — the codes are caller-facing contract; relocation to `blocked.md` is a where-the-contract-lives change |

### E. Clarifications

One question asked (AskUserQuestion): SPEC.md headroom → **trim in-window, hold the cap at 57,000**. No `docs/CONTEXT-BUDGET.md` edit this task (caps unchanged; ledger is `/ft-release`-owned per [[CORE-558.5]]).

Assumptions carried without asking: (1) "prose trim" per `.1` Q2 covers `SPEC.md`, `ft-task/SKILL.md`, and Claude-only fragments; templates and other skills' bodies are adopter-visible or `.4`-owned and are **filed**; (2) the two fragment fixes are in-window — they are one-line corrections, not skill removals; (3) trims drop narrative/history/restatement only — every rule sentence, bound, and decision-point disambiguator is preserved and verified by grep in Phase 3.

### C. Archive skim

Path greps on `SPEC.md` / `ft-task/SKILL.md` / `gates.md` return hundreds (probe clause applies); the load-bearing subset was read directly:

- [[CORE-558.5]] — the sizing rule this task inherits: a ceiling wants ~two substantial edits of room; substantial `SPEC.md` edits run +1,127…+2,957 (45 commits), `ft-task` edits +1,187…+3,390. Also the standing rule *"edit CONTEXT-BUDGET in-task only for cap changes; leave the ledger to `/ft-release`"* — this task does **not** refresh the ledger. And the glob cell's own words: extraction, not another raise, is the answer when a body is genuinely overgrown.
- [[CORE-558.N]] — audit verdict on the shrink: cite-don't-restate is sound; what it costs is the *disambiguator at the decision point*, and a restore can re-create a mirror the release guards were not re-rostered for. Its Finding 1 (`SPEC.md` 4th VISION mirror) was closed by CORE-562 (`69ec5e8`) — not re-done here.
- [[CORE-555]] / [[CORE-556.2]] — the two prior cap decisions: raise (gates.md, with unit measured) and extract (ft-release, 685-char squeeze → lazy fragment).
- [[CORE-535.5]] — split `cue-vocabulary.md` + `gate-discipline.md` out of `gates.md` so a run loads the skip rule and flag matrix, not the glyph inventory. Neither is consulted by an ordinary run — confirmed by this run (no gate fired; neither was needed until this task made them its subject).
- [[CORE-565.1]] — the inventory table A and `.2`'s hand-off: "SPEC.md headroom 1,105 — below one working unit again; raise or trim is that child's call."

### D. Drift check

- PLAN line's cited figure (1,105) is exact at HEAD: 57,000 − 55,895. `ft-task/SKILL.md` 30,861 / 33,000 → 2,139, also under one unit (its substantial band is +1,187…+3,390).
- `.1`'s cold-start figure (≈107,800 for SPEC + skill + AGENTS + template + README) reproduces: 55,895 + 30,861 + 6,816 + 5,592 + 8,623 = 107,787.
- No SPEC contract is contradicted by a trim: `docs/CONTEXT-BUDGET.md` §"Known over budget" sanctions a budget change "as an explicit decision"; `.1` Constitution #5 permits a raise only with the reason recorded, and prefers preserve-don't-revert — a trim of *narrative* reverts nothing the 558 cohort restored (its three restores were §"Cross-repo edit remit", §"Loop tasks", §"What flowtron does NOT provide"; none is touched here).
- `CORE-558.N`'s "one open filing" (Pair K roster) is closed at HEAD by CORE-562 — the PLAN line's "(1,105 chars)" is the only number this task is asked to act on.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended cite-don't-restate (`docs/CONVENTIONS.md`): `SPEC.md` already carries one-line `Canonical contract: see X` pointers, and the two fragments now point at the module loaded beside them instead of copying it. No new shape.

- [x] **Minimal refactor gate** — every edit is a compression or a one-line fix in the touched path; nothing adjacent was reworded. The 558 bound held by construction: each trim kept the rule sentence and the decision-point disambiguator, and Phase 3 greps 34 of those phrases.

- [x] Implemented the minimal solution — 5 files, +71/−94 lines

- [x] Updated/added tests for non-trivial behavior — N/A (markdown; no code surface)

**Implementation Notes:**

**`SPEC.md` — nine trims, −2,071 chars (55,895 → 53,824), cap held at 57,000.** T1 nav-chip narrative in §Tasknote body shape (the CORE-042.5/CORE-393 story compressed to a clause; the four-transition rule, the render-derived claim, and "not writes closure performs" kept). T2/T3 the two probe-clause paragraphs in §Phase 1 (what a probe is, probe-vs-delegate, the template pointer, "judgment prompt, not a gate", "~3 is a judgment line" all kept). T4 drift-check cross-artifact half (rule + "cross-reference, not a judgment call" + the one-line CORE-393 pointer kept). T5 §Phase 4 closure-ops paragraph (recap description no longer restates the checklist item). T6 scope-reconciliation "five seconds" tail. T7 `## 🧩 Subtasks` exempt (rule kept; the "stated here so silence cannot be re-read" meta-sentence dropped). T8 the `/ft-close-epic` canonization aside in §Post-closure step 2. T9 the `/ft-spec` "Validation Approach" cross-ref tail in §Phase 3 and the `InvisiPaw FE-64` motivation in §Paper-complete guard — the latter an adopter task ID in SPEC prose, which [[CORE-533]] keeps out. The Phase 4 "No nav-header chip flip here" callout is **untouched**: it is the decision-point copy.

**`ft-task/SKILL.md` — three trims, −1,450 chars (30,861 → 29,411).** S1 Step 0's three flag-description paragraphs restated `gates.md`'s flag matrix; compressed to one paragraph each, keeping both `Read … now` imperatives, the `[unattended]`-implies-`--fast` rule, "byte-identical to the pre-flag skill", and explicit-opt-in for `--debug`. S2 Step 4's `--fast interaction` paragraph restated the drift carve-out it had just stated in the bullets above it. S3 Step 5's downstream-impact run kept every rule (fires regardless of `fast-mode`; parks `drift` under `--unattended`) and dropped the two-banner-cap aside `gates.md` already owns.

**Fragment fixes.** `step-3c-resume-blocked.md`: resume now removes `park-reason:` and cites `SPEC/blocked.md` §"Exit (resume)" — the fragment had no cite at all, so a literal reader left a stale code for the next caller. `step-1.5-model-edge.md`: the undated roster copy on the legacy-entry branch is replaced by a pointer to `model.md`'s dated calibration table, which the invoking skill Reads in parallel with this fragment.

**Filed, not executed (4 rows):** [[CORE-566]] `model.md` history trim (Medium); [[CORE-567]] `park-reason:` table home, sequenced after [[CORE-565.3]] (Medium); [[CORE-568]] template test-strategy pointer (Low); [[CORE-569]] `ft-goal-task` closure restatement (Low). Downstream-impact scan on the filings: the only active entries are the 565 cohort — 567 is explicitly ordered after `.3`, 569 is a one-skill prose trim rather than a `.4` roster verdict, 566/568 touch nothing a sibling plans. **No downstream impact; no reconcile edit.**

**Not done, on purpose.** No `docs/CONTEXT-BUDGET.md` edit (caps unchanged; the ledger is `/ft-release` §7.1's). No template edit (adopter-visible → filed). No edit to `gate-discipline.md` / `purpose-blurb.md` (loaded by no ordinary run; restatements there cost nothing at task time). The filing skills' skill↔skill duplication is handed to `.4`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; `viz/` and `tools/` untouched)

- [x] Ran lint/type-check on changed code — N/A; substituted `git diff --check` (whitespace) and the phrase-preservation greps below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
wc -c SPEC.md                                              → 0   53,824 (≤ 53,900; −2,071)
git diff --name-only | grep -c CONTEXT-BUDGET              → 0 hits (unchanged)
wc -c claude/skills/ft-task/SKILL.md                       → 0   29,411 (< 30,000; −1,450)
grep -c 'Read `<SKILL_DIR>/' claude/skills/ft-task/SKILL.md → 2
grep -q <phrase> SPEC.md · ft-task/SKILL.md (34 phrases)   → 0 on all 34 (list in the Phase 3 receipt run; none missing)
grep -q 'park-reason' claude/skills/ft-task/step-3c-resume-blocked.md → 0
grep -c 'gemini-flash' claude/skills/ft-task/step-1.5-model-edge.md   → 0 (was 1)
grep -c 'CORE-56[6-9]' .flowtron/PLAN.md                   → 4
wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md       → 53,824/57,000 · 35,936/40,000 · ft-release 30,619/40,000 · largest glob body now ft-task 29,411/33,000 — 4/4 under cap
PLAN row word counts (after ' — ')                         → 39 · 44 · 34 · 27 (all ≤ 50w target)
git diff --check                                           → 0 (no trailing whitespace)
git diff | grep -E 'API_KEY|SECRET|TOKEN|PASSWORD'         → no hits (keyword clause clear)
```

**Structural assertions (changed prose):** no duplication introduced — every trim *removed* a restatement or a narrative; the two fragments now cite the module loaded beside them instead of copying it. No dead prose: each compressed paragraph still carries its rule and its cross-reference. No public-surface growth: no new heading, key, cue, or flag. No stale code-facing docs: none of the trimmed sentences is quoted by a swept doc (grep for `FE-64`, `InvisiPaw`, `Validation Approach` across the sweep set → none outside `SPEC/tasknote-selection.md`'s unrelated spec-section list).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` no change · `AGENTS.md` no change · `SPEC.md` **deliverable** (nine narrative trims; every rule sentence verified present) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change (its `--debug` / `--unattended` bullets describe semantics the trims did not touch) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (cite-don't-restate applied, not amended) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (all three skill-side edits are Claude-surface, already ledgered) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change (no version bump) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (its `park-reason:` prose describes the parked state; the resume fix in `step-3c` matches `SPEC/blocked.md`, which it already cites) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change — **17 / 17.**

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Reviewed one attended `/ft-task` run end-to-end for what it costs a solo vibe coder against what it catches, and found the ceremony earns its keep — the *bytes* around it do not all. Every gate and cue on the path names a real mistake it stops (35-row ledger in Discovery Notes §B): the status gate and the fresh-PLAN re-read stop stale-context confabulation, the foreign-dirt gate and paper-complete guard stop "done on paper", the archive skim and cross-artifact drift check stop re-litigating settled contracts (CORE-393), 📦's privileged-ops globs are exactly the auth/migration/secrets surfaces a vibe coder is likeliest to be burned in, and `--fast`'s four surfaces remove only asks a present operator would rubber-stamp. Verdict: **keep every gate and cue**; the fast paths are correctly shaped — the two filing skills never load `SPEC.md`, which is what makes them cheap.

The cost finding is singular: **`SPEC.md` is ~50% of every runner's cold start** (55,895 of ~101k unconditional bytes on `/ft-task`; ~103k on `/ft-micro-task`), and the always-loaded set carried ~6k of narrative — anecdotes, "stated here so it cannot be re-read" meta-sentences, restated flag matrices — that no run-time decision needs. The 1,105-char headroom the PLAN line names was the ratchet not biting: [[CORE-558.5]] raised the cap one day earlier and four completeness tasks spent 4.3k of it in a day. Resolved by **trimming, cap held at 57,000** (operator's call): −2,071 chars from `SPEC.md` (headroom → 3,176, ~1.2 units) and −1,450 from `ft-task/SKILL.md` (headroom → 3,589). The 558 bound held: 34 rule / disambiguator phrases grepped present after the edit, and the Phase 4 "No nav-header chip flip" callout — the decision-point copy — was deliberately left alone.

Two fixes the probe surfaced: `step-3c-resume-blocked.md` never cleared `park-reason:` on resume (the fragment carried no cite to `SPEC/blocked.md`, so a literal reader left a stale code for the next caller — a `.3`-relevant contract hole, now closed); and `step-1.5-model-edge.md` carried an undated second copy of `model.md`'s dated roster that could only drift. Four larger cuts filed as [[CORE-566]]–[[CORE-569]]: `model.md`'s ~2.5k of history, the `park-reason:` table's home (after `.3`), the template's test-strategy blockquote (~600 chars in every tasknote ever scaffolded), and `ft-goal-task`'s full Phase 4 restatement.

**Hand-off to `.4`:** the cost table in §A; `/ft-file-followup` (24,917 + 8,689) is the largest fast-path body and its skill↔skill duplication with `/ft-starter-task` (area paragraph, reconciliation paragraph, git-status paragraphs, ID-suggestion algorithm) is a merge/fragment question for the roster verdict.

**Evidence.** 5 deliverable files: `SPEC.md` +59/−84, `ft-task/SKILL.md` +6/−6, two fragments +1/−1 each, `.flowtron/PLAN.md` +4/−2; plus this tasknote. Verification in Testing Notes: 9/9 Acceptance commands green, 4/4 budgeted surfaces under cap, 34/34 preserved phrases, 17/17 doc-drift no change, `git diff --check` clean, keyword clause clear. `touches:` reconciliation: declared 5 paths; `git diff --name-only` shows exactly those 5 (this tasknote excluded by construction) — **no undeclared paths**. Maintainability effect: every future run of every runner reads ~2k fewer bytes of `SPEC.md`; the fragment that resumes a parked note now agrees with the contract callers branch on; and the two cap raises of the last two days have a trim on record as the alternative, in the always-loaded surface where it pays most.

**Archived:** 2026-09-10
