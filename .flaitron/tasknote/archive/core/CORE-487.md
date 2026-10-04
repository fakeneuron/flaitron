---
title: no-runtime-mirror-consolidation
status: completed
tags: []
created: 2026-08-28
due:
related-tasks: [CORE-445.3, CORE-445.N, CORE-485, CORE-194.5]
touches:
  - docs/VISION.md
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-487 | no-runtime-mirror-consolidation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-445.3]] · [[CORE-445.N]] · [[CORE-485]]

## 🎯 Goal

Settle the no-runtime rule's mirror architecture — ratify the canonical-source-with-labeled-mirrors pattern rather than consolidating to bare pointers, record the ratification where a future audit will find it, and pair the mirrors with a citation-level drift guard in the standing release procedure.

## ✅ Acceptance

- [ ] Verdict recorded: labeled-mirror pattern **ratified**, with the rationale that rejects consolidation
- [ ] `docs/VISION.md` §"What we won't accept" preamble names the pattern and the point-of-use restatement sites, not just the single SPEC mirror
- [ ] `docs/CONVENTIONS.md` §"Adheres to" carries a short entry ratifying the pattern as a doc-architecture convention (findable by the Phase 4 cold-start sweep, which never walks VISION)
- [ ] `/ft-release` §7.1 carries **Pair K** in the established pair idiom, with both halves: K1 citation-resolves, K2 pointer-presence
- [ ] Both Pair K shell blocks run clean against HEAD
- [ ] No runtime, validator, or schema shipped — the guard is a release-time shell check inside the standing procedure

## 🧩 Subtasks

- [ ] Broaden the `docs/VISION.md` §"What we won't accept" preamble line from "the mirror lives in SPEC.md" to the pattern + point-of-use sites
- [ ] Add the `docs/CONVENTIONS.md` §"Adheres to" ratification entry
- [ ] Write **Pair K** (K1 + K2) into `claude/skills/ft-release/SKILL.md` §7.1, after Pair J and before §7.2
- [ ] Run both Pair K blocks against HEAD; confirm clean output
- [ ] Run the repo validation command roster (`AGENTS.md` §"Validation")
- [ ] Phase 4 closure

## 🔗 Related

- [[CORE-445.3]] — installed the four no-runtime mirrors this task adjudicates (`related-decision:`)
- [[CORE-445.N]] — epic audit that found the no-runtime story already consistent across VISION / SPEC / EXTERNAL-AGENTS / PHILOSOPHY / WORKTREES (`related-decision:`)
- [[CORE-485]] — sibling NAT-182.3 filing that routed this task (`related-decision:`)
- [[CORE-194.5]] — established that `docs/VISION.md` is **deliberately excluded** from the AI-referenced docs list (`depends-on:`)
- [[CORE-460.3]] — Pair I: the most recent §7.1 pair, and the idiom Pair K extends (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line asks for a decision plus an optional guard, and both remain open and worth making. Discovery confirmed the premise (the rule is restated across multiple surfaces) while correcting its count — the real set is eight sites, not four. The correction does not change the decision, so this is a Proceed, not a Re-scope.

- [x] Read relevant source files — `docs/VISION.md` §"What we won't accept" (the two no-runtime bullets + the preamble mirror line at :30), `SPEC.md` §"What flowtron does NOT provide" → §"PR / suggestion archetypes flowtron does not accept" (:1105–1112), `docs/EXTERNAL-AGENTS.md` §"Not an Orchestration Runtime" (:75–84), `SPEC/gates.md` §"`--unattended` operator posture" → "Runtime stays out." (:451–456), `SPEC/loop.md` §"Runtime vs. contract — the boundary", `docs/PHILOSOPHY.md`:51, `docs/WORKTREES.md`:47, `README.md`, `docs/CONVENTIONS.md`, `claude/skills/ft-release/SKILL.md` §7.1 (Pairs A–J), `.flowtron/tasknote/README.md` §"AI-referenced docs"

- [x] **Best Practices Review** — no code touched; this is contract-layer markdown. Responsibilities stay separated: `docs/VISION.md` owns justification, `SPEC.md` owns the terse mid-task filter, the point-of-use docs own the rule *as applied* to their own surface, and `/ft-release` §7.1 owns mechanical drift detection. The guard extends the established Pair idiom rather than minting a parallel mechanism (extension-first). No refactor required; no cleanup deferred.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/` for the three touched paths plus the no-runtime phrase. Load-bearing hits logged in Discovery Notes below: [[CORE-445.3]], [[CORE-445.N]], [[CORE-194.1]] / [[CORE-194.5]], [[CORE-486]], [[CORE-473.1]], [[CORE-460.3]], [[CORE-349.5]], [[CORE-417]].

- [x] **Drift check** — the PLAN line's four named surfaces all exist and carry the rule; its *count* is stale (eight sites carry it). The plan formed here contradicts no SPEC contract: the guard is a release-time shell check inside an existing standing procedure, not a validator, so it clears `SPEC.md` §"What flowtron does NOT provide" ("Schema validation") and `docs/CONVENTIONS.md` §Declines ("Release automation", "Pre-commit hooks"). Anchors verified at HEAD: `docs/VISION.md`:30 and :44, `SPEC.md`:1103 §"PR / suggestion archetypes…", `SPEC/gates.md`:451, `claude/skills/ft-release/SKILL.md`:362 §"Standing mirror-pair check" with Pair J ending at :566.

- [x] Asked clarifying questions — two asked via AskUserQuestion, both genuinely open forks the PLAN line left to the operator. **Q1 (decision):** ratify vs consolidate → **ratify**, including the `docs/CONVENTIONS.md` entry. **Q2 (drift guard):** Pair K scope → **both halves** (K1 citation-resolves + K2 pointer-presence).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The rule and its real footprint.** The "no-runtime" rule — *contract in flowtron, runtime in the runner/caller/operator* — is stated in eight places, not the four the PLAN line names:

| Site | Shape | Points back to VISION? |
|---|---|---|
| `docs/VISION.md` §"What we won't accept" | **Canonical justification** — two bullets (loop runners; graph / multi-agent execution runtimes), each with the bounded exception spelled out | n/a — it *is* the source |
| `SPEC.md` §"PR / suggestion archetypes…" | Terse mirror, 2 of 6 bullets, each literally prefixed `PR-rejection mirror of "X" in docs/VISION.md` | ✅ explicit, per-bullet |
| `docs/EXTERNAL-AGENTS.md` §"Not an Orchestration Runtime" | Rule applied to the multi-agent convention — 4 rejection bullets + closing paragraph | ✅ "These are the same rejections VISION.md §… makes" |
| `SPEC/gates.md` §"`--unattended` posture" → "Runtime stays out." | Rule applied to the operator-less posture | ✅ cites VISION + `loop.md` |
| `SPEC/loop.md` §"Runtime vs. contract — the boundary" | Rule applied to loop runners | ✅ |
| `docs/PHILOSOPHY.md`:51 | One clause in the "what it is not" sentence | ➖ narrative, no pointer needed |
| `docs/WORKTREES.md`:47 | One clause on fan-out | ✅ cites VISION |
| `README.md` | Outward-facing framing, several places | ➖ marketing surface |

**Why ratify, not consolidate.** Three findings, in order of weight:

1. **They are not duplicates.** Only SPEC.md's two bullets are literal mirrors of VISION; the rest are the *same rule applied to a different surface* — a PR filter, a loop runner's boundary, an `--unattended` posture, a multi-agent convention, a worktree caveat. Collapsing distinct applications into one link is a loss of information, not a de-duplication.
2. **Consolidation degrades exactly the sites flowtron bets on.** `SPEC.md`'s list declares itself "For future-AI mid-task discipline" — an assistant reading SPEC mid-task needs the rejection inline, not a link chase into a doc the cold-start sweep deliberately never loads. `SPEC/gates.md`'s "Runtime stays out." explains the boundary at the point where the reader is deciding what `--unattended` *means*.
3. **The pattern is already self-labeled and already audited.** Every restatement carries a pointer home, and [[CORE-445.N]] recorded the story as "consistent across VISION / SPEC / EXTERNAL-AGENTS / PHILOSOPHY / WORKTREES." NAT-182.3 flagged the shape from outside without that context; the fix is to make the ratification *findable*, not to dismantle the pattern.

**Where the ratification must live (non-obvious).** The natural home — adding `docs/VISION.md` to `.flowtron/tasknote/README.md` §"AI-referenced docs" so the Phase 4 sweep walks it — is **closed**. [[CORE-194.1]] Q3 excluded VISION deliberately ("lazy — protects one-task-per-window"), [[CORE-194.5]] re-affirmed it, and [[CORE-486]] re-stated it as recently as this week. So the ratification goes into `docs/CONVENTIONS.md`, which *is* in the sweep set, and which already holds internal doc-architecture decisions (§"ADRs as a separate registry", §"Template override stacking") alongside the third-party standards.

**Why Pair K can only guard citations, not prose.** `/ft-release` §7.1 already carries Pairs A–J, but every one guards a **derivable** roster: a flag set extracted from frontmatter, a directory listing, a command roster. Prose paraphrase is not derivable — a byte-match across surfaces that legitimately differ in shape would be brittle, and Pair F's own note says the check "counts presence, not byte identity." So Pair K guards the two structural properties that *are* mechanical:

- **K1 — citation resolves.** Each `PR-rejection mirror of "<X>"` in `SPEC.md` names a real bullet lead in the section it cites. Verified feasible during Discovery: the six citations extract cleanly, four naming `docs/VISION.md` and two naming §"What flowtron does NOT provide" above. Citations are *prefixes* of the VISION bullet leads (`"Loop runners"` ⊂ `**Loop runners, schedulers, and session tooling.**`), so the check is a prefix/substring assertion, not equality.
- **K2 — pointer present.** The three point-of-use restatement sections each still name `VISION.md`. Weaker, and honestly so: it catches a pointer deleted in an edit, which is the drift that strands a restatement into looking like an unsourced duplicate — precisely what NAT-182.3 tripped over.

This is the drift class that actually bites (a VISION bullet renamed or removed, stranding four SPEC citations, with nothing binding the halves — the [[CORE-460.3]] Pair I story one surface over). Prose divergence stays with "markdown is the schema; the assistant catches drift," which is VISION's own stance and the reason a validator is rejected.

**Constraint check.** The deliverable ships no runtime: no scheduler, daemon, validator, or schema. Pair K is shell prose inside the standing release procedure — the [[CORE-349.5]] / [[CORE-410.2]] precedent ("keep flowtron's no-runtime-validator posture and encode shellable release-time checks in the standing release procedure"). `docs/CONVENTIONS.md` §Declines rules out release automation and pre-commit hooks; a documented check an operator runs during a cut is neither.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended three established shapes rather than minting any. The ratification rides `docs/CONVENTIONS.md`'s existing "Adheres to" entry shape (which already holds internal doc-architecture decisions — §"ADRs as a separate registry", §"Template override stacking" — alongside third-party standards). The drift guard extends `/ft-release` §7.1's Pair idiom (A–J), reusing Pair F's "counts presence, not byte identity" posture and its `continue`-style tolerance for surfaces that legitimately say less. The VISION edit broadens a sentence that already existed rather than adding a section. Responsibilities stay separated: VISION owns justification, SPEC owns the terse mid-task filter, point-of-use docs own the local application, CONVENTIONS owns the pattern's ratification, `/ft-release` owns detection.

- [x] **Minimal refactor gate** — no refactor. One in-scope correction: `docs/CONVENTIONS.md` §"GitHub Actions CI" enumerated the release-only checks as "Pairs D and F–J", which minting Pair K makes stale. Bumped to "F–K" — drift introduced by this change, so it is this change's to fix. No unrelated cleanup touched.

- [x] Implemented the minimal solution — three files, four edits (below).

- [x] Updated/added tests for non-trivial behavior — N/A as a test suite (markdown-only; flowtron ships no runtime to unit-test). The behavioral equivalent was run: both Pair K halves were exercised positively against HEAD **and negatively** against a mutated copy of the tree, confirming they are not vacuous. See Testing Notes.

**Implementation Notes:**

| File | Edit |
|---|---|
| `docs/VISION.md` | §"What we won't accept" preamble broadened from one sentence naming *the* SPEC mirror to that sentence plus a paragraph naming the **pattern** and the four point-of-use restatement sites, stating why they stay prose rather than collapsing to links, and pointing at the CONVENTIONS ratification + Pair K |
| `docs/CONVENTIONS.md` | New §"Adheres to" → "Canonical source with labeled mirrors" (~5 paragraphs): the convention, the no-runtime worked example, the two properties that make it a convention (a mirror is an *application*, and it is *labeled* so drift is legible), and the explicit boundary that prose is not machine-checked |
| `docs/CONVENTIONS.md` | §"GitHub Actions CI" release-only-check roster bumped `Pairs D and F–J` → `F–K` |
| `claude/skills/ft-release/SKILL.md` | New **Pair K** in §7.1 after Pair J: motivation + drift class + why every prior pair is blind, two shell halves (K1 citation-resolves, K2 pointer-presence), fix-direction guidance, and four design notes |

**Design decision — why the guard checks labels and not prose.** Every existing pair (A–J) guards a *derivable* roster: a flag set extracted from frontmatter, a directory listing, a command list. Prose paraphrase is not derivable, and the restatements legitimately differ in shape because each applies the rule to a different surface. A byte-match would be brittle and would pressure authors toward one flattened wording — destroying the value the pattern exists to protect. Pair K therefore asserts only the two *structural* properties: a citation resolves to a real bullet lead (K1), and a point-of-use section still names its source (K2). Wording drift stays with "markdown is the schema; the assistant catches drift" — VISION's own stance, and the reason flowtron declines a validator. Pair K's design notes say this in the file so a later reader does not mistake the scope for an oversight.

**Fix direction is asymmetric, and stated.** A K1 miss is fixed by updating the *citation* to the canonical bullet's current lead — never by renaming the canonical bullet back to satisfy the check. Encoding that in the pair keeps the guard from inverting into a freeze on VISION.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A as a suite (markdown-only diff; `AGENTS.md` §"Validation" scopes its six commands to `viz/` and `tools/`, neither touched, and its own rule is "use the narrowest validation that covers the change"). The narrowest validation that covers *this* change is executing the guard the change ships, done below.

- [x] Ran lint/type-check on changed code — N/A (no code). Structural checks run instead: fence balance on all three edited files (0 / 4 / 64 markers, all balanced), every new link target resolves as a file, and every cited heading resolves by grep (`CONVENTIONS §"Canonical source with labeled mirrors"`, `loop.md §"Runtime vs. contract — the boundary"`, `gates.md §"--unattended operator posture"`, `EXTERNAL-AGENTS §"Not an Orchestration Runtime"`, `VISION §"Schema validators"`).

- [x] **Quality assertions** — no duplication added: the CONVENTIONS entry states the *pattern* and does not restate the no-runtime rule itself (it cites the worked example rather than reproducing it). No dead code, no public-surface growth (no new flag, skill, template, or frontmatter key). Pair K's design notes pre-empt the three questions a later reader would otherwise re-litigate: why it guards labels not prose, why PHILOSOPHY / WORKTREES / README are excluded from K2, and why it stays release-only rather than joining the CI `drift` job.

- [x] (frontend) Asked the user for visual confirmation — N/A; no frontend surface touched (`viz/` untouched, markdown-only diff).

**Testing Notes:**

**Pair K, positive.** Extracted both `sh` fences verbatim from the committed `claude/skills/ft-release/SKILL.md` (not from a draft) and ran them from the repo root under zsh. Both printed nothing; exit 0. K1 resolved all six citations — four naming `docs/VISION.md` (`Runtime security scanners`, `LLM knowledge-base`, `Loop runners`, `Graph / multi-agent execution runtimes`) and two naming §"What flowtron does NOT provide" above (`Schema validation`, `Cross-project query API`). K2 found the pointer intact in all three point-of-use sections.

**Pair K, negative — the check that matters.** A presence-idiom check that can only pass is worthless, so both halves were run against a mutated copy of the tree in a scratch directory:

| Mutation | Expected | Result |
|---|---|---|
| VISION bullet lead renamed `**Loop runners, schedulers…**` → `**Loop runtimes, schedulers…**` | K1 flags the now-dangling SPEC citation | `K1 MISS: "Loop runners" not a bullet lead in docs/VISION.md` ✅ |
| `SPEC/gates.md` §"Runtime stays out." VISION link replaced with unlinked prose | K2 flags the lost pointer | `K2 MISS: SPEC/gates.md — section '^\*\*Runtime stays out\.\*\*' no longer names VISION.md` ✅ |

Both halves fail on real drift and pass on HEAD.

**Incident, contained.** The first extraction attempt used an unbounded `awk` range that over-ran past §7.1 and swallowed §7.4's staging example, executing its `git add` lines. Every path in that example was unmodified at the time, so `git add` was a no-op; `git diff --cached --stat` confirmed an empty index and `git status --porcelain` showed only the three intended modifications plus the new tasknote. The extractor was re-bounded with `k&&/^### 7\.2/{exit}` and re-run clean. No repo state was affected.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 17 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". **`docs/CONVENTIONS.md` UPDATED** (both as the primary deliverable and for the Pair-roster bump). All 16 others: **no change** — `README.md`, `AGENTS.md`, `SPEC.md` (its PR-archetype bullets are what Pair K *reads*; unedited), `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md` (no new injection surface — the guard reads repo files during an operator-run cut), `docs/AGENT-NEUTRALITY.md` (no Claude-specific surface added; §7.1 shell is an already-ledgered class), `docs/PLATFORMS.md` + `claude/CAPABILITIES.md` (no new operator flag, so Pair I is untouched), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` and `docs/WORKTREES.md` (both *read* by K2 / cited by VISION; neither edited). `docs/VISION.md` was edited as a primary deliverable and is deliberately **not** a sweep entry (CORE-194.1 Q3, re-affirmed by [[CORE-194.5]] and [[CORE-486]]). Verified by repo-wide grep that no other surface enumerates the §7.1 pair roster: `.github/workflows/ci.yml` names only its own A/B/C/E steps, and `docs/VERSION-HISTORY.md`'s Pair J line is historical record, correct as written.

- [x] Closed — all six `## ✅ Acceptance` criteria ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and moved to the top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`.

**Superseded-claim pointer:** none written. This task falsified no factual claim in an archived tasknote. [[CORE-445.N]]'s finding that "the no-runtime story is consistent across VISION / SPEC / EXTERNAL-AGENTS / PHILOSOPHY / WORKTREES" was and remains true — this task ratifies that consistency and adds a guard for it, rather than contradicting it.

**Final Summary:**

Adjudicated the no-runtime rule's mirror architecture in flowtron's favour of keeping it, and gave the pattern a name, a ratification, and a detector. Discovery corrected the filing's premise — the rule is stated in eight places, not four — and then established that the restatements are not duplicates at all: only `SPEC.md`'s two bullets literally mirror `docs/VISION.md`, while `SPEC/loop.md`, `SPEC/gates.md`, `docs/EXTERNAL-AGENTS.md`, and `docs/WORKTREES.md` each apply *one* rejection to their own surface, and every one of them already names VISION. Consolidating them to bare pointers would have cost in-place readability at precisely the sites flowtron's design bets on — `SPEC.md`'s list declares itself "for future-AI mid-task discipline", and `VISION.md` is deliberately outside the cold-start doc set, so a mid-task assistant would have to load an excluded doc to learn a scheduler is out of scope. **Verdict: ratify.**

The non-obvious Discovery find shaped where the ratification lives. The natural home — adding `docs/VISION.md` to the Phase 4 doc-drift sweep — is closed by a standing decision ([[CORE-194.1]] Q3, re-affirmed [[CORE-194.5]] and [[CORE-486]]: lazy, protects one-task-per-window). So the ratification went into `docs/CONVENTIONS.md`, which *is* in the sweep set and already holds internal doc-architecture positions. That placement is the actual anti-re-filing mechanism: NAT-182.3 flagged this shape from outside because nothing named it as intentional.

Changed files (3, markdown only, ~50 net lines): `docs/VISION.md` — §"What we won't accept" preamble broadened from naming one mirror to naming the pattern and its four point-of-use sites; `docs/CONVENTIONS.md` — new §"Canonical source with labeled mirrors" ratifying the pattern with its two defining properties and an explicit "prose is not machine-checked" boundary, plus a one-clause Pair-roster bump (`F–J` → `F–K`) that this change made necessary; `claude/skills/ft-release/SKILL.md` — new **Pair K** in §7.1.

Pair K's honest scope is the design decision worth recording. Pairs A–J all guard *derivable* rosters; prose paraphrase is not derivable, and the restatements differ in shape by design. So Pair K guards only the two structural properties — K1: every `PR-rejection mirror of "X"` citation in `SPEC.md` resolves to a real bullet lead in the section it names; K2: the three point-of-use sections still name `VISION.md`. That catches the drift class that actually bites (a canonical bullet renamed, stranding four citations) and claims nothing about wording, which stays with "markdown is the schema." Fix direction is encoded asymmetrically — a K1 miss is fixed by updating the *citation*, never by renaming the canonical bullet back — so the guard cannot invert into a freeze on VISION.

Verification: both halves extracted verbatim from the committed skill and run from the repo root — clean on HEAD, and **both fail correctly** on a mutated copy (renamed VISION bullet → K1 MISS; deleted gates.md pointer → K2 MISS), so neither is vacuous. Links, headings, and fence balance verified across all three edited files.

Maintainability effect: an intentional doc pattern that previously read as accidental duplication from outside the repo is now named, ratified in a doc the cold-start sweep walks, and paired with a release-time check — replacing "an auditor notices and re-files it" with "a cut catches it, or the convention answers it." No runtime, validator, schema, flag, or skill was added; the guard is shell prose inside the standing release procedure, the [[CORE-349.5]] precedent.

**Archived:** 2026-08-28
