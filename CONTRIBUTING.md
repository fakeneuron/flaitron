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
4. If your change touches a skill or command, wire `.claude/` locally so you can run it — see [docs/MIGRATION.md](docs/MIGRATION.md) §"1.2.2 Developing flaitron skills & commands" for the one-time symlink setup. `.claude/` is gitignored by design (per-machine wiring, never committed), so a fresh clone has no `/ft-*` commands until you run it.

A PR that lands without prior discussion may be closed without merge even if the change itself is reasonable — the issue-first rule is about scope and direction, not code quality.

## Where conventions live

- **[SPEC.md](SPEC.md)** — workflow contract; canonical surface for the tasknote lifecycle, the relevance gate, gate cues, the paper-complete guard, and versioning rules.
- **[docs/CONVENTIONS.md](docs/CONVENTIONS.md)** — external conventions flaitron adheres to (Conventional Commits, SemVer, GFM, Diátaxis, GitHub Actions CI) and declines (CHANGELOG, separate ADRs, release automation, pre-commit hooks, MCP servers, package-manager / marketplace distribution, template override stacking), each with rationale.
- **[docs/MIGRATION.md](docs/MIGRATION.md)** — adoption and bump procedure for projects pulling flaitron in as a submodule.
- **[docs/PHILOSOPHY.md](docs/PHILOSOPHY.md)** — design rationale; the "why" behind the choices.

## Licensing

Flaitron is [MIT-licensed](LICENSE). Contributions are accepted under the same license — opening a PR is your acknowledgment that your contribution can be redistributed under MIT. Relicensing or contributions under a different license require a separate conversation.
