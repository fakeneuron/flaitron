---
title: submodule-weight-measure
status: completed
tags: [epic-child, measurement]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-735, CORE-735.3, CORE-735.N]
touches:
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-735.2.md
---

# CORE-735.2 | submodule-weight-measure

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-735]]

## 🎯 Goal

Measure the bytes an adopter pays to add flaitron as a submodule (full, `--depth 1`, `shallow = true`) and per `/ft-update` bump, and record whether shallow clones still resolve release tags, so `.3` can decide on numbers.

## ✅ Acceptance

- [x] Fresh-add table records full / `--depth 1` / `shallow = true` sizes (object store + working tree) — `grep -q '^### Fresh add' .flaitron/tasknote/archive/core/CORE-735.2.md`
- [x] Per-bump table records bytes `/ft-update`'s Step 1 fetch (`fetch --tags`) + Step 3 checkout pull, for a full and a shallow pin — `grep -q '^### Per-bump fetch' .flaitron/tasknote/archive/core/CORE-735.2.md`
- [x] Tag-resolution verdict for shallow clones: does `/ft-update` Step 1 (`tag --sort=-v:refname | head -1`), Step 3 (`checkout <tag>`), and MIGRATION's `describe --tags` pin check work, and at what cost — `grep -q '^### Tag resolution' .flaitron/tasknote/archive/core/CORE-735.2.md`
- [x] Measurement-only: no deliverable outside `.flaitron/` — `git show --name-only HEAD | grep -v '^\.flaitron/'` shows only the commit header

## 🧩 Subtasks

- [x] Fresh-add: `git submodule add` into a throwaway superproject (scratchpad) three ways — default, `--depth 1`, and default with `shallow = true` in `.gitmodules` then re-cloned via `git clone --recurse-submodules` of the superproject; record `.git/modules/.flaitron/core` and working-tree `du`
- [x] Per-bump: pin each variant at `v5.35.0`, run `/ft-update`'s fetch/checkout sequence to `v6.0.0`, record object-store delta and received bytes (`GIT_TRACE2_EVENT` / `du` delta)
- [x] Tag resolution: in each shallow variant, run `tag --sort=-v:refname | head -1`, `describe --tags`, `checkout <tag>`, `show <tag> --no-patch`; note deepening side effects
- [x] Record tables + verdict in Implementation Notes; flag implications for `.3` without deciding it

## 🔗 Related

- [[CORE-EPIC-735]] — parent epic (adopter-footprint)
- [[CORE-735.3]] — consumes these numbers for the footprint decision
- [[CORE-464]] — prior note: CI `validate` needs `fetch-depth: 0` because update-adopters tests check out historical tags

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.3`'s choice (document shallow submodules vs relocate archived tasknotes) is unanchored without measured bytes; nothing in the repo records them. The epic line's "~14.6 MB of 16.9 MB tracked" is a working-tree figure; the object-store and fetch cost is what the shallow option changes.

- [x] Read relevant source files — `claude/skills/ft-update/SKILL.md` Steps 1–3 (fetch `--tags`, `tag --sort=-v:refname | head -1`, `show <target> --no-patch`, `checkout <target>`); `docs/MIGRATION.md` §1.1 (`git submodule add …` then `checkout <tag>`; §"Final pin verification" uses `describe --tags`); `claude/skills/ft-new-project/SKILL.md:50` (same add command).

- [x] **Best Practices Review** — N/A: measurement task, no code or module-boundary change.

- [x] **Archive skim** — area `core` confirmed against README table (`CORE-*` → `archive/core/`). Grepped `shallow|--depth`: only CORE-464 is load-bearing — CI `validate` keeps `fetch-depth: 0` because `update-adopters` tests check out historical release tags; a shallow clone breaks that. Other hits (CORE-224.x "shallow stubs", CORE-663 trial clones, etc.) are unrelated word uses. No prior shallow-submodule decision or ⚠️ superseded pointer on this surface.

- [x] **Drift check** — PLAN line matches; `/ft-update` and MIGRATION commands as cited above. Epic has no `.1` tasknote ("Discovery supplied by audit-repo 2026-10-07"), so no Fan-out to echo. Latest tag `v6.0.0`, previous `v5.35.0`; remote `https://github.com/fakeneuron/flaitron.git` is public.

- [x] No clarifications needed. Assumptions: measure against the public GitHub remote (the URL adopters use), read-only clones into the session scratchpad; per-bump measured on the most recent release step (`v5.35.0` → `v6.0.0`) as representative; sizes from `du -sk` of the object store / working tree plus git's own received-bytes report.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Local reference: this checkout's `git count-objects -vH` → `size-pack: 11.34 MiB` + 4.63 MiB loose (full history, ~18k packed objects).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: measurement-only; the deliverable is the tables below, in this note (PLAN line: "record the table in the tasknote").

- [x] **Minimal refactor gate** — no source touched.

- [x] Implemented the minimal solution — throwaway clones in the session scratchpad against `https://github.com/fakeneuron/flaitron.git` (remote `HEAD` = `v6.0.0` = `d3c5b34`).

- [x] Updated/added tests for non-trivial behavior — N/A: no code.

**Implementation Notes:**

Method. Sizes are `du -sk` (KB, 4 KB-block rounded) of the submodule's object store (`.git/modules/.flaitron/core/objects`) and working tree. Wire bytes are git's own `Receiving objects: 100% (…), N MiB` line. A fresh clone's object store is essentially the received pack, so it stands in for wire bytes there. git 2.x, macOS. For the per-bump runs, a local bare mirror was frozen at `v5.35.0` (`main` reset to `b0cd453`, `v6.0.0` and every other branch deleted, `gc --prune=now`). Each variant was cloned from that mirror, `origin` was repointed at GitHub, and then `/ft-update`'s commands ran verbatim: `fetch --tags --quiet origin` (with `--progress` to capture the size), `tag --sort=-v:refname | head -1`, `show <tag> --no-patch`, `checkout <tag>`, and MIGRATION's `describe --tags`. A submodule gitdir behaves like a standalone repo for these commands, so standalone clones were used.

### Fresh add

| Variant | How | Object store | Tags present | Shallow boundary |
|---|---|---|---|---|
| Full (today's MIGRATION §1.1 / `ft-new-project`) | `git submodule add <url> .flaitron/core` | **11,504 KB** | 64 (all) | — |
| `--depth 1` | `git submodule add --depth 1 <url> …` | **6,280 KB** (−45%) | 1 (tip tag only) | 1 commit |
| `shallow = true`, pin at a non-tip tag (`v5.35.0`) | `.gitmodules` `shallow = true`, superproject `clone --recurse-submodules` | **8,912 KB** (−23%) | 64, each at depth 1 | 65 commits |
| `--depth 1` *without* `shallow = true`, superproject re-cloned | `clone --recurse-submodules` of the depth-1 superproject | **12,240 KB** (full again) | 64 | none |

Working tree is the same for every variant: **18,712 KB**, of which `.flaitron/` (dogfood plan + tasknote archive) is **15,820 KB (~85%)**. Shallow history removes none of it. Only relocating the archive reduces the checkout.

Notes:
- `--depth 1` on `submodule add` covers only the machine that ran it. It is not recorded anywhere, so every collaborator or CI clone of the superproject pulls full history (row 4). Durable shallowness needs `shallow = true` in `.gitmodules`.
- `shallow = true` with a pin behind `main`'s tip clones `--no-single-branch` at depth 1, so it takes every tag's tip commit (65 boundaries). That is why it saves less than `--depth 1`.
- MIGRATION §1.1's follow-up `checkout <tag>` **fails** after a `--depth 1` add unless the tag is `main`'s tip: `error: pathspec 'v5.35.0' did not match any file(s) known to git`. The older tag first needs `fetch --depth 1 origin tag <tag>`.

### Per-bump fetch

Bump `v5.35.0` → `v6.0.0` (one release step), running `/ft-update` Step 1 + Step 3 exactly as written:

| Starting pin | `fetch --tags` received | Object store before → after | Notes |
|---|---|---|---|
| Full clone | **437.78 KiB** (357 objects) | 11,044 → 12,076 KB | baseline |
| `--depth 1` single-branch | **4.30 MiB** (16,438 objects) | 6,088 → **13,228 KB** | larger than full afterwards: the tag fetch pulls the full history of the 62 older tags |
| `shallow = true` (all tags at depth 1) | **237.44 KiB** (357 objects) | 8,996 → 9,964 KB | cheapest. The older tags are already present, so only the new tip's history comes down |
| `--depth 1` + `fetch --tags --depth 1` (modified recipe) | 2.61 MiB (4,419 objects) | 6,088 → 10,824 KB | still pulls 63 tag tips |
| `--depth 1` + `fetch --depth 1 origin tag v6.0.0` (modified recipe) | **216.12 KiB** (220 objects) | → 7,024 KB | target tag only; Step 1's "latest tag" query then needs `ls-remote --tags` instead of a local `tag --sort` |

### Tag resolution

All variants **resolve tags correctly** after `/ft-update`'s Step 1 fetch. `tag --sort=-v:refname | head -1` → `v6.0.0`, `show v6.0.0 --no-patch` → `tag v6.0.0` (annotated message intact), `checkout v6.0.0` → ok, `describe --tags` → `v6.0.0`. Shallowness costs **bytes, not correctness**, with one exception: as fresh-add notes above show, MIGRATION's first `checkout <tag>` fails on a `--depth 1` add pinned to a non-tip tag.

`describe --tags` worked here only because the pin sits exactly on a tag. On a shallow clone, a pin *between* tags can fail to find an ancestor tag. MIGRATION's pin check always runs on a tag, so this doesn't bite today.

### Implications for `.3` (not decided here)

- Shallow saves at most ~5 MB of object store (11.5 → 6.3 MB). It cannot touch the ~15.8 MB `.flaitron/` working tree, which is the larger and faster-growing share.
- Documenting shallow means `shallow = true` in `.gitmodules`, not `--depth 1` alone. A bare `--depth 1` is silently undone on re-clone, and with today's `/ft-update` recipe it costs ~10× more per bump than a full pin and ends up bigger than full.
- `shallow = true` and today's `fetch --tags` recipe work together (cheapest per bump, tags resolve). MIGRATION §1.1's add-then-checkout sequence would need a depth-aware tag fetch.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; the measurements themselves are the deliverable (commands + raw outputs summarized in Implementation Notes)

- [x] Ran lint/type-check on changed code — N/A: markdown-only diff

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the diff is this one tasknote plus a PLAN stub flip; there is no code for `/code-review` to grade, and Acceptance is decided by the section-presence greps below

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (run against the archive path after the move, before commit):

- `grep -q '^### Fresh add' .flaitron/tasknote/archive/core/CORE-735.2.md` → 0
- `grep -q '^### Per-bump fetch' .flaitron/tasknote/archive/core/CORE-735.2.md` → 0
- `grep -q '^### Tag resolution' .flaitron/tasknote/archive/core/CORE-735.2.md` → 0
- Measurement-only: `git diff --cached --name-only | grep -v '^\.flaitron/'` → 1 (no output; post-commit `git show --name-only HEAD` confirms)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every §"AI-referenced docs" entry (README, AGENTS, SPEC, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION): **no change**. This task only measures, and no doc currently recommends shallow submodules. MIGRATION §1.1's "roughly 14 MB" stays consistent with the epic's 14.6 MB of tracked bytes (`du` gives 15.8 MB with block rounding). Any shallow-docs edits are `.3`'s call.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Task-local: zsh doesn't word-split `$VAR` holding a command, so use a function. The path-access hook flags `2>/dev/null` inside `$(…)` as an outside-repo walk.

**Final Summary:**

Changed files: `.flaitron/tasknote/archive/core/CORE-735.2.md` (new; measurement tables) and `.flaitron/PLAN.md` (the `.2` stub flip only). Verification: three section-presence greps → 0, and no path outside `.flaitron/`. No refactors and no doc changes (verdict above). `touches:` reconciliation: declared `.flaitron/PLAN.md` + the tasknote. Actual: the same two, with the tasknote at its archive path. Headline numbers for `.3`: a full submodule is 11.5 MB of objects plus an 18.7 MB working tree, 15.8 MB of it `.flaitron/`. `--depth 1` saves ~5 MB of objects, but is undone on re-clone and makes today's `/ft-update` bump cost 4.3 MiB instead of 0.44 MiB. `shallow = true` saves ~2.6 MB and gives the cheapest bump (0.24 MiB). All variants resolve release tags. Maintainability effect: `.3` decides from measured numbers rather than the audit's estimate.

**Archived:** 2026-10-08
