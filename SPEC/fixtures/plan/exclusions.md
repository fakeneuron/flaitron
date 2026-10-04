# Fixture — exclusions and diagnostics

Lines that must not become tasks: some are silently excluded (bare checkbox
bullets, HTML comments, fenced code, completed legacy label lines, rows
outside a recognized section), others surface as `unparsed` diagnostics
(malformed IDs, malformed tokens, pending legacy-shaped rows). Also the
near-miss heading diagnostic.

<!--
- [ ] **FX-400** [light] | in a comment — Never parsed, never diagnosed.
-->

## High

- [ ] **FX-401** [light] | real row — Anchors the line-number bookkeeping.
- [ ] Prose checklist item with no emphasis is excluded silently.
- [x] Done prose item, also excluded.
- [ ] *FX-402* single asterisks — Surfaces as unparsed.
- [ ] **fx-403** lowercase id — Surfaces as unparsed.
- [ ] **FX-404** [Heavy] — Uppercase model token fails the grammar.
- [ ] **FX-405** [ heavy ] — Padded model token fails the grammar.
- [ ] **TASK-ID** [light] | grammar placeholder — No digits after the hyphen.
- [ ] **FX-406**— Missing space before the dash fails the grammar.
- [ ] **FX-407** [light] |no space after pipe
- [ ]**FX-408** — Missing space after the checkbox.
<!-- - [ ] **FX-409** [light] | single-line comment — Never parsed. -->
<!--
Multi-line comment.
- [ ] **FX-410** [light] | inside comment
- [ ] *FX-411* would be unparsed outside a comment
-->
- [ ] **FX-412** [light] | after comments — Line number must still be accurate.
- [ ] *FX-413* after comments — Diagnostic line number must still be accurate.

```markdown
## Medium
- [ ] **FX-420** [light] | fenced row — Quoted, not parsed.
- [ ] *FX-421* fenced malformed — Inert, not diagnosed.
```

- [ ] **FX-422** [light] | after backtick fence — Still under High; the fenced heading did not switch sections.

~~~
- [ ] **FX-423** [light] | tilde fence
~~~

- [ ] **FX-424** [light] | after tilde fence

## medium

- [ ] **FX-430** [light] | under a near-miss heading — Dropped; the heading is diagnosed.

## Backlog

- [ ] **FX-440** [light] | unrelated heading — Ignored; no diagnostic.
- [ ] *FX-441* malformed outside a section — Ignored; no diagnostic.

## Low

- [ ] **FX-450** [light] | back in a real section

## Completed

- [x] **P1** — Pre-flaitron record; excluded silently.
- [x] **flowtron v5.2.0 bump** — Bare label with no ID shape; excluded silently.
- [x] **v1 launch**
- [ ] **P2** — Pending legacy-shaped row; surfaces as unparsed.
- [x] **fx-460** — Completed case-typo of a real ID; surfaces as unparsed.
- [x] **P3** [light] — Legacy label carrying a model token; surfaces as unparsed.
- [x] **FX-461** [light] | real closed row — Completed 2026-09-11.
- [x] **FX-462** Completed 2026-09-20. — Checked row with no separator before "Completed"; a real ID shape disqualifies the legacy-label exclusion, so it surfaces as unparsed (CORE-635).
