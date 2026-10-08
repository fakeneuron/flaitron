# Tasknote Directory (flaitron self-host)

This directory holds active tasknotes and archived tasknotes for flaitron's
own development. The canonical workflow lives in [`SPEC.md`](../../SPEC.md)
at the repo root; canonical tasknote templates ship at `templates/`.

## Layout

- `<TASK-ID>.md` — active tasknote (one per task in flight)
- `archive/<area>/<TASK-ID>.md` — completed tasknotes, one folder per area
- `templates/` (at repo root) — `tasknote-template.md`, `tasknote-starter-template.md`, `tasknote-micro-template.md`, `sidequest-template.md`, `tasknote-README.md`, `PLAN.md`, `spec-template.md`, `audit-overlay-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md`

## Area prefixes

Flaitron uses only the canonical prefixes defined in [`SPEC.md` §"Task ID convention"](../../SPEC.md) — `CORE-`, `BE-`, `FE-`, `DB-`, `DEPLOY-`, `TEST-`. No project-specific prefixes.

## Archive layout

**This table is authoritative.** `<area>` is *looked up here* — never derived
from the task ID. Read it on every task, for every prefix, canonical ones
included: a prefix that "looks known" is precisely the one an agent lowercases
on autopilot, and a folder that does not exist reads as an empty archive rather
than as a failed lookup.

| Prefix | Folder |
|--------|--------|
| `CORE-*` | `archive/core/` |
| `BE-*` | `archive/be/` |
| `FE-*` | `archive/fe/` |
| `DB-*` | `archive/db/` |
| `DEPLOY-*` | `archive/deploy/` |
| `TEST-*` | `archive/test/` |

**Declaration-time default — not a read-path rule.** When a project declares a
new prefix, it names the folder the prefix lowercased with the trailing `-`
dropped, then adds the row above; the folder is created when the first tasknote
in that area lands. An adopter may deliberately declare a folder the default
would not produce (e.g. `OPS-*` → `archive/operations/`); the row wins. That is
why `<area>` is read from the table rather than computed. Flaitron itself uses
only the canonical prefixes, so its six rows happen to match the default — which
is exactly the case that makes deriving look safe.

## AI-referenced docs

The project-declared doc set walked at every Phase 4 closure (per
[`SPEC.md` §"🚀 Phase 4: Closure"](../../SPEC.md)) and at every epic-audit
subtask (per [`SPEC/epic.md`](../../SPEC/epic.md)) for the doc-drift sweep.
Flat list, one-line purpose each.

Membership means **swept for drift** — it does not mean **loaded at cold
start**. The two are independent per-doc properties: `SPEC.md` is the primary
cold-start surface *and* is swept; `docs/VISION.md` is lazy-loaded *and* is
swept, because it drifts against the surfaces that mirror it. Conflating them
is what made CORE-489.3's correct sweep-coverage fix look like a reversal of
CORE-194.1 Q3's correct lazy-loading decision (settled by CORE-491).

- `README.md` — public-facing flaitron repo overview
- `AGENTS.md` — flaitron-self agent guide: repo layout, validation commands, workflow pointers, and platform wiring notes
- `SPEC.md` — canonical workflow contract; primary AI cold-start surface
- `docs/MIGRATION.md` — adoption + bump procedures for adopting projects
- `claude/AGENTS-snippet.md` — block adopters paste into their AGENTS.md (defines adopters' assistant-facing surface; agent-neutral)
- `codex/AGENTS-snippet.md` — Codex-specific `.agents/skills` wiring commands and invocation notes
- `cursor/AGENTS-snippet.md` — Cursor thin wiring (`.cursor/skills/` Cursor-only path; primary path reuses Claude `.claude/` wiring)
- `grok/AGENTS-snippet.md` — Grok thin wiring (`.grok/skills/` Grok-only path; primary path reuses Claude / Codex / Cursor wiring)
- `docs/CONVENTIONS.md` — conventions flaitron adheres to and declines (commits, versioning, formatting, CHANGELOG, ADRs) with rationale
- `CONTRIBUTING.md` — solo-maintenance model; how to file issues; when PRs make sense; maintainer wiring for developing skills in this checkout
- `SECURITY.md` — prompt-injection and supply-chain threat model; informs how skills handle contributor-authored content and submodule bumps
- `docs/AGENT-NEUTRALITY.md` — ledger of intentional Claude-specific surfaces; audits and Phase 4 sweeps consult this before flagging Claude-Code references in the contract layer
- `docs/PLATFORMS.md` — two-layer contract/wiring model and symmetric plug-in pattern for shipping new platform wiring
- `claude/CAPABILITIES.md` — Claude Code capability-trigger reference; carries a last-verified stamp that the doc-drift sweep should verify on each version bump
- `docs/AGENT-COMPAT.md` — living agent-compatibility matrix: per-agent consume-mode, context entry-point, skill/command primitive, and last-verified currency
- `docs/EXTERNAL-AGENTS.md` — one-agent-per-tasknote rule, the handoff contract for external CLI agents, the orchestration contract an operator-less caller reports to, the caller-facing stable-surface list (what a reader or dispatcher may hook, and what is out of contract), and the not-an-orchestration-runtime boundary; contract edits that touch delegation, handoff, the unattended posture, template labels, or the task-line grammar routinely drift against it; a closure that moves, renames, or retires a **stable-surface row** files the caller-side row **in the same closure** — filed in the caller's own `PLAN.md` (an operator-private orchestrator today), never left as recap prose for the caller to discover at its next pin bump (`SPEC.md` §"Cross-repo edit remit" · `SPEC.md` §"Deferred hand-off filing")
- `docs/WORKTREES.md` — the locked isolation convention for parallel epic children (`wt-<ID>` branch + four-command start / end procedure; no skill since CORE-572); named by `docs/EXTERNAL-AGENTS.md` as the isolation layer and cited wherever parallelism is discussed
- `docs/VISION.md` — canonical statement of flaitron's scope boundaries; mirrored by `SPEC/scope-boundaries.md` §"What flaitron does NOT provide", `docs/CONVENTIONS.md`, and `docs/EXTERNAL-AGENTS.md`. Lazy-loaded: swept, not cold-start

`SPEC/*.md` (lazy modules) and `claude/skills/*/SKILL.md` sit outside this
sweep set, excluded on both counts, so the distinction above does not arise for
them. **Their exclusion is a volume decision, not a laziness one** — the
paragraph above severs lazy-loading from sweep membership, so it cannot also be
the reason these are excluded. The two trees run ~6,200 lines against a
~4,100-line sweep set, and walking them at every closure would roughly double a
per-task step Core Principle #3 exists to keep small.

Five `docs/` files are likewise outside the set, each for a reason the sweep
would not add to: `docs/PHILOSOPHY.md` is history (nothing live mirrors it —
unlike `docs/VISION.md`, which three surfaces restate); `docs/DOGFOOD.md` is
release-gated (`/ft-release` Step 5 exercises it every cut);
`docs/CONTEXT-BUDGET.md` is CI-enforced and re-measured by `/ft-release` §7.1;
`docs/VERSION-HISTORY.md` is written *by* releases;
`docs/UPGRADING.md` holds frozen rename recipes that change only at the next
rename. `docs/GLOSSARY.md` states
its own exclusion in its Maintenance line.

**Accepted residual risk.** Skill bodies state facts *about* swept docs, so a
contract change can falsify one with no sweep reaching it —
`/ft-release` §7.1 asserted a stale claim about this very
list for a day after CORE-489.3 added `docs/VISION.md` to it. The catch layer is
the epic-audit sweep, which is where CORE-489.N found it; per-task closure is
not expected to. CORE-492 weighed a release-time citation guard for this and
declined: every citation of the shape `` `<path>.md` §"<Section>" `` from
`claude/skills/` into a doc on this list resolved when it checked (2026-08-29;
the count is deliberately not restated — it moves with every skill edit, and
that shape is enough to re-run the scan, treating adopter-relative paths and
bold-line or bullet-lead anchors as resolved), and a resolution check would
not have caught that miss anyway — the section it cited never moved, only the
truth of what was said about it.

**Re-affirmed at CORE-543, on a wider scan.** The same guard was re-filed
2026-09-09 after a lazy split (`CORE-535.3`) left two stale pointers behind. The
scan was widened to every tracked file, both citation forms, and non-markdown
surfaces: **every** `SPEC.md` section citation resolved but three, and all three
were false positives — the ticket's own `PLAN.md` line quoting the pattern, and
two `## Completed` rows *quoting the very drift they record*. That last shape is
structural rather than tunable: a repo that documents its own drift history by
quoting the broken citation makes a resolution gate flag its own archaeology,
and "fixing" the finding corrupts the record. Measured against the three defects
that split actually left, the guard reached one — a YAML comment — while missing
both the bare filename in a shell loop that reddened CI and the ledger row whose
file and section sit in different table cells. The declination stands; CORE-543
was re-scoped to the detector the failure actually wanted (§7.1 **Pair L**,
binding the `drift` CI job to the sources it lifts, plus a `/ft-release`
CI-status gate).

**Landed at CORE-622.3 (2026-09-20), because the false-positive shape moved.**
The third filing came from `/ft-audit-repo` with the two declinations'
evidence changed underneath it: CORE-620 rotated the `## Completed` rows that
quoted their own drift into `.flaitron/PLAN-ARCHIVE.md`, which the check
excludes alongside the tasknote archive (both write-once), and CORE-609 ruled a
bold-lead paragraph a valid target, so the resolver reads `**Title` as well as
`# Title`. Re-measured at HEAD across 132 live files and 611 path-bearing
citations, the only findings were five `§"Fan-out."` citers with the period
inside the quotes — fixed on the citers in the same commit. The guard is §7.1
**Pair Q**, lifted into the CI `drift` job; the two declinations above stay as
the record of why it took three filings, and their objection that a resolver
does not catch claim falsification still holds — Pair Q is a pointer check,
and this sweep set is still the catch layer for the truth of what is said.

## Project quick commands

The validation commands and the dev server live in `AGENTS.md` §"Validation"
and `AGENTS.md` §"Dev Server" — the source of truth, not restated here. They
assume the repository root; inside `viz/`, drop `--prefix viz` (`npm run dev`).
