# backend — /ft-audit pass library

> Loaded by `SKILL.md` §1 step 1. Supplies the `backend` domain's deltas; the
> dispatcher owns the shared procedure (arg grammar, caps, finding format,
> closing sections, PLAN write step, core hard rules).

**Attribution slug:** `audit-backend`

## Scope & rubric hints (→ dispatcher §1)

- **Default scope (`all`/empty):** `<default backend glob>` _(forker: set this)_
- **Extra scope tokens:** an endpoint/route → its handler + direct collaborators.
- **Rubric slots** (audit-against contracts, not "good API design"):
  - `<rubric file 1>` — _(forker: e.g. `docs/API-CONTRACT.md` / `openapi.yaml` — endpoint contracts)_
  - `<rubric file 2>` — _(forker: e.g. `docs/DB-SCHEMA.md` / `alembic/versions/` — persistence shape)_
  - `<rubric file 3>` — _(forker: e.g. `docs/ERROR-MODEL.md` — error envelope + status codes)_
- **Verification gates:**
  ```sh
  <lint command, e.g. ruff check / golangci-lint run>
  <type-check command, e.g. mypy . / tsc --noEmit>
  <test command, e.g. pytest -x / go test ./...>
  ```
  Failures become Critical findings in pass 2.

## The 5 passes (→ dispatcher §2)

1. **Input & contracts** — request bodies / query params / headers reaching handlers without a typed schema (Pydantic / Marshmallow / Zod / etc.); endpoints without a declared response model (FastAPI `response_model`, Django serializer, etc.); silent type coercion at boundaries (string → int via duck-typing); missing field-level validation where domain rules exist (e.g. "amount > 0", "email must verify"); contract drift between OpenAPI / GraphQL schema and the actual handler signature. _(forker: name your validation framework — e.g. "Pydantic v2 required on all request bodies; v1 idioms are findings")_
2. **Error & lifecycle** — bare `except:` / `catch (e)` swallowing exceptions; broad `except Exception` masking real failures; errors logged then re-raised differently (loses stack); missing connection / file-handle / cursor cleanup (`with` / `defer` / `using` not used); external calls without timeouts; retries without backoff or jitter; missing rollback on commit failure; teardown order bugs in test fixtures. _(forker: pin your error-envelope shape so wrong-shape returns are findings)_
3. **Persistence** — N+1 query loops (iterating a result set then querying per row); missing `select_related` / `prefetch_related` / equivalent eager-load; transactions not wrapping multi-statement writes; missing or wrong index on a hot WHERE column; raw SQL with string concat (cross-list with the `security` domain, pass 2); ORM session leaks across request boundary; migrations not reversible without data loss. _(forker: name your ORM and its known footguns)_
4. **Async correctness** — blocking I/O inside an async handler (sync DB driver, `time.sleep`, `requests.get` instead of `httpx.AsyncClient`); missing `await` on a coroutine (silently returns a coroutine object); event-loop blocking CPU work (should be in an executor / worker queue); race on shared in-memory state with no lock; mixed sync / async in the same code path causing thread-pool exhaustion; `asyncio.gather` swallowing exceptions when one task fails. _(forker: name your async model — single-threaded async, multi-process with worker pool, sync-only, etc.)_
5. **Observability** — log levels misused (errors at INFO, debug noise at WARNING); no structured logging where needed for filtering (free-text strings instead of key=value or JSON); missing request / trace ID propagation across service hops; `print()` left in production code; missing metrics on critical paths (request count, latency, error rate); log-and-throw anti-pattern (log + raise the same error, double-counting in dashboards); secrets / PII in log lines (cross-list with the `security` domain, pass 1).

## Severity guide (→ dispatcher §3)

- **Critical** — data corruption risk (missing transaction on multi-statement write, schema-corrupting migration), sacred-invariant bypass, swallowed exception that hides a real production failure mode, async deadlock or unbounded-wait. _(forker: name your project's sacred invariants here — e.g. paper-mode enforcement, idempotency-key required on payments.)_
- **High** — missing validation on attacker-controlled input, missing teardown / lifecycle bug, unhandled external failure (no timeout / no retry strategy), endpoint with no `response_model` / typed contract.
- **Medium** — N+1 with non-trivial loop, missing index on a moderately-hot column, log-level misuse that will mislead oncall.
- **Low** — nit, hygiene, minor idiom violation.

## Specialist additions

- **Typical area prefixes** (dispatcher §5 step 3): `BE-`, `DB-`, `TEST-`.
- **Hard rules:**
  - **Verify N+1 before reporting.** Don't flag a `for x in xs: x.related` pattern as N+1 if `xs` was loaded with eager-load already. Read the loader.
  - _(forker: append project-specific hard rules — e.g. "Every external API call has a timeout. No exceptions. Findings here are High minimum.")_
