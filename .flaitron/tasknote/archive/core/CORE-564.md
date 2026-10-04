---
title: ft-task-area-resolution
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-412]
supersedes:
  - CORE-412
touches:
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - templates/tasknote-README.md
  - templates/tasknote-template.md
  - templates/tasknote-micro-template.md
  - .flowtron/tasknote/README.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-starter-task/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
---

# CORE-564 | ft-task-area-resolution

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-412]]

## 🎯 Goal

Make the project `.flowtron/tasknote/README.md` §"Archive layout" table the mandatory, unconditional lookup for `<area>`, so no agent ever derives an archive folder from the task-ID prefix and silently voids its Phase 1 Archive skim.

## ✅ Acceptance

- [x] `SPEC.md` §"Task ID convention" states that `<area>` is looked up in the project README table and never derived from the ID — `grep -q 'never derived from the ID' SPEC.md`
- [x] Both README surfaces make the table authoritative and demote the lowercase rule to a declaration-time default — `grep -c 'authoritative' templates/tasknote-README.md .flowtron/tasknote/README.md`
- [x] All four skill Step-2 area bullets read the README table unconditionally (no `Unknown prefix →` fall-through remains) — `! grep -rn 'Unknown prefix' claude/skills/`
- [x] `SPEC/procedures/ft-task.md` §2 carries the same unconditional lookup — `grep -q 'never derived from the ID' SPEC/procedures/ft-task.md`
- [x] The Archive-skim step at every operative surface treats an absent/empty `archive/<area>/` as a prompt to re-check `<area>` before logging "no prior tasknotes" — `grep -l 're-check .<area>.' SPEC.md templates/tasknote-template.md templates/tasknote-micro-template.md claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md SPEC/procedures/ft-task.md`
- [x] No budgeted surface exceeds its `docs/CONTEXT-BUDGET.md` cap — `wc -c SPEC.md claude/skills/*/SKILL.md`

## 🧩 Subtasks

- [x] Invert `templates/tasknote-README.md` §"Archive layout": table authoritative, lowercase rule demoted to a declaration-time default, explicit never-derive line
- [x] Mirror the inversion into `.flowtron/tasknote/README.md` §"Archive layout"
- [x] Add the canonical never-derive sentence to `SPEC.md` §"Task ID convention"
- [x] Add the `<area>` re-check clause to `SPEC.md` §"📝 Phase 1: Discovery" Archive-skim bullet
- [x] Rewrite the four skill Step-2 area bullets (`ft-task`, `ft-micro-task`, `ft-starter-task`, `ft-file-followup`) to an unconditional table read
- [x] Add the `<area>` re-check clause to the Archive-skim recipes in `ft-task` Step 4 and `ft-micro-task`
- [x] Mirror both changes into `SPEC/procedures/ft-task.md` §2 and its Archive-skim bullet
- [x] Mirror the re-check clause into `templates/tasknote-template.md` and `templates/tasknote-micro-template.md`
- [x] Verify byte budgets and run the acceptance greps

## 🔗 Related

- [[CORE-412]] — `supersedes:` (partial). CORE-412 (2026-08-08) stated the archive-folder rule and, on an explicit operator choice, picked "lowercase the prefix (mechanical, no lookup table)" over "full descriptive word (needs a maintained lookup)". The *rule* survives as the recommended default when declaring a new prefix; the "no lookup table" half is overturned — the table is now the read-path authority, because a project may legitimately declare a folder the rule would not produce (`NAT-` → `archive/natabula/`).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The failure is real and reproduced three times in one adopter, and its consequence is a correctness defect in Discovery (a voided Archive skim), not untidiness. The filed remedy — make the README table the mandatory lookup — is the right shape, and Discovery found the root cause runs one level deeper than the PLAN line states (see Notes), which widens the edit set without changing the approach.

- [x] Read relevant source files — no probe needed; the surface set was enumerable by one repo-wide grep for the area-resolution phrasing

- [x] **Best Practices Review** — this is a contract/doc change across two layers (canonical `SPEC.md` + `SPEC/procedures/`, and the wiring layer `claude/skills/` + `templates/`). Dependency direction is one-way: skills cite SPEC, never the reverse. The canonical statement lands **once** in `SPEC.md` §"Task ID convention"; the four skill bullets and the procedure become pointers to it rather than four independent restatements — the cite-don't-restate shape this repo already uses (CORE-052). No code touched; `viz/src/archiveCache.ts` discovers area folders dynamically and has no lookup table, so it is unaffected.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` (739 notes). Path grep narrowed to the archive-naming rule itself: **CORE-412** (2026-08-08) is the direct predecessor and the load-bearing find. It stated the rule now being narrowed, and did so on an explicit operator choice: asked "lowercase the prefix (mechanical, no lookup table)" vs. "full descriptive word (needs a maintained lookup)", operator chose lowercase. Its own Archive skim recorded "no prior tasknotes touch the archive-naming rule itself". CORE-049/CORE-052 touched the same README sections but only as word-count trims — CORE-049 explicitly judged §"Archive layout" load-bearing and left it. No other prior note reaches the read-path question.

- [x] **Drift check** — one drift, one deepening, both recorded and neither changes the approach:

  1. **Surface-set drift.** The PLAN line names "the same two restatements in `ft-micro-task` / `ft-goal-task`". Actual state: `ft-goal-task/SKILL.md:74` does **not** restate the bullet — it delegates to `/ft-task`'s Step 2 by reference. The restatements live in `ft-micro-task/SKILL.md:76`, `ft-starter-task/SKILL.md:61`, and `ft-file-followup/SKILL.md:123`, so with `ft-task/SKILL.md:117` there are **four** identical bullets, not three. Net: `ft-goal-task` drops out, `ft-starter-task` and `ft-file-followup` come in.
  2. **Root cause runs deeper than "the fall-through".** The PLAN line locates the defect in Step 2 falling through to the README only on an *unknown* prefix. True, but insufficient: `templates/tasknote-README.md:43-45` and `.flowtron/tasknote/README.md:18-20` both **open** §"Archive layout" with `**Rule:** the archive folder for a prefix is the prefix lowercased, with the trailing `-` dropped`. So an agent that *does* read the README still lands on a sentence blessing derivation. Making the read mandatory without inverting that section would not close the hole. This is the CORE-412 decision above, and narrowing it is in scope.

  All other cited paths and section names resolved exactly: `claude/skills/ft-task/SKILL.md` Step 2 (:117) + Step 4 Archive-skim bullet (:163), `SPEC.md` §"Task ID convention" (:33), `SPEC/procedures/ft-task.md` §2 (:177) + Archive-skim bullet (:263).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Four explicit assumptions the operator is asserting by proceeding:

  1. **Mandatory for *all* prefixes, not just non-canonical ones.** The PLAN line offers both. All-prefixes is chosen: the failure mechanism *is* the branch — `NAT-` "reads as known", so any rule with a known/unknown split re-opens the same hole for the next adopter prefix that looks canonical. An unconditional lookup has no branch to misjudge.
  2. **`NAT-` → `archive/natabula/` is declared in natabula's own README table.** Taken from the PLAN line; not verified. natabula is outside this checkout, so reading it is barred by both the operator's path-access rule and `SPEC/scope-boundaries.md` §"Cross-repo edit remit". Nothing in this deliverable depends on the specific mapping — only on a declared folder being allowed to differ from the derived one.
  3. **No mechanical guard ships from flowtron.** natabula's `scripts/check-archive-layout.sh` (NAT-232) stays adopter-side. `SPEC/scope-boundaries.md` §"What flowtron does NOT provide" deliberately omits a CLI, with one carved-out exception that explicitly does not extend; this row is the contract half.
  4. **CORE-412 is refined, not reversed.** The lowercase rule remains the recommended default for *declaring* a new prefix's folder. Only its "no lookup table needed" claim is overturned, on the read path.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:**

**The mechanism, stated once.** `<area>` has two producers and one consumer, and they disagree. The *producer* rule (lowercase the prefix) is a fine default for an adopter naming a folder. The *consumer* — every Archive skim, archive-collision check, and epic ID scan — needs the folder that actually exists. When a project declares a folder the rule would not produce, a consumer that derives gets a path that does not exist, and every current consumer treats a missing directory as an empty archive rather than as a lookup failure. That is why NAT-230 recorded "no prior archived tasknotes in this repo" against an archive holding 374: the derived path was wrong, the wrong path was empty, and empty is indistinguishable from absent under today's wording.

**Two halves, both required.** (a) `<area>` is looked up, never derived — closing the wrong-path production. (b) An absent or empty `archive/<area>/` prompts a re-check of `<area>` against the README table before "no prior tasknotes" is logged — closing the silent-void consumption. Half (b) matters on its own: it is the only clause that catches a stale or mistyped table entry, which half (a) cannot.

**Out of scope, deliberately.** `ft-epic-discovery`, `ft-close-epic`, and `ft-refactor` scan `archive/<area>/` for the highest used ID suffix; a wrong `<area>` there yields a duplicate ID rather than a voided skim. They carry no "Resolve the **Area**" bullet of their own and inherit `<area>` from context, so the canonical `SPEC.md` sentence covers them without four more edits. Not filed as a follow-up — there is nothing left to fix once the contract layer states it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended this repo's established **cite-don't-restate** shape (CORE-052): the contract statement lands once in `SPEC.md` §"Task ID convention"; the five skill bullets and `SPEC/procedures/ft-task.md` §2 carry the operational instruction and point back to it rather than re-deriving the rationale. Dependency direction preserved — skills cite SPEC, never the reverse.

- [x] **Minimal refactor gate** — no refactor. Every edit is in-place wording on an existing bullet, section, or checklist line; no file created, moved, or split, no lazy fragment extracted. Deferred cleanup: none identified.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, contract/doc change only. No code path touched; `viz/src/archiveCache.ts` discovers area folders dynamically and has no lookup table to update.

**Implementation Notes:**

**Two halves, as planned.**

*Half (a) — `<area>` is looked up, never derived.* Both README §"Archive layout" sections inverted: the prefix→folder table is now declared authoritative, and the lowercase rule is demoted to a **declaration-time default** for adding a row. Both explicitly note that a project may declare a folder the default would not produce (`NAT-*` → `archive/natabula/`) and that the row wins. `SPEC.md` §"Task ID convention" gained the canonical paragraph. Five skill bullets and `SPEC/procedures/ft-task.md` §2 converted from `Unknown prefix → read README` to an unconditional table read, with `no row → stop and ask; do not guess a folder` replacing the old fall-through.

*Half (b) — empty is not the same as absent.* The Archive-skim step at six surfaces now treats an absent or empty `archive/<area>/` as a prompt to re-check `<area>` against the README table before logging "no prior tasknotes": `SPEC.md` §"📝 Phase 1: Discovery", `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`, `claude/skills/ft-task/SKILL.md` Step 4, `claude/skills/ft-micro-task/SKILL.md`, and `SPEC/procedures/ft-task.md`.

**One surface found during execution, beyond the Discovery set.** `claude/skills/ft-close-epic/SKILL.md:37` carried a fifth instance of the same defect in different words — *"Area must resolve per SPEC §'Task ID convention' or via `.flowtron/tasknote/README.md`'s project-specific prefixes. Unknown prefix → stop and ask."* Same known/unknown branch, same derivation licence. Fixed to match. It is an undeclared path against this note's `touches:` — recorded here and in the recap, per SPEC §"Tasknote frontmatter" (a recorded fact, not a gate).

**Two surfaces deliberately left alone.** `claude/skills/ft-epic-discovery/SKILL.md:171` and `docs/DOGFOOD.md:105` both name `archive/<area>/` in a skim recipe, but neither carries the "empty → no prior tasknotes" instruction that half (b) exists to correct, and neither has an area-resolution bullet of its own. With the canonical statement now in `SPEC.md`, adding the clause there would grow two more surfaces without closing a hole. Not filed as a follow-up.

**Byte budgets held.** `SPEC.md` 55,018 → 55,895 (cap 57,000); `claude/skills/ft-task/SKILL.md` 30,269 → 30,861 (cap 33,000). Both pass, but `SPEC.md` now carries 1,105 chars of headroom against a stated working unit of +1,127 to +2,957 per substantial edit — under one unit. That is the same margin defect `docs/CONTEXT-BUDGET.md` records CORE-555 and CORE-558.5 each correcting, and the next `SPEC.md` task will meet it. Observed, not acted on: a budget raise is its own decision with its own rationale, not a side effect of this row.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the CI `drift` job's full 7-step contract-consistency suite, extracted from `.github/workflows/ci.yml` and run locally. This is the narrowest suite that covers the change: `viz` and `tools/` were not touched.

- [x] Ran lint/type-check on changed code — `N/A`, markdown only. No linted or type-checked source file changed.

- [x] **Verification receipt** — below. Structural quality for the changed surfaces: no duplication introduced (the rationale lands once in `SPEC.md`; the six operational restatements are per-skill instructions that already existed and were rewritten in place, not new copies), no dead text left behind (both superseded `**Rule:**` paragraphs were replaced, not merely appended to), no public-surface growth (no new file, section, flag, or gate), and no stale code-facing documentation (`tools/update-adopters.mjs` references none of the changed strings; `viz/src/archiveCache.ts` discovers area folders dynamically).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface changed.

**Testing Notes:**

**Acceptance verify commands (`command → exit code`):**

- `grep -q 'never derived from the ID' SPEC.md` → **0**
- `grep -c 'authoritative' templates/tasknote-README.md .flowtron/tasknote/README.md` → **0** (1 hit each)
- `! grep -rn 'Unknown prefix' claude/` → **0** (no fall-through remains anywhere under `claude/`)
- `grep -q 'never derived from the ID' SPEC/procedures/ft-task.md` → **0**
- `grep -l 're-check \`<area>\`' SPEC.md templates/tasknote-template.md templates/tasknote-micro-template.md claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md SPEC/procedures/ft-task.md` → **0** (all six named surfaces returned)
- Byte-budget loop over `SPEC.md` + `claude/skills/*/SKILL.md` against `docs/CONTEXT-BUDGET.md` caps → **0** ("all budgeted surfaces within cap")

**CI `drift` job, run locally — 7/7 steps passed, zero failures:** Wrapper-name invariant · Shipped-skill parity (claude/skills ↔ codex/skills) · Pair A (templates roster clause) · Pair B (Claude skill flags ↔ Codex wrapper descriptions) · Pair C (template back-link depth) · Pair E roster row coverage · Pair E roster flag coverage. Run because this change touches `SPEC.md`, three templates, and five skill bodies — the exact surfaces those pairs bind.

**Not run, with reason:** `npm --prefix viz test` / `typecheck` / `lint` and `node --test tools/update-adopters.test.mjs` — no file under `viz/` or `tools/` changed, and `tools/update-adopters.mjs` was grepped for every string this task rewrote (no matches), so neither suite can observe this diff.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 17 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". **No change** for every one. Five carry hits on the swept terms, all verified as path-placeholder usage rather than resolution instructions: `README.md:211`, `AGENTS.md:12`, `claude/AGENTS-snippet.md:17`, and `docs/EXTERNAL-AGENTS.md:43` each name `archive/<area>/` as a location; `docs/MIGRATION.md` (7 hits) names it at :403/:429/:450/:456 as a layout shape, and at :283 tells adopters to declare project-specific prefixes in the README — which the new contract reinforces rather than contradicts. The remaining twelve entries have zero hits.

- [x] Closed — every `## ✅ Acceptance` criterion ticked (all six verified by command in Phase 3), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Closed the `<area>`-derivation hole that voided NAT-230's Archive skim against a 374-note archive, in both halves and at every surface that carried it.

**What changed — 11 markdown files, +53/-22 lines.**

*The contract.* `SPEC.md` §"Task ID convention" gained the canonical paragraph: `<area>` is read from the project's `.flowtron/tasknote/README.md` §"Archive layout" table, never derived from the ID, with no known/unknown branch — because a prefix that "looks known" is exactly the one that gets lowercased on autopilot.

*The root cause, one level below the filed one.* Discovery found that making the README read mandatory would not have been enough: both README §"Archive layout" sections *opened* with `**Rule:** the archive folder for a prefix is the prefix lowercased`, so a dutiful agent still landed on a sentence blessing derivation. Both were inverted — table declared authoritative, the lowercase rule demoted to a declaration-time default for adding a row, with an explicit note that a project may declare a folder the default would not produce and that the row wins.

*The wiring.* Five skill bullets (`ft-task`, `ft-micro-task`, `ft-starter-task`, `ft-file-followup`, `ft-close-epic`) and `SPEC/procedures/ft-task.md` §2 converted from `Unknown prefix → read README` to an unconditional table read, with `no row → stop and ask; do not guess a folder` replacing the fall-through.

*The consumption half.* Six Archive-skim surfaces now treat an absent or empty `archive/<area>/` as a prompt to re-check `<area>` before logging "no prior tasknotes". This is the clause that actually catches the NAT-230 failure — a derived-and-wrong folder is indistinguishable from a genuinely empty one — and the only one that also catches a stale or mistyped table row, which the resolution half cannot.

**Verification.** All six Acceptance criteria decided by command, each exit 0 (Phase 3 receipt). CI `drift` job extracted from `.github/workflows/ci.yml` and run locally: **7/7 steps passed** — run because this diff touches `SPEC.md`, three templates, and five skill bodies, the exact surfaces those pairs bind. `viz` and `tools/` suites not run and cannot observe this diff; `tools/update-adopters.mjs` was grepped for every rewritten string (no matches).

**Refactors.** None made, none deferred. Every edit is in-place wording on an existing bullet, section, or checklist line — no file created, moved, or split, no lazy fragment extracted. The rationale lands once in `SPEC.md` and the operational restatements point back to it, extending this repo's cite-don't-restate shape (CORE-052) rather than adding a seventh copy of the reasoning.

**Documentation verdict.** Doc-drift sweep: no change across all 17 AI-referenced docs (detail on the checklist above).

**`touches:` scope reconciliation.** Declared 10 paths; `git diff --name-only` reports 11. All 10 declared paths were edited. One undeclared path: **`claude/skills/ft-close-epic/SKILL.md`** — a fifth instance of the same defect in different words (*"Area must resolve per SPEC … or via README's project-specific prefixes. Unknown prefix → stop and ask"*), found during execution by the `Unknown prefix` sweep rather than at Discovery. Recorded as a fact, not a gate.

**Relationship to CORE-412.** `supersedes: [CORE-412]`, partial. CORE-412 (2026-08-08) set the lowercase rule on an explicit operator choice of "mechanical, no lookup table" over "descriptive word, needs a maintained lookup". The rule survives as the declaration-time default; only its "no lookup table" half is overturned, on the read path. No ⚠️ superseded-claim pointer written on CORE-412 — per `SPEC/superseded-claims.md`, a superseded *decision* is recorded on the later note's `supersedes:`, and CORE-412's claims were accurate about the repo when written.

**Maintainability effect.** The known/unknown branch is gone from every area-resolution surface in the repo, so there is no longer a case an agent can misjudge into a derived folder. The failure was silent by construction — wrong path, empty result, "no prior tasknotes" logged against a full archive — and the empty-vs-absent clause is what makes it audible.

**Residual, deliberately not fixed here.** Existing adopters forked `.flowtron/tasknote/README.md` at adoption (`docs/MIGRATION.md` §3.4 copies the template once); `/ft-update` does not refresh it. Their §"Archive layout" therefore still opens with the superseded `**Rule:**` paragraph, which now *contradicts* the contract that sends the agent there. The functional half still lands — the submodule ships the corrected `SPEC.md` and skill bodies, and the table row is what the agent reads — but a stale contradicting paragraph in the file the contract points at is worth closing. Out of scope for this row (`SPEC/scope-boundaries.md`), and its fix has its own design question: how to refresh that section without clobbering the adopter-declared prefix rows, which are precisely what must not be lost. Raised to the operator at closure.

**Archived:** 2026-09-10
