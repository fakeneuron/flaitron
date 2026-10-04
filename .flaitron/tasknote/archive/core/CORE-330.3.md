---
title: heartbeat-template
status: completed
tags: []
created: 2026-07-02
related-tasks: [CORE-EPIC-330, CORE-330.1, CORE-330.2]
---

# CORE-330.3 | heartbeat-template

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-330]] [[CORE-330.1]] [[CORE-330.2]]

## 🎯 Goal

Ship `templates/loop-heartbeat-template.md` — the canonical `.claude/loop.md` shape for recurring maintenance-pass (heartbeat) loops: a cheap per-cycle pre-check, ordered first-match-wins duties, and additive write-back rules (one ≤50w PLAN line per finding; one LOOP-LOG line per cycle; never opens tasknotes, never touches `## Completed`).

## ✅ Acceptance

- [ ] `templates/loop-heartbeat-template.md` exists as the canonical `.claude/loop.md` heartbeat shape, consistent with `SPEC/loop.md` (gate collapse to `--fast`, per-cycle relevance gate, `loop-last-run`/LOOP-LOG staleness signal)
- [ ] Template defines: **cheap cycle pre-check** (empty cycles near-free), **ordered first-match-wins duties** (one duty per cycle, bounded), **write-back rules** (one ≤50w PLAN line per finding under the task-line grammar; one append-only LOOP-LOG line per cycle)
- [ ] Template's hard NEVER rules encode the safety envelope: never scaffold/open a tasknote, never edit or move `## Completed`, never flip existing checkboxes, never run a destructive/irreversible command (file a PLAN line instead, per `SPEC/loop.md` destructive carve-out)
- [ ] Adopter-neutral shape + a worked flowtron-self example so it dogfoods on flowtron before `.5` wires adopters
- [ ] Dogfood validation: run one cycle's pre-check + first-match duty detection against the live flowtron repo; confirm the shape produces a coherent, bounded cycle
- [ ] Doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Draft `templates/loop-heartbeat-template.md` (purpose header + pointer to `SPEC/loop.md`; pre-check; duties; write-back; NEVER envelope; worked flowtron example)
- [ ] Define the `.flowtron/LOOP-LOG.md` line convention (append-only, one per cycle; last date = de-facto `loop-last-run` staleness signal)
- [ ] Dogfood: execute the pre-check + duty-1 detection against flowtron-self, confirm coherent cycle output
- [ ] Phase 3: markdown mental-pass + cross-ref/relative-link check against `SPEC/loop.md`
- [ ] Phase 4: doc-drift sweep + flip PLAN line + archive

## 🔗 Related

- [[CORE-EPIC-330]] — parent epic (loop-integration)
- [[CORE-330.1]] — discovery; scoped this child's shape (pre-check, first-match duties, write-back, dogfood)
- [[CORE-330.2]] — shipped `SPEC/loop.md`, the loop-task contract this template instantiates for heartbeats

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Third child of [[CORE-EPIC-330]]; scoped in [[CORE-330.1]] and consumes the contract [[CORE-330.2]] shipped in `SPEC/loop.md`. The template is the heartbeat instantiation of that contract — relevant and unblocked; `.5` (adopter wiring) depends on this file existing.

- [x] Read relevant source files — `SPEC/loop.md` (heartbeat is one of its two loop shapes; gate collapse, per-cycle relevance gate, `loop-max`, `🔁 Iterations`, `loop-last-run` death signal), `SPEC.md` (§"Task-line format" filing grammar, §"Loop tasks" pointer, §"What flowtron does NOT provide"), `SPEC/tasknote-selection.md` context (≤50w filing discipline referenced via PLAN line), existing `templates/` (`tasknote-template.md`, `tasknote-starter-template.md`, `PLAN.md` — house style), `.flowtron/tasknote/README.md` (AI-referenced ledger + templates list).

- [x] **Archive skim** — [[CORE-330.1]] archive read in full: `.3` scoped as "cycle pre-check makes empty cycles near-free; duties ordered first-match-wins; write-back = one PLAN line (≤50w) + one LOOP-LOG.md line per cycle; never touches tasknotes or `## Completed`; dogfood on flowtron-self." Caveat encoded there: session expiry (~7d) means heartbeats are babysitting not cron → LOOP-LOG staleness is the honest death signal. [[CORE-330.2]] archive read: shipped `SPEC/loop.md` (the contract), confirmed no `loop-interval`, `loop-last-run` = staleness signal. No other archive tasknote touches heartbeat/loop content.

- [x] **Drift check** — Verified at HEAD: `SPEC/loop.md` exists with all cited mechanisms; `## Completed` archive stub convention + ≤50w/70w filing discipline live in `SPEC.md`/`SPEC/tasknote-selection.md`; no pre-existing `.claude/loop.md` or `LOOP-LOG` convention (this task defines the latter); `.claude/` is gitignored in flowtron-self (per CORE-253) → no committable flowtron `.claude/loop.md`, so dogfood is validation-of-shape, not a committed loop.md. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Explicit assumptions (strong defaults from the [[CORE-330.1]] scope + the `.3`/`.5` split; surfaced loudly so they can be course-corrected):
  1. **Deliverable = one committed template file** `templates/loop-heartbeat-template.md`. No stray flowtron `.claude/loop.md` is committed (it would be gitignored + machine-local); dogfood is a live validation run of the shape against flowtron-self.
  2. **LOOP-LOG lives at `.flowtron/LOOP-LOG.md`** (project-owned, alongside `PLAN.md`, committable). Its last-line date is the de-facto `loop-last-run` staleness signal (single source; no duplicate hand-edited frontmatter date).
  3. **Template = adopter-neutral shape + a clearly-marked flowtron worked example.** Adopters replace the duties; the worked example is the dogfood.
  4. **Doc-sync/GLOSSARY/README-roster/adopter-wiring belong to `.5`.** `.3` authors the template only; at Phase 4 I may update flowtron-self's own `templates/` list in `.flowtron/tasknote/README.md` since the file now exists there.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Heartbeat vs. goal loop.** `SPEC/loop.md` names two shapes; `/ft-goal-task` (`.4`) drives the *goal* loop (converge one tasknote to a verifiable Acceptance target). The *heartbeat* is different: a recurring janitor with no single convergence target — each cycle it does at most one maintenance duty and files findings as PLAN lines for the operator to later promote via `/ft-task`. The template is the heartbeat's per-cycle contract; `/loop` is its runtime.
- **Why first-match-wins + one-duty-per-cycle.** Preserves "one task per context window" under repetition — each cycle stays small and bounded; the next cycle picks up the next duty. Ordering = priority.
- **Why the NEVER envelope.** A heartbeat runs autonomously under `--fast` semantics (`SPEC/loop.md` gate collapse). The safety ceiling is: filing a PLAN line is the maximum action; promotion to a tasknote is the operator's deliberate act; `## Completed` and existing checkboxes are read-only; destructive/irreversible commands never run (they get filed as a PLAN line per the `SPEC/loop.md` destructive carve-out, which parks rather than fires a banner into an unattended session).
- **Staleness = death signal.** No `loop-interval`; the LOOP-LOG's most-recent date (≡ `loop-last-run`) is the honest "is this loop alive?" signal, per the [[CORE-330.1]] session-expiry caveat.

**Exit gate:** Discovery surfaced no significant deviation → skip 🛠️. Scope matches the PLAN line + [[CORE-330.1]]; the only concretizations (LOOP-LOG path, dogfood-as-validation) are logged assumptions, not approach changes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sibling `templates/` files (`tasknote-template.md`, `PLAN.md`, `tasknote-starter-template.md`) set the house style: H1 + terse instructional prose + clearly-marked placeholders, with reference contracts in HTML-comment blocks (`PLAN.md` template). Template paths use adopter-relative form (`.flowtron/PLAN.md`, `.flowtron/core/SPEC/loop.md`) since templates are copied verbatim into adopter repos (per `templates/PLAN.md` line 8 precedent). Extended that shape; no new pattern invented.

- [x] Implemented the minimal solution — one new file `templates/loop-heartbeat-template.md`: purpose header + runtime-vs-contract pointer to `SPEC/loop.md`; §1 cheap cycle pre-check (empty cycles near-free = per-cycle relevance gate specialization); §2 ordered first-match-wins duties (one duty/cycle, bounded) with a fenced flowtron worked example + neutral placeholder list; §3 PLAN write-back (one ≤50w line/finding, task-line grammar, Low/Future default, flood roll-up guardrail); §4 LOOP-LOG write-back (one line/cycle incl. empty proof-of-life; last date ≡ `loop-last-run` staleness signal; commit-per-verified-iteration policy); §5 NEVER envelope (no tasknote scaffold, no `## Completed`/checkbox edits, no destructive commands → file a PLAN line instead, no task-chaining).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown template, no executable surface; nothing viz parses). Validation is the dogfood run (Phase 3).

**Implementation Notes:**

- Defined the `.flowtron/LOOP-LOG.md` convention (append-only, one line/cycle: `- YYYY-MM-DD · <empty|duty:"name"> · <no findings|filed AREA-N>`). Single source for staleness — no duplicate hand-edited `loop-last-run` frontmatter date.
- Adopter-neutral body + a fenced flowtron worked example (4 duties: wikilink integrity → doc-drift → PLAN hygiene → quality smoke) so the file dogfoods on flowtron and adopters swap the duties.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; no code/PLAN/tasknote parse surface touched — viz parses neither `templates/` nor `.flowtron/LOOP-LOG.md`).

- [x] Ran lint/type-check on changed code — N/A markdown; ran a **live dogfood cycle** + cross-ref check instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

- **Dogfood (one live cycle against flowtron-self):** pre-check saw recent commits → proceed. Duty 1 (wikilink integrity) found no dangling `[[ID]]` in PLAN.md → first-match fell through. Duty 2 (doc-drift) surfaced a real finding — `templates/*.md` is now 7 files but `.flowtron/tasknote/README.md:11` enumerates only 5 (missing `audit-overlay-template.md` + the new `loop-heartbeat-template.md`). First-match-wins produced exactly one bounded finding and hit the §3 write-back trigger. Shape validated end-to-end (pre-check → ordered fall-through → single bounded finding → write-back). The README:11 drift is folded into this task's Phase 4 doc-drift fix (I'm the one adding the template).
- **Cross-ref check:** all `SPEC/loop.md` sections the template cites exist at HEAD — §"Gate collapse", §"Per-cycle relevance gate", §"max-iterations budget", §"Frontmatter keys" ✓; `SPEC.md` §"Task-line format" ✓; `SPEC/tasknote-selection.md` (filing discipline) ✓. Top pointer switched from a root-relative markdown link to a backticked path so it doesn't read as a broken relative link from `.claude/`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 11 AI-referenced ledger entries, all **no change** — this task ships a `templates/` artifact; adopter distribution, GLOSSARY, and README skill-roster are `.5`'s scope: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (heartbeat NEVER envelope adds no new attack surface to flowtron's own threat model), `docs/AGENT-NEUTRALITY.md` (template is agent-neutral markdown), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md` — all no change. **Off-ledger fix (dogfood-surfaced):** `.flowtron/tasknote/README.md` §"Layout" line 11 `templates/` enumeration was stale (5 of 7) — completed to include `audit-overlay-template.md` + the new `loop-heartbeat-template.md`.

- [x] Closed — PLAN.md `.3` line flipped to stub `Completed 2026-07-02.` (kept nested under the open epic per cohort convention); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the conditional-skip marker).

**Final Summary:**

Shipped `templates/loop-heartbeat-template.md` — the canonical `.claude/loop.md` shape for heartbeat (recurring-maintenance) loops, instantiating the [[CORE-330.2]] `SPEC/loop.md` contract. Five-section contract: **§1 cheap cycle pre-check** (empty cycles near-free — the per-cycle relevance gate specialized for heartbeats), **§2 ordered first-match-wins duties** (one bounded duty per cycle, ordering = priority; fenced flowtron worked example + neutral placeholders), **§3 PLAN write-back** (one ≤50w line per finding under the task-line grammar, Low/Future default, flood roll-up guardrail), **§4 LOOP-LOG write-back** (one append-only `.flowtron/LOOP-LOG.md` line per cycle incl. empty proof-of-life; last date ≡ `loop-last-run` staleness/death signal; commit-per-verified-iteration), **§5 NEVER envelope** (no tasknote scaffold, no `## Completed`/checkbox edits, no destructive commands → file a PLAN line instead, no task-chaining). Dogfooded live on flowtron-self: pre-check → duty-1 fall-through → duty-2 surfaced a real doc-drift finding, validating the shape end-to-end (that finding — a stale `templates/` list — was folded into this closure). One new template file; markdown-only, no code. Adopter wiring + GLOSSARY + README roster are `.5`; the epic's remaining children are `.4` (`/ft-goal-task` skill) and `.5` (wiring) before the `.6` audit.

**Archived:** 2026-07-02
