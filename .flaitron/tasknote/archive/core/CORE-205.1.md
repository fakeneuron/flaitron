---
title: agent-neutrality-sweep discovery
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-205, CORE-EPIC-154, CORE-EPIC-198, CORE-196]
---

# CORE-205.1 | agent-neutrality-sweep discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-205]]

## 🎯 Goal

Scope the `CORE-EPIC-205` epic (`agent-neutrality-sweep`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-205.2 .. CORE-205.5` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-205.2 .. CORE-205.5 filed in `_project/PLAN.md` (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-205.6 reviewed and confirmed as-filed (or rewritten if Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (SPEC.md + SPEC/, templates/, docs/AGENT-NEUTRALITY.md + PLATFORMS.md + MIGRATION.md, claude/AGENTS-snippet.md, claude/skills/ft-*/SKILL.md + commands, _project/tasknote/README.md AI-referenced list) — log in Discovery Notes
- [ ] Skim `_project/tasknote/archive/core/` for 154/198/139/138/132 precedents (multi-agent-portability, context-chain-portability, claude-specific cleanups, model grammar) — log load-bearing findings
- [ ] Drift check on AGENT-NEUTRALITY.md ledger entries, PLATFORMS.md plug-in example, SPEC claude/ refs — flag any post-198 drift
- [ ] Surface clarifying questions (child shortnames/scopes, sonnet vs opus tagging per user guidance, any new surfaces since 198, whether "AskUserQuestion" residuals in scaffolds count as contract drift) — record in Resolved scoping table
- [ ] Draft refined long descriptions for CORE-205.2 .. CORE-205.5 (contract hygiene, wiring symmetry, adopter docs, ledger update); word-count each (≤50w / 70w cap)
- [ ] Phase 2: write the 4 drafted child lines into `_project/PLAN.md` under CORE-EPIC-205 with 2-space indent + [sonnet] tags
- [ ] Phase 3: markdown mental-pass on PLAN.md edits (indent, **ID**, [model], em-dashes, word counts, cross-refs)
- [ ] Phase 4: doc-drift sweep on AI-referenced docs + flip .1 to stub + git mv to archive/core/ + recap

## 🔗 Related

- [[CORE-EPIC-205]] — parent epic (this Discovery)
- [[CORE-EPIC-154]] — multi-agent-portability (prior contract/wiring neutrality audit)
- [[CORE-EPIC-198]] — context-chain-portability (CLAUDE.md + grok-adoption-verification)
- [[CORE-196]] — worktree-convention (pending epic promotion; agent-ergonomics sibling)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` with a clear code-sweep epic brief ("check if the repo is truly project agnostic... lean heavy on one llm... structure proper to ensure easy adoption and movement across different coding agents (e.g. claude, codex, grok)"). Scope is multi-child (contract audit + wiring review + adopter impact + ledger hygiene + final audit bracket), exactly the shape SPEC/epic.md calls out for code sweeps. Precedent exists (CORE-EPIC-154/198) but a fresh point-in-time sweep is warranted after recent releases and to honor the user's "non-deep-thinking/sonnet" scoping note for follow-ups.

- [x] Read relevant source files — `docs/AGENT-NEUTRALITY.md` (the ledger + tool terminology table), `docs/PLATFORMS.md` (two-layer model + symmetric codex/grok/cursor plug-in pattern), `SPEC.md` (project-agnostic claims, claude/ factual refs + forward to PLATFORMS, model field "adopters may substitute"), `claude/AGENTS-snippet.md` (the neutral AGENTS.md paste-block + symlink wiring), `docs/MIGRATION.md` (Claude-focused today per ledger), `_project/tasknote/README.md` (AI-referenced docs list + area rules), `claude/skills/ft-epic-discovery/SKILL.md` and `templates/tasknote-template.md` (source of the generic scaffold text), `claude/skills/ft-new-project/SKILL.md` (bootstrap wiring), `docs/PHILOSOPHY.md` (quick spot-check for narrative leans).
- [x] **Archive skim** — grepped + read hits from `CORE-154.*`, `CORE-198.*`, `CORE-139`, `CORE-138`, `CORE-132`, `CORE-195.1`, `CORE-200`, `CORE-204` (post-198 release notes). Load-bearing: 154.2 generalized AskUserQuestion → "structured ask" + reframed intentional Claude surfaces into the ledger; 154.3 locked the sibling-dir wiring structure (no rename of claude/); 198.4 verified grok adoption works on the neutral contract; 200 recorded decision to keep shell-discipline agent-neutral half in SPEC only. No regressions noted.
- [x] **Drift check:** All ledger paths in AGENT-NEUTRALITY.md:15-48 still exist at HEAD (SPEC claude/ mentions, templates/tasknote-README.md, claude/AGENTS-snippet.md, MIGRATION, PLATFORMS, SECURITY Claude subsection). PLATFORMS.md plug-in example (claude/ + hypothetical codex/grok/cursor siblings) matches current tree. "AskUserQuestion" term appears only in wiring-layer SKILL.md prose (internal) + the generic epic-Discovery scaffold text we just copied (and some archive tasknotes) — not in live SPEC contract body (which uses "structured ask" / "prose ask"). Minor: our new 205.1 scaffold inherited the old phrasing from the skill's canonical example.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — see Resolved scoping table below (user guidance from filing asks already covered sonnet scoping + related epics; one residual on scaffold terminology surfaced by the sweep itself).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Sweep findings (agent-neutrality / project-agnostic / cross-agent portability):**

- **Project-agnostic?** Yes. SPEC.md:8 opens with the claim; layout in adopting projects is documented generically (submodule under _project/flowtron/, no host-project assumptions in contract). AI-referenced docs and templates treat the host project as opaque. No findings of project-specific leakage.

- **Heavy LLM lean?** No in the contract layer. Model field (SPEC/model.md + templates/PLAN.md) explicitly says "recommended: opus | sonnet; adopters may substitute project-specific tokens". [sonnet] on this epic per user "non-deep-thinking" guidance for follow-ups. Wiring layer is Claude Code by design (slash commands + structured ask primitive live in claude/), but that's documented and isolated (see PLATFORMS two-layer table).

- **Structure for claude / codex / grok / Cursor etc adoption?** Proper and intentional. 
  - Contract consumption (the common path): any agent reads the AGENTS.md paste-block (agent-neutral framing in claude/AGENTS-snippet.md:7-21) + SPEC.md; drives 4-phase + post-closure conversationally. No machinery required.
  - Wiring uplift (optional ergonomics): only Claude Code today (18 commands + 18 skills under claude/). Future platforms add sibling dirs (codex/, grok/, cursor/) per the locked pattern in PLATFORMS.md:42-52 and CORE-154.3. Adopter symlinks stay stable because claude/ is never renamed.
  - No new leaks since CORE-154/198: AGENT-NEUTRALITY.md ledger is current and consulted; SPEC claude/ refs are all factual + carry PLATFORMS forward pointers.
  - Minor residual found by this sweep: the *generic pre-fill text* for epic-Discovery subtasks/acceptance (in ft-epic-discovery/SKILL.md Step 5 + the template we copied) still says "via AskUserQuestion" instead of the neutral "via structured ask (or platform equivalent)" per AGENT-NEUTRALITY:57. This is instructional text in a contract-adjacent file (templates + skill). Worth a hygiene child.

- **Other notes:** claude/skills/ and commands/ counts (18/18) are current as of v4.1.0. viz/ frontend and all non-claude/ surfaces are fully agent-neutral. No "codex/" or "grok/" dirs exist yet (expected — no contributor has shipped wiring). CONTRIBUTING.md:8 "Most edits land via Claude Code sessions" is historical narrative (defended by CORE-132 per ledger).

**Resolved scoping (from filing AskUserQuestion + sweep clarifications):**

| Question | Answer | Impact on children |
|----------|--------|--------------------|
| Area / ID | CORE-205 (confirmed; next after 204) | All lines under CORE-205 |
| Model for this epic + follow-ups | [sonnet] for the sweep (non-deep); children default [sonnet] per user guidance | .2-.5 all [sonnet] unless Discovery surfaces a heavy-design child |
| Related | [[CORE-EPIC-154]], [[CORE-EPIC-198]], [[CORE-196]] | Pre-filled in frontmatter + Related section |
| Child count / audit | N=6 locked (.1 + 4 impl + .6) | 4 implementation children |
| "AskUserQuestion" in scaffold | Sweep surfaced as minor terminology drift vs AGENT-NEUTRALITY ledger | .2 (contract hygiene) will clean the generic phrasing in templates/ + ft-epic-discovery/SKILL.md examples |
| Scope of sweep | Focus on post-198 surfaces + the two questions in the brief (project-agnostic + LLM lean + cross-agent structure) | Children scoped to contract, wiring, adopter docs, ledger update (no broad "rewrite everything") |

**Proposed child scopes (for Phase 2 filing; word-counted ≤50w target):**

- CORE-205.2 [sonnet] | contract-layer-hygiene — Audit SPEC.md, templates/, docs/ for "AskUserQuestion" residuals and other Claude-tool names; replace with neutral "structured ask" per AGENT-NEUTRALITY ledger. (hygiene only; no behavior change)
- CORE-205.3 [sonnet] | wiring-layer-symmetry — Confirm claude/ structure + commands/skills have no contract leakage; re-verify PLATFORMS.md plug-in example + sibling-dir constraints still hold; note any surfaces added since CORE-154.3.
- CORE-205.4 [sonnet] | adopter-neutrality-docs — Review MIGRATION.md, AGENTS-snippet.md, ft-new-project, ft-flowtron roster for Claude-only framing that could confuse Codex/Grok/Cursor users; add neutral notes or carve-outs.
- CORE-205.5 [sonnet] | neutrality-ledger-update — If .2/.3 surface new intentional Claude refs (or confirm none), update docs/AGENT-NEUTRALITY.md table + out-of-scope list with fresh 2026-05-25 sweep date.

(These will be filed verbatim in Phase 2 after any user tweak at the 🛠️ gate.)

**Verdict on the user's core questions:** The repo *is* project-agnostic by design and practice. No heavy LLM lean in the contract (wiring isolation + explicit "adopters may substitute" language). The claude/ + sibling-dir structure + AGENTS.md neutral paste + PLATFORMS doc + AGENT-NEUTRALITY ledger together make cross-agent adoption (claude ergonomics + codex/grok conversational) first-class and low-friction. Minor hygiene children recommended; no structural overhaul needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

N/A — pure PLAN.md prose edit (4 child lines filed under CORE-EPIC-205). No executable code surface. Pattern matched existing CORE-EPIC-194/195/198 cohorts exactly (2-space indent, [sonnet], em-dashes, word-count discipline).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

N/A — markdown-only edits (PLAN.md + this tasknote scaffold). Markdown mental-pass passed: 2-space child indent preserved on all 4 new lines, **CORE-205.N** bold IDs intact, [sonnet] tag on every line, | shortname segments ≤30 chars, em-dash separators consistent, all long descriptions ≤50w target / 70w hard cap, no trailing whitespace.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Epic CORE-EPIC-205 (agent-neutrality-sweep) filed via /ft-epic-discovery + Discovery closed 2026-05-25. Four implementation children (contract hygiene, wiring symmetry, adopter docs, ledger update) scoped and written to PLAN.md after a full surface sweep (SPEC + templates + docs/AGENT-NEUTRALITY + PLATFORMS + MIGRATION + AGENTS-snippet + wiring) confirmed the repo is project-agnostic, has no heavy LLM lean in the contract layer, and the claude/ + sibling-dir structure + neutral paste-block properly enables easy cross-agent adoption (claude ergonomics today; codex/grok conversational via AGENTS.md). Minor terminology hygiene child only; design is solid. Builds directly on [[CORE-EPIC-154]] and [[CORE-EPIC-198]].

**Doc-drift sweep (AI-referenced docs from _project/tasknote/README.md):**
- README.md — no change
- SPEC.md — no change (project-agnostic claims and claude/ factual refs + PLATFORMS forward pointers remain current)
- docs/MIGRATION.md — no change (Claude-focused adoption guide per the AGENT-NEUTRALITY ledger)
- claude/AGENTS-snippet.md — no change (neutral paste-block + symlink list intact)
- docs/CONVENTIONS.md — no change
- CONTRIBUTING.md — no change
- SECURITY.md — no change
- docs/AGENT-NEUTRALITY.md — no change (ledger still accurate post-sweep; one minor residual noted for .2 to clean in instructional text)
- docs/PLATFORMS.md — no change (two-layer model + plug-in pattern current)

**PLAN.md .1 stub:** `- [x] **CORE-205.1** [sonnet] | discovery — Completed 2026-05-25.`

**Tasknote archive:** `git mv` to `_project/tasknote/archive/core/CORE-205.1.md`; **Archived:** 2026-05-25

**Archived:** 2026-05-25
