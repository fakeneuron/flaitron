---
title: release mirror-pair checklist
status: completed
tags: []
created: 2026-08-09
related-tasks: [CORE-EPIC-420, CORE-420.2, CORE-420.3, CORE-420.4, CORE-411]
due:
---

# CORE-420.5 | release mirror-pair checklist

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-420]] · [[CORE-420.2]] · [[CORE-420.3]] · [[CORE-420.4]] · [[CORE-411]]

## 🎯 Goal

Encode the mirror-pair surfaces the epic's three fix children resynced into
`/ft-release` §7.1 as a standing check, so the same drift class is detected
at the next release cut instead of by a later audit.

## ✅ Acceptance

- [x] `/ft-release` §7.1 carries a new standing mirror-pair check enumerating the pairs the epic's fix children resynced, in the section's established bold-header + fenced-command + resolution-rule shape
- [x] The templates-roster pair (`README.md` roster ↔ `SPEC.md:55` ↔ `templates/` directory) is covered with a runnable derivation command — Pair A
- [x] The Claude-flag ↔ Codex-description pair is covered with a runnable command that returns no output when clean and no false positives from example strings — Pair B; quote-stripping verified to remove all three illustration-derived false positives
- [x] The template-back-link ↔ skill-write-target pair is covered with a runnable command plus the write-target table needed to judge a newly added template — Pair C, 5-row table
- [x] The README counter pair is cross-referenced to the existing Standing README task-counter check rather than duplicated — Pair D
- [x] Every encoded command verified against the current repo; each returns its documented clean/dirty signal — Pair C's negative grep additionally proven against synthetic drift so it is not a false-negative
- [x] Live drift surfaced by the new check is resolved per the scope decision recorded in Discovery Notes — operator chose fix-in-place; all three Codex descriptions corrected, check ships green
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Draft the standing mirror-pair check block, placed after the Standing README task-counter check and before §7.2
- [x] Encode pair A (templates roster) command + resolution rule
- [x] Encode pair B (Claude flags ↔ Codex descriptions) command + resolution rule
- [x] Encode pair C (template back-link ↔ write target) command + write-target table
- [x] Cross-reference pair D (README counter) to the existing check
- [x] Apply the confirmed decision on the three live pair-B gaps
- [x] Verify: run every encoded command; confirm each matches its documented signal

## 🔗 Related

- [[CORE-EPIC-420]] — parent epic: release-surface-sync; this child is the gate that closes the class the fix children closed instance-by-instance
- [[CORE-420.2]] — fixed the README counter + templates roster + manual-path citations (pairs A and D instances)
- [[CORE-420.3]] — fixed the two Codex fold descriptions (pair B instances); its own recap names this task as the gate
- [[CORE-420.4]] — fixed the sidequest template back-link depth (pair C instance)
- [[CORE-411]] — filed the Standing README task-counter check; the shape precedent this block follows and the owner of pair D

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The three fix children closed instances; the class stays open
  until the release sweep can detect it. Both [[CORE-420.3]] and [[CORE-420.2]]
  explicitly name this task as the gate their fixes depend on. Confirmed live —
  §7.1 has no mirror-pair coverage for three of the four named pairs.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` §7.1 (lines 247–366), `README.md:20-25` + `:253-258`, `SPEC.md:55`, `templates/` (10 files), all 18 `claude/skills/ft-*/SKILL.md` ↔ `codex/skills/ft-*/SKILL.md` description pairs, `codex/skills/ft-release/SKILL.md`. Read set was narrow and enumerable — no probe needed.

- [x] **Best Practices Review** — no new abstraction. §7.1 already carries five standing checks in a fixed shape (bold header → rationale prose → fenced command → clean/dirty signal → blocking-or-advisory resolution rule); this extends that pattern rather than inventing a mechanism. Responsibility stays with `/ft-release`, the only place doc-currency edits already land in a commit. No refactor required in scope; no cleanup deferred.

- [x] **Archive skim** — `grep -l "ft-release/SKILL.md" .flowtron/tasknote/archive/core/*.md` returned 12 hits; read the load-bearing ones. Findings logged below.

- [x] **Drift check** — two drifts found against the PLAN.md line; logged below.

- [x] Asked clarifying questions — one scope decision surfaced (live pair-B drift); raised at the Phase 1→2 gate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim.** [[CORE-411]] is the direct shape precedent: it added the
Standing README task-counter check to §7.1 and recorded the reasoning for
modelling new checks on the existing ones rather than inventing a mechanism.
CORE-409 is cited in-line at §7.1 as the precedent for keeping standing checks
lightweight (count-not-candidates) — followed here: each pair gets one command
with a binary signal, not a scoring pass. CORE-410.4 established that the
machine-global wiring half is advisory because `~/.claude/` is machine state no
commit can fix; all three pairs here are repo state, so all three are blocking.
No prior tasknote encoded a mirror-pair check.

**Drift #1 — pair D is already covered.** The PLAN.md line names four pairs, but
`README counter ↔ archive count` is already encoded as §7.1's **Standing README
task-counter check** ([[CORE-411]], `SKILL.md:359-366`). Writing it again would
put two derivations of the same number in one section — the exact failure mode
this epic exists to prevent. The block will cross-reference it and encode the
remaining three. Net: three new pairs, not four.

**Drift #2 — pair B is live-red today.** A quote-stripped flag-parity sweep over
all 18 shipped skill pairs returns three genuine gaps: `/ft-epic-discovery
--deep`, `/ft-spec --fast`, `/ft-stats --write` are documented as capabilities in
the Claude `description:` and absent from the Codex mirror, so Codex
natural-language dispatch cannot surface them. [[CORE-420.3]] fixed only the two
*fold*-derived instances (`ft-task --debug`, `ft-file-followup --park`) because
its sweep was scoped to the v5.15.0 folds; these three predate that scope. The
check as designed would therefore be red on arrival.

**Pair-B command design.** Naive extraction of `--flag` tokens from the whole
`description:` field yields 15 false-positive mismatches (git flags like
`--porcelain` from the skill body). Scoping to the `description:` line alone
still yields 6, three of them example-noise (`args="CORE-004 --debug --fast"`
style illustrations). Stripping all double-quoted segments before extraction
removes the illustrations and leaves exactly the three real gaps above — a
deterministic command with no false positives on the current repo. That is the
form to encode.

**Pairs A and C are green today.** Pair A: `README.md:255` and `SPEC.md:55`
carry a byte-identical roster clause naming all 10 files in `templates/`. Pair C:
all four templates carrying a nav-header back-link use `](../PLAN.md)`, and every
consuming skill writes one level under `.flowtron/` (`tasknote/`, `sidequest/`,
`specs/`) — so the depth is uniform and correct. Both commands are being added
for future detection, not to fix a present defect.

**Codex `/ft-release` needs no mirror edit.** `codex/skills/ft-release/SKILL.md`
is a 15-line pointer that defers to the Claude body; it restates no §7.1 content.
The new block lands in one file.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — modelled the block on §7.1's five existing standing checks (bold header → rationale prose → fenced command → clean/dirty signal → resolution rule), the same shape [[CORE-411]] followed when it added the counter check. Placed last in §7.1 so all standing checks stay contiguous, per CORE-411's own placement rationale. No new mechanism invented.

- [x] **Minimal refactor gate** — no refactor. One additive block in one file plus three one-line description edits; nothing restructured, nothing deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, no code changed. The encoded commands are themselves the checks; each was executed against the repo (Testing Notes).

**Implementation Notes:**

`claude/skills/ft-release/SKILL.md` §7.1 — added **Standing mirror-pair check**
(+43 lines) after the Standing README task-counter check and before §7.2. One
opening rationale paragraph naming the shared failure mode (a derived fact
restated with nothing binding the halves) and the blocking posture, then four
labelled pairs:

- **Pair A** — templates roster ↔ `templates/` directory (`ls` + a two-file `grep`).
- **Pair B** — Claude skill flags ↔ Codex wrapper descriptions (quote-stripped
  flag-extraction loop; must print nothing). The prose calls out *why* the
  quote-strip is load-bearing, with the measured 3-vs-6 finding counts, so a
  future reader doesn't "simplify" it back into noise — the same defensive
  framing §7.1's "Glob-free by design" note already uses.
- **Pair C** — template back-link ↔ skill write target (two greps + a 5-row
  template/skill/target table so a newly added template is judged, not assumed).
- **Pair D** — cross-reference only, pointing at the existing counter check.

`codex/skills/ft-{epic-discovery,spec,stats}/SKILL.md:3` — appended the missing
capability to each `description:` in the Codex wrapper's own voice, matching the
`` With `--park`, … `` shape [[CORE-420.3]] established rather than copying the
Claude sentence.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed (markdown + YAML frontmatter only; `viz/` and `tools/` untouched).

- [x] Ran lint/type-check on changed code — `N/A` for compilers; YAML frontmatter of all three edited Codex wrappers re-read and confirmed to parse as plain scalars (no `: ` sequence introduced, no quoting required).

- [x] **Quality assertions** — no duplication (Pair D deliberately cross-references instead of restating the counter derivation), no dead content, no public-surface growth (one skill-internal section, no new flag/skill/contract), no stale code-facing docs (sweep below).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched.

**Testing Notes:**

Every encoded command run verbatim against the repo:

| Check | Signal | Result |
|---|---|---|
| Pair A | rosters agree; all `templates/` files named | 10/10 files named; `README.md:255` and `SPEC.md:55` clauses byte-identical ✅ |
| Pair B | no output | clean after the three fixes (was 3 mismatches before) ✅ |
| Pair C first | lists back-link templates | 4 templates, all `../PLAN.md` ✅ |
| Pair C second | no output | empty ✅ |

**False-negative guard.** Pair C's second command passing on a clean repo proves
nothing on its own — an unmatchable regex passes identically. Wrote a synthetic
`](../../PLAN.md)` line to the scratchpad and confirmed the grep matches it, then
deleted the probe. The originally-drafted pattern used nonstandard `\/` BRE
escapes; both forms matched, but the escapes were replaced with the plain
`'](\.\./\.\./PLAN\.md)'` form — identical to the command [[CORE-420.4]] used for
its own verification, so the check and its precedent now read the same.

**Pair B teeth, demonstrated.** The pre-fix run returned exactly the three
mismatches Discovery predicted; the post-fix run returns nothing. The check
detects the class it was written for, and the diff between the two runs is
entirely the three description edits.

Unrelated §7.1 standing checks re-run to confirm no collateral breakage:
shipped-skill slug parity diffs clean; the wrapper-name invariant loop prints
nothing. `git diff --stat`: 4 files, 46 insertions / 3 deletions.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 AI-referenced docs checked. Two cite `/ft-release` §7.1 and both remain accurate: `README.md:25-26` points specifically at the *Standing README task-counter check* (untouched, and now explicitly cross-referenced as Pair D), and `docs/PLATFORMS.md:87`'s "verifies both surfaces" refers to the self-wiring parity check (untouched). Grepped the doc set for restatements of the three edited Codex descriptions — zero hits. **No change** across the board: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-420` parent, tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

`/ft-release` §7.1 can now detect the drift class this epic's three fix children
resolved one instance at a time. A new **Standing mirror-pair check** enumerates
the surfaces that restate a fact derived from somewhere else — the `templates/`
roster, Codex wrapper descriptions, and template back-link depths — each with a
runnable command and a binary clean/dirty signal, so the next release cut catches
what an audit caught this time.

**Evidence.** 4 files, 46 insertions / 3 deletions. `claude/skills/ft-release/SKILL.md`
§7.1 gained a 43-line block covering four labelled pairs (A templates roster ·
B Claude-flags↔Codex-descriptions · C template-back-link↔write-target · D the
README counter, cross-referenced not restated). `codex/skills/ft-{epic-discovery,
spec,stats}/SKILL.md:3` each gained one clause naming a previously-undiscoverable
flag. Every encoded command executed against the repo — all four green — and
Pair C's negative grep additionally proven against synthetic drift so a passing
result means "no drift" rather than "unmatchable pattern."

**Scope widened at the Phase 1→2 gate**, operator-confirmed. Discovery found the
new Pair B check red on arrival: `/ft-epic-discovery --deep`, `/ft-spec --fast`,
and `/ft-stats --write` were documented on the Claude side and absent from their
Codex mirrors, invisible to Codex's natural-language dispatch. [[CORE-420.3]]
fixed only the two *fold*-derived instances because its sweep was scoped to the
v5.15.0 folds; these three predate it. Shipping a gate that blocks the next
release on pre-existing drift would have left the epic's theme alive inside the
epic's own fix — the same reasoning that widened [[CORE-420.2]] at this gate.
Cost: three one-line edits.

**Scope also narrowed.** The PLAN line named four pairs, but `README counter ↔
archive count` has been encoded since [[CORE-411]]. Re-deriving it would have put
two derivations of one number in a single section — precisely the failure mode
the block exists to catch — so Pair D is a cross-reference. Net: three new
checks, not four.

**Refactors:** none made, none deferred — additive block plus three one-line
edits; nothing structural was in scope.

**Documentation verdict:** documentation *is* the deliverable; sweep returned
14/14 "no change", with the two live §7.1 citations individually verified as
still accurate rather than assumed.

**Observed, not fixed.** `claude/skills/ft-flowtron/SKILL.md`'s roster table is a
*fourth* instance of the same class — it restates each skill's capability
one-liner. It already carries `/ft-stats --write` but names neither
`/ft-epic-discovery --deep` nor `/ft-spec --fast`. It is outside this task's four
ticketed pairs and outside the AI-referenced doc set, and the epic's terminal
[[CORE-420.N]] audit exists to catch exactly this kind of integration miss —
flagged here rather than silently absorbed or silently dropped.

**Maintainability effect.** The three fix children each closed an instance; this
closes the gate. A future edit that adds a template, folds a skill into a flag,
or authors a template at the wrong depth now fails a release-time command instead
of surviving until a reader trips over it — and the one judgment-heavy pair (B)
carries its own measured rationale, so the next maintainer can see why the
quote-strip is there before deciding to remove it.

**Archived:** 2026-08-09
