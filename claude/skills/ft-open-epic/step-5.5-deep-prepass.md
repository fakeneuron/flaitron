# `--deep` — deep pre-pass (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `ft-open-epic` SKILL.md Step 1.5 when `--deep` is present in `$ARGUMENTS`. Carries the whole of deep mode: what the flag is for, the Step 5 scaffold injection, and the three Step 5.5 pre-pass stages. See `claude/skills/ft-open-epic/SKILL.md` for the always-loaded default flow.

Deep mode adds **staging**, never mechanics. Filing, the `.1` scaffold, the 4-phase workflow, the operator-gate cues, closure, and the post-closure protocol are byte-identical to a default `/ft-open-epic` run. Nothing in this fragment creates a new phase, template, banner, or gate — the three stage gates are AskUserQuestion review prompts, and the two-banner cap is preserved.

## What `--deep` is for

`--deep` is opt-in for **high-uncertainty epics** — those where the shared design surface, contract impact, or per-child scope is genuinely unclear at filing time. For typical epics where the conversation has already crystallized the scope, prefer the default flow. The pre-pass adds three AskUserQuestion review-and-confirm gates between stages; reach for it when that upfront staging is worth the extra interruption.

## Scaffold injection (Step 5)

Applies when Step 5 scaffolds the `.1` Discovery tasknote:

**If `deep-mode = true`** (set in Step 1.5), also inject a `## 🧭 Deep Pre-pass` placeholder section between the `## 🔗 Related` block and the `---` rule that precedes `## 📝 Phase 1: Discovery`, with three empty subsections — `### Constitution`, `### Specification`, `### Clarifications`. Step 5.5 populates them through three discrete review-and-confirm gates before Phase 1 begins. The section is part of the tasknote's permanent body and archives with it at Phase 4 closure.

## Step 5.5 — Deep pre-pass (only on `--deep`)

Skip this entire step if `deep-mode = false` (set in Step 1.5). On `--deep`, drive three discrete stages, writing each stage's output into the `## 🧭 Deep Pre-pass` section already injected into the `.1` tasknote in Step 5. Each stage ends with an AskUserQuestion review-and-confirm gate **before** the next stage begins.

These per-stage gates are **AskUserQuestion-driven review prompts** — not the banner-block 🛠️ / 📦 operator-gate cues from SPEC/gates.md §"Operator-gate cues". The 4-phase workflow's two-banner cap is preserved: the 🛠️ Phase 1→2 banner and the 📦 ready-to-commit banner remain the only banner-blocks in the run. Per SPEC: "Skill-level extensions … bundle into the 📦 gate rather than adding their own banners. … it does not introduce new gates."

### Stage 1 — Constitution

Write the epic's **principles and non-negotiables**: hard constraints, invariants the implementation must preserve, things explicitly out of scope. Source from the conversation context that motivated the epic filing plus Step 2's locked inputs. Update the `### Constitution` subsection of the tasknote.

Per-stage review gate (AskUserQuestion):

- **Looks good — proceed to Specification**
- **Edit before proceeding** (user provides edits inline; revise and re-gate)
- **Restart this stage** (discard and re-draft)

### Stage 2 — Specification

Write the epic's **specification** — a description of WHAT the epic delivers (not HOW). For each implementation child you currently anticipate, state its deliverable + acceptance shape + interaction with other children. This is upfront-thinking that the default Discovery compresses into Phase 1 + Phase 2 child filing; `--deep` separates it out so it can be reviewed in isolation. Update the `### Specification` subsection.

Per-stage review gate (AskUserQuestion): same three options as Stage 1.

### Stage 3 — Clarifications

Surface **open scoping questions** — ambiguities the specification revealed but did not resolve. Use AskUserQuestion to resolve each one with the user. Record the resolved Q&A in a table within the `### Clarifications` subsection.

Per-stage exit gate (AskUserQuestion):

- **All clarifications resolved — exit pre-pass, enter Phase 1 Discovery**
- **More questions to resolve** (re-enter the clarification loop)
- **Restart this stage** (discard and re-draft)

After all three stages clear, the `## 🧭 Deep Pre-pass` section is fully populated. Step 6's Phase 1 Discovery proceeds with this upfront work as ambient context — the Phase 1 checklist still ticks normally; the deep pre-pass does not skip any of it. In particular, Step 6's "clarifying questions" checklist item is usually satisfied directly by Stage 3's resolved-Q&A table (log "Resolved during deep pre-pass — see `## 🧭 Deep Pre-pass` §Clarifications" in the Phase 1 Discovery Notes).
