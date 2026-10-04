---
name: audit-<stack>
description: <stack> audit — thin overlay over flaitron's bundled `ft-audit` (runs its passes by reference, applies the project deltas below). Forked from flaitron's audit-overlay template; see `docs/MIGRATION.md` §1.2.1.
flaitron-reconciled: <version>
flaitron-tracks: ft-audit
---

# audit-<stack> — thin overlay over `ft-audit`

> **Overlay skill.** This file does NOT restate the audit procedure. It points
> at flaitron's bundled scaffold and supplies only what diverges for this
> project. First action on every run: read the referenced scaffold below and
> run **its** procedure, finding format, closing sections, and hard rules —
> substituting the `## Deltas` values for the scaffold's `<placeholder>` slots.

**Referenced scaffold (read first, always):**
`.flaitron/core/claude/skills/ft-audit/SKILL.md` — a flaitron-self checkout
(no `.flaitron/core/` submodule) references the in-tree
`claude/skills/ft-audit/SKILL.md` instead.

**Pass files:** the scaffold loads its per-domain pass definitions from a
`passes/<domain>.md` sibling. This overlay has no `passes/` directory of its
own — resolve those reads **relative to the referenced scaffold's directory**,
i.e. `.flaitron/core/claude/skills/ft-audit/passes/<domain>.md` (or
`claude/skills/ft-audit/passes/<domain>.md` in a flaitron-self checkout).

_(The adopter path is the read-only submodule — the audit scaffold is
forked-not-symlinked, so this submodule path is the stable, clone-independent
reference. A flaitron-self checkout has no submodule, so the in-tree path is
the stable reference there instead.)_

## Domains

`<e.g. all eight; or: backend, security, docs only — the domains this project audits>`

Domain tokens are `general` (default) · `backend` · `frontend` · `security` ·
`performance` · `docs` · `structure` · `context`. Invoked as `/audit-<stack> <domain> [scope]`; a bare
invocation resolves to `general`.

## Deltas

These fill the bundled scaffold's §0-forker-checklist surface. Every fillable
slot lives in the pass files — the §"Scope & rubric hints" / §"The 5 passes" /
§"Severity guide" / §"Specialist additions" placeholders resolve to the values
here; everything else (the dispatcher's §1 resolution steps, pass order, capped
findings, finding format, closing sections, write-to-PLAN step, hard rules) is
inherited verbatim.

Where a value differs per domain, key it by domain (`backend: …`); an unkeyed
value applies to every domain this overlay covers.

- **Scope glob** (default-`all` target): `<e.g. backend: backend/**/*.py · frontend: src/**/*.tsx>`
- **Rubric files** (audit-against contracts): `<e.g. CLAUDE.md, backend/CLAUDE.md, docs/ARCHITECTURE.md>`
- **Verification gates** (run before passes): `<e.g. uv run ruff check . · uv run mypy . · uv run pytest>`
- **Sacred invariants → Critical** (severity guide): `<e.g. RLS bypass, paper-mode bypass, auth-bypass on public routes>`
- **Per-pass examples** (concrete stack anti-patterns to add under each pass): `<e.g. Pydantic v2 idioms, no blocking I/O in async handlers, response_model on every endpoint>`
- **Extra hard rules** (appended project-specific rules): `<e.g. "data integrity > convenience"; or "—" if none>`

---

> **Forker:** replace every `<…>` placeholder above and the `<stack>` tokens in
> the frontmatter + headings, then delete this line. Keep whichever
> referenced-scaffold path (adopter submodule vs. flaitron-self in-tree)
> matches your checkout and delete the other. Keep the file thin — if
> you find yourself editing pass *bodies* (not just the deltas above), you've
> outgrown the overlay; full-copy the scaffold directory per
> `docs/MIGRATION.md` §1.2.1 instead.
>
> Set `flaitron-reconciled:` to the flaitron version tag you installed from
> (e.g. `v5.2.0`). Leave `flaitron-tracks: ft-audit` as-is — it names the
> bundled scaffold this overlay mirrors. These fields enable `/ft-update` to
> warn you when the upstream scaffold changes on a version bump — update
> `flaitron-reconciled:` to the new version after you re-reconcile.
