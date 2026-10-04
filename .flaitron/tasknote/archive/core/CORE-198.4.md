---
title: grok-adoption-verification
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-198, CORE-198.1, CORE-198.2, CORE-198.3, CORE-198.5]
---

# CORE-198.4 | grok-adoption-verification

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-198]] · [[CORE-198.1]] · [[CORE-198.2]] · [[CORE-198.3]] · [[CORE-198.5]]

## 🎯 Goal

Read-through verification that flowtron's AGENTS.md paste-block + `docs/PLATFORMS.md` plug-in pattern serve grok-cli adoption cleanly; add a short Grok-specific subsection to PLATFORMS.md only if quirks surface.

## ✅ Acceptance

- [ ] Verification verdict recorded: AGENTS.md paste-block serves grok-cli cleanly (no Claude-specific assumptions block adoption)
- [ ] Verification verdict recorded: `docs/PLATFORMS.md` plug-in pattern serves grok-cli cleanly (skill/command primitives map 1:1)
- [ ] Grok added to AGENTS.md-readers enumeration in `templates/tasknote-README.md:75`
- [ ] Grok added to AGENTS.md-readers enumeration in `docs/AGENT-NEUTRALITY.md:40`
- [ ] Grok added to `docs/PLATFORMS.md` §"Today's surface" contract-layer-only row
- [ ] New `docs/PLATFORMS.md` subsection lands covering context-load semantics + AGENTS.md visibility + skill/command primitives; sourced from xAI docs + launch coverage with explicit pre-adoption disclaimer
- [ ] Out-of-scope confirmed: no `grok/` wiring directory created; no new slash commands; no skill bodies translated to grok format
- [ ] Phase 4 doc-drift sweep verdicts recorded across `_project/tasknote/README.md` §"AI-referenced docs" (PLATFORMS.md + AGENT-NEUTRALITY.md updated by this task; others verified no-change)

## 🧩 Subtasks

- [ ] Phase 2.a: Edit `templates/tasknote-README.md:75` — append `Grok Build` to the AGENTS.md-readers enumeration ("Claude Code, Codex, Cursor, Amp, Aider" → "Claude Code, Codex, Cursor, Amp, Aider, Grok Build")
- [ ] Phase 2.b: Edit `docs/AGENT-NEUTRALITY.md:40` — same enumeration update
- [ ] Phase 2.c: Edit `docs/PLATFORMS.md` §"Today's surface" row 2 — add "Grok Build" to the contract-layer-only platform list
- [ ] Phase 2.d: Insert new short subsection in `docs/PLATFORMS.md` (between "Worked example: Claude Code" and "When this doc is useful") covering grok-cli quirks via 3-row table + disclaimer
- [ ] Phase 3: markdown mental-pass on each edited doc; verify table formatting + cross-refs + tone parity
- [ ] Phase 4: doc-drift sweep verdicts + flip `.4` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-198]] — parent epic (context-chain-portability)
- [[CORE-198.1]] — Discovery that filed this subtask
- [[CORE-198.2]] — redundancy audit that informed the consolidation
- [[CORE-198.3]] — CLAUDE.md consolidation (just completed)
- [[CORE-198.5]] — final epic audit (closes the epic after this)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed (with scope expansion via structured ask — see Discovery Notes)
  **Rationale:** User's epic `CORE-EPIC-198` resolved at `.1` Discovery that Grok adoption gets a "verification-only doc pass" (no new wiring; no parallel `grok/` directory). The `.4` PLAN.md line scoped this as paste-block + PLATFORMS.md plug-in pattern read-through with an optional small subsection. Web search (xAI docs + launch coverage) confirmed Grok Build reads AGENTS.md natively and exposes a skill model structurally identical to Claude Code's. Verification verdicts: both surfaces serve grok-cli cleanly. Re-scope NOT warranted — original scope holds; user's structured-ask answers expanded the edit footprint from 1 surface (PLATFORMS.md subsection) to 4 (2 enumeration updates + PLATFORMS.md row + PLATFORMS.md subsection).

- [x] Read relevant source files:
  - `claude/AGENTS-snippet.md` — paste-block (lines 9-21) confirmed agent-neutral; no Claude-specific runtime assumptions in the workflow contract block itself
  - `docs/PLATFORMS.md` — two-layer model + "Today's surface" table (lines 28-32) + plug-in scaffold sketch (lines 92-150) reviewed; Grok listed in "future hypothetical" framing (lines 49-51, 64) but NOT in the contract-layer-only row
  - `docs/AGENT-NEUTRALITY.md` — paste-block agent-neutrality contract (lines 1-18) + load-bearing-references ledger (lines 29-47); enumeration at line 40 omits Grok
  - `docs/MIGRATION.md` — §1.3 paste-block step (line 93) is agent-neutral; AGENTS.md "read by Claude Code, Codex CLI, Cursor, Sourcegraph Amp, and Aider" enumeration also omits Grok
  - `templates/tasknote-README.md:75` — AGENTS.md entry enumeration omits Grok
  - `_project/tasknote/archive/core/CORE-198.1.md` — Discovery decisions (Grok = verification-only; hybrid scope; lift policy = audit + recommendations only)
  - `_project/tasknote/archive/core/CORE-198.3.md` — sibling consolidation tasknote; confirmed `~/code/CLAUDE.md` retired (Grok-cli inherits global `~/.claude/CLAUDE.md` via cwd walk-up fallback — irrelevant to this task, AGENTS.md is the channel)

- [x] **Archive skim** — `_project/tasknote/archive/core/`. Targeted greps for `grok` / `PLATFORMS.md` / `AGENT-NEUTRALITY.md` surfaced load-bearing precedents below.

- [x] **Drift check** — All cited surfaces verified at HEAD:
  - **Grok mentions in contract layer:** 12 hits across 6 files. Distribution: `docs/PLATFORMS.md` (5 — sibling-platform plug-in scaffold) · `docs/AGENT-NEUTRALITY.md` (3 — out-of-scope clarifier + future-platform-wiring callout) · `SPEC.md:53` (1 — repo-layout future-platform parenthetical) · `README.md:29,118` (2 — repo-layout future-platform parenthetical) · `claude/skills/ft-flowtron/SKILL.md:70` (1 — PLATFORMS.md description parenthetical). **All in "future sibling-platform wiring dir" framing established at CORE-154.4.** None of these contradict adding Grok as a current contract-layer adopter.
  - **Three enumerations to update verified at exact line numbers:**
    - `templates/tasknote-README.md:75` ✓ (current: "Claude Code, Codex, Cursor, Amp, Aider")
    - `docs/AGENT-NEUTRALITY.md:40` ✓ (current: "Claude Code, Codex CLI, Cursor, Amp, Aider" — exact phrasing)
    - `docs/PLATFORMS.md:32` ✓ ("Today's surface" table row 2: "Codex CLI, Cursor, Sourcegraph Amp, Aider")
  - **No flowtron contract-side rename burden** — adding "Grok Build" to enumerations is purely additive; no IDs / paths / structural changes touched.
  - **Web-search verification (xAI docs + launch coverage May 2026):**
    - Grok Build reads AGENTS.md natively: "Out of the box, Grok Build picks up AGENTS.md — a project-level instructions file that the agent reads before it does anything" (xAI launch narrative)
    - CLAUDE.md migration compat: "Grok Build reads CLAUDE.md files natively, and if you're migrating from Claude Code, your project instructions carry over without any changes" (xAI launch narrative)
    - GROK.md (canonical): `.grok/GROK.md` (cwd walk-up) + `~/.grok/GROK.md` (global fallback) — orthogonal to flowtron (AGENTS.md is the paste-block target)
    - Skills: `.grok/skills/<name>/` (cwd walk to repo root) + `~/.grok/skills/` + plugin paths + config-declared paths (`[skills] paths` in `~/.grok/config.toml`); skill bodies are markdown; user-invocable skills auto-wire as `/<skill-name>` slash commands (xAI docs `/build/features/skills-plugins-marketplaces`)

- [x] Asked clarifying questions — **2 structured asks resolved 4 scoping decisions** (see "Resolved scoping" table in Discovery Notes below).

- [x] Subtasks above populated with concrete, ordered steps (see ✅ Acceptance + 🧩 Subtasks above).

**Discovery Notes:**

**Load-bearing precedents from archive skim:**

| Precedent | What it locked | How CORE-198.4 extends it |
|---|---|---|
| [[CORE-EPIC-154]] multi-agent-portability (closed 2026-05-23) | Contract layer is agent-neutral; wiring layer is per-platform; sibling-platform plug-in pattern in `docs/PLATFORMS.md`; AGENT-NEUTRALITY ledger records load-bearing Claude-specific references | `.4` validates the pattern works for Grok specifically — confirms paste-block + plug-in scaffold serve grok-cli without modification |
| [[CORE-198.1]] context-chain-portability Discovery (closed 2026-05-25) | Grok = verification-only doc pass (no new wiring; no parallel `grok/` directory); `.4` independent of `.2`/`.3` | `.4` executes exactly that scope; structured-ask answers expanded the *edit footprint* (3 surfaces) but not the *deliverable shape* (verification + doc edits, no wiring) |
| [[CORE-EPIC-154]].4 PLATFORMS.md authoring | Established the "Today's surface" table shape (platform · how it consumes flowtron · what ships in this repo) | `.4` extends row 2 in-place to add Grok Build; adds a sibling §"Grok Build adoption notes" subsection for the quirks the table can't compactly encode |

**Resolved scoping (via 2 structured asks):**

| # | Question | Resolution | Affects |
|---|---|---|---|
| 1 | Adoption status of grok-cli | **Imminent — about to adopt** (user has not yet executed but is preparing) | Justifies moving Grok from "future-hypothetical" to "contract-layer-only-today" in enumerations; subsection ships with pre-adoption disclaimer |
| 2 | Enumeration edits scope | **Add grok everywhere it's missing** — 2 AGENTS.md-reader enumerations + PLATFORMS.md "Today's surface" row | Phase 2 has 3 enumeration edits + 1 new subsection (4 atomic ops); no other enumeration surfaces touched (drift check confirmed 12 hits, 9 are future-platform-wiring framing and stay unchanged) |
| 3 | Quirks subsection coverage | **All three areas:** context-load semantics · AGENTS.md visibility · skill/command primitives | Subsection ships as 3-row table; each row maps "behavior" → "flowtron implication" |
| 4 | Subsection sourcing approach | **Web-search grok-cli docs first** | Phase 1 completed web search; Discovery Notes encode findings; subsection ships with explicit "Pre-adoption verification only — content reflects xAI docs + launch coverage as of May 2026; update on first-use observation" disclaimer |

**Verification verdicts (the core deliverable):**

| Surface | Verdict | Evidence |
|---|---|---|
| AGENTS.md paste-block (`claude/AGENTS-snippet.md` §"Block to paste into AGENTS.md") | ✅ **Serves grok-cli cleanly** — no edits needed | Paste-block contains zero Claude-specific runtime assumptions: it references `_project/flowtron/SPEC.md`, `_project/PLAN.md`, tasknote paths, the 4-phase workflow, and slash commands (`/ft-task` etc.). Slash-command syntax is already listed as agent-neutral surface in [`AGENT-NEUTRALITY.md`](../../docs/AGENT-NEUTRALITY.md) line 34 (canonical flowtron skill names). Grok Build reads AGENTS.md natively per xAI launch ("picks up AGENTS.md before it does anything"). |
| `docs/PLATFORMS.md` plug-in pattern (§"The symmetric plug-in pattern" + §"Minimal scaffold sketch") | ✅ **Serves grok-cli cleanly** — pattern is structurally exact-match | Grok's skill model (`.grok/skills/<name>/` with markdown bodies + auto-wired `/<skill-name>`) is 1:1 with Claude's `.claude/skills/<name>/SKILL.md`. A future contributor shipping `grok/` wiring would: copy `claude/` shape (`commands/` + `skills/` + `AGENTS-snippet.md`); install via relative symlinks from `.grok/skills/<name>` into the submodule; reuse the `ft-` namespace per SPEC §"Skill namespace". Zero pattern friction. |

**Proposed PLATFORMS.md subsection (draft for Phase 2 implementation):**

Placement: between §"Worked example: Claude Code" (line 163) and §"When this doc is useful" (line 192). Shape: 3-row table + 2-paragraph framing. Approx 25 lines.

```markdown
## Grok Build adoption notes

xAI's [Grok Build](https://x.ai/cli) CLI (launched May 2026) adopts
flowtron via the **contract-layer-only path** — same as Codex CLI /
Cursor / Amp / Aider. No `grok/` wiring directory exists today;
adopters paste the `AGENTS.md` block per [`MIGRATION.md`](MIGRATION.md)
§1.3 and drive the contract conversationally.

| Quirk | Behavior | Flowtron implication |
|---|---|---|
| **Context-load semantics** | Grok Build reads three context files: `AGENTS.md` (open standard), `CLAUDE.md` (Anthropic-popularized; Grok-compat fallback), and `GROK.md` (Grok-canonical, at `.grok/GROK.md` with cwd walk-up + `~/.grok/GROK.md` global fallback) | Use `AGENTS.md` — already the paste-block target and the cross-vendor canonical entry point. `GROK.md` is orthogonal to flowtron. |
| **AGENTS.md visibility** | Grok Build "picks up AGENTS.md before it does anything" per xAI launch coverage — same load-before-act semantic as Claude Code | Paste-block is visible without configuration; no truncation noted in launch narratives |
| **Skill / command primitives** | Skills live at `.grok/skills/<name>/` (cwd-walk to repo root) + `~/.grok/skills/` + plugin paths + custom paths via `[skills] paths` in `~/.grok/config.toml`. Skill bodies are markdown; user-invocable skills auto-wire as `/<skill-name>` slash commands | A future `grok/` sibling-dir contributor could mirror `claude/`'s shape 1:1: markdown skill bodies, relative symlinks from adopter `.grok/skills/<name>` into the submodule. The `ft-` namespace per SPEC §"Skill namespace" reserves skill names cross-platform. |

_Pre-adoption verification only._ Content above reflects xAI documentation and
Grok Build launch coverage as of May 2026; flowtron has not shipped `grok/`
wiring and has not run a Grok Build session against an adopting project.
Update on first-use observation if anything diverges.
```

**Out-of-scope (deliberate, confirmed by user):**

- No `grok/` sibling-directory creation (locked at CORE-198.1 Discovery)
- No new slash commands or skill body translations
- No edits to README.md / SPEC.md / ft-flowtron SKILL.md parentheticals that frame Grok as "future hypothetical wiring" — those remain accurate since `grok/` wiring is still hypothetical even though contract-layer adoption is imminent
- No GROK.md (`.grok/GROK.md`) artifact on the user side — orthogonal to flowtron (AGENTS.md is the channel)

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced moderate-or-larger scope deviation — the PLAN.md line's optional "small subsection if quirks surface" expanded to 4 atomic edit ops across 3 docs (2 enumeration updates + 1 table-row update + 1 new subsection). User's structured-ask answers materially restructured the subtask list (1 op → 4 ops) and added the cross-cutting concern of multi-doc enumeration parity. Per the `default-skip` rule's "Fire 🛠️" carve-out ("restructured the subtask list, added a cross-cutting concern"): → **Fire 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing [[CORE-EPIC-154]] PLATFORMS.md "Today's surface" + scaffold-sketch shape. Closest precedent for the new "Grok Build adoption notes" subsection is the §"Worked example: Claude Code" block (lines 163-182) — same H2-headed concrete-platform pattern with paragraph framing + structured detail. The 3-row quirks table is a tighter shape than the bulleted concrete-instantiation list used for Claude Code, justified by the 3 discrete user-resolved quirk axes (context-load / visibility / primitives) being naturally tabular.
- [x] Implemented the minimal solution — 4 in-scope edits + 3 doc-drift-sweep follow-on edits (see Implementation Notes).
- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown edits to contract-layer docs; no executable surface).

**Implementation Notes:**

**4 in-scope edits (planned at Discovery, all atomic):**

| # | File:Line | Edit |
|---|---|---|
| 1 | `templates/tasknote-README.md:75` | AGENTS.md-readers enumeration: appended `, Grok` (short form, parity with `Codex`) |
| 2 | `docs/AGENT-NEUTRALITY.md:40` | Ledger row enumeration: appended `, Grok Build` (full form, parity with `Codex CLI`) |
| 3 | `docs/PLATFORMS.md:32` | §"Today's surface" row 2 platform header: appended `, Grok Build`; appended cross-ref to §"Grok Build adoption notes" in the "what ships" cell |
| 4 | `docs/PLATFORMS.md:192-209` | New §"Grok Build adoption notes" subsection inserted between §"Worked example: Claude Code" and §"When this doc is useful" — 18-line section: 1-paragraph framing + 3-row quirks table + italicized pre-adoption disclaimer |

**3 doc-drift-sweep follow-on edits (surfaced at Phase 4 sweep; same shape; consumed in-task per the user's structured-ask scope "add grok everywhere it's missing"):**

| # | File:Line | Edit |
|---|---|---|
| 5 | `docs/MIGRATION.md:95` | §1.3 AGENTS.md-readers enumeration: appended `, and Grok Build` (full form, parity with `Codex CLI`) |
| 6 | `docs/MIGRATION.md:274` | §3.7 AGENTS.md-readers enumeration: appended `, and Grok` (short form, parity with `Codex`) |
| 7 | `docs/PLATFORMS.md:158` | §"Mandatory vs. optional reference" contract-layer-only platform list: appended ` / Grok Build` |

**Net diff** (per `git diff --stat`): `docs/AGENT-NEUTRALITY.md` 1 line · `docs/MIGRATION.md` 2 lines · `docs/PLATFORMS.md` ~22 lines (1 row + new subsection + 1 reference-table cell) · `templates/tasknote-README.md` 1 line. **4 files touched · 4 contract-layer docs · 0 wiring layer · 0 SPEC contract surface · 0 executable code.**

**Out-of-scope (confirmed not touched):**

- No `grok/` sibling-directory created (locked at CORE-198.1)
- No edits to README.md / SPEC.md / claude/skills/ft-flowtron/SKILL.md parentheticals — those frame `grok/` as "future hypothetical wiring dir", which remains accurate (wiring is still hypothetical; contract-layer adoption is what flipped to imminent-current)
- No edits to AGENT-NEUTRALITY.md L16 / L57 / L74 — those reference Grok in "future-platform-wiring" framing (L16, L74) or are about question primitives unrelated to AGENTS.md-readers (L57)
- No edits to claude/AGENTS-snippet.md paste-block — already agent-neutral; no enumeration to update
- No GROK.md / `.grok/skills/` artifacts created on adopter or flowtron side

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown content edits to contract-layer docs; no executable surface).
- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass below substitutes (per [[CORE-198.3]] / [[CORE-132]] precedent for doc-only tasknotes).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

**Markdown mental-pass on all 4 edited files:**

| Check | tasknote-README.md L75 | AGENT-NEUTRALITY.md L40 | PLATFORMS.md L32 (row) | PLATFORMS.md L158 (ref-table) | PLATFORMS.md L192-209 (subsection) | MIGRATION.md L95 | MIGRATION.md L274 |
|---|---|---|---|---|---|---|---|
| Enumeration parity (short vs full form) | ✓ "Grok" matches "Codex" | ✓ "Grok Build" matches "Codex CLI" | ✓ "Grok Build" matches "Codex CLI" | ✓ "Grok Build" matches "Codex CLI" | n/a | ✓ "Grok Build" matches "Codex CLI" | ✓ "Grok" matches "Codex" |
| Table cell formatting | n/a | ✓ pipes intact | ✓ pipes + cross-ref render | ✓ pipes intact | ✓ 3-row table renders | n/a | n/a |
| Cross-reference integrity | n/a | n/a | ✓ `§"Grok Build adoption notes"` target exists at L192 | n/a | ✓ [`MIGRATION.md`](MIGRATION.md) link valid; `x.ai/cli` external link valid | n/a | n/a |
| Section nesting (H2) | n/a | n/a | n/a | n/a | ✓ `## Grok Build adoption notes` H2 matches §"Worked example: Claude Code" H2 above + §"When this doc is useful" H2 below | n/a | n/a |
| Pre-adoption disclaimer present | n/a | n/a | n/a | n/a | ✓ italicized leading "Pre-adoption verification only" + trailing "Update on first-use observation if anything diverges" | n/a | n/a |
| Insertion point preserves blank-line separation | n/a | n/a | n/a | n/a | ✓ blank line before + after H2 | n/a | n/a |
| Surrounding prose untouched | ✓ | ✓ | ✓ (row cell extended; row identity preserved) | ✓ | ✓ (no other section affected) | ✓ | ✓ |

**No-edit verifications (drift check found these surfaces correctly framed):**

- `docs/PLATFORMS.md:64` — `` `codex` (OpenAI Codex CLI), `grok` (grok-cli), `cursor` (Cursor IDE) `` — naming-convention enumeration for hypothetical sibling-dir wirings; Grok already present in future-wiring framing. Leave.
- `docs/AGENT-NEUTRALITY.md:16` / `:74` — "Future platform wiring (Codex CLI, grok, Cursor, …) plugs in" / "future non-Claude-Code platform wirings (e.g., `codex/`, `grok/`, `cursor/`)" — both about hypothetical wiring dirs, not contract-layer reader enumeration. Leave.
- `docs/AGENT-NEUTRALITY.md:57` — "Codex CLI question shapes, Cursor multi-choice prompts" — structured-ask primitives, not AGENTS.md readers. Leave (Grok Build's structured-ask primitive isn't documented yet).
- `SPEC.md:53` / `README.md:29,118` / `claude/skills/ft-flowtron/SKILL.md:70` — all frame `grok/` as future hypothetical wiring dir. Accurate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (signals clear — see Final Summary; emits inline behind autonomous-commit marker per SPEC §"Conditional skip rule")

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change — §"Repo layout" `(e.g., codex/, grok/, cursor/)` parenthetical is future-wiring framing; remains accurate |
| `SPEC.md` | no change — §"Working in the flowtron repo itself" parenthetical same as README |
| `docs/MIGRATION.md` | **updated** — §1.3 (L95) + §3.7 (L274) AGENTS.md-readers enumerations both appended with Grok (sweep finding) |
| `claude/AGENTS-snippet.md` | no change — paste-block is agent-neutral; no enumeration to update |
| `docs/CONVENTIONS.md` | no change — no AGENTS.md-readers enumeration present |
| `CONTRIBUTING.md` | no change — no AGENTS.md-readers enumeration present |
| `SECURITY.md` | no change — Claude Code subsection is scope-correct per [[CORE-154.2]] reframe; no Grok mention warranted |
| `docs/AGENT-NEUTRALITY.md` | **updated** — L40 enumeration appended with Grok Build (planned at Discovery) |
| `docs/PLATFORMS.md` | **updated** — L32 row 2 enumeration + cross-ref appended (planned); L158 reference-table appended (sweep finding); new §"Grok Build adoption notes" subsection at L192-209 (planned) |

3 of 9 AI-ref docs updated (PLATFORMS.md + AGENT-NEUTRALITY.md + MIGRATION.md). 6 verified no-change. Doc-drift sweep produced 3 follow-on edits (MIGRATION.md ×2 + PLATFORMS.md ref-table) consumed in-task per the user's structured-ask scope "add grok everywhere it's missing" — Phase 4 closure-ops scope authorizes propagating the same finding-shape edits.

**Final Summary:**

Verified that flowtron's AGENTS.md paste-block and `docs/PLATFORMS.md` plug-in pattern both serve grok-cli adoption cleanly with zero edits to the contract surface itself — Grok Build reads AGENTS.md natively, and its `.grok/skills/` model mirrors Claude's `.claude/skills/` 1:1 for any future contributor shipping `grok/` wiring. Promoted Grok from "future hypothetical wiring" to "current contract-layer adopter" across 6 enumeration sites in 3 contract-layer docs, and added a 3-row "Grok Build adoption notes" subsection to PLATFORMS.md documenting context-load semantics (3-file convention), AGENTS.md visibility (load-before-act), and skill/command primitives (markdown skills auto-wired as `/<skill-name>`).

Technical detail:
- **7 atomic edits across 4 contract-layer docs:** `docs/PLATFORMS.md` (3 — row 2 enumeration + cross-ref · L158 reference-table · new 18-line subsection L192-209) · `docs/MIGRATION.md` (2 — §1.3 L95 + §3.7 L274 enumerations) · `docs/AGENT-NEUTRALITY.md` (1 — L40 ledger row enumeration) · `templates/tasknote-README.md` (1 — L75 enumeration).
- **Net `git diff --stat`:** ~26 lines added across 4 files. Zero deletions of substantive content.
- **Scope-expansion path:** PLAN.md line scoped 1 surface (optional PLATFORMS.md subsection). User's 2 structured asks expanded to 4 surfaces (2 enumeration updates + PLATFORMS.md row + PLATFORMS.md subsection). Phase 4 doc-drift sweep surfaced 3 more (MIGRATION.md ×2 + PLATFORMS.md ref-table) consumed in-task. Total 7 edits, all same finding-shape ("add Grok to a contract-layer enumeration").
- **Sourcing for the subsection:** web search of xAI docs ([docs.x.ai/build/modes-and-commands](https://docs.x.ai/build/modes-and-commands) · [docs.x.ai/build/features/skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)) + Grok Build launch coverage (May 2026). Subsection ships with explicit "Pre-adoption verification only" disclaimer noting flowtron has not yet run a Grok Build session against an adopting project.
- **Verification verdicts (the core deliverable):** ✅ AGENTS.md paste-block (`claude/AGENTS-snippet.md`) serves grok-cli cleanly — no Claude-specific runtime assumptions in the workflow block; Grok Build reads AGENTS.md natively per xAI launch ("picks up AGENTS.md before it does anything"). ✅ PLATFORMS.md plug-in pattern serves grok-cli cleanly — Grok's `.grok/skills/<name>/` (markdown bodies + auto-wired `/<skill-name>`) is structurally identical to Claude's `.claude/skills/<name>/SKILL.md`; a future `grok/` contributor would face zero pattern friction.
- **Out-of-scope (held):** No `grok/` wiring directory; no slash-command translation; no GROK.md artifacts; no edits to "future-platform-wiring" parentheticals in README.md / SPEC.md / SKILL.md (still accurate since wiring is still hypothetical even though contract-layer adoption is imminent).
- **Net for the epic:** `.4` cleanly closes the contract-layer Grok-adoption-verification work. `.5` (audit) remains as the canonical epic-close per `SPEC/epic.md` and can fire next; with `.1`/`.2`/`.3`/`.4` all closed, all `.2..(N-1)` implementation children are complete and `.5` audit is unblocked.

**Archived:** 2026-05-25
