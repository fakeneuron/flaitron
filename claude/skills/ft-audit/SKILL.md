---
name: ft-audit
description: Parameterized principal-engineer audit; `/ft-audit <domain> [scope]` runs domain-specific passes and writes prioritized tickets to `.flaitron/PLAN.md`. Domains: general (default) · backend · frontend · security · performance · docs · structure · context. Stack-neutral scaffold; adopters fork it to customize rubric and verification gates.
---

# audit — flaitron parameterized audit skill

Principal-engineer audit of a project surface: find what matters, report concisely, **make no changes without explicit confirmation**.

One dispatcher, eight domains. The shared procedure lives in this file; each domain's pass definitions, severity guide, scope/rubric/gate hints, and specialist rules live in a sibling `passes/<domain>.md` file, loaded at §1 step 1. A second sibling, `scaffold-bootstrap.md`, holds the unfilled-scaffold repair procedure and is loaded only when §1 step 3 trips.

Domain scope: `general` (default — no domain named) · `backend` (audit/review/harden backend/API/server code) · `frontend` (bundle size, accessibility, render performance) · `security` (vulnerabilities, secrets, auth) · `performance` (latency, profiling, resource usage) · `docs` (documentation accuracy, staleness, cross-doc drift) · `structure` (duplication clusters, coupling, module boundaries, god-files, stray scripts) · `context` (`CLAUDE.md` / `AGENTS.md` / `.claude/` bloat, paste-block redundancy, `ft-*` namespace conflicts, lean-context drift).

Stack-neutral scaffold — **fork**, don't symlink (per-stack rubrics/commands diverge). Fork the whole directory — `SKILL.md` + `scaffold-bootstrap.md` + `passes/` — into `.claude/skills/audit/`. Install per `docs/MIGRATION.md` §1.2.1.

## 0. Forker checklist (fill in before first run)

Walk this list once per fork. Every fillable placeholder lives in the `passes/<domain>.md` files you keep; this file carries one confirm-only item (§5 step 2).

- [ ] `name:` and `description:` frontmatter — set to your fork's slash-command name and a project-specific blurb.
- [ ] Each kept `passes/<domain>.md` §"Scope & rubric hints" — set the default scope glob, your project's actual rubric paths (root `CLAUDE.md`, ADRs, contract docs, config files where invariants live), and your actual gate commands (lint / type-check / test, or scanner / profiler / doc tooling per domain).
- [ ] Each kept `passes/<domain>.md` §"The 5 passes" — replace generic-placeholder bullets with your stack's concrete examples (library invariants, idioms, specific anti-patterns).
- [ ] Each kept `passes/<domain>.md` §"Severity guide" — name your project's sacred invariants under **Critical** (e.g. paper-mode bypass for trading, schema-corruption risk for migrations, auth-bypass for public services).
- [ ] Each kept `passes/<domain>.md` §"Specialist additions" — append project-specific hard rules (e.g. "paper-mode is sacred", "data integrity > convenience").
- [ ] §5 step 2 — confirm the area-prefix list valid for your `.flaitron/tasknote/README.md` §"Area prefixes".
- [ ] Optional: delete pass files for surfaces your project doesn't have (no frontend → remove `passes/frontend.md`). A domain token whose pass file is missing → stop and ask rather than improvise.

The `scaffold-bootstrap.md` fragment (loaded by §1 step 3) automates the mechanical half of this list — it derives glob, rubric files, and gate commands from your repo's manifests and CI config, and can write a prefilled thin-overlay fork for you. What it cannot derive, and what this checklist still exists for, is the judgment half: your sacred invariants under **Critical**, your stack's concrete pass examples, and any extra hard rules.

Once the checklist is satisfied, delete this §0 block from your fork — leaving it in confuses the auditor's first read on every run.

## 1. Domain, scope & ground rules (do this first, always)

1. **Resolve the domain** from `$ARGUMENTS`: if the first whitespace-separated token is one of `general` · `backend` · `frontend` · `security` · `performance` · `docs` · `structure` · `context`, that token is the domain and the **remaining** tokens are the scope args for step 2. Any other first token (a path, `last-commit`, `staged`, …) → domain `general`, and the **whole** `$ARGUMENTS` string is the scope args. Bare invocation → domain `general`, default scope. Then **Read `passes/<domain>.md`** (sibling `passes/` directory) — it supplies the pass definitions (§2), severity guide (§3), scope/rubric/gate hints (this section), attribution slug (§5), and specialist additions. If the user's prose names a focused concern the invocation didn't (asked to "audit auth" but invoked bare), prefer the matching domain over stretching `general`.
2. **Resolve scope** from the scope args: `all`/empty → the pass file's default scope glob; a path → that path; `last-commit` → files in `HEAD`; `staged` → files in `git diff --cached`; plus any extra scope tokens the pass file declares (e.g. an endpoint/route for `backend`, `ai-referenced` for `docs`). If ambiguous, **stop and ask** via `AskUserQuestion`.
3. **Scaffold-bootstrap check.** Scan the loaded `passes/<domain>.md` for unfilled placeholder slots — any `<…>` angle-bracket span in its §"Scope & rubric hints" block, or any `_(forker: …)_` note anywhere in the file — **less anything a thin overlay's `## Deltas` block already supplies**. Zero hits — the normal case in a filled fork, and in a filled overlay — is a silent no-op: continue to step 4 without mentioning it.

   One or more genuinely-unfilled hits → **stop, Read the sibling `scaffold-bootstrap.md`, and run it** before going further. That fragment owns the detection rationale, the thin-overlay exemption in full, the install-context branch, the auto-derivation table and its destructive-intent denylist, and the three resolution branches; it returns with resolved values or an explicit degraded-run acknowledgement.
4. **Load the project rubric** (audit-against contracts, not generic best practices) — the pass file's rubric slots name what to load.
5. **Run verification gates** so passes don't report toolchain noise — commands per the pass file's gate hints; the pass file says which pass absorbs failures as findings.
6. If anything's unclear, stop and ask. Don't guess intent.

## 2. The passes (in order)

Run the pass file's passes **in its exact order**, however many it declares — five for every domain but `context`, which declares six. **Cap each pass at 5 findings max** unless the pass file sets a tighter cap of its own, which wins. If a pass has more than its effective cap, keep the top **N** by severity — N being that cap, not always 5 — and note the tail count (`+3 more Low omitted`).

## 3. Finding format (use exactly this)

```text
**Finding #[N] – [Critical|High|Medium|Low] – [Pass # / Category]**
- Location: `path/to/file:LINE` (or endpoint / component / function / section name)
- Issue: one sentence
- Why it matters: brief — tie to safety / correctness / maintenance cost
- Recommended fix: concrete suggestion or ≤5-line snippet
- Operator action: tell the agent to … — one imperative sentence an operator can hand to an agent verbatim
```

`Operator action:` is not a restatement of `Recommended fix:`. The fix line says *what* should change; this line says *who executes it and how it is dispatched* — "tell the agent to add `response_model=PaymentOut` to the three handlers in `api/payments.py` and extend `test_payments.py` to assert the envelope". Write it so pasting it into a fresh session is enough to start. A finding that cannot produce one is **disqualified** — see §6 "Every finding names an operator action".

Severity is judged against the pass file's severity guide — authoritative for the domain. Insert any extra finding-format lines the pass file declares (e.g. `performance` adds a `Measured impact:` line).

## 4. Required closing sections (always, in order)

1. **Summary** — health score 1–10 with one-sentence justification + top 3 issues (by severity, not pass order).
2. **Exploratory Insights** — what the findings reveal about how the audited surface evolved. Patterns, not individual issues (e.g. "three endpoints still return raw dicts — suggests the typed-response migration stalled mid-phase").
3. **Proposed tasks for `.flaitron/PLAN.md`** — prioritized, actionable tickets using flaitron's task-line grammar. One ticket per thematic cluster, not per finding. Present them inline in the report so the user can review before anything is written to disk — each line exactly as §5 would write it, including any `[unattended]` the §5 candidacy pass proposes.
4. **Questions for the user** — anything ambiguous that blocks implementation. Use `AskUserQuestion` for these, not prose — the user wants real prompts.

## 5. Write the proposed tasks into `.flaitron/PLAN.md` (required, not optional)

The deliverable is tickets in PLAN.md — a report that gets forgotten isn't useful. **Subroutine invocations skip this entire section** (§6 "Subroutine-safe").

1. **Write-step confirmation.** After §§1–4 are presented and any `AskUserQuestion` blockers are answered, stop and confirm via `AskUserQuestion` before writing anything to disk: the proposed ticket list (drop/combine/split per operator feedback first), any **Proposed inline fixes**, and that `.flaitron/PLAN.md` is about to be updated. The operator's yes **is** commit authorization — there is no separate commit-go ask. Zero findings across all passes → say so explicitly and skip this entire section.

   **`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures" — Read that module now, at this write step). Attended branch only: this skill takes neither `--fast` nor `--unattended`, so the `unattended-candidates:` line never fires here. Run §"Candidacy predicate" over each proposed ticket line as drafted for §4 item 3 (attribution suffix included); show each candidate in the report and in the write-step `AskUserQuestion` above with the token in place; step 3 writes it only on rows the confirmation keeps; a declined row shows no token and says nothing. Trivial-fix carve-out rows below are never evaluated. Fork note: a thin overlay inherits this on its next `/ft-update`; a full-copy fork (`.claude/skills/audit/`) only after the forker re-reconciles on `/ft-update` Step 4.5's drift warning — until then it proposes nothing.
2. **Filing-commit pre-check.** Immediately before any write, run the pre-check in `SPEC/plan-filing.md` §"Filing commits": `git diff --cached --quiet` non-zero, or any PLAN.md change beyond earlier task-row filings → `auto-commit = false`; otherwise `auto-commit = true`, recording any accumulated-filing IDs. Not a gate. The confirmation pause can stale a pre-flight reading, so run it here.
3. **Write tickets** using flaitron's task-line grammar: `- [ ] **<AREA>-<N>** [model] | shortname — long description.` — with `[unattended]` inserted after `[model]` on exactly the rows the step 1 confirmation kept, every other segment verbatim (primary labels `[heavy]🧠` / `[medium]🧩` / `[light]🔧` recommended — never `[xheavy]`, manual-only per `SPEC/model.md`; specifics e.g. `opus` / `sonnet` / `grok` remain valid per SPEC §"Model field"). See §"Task-line format". Pick the next free `<N>` per area prefix (valid prefixes in `.flaitron/tasknote/README.md` §"Area prefixes"; the pass file may name the typical prefixes for its domain). Insert in correct priority section (`## High`/`## Medium`/`## Low` for blocking; `## Future Opportunities` otherwise; add `[!critical]` for urgent rows). Append `Surfaced by <slug> YYYY-MM-DD (Finding #N, <severity>)` to each ticket — `<slug>` is the pass file's attribution slug — so the origin's traceable. Include any extra attribution the pass file requires (e.g. `performance` appends the measured-impact number).
4. **No code changes**, no source edits, no opening files for fixes. Tickets only — actual fixes happen in separate `/ft-task` cycles. One exception: the skip-the-tasknote carve-out below, plus any domain exception the pass file declares (e.g. `security`'s leaked-secret immediate-ask path).

**Trivial-fix carve-out (skip-the-tasknote inline path).** When a finding's fix is small enough to hit the skip-the-tasknote threshold — single-line patch, pure formatting tweak, a doc edit under ~10 lines, or a trivial config edit with no logic impact (per SPEC §"When to use a tasknote (and when not to)") — don't file an intermediate `## Low` ticket that needs its own `/ft-task` cycle. Instead, present it in the report under a distinct **Proposed inline fixes** heading (kept separate from the proposed-ticket list) and, on the **same** write-step confirmation that lands the tickets, apply the edit and record it directly under PLAN.md's `## Completed` as a **self-contained** line:

```text
- [x] **<AREA>-<N>** [light] | shortname — <what changed>. Surfaced by <slug> YYYY-MM-DD (Finding #N, <severity>), fixed inline.
```

Keep the description (there is no tasknote/archive file to be the canonical record — see SPEC/plan-filing.md §"`## Completed` archive convention") and take the next free `<N>` like any ticket. A carve-out row is never a candidate for `[unattended]` — it closes in the same write, so the step 1 candidacy pass skips it. Anything above the skip threshold — multi-file, logic impact, or a design tradeoff worth recording — files a normal ticket; never apply a non-trivial fix under this carve-out. The single write-step confirmation covers both tickets and inline fixes; no separate gate. Apply any carve-out adjustments the pass file declares (e.g. `security` narrows it to trivial hygiene only; `docs` notes doc audits hit it often).

5. **Commit the filing** (when `auto-commit = true` from step 2 above). The filing's **last** write, so inline fixes land with the tickets. Stage by name — `.flaitron/PLAN.md`, plus each inline-fix source path:

   ```sh
   git add .flaitron/PLAN.md [<inline-fix-path> ...]
   git diff --cached   # whole index, no pathspec
   git commit -m "chore: audit file tickets — <domain>"
   ```

   **Post-stage verification.** Recognized hunks: the appended ticket rows, each §5 trivial inline fix, and the accumulated filings the pre-check recorded (their IDs go in the body line that section names). Anything else → `git restore --staged` the staged pathspecs, skip the commit, and report it as the `auto-commit = false` case below. This audit's inline-fix carve-out makes the check wider here than on the other filing motions — a source path is far likelier than `PLAN.md` to be open in an editor while the audit runs.

   `<domain>` is the domain token resolved in §1. `auto-commit = false` → skip this step entirely and note it in the response (`left uncommitted (PLAN.md or the index already carried other changes)`). Explicit pathspecs, the whole-index read, commit-never-push, and plain-text `committed <sha>` with no 🏁: `SPEC/plan-filing.md` §"Filing commits".

## 6. Hard rules

- **Targeted, not exhaustive.** A pass's cap — five by default, lower where the pass file sets one — is a *ceiling*, not a target. A clean pass gets zero findings and moves on, and a pass capped at one reports one.
- **Write tickets, not fixes.** `.flaitron/PLAN.md` gets updated (§5 above). Source files do NOT — any code change needs a separate explicit user request. Do not open files in edit mode for fixes, do not run formatters, do not "fix while I'm in here." **Exceptions:** the §5 trivial-fix carve-out, the scaffold-bootstrap fork-install carve-out below, plus any domain exception the pass file declares.
- **Fork-install carve-out (`scaffold-bootstrap.md` only).** The one write this skill may make outside `.flaitron/PLAN.md` is installing a fork of *itself* — in an adopter `.claude/skills/audit/SKILL.md`, in flaitron-self the tracked `.flaitron/audit-overlay/SKILL.md` plus the `.claude/skills/audit` symlink reaching it (`.claude/` is gitignored there, so an overlay written into it would be unversionable) — plus its `.claude/commands/` wrapper, from `templates/audit-overlay-template.md`, and only on an explicit confirm at that fragment's step 4. It is an install, not a source edit: it touches nothing inside the scope resolved in §1 step 2. Never write it unprompted, never as a side effect of a run the operator started to get findings, and never overwrite an existing overlay (`.claude/skills/audit/` in an adopter, `.flaitron/audit-overlay/` in flaitron-self).
- **Every finding names an operator action.** A finding whose `Operator action:` line cannot be written — because no one could act on it, or because the action would be "look into it" / "consider whether" / "monitor this" — is **disqualified**: drop it, or reframe it until the action is concrete. This is a **detection filter, not a formatting rule** — it decides what counts as a finding at all, so apply it while forming the finding, not while writing it up. A disqualified item is an observation; if it is worth keeping, §4's *Exploratory Insights* is where observations belong, and a pass whose whole yield is observations reports zero findings.
- **Don't repeat the gates.** If a §1 verification gate (linter, type-checker, build tool, scanner) already flagged it, surface the aggregate once and move on — don't enumerate each gate row as a separate finding.
- **Don't audit adjacent code.** Stay inside the resolved scope.
- **Subroutine-safe.** Any domain may be invoked from another skill (notably `/ft-release` §7.1 → `/ft-audit docs`). When invoked as a subroutine with an explicit scope: skip §0 forker prompts, surface the report inline rather than blocking on `AskUserQuestion` for non-blocker items, and do **not** write PLAN.md tickets — the invoking skill is the orchestrator and owns per-finding decisions.
- **No final summary of what you just did.** The report + the committed PLAN.md diff (or the explicit zero-findings statement) *are* the deliverable — hand off with `committed <sha>` or the skip-on-dirt note, not a recap paragraph.
- The pass file's **specialist hard rules** are part of this contract — apply them as written.
