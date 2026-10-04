# general — /ft-audit pass library (default domain)

> Loaded by `SKILL.md` §1 step 1. Supplies the `general` domain's deltas; the
> dispatcher owns the shared procedure (arg grammar, caps, finding format,
> closing sections, PLAN write step, core hard rules).

**Attribution slug:** `audit`

## Scope & rubric hints (→ dispatcher §1)

- **Default scope (`all`/empty):** `<default glob>` _(forker: set this — e.g. `backend/**/*.py`, `frontend/src/**`, `src/**/*.go`)_
- **Extra scope tokens:** none.
- **Rubric slots** (audit-against contracts, not generic best practices):
  - `<rubric file 1>` — _(forker: what it defines)_
  - `<rubric file 2>` — _(forker: ...)_
- **Verification gates:**
  ```sh
  <lint command for your stack>
  <type-check or build command>
  <test command>
  ```
  Failures become Critical findings in pass 2, not separate noise.

## The 5 passes (→ dispatcher §2)

1. **Security** — input validation, injection risk, secrets handling, auth assumptions, unchecked external data, `eval` / `exec` / unsafe deserialization, path traversal, CORS / origin trust, rate limiting on write endpoints, secrets leaking into logs or responses, `.env` / private keys in git. _(forker: add stack-specific examples — e.g. paper-mode enforcement for trading, CSP / XSS / `dangerouslySetInnerHTML` for browser code, SQL parameterization for ORM-light code, RPC-call error handling for blockchain code)_
2. **Idioms** — canonical patterns for your language and framework. _(forker: examples — typed signatures, async correctness (no blocking I/O in async handlers), dependency injection vs. module-level globals, modern library patterns (Pydantic v2, React Query, hooks rules), response contracts (`response_model` / typed return), exception handling specificity (no bare `except:`), test coverage of new branches, deterministic-seed invariants for backtest/simulation code)_
3. **Hygiene** — module / function / variable naming, import ordering, module boundaries (does this logic belong here or in a dedicated module?), magic numbers that belong in config, log-label consistency, hardcoded URLs / addresses that should come from env vars, dead imports, overly long functions (>60 lines is suspect), inconsistent class / token ordering.
4. **Orphans** — unused endpoints / exports / hooks (defined but no caller), dead types / models / Pydantic schemas, commented-out code, TODO stubs that predate the current phase, registry entries (strategies, routes, providers) nothing reads, legacy naming from pre-refactor eras, test fixtures nothing uses.
5. **Doc drift** — `README.md` claims vs. actual decorators / exports, in-tree `SKILL.md` file trees vs. reality, docstrings that describe behavior the code no longer has, config-file comments vs. how the code actually uses each field, roadmap / `.flaitron/PLAN.md` claims about completed work that doesn't match code.

## Severity guide (→ dispatcher §3)

- **Critical** — security hole, broken build / test suite, sacred-invariant bypass, data corruption, deterministic-test violation. _(forker: name your project's sacred invariants here — e.g. paper-mode bypass risk, secret leak, schema-corruption risk, auth-bypass.)_
- **High** — missing validation, lifecycle bug (connection leak, async / blocking violation, teardown miss), unhandled external failure, missing-contract violation (endpoint without `response_model`, exported function without a type).
- **Medium** — idiom violation that will compound, doc drift that misleads, magic number that should be config.
- **Low** — nit, minor hygiene, style.

## Specialist additions

- **Hard rules:** none beyond the dispatcher's core set. _(forker: append project-specific hard rules — e.g. "Paper-mode is sacred. Any finding touching paper-mode enforcement is Critical regardless of how 'small' it looks.")_
