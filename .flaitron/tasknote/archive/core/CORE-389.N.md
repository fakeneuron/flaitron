---
title: audit-family-consolidation audit
status: completed
tags: []
created: 2026-08-01
due:
related-tasks: [CORE-EPIC-389, CORE-389.1, CORE-389.2, CORE-389.3, CORE-389.4]
---

# CORE-389.N | audit-family-consolidation audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-389]]

## 🎯 Goal

Verify the completed `CORE-EPIC-389` (`audit-family-consolidation`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-389.N — audit CORE-EPIC-389` commit lands
- [x] PLAN.md line for `CORE-389.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-389.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-389` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-389.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-389]] — parent epic (audit-family-consolidation)
- [[CORE-389.1]] — discovery (scoped the cohort)
- [[CORE-389.2]] — parameterized-survivor
- [[CORE-389.3]] — sibling-retirement
- [[CORE-389.4]] — migration-and-docs

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-389` active under `## Medium`; all four numeric children `[x]`; `.N` is the reserved terminal audit child. No open siblings, so the skill's early-audit gate did not fire.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-389.N`; pre-flight passed (clean tree, no existing/archived `.N` tasknote, parent active). Full cohort closed on schedule — `.1` 2026-07-31, `.2`/`.3`/`.4` all 2026-08-01 — so this is a complete-cohort audit, not a partial one.

- [x] Read relevant source files — all four archived cohort tasknotes in full (`archive/core/CORE-389.{1,2,3,4}.md`); the post-cohort deliverables on disk: `claude/skills/ft-audit/SKILL.md` + all six `passes/*.md`, `templates/audit-overlay-template.md`, `docs/MIGRATION.md` §1.2.1, `claude/skills/ft-release/SKILL.md` (§7.1 + slug lists), `claude/skills/ft-flowtron/SKILL.md` roster, `docs/{PLATFORMS,GLOSSARY,CONVENTIONS,AGENT-NEUTRALITY}.md`, `SECURITY.md`, `SPEC.md` + `SPEC/*.md`; plus the pre-consolidation originals via `git show e9f1c75^:` for placeholder-slot comparison.

- [x] **Best Practices Review** — `N/A` as a code review (no module boundaries move; markdown contract surface only). The cross-artifact boundary that mattered for the audit: the overlay template ↔ dispatcher ↔ pass-file read-by-reference contract, checked below.

- [x] **Archive skim** — self-referential for the cohort itself. Non-cohort context already synthesized inside `.1`/`.2` and re-read there rather than re-walked: CORE-072 (family began as a consolidation), CORE-101 (re-expansion to six), CORE-185 (18-edit rename drift cost), CORE-287 (overlay design), CORE-289 (growth cap), CORE-328.3 (`description:` as dispatch surface), CORE-374 (count-mirror drift class), CORE-388 (verdict source).

- [x] **Drift check** — every claim the cohort's Final Summaries make re-verified against HEAD this session; all held (see Implementation Notes §"Claim verification"). Two prose inconsistencies found that no child's own verification would have caught, because each sits on the seam *between* two children's deliverables.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions: (1) the audit's scope is the cohort's own deliverables plus the AI-referenced doc set — not a general repo audit; (2) inconsistencies whose class predates the cohort (see Finding 3) are follow-up material, not inline-fix material, since fixing the cohort's four files would leave the class untouched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Model | Deliverable |
|---|---|---|
| `.1` discovery | `[heavy]🧠` | Promoted plain CORE-389 → `CORE-EPIC-389`; filed `.2`/`.3`/`.4` (all ≤50w); two reconcile edits to CORE-386/387 stale wikilinks |
| `.2` parameterized-survivor | `[heavy]🧠` | `ft-audit/SKILL.md` rewritten as `/ft-audit <domain> [scope]` dispatcher; six new `passes/*.md`; `ft-release` §7.1 repointed (4 spot edits) |
| `.3` sibling-retirement | `[light]🔧` | 15 deletions (5 skill dirs + 5 command wrappers + 5 codex mirrors); `commands/ft-audit.md` + `codex/skills/ft-audit/SKILL.md` rewritten; `ft-flowtron` roster 26→21; `SPEC.md` brace expansion `/ft-audit{,-repo}` |
| `.4` migration-and-docs | `[medium]🧩` | `MIGRATION.md` §1.2.1 rewrite + `#### Migrating a pre-consolidation audit fork`; overlay template repointed; 11 files, +155/−102 |

Cohort scope held exactly as `.1` filed it — M=3 implementation children, no mid-epic insertion, `.N` never renumbered (the reserved-suffix convention did its job).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` for the verification pass. The two inline fixes are one-phrase prose corrections matching each file's surrounding voice; no new shape introduced.

- [x] **Minimal refactor gate** — two inline fixes applied, both single-phrase corrections to stale prose in cohort-produced files, both required for the artifacts to describe themselves accurately (Finding 1, Finding 2). Everything else deferred: Finding 3's class is repo-wide and predates the cohort → follow-up.

- [x] Implemented the minimal solution — 2 files, 2 spot edits.

- [x] Updated/added tests for non-trivial behavior — `N/A`; markdown contract files, no executable surface.

**Implementation Notes:**

### Claim verification (every cohort Final-Summary claim re-checked against HEAD)

- **Retired slugs gone** — `grep -rn "ft-audit-(backend|frontend|security|performance|docs)" --include="*.md"` over live surfaces (excluding `archive/` + `PLAN.md`) returns **zero** hits. `.4` reported "only the two intentional hits inside the new migration note"; those two now read as prose about pre-consolidation paths without reproducing a bare slug, so the live surface is fully clean.
- **Counts are real, not estimated** — `claude/commands/*.md` = 21, `claude/skills/*/` = 21, `codex/skills/*/` = 21. `ft-flowtron` roster table = 21 rows. `docs/PLATFORMS.md` literal mirrors at `:208`, `:213`, `:238` all read `21`. Four independent surfaces agree with disk.
- **Three-way wiring parity** — `diff` of `claude/skills/*/` vs `claude/commands/*.md` vs `codex/skills/*/` basenames: identical sets, no orphan on any side.
- **Pass library complete + structurally parallel** — all six `passes/*.md` present (41–52 lines); every one carries the identical four-heading skeleton (`Scope & rubric hints (→ dispatcher §1)` · `The 5 passes (→ dispatcher §2)` · `Severity guide (→ dispatcher §3)` · `Specialist additions`). `performance.md`'s extra cross-cuts preamble is the one deliberate deviation `.2` recorded.
- **`ft-release` §7.1 repointed** — heading, `Skill(ft-audit) with args "docs"` invocation, and the line-84 context-budget mention all carry the subroutine form; no `ft-audit-docs` remains.
- **`ft-release` install-gate arithmetic closes** — 13 adopter-subset slugs + 8 forbidden repo-scoped slugs = 21, matching disk. `ft-audit` correctly sits in the *forbidden* list (fork-only, never symlinked), consistent with `claude/AGENTS-snippet.md` carrying no audit symlink line and `codex/AGENTS-snippet.md` naming only the two global-installable members.
- **Definitional surfaces agree** — `docs/GLOSSARY.md` **audit-family** (two members + six domains), `SPEC.md` §"Skill namespace" (`/ft-audit{,-repo}`), `docs/CONVENTIONS.md` (single customization seam), `MIGRATION.md` §1.2.1 domain table, and the dispatcher's own frontmatter `description:` all list the same six domain tokens in the same vocabulary. No contradictory cross-refs.
- **Glob forms still correct** — `/ft-audit*` in `SPEC.md:391/583/592`, `SPEC/gates.md:91`, `SPEC/procedures/ft-task.md:228`, `SPEC/tasknote-selection.md:165`, `docs/AGENT-NEUTRALITY.md:35` still match the three surviving slugs (`ft-audit`, `ft-audit-repo`, `ft-audit-context`). Leaving them was the right call.

### Findings

**Finding 1 — `templates/audit-overlay-template.md` promised §1 slots the dispatcher no longer has. (fixed inline)**
The Deltas preamble read "The scaffold's **§1 slots** and the pass files' … placeholders resolve to the values here." Pre-consolidation, `ft-audit/SKILL.md` §1 genuinely carried fill-in slots (old §0 named "§1 step 1 scope glob", "§1 step 2 rubric paths", "§1 step 3 gate commands"). `.2` moved every one of those into `passes/<domain>.md`; grep confirms the post-`.2` dispatcher contains **zero** `<placeholder>` tokens. A forker following the overlay would hunt §1 for slots and find none. Rewrote to "Every fillable slot lives in the pass files — …", and moved "the dispatcher's §1 resolution steps" into the inherited-verbatim list where they now belong. This is exactly the seam an audit catches: `.2` owned the dispatcher, `.4` owned the template, and neither child's verification crossed the boundary.

**Finding 2 — `claude/skills/ft-audit/SKILL.md` §0 pointed at placeholders in §5 that don't exist. (fixed inline)**
§0's preamble read "The placeholders live in this file's §5 and in each `passes/<domain>.md` you keep." §5 has no fillable placeholder — its §0 line item is a *confirm* step ("confirm the area-prefix list valid for your `.flowtron/tasknote/README.md`"), and §5's `<AREA>`/`<N>`/`<slug>` tokens are runtime task-line grammar, not forker slots. Carry-over from the old §0's "placeholders in §1, §2, §3, and §6". Rewrote to "Every fillable placeholder lives in the `passes/<domain>.md` files you keep; this file carries one confirm-only item (§5 step 2)."

**Finding 3 — archived-tasknote closure hygiene is split within the cohort (and repo-wide). (follow-up candidate, not fixed inline)**
`.1` and `.2` archived with the nav chip still at `🟢 In progress`; `.3` and `.4` flipped it to `✅ Completed`. Independently, `.1` and `.3` archived with every `## ✅ Acceptance` box unticked while `.2` and `.4` ticked all eight. Root cause is a SPEC gap, not sloppiness by any child: `SPEC.md:325` documents `✅ Completed` as a valid chip value and `SPEC/blocked.md` requires chip flips for blocked/resume, but the Phase 4 closure checklist requires neither a chip flip nor an Acceptance tick-through — it only names the YAML `status:` flip. Sampling the 14 most recent archived tasknotes confirms the split is repo-wide and long-standing (roughly half unticked, half ticked; same for the chip), so this is not cohort-introduced. Filing four one-line fixes here would leave the class untouched — the fix belongs in the Phase 4 checklist + template. → `/ft-file-followup` candidate.

**No regressions** in earlier-shipped cohort surfaces: `.2`'s dispatcher and pass library survived `.3`'s 15 deletions and `.4`'s 11-file sweep intact; `.3`'s roster/count edits are still consistent with `.4`'s PLATFORMS mirrors; nothing `.1` filed drifted.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; the two edits are markdown prose in `claude/skills/` and `templates/`. No `viz/` or `tools/` source touched, so neither `npm --prefix viz test` nor `node --test tools/update-adopters.test.mjs` has changed input.

- [x] Ran lint/type-check on changed code — `N/A`; same reason (repo carries no markdown linter — quick commands are `viz` npm scripts + the updater suite).

- [x] **Quality assertions** — both edits are single-sentence replacements preserving surrounding voice and line-wrap style; no duplication introduced, no public surface grown, no content removed beyond the two inaccurate clauses. Re-grepped after editing: dispatcher still has zero `<placeholder>` tokens (so the new §0 wording is accurate), overlay template's remaining `<…>` tokens are all inside its own `## Deltas` block and frontmatter (the forker-facing slots it legitimately owns). Verification for the audit's substantive claims is `git`/`grep`-based and recorded per-claim in Implementation Notes rather than re-summarized here.

- [x] (frontend) Asked the user for visual confirmation — `N/A`; no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flowtron/tasknote/README.md` §"AI-referenced docs" (cumulative, across the whole cohort):
  - `README.md` — no change (its `templates/` bullet names the audit-overlay template generically; still accurate post-rewrite)
  - `SPEC.md` — no change in this audit (`.3` corrected §"Skill namespace" + two stale mentions; re-verified — brace expansion reads `/ft-audit{,-repo}`, `/ft-audit*` globs at `:391`/`:583`/`:592` still match the three surviving slugs)
  - `docs/MIGRATION.md` — no change in this audit (`.4`'s primary deliverable; re-verified — §1.2.1 domain table, `cp -R` install block, and both fork-style paragraphs all name paths that exist on disk)
  - `claude/AGENTS-snippet.md` — no change (grep-verified: carries no audit-family slug; audit is fork-only, never symlinked — consistent with `ft-release`'s forbidden list)
  - `codex/AGENTS-snippet.md` — no change (global-utilities line names only `ft-audit-context` + `ft-audit-repo`, both surviving)
  - `docs/CONVENTIONS.md` — no change in this audit (`.4` corrected the single-customization-seam rationale to `ft-audit` / `.claude/skills/audit/`; re-verified at `:122`)
  - `CONTRIBUTING.md` — no change (grep-verified: zero audit mentions)
  - `SECURITY.md` — no change in this audit (`.4` swapped the example skill list to `/ft-audit` + `/ft-audit-repo`; re-verified at `:20` — both slugs live)
  - `docs/AGENT-NEUTRALITY.md` — no change (uses `/ft-audit*` glob forms, still correct; its `[[CORE-154.6]]` audit-note pointer is a different epic's, untouched)
  - `docs/PLATFORMS.md` — no change in this audit (`.4` fixed 3 count mirrors 26→21 + 2 prose enumerations; re-verified against measured disk inventory, all three agree)
  - `claude/CAPABILITIES.md` — no change (grep-verified: zero audit-family claims; its last-verified stamp is `/ft-release`'s to refresh on the next version bump, not a per-task surface)
  - `docs/AGENT-COMPAT.md` — no change (per-agent compatibility matrix; carries no audit-family enumeration)

  Non-sweep surfaces corrected by this audit: `templates/audit-overlay-template.md`, `claude/skills/ft-audit/SKILL.md` (Findings 1–2).

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md `.N` line flipped to stub form, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Audited the closed `CORE-EPIC-389` cohort (four children, all landed 2026-07-31→2026-08-01). The consolidation is sound and every substantive claim the children made verifies against HEAD; two prose inconsistencies surfaced, both sitting on the seam *between* two children's deliverables where neither child's own verification reached.

**Verified (all held):** zero live references to the five retired slugs anywhere outside `archive/` + `PLAN.md`; the 21-skill count agrees across four independent surfaces (`ft-flowtron` roster, `PLATFORMS.md` ×3 literals, `ft-release`'s 13+8 install-gate arithmetic, measured disk inventory); three-way `claude/skills` ↔ `claude/commands` ↔ `codex/skills` basename parity is exact; all six `passes/*.md` present with an identical four-heading skeleton (performance's cross-cuts preamble the one recorded deviation); `ft-release` §7.1 fully repointed to the `/ft-audit docs` subroutine form; GLOSSARY / SPEC / CONVENTIONS / MIGRATION / dispatcher-frontmatter all describe the same two-member family and six domain tokens without contradiction; `/ft-audit*` glob forms correctly left intact in six SPEC/doc locations.

**Fixed inline (2 files, 2 spot edits):**
- `templates/audit-overlay-template.md` — Deltas preamble claimed the scaffold's "§1 slots" resolve to overlay values, but `.2` moved every fillable slot into the pass files and the post-`.2` dispatcher contains zero `<placeholder>` tokens. A forker would have searched §1 and found nothing. Rewritten to point at the pass files; §1's resolution steps moved into the inherited-verbatim list.
- `claude/skills/ft-audit/SKILL.md` — §0 preamble claimed placeholders live "in this file's §5", but §5's checklist item is confirm-only and its `<AREA>`/`<N>`/`<slug>` tokens are runtime grammar, not forker slots. Carry-over from the pre-consolidation §0's "§1, §2, §3, §6" wording. Rewritten.

**Logged as follow-up (not fixed inline):** archived-tasknote closure hygiene splits within the cohort — `.1`/`.2` archived with the nav chip still `🟢 In progress` while `.3`/`.4` flipped it to `✅ Completed`; `.1`/`.3` archived with Acceptance boxes unticked while `.2`/`.4` ticked all eight. Root cause is a SPEC gap: Phase 4's checklist mandates the YAML `status:` flip but neither the chip flip nor an Acceptance tick-through, even though `SPEC.md:325` lists `✅ Completed` as a valid chip and `SPEC/blocked.md` requires chip flips elsewhere. Sampling the 14 most recent archived tasknotes shows the split is repo-wide and predates this epic, so patching four cohort files would leave the class untouched — the fix belongs in the Phase 4 checklist + `templates/tasknote-template.md`. → one `/ft-file-followup` candidate.

**Documentation verdict:** all 12 AI-referenced entries swept; **no change** for every entry in this audit — the five the cohort updated (`SPEC.md`, `MIGRATION.md`, `CONVENTIONS.md`, `SECURITY.md`, `PLATFORMS.md`) were re-verified accurate against disk rather than re-edited, and the other seven carry no audit-family claims.

**Parent flip:** confirmed by the operator at the 📦 gate — `CORE-EPIC-389` flipped to stub form and the full five-child cohort moved atomically from `## Medium` to the top of `## Completed`. `## Medium` retains CORE-386/387/390/391/392, so no `(none)` placeholder was needed.

**Maintainability effect:** the epic's stated goal holds end to end — one dispatcher plus a six-file pass library replaces six near-verbatim scaffolds, the adopter path in MIGRATION §1.2.1 names only paths that exist, and pre-consolidation forkers get an explicit two-case decision tree. This audit closes the last gap in that story: the overlay template and the dispatcher's own §0 now describe the post-consolidation placeholder layout accurately, so a forker following either artifact lands on real slots.

**Archived:** 2026-08-01
