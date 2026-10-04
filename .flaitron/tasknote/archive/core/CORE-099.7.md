---
title: audit
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.1, CORE-099.2, CORE-099.3, CORE-099.4, CORE-099.5, CORE-099.6]
---

# CORE-099.7 | audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]]

## 🎯 Goal

Verify the CORE-099.2–.6 cohort (LICENSE, CONVENTIONS.md, .editorconfig, README markdown-vaults, CONTRIBUTING.md) sits well in the codebase as a whole, and file follow-ups for any integration misses.

## ✅ Acceptance

- [ ] Each shipped artifact (LICENSE, docs/CONVENTIONS.md, .editorconfig, README §"Working in markdown vaults", CONTRIBUTING.md) reviewed in place — present, well-formed, internally consistent
- [ ] Cohort coherence checked — no cross-document contradictions, no orphaned references, no overlap with pre-existing flowtron content that should have been collapsed
- [ ] Discovery-deliverable fidelity — adoption candidates from CORE-099.1's gap analysis are accounted for (adopted, deferred-with-rationale, or declined-with-rationale); no silent drops
- [ ] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (fixed audit acceptance per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")
- [ ] Follow-ups (if any) filed to PLAN.md as `CORE-099.8+` children or standalone `CORE-<next>` entries with rationale

## 🧩 Subtasks

- [ ] Per-artifact in-place review — verify each of the 5 shipped artifacts (LICENSE, docs/CONVENTIONS.md, .editorconfig, README §"Working in markdown vaults", CONTRIBUTING.md) is well-formed and internally consistent
- [ ] Cohort cross-ref pass — every internal reference between cohort artifacts and the surrounding repo resolves (paths, section anchors, wikilink form)
- [ ] Discovery-deliverable fidelity — confirm 5 user-approved adoptions all shipped per CORE-099.1's adoption-shape spec; 3 declines (markdownlint, spec-kit upfront staging, `.github/` templates) not silently re-adopted; per-axis findings reflected
- [ ] Cumulative doc-drift sweep — walk the 4 AI-referenced docs (README.md, SPEC.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md) for stale claims introduced or revealed by the cohort
- [ ] Fix trivial inline drift (typos, broken wikilinks, missing one-line cross-refs) per user directive; defer substantive misses to follow-ups
- [ ] File any substantive follow-ups in PLAN.md as `CORE-099.8+` children or standalone `CORE-<next>` with rationale (none expected — surface as "none found" if so)
- [ ] Record fixed doc-drift sweep verdict in Final Summary per SPEC/epic.md §"Audit acceptance — fixed doc-drift line"

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)
- [[CORE-099.1]] — Discovery: gap analysis + adoption candidates (the contract this audit verifies)
- [[CORE-099.2]] — LICENSE (MIT)
- [[CORE-099.3]] — docs/CONVENTIONS.md (8 axes)
- [[CORE-099.4]] — .editorconfig (LF/UTF-8/2-space)
- [[CORE-099.5]] — README "Working in markdown vaults"
- [[CORE-099.6]] — CONTRIBUTING.md (solo-maintained)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Final-numbered audit subtask of [[CORE-EPIC-099]] per `SPEC/epic.md` §"Numbering convention"; all 5 implementation children (`.2`-`.6`) are closed and archived as of 2026-05-18; cohort is ready for cross-cutting verification. Acceptance carries the fixed doc-drift sweep line mandated by `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line". Direct shape precedent: [[CORE-097.7]] (audit subtask of the external-skill-survey epic — same cohort-coherence + decline-fidelity + doc-drift sweep pattern).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `LICENSE` — MIT, copyright "fakeneuron" 2026; well-formed
- `docs/CONVENTIONS.md` — 8-axis bundle (4 adheres / 4 declines); cross-refs to SPEC.md, PHILOSOPHY.md, MIGRATION.md, SPEC/versioning.md, README.md §"Working in markdown vaults"
- `.editorconfig` — root=true; UTF-8 / LF / 2-space / trim-trailing / final-newline; `[*.md]` override empty (inherits)
- `README.md` §"Working in markdown vaults" (lines 60-95) — Obsidian + Foam + Logseq with parity caveats and an opt-in framing
- `CONTRIBUTING.md` — solo-maintenance framing; issues OK / PRs rare / issue-first rule; cross-refs to SPEC.md, CONVENTIONS.md, MIGRATION.md, PHILOSOPHY.md, LICENSE
- `_project/tasknote/archive/core/CORE-099.1.md` — discovery contract (per-axis findings, 5-adoption shortlist, 3 declines)
- `_project/tasknote/README.md` §"AI-referenced docs" — 4-doc cold-start list (per user directive, stays at 4)
- `docs/PHILOSOPHY.md` line 41 "Zero scripts" — anchor cited twice by CONVENTIONS.md (verified)
- `_project/PLAN.md` — `CORE-099.7` line at 37 under `## Future Opportunities` (under [[CORE-EPIC-099]])

### Archive skim findings

`_project/tasknote/archive/core/` contains the full sibling cohort (CORE-099.1 through .6). Sibling pre-audit doc-drift sweeps cover their own slice; this audit covers cumulative drift.

- [[CORE-099.1]] (Discovery, 2026-05-18) — establishes the 5-adoption + 3-decline contract this audit verifies. Per-axis findings table preserved as the adoption-shape spec.
- [[CORE-099.2]] LICENSE through [[CORE-099.6]] CONTRIBUTING.md — implementation children; each closed with its own doc-drift sweep entry.
- [[CORE-097.7]] (External-skill-survey audit, 2026-05-18) — shape precedent (per-pass verdict tables; findings classified + filed as `.N+1`; fixed doc-drift sweep table in Final Summary).
- [[CORE-022]] (Working in Obsidian section, 2026-05-01) — superseded by [[CORE-099.5]]; verified original Obsidian-companion section was rewritten into the broader "Working in markdown vaults" form rather than left as parallel content (no orphan).

### Drift check (verified at HEAD)

- `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" — present at line 43; matches the acceptance line copied into this tasknote ✓
- `_project/tasknote/README.md` §"AI-referenced docs" — 4-doc list confirmed at lines 34-37 ✓
- CONVENTIONS.md cross-refs walked: `SPEC.md`, `SPEC/versioning.md`, `PHILOSOPHY.md`, `MIGRATION.md`, `README.md` §"Working in markdown vaults" all resolve ✓
- CONTRIBUTING.md cross-refs walked: `SPEC.md`, `docs/CONVENTIONS.md`, `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `LICENSE` all resolve ✓
- README.md §"Documents" lists CONVENTIONS.md (line 18) and CONTRIBUTING.md (line 21) — both new docs surface in the canonical doc-list entry point ✓
- PHILOSOPHY.md "Zero scripts" at line 41 — CONVENTIONS.md cites this twice (release-automation section + pre-commit section) ✓
- CONVENTIONS.md cites `CORE-043` and `CORE-046` as annotated-tag-as-CHANGELOG examples — both present in PLAN.md `## Completed` (lines 140, 135) ✓
- CONVENTIONS.md cites `CORE-097` candidates as MIT-licensed precedent — accurate per Discovery (CORE-097 was external-skill-survey across 6 MIT-licensed projects)
- BREAKING-change convention pre/post v3.0.0 — pre-v3.0.0 used `(...BREAKING)` (CORE-105 cited in Discovery as example); post-v3.0.0 should use canonical `!`. No post-v3.0.0 BREAKING commits exist yet to cross-check, but the doc encodes the going-forward convention.

### Resolved scoping (from AskUserQuestion 2026-05-18)

| Question | Answer | Implication |
|---|---|---|
| Add CONVENTIONS.md to AI-ref docs list? | **No (keep at 4)** | `_project/tasknote/README.md` §"AI-referenced docs" stays unchanged; CONVENTIONS.md is loaded-when-relevant, not cold-start |
| Adopter-facing pointers to CONVENTIONS.md? | **No (decline)** | MIGRATION.md + CLAUDE-snippet.md stay clean; adopters discover CONVENTIONS.md via README §"Documents" only |
| Fix-in-place authority for trivial drift? | **Fix trivial inline; file substantive** | Single-line / one-edit fixes land in this audit's commit; multi-file or content-bearing changes get filed as follow-ups |

### Audit pass plan (Phase 2)

Four passes against the cohort, plus a follow-up filing decision:

1. **Per-artifact in-place review** — each of LICENSE / CONVENTIONS.md / .editorconfig / README markdown-vaults / CONTRIBUTING.md, in turn, looking for: ill-formed content, missing canonical pieces, internal inconsistency, outdated factual claims.
2. **Cohort cross-ref pass** — every reference between cohort artifacts and surrounding repo (paths, anchors, wikilink form) verified to resolve.
3. **Discovery-deliverable fidelity** — adoption-shape spec from [[CORE-099.1]] §"Recommended adoptions shortlist" walked row-by-row; 3 declines confirmed not silently re-adopted; per-axis findings reflected.
4. **Cumulative doc-drift sweep** — walk the 4 AI-referenced docs for stale claims introduced or revealed by the cohort (per fixed audit acceptance).

Findings classified: trivial (fix inline) vs substantive (file as `.8+` follow-up or standalone). Per CORE-097.6 precedent, expect 0-3 trivial findings and 0-1 substantive findings for a coherent cohort.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — [[CORE-097.7]] is the direct shape precedent (per-pass verdict tables; findings classified + filed as `.N+1`; fixed doc-drift sweep table in Final Summary). Reusing that shape with cohort-specific pass scope (per-artifact / cross-ref / discovery-fidelity / doc-drift sweep — 4 passes for CORE-099, vs 5 passes for CORE-097.7's broader skill+SPEC+adopter+integration surface).
- [x] Implemented the minimal solution — 4 passes executed; per-pass verdict + 1 finding filed (see below)
- [x] Updated/added tests for non-trivial behavior — N/A (audit; no executable code change)

**Implementation Notes:**

### Pass 1 — Per-artifact in-place review

| Artifact | LOC | Check | Verdict |
|---|---|---|---|
| `LICENSE` | 21 | MIT, copyright "fakeneuron" 2026; canonical license text | ✅ well-formed |
| `docs/CONVENTIONS.md` | 84 | 8 axes in 4-adheres + 4-declines structure; internal cross-refs to SPEC.md / PHILOSOPHY.md / MIGRATION.md / SPEC/versioning.md / README §"Working in markdown vaults" all resolve; pre-v3.0.0 BREAKING form note accurate (CORE-105 precedent); CORE-043 + CORE-046 cited as annotated-tag examples (both verified in PLAN.md `## Completed`) | ✅ well-formed |
| `.editorconfig` | 12 | `root = true`; UTF-8 / LF / 2-space / trim-trailing / final-newline; `[*.md]` override empty (inherits) | ✅ well-formed |
| `README.md` §"Working in markdown vaults" (L60-95) | 36 | Editor-agnostic framing → Obsidian + Foam + Logseq with parity caveats → opt-in clarifier; Dataview snippet preserved | ✅ well-formed |
| `CONTRIBUTING.md` | 41 | Solo-maintenance framing; issues OK / PRs rare / issue-first rule; §"Where conventions live" nav surface; §"Licensing" announces MIT | ✅ well-formed |

Hard-break trailing-spaces scan (`grep -rln "  $"`) across SPEC.md, SPEC/, docs/, templates/, claude/, README.md, CONTRIBUTING.md: **0 hits**. `.editorconfig`'s `[*.md]` inheritance of `trim_trailing_whitespace = true` is safe — no markdown surface relies on hard-break trailing whitespace.

### Pass 2 — Cohort cross-ref pass

| Reference | Target | Resolves? |
|---|---|---|
| `README.md` §"Documents" L18 → `docs/CONVENTIONS.md` | ✓ | ✅ |
| `README.md` §"Documents" L21 → `CONTRIBUTING.md` | ✓ | ✅ |
| `docs/CONVENTIONS.md` L3 → `SPEC.md`, `PHILOSOPHY.md` | ✓ | ✅ |
| `docs/CONVENTIONS.md` L29 → `SPEC/versioning.md` | ✓ | ✅ |
| `docs/CONVENTIONS.md` L37 → `README.md` §"Working in markdown vaults" (L60) | ✓ | ✅ |
| `docs/CONVENTIONS.md` L46 → `SPEC.md`, `MIGRATION.md`, `PHILOSOPHY.md` | ✓ | ✅ |
| `docs/CONVENTIONS.md` L60 → `keepachangelog.com` (external) + CORE-043 / CORE-046 (PLAN.md `## Completed`) | ✓ | ✅ |
| `docs/CONVENTIONS.md` L76, L84 → `PHILOSOPHY.md` §"Zero scripts" (L41 — verified anchor) | ✓ | ✅ |
| `CONTRIBUTING.md` cross-refs → `SPEC.md`, `docs/CONVENTIONS.md`, `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `LICENSE` | ✓ | ✅ |
| Stale `"Working in Obsidian"` refs in active surfaces (post-rewrite) | 0 hits | ✅ no orphans |

All cohort-introduced cross-references resolve. The §"Working in Obsidian" → §"Working in markdown vaults" rename left no stale active references; the lone PLAN.md `## Completed` line 185 (CORE-022 completion record) is immutable history, expected to preserve the old name.

### Pass 3 — Discovery-deliverable fidelity

5 user-approved adoptions from [[CORE-099.1]] §"Recommended adoptions shortlist":

| Rank | Adoption | Shipped artifact | Per-spec? |
|---|---|---|---|
| P1.a | LICENSE (MIT) | `LICENSE` | ✅ MIT per recommendation |
| P1.b | `docs/CONVENTIONS.md` (8-axis bundle: #1, #2, #3, #6, #10, #11, #13, #14) | `docs/CONVENTIONS.md` | ✅ all 8 axes present; 4 adheres + 4 declines |
| P2.a | `.editorconfig` (md / ts / jsx / json / yaml) | `.editorconfig` | ⚠️ md+all-files only; no explicit ts/jsx/json/yaml sections. Inherits root defaults so behavior is equivalent — defensible simplification but a delta from the per-spec adoption shape. (See Findings.) |
| P2.b | README "Working in markdown vaults" | `README.md` L60-95 | ✅ Obsidian + Foam + Logseq parity caveats per spec |
| P2.c | `CONTRIBUTING.md` (light, solo-maintained framing) | `CONTRIBUTING.md` | ✅ light + solo framing + SPEC pointer per spec |

3 declines from [[CORE-099.1]] (per user filing bar — not filed; should remain absent from cohort artifacts):

| Decline | In CONVENTIONS.md / cohort? | Per-spec? |
|---|---|---|
| markdownlint (#9) | absent | ✅ correctly not re-adopted; Discovery rationale (manual + AI-assisted sweeps substitute) holds |
| spec-kit upfront staging (#12) | absent | ✅ correctly not double-filed; absorbed via [[CORE-097.6]] `--deep` mode |
| `.github/` templates (#15) | absent | ✅ correctly N/A; solo + adopt-via-submodule positioning |

**P2.a delta noted but not filed:** the shipped `.editorconfig` covers all files via `[*]` defaults with `[*.md]` as the only override. The Discovery spec named `md / ts / jsx / json / yaml` explicitly, presumably anticipating per-extension overrides. The shipped form is functionally equivalent (the `[*]` block already enforces UTF-8 / LF / 2-space / trim / final-newline across every file type) and arguably cleaner. Treating as a minimal-form simplification rather than a miss — `.4` Phase 2 made a reasonable judgment call. Logging for transparency.

### Pass 4 — Cumulative doc-drift sweep (per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line")

| AI-referenced doc | Verdict |
|---|---|
| `README.md` | **Update owed (see Findings).** `## Documents` block extended with CONVENTIONS.md (L18) and CONTRIBUTING.md (L21) during respective `.3` and `.6` closures; §"Working in markdown vaults" added during `.5`; cohort surface present. But: README has no top-level license reference (no §"License" section, no badge, no footer). Visitors reach MIT only via README → CONTRIBUTING → §"Licensing" (2-hop chain). |
| `SPEC.md` | no change — workflow contract is orthogonal to convention/repo-meta layer; cohort introduced no contract surface |
| `docs/MIGRATION.md` | no change — per user directive ("No pointers (decline)"), adopter-facing surface stays focused on adoption mechanics; CONVENTIONS.md is discovered via README §"Documents" |
| `claude/CLAUDE-snippet.md` | no change — per user directive ("No pointers (decline)"), adopter-assistant block stays minimal |

### Findings

**Finding 1 — README missing top-level license reference.**

Severity: low / substantive. The README does not announce MIT licensing at the top level (no badge, no §"License" section, no footer one-liner). The current cross-ref chain for a visitor wanting to know flowtron's license: README → §"Documents" (line 21) → `CONTRIBUTING.md` → §"Licensing" (line 41) → "Flowtron is MIT-licensed". 2 hops where 1 hop is the well-established README convention.

Mitigating context: GitHub auto-detects `LICENSE` at repo root and surfaces "MIT License" in the right-hand sidebar of the repo page; LICENSE file is present and well-formed. So the information is reachable from the GitHub UI; the gap is in the README's own text.

Not classified as trivial-inline per the user's Phase 1 directive ("trivial inline" = single-line / one-edit fix; "substantive" = new content). Adding a §"License" section or footer is *new content* in a public-facing doc — outside the trivial-inline scope by design.

Filed as **CORE-099.8** under [[CORE-EPIC-099]] in `## Future Opportunities` per `SPEC/epic.md` §"Audit follow-ups" ("For a few small follow-ups, close the audit and execute them as normal children"). `[sonnet]` tag — mechanical one-edit addition with a clear plan.

### Filed follow-up (PLAN.md edit)

`- [ ] **CORE-099.8** [sonnet] | README-license-ref — Add a top-level README license reference (footer one-liner or §"License" section pointing to LICENSE / MIT) so visitors discover the license in 1 hop, not 2. Surfaced by [[CORE-099.7]] audit.`

Filed as `.8` child of CORE-EPIC-099 under `## Future Opportunities`, 2-space-indented to match sibling shape. Word-count 32w, under the 50w target. After `.8` closes, the parent epic CORE-EPIC-099 can flip to Completed and the cohort moves to `## Completed`.

### Inline fixes during audit

None landed. The single finding (README license reference) was classified as substantive per the user's Phase 1 directive and deferred to `.8`. The P2.a `.editorconfig` per-extension-section delta was reviewed and held as a defensible minimal-form simplification, not a miss.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (audit task; deliverable is the per-pass verdicts + filed `.8` follow-up, not code)
- [x] Ran lint/type-check on changed code — N/A (markdown only); markdown mental-pass on the new PLAN.md `.8` line: 2-space indent under CORE-EPIC-099 (sibling shape matches `.1`-`.7`) ✓; `**CORE-099.8**` bold ID intact ✓; `[sonnet]` tag present ✓; `| README-license-ref` shortname (kebab-form, consistent with existing PLAN-line shortname conventions) ✓; em-dash separator ` — ` ✓; `[[CORE-099.7]]` wikilink correctly angle-bracketed per SPEC §"Long-description conventions" ✓; word-count ~30w (under 50w target) ✓; no trailing whitespace.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

Audit task — no code, no tests, no lint targets. The 4-pass audit + one-line PLAN.md filing (`.8`) is the entire substantive surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary (recorded as Pass 4 of Phase 2 per fixed audit acceptance line in `SPEC/epic.md`)
- [x] Closed — PLAN.md `.7` line flipped to stub form (kept in-place under CORE-EPIC-099 per epic-lifecycle convention; parent + cohort move to `## Completed` only after `.8` closes); tasknote moved to `_project/tasknote/archive/core/CORE-099.7.md`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" §"Conditional skip rule" — markdown-only diff; no frontend / privileged-ops / perf surface)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | **Update owed → filed as [[CORE-099.8]].** Cohort surface (`## Documents` extensions + §"Working in markdown vaults") is present and correct; but README has no top-level license reference. Visitors reach MIT via README → CONTRIBUTING → §"Licensing" (2-hop) where 1-hop is convention. Deferred per Phase 1 directive (substantive new content → follow-up, not inline fix). |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change (per user directive: adopter-facing pointers to CONVENTIONS.md declined) |
| `claude/CLAUDE-snippet.md` | no change (per user directive: adopter-assistant pointers to CONVENTIONS.md declined) |

Cumulative slice-local drift from `.2`-`.6` cohort: 1 update owed, filed as `.8`. Per-child Phase 4 sweeps were thorough but didn't surface the README license-ref gap; that's exactly the cumulative-drift slice the audit-level sweep is designed to catch.

### Recap

Final-subtask audit of [[CORE-EPIC-099]] (external-conventions-survey + 5 adoptions). Walked 4 audit passes: (1) per-artifact in-place review of LICENSE / docs/CONVENTIONS.md / .editorconfig / README §"Working in markdown vaults" / CONTRIBUTING.md — all well-formed + hard-break trailing-space scan clean; (2) cohort cross-ref pass — every internal reference resolves, no orphans left by the "Working in Obsidian" → "Working in markdown vaults" rename; (3) Discovery-deliverable fidelity — 5 adoptions shipped per [[CORE-099.1]] adoption-shape spec (one defensible simplification in `.4` `.editorconfig`'s `[*]`-vs-per-extension form held without filing), 3 declines (markdownlint / spec-kit / `.github/`) correctly not re-adopted; (4) cumulative doc-drift sweep across the 4-file AI-referenced doc set per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line".

**1 finding surfaced:** README missing top-level license reference — visitors reach MIT only via README → CONTRIBUTING → §"Licensing" (2-hop) where 1-hop (footer or §"License" section) is README convention. Filed as **CORE-099.8** [sonnet] under [[CORE-EPIC-099]] in `## Future Opportunities` per `SPEC/epic.md` §"Audit follow-ups" ("close the audit and execute as a normal child"). After `.8` closes, the parent epic flips to Completed and the cohort moves to `## Completed`.

**Archived:** 2026-05-18
