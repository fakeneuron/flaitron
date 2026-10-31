---
title: one-line-installer
status: starter
tags: [planning, handoff, installer, adoption]
created: 2026-10-31
touches:
  - install.sh
  - .github/workflows/install-test.yml
  - README.md
  - claude/skills/ft-adopt/SKILL.md
  - docs/CONVENTIONS.md
---

# CORE-851 | Codemaster planning handoff — one-line installer

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-31)

Source: Grok Task Notes/Flaitron one-line installer starter tasknote.md (2026-10-28), read at flaitron@80e7dad7

> **Format:** light Flaitron starter tasknote. Codemaster files it; Jude hands it to a coding agent, which promotes it with `/ft-task <ID>`.
> **Codemaster's role:** planning only. No code, pushes or releases from Codemaster.

## 🌱 Starter context

_Captured 2026-10-28 by Codemaster at Jude's request. Read at flaitron release v8.0.0 (commit `80e7dad7`). Drift-check at promotion._

_Intake note (2026-10-31): HEAD is now v8.1.0. `281994bc` (CORE-848) touched `README.md` since the read; `install.sh` is still absent. The flaitron repo is public._

### Why this exists

Adopting Flaitron today is a manual clone + global `/ft-adopt` link + `git submodule add` + tag checkout + sparse-checkout + skill symlinks (README Quickstart, docs/MIGRATION.md §1.0–1.1). Jude wants one command that does those steps safely, then hands off to `/ft-adopt`:

```sh
curl -fsSL https://raw.githubusercontent.com/fakeneuron/flaitron/main/install.sh | sh
```

### Feasibility

- **Verdict:** Feasible. **S–M**, one task (about 1–2 agent-days), plus an optional release-assets follow-up.
- **Evidence:** a working prototype exists, but it is **local-only on Codemaster's box** (branch `local/one-line-installer`, not pushed). The coding agent can't see it, so the requirements below are the brief. It came to about 384 lines of POSIX sh plus a 70-line CI workflow. Shellcheck was clean, and fresh install, rerun, pinned update and edge cases all passed in a temp repo.
- **Facts that shape the design:**
  - All releases have **0 assets** (no SHA256SUMS), and tags are **unsigned**. Integrity today can only be "local tag commit == commit GitHub reports".
  - `/ft-adopt` Step 0 bails if `.flaitron/core` already exists, so it needs a one-paragraph exception or the installer's "next: run /ft-adopt" fails.
  - Unauthenticated GitHub API is 60 calls/h per IP, so a `git ls-remote` tag fallback is needed.
- **Unknowns:** none of the agent CLIs (Claude, Codex, Cursor, Grok) were runtime-tested. Cursor-only and Grok-only home paths (`~/.cursor/skills`, `~/.grok/skills`) are inferred, not documented.

### Requirements (the brief)

1. POSIX `install.sh` at the repo root, all logic inside `main()` (a truncated download does nothing). Subcommands `install` (default) and `update`.
2. **Version:** resolve the latest release explicitly (GitHub `releases/latest`, fallback highest semver tag via `git ls-remote`), print it and its source. `FLAITRON_VERSION=vX.Y.Z` pins; `main` or any branch is refused. A rerun keeps the existing pin; only `update` moves it.
3. **Integrity:** before changing anything, read the tag's peeled commit from GitHub. After checkout, verify HEAD == tag == that commit and print the SHA. `FLAITRON_SHA` aborts on mismatch with nothing changed. Report the tag as unsigned; never fake a checksum.
4. **Safety:** refuse outside a git repo, in the flaitron repo itself, on a foreign `.flaitron/core`, and on symlinked skill roots. Idempotent. Replace only Flaitron symlinks; back up anything else first to `.flaitron/backup/<path>.bak.<ts>` (project) or `~/.local/state/flaitron/backup/` (home). Backups never go inside skill dirs (they'd load as duplicate skills). Commit nothing.
5. **Agents:** detect Claude (`.claude/skills`), Codex (`.agents/skills`), Cursor-only (`.cursor/skills`) and Grok-only (`.grok/skills`), project dirs first, then CLIs/home dirs, default Claude. `FLAITRON_AGENTS` overrides. Read the link roster from the **pinned** snippets' literal `ln -s` blocks (no restated roster).
6. **Machine side:** clone to `~/code/flaitron` at the tag and link global `/ft-adopt`. `FLAITRON_NO_GLOBAL=1` opts out; `FLAITRON_HOME` relocates. Leave an existing clone alone if it's on a branch or dirty.
7. Ends with "Next: run /ft-adopt (Codex: $ft-adopt)".

### Files to touch (preliminary survey — drift-check at promotion)

- `install.sh` (new) — the installer.
- `.github/workflows/install-test.yml` (new) — shellcheck plus a real temp-repo install, rerun, pinned update and update-to-latest on ubuntu and macOS.
- `README.md` — the one-liner becomes the Quickstart; manual clone+symlink stays as "Manual install (fallback)"; pin/update usage.
- `claude/skills/ft-adopt/SKILL.md` — Step 0 exception: if `.flaitron/core` is the flaitron submodule at a release tag, `PLAN.md` is absent and all `ft-*` links point into `.flaitron/core/`, continue, keep that pin, skip Step 2 except sparse-checkout, and only add missing links. (Codex wrapper delegates to this body.)
- `docs/CONVENTIONS.md` — decision note: a shell script, still no package manager; `npx`/`uvx` stay declined.
- Possibly: `docs/MIGRATION.md` §1.0, `docs/AGENT-NEUTRALITY.md`, `SPEC/layout.md`, PHILOSOPHY / `SPEC/scope-boundaries.md` (see Discovery questions).

### Execution plan for the coding agent (guidance, not binding)

1. Drift-check the files above against HEAD (including the snippets' `ln -s` blocks and ft-adopt Step 0).
2. Write `install.sh` to the requirements.
3. Add the ft-adopt Step 0 exception and the CONVENTIONS note.
4. Rewrite the README Quickstart.
5. Add the CI workflow.
6. **Checks to run:** `shellcheck -s sh install.sh`; a temp-repo install, rerun (no CREATED/BACKUP lines), `FLAITRON_VERSION=<previous> … update`, then `update` to latest; refusals for `FLAITRON_VERSION=main`, outside a repo and a bad `FLAITRON_SHA`; `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`.

### Explicitly out of scope

- Release assets and tag signing (separate follow-up, see Discovery questions).
- `npx`/`uvx`/marketplace wrappers.
- Retired-link pruning (stays with `/ft-update`; the installer only reports dangling links).

### Discovery questions (Grok's proposal; leans are evidence, not locked decisions)

Added at intake:

- **Q1 — Doctrine change.** `docs/CONVENTIONS.md` §"Package-manager and marketplace distribution" says Flaitron is distributed as a git submodule only and accepts adoption friction as the price of the pin; `docs/PHILOSOPHY.md` "Zero scripts" and `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" bound scripts to the `tools/update-adopters.mjs` exception. Does a bootstrap installer that still installs the submodule fit, and what wording records it? Lean (Grok): add one line to PHILOSOPHY and scope-boundaries — the installer is adopter bootstrap, not a workflow CLI.
- **Q2 — Supply-chain risk.** The flaitron repo is public, so `curl … main/install.sh | sh` lets anyone who can push to `main` run code on adopters' machines. Is serving from `main` acceptable, or only a per-release pinned URL? Lean (Grok): see the first row below.

From the source note:

| Question | Options | Lean |
|---|---|---|
| Where `install.sh` is served from | `main` / per-release asset | **Both:** `main` for the one-liner, plus `/ft-release` attaching `install.sh` to each release for a pinnable URL. `main` alone means anyone who can push to main controls adopters' machines. |
| Checksums and signing | Now / follow-up | **Follow-up starter:** `/ft-release` publishes `SHA256SUMS` and signs tags; the installer verifies when present. |
| Multi-agent wiring | Wire every detected agent / one, others via `FLAITRON_AGENTS` | **Every detected agent** (Jude's requirement), but print what was wired. Note ft-adopt says "multiple surfaces only on explicit request", so update that line to match. |
| PHILOSOPHY "zero scripts" / "no CLI" | Add a line / leave | **Add one line** to PHILOSOPHY and scope-boundaries: the installer is adopter bootstrap, not a workflow CLI. |
| Global side effects | On by default / opt-in | **On by default** with `FLAITRON_NO_GLOBAL=1` to skip; README says so plainly. |

### Open at promotion

- Should `.flaitron/backup/` be added to the adopter `.gitignore` guidance? Lean: yes.
- The CI is network-dependent (resolves the live latest release). Acceptable? Lean: yes, path-filtered to `install.sh` changes.

### Related

- CodeMentor 2026-10-28 recap item 2 (installer requirements).
- Drive: "Flaitron One-Line Installer Draft Oct 28.md" (Codemaster/flaitron) has the full prototype diff for reference.
