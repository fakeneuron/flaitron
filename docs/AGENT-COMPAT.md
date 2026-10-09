# Agent compatibility matrix

A living, at-a-glance matrix of the AI coding agents flaitron is built to
work with: how each consumes the contract, what context entry-point it
reads, what skill/command primitive it offers, and when each row was last
verified. This is the *capability/currency* companion to
[`PLATFORMS.md`](PLATFORMS.md) (the *structural* doc — where wiring lives)
and [`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md) (the *content* ledger —
which Claude-specific references are intentionally load-bearing).

Audience: occasional. Read this to see at a glance which agents are
supported and how current each row is, before adopting flaitron under a
new agent or refreshing a row.

## Scope of this matrix

This matrix is **structural** — it records *how* each agent reaches and
runs the contract, not the agent's individual capability triggers. Per-agent
capability triggers (Claude effort/thinking levels and `--fast`; Grok
context-load quirks; each agent's force-skip and model-switch ergonomics)
live in the per-agent trigger references, documented separately from this
scaffold (Claude's in [`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md);
non-Claude agents in [`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers)). Keeping
triggers out of the matrix keeps it a stable index rather than a second copy
of the trigger detail.

The matrix carries agent-specific *facts* (entry-points, primitives) in
`docs/`, with neutral framing — the same posture PLATFORMS.md already uses
for its Grok Build notes. The agent-neutral workflow contract itself
(`SPEC.md`, `SPEC/`, `templates/`) carries none of this.

## The matrix

| Agent | Consume mode | Context entry-point | Skill / command primitive | Last verified |
|---|---|---|---|---|
| **Claude Code** | Wiring + contract | `AGENTS.md` (+ optional `CLAUDE.md`) | `.claude/skills/` slash-invocable skills — full `ft-*` bundle shipped; adopter repos wire the policy subset | `v6.1.0 · 2026-10-08 (dogfooded)` |
| **Grok Build** | Wiring + contract (thin, Cursor-shaped) | `AGENTS.md` | Thin `grok/` bundle — `AGENTS-snippet.md` + `procedures/ft-task.md`; no skill wrappers. Discovers `.claude/skills/` and `.agents/skills/` (and `.cursor/skills/`) as compat surfaces plus native `.grok/skills/`; auto-wired as `/<name>`. Adopters reuse canonical `claude/skills/` bodies (stop if Claude/Codex/Cursor already wired; Grok-only follows `grok/AGENTS-snippet.md`). Those bodies' operator flags come with them ([`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers)) | `v6.1.0 · 2026-10-08 (dogfooded)` |
| **Codex CLI** | Wiring + contract | `AGENTS.md` | `.agents/skills/` repo-scoped skills — full `ft-*` bundle shipped under `codex/skills/`, adopter repos wire the policy subset; `codex/procedures/ft-task.md` pointer wrapper retained. `ft-task` enters `SPEC/procedures/ft-task.md` with canonical-body fallback; other wrappers enter the canonical `claude/skills/` bodies. Their operator flags come with them ([`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers)) | `v6.1.0 · 2026-10-08 (dogfooded)` |
| **Cursor** | Wiring + contract (thin) | `AGENTS.md` | Thin `cursor/` bundle — `AGENTS-snippet.md` + `procedures/ft-task.md`; no skill wrappers. Adopters wire canonical `claude/skills/` bodies (reuse `.claude/` when already present, or `.cursor/skills/` for Cursor-only). Those bodies' operator flags come with them ([`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers)) | `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v6.1.0)` |
| **Gemini CLI** | Contract only | `AGENTS.md` | Native primitive exists; no flaitron bundle | unverified |
| **Aider** | Contract only | `AGENTS.md` | Native primitive exists; no flaitron bundle | unverified |
| **Sourcegraph Amp** | Contract only | `AGENTS.md` | Native primitive exists; no flaitron bundle | unverified |

### Reading the cells

- **Consume mode** — `Wiring + contract` means the agent has a shipped
  skill/command bundle that drives the 4-phase workflow inline;
  `Wiring + contract (thin)` / `(thin, Cursor-shaped)` means the agent
  loads the canonical `claude/skills/` bodies via a documented compat or
  native scan (Cursor, Grok) without its own wrappers;
  `Contract only` means the agent reads `AGENTS.md` and drives the
  contract conversationally with no flaitron-specific machinery. Mirrors
  PLATFORMS.md §"Today's surface".
- **Context entry-point** — flaitron's content reaches every agent through
  the open-standard `AGENTS.md` paste-block. Several agents also read a
  native context file (`CLAUDE.md`, `GROK.md`, `GEMINI.md`, `.cursorrules`,
  Aider's `CONVENTIONS.md`); those are orthogonal to flaitron, which
  targets `AGENTS.md` so one paste-block serves all agents. Orthogonal in
  *content* — an agent that turns out not to load `AGENTS.md` is pointed at
  it (symlink or import) rather than given a second copy of the block; see
  [`MIGRATION.md`](MIGRATION.md) §1.3.
- **Skill / command primitive** — whether the agent exposes a slash-command
  or skill mechanism, and whether flaitron ships a bundle for it. Claude Code
  and Codex CLI have full shipped inventories today; Cursor and Grok are
  thin/Cursor-shaped: they reuse canonical `claude/skills/` bodies via
  `.claude/skills/` / `.agents/skills/` (and Cursor's `.cursor/skills/`,
  Grok's `.grok/skills/`) with no platform-specific wrappers. Adopter
  projects wire only the subset in PLATFORMS.md §"Installed-surface policy".
  The remaining contract-only rows note only that a native primitive exists
  — their per-agent detail is filed with the non-Claude trigger reference.
- **Last verified** — when this row was last checked against reality. Format:
  `vX.Y.Z · YYYY-MM[-DD] (context-tag)` where the context tag is one of:
  - `dogfooded` — verified by running a flaitron session under this agent at
    the stated version
  - `docs-only · YYYY-MM (pre-adoption)` — verified against vendor
    documentation only; no flaitron session run under this agent
  - `unverified` — no verification conducted; row rests on launch coverage only

  A dogfooded row may additionally carry a `; skipped @ vX.Y.Z` suffix —
  e.g. `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)`. It records that
  re-verification was *deliberately skipped* at release `vX.Y.Z` while the stamp
  prefix stays pinned to the last **real** verification (`v4.4.0` here, not the
  skipped version). The suffix carries the latest skip version; bump it each
  release the row is skipped again.

  Update obligation — **release gate (dogfood-or-explicit-skip).** Each row that
  carries a `dogfooded` history (today: Claude / Grok / Codex / Cursor) must be *resolved*
  at every release — either refreshed from a real verification run at the new
  version, or recorded as `skipped @ vX.Y.Z`. Leaving a stale stamp silently
  untouched is not a valid release state: the skip must be a deliberate, recorded
  act. Rows never dogfooded (`unverified`, `docs-only`) are *noted-not-gated* —
  they rest on launch coverage until first dogfooded and are exempt from the gate.
  Enforced at release time by the release flow (`ft-release` §5/§7), which walks
  the dogfooded rows and forces per-row resolution before tagging. The same
  format and obligation apply to per-agent trigger-reference "Last verified"
  sections (e.g. `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` agent stubs).
  For the agent-side session procedure that drives a dogfood run, see
  [`docs/DOGFOOD.md`](DOGFOOD.md).

  Stamp-write ownership under parallel dogfooding — when more than one agent
  session dogfoods toward the same release concurrently, only the
  **release-driving session** (the one carrying the cut through to tag/push)
  writes these stamp files. Any other concurrent session reports its
  refreshed/skipped verdict and evidence conversationally instead of editing
  `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, or `docs/PLATFORMS.md`
  itself — the release-driving session's own `ft-release` §5 walk is what
  applies the resolution. This closes a race where a parallel session's
  interim write (a row it couldn't yet confirm, correct when written) beat
  the real result and had to be reconciled by hand before tagging (CORE-406,
  surfaced during the v5.15.0 cut).

  **Mechanical backstop (CORE-501).** The rule above depends on a session
  correctly judging its own role, which failed one release later (v5.22.0):
  a parallel session wrote all eight stamp locations anyway, two with
  rationale that didn't survive checking. `ft-release` §5's walk now runs a
  `git status --porcelain` check on the three stamp files immediately before
  writing and stops for operator reconciliation if they're already dirty —
  neither side commits mid-cut, so a second writer sees the first writer's
  uncommitted edits before it can overwrite them.

  **Report-only dogfood sessions + file-state re-verify (CORE-588).** The
  backstop raced a third time (the CORE-586 cut): it runs only inside `ft-release`,
  and the parallel writers were sessions running `docs/DOGFOOD.md`, whose
  result section then told them to update the stamp themselves. Three
  changes close it. A dogfood session now hands back a **receipt** — its
  three `Log:` lines verbatim plus the proposed stamp — and never edits
  these files (`docs/DOGFOOD.md` §"Reporting the result"); a row other than
  the driving session's own agent is refreshed only against such a receipt
  and otherwise recorded `skipped` (`ft-release` §5 step 2); and the walk
  greps every resolved stamp back from the files after writing and again
  before commit-go, so a clobbered write is caught before the tag rather
  than reconciled by hand afterwards (`ft-release` §5 step 5, §7.4).

## Pre-adoption verification

Claude Code is verified by continuous dogfooding; Grok, Codex, and Cursor carry
dogfooded history but are refreshed or explicitly skipped per release.
Contract-only rows start from vendor documentation and launch coverage until a
live flaitron session is run under that agent. Grok Build, Codex CLI, and Cursor
have all been dogfooded; Gemini CLI, Aider, and Sourcegraph Amp remain
pre-adoption expectations. Flaitron ships full Claude/Codex inventories and
thin Cursor and Grok siblings (snippet + procedure pointer; Grok also loads
`.claude/skills/` / `.agents/skills/` / `.cursor/skills/` as compat surfaces);
the remaining contract-only agents have no wiring bundle. Update a row on
first-use observation if anything diverges. This mirrors
the per-agent footers in [`PLATFORMS.md`](PLATFORMS.md) §"Non-Claude capability
triggers".

## Cross-agent cue fallback policy

Flaitron's operator cues are `<glyph> <UPPERCASE-LABEL>` pairs — the canonical
set lives in [`SPEC/cue-vocabulary.md` §"Operator-cue vocabulary"](../SPEC/cue-vocabulary.md). The
pairing *is* the cross-agent reliability mechanism: the glyph is a fast-scan
accelerator; the UPPERCASE ASCII label is the authoritative, durable token.

A cue can hit three non-render failure modes on a given agent surface:

- **Stripped** — the surface drops non-ASCII and the glyph vanishes.
- **Tofu** — the glyph renders as a missing-glyph box (□).
- **Mojibake** — the glyph is mis-decoded into garbage bytes.

In all three, the trailing label (`DB`, `RUN`, `REMOTE`, `TERM`, `ACTION`, `GO`, `CONFIRM`,
`AUDIT`, `LIGHT`, `MEDIUM`, `HEAVY`, `FRONTIER`, `XHEAVY`, `HERE`) is plain ASCII and survives intact, so the cue's meaning is recoverable
without the glyph. Banner cues carry their label inside the
`AWAITING APPROVAL — <label>` line, so the same fallback holds for blocking
gates. **Agents and operators should scan on the label as the authoritative
token; the glyph never carries meaning alone.**

A fourth, milder degradation applies to the one cue carrying markdown emphasis:
the 👁️ `CONFIRM` ask is emitted in the **emphasized inline shape** (own line,
blank-line isolated, `**CONFIRM**` bolded — see
[`SPEC/cue-vocabulary.md` §"Emphasized inline ask shape"](../SPEC/cue-vocabulary.md)), and a
surface that renders no markdown will show literal asterisks or strip them
entirely. Neither loses the cue: the line break and blank-line isolation are
plain text and survive, and the UPPERCASE label still names it. The emphasis was
deliberately made **structural rather than chromatic** for exactly this reason —
it degrades to a still-isolated line rather than to nothing.

This is why a row can sit at `docs-only` or `unverified` (§"The matrix") and the
cues still convey reliably: legibility degrades gracefully to plain text, so
per-agent emoji-render dogfooding is a currency nicety, not a correctness
prerequisite. Live cue-render confirmation under a non-Claude agent refreshes
that agent's row per the §"Reading the cells" update obligation — the natural
next step for the still-unverified rows (Gemini CLI, Aider, Sourcegraph Amp).

## Related

- [`PLATFORMS.md`](PLATFORMS.md) — the structural companion: the two-layer
  contract/wiring model, the symmetric plug-in pattern, and the Grok Build
  adoption notes this matrix's Grok row references
- [`AGENT-NEUTRALITY.md`](AGENT-NEUTRALITY.md) — the content ledger of
  intentional Claude-specific surfaces in the contract layer
- [`MIGRATION.md`](MIGRATION.md) — the Claude Code adoption guide; the shape
  a future per-agent adoption guide would mirror
- [`DOGFOOD.md`](DOGFOOD.md) — the versioned, pasteable dogfood procedure
  agents run to refresh a row
- [[CORE-EPIC-224]] — the epic that establishes this surface
- [[CORE-154.4]] — the platform plug-in pattern (`PLATFORMS.md`) this builds on
