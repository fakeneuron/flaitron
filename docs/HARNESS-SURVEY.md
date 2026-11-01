# Harness survey

Periodic comparison of flaitron against contemporary AI-coding harnesses,
frameworks, and trackers. Each pass is a dated section; a later pass appends
rather than rewrites, so the record shows what the field looked like when a
decision was made. Read when planning a survey pass, when a "should flaitron
do X?" question comes up, or when [`docs/VISION.md`](VISION.md) §"What we
won't accept" needs a current counter-example. Passes dated before v6.0.0
call the project by its [former name](../README.md#formerly-flowtron).

Method for every pass: read `SPEC.md` + `docs/VISION.md` first, then the
field, then rank gaps by *would it change task outcomes* and overkill by
*is the clause still load-bearing for current models* (Anthropic's harness
lesson: every component encodes an assumption about what the model can't do;
strip what no longer is).

## 2026-09-21 — first pass (narrow net)

Scope: five framework families, ~12 products, web sources only, one session.
Filed as CORE-655 … CORE-662 + FE-124 (`chore: file … harness-survey
follow-ups`, `b39eb024`) and one row in the external caller's own plan.

### Landscape

| Family | Leaders examined | Core bet | Flowtron overlap |
|---|---|---|---|
| Spec-first | GitHub Spec Kit (constitution → `/specify` → `/plan` → `/tasks`), OpenSpec (delta specs + archive), BMAD (12+ agile personas) | Get the spec right upstream | `/ft-epic-discovery --deep`, `spec-template.md`, PLAN.md as derived task list |
| Discipline / skill libraries | Superpowers (brainstorming, TDD-as-law, systematic-debugging, verification-before-completion, two-stage review), Compound Engineering (plan → work → review → *compound*) | Enforce behaviors the model skips under pressure | 4 phases, verify-command rule, receipts, `--debug`, paper-complete guard |
| Context-engineering orchestrators | GSD (fresh subagent per phase, `.planning/` durable state), GSTACK (23 role-scoped contexts), Gas Town / Gas City | Never let one window do everything | One task per window, probe/delegate, CONTEXT-BUDGET |
| Agent-native trackers | beads / `bd` (Dolt-backed dependency graph, `bd ready`, "land the plane"), Backlog.md, agent-standup (server-enforced rules), tkr | Tasks need a graph and a queue | PLAN.md grammar, `Blocked by [[ID]]`, planning keys, viz |
| Anthropic harness research | Planner / Generator / **Evaluator** separation; self-evaluation unreliable even on verifiable tasks; re-examine the harness as models improve | External evaluation; subtractive maintenance | Acceptance tick-through — **no external evaluator** |

Claude Code native overlap noted: plan mode ≈ Phase 1, auto-memory ≈
compound step, `/code-review` ≈ evaluator, worktree isolation ≈
WORKTREES.md, scheduled agents / cloud sessions ≈ the `[unattended]`
consumer. "Contract in flowtron, runtime in the runner" ages well against
this.

### Differentiators (things the leaders don't do)

1. Relevance Assessment as a hard gate — nobody else asks "is this still the right work?"
2. Paper-complete guard + 🏁 only with a deliverable-covering SHA.
3. Archive as decision memory + `Superseded by` pointers (compound-by-product).
4. `[model]` tier routing with a mismatch gate.
5. `[unattended]` / `[handoff]` deny-by-default headless markers, with a real consumer (an operator-private orchestrator).
6. Byte budgets enforced in CI.
7. `touches:` scope reconciliation as a recorded fact, not a gate.
8. 1,000+ tasks of dogfooding.

### Gaps (ranked)

1. **Evaluator outside the generator** — the one critical gap. → CORE-656.
2. Push-memory (learnings land where the next session reads unprompted) vs. archive pull-memory. → CORE-658.
3. Ready view (`bd ready`). → FE-124.
4. Optional enforcement-hook examples for adopters (agent-standup's "enforced, not requested"). Deferred — no row.

Deliberately not gaps: TDD-as-iron-law, multi-persona simulation, heavy
upstream spec ceremony, session handoff (already covered).

### Overkill

1. ~72KB of gate prose for two banners; `gate-discipline.md` is a catalog of spring-2026 model failure modes. → CORE-659 / CORE-660.
2. Contract text carrying incident history (nav-chip anecdotes, "why we rejected X"). → CORE-657.
3. `/ft-release` mirror pairs (118KB dir) — root cause is mirror count, not check quality. No row yet.
4. CONTEXT-BUDGET table cells are ~1KB of history each. → CORE-662.
5. Multi-runner sync tax — **not overkill**: Grok is used frequently (operator answer 2026-09-21).
6. `[unattended]` surface — **not overkill**: the external caller reads it and it is critical (same answer).

Verdict: lifecycle core well-balanced and arguably best-in-class for the
solo-markdown niche; meta layer shows accretion because self-hosting has no
subtractive force. → CORE-661 (decay pass).

### External-caller exposure (checked against the caller's parser source)

The caller parses: task-line grammar, `status:` / `park-reason:`, `## <emoji>
Phase N:` headings + per-phase checkboxes, `## 🎯 Goal`,
`**Final Summary:**` … `**Archived:**`, `**Verdict:** De-scope`, `### Follow-ups?`,
the two skill capability probes, `just test/lint/typecheck`. It reads no SPEC
prose and writes nothing into producers. The phase/Goal headings were not in
`EXTERNAL-AGENTS.md`'s stable table — CORE-655 adds them.

### Not examined this pass (seed list for a wider net)

Products: Kiro (AWS; requirements/design/tasks + steering + hooks), Amp
(threads, handoff), Devin (wiki / Knowledge), Cursor plan mode + rules,
Codex cloud tasks, Google Jules, Copilot agent mode, Cline memory bank,
Aider conventions, Taskmaster AI, claude-flow, OpenAI Symphony (verify it
exists), Tessl, Conductor (Gemini CLI). Trackers: Backlog.md and tkr in
depth. Practices: Karpathy LLM-wiki pattern (already rejected in VISION),
Ralph loop, "boil the lake". Sources to add: GitHub star/commit velocity,
Anthropic plugin-marketplace install counts, primary docs rather than
comparison blogs, and at least one hands-on trial per family.

### Sources

Pulumi (Superpowers/GSD/GSTACK) · The AI Engineer substack (Superpowers vs
GSD vs Compound Engineering) · Reenbit (BMAD vs Spec Kit vs OpenSpec) ·
obra/superpowers README · Anthropic "Harness design for long-running apps"
and "Effective harnesses for long-running agents" · Tekai + Yegge on beads ·
agent-standup README · BSWEN 2026 spec-frameworks comparison · Claude Code
changelog. Comparison blogs, not primary docs — the wider pass should fix
that.

## 2026-09-22 — second pass (wider net)

Scope: the first pass's §"Not examined" list — 17 products and 3 practices in
five families. Five parallel research probes, **primary sources only**
(vendor docs, official repos, changelogs, originators' own posts); nothing
below leans on a comparison blog. One **clone-and-read trial** per family
(shallow clone into a scratch dir, prompts and source read, nothing installed
or run). Re-ranked against what CORE-655 … 665 actually landed. CORE-663.

### Landscape delta

| Family | Examined | Core bet | Flowtron read |
|---|---|---|---|
| Spec-first / decomposition | Kiro, Tessl, Conductor (Gemini CLI), Taskmaster AI | Structured spec → task list → governed execution | Ceremony is **not sticking**: Tessl dropped spec-driven dev as its product (the docs page 404s; it survives as one installable "tile") and pivoted to a context registry with with-vs-without evals; Taskmaster (28k★) has had 0 commits in ~5 months. Argues against growing `--deep`. |
| Cloud / async agents | Devin, Codex cloud, Jules, Copilot coding agent, OpenAI Symphony | Parallel sandboxed runs handed back as diffs/PRs | Symphony is **real** (`openai/symphony`: a 2,312-line language-neutral `SPEC.md` + Elixir reference) and is effectively the runtime flowtron's external caller fills — label + tracker state as the unattended gate, a "blocked-access escape hatch" to `Human Review`, out-of-scope finds filed as new issues. Independent convergence on `[unattended]` + park + `/ft-file-followup --unattended`. |
| IDE/CLI memory & rules | Cursor rules + plan mode, Cline memory bank, Aider conventions, Amp | Scoped rules; plan/act split; short threads | Both vendors' own evolution moved **away from read-everything memory**: Cursor folded Memories into Rules ("add a rule only on a repeated mistake", "<500 lines"); Amp removed compaction for goal-directed `/handoff`; Cline now routes routine context to Auto Compact. Supports lazy `SPEC/` modules, byte budgets, and a gated Learnings box. |
| Agent-native trackers | Backlog.md, tkr (→ `tk`), claude-flow (→ Ruflo), beads re-check | Tasks need a graph and a queue | Convergence on markdown + frontmatter and a **derived, fail-closed ready rule** — Backlog.md's `isReady` matches FE-124's semantics down to "unknown blocker ⇒ not ready". Beads (v1.3: HTTP API, leased claims, row locks) and Ruflo (swarms, 314 MCP tools) moved further into runtime flowtron refuses. |
| Practices | Ralph loop, Karpathy LLM-wiki, "boil the lake" | Loop to backpressure; wiki layer; completeness is cheap | See below. |

Cross-cutting: **AGENTS.md is now universal** (Codex, Jules, Copilot, Kiro,
Cline, Cursor, Amp all read it; Codex walks root→cwd, prefers
`AGENTS.override.md`, and truncates at a byte budget), and **SKILL.md is
becoming the portable command format** (Conductor migrated its Gemini TOML
commands to `skills/*/SKILL.md` + a Claude plugin manifest). Both validate
"contract in flowtron, runtime in the runner".

### Practices

- **Ralph loop** (Huntley, ghuntley.com/ralph, 2025-07; `how-to-ralph-wiggum`, 2026-01): `while :; do cat PROMPT.md | claude; done`, split into a PLANNING mode (gap analysis → `IMPLEMENTATION_PLAN.md`, no code) and a BUILDING mode (one item per iteration, tests as "backpressure", commit, **process exits → fresh context**). The plan file is the only cross-iteration state. Flowtron's `--loop` is stricter per cycle (machine-checkable stop, `loop-max`, destructive park, review once post-convergence — `SPEC/loop.md`) but silent on whether a cycle may restart from on-disk state, which is Huntley's central claim.
- **Karpathy LLM-wiki**: the gist still has one revision (2026-04-04); everything newer is community forks. Nothing changes the `docs/VISION.md` rejection.
- **"Boil the lake"** (Garry Tan; `garrytan/gstack` `ETHOS.md` §1, now titled "Boil the Ocean … one lake at a time"): with AI, completeness is near-free, so take the complete option and don't defer tests to a follow-up. Compatible with one task per window (the lake *is* the unit); it pushes against reading "Implemented the minimal solution" as licence to defer in-scope tests or edge cases — which Phase 2's "Updated/added tests for non-trivial behavior" box already forbids. Watch, no change.

### Hands-on trials (clone and read)

| Family | Repo read | What the source showed that the docs didn't |
|---|---|---|
| Spec-first | `gemini-cli-extensions/conductor` | Git is the state machine: per task a code commit, a git note, and a *separate* plan commit (`[x] <sha7>`) — 2–3 commits per task; revert handles rewritten-history "ghost" SHAs by fuzzy message match. Ships one Python helper despite a markdown pitch. `workflow.md` template is generic (>80% coverage, TDD, emergency procedures). |
| Cloud / async | `openai/symphony`, `openai/codex` (sparse) | A run "MUST NOT stall indefinitely waiting for user input"; one persistent `## Codex Workpad` comment (plan, acceptance, validation, `### Confusions`) carries state across retries; `attempt` N resumes, `Rework` is a full reset. Codex's review rubric flags only bugs "introduced in the commit" that "the author would fix". |
| IDE/CLI memory | `cline/cline` | Glob-conditional rules look unwired at HEAD (the matcher's only caller passes no paths; the SDK loader renders every rule). Plan mode is enforced by a shell denylist whose own comment admits "models … use it to edit files anyway". Memory Bank has no code at all — a prompt template. |
| Trackers | `MrLesk/Backlog.md` | Markdown storage behind a mandatory CLI (`<CRITICAL_INSTRUCTION>` never edit task files) — the opposite trade to flowtron's. Guidance is now a short nudge plus stage-loaded guides (lazy modules via CLI). Codified "do not trust a plan written at creation time; re-research at In Progress". |
| Practices | `anthropics/claude-plugins-official` `plugins/ralph-loop` | **Not Huntley's Ralph**: a Stop hook re-feeds the prompt in the *same* session (no fresh context); exit is a self-declared `<promise>` string; `--max-iterations` defaults to unlimited. |

### Velocity (2026-09-22)

`gh api repos/<r> --jq '{stars,created,pushed}'` and `gh api
"repos/<r>/commits?since=2026-08-22T00:00:00Z&per_page=100" --jq length`
(default branch; `100+` = that single page's cap). Exact counts above 100
(Ruflo, Cline, beads, Backlog.md) came from the same call with `--paginate`,
summed. Install counts from `claude.com/plugins`
pages — the official marketplace repo publishes none.

| Product | Repo | ★ | 30-day commits | Note |
|---|---|---|---|---|
| Superpowers | obra/superpowers | 290,210 | 1 | 1,009,371 plugin installs; work lands off-main |
| Spec Kit | github/spec-kit | 138,408 | 100+ | |
| gstack | garrytan/gstack | 133,936 | 23 | |
| Codex CLI | openai/codex | 125,964 | 100+ | |
| Ruflo (ex claude-flow) | ruvnet/ruflo | 73,078 | 125 | renamed |
| OpenSpec | Fission-AI/OpenSpec | 69,868 | 100+ | |
| Cline | cline/cline | 69,077 | 319 | |
| GSD | gsd-build/get-shit-done → open-gsd/gsd-core | 64,479 / 9,757 | 0 / 100+ | old repo archived |
| BMAD | bmad-code-org/BMAD-METHOD | 53,353 | 100+ | |
| Aider | Aider-AI/aider | 49,118 | 0 | stalled since 2026-05 |
| Taskmaster | eyaltoledano/claude-task-master | 28,086 | 0 | dormant; rebranded Hamster |
| beads | gastownhall/beads (ex steveyegge) | 27,367 | 118 | moved org |
| Symphony | openai/symphony | 27,357 | 3 | created 2026-02 |
| Compound Eng. | EveryInc/compound-engineering-plugin | 25,214 | 100+ | own marketplace, no official count |
| Gas Town | gastownhall/gastown | 18,159 | 0 on main | moved org |
| Backlog.md | MrLesk/Backlog.md | 6,816 | 110 | |
| Kiro | kirodotdev/Kiro | 4,328 | 5 | issues/docs repo, product closed |
| Conductor | gemini-cli-extensions/conductor | 3,745 | 2 | v0.3.0 |
| tk | wedow/ticket | 898 | 0 | nearest match for "tkr"; no repo by that name |
| flowtron | fakeneuron/flowtron | 0 | 100+ | self; public, unpromoted |

Other plugin installs: ralph-loop 196,527 · code-review 438,525. Closed
products (Devin, Jules, Copilot agent, Cursor, Amp): no public velocity.
`agent-standup`, cited in the first pass, no longer resolves on GitHub.

### First-pass disposition

| First-pass item | Now |
|---|---|
| Gap 1 — evaluator outside the generator | **Landed** — Phase 3 External review (CORE-656). Field check: Jules runs an in-run critic, Codex a narrow bug-only rubric; nobody else separates the context. |
| Gap 2 — push-memory | **Landed** — Phase 4 Learnings box (CORE-658). |
| Gap 3 — ready view | **Landed** — viz Ready toggle (FE-124); semantics independently confirmed by Backlog.md. |
| Gap 4 — enforcement-hook examples | **Still open, now stronger** — see Gaps #1. |
| Overkill 1 — gate prose | **Partial** — two triggers dropped (CORE-659); the trim itself parked on decay-window depth (CORE-660, `blocked`). |
| Overkill 2 — incident history | **Closed, De-scoped** (CORE-657) — remainder is load-bearing; headroom recovered instead by extraction (CORE-664). |
| Overkill 3 — `/ft-release` mirror pairs | **Still open**, no row. |
| Overkill 4 — CONTEXT-BUDGET cells | **Landed** (CORE-662, 23,244 → 20,224). |
| Verdict — no subtractive force | **Landed** — `/ft-audit context` pass 6, Contract decay (CORE-661). |
| External-caller heading exposure | **Landed** (CORE-655). |

### Gaps (re-ranked)

1. **Enforcement-hook recipes for adopters.** Three families independently enforce what flowtron requests in prose: Kiro's blocking pre-hooks, Copilot's platform rulesets, and Cline's plan-mode denylist — whose source concedes models edit anyway. `docs/VISION.md` already assigns deterministic enforcement to per-project permission hooks; what is missing is a worked example (Discovery read-only, block-secrets) an adopter can copy. Docs, not contract.
2. **Loop cycle recoverable from disk.** One `SPEC/loop.md` clause: every cycle must be resumable from the tasknote + `## 🔁 Iterations` log alone, so a runner may restart context per cycle (Huntley's fresh-context claim); and a self-declared completion string is not an exit (the official ralph-loop plugin's failure mode).
3. **Operator corrections as a Learnings source.** Jules captures memory from operator "nudges and corrections", Devin proposes Knowledge from chat feedback, Symphony's workpad keeps `### Confusions`. Flowtron's Learnings box is self-reflection only; one prompt clause ("did the operator correct you this run?") would point it at the highest-signal input.
4. **Criterion-level traceability.** Kiro derives property tests from EARS requirements and links failures back; Tessl links specs to tests with `[@test]`. Flowtron already binds a verify command per criterion; the residual gap is a receipt that cites *which* criterion it proves. Lowest-value of the four — the existing binding does most of the work.

Checked and **not** gaps (already covered): machine-readable run outcome
(eight `park-reason:` codes, `SPEC/blocked.md`); resume-vs-reset (§"Resuming
an interrupted run"); mid-task handoff seed (`## 🔄 Handoff` insert); module
load triggers (every `SPEC/` module opens with a "Lazy-loaded SPEC module" line naming its load trigger); plan
staleness (Phase 1 Drift check); post-hoc modified files (`touches:`
reconciliation); standing DoD (Phase 3 checklist + AGENTS.md §Validation).
Refused runtime, not gaps: parallel dependency waves (Kiro), best-of-N
(Codex), leased claims / HTTP API (beads), swarms (Ruflo), a tracker-polling
daemon (Symphony).

### Overkill (re-ranked)

1. **Gate prose** — still the largest target; waits on CORE-660's window.
2. **`/ft-release` mirror pairs** — unchanged, still no row.
3. **`--deep` pre-pass** — new signal: the field's spec-ceremony leaders are pivoting (Tessl) or dormant (Taskmaster). Not overkill yet — flowtron's `--deep` is opt-in — but a candidate for the pass-6 decay window rather than growth.
4. **Not overkill, recorded so it isn't re-litigated:** per-row `[model]` (unique — every product surveyed sets the model per runner, but it is a differentiator the operator uses); the `[unattended]` candidacy predicate (Symphony's label + state column is equivalent, not lighter in practice); multi-runner wiring (Cline reads five rule formats; thin snippets are the right size); the four phases (Aider's and Ralph's lighter shapes are covered by the micro-task and skip thresholds).

### Filing

None (operator, 2026-09-22): nothing critical surfaced, and the token-saving
candidates are already in flight (CORE-660) or low-yield (gap #2 saves only
on `--loop` runs; overkill #2 only at release). The ranked lists above are the
seed for the next pass.

### Not examined this pass

Windsurf / Cognition's post-merger surface, Zed agent, OpenHands,
Goose, Roo Code, Continue; Amp's AGENTS.md loading (manual now behind
sign-in); Cline's glob-rule activation at runtime (code-read only, not run).
Next pass: one family *installed and run* against a toy repo, not only read.

### Sources

kiro.dev/docs/{specs,specs/correctness,steering,hooks} · docs.tessl.io ·
github.com/tesslio/spec-driven-development-tile ·
github.com/gemini-cli-extensions/conductor ·
github.com/eyaltoledano/claude-task-master · docs.devin.ai (knowledge,
playbooks, deepwiki) · learn.chatgpt.com/docs/cloud · github.com/openai/codex ·
jules.google/docs (+ API sessions reference, changelog) ·
docs.github.com/en/copilot (coding agent, repository instructions) ·
github.com/openai/symphony · cursor.com/docs/{rules,agent/planning} ·
github.com/cline/cline (docs/) · aider.chat/docs/usage/{conventions,modes} ·
ampcode.com/news/handoff · github.com/MrLesk/Backlog.md ·
github.com/wedow/ticket · github.com/ruvnet/ruflo ·
github.com/gastownhall/beads · ghuntley.com/ralph ·
github.com/ghuntley/how-to-ralph-wiggum · gist karpathy/442a6bf5… revisions ·
github.com/garrytan/gstack ETHOS.md · garryslist.org/posts/boil-the-ocean ·
github.com/anthropics/claude-plugins-official · claude.com/plugins. All
primary; no comparison blogs.

## 2026-11-01 — third pass (agent-baseline lens)

Scope: not the field this time, but flaitron against the **agent's own
unprompted behaviour**. Both earlier passes asked what other harnesses do;
neither asked which of flaitron's per-task clauses tell a current coding agent
to do something it would do anyway. Baseline = the weakest runner in use
(Codex CLI / Cursor / Grok): reads AGENTS.md, follows explicit instructions,
knows nothing flaitron-specific unprompted; already reads relevant files,
makes the minimal change, runs visible test/lint commands, avoids unrelated
refactors, asks when ambiguous, writes a commit message. Five read-only probes
classified every passage ≥100 bytes in nine files of the ordinary-task load
path into six buckets, with `sed -n | wc -c` byte counts; `AGENTS.md` (10,313)
and `.flaitron/PLAN.md` (7,867) were sized but not bucketed, so every
percentage below is a lower bound on a 13%-incomplete inventory. The main
window kept only the tables. CORE-856. Read-only on the contract — nothing below edits a loaded
file.

Predecessor: CORE-EPIC-724 `context-diet` (2026-10-07) deduplicated flaitron
against *itself* (cold-start files 96,308 → 84,842, −11.9%) and opened a decay
window that CORE-727 closed with every cut permanent. This pass measures what
grew back and applies the one lens 724 did not.

### Load path (`wc -c`, 2026-11-01)

| Runner | Always loaded on a flagless `/ft-task` | Bytes |
|---|---|---|
| Claude | `SPEC.md` 44,818 · `claude/skills/ft-task/SKILL.md` 27,158 · `preamble.md` 7,513 · `AGENTS.md` 10,313 · `.flaitron/tasknote/README.md` 11,052 · `templates/tasknote-template.md` 3,993 · `.flaitron/PLAN.md` 7,867 · `SPEC/gates.md` 13,710 · `SPEC/post-closure.md` 9,877 | **136,301** |
| Codex / Cursor / Grok | `SPEC.md` 44,818 · `SPEC/procedures/ft-task.md` 34,197 · the same `AGENTS.md` / README / template / PLAN 33,225 · `gates.md` + `post-closure.md` 23,587 (plus the 3,855 B paste-block inside `AGENTS.md`) | **≈135,800** |
| Flag extras (Claude) | `step-0-flags.md` 6,414 · `micro-mode.md` 6,334 · micro template 2,444 · `SPEC/gate-postures.md` 21,991 · `SPEC/tasknote-selection.md` 10,723 · `SPEC/blocked.md` 15,870 · `unattended-mode.md` 25,665 | per flag |

**Regrowth since the diet close** (`504f160f` → HEAD, 289 commits, 25 days):
`SPEC.md` +2,041 · `ft-task/SKILL.md` +3,721 · `AGENTS.md` +2,312 ·
`SPEC/post-closure.md` +2,090 · `preamble.md` +237 · tasknote README +176 ·
template −30 · `SPEC/gates.md` −385 → the always-loaded Claude set regrew
**+10,162 B**. `.flaitron/PLAN.md` is excluded from that sum (21,905 → 7,867
is the `## Completed` rotation, not contract). Like-for-like with the diet:
CORE-724.2 measured its cut over `SPEC.md` + `gates.md` + `gate-postures.md` +
`post-closure.md` (96,308 → 84,842, −11,466); that same four-file set has
since moved +2,041 −385 +2,136 +2,090 = **+5,882**, so 51% of what the diet
removed is back after 25 days. Off the always-loaded set:
`SPEC/procedures/ft-task.md` +1,457. The byte caps in
`docs/CONTEXT-BUDGET.md` are sized with 1.5–2 working units of headroom each,
so this growth is inside every cap by design; the ratchet catches a jump, not
a drift.

### Classification

Buckets: **A** agent-default restatement (the weakest runner would not behave
differently without it) · **B** harness-primitive explainer or runner wiring ·
**B2** a skill or procedure re-narrating a SPEC section instead of pointing at
it · **C** rationale / incident history in loaded text · **D**
self-maintenance machinery · **E** small-task ceremony · **F** load-bearing
(the runner would not do it unprompted, or an external caller parses it).
Checklist lines whose *content* is A ("Read relevant source files",
"Implemented the minimal solution", "Ran lint") are scored F because the
caller parses them; scored by content they would add ~1–1.5 KB to A.

| File | Total | A | B | B2 | C | F | Unclassified | Largest non-F passages |
|---|---|---|---|---|---|---|---|---|
| `SPEC.md` | 44,818 | 1,412 | 1,616 | — | 5,464 | 35,781 | 545 | C §"What flaitron does NOT provide" L757-782 1,498 · C §Core principles 667 · C §Phase 1 drift-check rationale L343-349 538 · C §Phase 4 push-vs-pull memory 508 · B probe/delegate explainer L324-334 819 · B reviewer wiring L432-438 488 · A §Phase 3 "Choosing a test strategy" L452-460 636 · A §Phase 2 L369-376 452 |
| `.flaitron/tasknote/README.md` | 11,052 | 0 | 0 | — | **5,307** | 5,467 | 278 | C five incident-history paragraphs L76-141 (CORE-489.3 / 492 / 543 / 622.3, ~4.5 KB) |
| `templates/tasknote-template.md` | 3,993 | 0 | 0 | — | 0 | 3,980 | 13 | — |
| `claude/skills/ft-task/SKILL.md` | 27,158 | 538 | 0 | **5,262** | 1,096 | 20,119 | 143 | B2 `--unattended` posture L35 1,143 · B2 Step 6 skill-specific L139-141 964 (re-narrates `post-closure.md`, loaded one line earlier) · B2 External review L127 916 · B2 Phase 4 op list L128 770 · B2 epic Notes L145 510 · A Phase 2 L126 391 |
| `claude/skills/ft-task/preamble.md` | 7,513 | 0 | 0 | 0 | 588 | 6,917 | 8 | C ordering rationale L3 236 · C area-derivation rationale L44 206 |
| `SPEC/gates.md` | 13,710 | 0 | 0 | 458 | 999 | 10,437 | 1,816 (module header, cue-vocabulary pointer, the `default-fire` flavor other skills use) | C two-banner-cap governance L27-34 629 · C Gate-discipline pointer L196-202 370 |
| `SPEC/post-closure.md` | 9,877 | 0 | 0 | 540 | 211 | 8,586 | 540 (module header) | B2 skill-namespace restatements L51 / L60 |
| `SPEC/procedures/ft-task.md` | 34,197 | 1,389 | 1,287 | **14,650** | 1,708 | 14,808 | 355 | B2 Phase 4 closure list L436-470 2,333 · B2 "Parking, in one paragraph" L63-87 1,750 · B2 downstream-impact scan L375-391 1,229 · B2 Step 6 L477-494 1,125 · B2 marker-vs-mode L132-146 1,090 · B2 Archive skim L304-316 957 (near-verbatim §Phase 1) · A Phase 2 L360-367 596 |
| four `AGENTS-snippet.md` | 33,347 | 0 | 27,077 | 448 | 1,131 | 4,289 | 402 | not per-task: only the `claude/` paste-block L15-31 (3,855) is loaded; the rest is one-time wiring |

Unclassified = headings, blank lines, metadata and passages under 100 B; the
rows sum to Total with it. Sums on the **Claude flagless path** (136,301;
`AGENTS.md` and `PLAN.md` not bucketed): A 1,950 (1.4%) · B 1,616 (1.2%) · B2
6,260 (4.6%) · C 13,665 (10.0%) → **A+B+B2+C = 23,491 = 17.2% gross**. On the
**Codex / Cursor / Grok path** (≈135,800), counting the same files the same
way: the procedure's 14,650 of B2 plus its 4,384 of A/B/C, `SPEC.md`'s 8,492,
the README's 5,307, and `gates.md` + `post-closure.md`'s 2,208 of B2/C →
**35,041 = 25.8% gross**.

**The hypothesis is mostly false by bytes.** Bucket A — clauses a current
agent would follow unprompted — is 1.4% of the Claude path and 4.1% of the
procedure (1,389 / 34,197). Flaitron is not over-specifying agent defaults; the two prior
survey passes' "lifecycle core well-balanced" verdict holds at the clause
level too. What the lens actually surfaced is **self-reference**: the runner
bodies re-narrate the SPEC they load (B2, 6.3 KB on Claude, 14.7 KB on the
other runners — 43% of `SPEC/procedures/ft-task.md`), and incident history
sits in two always-loaded files (C, 13.7 KB, 39% of it the tasknote README).

**Bucket C re-examined against CORE-657.** That task found 355 of 422 bytes
of `SPEC.md` nav-chip "history" to be CORE-393's anti-misreading hardening and
declined to move it. The rule still holds, and it is the filter for every C
row here: a passage that answers a question a scanning agent is known to have
asked wrongly stays; a passage that records *who decided and when* goes to
`docs/` with a pointer. By that filter the README's five paragraphs
(L76-141) and `SPEC.md` §"What flaitron does NOT provide" (which already has a
lazy home in `SPEC/scope-boundaries.md`) are movable; `SPEC.md`'s Phase 1 and
Phase 4 rationale paragraphs (~1 KB) are hardening-shaped and stay. CORE-657's
own Finding 5 — the lever is wholesale section extraction, not sentence trims
— is confirmed by the B2 figure: pointing instead of re-narrating is the same
move.

### Bucket D — self-maintenance machinery

Four real KEEP IN SYNC guard blocks (2,826 B; the rest of the greps are prose
mentions), all guarding the adopter paste-block. `tools/drift-checks.sh`
41,082 B / 19 functions, all in CI: adopter-protective 11,014 B of shell,
dual-purpose 15,452, internal-only 9,529 (`final_newline`, `sidequest_orphan`,
`pair_h`, `pair_p`, `pair_r`, `pair_t`); the remaining 5,087 is the file's
header and dispatcher. `claude/skills/ft-release/**` 108,531: `SKILL.md`
37,336 · `step-7.1-mirror-pairs.md` 31,348 (15 pairs — adopter 5,778 / both
8,305 / internal 14,357, plus a 2,908 B intro; Pair K alone is 5,859 B of prose
with no shell) · standing checks 22,871 · dogfood SOP 14,319.
`docs/AGENT-NEUTRALITY.md` 26,295 B is hand-maintained (54 commits since
2026-09-01) and no check updates its counts.

**Per-task load from bucket D: 0 bytes.** It is release-time and CI cost, so
it is out of scope for a per-task trim and this pass files nothing on it. The
two earlier passes' overkill item #3 (`/ft-release` mirror pairs) stands as
recorded: 14,357 B of the directory's pair catalogue serves only
self-consistency (plus 9,529 B of internal-only shell in
`tools/drift-checks.sh`, outside the directory), and the cheapest cut would be
the three prose-only pairs (A, D, K: 8,183 B).

### Bucket E — small-task ceremony

Ten archived notes (2026-10-07 → 10-27) with ≤50 non-workflow diff lines at
the closure commit, seeded by the three CORE-727 named:

| ID | +/- lines | note bytes | shape | B/line | threshold tier today | matched |
|---|---|---|---|---|---|---|
| CORE-728 | 2 | 6,881 | full | 3,440 | skip | no |
| CORE-750 | 4 | 8,709 | full | 2,177 | skip | no |
| CORE-819 | 4 | 4,670 | micro | 1,168 | micro | yes |
| CORE-825 | 10 | 8,860 | full | 886 | micro | no |
| CORE-838 | 10 | 7,294 | full | 729 | micro | no |
| CORE-821 | 16 | 10,679 | full | 667 | full | yes |
| CORE-828 | 21 | 9,004 | full | 429 | micro | no |
| CORE-820 | 12 | 4,939 | micro | 412 | micro | yes |
| CORE-766 | 24 (4 real) | 7,440 | full | 310 | micro | no |
| CORE-822 | 41 | 7,060 | micro | 172 | micro | yes |

Median **698 tasknote bytes per diff line**. **Six of ten would route
lighter** under today's `SPEC/tasknote-selection.md` thresholds, and all six
ran the full four-phase note; three of them (825, 828, 838) post-date
`--micro` becoming the stated default (CORE-818, 2026-10-22). Full notes
average ~8,400 B / 26–29 boxes; micro ~5,560 B / 6–9 boxes — **micro saves a
third, not an order of magnitude**, because its ⚡ Notes log still records
every phase item. Box `N/A` rate on small tasks: Best Practices 7/10, External
review 7/10, Doc-drift "no change" 5/10; Relevance / Archive skim / Drift
check had real content 10/10 — the three differentiators pay for themselves
even on two-line diffs. Two defects: `tasknote-selection.md:13` ("has an ID in
PLAN.md → use a tasknote") contradicts `:20` ("doc patch under ~10 lines →
skip"); and three notes kept the template's instruction text on ticked boxes.

### Bucket F — kept, recorded so it is not relitigated

Everything the external caller parses (phase headings, per-phase checkboxes,
`status:` / `park-reason:`, `## 🎯 Goal`, `**Final Summary:**`,
`**Archived:**`); the Relevance Assessment, Archive skim and Drift check (the
only boxes with 10/10 substance on tiny tasks); the paper-complete guard and
pre-move greps; the model gate; `touches:` reconciliation; the cue vocabulary;
the frontmatter schema; the planning-keys table; the two-rung External review
(but not its re-narration in the skill). The 724.1 "Kept taste" list and the
two earlier passes' "not overkill" items (per-row `[model]`, `[unattended]`
candidacy, multi-runner wiring, four phases) are unchanged by this lens.

### Overkill (re-ranked, this lens)

1. **`SPEC/procedures/ft-task.md` re-narrating SPEC** — 14,650 B, 43% of the
   file, 10.8% of the non-Claude cold start. Point, don't narrate; the file's
   own intro (L16-22) already says it "routes to the canonical contract rather
   than restating it" and that SPEC wins on divergence.
2. **`.flaitron/tasknote/README.md` incident history** — 4,563 B in L76-141
   on every task, both runner paths, zero rules. Move that span to `docs/` with
   one pointer line (CORE-657 filter: none of it is anti-misreading
   hardening). The README's other 744 B of C (L38-41 area-table rationale,
   L50-55 sweep-set history) are one-paragraph "why"s and stay.
3. **`claude/skills/ft-task/SKILL.md` B2** — 5,262 B; five sites that restate
   a module the same step loads.
4. **Small-task routing** — 6/10 over-routed; micro not light enough; the
   `:13` / `:20` contradiction.
5. **`SPEC.md` C** — 5,464 B, of which ~3 KB passes the CORE-657 filter
   (§"What flaitron does NOT provide" → `scope-boundaries.md` stub; §Core
   principles / §What is Flaitron → `docs/VISION.md`).
6. **Bucket A** — ~2 KB. Not worth a child on its own; fold the §Phase 3
   "Choosing a test strategy" and §Phase 2 prose into whichever child touches
   those sections.
7. **Not overkill:** bucket D (zero per-task load); the Claude paste-block
   (3,855 B, every byte F); `preamble.md` (92% F).

### Filing

**Recommendation: (a) — an epic with bucket-grouped children.** The rule was
≥~15% ordinary-task load reduction *or* bucket E addressed → (a). **The
bucket-E leg fires on its own**: six of ten small tasks over-routed is a
measured, fixable defect. The 15% leg fires only on gross bytes — 17.2% on the
Claude path, 25.8% on the other runners — and gross is an upper bound: at
CORE-724.1's recorded 44%-of-projection harvest rate the realistic cut is
**~7.6% Claude (~10.3 KB) and ~11.4% Codex/Cursor/Grok (~15.4 KB)**, under
the line on both. The honest reading is that (a) rests on E plus a 10–15 KB
per-task saving, not on reaching 15% net; the operator should weigh it that
way. Not (b): pass 6
drops one clause per `/ft-audit context` run, and the yield here is five
structural moves (point-not-narrate ×2, one history extraction, one routing
fix, one SPEC extraction), not clauses — CORE-660 needed ten days for one
module. Not (c): targeted trims would take items 1–2 and leave E, which is the
pain the operator named first.

Proposed shape, for the operator to decide at the 📦 gate and file via
`/ft-open-epic` (nothing filed here): `.1` Discovery re-measures and binds the
children to byte targets · `.2` procedure point-not-narrate (−~6–10 KB, non-Claude
path) · `.3` README history → `docs/` (−~4.5 KB, both paths) · `.4` `ft-task`
SKILL.md B2 → pointers (−~2.5–4.5 KB) · `.5` small-task routing: resolve `:13`/`:20`,
make micro drop the boxes that run `N/A` 7/10 on small diffs, and have Step 1
name the tier the PLAN line's shape implies · `.6` `SPEC.md` C extraction under
the CORE-657 filter (−~3 KB, lowers the 49,000 cap) · `.N` audit. Each child
lowers its `docs/CONTEXT-BUDGET.md` cap to the new size plus the row's stated
headroom, or the regrowth measured above repeats.

### Not examined this pass

`AGENTS.md` (10,313) and `.flaitron/PLAN.md` were not classified; the lazy
flag fragments (`unattended-mode.md` 25,665, `gate-postures.md` 21,991,
`blocked.md` 15,870) were sized but not bucketed; token cost was not
measured, only bytes; whether the weakest runner actually reads all of
`SPEC.md` on a cold start was taken as given, not observed. Next pass: run one
small task end-to-end on Codex with the procedure as its only guide and
record which clauses it consulted.
