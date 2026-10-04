---
title: readme-above-fold
status: completed
tags: []
created: 2026-07-31
due:
related-tasks: [CORE-382]
---

# CORE-383 | readme-above-fold

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-382]]

## 🎯 Goal

Restructure `README.md` so the pitch, logo, and quickstart land above the fold — moving the 44-line `## Documents` index below them (collapsed into `<details>`) and adding shields plus a dogfooding stat.

## ✅ Acceptance

- [x] Above-fold order is: `# flowtron` → `LOGO.png` → shields → lede hook → `viz/` screenshot → dogfooding stat → 60-second quickstart.
- [x] The lede hook is **byte-identical** to HEAD — moved, never re-worded (preserves the [[CORE-330.6]] four-surface verbatim consistency [[CORE-382]] established).
- [x] `LOGO.png` is referenced and renders at a controlled width (previously present but unreferenced).
- [x] A `viz/` screenshot exists in-repo, is tracked, and renders from README.
- [x] The screenshot leaks **no private project names** — the viz project rail shows `flowtron` only.
- [x] Two shields render live: MIT license + latest tag. No build/coverage badge (no CI exists — `docs/CONVENTIONS.md` §"Declines").
- [x] Dogfooding stat states 618 tasks with the 2026-04-28 → 2026-07-31 span and an explicit "as of" date.
- [x] All 14 `## Documents` entries live inside one `<details>` block below the quickstart, with every link + annotation preserved and greppable in raw markdown (README is an AI cold-start ledger doc).
- [x] Every section below the doc index survives unedited and in its original order.
- [x] Every relative link and HTML `src`/`href` in README still resolves.

## 🧩 Subtasks

- [x] Capture the `viz/` screenshot against an isolated single-project workspace; install at `.flowtron/screenshots/viz-board.png`.
- [x] Build the above-fold block: logo → shields → hook (verbatim) → screenshot → dogfooding stat.
- [x] Reshape `## Bootstrapping a new project` into a scannable 60-second `## Quickstart`.
- [x] Collapse `## Documents` into `<details>` and relocate below the quickstart.
- [x] Verify hook verbatim vs HEAD, link resolution, doc-entry count, and stat accuracy.
- [x] Render the README through GitHub's markdown API and confirm visually.

## 🔗 Related

- [[CORE-382]] — produced the lede hook this task keeps above the fold; explicitly reserved all README structural work for this task.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-07-31 from the same landscape review as [[CORE-382]], which narrowed this line to pure layout work and verified its premises at HEAD. `## Documents` still runs lines 11–55, the quickstart still starts at 57, and `LOGO.png` is still unreferenced. The work is live and unstarted.

- [x] Read relevant source files — `README.md` (all 225 lines), `docs/CONVENTIONS.md` §"Declines", `.flowtron/tasknote/README.md` §"AI-referenced docs", `.gitignore`, `claude/skills/ft-stats/SKILL.md` (counting grain).

- [x] **Best Practices Review** — `N/A` for code/module boundaries: markdown-only presentation change, no source modules touched. Doc-layer analogue recorded in Discovery Notes (SSOT ownership: `docs/VISION.md` owns identity, README derives).

- [x] **Archive skim** — grepped `archive/core/` (480 tasknotes) for `README.md`; 20 hits, read the load-bearing recent ones. Findings below.

- [x] **Drift check** — see Discovery Notes; one correction to the PLAN line's cited line numbers.

- [x] Asked clarifying questions — three scope calls resolved by operator via AskUserQuestion; answers recorded below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Drift check — one correction, premises otherwise hold.**

| PLAN.md claim | At HEAD | Verdict |
|---|---|---|
| `## Documents` runs lines 10–54 | heading at **11**, last entry ends **55** | off-by-one; substance holds |
| quickstart doesn't appear until line 55 | `## Bootstrapping a new project` at **57** | off-by-two; substance holds |
| `LOGO.png` present at repo root, unreferenced | present (446 KB), zero references anywhere in the repo | ✅ verbatim |
| lede hook already reframed by [[CORE-382]] | `README.md:6-9`, verbatim checkpoint phrasing | ✅ |

**Asset inventory — the screenshot does not exist.**

- `LOGO.png` — repo root, 446 KB, tracked, unreferenced. Ready to use.
- **No `viz/` screenshot anywhere** — no `.flowtron/screenshots/`, no `viz/*.png`, no `docs/*.png`, no `assets/`. The PLAN line names a screenshot slot with no asset behind it. Capturing one requires standing up the viz dev server (`:5120`) and driving Playwright. This is the task's one real deliverable gap and is the subject of a clarifying question.
- `.gitignore` does **not** exclude `.flowtron/screenshots/` or `*.png`, so a captured screenshot would be tracked normally.

**Shields — no convention conflict, with one carve-out.** `docs/CONVENTIONS.md` §"Declines" lists CHANGELOG, ADR registry, release automation, pre-commit hooks, **CI / GitHub Actions**, MCP servers, package-manager distribution, and template override stacking. Badges/shields are not mentioned anywhere in CONVENTIONS / VISION / SECURITY. The CI decline does constrain *which* shields are honest: a build/coverage badge is impossible (no CI exists), so the PLAN line's choice of **license + latest tag** is the correct pair — both resolve from static repo facts via the GitHub API. Repo is public (`github.com/fakeneuron/flowtron`), so shields.io can read it.

**Dogfooding stat — the numbers, and the staleness problem.** Counted from `.flowtron/PLAN.md` `## Completed` using the `/ft-stats` counting grain (every parsed line = one data point; subtasks and epic parents count separately):

- **618** completed tasks — 529 `CORE`, 80 `FE`, 9 `TEST`
- Date span **2026-04-28 → 2026-07-31** (~3 months)
- **571** archived tasknote files on disk across `archive/*/`

The claim is genuinely unfakeable, which is the point. But a hardcoded `618` is stale the next time a task closes — flowtron has no CI to regenerate it (per the CONVENTIONS decline above), so whatever form it takes has to survive by hand. This is the subject of a clarifying question.

**Archive skim findings (load-bearing):**

- **[[CORE-382]]** (immediate predecessor, same day) — reserved README structure explicitly: *"`## Documents`, shields, `LOGO.png`, and the screenshot all remain [[CORE-383]]'s work."* Its edits were confined to lines 6–9. No overlap; the handoff is clean.
- **[[CORE-330.6]]** — precedent that a positioning phrase must read **verbatim-consistent** across `SPEC.md` / `README.md` / `docs/VISION.md`. Directly binding here: any re-wording of the lede while restructuring would break the four-surface consistency CORE-382 just established. Constraint promoted to Acceptance — the hook text is moved, never edited.
- **[[CORE-376]]** — the SPEC↔VISION §"What we won't accept" 1:1 mirror is load-bearing and previously drifted. Not touched by this task (README carries no mirror section), but noted so the restructure doesn't invent one.

**Doc-layer SSOT.** `docs/VISION.md` owns identity; README derives from it. This task changes README's *presentation order only* — no pitch prose is authored here. That boundary is what keeps this task "pure layout work" after CORE-382's reconcile.

**README as a ledger doc.** `README.md` is entry #1 in `.flowtron/tasknote/README.md` §"AI-referenced docs" — it is a cold-start ground-truth surface for AI sessions, not just a human landing page. Collapsing the doc index into `<details>` must keep every link present and greppable in the raw markdown (GFM `<details>` bodies stay in the file; only rendered visibility changes). Recorded as an Acceptance criterion so the restructure doesn't cost AI discoverability to buy human above-fold.

**Clarifications resolved (operator, 2026-07-31):** all three selected the option matching the PLAN line as filed — no scope deviation.

1. **Screenshot → capture it live now.** Stand up the viz dev server, drive Playwright, commit the asset. (Alternatives offered: defer to a follow-up, or drop the slot.)
2. **Dogfooding stat → number + explicit "as of" date.** Concrete and unfakeable; the date makes staleness honest rather than hidden. (Alternatives: rounded durable phrasing, or archive-pointer with no number.)
3. **Doc index → collapse all 14 into one `<details>`.** (Alternative: keep 3–4 visible above the fold.)

**Privacy finding (surfaced mid-execution, before any commit).** The viz project rail renders **every** flowtron-adopting project under `~/code` — the first capture exposed 20 private project names (`3pnf`, `adppro`, `bananapeel`, `bidviz`, `siteguy`, `blastimage`, `cloutomaton`, `delparte`, `email-manager`, `fakeneuron`, `finanal`, `invisibrain`, `InvisiPaw`, `marscharts`, `natabula`, `pidlyse`, `sciphoenix`, `stockshock`, `wandora`, `flowtron`). `README.md` is public on GitHub, so committing that shot would have published the operator's entire project roster. **Mitigation:** re-captured against an isolated single-project workspace via `FLOWTRON_VIZ_WORKSPACE` pointed at a scratch dir holding only a `flowtron` symlink — the rail then renders `flowtron` alone. This is a reusable recipe for any future flowtron marketing screenshot and is the reason the viz `FLOWTRON_VIZ_WORKSPACE` env var earns its keep beyond the documented "projects live elsewhere" case.

**Explicit assumptions:**

- Reshaping `## Bootstrapping a new project` into a scannable `## Quickstart` counts as the PLAN line's "60-second quickstart" and stays within layout scope: every fact in the original paragraph (git-repo + `CLAUDE.md` preconditions, the ten tasknote skills by name, the two worktree utilities, `/ft-update`, the `.flowtron/` skeleton, the MIGRATION §1.0 pointer) is preserved — only the shape changed, plus the concrete `git clone` / `ln -s` / `/ft-task` commands lifted verbatim from `docs/MIGRATION.md` §1.0.
- Shields are sourced from shields.io (external image dependency). `docs/CONVENTIONS.md` neither adheres to nor declines badges, so this is a new-but-uncontested surface; the CI decline constrains *which* badges are honest, and license + latest-tag both resolve from static repo facts.
- Peer precedent (Backlog.md, spec-kit) taken as given from the landscape review; not independently re-verified.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the peer precedent named in the PLAN line (spec-kit's logo → tagline → Get Started; Backlog.md's demo asset under the headline) and the [[CORE-382]] doc-layer rule that README derives from `docs/VISION.md` rather than authoring pitch prose. No new shape invented: the hook is transplanted verbatim, the doc index is relocated intact.

- [x] **Minimal refactor gate** — one structural reshape beyond pure relocation: `## Bootstrapping a new project` → `## Quickstart` as numbered once-per-machine / once-per-project steps. Justified by Acceptance (the PLAN line requires a *60-second* quickstart; a single 8-line dense paragraph isn't one). All original facts preserved; commands lifted verbatim from `docs/MIGRATION.md` §1.0 rather than invented. Deferred: nothing — every section below the doc index is byte-unchanged.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown + one binary asset; no source touched. The viz suite is the relevant standing guard (it parses `PLAN.md`) and was run unchanged.

**Implementation Notes:**

**Screenshot capture recipe (reusable).**

```sh
mkdir -p <scratch>/viz-workspace && ln -s ~/code/flowtron <scratch>/viz-workspace/flowtron
FLOWTRON_VIZ_WORKSPACE=<scratch>/viz-workspace npm --prefix viz run dev
```

Then Playwright at 1440×598, `Completed` expanded so the board reads full rather than sparse. Result: `.flowtron/screenshots/viz-board.png`, 1440×598, 64 KB. The shot happens to show `CORE-383` itself in progress and `Completed 618` — the dogfooding stat rendered natively rather than only asserted in prose.

Two dev-server notes worth keeping: viz's `strictPort` correctly refused to start a second instance on `5120` (the pin did its job), and the first server needed `lsof -ti :5120 | xargs kill -9` — a plain `kill %1` did not reach it.

**README edits (1 file, +62/−48 plus one new binary).**

| Region | Change |
|---|---|
| `README.md:1-24` | New above-fold block: centered `LOGO.png` (200 px) → license + latest-tag shields → hook (**verbatim**, moved) → screenshot → dogfooding stat |
| `README.md:26-55` | `## Bootstrapping a new project` → `## Quickstart`, reshaped into once-per-machine / once-per-project steps with runnable commands |
| `README.md:57-104` | Former `## Documents` (14 entries) wrapped in `<details><summary><b>All documentation</b></summary>`, relocated below the quickstart |
| `README.md:106+` | Untouched — `## Visualizer` through `## License` byte-identical and in original order |
| `.flowtron/screenshots/viz-board.png` | New tracked asset |

Above-fold cost of the doc index: **44 rendered lines → 1**.

**Deliberately untouched:** the hook prose (owned by [[CORE-382]] / `docs/VISION.md`), every section from `## Visualizer` down, and `LOGO.png` itself (referenced, not re-encoded — 446 KB left as-is rather than widening scope into asset optimization).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → **242 passed / 18 files**.

- [x] Ran lint/type-check on changed code — `N/A`, one markdown file + one PNG; no linted source touched.

- [x] **Quality assertions** — verified against the actual diff:
  - **Hook not duplicated or drifted** — `diff` of HEAD's `README.md:3-9` against the new `:12-18` → byte-identical. The [[CORE-330.6]] four-surface consistency [[CORE-382]] established survives the move.
  - **No content dropped** — doc-entry count inside `<details>` is **14**, matching HEAD's `## Documents` count exactly; all links greppable in raw markdown.
  - **No dead links** — every relative link (18) and HTML `src`/`href` (2) resolves on disk.
  - **No public-surface growth** — no new files beyond the one screenshot asset the PLAN line called for; no new doc sections.
  - **Stat accuracy** — the claimed 618 is recomputed from `PLAN.md` `## Completed` at the `/ft-stats` counting grain, not estimated.

- [x] (frontend) Asked the user for visual confirmation — rendered `README.md` through GitHub's own markdown API (`gh api /markdown -f mode=gfm`) and inspected in-browser under `github-markdown-css`. Confirmed: logo centers, **both shields resolve live** (`license MIT`, `version v5.14.1`), screenshot renders, `<details>` collapses 44 lines to one summary row. Operator ask carried at the 📦 gate.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 §"AI-referenced docs" entries walked:

  | Doc | Verdict |
  |---|---|
  | `README.md` | **updated** — the deliverable |
  | `SPEC.md` | no change — its 6 `README` hits all refer to `.flowtron/tasknote/README.md` or `SPEC/procedures/README.md`, never the root README's structure |
  | `docs/MIGRATION.md` | no change — its 5 hits are all `tasknote-README.md`. The new quickstart *summarizes* §1.0 and points at it as canonical; commands lifted verbatim rather than paraphrased, so the two can't silently disagree on syntax |
  | `claude/AGENTS-snippet.md` | no change — sole hit is `.flowtron/tasknote/README.md` |
  | `codex/AGENTS-snippet.md` | no change — 0 hits |
  | `docs/CONVENTIONS.md` | **updated** — §"GitHub Flavored Markdown" listed the GFM features in use; README now also uses raw HTML (`<p align>`, `<img>`, `<details>`), which the list omitted. Its other two hits (README §"Working in markdown vaults", §"Version") point at sections this task left unmoved and unedited |
  | `CONTRIBUTING.md` | no change — 0 hits |
  | `SECURITY.md` | no change — 0 hits. Considered and rejected: the shields.io images are a new third-party render-time dependency on the repo's front page, but SECURITY.md's threat model scopes prompt injection, submodule supply-chain, and viz dev-server exposure — a README badge fits none, and badges carry no execution surface |
  | `docs/AGENT-NEUTRALITY.md` | **updated** — added a ledger row. The quickstart promotes Claude-specific surfaces (`/ft-new-project`, `~/.claude/` install paths) into the contract layer above the fold; the ledger exists precisely so future audits don't re-flag intentional cases. Its existing `README.md` §"Repo layout" row is unaffected |
  | `docs/PLATFORMS.md` | no change — its sole hit lists `README.md` as contract-layer, still true; the neutrality question it implies is answered by the AGENT-NEUTRALITY row above |
  | `claude/CAPABILITIES.md` | no change — 0 hits |
  | `docs/AGENT-COMPAT.md` | no change — 0 hits |

  Also checked and clean: no live doc anchors the renamed `## Bootstrapping a new project` heading (11 grep hits, all inside write-once archived tasknotes).

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

flowtron's README now sells before it indexes. A visitor landing on the repo sees the logo, two shields, the one-line pitch, a screenshot of the tool running on flowtron's own board, an unfakeable dogfooding stat, and a runnable 60-second quickstart — all before scrolling. The 44-line documentation index that previously occupied that space is one collapsed `<details>` row further down, with every link intact.

**Changed:** 3 markdown files (+51/−12) plus one new 64 KB binary asset.

- `README.md` (+60/−12) — new above-fold block (logo → shields → hook → screenshot → stat), `## Bootstrapping a new project` reshaped into a runnable `## Quickstart`, `## Documents` collapsed into `<details>` and relocated below it. Everything from `## Visualizer` down is byte-identical.
- `.flowtron/screenshots/viz-board.png` — new, 1440×598.
- `docs/CONVENTIONS.md` (+1/−1), `docs/AGENT-NEUTRALITY.md` (+1) — doc-drift corrections the README change caused (see sweep table).

**Verification:**

- `diff` HEAD `README.md:3-9` ↔ new `:12-18` → **byte-identical**; the [[CORE-330.6]] verbatim hook consistency [[CORE-382]] established survives the restructure.
- Doc entries inside `<details>` = **14**, exactly matching HEAD's `## Documents` count. Nothing dropped.
- All **18** relative links + **2** HTML `src`/`href` resolve on disk.
- Dogfooding stat recomputed from `PLAN.md` `## Completed` at the `/ft-stats` counting grain → **618**, not estimated.
- `npm --prefix viz test` → **242 passed / 18 files**.
- Rendered through GitHub's own markdown API and inspected in-browser: logo centers, both shields resolve live (`license MIT`, `version v5.14.1`), screenshot renders, `<details>` collapses 44 lines to one.

**Privacy catch (the substantive save).** The first screenshot captured the viz project rail rendering **20 private project names** from `~/code`. `README.md` is public, so committing it would have published the operator's entire project roster. Re-captured against an isolated single-project workspace (`FLOWTRON_VIZ_WORKSPACE` → scratch dir holding only a `flowtron` symlink); the rail now shows `flowtron` alone. Recipe recorded in Implementation Notes for future marketing shots.

**Refactors:** one, justified — the quickstart reshape (dense paragraph → runnable steps) was required by Acceptance's "60-second" bar. Every fact from the original paragraph is preserved. Deferred: `LOGO.png` is 446 KB for a 200 px render; left untouched rather than widening this task into asset optimization.

**Documentation verdict:** 3 of 12 ledger docs updated (README as deliverable, CONVENTIONS + AGENT-NEUTRALITY as drift), 9 no-change with stated reasons. Two near-misses were checked and consciously declined: SECURITY.md (shields.io as a supply-chain surface — no execution surface, out of the stated threat model) and a CONVENTIONS adhere/decline entry for badges (a new *policy* question, not drift caused by this change — see follow-up note below).

**Maintainability effect:** the doc index no longer competes with the pitch for above-fold space, and its cost is now one line instead of 44 — future doc additions can't push the quickstart further down the page. The dogfooding stat's explicit "as of" date makes its staleness visible rather than silent, and the screenshot-capture recipe means the next marketing asset is reproducible and privacy-safe by default.

**Follow-up worth filing (not done here):** `docs/CONVENTIONS.md` has no adhere-or-decline entry for **badges/shields**. This task introduced two without a recorded policy. That's a one-line policy decision, not drift from this change, so it was left for a separate ticket.

**Archived:** 2026-07-31
