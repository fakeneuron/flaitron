# Scaffold bootstrap — unfilled-scaffold detection (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `ft-audit` SKILL.md §1 step 3, and only when that step's placeholder scan found genuinely-unfilled slots. Carries the whole of the bootstrap: the detection rationale and the thin-overlay exemption (step 1), the install-context branch (step 2), the auto-derivation table and its safety boundaries (step 3), the operator prompt and the three resolution branches (step 4), and the fork+fill write (step 5). See `claude/skills/ft-audit/SKILL.md` for the always-loaded dispatcher, and `docs/MIGRATION.md` §1.2.1 for the fork install workflow.

The bootstrap adds **install repair**, never audit mechanics. Domain resolution, scope resolution, pass order, capped findings, finding format, closing sections, the write-to-PLAN step, and the hard rules are untouched by everything below — it runs once, ahead of pass 1, and returns either resolved values or an explicit degraded-run acknowledgement.

Flaitron ships this skill as a **stack-neutral scaffold** whose scope, rubric,
and gate slots stay placeholders until a fork fills them. Run against unfilled
slots, an audit has no project contracts to grade against: the rubric load
finds nothing to open, the gates are uninvokable strings, and every "Why it
matters" line collapses into generic best-practice advice with the test suite
as the only grounded signal. This fragment makes that state **visible and
fixable at dispatch time** instead of silently absorbed into the report.

Reached only from §1 step 3, and only when placeholders were found. A filled
fork never arrives here, so this costs nothing on a configured project.

## 1. Confirm the unfilled state

Detect **structurally**, never by matching a fixed list of placeholder
strings. Each domain words its slots differently — `general` ships
`<default glob>` and `<lint command for your stack>` where `backend` ships
`<default backend glob>` and `<lint command, e.g. ruff check / golangci-lint
run>`, and `security` ships `<secret-scanner, e.g. gitleaks detect
--no-banner>`. A literal token list would pass five domains as "filled" while
they are anything but, which is the exact failure this section exists to
prevent. Two rules cover every pass file, present and future:

1. Any **`<…>` angle-bracket span** inside the pass file's §"Scope & rubric hints" block — that block holds the scope glob, the rubric slots, and the gate commands, and a filled fork replaces every one of them with a real value.
2. Any **`_(forker: …)_` note**, anywhere in the file — these mark the judgment slots in §"The 5 passes", §"Severity guide", and §"Specialist additions".

Count the hits and name the slots they sit in — both go in the prompt at step
4. A `## 0. Forker checklist` still present in `SKILL.md` is corroborating
evidence (§0 is deleted at fork time), never a trigger on its own.

**Overlay exemption — check this before firing.** A thin overlay
(`docs/MIGRATION.md` §1.2.1) has no `passes/` directory of its own: it runs the
*bundled* scaffold's pass files by reference and supplies the values from its
own `## Deltas` block. Those bundled pass files therefore still carry
placeholders by design, and those placeholders are **not** unfilled — the
overlay resolved them one layer up. Firing here would false-positive on every
run of the fork style this skill recommends.

So: when the running skill is an overlay (its `SKILL.md` has a `## Deltas`
block and no `passes/` sibling), a slot counts as unfilled only when the
`## Deltas` block leaves it unset — still a `<…>` placeholder there, or with no
entry for a domain the overlay claims to cover. A fully filled overlay never
reaches this fragment, which is exactly why it is the recommended shape. When
it *does* reach it, the fix is filling the overlay's deltas, so step 5's fork
branch does not apply — say so and offer only *run once* and *proceed
degraded*.

## 2. Resolve the install context

- **Adopter** — `.flaitron/core/claude/skills/ft-audit/` resolves from the repo root. All three branches below are available; a thin overlay's referenced scaffold is `.flaitron/core/claude/skills/ft-audit/SKILL.md`.
- **Flaitron-self** — no `.flaitron/core/` submodule, but repo-root `SPEC.md` exists with heading `# Flaitron — Workflow Specification` (the same detection `passes/context.md` §"Scope & rubric hints" uses for flaitron-mode). All three branches below are available; a thin overlay's referenced scaffold is the in-tree `claude/skills/ft-audit/SKILL.md` — there is no submodule to point at.
- **Non-adopter** — neither resolves. A thin overlay's referenced-scaffold path would not resolve either, so **do not offer fork+fill**; offer only *run once* and *proceed degraded*, and say in one line why the fork option is absent.

## 3. Auto-derive candidate values

Read what the repo already declares. Do not guess, do not infer conventions
from the code under audit, and do not ask the operator for anything the repo
states itself. **Every derived value cites the file it came from** — a value
with no source is not a derivation and must not be presented as one.

| Evidence | Derives |
|---|---|
| `package.json` `scripts` | gate candidates |
| `pyproject.toml` `[tool.ruff]` / `[tool.mypy]` / `[tool.pytest.ini_options]`; `uv.lock` present → `uv run` prefix | gate candidates |
| `justfile` / `Makefile` targets | gate candidates |
| `.github/workflows/*.yml` `run:` steps (or the equivalent CI config) | gate candidates |
| `Cargo.toml` · `go.mod` · `Gemfile` | gate candidates (`cargo clippy`/`test`, `go vet`/`test`, `rubocop`/`rspec`) |
| `.pre-commit-config.yaml`, `.gitleaks.toml`, lockfile-audit config | gate candidates for scanner slots |
| Top-level layout (`src/`, `backend/`, `frontend/`) + dominant file extension | default scope glob |
| Root `CLAUDE.md` / `AGENTS.md`, `docs/ARCHITECTURE.md`, an ADR directory, `SECURITY.md` | rubric files |

**The pass file decides which gates are wanted; this table only finds
candidates.** Domains declare different gate slots — `general` wants lint /
type-check / test, `security` wants a secret-scanner and a dep-scanner,
`performance` wants a profiler and a load test, `frontend` wants a bundle
analyzer and an a11y check, `docs` wants a markdown linter and a link checker.
**Propose a command only for a slot the loaded pass file actually declares**,
and match candidate to slot by intent. A slot with no plausible candidate stays
unfilled and is reported as such — inventing a gate is worse than admitting
there isn't one. This keeps derivation correct as new domains are added,
because the slot list is read, not hardcoded here.

**Destructive-intent denylist — safety boundary, not a preference.** Never
propose and never run a command whose intent is deploy, publish, release,
migrate, seed, reset, push, or anything else that mutates state outside the
working tree — regardless of which slot it might plausibly fill or how its
script is named. A mis-derived gate turns a read-only audit into a destructive
one, and the operator approved an audit, not that. When in doubt about a
candidate, leave the slot unfilled. Where CI config and a package manifest
disagree, prefer CI — it is what the project actually enforces.

**Not derivable.** Sacred invariants (the severity guide's Critical row) and
per-pass stack examples cannot come from repo metadata; they are judgment about
what this project must never break. Report them as still-unfilled in every
branch below — including after a successful fork+fill. A prefilled overlay is
prefilled, not finished.

## 4. Present the finding and stop

Surface the derived values with their sources, then stop and ask via
`AskUserQuestion`. Do not run a pass before this is answered.

```text
⚠️  Unfilled audit scaffold — passes/<domain>.md
    <N> placeholder slot(s): <named slots>

Auto-derived from this repo:
  gates:  <cmd>            (package.json:scripts.lint)
          <cmd>            (.github/workflows/ci.yml:31)
  scope:  <glob>           (repo layout)
  rubric: <file>, <file>   (present at repo root)

Not derivable — still needs you:
  sacred invariants (Critical severity) · per-pass stack examples
```

Branches (fork+fill omitted in a non-adopter repo, per step 2):

- **Fork + fill now** — write the fork (step 5), then run the audit against it.
- **Run once with these** — apply the derived values in memory for this run only. Nothing is written; the next run detects the same placeholders and asks again.
- **Proceed degraded** — run with the placeholders unresolved. The report **must** open with an explicit banner naming the unfilled slots and stating that findings are ungrounded in project contracts. Not the default, and never chosen on the operator's behalf.

**Why three branches** (reassessed against `docs/CONVENTIONS.md`
§"Template override stacking", which declines layered resolution and answers
customization once, at the fork seam). The three are **not** a resolution
stack: they are mutually exclusive per run, never consulted in priority
order, and step 4's prompt prints every derived value beside its source file
*before* the operator picks one — so "which value applied, and why" is
answered at the decision point, not reconstructed from a chain afterwards.
And *run once* is load-bearing rather than redundant: step 2 withholds
fork+fill in a non-adopter repo, and step 1 withholds it for an overlay that
reaches this fragment, so dropping it would leave *proceed degraded* as the
only option in exactly the contexts where forking is impossible — computing
the step-3 derivation and then refusing to use it. Fork+fill remains the
single *persistent* seam; the other two are a one-shot and an honest
refusal.

## 5. Fork + fill (adopter and flaitron-self repos, on explicit confirm only)

Install a **thin overlay** — it carries only the deltas and inherits every
future scaffold improvement, which is exactly the "only the §0 surface
diverges" case (`docs/MIGRATION.md` §1.2.1). Source paths and the pinned-tag
lookup depend on the install context resolved in step 2.

**Adopter:**

```sh
mkdir -p .claude/skills/audit
cp .flaitron/core/templates/audit-overlay-template.md .claude/skills/audit/SKILL.md
cp .flaitron/core/claude/commands/ft-audit.md         .claude/commands/audit.md
```

Set `flaitron-reconciled:` to the currently pinned flaitron tag (`git -C
.flaitron/core describe --tags`).

**Flaitron-self:** the overlay body is **tracked** here, unlike an adopter's,
and `.claude/` is reached by a symlink — `.claude/` stays wholly ignored, so an
overlay written into it would be unversionable (`CONTRIBUTING.md` §"Developing flaitron skills & commands").

```sh
mkdir -p .flaitron/audit-overlay .claude/skills .claude/commands
cp templates/audit-overlay-template.md .flaitron/audit-overlay/SKILL.md
ln -sfn ../../.flaitron/audit-overlay/ .claude/skills/audit
cp claude/commands/ft-audit.md         .claude/commands/audit.md
```

Set `flaitron-reconciled:` to this checkout's own tag (`git describe --tags`),
and keep the copied `SKILL.md`'s in-tree "Referenced scaffold" line
(`claude/skills/ft-audit/SKILL.md`) rather than the adopter submodule path —
there is no `.flaitron/core/` submodule here to reference
(`CONTRIBUTING.md` §"Developing flaitron skills & commands"). Commit the overlay body; the symlink lives under
ignored `.claude/` and is per-machine wiring the operator re-creates from
that section's block on a fresh clone.

In both cases, drop the template's `-<stack>` suffix everywhere it appears —
this install is named `audit`, matching the `audit.md` wrapper: `name: audit`,
the `# audit` heading, and the `/audit <domain> [scope]` invocation line. In
the `description:` blurb, replace `<stack>` with the project's name. Replace
the `## Domains` placeholder with the domains this project audits. Then fill the overlay's `## Deltas` block with the
derived values, leave `flaitron-tracks: ft-audit` as shipped, and remove the
template's trailing forker note. Leave the not-derivable slots as clearly-marked
placeholders and tell the operator they are outstanding.

**Never overwrite an existing overlay** — `.claude/skills/audit/` in an adopter,
or `.flaitron/audit-overlay/` in flaitron-self. If one is already
present, this branch does not apply — that fork simply has unfilled slots, and
the fix is editing it, not replacing it. Say so and fall back to the other two
branches.

A full `cp -R` copy of the scaffold directory remains the right choice when the
project needs to edit pass *bodies* rather than just the deltas; point at
`docs/MIGRATION.md` §1.2.1 and let the operator do it deliberately — this
branch does not offer it.
