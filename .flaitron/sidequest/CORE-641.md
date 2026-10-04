---
title: typescript-7
status: sidequest
priority: Low
pickup: next-chat
created: 2026-09-20
parent: CORE-639.3
---

# CORE-641 | typescript-7

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-09-20)

## Idea

Bump `typescript` 5.9→7 after `typescript-eslint` supports TS ≥7.1 (it currently peer-ranges `<6.1.0` and hard-errors: "typescript-eslint does not support TS 7.0"). Isolate bump also failed `tsc` with TS2882 on `src/main.tsx`'s side-effect `import './styles.css'`. Do not jump 5→7 by ignoring peers; wait for eslint support, then re-run the full AGENTS.md roster. CORE-639.3 reverted.

## Resume anchor

CORE-639.3 viz-majors-triage, after reverting typescript 7; vitest 5 and four other majors already kept.

Re-checked 2026-09-20 (`/ft-task CORE-641` Discovery): npm `typescript` still **7.0.2** (7.1 is `7.1.0-dev.*` nightlies only); `typescript-eslint` latest **8.70.0** (viz pin 8.67.0) peer still `>=4.8.4 <6.1.0`; GitHub main still `throw`s "does not support TS 7.0" and tracks TS ≥7.1 at [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) (open). `viz/src/main.tsx` still `import './styles.css'` (TS2882 on a 7.x isolate bump). Halted as Phase 1 blocked-prerequisite Re-scope — no flaitron `Blocked by [[ID]]` (upstream package, not a task). Re-enter when typescript-eslint publishes a build whose peer includes TS 7.1+ and no longer hard-errors on TS 7.

Operator 2026-09-20: stay on `typescript@5.9` (in-range). No dual-package 6+7, no Oxlint/Biome swap, no 5→6 bump. Wait for the 7.1 API + typescript-eslint; then isolate-bump 5.9→7 and fix TS2882.
