---
title: subagent-isolation discovery
status: completed
tags: []
created: 2026-08-06
due:
related-tasks: [CORE-EPIC-408, CORE-328.4, CORE-328.2, CORE-330.2]
---

# CORE-408.1 | subagent-isolation discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-408]]

## 🎯 Goal

Scope the `CORE-EPIC-408` epic (`subagent-isolation`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-408.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via structured ask — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-408.2 .. CORE-408.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds") — 48w / 39w / 33w
- [x] Audit line CORE-408.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift) — confirmed unchanged; no scope shift
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children) — 12/12 "no change" as expected

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via structured ask (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-408.2 .. CORE-408.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-408 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-408]] — parent epic
- [[CORE-328.4]] — landed README §"Sessions, loops, and sub-agents" (the "sub-agents get exactly one tasknote" bullet this epic **reconciles**, not strengthens — see Drift #1)
- [[CORE-328.2]] — landed README §"Agent memory" (the persistent-memory framing the handoff thread extends)
- [[CORE-330.2]] — runtime-vs-contract boundary precedent (`SPEC/loop.md` lazy-module shape)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-08-06 in this session from an operator brief. The gap is real and the primitives are already in place — flowtron has `PLAN.md`/tasknote/archive as agent memory ([[CORE-328.2]]) and a sessions/sub-agents discipline ([[CORE-328.4]]), but **no guidance anywhere on isolating noisy exploration inside Phase 1**. Scope is guidance + templates + doc wiring only, which clears [[CORE-328.1]]'s explicit WON'T-FILE of "programmatic sub-agent delegation machinery" and VISION §"What we won't accept".

- [x] Read relevant source files — `SPEC.md` (§"Core principles", §"Tasknote body shape", §"📝 Phase 1: Discovery", §"Loop tasks", §"What flowtron does NOT provide"), `SPEC/epic.md`, `SPEC/blocked.md`, `SPEC/tasknote-selection.md` §"PLAN.md filing-discipline thresholds", `README.md` §"Agent memory" + §"Sessions, loops, and sub-agents", `docs/EXTERNAL-AGENTS.md` (full), `docs/VISION.md` §"What we won't accept", `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (full), `templates/` (tasknote, sidequest, loop-heartbeat, audit-overlay), `.flowtron/tasknote/README.md` §"AI-referenced docs", `.flowtron/PLAN.md`.

- [x] **Best Practices Review** — `N/A`. Epic-Discovery filing; the deliverable is PLAN.md task lines, no code or module boundaries touched.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/` for `sub-agent` / `handoff` / `exploratory`. Load-bearing findings:
  - **[[CORE-328.1]] (load-bearing, constraining).** Its Discovery scoring table lists **"Programmatic sub-agent delegation machinery" → WON'T FILE** ("new moving parts; heaviness; worktrees + .4 guidance already cover the need; ❌ against lightweight ethos"). This epic is guidance + one template + doc wiring — it does **not** reopen that rejection, but every child must be checked against it. Same table also recorded "**No sub-agent / Task-tool concept anywhere**" as gap #1 at that time.
  - **[[CORE-328.4]] (load-bearing, in tension — see Drift #1).** Landed `README.md` §"Sessions, loops, and sub-agents" with the four safe-pattern bullets, including "**Sub-agents get exactly one tasknote.**" Descriptive-only guard held; its own closing was later redrawn by [[CORE-330.2]].
  - **[[CORE-328.2]].** Landed `README.md` §"Agent memory" (tasknote = resume point a sub-agent reads). The handoff thread extends this section's framing, not a new one.
  - **[[CORE-330.2]] (shape precedent).** The exact move this epic repeats: a later epic reconciling a same-surface stance a prior child had just landed, resolved as **"runtime in the runner, contract in flowtron"** and shipped as a lazy SPEC module (`SPEC/loop.md`) + a README boundary redraw + a VISION/SPEC won't-accept mirror. Also: [[CORE-330.5]]/[[CORE-329.2]] establish that shipping a **new skill** fans symlink counts across `docs/MIGRATION.md` + `ft-new-project` + `AGENTS-snippet.md` + `claude/commands/` + `codex/skills/` — a real wiring tail that sizes `.4`.
  - **[[CORE-390]] / [[CORE-392]] (roster pressure).** Both *retired* skills (`/ft-debug` folded into `/ft-task --debug`; `/ft-quality` deleted) to fight roster bloat; roster is 18. Any "tiny skill" in this epic starts against that precedent — folding into an existing skill is the established answer.
  - No archive precedent exists for an exploration-probe or `## 🔄 Handoff` surface — `grep -rn "🔄"` returns **zero hits** repo-wide. Both are genuinely new surfaces.

- [x] **Drift check** — cited paths/concepts verified at HEAD. All seven brief-cited surfaces exist as described: "one tasknote per sub-agent" (`README.md:222`), §"Agent memory" (`README.md:177`), `docs/WORKTREES.md`, the Phase 1 archive skim (`SPEC.md` §"📝 Phase 1: Discovery"), `docs/AGENT-NEUTRALITY.md`, the `claude/` + `codex/` + `grok/` wiring split, and the zero-scripts / Markdown-over-JSON principles (`SPEC.md` §"Core principles" #1–2). **Four drift findings:**

  1. **The brief's framing of thread 1 is off by a category (load-bearing).** The brief says it "strengthens" the existing "sub-agents get exactly one tasknote" rule. It does not — it **contradicts it as written**. That rule requires a delegated context to *own* one tasknote and inherit its Phase 1 record; "anything broader belongs to the operator's session." A read-only exploration probe owns **no** tasknote: it never runs Phase 1, never gates, never closes, never archives. Under the current README wording that probe *is* the "free-roaming sub-agent" the section warns against. So `.2`'s real job is a **reconciliation**: name two distinct categories (a **probe** that owns nothing and returns a summary vs a **delegate** that owns exactly one tasknote) and redraw the bullet — structurally the [[CORE-330.2]] move, not a wording tweak. Scoped into `.2` and surfaced to the operator (see Resolved scoping Q2).
  2. **`docs/EXTERNAL-AGENTS.md` already owns a "Handoff Contract" — different meaning, collision risk.** It defines handoff as *transferring a whole tasknote to another agent* (three inputs: tasknote + `SPEC.md` + `PLAN.md`), explicitly **after** Phase 1 so the receiver executes rather than re-scopes. The brief's `## 🔄 Handoff` is *mid-task state capture for resume by anyone, including yourself*. Distinct concepts sharing one word. `.3` must cross-reference that doc and not restate it; the brief's claim that this is a wholly new surface is inaccurate.
  3. **`docs/EXTERNAL-AGENTS.md` is not in the `.flowtron/tasknote/README.md` §"AI-referenced docs" ledger** (12 entries; it is absent). The Phase 4 doc-drift sweep and the `.N` audit's fixed sweep line will therefore **not** catch drift there — exactly the doc this epic is most likely to drift against. `.4` owns the ledger decision.
  4. **`claude/CAPABILITIES.md` has no sub-agent / Task-tool trigger row** (8 rows: effort, `--fast`, `--debug`, `--worktree`, `--park`, `/model`, `/clear`, structured ask). That table's fixed four-column shape (*what it is · syntax · what it controls in flowtron · when to reach for it*) is the designated home for Claude-Code subagent invocation mechanics, and `docs/PLATFORMS.md` §"Non-Claude capability triggers" is where Codex/Grok file their equivalents. This is the pre-existing seam the brief's "platform wiring layer" requirement asks for — no new structure needed. Sized into `.4`.

  No drift against the `PLAN.md` line (filed minutes ago in this session) or any SPEC contract this Discovery contradicts.

- [x] Asked clarifying questions — four surfaced via structured ask; all resolved (see "Resolved scoping" below). Every answer landed on the lightest option, which shrinks `.4` materially (no skill ⇒ no symlink fan-out).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface

| Surface | Role in this epic | Likely child |
|---|---|---|
| `README.md` §"Sessions, loops, and sub-agents" | The four safe-pattern bullets; bullet 4 is the one needing reconciliation (Drift #1) | `.2` |
| `README.md` §"Agent memory" | Tasknote-as-resume-point framing the handoff thread extends | `.3` |
| `SPEC.md` §"📝 Phase 1: Discovery" | Where an "isolate broad search" prompt would land in the mandatory checklist | `.2` |
| `SPEC.md` §"Tasknote body shape" | Canonical body layout — gates whether `## 🔄 Handoff` is a template section or a documented-on-demand one | `.3` |
| `SPEC/` lazy modules | `SPEC/loop.md` is the shape precedent if the isolation contract wants its own module | `.2` |
| `templates/tasknote-template.md` | Only file that decides whether every future scaffold carries a Handoff section | `.3` |
| `templates/` (non-tasknote) | `audit-overlay` / `loop-heartbeat` / `sidequest` precedent for a standalone pasteable template | `.2` |
| `docs/EXTERNAL-AGENTS.md` | Pre-existing "Handoff Contract" — must be cross-referenced, not duplicated (Drift #2) | `.3` + `.4` |
| `docs/VISION.md` §"What we won't accept" + `SPEC.md` terse mirror | The 1:1 mirror pair that pins "no orchestration/fan-out runtime" | `.2` or `.4` |
| `claude/CAPABILITIES.md` trigger table | Home for Claude subagent invocation syntax (Drift #4) | `.4` |
| `docs/PLATFORMS.md` §"Non-Claude capability triggers" | Home for the Codex/Grok isolation approximations | `.4` |
| `docs/AGENT-NEUTRALITY.md` ledger | Records any new intentional Claude-specific contract-layer reference | `.4` |
| `.flowtron/tasknote/README.md` §"AI-referenced docs" | 12-entry ledger; missing `EXTERNAL-AGENTS.md` (Drift #3) | `.4` |
| `docs/GLOSSARY.md` (~60 entries) | New vocabulary (probe / delegate / Handoff) needs entries | `.4` |
| `claude/skills/*`, `codex/skills/*`, `claude/commands/`, `AGENTS-snippet.md`, `docs/MIGRATION.md` | Symlink fan-out — **only if** a new skill ships (roster is 18; [[CORE-390]]/[[CORE-392]] retired two) | `.4` |

### Adjacent surfaces deliberately *not* in scope

- **`.flowtron/sidequest/` + `/ft-file-followup --park`** — parks a *new* idea as a *new* task. The handoff thread preserves *the current* task's resume state. Adjacent, non-overlapping; `.3` should not touch park mode.
- **`docs/WORKTREES.md`** — isolation of *execution*, already locked five ways. This epic isolates *exploration*. Cite, don't restate ([[CORE-328.4]] precedent).
- **`SPEC/loop.md`** — borrows its module *shape*, not its content.

### Resolved scoping

| # | Question | Resolution | Consequence |
|---|---|---|---|
| Q1 | Drift #1 — how does `.2` reconcile "sub-agents get exactly one tasknote" with a probe that owns none? | **Two named categories.** `README.md` bullet 4 splits into **probe** (owns no tasknote; reads/searches; returns a distilled summary; never runs Phase 1, never gates, never archives; output lands in the parent's Discovery Notes) and **delegate** (owns exactly one tasknote; inherits its full Phase 1 record; anything broader belongs to the operator's session). | `.2` is a boundary redraw in the [[CORE-330.2]] mould, not a wording tweak. "Probe" / "delegate" become contract vocabulary → GLOSSARY entries in `.4`. |
| Q2 | Where does the isolation contract live? | **`README.md` redraw + one `SPEC.md` Phase 1 Discovery checklist prompt.** No new lazy module. | Follows the [[CORE-328.4]] descriptive-doc precedent. `SPEC/isolation.md` explicitly **not** filed — revisit only if the contract outgrows a few paragraphs. Keeps `.2` to two prose surfaces + one template. |
| Q3 | What shape is the optional `## 🔄 Handoff` section? | **Documented, not templated.** `SPEC.md` §"Tasknote body shape" documents it as an optional insert with a fixed shape; `templates/tasknote-template.md` is **unchanged**. | Zero cost to the single-session happy path — the section exists only when a session writes one. Directly satisfies the brief's "does not change the normal happy path" criterion. No migration for existing tasknotes. |
| Q4 | Ship a skill to generate the Handoff? | **No new skill.** Pure convention — any session writes the section from the documented shape. | Roster stays 18. Avoids the five-surface symlink fan-out ([[CORE-329.2]]/[[CORE-330.5]] precedent: `docs/MIGRATION.md` + `ft-new-project` + `AGENTS-snippet.md` + `claude/commands/` + `codex/skills/`), which was most of `.4`'s projected weight. Consistent with [[CORE-390]]/[[CORE-392]] roster-bloat pressure. |

### Child breakdown (M unchanged at 3)

- **`.2` isolation-contract** — the probe/delegate redraw + Phase 1 prompt + the pasteable return-shape template. Primary thread.
- **`.3` portable-handoff** — the optional documented section. Secondary thread; independent of `.2` (could run in either order, but `.2` first establishes the vocabulary).
- **`.4` wiring-and-doc-sync** — platform-layer invocation mechanics + ledger/glossary sync. Runs last; depends on both.
- **`.N` audit** — reviewed and confirmed as filed; the fixed doc-drift sweep line is exactly right for an epic whose blast radius is documentation, and Drift #3 (`docs/EXTERNAL-AGENTS.md` missing from the ledger) is the sort of gap it exists to catch.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the [[CORE-EPIC-389]] and [[CORE-EPIC-330]] child cohorts are the closest precedent for cohort-children filing: 2-space indent under the parent, `[<model>]` token preserved on every line, ` — ` em-dash separator, per-child long description ≤50w target / 70w hard cap. Extended, not re-shaped.

- [x] **Minimal refactor gate** — `N/A`. PLAN.md line filing only; no code path touched.

- [x] Implemented the minimal solution — three child lines (`CORE-408.2` / `.3` / `.4`) written into `.flowtron/PLAN.md` directly beneath `CORE-408.1`, ahead of the terminal `CORE-408.N` audit line, 2-space nested under `CORE-EPIC-408` in `## High`.

- [x] Updated/added tests for non-trivial behavior — `N/A`. No executable surface.

**Implementation Notes:**

- **Lines written:** 3 (`.2` isolation-contract · `.3` portable-handoff · `.4` wiring-and-doc-sync).
- **Word counts** (long description, first ` — ` split): `.2` = 48w · `.3` = 39w · `.4` = 33w · parent `CORE-EPIC-408` = 45w. All under the 50w target; none near the 70w hard cap.
- **M unchanged at 3** from the filing-time estimate. Q4's "no new skill" resolution shrank `.4`'s projected weight (the five-surface symlink fan-out dropped out) but did not remove enough to justify folding it into `.3` — the platform-layer and ledger work is a distinct reviewable surface, and it must run *after* both feature children land. The audit's reserved `.N` suffix is unaffected and did not renumber.
- **Model token:** the operator's locked `[heavy]🧠` was applied uniformly to every line this skill wrote. `.3` and `.4` are arguably `[medium]🧩` work on their merits (documented-section prose and ledger/table sync respectively, both with the design decisions already made here); flagged for the operator to downgrade if desired, not silently changed.
- **Downstream-impact reconciliation scan:** **no downstream impact.** The active PLAN was empty at filing — `## High` and `## Medium` both carried `(none)` placeholders, `## Low` and `## Future Opportunities` were empty. The `## High` placeholder was consumed by the parent epic. No existing active entry shares a surface with any new child, so no reconcile action was proposed or applied.
- **Audit line reviewed:** `CORE-408.N` confirmed as filed, unchanged. Its fixed doc-drift sweep acceptance line is well matched to an epic whose entire blast radius is documentation — and Drift #3 (`docs/EXTERNAL-AGENTS.md` absent from the AI-referenced-docs ledger) is precisely the class of gap it exists to catch.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`. Markdown-prose edits only; no test surface.

- [x] Ran lint/type-check on changed code — `N/A`. No code changed.

- [x] **Quality assertions** — `N/A`. No code changed.

- [x] (frontend) Asked the user for visual confirmation — `N/A`. No frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass over the edited `## High` block — all clean: 2-space child indent on all five nested rows · `**<ID>**` bold intact · `[heavy]🧠` present on every line · `| <shortname>` present and ≤30 chars (`subagent-isolation` 18 · `isolation-contract` 18 · `portable-handoff` 16 · `wiring-and-doc-sync` 19) · ` — ` em-dash separator consistent · long descriptions 45/48/39/33w, all ≤50w target · `grep -n " $"` returns no trailing whitespace · `.N` sorts last, after `.4` · no reconcile-edited existing lines to re-check (no downstream impact).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 AI-referenced-docs entries: **no change**. Pure PLAN.md filing; every contract edit this epic implies lands inside `.2` / `.3` / `.4`.
  - `README.md` — no change (§"Sessions, loops, and sub-agents" redraw is `.2`'s deliverable).
  - `SPEC.md` — no change (Phase 1 checklist prompt is `.2`; §"Tasknote body shape" insert is `.3`).
  - `docs/MIGRATION.md` — no change (Q4 resolved no new skill ⇒ no symlink fan-out, now or later).
  - `claude/AGENTS-snippet.md` — no change (same reason).
  - `codex/AGENTS-snippet.md` — no change (same reason).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change (markdown contract; no new attack surface).
  - `docs/AGENT-NEUTRALITY.md` — no change **now**; `.4` owns any new ledger row.
  - `docs/PLATFORMS.md` — no change **now**; `.4` owns the §"Non-Claude capability triggers" entries.
  - `claude/CAPABILITIES.md` — no change **now**; `.4` owns the sub-agent trigger row (Drift #4).
  - `docs/AGENT-COMPAT.md` — no change.
  - **Ledger gap noted, not fixed here:** `docs/EXTERNAL-AGENTS.md` is absent from this 12-entry list (Drift #3). Deliberately left to `.4`, which owns the add/decline decision — filing it mid-Discovery would be scope creep.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary; surfaced inline on the 📦 conditional-skip branch.

**Final Summary:**

Filed `CORE-EPIC-408` (`subagent-isolation`, High, `[heavy]🧠`, M=3) with its `.1` Discovery and reserved `.N` audit, then drove the Discovery to closure. Three implementation children scoped and written to PLAN.md: **`.2` isolation-contract** (README §"Sessions, loops, and sub-agents" bullet-4 split into probe/delegate, one SPEC.md Phase 1 checklist prompt, new `templates/subagent-probe-template.md` return shape) · **`.3` portable-handoff** (optional `## 🔄 Handoff` documented in SPEC.md §"Tasknote body shape", template untouched) · **`.4` wiring-and-doc-sync** (CAPABILITIES.md trigger row, PLATFORMS.md non-Claude equivalents, AGENT-NEUTRALITY + GLOSSARY + AI-referenced-docs ledgers).

**Load-bearing Discovery finding.** The brief framed thread 1 as *strengthening* the existing "Sub-agents get exactly one tasknote" rule ([[CORE-328.4]], `README.md:222`). It does the opposite: that rule requires a delegated context to *own* a tasknote and inherit its Phase 1 record, while an exploration probe owns none — under the current wording a probe *is* the "free-roaming sub-agent" the section warns against. Operator resolved via **two named categories** (probe = owns nothing, returns a distilled summary, never enters the lifecycle; delegate = owns exactly one tasknote), making `.2` a boundary redraw in the [[CORE-330.2]] mould rather than a wording tweak.

**Second finding.** `docs/EXTERNAL-AGENTS.md` already carries a "Handoff Contract" — but it means *whole-tasknote transfer to another agent, after Phase 1*, not mid-task resume state. Same word, different concept; `.3` cross-references it rather than restating. That doc is also missing from the AI-referenced-docs ledger, so no Phase 4 sweep guards it today — routed to `.4`.

**Constraint honoured.** [[CORE-328.1]] explicitly won't-filed "programmatic sub-agent delegation machinery" (heaviness / lightweight-ethos fail). Every child was checked against it: guidance prose, one pasteable template, and doc wiring only — no runner, scheduler, orchestration graph, mandatory field, or new skill. All four scoping questions resolved on the lightest available option; Q4's "no new skill" (consistent with [[CORE-390]]/[[CORE-392]] roster-bloat pressure) removed the five-surface symlink fan-out that would otherwise have dominated `.4`.

**Verification.** Long descriptions 45/48/39/33w (all ≤50w target, none near the 70w cap); markdown mental-pass clean on indent, bold IDs, model tokens, shortname lengths, em-dashes, trailing whitespace, `.N` sort order. Doc-drift sweep: 12/12 **no change**. Downstream-impact reconciliation: **no downstream impact** (active PLAN was empty at filing). M unchanged at 3; `.N` did not renumber.

**Archived:** 2026-08-06
