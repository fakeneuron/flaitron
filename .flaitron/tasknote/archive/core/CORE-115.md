---
title: viz-eslint-add
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-099.1, CORE-099.3, CORE-099.4, CORE-118]
---

# CORE-115 | viz-eslint-add

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-099.1]] · [[CORE-099.3]] · [[CORE-099.4]] · [[CORE-118]]

## 🎯 Goal

Add ESLint to `viz/` (flat config, `@typescript-eslint/recommended`) plus a `lint` npm script, so unused vars / floating promises / missing await — bug classes that `tsc --noEmit` doesn't catch — surface during Phase 3. `.github/workflows/` stays out per the [[CORE-099.1]] #15 decline.

## ✅ Acceptance

- [x] `viz/eslint.config.js` (flat config) extending `@typescript-eslint/recommended` exists
- [x] ESLint v9 + `typescript-eslint` v8 dev deps added to `viz/package.json`
- [x] `lint` npm script defined in `viz/package.json` (`"lint": "eslint src"`)
- [x] `npm run lint --prefix viz` exits 0 — real findings fixed, false-positives explicitly disabled with rationale (4 real fixes, 1 config-rule allowance)
- [x] Existing `npm test --prefix viz` / `npm run typecheck --prefix viz` / `npm run build --prefix viz` still pass
- [x] `.github/` remains absent — upholds [[CORE-099.1]] #15 decline (negative acceptance verified)
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] **Pattern survey** — confirmed flowtron has no prior ESLint config; locked flat-config (ESLint v9 default) over legacy `.eslintrc.cjs`
- [x] Installed ESLint v9 + `typescript-eslint` v8 + `@eslint/js` + `globals` dev deps under `viz/` via `npm --prefix viz install -D`
- [x] Authored `viz/eslint.config.js` extending `@typescript-eslint/recommended`; scoped to `src/**/*.{ts,tsx}`; ignores `dist/`, `public/`, `node_modules/`
- [x] Added `"lint": "eslint src"` to `viz/package.json` scripts
- [x] Ran `npm run lint --prefix viz`; triaged 6 findings → 4 source-level fixes + 1 config-level rule tweak (`no-empty: { allowEmptyCatch: true }`)
- [x] Verified existing scripts still pass: lint 0, typecheck 0, tests 125/125, build OK
- [x] Updated `_project/tasknote/README.md` §"Project quick commands" with the new `npm run lint --prefix viz` entry
- [x] Phase 4: doc-drift sweep + flipped PLAN.md line to stub form + moved tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-099.1]] — Discovery for `CORE-EPIC-099` (external-conventions-survey); axis #15 declined `.github/` templates ("N/A for solo + adoption-by-submodule positioning"); axis #9 declined markdownlint with parallel reasoning — bounds this task's scope
- [[CORE-099.3]] — sibling: `docs/CONVENTIONS.md` (declines pre-commit hooks: "Phase 3 validates inline; hooks would duplicate the check")
- [[CORE-099.4]] — sibling: `.editorconfig` (same cohort of small repo-meta adoptions; precedent for "small static config file, no tooling overhead")
- [[CORE-118]] — sibling Medium ticket; extracts/tests dev-server middlewares; independent surface, but the new `lint` script will lint the same `viz/src/` it lives in once those tests land

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope (ESLint-only)
  **Rationale:** PLAN-line as filed bundled (a) `.github/workflows/` CI baseline + (b) ESLint config + (c) `lint` script. Component (a) directly conflicts with [[CORE-099.1]] axis #15 (closed same-day, 2026-05-18) which declined `.github/` templates: "N/A for solo + adoption-by-submodule positioning; no public-contributor base to template for." [[CORE-099.3]] `docs/CONVENTIONS.md` (also same-cohort) declines pre-commit hooks with parallel reasoning: "Phase 3 validates inline; hooks would duplicate the check at commit time." `docs/PHILOSOPHY.md` "Zero scripts" applies to (a) by analogy: external automation that substitutes for assistant-validated Phase 3 lint/typecheck. User-resolved via AskUserQuestion: drop (a), keep (b) + (c). ESLint was not explicitly declined in the [[CORE-099.1]] axis sweep (only markdownlint, axis #9, was) and provides bug-class signal genuinely beyond `tsc --noEmit` (unused vars, floating promises, missing await, hook-rule violations) — distinct from markdownlint's "manual + AI-assisted sweeps substitute" lens because ESLint findings are mechanical, not stylistic.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Clarifying question resolved via AskUserQuestion 2026-05-18 — see Discovery Notes
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `_project/PLAN.md` — CORE-115 line at line 22 under `## Medium`; `[opus]` tag; pre-rescope shortname `ci-baseline-add`; description as filed bundled CI + ESLint + lint script
- `viz/package.json` — confirmed scripts: `dev`, `build` (= `tsc --noEmit && vite build`), `preview`, `test` (= `vitest run`), `typecheck` (= `tsc --noEmit`); **no** `lint` script; dev deps include `typescript@^5.6.2`, no `eslint*` deps
- `viz/` directory — `node_modules`, `dist`, `public`, `src`, `index.html`, `package.json`, `package-lock.json`, `postcss.config.cjs`, `tailwind.config.ts`, `tsconfig.json`, `vite.config.ts`; no `.eslintrc*`, no `eslint.config.js`
- Repo root — `ls /Users/fakeneuron/Code/flowtron/.github` → no such directory; no GitHub Actions surface exists today
- `docs/CONVENTIONS.md` — declines: CHANGELOG.md, separate ADRs, release automation, pre-commit hooks. Pre-commit decline rationale ("Phase 3 validates inline... hooks would duplicate the check at commit time") generalizes to CI-on-push by parallel reasoning. ESLint not enumerated as adhered/declined.
- `docs/PHILOSOPHY.md` §"Zero scripts" — "Every operation is `cp`, `mv`, or editing a markdown file... If a script feels needed, the answer is almost always 'no, that's the assistant's job.'" Applies to CI scripts by analogy.
- `CONTRIBUTING.md` — solo-maintained framing: "Pull requests are rare and best preceded by an issue... A PR that lands without prior discussion may be closed without merge." Reinforces the [[CORE-099.1]] #15 decline rationale (no contributor base to validate from).
- `README.md` §"Visualizer" — `viz/` is run from flowtron's own checkout (single global instance); the executable surface most likely to regress is `viz/src/**/*.{ts,tsx}`.
- `_project/tasknote/archive/core/CORE-099.1.md` — Discovery survey closed 2026-05-18; per-axis findings table at lines 162-181; axis #15 (`.github/` templates) verdict "Decline"; axis #9 (markdownlint) verdict "Decline" with rationale "manual + AI-assisted sweeps substitute; tooling overhead disproportionate for solo + AI-coding workflow."
- `_project/tasknote/archive/core/CORE-099.4.md` — sibling `.editorconfig` adoption; precedent shape ("single small static config file at file-system root; codifies de-facto convention; zero tooling overhead").

### Archive skim findings

Grep for `lint|eslint|github/workflows` across `_project/tasknote/archive/core/` returned ~10 hits — most are markdown lint sweep references (CORE-079, CORE-086) or generic prose. Load-bearing hits:

- **[[CORE-099.1]]** (Discovery, 2026-05-18) — single most relevant precedent. Two material findings: (1) **#15 `.github/` templates declined** — directly bars the CI half of CORE-115's original scope; (2) **#9 markdownlint declined** ("manual + AI-assisted sweeps substitute"). Note that #9 was specifically markdown-lint tooling, not TS-lint; ESLint as a tooling class was not surveyed. Reading the #9 rationale ("tooling overhead disproportionate for solo + AI-coding workflow") on ESLint: less applicable because ESLint findings are mechanical (unused vars, floating promises) rather than stylistic — bug-class signal that AI review doesn't reliably catch.
- **[[CORE-099.4]]** (`.editorconfig`, 2026-05-18) — adoption-shape precedent for "single small static config file" pattern. Locks the analogous shape here: one `viz/eslint.config.js` flat-config file + one `lint` script line; no broader tooling.
- **[[CORE-099.3]]** (`docs/CONVENTIONS.md`, 2026-05-18) — bumps `Declines` list: CHANGELOG, ADRs, release automation, pre-commit hooks. ESLint is **not** listed as a decline (not in the adhered or declined columns). Adopting ESLint is therefore a net-new positive position, not a reversal.
- **CORE-079** + **CORE-086** (markdown-fence langtag sweeps) — confirm flowtron's pattern of "AI + targeted-audit sweeps over recurring lint patterns" for markdown; reinforces that the markdown-lint decline was correct. Inapplicable to TS-lint (different bug-classes, different drift rate).

No prior tasknote touched `viz/eslint.config.*` (no ESLint history). Adoption is greenfield.

### Drift check (verified at HEAD)

- `.github/` directory at repo root — **absent** ✓ (CORE-115 PLAN-line claim accurate)
- ESLint config under `viz/` (any of `.eslintrc.cjs`, `.eslintrc.json`, `eslint.config.js`) — **absent** ✓
- `lint` script in `viz/package.json` — **absent** ✓ (verified the scripts block: only `dev`, `build`, `preview`, `test`, `typecheck`)
- `viz/package.json` engines: `node >=20` (post-[[CORE-119]] bump) — ESLint v9 + typescript-eslint v8 both require Node ≥18 ✓
- `viz/` Vite/Vitest versions: Vite v6.4.2, Vitest v4.1.6 — recent, no version-pinning concerns ✓

### Clarifying question (resolved 2026-05-18)

| Question | User's answer | Implication |
|---|---|---|
| How to reconcile CORE-115 with [[CORE-099.1]] #15 decline (`.github/` templates) + CONVENTIONS.md pre-commit-hook decline + PHILOSOPHY.md "Zero scripts"? | **Re-scope to ESLint-only** | Drop `.github/workflows/` scope; keep ESLint config + `lint` script under `viz/`. Uphold [[CORE-099.1]] #15; do not reverse. ESLint scope independent of `.github/` (lives inside `viz/`); not a precedent reversal. |

### Adoption shape (locked at Phase 1 close)

- **Config form:** ESLint v9 flat config at `viz/eslint.config.js`. ESLint v9 (2024+) defaults to flat config; legacy `.eslintrc.cjs` is being phased out. Flat config is the lower-drift choice for a greenfield adoption.
- **Plugins:** `@typescript-eslint/recommended` (as filed). React-specific plugins (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) deferred — surfaced as Open Phase 2 question 1; user chose **skip** during Phase 2 mid-execution (rationale: viz/ stable; bloat-in-the-margin not load-bearing; can file follow-up if a hook bug ever surfaces).
- **Scope:** `src/` only (no `dist/`, no `public/`, no `vite.config.ts`).
- **Script form:** `"lint": "eslint src"` (flat config auto-discovers `eslint.config.js`).
- **CI surface:** none. `.github/workflows/` stays out per [[CORE-099.1]] #15; the `lint` script is a Phase 3 inline-validation surface (same pattern as `test`, `typecheck`, `build`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — flowtron has no prior ESLint surface (greenfield); shape drawn from typescript-eslint v8 canonical flat-config form (`tseslint.config(...)` helper). Sibling adoption-shape precedent: [[CORE-099.4]] `.editorconfig` (single small static config file, no broader tooling). New shape justified: no existing ESLint config to extend.
- [x] Implemented the minimal solution — `viz/eslint.config.js` (14 lines), `lint` script line in `viz/package.json`, 4 dev deps (`eslint@^9.39.4`, `@eslint/js@^9.39.4`, `typescript-eslint@^8.59.4`, `globals@^15.15.0`).
- [x] Updated/added tests for non-trivial behavior — N/A (lint config is static; correctness is verified by running the lint script and the existing 125-test suite).

**Implementation Notes:**

### Files changed

| File | Change | LOC |
|---|---|---|
| `viz/eslint.config.js` | new file | +14 |
| `viz/package.json` | +1 script line, +4 dev deps | +5 |
| `viz/package-lock.json` | npm-managed dep tree | (auto) |
| `viz/src/parser.ts` | fix: `[\.\s]` → `[.\s]` (×2) — `.` doesn't need escaping inside char class | ~0 |
| `viz/src/ui/App.tsx` | fix: removed unused `TaskNode` type import | -1 |
| `viz/src/ui/useToggleSet.ts` | fix: ternary-as-statement → `if/else` block | +5/-1 |
| `_project/tasknote/README.md` | doc: added `npm run lint --prefix viz` quick command | +1 |

### Lint config form (canonical typescript-eslint v8 flat config)

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'public/**', 'node_modules/**'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
);
```

### Findings triage (6 initial → 0 final)

| File | Rule | Triage |
|---|---|---|
| `parser.ts:47` (×2) | `no-useless-escape` | **Real fix.** `\.` inside `[...]` char class is redundant; behavior-preserving change `[\.\s]` → `[.\s]` |
| `App.tsx:10` | `@typescript-eslint/no-unused-vars` | **Real fix.** Unused `TaskNode` type import (verified single occurrence via grep before removal) |
| `theme.ts:9,16` | `no-empty` | **Config-rule allowance.** `} catch {}` is the canonical best-effort-localStorage idiom (private-mode browsers, quota exceeded). ESLint's `no-empty` rule has built-in `{ allowEmptyCatch: true }` for this case — applied at config level (preferred over per-line `eslint-disable`). |
| `useToggleSet.ts:10` | `@typescript-eslint/no-unused-expressions` | **Real fix.** Ternary-as-statement (`cond ? a() : b();`) — converted to explicit `if/else` for clarity. Behavior-preserving. |

### Open Phase 2 question 1 resolution

User chose **skip** on `eslint-plugin-react-hooks` after mid-Phase 2 AskUserQuestion. Rationale (captured in conversation): user invoked the "Zero scripts" principle; criticality is real but not urgent (viz/ stable; no observed hook bugs); base config already catches the most-likely-to-bite mechanical classes. Filed as a future follow-up if a hook bug ever surfaces.

### Soft engine warning (informational)

`npm install` emitted `EBADENGINE` for transitive `eslint-visitor-keys@5.0.1` wanting Node `^20.19.0 || ^22.13.0 || >=24` (current: v20.18.0). Package installed and works on v20.18; warning is advisory. No action — `viz/package.json` engines stays at `>=20` per [[CORE-119]]. If a follow-up Node bump ever happens, the warning self-resolves.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm test --prefix viz` → 8 files, 125/125 tests passing ✓
- [x] Ran lint/type-check on changed code — `npm run lint --prefix viz` → 0 errors ✓ ; `npm run typecheck --prefix viz` → 0 errors ✓ ; `npm run build --prefix viz` → built in 2.77s ✓
- [x] (frontend) Asked the user for visual confirmation — N/A (lint tooling only; no UI/CSS/rendering changes; the 4 source-level fixes are behavior-preserving micro-refactors verified by the 125-test suite)

**Testing Notes:**

All four `viz/` validation surfaces green after the lint baseline lands:

| Script | Result |
|---|---|
| `npm run lint --prefix viz` | 0 errors |
| `npm run typecheck --prefix viz` | 0 errors |
| `npm test --prefix viz` | 8 files / 125 tests passing |
| `npm run build --prefix viz` | ✓ built in 2.77s (`dist/` chunks unchanged in size class) |

Visual confirmation skipped — no rendered-output surface touched. The 4 source-level fixes are mechanical and covered by the existing test suite (parser tests cover `cleanDescription` regex; the toggle-set hook is exercised by chip-toggle tests; App.tsx import removal is verified by the full test suite + build).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate — frontend files touched, fire branch)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — public README describes `viz/` as `npm install` + `npm run dev`; lint surface is internal-developer concern, doesn't propagate to public README |
| `SPEC.md` | no change — workflow contract; references Phase 3 lint/typecheck generically, not project-specific scripts |
| `docs/MIGRATION.md` | no change — adoption procedure; ESLint is flowtron-self-internal (lives inside `viz/`), doesn't propagate to adopter repos via submodule |
| `claude/CLAUDE-snippet.md` | no change — adopter-facing assistant snippet; no lint/tooling surface |
| `docs/CONVENTIONS.md` | no change — ESLint is project-internal tooling, not a system-level convention position (the four `Adheres to` entries — Conv-Commits, SemVer, GFM, Diátaxis — are spec-level external standards flowtron follows; ESLint adoption inside `viz/` doesn't fit that frame). Out-of-sweep follow-up surfaced below. |
| `CONTRIBUTING.md` | no change — solo-maintenance model; no lint surface in the contribution flow described |

**Out-of-sweep follow-up (potential future entry):** `docs/CONVENTIONS.md` could grow an "Adopts internally for `viz/`" sub-section if more such tooling lands. Currently a one-off; defer until pattern surfaces.

**Tasknote-internal housekeeping (not AI-referenced docs):** `_project/tasknote/README.md` §"Project quick commands" updated with `npm run lint --prefix viz` to match `test`/`typecheck`/`dev` siblings.

### Recap

Added ESLint v9 + typescript-eslint v8 baseline to `viz/` as a Phase 3 validation surface. Single flat-config file `viz/eslint.config.js` (14 lines) extending `@typescript-eslint/recommended`; new `"lint": "eslint src"` script in `viz/package.json`; 4 dev deps added (`eslint`, `@eslint/js`, `typescript-eslint`, `globals`). Initial run surfaced 6 findings → triaged to 4 source-level fixes (parser regex `\.` escapes; unused `TaskNode` import in App.tsx; ternary-as-statement in `useToggleSet`) and 1 config-rule allowance (`no-empty: { allowEmptyCatch: true }` for the canonical best-effort-localStorage idiom in `theme.ts`). All four validation surfaces green: lint 0, typecheck 0, tests 125/125, build OK. `_project/tasknote/README.md` §"Project quick commands" picked up the new lint command.

Re-scope from the filed PLAN-line (Phase 1 Relevance Assessment, user-resolved via AskUserQuestion): dropped the `.github/workflows/` CI baseline half per [[CORE-099.1]] axis #15 decline (`.github/` templates: "N/A for solo + adoption-by-submodule positioning"); kept the ESLint + lint-script half (ESLint not previously surveyed; provides mechanical bug-class signal beyond `tsc --noEmit` — distinct from the markdownlint decline rationale, which targeted stylistic AI-replaceable sweeps). Mid-Phase 2 follow-up question: user chose **skip** on `eslint-plugin-react-hooks` (real bug class but not load-bearing for current viz/ posture; filed as future follow-up if a hook bug ever surfaces).

**Archived:** 2026-05-18
