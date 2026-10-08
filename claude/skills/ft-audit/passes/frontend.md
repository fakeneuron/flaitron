# frontend — /ft-audit pass library

> Loaded by `SKILL.md` §1 step 1. Supplies the `frontend` domain's deltas; the
> dispatcher owns the shared procedure (arg grammar, caps, finding format,
> closing sections, PLAN write step, core hard rules).

**Attribution slug:** `audit-frontend`

## Scope & rubric hints (→ dispatcher §1)

- **Default scope (`all`/empty):** `<default frontend glob>` _(forker: set this)_
- **Extra scope tokens:** a route → component tree under that route.
- **Rubric slots** (user-facing contracts, not generic best practices):
  - `<rubric file 1>` — _(forker: e.g. `docs/DESIGN-SYSTEM.md` — tokens, spacing, typography)_
  - `<rubric file 2>` — _(forker: e.g. `docs/A11Y-BASELINE.md` — declared a11y commitments)_
  - `<rubric file 3>` — _(forker: e.g. `docs/PERF-BUDGET.md` — bundle ceilings, TTI/LCP targets)_
- **Verification gates:**
  ```sh
  <build / type-check, e.g. npm run build>
  <bundle-analyzer, e.g. npx vite-bundle-visualizer --json>
  <a11y check, e.g. npx pa11y http://localhost:5173 or jest-axe in tests>
  <lint, e.g. npm run lint>
  ```
  Failures become Critical/High findings in passes 1–2.

## The 5 passes (→ dispatcher §2)

1. **Bundle & payload** — bundle size over budget; large deps (lodash full vs. per-method, moment vs. dayjs, full icon packs); missing code-splitting at route boundaries; missing tree-shaking (default imports of barrel files); oversized / unoptimized images shipped from `public/`; fonts not subset; vendor chunks bloating from a single heavy lib. _(forker: cite your perf-budget numbers — e.g. "main bundle > 200KB gz fails the budget")_
2. **Accessibility** — interactive elements without accessible names (icon-only buttons without `aria-label`); missing or incorrect ARIA roles; focus traps / focus management bugs in modals; keyboard nav gaps (custom controls not reachable via Tab / Enter / Space); contrast violations against your declared baseline; missing `<label>` association on form controls; nested interactive elements; semantic HTML replaced by `<div onClick>`. _(forker: pin your contrast / WCAG level)_
3. **Render perf** — unnecessary re-renders on parent state change (missing `memo` / `useMemo` where it matters; not a blanket "memo everything"); long synchronous tasks in render path (> 50ms blocks INP); list rendering without `key` or with index-as-key on reorderable lists; layout thrash (reads after writes in the same frame); large `useEffect` running on every render due to unstable deps; expensive computations in render that belong in `useMemo` or upstream state.
4. **Browser hygiene** — console errors / warnings in normal flows (not "expected dev warnings" but actual error-level output); deprecated browser API usage; CSP gaps (inline scripts / styles where CSP is meant to forbid them); `dangerouslySetInnerHTML` on untrusted content; mixed-content warnings (HTTP asset from HTTPS page); third-party scripts loaded without `defer` / `async` blocking parse; missing `rel="noopener noreferrer"` on `target="_blank"` external links.
5. **Component health** — dead components / hooks / utilities (defined but no caller); unused props passed down a tree; prop drilling > 3 levels that should be context or a state library; style / token drift (hardcoded `#hex` colors instead of design-system tokens; px values where the system uses rem / spacing scale); inconsistent component naming (mix of PascalCase / kebab files); test fixtures nothing renders.

## Severity guide (→ dispatcher §3)

- **Critical** — feature broken for assistive-tech users (keyboard-only blocked, screen-reader-broken), bundle > budget on a customer-visible route, console error breaking a normal-path interaction. _(forker: name your project's sacred user-facing invariants here — e.g. WCAG 2.1 AA contrast, INP < 200ms on the cart route.)_
- **High** — a11y violation that excludes a class of users without fully breaking them, render bug that visibly degrades UX, oversized asset on a frequently-loaded route.
- **Medium** — token drift, missing memoization with measurable wasted re-renders, dead component cluster.
- **Low** — nit, naming inconsistency, hygiene with no user-visible impact.

## Specialist additions

- **Typical area prefixes** (dispatcher §5 step 3): `FE-`.
- **Hard rules:**
  - **Measure before recommending memoization.** Suggesting `useMemo` / `memo` without a measurable re-render cost is hygiene churn. If you can't point to a render that observably re-runs unnecessarily, downgrade to Low or drop.
  - _(forker: append project-specific hard rules — e.g. "Design tokens are sacred. Any hardcoded color outside the token scale is Medium minimum.")_
