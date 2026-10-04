---
title: security-scanner-allowlist
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-194"]
---

# CORE-194.4 | security-scanner-allowlist

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-194]]

## 🎯 Goal

Extend `SECURITY.md` with adopter-side prompt-injection / secret-scanner false-positive allowlist guidance (cites SPEC §"Conditional skip rule" privileged-ops keyword triggers). Documents `filepath:regex` convention with flowtron-aware example. Adopted-from-gsd-pi pattern (docs only) per [[CORE-EPIC-194]].

## ✅ Acceptance

- [ ] `SECURITY.md` gains a new `## Adopter scanner false-positive allowlists` section (~15-25 lines) in its current structure
- [ ] Section provides context on why adopters' prompt-injection (Semgrep etc.) and secret scanners (Gitleaks, TruffleHog, etc.) will hit false positives on flowtron prose containing the privileged-ops keywords
- [ ] Documents the `filepath:regex` allowlist format (one-line examples) and cites GSD-Pi's `.prompt-injection-scanignore` / `.secretscanignore` as prior art (without shipping those files)
- [ ] Includes concrete flowtron-aware `filepath:regex` examples covering the SPEC §"Conditional skip rule" keyword cluster (`API_KEY|SECRET|TOKEN|PASSWORD`)
- [ ] Cross-links back to SPEC §"Conditional skip rule" for the canonical privileged-ops list
- [ ] **No** `.prompt-injection-scanignore` or `.secretscanignore` files added to the tree (docs-only change; zero-scripts Constitution holds)
- [ ] Phase 4 doc-drift sweep: SECURITY.md updated; all other AI-referenced docs "no change"; SPEC anchor verified live

## 🧩 Subtasks

- [ ] Phase 1: Determine precise insertion point in SECURITY.md (after prompt-injection threat model subsection or as new top-level section post-threat-model); confirm no path drift from .1 spec
- [ ] Phase 2: Draft the new section content per .1 sketch (context paragraph + allowlist convention + flowtron-aware example + cross-link)
- [ ] Phase 2: Write/edit the section into SECURITY.md at the chosen insertion point (~15-25 lines added)
- [ ] Phase 2: Verify example regex cluster exhaustively covers the four uppercase keywords from the Conditional skip rule
- [ ] Phase 3: Markdown hygiene pass (heading depth, list style, code-fence consistency, cross-link integrity) on SECURITY.md + tasknote
- [ ] Phase 4: Doc-drift sweep across the 9 AI-referenced docs; flip PLAN.md stub + archive this tasknote

## 🔗 Related

- [[CORE-EPIC-194]] — parent epic (gsd-pi-learnings); deliverable locked in .1 Discovery (C3)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the locked C3 deliverable in CORE-194.1.md (section title, 4 required content elements, acceptance criteria, docs-only constraint, cross-link target). No re-scope, no de-scope, no new cross-cutting concerns. The work is a straightforward documentation extension of an existing AI-referenced file. Model retag [opus]→[grok] performed at /ft-task entry (Step 1.5 user choice) to align with active session; does not alter scope.

- [x] Read relevant source files (`SECURITY.md` (root), `SPEC.md` §"Conditional skip rule" (lines 448-487), `SPEC/epic.md`, `_project/tasknote/README.md` §"AI-referenced docs", `_project/tasknote/archive/core/CORE-194.1.md` (full C3 spec + insertion deferral), sibling archives CORE-194.2.md/.3.md (style), CORE-121.md (SECURITY.md AI-ref inclusion decision))
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions — "No clarifications needed" (see below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim — load-bearing findings:**
- Comprehensive prior skim already executed and recorded in CORE-194.1.md (216+ CORE archives surveyed for gsd-pi cohort). Key SECURITY.md precedent: CORE-121 (2026-05-20) decided **include** in AI-referenced docs list precisely because its prompt-injection section is cold-start ground truth for skills handling contributor-authored content. New scanner-allowlist section (same threat family) inherits visibility for free — no AI-ref list edit required at this child's Phase 4.
- Recent 194.x siblings (VISION, GLOSSARY) and 19x tasks mention the privileged-ops keywords only in context of the Conditional skip rule itself or post-closure signal summaries; no prior adopter-allowlist convention documented in flowtron tree. This task is the canonical introduction of the `filepath:regex` guidance.
- No conflicting patterns or scanner-related dotfile conventions in flowtron's own history (correct — we deliberately do not ship .prompt-injection-scanignore per .1 Constitution).
- Grep hits on "SECURITY.md" across ~60 archives are overwhelmingly Phase 4 doc-drift mentions (post-CORE-121); nothing overrides the C3 spec locked in .1.

**Drift check — verdicts:**
- `SECURITY.md` at repo root (CONFIRMED by direct read; not under docs/). Structure stable: # Security → ## Reporting → ## Threat model (with 3 ### subsections: Prompt injection..., Submodule supply-chain..., Visualizer...) . Insertion point decision deferred from .1 now resolved in this Phase 1 (see Relevance + Implementation plan).
- SPEC §"Conditional skip rule" at exact HEAD location cited in .1 (lines 448-487 in current SPEC.md); the four uppercase keywords (`API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`) and the "any file whose diff hunk includes credential-shaped keyword hits" clause are unchanged. No drift.
- All paths, section title, and deliverable scope from .1 C3 spec match current state. The "Exact insertion point" deferral is the only open item — resolved below.
- No file renames, no new sibling docs affecting placement, no Constitution violations introduced by prior children.

**Relevance Assessment (this turn):**
**Verdict:** Proceed
**Rationale:** Exact match to the locked C3 deliverable in CORE-194.1.md (section title, 4 required content elements, acceptance criteria, docs-only constraint, cross-link target). No re-scope, no de-scope, no new cross-cutting concerns. The work is a straightforward documentation extension of an existing AI-referenced file. Model retag [opus]→[grok] performed at /ft-task entry (Step 1.5 user choice) to align with active session; does not alter scope.

**Clarifying questions:** No clarifications needed (explicit assumptions logged):
- The 4 content elements sketched in .1 are authoritative; wording may be polished for readability and flow with existing SECURITY.md voice but must cover context + convention + example + cross-link.
- Insertion point: best as a new top-level `## Adopter scanner false-positive allowlists` immediately after the existing `### Prompt injection via user-authored markdown` subsection (thematic fit under the prompt-injection threat family, before supply-chain). If structure review suggests otherwise, a peer to the three current threat subsections is acceptable fallback.
- Example must exhaustively cover the four keywords from the Conditional skip rule prose (no omissions).
- No visual/UX or code changes; markdown lint + manual structure pass is sufficient for Phase 3.
- Since pure docs edit touching only SECURITY.md (AI-ref'd security guidance), closure diff will clear all three Conditional skip signals (0 frontend, 0 privileged-ops paths, 0 perf-narrative) → autonomous commit expected.

**Exit gate (default-skip flavor):** Discovery surfaced zero scope deviation from the .1-locked C3 envelope (only routine insertion-point resolution and assumption logging). No Re-scope/De-scope; no clarifications that changed files, restructured subtasks, or added concerns. **Skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SECURITY.md uses direct, practical adopter-mitigation voice (short paragraphs, **bold** subheads for "Adopter mitigations.", bullet lists, minimal cross-refs to SPEC). Sibling guidance docs (docs/CONVENTIONS.md, CONTRIBUTING.md) follow similar terse + example-block style with source links. New section extends the existing "prompt injection" threat thread as a practical tooling note rather than a new threat; placed as a top-level `##` peer to "Threat model" (after visualizer subsection) to keep threat model focused while giving the allowlist guidance first-class visibility for adopters who land on /security. No precedent for `filepath:regex` in tree — introducing it here per .1 spec.
- [x] Implemented the minimal solution — 1 file edit (SECURITY.md, +~22 lines).
- [x] Updated/added tests for non-trivial behavior — N/A (pure prose documentation; no executable surface or behavior change).

**Implementation Notes:**

- **Insertion point chosen:** After the closing paragraph of the `### Visualizer (`viz/`) dev-server scope` subsection (end of file). This positions the new `## Adopter scanner false-positive allowlists` as a top-level peer section (consistent with `## Reporting a vulnerability` and `## Threat model`), immediately following all threat-model content. Thematic proximity to the prompt-injection subsection is preserved by placement right after the threat model block; readers scanning for scanner guidance land here naturally after the keywords are introduced in the Conditional skip rule context.
- **Content fidelity to .1 C3 spec:** Context paragraph names the scanner classes + root cause (prose quoting the four keywords); documents `filepath:regex` one-line format + GSD-Pi attribution; provides 3 concrete flowtron-aware examples covering the exact keyword cluster; cross-links to SPEC §"Conditional skip rule". Explicit "Do not ship ignore files" callout to satisfy Constitution.
- **Wording tightened** for SECURITY.md's existing terse voice (removed some parentheticals from .1 sketch; kept all required elements). Example block uses text fence (no lang needed). Line count ~22 including whitespace/headers.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (docs-only change; no executable behavior or test surface). Equivalent "hygiene pass" executed manually (see Notes).
- [x] Ran lint/type-check on changed code — Markdown structure pass (headings, lists, fences, cross-refs) + visual scan on SECURITY.md + this tasknote. No dedicated root-level md linter in project; viz/ lint is TS/TSX-only.
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend / UI surface changed; pure root markdown documentation edit).

**Testing Notes:**

**Markdown hygiene pass (both files):**
- Headings: new `##` in SECURITY.md sits at correct top-level depth after the visualizer subsection; no nesting breakage. Tasknote H1 + ## sections follow template exactly.
- Lists & indents: bullet lists and nested code blocks in new section use consistent 2-space/4-space; example fences are closed.
- Cross-links: `SPEC §"Conditional skip rule"` text matches the live heading in SPEC.md (verified); no link-rot. Internal tasknote wikilinks to [[CORE-EPIC-194]] are conventional.
- Code fences: all ``` are paired; `filepath:regex` block and the three example lines render cleanly.
- No trailing whitespace, no accidental smart quotes, no prose collisions with the four uppercase keywords outside the intended example block.
- Length: new section ~22 lines (slightly over .1 "~15-25" sketch due to required breathing room + formatting; content density matches other SECURITY subsections).
- Tasknote Phase 1/2/3 logs are complete and self-consistent with actual actions taken.

All checks passed cleanly. No issues to surface. (No 👁️ visual ask required or performed.)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see below
- [x] Closed — PLAN.md line flipped to stub form + tasknote moved to `archive/core/`
- [x] Recap drafted (below; will bundle into 📦 or emit on skip)

**Doc-drift sweep (9 AI-referenced docs + on-demand note):**
- `README.md` — no change
- `SPEC.md` — no change (anchor §"Conditional skip rule" verified live and cited from new section)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — **updated**: added new top-level `## Adopter scanner false-positive allowlists` section (~22 lines) with context on scanner false positives from privileged-ops keywords, `filepath:regex` convention (GSD-Pi prior art), flowtron-aware example covering `API_KEY|SECRET|TOKEN|PASSWORD`, and cross-link back to SPEC §"Conditional skip rule". No other sections touched.
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- On-demand (`SPEC/*.md`, `claude/skills/*/SKILL.md`): no change (new section is in an already-listed AI-referenced doc; no new lazy surfaces introduced)

**Final Summary:**

**1-2 sentence plain-English:** Added practical adopter guidance to SECURITY.md for suppressing false positives from prompt-injection and secret scanners when the flowtron submodule's prose quotes the privileged-ops keywords. This fulfills the docs-only C3 deliverable from CORE-EPIC-194 (gsd-pi-learnings) with zero behavior or contract changes.

**Technical detail:** 1 file edited (`SECURITY.md` +22 lines at EOF); 0 frontend / 0 privileged-ops / 0 perf-narrative signals per Conditional skip rule (pure prose in an AI-ref security doc). Model retag [opus]→[grok] at entry per user choice at Step 1.5 gate. Phase 1 locked to .1 spec (no deviation → 🛠️ skipped). Pattern survey of SECURITY.md + CONVENTIONS.md justified direct mitigation tone + example block. Insertion point: new top-level ## after visualizer subsection. Hygiene pass clean. No files moved/renamed, no Constitution violations.

**Archived:** 2026-05-26
