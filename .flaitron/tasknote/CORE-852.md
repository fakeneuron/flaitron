---
title: pin-bump-tool-merge
status: starter
tags: [planning, handoff, fleet, pin-bump]
created: 2026-10-31
related-tasks: [NAT-494]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - claude/skills/ft-update/
  - SPEC/scope-boundaries.md
  - SPEC.md
---

# CORE-852 | Codemaster planning handoff — one shared pin-bump tool

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-31)

Source: Grok Task Notes/Flaitron pin-bump tool merge starter tasknote.md (2026-10-29), read at flaitron@120a4bdacb890df14c8f1e868371d87f53c4f986

> **Format:** Flaitron starter tasknote (`templates/tasknote-starter-template.md`). Codemaster files it. Jude hands it to the owning repo himself, where a coding agent promotes it with `/ft-task <ID>`.
> **Planning first.** Phase 1 is read-only. No pushes, tags, releases or cross-repo commits without Jude's explicit approval for each change. Codemaster wrote no code and ran no tests.
> **Scope (intake split):** this starter is the Flaitron half. The Natabula half (`wave-bump.sh` wrapper, `/natabula-align`, `docs/CI-HEALTH.md`) is natabula **NAT-494**, which is blocked by this task's release.

## 🌱 Starter context

_Captured 2026-10-29 by Codemaster at Jude's request (planning only). This follows up the synergy study (Drive `1erEub8yAkNL0U1TJO0cDN_d0OlqtPQdd`) §2 "Duplication 1". Phase 1's drift check applies fully._

_Intake note (2026-10-31): `tools/update-adopters.mjs` last changed 2026-10-26; since the read only `SPEC.md` changed (CORE-843, CORE-848). The "singular script exception" carve-out now reads in both `SPEC/scope-boundaries.md:29` and `SPEC.md:756`._

### Why this exists

Two tools batch-bump `.flaitron/core` pins across `~/code` and have to be kept in sync by hand. Done means **one** implementation: Flaitron ships it, and Natabula's `/natabula-align` bump wave calls it with fleet policy flags rather than re-implementing it.

### Feasibility

- **Verdict:** Feasible. **M** size, about 3–4 tasks (roughly 2–3 agent-days, an estimate) across two repos.
- **Evidence (verified at the SHAs above):**
  - Flaitron `tools/update-adopters.mjs` (872 lines, last touched 2026-10-26) batch-bumps adopters behind the latest tag. It runs dry-run or `--apply`, makes local commits and never pushes. It applies migration-bearing-tag gates, checks symlink wiring across `.claude/`, `.agents/skills`, `.cursor/skills` and `.grok/skills`, and scans audit forks for drift. SPEC carves it out as "the singular script exception".
  - Natabula `scripts/wave-bump.sh` (425 lines, last touched NAT-470 on 2026-10-28) does `/ft-update` Steps 3–5 plus follow-through. It moves the gitlink, adds missing links, removes dangling links, updates the `Pinned to:` line and replaces the AGENTS.md `## Workflow` block. Its own comment at `wave-bump.sh:110` says it "mirrors flaitron tools/update-adopters.mjs migrationBearingTags". It adds `--accept-migration TAG`, dirty-tree, not-main and audit-fork pass-gap skips, and the reviewed-evidence skip described below.
  - `/natabula-align` §"Bump wave" (steps 2–5) is the procedure, and `wave-bump.sh` encodes it (NAT-325).
  - **caobunga-private has no bump script of its own.** It bumps by hand with `/ft-update`. The CBN-111 decision delegates pin-freshness checks to `/natabula-align`.
- **Brand-evidence gap, current state:**
  - fakeneuron CI step "Reviewed Flaitron gitlink" (`.github/workflows/ci.yml:70`) runs `npm run brand:check-pin` (`scripts/brand/check-pin.ts`). It requires `content/brand-evidence/flaitron/reviewed.json` `revision` and the evidence dir `content/brand-evidence/flaitron/<sha>/` to match the gitlink.
  - Since **NAT-470** (2026-10-28), `wave-bump.sh` (~line 355) *skips* any repo that tracks that ledger, with the reason "reviewed Flaitron evidence needs attended refresh". That stops wave-bump from breaking fakeneuron, but **no tool refreshes the ledger**, which is deliberate because it is a semantic review.
  - `update-adopters.mjs` has **no such guard** (no `reviewed.json` match in `tools/`). It would bump fakeneuron and turn its CI red.
- **Unknowns:**
  - whether Flaitron should know a fakeneuron-specific path at all, so the merge needs a *generic* "attended-ledger" hook;
  - how much of wave-bump's follow-through `/ft-update` already does per repo.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` + `.test.mjs` — becomes the single engine. Add the follow-through (Pinned-to line, dangling links, Workflow block), `--accept-migration`, a not-main skip and a **generic attended-ledger guard**.
- `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" (and the `SPEC.md` mention) — widen the carve-out wording.
- `claude/skills/ft-update/` — keep the single-repo recipe and the batch tool in sync on purpose. Optionally have the tool cite its step numbers.

### Execution plan for the coding agent (guidance, not binding)

1. **Phase 1 (read-only):** build a behaviour matrix of natabula `scripts/wave-bump.sh` vs `update-adopters.mjs`, listing each gate, each write and each exit code. Mark each item as shared, wave-only or upstream-only.
2. **S:** add a generic `--attended-ledger <relpath>` guard (repeatable; matching repos are skipped with a reason) and its tests. Ship this first, so CI can't be broken even before the merge.
3. **M:** port wave-only behaviours into `update-adopters.mjs`: the Pinned-to line, dangling-link prune, Workflow-block replace, `--accept-migration`, not-main skip and staging only named paths. Add test fixtures mirroring natabula `scripts/wave-bump.test.sh`.
4. **S:** release it in a Flaitron minor (operator's tag; Jude approves).
5. Natabula NAT-494 then rewrites `wave-bump.sh` as a wrapper (not this repo).
6. **Checks to run:** `node --test tools/update-adopters.test.mjs`, `bash tools/drift-checks.sh`, `just check`; a dry run over `~/code` showing the same plan as natabula's `wave-bump.sh`, with fakeneuron reported "attended" by both.

If the Phase 1 matrix confirms several task cycles (guard → port → release), promote as an epic rather than one task.

### Explicitly out of scope

- Automatically refreshing fakeneuron's reviewed evidence. It's a semantic review and stays an attended FE task.
- The v8 pin bump itself — already landed (natabula `2adf0b3`, caobunga `c48e7c7`, both to v8.1.0).
- The Natabula wrapper (NAT-494).
- Pushing any adopter. Both tools stay local-commit-only.

### Discovery questions (Grok's proposal; leans are evidence, not locked decisions)

| Question | Options | Lean |
|---|---|---|
| Owner | Flaitron upstream / Natabula / both | **Flaitron upstream.** Every adopter gets it, it's already carved out in SPEC, and Natabula calls it. |
| Fleet policy | Hard-code in Flaitron / pass from Natabula | **Pass from Natabula** (ledger paths, participation). Flaitron stays free of fleet knowledge (FLEET-ARCHITECTURE Engine tier). |
| wave-bump.sh | Thin wrapper / retire | **Thin wrapper** for one release, then retire. |
| Ledger handling | Skip only / skip + file FE ticket | **Skip + print a suggested FE task line.** Filing stays the operator's act. |

### Open at promotion (Phase 1 should resolve)

- Does the Workflow-block replace belong in the batch tool or only in `/ft-update`? Lean: the tool, behind the same "one `## Workflow` heading, not a symlink" guard.
- Should Natabula pin a minimum Flaitron version for the wrapper? Lean: yes, the release from step 4.

### Ties to preserve

- `/natabula-align`'s report axes and its one-confirm wave.
- Caobunga CBN-111's reliance on align for pin freshness.
- `/ft-update` stays the single-repo path, which caobunga uses.
- fakeneuron's `brand:check-pin` contract.

### Related

- natabula NAT-494 — the Natabula half (wrapper); blocked by this task's release.
- Synergy study, Drive `1erEub8yAkNL0U1TJO0cDN_d0OlqtPQdd`.
- Natabula NAT-325 (wave-bump committed), NAT-470 (reviewed-ledger skip); fakeneuron FE-137.
