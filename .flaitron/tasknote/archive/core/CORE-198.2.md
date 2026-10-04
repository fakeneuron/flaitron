---
title: redundancy-audit
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-198, CORE-198.1, CORE-132, CORE-010, CORE-129, CORE-EPIC-154, CORE-037]
---

# CORE-198.2 | redundancy-audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-198]] [[CORE-198.1]] [[CORE-132]] [[CORE-010]] [[CORE-129]] [[CORE-EPIC-154]] [[CORE-037]]

## 🎯 Goal

Produce a redundancy-findings table classifying overlaps across `~/.claude/CLAUDE.md`, `~/code/CLAUDE.md`, flowtron `SPEC/`, and the AGENTS.md paste-block into **lift-to-flowtron / keep-personal / delete-as-duplicate** buckets — recommendations only; actual lifts file as follow-up PLAN.md tickets per [[CORE-132]] precedent.

## ✅ Acceptance

- [ ] Rule inventory built across the four corpora (`~/.claude/CLAUDE.md`, `~/code/CLAUDE.md`, flowtron `SPEC/` modules + `SPEC.md` core, AGENTS.md paste-block at `claude/AGENTS-snippet.md`)
- [ ] Findings table produced classifying each overlap as `lift-to-flowtron` / `keep-personal` / `delete-as-duplicate`, with one-line rationale per row and citations to source file + section heading
- [ ] Literal-duplication findings flagged separately from semantic-overlap findings (literal = same/near-same wording; semantic = same intent, different phrasing)
- [ ] Follow-up PLAN.md tickets filed at closure for each `lift-to-flowtron` and `delete-as-duplicate` finding (per [[CORE-132]] precedent — recommendations only; tickets carry the proposed lift/delete + cite this audit row)
- [ ] No in-place edits to user `~/.claude/CLAUDE.md`, `~/code/CLAUDE.md`, or flowtron contract-surface content (lifts execute in follow-up tickets or `.3`; this child is recommendations-only)
- [ ] Phase 4 doc-drift sweep verdicts across `_project/tasknote/README.md` §"AI-referenced docs" recorded (default: no change — audit findings land as PLAN.md tickets, contract edits land inside follow-ups)

## 🧩 Subtasks

- [ ] Build rule inventory: enumerate each corpus's sections + key rules; capture a compact per-corpus summary in Implementation Notes (no full reproduction — section names + one-line rule descriptors)
- [ ] Map overlaps: cross-reference rules across corpora; build a rule-pair / rule-cluster index (flagging literal vs. semantic overlap)
- [ ] Classify each overlap into `lift-to-flowtron` / `keep-personal` / `delete-as-duplicate` per the criteria in Discovery Notes A3; one-line rationale per row
- [ ] Produce the findings table in Implementation Notes (markdown table with columns: # · rule · corpora · overlap-kind · bucket · rationale · proposed follow-up)
- [ ] Draft proposed follow-up PLAN.md tickets (held in Implementation Notes; filing executes at Phase 4 closure to keep PLAN.md a single closure-time write)
- [ ] Phase 3: proofread the table; cross-link verification (wikilinks resolve to existing tasks/files; file paths still exist at HEAD)
- [ ] Phase 4: doc-drift sweep verdicts + file the drafted follow-up tickets into PLAN.md `## Medium` (or appropriate priority) + flip `.2` line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-198]] — parent epic (context-chain-portability)
- [[CORE-198.1]] — predecessor Discovery that filed this child with locked scope (hybrid scope; recommendations-only posture; sequenced audit-first so `.3` consumes findings)
- [[CORE-132]] — `user-idiosyncrasy comb` precedent: audit surfaces findings, follow-ups file as discrete PLAN.md tickets; no in-place edits inside the audit child
- [[CORE-010]] — added the flowtron pointer to `~/Code/CLAUDE.md`; downstream `.3` migrates it to `~/.claude/CLAUDE.md` using this audit's findings as input
- [[CORE-129]] — AGENTS.md migration; the AGENTS.md paste-block is one of the four corpora in scope
- [[CORE-EPIC-154]] — multi-agent-portability epic; locked contract-layer agent-neutrality (sets the "what does flowtron promise to be agnostic about?" baseline that this audit measures user-side content against)
- [[CORE-037]] — workflow token-cost audit (archive-skim find); characterized both user CLAUDE.md files as "already lean / no section-level trim candidates" on the **size axis**. This audit operates on the orthogonal **redundancy axis** (cross-file overlap classification) — explicitly does not re-do CORE-037's word-count analysis

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The `.1` Discovery already drift-checked the corpora and locked four scoping decisions (scope = hybrid; Grok = verification-only — handled by `.4`; lift policy = audit + recommendations only per [[CORE-132]]; no new agnostic context-chain doc). The PLAN.md line for `.2` is 34w (under cap). Scope is exactly as filed — no Re-scope or De-scope warranted.

- [x] Read relevant source files:
  - `~/.claude/CLAUDE.md` (global personal) — 7 sections: Scope & Safety, Core Principles, Surgical & Safe Changes, Shell discipline, Execution & Verification, Communication, Model Selection
  - `~/code/CLAUDE.md` (workspace personal) — 5 sections: General Workspace Preferences, Shared Workflow Philosophy, Shell & Tool Use, Tech Stack Tendencies, Localhost Port Registry (9-row table + reserved-ports list)
  - flowtron `SPEC.md` core (already loaded as `/ft-task` core) — 22 sections incl. Core principles, Layout in adopting projects, Skill namespace, Task-line format, Tasknote frontmatter, Tasknote body shape, The 4-phase workflow, Blocked tasks, Post-closure protocol, When to use a tasknote, Versioning, What flowtron does NOT provide
  - flowtron `SPEC/` lazy modules — 5 files: `blocked.md`, `epic.md`, `model.md`, `starter.md`, `versioning.md`
  - `claude/AGENTS-snippet.md` (AGENTS.md paste-block source) — one paste-block (~13 lines of markdown body) + symlink-wiring section + viz/bumping appendices (the paste-block proper is the in-scope content)
  - `_project/tasknote/README.md` — confirmed AI-referenced doc set (9 entries) for Phase 4 sweep at closure

- [x] **Archive skim** — `_project/tasknote/archive/core/` (221 archives). Confirmed the four precedents `.1` named ([[CORE-EPIC-154]], [[CORE-010]], [[CORE-132]], [[CORE-129]]) and surfaced one additional load-bearing precedent: [[CORE-037]] (workflow token-cost audit, archived 2026-05-05). Targeted greps for `~/.claude/CLAUDE.md` / `~/Code/CLAUDE.md` / `AGENTS-snippet` hit ~20+ archives; the orthogonal ones (e.g., CORE-008 InvisiPaw playbook, CORE-011 TasknoteSystem deletion, CORE-042.1 / .8 workflow-rethink, doc-drift-sweep cohorts) all visit these paths but on different axes (migration prose; legacy cleanup; size/token audit; drift checks) — none re-do redundancy classification. CORE-037 is the closest prior and is explicitly orthogonal to this task (size vs. redundancy).

- [x] **Drift check** — verified at HEAD:
  - `~/.claude/CLAUDE.md` and `~/code/CLAUDE.md` both exist ✓ (re-confirms `.1`)
  - `~/.claude/CLAUDE.md` has grown since CORE-037's snapshot (CORE-037 cited ~465w; current file carries an added §Shell discipline + §Model Selection block). **Not a scope change** — the audit operates on current state.
  - `~/code/CLAUDE.md` has grown substantially since CORE-037 (CORE-037 cited ~209w; current file now carries a 9-row Localhost Port Registry table + reserved-ports list, plus the §Shell & Tool Use bullet that overlaps the global §Shell discipline — see literal-duplication finding below). **Not a scope change.**
  - flowtron contract surface still has **zero references to `~/code/CLAUDE.md`** (re-confirms `.1`'s grep) — retiring it (downstream `.3`) has no rename burden.
  - **Literal-duplication pre-flight finding:** the `cd dir && command` ban appears in both `~/.claude/CLAUDE.md` §Shell discipline (lines 23-25) and `~/code/CLAUDE.md` §Shell & Tool Use (line 18). Near-verbatim restatement. Flagged as the first row of the findings table.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** The `.1` Discovery's structured ask resolved scope-level decisions; the assumptions below cover the remaining execution-shape choices.

- [x] Subtasks above populated with concrete, ordered steps (see ✅ Acceptance and 🧩 Subtasks above).

**Discovery Notes:**

**Explicit execution assumptions (carrying forward from `.1`):**

- **A1. Findings live inline in this tasknote's body** (under Phase 2 Implementation Notes), per [[CORE-132]] precedent. No separate audit-output artifact.
- **A2. Granularity = section-level + rule-level call-outs.** Each finding cites source file + section heading + specific rule text where useful.
- **A3. Bucket criteria:**
  - `lift-to-flowtron` — rule is general workflow/process guidance applicable to all AI-assisted coding adopters (not user-personal preference, not platform-locked, not user-machine-specific); could land in flowtron's contract surface (SPEC, SPEC modules, or AGENTS-snippet paste-block) as agent-neutral content. **Liberal bucket** per `.1` resolution #3 (audit + recommendations only; user decides).
  - `keep-personal` — rule is personal preference, user-machine-specific (tilde paths, localhost-port-registry-shape state), or otherwise out-of-bounds for flowtron's project-agnostic contract.
  - `delete-as-duplicate` — rule literally restates content already in flowtron's contract surface; user-side deletion is recommended after confirming the flowtron-side equivalent. (Note: actual deletion executes in `.3` or follow-ups, not here.)
- **A4. Follow-up tickets at Phase 4 closure** — each `lift-to-flowtron` and `delete-as-duplicate` finding files as a discrete PLAN.md line at closure; `keep-personal` findings document the decision without filing. Mirrors CORE-132's cohort that produced CORE-133, CORE-134, CORE-135, CORE-136, CORE-137 from one audit.
- **A5. AGENTS.md paste-block scope** — audit the paste-block body (the markdown fence at `claude/AGENTS-snippet.md` lines ~9-21) against user CLAUDE.md content. Light SPEC.md restatement inside the paste-block is **by design** (paste-block points adopters at SPEC) and is not redundancy in this audit's sense.
- **A6. Out-of-scope for `.2`:** flowtron `claude/skills/` and `claude/commands/` content (`.1` scope explicitly named only SPEC/ + AGENTS.md paste-block on the flowtron side); re-doing CORE-037's word-count/token-cost analysis (different axis); in-place edits to any of the four corpora (executes in `.3` or in lifted follow-up tickets).

**Load-bearing precedents (consolidated from `.1` + this skim):**

| Precedent | Locked finding | Relevance to `.2` |
|---|---|---|
| [[CORE-EPIC-154]] | Contract-layer is agent-neutral; wiring-layer is per-platform | Anything Claude-Code-specific in user CLAUDE.md cannot simply lift into SPEC; only into the wiring layer or as an [[AGENT-NEUTRALITY]] ledger note. Constrains the `lift-to-flowtron` bucket. |
| [[CORE-010]] | Workspace CLAUDE.md carries a "flowtron available, not required" pointer | One bullet in `~/code/CLAUDE.md` §"Shared Workflow Philosophy" is a known-good pointer that migrates to `~/.claude/CLAUDE.md` in `.3` — not redundancy per se. |
| [[CORE-132]] | Audit surfaces findings; follow-ups file as discrete PLAN.md tickets; no in-place edits inside the audit child | Direct template for `.2`'s shape. |
| [[CORE-129]] | AGENTS.md is the canonical agent-neutral entry point | `claude/AGENTS-snippet.md` paste-block is the flowtron-owned shape of that entry point. |
| [[CORE-037]] | User CLAUDE.md files are already lean on the size axis | Reframes scope: `.2` is **not** trimming for size; it's classifying for **cross-file redundancy**. Frees the audit from re-doing size analysis. |

**Drift carry-over note.** CORE-037's word counts (465w global / 209w workspace) are stale — both files have grown. Not a scope deviation; the audit operates on current state.

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced no significant scope deviation — the audit executes exactly as filed in `.1`. The drift-finding (Shell-discipline literal duplication) is **a Phase 2 input**, not a scope deviation; finding redundancy is the task. The added load-bearing precedent ([[CORE-037]]) is context, not scope. → **Skip 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-132]]'s recommendations-only audit shape (findings inline → follow-up PLAN.md tickets at closure → no in-place edits in the audit child). CORE-132's lens was 5-pass user-flavored-vs-adopter-shareable across flowtron's adopter-facing surface, with severity-keyed findings. **This task reshapes the deliverable** for the cross-corpus redundancy axis: one combined findings table (not per-pass), classification by bucket (`lift-to-flowtron` / `keep-personal` / `delete-as-duplicate`) rather than by severity, and cross-file overlap-kind (literal / semantic) flagged per row. Ticket policy reshapes too: `delete-as-duplicate` findings within the two user CLAUDE.md files are **consumed by `.3`'s consolidation scope** (no new tickets), while cross-contract semantic duplications and lift candidates get their own follow-up tickets.
- [x] Implemented the minimal solution — rule inventory across the four corpora → overlap mapping → bucket classification → findings table → proposed follow-ups (see below).
- [x] Updated/added tests for non-trivial behavior — N/A (audit produces findings + tickets, not code; verification gates run in Phase 3).

**Implementation Notes:**

### Rule inventory (per-corpus summary)

Compact section-level enumeration (full rules live in the source files; this is the index used for overlap mapping).

**Corpus 1 — `~/.claude/CLAUDE.md` (global personal):** 7 sections.
1. §Scope & Safety — only auto-act under `~/code/`; outside, ask first.
2. §Core Principles (5) — think-before-coding · one-task-per-conversation · `[TASK]/[SUCCESS]` invocation template + AskUserQuestion · MVC / no speculation · match existing style.
3. §Surgical & Safe Changes (4) — touch only what's required · no adjacent refactors · only remove what *your* changes orphaned · every line traces to request.
4. §Shell discipline (2) — never `cd <current-directory>` (Claude permission prompt) · more generally avoid `cd dir && command` where the tool finds its own config.
5. §Execution & Verification (4) — verifiable success criteria · plan + verification steps for multi-step · loop until verified · **follow project's tasknote/plan/workflow system precisely**.
6. §Communication (3) — stop & ask if unclear · surface options/tradeoffs · be concise.
7. §Model Selection (3) — default Opus for design/multi-file/ambiguity · suggest Sonnet only for mechanical · **name the model on next-step recommendation** (e.g. `/model sonnet` then `/task X`).
8. Closing — skills live in `~/.claude/skills/` (global) or `.claude/skills/` (per-project); project-specific stuff lives in project CLAUDE.md or `~/code/CLAUDE.md` (takes precedence).

**Corpus 2 — `~/code/CLAUDE.md` (workspace personal, pre-retire):** 5 sections.
1. §General Workspace Preferences (4) — readability/maintainability/explicit · prefer tests for non-trivial · atomic commits · document major architecture/design decisions.
2. §Shared Workflow Philosophy (4) — most projects use tasknote/plan-driven workflow · **follow project's task lifecycle precisely** · prefer project's own task tracking over ad-hoc · flowtron is ready-made option for new repos.
3. §Shell & Tool Use (1) — **never `cd dir && command`** (permission prompt); use absolute paths or rely on git/node finding their config; exception = explicit user ask.
4. §Tech Stack Tendencies (3) — FastAPI + Python 3.11+ · React + TS + R3F · FastAPI entrypoint at `backend/main.py`.
5. §Localhost Port Registry — 9-row table + reserved ports list + new-project guidance (prefer 4001+ / 5181+ / 5503+ / 8004+; set `strictPort: true`).
6. Closing — project-specific stuff lives in each project's own CLAUDE.md (takes precedence).

**Corpus 3 — flowtron `SPEC.md` + `SPEC/` modules:** the workflow contract surface.
- Core principles: Markdown over JSON · Zero scripts · **One task per context window** · Relevance before action · Versioned and pinned.
- Skill namespace (`ft-` reservation), Task ID convention, Task-line format grammar (`- [ ] **ID** [!critical] [model] | shortname — desc`), Tasknote frontmatter (YAML), Tasknote body shape (spec-on-top + log-below).
- **The 4-phase workflow** — Phase 1 Discovery (relevance assessment · archive skim · drift check · clarifying questions or assumptions · populate subtasks) · Phase 2 Execution (**pattern survey** · minimal solution · tests) · Phase 3 Testing & Linting · Phase 4 Closure (doc-drift sweep · PLAN.md flip · archive).
- Operator-gate cues (🛠️ + 📦), Conditional skip rule, Post-closure protocol.
- When to use a tasknote (full / starter / micro / followup), Priority levels.
- `SPEC/model.md` — **PLAN.md `[model]` is source of truth; `opus | sonnet` recommended; default opus for design/multi-file/ambiguity, sonnet for mechanical work; name model alongside next-task suggestion**.
- `SPEC/starter.md` / `SPEC/blocked.md` / `SPEC/epic.md` / `SPEC/versioning.md`.
- What flowtron does NOT provide (CLI, schema validation, DB backend, cross-project query API, per-project CI hooks) + PR/suggestion archetypes flowtron does not accept (schema validators · abstractions without two-project precedent · cross-project query layers · multi-user/team features).

**Corpus 4 — AGENTS.md paste-block (`claude/AGENTS-snippet.md`):** ~13 markdown body lines pasted into adopter `AGENTS.md`. Pointers (this project uses flowtron · canonical contract at `_project/flowtron/SPEC.md`) · adopter-side facts (PLAN.md path · tasknote paths · `/ft-task` start · filing-skill menu · 4-phase serial workflow · `[model]` segment runs end-to-end · submodule is read-only). The paste-block's job is to point adopters at SPEC.md — light SPEC restatement is **by design** and not redundancy in this audit's sense (per Discovery Notes A5).

### Findings table

20 findings total (within-user literal dups + within-user semantic dups + cross-contract semantic dups + soft lift candidates + keep-personal rules whose flowtron echo is weak/operationalized rather than redundant).

| # | Rule | Source corpora | Overlap kind | Bucket | Rationale | Proposed follow-up |
|---|---|---|---|---|---|---|
| 1 | `cd dir && command` ban (permission-prompt aversion) | `~/.claude/CLAUDE.md` §Shell discipline (2 bullets) + `~/code/CLAUDE.md` §Shell & Tool Use (1 bullet) | Literal (within-user) | `delete-as-duplicate` | Near-verbatim restatement; both files cite the permission-prompt as cause. Global file's version is slightly more general (Vite/Vitest/tsc/ruff/pytest find their config). | Consumed by `.3` (workspace file retires; canonical rule survives in global). No separate ticket. |
| 2 | "Follow the project's task lifecycle precisely" | `~/.claude/CLAUDE.md` §Execution & Verification bullet 4 + `~/code/CLAUDE.md` §Shared Workflow Philosophy bullet 2 | Literal (within-user) | `delete-as-duplicate` | Same rule, near-verbatim. Workspace version says "task lifecycle", global says "tasknote/plan/workflow system" — equivalent intent. | Consumed by `.3`. |
| 3 | Closing precedence line ("project-specific stuff lives in project CLAUDE.md; takes precedence") | `~/.claude/CLAUDE.md` closing + `~/code/CLAUDE.md` closing | Literal (within-user) | `delete-as-duplicate` | Same sentence shape. Global points to project CLAUDE.md + `~/code/CLAUDE.md`; workspace points to project CLAUDE.md only. Workspace version dies at retirement; global needs `~/code/CLAUDE.md` removed from precedence chain. | Consumed by `.3` (edit-as-part-of-consolidation). |
| 4 | Model Selection guidance (Opus default · Sonnet for mechanical · name model on next-step) | `~/.claude/CLAUDE.md` §Model Selection (3 bullets) + flowtron `SPEC/model.md` last paragraph (1 sentence) | Semantic (cross-contract, near-verbatim) | `delete-as-duplicate` (with reduction) | flowtron's `SPEC/model.md` is the contract layer for the model-on-PLAN.md-line grammar AND the next-task-suggestion model-naming convention. The user-side 3 bullets restate it. Recommend reducing user-side to one general-scope sentence ("Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind") that holds outside flowtron contexts; drop the copy-paste line guidance (flowtron territory). | **File PLAN.md ticket** — user-machine reduction in `~/.claude/CLAUDE.md`; not in `.3`'s scope (`.3` is `~/code/CLAUDE.md`-retirement-flavored). |
| 5 | "Match existing style/naming/formatting in the codebase" | `~/.claude/CLAUDE.md` §Core Principles bullet 5 + flowtron SPEC.md §🛠️ Phase 2 Pattern survey | Semantic (cross-contract) | `keep-personal` | User-level rule has broader scope (applies always, including non-flowtron projects). flowtron's Phase 2 Pattern survey is operationalization within the workflow contract. Different lenses. | None. |
| 6 | "One focused task per conversation" | `~/.claude/CLAUDE.md` §Core Principles bullet 2 + flowtron SPEC.md core principle #3 "One task per context window" | Semantic (cross-contract) | `keep-personal` | Same principle, broader user scope vs. flowtron's contract-shape statement. Different surfaces. | None. |
| 7 | "Stop and ask if unclear; never guess silently" | `~/.claude/CLAUDE.md` §Communication bullet 1 + flowtron Phase 1 Discovery "Asked clarifying questions OR logged 'No clarifications needed'" | Semantic (cross-contract) | `keep-personal` | Meta-rule vs. phase checklist. User rule applies always. | None. |
| 8 | "Define clear, verifiable success criteria for every task" | `~/.claude/CLAUDE.md` §Execution & Verification bullet 1 + flowtron SPEC §Tasknote body shape ✅ Acceptance | Semantic (cross-contract) | `keep-personal` | Meta-rule vs. tasknote-section operationalization. | None. |
| 9 | "Prefer simplicity and MVC; no speculative features, abstractions, future-proofing" | `~/.claude/CLAUDE.md` §Core Principles bullet 4 + flowtron SPEC §"What flowtron does NOT provide" + §"PR / suggestion archetypes flowtron does not accept" | Semantic (cross-contract, different surface) | `keep-personal` | User-level coding ethic vs. flowtron-self contributor/PR-rejection rule. Different surfaces; both useful. | None. |
| 10 | "Loop until the goal is met and verified" | `~/.claude/CLAUDE.md` §Execution & Verification bullet 3 + flowtron Phase 3 Testing & Linting | Semantic (cross-contract) | `keep-personal` | Meta-rule vs. phase checklist. | None. |
| 11 | "Surgical changes" cluster (touch only what's required · no adjacent refactors · only remove what your changes orphaned) | `~/.claude/CLAUDE.md` §Surgical & Safe Changes (4 bullets) + flowtron SPEC §🛠️ Phase 2 "Keep edits tightly scoped. Resist refactoring adjacent code unless the task explicitly calls for it." | Semantic (cross-contract, partial) | `keep-personal` | User-side has 4 bullets; flowtron-side has 1 line. User-side broader-scope. flowtron's one-liner is in the right place — the contract layer already carries the operationalized version. | None. |
| 12 | "For non-trivial new task, start with: 'I want to [TASK] to achieve [SUCCESS CRITERIA]. Ask me questions using AskUserQuestion before planning or coding.'" | `~/.claude/CLAUDE.md` §Core Principles bullet 3 | No flowtron overlap (different shape) | `keep-personal` | User's invocation template — a prompt-shape rule, not a workflow rule. flowtron has no equivalent invocation-template guidance (its clarifying-questions step is downstream of invocation). | None. |
| 13 | General workspace preferences (readability/maintainability · prefer tests for non-trivial · atomic commits · document major decisions) | `~/code/CLAUDE.md` §General Workspace Preferences (4 bullets) | Partial overlap with flowtron Phase 2 (tests bullet) | `keep-personal` | Workspace-level coding standards. The "prefer tests for non-trivial" bullet semantically maps to flowtron Phase 2 "Updated/added tests for non-trivial behavior" — but the broader cluster (readability, atomic commits, document decisions) is user-level coding ethic. Survives `~/code/CLAUDE.md` retirement only via `.3`'s lift to global. | Consumed by `.3` (lift to `~/.claude/CLAUDE.md` per `.3`'s scope). |
| 14 | Tech Stack Tendencies (FastAPI + Python 3.11+ · React + TS + R3F · `backend/main.py` entrypoint convention) | `~/code/CLAUDE.md` §Tech Stack Tendencies (3 bullets) | No flowtron overlap (flowtron is stack-neutral per [[CORE-EPIC-154]]) | `keep-personal` | User stack preferences. flowtron's contract layer is intentionally stack-neutral. Survives `~/code/CLAUDE.md` retirement only via `.3`'s lift to global. | Consumed by `.3`. |
| 15 | Localhost Port Registry (9-row table + reserved ports + new-project port guidance) | `~/code/CLAUDE.md` §Localhost Port Registry | No flowtron overlap | `keep-personal` | Pure user-machine state. flowtron has nothing to say about port management (intentional — outside the workflow contract). Survives `~/code/CLAUDE.md` retirement only via `.3`'s lift to global. | Consumed by `.3`. |
| 16 | flowtron-availability pointer ("For new repos, flowtron is a ready-made option") | `~/code/CLAUDE.md` §Shared Workflow Philosophy bullet 4 | No direct overlap (different surface — user-side describes flowtron-availability vs. flowtron-self/adopter docs) | `keep-personal` | Per `.1` Discovery (and [[CORE-010]]'s heritage), this pointer migrates to `~/.claude/CLAUDE.md` in `.3`. Not redundancy. | Consumed by `.3`. |
| 17 | §Scope & Safety (cwd-outside-`~/code/` guardrail) | `~/.claude/CLAUDE.md` §Scope & Safety | No flowtron overlap | `keep-personal` | User-machine guardrail; not flowtron's concern. | None. |
| 18 | "Skills live in `~/.claude/skills/` (global) or `.claude/skills/` (per-project)" | `~/.claude/CLAUDE.md` closing | No flowtron overlap | `keep-personal` | Claude-Code skill-organization fact. flowtron's `claude/skills/` is the per-bundle-source path; the user's note is about runtime resolution. Different layer. | None. |
| 19 | "Avoid `cd dir && command` whenever the underlying tool can find its own config" (agent-neutral half of §Shell discipline) | `~/.claude/CLAUDE.md` §Shell discipline 2nd bullet | No flowtron overlap | `lift-to-flowtron` (soft) | The Claude-permission-prompt half is Claude-specific (and stays user-side per [[CORE-EPIC-154]]'s contract-neutrality posture). The general "tools find their own config — don't `cd`" rule is agent-neutral and project-agnostic; could land in `docs/CONVENTIONS.md` or `claude/AGENTS-snippet.md` as an adopter convention. Borderline — adds bloat for marginal benefit; lots of adopters won't share this concern. | **File PLAN.md ticket** as a low-priority lift candidate; user decides. |
| 20 | "Be concise unless asked otherwise" | `~/.claude/CLAUDE.md` §Communication bullet 3 | No flowtron overlap | `keep-personal` | User response-style preference. flowtron doesn't dictate response verbosity. | None. |

### Rollup

| Bucket | Findings | Notes |
|---|---|---|
| `delete-as-duplicate` (within-user literal) | 3 (F1, F2, F3) | Resolve via `.3` consolidation; no new tickets — `.3`'s scope already covers `~/code/CLAUDE.md` retirement and the canonical-survivor edits. |
| `delete-as-duplicate` (cross-contract semantic) | 1 (F4) | Strongest cross-contract semantic dup. Recommends reducing user §Model Selection to one general-scope sentence; not in `.3`'s scope. **One follow-up ticket.** |
| `lift-to-flowtron` | 1 (F19, soft) | Soft lift candidate; agent-neutral half of §Shell discipline. **One follow-up ticket** (low priority). |
| `keep-personal` (with `.3` lift) | 4 (F13, F14, F15, F16) | Workspace content that needs to survive `~/code/CLAUDE.md` retirement — `.3` lifts to global; no new tickets. |
| `keep-personal` (no action) | 11 (F5, F6, F7, F8, F9, F10, F11, F12, F17, F18, F20) | User-level meta-rules whose flowtron echo is operationalization-not-restatement; broader user scope justifies the duplication. Documented; no tickets. |
| **Total** | **20** | **Follow-up tickets to file at Phase 4: 2** |

**Key reads:**

1. **Most "duplication" between user CLAUDE.md and flowtron contract is operationalization, not restatement.** Where the user side carries a meta-rule (e.g., "loop until verified") and flowtron side carries the phase-checkbox operationalization (e.g., Phase 3 lint+test gates), both have load-bearing roles at different layers. The redundancy axis is shallow in those cases.

2. **The within-user-file duplications are the real findings** (F1-F3) — and they collapse naturally when `~/code/CLAUDE.md` retires in `.3`. No flowtron-side work needed.

3. **Only one cross-contract semantic dup is strong enough to act on** (F4 Model Selection) — flowtron's `SPEC/model.md` covers the same ground in the canonical contract location.

4. **Lift candidates are nearly empty.** [[CORE-EPIC-154]] (multi-agent-portability) and adjacent prior passes already lifted what was lift-able; the user side has settled into clean separation of concerns. The one soft candidate (F19) is borderline.

5. **The audit is mostly defensive — confirming the boundary is healthy** rather than surfacing actionable cross-contract drift. That's a positive signal for the context-chain-portability epic: there isn't a tangled mess to unwind, just the within-user duplication that `.3` already plans to resolve.

### Proposed PLAN.md tickets (held until Phase 4 closure)

Two follow-up tickets, each carrying the `Surfaced by CORE-198.2 audit 2026-05-25 (Finding #N, <bucket>)` parenthetical per [[CORE-132]] precedent. Both file under `## Medium` (or `## Low` — see per-ticket priority recommendation).

1. **CORE-199** [opus] | model-selection-user-reduction — Reduce `~/.claude/CLAUDE.md` §Model Selection from 3 bullets to one general-scope sentence (e.g., "Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind"); drop the copy-paste line guidance (flowtron `SPEC/model.md` + §Post-closure protocol already own that). Surfaced by CORE-198.2 audit 2026-05-25 (Finding #4, delete-as-duplicate cross-contract). → `## Low`

2. **CORE-200** [opus] | shell-discipline-lift-candidate — Consider lifting the agent-neutral half of `~/.claude/CLAUDE.md` §Shell discipline ("avoid `cd dir && command` whenever the tool finds its own config") into `docs/CONVENTIONS.md` or `claude/AGENTS-snippet.md` as a project-agnostic adopter convention. Borderline — adds bloat for marginal benefit; user decides. Surfaced by CORE-198.2 audit 2026-05-25 (Finding #19, lift-to-flowtron soft). → `## Low`

Both tickets word-counts (long-desc only, after ` — `):
- CORE-199: 50 words — at target after trimming "User-machine edit." in Phase 3 (was 52w, yellow).
- CORE-200: 48 words — under target.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (audit produces findings + PLAN.md tickets, not code; no executable surface). Verification gates run inline below (per [[CORE-132]] / [[CORE-073]] precedent).
- [x] Ran lint/type-check on changed code — N/A; markdown-only output. Findings-table markdown grammar verified mentally during write.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

Verification gates (substituting for automated tests):

1. **ID collision check** — `grep -nE '\*\*CORE-(199|200)\*\*' _project/PLAN.md _project/tasknote/archive/core/*.md` returned zero hits. Both IDs are free.
2. **Source-file existence (drift recheck)** — all cited paths exist at HEAD: `~/.claude/CLAUDE.md` · `~/Code/CLAUDE.md` · `SPEC.md` · `SPEC/{blocked,epic,model,starter,versioning}.md` · `claude/AGENTS-snippet.md` · `docs/CONVENTIONS.md`. ✓
3. **Wikilink integrity** — all 7 cited `[[ID]]`s in the related-tasks YAML, chip row, and 🔗 Related section resolve to PLAN.md entries (active or completed): CORE-EPIC-198 · CORE-198.1 · CORE-132 · CORE-010 · CORE-129 · CORE-EPIC-154 · CORE-037. ✓
4. **Word-counts** (per SPEC §"PLAN.md filing-discipline thresholds"):

   | Ticket | Words (after `— `) | Verdict |
   |---|---|---|
   | CORE-199 | 50w | ✅ at target (post-trim; was 52w yellow → dropped "User-machine edit.") |
   | CORE-200 | 48w | ✅ under target |

5. **Task-line grammar parity** — both proposed lines match SPEC §"Task-line format" shape `- [ ] **<ID>** [model] | shortname — desc.` ✓
6. **Findings-table internal consistency** — 20 findings × 7 columns; bucket counts in rollup (3 + 1 + 1 + 4 + 11 = 20) match the per-row buckets in the findings table. ✓

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip; signals clear — see Final Summary below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change (CORE-200's potential lift-to-snippet is the proposed ticket, not executed here) |
| `docs/CONVENTIONS.md` | no change (CORE-200's potential lift-to-CONVENTIONS is the proposed ticket, not executed here) |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change |
| `docs/PLATFORMS.md` | no change |

Audit deliverable is findings + follow-up PLAN.md tickets only — no in-place contract-surface edits in this child, per [[CORE-132]] precedent. Downstream tickets (CORE-199 / CORE-200) and `.3` (claude-md-consolidation) execute the recommended changes; `.5` audit will catch any doc-drift the implementation children miss.

**Final Summary:**

Audited cross-corpus redundancy across `~/.claude/CLAUDE.md`, `~/code/CLAUDE.md` (pre-retire), flowtron `SPEC.md` + `SPEC/` modules, and the AGENTS.md paste-block — 20 findings classified into `delete-as-duplicate` / `lift-to-flowtron` / `keep-personal` buckets. Most apparent "duplication" between user CLAUDE.md and flowtron contract turned out to be operationalization (user-side meta-rule + flowtron-side phase-checkbox version) rather than restatement; only one cross-contract semantic dup is strong enough to act on (§Model Selection vs. `SPEC/model.md`). The audit confirmed the context-chain boundary is healthy — there isn't a tangled mess to unwind, just the within-user duplication that `.3` already plans to resolve.

Technical detail:
- **20 findings:** 3 within-user literal dups (Shell discipline · "follow project's task lifecycle" · closing precedence line — all consumed by `.3`'s consolidation scope; no new tickets) · 1 cross-contract semantic dup (F4 §Model Selection vs. `SPEC/model.md` — filed as CORE-199) · 1 soft lift candidate (F19 agent-neutral half of §Shell discipline — filed as CORE-200) · 4 workspace items that survive `~/code/CLAUDE.md` retirement only via `.3`'s lift to global (port registry · FastAPI conventions · general workspace prefs · flowtron pointer) · 11 keep-personal meta-rules whose flowtron echo is operationalization-not-restatement.
- **2 follow-up tickets filed at closure** (single PLAN.md write): CORE-199 [opus] | model-selection-user-reduction (50w; `## Low`) · CORE-200 [opus] | shell-discipline-lift-candidate (48w; `## Low`). Both carry the `Surfaced by CORE-198.2 audit 2026-05-25 (Finding #N, <bucket>)` parenthetical per [[CORE-132]] precedent.
- **Pattern survey:** extended [[CORE-132]]'s recommendations-only audit shape (findings inline → follow-up tickets at closure → no in-place edits in audit child). Reshaped the deliverable for the cross-corpus redundancy axis (combined findings table not per-pass tables · bucket classification not severity · within-file vs. cross-contract overlap-kind flagged per row).
- **Archive-skim added precedent:** [[CORE-037]] workflow token-cost audit (2026-05-05) characterized both user CLAUDE.md files as "already lean / no section-level trim candidates" on the **size axis**. This audit operates on the orthogonal **redundancy axis** (cross-file overlap); explicitly does not re-do CORE-037's word-count analysis. Folded into 🔗 Related and Discovery Notes.
- **Drift findings carried into the audit:** `~/.claude/CLAUDE.md` has grown since CORE-037 (added §Shell discipline + §Model Selection sections — both feature in the findings table). `~/code/CLAUDE.md` has grown substantially (now carries a 9-row Localhost Port Registry — F15 keep-personal). Pre-flight grep surfaced the F1 literal duplication between the two user files' shell-discipline rules — flagged at Phase 1 and validated by the table.
- **Verification gates** (Phase 3, substituting for automated tests): 0 ID collisions for CORE-199 / CORE-200 · all 10 cited source-file paths exist at HEAD · all 7 cited wikilinks resolve in PLAN.md · word-counts at target (CORE-199 trimmed 52w→50w; CORE-200 48w) · task-line grammar parity confirmed for both proposed lines · findings-table bucket totals reconcile (3+1+1+4+11 = 20).
- **Net for the epic:** `.3` (claude-md-consolidation) is now unblocked with concrete lift/keep/drop classification as input. `.4` (grok-adoption-verification) remains independent and can run before or after `.3`. `.5` audit catches any doc-drift the implementation children miss.

**Archived:** 2026-05-25
