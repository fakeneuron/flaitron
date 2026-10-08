# Multi-platform wiring pattern

Flaitron's contract is agent-neutral; its execution-surface wiring is
per-platform. This doc explains the two-layer model that separates them
and the symmetric plug-in pattern additional platforms follow if a
contributor ships their wiring. Today Claude Code and Codex CLI have full
wiring shipped, Cursor ships a thin sibling (`AGENTS-snippet.md` +
procedure pointer), and Grok ships the same thin shape (`AGENTS-snippet.md` +
procedure pointer) with Cursor-shaped skill discovery (`.claude/skills/` /
`.agents/skills/` / `.cursor/skills/` as compatibility surfaces, so existing
Claude, Codex, or Cursor wiring already serves Grok); other platforms drive
the contract conversationally from `AGENTS.md`.

Audience: rare. Read this when adding a new platform's wiring,
auditing the wiring layer's structure, or writing a follow-up to
[`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md).

## The two-layer model

| Layer | What it is | Where it lives | Agent-neutrality |
|---|---|---|---|
| **Contract** | The workflow spec any AI can follow conversationally — relevance gate, 4-phase tasknote lifecycle, post-closure protocol, versioning rules. | `SPEC.md`, `SPEC/` (including `SPEC/procedures/` for agent-neutral execution SOPs), `templates/`, `docs/`, `README.md`, `SECURITY.md`, and the `AGENTS.md` paste-block. | Mandatory. Any AI reading `AGENTS.md` should be able to execute the contract without platform-specific machinery. |
| **Wiring** | The platform-specific execution surface — slash commands, skills, structured-ask primitives, operator flags, install/symlink mechanics. | `claude/` and `codex/` today (full bundles); `cursor/` and `grok/` ship a thin snippet + procedure pointer (Grok also loads `.claude/skills/` / `.agents/skills/` / `.cursor/skills/` as documented compatibility surfaces); future full bundles use sibling top-level dirs per the plug-in pattern below. | Per-platform. Constraints documented in [`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md). |

The split is non-negotiable: leaking platform-specific assumptions into
the contract layer fails [[CORE-154.1]] Constitution principle 1 (the
[`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md) ledger records the
intentional load-bearing locators that may *reference* the Claude Code
wiring but don't *depend* on it for contract semantics).

## Today's surface

| Platform | How it consumes flaitron | What ships in this repo |
|---|---|---|
| **Claude Code** | Wiring layer + contract layer. Six tasknote skills (`/ft-task` — which carries debug mode behind `--debug` and loop mode behind `--loop` — `/ft-micro-task`, `/ft-file-followup` (which carries park mode behind `--park` and starter mode behind `--starter`), `/ft-epic-discovery`, `/ft-close-epic`, `/ft-refactor`) drive the SPEC's 4-phase workflow inline; the parameterized `/ft-audit <domain>` skill runs the 5-pass recipe over eight domains and `/ft-audit-repo` runs the first-contact holistic recipe; standalone skills `/ft-new-project`, `/ft-release`, `/ft-seed`, `/ft-update` follow their own recipes. | `claude/` — `AGENTS-snippet.md` + `commands/*.md` + `skills/*/SKILL.md` (+ lazy fragments). Adopter installs follow the subset policy below and the executable commands in `claude/AGENTS-snippet.md` §"One-time symlink wiring". |
| **Codex CLI** | Wiring layer + contract layer. Codex consumes the same `AGENTS.md` paste-block, then exposes the adopter subset as repo-scoped skills. `ft-task` routes through the agent-neutral SOP; the other shipped wrappers route to the canonical skill bodies with Codex primitive translation. Those bodies' trailing operator flags come with them — see §"Non-Claude capability triggers". | `codex/` — `AGENTS-snippet.md` + `skills/*/SKILL.md` wrappers, plus the retained `procedures/ft-task.md` pointer. Adopter installs follow the subset policy below and the executable commands in `codex/AGENTS-snippet.md`; Codex invocation is via `/skills` or `$ft-task` / `$ft-update`, not arbitrary custom `/ft-*` CLI commands. |
| **Cursor** | Wiring layer + contract layer (thin). Cursor reads `AGENTS.md` and discovers skills from `.cursor/skills/`, `.agents/skills/`, and `.claude/skills/` (compat). No Cursor-specific skill wrappers ship — adopters wire the canonical `claude/skills/` bodies. | `cursor/` — `AGENTS-snippet.md` + `procedures/ft-task.md` pointer only. If the project is already wired for Claude Code, it is already wired for Cursor; Cursor-only projects follow the `.cursor/skills/` block in `cursor/AGENTS-snippet.md`. |
| **Grok Build** | Wiring layer + contract layer (thin, Cursor-shaped). Grok reads `AGENTS.md` and discovers skills from `.grok/skills/` (native), `.claude/skills/` (Claude compat, default on), `.cursor/skills/` (Cursor compat, default on), and `.agents/skills/` at each tier. No Grok-specific skill wrappers ship — adopters reuse the canonical `claude/skills/` bodies already wired for Claude, Codex, or Cursor. Those bodies' trailing operator flags come with them — see §"Non-Claude capability triggers". | `grok/` — `AGENTS-snippet.md` + `procedures/ft-task.md` pointer only. If the project is already wired for Claude Code, Codex, or Cursor, it is already wired for Grok; Grok-only projects follow the `.grok/skills/` block in `grok/AGENTS-snippet.md`. For Grok Build adoption specifics, see §"Grok Build adoption notes" below. |
| **Sourcegraph Amp, Aider, Gemini CLI** | Contract layer only. The platform reads `AGENTS.md`, sees flaitron's paste-block, and drives the contract conversationally — relevance gate, phase boundaries, post-closure protocol all live in `SPEC.md`. No full platform-specific skill bundle required. | Adopters paste the `AGENTS.md` block from `claude/AGENTS-snippet.md` §"Block to paste into AGENTS.md"; that block is agent-neutral by design. |

A platform doesn't need its own wiring to be useful. Most adopters paste
the `AGENTS.md` block and drive conversationally. Wiring is an *optional
uplift* that adds slash-command ergonomics — relevant only when the
platform offers a skill/command primitive and a contributor wants to
expose flaitron through it.

For the at-a-glance per-agent view — consume-mode, context entry-point,
skill/command primitive, and how current each row is — see the living
matrix in [`AGENT-COMPAT.md`](AGENT-COMPAT.md). This doc owns the
*structural* model; AGENT-COMPAT.md is its *capability/currency*
companion and references the table above rather than re-deriving it.

## Installed-surface policy

Four terms keep the wiring docs precise:

- **Shipped inventory** — the upstream files flaitron publishes under a
  platform directory (`claude/`, `codex/`). This can be broader than what an
  adopter installs into a project.
- **Adopter-installed subset** — symlinks or copies that belong in an adopting
  project's repo-scoped wiring directory, pinned through `.flaitron/core/`.
- **Global-only utilities** — machine-local skills used before a project is
  wired, across many projects, or while maintaining flaitron itself. These live
  under the user's agent home (`~/.claude/skills`, `~/.agents/skills`, or the
  platform equivalent), not in every adopter repo.
- **Flaitron-self-only skills** — upstream maintenance skills that must not be
  installed in adopter projects. They may still ship in the upstream inventory
  so flaitron can dogfood them under that platform.

Canonical policy:

| Surface | Shipped inventory | Adopter-installed subset | Global-only utilities | Flaitron-self-only |
|---|---|---|---|---|
| **Claude Code** | Full `ft-*` command + skill inventory under `claude/commands/` and `claude/skills/`. | The tasknote execution family (`ft-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic`, `ft-refactor`), `ft-seed`, and `ft-update`. The `ft-audit` scaffold is forked/overlaid locally under an unprefixed name, not symlinked as an upstream `ft-*` project skill. | `ft-new-project` and `ft-audit-repo`. | `ft-release`. |
| **Codex CLI** | Full `ft-*` wrapper inventory under `codex/skills/`, kept in parity with Claude's shipped skill slugs. | Same policy as Claude, translated to `.agents/skills/`: tasknote execution family (including `ft-refactor`), `ft-seed`, and `ft-update`. Focused audits remain fork/overlay surfaces rather than verbatim upstream project symlinks. | Same utility set as Claude, installed in Codex's user skill directory when desired. | `ft-release`. |
| **Cursor** | Thin bundle: `cursor/AGENTS-snippet.md` + `cursor/procedures/ft-task.md` only — no `cursor/skills/` wrappers. | Same adopter subset as Claude, targeting either existing `.claude/skills/` (Cursor compat load — preferred when Claude is already wired) or `.cursor/skills/` for Cursor-only projects, always symlinking canonical `claude/skills/` bodies. | Same utility set as Claude, installed in Cursor's user skill directory when desired. | N/A — no Cursor `ft-release` surface. |
| **Grok Build** | Thin bundle: `grok/AGENTS-snippet.md` + `grok/procedures/ft-task.md` only — no `grok/skills/` wrappers. | Same adopter subset as Claude, targeting existing `.claude/skills/` (Grok Claude-compat — preferred when Claude is already wired), `.agents/skills/` (when Codex is already wired), or `.cursor/skills/` (when Cursor-only is already wired). Grok-only projects symlink the same canonical `claude/skills/` bodies into `.grok/skills/` (native) per `grok/AGENTS-snippet.md`. | Same utility set as Claude, installed in `~/.grok/skills/` when desired. | N/A — no Grok `ft-release` surface. |

The distinction is deliberate. Shipping a wrapper means flaitron can maintain,
test, and dogfood a platform-equivalent recipe; it does not automatically mean
every adopting project should expose that recipe as repo-scoped wiring. The
per-platform `AGENTS-snippet.md` files are the executable install source and
must be kept aligned to this policy. Release guardrails verifying these
surfaces stay aligned ship in `/ft-release` §7.1's installed-surface check
([[CORE-349.5]]).

**Flaitron's own checkout is not an adopter.** The adopter-installed subset
above governs projects that consume flaitron through `.flaitron/core/`. Flaitron
itself dogfoods everything it ships, so its repo-scoped `.claude/skills/` and
`.claude/commands/` mirror the **full** shipped inventory one-for-one —
including the global-only utilities, `ft-release`, and `ft-update` (adopter-only
and bails immediately here, but a no-op *wiring miss* would be its absence, not
its presence). A shipped `ft-*` slug with no `.claude/` symlink is a wiring
miss, not a policy choice; that is the exact gap that left `/ft-spec`
unrunnable in flaitron's own checkout for a month after it shipped. Machine-global `~/.claude/` installs stay discretionary per
[`MIGRATION.md`](MIGRATION.md) §1.0 — but *discretionary* governs **which**
utilities you install, not how many copies of a slug exist; see the rule below.
Broken links, mis-cased links, and slugs beyond the global-only utilities are drift
there. `/ft-release` §7.1 verifies both surfaces.

### One canonical install path per project

The categories above say *which* skills install where. This says **how many
times**: once. Repo-scoped wiring is canonical — the copy that should run is the
one wired into the project you are working in, whether that is an adopter's
`.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.grok/skills/`
pinned through `.flaitron/core/`, or flaitron's own full mirror. An agent home
(`~/.claude/skills`, `~/.agents/skills`, `~/.grok/skills`, or the platform
equivalent) therefore carries **only the global-only utilities**. The
adopter-installed subset and `ft-release` are never installed globally, because
every repo that can use them already wires them repo-scoped.

Two agent behaviours make this a correctness rule rather than tidiness:

- **Project scope and user scope can enumerate separately.** A slug present in
  both may be listed twice in the session's skill roster. Globbing the shipped
  inventory into an agent home *and* wiring it repo-scoped can double flaitron's
  footprint before any work starts — measured at 36 roster
  entries for 18 skills in a flaitron-self session (measured 2026-08-11,
  [[CORE-439]]; the shipped inventory has changed since — the doubling is the
  point, not the absolute count). Codex CLI 0.159.2's `skills/list` collapsed
  two same-target utility copies in a later installation check; that does not
  establish distinct-body precedence or interactive-selector behavior. See
  [CODEX-VERIFICATION.md](CODEX-VERIFICATION.md#before-and-after) for the receipt.
- **User-scope collisions resolve by slug, not by body.** Where an agent reads
  more than one home directory, a same-named skill in one shadows the other with
  no regard for which platform authored it. `~/.agents/skills/` is read by Codex,
  Claude Code, Cursor, and Grok alike, so a globally installed `codex/skills/`
  wrapper can be served to an agent it was not written for — and those wrappers
  carry Codex-specific routing and translation instructions that belong to
  that runtime. Install Codex wrappers in an agent home
  only on a machine where Codex is the driver, and only the utility set.

**The skill/pin guard** ([[CORE-729]]). The shadowing is also a version
hazard. Whether or not the roster lists the slug twice, invoking it ran the
user-scope body: a flaitron-self session wired both ways loaded
`~/.claude/skills/ft-task` (one observation, Claude Code, 2026-10-07).
So an agent-home body runs in an adopter while its Step 0 still resolves
`<root>` to the pinned `.flaitron/core/`, and one flaitron version reads
another's fragments: since [[CORE-724.4]] `/ft-task` reads `preamble.md`, which
v6.0.0 lacks. Each adopter-subset Claude body that resolves `<root>` therefore
stops with `⛔ skill/pin mismatch` when the runtime names its base directory
outside the adopter project, or when a fragment, SPEC module, or template it
names is absent. The base-directory check also catches unreleased drift. A
version-number guard would miss it, because a working tree keeps its last
release's `**Version:**` line. Where the runtime names no base directory, only a
missing file trips the guard: a pinned file that exists but has changed meaning
passes. Agent-home copies made before the guard carry no guard at all.
`/ft-update` Step 4.7 reports agent-home copies of adopter-subset slugs (it asks
first), and `/ft-release` §7.1 reports any `ft-*` slug beyond the global-only
utilities in the three homes it scans on the maintainer's machine, at each cut where the operator approves
the read ([[CORE-730]]). Removing them
is the operator's act.

The rule binds new platform wiring too: a platform's `AGENTS-snippet.md` adds a
repo-scoped install path, not another global one.

## The symmetric plug-in pattern

When a contributor ships wiring for a new platform (`codex`, `grok`,
`cursor`, …), it lands as a **sibling top-level directory** at the
repo root, named after the platform:

```text
flaitron/
├── claude/         # Claude Code wiring
├── codex/          # Codex skill wrappers + ft-task procedure pointer
├── grok/           # Grok thin wiring (snippet + ft-task procedure pointer; Cursor-shaped compat)
└── cursor/         # Cursor thin wiring (snippet + ft-task procedure pointer)
```

The structural decision is locked at [[CORE-154.3]]: no parent
`wiring/` dir, no rename of `claude/`. Adopter symlinks point at
`../../.flaitron/core/claude/...` (`.flowtron/core/` before v6.0.0) —
the `claude/` segment's stability is a non-negotiable per [[CORE-154.1]]
Constitution; v6.0.0's one-time prefix rename is migrated by
`docs/UPGRADING.md` §"Upgrading an existing adopter from v5.x".

### Naming conventions

- **Directory name**: lowercase platform identifier, matching how the
  platform is conventionally referenced — `claude` (Claude Code),
  `codex` (OpenAI Codex CLI), `grok` (grok-cli), `cursor` (Cursor IDE),
  `aider` (Aider), `amp` (Sourcegraph Amp).
- **Skill prefix**: the `ft-` namespace stays reserved across platforms
  per `SPEC/layout.md` §"Skill namespace". A platform's skill bundle uses the same
  `ft-<name>` slugs as Claude Code (e.g., `ft-task`, `ft-micro-task`),
  even if file extensions or formats differ. Adopters wiring multiple
  platforms then have semantically equivalent commands across them.
- **Adopter install location**: each platform decides. Claude Code uses
  `.claude/commands/` + `.claude/skills/` (the platform's own
  convention); other platforms use their own.

### Hard constraints

- **Don't rename `claude/`.** Adopter symlinks depend on path stability.
- **Don't move the `AGENTS.md` paste-block out of agent-neutral
  framing.** The paste-block in `claude/AGENTS-snippet.md` §"Block to
  paste into AGENTS.md" is agent-neutral — it lives under `claude/`
  for historical / single-source-of-truth reasons, not because it's
  Claude-specific. Sharing this content across platforms is the
  default; see §"Single-source-of-truth posture" below.
- **Don't leak platform-specific terms into the contract layer.** Any
  new platform wiring documents itself in its own dir and (if needed)
  in this doc; SPEC/, templates/, and the agent-neutral docs stay
  clean. The [`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md) ledger is the
  audit reference.
- **Don't add a CLI / daemon / validator.** Per [`PHILOSOPHY.md`](PHILOSOPHY.md)'s
  "Zero scripts" principle — wiring is markdown + the platform's own primitives.

## Minimal scaffold sketch

A new platform's wiring directory follows this shape. This is an
example, not a `templates/` artifact — every speculative file extension
depends on the target platform's skill/command format, so concrete
template files would have to guess. The shape below is the contract.

```text
<platform>/
├── AGENTS-snippet.md                       # Adopter-facing paste-block + wiring commands
├── commands/                               # Slash-command-equivalent entry points (if the platform supports them)
│   ├── ft-task.<ext>
│   ├── ft-micro-task.<ext>
│   ├── ft-file-followup.<ext>
│   ├── ft-epic-discovery.<ext>
│   └── ft-close-epic.<ext>
└── skills/                                 # Skill bodies (each in its own dir)
    ├── ft-task/
    │   └── SKILL.<ext>
    ├── ft-micro-task/
    │   └── SKILL.<ext>
    └── ...
```

`<ext>` is whatever the target platform's skill format demands —
markdown for Claude Code (`.md`), platform-specific for others. The
naming convention (`ft-<name>`) stays constant; the contents adapt.

### What the `<PLATFORM>`-snippet must contain

Sectioned like `claude/AGENTS-snippet.md`:

1. **Block to paste into `AGENTS.md`** — the agent-neutral workflow
   block. By default, share the canonical text from
   `claude/AGENTS-snippet.md`; only duplicate if the new platform
   genuinely needs different paste-block content (which would
   defeat `AGENTS.md`'s open-standard purpose — surface the
   divergence in this doc if it happens).
2. **One-time wiring commands** — how an adopter installs the skill
   bundle under the platform's own convention. For Claude Code these
   are relative symlinks; for another platform they might be
   `cp` / `install` / a platform-specific registration command.
   Alongside them, one line telling the adopter to keep the
   submodule's dogfood archive (`.flaitron/core/.flaitron/`) out of
   the platform's search and context tooling: sparse-checkout first,
   then, as the fallback, that platform's ignore mechanism, pointing at
   `docs/MIGRATION.md` §1.1 for both (per [[CORE-632.3]],
   [[CORE-735.4]]).
3. **Pinning notes** — how the platform's wiring tracks the
   submodule's pinned flaitron commit. Symlinks track automatically;
   copies need re-copying on bump; other mechanisms documented inline.

### Single-source-of-truth posture

Per [[CORE-091]]: each platform's `AGENTS-snippet.md` is the **sole**
source of truth for that platform's wiring commands.
[`MIGRATION.md`](MIGRATION.md) and any platform-specific adoption guide
point at the snippet; they don't duplicate the commands.

For the `AGENTS.md` paste-block itself: today the canonical text lives
in `claude/AGENTS-snippet.md` §"Block to paste into AGENTS.md". A new
platform's snippet should reference this single source rather than
duplicate the block, unless platform-specific content requires
divergence (and divergence is documented here).

### Mandatory vs. optional reference

| Surface | Status | Notes |
|---|---|---|
| `AGENTS.md` paste-block visible to the platform | **Mandatory** | The contract entry-point. Without this, the AI has no flaitron context. |
| `<platform>/AGENTS-snippet.md` (or equivalent adopter-facing doc) | Strongly recommended | Adopters need a single canonical doc for the wiring commands. |
| `<platform>/commands/` + `<platform>/skills/` | Optional | A platform without its own command/skill *wrappers* can still ship a thin snippet that points adopters at another platform's canonical bodies (Cursor, Grok) or run flaitron conversationally (Amp / Aider / Gemini CLI today). Grok Build is Cursor-shaped: it loads those bodies from `.claude/skills/` / `.agents/skills/` / `.cursor/skills/` without its own wrappers, and Grok-only projects follow `grok/AGENTS-snippet.md`. Codex uses `skills/` only because its documented reusable workflow primitive is skills selected via `/skills` or `$name`, not arbitrary custom slash commands. |
| Operator force-skip flag (e.g., `--fast`) | Optional | Mirror SPEC §"Operator-gate cues" in the platform's flag syntax if convenient. Concept is platform-neutral; syntax is wiring detail. |
| Install/symlink mechanism | Optional | Depends on the platform's skill-consumption model. Claude Code uses relative symlinks; others may use copies or registry calls. |
| `/ft-release` skill equivalent | Flaitron-self only | Release-cutting is only relevant if the platform is being used to maintain flaitron upstream. Skip in adopter contexts. |

## Worked example: Claude Code

Concrete instantiation:

- **Sibling dir**: `claude/` at the repo root
- **Adopter-facing snippet**: `claude/AGENTS-snippet.md`
- **`commands/`**: 12 `.md` slash-command stubs (`ft-task.md`,
  `ft-micro-task.md`, `ft-file-followup.md`,
  `ft-epic-discovery.md`, `ft-close-epic.md`, `ft-refactor.md`, the two `ft-audit`-family skills (`ft-audit.md`, `ft-audit-repo.md`),
  plus `ft-new-project.md`, `ft-release.md`, `ft-seed.md`, `ft-update.md`)
- **`skills/`**: 12 `SKILL.md` skill bodies (one per command), some with
  lazy-load fragments (`ft-task/step-*.md`, including `step-4-debug-mode.md` and `step-5-loop-mode.md`; `ft-file-followup/step-0-flags.md`, `park-mode.md` and `starter-mode.md`; `ft-audit/scaffold-bootstrap.md`), the every-run shared `ft-task/preamble.md`, or sibling libraries (`ft-audit/passes/*.md`)
- **Adopter install**: relative symlinks for the adopter-installed subset from
  `.claude/commands/*` and `.claude/skills/*` into the submodule, per
  `claude/AGENTS-snippet.md` §"One-time symlink wiring". The relative
  paths survive `git clone` and pin to whichever flaitron commit the
  submodule is checked out at.
- **Operator flags**: canonical roster, per-flag syntax, gate behavior, and
  when to reach for each in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md)
  §"The triggers" — these flags are Claude-native, so this worked example is
  their home, not a mirror

[`MIGRATION.md`](MIGRATION.md) is the full Claude Code adoption guide —
fresh adoption (§1), heavy migration with full archive lift (§2), and
lightweight migration with active-queue-only lift (§3). Sibling platform
guides mirror this shape only where their own install primitive differs
and reference `MIGRATION.md` for the parts that stay agent-neutral
(submodule pinning, AGENTS.md paste, PLAN.md shape).

## Worked example: Codex CLI

Concrete instantiation:

- **Sibling dir**: `codex/` at the repo root
- **Adopter-facing snippet**: `codex/AGENTS-snippet.md`
- **`skills/`**: 12 `SKILL.md` wrappers, one per Claude `ft-*` skill slug.
  Each keeps short Codex-native metadata, then routes to the agent-neutral SOP
  (`ft-task`) or the canonical Claude skill body, applying the Codex primitive
  translation rules that live once in `codex/AGENTS-snippet.md`
  §"Translation rules" (CORE-465 folded them out of the wrapper bodies).
- **`procedures/`**: `ft-task.md` retained as a contract-only pointer for
  agents/operators that ask to load the SOP directly.
- **Adopter install**: relative symlinks for the adopter-installed subset from
  `.agents/skills/*` into the submodule, per `codex/AGENTS-snippet.md`
  §"One-time skill wiring". The relative paths survive `git clone` and pin to
  whichever flaitron commit the submodule is checked out at.
- **Invocation**: Codex exposes skills through `/skills` selection and
  `$ft-task` / `$ft-update` style mentions. Flaitron preserves the same
  exported `ft-*` names, but does not claim Codex supports arbitrary custom
  `/ft-*` slash commands.
- **Operator flags**: same spellings as the canonical skill bodies the wrappers
  route to (no Codex-specific translation layer for the flags themselves) —
  flag semantics in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md#the-triggers), and
  `ft-task`'s SOP-first routing in §"Non-Claude capability triggers" below

## Worked example: Cursor

Concrete instantiation of the thin-bundle shape:

- **Sibling dir**: `cursor/` at the repo root
- **Adopter-facing snippet**: `cursor/AGENTS-snippet.md`
- **No `commands/` or `skills/` wrappers** — Cursor loads `.claude/skills/`
  as a compatibility surface and discovers `.cursor/skills/` / `.agents/skills/`
  natively; adopters symlink the canonical `claude/skills/` bodies
- **Procedure pointer**: `cursor/procedures/ft-task.md` routes to
  `SPEC/procedures/ft-task.md`
- **Adopter install**: if Claude `.claude/` wiring already exists, stop —
  Cursor is already served. Cursor-only projects run the `.cursor/skills/`
  block in `cursor/AGENTS-snippet.md` §"One-time symlink wiring"
- **Operator flags**: same spellings as the Claude skill bodies they invoke (no
  Cursor-specific translation layer) — flag semantics in
  [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md#the-triggers)

## Worked example: Grok Build

Concrete instantiation of the thin-bundle shape (Cursor-shaped discovery):

- **Sibling dir**: `grok/` at the repo root
- **Adopter-facing snippet**: `grok/AGENTS-snippet.md`
- **No `commands/` or `skills/` wrappers** — Grok loads `.claude/skills/`
  (and `.claude/commands/`) as a Claude compatibility surface (default on),
  `.cursor/skills/` as Cursor compat (default on), and `.agents/skills/` at
  each tier; Grok-only projects symlink the canonical `claude/skills/` bodies
  into `.grok/skills/`
- **Procedure pointer**: `grok/procedures/ft-task.md` routes to
  `SPEC/procedures/ft-task.md`
- **Adopter install**: if Claude `.claude/`, Codex `.agents/skills/`, or
  Cursor `.cursor/skills/` wiring already exists, stop — Grok is already
  served. Grok-only projects run the `.grok/skills/` block in
  `grok/AGENTS-snippet.md` §"One-time symlink wiring"
- **Operator flags**: same spellings as the Claude skill bodies they invoke (no
  Grok-specific translation layer) — flag semantics in
  [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md#the-triggers)

## Grok Build adoption notes

xAI's [Grok Build](https://x.ai/cli) CLI (launched May 2026) adopts
flaitron via a **Cursor-shaped thin path**: it reads `AGENTS.md` and
discovers skills from `.claude/skills/` and `.agents/skills/` as
compatibility surfaces (plus `.cursor/skills/` and native `.grok/skills/`),
so a project already wired for Claude Code, Codex, or Cursor is already
wired for Grok. Thin wiring ships under `grok/` (`AGENTS-snippet.md` +
`procedures/ft-task.md`; CORE-271.4 pointer, CORE-456.3 snippet); no
Grok-specific skill wrappers exist. Adopters paste the `AGENTS.md` block
per [`MIGRATION.md`](MIGRATION.md) §1.3. Amp / Aider / Gemini CLI remain
the contract-layer-only path (see §"Today's surface").

| Quirk | Behavior | Flaitron implication |
|---|---|---|
| **Context-load semantics** | Grok Build reads three context files: `AGENTS.md` (open standard), `CLAUDE.md` (Anthropic-popularized; Grok-compat fallback), and `GROK.md` (Grok-canonical, at `.grok/GROK.md` with cwd walk-up + `~/.grok/GROK.md` global fallback) | Use `AGENTS.md` — already the paste-block target and the cross-vendor canonical entry point. `GROK.md` is orthogonal to flaitron. |
| **AGENTS.md visibility** | Grok Build "picks up AGENTS.md before it does anything" per xAI launch coverage — same load-before-act semantic as Claude Code | Paste-block is visible without configuration; no truncation noted in launch narratives |
| **Skill / command primitives** | Native: `.grok/skills/<name>/` (cwd-walk to repo root) + `~/.grok/skills/` + plugin paths + `[skills] paths` in `~/.grok/config.toml`. Compat (default on): `.claude/skills/` / `.claude/commands/`, `.cursor/skills/`, and `.agents/skills/` at each tier. Skill bodies are markdown; user-invocable skills auto-wire as `/<skill-name>` slash commands | If Claude, Codex, or Cursor is already wired, Grok is already served — no second install. Grok-only projects follow `grok/AGENTS-snippet.md` §"One-time symlink wiring". The `ft-` namespace per `SPEC/layout.md` §"Skill namespace" reserves skill names cross-platform. Those bodies' trailing operator flags are available as soon as they load — see §"Non-Claude capability triggers". |

First-use verification 2026-06-01 (CORE-257 cue dogfood under Grok 4.3 interactive CLI). /ft-task + full 4-phase flow + AskUserQuestion structured prompt all rendered and executed successfully. Structured ask primitive observed to work (divergence from launch-coverage assumption in the triggers table below); other details matched. See docs/AGENT-COMPAT.md for the canonical matrix row currency. Sub-agent / `/model` / `/clear` rows refreshed 2026-08-20 (CORE-458), cross-referencing the native `spawn_subagent` tool observed under a Grok 4.6 session (CORE-456.N) against public vendor docs (`docs.x.ai/build/modes-and-commands`; `xai-org/grok-build` `docs/user-guide/16-subagents.md`). CORE-679.2 (2026-10-02) rewrote the Sub-agent row to the live tool parameters `prompt`, `description`, `background`, `isolation`, `resume_from`, and `cwd` (the public guide's spawn table names `background` as `run_in_background`). `subagent_type` is not a parameter on this tool; a probe is read-only only when the prompt says so.

## Platform×model×effort calibration table

The tier bands in [`SPEC/model.md`](../SPEC/model.md) §"Category-vs-concrete
matching" are calibrated against real vendor rosters. This section is the
**maintained cross-provider reference** — refreshed at releases (the release
cut's `/ft-audit docs` subroutine surfaces a stale table via the dated as-of
stamps below) and stamped with its as-of dates. It holds two tables. The
**tier × platform map** answers "which `model @ effort` should run a task of
this tier here" — the cells a next-move suggestion or an orchestrator prints,
per `SPEC/model.md` §"Effort recommendations". The **family roster** answers
"what is this session actually running, at what effort" as a tier band — it
*calibrates* the Step 1.5 self-assessment; it never replaces it, and the gate
still requires no lookup. Roster rows stay family-level tokens per
`SPEC/model.md` §"Effort axis"; map cells name the model to run. The `@ effort`
/ `@effort` notation below is prose shorthand for "this model at that effort
setting", never a PLAN.md token shape. It lives here
rather than in the contract because its cells are dated vendor facts, not
workflow rules.

### Tier × platform map

**As of 2026-10-08:**

| Tier | Claude Code | Codex | Grok Build |
|---|---|---|---|
| `[light]`🔧 | Sonnet @ medium–high | Sol @ medium–high (alt Luna @ high) | Grok @ medium–high |
| `[medium]`🧩 | Opus @ medium (alt Sonnet @ high) | Sol @ high (alt Astra @ medium) | Grok @ high |
| `[heavy]`🧠 | Opus @ high | Astra @ high | Grok @ xhigh |
| `[frontier]`💎 | Fable @ high–xhigh | Astra @ xhigh | ⚠️ Grok @ xhigh — no frontier model |
| `[xheavy]`🔭 | manual-only | manual-only | manual-only |

Cells name only `medium`, `high`, or `xhigh`, and each reaches its model's
vendor default or start setting; on a range, take the upper end when in doubt
(`SPEC/model.md` §"Effort recommendations"). **⚠️ Grok has no frontier-band
model:** Grok 4.7 is xAI's top model, so `[frontier]` work on Grok Build runs
at the heavy-band cell and lands the gate's under-tier advisory — suggest
switching to Claude Code (Fable) or Codex (Astra @ xhigh). Advice, never a
block. Codex/Grok cells verified 2026-10-08 against `learn.chatgpt.com/docs/models`
(Astra starts at Light, Luna at High, Sol at the client default) and
`docs.x.ai/docs/guides/reasoning` + `docs.x.ai/docs/models` (grok-4.7 default
`high`; no model above it); Claude Code cells carry the family roster's
2026-10-02 verification. `[xheavy]` names no cell: the rung is
operator-filed and never chooser-assigned (`SPEC/model.md`
§"Category-vs-concrete matching", "The `xheavy` rung is manual-only") —
operators typically run it on Fable @ xhigh.

### Family roster

**As of 2026-10-02** (full table; 2026-10-08 per [[CORE-741.3]]: `fable` re-banded frontier per [[CORE-741.2]], the `gpt-5` / `codex` Astra equivalences, and the Codex Ultra fact):

| Platform | Token | Current roster (top of family) | Effort ladder | Band at default effort | Effort-shifted equivalences |
|---|---|---|---|---|---|
| Anthropic | `fable` | Fable 5.1 (`mythos` 5.1 limited-access sibling; Fable 5 prior) | `low`/`medium`/`high`/`xhigh`/`max` (default `high`; `xhigh`/`max` is the step-up for the hardest agentic work) | frontier | frontier at the default; `fable@xhigh` is the step-up for the hardest frontier work |
| Anthropic | `opus` | Opus 5.5 (Opus 5 prior; 4.8 / 4.7 supported) | `low`/`medium`/`high`/`xhigh`/`max` (default `medium`; Opus 5 and earlier default `high`) | heavy | `opus@low` ≈ medium-band throughput work |
| Anthropic | `sonnet` | Sonnet 5.5 (Sonnet 5 prior) | `low`/`medium`/`high`/`xhigh`/`max` (default `high`) | medium | `sonnet@xhigh`–`@max` ≈ heavy-band |
| OpenAI | `gpt-5` | GPT-6 Astra flagship · GPT-6.1 Sol workhorse (+ Luna) | `low`/`medium`/`high`/`xhigh`/`max` (Sol default `medium`; Astra and Sol have no `none`) | heavy (Astra) · medium (Sol) · light (Luna) | `astra@xhigh` ≈ frontier-band (no model above it); `sol@xhigh`–`@max` ≈ heavy-band |
| OpenAI | `codex` | GPT-6 Astra in Codex (GPT-5.3 Codex prior) | `low`/`medium`/`high`/`xhigh`/`max` (app Light = `low`; no `minimal`; the app also offers Ultra, which fans out to subagents) | medium at Astra's recommended Light or Sol's `medium` default | Astra `@high` ≈ heavy-band; Astra `@xhigh` ≈ frontier-band (no model above it); Sol `@xhigh`–`@max` ≈ heavy-band |
| xAI | `grok` | Grok 4.7 (default; `grok-4.7-build-fast` fast sibling) | `low`/`medium`/`high`/`xhigh` (default `high`; `xhigh` since 4.6, earlier 4.x treat it as `high`) | medium | `grok@xhigh` ≈ heavy-band |
| Google | `gemini-pro` | Gemini 3.1 Pro preview (Deep Think mode above it) | `thinking_level` `low`/`medium`/`high` (default `high`) | heavy | `gemini-pro@low` ≈ medium-band |
| Google | `gemini-flash` | Gemini 3.8 Flash (3.7 prior; Flash-Lite below) | `thinking_level` `low`/`medium`/`high` (default `medium`) | medium (Flash) · light (Flash-Lite) | `gemini-flash@high` ≈ upper medium-band |

A row's "band at default effort" is what the Step 1.5 gate should read for
that family absent other signal; the equivalences column is the effort axis in
action — the same token earning a different band when the session runs it at a
non-default effort setting.

**Observed usage (dated, moved from `SPEC/model.md`).** Families differ in
cost/quality curves on long context and sustained reasoning. Opus sessions
have benefited from `[heavy]` on extended explorations where context retention
across many turns matters; Grok 4.x (2026-05) stayed effective and low-drift
across `[light]` / `[medium]` for most well-scoped implementation, even when
the initial description sounded moderately complex. The Sonnet 5 generation
narrowed the gap to `heavy` substantially on coding and agentic work; its row
stays `medium` on purpose, per `SPEC/model.md` §"Category-vs-concrete matching".
Observations, not bands — the rows above govern.

## Non-Claude capability triggers

_Mirrors the per-trigger shape in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md) —
**what it is · syntax · what it controls in flaitron · when to reach for it** — for the
non-Claude agents in the matrix. Flaitron has not run a session under several
of these agents. Grok Build, Codex CLI, and Cursor now carry
first-use observations; remaining stub rows reflect vendor documentation and
launch coverage. Update a row on first-use observation if anything diverges.
This mirrors the pre-adoption framing in §"Grok Build adoption notes" above.
Operator flags are the exception to the shape: each table carries one
skill-body-flags row that points at `claude/CAPABILITIES.md` and states only
that platform's routing. Do not add per-flag rows back (CORE-734.6)._

### Grok Build

| Trigger | Syntax | What it controls in flaitron | When to reach for it |
|---|---|---|---|
| **Effort / thinking level** | A `reasoning_effort` (Chat Completions) / `reasoning.effort` (Responses API) parameter — `low` / `medium` / `high` / `xhigh` (default `high`; `xhigh` since 4.6, earlier 4.x treat it as `high`). | Maps to the `[heavy]` / `[medium]` / `[light]` / `[frontier]` PLAN-line tokens through the Grok Build column of §"Tier × platform map" (no frontier-band model: `[frontier]` runs at Grok @ xhigh with the ⚠️ switch advice). Heavier reasoning suits Discovery-heavy or cross-cutting tasknotes; lighter suits mechanical edits. | Match the running effort level to the task's `[model]` token. Switch before invoking the skill if the task's `[model]` differs from the current session's effort setting. |
| **Skill invocation** | `/ft-task` (and peer `/ft-*`) after wiring — Grok auto-exposes skills as slash commands. Discovery paths: `.grok/skills/` (native); `.claude/skills/` and `.claude/commands/` (Claude compat, default on); `.cursor/skills/` (Cursor compat, default on); `.agents/skills/` at each tier. | Drives the full 4-phase tasknote runner and peer skills from the same canonical `claude/skills/` bodies Claude Code uses — no Grok-specific wrappers. | Normal flaitron operations under Grok. Prefer repo-scoped wiring; if Claude `.claude/`, Codex `.agents/skills/`, or Cursor `.cursor/skills/` is already present, stop — Grok is already served. Grok-only projects follow `grok/AGENTS-snippet.md`. |
| **Skill-body flags** | Trailing tokens on the skill invocation, same spelling as Claude Code. Each flag and its lazy fragments live in the canonical body Grok loaded (`.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.grok/skills/`), and Grok resolves them relative to that body. There are no Grok-specific wrappers. | Every operator flag in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md#the-triggers) §"The triggers", which owns each flag's semantics, composition rules, and gate effects; they are not restated here. | As that file's row for the flag says. This platform adds no flag of its own and drops none. A platform-native control a flag leans on, such as `--deep`'s structured asks, follows this table's own row for it. |
| **Model / session switch** | In-session `/model <name>` (alias `/m`) switches the active model without restarting the session (`docs.x.ai/build/modes-and-commands`). | Ensures the task runs at its assigned `[heavy]` / `[medium]` / `[light]` / `[frontier]` depth. The post-closure candidate list from `/ft-task` signals the target model via the `[heavy]`🧠 / `[medium]`🧩 / `[light]`🔧 / `[frontier]`💎 / `[xheavy]`🔭 emoji label and the Grok Build column's `model @ effort` pick (never a literal `/model` command). | Before starting a task whose `[model]` differs from the current session's model. |
| **Context freshness** | In-session `/clear` (alias of `/new`) starts a fresh session in place (`docs.x.ai/build/modes-and-commands`). | Resets the context window so the next task starts cold — "one task per context window" in practice. | Between tasks, before starting the next flaitron skill invocation, so each tasknote runs in a clean context. |
| **Structured ask** | Observed to work: the 2026-06-01 CORE-257 dogfood rendered a clean multi-option UI under the Grok 4.3 interactive TUI. Undocumented by xAI — launch coverage described no `AskUserQuestion` equivalent, so a **prose ask** (free-text question, conversational reply) remains the guaranteed fallback. | Realizes Phase 1 clarification asks and other decision points. Where the structured primitive is present the operator selects a labeled option; where it isn't, the same ask degrades to prose without contract impact. | Reach for the structured ask by default and let it degrade to prose. Treat prose as the floor, not the ceiling — the earlier "always prose per launch docs" reading is superseded by the CORE-257 observation, though the multi-option render may be a TUI enhancement rather than base-CLI behavior. Multi-option forks phrased to read cleanly either way survive both surfaces. |
| **Sub-agent / isolated exploration** | Native `spawn_subagent`. Parameters: `prompt`, `description`, `background`, `isolation`, `resume_from`, `cwd`. `background` defaults to true; the public guide's spawn table names it `run_in_background`. `isolation` is `none` or `worktree`. No agent-type or role parameter — put a role in the prompt. Observed on Grok 4.7 (2026-10-02). The 2026-08-20 `subagent_type` (`general` / `explore` / `plan`) is not on this tool. | Realizes the **probe** / **delegate** split (README.md §"Sessions, loops, and sub-agents") natively. A probe is read-only only when the prompt says so; the tool does not enforce it. A delegate is a sub-agent handed one `tasknote/<ID>.md`. `isolation: worktree` keeps the child's edits out of the parent workspace. `resume_from` continues a finished sub-agent. No second-session approximation required. | Phase 1 Discovery with a broad or unknown-shaped read set — spawn a sub-agent, put the read-only bound in the prompt, and brief it with `templates/subagent-probe-template.md`. |
| **Procedure pointer** | `grok/procedures/ft-task.md` ships in the flaitron repo, routing grok agents to `SPEC/procedures/ft-task.md` when asked to start a flaitron task (CORE-271.4). | Contract-only / SOP entry path when the operator asks to load the agent-neutral procedure rather than a skill body. | Use when testing the SOP or when skill discovery is unavailable; normal runs prefer `/ft-task` via loaded skill bodies. |

First-use verification 2026-06-01 (CORE-257). /ft-task skill invocation, model gate (with retag), AskUserQuestion render, and cue emissions (✅ marker + post-closure expectations) exercised under Grok. Structured ask support observed (see trigger table note). Matrix currency lives in docs/AGENT-COMPAT.md.

**Last verified:** `v5.35.0 · 2026-10-02 (dogfooded; skipped @ v6.0.0)`

### Codex CLI

Codex wiring bundle ships under `codex/skills/`, with repo-scoped install
instructions in `codex/AGENTS-snippet.md`. Procedure pointer wrapper
retained (CORE-271.4): `codex/procedures/ft-task.md` routes Codex agents to
`SPEC/procedures/ft-task.md` when asked to start a flaitron task by SOP rather
than by skill.

| Trigger | Syntax | What it controls in flaitron | When to reach for it |
|---|---|---|---|
| **Effort / thinking level** | A `reasoning_effort` parameter — `low` / `medium` / `high` / `xhigh` / `max` on GPT-6 Astra and GPT-6.1 Sol (neither has `none`; Luna still does). The app labels `low` as Light. Codex's model page says start Astra at Light and Luna at High; Sol's API default is `medium`. The old CLI `minimal` rung maps to `low`. | Maps to the `[heavy]` / `[medium]` / `[light]` / `[frontier]` PLAN-line tokens through the Codex column of §"Tier × platform map" (`[frontier]` = Astra @ xhigh). Heavier reasoning suits Discovery-heavy or cross-cutting tasknotes; lighter suits mechanical edits. | Match the running effort level to the task's `[model]` token. Switch before invoking the skill if the task's `[model]` differs from the current session's effort setting. |
| **Skill invocation** | Use `/skills` in Codex or mention `$ft-task`, `$ft-update`, etc. after wiring the Codex adopter subset under `.agents/skills/` | Exposes the adopter-facing Flaitron workflows as Codex-native skills while preserving the same exported names as Claude | Use for normal Flaitron operations in Codex. Do not expect arbitrary custom `/ft-*` CLI commands; Codex's documented custom workflow primitive is skills. |
| **Skill-body flags** | Trailing tokens on the skill invocation, same spelling as Claude Code; each wrapper's frontmatter names the flags it takes. Codex is the one non-Claude platform that ships its own wrappers, so a flag takes one of two routes. **SOP-first:** `ft-task`'s wrapper reads `SPEC/procedures/ft-task.md`, which names its flags as neutral primitives; its Step 0 loads the canonical `step-0-flags.md` when trailing tokens are present, and the canonical whole skill stays a fallback for uncovered edges. **Direct:** every other wrapper (`ft-micro-task`, `ft-close-epic`, `ft-file-followup`, `ft-epic-discovery`, and `ft-refactor` among them) delegates to its canonical body, so the flag's lazy fragment resolves relative to that body with no SOP hop. | Every operator flag in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md#the-triggers) §"The triggers", which owns each flag's semantics, composition rules, and gate effects; they are not restated here. | As that file's row for the flag says. This platform adds no flag of its own and drops none. A platform-native control a flag leans on, such as `--deep`'s structured asks, follows this table's own row for it. |
| **Model / session switch** | In-session `/model` changes the active model mid-session (`learn.chatgpt.com/docs/developer-commands`). Orthogonal to the effort ladder in the first row — Codex exposes reasoning depth and model choice separately. | Ensures the task runs at its assigned `[heavy]` / `[medium]` / `[light]` / `[frontier]` depth (Step 1.5 gate). The post-closure candidate list signals the target via the `[heavy]`🧠 / `[medium]`🧩 / `[light]`🔧 / `[frontier]`💎 / `[xheavy]`🔭 emoji label and the Codex column's `model @ effort` pick, never a literal `/model` command. | Before starting a task whose `[model]` differs from the current session's model. |
| **Context freshness** | In-session `/clear` clears the terminal and starts a fresh chat; `/compact` summarizes the visible chat to free tokens without a full reset (`learn.chatgpt.com/docs/developer-commands`). | `/clear` resets the context window so the next task starts cold — "one task per context window" in practice. `/compact` is a mid-task relief valve, not a substitute for a between-task reset: it keeps the finished task's residue in the summary. | `/clear` between tasks, before the next flaitron skill invocation. Reach for `/compact` only when a single tasknote genuinely outgrows the window. |
| **Structured ask** | Availability depends on runtime and mode. Official [App Server documentation](https://learn.chatgpt.com/docs/app-server#api-overview) exposes experimental `tool/requestUserInput`; that API alone does not establish an option picker in every Codex surface. `codex/AGENTS-snippet.md` §"Translation rules" requires a **prose ask** only when no suitable structured prompt is available. | Realizes clarification and decision points with the available primitive; prose fallback preserves the same question and approval obligation. | Use a structured prompt when available and appropriate; otherwise ask in prose and wait for a genuine reply. See [CODEX-VERIFICATION.md](CODEX-VERIFICATION.md) for dated runtime coverage. |
| **Sub-agent / isolated exploration** | Native subagents. Three built-in agents ship — `explorer` (read-heavy codebase exploration), `worker` (execution-focused), `default` (general-purpose fallback) — plus custom agents as standalone TOML files under `.codex/agents/` (project) or `~/.codex/agents/` (personal), each declaring `name` / `description` / `developer_instructions` and optionally pinning `sandbox_mode = "read-only"`; subagents otherwise inherit the parent's sandbox policy. Spawned by asking in natural language ("spawn two agents", "delegate this in parallel"); `/agent` (alias `/subagents`) switches between and inspects the running agent threads. Concurrency limits and `default_subagent_model` live in `config.toml`'s `[agents]` section. | Realizes the **probe** / **delegate** split (README.md §"Sessions, loops, and sub-agents") natively — `explorer`, or a custom agent pinned `sandbox_mode = "read-only"`, maps to a bounded read-only **probe**; `worker` / `default`, or a fresh session handed one `tasknote/<ID>.md`, realizes **delegate**. The second-session approximation this row previously prescribed is no longer required. | Phase 1 Discovery with a broad or unknown-shaped read set — ask for an `explorer` subagent instead of reading inline, and brief it with `templates/subagent-probe-template.md`. Skip it for a narrow, known read set: every subagent runs its own model and tool loop. |
| **Procedure pointer** | `codex/procedures/ft-task.md` ships in the flaitron repo, routing Codex agents to `SPEC/procedures/ft-task.md` | Provides a contract-only fallback for `ft-task` when the operator asks to load the SOP directly or the skill bundle is not wired | Use when the Codex skill bundle is unavailable or when testing the agent-neutral SOP. |

First-use verification 2026-06-01 (CORE-258): a Codex/GPT-5 session consumed
the root `AGENTS.md` + `SPEC.md`, resumed a blocked flaitron task
conversationally, updated the Codex matrix row, and completed the closure
bookkeeping without a native `/ft-task` bundle. Operator cues rendered
legibly in conversation; labels remained the durable fallback. The four flag
rows, the `/model` and `/clear` rows, the structured-ask row, and the rewritten
sub-agent row were backfilled 2026-08-21 (CORE-460.4) from vendor documentation
(`learn.chatgpt.com/docs/developer-commands`,
`learn.chatgpt.com/docs/agent-configuration/subagents`) read alongside the
shipped `codex/skills/` wrappers — desk research under Claude Code, not a
standalone Codex verification session. CORE-734.6 later folded the flag rows,
by then seven, into the one skill-body-flags row above.

**Last verified:** `v6.0.0 · 2026-10-04 (dogfooded)`

### Cursor

Thin wiring ships under `cursor/` (`AGENTS-snippet.md` +
`procedures/ft-task.md`). Adopters reuse Claude `.claude/skills/` bodies when
that wiring already exists, or symlink them into `.cursor/skills/` for
Cursor-only projects (see §"Worked example: Cursor" and
`cursor/AGENTS-snippet.md`).

| Trigger | Syntax | What it controls in flaitron | When to reach for it |
|---|---|---|---|
| **Skill invocation** | `/ft-task` (and peer `/ft-*`) after wiring — Cursor auto-exposes skills as slash commands. Discovery paths: `.claude/skills/` (compat), `.cursor/skills/`, `.agents/skills/` (project); `~/.cursor/skills/` + `~/.agents/skills/` (user). | Drives the full 4-phase tasknote runner and peer skills from the same canonical `claude/skills/` bodies Claude Code uses — no Cursor-specific wrappers. | Normal flaitron operations under Cursor. Prefer repo-scoped wiring; if Claude `.claude/` is already present, stop — Cursor is already served. |
| **Skill-body flags** | Trailing tokens on the skill invocation, same spelling as Claude Code. Each flag and its lazy fragments live in the loaded canonical body (discovery paths in the skill-invocation row above), and Cursor resolves them relative to that body. | Every operator flag in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md#the-triggers) §"The triggers", which owns each flag's semantics, composition rules, and gate effects; they are not restated here. | As that file's row for the flag says. This platform adds no flag of its own and drops none. A platform-native control a flag leans on, such as `--deep`'s structured asks, follows this table's own row for it. |
| **Model / session switch** | CLI: `/model`. IDE: model picker. Post-closure next-move cues use the `[heavy]`🧠 / `[medium]`🧩 / `[light]`🔧 / `[frontier]`💎 / `[xheavy]`🔭 emoji label — no `model @ effort` pick, since the tier × platform map has no Cursor column (never a literal `/model` instruction in the suggestion text). | Ensures the task runs at its assigned `[model]` depth (Step 1.5 gate). | Before starting a task whose `[model]` differs from the current session. |
| **Context freshness** | CLI: `/clear`. IDE: new chat. | Resets the context window so the next task starts cold — "one task per context window" in practice. | Between tasks, before the next flaitron skill invocation. |
| **Modes** | Agent / Plan / Ask / Debug — switchable mid-session (Cursor mode picker / `SwitchMode` where exposed). | Agent is the default execution surface for `/ft-task`. Plan suits high-ambiguity Discovery before scaffolding; Ask is read-only exploration; Debug is for hypothesis-led investigation (orthogonal to skill `--debug`, which is soft scaffolding inside a tasknote). | Reach for Plan when Discovery would otherwise thrash; stay in Agent for routine Phase 2–4. |
| **Structured ask** | Native Cursor multi-option ask ("Ask questions" tool). Observed to render a clean multi-option UI under Cursor ([[CORE-438.1]]); availability can be model/agent-surface dependent — a session without the tool degrades to a **prose ask** with no contract impact. | Realizes Phase 1 clarification asks and other discrete decision points. | Reach for the structured ask by default; treat prose as the floor. Phrase multi-option forks to read cleanly either way. |
| **Sub-agent / isolated exploration** | Native `Task` tool; custom agent definitions under `.cursor/agents/` (+ `.claude/agents/` compat). Supports `readonly` / background frontmatter. | Realizes the **probe** / **delegate** split (README.md §"Sessions, loops, and sub-agents") natively — no second-session approximation required. | Phase 1 Discovery with a broad or unknown-shaped read set; brief probes with `templates/subagent-probe-template.md`. |
| **Procedure pointer** | `cursor/procedures/ft-task.md` routes to `SPEC/procedures/ft-task.md`. | Contract-only / SOP entry path when the operator asks to load the agent-neutral procedure rather than a skill body. | Use when testing the SOP or when skill discovery is unavailable; normal runs prefer `/ft-task` via wired skill bodies. |

First-use verification 2026-08-12 ([[CORE-438.5]]): `/ft-task` under Cursor (Grok 4.5) ran DOGFOOD.md's three steps (contract comprehension at `v5.16.0`, full cue-render vocabulary, Phase-1 drive on CORE-438.N with clean Step-3 write boundary). Skill dispatch via `.claude/skills/` compat, Task subagent tool, modes, and `/model`+`/clear` cues confirmed; structured ask confirmed earlier under Cursor in [[CORE-438.1]]. Matrix currency lives in docs/AGENT-COMPAT.md.

**Last verified:** `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v6.0.0)`

### Gemini CLI (stub)

Contract-only agent; no capability-trigger research has been conducted for flaitron
sessions under Gemini CLI. See [`AGENT-COMPAT.md`](AGENT-COMPAT.md) for the current
matrix row. Update this stub on first-use observation.

**Last verified:** `unverified`

### Aider (stub)

Contract-only agent; no capability-trigger research has been conducted for flaitron
sessions under Aider. See [`AGENT-COMPAT.md`](AGENT-COMPAT.md) for the current
matrix row. Update this stub on first-use observation.

**Last verified:** `unverified`

### Sourcegraph Amp (stub)

Contract-only agent; no capability-trigger research has been conducted for flaitron
sessions under Sourcegraph Amp. See [`AGENT-COMPAT.md`](AGENT-COMPAT.md) for the
current matrix row. Update this stub on first-use observation.

**Last verified:** `unverified`

## When this doc is useful

- **Adding a new platform's wiring.** Rare; most adopters paste the
  `AGENTS.md` block and drive conversationally. If you do ship wiring,
  follow the scaffold above + the §"Hard constraints" above.
- **Auditing the wiring layer's structure.** Confirms the sibling-top-level
  pattern hasn't drifted, the `ft-` namespace is intact, and adopter
  symlink paths are stable.
- **Writing a follow-up to [`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md).**
  Cross-reference the two: this doc is the *structural* layer (where
  wiring lives), `AGENT-NEUTRALITY.md` is the *content* layer (which
  Claude-specific references are intentionally load-bearing).

## Out of scope

This doc does **not**:

- Decide whether a new platform's wiring is worth shipping — judgment
  call by the contributor; flaitron makes no recommendation.
- Translate skill content for non-Claude-Code platforms — each
  platform's wiring author decides which skills to translate and how.
- Provide migration tooling for existing adopters — none needed by
  design ([[CORE-154.1]] Constitution non-negotiable on adopter-symlink
  stability) beyond the v6.0.0 rename move (`tools/update-adopters.mjs`
  migrate mode).
- Adopt any specific platform's conventions (Codex CLI's command
  shape, grok-cli's skill format, Cursor's MCP semantics, …) — those
  are external; this doc is the *pattern*, not the per-platform
  content.

## Related

- [`SPEC/layout.md`](../SPEC/layout.md) §"Working in the flaitron repo itself" — repo
  layout including the `claude/` locator + this doc's forward-pointer
- [`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md) — the content-layer
  ledger this doc operationalizes structurally
- [`AGENT-COMPAT.md`](AGENT-COMPAT.md) — the capability/currency
  companion: the living per-agent matrix (consume-mode, entry-point,
  primitive, last-verified)
- [`MIGRATION.md`](MIGRATION.md) — Claude Code adoption guide today;
  template shape for future per-platform adoption guides
- `claude/AGENTS-snippet.md` — concrete worked example of the
  `<platform>/AGENTS-snippet.md` shape
- [[CORE-154.1]] Discovery — Constitution + Specification §CORE-154.4
- [[CORE-154.2]] — agent-neutral surface audit + AGENT-NEUTRALITY.md
- [[CORE-154.3]] — wiring-layer structure: option (a) status-quo + sibling-top-level convention
- [[CORE-091]] — single-source-of-truth posture for AGENTS-snippet.md
