---
title: epic-discovery-residue
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097, CORE-097.7]
---

# CORE-097.8 | epic-discovery-residue

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-097]]

## 🎯 Goal

Replace the 2 unprefixed `epic-discovery` strings in the ft-epic-discovery skill surface with `ft-epic-discovery` to complete the CORE-104 namespace-prefix convention.

## ✅ Acceptance

- [ ] `claude/commands/ft-epic-discovery.md:5` directive reads `Invoke the \`ft-epic-discovery\` skill.` (matches sibling stubs `ft-stats.md` / `ft-quality.md` shape).
- [ ] `claude/skills/ft-epic-discovery/SKILL.md:6` H1 reads `# ft-epic-discovery — flowtron epic filing + Discovery driver` (matches frontmatter `name:` of `ft-epic-discovery`).
- [ ] `grep -rn -e "^# epic-discovery" -e "\`epic-discovery\`" --include="*.md" --exclude-dir=archive` returns zero hits across non-archive markdown (PLAN.md filing line excepted by closure flip).
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs": for each entry, "no change" or the update.
- [ ] Epic-close: parent CORE-EPIC-097 line flipped to `[x]` and parent + children .1–.8 moved to `## Completed` per epic-close convention.

## 🧩 Subtasks

- [ ] Edit `claude/commands/ft-epic-discovery.md:5` — `epic-discovery` → `ft-epic-discovery` inside the backticked skill name in the L5 directive.
- [ ] Edit `claude/skills/ft-epic-discovery/SKILL.md:6` — H1 `# epic-discovery` → `# ft-epic-discovery`.
- [ ] Run confirming grep — zero non-archive hits (PLAN.md filing line will flip at closure).
- [ ] Phase 4 closure: doc-drift sweep, flip `.8` PLAN line to stub, flip parent CORE-EPIC-097 line to `[x]` with epic-close note, move parent + children .1–.8 to `## Completed`, archive `.8` tasknote.

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill survey)
- [[CORE-097.7]] — audit that surfaced this residue (Pass A Finding A1)
- [[CORE-104]] — namespace-prefix convention this completes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit-surfaced mechanical text fix per `SPEC/epic.md` §"Audit follow-ups" ("For a few small follow-ups, close the audit and execute them as normal children"). Two confirmed-narrow occurrences at the exact line numbers cited by CORE-097.7. No design surface; no contract change.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `claude/commands/ft-epic-discovery.md` (L5 directive cited by audit)
- `claude/skills/ft-epic-discovery/SKILL.md` (L6 H1 cited by audit)
- `claude/commands/ft-stats.md` + `claude/commands/ft-quality.md` (sibling stubs — canonical shape for the `Invoke the \`<skill-id>\` skill.` directive)
- CORE-097.7 archived audit tasknote (Pass A Finding A1 source-of-truth)

### Archive skim

- `_project/tasknote/archive/core/CORE-097.7.md` — Pass A Finding A1 is the entire scope source. Confirms the 2 sites, the exact strings, and the CORE-104 namespace-prefix rationale. No other archive precedent loads here.
- `_project/tasknote/archive/core/CORE-104.md` would be the original namespace-prefix rename — out of scope to re-load; the audit's grep already confirmed only 2 residues survived the original sweep.

### Drift check

`grep -rn -e "^# epic-discovery" -e "\`epic-discovery\`" --include="*.md" --exclude-dir=archive` at HEAD returns exactly 3 hits:

1. `claude/skills/ft-epic-discovery/SKILL.md:6` — H1 (to fix)
2. `claude/commands/ft-epic-discovery.md:5` — L5 directive (to fix)
3. `_project/PLAN.md:38` — the `.8` filing line itself (descriptive; flips at closure)

Cited line numbers match HEAD. No drift since CORE-097.7 closed (same day, 2026-05-18). Safe to proceed.

### No clarifications needed

Scope unambiguous: replace `epic-discovery` with `ft-epic-discovery` at the 2 cited sites; PLAN.md filing line (site #3) is the task's own description and flips to stub form at closure. Sibling-stub shape (`ft-stats.md` / `ft-quality.md`) confirms the canonical pattern.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sibling stubs `claude/commands/ft-stats.md:5` and `claude/commands/ft-quality.md:5` both use `Invoke the \`<skill-id>\` skill.` where `<skill-id>` matches their frontmatter `name:`. Extending the same shape to `ft-epic-discovery.md`. SKILL.md H1 convention is `# <skill-id> — <one-liner>` across siblings; same shape applies.
- [x] Implemented the minimal solution — 2 single-token edits:
  - `claude/commands/ft-epic-discovery.md:5` — `\`epic-discovery\`` → `\`ft-epic-discovery\`` inside the L5 directive
  - `claude/skills/ft-epic-discovery/SKILL.md:6` — `# epic-discovery —` → `# ft-epic-discovery —`
- [x] Updated/added tests for non-trivial behavior — N/A (markdown text edits)

**Implementation Notes:**

Confirmed via re-run grep that the 2 cited sites now match the prefixed convention. Sibling-stub shape preserved.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only); both edits preserve fenced backticks and heading-level
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

Confirming grep after edits:

```text
$ grep -rn -e "^# epic-discovery" -e "`epic-discovery`" --include="*.md" --exclude-dir=archive
_project/PLAN.md:38            ← this task's filing line (flips to stub at closure)
_project/tasknote/CORE-097.8.md:16,28,81  ← this tasknote (archives at closure)
```

Zero residue in the audit-cited surface. Remaining 4 hits are all self-referential to this task and resolve at closure (PLAN line → stub form; tasknote → archive).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-18.`; tasknote moved to `_project/tasknote/archive/core/CORE-097.8.md`. Parent-flip of CORE-EPIC-097 surfaced in the 📦 bundle (per SPEC §"Post-closure protocol" §"Conditional skip rule" bundled-prompt override).
- [x] Recap drafted (bundled into the 📦 gate)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — doesn't reference the unprefixed `epic-discovery` string; only uses `/ft-epic-discovery` (the slash-command form, already prefixed) |
| `SPEC.md` | no change — already uses `/ft-epic-discovery` throughout; no unprefixed residue |
| `docs/MIGRATION.md` | no change — already prefixed |
| `claude/CLAUDE-snippet.md` | no change — already prefixed |

Pre-edit grep had confirmed all 3 unprefixed hits lived inside the `ft-epic-discovery` namespace itself (skill SKILL.md + command stub + PLAN.md filing line); none in the AI-referenced doc set. Post-edit grep confirms the audit-cited 2 sites are now prefixed.

### Recap

Closed the final follow-up surfaced by CORE-097.7's audit (Pass A Finding A1): 2 unprefixed `epic-discovery` strings in the ft-epic-discovery skill surface — the L5 command-stub directive and the SKILL.md L6 H1 — now match the CORE-104 namespace-prefix convention. Sibling-stub shape (`ft-stats.md` / `ft-quality.md`) confirmed as the canonical pattern. Confirming grep returns zero non-self-referential hits. With `.8` closed, CORE-EPIC-097 (external-skill survey) has all 8 children landed — the parent-flip + cohort consumption ask is bundled into the 📦 below.

**Archived:** 2026-05-18
