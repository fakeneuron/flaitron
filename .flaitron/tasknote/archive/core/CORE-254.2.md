---
title: cue-vocabulary
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-254, CORE-254.1, CORE-254.3]
---

# CORE-254.2 | cue-vocabulary

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]] [[CORE-254.1]] [[CORE-254.3]]

## 🎯 Goal

Define the canonical operator-cue vocabulary — dedicated glyphs paired with UPPERCASE word labels for DB-command, executable/run, and user-action events, plus reaffirmed landmark (🛠️📦🏁✅) and light/heavy (🔧🧠) next-task cues — as a single cue table that CORE-254.3 codifies into the contract and CORE-254.4 wires into skills.

## ✅ Acceptance

- [ ] A single canonical cue table is recorded in this tasknote covering: the three newly-minted event cues (DB-command, executable/run, user-action), the reaffirmed landmark cues (🛠️📦🏁✅), the reaffirmed inline asks (🟢👁️🔍), and the light/heavy next-task cues (🔧🧠)
- [ ] Each newly-minted cue specifies its glyph, UPPERCASE word label, default emission shape (inline prefix), and one-line trigger
- [ ] The glyph+UPPERCASE-label convention is stated explicitly with its non-render-survival rationale (the cross-agent fallback mechanics themselves are CORE-254.5's deliverable)
- [ ] Table notes that destructive DB/executable variants MAY escalate to a banner, deferring the bounded escalation contract to CORE-254.3 (no contract edits land here)
- [ ] No edits to SPEC/gates.md, SPEC.md core, or any skill prose (codification = .3, wiring = .4) — the deliverable is the table only

## 🧩 Subtasks

- [ ] Inventory the existing cue surface from SPEC/gates.md + SPEC.md core (landmark banners, inline markers, inline asks, next-task cues) — populated in Discovery
- [ ] Resolve the specific glyph + word-label for each of the three new event cues (confirm/refine the .1-floated 🗄️ DB / ▶️ RUN / ✋ ACTION via AskUserQuestion)
- [ ] Decide whether existing inline asks (🟢👁️🔍) are retrofitted with word labels or reaffirmed as-is — record the decision + rationale
- [ ] Phase 2: write the complete canonical cue table into this tasknote's Execution Notes (the deliverable artifact .3 reads from archive)
- [ ] Phase 3: markdown mental-pass on the table (glyph uniqueness, label-casing consistency, no glyph collisions with existing cues)
- [ ] Phase 4: doc-drift sweep + flip .2 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-254]] — parent epic (cross-agent-operator-cues)
- [[CORE-254.1]] — Discovery that filed this child + resolved the four scoping questions
- [[CORE-254.3]] — codifies this table into SPEC/gates.md + SPEC.md core (and carries the 2-banner-cap revision)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** First implementation child of CORE-EPIC-254 after the .1 Discovery (closed 2026-05-31). The cue table is the upstream dependency for .3 (codify) and .4 (wire) — must land first. Scope is unchanged from the filed line.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Existing cue surface inventoried** (from `SPEC/gates.md` + `SPEC.md` core — the table .3 will codify against):

| Existing cue | Glyph | Kind | Where specced |
|---|---|---|---|
| Phase 1→2 exit | 🛠️ | Banner (`AWAITING APPROVAL — Phase 2: Execution ready`) | gates.md §"Operator-gate cues" |
| Ready-to-commit | 📦 | Banner (`AWAITING APPROVAL — Ready to commit`) | gates.md §"Operator-gate cues" |
| Committed state-marker | 🏁 | Inline marker | SPEC.md §"Post-closure protocol" §2 |
| Phase/closure complete | ✅ | Inline marker (`Phase 1 … complete`; `Closure complete; committing autonomously …`) | gates.md §"Phase 1→2 exit gate" / §"Conditional skip rule" |
| Commit-go | 🟢 | Inline ask prefix (`Reply commit / go`) | SPEC.md §"Post-closure protocol" §1 |
| Visual-confirm | 👁️ | Inline ask prefix | SPEC.md §"🧪 Phase 3" |
| Audit-family flag | 🔍 | Inline next-move flag | SPEC.md §"Post-closure protocol" §2 |
| Light next-task | 🔧 | Next-task cue | SPEC.md §"Post-closure protocol" §2-3 |
| Heavy next-task | 🧠 | Next-task cue | SPEC.md §"Post-closure protocol" §2-3 |

**Gap (from .1):** no glyph for DB-command, executable/run, or user-action events. The brief asks for three new glyph+UPPERCASE-label cues for these.

**Archive skim:** Relied on .1's catalogue (CORE-059 visual gate cues, CORE-065 2-banner cap, CORE-068 🏁 marker, CORE-184/190 🔍 audit flag, CORE-189 copy-paste grammar, CORE-208.x 🔧🧠 suggestions, CORE-211.x agent-neutral cue framing, CORE-224.x AGENT-COMPAT). No new precedents on the cue-table-definition source surface beyond .1's findings. **Invariants to respect:** CORE-065 2-banner cap (its revision is .3's load, not .2's) and CORE-211 agent-neutral framing (new glyph+label cues are agent-neutral by construction).

**Drift check:** No drift. `SPEC/gates.md` §"Operator-gate cues" + §"Conditional skip rule" and `SPEC.md` §"Post-closure protocol" match the cited structure at HEAD. The `.1` archive's "Refined child scopes" matches the live PLAN lines for `.2`–`.6`.

**Resolved clarifications (AskUserQuestion):**

| # | Question | Resolution |
|---|---|---|
| 1 | DB-command glyph | **🗄️ DB** (.1-floated; confirmed) |
| 2 | Executable/run glyph | **▶️ RUN** (.1-floated; confirmed) |
| 3 | User-action glyph | **✋ ACTION** (.1-floated; confirmed) |
| 4 | Retrofit existing inline asks with word labels? | **Yes — retrofit all** → 🟢 GO / 👁️ CONFIRM / 🔍 AUDIT, for full cross-agent non-render survival |

**Scope note (cross-cutting):** Q4's "retrofit all" answer expands the relabeling convention beyond the three new cues to the existing inline asks (🟢/👁️/🔍). This is a deliberate operator choice that broadens downstream scope: `.3` must codify the retrofit labels and `.4` must update the existing emission sites (commit-go, visual-confirm, audit-flag) to carry their labels — beyond what those children's PLAN lines currently name. `.2` itself still produces only the table (zero file edits); the downstream-scope flag is surfaced at the 🛠️ gate for operator confirmation.

**Discovery surfaced a cross-cutting concern (retrofit-all expands .3/.4 scope) → fire 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: the existing cue surface (`SPEC/gates.md` banner table + the inline markers/asks specced across `SPEC.md` §"Post-closure protocol" / §"Phase 3") is the shape to extend. The new event cues follow the established **inline-prefix** shape of 👁️/🟢 (glyph + short directive), not the banner shape of 🛠️/📦 — banners stay reserved for the two approval pauses (escalation is bounded by `.3`). Tests N/A: the deliverable is a markdown table, no executable surface.

---

### CANONICAL OPERATOR-CUE VOCABULARY (CORE-EPIC-254)

> Deliverable of CORE-254.2. This is the single source the contract child
> (CORE-254.3) codifies into `SPEC/gates.md` + `SPEC.md` core, and the
> wiring child (CORE-254.4) threads into skill prose. **No contract or
> skill edits land in .2** — this table is the spec those children build to.

**Labeling convention.** Every operator cue is `<glyph> <UPPERCASE-LABEL>` —
a dedicated glyph paired with a short UPPERCASE word label. The word label is
load-bearing, not decorative: if an agent surface fails to render the emoji
(or strips it), the UPPERCASE label still names the cue in plain text. The
glyph is the fast-scan signal; the label is the cross-agent fallback. (The
fallback *mechanics* and per-agent render/emit verification are CORE-254.5's
deliverable; .2 only fixes the vocabulary.)

**Casing rule.** Labels are UPPERCASE single words (or tight compounds);
glyphs are single code points (a trailing VS16 `️` for emoji presentation is
part of the glyph, not a second symbol). Each glyph is unique across the
table — no glyph carries two meanings.

#### 1 — Newly-minted event cues (this epic's net-new vocabulary)

Default emission shape is an **inline prefix** on the conversational line —
the 👁️/🟢 shape, never a banner by default.

| Cue | Glyph | Label | Default shape | Fires when | Example |
|---|---|---|---|---|---|
| DB-command | 🗄️ | `DB` | inline prefix | The operator should run a database / migration / schema command | `🗄️ DB: run \`alembic upgrade head\` to apply the migration` |
| Executable / run | ▶️ | `RUN` | inline prefix | The operator should run a non-DB command or executable step (build, script, server start) — distinct from commit-go and visual-confirm | `▶️ RUN: \`npm run build\`, then verify the bundle output` |
| User-action | ✋ | `ACTION` | inline prefix | The operator must perform a manual, non-command action (paste a secret, click a link, approve out-of-band) | `✋ ACTION: paste your API key into \`.env\` before continuing` |

**Escalation (bounded — contract owned by .3).** A **destructive** DB or
executable cue (irreversible migration, data-dropping command, force-push,
etc.) MAY escalate from inline prefix to a blocking banner — a deliberate,
bounded revision of the CORE-065 two-banner cap. The escalation predicate,
banner format, and the bound that keeps cues inline-by-default are
**CORE-254.3's** to codify; .2 records only that the escalation path exists
and that non-destructive uses stay inline.

#### 2 — Retrofitted inline asks (existing cues, now carrying word labels)

Per the operator decision in Discovery (Q4 = retrofit all), the existing
inline asks adopt the same glyph+label convention for cross-agent
non-render survival. Glyphs are unchanged; the UPPERCASE label is added.

| Cue | Glyph | Label (new) | Shape | Was |
|---|---|---|---|---|
| Commit-go | 🟢 | `GO` | inline ask prefix | `🟢` + prose (`Reply commit / go to land`) |
| Visual-confirm | 👁️ | `CONFIRM` | inline ask prefix | `👁️` + prose (visual-confirmation ask) |
| Audit-family flag | 🔍 | `AUDIT` | inline next-move flag | `🔍` + `/ft-audit*` candidate/copy-paste line |

#### 3 — Reaffirmed landmark cues (unchanged — inventoried for completeness)

The two approval banners and the two inline state markers keep their existing
glyphs and existing label text. Banners already carry UPPERCASE labels inside
`AWAITING APPROVAL — …`; the inline markers are reaffirmed as-is.

| Cue | Glyph | Label / marker text | Shape |
|---|---|---|---|
| Phase 1→2 exit | 🛠️ | `AWAITING APPROVAL — Phase 2: Execution ready` | Banner |
| Ready-to-commit | 📦 | `AWAITING APPROVAL — Ready to commit` | Banner |
| Committed | 🏁 | `<TASK-ID> — committed <sha>` | Inline state-marker |
| Phase/closure complete | ✅ | `Phase 1 … complete` / `Closure complete; committing autonomously …` | Inline marker |

#### 4 — Reaffirmed next-task cues (unchanged)

| Cue | Glyph | Label | Shape |
|---|---|---|---|
| Light next-task | 🔧 | `LIGHT` (mechanical) | Next-move suggestion + copy-paste line |
| Heavy next-task | 🧠 | `HEAVY` (design) | Next-move suggestion + copy-paste line |

The light/heavy glyphs are reaffirmed (the brief flagged them as
firing unreliably — making them fire dependably is **CORE-254.4** wiring,
not a vocabulary change). The optional `LIGHT`/`HEAVY` labels are available
for non-render fallback if .4/.5 find the bare 🔧/🧠 glyphs insufficient.

#### Downstream impact (for .3 / .4 scoping)

- **CORE-254.3 (codify):** add §1–§4 to `SPEC/gates.md` (+ a glossary entry
  in `SPEC.md` core); codify the retrofit labels (§2) and the bounded
  escalation contract for destructive 🗄️/▶️ cues (revising the CORE-065 cap).
- **CORE-254.4 (wire):** thread 🗄️/▶️/✋ into skill prose at the right moments;
  update the existing 🟢/👁️/🔍 emission sites to carry their `GO`/`CONFIRM`/`AUDIT`
  labels (retrofit per §2 — beyond the three new cues that line currently names);
  make 🔧/🧠 next-task cues emit reliably.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-prose deliverable only — no test / lint / frontend surface (all three N/A). Markdown mental-pass on the cue table:

- **Glyph uniqueness:** 11 cues, 11 distinct glyphs (🗄️ ▶️ ✋ 🟢 👁️ 🔍 🛠️ 📦 🏁 ✅ 🔧 🧠) — no glyph carries two meanings, no collision between new cues and existing ones.
- **Label casing:** all labels UPPERCASE single words (`DB`, `RUN`, `ACTION`, `GO`, `CONFIRM`, `AUDIT`, `LIGHT`, `HEAVY`); banner labels keep their existing `AWAITING APPROVAL — …` text.
- **Table integrity:** all four sub-tables have consistent column counts and aligned pipes; inline code spans for command examples render correctly; the escalation note correctly defers the bounded contract to .3 (no contract assertions made in .2).
- **Scope guard:** zero edits to `SPEC/gates.md`, `SPEC.md`, or any skill file — confirmed the only changed file is this tasknote.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Pure vocabulary-definition deliverable — the table lives in this tasknote; codification into the contract is `.3` and wiring is `.4`. No AI-referenced doc edited. Per-entry verdict:
  - `README.md` — no change
  - `SPEC.md` — no change (cue glossary lands in `.3`)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (the glyph+label cues are agent-neutral by construction; ledger review belongs to `.3`/`.5`)
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change (cross-agent verification currency lands in `.5`)
  - `docs/AGENT-COMPAT.md` — no change (matrix-row refresh lands in `.5`)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Defined the canonical operator-cue vocabulary for CORE-EPIC-254 — a single cue table recorded in this tasknote (the spec `.3` codifies and `.4` wires). Minted three net-new inline-prefix cues with the glyph+UPPERCASE-label convention: **🗄️ DB** (database/migration command), **▶️ RUN** (executable/run step), **✋ ACTION** (manual user action). Per operator choice, retrofitted the existing inline asks with word labels (**🟢 GO**, **👁️ CONFIRM**, **🔍 AUDIT**) for cross-agent non-render survival, and reaffirmed the landmark (🛠️📦🏁✅) and next-task (🔧🧠) cues unchanged. Recorded the bounded-escalation note (destructive 🗄️/▶️ MAY become a banner — contract owned by `.3`, revising the CORE-065 two-banner cap) and a downstream-impact note flagging that the retrofit expands `.3`/`.4` scope beyond their current PLAN lines. No contract or skill edits in `.2` — the deliverable is the table only.

**Archived:** 2026-06-01
