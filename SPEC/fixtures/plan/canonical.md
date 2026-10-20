# Fixture — canonical task-line grammar

## Vision

Prose above the first priority heading is never scanned, and a task-shaped
line here is ignored without a diagnostic:

- [ ] **FX-000** [light] — Lives before any priority heading.

## High

- [ ] **FX-001** [heavy] | every segment — Full canonical form with `[model]`, shortname, and long description.
- [ ] **FX-002** [!critical] [heavy] | critical first — `[!critical]` before `[model]`, canonical order.
- [ ] **FX-003** [!critical] | critical alone — No model token.
- [ ] **FX-004** [light] — Model and long description, no shortname.
- [ ] **FX-005** | shortname only — No model token.
- [ ] **FX-006** [light] | no long description
- [ ] **FX-007** [light]
- [ ] **FX-008** — Legacy minimal form.
- [ ] **FX-009**
- [ ] **FX-010** [gpt-5.1] | concrete model — Any short lowercase token is a valid model.
- [ ] **FX-EPIC-011** [heavy] | epic parent — Children nest by ID convention.
  - [ ] **FX-011.1** [heavy] | discovery child — Indented two spaces beneath the parent.
  - [ ] **FX-011.2** [light] | implementation child — Blocked by [[FX-011.1]].
  - [ ] **FX-011.N** [moderate] | audit child

## Medium

- [ ] **FX-020** [moderate] | hyphen dash - A plain hyphen before the long description also parses.
- [ ] **FX-021** [moderate] | trailing period — Sentence ends with a period.

## Low

- [ ] **FX-030** [light] | low row — Filed under Low.

## Future Opportunities

- [ ] **FX-040** | someday — Filed under Future Opportunities.

## Completed

- [x] **FX-050** [light] | closed row — Completed 2026-09-01.
- [x] **FX-051** [heavy] | closed with prose — Re-scoped mid-flight; ships the smaller cut. Completed 2026-09-02.
- [X] **FX-052** — Uppercase X mark. Completed 2026-09-03
- [x] **FX-EPIC-053** [heavy] | closed epic — Completed 2026-09-04.
  - [x] **FX-053.1** [light] | closed child — Completed 2026-09-03.
