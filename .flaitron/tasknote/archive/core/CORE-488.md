---
title: cross-repo-tasknote-remit
status: completed
tags: []
created: 2026-08-28
due:
related-tasks: [CORE-483.3]
---

# CORE-488 | cross-repo-tasknote-remit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-483.3]]

## 🎯 Goal

Decide whether flowtron needs an explicit cross-repo-edit remit rule, or whether CORE-483.3's direct-edit-to-natabula-from-a-flowtron-task-cycle precedent should simply be ratified as-is.

## ✅ Acceptance

- [ ] SPEC.md gains a new "Cross-repo edit remit" section: a tasknote's deliverable lands in the repo whose session opened it; cross-repo work is filed in the target repo, never edited directly from this task cycle
- [ ] CORE-483.3 is named in that section as the explicit pre-rule exception, framed like the existing "singular exception, not a precedent" carve-outs in §"What flowtron does NOT provide"
- [ ] Phase 4 doc-drift sweep run across all 17 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] PLAN.md CORE-488 line flipped to `Completed` stub form

## 🧩 Subtasks

- [ ] Draft the new SPEC.md "Cross-repo edit remit" section text
- [ ] Insert it after `## Blocked tasks` and before `## Loop tasks` (groups the three off-main-lane task-scope sections together)
- [ ] Re-read the edited section for correctness and cross-reference integrity
- [ ] Run the Phase 4 doc-drift sweep
- [ ] Closure: flip PLAN.md, archive tasknote, commit

## 🔗 Related

- [[CORE-483.3]] — the precedent under review: executed its whole deliverable as direct edits to natabula files from this flowtron task cycle

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed same-day by natabula NAT-182.3 as an optional operator-ratified extra, off the CORE-483.3 precedent. The decision the PLAN line asks for is real and unresolved — no drift.

- [x] Read relevant source files — narrow, known read set: `SPEC.md` in full (§"What flowtron does NOT provide", §"Working in the flowtron repo itself", §"Blocked tasks" / "Loop tasks" placement), `.flowtron/tasknote/archive/core/CORE-483.3.md` (the precedent itself), `~/Code/natabula/.flowtron/tasknote/archive/natabula/NAT-182.3.md` and `NAT-148.md` (the routing task that filed this line, and the remit precedent it names), `README.md` §"Sessions, loops, and sub-agents" (session/context boundary language — found no existing repo-boundary rule), `.flowtron/tasknote/README.md` §"AI-referenced docs" (doc-drift sweep list). No probe needed.

- [x] **Best Practices Review** — N/A for code: this is a SPEC.md contract addition, not a code change. The "responsibility" in scope is where a new cross-repo scoping rule belongs among SPEC.md's existing scope-boundary sections (§"Blocked tasks", §"Loop tasks", §"What flowtron does NOT provide") — resolved by placement choice below, not a refactor.

- [x] **Archive skim** — `archive/core/`: only `CORE-483.3.md` touches this surface (read in full above; no other flowtron tasknote mentions cross-repo edits). `archive/natabula/` (cross-referenced via `related-tasks`): `NAT-182.3.md` (filed this PLAN line; records the routing table and the operator's opt-in) and `NAT-148.md` (the remit precedent NAT-182.3 cites — natabula routes flowtron findings as filed CORE- tickets rather than fixing flowtron directly; establishes the *reverse* direction of the same boundary this task now considers making symmetric).

- [x] **Drift check** — CORE-483.3's claim re-verified directly from its own archived tasknote (read above): it edited `~/Code/natabula/configs/.gitignore` and `~/Code/natabula/.gitignore` (3-line comment insertions each) as its whole deliverable, "deliberate and recorded ... flowtron edits live outside this repo," flowtron-side commit only (`git status` in the archived note shows only the tasknote touched in the flowtron repo). Matches the PLAN.md line's description exactly — no drift. No SPEC.md section currently states a cross-repo edit boundary in either direction (grepped for "cross-repo" / "other repo" / "outside this repo" across SPEC.md, docs/, README.md — zero hits before this task).

- [x] Asked clarifying questions — this is a genuine governance decision only the operator can make (ratify the precedent as-is vs. record a durable rule vs. record nothing), so AskUserQuestion was used rather than picking silently. Operator chose: **record a symmetric remit rule** in SPEC.md, mirroring the NAT-148/NAT-182.3 direction (natabula doesn't fix flowtron directly; flowtron shouldn't fix other repos directly either), with CORE-483.3 named as the explicit pre-rule exception.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The gap: CORE-483.3 (this repo) edited natabula's files directly as its whole deliverable — no SPEC.md rule permitted or forbade this. Meanwhile natabula's own NAT-148/NAT-182.3 precedent already established the *reverse* direction as policy: a natabula task that finds a flowtron-side issue files a CORE- ticket and routes it, never fixes flowtron directly from the natabula session. CORE-488 closes that asymmetry by writing the same boundary into SPEC.md, applying in both directions, with the one tasknote that predates the rule named as a scoped, non-precedent-setting exception — the same framing SPEC.md already uses for `tools/update-adopters.mjs` and the viz cross-project exception in §"What flowtron does NOT provide".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the existing style of SPEC.md's short pointer sections (`## Blocked tasks`, `## Loop tasks`); reused the "singular exception, not a precedent" framing from §"What flowtron does NOT provide" for the CORE-483.3 carve-out instead of inventing new phrasing

- [x] **Minimal refactor gate** — N/A: single new section inserted; no existing text touched

- [x] Implemented the minimal solution — added `## Cross-repo edit remit` to `SPEC.md` between `## Blocked tasks` and `## Loop tasks`, stating the routing rule and naming the CORE-483.3 exception

- [x] Updated/added tests for non-trivial behavior — N/A: markdown contract addition, no executable surface

**Implementation Notes:**

One file changed: `SPEC.md` (+19 lines), inserted between `## Blocked tasks` (:892-894) and `## Loop tasks` (now :916). No other line in the file touched. Placement groups the three "off-main-lane" tasknote-scope sections together (Blocked → pause, Cross-repo edit remit → route out, Loop → repeat), matching the existing short-pointer-section style used elsewhere in this part of SPEC.md.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only contract addition, no executable surface (no `viz/` or `tools/` file touched)

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass done instead: heading level matches siblings (`##`), no broken internal link syntax, section renders as plain prose + one bold-lead exception paragraph consistent with sibling sections

- [x] **Quality assertions** — no duplication: reused the exact "singular exception, not a precedent" framing rather than restating it differently; no dead references — grepped for other files referencing `## Blocked tasks` / `## Loop tasks` by section name and found none that cite line numbers or assume adjacency that this insertion would break; no stale docs — this is new content, nothing else describes cross-repo scope to go stale

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `AGENTS.md`: no change · `SPEC.md`: **updated** (this task's deliverable — new §"Cross-repo edit remit") · `docs/MIGRATION.md`: no change · `claude/AGENTS-snippet.md`: no change · `codex/AGENTS-snippet.md`: no change · `cursor/AGENTS-snippet.md`: no change · `grok/AGENTS-snippet.md`: no change · `docs/CONVENTIONS.md`: no change · `CONTRIBUTING.md`: no change · `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change (no Claude-specific surface introduced) · `docs/PLATFORMS.md`: no change · `claude/CAPABILITIES.md`: no change · `docs/AGENT-COMPAT.md`: no change · `docs/EXTERNAL-AGENTS.md`: no change (covers single-repo agent handoff/ownership, not cross-repo edit scope — checked, no overlap) · `docs/WORKTREES.md`: no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form kept at top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional-skip branch)

**Final Summary:**

Resolved CORE-488's open governance question by adding `## Cross-repo edit remit` to `SPEC.md` (between `## Blocked tasks` and `## Loop tasks`): a tasknote's deliverable lands in the repo whose session opened it, and cross-repo work gets filed in the target repo rather than edited directly from the task cycle that found it. This makes the boundary symmetric with the routing convention natabula's NAT-148/NAT-182.3 precedent already enforces in the other direction (natabula routes flowtron-side findings as filed `CORE-` tickets rather than fixing flowtron directly). CORE-483.3 — the one tasknote that edited natabula's `.gitignore` files directly as its whole deliverable — is named in the new section as the explicit pre-rule exception, framed like the existing "singular exception, not a precedent" carve-outs in §"What flowtron does NOT provide" (`tools/update-adopters.mjs`, the viz cross-project query exception).

**Changed files:** `SPEC.md` (+19 lines, one new section; no existing line touched). `.flowtron/PLAN.md` (CORE-488 line → stub) and this tasknote (scaffold → archive) round out the commit.

**Verification:** re-read the inserted section in place after writing (renders correctly, cross-references resolve); grepped the repo for other files citing `## Blocked tasks` / `## Loop tasks` by name — none assume line-number adjacency, so nothing else drifted from the insertion. No test suite applies (markdown-only, no `viz/` or `tools/` surface touched).

**Refactors:** none made, none deferred — single additive section, no existing text rewritten.

**Documentation verdict:** 16 of 17 AI-referenced docs unaffected; `SPEC.md` itself carries the deliverable (see doc-drift sweep above).

**Maintainability effect:** closes a real asymmetry — the reverse-direction remit (adopter → flowtron) was already policy via natabula's own precedent, but flowtron had no rule governing the forward direction (flowtron task → other repo) until now. Future tasknotes that discover cross-repo work have an explicit, findable rule to follow instead of re-litigating CORE-483.3's judgment call each time.

**Archived:** 2026-08-28
