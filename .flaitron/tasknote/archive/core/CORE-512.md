---
title: agents-line-16-density
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-509, CORE-510]
touches:
  - AGENTS.md
---

# CORE-512 | agents-line-16-density

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-509]] · [[CORE-510]]

## 🎯 Goal

Break `AGENTS.md:16` — a 756-char single line carrying the peer-skill roster plus a five-clause `KEEP IN SYNC` comment — into a readable shape so the sync contract riding inside it is not scrolled past during a release edit.

## ✅ Acceptance

- [x] `AGENTS.md` no longer carries a four-figure-char line — the roster bullet and the `KEEP IN SYNC` comment are reflowed so no line is a multiple-× outlier against the file's other prose lines
- [x] All five `KEEP IN SYNC` clauses survive with their meaning intact, one clause per line, inside a labeled multi-line HTML comment (still an HTML comment — maintainer-only, never rendered, never pasted by adopters)
- [x] The comment stays adjacent to the roster bullet it guards (not relocated to the end of the section), so a release edit to the roster meets it
- [x] Pair F release gate still clean: `--low` / `--med` / `--fut` / `--high` all still grep-present in `AGENTS.md`
- [x] Pair H release gate still clean: `AGENTS.md` §"Validation" extraction still yields the same six commands in the same order
- [x] Pure reflow — no clause added, dropped, or reworded beyond line-splitting — **met with one noted deviation:** clause 5's scope half ("this pairing also covers the path-convention bullets") moved up into a new two-line header that also names the mirror path `claude/AGENTS-snippet.md:9`. Additive structure; no obligation added, dropped, or weakened

## 🧩 Subtasks

- [ ] Split the peer-skill roster bullet (`AGENTS.md:16`) across wrapped lines, leaving the roster itself byte-identical in content
- [ ] Lift the `KEEP IN SYNC` comment into a multi-line HTML comment indented as a continuation of that bullet, one clause per line under a short label
- [ ] Re-measure `AGENTS.md` line lengths; confirm the outlier is gone
- [ ] Run the Pair F and Pair H release-gate checks against the edited file

## 🔗 Related

- [[CORE-509]] — widened the keep-in-sync scope on this same comment
- [[CORE-510]] — dereferenced the adopter paste-block that this comment points at

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The line is live and *worse* than filed — 1058 chars, 5.1× the file's next longest (207). The finding stands as written; only its magnitude drifted.

- [x] Read relevant source files — read `AGENTS.md` in full, `claude/AGENTS-snippet.md`'s mirrored comment (`:9`), and `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pairs F + H (the only release gates that read `AGENTS.md`).

- [x] **Best Practices Review** — `N/A`, docs-only reflow; no code, no module boundaries, no dependency direction touched.

- [x] **Archive skim** — `grep -l "AGENTS.md" archive/core/*.md` is broad noise (most recent notes cite it generically), so narrowed to the two direct predecessors on this exact line: `CORE-509` (widened the comment's scope to cover the path-convention bullets) and `CORE-510` (dereferenced the adopter paste-block, adding the "since CORE-510 names the skills and points there" clause). Both *lengthened* the comment — see Drift check. `CORE-509` also traced the comment's origin to `CORE-318` (`dedup-peer-skill-roster`, rotated to `PLAN-ARCHIVE.md:179`), which minted the reciprocal `KEEP IN SYNC` pair. No prior decision constrains the comment's *formatting* — only its content and its reciprocity with `claude/AGENTS-snippet.md:9`.

- [x] **Drift check** — **Drift found, magnitude only.** PLAN.md says 756 chars / 3.6× the next longest; the line measures **1058 chars / 5.1×** today. Cause: the audit measured before `CORE-509` (98ac735) and `CORE-510` (580181d) landed, both of which appended clauses to this comment. Clause count still five, as filed. Contract cross-reference: nothing in `SPEC.md` or `SPEC/*` governs `AGENTS.md` line layout; the two release gates that read this file are Pair F (file-wide presence grep for the four park-priority flags — blind to line structure) and Pair H (`awk '/^## Validation$/,/^## Dev Server$/'` — a different section entirely). Neither constrains this edit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  - The comment stays an **HTML comment**, not visible prose — it is maintainer-only metadata, and its mirror at `claude/AGENTS-snippet.md:9` states the invariant outright ("sits outside the fence so adopters never paste it").
  - Scope is `AGENTS.md` only. The mirrored comment at `claude/AGENTS-snippet.md:9` is also long (~830 chars) but already sits on its own line rather than riding a bullet, so it does not have the failure this task names; the `KEEP IN SYNC` pairing governs *content*, not layout, so reflowing one and not the other breaks no contract.
  - Pure reflow: clause wording is preserved, line-splitting only.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The shape of the problem.** `AGENTS.md:16` is two things welded together: a
~310-char peer-skill roster bullet, and a ~745-char five-clause `KEEP IN SYNC`
comment appended to its tail. The comment is the load-bearing half — it is the
only thing telling a release editor that the roster is mirrored in
`claude/AGENTS-snippet.md` — and it is the half a reader is guaranteed to miss,
because it begins ~310 chars into a line no editor soft-wraps helpfully.

**Placement constraint.** A block-level HTML comment at column 0 between list
items terminates the list under CommonMark, splitting one list into two. To
keep the comment adjacent to the bullet it guards *and* keep the list intact,
it is indented two spaces as a lazy continuation of the roster list item (no
blank line), where CommonMark parses it as multi-line raw inline HTML — valid,
renders as nothing, and stays visually attached in the raw file.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the file's other long-ish prose bullets (`:10` path-convention, `:36` `[model]` segment) already wrap at natural clause boundaries with 2-space continuation indent; the reflowed roster extends that shape rather than inventing one. The comment's numbered-clause layout mirrors how `claude/skills/ft-release/step-7.1-mirror-pairs.md` presents multi-clause invariants.

- [x] **Minimal refactor gate** — no refactor. One bullet reflowed; nothing else in the file touched, and the mirrored comment in `claude/AGENTS-snippet.md` deliberately left alone (Discovery assumptions).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, no behavior; the binding checks are the Pair F / Pair H release gates, run in Phase 3.

**Implementation Notes:**

`AGENTS.md:16` (1 line, 1058 chars) → `AGENTS.md:16-35` (20 lines, longest 78
chars). Two parts:

1. **Roster bullet** wrapped across six lines at comma boundaries with the
   file's existing 2-space continuation indent. Whitespace-collapsed, the
   roster text is byte-identical to the pre-edit version (verified).
2. **`KEEP IN SYNC` comment** lifted into a multi-line HTML comment indented
   two spaces as a lazy continuation of that list item — adjacent to what it
   guards, without the column-0 placement that would split the list. Five
   clauses, one numbered entry each, under a two-line header naming the
   comment's scope and its mirror path (`claude/AGENTS-snippet.md:9`).

The header is the one non-mechanical bit: clause 5's *scope* half ("this
pairing also covers the path-convention bullets") moved up into it so the
comment states what it guards before enumerating how, leaving clause 5 as the
obligation alone. No obligation added, dropped, or weakened.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` as a code suite (docs-only); the binding checks for this file are the two release gates that read it, both run below.

- [x] Ran lint/type-check on changed code — `N/A` (markdown); `.editorconfig` compliance verified by hand instead: no trailing whitespace, no tabs, LF, final newline.

- [x] **Quality assertions** — no duplication introduced (the comment's clause set is the same five, relocated not copied), no dead content, no new public surface. Documentation is the changed surface and it is now *less* stale-prone, not more.

- [x] (frontend) `N/A` — no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Line-length re-measure** (`awk '{print NR": "length($0)}' AGENTS.md | sort -t: -k2 -rn | head`):
the 1058-char outlier is gone. Longest line is now **207** (`:36`, the
`[model]` bullet — untouched by this task), then 126, 94, 90. The reflowed
region's longest line is 78. The file's line-length profile is now continuous
with no outlier.

**Pair F release gate** (park-priority roster ↔ five mirror surfaces) — ran the
gate's own shell from `claude/skills/ft-release/step-7.1-mirror-pairs.md:87`
verbatim. **Printed nothing** (clean): all four of `--low` / `--med` / `--fut` /
`--high` still grep-present in `AGENTS.md`. Expected — the gate is a file-wide
presence grep, structurally blind to line layout.

**Pair H release gate** (validation command roster) — ran
`awk '/^## Validation$/,/^## Dev Server$/' AGENTS.md | grep -E '^(npm --prefix viz |node --)'`.
Returned the same **six commands in the same order** (3 × viz, `node --test`,
2 × `node --check`). Expected — different section, untouched.

**Content-preservation check** — `git show HEAD:AGENTS.md | sed -n '16p'` with
the comment stripped, whitespace-collapsed, diffed against the reflowed
`:16-21`: **byte-identical roster text**. The comment region grew ~111 chars,
all of it the numbered-clause scaffolding and the two-line header; no clause
text was cut.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (18 entries):**

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `AGENTS.md` | **updated** — this task's deliverable (`:16` reflowed to `:16-35`) |
| `SPEC.md` | no change — nothing in the contract governs `AGENTS.md` line layout |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change — its mirrored `KEEP IN SYNC` comment (`:9`) guards *content*, not layout, and already sits on its own line rather than riding a bullet. Deliberately out of scope (Discovery assumptions) |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — checked its formatting section for a line-length/wrap rule; none exists |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change |
| `docs/PLATFORMS.md` | no change |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |
| `docs/VISION.md` | no change |

**Final Summary:**

`AGENTS.md`'s peer-skill roster line was a single 1058-character run — 5.1× the
file's next-longest line — with a five-clause `KEEP IN SYNC` maintenance
contract buried in an HTML comment starting ~310 characters in. That contract is
the only thing telling a release editor the roster is mirrored in
`claude/AGENTS-snippet.md`, and its placement made it the part a reader was
guaranteed to skip. It is now a wrapped bullet plus a labeled, numbered,
clause-per-line comment that a human or agent editing the roster actually meets.

**Changed:** `AGENTS.md` only — 1 line → 20 (+20/−1). No other file touched.

**Verification:** Pair F release gate (park-priority roster, run verbatim from
`step-7.1-mirror-pairs.md:87`) printed nothing — clean. Pair H returned the same
six validation commands in the same order. Line-length re-measure shows the
outlier gone: longest line is now 207 (`:36`, untouched), reflowed region tops
out at 78. Whitespace-collapsed diff confirms the roster text is byte-identical.
`.editorconfig` compliance checked by hand (no trailing whitespace, no tabs, LF,
final newline). No code suite run — docs-only change, and nothing under `viz/`
or `tools/` reads this file.

**Drift found:** the PLAN.md line cited 756 chars / 3.6×; the line measured 1058
chars / 5.1× at start. `CORE-509` and `CORE-510` both appended clauses to this
comment after the audit measured it. Magnitude only — the finding itself held,
and was understated.

**Refactors deferred:** the mirrored comment at `claude/AGENTS-snippet.md:9`
(~830 chars) was left alone. It has the same length but not the same failure —
it already sits on its own line rather than riding a bullet's tail — and the
`KEEP IN SYNC` pairing governs content, not layout, so reflowing one surface
breaks no contract. Not filed as a follow-up: it is a live judgment that the
snippet's comment is fine as-is, not a deferral.

**Documentation verdict:** 17 of 18 AI-referenced docs unchanged; `AGENTS.md` is
the deliverable.

**Maintainability effect:** the sync obligation that guards a two-file mirror is
now legible at a glance instead of requiring a horizontal scroll past 310
characters of roster. Nothing binds the two rosters mechanically — Pair F only
checks four flags — so this comment is the actual control, and its readability
is the control's strength.

**Archived:** 2026-08-30
