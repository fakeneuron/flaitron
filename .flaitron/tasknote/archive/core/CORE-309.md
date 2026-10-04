---
title: ft-audit-repo
status: completed
tags: []
created: 2026-06-10
due:
related-tasks: []
---

# CORE-309 | ft-audit-repo

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Ship a new first-contact holistic audit skill (`/ft-audit-repo`) for freshly adopting repos — Repo Map discovery, thematic synthesis, milestone-sequenced plan filed as native flowtron epics — delegating deep passes to the existing focused `ft-audit-*` family.

## ✅ Acceptance

- [ ] New skill at `claude/skills/ft-audit-repo/SKILL.md` keeping the X-post's novel layers: Phase 1 Repo Map (read-before-judging — purpose, stack, architecture sketch, conventions), thematic synthesis (3–5 themes, explicit won't-fix tradeoffs, measurable done-signals), milestone-sequenced plan with a Milestone-0 safety net
- [ ] Mega-audit dropped in favor of delegation: thin cross-cutting sweep (capped findings, feeds synthesis — not standalone tickets), then recommends which focused `ft-audit-*` skills deserve full runs based on the map
- [ ] Output is native flowtron grammar written to `.flowtron/PLAN.md` after user confirmation: milestone → `<AREA>-EPIC-<N>` with implementation children + closing `.N` audit placeholder (skip `.1` Discovery — the repo-map run supplies it; provenance noted on the epic line), effort → `[heavy]🧠`/`[light]🔧`
- [ ] Family conventions inherited: `$ARGUMENTS` scope resolution, verification gates before auditing, hard finding caps, `AskUserQuestion` for open questions, 1–10 health score
- [ ] Strictly read-only — no trivial-fix carve-out (explicit hard rule)
- [ ] Install path: no fork — documented in `docs/MIGRATION.md` §1.2.1 as run-by-reference from the read-only submodule path
- [ ] Command stub at `claude/commands/ft-audit-repo.md` matching sibling stub shape
- [ ] Roster/count surfaces updated: MIGRATION §1.2 "ships 22 slash commands" → 23, SPEC.md §"Skill namespace", `/ft-flowtron` roster, plus any README/GLOSSARY roster hits
- [ ] Doc-drift sweep clean at closure

## 🧩 Subtasks

- [ ] Write `claude/skills/ft-audit-repo/SKILL.md` — scope & ground rules, Repo Map, thin sweep, thematic synthesis, delegation recommendations, milestone plan + PLAN.md write step, hard rules
- [ ] Write `claude/commands/ft-audit-repo.md` command stub
- [ ] Update `docs/MIGRATION.md` §1.2.1 (seventh family member, no-fork install note) + §1.2 command count
- [ ] Sweep remaining roster surfaces: SPEC.md §"Skill namespace", `claude/skills/ft-flowtron/SKILL.md`, README.md, GLOSSARY.md, PLATFORMS.md, AGENTS-snippet — update any that enumerate skills or counts
- [ ] Phase 3: wikilink-integrity grep on touched docs; no viz code touched (confirm)
- [ ] Phase 4: doc-drift sweep, PLAN.md flip to stub form, archive tasknote, recap

## 🔗 Related

- [[CORE-101]] — audit-family bundle (created the six-scaffold family this extends)
- [[CORE-287]] — adopter-audit-overlay (established the run-by-reference submodule-path pattern this install path reuses)

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Fills a real gap — the six focused scaffolds assume the adopter already knows where to look; nothing covers first contact with an unfamiliar repo. The delegation design (thin sweep → recommend focused runs) avoids duplicating the family rather than competing with it.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source reads.** `claude/skills/ft-audit/SKILL.md` + `ft-audit-security/SKILL.md` define the family shape: §1 scope/rubric/gates → §2 five capped passes → §3 finding format → §4 closing sections (Summary w/ 1–10 score · Exploratory Insights · Proposed tasks · Questions) → §5 PLAN.md write-after-confirm → §6 hard rules. `docs/MIGRATION.md` §1.2.1 (lines 66–139) is the install doc; §1.2 line 62 carries the "ships 22 slash commands" count. Command stubs are ~6-line frontmatter + prose pointers.
- **X-post source is not in the repo** — the PLAN.md long description *is* the distillation; no drift to check against an external artifact.
- **Archive skim.** [[CORE-287]] (adopter-audit-overlay) established run-by-reference from the read-only submodule path `.flowtron/core/claude/skills/...` as a sanctioned pattern — the no-fork install path reuses it. CORE-101 created the family bundle; CORE-185/190 settled pass-name layering and the 🔍 next-move flag; CORE-243 categorized the audit family in the glossary (roster surface to check). No prior tasknote attempted a first-contact/holistic skill — new ground, no accept/reject precedent to honor.
- **Epic-grammar check.** `SPEC/epic.md` brackets epics with `.1` Discovery + `.N` Audit but says "apply judgment — simpler implementations don't need it." Operator confirmed: filed epics carry children + `.N` audit placeholder, skip `.1` (the audit-repo run is the discovery; provenance noted on the epic line).
- **Clarifications (operator-answered).** (1) Install path → **no fork**: §1.2.1 documents it as the seventh family member invoked directly via the submodule path — first-contact means nothing project-specific exists to customize, and it's read-only. (2) Epic child shape → **children + `.N` audit, skip `.1`**. Both were the recommended defaults consistent with the filed line.
- **Assumptions (explicit).** Thin-sweep findings feed the synthesis and delegation recommendations — they do not become standalone tickets outside the milestone plan. Health score rides the Summary section as in siblings. The skill stays stack-neutral with no §0 forker checklist (nothing to fork). The 🔍 audit-family next-move flag applies to `/ft-audit-repo` as to siblings.
- **Exit-gate judgment.** Discovery surfaced no significant deviation — both clarifications confirmed the natural reading of the filed intent → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Extended the six-sibling family shape (`ft-audit`/`ft-audit-security` as references): same frontmatter style, §1 scope-and-ground-rules opener, family finding format, AskUserQuestion convention, write-after-confirm PLAN.md step, hard-rules closer. Deviations are deliberate and per the filed design: phased structure (Map → Sweep → Synthesis → Delegation → Plan) instead of 5 passes; one overall 10-finding cap instead of 5-per-pass; epics+children output instead of flat tickets; no §0 forker checklist (no fork); no trivial-fix carve-out (read-only hard rule).
- **New files:** `claude/skills/ft-audit-repo/SKILL.md` (~95 lines), `claude/commands/ft-audit-repo.md` (stub matching sibling shape).
- **Wiring edits:** `docs/MIGRATION.md` §1.2 count 22→23 + §1.2.1 new "First contact" paragraph (seventh member, no-fork, by-reference install reusing the [[CORE-287]] overlay pattern); `SPEC.md` §"Skill namespace" brace set gains `-repo`; `docs/PLATFORMS.md` table row (six focused + repo phrasing) and worked-example counts 22→23 ×2 with `seven ft-audit-family`; `docs/GLOSSARY.md` audit-family entry → seven members; `claude/skills/ft-flowtron/SKILL.md` roster row added.
- **Adjacent drift fixed in-line-of-fire:** PLATFORMS.md's worked-example enumeration claimed 22 but listed only 21 (`ft-update.md` missing) — added it so the new 23 count is verifiable against the list it sits in.
- **Surfaces checked, no change needed:** MIGRATION §1.2.1 "ships six stack-neutral audit scaffolds" + "six bundled scaffolds" (still true — six *forkable* scaffolds), AGENTS.md, AGENTS-snippet.md, README.md, ft-new-project, ft-update (re-wires symlinked skills only; audit-repo is by-reference), SPEC post-closure `🔍 /ft-audit*` glob (covers `-repo` automatically), VISION.md.
- No tests to add: markdown-only change; `viz` parses PLAN.md/tasknotes, not skills.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Markdown-only change — no code touched, no targeted suite applies; `viz` untouched (no frontend, 👁️ N/A).
- Verified `claude/commands/` = 23 files and `claude/skills/` = 23 dirs, matching every updated count claim.
- Wikilink-integrity grep (`[[A-Z]+-[0-9]+`) over all touched files: zero accidental parseable wikilinks introduced (new SKILL.md uses angle-bracket placeholders per SPEC §"Long-description conventions").

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change (no skill-roster enumeration)
  - `SPEC.md` — **updated** (§"Skill namespace" brace set gains `-repo`)
  - `docs/MIGRATION.md` — **updated** (§1.2 count 22→23; §1.2.1 first-contact paragraph)
  - `claude/AGENTS-snippet.md` — no change (audit family not in the symlink wiring)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change ("`/ft-audit` … and others" already covers the new member)
  - `docs/AGENT-NEUTRALITY.md` — no change (no new Claude-specific contract surface)
  - `docs/PLATFORMS.md` — **updated** (table row; worked-example counts 22→23 ×2; six→seven family; pre-existing missing `ft-update.md` added to the enumeration)
  - `claude/CAPABILITIES.md` — no change (no new capability trigger)
  - `docs/AGENT-COMPAT.md` — no change (no per-skill matrix rows)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-10.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:** Shipped `/ft-audit-repo`, the seventh audit-family member: a first-contact holistic audit for freshly adopting repos that maps before judging (Repo Map), runs one thin 10-cap sweep, synthesizes 3–5 themes with won't-fix tradeoffs and measurable done-signals, files a milestone-sequenced plan as native flowtron epics (children + `.N` audit placeholder, `.1` Discovery skipped — the run supplies it), and delegates depth to the six focused scaffolds. Operator-confirmed design: no fork (run by reference from the submodule path, reusing the CORE-287 overlay pattern) and the skip-`.1` epic shape. Wired into MIGRATION §1.2.1, SPEC namespace, PLATFORMS, GLOSSARY, and the `/ft-flowtron` roster; all 22→23 counts verified against `ls` reality.

**Archived:** 2026-06-10
