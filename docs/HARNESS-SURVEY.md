# Harness survey

Periodic comparison of flaitron against contemporary AI-coding harnesses,
frameworks, and trackers. Each pass is a dated section; a later pass appends
rather than rewrites, so the record shows what the field looked like when a
decision was made. Read when planning a survey pass, when a "should flaitron
do X?" question comes up, or when [`docs/VISION.md`](VISION.md) §"What we
won't accept" needs a current counter-example.

Method for every pass: read `SPEC.md` + `docs/VISION.md` first, then the
field, then rank gaps by *would it change task outcomes* and overkill by
*is the clause still load-bearing for current models* (Anthropic's harness
lesson: every component encodes an assumption about what the model can't do;
strip what no longer is).

## 2026-09-21 — first pass (narrow net)

Scope: five framework families, ~12 products, web sources only, one session.
Filed as CORE-655 … CORE-662 + FE-124 (`chore: file … harness-survey
follow-ups`, `b39eb024`) and caobunga CBN-235.

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
5. `[unattended]` / `[handoff]` deny-by-default headless markers, with a real consumer (caobunga).
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
6. `[unattended]` surface — **not overkill**: caobunga reads it and it is critical (same answer).

Verdict: lifecycle core well-balanced and arguably best-in-class for the
solo-markdown niche; meta layer shows accretion because self-hosting has no
subtractive force. → CORE-661 (decay pass).

### Caobunga exposure (checked against `backend/caobunga/flowtron/*`, `close.py`, `brief.py`)

Caobunga parses: task-line grammar, `status:` / `park-reason:`, `## <emoji>
Phase N:` headings + per-phase checkboxes (`phase_progress()`), `## 🎯 Goal`,
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
| Caobunga heading exposure | **Landed** (CORE-655). |

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
