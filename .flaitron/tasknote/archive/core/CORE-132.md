---
title: user-idiosyncrasy comb
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: [CORE-073, CORE-101, CORE-038, CORE-074]
---

# CORE-132 | user-idiosyncrasy comb

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-22 · 🔗 [[CORE-073]] [[CORE-101]] [[CORE-038]] [[CORE-074]]

## 🎯 Goal

Run a 5-pass `/ft-audit`-shaped sweep over flowtron's adopter-facing surface to surface user-flavored content that wouldn't generalize to the next adopter, filing each finding as a prioritized PLAN.md ticket (no in-place edits in this task).

## ✅ Acceptance

- [ ] Pass set finalized (5 lenses) and recorded in Discovery Notes
- [ ] Each pass executed across the agreed scope; findings capped at 5/pass
- [ ] Findings filed as discrete PLAN.md rows under the appropriate priority sections (per-finding model + shortname + 1-line description)
- [ ] Findings explicitly exclude lint/drift/docs-currency issues (those belong to `/ft-audit` and `/ft-audit-docs`) and the `cd && git` preference (explicitly out-of-scope per starter)
- [ ] Audit Notes section in this tasknote summarizes verdicts, per-pass coverage, and notable "looked at, defended itself" items that did NOT become tickets

## 🧩 Subtasks

- [x] Confirm one-shot vs. dedicated `/ft-audit-idiosyncrasy` skill — **one-shot** (Discovery Q1)
- [x] Confirm 5-pass set — **refined 5** (Discovery Q2, see Discovery Notes)
- [x] Confirm scope file set — **starter scope + SECURITY.md + CONTRIBUTING.md + docs/CONVENTIONS.md** (Discovery Q3)
- [ ] Execute Pass 1 (First-person voice & anecdotal residue) → log findings + verdicts
- [ ] Execute Pass 2 (Tool/stack assumption in examples) → log findings + verdicts
- [ ] Execute Pass 3 (Markdown-vault positioning) → log findings + verdicts
- [ ] Execute Pass 4 (Model & assistant assumptions) → log findings + verdicts
- [ ] Execute Pass 5 (Solo-developer & workspace assumptions) → log findings + verdicts
- [ ] File each surviving finding as a PLAN.md ticket with model + shortname + 1-line description (each carrying `Surfaced by CORE-132 audit 2026-05-22 (Finding #N, <severity>)` parenthetical per /ft-audit §5 step 3)
- [ ] Summarize: total tickets filed, per-pass split, notable non-findings

## 🔗 Related

- [[CORE-073]] — audit-flowtron-self; prior structural audit (different lens)
- [[CORE-101]] — audit-family bundle; consolidated audit skill family (no archive file — closed out-of-band)
- [[CORE-038]] — task SKILL cite-don't-restate; prior content-trim pass
- [[CORE-074]] — cite-not-restate sweep; broader cite-don't-restate pass

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The audit lens (user-flavored vs. adopter-shareable) is distinct from prior audit passes ([[CORE-073]] structural · [[CORE-074]] cite-not-restate · [[CORE-101]] audit-family bundle), and the recent self-host wave ([[CORE-104]] · [[CORE-129]] · [[CORE-130]]) explicitly increased the surface that's now in scope but never swept for this lens. CORE-073's 5-pass-with-capped-findings + PLAN.md-ticket-output shape is a direct template; only the lens reframes. Output is filing only — no in-place edits in this task — keeping scope tight and downstream-triageable.

- [x] Read relevant source files — `README.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `SPEC.md` (header + principles + working-in-flowtron-repo sections). Confirmed scope coherence and surfaced the "Working in markdown vaults" / "What flowtron deliberately is not" / "fintown/InvisiPaw/photard" anchors for Phase 2 passes.
- [x] **Archive skim** — `_project/tasknote/archive/core/` searched for prior user-flavored / cite-not-restate / audit-family precedents:
  - [[CORE-073]] (2026-05-10) — direct template: 5-pass/capped-findings/PLAN-ticket-output shape, run on `SPEC.md` + `claude/skills/`. CORE-132 reframes the lens (user-flavored vs. CORE-073's safety/idioms/hygiene/orphans/drift).
  - [[CORE-074]] (2026-05-10) — cite-not-restate sweep across 6 SKILLs. Adjacent in spirit (de-duplication of restated content) but mechanically a different deliverable (edits, not tickets).
  - [[CORE-038]] / [[CORE-050]] / [[CORE-051]] — earlier cite-not-restate passes on individual SKILLs; precedent for "SKILLs cite SPEC, don't restate it."
  - [[CORE-129]] (2026-05-22) — AGENTS.md migration: paste-block target moved from CLAUDE-snippet.md → AGENTS-snippet.md. This is why the starter's `AGENTS.md` reference drifted.
  - [[CORE-130]] (2026-05-22) — flowtron self-host skill wiring; expanded what counts as "shipped" surface.
  - [[CORE-104]] (2026-05-17) — skill namespace prefix (`ft-` reservation). Adopter-shareability driver — same lens family as CORE-132.
  - No prior tasknote ran a "user-flavored vs. adopter-shareable" lens specifically.
- [x] **Drift check** — promotion-time drift logged below in this section. All in-scope paths confirmed at HEAD 2026-05-22; AGENTS.md → `claude/AGENTS-snippet.md` correction applied (user-confirmed).
- [x] Asked clarifying questions — three design choices resolved via AskUserQuestion: Q1 → one-shot (no new skill); Q2 → refined 5-pass set; Q3 → include SECURITY.md + CONTRIBUTING.md + docs/CONVENTIONS.md.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Drift at promotion (logged):** Starter "Files to touch" cited `AGENTS.md` at repo root; flowtron has no root-level AGENTS.md — the snippet adopters paste lives at `claude/AGENTS-snippet.md` (per [[CORE-129]]). Scope swapped to the snippet (user-confirmed).
- **Drift at promotion (logged):** Related task `[[CORE-101]]` has no archive file at `_project/tasknote/archive/core/CORE-101.md` — wikilink will not resolve. CORE-101 closed out-of-band 2026-05-17 (PLAN.md row only). Annotated in 🔗 Related; not a blocker.
- **Starter context absorbed** into Goal/Acceptance/Subtasks (user-confirmed); starter block dropped, history preserved in git.

### Locked audit configuration

**Scope (read-only; only write = ticket appends to `_project/PLAN.md`):**

- `templates/**/*.md`
- `claude/skills/**/*.md`, `claude/commands/**/*.md`
- `claude/AGENTS-snippet.md`
- `SPEC.md`, `SPEC/**/*.md`
- `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `docs/CONVENTIONS.md`
- `README.md`, `SECURITY.md`, `CONTRIBUTING.md`

Excluded by design: `_project/tasknote/archive/` (write-once historical records), `legacy/`, `viz/` (non-markdown surface), `_project/PLAN.md` (the output target).

**5-pass lens (user-flavored vs. adopter-shareable):**

| Pass | Lens | Example tells |
|---|---|---|
| 1 | **First-person voice & anecdotal residue** | `I` / `me` / `my` / `we`; named-project anecdotes (`fintown`, `InvisiPaw`, `photard`); historical-incident references that don't carry forward to adopters |
| 2 | **Tool/stack assumption in examples** | FastAPI, Vite, port registry numbers, `zsh`-isms, `brew`-isms, Python-or-Node assumptions in stack-neutral docs |
| 3 | **Markdown-vault positioning** | Obsidian / Dataview / Foam / Logseq framed as "what we do" rather than "opt-in companions"; per `[[project_obsidian_positioning]]` memory the framing should be positioning-only |
| 4 | **Model & assistant assumptions** | Opus/Sonnet model names baked into adopter-facing prose; Claude-only references where AGENTS.md is supposed to be agent-neutral (Codex / Cursor / Aider / Amp also consume it) |
| 5 | **Solo-developer & workspace assumptions** | Single-user phrasing (`my projects`), hardcoded `~/code/` workspace layout, single-instance viz assumption, "my machine" framing where the adopter has their own machine |

**Cap:** 5 findings per pass (per `/ft-audit` §2 / [[CORE-073]] precedent). Severity floor: Low. Output: each finding → one PLAN.md ticket with `Surfaced by CORE-132 audit 2026-05-22 (Finding #N, <severity>)` parenthetical.

**Explicit out-of-scope (per starter Decisions table):**

- `cd <project-root> && git ...` aversion — personal preference owned by `~/.claude/CLAUDE.md`, not adopter-shareable from flowtron's perspective.
- Code-quality / lint / drift findings — owned by `/ft-audit`, `/ft-audit-docs`.
- In-place edits — fixes file as separate tickets; let the user triage.

**Pass-execution shape:** Per pass, run a targeted grep over the locked scope, manually triage hits (a grep hit is not a finding — many will defend themselves on inspection), record the top-≤5 surviving findings with file:line + 1-sentence rationale + proposed severity, then move to the next pass. After all 5 passes, propose tickets in a single bundle for user approval before writing to PLAN.md.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-073]]'s 5-pass-with-capped-findings + PLAN.md-ticket-output shape; only the lens reframes (user-flavored vs. CORE-073's safety/idioms/hygiene/orphans/drift). No new pattern.
- [x] Implemented the minimal solution — five sequential greps over the locked scope (56 files), manual triage of all hits, surviving findings logged below.
- [x] Updated/added tests for non-trivial behavior — N/A (audit produces tickets, not code; no test suite for `claude/` content).

**Implementation Notes:**

### Pass execution shape

Per pass: targeted grep over the 56-file locked scope → manual triage of every hit (most defend themselves on inspection — see "non-findings" notes per pass) → record the top-≤5 surviving findings with file:line + 1-sentence rationale + proposed severity.

### Pass 1 — First-person voice & anecdotal residue (3 findings)

**Notable non-findings (defended on inspection):**
- `docs/PHILOSOPHY.md` heavy first-person + fintown/InvisiPaw/photard naming — file's explicit role is personal narrative ("the things SPEC.md deliberately leaves out because they're history, not contract"). The voice IS the deliverable.
- `CONTRIBUTING.md` first-person ("for one person — me") — first-person is the convention for CONTRIBUTING files; matches the solo-maintenance positioning.
- `claude/skills/ft-*/step-1.5-model-edge.md:9` — `"Switch active model: I'll stop..."` — quoted prompt template for the assistant to address the user. Assistant-voice in a template, not narrator voice.
- `claude/skills/ft-audit*/SKILL.md` `_(forker: ...)_` annotations with "I think this might be slow" / "py-spy top says..." — explicit forker-flavored notes for the forker to replace.
- `SECURITY.md:13` `"omit exploit details until we agree on a path"` — vulnerability-reporting convention ("we" = reporter + maintainer).

**Surviving findings:**

| # | File:line | Severity | Issue |
|---|---|---|---|
| 1.1 | `SPEC.md:113` | Low | Area-prefix example cites "photard's OCR" — leaks a personal-project name into the canonical workflow contract. SPEC's other examples are generic; replace with `<project>'s OCR` or `a vision-heavy project's OCR pipeline`. |
| 1.2 | `SPEC.md:151, 154` | Low | Task-line grammar examples use "InvisiPaw migration" — same leakage. Replace with stack-neutral example task (e.g., generic `migration` task or abstract placeholder). |
| 1.3 | `README.md:54` | Low | `"the directory name (e.g., fintown) becomes the project label"` — README is the repo front door; cites a personal project as the example. Replace with `e.g., myproject` or a stack-neutral placeholder. |

### Pass 2 — Tool/stack assumption in examples (1 finding)

**Notable non-findings:**
- `claude/skills/ft-audit-{frontend,backend,security,performance}/SKILL.md` Pydantic/React/Vite/FastAPI mentions — all inside `_(forker: ...)_` annotations or explicit menu lists. The audit-family scaffolds are stack-neutral by design; per-stack tells are forker-flavored.
- `claude/skills/ft-quality/SKILL.md` Node/Python/Go/Rust stack set — the SKILL itself documents "Adopters with different tooling fork the skill" (line 55). Hardcoded set is acknowledged.
- `SECURITY.md:78`, `README.md:108,49` — factual descriptions of flowtron's own `viz/` (Vite/React Kanban). Flowtron HAS a Vite/React app; describing it accurately isn't drift.
- `docs/MIGRATION.md:177, 188` — gitignore/grep examples with `__pycache__/`, `node_modules/`, `*.py`, `*.ts` — common transient paths / illustrative greps. Not user-flavored.

**Surviving findings:**

| # | File:line | Severity | Issue |
|---|---|---|---|
| 2.1 | `docs/MIGRATION.md:244, 245` | Low | §3.4 PLAN.md example block uses verbatim fintown trading-strategy task descriptions (`Spread/fee-aware EV-positive entry predicate`, `Per-strategy VERSION + strategies.py mtime in startup banner`). The example is showing task-line shape; opaque domain language obscures the lesson for non-fintown adopters. Replace with stack-neutral examples. |

### Pass 3 — Markdown-vault positioning (1 finding)

**Notable non-findings:**
- `README.md:63-96` §"Working in markdown vaults" — explicitly framed as opt-in companion surface: *"These tools are opt-in companion surfaces. None of the above is required."* Matches `[[project_obsidian_positioning]]` memory.
- `docs/CONVENTIONS.md:37, 66` — explicit non-dependency framing: *"compatible with those tools without flowtron depending on them"*.
- `SPEC.md:179-187` — wikilink integrity rules use "wikilink" as a generic syntax term, no Obsidian attribution.

**Surviving findings:**

| # | File:line | Severity | Issue |
|---|---|---|---|
| 3.1 | `SPEC.md:276` | Low | `"references to other tasknotes use Obsidian-style [[<TASK-ID>]] wikilinks"` — the canonical workflow contract attributes the syntax to Obsidian. Wikilink syntax (`[[name]]`) predates Obsidian (MediaWiki, 2001) and is supported by multiple tools (Obsidian, Foam, Logseq, Roam). Drop "Obsidian-style"; the second sentence already names the three tools as positioning. |

### Pass 4 — Model & assistant assumptions (2 findings)

**Notable non-findings:**
- `templates/PLAN.md`, `SPEC.md:142`, copy-paste lines in `ft-task` / `ft-micro-task` / `ft-close-epic` — `[opus | sonnet]` is the contract grammar per SPEC §"Model field". Not drift; canonical.
- `docs/MIGRATION.md:94, 271, 284` — multi-agent listing (`Claude Code, Codex CLI, Cursor, Sourcegraph Amp, Aider`) — explicit agent-neutral framing. Correct positioning for AGENTS.md.
- `SECURITY.md:19-42` — flowtron's skills ARE Claude Code skills (per SPEC §"Skill namespace"). Factual; sandbox question lives in Claude Code's runtime.
- `templates/tasknote-README.md:75-76` — explicit menu of agents + Claude-specific carve-out for `CLAUDE.md`. Correct framing.

**Surviving findings:**

| # | File:line | Severity | Issue |
|---|---|---|---|
| 4.1 | `SPEC.md §"Model field"` + `SPEC/model.md:9, 29-30` | **Medium** | Model-field grammar pins to `opus \| sonnet` literal strings. Anthropic-specific AND Anthropic-tier-specific (no escape valve for Haiku, future Anthropic tiers, Gemini, GPT, DeepSeek, local models). Adopters using other models would either ignore the field or fork the grammar. Either generalize the grammar to allow custom tokens (with `opus`/`sonnet` as flowtron's recommended convention) or explicitly document the values as flowtron-self / current-Anthropic-tiering convention. |
| 4.2 | `SPEC.md:499` | Low | `"Claude cannot run /clear itself"` — SPEC's post-closure copy-paste line shape (`/clear then /model X then /ft-task Y`) is Claude Code-specific. Generalize the wording to `"the assistant cannot run /clear itself"`, or add a one-line note that the copy-paste line is Claude Code-shaped and adopter-side runtimes substitute their own context-clear equivalents. |

### Pass 5 — Solo-developer & workspace assumptions (1 finding)

**Notable non-findings:**
- `README.md:3`, `SPEC.md:8`, `CONTRIBUTING.md:3`, `SECURITY.md:3, 72`, `docs/PHILOSOPHY.md:3` — "solo AI-assisted coding" / "solo-maintained" — flowtron's **stated positioning**, not user-flavored drift. PHILOSOPHY.md and CONTRIBUTING.md explicitly anchor the solo-developer audience.
- `README.md:42` + `docs/MIGRATION.md:25, 314` + `claude/AGENTS-snippet.md:55` — `"once per machine"` viz — viz is positioned as a single-user local-development tool (`SECURITY.md:72` confirms). Solo positioning extension.
- `claude/AGENTS-snippet.md:58-59`, `docs/MIGRATION.md:317-318`, `README.md:48` — viz commands referencing `~/code/flowtron/viz` — viz IS at flowtron's checkout, not the adopter's project. Factual.

**Surviving findings:**

| # | File:line | Severity | Issue |
|---|---|---|---|
| 5.1 | `README.md:29`, `docs/MIGRATION.md:10, 25` | Low | Adopter-facing prose states `~/code/` workspace as if required (`"Both paths assume the project lives under ~/code/"`, `"Run /ft-new-project in a fresh ~/code/ repo"`, `"after cloning flowtron to ~/code/flowtron/"`). The actual requirement is only that the viz's `FLOWTRON_VIZ_WORKSPACE` defaults to `~/code/` (overridable per `docs/MIGRATION.md:321`) and `/ft-new-project`'s default suggestion uses cwd basename. Soften to "anywhere on your local machine" / drop the `~/code/` assumption from adopter-facing prose. |

### Rollup

| Pass | Findings | Severity span |
|---|---|---|
| 1 — First-person voice & anecdotal residue | 3 | Low × 3 |
| 2 — Tool/stack assumption in examples | 1 | Low |
| 3 — Markdown-vault positioning | 1 | Low |
| 4 — Model & assistant assumptions | 2 | Medium × 1, Low × 1 |
| 5 — Solo-developer & workspace assumptions | 1 | Low |

**Total: 8 findings (0 Critical, 0 High, 1 Medium, 7 Low). Cap (5/pass) not hit on any pass.** Healthy result — the repo's prior audit passes ([[CORE-073]] structural, [[CORE-074]] cite-not-restate, [[CORE-101]] audit-family) have already trimmed the obvious surface; the user-flavored lens caught a few specific, fixable instances rather than systemic drift. The PHILOSOPHY.md / CONTRIBUTING.md first-person narrative is by-design and defended.

### Proposed PLAN.md tickets (awaiting user approval before write)

Bundle of 8 tickets, each carrying `Surfaced by CORE-132 audit 2026-05-22 (Finding #N, <severity>)` parenthetical per /ft-audit §5 step 3:

1. **CORE-133** [sonnet] | spec-area-prefix-photard-leak — Replace SPEC.md:113 area-prefix example "OCR- for photard's OCR" with a stack-neutral project name. Surfaced by CORE-132 audit 2026-05-22 (Finding #1.1, Low). → `## Low`
2. **CORE-134** [sonnet] | spec-tasklinegrammar-invisipaw-leak — Replace SPEC.md:151,154 task-line-grammar examples ("InvisiPaw migration") with a stack-neutral migration example. Surfaced by CORE-132 audit 2026-05-22 (Finding #1.2, Low). → `## Low`
3. **CORE-135** [sonnet] | readme-viz-example-projectname — Replace README.md:54 viz-scanner example "fintown" with a generic placeholder (e.g. `myproject`). Surfaced by CORE-132 audit 2026-05-22 (Finding #1.3, Low). → `## Low`
4. **CORE-136** [sonnet] | migration-plan-example-fintown-leak — Replace docs/MIGRATION.md:244-245 §3.4 PLAN.md example block (fintown trading-strategy task descriptions) with stack-neutral examples showing task-line shape. Surfaced by CORE-132 audit 2026-05-22 (Finding #2.1, Low). → `## Low`
5. **CORE-137** [sonnet] | spec-wikilink-obsidian-attribution — Drop "Obsidian-style" from SPEC.md:276 wikilink prose; positioning lives in the following sentence's tool list. Surfaced by CORE-132 audit 2026-05-22 (Finding #3.1, Low). → `## Low`
6. **CORE-138** [opus] | spec-model-grammar-anthropic-lock — Generalize SPEC §"Model field" + SPEC/model.md grammar to allow custom model tokens beyond `opus | sonnet`, OR explicitly document the values as flowtron-self / current-Anthropic-tiering convention. Surfaced by CORE-132 audit 2026-05-22 (Finding #4.1, Medium). → `## Medium`
7. **CORE-139** [sonnet] | spec-clear-claude-specific — Generalize SPEC.md:499 `"Claude cannot run /clear itself"` to "the assistant cannot run /clear itself", or add a one-line note that the copy-paste line shape is Claude Code-specific. Surfaced by CORE-132 audit 2026-05-22 (Finding #4.2, Low). → `## Low`
8. **CORE-140** [sonnet] | adopter-docs-tilde-code-assumption — Soften `~/code/` workspace assumption in README.md:29 + docs/MIGRATION.md:10,25 ("anywhere on your local machine"). Surfaced by CORE-132 audit 2026-05-22 (Finding #5.1, Low). → `## Low`

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (audit produces tickets, not code; no test suite for `claude/` content).
- [x] Ran lint/type-check on changed code — N/A (markdown-only output to PLAN.md).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface touched).

**Testing Notes:**

Verification gates run inline (per [[CORE-073]] precedent, in lieu of automated tests):

1. **ID collision check** — `grep -nE '\*\*CORE-(13[3-9]|140)\*\*'` across PLAN.md + every archive tasknote: hits only in the active CORE-132 tasknote + the 8 newly-filed PLAN.md lines. No archive collisions.
2. **Task-line grammar parity** — all 8 lines match SPEC §"Task-line format" shape `- [ ] **<ID>** [model] | shortname — desc.`
3. **Word-count check** (target <50w, hard cap 70w per SPEC §"PLAN.md filing-discipline thresholds"):

   | Ticket | Words | Verdict |
   |---|---|---|
   | CORE-133 | 21w | ✅ under target |
   | CORE-134 | 19w | ✅ under target |
   | CORE-135 | 19w | ✅ under target |
   | CORE-136 | 24w | ✅ under target |
   | CORE-137 | 22w | ✅ under target |
   | CORE-138 | 34w | ✅ under target |
   | CORE-139 | 35w | ✅ under target |
   | CORE-140 | 21w | ✅ under target |

   All 8 under the <50w target; max is CORE-139 at 35w. Hard cap (70w) not approached.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-22.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip)

**Doc-drift sweep results:**

CORE-132's deliverable is PLAN.md tickets only — no in-place edits in this task. Downstream tickets (CORE-133..140) will edit specific docs; that's their job.

- `README.md` — **no change** (Finding #1.3 / Finding #5.1 fixes deferred to CORE-135 / CORE-140).
- `SPEC.md` — **no change** (Findings #1.1, #1.2, #3.1, #4.1, #4.2 fixes deferred to CORE-133 / CORE-134 / CORE-137 / CORE-138 / CORE-139).
- `docs/MIGRATION.md` — **no change** (Finding #2.1 / Finding #5.1 fixes deferred to CORE-136 / CORE-140).
- `claude/AGENTS-snippet.md` — **no change** (no findings against it; audit confirmed its multi-agent positioning is correct).
- `docs/CONVENTIONS.md` — **no change** (no findings against it; vault positioning is explicitly correct).
- `CONTRIBUTING.md` — **no change** (first-person voice in CONTRIBUTING files is convention; matches solo-maintenance positioning).
- `SECURITY.md` — **no change** (Claude Code references defended as factual — flowtron's skills ARE Claude Code skills per SPEC §"Skill namespace").

**Final Summary:**

Ran the first user-flavored-vs-adopter-shareable audit pass on flowtron's adopter-facing surface — 5 lenses across 56 markdown files (templates/, claude/skills/, claude/commands/, claude/AGENTS-snippet.md, SPEC.md + SPEC/, docs/MIGRATION.md + PHILOSOPHY.md + CONVENTIONS.md, README.md, SECURITY.md, CONTRIBUTING.md). Extended [[CORE-073]]'s 5-pass-with-capped-findings + PLAN.md-ticket-output shape; only the lens reframed (user-flavored vs. CORE-073's safety/idioms/hygiene/orphans/drift). Each pass = targeted grep → manual triage (most hits defended themselves on inspection: docs/PHILOSOPHY.md's first-person narrative is by-design, `_(forker: ...)_` annotations are explicitly user-flavored, SECURITY.md's Claude-Code references are factual about the runtime, `viz/`-related "single global instance" matches the documented solo-positioning) → top-≤5 survivors. **8 findings total** (0 Critical, 0 High, 1 Medium, 7 Low; cap of 5/pass never approached). Pass split: Pass 1 (first-person voice + project-name anecdotes) 3 findings — personal-project names leaked into SPEC.md (photard, InvisiPaw) and README.md (fintown); Pass 2 (tool/stack assumption) 1 finding — fintown trading-strategy task descriptions leaked into MIGRATION §3.4 example block; Pass 3 (markdown-vault positioning) 1 finding — `"Obsidian-style wikilinks"` in SPEC attributes the syntax to one of three named tools; Pass 4 (model & assistant assumptions) 2 findings — the canonical model-field grammar pins to Anthropic-specific `opus | sonnet` literals (Medium severity — biggest finding), and `"Claude cannot run /clear"` assumes Claude in the post-closure copy-paste line; Pass 5 (solo-developer & workspace) 1 finding — adopter-facing prose states `~/code/` workspace as if required. Filed all 8 as PLAN.md tickets (CORE-133..140), each carrying the `Surfaced by CORE-132 audit 2026-05-22 (Finding #N, <severity>)` parenthetical per /ft-audit §5. The deliverable is filing only; downstream tickets do the in-place edits. **Drift logged at promotion:** starter cited `AGENTS.md` (no root-level file in flowtron) → scoped to `claude/AGENTS-snippet.md`; related-task `[[CORE-101]]` has no archive file (closed out-of-band) — annotated, not blocking.

**Archived:** 2026-05-22
