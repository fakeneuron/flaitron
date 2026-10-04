# Adopting Flaitron in a Project

This is the procedural guide for putting flaitron into a project. For the "why," see [PHILOSOPHY.md](PHILOSOPHY.md). For the workflow contract, see [SPEC.md](../SPEC.md). For the load-bearing vocabulary (terms, phases, markers, grammar), see the lazy-loaded [GLOSSARY.md](GLOSSARY.md) (pointers only; SPEC is authoritative).

There are two starting points:

- **Section 1 — Fresh adoption.** The project has no prior workflow tooling, or its workflow is informal enough to discard.
- **Section 2 — Migrating from a prior workflow system.** The project already has a `plan.json`, helper scripts, a `WORKFLOW.md`, or another structured workflow. Do Section 1 first, then continue into Section 2.

Both paths assume the project has its own git repo — the project can live anywhere on your local machine. (The `/ft-new-project` Quick path in §1.0 additionally checks for `AGENTS.md` or `CLAUDE.md` as a project-validity heuristic; the manual §1.1–1.7 path does not require it.)

## 1 — Fresh adoption

### 1.0 Quick path: `/ft-new-project`

If you have flaitron's `/ft-new-project` skill installed globally (one-time setup below), the manual steps in §1.1–1.7 are wrapped in a single command:

```sh
cd ~/code/<your-new-project>
/ft-new-project
```

The skill verifies preconditions (cwd is a git repo with `AGENTS.md` or `CLAUDE.md`, no existing flaitron wiring, and no legacy workflow tooling at the root — `PLAN.md`, `plan.json`, or `WORKFLOW.md` route to §3 / §2 instead), asks for the project name and pinned flaitron version, and walks through §1.1–1.7 conversationally. It stages all bootstrap files and surfaces the commit message for your approval — no unprompted commits.

**One-time global installs** (run once per machine, after cloning flaitron anywhere on your local machine).

| Skill | Audience | Purpose |
|---|---|---|
| `/ft-new-project` | Adopters (+ flaitron-self) | Bootstrap a new project with flaitron wiring |
| `/ft-audit-repo` | Adopters (+ flaitron-self) | First-contact holistic repo audit — Repo Map discovery, one thin capped sweep, 3–5 thematic synthesis, milestone-sequenced plan filed as flaitron epics, plus delegation hints for focused `/ft-audit <domain>` runs; strictly read-only, no fork. Global install lets you run it on a repo before flaitron is wired in (see §1.2.1) |

Install each you want with the same shape (substitute `<skill>`; the `mkdir -p` is needed once — a machine that has never had a user-scope skill has neither directory, and `ln -s` does not create them):

```sh
mkdir -p ~/.claude/skills ~/.claude/commands
ln -s <path-to-flaitron-checkout>/claude/skills/<skill>       ~/.claude/skills/<skill>
ln -s <path-to-flaitron-checkout>/claude/commands/<skill>.md  ~/.claude/commands/<skill>.md
```

The symlinks point at flaitron's working tree, so they pick up flaitron edits immediately rather than tracking a versioned submodule. To pin a specific version of a skill, copy the files instead of symlinking and re-copy on bump.

Install these **one at a time, from the table above**. An agent home carries only these global-only utilities; anything a project already wires repo-scoped through `.flaitron/core/` must not also be installed globally, or it can duplicate or shadow repo-scoped skills — see [`PLATFORMS.md`](PLATFORMS.md) §"One canonical install path per project".

If you don't have the skill installed, follow §1.1–1.7 manually below — the skill is a convenience wrapper, not a requirement.

### 1.1 Add flaitron as a submodule

From the project root:

```sh
mkdir -p .flaitron
git submodule add https://github.com/fakeneuron/flaitron.git .flaitron/core
git -C .flaitron/core checkout vX.Y.Z   # replace with the version you want to pin (see git tags)
```

The `checkout` step is what pins the project to a specific flaitron version. Without it, the submodule tracks `main` and updates would be undeliberate.

**Keep the submodule's dogfood archive out of search and context tooling.** The submodule brings flaitron's own plan and tasknote archive at `.flaitron/core/.flaitron/` — roughly 14 MB across ~1,000 files, most of the checkout by bytes, growing with every flaitron release. It is flaitron's proof of use, not your project's context: a grep, an `@`-file pick, or an index that walks it returns flaitron's history where you wanted yours. Exclude it once, per tool:

- **Claude Code** — there is no `.claudeignore`; the control is a `Read` deny rule in `.claude/settings.json`, which Claude Code applies to its file tools, to Grep/Glob, and to `@file` mentions. Merge the rule into an existing file rather than overwriting it:

  ```json
  { "permissions": { "deny": ["Read(./.flaitron/core/.flaitron/**)"] } }
  ```

  One cost: the rule also fences the per-release tasknote that §"Pinning and bumping" names for major bumps — the annotated tag message (`git -C .flaitron/core show vX.Y.Z`) carries the same migration steps and stays readable.
- **Cursor** — add the line `.flaitron/core/.flaitron/` to a root `.cursorignore` (blocks both indexing and AI access).
- **ripgrep-based search** (`rg`, and the shell greps most agents run) — the same line in a root `.ignore` (`.rgignore` for ripgrep only). `.gitignore` is the wrong file for this: the path is tracked content inside the submodule.

Commit whichever files you created — §1.6 stages them. Flaitron's own checkout has no `.flaitron/core/` and needs nothing.

### 1.2 Wire the adopter skill subset via symlinks

The submodule ships the full Claude slash-command inventory and matching Codex skill-wrapper inventory. Adopter projects wire only the policy subset — the tasknote family, the `/ft-seed` bulk-seeding utility, and the `/ft-update` submodule-bump utility. **The exact roster is the `ln -s` block in [`claude/AGENTS-snippet.md`](../claude/AGENTS-snippet.md) §"One-time symlink wiring", its single source of truth; this section deliberately does not restate it.** What each does lives in its own SKILL.md frontmatter — short version: `/ft-task` the 4-phase runner (with `--debug` for hypothesis-first bug work and `--loop` for converge-until-verified goal loops), `/ft-micro-task` the one-shot, `/ft-file-followup` the in-chat follow-up (with `--park` for the sidequest parker and `--starter` for the rich-context starter filer), `/ft-epic-discovery` and `/ft-close-epic` the epic bookends, `/ft-refactor` the read-only refactor depth planner that files a sequenced epic. `/ft-update` is the adopter-side version-bump counterpart to `/ft-release` (see [`PLATFORMS.md`](PLATFORMS.md) §"Installed-surface policy").

Global utilities (`/ft-new-project`, `/ft-audit-repo`) live in the user's agent home when desired, not in every adopter repo. `/ft-release` is flaitron-self-only. The canonical category table lives in [`docs/PLATFORMS.md`](PLATFORMS.md) §"Installed-surface policy".

**Claude Code install:** open `.flaitron/core/claude/AGENTS-snippet.md` §"One-time symlink wiring" and run the commands from the project root — that file is the single source of truth for Claude wiring (and also holds the §1.3 `AGENTS.md` paste-block). The relative paths in the snippet survive `git clone` and pin to the submodule's current SHA, so symlinks never need touching on a normal version bump.

**Codex install:** open `.flaitron/core/codex/AGENTS-snippet.md` §"One-time skill wiring" and run the commands from the project root. Codex discovers these repo-scoped subset skills under `.agents/skills/`; invoke them through `/skills` or `$ft-task` / `$ft-update`.

**Cursor install:** if the project is already wired for Claude Code, it is already wired for Cursor — Cursor loads `.claude/skills/` as a documented compatibility surface. For a **Cursor-only** project (no `.claude/` wiring), open `.flaitron/core/cursor/AGENTS-snippet.md` §"One-time symlink wiring" and run the Cursor-only `.cursor/skills/` block from the project root; targets are the canonical `claude/skills/` bodies. Invoke skills as `/ft-task` (and siblings) in a Cursor session.

**Grok Build install:** if the project is already wired for Claude Code, Codex, or Cursor, it is already wired for Grok — Grok scans `.claude/skills/`, `.agents/skills/`, and `.cursor/skills/` as documented compatibility surfaces (Cursor-shaped). Invoke skills as `/ft-task` (and siblings) in a Grok session; the canonical bodies' trailing operator flags come with them — see [`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers). For a **Grok-only** project (no `.claude/`, no `.agents/skills/`, and no `.cursor/skills/` wiring), open `.flaitron/core/grok/AGENTS-snippet.md` §"One-time symlink wiring" and run the Grok-only `.grok/skills/` block from the project root; targets are the canonical `claude/skills/` bodies.

### 1.2.1 Optional: fork the `/ft-audit` scaffold per stack

Flaitron ships one stack-neutral audit scaffold at `.flaitron/core/claude/skills/ft-audit/` — a parameterized `/ft-audit <domain> [scope]` dispatcher over an eight-file `passes/` library. The shared procedure (scope resolution, passes-in-order, capped findings, finding format, closing sections, write-tickets-to-PLAN) lives once in `SKILL.md`; each domain's pass definitions, severity guide, scope/rubric/gate hints, and specialist rules live in a sibling `passes/<domain>.md` loaded at run time. **Forked, not symlinked**: per-stack rubrics/commands/examples diverge.

| Domain | Scope | Passes (5 each, except `context`) |
|---|---|---|
| `general` (default) | Catch-all code audit; used when no domain token is given | Security · Idioms · Hygiene · Orphans · Doc drift |
| `docs` | Documentation surface | Claims vs. code · Cross-doc consistency · Cross-references · Currency · Stale content |
| `security` | Security posture | Secrets · Input handling · Auth & authz · Network & boundaries · Dependencies |
| `frontend` | Frontend (framework-agnostic) | Bundle & payload · Accessibility · Render perf · Browser hygiene · Component health |
| `backend` | Backend (framework-agnostic) | Input & contracts · Error & lifecycle · Persistence · Async correctness · Observability |
| `performance` | Cross-cutting perf (measurements required) | Hot paths · Payload & bundle · Data access · Memory & resource · Caching |
| `structure` | Cross-file structural health (breadth sweep; depth via `/ft-refactor`) | Duplication clusters · Coupling & boundaries · Abstraction drift · God-files · Stray scripts |
| `context` | AI-coding context surfaces (`CLAUDE.md`, `AGENTS.md`, `.claude/{commands,skills}`); no forker placeholders, so it runs unforked | Context bloat · Paste-block redundancy · `ft-*` namespace · Lean-context drift · Tooling & orphans · Contract decay (flaitron-self only) |

Invoke as `/ft-audit backend src/api/**` or bare `/ft-audit` (→ `general`, default scope). A first token that isn't a domain name (a path, `last-commit`, `staged`) resolves to `general` with the whole argument string as scope.

**First contact: `/ft-audit-repo` (the family's other member — no fork).** Before
picking a focused domain on a repo you (or your agent) don't know yet, run the
first-contact holistic audit: it builds a Repo Map before judging, runs one
thin capped sweep, synthesizes 3–5 themes, files a milestone-sequenced plan
as native flaitron epics in `.flaitron/PLAN.md`, and recommends which domains
deserve full runs. It is stack-neutral, strictly read-only, and carries no §0
forker checklist — don't fork it; invoke it by reference from the read-only
submodule path (`.flaitron/core/claude/skills/ft-audit-repo/SKILL.md`), the
same by-reference pattern the thin overlay below uses.

**Depth path: `/ft-refactor` (symlinked, not forked).** The `structure` domain
above is a *breadth* sweep — capped passes across a scope, flat tickets. When
one of its findings needs a sequenced multi-step restructuring of a single
target, the follow-up is `/ft-refactor <target>`: a read-only depth survey that
files the work as an epic with characterization-test-seeded starters. It is
stack-neutral (it reads your code rather than encoding your stack's rubric), so
unlike the audit scaffold it is wired by **symlink** with the rest of the
tasknote family in §1.2 — do not fork it.

To install the scaffold, fork the **whole directory** — `SKILL.md`, its lazily-loaded `scaffold-bootstrap.md` sibling, and the `passes/` library:

```sh
SKILL=audit   # your fork's local (unprefixed) name
mkdir -p .claude/skills/$SKILL
cp -R .flaitron/core/claude/skills/ft-audit/. .claude/skills/$SKILL/
cp .flaitron/core/claude/commands/ft-audit.md   .claude/commands/$SKILL.md
```

Upstream carries the `ft-` prefix (flaitron's owned namespace per `SPEC/layout.md` §"Skill namespace"); the local fork drops it so ownership is clear in skill resolution. Open the fork's SKILL.md and walk the **§0 Forker checklist** — for each domain you keep, set glob, rubric files, verification commands, stack-specific pass examples, and sacred-invariant callouts under Critical *in that domain's `passes/<domain>.md`*. Delete pass files for surfaces your project doesn't have (no frontend → remove `passes/frontend.md`). Delete §0 when filled in.

**Two ways to fork: full copy vs. thin overlay.** The `cp -R` above is the
**full-copy** path — you own a complete `SKILL.md` + `scaffold-bootstrap.md` + `passes/` tree and
customize it freely. Its cost is **drift**: when flaitron improves the shared
procedure or a pass body on a later version bump, your copy doesn't pick it up
(re-copy manually to catch up). When your only divergence from the bundled
scaffold *is* the §0 checklist surface — glob, rubric, gates, sacred
invariants, per-pass examples, extra hard rules — prefer the lighter **thin
overlay** instead: a ~25-line SKILL.md that points at the bundled scaffold,
runs its passes *by reference*, and carries only a `## Deltas` block.

```sh
SKILL=audit   # your fork's local (unprefixed) name
mkdir -p .claude/skills/$SKILL
cp .flaitron/core/templates/audit-overlay-template.md .claude/skills/$SKILL/SKILL.md
cp .flaitron/core/claude/commands/ft-audit.md         .claude/commands/$SKILL.md
# then edit SKILL.md: confirm the referenced scaffold path + fill the ## Deltas block
```

The overlay points at the **read-only submodule path**
`.flaitron/core/claude/skills/ft-audit/SKILL.md` — clone-independent and
stable across version bumps (the audit scaffold is forked-not-symlinked, so it
is *not* in the `.claude/` wiring; the submodule path is the only reliable
reference). On every run the overlay's first action is to read that scaffold
and run **its** procedure, resolving `passes/<domain>.md` relative to the
*scaffold's* directory (the overlay has no `passes/` sibling of its own) and
substituting the `## Deltas` values for the scaffold's `<placeholder>` slots —
the same read-by-reference pattern `/ft-task` uses for its lazy SPEC modules.
Because the body lives upstream, an overlay **inherits scaffold improvements
automatically** on a version bump (it never copied them). One overlay covers
all eight domains; per-domain deltas are keyed by domain inside the `## Deltas`
block.

Choose by how much you diverge: **overlay** when only the §0 surface changes
(most stacks); **full copy** when you need to edit pass *bodies* — reorder or
rewrite passes, change the finding format, or restructure the closing sections.
The overlay's one limitation is that it relies on the agent loading the
referenced scaffold (and its pass files) at runtime; if your agent can't follow
the pointer, full-copy instead. (Verbatim **symlinking** the scaffold is *not*
an option — it carries no deltas, so the skill can't be customized for your
stack at all.)

Splitting into per-area forks (e.g., `audit-payments` + `audit-ingest`, each pinned to one domain's passes): copy the directory into multiple sibling dirs and customize each. Forks are yours — flaitron bumps don't touch them; re-copy upstream when you want scaffold improvements.

**Fork-provenance markers.** Both full-copy and overlay forks support two optional frontmatter fields that let `/ft-update` detect when the upstream scaffold has changed since your fork was last reconciled:

```yaml
flaitron-reconciled: v5.2.0   # version tag you installed or last reconciled from
flaitron-tracks: ft-audit     # bundled scaffold this fork mirrors
```

Add these fields to your fork's `SKILL.md` frontmatter at install time (the overlay template already ships them as placeholders). On every `/ft-update` run, the bump step scans your `.claude/skills/*/SKILL.md` files for these markers and runs `git log <reconciled>..<target> -- claude/skills/<tracked>/` against the submodule — if the scaffold changed, it warns you with an upstream diff command so you can review and re-reconcile. After reconciling, update `flaitron-reconciled:` to the new version. Forks without these markers are silently skipped (pre-marker forks keep working; adding the fields is opt-in).

**Self-filling bootstrap — what happens if you never fork.** The bundled scaffold is stack-neutral, so an unforked run has no project contracts to grade against and degrades to generic best-practice advice. `SKILL.md` §1 step 3 catches that at dispatch time and hands off to the lazily-loaded `scaffold-bootstrap.md` sibling: on loading a `passes/<domain>.md` that still carries placeholder slots, the run **stops before pass 1**, derives candidate gates / scope glob / rubric files from what the repo declares (`package.json` scripts, `pyproject.toml` + `uv.lock`, `justfile` / `Makefile`, CI workflow `run:` steps, `Cargo.toml` / `go.mod` / `Gemfile`, repo layout, root rubric docs), and offers three branches: **fork + fill now** (writes the thin overlay above with `## Deltas` prefilled and `flaitron-reconciled:` set to your current pin), **run once** with the derived values applied in memory, or **proceed degraded** with an explicit unfilled-scaffold banner on the report. Detection is structural — any `<…>` slot in the pass file's scope/rubric/gate block, or any `_(forker: …)_` note — so it stays correct across domains that word their placeholders differently. A gate is proposed only for a slot the loaded pass file actually declares (`security` wants scanners, `performance` a profiler, `docs` a link checker), and a destructive-intent denylist (deploy, publish, release, migrate, seed, reset, push) means a mis-derivation can never turn a read-only audit into a destructive one. Sacred invariants and per-pass stack examples are *not* derivable — a prefilled overlay is prefilled, not finished, and the bootstrap says so. A filled fork has no unresolved placeholders, so it never sees any of this — and that includes a thin overlay, whose `## Deltas` block resolves the bundled pass files' placeholders one layer up (the bootstrap checks the deltas before firing, so an overlay is never false-positived for placeholders it has already answered). In a repo with no flaitron submodule the overlay's referenced-scaffold path can't resolve, so the fork branch is withheld and only the other two are offered.

**Keeping a full-copy fork's `passes/` current.** Beyond the drift warning above, `/ft-update` Step 4.5 also reconciles the *file set* of a full-copy fork against the bundled scaffold. Any pass file the bundle has at the target version and your fork lacks is classified by whether it existed upstream at your `flaitron-reconciled:` point: **absent then** means flaitron shipped a new domain you have never seen, and `/ft-update` offers to copy it in (per-file confirm; it lands as an unfilled scaffold for you to fill); **present then** means you deleted it deliberately — as §0 sanctions for surfaces your project doesn't have — and it is reported without ever being re-added. Files your fork already has are never read, diffed, or written by this step, so filled rubrics, gates, and sacred invariants cannot be clobbered. Thin overlays carry no `passes/` of their own and resolve pass files from the scaffold at run time, so they inherit new domains automatically and this step reports them as needing no action.

**Surfaces not covered by the eight domains.** For audit surfaces without a dedicated pass file — API contracts, database schema/migrations, E2E test quality — use the nearest domain as the base rather than starting from scratch: `backend` covers API and database surfaces well through its Input & contracts and Persistence passes (scope the glob to your API routes or migrations dir; point the rubric at your API contract and schema docs). There is no `e2e` domain yet; if your project needs one, add a `passes/e2e.md` to your fork modeled on `general` — at that point, full-copy rather than overlay.

#### Migrating a pre-consolidation audit fork

Release v5.x consolidated six separate audit scaffolds
(`ft-audit{,-docs,-security,-frontend,-backend,-performance}`) into the single
parameterized scaffold above. If you forked one of those before the bump, what
you do next depends on which fork style you used:

- **Full-copy forks — nothing breaks; act only when you want the new shape.**
  Your `.claude/skills/audit-*/SKILL.md` is self-contained and references
  nothing upstream, so it keeps running exactly as before across the bump. It
  simply won't receive scaffold improvements (as was always true of full
  copies), and it now diverges structurally from the bundled form. To adopt the
  parameterized shape, re-fork per the `cp -R` above and port your §0 answers
  into the matching `passes/<domain>.md`.

- **Thin overlays — these break on bump; repoint them.** A pre-consolidation
  overlay names a retired path in its "Referenced scaffold" line
  (`.flaitron/core/claude/skills/ft-audit-<x>/SKILL.md`). That path no longer
  exists after the bump, so the overlay's first action — read the scaffold —
  fails and the skill has no procedure to run. Fix it in place:

  1. Change the referenced scaffold to
     `.flaitron/core/claude/skills/ft-audit/SKILL.md`.
  2. Name the domain your overlay covers (the `<x>` from the old path;
     the old bare `ft-audit` maps to `general`) so the dispatcher loads the
     right `passes/<domain>.md` from the scaffold's directory.
  3. Update `flaitron-tracks:` from `ft-audit-<x>` to `ft-audit`, and
     `flaitron-reconciled:` to the version you just bumped to.

  Re-copying `templates/audit-overlay-template.md` and re-filling your
  `## Deltas` block achieves the same thing if you'd rather start clean.

Optional section — skip entirely if you don't want structured audit skills.

### 1.2.2 Developing flaitron skills & commands (maintainer & contributors)

The canonical skill and command definitions live in `claude/skills/` and `claude/commands/` at the root of this checkout. The in-repo `.claude/` directory is gitignored (see root `.gitignore`) and must never contain committed per-machine wiring.

For live editing with immediate effect, wire this checkout's own `.claude/`. The repo-scoped install is the canonical one ([`PLATFORMS.md`](PLATFORMS.md) §"One canonical install path per project"), and because its symlinks point into this tree, an edit to `claude/skills/` is live in the next session:

```sh
# From the flaitron repo root (one-time, or after adding a skill/command)
mkdir -p .claude/commands .claude/skills
ln -s ../../claude/commands/*.md .claude/commands/
ln -s ../../claude/skills/*      .claude/skills/
```

The relative `../../` paths are clone-location independent, and the symlinks land under the ignored `.claude/` directory, so they never enter git history. This gives the complete `/ft-*` surface (`/ft-audit`, `/ft-audit-repo`, release, new-project, etc.) to any agent started inside the tree. It is expected rather than optional: [`PLATFORMS.md`](PLATFORMS.md) §"Installed-surface policy" treats a shipped `ft-*` slug with no `.claude/` symlink as a wiring miss, and `/ft-release` §7.1 checks for one. The glob also wires `/ft-update`, which is intentional — the skill is adopter-only but bails in flaitron-self with a clear message rather than silently misbehaving, so wiring it here is harmless. The `ft-` prefix remains flaitron's reserved namespace.

Codex maintainers wire the same way, from the parallel wrapper inventory:

```sh
mkdir -p .agents/skills
ln -s ../../codex/skills/* .agents/skills/
```

`.agents/` is gitignored alongside `.claude/` (see root `.gitignore`), so this stays per-machine too.

The canonical `claude/skills/ft-audit/` directory (`SKILL.md` + `scaffold-bootstrap.md` + `passes/`) is the **stack-neutral scaffold** of §1.2.1 — it intentionally retains the §0 forker checklist and placeholder globs/rubrics so adopters (and flaitron's own release tooling) can fork it. It is **not** a pre-filled flaitron-self specialization. Auditing flaitron itself therefore supplies scope at invocation time. `passes/docs.md` leaves its default-scope slot a forker placeholder and reaches `.flaitron/tasknote/README.md` §"AI-referenced docs" through an **extra scope token**, so invoke it as `/ft-audit docs ai-referenced` — the same explicit form `/ft-release` §7.1 uses. Other domains have no baked-in glob — pass a target (e.g. `viz/src/**` for the React app) or the run stops and asks. The bundled pass files keep their placeholders whatever scope you pass, so a run here also trips the §1 step 3 scaffold bootstrap (§1.2.1) before pass 1; *run once* is the normal answer. Verification gates are per domain: the code domains use the `viz` `npm` scripts (`lint`, `typecheck`, `test`) plus the portable `node --test tools/update-adopters.test.mjs` suite, while `docs` declares markdown-lint and link-check slots — this repo has no markdown linter, but the CI `drift` job's doc checks (Pair Q section-citation resolver, final-newline, context budget) are the link-check half; run them locally as the gate. If you audit this tree often, keep a local-only fork under the gitignored `.claude/skills/audit/` (fill in the `viz` glob + those three gates) — a thin overlay's "Referenced scaffold" line should point at the in-tree `claude/skills/ft-audit/SKILL.md` rather than the adopter submodule path, since this checkout has no `.flaitron/core/` to reference (`claude/skills/ft-audit/scaffold-bootstrap.md` §2 "Flaitron-self"); like everything under `.claude/`, it stays per-machine and never enters git history.

**Machine-global installs: utilities only**

Do **not** glob the shipped inventory into an agent home. `~/.claude/skills/` and `~/.agents/skills/` carry only the global-only utilities — the skills you need *before* a project is wired, or *outside* any flaitron checkout — installed one at a time with the §1.0 shape:

```sh
mkdir -p ~/.claude/skills ~/.claude/commands
ln -s ~/code/flaitron/claude/skills/<skill>       ~/.claude/skills/<skill>
ln -s ~/code/flaitron/claude/commands/<skill>.md  ~/.claude/commands/<skill>.md
```

Globally installing a slug the repo-scoped wiring above already provides can make it enumerate twice in a session's skill roster. Some runtimes collapse identical targets instead; the bounded Codex observation is in [CODEX-VERIFICATION.md](CODEX-VERIFICATION.md#before-and-after). The rule and its second failure mode — cross-agent slug shadowing in `~/.agents/skills/`, which is read by Codex, Claude Code, Cursor, and Grok alike — are canonical in [`PLATFORMS.md`](PLATFORMS.md) §"One canonical install path per project".

### 1.3 Paste the workflow block into `AGENTS.md`

Open `.flaitron/core/claude/AGENTS-snippet.md` and copy the markdown block from the "Block to paste into AGENTS.md" section into your project's `AGENTS.md` (create the file if it doesn't exist). `AGENTS.md` is the open-standard memory file read by Claude Code, Codex CLI, Cursor, Sourcegraph Amp, Aider, and Grok Build — pasting here makes the flaitron contract visible to whatever assistant the adopter uses. Project-specific instructions for a single assistant (e.g., `CLAUDE.md` for Claude-only directives) stay where they are; flaitron's block is agent-neutral.

**Confirm your assistant actually loads it.** Which context files an agent reads at cold start is that agent's behavior, not flaitron's — and it varies by version and by configuration. A pasted block in a file nobody loads is the worst outcome of this step, because nothing looks wrong. Verify once, in a fresh session, before moving on:

- Ask the assistant to quote a line that exists **only** in `AGENTS.md` (the flaitron `## Workflow` heading you just pasted works). If it can't, `AGENTS.md` is not in its context.
- Claude Code additionally lists the context files it loaded at session start — check that `AGENTS.md` (or a `CLAUDE.md` resolving to it) appears there.

If `AGENTS.md` doesn't load, do **not** copy the block into a second file — two copies of the contract drift apart. Point the agent's native context file at the one you already have:

```sh
# No CLAUDE.md yet — make CLAUDE.md *be* AGENTS.md
ln -s AGENTS.md CLAUDE.md
```

The symlink is relative and one file deep, so it survives `git clone` and stays correct on Windows checkouts that materialize symlinks as copies (worst case, a stale copy of a file the agent would otherwise not read at all). Commit it — §1.6 stages it.

If the project already has a real `CLAUDE.md` holding Claude-only directives, leave it alone and add an import line to it instead:

```markdown
@AGENTS.md
```

Then re-run the verification above. Both routes leave `AGENTS.md` the single source of the contract; `CLAUDE.md` only ever carries the loading shim plus whatever Claude-only directives already lived there. Flaitron's own repo uses the symlink route — see its root `CLAUDE.md`.

The same applies to any other agent with a native context file (`GROK.md`, `GEMINI.md`, Aider's `CONVENTIONS.md`): verify, and shim to `AGENTS.md` only if the verification fails. See [`AGENT-COMPAT.md`](AGENT-COMPAT.md) §"Reading the cells" for the per-agent entry points.

### 1.4 Create `.flaitron/PLAN.md`

```sh
cp .flaitron/core/templates/PLAN.md .flaitron/PLAN.md
```

Then fill in the project name, vision paragraph, and current task list. Tasks use the area-prefix convention from SPEC.md §"Task ID convention" (`CORE-`, `BE-`, `FE-`, etc.). Project-specific prefixes are allowed; declare them in the next file.

**`.flaitron/PLAN-ARCHIVE.md` appears later — do not create it now.** `## Completed` grows one row per closure and is bounded: once it passes 60 rows, a runner skill that reads PLAN.md surfaces a one-line advisory suggesting you rotate the oldest rows into a sibling `.flaitron/PLAN-ARCHIVE.md`. Rotation is an operator motion you run when you choose — nothing auto-applies, and no row is ever deleted. See [`SPEC/plan-filing.md`](../SPEC/plan-filing.md) §"`## Completed` rotation" for the bound, the row-count granularity, and the never-split-a-cohort rule.

### 1.5 Create `.flaitron/tasknote/README.md`

```sh
mkdir -p .flaitron/tasknote/archive
cp .flaitron/core/templates/tasknote-README.md .flaitron/tasknote/README.md
```

Then fill it in:
- Declare project-specific area prefixes.
- Replace "Project quick commands" with the project's test/lint/dev commands.
- Extend `## AI-referenced docs` (seeded with `README.md` / `AGENTS.md` / `CLAUDE.md` / `.flaitron/PLAN.md`) — this list is walked at every Phase 4 closure and epic-audit subtask. Add architecture notes, API specs, DB schema docs, ADRs as the project matures.

Tasknote shape and lifecycles: see SPEC §"Tasknote frontmatter" + §"Tasknote body shape", plus the lightweight variants — **starter** (`tasknote-starter-template.md`, lifecycle in `SPEC/starter.md`) and **micro** (`tasknote-micro-template.md`, threshold in SPEC §"When to use a tasknote"). For multi-child code-sweep/feature epics, opening Discovery (`.1`) + closing Audit (highest `.N`) bracket the implementation children — `SPEC/epic.md`. Simple multi-subtask implementations skip the bracket. Planning YAML (`touches` — the declared scope Phase 1 fills and Phase 4 reconciles — plus optional `blocked-by` / `parallel-safe-with` / `supersedes`) and the Discovery `.1` `## 🌳 Fan-out` insert are omit-when-absent; existing notes need no backfill, and no new skill symlink ships.

### 1.6 Commit

```sh
git add .gitmodules .flaitron/core .flaitron/PLAN.md .flaitron/tasknote/ AGENTS.md
grep '^ln -s' .flaitron/core/claude/AGENTS-snippet.md | awk '{print $NF}' | xargs git add
git commit -m "chore: adopt flaitron at vX.Y.Z"
```

If §1.3's verification sent you to the `CLAUDE.md` shim, add it to the first line (`… AGENTS.md CLAUDE.md`) — git stores the symlink itself, not a copy of `AGENTS.md`. Likewise add whichever exclusion files §1.1 created (`.claude/settings.json`, `.ignore`, `.cursorignore`).

The second line stages exactly the symlinks §1.2 created, read back from the snippet that created them. That snippet is the single source of truth for the adopter-wiring roster ([`claude/AGENTS-snippet.md`](../claude/AGENTS-snippet.md) §"One-time symlink wiring"), so this block restates no path list and cannot fall behind a newly shipped skill. Explicit paths — not `git add .` — keep the migration commit scoped to the flaitron wiring even if your project already has other files under `.claude/` (settings, other skills).

**Codex-only (no `.claude/` wiring).** Replace the second command above with the command below, deriving only the adopter symlinks from [`codex/AGENTS-snippet.md`](../codex/AGENTS-snippet.md) §"One-time skill wiring". The snippet's later self-host glob is outside this block. Keep the first staging command and include whichever exclusion files §1.1 created.

```sh
awk '/^## One-time skill wiring$/{p=1;next} p && /^## /{p=0} p && /^ln -s/{print $NF}' .flaitron/core/codex/AGENTS-snippet.md | xargs git add
```

**Cursor-only (no `.claude/` wiring).** The `git add` block above is the Claude-default path. A Cursor-only install from §1.2 never creates those `.claude/` files — adding them fails. Stage the Cursor snippet's symlinks instead (`git add .cursor/` per [`cursor/AGENTS-snippet.md`](../cursor/AGENTS-snippet.md) §"One-time symlink wiring") together with `.gitmodules`, `.flaitron/core`, `.flaitron/PLAN.md`, `.flaitron/tasknote/`, and `AGENTS.md`.

**Grok-only (no `.claude/`, `.agents/skills/`, or `.cursor/skills/` wiring).** Same constraint: the Claude-default `git add` block fails. Stage the Grok snippet's symlinks instead (`git add .grok/` per [`grok/AGENTS-snippet.md`](../grok/AGENTS-snippet.md) §"One-time symlink wiring") together with `.gitmodules`, `.flaitron/core`, `.flaitron/PLAN.md`, `.flaitron/tasknote/`, and `AGENTS.md`.

### 1.7 Verify

In a fresh session with your coding agent, verify the platform's wired entry point:

- **Claude Code:** invoke `/ft-task`. The command should appear in the menu with its description, alongside every other skill the §1.2 snippet block wired (that block is the roster; there is no second list to check it against).
- **Codex:** use `/skills` or mention `$ft-task`. The skill should appear alongside the other wired adopter-subset `ft-*` skills from `.agents/skills/`.
- **Cursor:** invoke `/ft-task`. If the project already has Claude `.claude/` wiring, Cursor picks it up via compat load; Cursor-only projects should see the same adopter subset under `.cursor/skills/`.
- **Grok Build:** invoke `/ft-task`. If the project already has Claude `.claude/`, Codex `.agents/skills/`, or Cursor `.cursor/skills/` wiring, Grok picks it up via compat load; Grok-only projects should see the same adopter subset under `.grok/skills/`. The canonical bodies' trailing operator flags work once those bodies are loaded — see [`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers).
- **Contract-only agents:** ask the assistant to start the task conversationally; it should read `AGENTS.md` and `SPEC.md` and follow the tasknote contract.

Running the task runner against a real entry in your `.flaitron/PLAN.md` should scaffold a tasknote and begin Phase 1 Discovery.

If any command doesn't appear, the symlinks are likely wrong — check that each `readlink .claude/commands/<name>.md` and `readlink .claude/skills/<name>` resolves under the submodule.

**Recommended follow-up.** Audit the context surfaces now: run `/ft-audit context` (your fork's name — e.g. `/audit context` — per §1.2.1; before a fork exists, ask your agent to run `.flaitron/core/claude/skills/ft-audit/SKILL.md` with `context` as the domain — the pass file carries no forker placeholders, so it runs unforked). The `context` domain scans the project's `CLAUDE.md`, `AGENTS.md`, and `.claude/{commands,skills}` for context bloat, redundancy with the freshly-pasted `AGENTS.md` block, `ft-*` namespace conflicts, and lean-context drift; findings land as PLAN tickets on the usual write-step confirmation. Catches first-day context-surface issues before they ossify.

---

## 2 — Migrating from a prior workflow system

If the project has its own workflow tooling, do **Section 1 first** — flaitron lives alongside the legacy system until conversion is done. Then work through this section.

§2 lifts the **full** plan (closed + active) into flaitron shape, preserving task IDs so archived tasknotes stay addressable. If you'd rather freeze the archive as read-only legacy and only lift the active queue, jump to **[Section 3](#3--lightweight-migration-current-tasks-only)** — much shorter playbook.

Walk **§3.1 Pre-flight collision check** before any `git mv` — the collision risks apply identically to this heavy path.

### 2.1 Convert `plan.json` (or equivalent) to `PLAN.md`

The differentiator vs §3: full conversion, not just the active queue. Convert by hand to `.flaitron/PLAN.md`:

- **Preserve task IDs exactly** — archived tasknotes reference them; renumbering breaks the links.
- Group entries under SPEC §"Priority levels" headings (`High` / `Medium` / `Low` / `Future Opportunities`). Legacy `Critical` rows move into `High` with `[!critical]` per SPEC/task-line-segments.md.
- Move completed entries to `## Completed` with close dates if known; omit missing dates rather than inventing them.
- **No conversion script** — judgment calls (priority mapping, still-relevant filter) make this a one-time per-project translation.

### 2.2–2.6 Follow §3.5–§3.9

The remaining steps (reconcile in-flight tasknotes · retire helpers · replace workflow docs · create `AGENTS.md` from the paste-block · commit) are identical to §3's playbook. Apply §3.5 to **all** in-flight tasknotes (not just the active queue), then §3.6–§3.9 as written.

---

## 3 — Lightweight migration: current tasks only

Most real-world adoptions don't want to lift the full archive. The legacy plan might be hundreds of closed entries, narrative-heavy, and irrelevant to day-to-day work going forward. This section is the **active-queue-only** playbook: freeze legacy as a read-only reference, lift only the open tasks into flaitron, and don't try to preserve historical link integrity.

Do **Section 1 first** — flaitron lives alongside legacy until you finish the steps below.

**Tradeoffs vs §2.** §2 preserves task IDs exactly so archived tasknotes stay addressable. §3 sacrifices that link integrity in exchange for a much smaller migration: closed entries stay frozen in legacy form, only the active queue moves. Pick §3 when the archive is large enough that converting it is its own multi-day project, or when the legacy plan format (narrative paragraphs, JSON, custom schema) is too far from flaitron's shape to translate cleanly.

### 3.1 Pre-flight collision check

Before any `git mv` or new files, walk this checklist — each item below tripped early adopter migrations. Unresolved items make §3.2's freeze partially fail or silently overwrite legacy files. The list is the generic core; project-specific tells (credentials, runtime gates, project-local skills, orphan dirs) belong in the adopter's migration tasknote, not here.

- **Working tree clean.** `git status` shows no uncommitted changes — bail and resolve before proceeding. Migration is a multi-commit shape; mixing in unrelated WIP makes the diff unreadable.
- **Gitignore audit.** Confirm any project-specific transient paths (e.g. `__pycache__/`, `.coverage`, `node_modules/`, `.env*`, large local DB files) are already ignored. If any aren't, fix `.gitignore` and commit BEFORE staging migration files — `git add .flaitron/...` could otherwise leak compiled artifacts or secrets.
- **Collision: project-local `/ft-task` command or skill.** Pre-existing `.claude/commands/ft-task.md` or `.claude/skills/ft-task/` (an artifact of any pre-flaitron internal `/ft-task`) will fail §1.2's symlink step (target exists). Back up or remove first: `git mv .claude/commands/ft-task.md .claude/commands/_legacy_task.md` (or `git rm` if the legacy skill has no salvageable content).
- **Collision: `.flaitron/tasknote/README.md`.** §3.4's `cp .flaitron/core/templates/tasknote-README.md .flaitron/tasknote/README.md` would silently overwrite a pre-existing legacy README. Either run §3.2's `git mv .flaitron/tasknote .flaitron/legacy-tasknote` first so the path is freed naturally, or move the legacy README upfront (`git mv .flaitron/tasknote/README.md .flaitron/legacy-plan/<old-name>.md`). **This is the gap that motivated [[CORE-044]]'s `/ft-new-project` legacy detection** — the bail check protects fresh adoption; this checklist protects migration.
- **Collision: `.flaitron/tasknote/tasknote-template.md`.** Pre-existing project-local template, redundant once flaitron's template lives at `.flaitron/core/templates/tasknote-template.md`. Either it moves with the directory rename in §3.2, or it requires explicit `git rm` after wiring — decide upfront.
- **Active migration-tasknote disposition.** This very tasknote (the `CORE-XXX` driving the migration) IS the migration. Decide UPFRONT: stay in legacy-shape and self-close to the legacy archive as the final commit (cleanest — minimizes mid-migration churn) OR rewrap into flaitron's spec-on-top + log-below shape mid-migration (more work, more risk). Default: stay legacy. Same call applies to any sibling in-flight tasknotes per §3.5.
- **Root-level workflow-file inventory.** If the legacy plan lives at the repo root (rather than under `.flaitron/`), enumerate every file moving to `legacy/` — typically `PLAN.md`, `PLAN_ARCHIVE.md`, `ROADMAP.md`, `FUTURE_OPPORTUNITIES.md`. Decide per-file: move with the legacy umbrella (workflow content) or stay at root (orthogonal — e.g. `CHANGELOG.md`, `SCRATCHPAD.md`).
- **Path-reference inventory.** Pre-grep for legacy IDs and paths the migration will retire:

  ```sh
  grep -rnE "<legacy-ID-pattern>|PLAN\.md|<retired-helper>" \
    --include='*.md' --include='*.py' --include='*.ts' \
    --exclude-dir=node_modules --exclude-dir=.flaitron .
  ```

  Record the hit list — §3.8 (Post-migration cleanup) walks it to resolve every stale reference.

### 3.2 Freeze the legacy plan + tasknote dirs

Move the legacy directories under a clearly-labeled umbrella so it's obvious at a glance which world is which. The exact layout depends on where legacy currently lives:

```sh
# If PLAN.md and friends live at the repo root:
mkdir -p legacy
git mv PLAN.md legacy/PLAN.md
git mv PLAN_ARCHIVE.md legacy/PLAN_ARCHIVE.md      # if present
git mv ROADMAP.md legacy/ROADMAP.md                # if it duplicates PLAN.md content

# If legacy already lives under .flaitron/ (e.g., .flaitron/plan/plan.json):
git mv .flaitron/plan .flaitron/legacy-plan
git mv .flaitron/tasknote .flaitron/legacy-tasknote  # only if you also want a fresh .flaitron/tasknote/
```

If the legacy `.flaitron/tasknote/` is already organized with `archive/<area>/` subfolders matching flaitron's shape, you can leave it in place and **only freeze the legacy plan file** — new flaitron tasknotes can land in the same directory alongside the legacy archive without a conflict. Adopt the path of least surgery.

Add a one-line `legacy/README.md` (or wherever the legacy umbrella ended up):

```markdown
Read-only reference — the project's pre-flaitron plan and tasknotes.
For active work, see `.flaitron/PLAN.md` and `.flaitron/tasknote/`.
```

### 3.3 Cross-walk the active queue to canonical IDs

If the legacy IDs already follow flaitron's `<AREA>-<NUMBER>` convention (e.g. `FE-`, `BE-`, `CORE-`), they carry over unchanged.

If the legacy IDs follow a non-canonical scheme (phase-prefixed `P11.7-1`, sequential numerics, project-internal codes), do a one-time rename of the **open queue only**. Map each open task to a canonical area prefix and record the cross-walk in the migration tasknote:

| Legacy ID | Flaitron ID | Notes |
|---|---|---|
| P41-2 | BE-001 | auth middleware |
| P42-1 | BE-002 | boot banner |
| P28-6 | TEST-001 | Playwright UX smoke |
| P28-7 | FE-001 | settings drawer |
| P33-1 | FE-002 | offline banner |
| P33-3 | BE-003 | health-check endpoint |

Closed legacy IDs stay as-is in the frozen `legacy/` tree — they are no longer addressable from new tasknotes via flaitron's `[[TASK-ID]]` wikilinks, and that is the whole point of "current tasks only." External references (commit messages, code comments, doc cross-refs) still resolve into `legacy/` if needed; new work uses the new ID space.

If a renamed task's description references a closed legacy ID, write the cross-link as a plain markdown link (`[P29-2 (legacy)](../legacy/tasknote/P29-2.md)`) rather than a `[[]]` wikilink — flaitron's wikilink resolver assumes the new ID space and `.flaitron/tasknote/archive/<area>/` layout.

### 3.4 Populate `.flaitron/PLAN.md` from the active queue

For each open legacy task, write a new line in the right priority section of the freshly-templated `.flaitron/PLAN.md` using the renamed ID and the task-line grammar from `SPEC.md` §"Task-line format":

```markdown
## High

- [ ] **BE-001** [opus] | auth middleware — Token validation and refresh flow for protected API routes. Supersedes legacy T-45.
- [ ] **BE-002** [sonnet] | boot banner — Log app `VERSION` and config file path at process startup. Supersedes legacy T-62.
```

Leave `## Completed` empty or seed it with a single pointer line:

```markdown
## Completed

(legacy completions live in `legacy/PLAN.md` — flaitron-era completions land here in stub form per `SPEC/plan-filing.md` §"`## Completed` archive convention")
```

The stub-form (CORE-036, v0.10.0) means new flaitron-era completions are one-liners pointing into `.flaitron/tasknote/archive/<area>/`. Don't try to reproduce legacy narrative blocks here — they belong in the frozen legacy plan, not in the new one.

### 3.5 Decide per active tasknote: finish-as-is or rewrap

For each currently-open tasknote (a small universe under §3):

- **Finish-as-is** in the legacy directory if the task is mid-Phase 2 or later. When it closes, archive it alongside the other legacy tasknotes; the line in flaitron's `.flaitron/PLAN.md` flips to `[x] | <shortname> — Completed YYYY-MM-DD. (closed under legacy workflow)`. The new tasknote at `.flaitron/tasknote/archive/<area>/` does **not** get created — the legacy artifact is sufficient.
- **Rewrap** under the new ID if the task is in Phase 1 or stale: scaffold via `/ft-task <NEW-ID>` against the renamed PLAN.md entry. The starter context can be transcribed from the legacy tasknote's discovery notes; apply Phase 1's drift check fully (legacy notes can be weeks old).

### 3.6 Retire helpers and project-side workflow docs

Helper scripts (`create_tasknote.py`, `archive_tasknote.py`, `validate_plan.py`) and project-side workflow docs (`WORKFLOW.md`, `TASKNOTE_QUICK_REFERENCE.md`) go away — the flaitron submodule + paste-block in `AGENTS.md` cover their job. If a doc holds project-specific notes worth keeping, shrink it to those parts and add a top-of-file pointer: *"Workflow contract: see `.flaitron/core/SPEC.md`."* If a script does something flaitron doesn't cover (project-specific lint, custom CI), keep it as a project-side helper — not part of the workflow system.

### 3.7 Create `AGENTS.md` from the paste-block

Create `AGENTS.md` and paste the flaitron block from §1.3, then run §1.3's loading check — a migrated project is the likeliest place to find an agent that was only ever reading the legacy file. If a legacy workflow block lived inside `CLAUDE.md` (or another assistant-specific memory file) under the prior system, remove it — flaitron's contract now lives in `AGENTS.md` and is read by Claude Code, Codex, Cursor, Amp, Aider, and Grok. Removing that block may leave `CLAUDE.md` empty; if so, deleting it and running §1.3's `ln -s AGENTS.md CLAUDE.md` is cleaner than keeping a stub. Project-specific instructions (architecture notes, non-negotiables, quick commands) stay in whatever file they already live in — they're orthogonal to flaitron.

### 3.8 Post-migration cleanup

After §3.2–§3.7 land and `/ft-task` shows in the slash menu, sweep for residual state the migration steps didn't auto-handle. Each item below is a decision point — log the resolution in the migration tasknote's Cleanup Notes (or equivalent). The list is the **generic core**; project-specific tails (live-runtime smoke, CLAUDE.md project-guardrail check, project-specific orphan dirs) belong in the adopter's migration tasknote.

- **Redundant template removal.** `git rm .flaitron/tasknote/tasknote-template.md` if a project-local template survived §3.2. Flaitron's template now lives at `.flaitron/core/templates/`.
- **`_legacy_task` backup disposition.** If §3.1 backed up a project-local `/ft-task` command or skill to `_legacy_task.md` / `_legacy_task/`, decide: delete after migration confirms flaitron's `/ft-task` works, OR keep indefinitely as historical reference.
- **Stale path-reference + ID sweep.** Walk the hit list captured in §3.1's path-reference inventory:
  - In active markdown docs: rewrite as `[<legacy-ID> (legacy)](legacy/...)`-style markdown links per §3.3, OR replace with the cross-walked flaitron ID if the reference is still relevant going forward.
  - In code comments / docstrings: low-risk; leave or update at touch time.
  - In archived/legacy content: leave untouched (write-once policy applies — don't retroactively rewrite history).
- **CI / pre-commit hook check.** `grep -rn "<retired-helper-script-name>" .git/hooks/ .github/ docker/ scripts/` (project root) — confirm nothing depends on retired scripts. Resolve before next CI run.
- **Adopter-subset smoke.** Enumerate what §1.2 wired and invoke each in a fresh session with your coding agent's wired entry point — `/ft-*` for Claude Code, Cursor, or Grok, `/skills` or `$ft-*` for Codex, or a conversational prompt for contract-only agents:

  ```sh
  grep '^ln -s' .flaitron/core/claude/AGENTS-snippet.md |
    awk '{print $NF}' | sed -E 's#.*/##; s#\.md$##' | sort -u
  ```

  Confirm every slug it prints appears in your agent's roster (v1.0+ additions; symlinks added in §1.2; `/ft-refactor` added in CORE-463.5; `/ft-seed` added in CORE-619; the worktree pair retired in CORE-572 and `/ft-spec` in CORE-573 — see the retired-skills table below).
- **Context-surface audit.** Run `/ft-audit context` now (your fork's name, e.g. `/audit context`; unforked, ask your agent to run `.flaitron/core/claude/skills/ft-audit/SKILL.md` with `context` as the domain) — migrations frequently carry over context bloat from the legacy era (stale `CLAUDE.md` workflow tutorials, project-local skills that now shadow `ft-*` namespace, AGENTS.md content redundant with the freshly-pasted block). Findings land as PLAN tickets on the write-step confirmation.
- **Final pin verification.** `git -C .flaitron/core describe --tags` shows the pinned version recorded at the start (e.g., `v5.35.0`). A mismatch means the submodule drifted off the pin during migration.
- **Cleanup commit.** Bundle the decisions above into a single follow-up commit (`chore: <ID> post-migration cleanup`) OR fold into the §3.9 closure commit if scope is small.

### 3.9 Commit the migration

A lightweight migration is itself a tasknote — typically a `CORE-` task in the project's own freshly-populated `.flaitron/PLAN.md`. Use it to track §3.1–§3.8 including the ID cross-walk table, and commit at Phase 4 closure the same way any other tasknote closes. The cross-walk table belongs in the tasknote body, not in `.flaitron/PLAN.md` — once the migration closes, anyone searching for a legacy ID can find it in the archived migration tasknote.

---

## Pinning and bumping

The submodule SHA in `.flaitron/core` is what pins the project to a specific flaitron commit.

To bump:

1. For a major version bump, read the annotated tag message (`git -C .flaitron/core show vX.Y.Z`) and the per-release tasknote in `.flaitron/core/.flaitron/tasknote/archive/core/` — both list migration steps. Follow them before changing anything in the project. If §1.1's `Read` deny rule fences the tasknote, the tag message alone is enough.
2. Update the submodule:
   ```sh
   git -C .flaitron/core fetch --tags
   git -C .flaitron/core checkout vX.Y.Z
   ```
3. Commit. The parent repo's submodule pointer (the SHA recorded for `.flaitron/core`) changes; `.gitmodules` itself only changes if the URL or branch field changes.

Existing symlinks in `.claude/` and `.agents/skills/` don't need to be touched — they always track whatever the submodule currently points at. Two exceptions: a release that **retires** a skill (see the note below), and v6.0.0's `.flowtron/` → `.flaitron/` rename, which re-points every symlink (§"Upgrading an existing adopter from v5.x" step 4).

#### Retired skills leave dangling symlinks

When a release removes a skill from the adopter subset, the symlinks you created for it still exist in your project and now point at a path that no longer exists in the submodule. Nothing breaks elsewhere — the dead symlink just surfaces a slash command that fails when invoked. `/ft-update` wires symlinks for *newly shipped* skills and, as of its Step 4.6, also reports any dangling ones left by a retired skill — but it never prunes them, so removal is still manual.

Running `/ft-update` surfaces dangling hits automatically; to check outside of a bump (or on a project that ran an older `/ft-update`), run the same command it uses:

```sh
# From the project root — lists symlinks whose target no longer resolves
for d in .claude .agents/skills .cursor/skills .grok/skills; do
  [ -d "$d" ] && find "$d" -type l ! -exec test -e {} \; -print
done
```

Remove each hit with `rm`. The commands are safe: these are symlinks into the submodule, never real files.

**Skills retired so far**, with what replaced them:

| Retired | Released in | Replacement |
|---|---|---|
| `ft-audit-context` | v5.29.0 | `/ft-audit context` — the same four concerns (context bloat, paste-block redundancy, `ft-*` namespace, lean-context drift — the last split into prose drift and tooling/orphans) as the eighth `passes/context.md` domain, now under `ft-audit`'s normal contract: `Finding #N` format and PLAN tickets on the write-step confirmation rather than soft prose. Thin overlays inherit it on the next bump with no action; full-copy forks get it offered by `/ft-update` Step 4.5; unforked, ask your agent to run `.flaitron/core/claude/skills/ft-audit/SKILL.md` with `context` as the domain (no placeholders, so no bootstrap). Global install, so the dangling link is in your agent home, as for `ft-flowtron` |
| `ft-flowtron` | v5.29.0 | None as a skill — the version is the `**Version:**` line at the top of `.flaitron/core/SPEC.md`, the principles are `SPEC.md` §"Core principles", and the bundled roster is `SPEC/layout.md` §"Skill namespace" (per-skill one-liners live in each `claude/skills/<slug>/SKILL.md` `description:`). It was a global install, so the dangling links are in your agent home (the `~/.claude/skills/<skill>` + `~/.claude/commands/<skill>.md` pair from §"One-time global installs"), not the project |
| `ft-stats` | v5.29.0 | None as a skill — the visualizer (`viz/`) reads `## Completed` across `PLAN.md` + `PLAN-ARCHIVE.md` and is the surviving history consumer; a one-off count is a `grep -c` on the `[model]` glyphs. `.flaitron/STATS.md` is no longer written or ignored — delete any stale copy. Global install, so the dangling link is in your agent home, as for `ft-flowtron` |
| `ft-debug` | v5.15.0 | `/ft-task <ID> --debug` — same hypothesis-first cadence, now a flag on the core runner |
| `ft-goal-task` | v5.27.0 | `/ft-task <ID> --loop` — same goal-loop contract (`SPEC/loop.md`: verify-command rule, per-cycle relevance gate, `loop-max`, `## 🔁 Iterations`), now a flag on the core runner backed by the `step-5-loop-mode.md` lazy fragment. `--worktree` was not carried over: run Phase 1, isolate per `docs/WORKTREES.md` §"Procedure", then `/ft-task <ID> --loop` in the worktree. Existing loop tasknotes (`loop: true`) resume under the flag unchanged |
| `ft-worktree-start` | v5.27.0 | None as a skill — the convention is unchanged and `docs/WORKTREES.md` §"Procedure" now carries the four start commands (`git worktree add -b wt-<ID>`, tasknote copy) with the collision check and the warn-only `blocked-by` read; run them by hand or ask your agent to |
| `ft-worktree-end` | v5.27.0 | None as a skill — `docs/WORKTREES.md` §"Procedure" carries the end commands (merged-or-explicit-discard check, archived-tasknote copy, `git worktree remove`, optional `git branch -D`) |
| `ft-spec` | v5.27.0 | None as a skill — copy `.flaitron/core/templates/spec-template.md` to `.flaitron/specs/<slug>.md` and fill its six sections by hand; when to draft one is `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)". Existing specs are plain markdown and stay where they are |
| `ft-starter-task` | v5.27.0 | `/ft-file-followup [ID] --starter` — same starter artifact (`templates/tasknote-starter-template.md`, `SPEC/starter.md` lifecycle, `/ft-task` Step 3a promotion), same PLAN pointer suffix and `chore: file <ID> starter` commit, now a flag on the follow-up filer backed by the `starter-mode.md` lazy fragment. Existing starters (`status: starter`) promote unchanged |
| `ft-sidequest` | v5.15.0 | `/ft-file-followup --park [--low\|--med\|--fut\|--high] [ID]` — same stub, priority flags, and resume-inline contract, now a flag on the follow-up filer. The `.flaitron/sidequest/` stubs and their template are unchanged; only the invocation moved, so existing parked stubs keep working |
| `ft-quality` | v5.15.0 | None; ask your agent to run lint/typecheck/tests directly, or use the project's own commands |
| `ft-audit-{backend,frontend,security,performance,docs}` | v5.15.0 | `/ft-audit <domain>` — see §1.2.1 "Migrating a pre-consolidation audit fork" |

A bump is itself a project-side task (e.g., `CORE-XXX: Bump flaitron to vX.Y.Z`), with a tasknote and the usual 4-phase flow. Don't bump in passing.

For sweeping **non-breaking** releases across the whole workspace at once, flaitron's checkout ships `tools/update-adopters.mjs` (dry-run by default; see `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" for the carve-out). It skips any repo whose release range carries real migration steps — or a tag whose notes it can't classify, which it treats as migration-bearing rather than assume safe — and flags ranges that shipped new Claude, Codex, Cursor, or Grok skill symlinks — those still go through the per-project flow above (or `/ft-update`). One breaking release is the exception: a pre-rename adopter (`.flowtron/core`) is classified `migrate` once the latest tag is v6.0.0 or later, and `--apply` performs steps 1–5 of the v6 move below in one rollback-safe local commit (it renames the submodule in place rather than re-adding it); step 6's prose sweep stays per-project.

### Upgrading an existing adopter from v5.x (`.flowtron/` → `.flaitron/`)

flaitron **v6.0.0** renames the project from flowtron, and with it the convention directory `.flowtron/` → `.flaitron/` and the repository URL. It is a hard cut: v6 skills, the visualizer, and the fleet updater read only `.flaitron/`. Fresh adopters following §1 are unaffected. An existing adopter does a one-time move when bumping to v6.0.0 — whether or not `.flowtron/core` already holds v6 (a v5 `/ft-update` can check it out; v6's `/ft-update` then stops and points here). Run from the project root, as one bump task:

1. **Drop the old submodule** (read-only upstream content — nothing project-owned lives in it):
   ```sh
   git submodule deinit -f .flowtron/core
   git rm -f .flowtron/core
   rm -rf .git/modules/.flowtron
   ```
2. **Rename the directory** (moves `PLAN.md`, `PLAN-ARCHIVE.md`, `tasknote/`, `sidequest/`, `specs/`; untracked and ignored files travel with it):
   ```sh
   git mv .flowtron .flaitron
   ```
3. **Re-add the submodule under the new name and URL, pinned to v6.0.0:**
   ```sh
   git submodule add https://github.com/fakeneuron/flaitron.git .flaitron/core
   git -C .flaitron/core checkout v6.0.0
   git add .flaitron/core
   ```
4. **Re-point the symlinks.** Every `.claude/`, `.agents/skills/`, `.cursor/skills/`, and `.grok/skills/` link into `../../.flowtron/core/...` now dangles; retarget each in place:
   ```sh
   for d in .claude .agents/skills .cursor/skills .grok/skills; do
     [ -d "$d" ] && find "$d" -type l | while IFS= read -r l; do
       t=$(readlink "$l"); case "$t" in *.flowtron*) ln -sfn "$(printf '%s' "$t" | sed 's/\.flowtron/.flaitron/g')" "$l" ;; esac
     done
   done
   ```
5. **Rewrite ignore rules** naming `.flowtron/` in any tracked `.gitignore` to `.flaitron/`.
6. **Update stray references** outside archived tasknotes (which stay as written): `AGENTS.md`, `CLAUDE.md`, active tasknotes, project docs, tool configs (e.g. a `Read(./.flowtron/core/.flowtron/**)` deny rule → `Read(./.flaitron/core/.flaitron/**)`, gitleaks/ignore-file paths, `FLOWTRON_VIZ_WORKSPACE` → `FLAITRON_VIZ_WORKSPACE`), and audit forks (full-copy and thin overlay): their frontmatter keys `flowtron-reconciled:` / `flowtron-tracks:` → `flaitron-reconciled:` / `flaitron-tracks:`, plus a thin overlay's Referenced-scaffold line `.flowtron/core/claude/skills/ft-audit/SKILL.md` → `.flaitron/core/claude/skills/ft-audit/SKILL.md`. Confirm clean: `git grep -n flowtron -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'`.
7. **Stage and commit.** Steps 1–3 staged themselves; steps 4–6 only edited the working tree, so stage them too (`git add -A` on whichever of `.claude`, `.agents`, `.cursor`, `.grok` exist, plus `.gitignore` and the files step 6 touched), then commit the move + re-pin + rewiring as a single bump task (4-phase flow per the note above).

### Upgrading an existing adopter from v4.x (`_project/` → `.flowtron/`)

> Historical recipe, kept in v5-era names. After it, continue with the v6 move above.

flowtron **v5.0.0** renames the convention directory `_project/` → `.flowtron/` (the dotfolder convention). Fresh adopters following §1 are unaffected — the steps above already use `.flowtron/`. An existing adopter pinned under the v4.x `_project/` layout does a one-time rename when bumping to v5.0.0:

1. **Rename the directory** (moves `PLAN.md`, `tasknote/`, and the submodule in one step). Git rewrites the submodule's `.gitmodules` path and `.git/config` entry:
   ```sh
   git mv _project .flowtron
   ```
2. **Rename the submodule directory** to the canonical `core` name (v4.x used `flowtron` as the submodule dirname within `_project`; after the mv above it lands at `.flowtron/flowtron`):
   ```sh
   git mv .flowtron/flowtron .flowtron/core
   ```
3. **Re-pin the submodule to v5.0.0:**
   ```sh
   git -C .flowtron/core fetch --tags
   git -C .flowtron/core checkout v5.0.0
   ```
4. **Re-run the symlink wiring.** The old `.claude/` symlinks point at `_project/flowtron/...` and now dangle — re-create them from `.flowtron/core/claude/AGENTS-snippet.md` §"One-time symlink wiring" (run from the project root).
5. **Update stray `_project/` references** in `AGENTS.md`, `CLAUDE.md`, and project docs to `.flowtron/`. Confirm clean: `grep -rn _project . --exclude-dir=.git`.
6. **Commit** the rename + re-pin + rewiring as a single bump task (4-phase flow per the note above).

## Visualizer

The flaitron visualizer is a single global instance, not a per-project install. Run it once per machine from flaitron's own checkout:

```sh
cd ~/code/flaitron/viz
npm install   # one-time
npm run dev
```

It scans `${FLAITRON_VIZ_WORKSPACE:-~/code}/*/.flaitron/PLAN.md` and renders every adopting project; the header-rail project selector swaps the active project. The header subhead shows task counts, in-progress count, and the flaitron version the selected project is using (from its `.flaitron/core/SPEC.md`). Port `5120` is pinned with `strictPort` — a second instance fails fast rather than scanning the same workspace on a different port. Set `FLAITRON_VIZ_WORKSPACE` if your projects live somewhere other than `~/code/`. Adopter-side `.flaitron/core/viz/` still works (read-only submodule, unchanged) but is no longer the recommended path.

## Common gotchas

- **Symlinks survive `git clone`.** Don't recreate them after cloning a project — they're already there.
- **The submodule is read-only in adopting projects.** Edits to flaitron itself happen in the flaitron repo; adopting projects pick them up via deliberate version bumps.
- **`/ft-task` not appearing in the menu** almost always means the symlinks are broken or the submodule isn't checked out. `readlink .claude/commands/ft-task.md` should resolve into `.flaitron/core/claude/commands/ft-task.md`.
- **Don't renumber tasks during migration.** Archived tasknotes reference the old IDs by name; renumbering silently invalidates those links.
- **Two viz instances refuse to coexist.** The dev server pins port `5120` with `strictPort`; if a second `npm run dev` errors, an instance is already running — visit it at `http://localhost:5120/`.
