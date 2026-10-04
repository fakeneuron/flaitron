---
title: loop-integration discovery
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-330]
---

# CORE-330.1 | loop-integration discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-330]]

## 🎯 Goal

Scope the `CORE-EPIC-330` epic (`loop-integration`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-330.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-330.2 .. CORE-330.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-330.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents (esp. CORE-328.4 autonomous-loop-guidance) — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-330.2 .. CORE-330.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-330 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-330]] — parent epic (loop-integration)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed this session from a grounded exploration of Claude Code loop patterns (goal loops + scheduled heartbeats) vs flowtron's operator-gated, bounded-task model. Seven prioritized recommendations crystallized in-conversation; the epic brackets the top six (viz work deferred to a later FE line). The CORE-328.4 tension (below) reshapes framing, not relevance.

- [x] Read relevant source files — `SPEC.md` (gates anchor, task-line grammar, won't-provide list), `SPEC/epic.md`, `SPEC/gates.md` (full gate contract + `--fast` surface), `SPEC/blocked.md` (park mechanism = loop hard-stop escape hatch), `templates/tasknote-template.md`, `README.md` §"Sessions, loops, and sub-agents", `docs/VISION.md` §"What we won't accept", `docs/WORKTREES.md` (headers; five locked conventions cited-not-restated), `.flowtron/PLAN.md`.

- [x] **Archive skim** — **[[CORE-328.4]] (closed 2026-07-02, same day) is load-bearing:** added README §"Sessions, loops, and sub-agents" — descriptive-only, sanctions `--fast` as "within-task autonomy… not a license to chain tasks," and closes with "flowtron ships no loop runner, scheduler, or session tooling, by design." Direct tension with this epic; surfaced to operator and resolved (see Resolved scoping). CORE-329.2 precedent: adding a shipped skill fans out symlink counts across `docs/MIGRATION.md` / `ft-new-project` / `AGENTS-snippet` — sizes the `.5` wiring child.

- [x] **Drift check** — one drift finding: the in-conversation exploration assumed flowtron had zero loop-related content; README §"Sessions, loops, and sub-agents" (landed today) establishes a descriptive-only stance the epic must reconcile, owned by `.2`. All other cited surfaces verified at HEAD: ✅ Acceptance section (template), `--fast` (`SPEC/gates.md`), `wt-<ID>` convention (`docs/WORKTREES.md`), `status: blocked` parking (`SPEC/blocked.md`). No other drift.

- [x] Asked clarifying questions — two AskUserQuestion rounds (filing inputs + scoping); see Resolved scoping table.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Design frame:** flowtron today answers *what* the AI does and how it stays scoped; Claude Code loops add *when it runs and how long it keeps going* — with no contract for gate interplay, recurring-work home, write-back, or cheap re-entry. Every gap closes by extending an existing pattern: Acceptance = termination condition; `status: blocked` parking = hard-stop escape hatch; `wt-<ID>` = blast-radius control; PLAN.md = inbox that heartbeat discovery feeds; relevance gate generalizes to a per-cycle "is another iteration still right?" check.
- **CORE-328.4 reconciliation (operator-resolved):** goal loop = *deepened within-task autonomy on one tasknote* — extends the sanctioned `--fast` lane; "one tasknote per session" holds because the loop never chains tasks. Heartbeat never opens tasknotes (files PLAN lines only). The real boundary `.2` must redraw in README/VISION wording: **Claude Code's `/loop` is the runtime; flowtron ships the markdown contract the loop reports to** — still no runner/scheduler/daemon in flowtron itself.
- **Key mechanisms per child:** `.2` SPEC/loop.md lazy module — gate collapse (loop implies `--fast` semantics; commit-per-verified-iteration replaces 📦; destructive 🗄️/▶️ escalation does NOT collapse → park via `status: blocked`), per-cycle relevance gate, `max-iterations` budget, `## 🔁 Iterations` append-only log convention, three additive frontmatter keys (`loop:` / `loop-max:` / `loop-last-run:`; deliberately no `loop-interval` — cadence belongs to the invocation, not the file). `.3` heartbeat template — cycle pre-check makes empty cycles near-free; duties ordered first-match-wins; write-back = one PLAN line (≤50w) + one LOOP-LOG.md line per cycle; never touches tasknotes or `## Completed`; dogfood on flowtron-self. `.4` `/ft-goal-task` — sibling of `/ft-debug`; Phase 1 additionally requires every Acceptance criterion to carry a verify command (unverifiable taste criteria split out to a 👁️ ask); Phase 2↔3 becomes the loop body; Phase 4 unchanged; `--worktree` pairs with `/ft-worktree-start`. `.5` wiring — symlink fan-out + MIGRATION/AGENTS-snippet counts + GLOSSARY entries.
- **Caveats to encode in `.2`/`.3`:** session expiry (~7 days) means heartbeats are babysitting, not cron — LOOP-LOG staleness is the honest death signal; token burn governed by pre-check + cycle relevance gate + iteration log replacing transcript re-reads.

**Resolved scoping:**

| Question | Resolution |
|---|---|
| Filing inputs | CORE / `loop-integration` · Medium · `[heavy]🧠` · N=6 |
| CORE-328.4 guard vs epic scope | **Full scope with reconciliation** — ship contract + template + skill; `.2` redraws the README/VISION boundary (runtime lives in Claude Code, contract lives in flowtron) |
| Child split | Confirmed 4-child split: `.2` SPEC contract + reconciliation · `.3` heartbeat template + dogfood · `.4` `/ft-goal-task` skill · `.5` adopter wiring + doc sync |
| Adopter-wiring policy | **Auto-wire like the tasknote family** — `/ft-goal-task` joins the symlink set; template ships in `templates/` |
| Per-child models | `.2` [heavy]🧠 · `.3` [medium]🧠 · `.4` [heavy]🧠 · `.5` [light]🔧 |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cohort-children filing pattern per the CORE-EPIC-329 / FE-EPIC-063 precedents (2-space indent under the parent, `[model]🧠/🔧` token with emoji per the newest cohorts, em-dash separator, per-child ≤50w target / 70w cap). No new shape needed.

- [x] Implemented the minimal solution — four child lines (CORE-330.2–.5) written under the parent between the `.1` and `.6` lines; parent placeholder description refined in the same edit (boundary sentence added per the CORE-328.4 reconciliation).

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface).

**Implementation Notes:**

- 4 child lines written; word counts: `.2` ≈55w · `.3` ≈50w · `.4` ≈48w · `.5` ≈42w — all under the 70w hard cap.
- No audit-number bump — N=6 held through Discovery; `.6` audit line confirmed as-filed.
- Downstream-impact scan: active PLAN sections contain nothing besides the just-filed cohort — **no downstream impact**, no reconcile edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space child indent ✓ · bold `**CORE-330.N**` IDs ✓ · model token on every line (`[heavy]🧠` / `[medium]🧠` / `[light]🔧`) ✓ · `| shortname` present, all ≤30 chars ✓ · em-dash separators ✓ · bare task-ID references (CORE-328.4, CORE-329.2) deliberately non-wikilink (historical rationale, not dependencies) ✓ · no trailing whitespace ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 ledger entries **no change**: `README.md` (boundary redraw is `.2`'s deliverable, not this filing), `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`. Pure Discovery filing — contract edits land inside the implementation children.

- [x] Closed — PLAN.md `.1` line flipped to stub form `Completed 2026-07-02.` (kept nested under the open epic per cohort convention); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the conditional-skip marker).

**Final Summary:**

Filed CORE-EPIC-330 (`loop-integration`, Medium, N=6) and closed its Discovery: four implementation children scoped and written to PLAN.md — `.2` SPEC/loop.md contract (gate collapse to --fast semantics, commit-per-verified-iteration, per-cycle relevance gate, max-iterations budget, 🔁 iterations-log, three additive frontmatter keys) + README/VISION boundary redraw · `.3` heartbeat loop.md template (cycle pre-check, first-match-wins duties, one-PLAN-line + one-LOOP-LOG-line write-back, flowtron-self dogfood) · `.4` /ft-goal-task skill (verify-command-per-Acceptance-criterion gate, Phase 2↔3 loop body, --worktree pairing) · `.5` adopter wiring + doc sync (symlink fan-out per CORE-329.2 precedent, GLOSSARY, README roster). Load-bearing Discovery finding: CORE-328.4 (closed same day) had just landed README §"Sessions, loops, and sub-agents" with a descriptive-only, no-loop-machinery stance — operator resolved via full-scope-with-reconciliation: Claude Code's /loop is the runtime; flowtron ships the markdown contract the loop reports to; goal loops extend the sanctioned --fast within-task-autonomy lane on exactly one tasknote. Adopter wiring: auto-wire like the tasknote family.

**Archived:** 2026-07-02
