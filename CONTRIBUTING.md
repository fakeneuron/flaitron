# Contributing to Flaitron

Flaitron is a workflow system for one person — me — built to keep my solo AI-assisted side projects coherent across context switches. It's open source, adoptable via git submodule, and welcomes issues. Pull requests are rare. This page is the short version of what's worth your time.

## Maintenance model

- **One maintainer.** Flaitron is solo-maintained. Roadmap, scope, and release timing are all judgment calls I make per-project. [docs/PHILOSOPHY.md](docs/PHILOSOPHY.md) explains the "why" — flaitron exists because it works for *my* workflow, and growing that into a community-driven project would change what it is.
- **AI-assisted.** Most edits land via Claude Code sessions, including the tasknotes that document them. The development log lives in `.flaitron/PLAN.md` and `.flaitron/tasknote/archive/` — a complete history of every non-trivial change with rationale.
- **Adoption-first.** Flaitron is designed to be vendored into your project as a git submodule pinned to a specific commit. You stay in control of when (and whether) to bump. See [docs/MIGRATION.md](docs/MIGRATION.md) for the adoption recipe.

## Filing issues

Issues are welcome. The useful kinds:

- **Bug reports** with a concrete reproduction (which skill, which step, what you expected, what happened).
- **Adoption friction** — concrete cases where the documented adoption path didn't work in your repo.
- **Spec or convention feedback** — places where [SPEC.md](SPEC.md) is ambiguous, contradicts itself, or contradicts a skill's actual behavior.
- **Suggested conventions** flaitron should consider adopting or declining — see [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for the existing list.

Open-ended "have you considered X" issues are also fine, but expect a slower or more selective response — see the maintenance model above.

## Pull requests

Pull requests are rare and best preceded by an issue. Flaitron is small, opinionated, and shaped by a specific solo workflow; an unsolicited PR that doesn't align with that shape is likely to be closed politely. If you want to propose a change:

1. Open an issue first describing the problem and the proposed shape.
2. Wait for a thumbs-up before investing in the diff.
3. Match the repo's existing style — [docs/CONVENTIONS.md](docs/CONVENTIONS.md) covers commit format, semver, GFM, and Diátaxis alignment; [SPEC.md](SPEC.md) is the workflow contract.
4. If your change touches a skill, wire `.claude/` locally so you can run it — see §"Developing flaitron skills" below for the one-time symlink setup. `.claude/` is gitignored by design (per-machine wiring, never committed), so a fresh clone has no `/ft-*` skills until you run it.

A PR that lands without prior discussion may be closed without merge even if the change itself is reasonable — the issue-first rule is about scope and direction, not code quality.

## Developing flaitron skills

Maintainer and contributor wiring for this checkout. Adopting projects wire through [docs/MIGRATION.md](docs/MIGRATION.md) §1.2 instead.

The canonical skill definitions live in `claude/skills/` at the root of this checkout. The in-repo `.claude/` directory is gitignored (see root `.gitignore`) and must never contain committed per-machine wiring.

For live editing with immediate effect, wire this checkout's own `.claude/`. The repo-scoped install is the canonical one ([`docs/PLATFORMS.md`](docs/PLATFORMS.md) §"One canonical install path per project"), and because its symlinks point into this tree, an edit to `claude/skills/` is live in the next session:

```sh
# From the flaitron repo root (one-time, or after adding a skill)
mkdir -p .claude/skills
(cd .claude/skills && ln -s ../../claude/skills/* .)

# flaitron-self's own /audit overlay — tracked body, symlinked into place
ln -sfn ../../.flaitron/audit-overlay/ .claude/skills/audit

# A checkout wired before v7.0.0 also has .claude/commands/ stub links, now dangling
find .claude/commands -type l ! -exec test -e {} \; -delete 2>/dev/null
```

The relative `../../` paths are clone-location independent, and the symlinks land under the ignored `.claude/` directory, so they never enter git history. This gives the complete `/ft-*` surface (`/ft-audit`, `/ft-audit-repo`, release, new-project, etc.) to any agent started inside the tree. It is expected rather than optional: [`docs/PLATFORMS.md`](docs/PLATFORMS.md) §"Installed-surface policy" treats a shipped `ft-*` slug with no `.claude/` symlink as a wiring miss, and `/ft-release` §7.1 checks for one. The glob also wires `/ft-update`, which is intentional — the skill is adopter-only but bails in flaitron-self with a clear message rather than silently misbehaving, so wiring it here is harmless. The `ft-` prefix remains flaitron's reserved namespace.

Codex maintainers wire the same way, from the parallel wrapper inventory:

```sh
mkdir -p .agents/skills
(cd .agents/skills && ln -s ../../codex/skills/* .)
```

`.agents/` is gitignored alongside `.claude/` (see root `.gitignore`), so this stays per-machine too.

The canonical `claude/skills/ft-audit/` directory (`SKILL.md` + `scaffold-bootstrap.md` + `passes/`) is the **stack-neutral scaffold** of [docs/MIGRATION.md](docs/MIGRATION.md) §1.2.1 — it intentionally retains `SKILL.md`'s §0 forker checklist and placeholder globs/rubrics so adopters (and flaitron's own release tooling) can fork it. It is **not** a pre-filled flaitron-self specialization — that lives in flaitron-self's thin overlay, so audit this tree with **`/audit <domain> [scope]`**, not `/ft-audit`. The overlay answers the bundled pass files' forker placeholders for every domain it covers, so a covered run should reach pass 1 without the scaffold bootstrap; a bootstrap stop there means a slot the overlay has not filled yet. `backend` is deliberately uncovered (the overlay's §"Domains") and still stops. An agent without `audit` wiring (the `.agents/skills` block above links only the `ft-*` wrappers) reads `.flaitron/audit-overlay/SKILL.md` and follows it as the skill body, which is what `/ft-release` §7.1 always does. A bare `/ft-audit` here stops at that bootstrap because nothing fills its slots. `/audit docs ai-referenced` narrows the `docs` domain to `.flaitron/tasknote/README.md` §"AI-referenced docs" — the args `/ft-release` §7.1 runs the overlay with (it Reads the tracked body rather than relying on the `/audit` wiring). The overlay is the single statement of that config: change a glob or gate there, not here or in §7.1. Its "Referenced scaffold" line points at the in-tree `claude/skills/ft-audit/SKILL.md` rather than the adopter submodule path, since this checkout has no `.flaitron/core/` to reference (`claude/skills/ft-audit/scaffold-bootstrap.md` §2 "Flaitron-self"). **Its body is tracked at `.flaitron/audit-overlay/SKILL.md`, and `.claude/skills/audit` is a directory symlink to it** — unlike every adopter fork, flaitron-self's overlay is versioned. It has to be: the deltas are this repo's own audit contract, they exist nowhere else, and an untracked overlay is absent from `HEAD`, from review, and from CI's Pair Q section-citation sweep (which selects tracked `*.md`). Keeping it under `.claude/` instead would mean carving an exception into the ignore rule for one real file — the exact partially-committed `.claude/` that [[CORE-217]] drove to zero — so the overlay moved out rather than the rule bending. `.claude/` therefore stays **wholly** ignored, and the symlink keeps `.claude/skills/` uniformly symlinks, which is one `find` to check.

**Machine-global installs: utilities only**

Do **not** glob the shipped inventory into an agent home. `~/.claude/skills/` and `~/.agents/skills/` carry only the global-only utilities — the skills you need *before* a project is wired, or *outside* any flaitron checkout — installed one at a time with the MIGRATION §1.0 shape:

```sh
mkdir -p ~/.claude/skills
ln -s ~/code/flaitron/claude/skills/<skill>  ~/.claude/skills/<skill>
```

Globally installing a slug the repo-scoped wiring above already provides can make it enumerate twice in a session's skill roster. Some runtimes collapse identical targets instead; the bounded Codex observation is in [docs/CODEX-VERIFICATION.md](docs/CODEX-VERIFICATION.md#before-and-after). The rule and its second failure mode — cross-agent slug shadowing in `~/.agents/skills/`, which is read by Codex, Claude Code, Cursor, and Grok alike — are canonical in [`docs/PLATFORMS.md`](docs/PLATFORMS.md) §"One canonical install path per project".

## Where conventions live

- **[SPEC.md](SPEC.md)** — workflow contract; canonical surface for the tasknote lifecycle, the relevance gate, gate cues, the paper-complete guard, and versioning rules.
- **[docs/CONVENTIONS.md](docs/CONVENTIONS.md)** — external conventions flaitron adheres to (Conventional Commits, SemVer, GFM, Diátaxis, GitHub Actions CI) and declines (CHANGELOG, separate ADRs, release automation, pre-commit hooks, MCP servers, package-manager / marketplace distribution, template override stacking), each with rationale.
- **[docs/MIGRATION.md](docs/MIGRATION.md)** — adoption and bump procedure for projects pulling flaitron in as a submodule; [docs/UPGRADING.md](docs/UPGRADING.md) holds the one-time directory-rename recipes.
- **[docs/PHILOSOPHY.md](docs/PHILOSOPHY.md)** — design rationale; the "why" behind the choices.

## Licensing

Flaitron is [MIT-licensed](LICENSE). Contributions are accepted under the same license — opening a PR is your acknowledgment that your contribution can be redistributed under MIT. Relicensing or contributions under a different license require a separate conversation.
