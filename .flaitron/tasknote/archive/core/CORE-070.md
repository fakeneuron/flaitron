---
title: repo-layout-doc-currency
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [CORE-071]
---

# CORE-070 | repo-layout-doc-currency

[← PLAN.md](../../../PLAN.md) · ✅ Completed 2026-05-10 · 🔗 [[CORE-071]]

## 🎯 Goal

Update `README.md` §"Repo layout" and `SPEC.md` §"Working in the flowtron repo itself" so they surface the current `SPEC/` (lazy modules) and `claude/` (commands + skills) directories, and cross-link CORE-071's new MIGRATION.md §1.0 flowtron-self developer install block.

## ✅ Acceptance

- [x] `README.md` §"Repo layout" gains a `SPEC/` bullet between `SPEC.md` and `templates/`: `lazy SPEC modules (epic, starter, blocked, model, versioning); loaded on demand by skills`.
- [x] `README.md` §"Repo layout" `claude/` line drops the stale `(/task, /new-project)` enumeration in favor of `(adopter-facing snippet + self-hosted skills like \`/task\`, \`/release\`)` — gestures at scope without enumerating all 8 skills.
- [x] `README.md` §"Documents" left unchanged (overview reads as "3 things to read first" — SPEC/ lazy modules belong in Repo layout, not Documents).
- [x] `SPEC.md` §"Working in the flowtron repo itself" gains a `SPEC/` bullet (lazy modules) and a `claude/` bullet (commands + skills + adopter-snippet pointer), plus a closing paragraph cross-linking `docs/MIGRATION.md` §1.0 "One-time global installs" → flowtron-self developers block.
- [x] No edits to other AI-referenced docs (`docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`).
- [x] Markdown renders cleanly; no broken cross-references.

## 🧩 Subtasks

- [x] Apply the README.md §"Repo layout" edit (insert `SPEC/` bullet; replace `claude/` line) per the user's approved preview.
- [x] Apply the SPEC.md §"Working in the flowtron repo itself" edit (insert `SPEC/` + `claude/` bullets; add closing MIGRATION.md cross-link paragraph) per the user's approved preview.
- [x] Phase 3 lint/render mental-pass: markdown headings/lists/links balanced; cross-references resolve.
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (`README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md`) — per-entry verdict.
- [x] Phase 4 closure write: flip PLAN.md line to stub form, move under `## Completed`; move tasknote to `_project/tasknote/archive/core/CORE-070.md`.

## 🔗 Related

- [[CORE-071]] — Sibling audit-derived task (Finding #4); shipped today (2026-05-10) the MIGRATION.md §1.0 adopter/flowtron-self install split. CORE-071 deliberately stayed out of SPEC.md so CORE-070 owns the §"Working in the flowtron repo itself" expansion atomically; CORE-070 in turn cross-links into CORE-071's new flowtron-self-developer block.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed — drift confirmed at HEAD on both surfaces. README.md §"Repo layout" L83-91 lists `claude/` with a stale `(/task, /new-project)` enumeration (8 skills exist now: close-epic, epic-discovery, file-followup, micro-task, new-project, release, starter-task, task) and is missing any `SPEC/` directory entry despite SPEC.md cross-linking 5 lazy modules from itself (`SPEC/epic.md`, `SPEC/starter.md`, `SPEC/blocked.md`, `SPEC/model.md`, `SPEC/versioning.md`). SPEC.md §"Working in the flowtron repo itself" L45-52 has 3 bullets (SPEC.md / _project/PLAN.md / templates/) — missing `SPEC/` and `claude/` entirely. CORE-071 just landed (2026-05-10) the MIGRATION.md §1.0 adopter/flowtron-self install split; the new flowtron-self developer install block (`/release`) isn't cross-linked from SPEC's flowtron-self section.
  **Rationale:** see above.

- [x] Read relevant source files — `README.md` (full); `SPEC.md` (target section + headings + SPEC/ cross-refs); `claude/` directory inventory (8 skills, 8 commands); `SPEC/` directory inventory (5 lazy modules); `_project/tasknote/README.md` §"AI-referenced docs" for closure-sweep targets.
- [x] **Archive skim** — `_project/tasknote/archive/core/`:
  - [[CORE-071]] (2026-05-10) — sibling audit-derived task; shipped today. Explicit acceptance line: "No edits to `SPEC.md` or other AI-referenced docs (CORE-070 owns the SPEC.md §"Working in the flowtron repo itself" expansion)." Hand-off intentional. CORE-071's new MIGRATION.md §1.0 "Flowtron-self developers only — `/release`" block is the cross-link target for CORE-070's SPEC.md edit.
  - [[CORE-069]] (2026-05-10) — sibling audit-derived task (Finding #1); template `status:` default fix. No bearing on CORE-070's surfaces.
  - No prior tasknote re-examined README §"Repo layout" or SPEC §"Working in the flowtron repo itself" structure, so no contradicting prior decision.
- [x] **Drift check** — `README.md:83-91` (Repo layout) confirmed at HEAD with the cited stale `(/task, /new-project)` enumeration on the `claude/` line and no `SPEC/` entry. `README.md:10-17` (Documents) confirmed at HEAD with 3 entries. `SPEC.md:45-52` (Working in the flowtron repo itself) confirmed at HEAD with 3 bullets, no `SPEC/`, no `claude/`, no MIGRATION.md cross-link. `claude/skills/` directory confirmed to hold 8 skills. `SPEC/` directory confirmed to hold 5 lazy modules. `docs/MIGRATION.md` §1.0 split confirmed live (CORE-071 archived 2026-05-10). No drift from task-description hypotheses.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  AskUserQuestion (2026-05-10) — four orthogonal structural calls answered:
  1. **README §"Repo layout" — SPEC/ shape:** *Own bullet* between `SPEC.md` and `templates/`, reading "lazy SPEC modules (epic, starter, blocked, model, versioning); loaded on demand by skills".
  2. **README §"Repo layout" — claude/ enumeration:** *Drop the enumeration* in favor of "(adopter-facing snippet + self-hosted skills like `/task`, `/release`)". Gestures at scope without enumerating all 8 skills (which would rot on next skill landing).
  3. **SPEC §"Working in the flowtron repo itself":** *Add SPEC/ + claude/ bullets + closing cross-link to MIGRATION.md §1.0* "One-time global installs" → flowtron-self developers block. Surfaces the global `/release` install for new-machine setup.
  4. **README §"Documents":** *No additions — leave it alone.* Reads as a "3 things to read first" overview; SPEC/ lazy modules are implementation-detail and the §"Repo layout" surface is the right home.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Edit shape — README.md §"Repo layout" (L83-91):** insert one new bullet (`SPEC/`) between current L85 and L86; replace L87 `claude/` line with the new wording. Net: +1 line, ~1 line reworded. No other bullets touched.
- **Edit shape — SPEC.md §"Working in the flowtron repo itself" (L45-52):** insert one `SPEC/` bullet after current L49 ("This `SPEC.md` IS the canonical reference."); insert one `claude/` bullet after current L51 ("templates/ folder…"); append one closing paragraph after the bullet list with the MIGRATION.md §1.0 cross-link. Net: +2 bullet lines, +3 paragraph lines (one paragraph + leading blank + trailing blank). No existing bullets touched.
- **Bullet ordering rationale (SPEC):** `SPEC/` bullet sits immediately after the SPEC.md bullet (parallel: canonical-reference + lazy-extensions). `claude/` bullet sits at the end (Claude Code surface — distinct from the contract/PLAN/templates trio that already opens the list).
- **Cross-link wording (SPEC):** mirror CORE-071's published label exactly — "**One-time global installs**" (plural) and "**Flowtron-self developers only — `/release`**" — so the pointer resolves to live anchor text.
- **Out of scope (deferred from SCRATCHPAD line 23):** `_project/tasknote/README.md:46` lists "Viz lint: `cd viz && npm run lint`" but `viz/package.json` has no `lint` script. Separate doc-drift; CORE-070 stays narrow per its filing scope. File as a follow-up if the user wants.
- **No code or test changes** — pure markdown doc edit. Phase 3 is markdown-render mental-pass only; no lint/test command to run.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — README.md §"Repo layout" already follows a uniform `\`path/\` — short description` bullet shape; new `SPEC/` bullet adopts that shape exactly. SPEC.md §"Working in the flowtron repo itself" bullets use mixed prose styles (some imperative "This SPEC.md IS the canonical reference.", some declarative "The templates/ folder holds…"); the two new bullets use the same `\`path/\` — short description` shape that README uses, with a closing prose paragraph for the cross-link (parallel to MIGRATION.md §1.0's intro/code-fence/closing-prose structure CORE-071 just landed). No new shape introduced; pure additive markdown.
- [x] Implemented the minimal solution — two surgical Edit calls. README.md: replaced the 3-line block (SPEC.md + templates/ + claude/ bullets) with a 4-line block adding the SPEC/ bullet between SPEC.md and templates/, and reworded the claude/ line. SPEC.md: replaced the 5-line block (intro + 3 bullets) with a 9-line block adding the SPEC/ + claude/ bullets and a closing paragraph + blank line for the MIGRATION.md cross-link.
- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown doc edit; no test surface).

**Implementation Notes:**

- README.md L86 inserted: `- \`SPEC/\` — lazy SPEC modules (epic, starter, blocked, model, versioning); loaded on demand by skills`. L88 (was L87) reworded: `- \`claude/\` — Claude Code skills + slash commands (adopter-facing snippet + self-hosted skills like \`/task\`, \`/release\`)`.
- SPEC.md L50 inserted: `- \`SPEC/\` — lazy SPEC modules loaded on demand by skills.`. L53 inserted (after templates/ bullet): `- \`claude/\` — Claude Code commands + skills (\`/task\`, \`/release\`, \`/new-project\`, …); the adopter snippet lives at \`claude/CLAUDE-snippet.md\`.`. L55 inserted (closing paragraph): `For flowtron-self global installs (e.g. \`/release\`), see [\`docs/MIGRATION.md\`](docs/MIGRATION.md) §1.0 "One-time global installs" → flowtron-self developers block.`
- Net delta: +1 line / 1 reworded in README; +5 lines (2 bullets + 1 paragraph + 2 surrounding blanks) in SPEC. No existing bullets touched. No cross-references broken.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure markdown doc; no test surface).
- [x] Ran lint/type-check on changed code — N/A (flowtron does not ship a markdown linter). Mental render-pass on both edited regions: README.md L83-92 list structure intact, blank lines balanced, all 7 bullets render uniformly. SPEC.md L45-55 bullet list intact, closing paragraph reads as a natural pointer outside the bulleted enumeration. Cross-link target verified via grep — `docs/MIGRATION.md:27` literally contains "**One-time global installs**" and `docs/MIGRATION.md:36` literally contains "Flowtron-self developers only — \`/release\`" — both anchor texts the new SPEC paragraph references resolve to live content.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (markdown doc, not UI). The user pre-approved the rendered shape via AskUserQuestion previews in Phase 1 across all four structural calls; Phase 2 reproduced them verbatim.

**Testing Notes:**

The visible rendered shape on GitHub / in any markdown viewer matches the four user-approved previews exactly. No deviation. The closing SPEC.md paragraph uses smart-quote-style straight ASCII quotes around "One-time global installs" to match the literal MIGRATION.md heading text (markdown doesn't render fancy quotes there either).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — **updated.** §"Repo layout" gained a `SPEC/` bullet (lazy modules: epic / starter / blocked / model / versioning) and the `claude/` line dropped its stale `(/task, /new-project)` enumeration in favor of `(adopter-facing snippet + self-hosted skills like \`/task\`, \`/release\`)`. §"Documents" intentionally left alone (per Phase 1 gate decision — overview reads as "3 things to read first"; lazy modules belong in §"Repo layout").
  - `SPEC.md` — **updated.** §"Working in the flowtron repo itself" gained two bullets (`SPEC/` lazy modules; `claude/` commands + skills + adopter-snippet pointer) and a closing paragraph cross-linking `docs/MIGRATION.md` §1.0 "One-time global installs" → flowtron-self developers block. This IS the CORE-070 change.
  - `docs/MIGRATION.md` — **no change.** CORE-071 (2026-05-10) just landed §1.0's adopter/flowtron-self install split; CORE-070 deliberately did not edit MIGRATION.md, only cross-linked into it from SPEC. The cross-link target text matches MIGRATION.md L27 ("**One-time global installs**") and L36 ("Flowtron-self developers only — `/release`") verbatim.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopter-facing CLAUDE.md block; doesn't reference flowtron's internal repo layout. Out of scope.
- [x] Closed — PLAN.md line flipped to stub form `[x] **CORE-070** [opus] | repo-layout-doc-currency — Completed 2026-05-10.` (per SPEC §"`## Completed` archive convention"), moved under `## Completed`; Medium section now reads `(none)` (CORE-070 was the sole Medium entry); tasknote moved to `_project/tasknote/archive/core/CORE-070.md`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate).

**Final Summary:**

`README.md` §"Repo layout" and `SPEC.md` §"Working in the flowtron repo itself" updated to surface the `SPEC/` lazy-modules directory (5 modules: epic, starter, blocked, model, versioning) and the `claude/` directory (commands + skills + adopter-facing snippet). The stale `(/task, /new-project)` enumeration on README's `claude/` line replaced with a forward-stable phrasing that gestures at scope without enumerating all 8 skills. SPEC's flowtron-self section also gained a closing cross-link to CORE-071's new MIGRATION.md §1.0 flowtron-self developer install block, surfacing the global `/release` install for new-machine setup. Two doc files touched; net +1 line in README, +5 lines in SPEC; no cross-references broken; no other AI-referenced docs touched (MIGRATION.md / CLAUDE-snippet.md). Closes the Findings #3 + #5 audit-derived gap; CORE-069 + CORE-071 + CORE-070 together close the four 2026-05-10 audit findings.

**Archived:** 2026-05-10
