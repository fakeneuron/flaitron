---
title: multi-agent-portability discovery
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-EPIC-154]
---

# CORE-154.1 | multi-agent-portability discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-154]]

## 🎯 Goal

Scope the `CORE-EPIC-154` epic (`multi-agent-portability`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-154.2..5` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-154.2 .. CORE-154.5 filed in `_project/PLAN.md` (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-154.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim `_project/tasknote/archive/core/` for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-154.2 .. CORE-154.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into `_project/PLAN.md` under CORE-EPIC-154 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-154]] — parent epic (multi-agent-portability code sweep)

## 🧭 Deep Pre-pass

### Constitution

**Principles** — what the epic must honor end-to-end.

1. **Contract layer stays agent-neutral; wiring layer may be agent-specific.** SPEC.md, SPEC/, templates/, docs/, README.md, SECURITY.md describe the workflow contract any AI can follow conversationally. `claude/` exists because Claude Code has a slash-command + skill execution surface that lets the contract be *driven* rather than just *read*. Adding agent-specific execution surfaces is fine; leaking agent-specific assumptions into the contract layer is not.
2. **Markdown-only, zero scripts** stays inviolable (SPEC §"Core principles" #2; PHILOSOPHY §"Zero scripts"). No new agent-portability tool is allowed to introduce a CLI, daemon, validator, or build step. If a portability concern can't be solved with markdown + symlinks + conversational driving, the right answer is "we don't solve it."
3. **AGENTS.md is the canonical agent-neutral entry point.** The open standard read by Claude Code / Codex CLI / Cursor / Amp / Aider — and presumably future tools — is where the contract surfaces to any AI. `claude/AGENTS-snippet.md`'s paste-block is already this; the file's *location* under `claude/` is the structural artifact under audit.
4. **Adopter-cost stays low.** A new platform adopter (Codex-CLI user, grok-cli user) must be able to use flowtron with: read AGENTS.md, drive contract conversationally. Anything beyond that — equivalent of `/ft-task` slash commands — is an *optional* uplift the platform itself enables, not flowtron's contract.
5. **Symmetry over special-casing.** If multiple platforms ship slash-command/skill systems, they should plug into flowtron via a uniform pattern (a sibling dir, a snippet, a wiring doc), not via N bespoke integrations. Discoverable from one place; identical shape per platform.
6. **Original Claude Code experience is the regression-check baseline.** Whatever restructure ships must leave `/ft-task` + the bundled skills functionally identical from the operator's seat (same commands, same args, same banner-block UX, same SPEC contract). Improvements OK; regressions not.
7. **No operator-idiosyncrasy leak.** Per CORE-132 / CORE-138 / CORE-139 sweeps — no Anthropic-specific defaults baked as contracts, no operator-personal preferences (favorite editor, favorite repo layout) presented as portable conventions.
8. **Discovery deliverable = filed children, not code.** The .1 outputs concrete `CORE-154.2..5` PLAN.md lines. The shared design surface inventory, the per-child shortname+scope, and the SPEC contract impact are decided here so each child can execute against a sized brief.

**Non-negotiables (hard constraints).**

- The `ft-` skill namespace reservation (SPEC §"Skill namespace") stays. Adopters keep that contract whether they wire skills under `.claude/`, a future Codex equivalent, or both.
- The 4-phase workflow + relevance gate + post-closure protocol contract (SPEC §"The 4-phase workflow", §"Post-closure protocol") doesn't change — this epic is structural, not contract-level.
- The `_project/flowtron/` submodule model stays. Adopters keep pinning to a flowtron tag and bumping deliberately (SPEC/versioning.md).
- The `AGENTS.md` paste-block stays semantically agent-neutral — it can reference flowtron-specific concepts (PLAN.md, tasknotes, the `ft-` skill prefix), but must not embed Claude-Code-tool-call assumptions (AskUserQuestion, slash-command syntax) in its body.
- Visualizer (`viz/`) is out of scope. It's a per-machine read-only tool; agent-neutrality is irrelevant there.

**Explicit out-of-scope** — bracket these *now* so children don't drift into them.

- **Writing Codex-CLI skill equivalents.** Not in scope. If Codex / grok / Cursor ship skill-like primitives, an adopter can wire them; flowtron documents the pattern but does not ship parallel skill content. Doubling the maintenance burden is the failure mode here.
- **Authoring a multi-agent runtime translation layer.** No "skill-to-platform-X transpiler." If a platform needs different syntax, that's adopter-side work or an upstream PR pattern, not flowtron core.
- **Reflowing SPEC.md or SPEC/** to remove every cite of `claude/`. SPEC.md line 53 references `claude/` as a structural locator; that line updates if the dir renames, but the contract surface stays stable shape.
- **Touching the `viz/` codebase** for agent-neutrality concerns.
- **Migration tooling for already-adopted projects.** Adopters that have wired `.claude/` symlinks today don't migrate; the structural change (if any) is backwards-compatible.
- **Adopting any specific platform's conventions.** This epic doesn't decide grok-cli's skill format or Codex CLI's command shape — those are external. Flowtron documents the *pattern* for plug-in, not the *content* per platform.

### Specification

The epic delivers a coherent multi-agent-portability story across four
implementation children (.2 .. .5) bracketed by Discovery (.1) and Audit
(.6). Each child below states its deliverable, the acceptance shape, and
how it interacts with siblings. HOW belongs in each child's Phase 1
Discovery; this is WHAT.

#### CORE-154.2 — Agent-neutral contract-surface audit + leak fix

**Deliverable.** A complete inventory of agent-specific (read: Claude-Code-specific) assumptions that have leaked into the contract layer — SPEC.md, SPEC/*, templates/*, docs/*, README.md, SECURITY.md — and targeted edits to remove any leaks that fail Constitution principle 1. Where a Claude-specific reference is *load-bearing* (e.g., SPEC.md line 53's `claude/` locator; SECURITY.md's "Flowtron's Claude Code skills" framing), the inventory records it as an *intentional* surface so future audits don't re-audit the same ground.

**Acceptance shape.**
- Inventory table in the tasknote: file · line · current text · classification (`leak` / `intentional-locator` / `tool-call-specific`).
- All `leak` rows resolved (edited or justified as intentional).
- The intentional-surface ledger committed somewhere durable (likely a short subsection in `SPEC.md` §"Working in the flowtron repo itself" or a new `docs/AGENT-NEUTRALITY.md` — decided at the child's Phase 1).
- Phase 4 doc-drift sweep across AI-referenced docs.

**Interaction.** Standalone audit; informs `.3` (structural decisions need to know what's intentional Claude-specific). Builds on the CORE-132 / CORE-138 / CORE-139 idiosyncrasy + Anthropic-lock sweeps with a different lens (multi-agent portability vs. operator-idiosyncrasy/Anthropic-default).

#### CORE-154.3 — Wiring-layer structure: claude/ + scalability pattern

**Deliverable.** A locked structural decision on the wiring layer. Three viable shapes the child evaluates:
- **(a) Status-quo + doc only.** Leave `claude/` named-as-is; add a brief doc explaining the convention (Claude-Code-specific wiring lives at `claude/`; future platforms add siblings: `codex/`, `grok/`). Lowest churn.
- **(b) Sibling restructure.** Move to `wiring/claude/` or similar parent, so the multi-platform shape is obvious from the tree. Higher churn (SPEC, README, MIGRATION, symlink paths in AGENTS-snippet all touched).
- **(c) Hybrid.** `claude/` stays at root for backwards-compat; a top-level `WIRING.md` (or `docs/WIRING.md`) explains the platform-plug-in convention.

The child runs a Phase 1 read across SPEC.md / README.md / AGENTS-snippet.md / MIGRATION.md, picks the option that best honors Constitution principles 2 (zero scripts), 4 (low adopter cost), 5 (symmetry), and 6 (no Claude-Code regression), then ships the change.

**Acceptance shape.**
- Decision recorded with rationale (which option, why).
- If structure changes: SPEC §"Working in the flowtron repo itself", README §"Repo layout", `claude/AGENTS-snippet.md`'s symlink commands, `docs/MIGRATION.md` §1.2 all updated coherently.
- If structure stays: a single doc paragraph (location TBD in the child's Phase 1) documents the multi-platform convention.
- Symlink wiring still works against the existing adopter wiring (no migration burden — Non-negotiable per Constitution).
- Phase 4 doc-drift sweep.

**Interaction.** Depends on `.2`'s intentional-surface ledger (so the structural change doesn't undo Claude-specific surfaces that are deliberately Claude-specific). Provides the structure that `.4` documents.

#### CORE-154.4 — Multi-platform plug-in pattern + doc

**Deliverable.** A platform-plug-in pattern documented in a single canonical place — likely `docs/MIGRATION.md` §"Multi-platform adoption" or a new top-level `docs/PLATFORMS.md` (decided at the child's Phase 1). The doc covers:
- The two-layer model: contract (SPEC + templates + AGENTS.md paste-block) is platform-neutral; wiring (`claude/` slash-commands + skills) is per-platform.
- Today's surface: Claude Code uses the AGENTS.md paste-block + `claude/` symlink wiring + `/ft-*` slash commands. Codex CLI / Cursor / Amp / Aider use AGENTS.md only — they drive the contract conversationally.
- Pattern for adding a new platform's wiring: where to put it (sibling dir or per the `.3` structure), naming convention, what an AGENTS-snippet-equivalent looks like for that platform's adoption-time commands, what's mandatory vs. optional.
- An *example shape* — a minimal sketch of what a `grok/` or `codex/` directory would look like if a future contributor wanted to add one. Not actually shipped; just the template.

**Acceptance shape.**
- The doc exists at the chosen location, ≤300 lines.
- References agent-neutral contract layer + Claude-specific wiring as the concrete worked example.
- Includes the platform-add scaffold (file shapes, naming, AGENTS-snippet update points).
- Phase 4 doc-drift sweep across AI-referenced docs (the new doc joins the set if material).

**Interaction.** Depends on `.3`'s locked structure (the doc points at it). Independent of `.2` except by reference (cites the intentional-surface ledger).

#### CORE-154.5 — Idiosyncrasy + Claude-Code-effectiveness re-comb

**Deliverable.** A two-pass sweep applying:
- **Pass A: idiosyncrasy re-comb (multi-agent-portability lens).** Extends CORE-132 by re-reading the contract surface for places where the operator's personal preferences (Anthropic-favoring defaults, Obsidian-favoring framing, ~/code/ layout assumption) might present as portable conventions when they're really preferences. CORE-132 swept already; this pass uses the multi-agent lens specifically (where does Claude-Code-tooling implicitly carry forward as "the way it's done"?).
- **Pass B: Claude-Code-effectiveness regression-check.** Verify that the changes from `.2` / `.3` / `.4` haven't regressed the Claude Code operator experience. Concrete checks: every `/ft-*` slash command still resolves; `/ft-task <ID>` still scaffolds + drives 4-phase; AGENTS-snippet still pastes cleanly; symlinks still resolve; no banner-block UX drift; SPEC contract is identical-shape (modulo intentional structural updates from `.3`).

**Acceptance shape.**
- Findings table in the tasknote (file · classification · fix or `justified-as-is`).
- Regression-check log: each `/ft-*` slash command tested or read-through-verified; per-command "no change" or specific note.
- Phase 4 doc-drift sweep.

**Interaction.** Last implementation child by design — runs after `.2 / .3 / .4` so it can audit the actual changes shipped by them. Feeds into the `.6` Audit but doesn't replace it (`.6` is the canonical epic-audit with the fixed doc-drift acceptance line; `.5` is a specific extension lens).

#### CORE-154.6 — Audit (already filed)

**Deliverable.** Standard epic audit per `SPEC/epic.md` lines 35–48. Fixed doc-drift sweep acceptance line across `_project/tasknote/README.md` §"AI-referenced docs"; surface any integration misses across the four implementation children. May surface follow-ups; if so, file as `.7+`.

**Cross-child interactions (summary).**
- `.2` (read-only audit + targeted edits) → produces intentional-surface ledger consumed by `.3` and `.5`.
- `.3` (structural decision) → produces the structure documented by `.4` and regression-checked by `.5`.
- `.4` (pattern doc) → cites both `.2` and `.3`; doesn't depend on `.5`.
- `.5` (final lens-sweep) → audits the cumulative output of `.2 / .3 / .4`.
- `.6` (audit) → canonical epic close.

**Sizing read.** Each child is a single-session opus tasknote — none balloon into mini-epics. If `.3` lands on option (b) (sibling restructure), it could grow; the child's Phase 1 Discovery has explicit re-scope authority per SPEC §"📝 Phase 1: Discovery" if so.

### Clarifications

Resolved via AskUserQuestion at Discovery Stage 3 (deep pre-pass).

| # | Question | Resolution | Affects |
|---|---|---|---|
| 1 | `.3` starting-bias for wiring-layer structure (and implicit adopter-symlink-stability policy) | **(a) Status-quo + doc only.** `claude/` keeps its location; `.3` documents the multi-platform convention. Adopter symlinks are sacred — preserved by default. `.3`'s Phase 1 may pivot to (b)/(c) if read surfaces a real problem. | `.3` scope; `.4` cross-references; Constitution non-negotiable on adopter wiring affirmed |
| 2 | `.4` location for the multi-platform pattern doc | **New `docs/PLATFORMS.md`** — sibling to MIGRATION/PHILOSOPHY/CONVENTIONS; surfaced in README's `## Documents` index. | `.4` deliverable; `.4` doc-drift sweep adds the new file as candidate AI-referenced doc |
| 3 | `.5` Claude-Code-effectiveness regression-check method | **Read-through verification of SKILL.md + commands/*.md** (git-diff against pre-restructure baseline; document `no change` or surface drift). Live invocation reserved as escalation if read-through surfaces ambiguity. | `.5` acceptance shape; sizing read confirmed (single-session opus, no fresh-Claude-session overhead) |
| 4 | Release timing — bundle vs. decouple | **Decoupled** — close epic; ship release as a separate `CORE-XXX` later (mirrors CORE-EPIC-057 → CORE-060 v1.3.0 precedent). Epic close is orthogonal to release-mechanics. | Epic scope ends at `.6` audit; release follows in a separate filing |

**Deferred to in-child Phase 1 Discovery** (non-load-bearing at filing time):
- `.2` — where the intentional-surface ledger lives (candidates: new `docs/AGENT-NEUTRALITY.md` | subsection in `SPEC.md` §"Working in the flowtron repo itself" | tasknote-only). The child decides via Phase 1 read.
- `.4` — scaffold-shape for the platform-add example (full `templates/platform-wiring-template/` dir vs. inline code-fence sketch). The child decides.

**No further AskUserQuestion calls needed at filing time** — the four resolved above unblock Phase 2's child-line drafting.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md (filed at Step 4 of /ft-epic-discovery)
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery --deep` with a multi-sentence scope description; Constitution (Stage 1) confirmed the epic frame; Specification (Stage 2) confirmed four-child decomposition; Clarifications (Stage 3) resolved the four load-bearing scoping questions. Epic scope is real (not single-task), warrants the Discovery + Audit bracket per `SPEC/epic.md` (multi-child structural sweep).

- [x] Read relevant source files (in parallel before Stage 1):
  - `SPEC.md` (full read) — confirmed line 53 `claude/` locator + skill-namespace reservation + 4-phase contract
  - `SPEC/epic.md`, `SPEC/model.md`, `SPEC/versioning.md` — lazy modules relevant to epic lifecycle + contract layer
  - `docs/MIGRATION.md` (full read) — confirmed §1.2 symlink-wiring + §1.3 AGENTS.md paste destination
  - `docs/PHILOSOPHY.md` — confirmed "Zero scripts" + markdown-only principles + the "Claude can read markdown directly" framing that motivates platform-neutrality
  - `README.md`, `SECURITY.md` — confirmed repo-layout claims + threat-model framing of "Flowtron's Claude Code skills"
  - `templates/tasknote-README.md` — AGENTS.md seeded in AI-referenced docs list since CORE-129
  - `claude/AGENTS-snippet.md` — paste-block (agent-neutral content under Claude-named dir) + symlink wiring (Claude-Code-specific)
  - `claude/skills/ft-task/SKILL.md` (head + grep) + `claude/commands/ft-task.md` + `claude/commands/ft-flowtron.md` — confirmed Claude-Code-tool-call lock-in at wiring layer (AskUserQuestion, slash commands, /model)

- [x] **Archive skim** — `_project/tasknote/archive/core/` for relevant precedents. Findings logged below.

- [x] **Drift check** — file paths cited in the conversation context all verified at HEAD:
  - `claude/` directory exists ✓
  - No `codex/` sibling exists (confirmed — conversation framing of "codex compatibility implementation" refers to the AGENTS.md mechanism, not a parallel directory)
  - `claude/AGENTS-snippet.md` exists ✓ (rename from `claude/CLAUDE-snippet.md` landed at CORE-129)
  - SPEC.md line 53 `claude/` locator + line 30 layout diagram present ✓
  - `_project/PLAN.md` `## High` section was empty at filing — current state has CORE-EPIC-154 cohort filed at Step 4
  - Two minor frontmatter-drift items in archive (CORE-138 / CORE-139 tasknotes carry `status: in-progress` but PLAN.md shows Completed 2026-05-22). Per SPEC §"Tasknote frontmatter" write-once policy these don't retroactively update. Logged for awareness only.

- [x] Clarifying questions — **Resolved during deep pre-pass — see `## 🧭 Deep Pre-pass` §Clarifications.** Four load-bearing scoping decisions resolved via AskUserQuestion at Stage 3 (`.3` starting bias = status-quo, `.4` doc location = `docs/PLATFORMS.md`, `.5` regression method = read-through, release timing = decoupled). Two minor items deferred to in-child Phase 1.

- [x] Subtasks above populated with concrete, ordered steps (pre-filled at Step 5 scaffold; no Discovery-driven re-shaping needed).

**Discovery Notes:**

**Load-bearing precedents from archive skim** (each anchors a piece of CORE-154's scope):

| Precedent | What it locked | How CORE-154 extends it |
|---|---|---|
| [[CORE-129]] AGENTS.md migration (2026-05-22) | Paste-block destination = `AGENTS.md` (open standard, read by Claude/Codex/Cursor/Amp/Aider); snippet renamed `CLAUDE-snippet.md` → `AGENTS-snippet.md`; SPEC §"Working in the flowtron repo itself" updated | Contract-layer agent-neutrality already in place at the paste-destination layer. CORE-154 audits whether the *broader contract surface* matches and designs the structural pattern for parallel platform wiring. |
| [[CORE-091]] wiring-snippet single-source collapse (2026-05-14) | `claude/AGENTS-snippet.md` §"One-time symlink wiring" is sole source of truth for symlink commands; MIGRATION + new-project skill trimmed to pointers | Single-source-of-truth pattern preserved by `.3` and `.4` (any structural change keeps the canonical-source posture). |
| [[CORE-104]] skill namespace prefix (2026-05-17) + [[CORE-106]] residue sweep | `ft-` namespace reservation; adopter `.claude/` directory locked as wiring substrate; namespace prevents shadowing of adopter-owned skills | Non-negotiable per Constitution. `.3` structural decision preserves the namespace contract whichever option lands. |
| [[CORE-132]] user-idiosyncrasy comb (2026-05-22) | 5-pass audit-shaped sweep posture for adopter-facing content; surfaced findings as discrete PLAN.md tickets (no in-place edits in the audit task itself) | `.5` extends with a multi-agent-portability lens (same surgical posture, different rubric). |
| [[CORE-138]] spec-model-grammar-anthropic-lock + [[CORE-141]] skill-prompts-model-tokens-generalize (2026-05-22 / 2026-05-23) | `[model]` grammar loosened from `opus \| sonnet` enum to "short token, recommended set"; adopters MAY substitute; visualizer parser accepts any `[a-z][\w.-]*` | Precedent for contract-layer agent-neutralization. `.2` may surface similar `Anthropic-default-presented-as-portable` patterns in adjacent surfaces. |
| [[CORE-139]] spec-clear-claude-specific (2026-05-22) | "Claude cannot run /clear" → "the assistant cannot run /clear"; surgical Claude-specific wording fix | Concrete pattern `.2`'s leak-fix subroutine applies to other Claude-Code-tool-call references found in contract-layer files. |
| [[CORE-EPIC-097]] external-skill-survey + [[CORE-EPIC-099]] external-conventions-survey (both closed 2026-05-18) | Surveys of external claude-code / AI-coding workflow repos and external conventions; informed current AGENTS.md + claude/ split | Pre-work for the multi-agent-portability question. `.2` and `.4` may cite findings; no re-survey needed at this lens. |

**Cohort-sizing read.** Prior epics ran N=8 (CORE-EPIC-097, -099, -057) or N=9 (-042). CORE-154's N=6 is intentionally tighter — audit-shaped scope; each implementation child is single-session opus. Re-scope authority available at any child's Phase 1 if a structural surprise lands (Constitution principle 8).

**Resolved scoping table** — see `## 🧭 Deep Pre-pass` §Clarifications above. The four resolutions feed directly into Phase 2's child-line drafting.

**Out-of-band note — `claude/AGENTS-snippet.md` location.** The file's *content* is mostly agent-neutral (the paste-block goes into adopter's `AGENTS.md`), but it sits under `claude/`. Whether to relocate is a candidate finding for `.2` or a structural concern for `.3`. Logging here so the children don't have to re-discover.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest precedent is the [[CORE-EPIC-057]] cohort (2026-05-09) for cohort-child PLAN.md filing: 2-space indent under parent, `[<model>]` tag preserved on every line, em-dash separator, per-child long description ≤50w target. Followed exactly. The two precedents at [[CORE-EPIC-097]] / [[CORE-EPIC-099]] (2026-05-18) had similar shape with 8 children each; CORE-154's 6-child cohort uses identical line shape.
- [x] Implemented the minimal solution — four PLAN.md lines inserted between the existing `.1` and `.6` lines under `CORE-EPIC-154`; no other edits.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md markdown filing; no executable surface; the visualizer parser at `viz/src/parser.ts` already handles this line shape).

**Implementation Notes:**

- **Lines written:** 4 child lines (`.2`, `.3`, `.4`, `.5`) inserted in order between `.1` Discovery and `.6` Audit under `CORE-EPIC-154` parent in `_project/PLAN.md` `## High`.
- **Word counts** (long descriptions, ≤50w target / ≤70w hard cap per SPEC §"PLAN.md filing-discipline thresholds"):
  - `.2` agent-neutral-surface-audit — 41w
  - `.3` wiring-layer-structure — 42w
  - `.4` platforms-doc — 46w
  - `.5` portability-recomb — 41w (shortname trimmed from `idiosyncrasy-claude-regression-recomb` at Phase 3 mental-pass: 37 chars exceeded the ~30 char SPEC target; new shortname is 18 chars, preserves the re-comb signal tying to [[CORE-132]] precedent)
  - All four under target ✓
- **No audit-number bump.** Discovery confirmed N=6 (`.1` Discovery + `.2..5` implementation + `.6` audit); audit line at `.6` filed at Step 4 stays as-is. If the `.3` Phase 1 read pivots away from status-quo (option-b sibling restructure), the child has explicit re-scope authority per SPEC §"📝 Phase 1: Discovery" — but the audit number stays `.6` regardless.
- **Adopter-wiring policy locked.** Per Stage 3 clarification #1 + Constitution non-negotiable: existing adopter `.claude/commands/ft-*.md` and `.claude/skills/ft-*` symlinks are preserved by default. Any structural change `.3` lands must be backwards-compatible (no symlink-target renames in `claude/` root paths).
- **Cross-references intentional.** The `[[CORE-132]]`, `[[CORE-138]]`, `[[CORE-139]]` wikilinks in `.2` and `.5` long descriptions are deliberate parseable cross-references per SPEC §"Long-description conventions" — these land in `Task.relatedTasks` for the visualizer.
- **Out-of-scope explicitly re-affirmed.** Per Constitution, this filing does not start any child execution. The children fire individually via `/ft-task CORE-154.2`, etc., on the user's hand-off.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure PLAN.md markdown filing; no executable surface).
- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass instead (results below).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

Markdown mental-pass on the edited `_project/PLAN.md` block under `## High`:

| Check | `.2` | `.3` | `.4` | `.5` | `.6` |
|---|---|---|---|---|---|
| 2-space child indent | ✓ | ✓ | ✓ | ✓ | ✓ |
| `**TASK-ID**` bold ID | ✓ | ✓ | ✓ | ✓ | ✓ |
| `[opus]` tag | ✓ | ✓ | ✓ | ✓ | ✓ |
| `\| <shortname>` ≤30 chars | ✓ (27) | ✓ (22) | ✓ (13) | ✓ (18, **fixed**) | ✓ (5) |
| Em-dash separator ` — ` | ✓ | ✓ | ✓ | ✓ | ✓ |
| Long desc ≤50w target | ✓ (41w) | ✓ (42w) | ✓ (46w) | ✓ (41w) | n/a |
| No trailing whitespace | ✓ | ✓ | ✓ | ✓ | ✓ |

**One mental-pass fix applied:** `.5` shortname `idiosyncrasy-claude-regression-recomb` (37 chars) exceeded SPEC's ~30 char target. Trimmed to `portability-recomb` (18 chars) — preserves the re-comb signal tying to [[CORE-132]] precedent + names the lens (multi-agent portability). The long description still describes the two-pass content (idiosyncrasy re-comb + Claude-Code-effectiveness regression check), so no information loss from the shortname trim.

**Wikilink-integrity check.** The three `[[CORE-132]]` / `[[CORE-138]]` / `[[CORE-139]]` wikilinks in `.2` and `.5` long descriptions are intentional parseable cross-references (per SPEC §"Long-description conventions" — they land in `Task.relatedTasks` for the visualizer). All three target IDs exist in `_project/PLAN.md` `## Completed`. No `[[<placeholder>]]` angle-bracket form needed here.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` (per SPEC §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (inline on conditional skip — signals clear; see Final Summary below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |

Pure Discovery filing — contract-layer edits land inside the implementation children (`.2 / .3 / .4 / .5`), not here. Expected per `/ft-epic-discovery` skill §Step 9 ("typically no AI-referenced doc updates land in pure Discovery filing").

**Final Summary:**

Filed `CORE-EPIC-154` (multi-agent-portability) under `## High` with the full six-line cohort: parent epic + `.1` Discovery + `.2..5` implementation children + `.6` audit. Closed the `.1` Discovery itself; the four implementation children now have concrete scope ready for individual `/ft-task` hand-off.

Technical detail:
- **6 PLAN.md lines filed** in `_project/PLAN.md` under `## High`: parent `CORE-EPIC-154` (49w long description, under target) + 5 cohort children with 2-space indent.
- **4 implementation children word-counts** (long desc, ≤50w target): `.2` 41w · `.3` 42w · `.4` 46w · `.5` 41w. All under target.
- **1 shortname trim at Phase 3 mental-pass:** `.5` `idiosyncrasy-claude-regression-recomb` (37 chars) → `portability-recomb` (18 chars), preserves the re-comb signal tying to [[CORE-132]] precedent.
- **Adopter wiring stability locked** as Constitution non-negotiable: existing `.claude/commands/ft-*.md` + `.claude/skills/ft-*` symlinks in adopter projects are preserved by default; `.3` starts from status-quo option.
- **4 load-bearing scoping clarifications resolved** via deep pre-pass Stage 3 (`.3` starting bias = status-quo, `.4` doc location = `docs/PLATFORMS.md`, `.5` regression-check method = read-through, release timing = decoupled).
- **Archive skim surfaced 7 load-bearing precedents** linked into Discovery Notes table: [[CORE-129]] AGENTS.md migration, [[CORE-091]] wiring-snippet single-source, [[CORE-104]]/[[CORE-106]] `ft-` namespace, [[CORE-132]] idiosyncrasy comb, [[CORE-138]]/[[CORE-141]] Anthropic-lock generalization, [[CORE-139]] Claude-Code wording, [[CORE-EPIC-097]]/[[CORE-EPIC-099]] external surveys.
- **N=6 held** — no audit-number bump; `.6` audit line filed at Step 4 stays as-is. `.3` retains in-child re-scope authority if Phase 1 surfaces structural complexity.
- **Two minor in-child Phase 1 deferrals** (non-load-bearing at filing time): `.2`'s intentional-surface-ledger location and `.4`'s scaffold-shape for the platform-add example. Each child's Discovery decides.

**Archived:** 2026-05-23
