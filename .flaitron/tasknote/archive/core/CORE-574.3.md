---
title: ci-pairs-j-m
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-574, CORE-574.2]
---

# CORE-574.3 | ci-pairs-j-m

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Lift `/ft-release` §7.1 Pair J (command-stub `argument-hint:` ↔ documented flags) and Pair M (skill `description:` ↔ stub `argument-hint:`) into the CI `drift` job, and update `docs/CONVENTIONS.md` §"GitHub Actions CI" roster of lifted checks.

## ⚡ Notes

**Relevance:** Proceed — PLAN.md line matches current repo state; Pair J and Pair M exist in `claude/skills/ft-release/step-7.1-mirror-pairs.md` exactly as described and are absent from `.github/workflows/ci.yml`'s `drift` job.
**Best Practices Review:** New CI steps reuse the §7.1 scripts verbatim, adapted only with a `bad=` accumulator + `exit 1` — the house pattern every other lifted pair already follows (Pair L's own contract: "No script is added — the shell is lifted from §7.1, adapted only to fail the step on a finding"). No new abstraction; extended the existing shape.
**Drift check:** No contradiction with SPEC or the PLAN.md line; scope matched exactly (lift Pair J + Pair M, update the CONVENTIONS.md roster).
**Archive skim:** `CORE-574.2` (this epic's prior child) is the direct precedent — same category of change (lift a §7.1 check into the CI `drift` job), same required touches: new CI step(s), a new Pair L mapping row + bumped lifted-check count, and the `docs/CONVENTIONS.md` roster line. Followed that shape. `CORE-577.2` / `CORE-577.N` independently confirm the current (pre-this-task) CONVENTIONS.md roster wording ("Pairs A, B, C, E, and N" / "Pairs D, F–K and M") that this task supersedes.
**Declared scope:** touches: [.github/workflows/ci.yml, claude/skills/ft-release/step-7.1-mirror-pairs.md, docs/CONVENTIONS.md]
**Pattern survey:** Extended the `drift` job's existing per-pair step shape (`- name: Pair <X> — <desc>` + `bad=`/`exit 1`-wrapped `run: |` block) rather than introducing a new one; new Pair L mapping rows follow the existing `printf`-list entry shape exactly.
**Implementation:** Added two `drift`-job steps to `.github/workflows/ci.yml` — "Pair J — command-stub argument-hint ↔ documented flags" and "Pair M — skill description ↔ command-stub argument-hint" — each the §7.1 script verbatim plus a `bad=` accumulator and `exit 1` on a finding. Added their mapping rows to §7.1 **Pair L** in `step-7.1-mirror-pairs.md`, bumped its "eight" → "ten lifted checks" count, and dropped J and M from the two nearby "stays in §7.1 alone" / "release-gate only" lists (Pair K's own bullet and Pair L's own bullets), updating the release-context-free subset parenthetical from `(A, B, C, E, N)` to `(A, B, C, E, J, M, N)`. Updated `docs/CONVENTIONS.md` §"GitHub Actions CI" roster line the same way. Verified: extracted Pair J and Pair M scripts run clean (no findings) against the current repo; extracted Pair L binding script (all ten mapped rows) runs clean — no `PAIR L MISS`; `.github/workflows/ci.yml` parses as valid YAML (`npx js-yaml`); `node --check` on the two `tools/` scripts passes. No viz changes, so `npm --prefix viz` suite N/A.
**Docs touched:** `docs/CONVENTIONS.md` — updated (§"GitHub Actions CI" roster line, see Implementation). All other `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — no change (none reference the §7.1 pair-lift roster; `claude/skills/*/SKILL.md` sits outside the sweep set by design, edited anyway for correctness since it's load-bearing for the CI job it documents).

## ✅ Recap

Lifted `/ft-release` §7.1 Pair J (command-stub `argument-hint:` ↔ documented flags) and Pair M (skill `description:` ↔ stub `argument-hint:`) into the CI `drift` job as two new steps in `.github/workflows/ci.yml`, following the established lift pattern (§7.1 script verbatim + `bad=`/`exit 1`). Bound both into §7.1 Pair L's mapping table in `claude/skills/ft-release/step-7.1-mirror-pairs.md` (new rows, "eight" → "ten lifted checks", and corrected the two nearby lists that named J/M as still release-gate-only). Updated `docs/CONVENTIONS.md` §"GitHub Actions CI" roster line to match. `touches:` matches `git diff --name-only` exactly: `.github/workflows/ci.yml`, `claude/skills/ft-release/step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`. Verified clean: extracted Pair J, Pair M, and Pair L (all ten rows) scripts against the current repo tree, valid YAML parse, `node --check` on the two `tools/` scripts.

**Archived:** 2026-09-11
