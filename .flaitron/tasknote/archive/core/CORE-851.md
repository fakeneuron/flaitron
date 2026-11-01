---
title: one-line-installer
status: completed
tags: [planning, handoff, installer, adoption]
created: 2026-10-31
due:
related-tasks: [CORE-384, CORE-769.1, CORE-855]
touches:
  - install.sh
  - .github/workflows/install-test.yml
  - README.md
  - claude/skills/ft-adopt/SKILL.md
  - docs/CONVENTIONS.md
  - SPEC.md
  - SPEC/scope-boundaries.md
  - docs/PHILOSOPHY.md
  - SECURITY.md
  - docs/MIGRATION.md
  - claude/skills/ft-release/
  - AGENTS.md
  - tools/install.test.sh
  - SPEC/layout.md
  - docs/VISION.md
---

# CORE-851 | one-line-installer

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-384]] [[CORE-769.1]]

## 🎯 Goal

Give adopters a one-command, version-pinned, commit-verified flaitron install (`install.sh` via `curl … | sh`) that wires agent skill links and hands off to `/ft-adopt`. Record the doctrine and supply-chain decisions it needs.

## ✅ Acceptance

- [x] `install.sh` at repo root is POSIX sh, every statement inside `main()` or a function with the last line `main "$@"`, subcommands `install` (default) / `update`, shellcheck-clean — `shellcheck -s sh install.sh` → 0 and `tail -n1 install.sh | grep -qx 'main "\$@"'` _(run as `grep -qxF`: BSD grep reads the `$` as an anchor; same assertion → 0)_
- [x] Sandboxed e2e (HOME, FLAITRON_HOME and the target repo all under the scratchpad; runs under `dash` and `bash --posix`): a fresh install pins the latest release and prints the version, its source and the verified SHA (HEAD == tag == GitHub-reported commit). A rerun prints no CREATED/BACKUP lines and keeps the pin. `FLAITRON_VERSION=<previous> … update` moves the pin back, and a plain `update` moves it to latest — receipt from `sh <scratchpad>/e2e.sh` → 0 _(the harness was promoted to tracked `tools/install.test.sh`; also run under macOS `sh` and default TMPDIR → 0, 77 checks)_
- [x] Refusals exit non-zero with the tree unchanged: `FLAITRON_VERSION=main`, outside a git repo, inside the flaitron repo itself, a foreign `.flaitron/core`, a bad `FLAITRON_SHA` — same e2e receipt
- [x] Link roster comes from the pinned snippets' literal `ln -s` blocks (no restated roster). It wires every detected agent (Claude / Codex / Cursor-only / Grok-only; `FLAITRON_AGENTS` overrides) and prints what it wired. It replaces only flaitron symlinks and backs anything else up outside skill dirs (`.flaitron/backup/` · `~/.local/state/flaitron/backup/`) — e2e receipt plus `grep -c 'ln -s' install.sh` showing no hard-coded `ft-*` roster _("flaitron symlinks" narrowed at review to links into this install's own prefix; custom flaitron links are backed up)_
- [x] Machine side: clones `FLAITRON_HOME` (default `~/code/flaitron`) at the tag and links global `ft-adopt`. `FLAITRON_NO_GLOBAL=1` skips it. An existing clone on a branch or dirty is left alone. Ends with `Next: run /ft-adopt (Codex: $ft-adopt)` — e2e receipt _(global `ft-adopt` is one agent-home copy per machine, per `docs/PLATFORMS.md`, not one per agent)_
- [x] `.github/workflows/install-test.yml`: shellcheck plus the e2e on `ubuntu-latest` + `macos-latest`, path-filtered to `install.sh` and the workflow file — `grep -q 'install.sh' .github/workflows/install-test.yml && ruby -ryaml -e 'YAML.load_file(ARGV[0])' .github/workflows/install-test.yml`; the live CI run itself is `judgment` (needs a push) _(static checks → 0; the live run is deferred to [[CORE-855]])_
- [x] ft-adopt Step 0 exception (installer-made `.flaitron/core` at a release tag, no `.flaitron/PLAN.md`, `ft-*` links into `.flaitron/core/` → continue, keep the pin, skip Step 2 except sparse-checkout, add only missing links) and the Step 1 multi-surface line now match the installer — `grep -q 'install.sh' claude/skills/ft-adopt/SKILL.md`
- [x] Doctrine records the third carve-out: SPEC.md principle #2 + §"What flaitron does NOT provide", `SPEC/scope-boundaries.md`, `docs/PHILOSOPHY.md` "Zero scripts", and `docs/CONVENTIONS.md` (package-manager decline + GitHub Actions CI) each name `install.sh` — `for f in SPEC.md SPEC/scope-boundaries.md docs/PHILOSOPHY.md docs/CONVENTIONS.md; do grep -q 'install.sh' $f || echo MISSING $f; done` prints nothing
- [x] `SECURITY.md` covers the installer as an execution surface, with the tag-pinned URL as the mitigation — `grep -q 'install.sh' SECURITY.md`
- [x] README Quickstart leads with the tag-pinned one-liner, keeps manual clone+link as "Manual install (fallback)", and documents pin/update usage plus the global side effect. `docs/MIGRATION.md` §1.0 points at it and adds `.flaitron/backup/` to the gitignore guidance — `grep -q 'raw.githubusercontent.com/fakeneuron/flaitron/v' README.md && grep -q 'flaitron/backup' docs/MIGRATION.md`
- [x] `/ft-release` Step 5 sets the README installer URL's tag as a fourth version edit (count references updated) — `grep -q 'install.sh' claude/skills/ft-release/SKILL.md && ! grep -rq '3 version edits' claude/skills/ft-release/`
- [x] AGENTS.md §"Repo Layout" lists `install.sh` and the new workflow — `grep -q 'install.sh' AGENTS.md`
- [x] Drift checks stay green — `bash tools/drift-checks.sh` → 0 and `node --test tools/drift-checks.test.mjs` → 0
- [ ] Hand-off works on a tag that ships the ft-adopt exception — `judgment`: the latest release (v8.2.0) predates the exception, so `/ft-adopt` after the installer works only once the next release is cut; it can't be verified before then — not met — deferred to [[CORE-855]] (needs the v8.3.0 tag). Until then the installer prints a warning when the global `ft-adopt` predates the exception.

## 🧩 Subtasks

- [ ] Write `install.sh` to the brief (requirements 1–7 in the quoted starter context) with the operator's defaults
- [ ] Write the sandboxed e2e harness in the scratchpad; iterate until it passes under `dash` and `bash --posix`, then fold its assertions into the CI workflow
- [ ] Add `.github/workflows/install-test.yml`
- [ ] ft-adopt Step 0 exception + Step 1 multi-surface line (+ `.flaitron/backup/` gitignore note); check the Codex wrapper still only delegates
- [ ] Doctrine edits: SPEC.md (#2, §NOT provide), scope-boundaries, PHILOSOPHY, CONVENTIONS (decline note + CI paragraph)
- [ ] SECURITY.md installer surface
- [ ] README Quickstart rewrite; MIGRATION §1.0 pointer + gitignore guidance
- [ ] ft-release Step 5 fourth version edit + count references
- [ ] AGENTS.md Repo Layout
- [ ] Check context budgets (`SPEC.md` ≤ 49,000) and run drift checks

## 🔗 Related

- [[CORE-384]] — related-decision: added CONVENTIONS §"Package-manager and marketplace distribution" (submodule-only; the friction buys the pin)
- [[CORE-769.1]] — related-decision: re-affirmed the submodule as the settled distribution channel (marketplace declined)
- [[CORE-855]] — follow-up: release v8.3.0 so the README installer URL resolves, then confirm the live install CI and the `/ft-adopt` hand-off

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `install.sh` is still absent and adoption is still the multi-step manual path. The doctrine conflict the drift check found is settled by the operator's choice of a third carve-out (below). The scope grows past the starter's file list: SECURITY.md, ft-release, AGENTS.md and the SPEC core-principle text.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

  `install.sh` owns machine and repo bootstrap only (submodule at a verified tag, links, global ft-adopt). `/ft-adopt` keeps AGENTS.md, PLAN.md, the README skeleton, the fence and the commit. Dependency direction stays one-way: the installer reads the **pinned** snippets' `ln -s` blocks, the same SSOT `tools/update-adopters.mjs` and `codex/reconcile-skills.md` parse, so there's no second roster. For Codex, the installer creates plain links from the literal block. ft-adopt Step 3's `reconcile-skills.md` run then sees them as already-owned links, so the two don't duplicate conflict logic beyond "replace own symlink / back up anything else". No refactor of existing code needed.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Archive skim** (`CORE-*` → `archive/core/`, 1,103 notes; grep for `install.sh` / installer / `curl … | sh` / the CONVENTIONS heading): two hits.
- [[CORE-384]] wrote CONVENTIONS §"Package-manager and marketplace distribution". It separates two rules on purpose: SPEC rules out flaitron *being* a CLI, and CONVENTIONS rules out it being *delivered* by one. Its README / CONTRIBUTING "declines" enumerations are count mirrors (CORE-374 invariant), so a new or changed decline entry has to update both.
- [[CORE-769.1]] re-affirmed the submodule as the settled channel (plugin marketplaces have no per-project pin).
- No prior installer work.

**Drift check** (starter read at v8.0.0 `80e7dad7`; HEAD is v8.2.0 `fdb07882`, 31 commits later):
- `install.sh` and `.github/workflows/install-test.yml` are still absent. CI is `.github/workflows/ci.yml` only.
- ft-adopt Step 0 still bails on `.flaitron/core/` (`claude/skills/ft-adopt/SKILL.md:18-24`). Step 1 still says "install multiple surfaces only on an explicit request" (`:48-49`). The starter's Step 0 exception and multi-agent notes still apply.
- README Quickstart (`README.md:31-63`) has the same shape: a once-per-machine clone + `ln -s ft-adopt`, then `/ft-adopt`. CORE-848 and CORE-854 touched only the version / count lines.
- **Codex wiring has moved.** CORE-852.5 and CORE-852.6 made `codex/reconcile-skills.md` the adopt/update path for Codex. Its inline block reads the pinned literal roster, preserves custom destinations and stops on conflicts. ft-adopt Step 3 now executes it rather than rerunning the literal `ln -s` lines. The four snippets still carry literal `ln -s` blocks (claude `:91-97`, codex `:30-36`, cursor `:45-51`, grok `:49-55`), so requirement 5 still works as written. An installer that runs the Codex `ln -s` lines itself would duplicate what reconcile-skills.md does.
- **SECURITY.md is not in the starter's file list, and it has to change.** §"Submodule supply-chain trust" (`SECURITY.md:116-140`) says "no build step, no postinstall script, no executable from flaitron that runs without the user invoking it". `curl … | sh` is user-invoked, but it is a new execution surface, and the threat model must cover it (serving from `main` = upstream takeover runs code directly, not just at the next skill invocation).
- **Cross-artifact (SPEC):** `SPEC.md:21` Core principle #2 is "**Zero scripts.** All operations are `cp`, `mv`, and editing markdown." `SPEC.md:757-775` and `SPEC/scope-boundaries.md:24-49` call the updater and visualizer carve-outs "singular exceptions, not precedents. If you find yourself wanting these, write a project-side helper. Do not add them to flaitron." CONVENTIONS `:156-166` says "The friction buys the pin". An installer that installs the submodule at a tag keeps the pin, but it is a third shipped script. So this is a **contract change** to the always-loaded SPEC, not just a CONVENTIONS note. That makes it bigger than the starter's lean ("one line in PHILOSOPHY and scope-boundaries").
- **Pinnable URL without release assets:** `raw.githubusercontent.com/fakeneuron/flaitron/<tag>/install.sh` serves the file at a tag, so the starter's "per-release asset" option is not needed to get a pinnable URL. Note that CONVENTIONS also declines release automation.

**Resolved scoping** (AskUserQuestion, 2026-11-01; operator picked the recommended option on all four):
1. **Doctrine — third carve-out.** Ship `install.sh` in flaitron. Amend SPEC.md #2 + §NOT provide, scope-boundaries, PHILOSOPHY and CONVENTIONS: the installer is adopter bootstrap that installs the pinned submodule, not a workflow CLI or a package manager. Contract change → the next `/ft-release` takes a minor bump.
2. **Serving — tag URL, `/ft-release` bumps it.** README shows `raw.githubusercontent.com/fakeneuron/flaitron/vA.B.C/install.sh`, and Step 5 of the release recipe rewrites the tag. No `main`-served path is advertised. Release assets and signing stay out of scope.
3. **Defaults — the starter's.** Wire every detected agent and print what was wired (`FLAITRON_AGENTS` overrides). Global clone + ft-adopt link on by default (`FLAITRON_NO_GLOBAL=1`). ft-adopt's "explicit request" line is updated to match.
4. **Shape — one task.**

**Assumptions** (from the starter's "Open at promotion" leans, not asked): `.flaitron/backup/` joins the adopter gitignore guidance. The network-dependent install CI is accepted, path-filtered to `install.sh` + its workflow (CONVENTIONS' "deterministic gate" argument against `npm audit` applies, so it stays a separate workflow and never joins `ci.yml`'s Pair-H-bound `validate` job). The README URL is written at `v8.3.0`, the minor this carve-out implies. It 404s until that tag is cut, and `/ft-release` Step 5 sets it on every cut. Live API / clone calls in tests send a project User-Agent, never the operator email. Tests sandbox `HOME` so the real `~/.claude/skills` and `~/code/flaitron` are never touched.

**Starter context (preserved verbatim; it carries the requirements brief):**

> Source: Grok Task Notes/Flaitron one-line installer starter tasknote.md (2026-10-28), read at flaitron@80e7dad7
>
> > **Format:** light Flaitron starter tasknote. Codemaster files it; Jude hands it to a coding agent, which promotes it with `/ft-task <ID>`.
> > **Codemaster's role:** planning only. No code, pushes or releases from Codemaster.
>
> ## 🌱 Starter context
>
> _Captured 2026-10-28 by Codemaster at Jude's request. Read at flaitron release v8.0.0 (commit `80e7dad7`). Drift-check at promotion._
>
> _Intake note (2026-10-31): HEAD is now v8.1.0. `281994bc` (CORE-848) touched `README.md` since the read; `install.sh` is still absent. The flaitron repo is public._
>
> ### Why this exists
>
> Adopting Flaitron today is a manual clone + global `/ft-adopt` link + `git submodule add` + tag checkout + sparse-checkout + skill symlinks (README Quickstart, docs/MIGRATION.md §1.0–1.1). Jude wants one command that does those steps safely, then hands off to `/ft-adopt`:
>
> ```sh
> curl -fsSL https://raw.githubusercontent.com/fakeneuron/flaitron/main/install.sh | sh
> ```
>
> ### Feasibility
>
> - **Verdict:** Feasible. **S–M**, one task (about 1–2 agent-days), plus an optional release-assets follow-up.
> - **Evidence:** a working prototype exists, but it is **local-only on Codemaster's box** (branch `local/one-line-installer`, not pushed). The coding agent can't see it, so the requirements below are the brief. It came to about 384 lines of POSIX sh plus a 70-line CI workflow. Shellcheck was clean, and fresh install, rerun, pinned update and edge cases all passed in a temp repo.
> - **Facts that shape the design:**
>   - All releases have **0 assets** (no SHA256SUMS), and tags are **unsigned**. Integrity today can only be "local tag commit == commit GitHub reports".
>   - `/ft-adopt` Step 0 bails if `.flaitron/core` already exists, so it needs a one-paragraph exception or the installer's "next: run /ft-adopt" fails.
>   - Unauthenticated GitHub API is 60 calls/h per IP, so a `git ls-remote` tag fallback is needed.
> - **Unknowns:** none of the agent CLIs (Claude, Codex, Cursor, Grok) were runtime-tested. Cursor-only and Grok-only home paths (`~/.cursor/skills`, `~/.grok/skills`) are inferred, not documented.
>
> ### Requirements (the brief)
>
> 1. POSIX `install.sh` at the repo root, all logic inside `main()` (a truncated download does nothing). Subcommands `install` (default) and `update`.
> 2. **Version:** resolve the latest release explicitly (GitHub `releases/latest`, fallback highest semver tag via `git ls-remote`), print it and its source. `FLAITRON_VERSION=vX.Y.Z` pins; `main` or any branch is refused. A rerun keeps the existing pin; only `update` moves it.
> 3. **Integrity:** before changing anything, read the tag's peeled commit from GitHub. After checkout, verify HEAD == tag == that commit and print the SHA. `FLAITRON_SHA` aborts on mismatch with nothing changed. Report the tag as unsigned; never fake a checksum.
> 4. **Safety:** refuse outside a git repo, in the flaitron repo itself, on a foreign `.flaitron/core`, and on symlinked skill roots. Idempotent. Replace only Flaitron symlinks; back up anything else first to `.flaitron/backup/<path>.bak.<ts>` (project) or `~/.local/state/flaitron/backup/` (home). Backups never go inside skill dirs (they'd load as duplicate skills). Commit nothing.
> 5. **Agents:** detect Claude (`.claude/skills`), Codex (`.agents/skills`), Cursor-only (`.cursor/skills`) and Grok-only (`.grok/skills`), project dirs first, then CLIs/home dirs, default Claude. `FLAITRON_AGENTS` overrides. Read the link roster from the **pinned** snippets' literal `ln -s` blocks (no restated roster).
> 6. **Machine side:** clone to `~/code/flaitron` at the tag and link global `/ft-adopt`. `FLAITRON_NO_GLOBAL=1` opts out; `FLAITRON_HOME` relocates. Leave an existing clone alone if it's on a branch or dirty.
> 7. Ends with "Next: run /ft-adopt (Codex: $ft-adopt)".
>
> ### Files to touch (preliminary survey — drift-check at promotion)
>
> - `install.sh` (new) — the installer.
> - `.github/workflows/install-test.yml` (new) — shellcheck plus a real temp-repo install, rerun, pinned update and update-to-latest on ubuntu and macOS.
> - `README.md` — the one-liner becomes the Quickstart; manual clone+symlink stays as "Manual install (fallback)"; pin/update usage.
> - `claude/skills/ft-adopt/SKILL.md` — Step 0 exception: if `.flaitron/core` is the flaitron submodule at a release tag, `PLAN.md` is absent and all `ft-*` links point into `.flaitron/core/`, continue, keep that pin, skip Step 2 except sparse-checkout, and only add missing links. (Codex wrapper delegates to this body.)
> - `docs/CONVENTIONS.md` — decision note: a shell script, still no package manager; `npx`/`uvx` stay declined.
> - Possibly: `docs/MIGRATION.md` §1.0, `docs/AGENT-NEUTRALITY.md`, `SPEC/layout.md`, PHILOSOPHY / `SPEC/scope-boundaries.md` (see Discovery questions).
>
> ### Execution plan for the coding agent (guidance, not binding)
>
> 1. Drift-check the files above against HEAD (including the snippets' `ln -s` blocks and ft-adopt Step 0).
> 2. Write `install.sh` to the requirements.
> 3. Add the ft-adopt Step 0 exception and the CONVENTIONS note.
> 4. Rewrite the README Quickstart.
> 5. Add the CI workflow.
> 6. **Checks to run:** `shellcheck -s sh install.sh`; a temp-repo install, rerun (no CREATED/BACKUP lines), `FLAITRON_VERSION=<previous> … update`, then `update` to latest; refusals for `FLAITRON_VERSION=main`, outside a repo and a bad `FLAITRON_SHA`; `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`.
>
> ### Explicitly out of scope
>
> - Release assets and tag signing (separate follow-up, see Discovery questions).
> - `npx`/`uvx`/marketplace wrappers.
> - Retired-link pruning (stays with `/ft-update`; the installer only reports dangling links).
>
> ### Discovery questions (Grok's proposal; leans are evidence, not locked decisions)
>
> Added at intake:
>
> - **Q1 — Doctrine change.** `docs/CONVENTIONS.md` §"Package-manager and marketplace distribution" says Flaitron is distributed as a git submodule only and accepts adoption friction as the price of the pin; `docs/PHILOSOPHY.md` "Zero scripts" and `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" bound scripts to the `tools/update-adopters.mjs` exception. Does a bootstrap installer that still installs the submodule fit, and what wording records it? Lean (Grok): add one line to PHILOSOPHY and scope-boundaries — the installer is adopter bootstrap, not a workflow CLI.
> - **Q2 — Supply-chain risk.** The flaitron repo is public, so `curl … main/install.sh | sh` lets anyone who can push to `main` run code on adopters' machines. Is serving from `main` acceptable, or only a per-release pinned URL? Lean (Grok): see the first row below.
>
> From the source note:
>
> | Question | Options | Lean |
> |---|---|---|
> | Where `install.sh` is served from | `main` / per-release asset | **Both:** `main` for the one-liner, plus `/ft-release` attaching `install.sh` to each release for a pinnable URL. `main` alone means anyone who can push to main controls adopters' machines. |
> | Checksums and signing | Now / follow-up | **Follow-up starter:** `/ft-release` publishes `SHA256SUMS` and signs tags; the installer verifies when present. |
> | Multi-agent wiring | Wire every detected agent / one, others via `FLAITRON_AGENTS` | **Every detected agent** (Jude's requirement), but print what was wired. Note ft-adopt says "multiple surfaces only on explicit request", so update that line to match. |
> | PHILOSOPHY "zero scripts" / "no CLI" | Add a line / leave | **Add one line** to PHILOSOPHY and scope-boundaries: the installer is adopter bootstrap, not a workflow CLI. |
> | Global side effects | On by default / opt-in | **On by default** with `FLAITRON_NO_GLOBAL=1` to skip; README says so plainly. |
>
> ### Open at promotion
>
> - Should `.flaitron/backup/` be added to the adopter `.gitignore` guidance? Lean: yes.
> - The CI is network-dependent (resolves the live latest release). Acceptable? Lean: yes, path-filtered to `install.sh` changes.
>
> ### Related
>
> - CodeMentor 2026-10-28 recap item 2 (installer requirements).
> - Drive: "Flaitron One-Line Installer Draft Oct 28.md" (Codemaster/flaitron) has the full prototype diff for reference.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** The roster parse follows `codex/reconcile-skills.md`'s awk over the snippet's literal `ln -s` lines, with destination-dir anchoring, and the output vocabulary follows its `CREATED` / `REMOVED` report lines (`CREATED` / `REPLACED` / `BACKUP` / `MOVED` / `OK` / `DANGLING`). The test sits beside the other tool self-tests in `tools/` (`install.test.sh`, like `drift-checks.test.mjs`). The CI workflow copies `ci.yml`'s pinned `actions/checkout` SHA, `permissions: contents: read` and concurrency shape. New shape justified: POSIX sh, because `curl | sh` is the delivery contract.
- **Integrity source.** `git ls-remote refs/tags/<tag>^{}` gives the peeled commit from GitHub without an API call. The API is used only for `releases/latest`, which falls back to `ls-remote` semver.
- **Design decisions beyond the brief:**
  1. Refuses once `.flaitron/PLAN.md` exists and points at `/ft-update`, so it never becomes a second bump path. That keeps the scope-boundaries entry honest: it "writes nothing a manual §1.0–1.2 adoption would not".
  2. Skips sparse-checkout and leaves it to ft-adopt per the brief's exception.
  3. `exec </dev/null` at the top of `main`, so nothing reads the rest of a piped script as input.
  4. The global clone moves only on `update`. An `install` against a differently-pinned detached clone leaves it and says so.
  5. A symlinked `.flaitron/core` is refused (hand-managed).
  6. Global `ft-adopt`: **one** agent-home copy per machine, not one per agent. That copy goes to the first detected agent's home (Claude first), and nothing is added if any agent home already has one (`docs/PLATFORMS.md` §"One canonical install path"; review rounds 1 and 2). Cursor/Grok homes `~/.cursor/skills` / `~/.grok/skills` are inferred paths, as the starter flagged.
- **Test harness:** `tools/install.test.sh` (47 assertions in 6 scenarios: fresh, rerun, pinned update + update to latest, 9 refusals, backups + branch-clone-left-alone, `FLAITRON_AGENTS` override). The link count is read from the pinned snippet, never a hard-coded 7.
- **Doctrine:**
  - SPEC.md #2 now points at §NOT provide, which now lists two CLI carve-outs (`Both` → `The carve-outs above`).
  - scope-boundaries: second carve-out paragraph; drift-checks is "none of these".
  - PHILOSOPHY and VISION name the installer.
  - CONVENTIONS: a non-reversal note under the package-manager decline, plus an install-test workflow paragraph in §CI.
  - SPEC/layout.md had a stale "the singular CLI carve-out" wording on the tools/ line, fixed with an `install.sh` row added.
- **Release recipe:** `/ft-release` Step 5 gains edit 4, which sets the README installer URL tag. "3 version edits" → "4" across SKILL.md, step-5-dogfood-sop.md and step-7.1-standing-checks.md. The Step 4 drift-check line and Step 6 lint list include README.
- **Sizes:** SPEC.md 44,428 → 44,818 (cap 49,000); ft-adopt 15,199 → 16,297; ft-release 36,857 → 37,336 (cap 40,000).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface (shell script, CI, markdown)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (2026-11-01, live GitHub; latest release v8.2.0, previous v8.1.0):

```text
shellcheck -s sh install.sh tools/install.test.sh                    → 0
tail -n1 install.sh | grep -qxF 'main "$@"'                          → 0
    (Acceptance wrote `grep -qx 'main "\$@"'`; BSD grep reads the `$` as an anchor → 1. Same assertion as -F.)
TMPDIR=<scratchpad> sh tools/install.test.sh install.sh dash         → 0   (ALL PASS, 47 checks)
TMPDIR=<scratchpad> sh tools/install.test.sh install.sh bash --posix → 0   (ALL PASS)
grep 'ft-task|ft-file-task|ft-update' install.sh                     → 2 hits, both user-facing messages; no roster
grep -q install.sh install-test.yml && ruby -ryaml -e YAML.load_file → 0
grep -q install.sh claude/skills/ft-adopt/SKILL.md                   → 0
doctrine loop (SPEC.md, scope-boundaries, PHILOSOPHY, CONVENTIONS)   → prints nothing
grep -q install.sh SECURITY.md                                       → 0
grep -q raw…/flaitron/v README.md && grep -q flaitron/backup MIGRATION.md → 0
grep -q install.sh ft-release/SKILL.md && ! grep -rq '3 version edits' ft-release/ → 0
grep -q install.sh AGENTS.md                                         → 0
bash tools/drift-checks.sh                                           → 0   (all 19 checks ok, context_budget included)
node --test tools/drift-checks.test.mjs                              → 0   (21 pass)
```

Structural: no duplicated roster (read from the pinned snippets); the only shared logic with `reconcile-skills.md` is the awk shape, by design (different contract: the installer backs up instead of stopping on conflicts). No dead helpers; shellcheck clean. Stale docs swept: the "singular / one carve-out" wording is fixed in SPEC.md, scope-boundaries, SPEC/layout.md, README layout, VISION and PHILOSOPHY.

**External review, round 1** (`/code-review medium`, working tree only; 10 findings):
1. **blocker:** an uninitialized `.flaitron/core` got `git submodule update --init` before the URL and `FLAITRON_VERSION` refusals, so the tree changed. Fixed: `FLAITRON_VERSION` is validated first, and the URL is looked up per path and checked before anything else. An uninitialized submodule is now refused ("run git submodule update --init first"), never initialized. Regression tests added (main / foreign URL / flaitron URL, each with an unchanged snapshot and no `.git/modules`).
2. **blocker:** the harness's `ARGS=update run …` prefix assignment persists after a function call under `bash --posix` (macOS `sh`), so scenarios 4–6 silently ran `update` there. The receipt passed without deciding the default path on macOS. Fixed: `CMD` is set as its own statement, with a comment saying why. Also re-run under macOS `sh`.
3. **note:** the test required the source to be "GitHub releases/latest", which flakes when the CI runner IP is rate limited. Fixed: either source accepted.
4. **note:** global `ft-adopt` was linked once per agent, but `~/.agents/skills` is read by Claude/Cursor/Grok too, and a Codex wrapper there gets served to Claude (`docs/PLATFORMS.md` §"One canonical install path per project"). Fixed: one agent-home copy (the first detected agent, Claude first), with a note naming the others. Project-level wiring of every detected agent is unchanged (operator decision).
5. **note:** `FLAITRON_VERSION` on a plain `install` moved an existing pin. Fixed: `install` refuses a differing version and points at `update`. Test added.
6. **note:** an existing (branch/dirty/older-tag) global clone's `ft-adopt` may predate the Step 0 exception. Fixed: a warning when that body lacks "Installer exception". The test asserts it either way, so it keeps working once v8.3.0 is latest.
7. **note:** the README `v8.3.0` URL 404s until the cut. Kept: it's the recorded Discovery assumption under the operator's tag-URL choice, and `/ft-release` edit 4 sets it.
8. **note:** any `*flaitron/*skills/*` symlink was replaced without a backup. Fixed: only links into this install's own prefix (`../../.flaitron/core/`, `$FLAITRON_HOME/`) are replaced; anything else, custom flaitron links included, is backed up. Test added.
9. **note:** the URL check read every `.gitmodules` URL. Fixed with `core_url()` (the entry whose path is `.flaitron/core`) and an exact URL match.
10. **note:** coverage gaps. Added: a dirty global clone, Cursor-only detection, a matching `FLAITRON_SHA` prefix, plus the regressions above (47 → 67 checks).

Re-run after the fixes:

```text
shellcheck -s sh install.sh tools/install.test.sh                    → 0
TMPDIR=<scratchpad> sh tools/install.test.sh install.sh dash         → 0   (ALL PASS, 67 checks)
TMPDIR=<scratchpad> sh tools/install.test.sh install.sh sh           → 0   (macOS /bin/sh = bash 3.2 POSIX mode)
TMPDIR=<scratchpad> sh tools/install.test.sh install.sh bash --posix → 0   (before the final cosmetic shellcheck edit)
bash tools/drift-checks.sh                                           → 0
node --test tools/drift-checks.test.mjs                              → 0   (21 pass)
```

**External review, round 2** (`/code-review medium` over `install.sh` + `tools/install.test.sh`): all round-1 fixes held except fix 4, which held only within one run. Eight findings, all **notes**, so Phase 3 does not restart:
1–2. **Cross-run duplicate.** A later project with a different first agent still added a second agent-home `ft-adopt`, and scenario 7 asserted it. Fixed: an `ft-adopt` already present in any agent home is the machine's one copy, so none is added. Scenario 7 now asserts that.
3. **Case mismatch** (`~/Code` vs default `~/code`; the operator's own layout) backed up and relinked a working link. Fixed: `link_one` treats a link as unchanged when `[ link -ef target ]` (device + inode). bash's `pwd -P` keeps the typed case, so string compares can't work. SC3013 is disabled with a reason (dash/bash/ksh/zsh/busybox support `-ef`). `FLAITRON_HOME` is canonicalized for symlinked parents. A case-insensitive-FS test is added; it runs on macOS only.
4. **Relative `FLAITRON_HOME`** cloned into the project. Fixed: refused unless absolute. Test added.
5. **`FLAITRON_AGENTS=,`** produced `~/ft-adopt`. Fixed: an empty list is refused. Test added.
6. **`.agents` + `.cursor` gives Cursor two copies.** Declined: `cursor/AGENTS-snippet.md` explicitly prefers `.cursor/skills` over `.agents/skills` for Cursor wiring even when Codex is present, and the installer follows that pinned guidance.
7. **`describe --tags` could return a non-release alias tag.** Fixed: `head_release_tag` uses `git tag --points-at HEAD` filtered to semver.
8. **Scenario 3 compared a plain `update` to scenario 1's latest.** Fixed: it compares to that run's own printed resolution.

Unlisted extras, also fixed: `is_release_tag` refuses embedded newlines; tests added for a symlinked `.flaitron/core` and a too-short `FLAITRON_SHA`. An `update` against a dirty core stays untested (it needs one more live clone; the guard is a single `status --porcelain` line).

Final receipt:

```text
shellcheck -s sh install.sh tools/install.test.sh                    → 0
sh tools/install.test.sh install.sh dash          (default TMPDIR)   → 0   (ALL PASS, 77 checks)
sh tools/install.test.sh install.sh sh            (macOS bash 3.2)   → 0   (ALL PASS)
sh tools/install.test.sh install.sh bash --posix  (before last 2 tests) → 0
TMPDIR=<scratchpad> sh tools/install.test.sh install.sh dash         → 0   (before last 2 tests)
bash tools/drift-checks.sh                                           → 0
```

Not run here: the live `install-test.yml` CI run (needs a push), and an `/ft-adopt` hand-off on a real tag (needs the next release; Acceptance marks both `judgment`). The `validate` roster (viz + updater) is untouched by this diff and not re-run.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  - `README.md`: updated (Quickstart rewrite, repo layout).
  - `AGENTS.md`: updated (Repo Layout, installer validation commands).
  - `SPEC.md`: updated (#2 pointer, §NOT provide second carve-out).
  - `docs/MIGRATION.md`: updated (§1.0 installer path, `.flaitron/backup/` gitignore).
  - `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/` snippets: no change (the installer reads their `ln -s` blocks as-is).
  - `docs/CONVENTIONS.md`: updated (non-reversal note, install-test workflow paragraph).
  - `CONTRIBUTING.md`: no change (its global-install guidance points at PLATFORMS, which now covers the installer).
  - `SECURITY.md`: updated (§"One-line installer").
  - `docs/AGENT-NEUTRALITY.md`: no change (no new Claude-specific contract surface).
  - `docs/PLATFORMS.md`: **updated in the sweep**. §"Selection during adoption/update" said multiple surfaces need an explicit request and that these are "not a new installer"; it now names the installer exception and its one-agent-home-copy limit.
  - `claude/CAPABILITIES.md`: no change.
  - `docs/AGENT-COMPAT.md`: no change.
  - `docs/EXTERNAL-AGENTS.md`: no change (no stable-surface row moved).
  - `docs/WORKTREES.md`: no change.
  - `docs/VISION.md`: updated ("Zero scripts" bounded exceptions).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A for the always-loaded layer; AGENTS.md §Validation already carries the installer test commands. Two durable shell facts are recorded in `install.sh` and `tools/install.test.sh` comments, where the next editor will meet them:
  - A `VAR=x func` prefix assignment persists after the call under `bash --posix` / macOS `sh`.
  - bash's `pwd -P` keeps the typed case on case-insensitive filesystems, so compare directories with `-ef`.

**Final Summary:**

Shipped `install.sh`, a one-line adopter installer run as `curl … | sh` from a tag-pinned URL. It pins the flaitron submodule to a release tag and checks it against the commit GitHub reports, wires every detected agent's skill links from the pinned snippets, links one global `ft-adopt`, and hands off to `/ft-adopt`. That required recording a third CLI carve-out in the SPEC doctrine (operator decision), an ft-adopt Step 0 exception, a SECURITY section, and a fourth `/ft-release` version edit that keeps the README URL tag-pinned.

**Recap.**
- **New files.** `install.sh` (≈400 lines POSIX sh). `tools/install.test.sh` (≈190 lines, 77 checks in 7 scenarios, live network, sandboxed `HOME`). `.github/workflows/install-test.yml` (shellcheck plus e2e on ubuntu and macos, path-filtered).
- **Edited.** `SPEC.md`, `SPEC/scope-boundaries.md`, `SPEC/layout.md`, `docs/PHILOSOPHY.md`, `docs/VISION.md`, `docs/CONVENTIONS.md`, `docs/PLATFORMS.md`, `docs/MIGRATION.md`, `SECURITY.md`, `README.md`, `AGENTS.md`, `claude/skills/ft-adopt/SKILL.md`, and three `claude/skills/ft-release/` files.
- **Verification.**
  - shellcheck → 0.
  - E2E → 0 under dash, macOS sh and bash --posix, with both scratchpad and default TMPDIR.
  - `bash tools/drift-checks.sh` → 0 (context_budget included: SPEC.md 44,818 / 49,000).
  - `node --test tools/drift-checks.test.mjs` → 0.
  - Two `/code-review medium` rounds. Round 1 had 2 blockers, fixed, and Phase 3 re-ran. Round 2 had 8 notes: 7 fixed, 1 declined with its reason.
- **Refactors.** None to existing code. In the starter, "integrity" fetched the tag commit via the API; it now uses `git ls-remote`, with the API only for `releases/latest`.
- **Docs.** Swept above; PLATFORMS updated in the sweep.
- **Scope.** Declared 15 entries, changed 19 paths. All covered except one undeclared path: `docs/PLATFORMS.md` (doc-drift sweep). `claude/skills/ft-release/` covers its three files.
- **Maintainability.** The installer restates no roster and no version: it reads the pinned snippets and resolves tags live, so it keeps working across releases without edits. The one recurring touch is the `/ft-release` edit 4 URL tag.
- **Deferred to [[CORE-855]]** (filed in PLAN.md):
  - Cut v8.3.0; until then the README URL 404s.
  - Confirm the first live `install-test.yml` run.
  - Run the one-liner plus the `/ft-adopt` hand-off once on a scratch repo.

**Archived:** 2026-11-01
