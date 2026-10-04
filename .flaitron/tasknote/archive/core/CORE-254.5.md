---
title: cue-cross-agent
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-254, CORE-254.1, CORE-254.2, CORE-254.3, CORE-254.4]
---

# CORE-254.5 | cue-cross-agent

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]] [[CORE-254.1]] [[CORE-254.2]] [[CORE-254.3]] [[CORE-254.4]]

## 🎯 Goal

Write the cross-agent cue fallback policy (glyph + UPPERCASE word label survives non-render) into `docs/AGENT-COMPAT.md`, verify cue rendering/emission across Claude / Grok / Codex, and refresh the AGENT-COMPAT.md + CAPABILITIES.md verification-currency rows — closing the epic's "reliable and familiar across agents" brief ask.

## ✅ Acceptance

- [ ] `docs/AGENT-COMPAT.md` carries a lean, dedicated cross-agent cue fallback-policy section: the non-render failure modes (emoji stripped / tofu / mojibake), the rule that the UPPERCASE ASCII label is the durable signal (glyph = fast-scan accelerator, label = authoritative token), and why this makes per-agent emoji dogfooding a non-prerequisite for cue legibility. No full per-cue table (defers to `SPEC/gates.md` §"Operator-cue vocabulary" to avoid bloat).
- [ ] The Claude rows in both `docs/AGENT-COMPAT.md` (matrix) and `claude/CAPABILITIES.md` (§"Last verified") are refreshed from the stale `v4.3.0 · 2026-05-30` to current `v4.4.0 · 2026-06-01 (dogfooded)`.
- [ ] Grok/Codex currency cells are left honest (no fabricated `dogfooded`); the doc makes their live cue-render dogfooding the natural next currency refresh (covered by the existing §"Reading the cells" update obligation).
- [ ] `claude/CAPABILITIES.md`'s `--fast` row folds in the `.3`-deferred nuance: `--fast` does **not** suppress a destructive-action banner (per `SPEC/gates.md` §"`--fast` operator override").
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs": per-entry "no change" or the update (AGENT-COMPAT.md + CAPABILITIES.md are both on the list and both edited here).

## 🧩 Subtasks

- [ ] Phase 2: add the `## Cross-agent cue fallback policy` section to `docs/AGENT-COMPAT.md` (lean prose; failure modes + durable-label rule + non-prerequisite rationale; cross-link to gates.md vocabulary).
- [ ] Phase 2: refresh the Claude matrix-row `Last verified` cell in `docs/AGENT-COMPAT.md` to `v4.4.0 · 2026-06-01 (dogfooded)`; leave Grok/Codex cells unchanged (honest).
- [ ] Phase 2: refresh `claude/CAPABILITIES.md` §"Last verified" to `v4.4.0 · 2026-06-01 (dogfooded)` and fold the destructive-banner non-suppression nuance into the `--fast` row.
- [ ] Phase 3: markdown mental-pass (section anchors, table integrity, glyph/label accuracy vs gates.md, cross-ref correctness, no stale-version residue).
- [ ] Phase 4: doc-drift sweep + flip `.5` PLAN line to stub form + archive tasknote.

## 🔗 Related

- [[CORE-EPIC-254]] — parent epic (cross-agent-operator-cues)
- [[CORE-254.1]] — Discovery; scoping Q4 = policy + verify across Claude/Grok/Codex
- [[CORE-254.2]] — defined the canonical cue vocabulary + glyph+UPPERCASE-label convention
- [[CORE-254.3]] — codified the vocabulary into SPEC/gates.md; deferred fallback mechanics + verification here
- [[CORE-254.4]] — wired labels into skill emission sites (upstream complete)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Final implementation child of CORE-EPIC-254 (`.6` is the audit). All upstream children closed: `.2` minted the glyph+UPPERCASE-label convention, `.3` codified it into `SPEC/gates.md` and explicitly deferred "the fallback mechanics and per-agent render/emit verification" here (gates.md §"Operator-cue vocabulary"), `.4` wired the labels into emission sites. Scope unchanged from the filed line.

- [x] Read relevant source files — `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `SPEC/gates.md` §"Operator-cue vocabulary", `_project/tasknote/README.md` §"AI-referenced docs".

- [x] **Archive skim** — surfaced prior decisions on the cross-agent / cue surface.

- [x] **Drift check** — file paths and structure cited in the task description still match HEAD.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source surface confirmed at HEAD:**

- `docs/AGENT-COMPAT.md` — the living matrix (7 rows). Claude Code = `v4.3.0 · 2026-05-30 (dogfooded)`; Grok Build = `docs-only · 2026-05 (pre-adoption)`; Codex CLI = `unverified`. §"Reading the cells" defines the `last-verified` format + the three context tags (`dogfooded` / `docs-only · … (pre-adoption)` / `unverified`) and the update obligation. §"Pre-adoption verification" is explicit: only Claude is dogfooded; the other six rest on vendor docs + launch coverage, **not** a flowtron session. gates.md §"Operator-cue vocabulary" forward-points *here* for the fallback mechanics + verification — so the fallback policy section lands in this doc.
- `claude/CAPABILITIES.md` — Claude capability-trigger reference. §"Last verified" = `v4.3.0 · 2026-05-30 (dogfooded)`. `.3` flagged that the `--fast` row's destructive-banner non-suppression nuance was left "for `.4`/`.5` to fold in when they touch CAPABILITIES for cross-agent currency."
- `SPEC/gates.md` §"Operator-cue vocabulary" — the codified contract. "Labeling convention" already states the fallback principle (label survives non-render) and explicitly tags the *mechanics* + verification as CORE-254.5's deliverable, pointing here is not needed — it points to AGENT-COMPAT.md. **No gates.md edit in scope** (it's a `paths: []` lazy module, not an AI-referenced cold-start doc; contract already codified in `.3`).

**Archive skim findings (load-bearing):**
- **CORE-EPIC-224** (`.1`–`.6`) — origin of AGENT-COMPAT.md + CAPABILITIES.md + the `last-verified` currency contract. CORE-224.5 (`last-verified-currency`) established the format + update obligation this task must honor. The matrix's honesty posture (only Claude dogfooded; everything else pre-adoption) is a deliberate CORE-224 invariant — must not fabricate a dogfooded stamp for Grok/Codex.
- **CORE-254.1/.2/.3/.4** — direct epic siblings (read in full). `.3`'s closure notes are the precise handoff: fallback mechanics + per-agent verification + CAPABILITIES `--fast`-nuance fold-in are this task's lane.
- **CORE-211.x** (gate-clarity-agent-neutral) — cue framing stays agent-neutral; the glyph+UPPERCASE-label policy satisfies this by construction.
- No prior tasknote wrote a "cue fallback policy" — this is net-new prose; no precedent shape to extend beyond AGENT-COMPAT.md's existing section style.

**Drift check:** No drift. All cited paths exist at HEAD with the cited structure. The two `last-verified` stamps are both `v4.3.0 · 2026-05-30 (dogfooded)`; current released version is v4.4.0 (SPEC.md:3) — so a currency refresh is genuinely warranted independent of this task's cross-agent work.

**Honesty constraint (non-negotiable, from CORE-224 + AGENT-COMPAT.md's own contract):** This session runs under Claude (Opus 4.8) only. I can dogfood-verify the Claude row (the cues render in this very terminal). I **cannot** run a flowtron session under Grok or Codex here, so I must **not** fabricate a `dogfooded` stamp for them. The fallback policy is precisely the mechanism that makes per-agent dogfooding unnecessary for *correctness*: the UPPERCASE ASCII label survives even total emoji loss.

**Resolved clarifications (AskUserQuestion):**

| # | Question | Resolution |
|---|---|---|
| 1 | Grok/Codex currency posture given the honesty constraint | **Operator runs Grok next, then Codex once available** — live cross-agent dogfooding is the operator's imminent follow-up, not this session's. This task delivers the fallback policy + refreshes the **Claude** rows to current-dogfooded; Grok/Codex currency cells stay honest (unchanged), with their live cue-render refresh covered by AGENT-COMPAT.md §"Reading the cells" standing update obligation. |
| 2 | Fallback-policy shape in AGENT-COMPAT.md | **Whichever is most AI-readable with minimal context bloat** → lean dedicated prose section; **no** full per-cue render table (would duplicate the 12-row gates.md vocabulary table). |

**Scope note:** Q1 splits the epic's "verify across Claude/Grok/Codex" brief ask: the *policy* (the cross-agent reliability mechanism) + the *Claude* live verification land here; *live* Grok/Codex dogfooding is the operator's next-session work, tracked by the doc's standing update obligation rather than a new task. The file set (AGENT-COMPAT.md + CAPABILITIES.md) and approach (write policy + refresh currency honestly) are unchanged from the filed line.

**Exit-gate judgment (default-skip flavor):** Discovery surfaced no significant scope deviation — both clarifications landed on the conservative/honest default (lean prose; don't fabricate stamps; defer live Grok/Codex runs to the operator). No file-set change, no approach change, no subtask-list restructure, no Re-scope/De-scope. → **skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown doc edits; no executable surface)

**Implementation Notes:**

Pattern survey: AGENT-COMPAT.md uses `## ` prose sections with bullet lists + a trailing §"Related"; the new policy section reuses that exact shape and cross-links `SPEC/gates.md` rather than restating the 12-row cue table (per the lean / minimal-bloat scoping answer). The `<glyph> <UPPERCASE-LABEL>` framing extends the convention already codified in gates.md §"Operator-cue vocabulary" (.3) — no new shape invented.

**Edits (3 files):**

- `docs/AGENT-COMPAT.md` — (a) new `## Cross-agent cue fallback policy` section (placed after §"Pre-adoption verification", before §"Related"): the three non-render failure modes (stripped / tofu / mojibake), the durable-UPPERCASE-label rule ("scan on the label; the glyph never carries meaning alone"), banner-cue coverage via the `AWAITING APPROVAL — <label>` line, and the rationale that this makes per-agent emoji dogfooding a currency nicety not a correctness prerequisite — naming Grok/Codex as the natural next currency refresh. (b) Claude matrix-row `Last verified`: `v4.3.0 · 2026-05-30` → `v4.4.0 · 2026-06-01 (dogfooded)`. Grok/Codex cells unchanged (honest — operator runs them next).
- `claude/CAPABILITIES.md` — (a) §"Last verified": `v4.3.0 · 2026-05-30` → `v4.4.0 · 2026-06-01 (dogfooded)`. (b) `--fast` row: folded in the `.3`-deferred nuance — `--fast` does **not** suppress a destructive-action banner (🗄️/▶️ escalation), appended to the existing drift-carve-out sentence.

LOC delta: small additive (one ~22-line prose section + two one-line currency refreshes + one clause). All edits confined to the two AI-referenced docs named in the task.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code; viz suite parses PLAN.md + tasknote frontmatter, not `docs/`/`claude/` prose — matches .1/.3/.4 precedent)

- [x] Ran lint/type-check on changed code — N/A (markdown only); markdown mental-pass performed via grep verification

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (zero frontend files; no 👁️ CONFIRM surfaced)

**Testing Notes:**

Grep verification (Phase 3): no stale `v4.3.0`/`2026-05-30` residue in either edited doc; both currency stamps now read `v4.4.0 · 2026-06-01 (dogfooded)`; `## Cross-agent cue fallback policy` anchor present; the `../SPEC/gates.md` §"Operator-cue vocabulary" cross-ref resolves and its target anchor (`## Operator-cue vocabulary`, gates.md:45) exists; the policy's intra-doc references (§"The matrix", §"Reading the cells") are valid AGENT-COMPAT.md anchors. The 6 inline-cue labels listed (DB/RUN/ACTION/GO/CONFIRM/AUDIT) match gates.md §Event-cues + §Inline-asks exactly.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change
  - `SPEC.md` — no change (the cue contract was codified in `.3`; this task adds no contract — the fallback *policy* lives in AGENT-COMPAT.md, which gates.md already forward-points to)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (the fallback policy is agent-neutral by construction; CAPABILITIES.md is already logged as an out-of-scope wiring near-neighbor in the ledger; the `--fast` nuance adds no new contract-layer Claude surface)
  - `docs/PLATFORMS.md` — no change (its `--fast`-equivalent suppression description lists 👁️ + 📦, already consistent with the destructive-action banner being non-suppressible per `.3`'s sweep)
  - `claude/CAPABILITIES.md` — **updated by this task** — §"Last verified" refreshed to `v4.4.0 · 2026-06-01 (dogfooded)`; `--fast` row folded in the destructive-banner non-suppression nuance (the `.3`-deferred item)
  - `docs/AGENT-COMPAT.md` — **updated by this task** — added the `## Cross-agent cue fallback policy` section; Claude matrix-row currency refreshed to `v4.4.0 · 2026-06-01 (dogfooded)`

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (subtask flipped in place under the parent epic; parent `CORE-EPIC-254` + cohort move to `## Completed` only at `.6` audit close per SPEC/epic.md) and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Closed the final implementation child of CORE-EPIC-254. Wrote the cross-agent cue fallback policy into `docs/AGENT-COMPAT.md` — a lean prose section documenting the three non-render failure modes (stripped / tofu / mojibake) and the rule that the UPPERCASE ASCII label is the durable, authoritative token (the glyph is a fast-scan accelerator that never carries meaning alone), with banner cues covered via their `AWAITING APPROVAL — <label>` line. The policy is the mechanism that makes per-agent emoji dogfooding a currency nicety rather than a correctness prerequisite, so the contract reads reliably even on `docs-only`/`unverified` rows.

Refreshed verification currency: the Claude rows in both AGENT-COMPAT.md (matrix) and CAPABILITIES.md (§"Last verified") moved from the stale `v4.3.0 · 2026-05-30` to current `v4.4.0 · 2026-06-01 (dogfooded)`. Folded in the `.3`-deferred CAPABILITIES nuance — `--fast` does not suppress a destructive-action banner. Grok/Codex currency cells were left honest and unchanged (no fabricated `dogfooded`): per the operator, live Grok then Codex dogfooding is the imminent next-session work, tracked by AGENT-COMPAT.md's standing §"Reading the cells" update obligation. No contract changes; pure markdown across the two AI-referenced docs named in the brief.

**Archived:** 2026-06-01

