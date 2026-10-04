---
title: roster mirror-pair gate
status: completed
tags: []
created: 2026-08-09
related-tasks: [CORE-420.N, CORE-420.5, CORE-EPIC-420, CORE-411]
---

# CORE-422 | roster mirror-pair gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-420.N]] · [[CORE-420.5]]

## 🎯 Goal

Encode the `claude/skills/ft-flowtron/SKILL.md` "Bundled skills" roster ↔ shipped-skill/flag mirror as a release-time check in `/ft-release` §7.1, so the drift class `CORE-420.N` closed by instance fails a command instead of surviving to a reader.

## ✅ Acceptance

- [x] `/ft-release` §7.1 carries an encoded check binding the `ft-flowtron` roster to its source of truth, in the established Standing-mirror-pair block shape (bold header → rationale → fenced command → resolution rule)
- [x] The check covers **row coverage** (every shipped `ft-*` slug has a roster row; no row for a retired slug) and **flag coverage** (every flag documented in a skill's own Claude `description:` is named in that skill's roster row)
- [x] Flag extraction reuses Pair B's quote-strip idiom verbatim, so `args="…"` illustration flags are excluded (the false-positive class `CORE-420.5` measured)
- [x] Both halves verified green at HEAD **and** verified to fire on injected drift (negative test recorded in Testing Notes)
- [x] The block states its resolution rule and its blocking posture, consistent with Pairs A–C (repo state → blocks the cut)
- [x] Design decision recorded: new Pair E vs. extending Pair B, with rationale
- [x] Adjacent finding adjudicated, not silently dropped — `ft-flowtron/SKILL.md:73` as a third Pair A (templates-roster) mirror site
- [x] **(scope widened at the 🛠️ gate)** Pair A extended to that third site: file added to its grep, pattern loosened to match the compressed variant, resolution rule relaxed from byte-identical to content-coverage with the seed-file carve-out documented
- [x] Pairs B / C / D re-run post-edit with no regression
- [x] Single commit lands the `/ft-release` edit + PLAN.md stub flip + archive move

## 🧩 Subtasks

- [x] Read `/ft-release` §7.1 Pairs A–D and the `ft-flowtron` roster; establish the exact mirror invariant
- [x] Decide Pair E vs. Pair B extension; record rationale
- [x] Draft both check commands; verify green at HEAD
- [x] Negative-test both commands against a mutated roster copy
- [x] Write the Pair E block into `/ft-release` §7.1 in the established shape
- [x] Adjudicate the Pair A third-site finding per the gate decision
- [x] Phase 3 verification: re-run all §7.1 pairs at HEAD post-edit
- [x] Phase 4: doc-drift sweep, PLAN stub flip, archive, commit

## 🔗 Related

- [[CORE-420.N]] — filed this task; fixed the roster's three missing flag clauses by hand and explicitly deferred the gate (its Finding F2)
- [[CORE-420.5]] — built §7.1's Standing mirror-pair check (Pairs A–D); first spotted the roster as an uncovered surface
- [[CORE-EPIC-420]] — parent epic of both: release-surface-sync
- [[CORE-411]] — filed the Standing README task-counter check that Pair D defers to

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and confirmed at HEAD. `/ft-release` §7.1's Pair B compares Claude `description:` frontmatter to Codex `description:` frontmatter; the `ft-flowtron` roster is a *body*-level restatement of the same facts and no encoded pair reaches it. `CORE-420.N` fixed three missing flag clauses by hand nine hours ago and filed the gate deliberately rather than absorbing it into an audit. Nothing has changed since.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` §7.1 (lines 247–409, all four Standing checks + Pairs A–D), `claude/skills/ft-flowtron/SKILL.md` (full, 78 lines), `.flowtron/tasknote/README.md` §"AI-referenced docs", `SPEC.md` (full). Read set narrow and known — no probe needed.

- [x] **Best Practices Review** — `N/A` for module boundaries (the deliverable is skill prose plus two shell snippets, no code module or dependency direction in scope). The one real design constraint is *idiom reuse*: the flag-extraction pipeline must be Pair B's verbatim, not a re-derivation, so the two checks cannot drift from each other. Recorded as an Acceptance criterion rather than deferred.

- [x] **Archive skim** — `grep -l` over `archive/core/` for `ft-flowtron`, `ft-release/SKILL.md`, and `mirror-pair`. Load-bearing hits:
  - **`CORE-420.N`** (read in full) — the direct predecessor. Its **Finding F2** *is* this task, and it names the two hazards to design against: illustration-string false positives, and the question of whether an absent row is drift or intent.
  - **`CORE-420.5`** — built Pairs A–D; documented the quote-strip as load-bearing (dropping it took Pair B from 3 real findings to 6, half noise).
  - **`CORE-420.2`** — widened scope from 1 file to 4 on the reasoning that a partial fix leaves the epic's theme alive inside the epic's own fix. Directly relevant precedent for the open question below.
  - **`CORE-411`** — owns the README counter; Pair D defers to it rather than restating. Precedent for a pair block that cross-references instead of duplicating.

- [x] **Drift check** — every cited path resolves at HEAD. `/ft-release` §7.1 spans lines 247–409 with Pairs A–D at 370/379/392/409. The `ft-flowtron` roster table is lines 42–61, 18 rows. All five documented flags (`--debug` · `--deep` · `--fast` · `--park` · `--write`) are present exactly once, matching `CORE-420.N`'s recorded post-fix state — the hand fix has not re-drifted. No SPEC contract governs §7.1's pair inventory, so adding a pair contradicts nothing; SPEC §"What flowtron does NOT provide" is not engaged (this is a documented release-checklist command, not a schema validator or a script). `claude/skills/*/SKILL.md` is explicitly excluded from `.flowtron/tasknote/README.md`'s cold-start sweep — which is exactly why this surface needs a §7.1 pair rather than doc-sweep coverage.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **one clarification surfaced** (scope of the adjacent Pair A third-site finding), taken to the Phase 1→2 gate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The invariant, stated precisely.** `ft-flowtron`'s own `description:` claims it displays "the **full** bundled skill roster with one-liner descriptions." That claim makes two things checkable:

1. **Row coverage** — bidirectional. Every shipped `ft-*` skill must have a roster row, and every roster row must name a shipped skill. This settles `CORE-420.N`'s open question ("is an absent row drift or intentional omission?"): the roster's own self-description says *full*, so absent is drift. A deliberate omission would require editing that claim first.
2. **Flag coverage** — one-directional, `description:` → roster. Every flag a skill documents in its own Claude `description:` must be named in that skill's roster row. The reverse is deliberately *not* checked: the roster legitimately carries flags the description does not, e.g. `/ft-file-followup`'s row names `--low`/`--med`/`--fut`, which appear in the Claude description only inside an `args="…"` illustration and are therefore stripped from the extracted set. A bidirectional flag check would report those three as drift; they are not.

**Design decision — new Pair E, not a Pair B extension.** The PLAN line offers both. Pair E, because:

- **Different invariant.** Pair B is *cross-platform parity* (Claude `description:` ↔ Codex `description:`). This is *intra-platform restatement* (Claude `description:` ↔ a Claude table body). Same extraction, different source-of-truth relationship and different failure mode — Pair B's failure is "wired but undiscoverable on Codex"; this one's is "the info screen lies."
- **No Pair B analogue for the row half.** Pair B iterates slug-paired skills and cannot express row coverage; that half needs its own `diff`. Folding it in would give one block two unrelated resolution rules.
- **Pair B's blindness is correct, not a defect.** `CORE-420.N` re-ran Pair B after editing the roster body specifically to confirm it stayed silent. Teaching Pair B to read body text would erase that clean separation.
- **DRY is satisfied by shared idiom, not a shared block.** Pair E reuses Pair B's `sed -E 's/"[^"]*"//g' | grep -oE '\-\-[a-z][a-z-]+' | sort -u` pipeline verbatim, so the quote-strip protection carries over and the two checks cannot silently diverge on what counts as a documented flag.

**Both halves drafted and verified (green at HEAD, and firing on injected drift).**

| Half | At HEAD | Negative test (mutated roster copy) |
|---|---|---|
| Row coverage (`diff`) | no output, exit 0 | deleted the `/ft-stats` row → `-ft-stats`, exit 1 |
| Flag coverage (loop) | no output | stripped `--debug` from the `/ft-task` row → `MISSING FLAG ft-task --debug`; deleted `/ft-stats` row → `MISSING ROW  ft-stats` |

A deleted row reports from both halves. That is intentional: the loop's `MISSING ROW` guard exists so an absent row degrades to one clear line instead of every one of that skill's flags reporting missing and misattributing the cause.

**Open question taken to the Phase 1→2 gate — an adjacent third Pair A site.**

While reading `ft-flowtron/SKILL.md` end-to-end, line 73 turned out to be a **third instance of Pair A's** templates-roster mirror, which Pair A does not reach:

```text
README.md:255                    - `templates/` — canonical tasknote templates (full, micro, starter, sidequest) plus spec, loop-heartbeat, audit-overlay, and subagent-probe templates, and the `PLAN.md` / `tasknote-README.md` seed files
SPEC.md:55                       - The `templates/` folder holds the canonical tasknote templates (full, micro, …) …
ft-flowtron/SKILL.md:73          - `templates/` — tasknote templates (full, micro, starter, sidequest) plus spec, loop-heartbeat, audit-overlay, and subagent-probe templates
```

Pair A's command is `grep -n 'canonical tasknote templates' README.md SPEC.md` — the roster variant drops the word "canonical" and is not in the file list, so it is missed twice over. It is content-correct at HEAD (all 8 template files named; the two seed files deliberately absent, since this is a screen line about templates).

This is a genuine gap in the same file, found by the same reasoning — but it belongs to **Pair A**, not the skill-flag mirror the PLAN line names, and closing it is not a two-line grep widening: Pair A asserts a *byte-identical* clause across its two sites, and this third site is a deliberately compressed variant with the seed files exempt. Encoding it means relaxing Pair A's assertion to content-coverage with a documented carve-out.

Cuts both ways: `CORE-420.2`/`.5` both widened scope at this exact gate rather than ship a partial fix; `CORE-420.5` and `CORE-420.N` both *deferred* rather than absorb, and this task exists because that deferral worked. Operator's call.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Pair E follows the block shape all four existing pairs use: bold `**Pair X — <source> ↔ <mirror>.**` header, rationale paragraph naming the drift class and its originating task ID, fenced command, resolution rule. Its flag-extraction pipeline is copied from Pair B rather than re-derived, and its `for d in claude/skills/ft-*/SKILL.md` loop head matches Pair B's exactly. The row-coverage half uses `diff -u <(…) <(…)`, the idiom the Standing installed-surface policy check above already establishes in this same section. No new shape invented.

- [x] **Minimal refactor gate** — one refactor made, and it is the scope the operator approved at the 🛠️ gate: Pair A's assertion relaxed from *byte-identical across two sites* to *content-coverage across three*, because a third site exists and is a deliberately compressed variant that the stricter rule cannot express. Required by the widened Acceptance, not opportunistic. Nothing else in §7.1 touched; the four Standing checks, Pairs B/C/D, and the section intro are unmodified.

- [x] Implemented the minimal solution — 1 file, +35/−3.

- [x] Updated/added tests for non-trivial behavior — `N/A` as a code test; the deliverable *is* executable verification. Both new commands were negative-tested against a mutated roster copy before being written into the file (Testing Notes), which is the analogue.

**Implementation Notes:**

**Pair E — what it binds.** `ft-flowtron`'s roster is checked in two halves against different sources of truth:

| Half | Source of truth | Direction | Catches |
|---|---|---|---|
| Row coverage | `ls claude/skills \| grep '^ft-'` | bidirectional | a shipped skill with no roster row; a row for a retired slug |
| Flag coverage | each skill's own Claude `description:` | one-directional | a documented flag the roster never names |

The bidirectional row half is licensed by the roster's own `description:`, which promises "the **full** bundled skill roster" — that sentence is what makes an absent row *drift* rather than *intent*, which is the question `CORE-420.N`'s Finding F2 left open. The flag half is deliberately one-directional; the reasoning is written into the block itself so a later reader does not "fix" it into symmetry.

**Pair A — what changed and why the rule had to move.** The third site (`ft-flowtron/SKILL.md:73`) was missed twice over: it is not in the pair's file list, *and* it drops the word "canonical" that the pair's pattern keyed on. Both are now fixed — pattern loosened to `tasknote templates (full`, file added. But the resolution rule could not simply carry over: Pair A asserted a byte-identical clause, and the roster site is a compressed screen line that omits the two seed files by design. Forcing byte-identity would either fail forever or push the seed files onto a line that should not carry them. The rule is now content-coverage — every *template* file named at all three sites, seed files required at README + SPEC and exempt at the roster — with README/SPEC's byte-identity preserved as the narrower claim it always was.

**Non-finding: no Codex fan-out.** `codex/skills/ft-release/SKILL.md` is a 15-line wrapper that delegates by reference (`Read and follow ../../../claude/skills/ft-release/SKILL.md`) rather than restating §7.1, and a repo-wide `grep -rln 'Pair [A-D] —'` returns only the Claude file. §7.1 has exactly one authoring site — this edit needs no mirror, which is a pleasing property for a change that is entirely about mirrors.

**Non-finding: the glob is correct here.** §7.1's "Glob-free by design" note warns against `for l in ~/.claude/skills/ft-*` because zsh aborts on an unmatched glob and a machine may legitimately have zero global installs. Pair E's glob is repo-scoped (`claude/skills/ft-*/SKILL.md`), where a zero match would mean the repo has no skills at all — the same reasoning that already lets Pair B use it. Not an inconsistency.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` as a repo suite: the changed file is skill markdown, and neither `npm --prefix viz test` nor `node --test tools/update-adopters.test.mjs` reads it. Substituted verification is executing every command in the changed section, at HEAD and against injected drift (below) — stronger than a suite here, since the commands *are* the deliverable.

- [x] Ran lint/type-check on changed code — `N/A`; no linter in this repo covers skill markdown. Structural assertions run instead (below).

- [x] **Quality assertions** — no avoidable duplication: Pair E reuses Pair B's extraction pipeline verbatim rather than restating a variant, and the sync obligation is written into the block. No dead content — every line of both new blocks was executed. No unexplained complexity: the one non-obvious construct (the `|| { echo "MISSING ROW"; continue; }` guard) carries an inline rationale. No public-surface growth beyond the one pair the task exists to add. No stale code-facing docs — §7.1's section intro, the four Standing checks, and Pairs B/C/D are untouched and were re-verified accurate post-edit.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface.

**Testing Notes:**

**Every command in the changed section executed as literally written in the file.**

| Check | At HEAD | Result |
|---|---|---|
| Pair A (widened) | `ls templates/` + 3-file grep | 10 files; **3 hits, one per file**. All 8 template files named at all three sites; seed files present at README + SPEC, absent at the roster site as the carve-out specifies |
| Pair E — row coverage | `diff -u` | no output, **exit 0**; 18 shipped slugs ↔ 18 roster rows |
| Pair E — flag coverage | the `for` loop | no output; all 5 documented flags (`--debug` · `--deep` · `--fast` · `--park` · `--write`) named in their rows |

**Negative tests — each command proven to fire, not merely to stay silent.**

| Injected drift | Expected | Observed |
|---|---|---|
| `--debug` clause stripped from the `/ft-task` roster row | flag half fires | `MISSING FLAG ft-task --debug` |
| `/ft-stats` row deleted | both halves fire | `diff` → `-ft-stats`, exit 1; loop → `MISSING ROW  ft-stats` |
| new `templates/zz-probe-template.md` created | Pair A shows a file named by no clause | 0 hits at all three sites against an `ls` that lists it |
| roster clause reworded (`(full,` → `(FULL,`) | Pair A returns 2 hits, not 3 | hit count dropped to 0 in the mutated copy |

Mutations were applied to scratch copies and a temporary file; the working tree carries only the intended edit.

**Regression — the pairs I did not intend to change still behave.**

- **Pair B** — silent across all 18 slug-paired skills. Re-run specifically because Pair E now reads the same `description:` fields; confirmed Pair E introduces no interference.
- **Pair C** — 4 templates carry `../PLAN.md`; stale-depth grep empty.
- **Pair D** — README reads 625 against 634 archived. Expected accumulation, owned by the Standing README task-counter check and recomputed at the next cut; documented as a non-finding by `CORE-420.N` on the same reasoning. Not touched here — patching it would restale on this note's own archival.

**Structural assertions on the changed file.** Fence count 52 (even — no unterminated block). `**Pair A —**` … `**Pair E —**` all present, in order, at lines 370/381/394/411/413. `git diff --stat` → `1 file changed, 35 insertions(+), 3 deletions(-)`, all within §7.1.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**14/14 no change.** The deliverable lands in `claude/skills/ft-release/SKILL.md`, which `.flowtron/tasknote/README.md` explicitly excludes from the cold-start set (`claude/skills/*/SKILL.md` is lazily loaded) — the same exclusion that made this surface need a §7.1 pair in the first place. Swept by grep across all 14 rather than asserted; the two live §7.1 references were opened and read.

| # | Doc | Verdict |
|---|---|---|
| 1 | `README.md` | **No change.** Line 25 cites `/ft-release` §7.1 — read in full: it names the *Standing README task-counter check*, not the mirror-pair block, and is unaffected. The counter (625 vs 634 archived) is that check's business at the next cut, deliberately not patched here. |
| 2 | `SPEC.md` | **No change.** Line 55's templates-roster clause is a Pair A site and still content-complete under the relaxed rule; the pair's *pattern* changed, not this text. No SPEC section governs §7.1's pair inventory. |
| 3 | `docs/MIGRATION.md` | **No change.** Line 30 describes `/ft-flowtron` as showing a "bundled-skill roster" — a description of the skill, not a restatement of its rows, so nothing to mirror. |
| 4 | `claude/AGENTS-snippet.md` | **No change.** No skill added or retired; symlink-wiring block and its consumer counts untouched. |
| 5 | `codex/AGENTS-snippet.md` | **No change.** No slug change; the installed-surface subset is unaffected. |
| 6 | `docs/CONVENTIONS.md` | **No change.** Its "bundled skills" mention is about GFM targeting, not roster contents. Release process unchanged in kind — one more check in an existing section. |
| 7 | `CONTRIBUTING.md` | **No change.** No contribution-model surface in scope. |
| 8 | `SECURITY.md` | **No change.** No threat-model surface; the new commands are read-only greps over repo files. |
| 9 | `docs/AGENT-NEUTRALITY.md` | **No change.** The ledger tracks Claude-specific references appearing in the *contract* layer; this edit is entirely inside `claude/skills/`, the wiring layer, which the ledger does not register. No new Claude-specific reference entered SPEC, SPEC/, or templates. |
| 10 | `docs/PLATFORMS.md` | **No change.** Line 87's "`/ft-release` §7.1 verifies both surfaces" was read in context — it refers to the *Standing self-wiring parity check* (repo-scoped + machine-global `.claude/`), not the mirror pairs. Slug-scoped parity claim still holds: 18 Claude ↔ 18 Codex, unchanged. |
| 11 | `claude/CAPABILITIES.md` | **No change.** No Claude capability trigger changed; last-verified stamp does not move. |
| 12 | `docs/AGENT-COMPAT.md` | **No change.** The Codex row's consume-mode and entry-point are untouched — the Codex `ft-release` wrapper delegates by reference and was not edited. |
| 13 | `docs/EXTERNAL-AGENTS.md` | **No change.** No delegation or handoff surface in scope. |
| 14 | `docs/WORKTREES.md` | **No change.** No worktree convention in scope. |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, then tasknote moved to `.flowtron/tasknote/archive/core/`

Note on the "blocking posture" criterion: Pair E states no blocking rule of its own **by design** — §7.1's mirror-pair section intro already declares "Each pair below is repo state … so all of them **block**," and Pairs A–D likewise do not restate it. Inheriting is the consistent choice; adding a per-pair restatement would itself be a mirror.

No superseded-claim pointer written. This task extended `CORE-420.5`'s work and closed `CORE-420.N`'s Finding F2, but falsified no factual claim in either — both recorded the gap accurately, and F2 was filed as open rather than asserted closed.

- [x] **Evidence-based recap** drafted

**Final Summary:**

Encoded the `/ft-flowtron` roster as **Pair E** in `/ft-release` §7.1, so a skill
added, retired, or given a new flag now fails a release-time command instead of
silently stranding the info screen. Closed `CORE-420.N`'s Finding F2, which had
fixed that drift by hand and filed the gate.

**What shipped.** 1 file, +35/−3, all inside §7.1. Pair E checks the roster in two
halves against different sources of truth: **row coverage** (bidirectional `diff` of
shipped `ft-*` slugs against roster rows) and **flag coverage** (each skill's own
`description:` → its roster row). The row half is bidirectional because the roster's
own `description:` promises "the **full** bundled skill roster" — that sentence is
what settles `CORE-420.N`'s open question of whether an absent row is drift or
intent. The flag half is one-directional on purpose, and the block says why, so a
later reader does not "fix" it into symmetry and start reporting
`/ft-file-followup`'s `--low`/`--med`/`--fut` as drift.

**Design call.** New Pair E rather than extending Pair B, as the PLAN line offered.
Pair B is cross-*platform* parity (Claude ↔ Codex frontmatter); this is
intra-platform body restatement — different source relationship, different failure
mode, and Pair B has no analogue for the row half. Pair B's blindness to body text
is a property `CORE-420.N` deliberately verified, not a defect. DRY is served by
reusing Pair B's extraction pipeline **verbatim** — same load-bearing quote-strip —
with the sync obligation written into the block.

**Scope widened at the 🛠️ gate, on operator direction.** Reading `ft-flowtron`
end-to-end turned up line 73 as a **third Pair A site** (the templates roster) that
Pair A missed twice over: not in its file list, and it drops the "canonical" its
pattern keyed on. Pair A now greps three files on a looser pattern, and its rule
moved from *byte-identical across two sites* to *content-coverage across three* —
because the roster site is a compressed screen line with the two seed files exempt,
which byte-identity cannot express. README/SPEC's byte-identity survives as the
narrower claim it always was.

**Verification.** Every command executed as literally written in the file. At HEAD:
Pair A → 3 hits, one per file, all 8 templates named at all three sites; Pair E row
→ exit 0, 18 ↔ 18; Pair E flag → silent, all 5 flags placed. Then negative-tested,
because a check that has only ever been silent is not yet a check: stripping
`--debug` from the `/ft-task` row fired `MISSING FLAG`; deleting the `/ft-stats` row
fired both halves; adding a template file and rewording the roster clause each broke
Pair A as designed. Pairs B/C/D re-run with no regression — B specifically, since
Pair E now reads the same `description:` fields. Structural: fence count even, Pairs
A–E present in order, diff confined to §7.1.

**Refactors:** one made — Pair A's assertion relaxed, required by the widened
Acceptance and approved at the gate. None deferred; nothing else in §7.1 touched.

**Documentation verdict:** 14/14 no change, swept by grep rather than asserted, with
the two live §7.1 citations (`README.md:25`, `docs/PLATFORMS.md:87`) opened and
confirmed to reference *other* Standing checks. `codex/skills/ft-release/SKILL.md`
delegates by reference rather than restating, and a repo-wide grep confirms §7.1 has
exactly one authoring site — so this change needs no mirror, which is a fitting
property for a change entirely about mirrors.

**Maintainability effect.** `/ft-flowtron` is the screen an operator reads to learn
what flowtron can do, and it was the last mirror surface with no release-time guard.
All five documented flags and all 18 shipped slugs are now bound to their sources by
a command that has been proven to fail. The mirror-drift class `CORE-EPIC-420` opened
against four pairs now covers five, and the one Pair A site that pair shipped blind
to is covered too.

**Archived:** 2026-08-09
