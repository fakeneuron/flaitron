---
title: natabula-deposit-alignment
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-483, CORE-483.1, CORE-483.2]
blocked-by:
  - CORE-483.2
parallel-safe-with:
  - CORE-483.4
---

# CORE-483.3 | natabula-deposit-alignment

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-483]] · [[CORE-483.1]] · [[CORE-483.2]]

## 🎯 Goal

Update natabula's `.gitignore` deposit comment (and any ADOPTION-OPTIONS/STACK-TENDENCIES mentions) so `.flowtron/screenshots/` is documented as a gitignored ephemeral safety net, not "the global convention" — flowtron itself stays silent, and adopter comment drift is left to `/natabula-layer-drift` per-repo.

## ✅ Acceptance

- [x] `~/Code/natabula/configs/.gitignore`'s `.flowtron/screenshots/` line gains a comment naming it a gitignored ephemeral safety net for tools that still write there — not the global screenshot convention (which is `~/Code/_screenshots/<project>/` per the personal-layer policy `[[CORE-483.2]]` wrote)
- [x] `~/Code/natabula/.gitignore` (natabula's own dogfooded copy) gets the same comment treatment for consistency
- [x] `docs/ADOPTION-OPTIONS.md` and `docs/STACK-TENDENCIES.md` checked for any screenshot-convention framing that now contradicts `[[CORE-483.2]]`'s policy; edited only if a contradiction is found (Discovery found none — logged below)
- [x] Flowtron itself stays untouched — no flowtron contract doc gains a screenshot rule
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" run for the flowtron repo

## 🧩 Subtasks

- [x] Draft the replacement comment line for the `.flowtron/screenshots/` gitignore entry (safety-net framing, points at the real convention)
- [x] Edit `~/Code/natabula/configs/.gitignore` — insert the comment above the existing bare `.flowtron/screenshots/` line in the "Test & coverage output" section
- [x] Edit `~/Code/natabula/.gitignore` — replace the existing bare `# Playwright / screenshots` header with the safety-net framing above its `.flowtron/screenshots/` line
- [x] Re-grep `docs/ADOPTION-OPTIONS.md` and `docs/STACK-TENDENCIES.md` for any prose that still frames `.flowtron/screenshots/` as the write destination; confirm no edit needed (both already read clean in Discovery) or fix if drift is found
- [x] Re-grep the flowtron repo for `screenshot` to confirm flowtron stays silent (no contract doc touched)
- [x] Phase 3: re-read both edited natabula files; confirm no other line changed
- [x] Phase 4: doc-drift sweep on the flowtron side, flip the `.3` PLAN line to stub form keeping 2-space nesting under the active parent, archive the tasknote, commit (flowtron-side deliverables only — natabula edits live outside this repo)

## 🔗 Related

- [[CORE-EPIC-483]] — parent epic (screenshot-discipline)
- [[CORE-483.1]] — Discovery; locked the "Adopter layer" resolution this task documents
- [[CORE-483.2]] — predecessor (Sequential); rewrote the personal-layer policy this deposit comment must now agree with

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Predecessor `[[CORE-483.2]]` closed and locked the new personal-layer policy (screenshots are an ephemeral agent self-verification tool, saved to `~/Code/_screenshots/<project>/`; flowtron itself gains no rule). This child brings natabula's adopter-facing `.gitignore` deposit comment into agreement with that policy — the last cross-surface piece named at filing.

- [x] Read relevant source files — `~/Code/natabula/configs/.gitignore` (`.flowtron/screenshots/` at :25, no comment), `~/Code/natabula/.gitignore` (:19-20, `# Playwright / screenshots` header), `~/Code/natabula/configs/.claudeignore` + `.cursorignore` (same bare line, :28 each), `~/Code/natabula/docs/ADOPTION-OPTIONS.md` (:34), `~/Code/natabula/docs/STACK-TENDENCIES.md` (no screenshot mentions), `~/Code/natabula/CLAUDE.md`/`AGENTS.md`/`docs/CODING-STANDARDS.md`/`README.md` (no screenshot mentions), rewritten `~/.claude/CLAUDE.md` bullet from `[[CORE-483.2]]`

- [x] **Best Practices Review** — N/A: no code or module boundary; two comment-only edits to gitignore-style config files in a different repo

- [x] **Archive skim** — flowtron `archive/core/`: only `[[CORE-483.1]]` and `[[CORE-483.2]]` touch this surface (already reviewed at scaffold, informed this note's Related). Natabula `archive/natabula/`: `[[NAT-055]]` originally added the bare `.flowtron/screenshots/` line to all three config ignores + root `.gitignore` with rationale *"so new projects don't accidentally commit Playwright screenshots captured via the mandated `.flowtron/screenshots/` dir"* — the "mandated" framing this task retires. `NAT-098.3` lists `.flowtron/screenshots/` as a template-canonical gitignore section with no comment requirement. No archived decision blocks adding a comment.

- [x] **Drift check** — `~/.claude/CLAUDE.md`'s screenshot bullet (rewritten by `[[CORE-483.2]]`) no longer names `.flowtron/screenshots/` at all — confirms the new convention is `~/Code/_screenshots/<project>/` and `.flowtron/screenshots/` is adopter-side-only. `configs/.gitignore` still carries the bare, uncommented line from `NAT-055`, unchanged since. `docs/ADOPTION-OPTIONS.md:34`'s mention is a historical drift-measurement fact (about the *NAT-055 addition itself* propagating unevenly across the fleet) — still accurate, asserts nothing about what the entry *means*, no contradiction to fix. `docs/STACK-TENDENCIES.md` has zero screenshot mentions — nothing to reconcile there. No drift against the PLAN.md line or any SPEC contract; flowtron itself is confirmed silent (`grep -rn screenshot` over the flowtron repo, archive excluded, still returns only `README.md:21`'s CORE-383 asset and the debug-mode fragment's generic evidence-type mention).

- [x] Asked clarifying questions — none genuinely ambiguous; see explicit assumptions below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Scope decision (explicit assumptions, no clarifications needed):**

1. **Only `configs/.gitignore` + root `.gitignore` get edited.** The PLAN.md line names only ".gitignore deposit comment" — `configs/.claudeignore` and `configs/.cursorignore` carry the identical bare, uncommented `.flowtron/screenshots/` line (`NAT-055` added it to all three in lockstep) but are out of scope for this task as filed. Left as a visible gap for a future follow-up rather than silently expanded.
2. **`docs/ADOPTION-OPTIONS.md` and `docs/STACK-TENDENCIES.md` need no edits.** Discovery found no line in either that misstates `.flowtron/screenshots/` as the write destination — `ADOPTION-OPTIONS.md:34` is a historical drift-tracking fact that stays true regardless of this policy change, and `STACK-TENDENCIES.md` never mentions screenshots. The PLAN.md line's "plus any … mentions" clause is conditional; nothing triggers it.
3. **Adopter repos' own `.gitignore` comment drift stays out of scope**, per `[[CORE-483.1]]`'s "Adopter layer" resolution: fixed from each repo's own session via `/natabula-layer-drift`, never bulk-edited here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the existing `# Section header` comment style already used elsewhere in both files (e.g. `# Fleet sweep output — …` in root `.gitignore`, `# Secrets — …` in `configs/.gitignore`): a short header line plus rationale, not a bare entry

- [x] **Minimal refactor gate** — N/A: single-comment insertions above one existing line each, nothing adjacent touched

- [x] Implemented the minimal solution — identical 3-line comment added above `.flowtron/screenshots/` in both `~/Code/natabula/configs/.gitignore` and `~/Code/natabula/.gitignore`; no other line in either file changed

- [x] Updated/added tests for non-trivial behavior — N/A: gitignore comments, no executable surface

**Implementation Notes:**

Two edits, both outside the flowtron repo:

1. **`~/Code/natabula/configs/.gitignore`** (the adopter deposit) — replaced the bare `.flowtron/screenshots/` line with the same line preceded by a 3-line comment: safety-net framing, points at the real convention (`~/Code/_screenshots/<project>/`), names what it actually catches (tools that still default to the old dir).
2. **`~/Code/natabula/.gitignore`** (natabula's own dogfooded copy) — replaced the old `# Playwright / screenshots` one-line header with the identical 3-line comment, for consistency with the deposit.

`docs/ADOPTION-OPTIONS.md` and `docs/STACK-TENDENCIES.md` left untouched — Discovery found no contradicting framing in either (see Discovery Notes). `configs/.claudeignore` / `.cursorignore` left untouched — out of scope per the PLAN.md line (assumption 1). No flowtron-repo file touched beyond this tasknote/PLAN.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: gitignore comments, no executable surface

- [x] Ran lint/type-check on changed code — N/A: not a lintable surface; visual re-read done instead (below)

- [x] **Quality assertions** — comment wording stated once per file (not duplicated across configs/.gitignore and root .gitignore beyond the deliberate identical framing), no dead references, no other line in either file touched, `.claudeignore`/`.cursorignore`'s bare lines correctly left alone (out of scope)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Post-write verification (both files re-read, not assumed):**

| Check | Result |
|---|---|
| `sed -n '17,24p' ~/Code/natabula/.gitignore` | New 3-line comment in place above `.flowtron/screenshots/`; neighbours (`.wrangler/` above, `# Fleet sweep output …` below) byte-unchanged |
| `sed -n '18,30p' ~/Code/natabula/configs/.gitignore` | New comment in place above `.flowtron/screenshots/` within the existing `# Test & coverage output` section; every other line in the section unchanged |
| `git -C ~/Code/natabula status --porcelain` | Only `.gitignore` and `configs/.gitignore` modified by this task; natabula carries unrelated pre-existing in-progress work (NAT-179.3, frontend files) — not touched |
| `grep -rn screenshot` over `docs/ADOPTION-OPTIONS.md`, `docs/STACK-TENDENCIES.md` | Unchanged from Discovery reads — no edit made, none needed |
| `git status --porcelain` (flowtron repo) | Only this tasknote (untracked) — no flowtron contract doc touched |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 17 entries: `README.md`: no change · `AGENTS.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/AGENTS-snippet.md`: no change · `codex/AGENTS-snippet.md`: no change · `cursor/AGENTS-snippet.md`: no change · `grok/AGENTS-snippet.md`: no change · `docs/CONVENTIONS.md`: no change · `CONTRIBUTING.md`: no change · `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change · `docs/PLATFORMS.md`: no change · `claude/CAPABILITIES.md`: no change · `docs/AGENT-COMPAT.md`: no change · `docs/EXTERNAL-AGENTS.md`: no change · `docs/WORKTREES.md`: no change. **Flowtron stays silent by design** — the whole deliverable lands in natabula (`configs/.gitignore`, root `.gitignore`); no flowtron contract doc mandates, or now gains, a screenshot rule.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form keeping its 2-space nesting under the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline on conditional skip

**Final Summary:**

Closed the epic's third child, aligning natabula's adopter-facing `.gitignore` deposit with the policy `[[CORE-483.2]]` locked. The bare, uncommented `.flowtron/screenshots/` line — added by `NAT-055` with a now-retired "mandated" framing — gained a 3-line comment naming it a gitignored ephemeral safety net, pointing at the real convention (`~/Code/_screenshots/<project>/`), in both `~/Code/natabula/configs/.gitignore` (the deposit copied to adopters) and `~/Code/natabula/.gitignore` (natabula's own dogfooded copy, replacing its old bare `# Playwright / screenshots` header).

Two files changed outside any git repo tracked by flowtron: `~/Code/natabula/configs/.gitignore` and `~/Code/natabula/.gitignore` (3 comment lines each, one existing line untouched). `docs/ADOPTION-OPTIONS.md` and `docs/STACK-TENDENCIES.md` were read and left untouched — neither contains framing that contradicts the new policy. `configs/.claudeignore`/`.cursorignore` carry the identical bare line but are out of scope per the PLAN.md line as filed (flagged as a visible gap, not silently expanded). Adopter repos' own `.gitignore` comment drift stays explicitly out of scope, per `[[CORE-483.1]]`'s resolution — that rides `/natabula-layer-drift` from each repo's own session.

Verification: both edited files re-read after writing, confirming only the intended lines changed; `git -C ~/Code/natabula status --porcelain` shows no unrelated file touched by this task (natabula carries pre-existing unrelated in-progress work, left alone); flowtron repo `git status` shows only this tasknote. Refactors: none. Documentation verdict: 17/17 flowtron docs "no change", flowtron silent by design — the whole deliverable lands in natabula.

Maintainability effect: the adopter-facing gitignore deposit that ~20 repos inherit now explains *why* `.flowtron/screenshots/` is ignored instead of asserting it silently, and the explanation agrees with the personal-layer policy `[[CORE-483.2]]` rewrote rather than contradicting it. Unblocks nothing further in the epic — `[[CORE-483.4]]` (screenshot-prune-sweep) was declared Parallel with this child, not Sequential after it.

**Archived:** 2026-08-27
