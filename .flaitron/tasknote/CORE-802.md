---
title: Adopter-owned audit decisions file for /ft-audit
status: starter
tags: [audit, adopter]
created: 2026-10-17
touches:
  - claude/skills/ft-audit/SKILL.md
  - templates/audit-overlay-template.md
  - docs/MIGRATION.md
  - SPEC/layout.md
---

# CORE-802 | Adopter-owned audit decisions file for /ft-audit

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-17)

## 🌱 Starter context

_Captured 2026-10-17 during an adopter-side review of why one adopter kept full-copy per-domain audit forks instead of the thin overlay — promote to full tasknote at `/ft-task` checkout._

### Why this exists

`/ft-audit` has no memory between runs. A finding the operator deliberately declined — by design, won't fix, an accepted tradeoff — fires again on the next run of the same domain. Adopters who audit repeatedly work around this by forking the scaffold and pasting a running "settled decisions / known resolved" list into the skill body. That list is the only reason one adopter's full-copy per-domain forks still beat the thin overlay, and it is project data living inside a procedure file. `/ft-audit-repo` records won't-fix tradeoffs, but only at first contact; nothing carries them forward to focused runs.

Fix: the procedure stays in flaitron; the decisions live in the adopter repo, as a file each audit reads before its passes and appends to at its write step.

### Solution shape

- **Location (locked):** `.flaitron/audit-decisions/<domain>.md` in the adopter repo, one file per domain token (`backend.md`, `frontend.md`, …). Adopter-owned data, never in the submodule. Created lazily on the first write; absent file = no settled decisions.
- **Entry format (locked — at least one adopter pre-creates files in this shape before the release):**

  ```markdown
  # Audit decisions — <domain>

  > Settled `/audit <domain>` outcomes. Read before the passes; a finding that
  > matches an entry is not reported unless its "Revisit if" condition holds.

  - **<subject>** (`<path or symbol>`) — <by-design | won't-fix>: <why>. Source: <TASK-ID> (YYYY-MM-DD). Revisit if: <trigger>.
  ```

  One line per entry, so the file greps cleanly and stays small. Only declined or accepted findings go in. Fixed findings do not: once fixed, the audit won't find them again, and a "known resolved" history is noise.
- **Read step:** dispatcher §1, after the rubric load (step 4). Read `.flaitron/audit-decisions/<domain>.md` if it exists. During passes, a candidate finding that matches an entry is dropped, unless the entry's `Revisit if:` trigger holds or the code has changed so the original rationale no longer applies. Then it is reported, with a line naming the entry it reopens.
- **Write step:** dispatcher §5. The single write-step `AskUserQuestion` already collects drop/decline decisions. Every finding the operator declines as by-design or won't-fix gets a `Why` and is appended to the domain's decisions file. The same filing commit stages it next to `.flaitron/PLAN.md`, so the post-stage verification recognizes those hunks. Findings that are only "not now" stay out of the file; they are not settled.
- **Commit edge cases (found in the first adopter port):** §5 step 5's post-stage verification must list decisions-file appends as recognized hunks, or the filing commit aborts on them. When the operator declines every finding, no ticket rows exist, so the step must still commit the append alone (e.g. `chore: audit record decisions — <domain>`). The step 2 pre-check covers the decisions file the same way it covers PLAN.md.
- **Ask, never infer the bucket:** the write-step `AskUserQuestion` must ask, for each dropped finding, whether it is by-design, won't-fix or not-now, and propose a `Revisit if:` for the operator to confirm. Otherwise a silent "not now" becomes a permanent suppression. A `general` run (which reads several domain files) routes each entry to the domain file matching the finding's location.
- **Reopened entries:** when a reopened entry turns into a ticket, the write step removes or rewrites that entry in the same commit.
- **Subroutine-safe:** subroutine invocations still *read* the file but never write it (§6 "Subroutine-safe" already bars PLAN writes; extend it to the decisions file).
- **Overlay template + MIGRATION §1.2.1:** document the file as the home for what forks used to paste into skill bodies. Add migration guidance: move a fork's settled-decision list into the file and keep fixed-item history out.

### Files to touch (preliminary survey — drift-check at promotion)

- `claude/skills/ft-audit/SKILL.md` — §1 read step, §5 append + staging, §6 subroutine rule.
- `templates/audit-overlay-template.md` — mention the decisions file; drop any implication that settled decisions belong in `## Deltas`.
- `docs/MIGRATION.md` §1.2.1 — decisions file + migrating a full-copy fork's settled-decision list.
- `SPEC/layout.md` — add `.flaitron/audit-decisions/` to the adopter `.flaitron/` layout.
- `codex/` wrapper for `ft-audit`, if it restates procedure — check at promotion.
- `docs/CONTEXT-BUDGET.md` / drift checks — only if the new prose crosses a budget.

### Explicitly out of scope

- Fleet migration of existing adopter forks: handled on the adopter side after release.
- `/ft-audit-repo` seeding the decisions files from its won't-fix tradeoffs: worth considering, but it is a separate decision (see Open).
- Any structured or machine-parsed format beyond the one-line convention.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Where decisions live | Adopter repo, not flaitron | Project data; the procedure stays generic and bump-safe |
| File granularity | One file per domain | Each run loads only its own domain; long-lived adopters accumulate dozens of entries per domain |
| Path | `.flaitron/audit-decisions/<domain>.md` | Sits with the adopter's other flaitron-owned data |
| Entry shape | One line: subject, location, verdict, why, source, revisit-if | Grep-friendly, cheap to load, adopters can pre-create it now |
| What goes in | Declined (by-design / won't-fix) findings only | Fixed items don't recur; "not now" isn't settled |

### Open at promotion (Phase 1 should resolve)

- How strict should matching be (same location vs same subject anywhere in scope)? Lean: same subject and location; if the code moved, re-evaluate rather than suppress.
- Should the Summary report a count of suppressed findings (`3 matched settled decisions`)? Lean: yes, one line, so suppression is visible.
- Should `/ft-audit-repo` seed per-domain files from its won't-fix tradeoffs? Lean: file as a follow-up, not here.
- Does a full-copy fork get the read/write steps only on re-reconcile (like `[unattended]` candidacy)? Lean: yes; say so in MIGRATION.

### Related

- [[CORE-721]] — audit-overlay-home (thin overlay this builds on).
