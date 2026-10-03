import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { groupTasks, parsePlanWithDiagnostics, PRIORITIES, type Task } from './parser';

function parsePlan(markdown: string): Task[] {
  return parsePlanWithDiagnostics(markdown).tasks;
}

describe('parsePlan', () => {
  it('parses an open task in High', () => {
    const md = `## High

- [ ] **CORE-001** — Hello world
`;
    expect(parsePlan(md)).toEqual([
      {
        id: 'CORE-001',
        description: 'Hello world',
        priority: 'High',
        critical: false,
        unattended: false,
        handoff: false,
        completed: false,
        completedDate: undefined,
        model: undefined,
        shortname: undefined,
        relatedTasks: [],
        blockedBy: [],
      },
    ]);
  });

  it('parses a completed task and extracts the date', () => {
    const md = `## Completed

- [x] **FE-005** — Did the thing. Completed 2026-04-30. Notes here.
`;
    const tasks = parsePlan(md);
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      id: 'FE-005',
      priority: 'Completed',
      completed: true,
      completedDate: '2026-04-30',
    });
    expect(tasks[0].description).toContain('Did the thing');
    expect(tasks[0].description).toContain('Notes here');
    expect(tasks[0].description).not.toContain('2026-04-30');
  });

  it('parses subtasks under an epic in the same section', () => {
    const md = `## Low

- [ ] **CORE-EPIC-009** — Epic top
  - [ ] **CORE-009.1** — Sub one
  - [ ] **CORE-009.2** — Sub two
`;
    const tasks = parsePlan(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-EPIC-009', 'CORE-009.1', 'CORE-009.2']);
    expect(tasks.every((t) => t.priority === 'Low')).toBe(true);
  });

  // `.N` is a grammar-legal reserved terminal subtask suffix (the
  // epic audit child) — parses like a numeric subtask, no rename required.
  it('parses a `.N` audit subtask and nests it under its epic', () => {
    const md = `## Low

- [ ] **CORE-EPIC-005** — Epic top
  - [ ] **CORE-005.1** — Discovery
  - [ ] **CORE-005.N** — Final audit
`;
    const tasks = parsePlan(md);
    expect(tasks.map((t) => t.id)).toEqual([
      'CORE-EPIC-005',
      'CORE-005.1',
      'CORE-005.N',
    ]);
  });

  it('resolves a `[[TASK-ID.N]]` wikilink into relatedTasks', () => {
    const md = `## Medium\n\n- [ ] **CORE-005.2** — Builds on [[CORE-005.N]] audit findings.\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual(['CORE-005.N']);
    expect(t.blockedBy).toEqual([]);
  });

  // Adopter near-miss IDs — lettered subtask suffix + nested decimals.
  it('parses a lettered subtask id (`FE-310.3a`)', () => {
    const md = `## High\n\n- [ ] **FE-310.3a** [medium] | lettered — adopter subtask suffix.\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({
      id: 'FE-310.3a',
      model: 'medium',
      shortname: 'lettered',
      description: 'adopter subtask suffix',
    });
  });

  it('parses a nested-decimal id (`FE-067.2.1`)', () => {
    const md = `## Medium\n\n- [ ] **FE-067.2.1** [light] | nested — adopter nested decimal.\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({
      id: 'FE-067.2.1',
      model: 'light',
      shortname: 'nested',
      description: 'adopter nested decimal',
    });
  });

  it('extracts lettered and nested-decimal wikilinks into relatedTasks', () => {
    const md = `## High\n\n- [ ] **CORE-001** — See [[FE-310.3a]] and [[FE-067.2.1]].\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual(['FE-310.3a', 'FE-067.2.1']);
  });

  it('skips task-shaped lines outside known section headings', () => {
    const md = `## Vision

- [ ] **CORE-999** — should not appear

## High

- [ ] **CORE-001** — should appear
`;
    expect(parsePlan(md).map((t) => t.id)).toEqual(['CORE-001']);
  });

  it('strips bold markdown from descriptions', () => {
    const md = `## Low

- [ ] **CORE-EPIC-009** — Migrate **fintown** (epic; child tasks)
`;
    expect(parsePlan(md)[0].description).toBe('Migrate fintown (epic; child tasks)');
  });

  it('ignores empty-section placeholder lines', () => {
    const md = `## Critical

(none)

## High

- [ ] **CORE-001** — first
`;
    expect(parsePlan(md).map((t) => t.id)).toEqual(['CORE-001']);
  });

  it('parses [model] segment when present', () => {
    const md = `## High\n\n- [ ] **CORE-001** [opus] — Hello\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBe('opus');
    expect(t.shortname).toBeUndefined();
    expect(t.description).toBe('Hello');
  });

  it('parses | shortname segment when present', () => {
    const md = `## High\n\n- [ ] **CORE-001** | quick name — long description\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBeUndefined();
    expect(t.shortname).toBe('quick name');
    expect(t.description).toBe('long description');
  });

  it('parses [model] + | shortname together', () => {
    const md = `## High\n\n- [ ] **CORE-001** [sonnet] | quick — long\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBe('sonnet');
    expect(t.shortname).toBe('quick');
    expect(t.description).toBe('long');
  });

  it('parses [model] + | shortname with no long description', () => {
    const md = `## High\n\n- [ ] **CORE-001** [opus] | quick name\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBe('opus');
    expect(t.shortname).toBe('quick name');
    expect(t.description).toBe('');
    expect(t.completedDate).toBeUndefined();
  });

  it('parses [model] alone with no shortname or long description', () => {
    const md = `## High\n\n- [ ] **CORE-001** [opus]\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBe('opus');
    expect(t.shortname).toBeUndefined();
    expect(t.description).toBe('');
  });

  it('legacy minimal form leaves model and shortname undefined', () => {
    const md = `## High\n\n- [ ] **CORE-001** — Hello world\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBeUndefined();
    expect(t.shortname).toBeUndefined();
    expect(t.description).toBe('Hello world');
  });

  it('extracts Completed date from long description with new grammar', () => {
    const md = `## Completed\n\n- [x] **FE-005** [opus] | viz rebuild — Did the thing. Completed 2026-04-30.\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({
      id: 'FE-005',
      model: 'opus',
      shortname: 'viz rebuild',
      completed: true,
      completedDate: '2026-04-30',
    });
    expect(t.description).toContain('Did the thing');
    expect(t.description).not.toContain('2026-04-30');
  });

  it('accepts adopter model tokens beyond opus|sonnet', () => {
    // Per SPEC §"Task-line format": adopters MAY substitute project-specific
    // tokens. Regex accepts any short lowercase token `[a-z][\w.-]*`.
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [haiku] — On haiku',
      '- [ ] **CORE-002** [gpt-5] — On gpt-5',
      '- [ ] **CORE-003** [gemini-pro] — On gemini-pro',
    ].join('\n');
    const ts = parsePlan(md);
    expect(ts.map((t) => t.model)).toEqual(['haiku', 'gpt-5', 'gemini-pro']);
  });

  it('silently skips lines with malformed model-token shapes', () => {
    // Tokens must start lowercase and contain only [\w.-]. Malformed shapes
    // (empty, leading uppercase, leading digit) cause the whole TASK_LINE
    // regex to fail; the line is silently dropped. Matches the prior
    // typo-guard behavior of the old `(opus|sonnet)` enum.
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [] — Empty token',
      '- [ ] **CORE-002** [Opus] — Leading uppercase',
      '- [ ] **CORE-003** [3x] — Leading digit',
    ].join('\n');
    expect(parsePlan(md)).toEqual([]);
  });

  // Grammar tolerances for real PLAN.md decorations.
  it('parses a model-suggestion glyph after [model] with no space', () => {
    const md = `## High\n\n- [ ] **FE-066** [medium]🧠 | glyph tol — long desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'FE-066', model: 'medium', shortname: 'glyph tol' });
    expect(t.description).toBe('long desc');
  });

  it('parses a model-suggestion glyph after [model] with a space', () => {
    const md = `## High\n\n- [ ] **FE-065** [light] 🔧 | dedup — cleanup work\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'FE-065', model: 'light', shortname: 'dedup' });
    expect(t.description).toBe('cleanup work');
  });

  it('parses a suggestion glyph directly before the long description (no shortname)', () => {
    const md = `## Completed\n\n- [x] **FE-064** [medium]🧠 — Completed 2026-07-02.\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'FE-064', model: 'medium', completed: true, completedDate: '2026-07-02' });
    expect(t.shortname).toBeUndefined();
  });

  it('parses stacked [model] tokens, capturing the first and dropping the rest', () => {
    const md = `## High\n\n- [ ] **CORE-001** [fable] [light] | stacked — desc\n`;
    const t = parsePlan(md)[0];
    expect(t.model).toBe('fable');
    expect(t.shortname).toBe('stacked');
    expect(t.description).toBe('desc');
  });

  // `[unattended]` is canonical grammar, not a dropped tolerance.
  it('captures [unattended] after [model] into Task.unattended', () => {
    const md = `## High\n\n- [ ] **CORE-494** [medium] [unattended] | marker — desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-494', model: 'medium', unattended: true });
    expect(t.shortname).toBe('marker');
    expect(t.description).toBe('desc');
  });

  it('captures [unattended] alongside stacked [model] tokens and a suggestion glyph', () => {
    const md = `## High\n\n- [ ] **CORE-494** [!critical] [fable] [light] [unattended]🔧 | mixed — desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ critical: true, model: 'fable', unattended: true });
    expect(t.shortname).toBe('mixed');
  });

  // The suggestion glyph is accepted on either side of the trailing-token
  // run. The shape below is the likelier one — a board renders the glyph onto
  // the model token and the marker is appended last — so a glyph slot only
  // after the run would fail TASK_LINE and drop the whole row.
  it('captures [unattended] written after a glyph-decorated [model]', () => {
    const md = `## High\n\n- [ ] **CORE-502** [xheavy]🔭 [unattended] | glyph first — desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-502', model: 'xheavy', unattended: true });
    expect(t.shortname).toBe('glyph first');
    expect(t.description).toBe('desc');
  });

  it('captures [unattended] after a space-separated glyph', () => {
    const md = `## High\n\n- [ ] **CORE-502** [medium] 🧩 [unattended] | spaced glyph — desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-502', model: 'medium', unattended: true });
    expect(t.shortname).toBe('spaced glyph');
  });

  it('does not flag a glyph-before-marker row as an unparsed diagnostic', () => {
    const md = `## High\n\n- [ ] **CORE-502** [xheavy]🔭 [unattended] | glyph first — desc\n`;
    expect(parsePlanWithDiagnostics(md).unparsed).toEqual([]);
  });

  it('leaves unattended false on rows without the marker', () => {
    const md = `## High\n\n- [ ] **CORE-001** [fable] [light] | stacked — desc\n`;
    expect(parsePlan(md)[0].unattended).toBe(false);
  });

  // Footgun 1 (SPEC §"Task-line format"): the `!` prefix belongs to
  // `[!critical]` alone, so `[!unattended]` matches no slot and the WHOLE line
  // fails the grammar. Pinned so a future grammar change has to move the docs
  // with it — flaitron surfaces the row as a diagnostic, but adopter readers
  // with no diagnostics channel drop it silently.
  it('drops the whole line for [!unattended] and surfaces it as an unparsed diagnostic', () => {
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [medium] [unattended] | control — parses',
      '- [ ] **CORE-002** [medium] [!unattended] | footgun — does not',
    ].join('\n');
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001']);
    expect(unparsed).toHaveLength(1);
    expect(unparsed[0]).toMatchObject({ line: 4 });
  });

  // Footgun 2: the model slot takes the FIRST bracket token it sees, so a
  // marker written before `[model]` (or with none) silently becomes the model.
  it('captures a pre-[model] or model-less [unattended] as the model, not the marker', () => {
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [unattended] [heavy] | before — desc',
      '- [ ] **CORE-002** [unattended] | alone — desc',
    ].join('\n');
    const tasks = parsePlan(md);
    expect(tasks[0]).toMatchObject({ model: 'unattended', unattended: false });
    expect(tasks[1]).toMatchObject({ model: 'unattended', unattended: false });
  });

  // `[handoff]` is the second canonical member of the trailing
  // run — the operator's declaration that the row stops for a human act. Same
  // capture shape as `[unattended]`, same two footguns.
  it('captures [handoff] after [model] into Task.handoff', () => {
    const md = `## High\n\n- [ ] **CORE-598** [medium] [handoff] | marker — desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-598', model: 'medium', handoff: true, unattended: false });
    expect(t.shortname).toBe('marker');
  });

  it('captures [handoff] and [unattended] together in either order', () => {
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [light] [unattended] [handoff] | both — desc',
      '- [ ] **CORE-002** [light]🔧 [handoff] [unattended] | swapped — desc',
    ].join('\n');
    const tasks = parsePlan(md);
    expect(tasks[0]).toMatchObject({ model: 'light', unattended: true, handoff: true });
    expect(tasks[1]).toMatchObject({ model: 'light', unattended: true, handoff: true });
  });

  it('leaves handoff false on rows without the marker', () => {
    const md = `## High\n\n- [ ] **CORE-001** [fable] [light] [unattended] | stacked — desc\n`;
    expect(parsePlan(md)[0].handoff).toBe(false);
  });

  it('drops the whole line for [!handoff] and surfaces it as an unparsed diagnostic', () => {
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [medium] [handoff] | control — parses',
      '- [ ] **CORE-002** [medium] [!handoff] | footgun — does not',
    ].join('\n');
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001']);
    expect(unparsed).toHaveLength(1);
    expect(unparsed[0]).toMatchObject({ line: 4 });
  });

  it('captures a pre-[model] or model-less [handoff] as the model, not the marker', () => {
    const md = [
      '## High',
      '',
      '- [ ] **CORE-001** [handoff] [heavy] | before — desc',
      '- [ ] **CORE-002** [handoff] | alone — desc',
    ].join('\n');
    const tasks = parsePlan(md);
    expect(tasks[0]).toMatchObject({ model: 'handoff', handoff: false });
    expect(tasks[1]).toMatchObject({ model: 'handoff', handoff: false });
  });

  it('parses a leading status glyph between the checkbox and the bold ID', () => {
    const md = `## High\n\n- [ ] ⏸ **CORE-042** [heavy] | parked — blocked work\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-042', model: 'heavy', shortname: 'parked' });
    expect(t.description).toBe('blocked work');
  });

  it('composes all three tolerances with [!critical], shortname, long desc, and a wikilink', () => {
    const md = `## High\n\n- [ ] ⏸ **CORE-042** [!critical] [fable] [light]🧠 | hotfix — Builds on [[FE-001]].\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({
      id: 'CORE-042',
      critical: true,
      model: 'fable',
      shortname: 'hotfix',
    });
    expect(t.relatedTasks).toEqual(['FE-001']);
  });

  it('parses a [medium] suggestion glyph (🧩)', () => {
    const md = `## High\n\n- [ ] **CORE-353** [medium]🧩 | medium glyph — long desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-353', model: 'medium', shortname: 'medium glyph' });
    expect(t.description).toBe('long desc');
  });

  it('parses an [xheavy] suggestion glyph (🔭)', () => {
    const md = `## High\n\n- [ ] **CORE-482** [xheavy]🔭 | xheavy glyph — long desc\n`;
    const t = parsePlan(md)[0];
    expect(t).toMatchObject({ id: 'CORE-482', model: 'xheavy', shortname: 'xheavy glyph' });
    expect(t.description).toBe('long desc');
  });

  it('does not flag glyph-decorated rows as unparsed diagnostics', () => {
    const md = [
      '## High',
      '',
      '- [ ] **FE-066** [medium]🧠 | glyph — real row',
      '- [ ] ⏸ **CORE-042** [fable] [light]🔧 | parked — stacked + leading glyph',
    ].join('\n');
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['FE-066', 'CORE-042']);
    expect(unparsed).toEqual([]);
  });

  it('extracts a single [[TASK-ID]] wikilink into relatedTasks', () => {
    const md = `## Medium\n\n- [ ] **FE-003** | wikilink resolution — Builds on [[FE-001]] in viz/.\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual(['FE-001']);
    expect(t.blockedBy).toEqual([]);
  });

  it('extracts multiple wikilinks into relatedTasks (deduped, in source order)', () => {
    const md = `## Medium\n\n- [ ] **FE-002** [opus] | cross-project viz — Extends [[FE-001]]; pairs with [[FE-004]] (and [[FE-001]] again).\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual(['FE-001', 'FE-004']);
    expect(t.blockedBy).toEqual([]);
  });

  it('extracts Blocked by [[ID]] into blockedBy', () => {
    const md = `## Medium\n\n- [ ] **CORE-016** [opus] — Execute migration. Blocked by [[CORE-008]] — do not start until backlog is cleared.\n`;
    const t = parsePlan(md)[0];
    expect(t.blockedBy).toEqual(['CORE-008']);
    // Wikilink inside a Blocked-by block must NOT also land in relatedTasks.
    expect(t.relatedTasks).toEqual([]);
  });

  it('extracts Blocked by with multiple comma-separated wikilinks', () => {
    const md = `## Medium\n\n- [ ] **CORE-016** — Run migration. Blocked by [[CORE-008]], [[CORE-007]] — wait for upstream.\n`;
    const t = parsePlan(md)[0];
    expect(t.blockedBy).toEqual(['CORE-008', 'CORE-007']);
    expect(t.relatedTasks).toEqual([]);
  });

  it('keeps related and blocked separate within the same description', () => {
    const md = `## Medium\n\n- [ ] **FE-007** — Builds on [[FE-001]] and [[FE-004]]. Blocked by [[CORE-008]] — wait for migration playbook.\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual(['FE-001', 'FE-004']);
    expect(t.blockedBy).toEqual(['CORE-008']);
  });

  it('puts a wikilink ID in blockedBy only when it appears in BOTH contexts (blocker wins)', () => {
    const md = `## Medium\n\n- [ ] **FE-009** — Extends [[CORE-008]] in spirit. Blocked by [[CORE-008]] until backlog clears.\n`;
    const t = parsePlan(md)[0];
    expect(t.blockedBy).toEqual(['CORE-008']);
    expect(t.relatedTasks).toEqual([]);
  });

  it('does NOT match bare-ID `Blocked by: CORE-008` (wikilink-only contract)', () => {
    const md = `## Medium\n\n- [ ] **CORE-016** — Run migration. Blocked by: CORE-008 — bare ID without wikilinks must not parse.\n`;
    const t = parsePlan(md)[0];
    expect(t.blockedBy).toEqual([]);
    expect(t.relatedTasks).toEqual([]);
  });

  it('returns empty arrays when the description has neither wikilinks nor blockers', () => {
    const md = `## High\n\n- [ ] **CORE-001** [opus] — Plain prose with no cross-references.\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual([]);
    expect(t.blockedBy).toEqual([]);
  });

  it('handles legacy minimal task lines with no description (no wikilinks possible)', () => {
    const md = `## High\n\n- [ ] **CORE-001** [opus] | quick name\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual([]);
    expect(t.blockedBy).toEqual([]);
  });

  it('ignores wikilinks and Blocked-by clauses inside backtick code spans', () => {
    const md = `## High\n\n- [ ] **FE-003** [opus] — Builds on [[FE-001]]; example placeholder \`[[FE-042]]\` and \`Blocked by [[CORE-999]]\` are literal code.\n`;
    const t = parsePlan(md)[0];
    expect(t.relatedTasks).toEqual(['FE-001']);
    expect(t.blockedBy).toEqual([]);
  });

  // Per-task [!critical] flag; there is no `Critical` Priority.
  it('defaults critical to false on a plain task line', () => {
    const md = `## High\n\n- [ ] **CORE-001** [opus] — Plain row.\n`;
    expect(parsePlan(md)[0].critical).toBe(false);
  });

  it('parses [!critical] alone', () => {
    const md = `## High\n\n- [ ] **FE-100** [!critical] — Urgent row.\n`;
    const t = parsePlan(md)[0];
    expect(t.critical).toBe(true);
    expect(t.model).toBeUndefined();
    expect(t.description).toBe('Urgent row');
  });

  it('parses [!critical] + [model] + | shortname + long description in canonical order', () => {
    const md = `## High\n\n- [ ] **FE-100** [!critical] [opus] | hotfix — Production breakage.\n`;
    const t = parsePlan(md)[0];
    expect(t.critical).toBe(true);
    expect(t.model).toBe('opus');
    expect(t.shortname).toBe('hotfix');
    expect(t.description).toBe('Production breakage');
  });

  // Swapped flag order is a viz tolerance, not canonical authoring.
  it('parses [!critical] after [model] and still sets critical', () => {
    const md = `## High\n\n- [ ] **FE-100** [opus] [!critical] | hotfix — Production breakage.\n`;
    const t = parsePlan(md)[0];
    expect(t.critical).toBe(true);
    expect(t.model).toBe('opus');
    expect(t.shortname).toBe('hotfix');
    expect(t.description).toBe('Production breakage');
  });

  it('parses [!critical] after stacked [model] tokens', () => {
    const md = `## High\n\n- [ ] **FE-100** [fable] [light] [!critical] — Urgent stacked.\n`;
    const t = parsePlan(md)[0];
    expect(t.critical).toBe(true);
    expect(t.model).toBe('fable');
    expect(t.description).toBe('Urgent stacked');
  });

  it('parses [!critical] after a model-suggestion glyph', () => {
    const md = `## High\n\n- [ ] **FE-100** [medium]🧩 [!critical] | hotfix — After glyph.\n`;
    const t = parsePlan(md)[0];
    expect(t.critical).toBe(true);
    expect(t.model).toBe('medium');
    expect(t.shortname).toBe('hotfix');
  });

  it('soft-migrates a legacy `## Critical` heading to priority=High with critical=true on every row', () => {
    const md = `## Critical\n\n- [ ] **CORE-99** [opus] | hotfix — Production breakage.\n\n## High\n\n- [ ] **CORE-100** [opus] | normal — Routine work.\n`;
    const tasks = parsePlan(md);
    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toMatchObject({ id: 'CORE-99', priority: 'High', critical: true });
    expect(tasks[1]).toMatchObject({ id: 'CORE-100', priority: 'High', critical: false });
  });
});

// `.flaitron/PLAN-ARCHIVE.md` groups rotated rows under
// `## Completed <YYYY-MM>` headings. If the heading matched nothing, every row
// below it would be skipped and rotated history would vanish from the board.
describe('rotated `## Completed <YYYY-MM>` history', () => {
  it('parses rows under a month heading as Completed', () => {
    const md = `## Completed 2026-07

- [x] **CORE-400** [light] | old-work — Completed 2026-07-14.
`;
    expect(parsePlan(md)).toEqual([
      {
        id: 'CORE-400',
        // Stub rows carry only the Completed token, which cleanDescription strips.
        description: '',
        priority: 'Completed',
        critical: false,
        unattended: false,
        handoff: false,
        completed: true,
        completedDate: '2026-07-14',
        model: 'light',
        shortname: 'old-work',
        relatedTasks: [],
        blockedBy: [],
      },
    ]);
  });

  it('keeps nested epic children under a month heading', () => {
    const md = `## Completed 2026-06

- [x] **CORE-EPIC-300** | epic — Completed 2026-06-02.
  - [x] **CORE-300.1** [light] | discovery — Completed 2026-06-01.
`;
    expect(parsePlan(md).map((t) => [t.id, t.priority])).toEqual([
      ['CORE-EPIC-300', 'Completed'],
      ['CORE-300.1', 'Completed'],
    ]);
  });

  it('does not treat a month heading as a near-miss priority typo', () => {
    const { nearMissHeadings } = parsePlanWithDiagnostics('## Completed 2026-07\n');
    expect(nearMissHeadings).toEqual([]);
  });

  it('leaves a malformed month heading unrecognized', () => {
    // Only `YYYY-MM` — a day-precision or free-text suffix is not the contract.
    const md = `## Completed 2026-07-14

- [x] **CORE-401** — Completed 2026-07-14.
`;
    expect(parsePlan(md)).toEqual([]);
  });

  it('appends archive tasks after PLAN.md tasks', () => {
    const plan = `## High

- [ ] **CORE-500** — open work

## Completed

- [x] **CORE-499** — Completed 2026-08-01.
`;
    const archive = `# PLAN Archive

## Completed 2026-07

- [x] **CORE-400** — Completed 2026-07-14.

## Completed 2026-06

- [x] **CORE-300** — Completed 2026-06-02.
`;
    const { tasks } = parsePlanWithDiagnostics(plan, archive);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-500', 'CORE-499', 'CORE-400', 'CORE-300']);
  });

  it('treats an absent archive as empty rather than an error', () => {
    const plan = '## High\n\n- [ ] **CORE-500** — open work\n';
    expect(parsePlanWithDiagnostics(plan, '')).toEqual(parsePlanWithDiagnostics(plan));
    expect(parsePlanWithDiagnostics(plan, undefined)).toEqual(parsePlanWithDiagnostics(plan));
  });

  it('scopes diagnostics to PLAN.md — archive line numbers never leak into them', () => {
    const plan = `## High

- [ ] *FE-064* [medium] | bad-bold — single-asterisk ID fails
`;
    const archive = `## Completed 2026-07

- [x] **CORE-400** — Completed 2026-07-14.
- [x] *CORE-401* — malformed archive row
- [ ] under a lowercase heading below

## completed 2026-06
`;
    const { tasks, unparsed, nearMissHeadings } = parsePlanWithDiagnostics(plan, archive);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-400']);
    expect(unparsed).toEqual([
      { line: 3, text: '- [ ] *FE-064* [medium] | bad-bold — single-asterisk ID fails' },
    ]);
    expect(nearMissHeadings).toEqual([]);
  });

  it('groups an epic parent in PLAN.md with a child rotated into the archive', () => {
    const plan = '## Medium\n\n- [ ] **CORE-EPIC-300** | epic — still open\n';
    const archive = '## Completed 2026-07\n\n- [x] **CORE-300.1** — Completed 2026-07-14.\n';
    const { tasks } = parsePlanWithDiagnostics(plan, archive);
    const { nodes } = groupTasks(tasks);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].children.map((c) => c.id)).toEqual(['CORE-300.1']);
  });
});

describe('parsePlanWithDiagnostics', () => {
  it('collects checkbox-bullet lines that fail TASK_LINE with 1-based line numbers', () => {
    const md = `## High

- [ ] **CORE-001** — parses fine
- [ ] *FE-064* [medium] | bad-bold — single-asterisk ID fails
- [x] **fe-065** — lowercase ID fails
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001']);
    expect(unparsed).toEqual([
      { line: 4, text: '- [ ] *FE-064* [medium] | bad-bold — single-asterisk ID fails' },
      { line: 5, text: '- [x] **fe-065** — lowercase ID fails' },
    ]);
  });

  // A `.N` audit line is a valid ID shape — never an unparsed diagnostic.
  it('does not flag a `.N` audit subtask as an unparsed diagnostic', () => {
    const md = `## Low

- [ ] **CORE-EPIC-005** — Epic top
  - [ ] **CORE-005.N** [light] | audit — Final-subtask audit.
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-EPIC-005', 'CORE-005.N']);
    expect(unparsed).toEqual([]);
  });

  it('does not collect valid task lines or non-checkbox prose bullets', () => {
    const md = `## Medium

- [ ] **CORE-002** [light] | fine — valid line
- plain prose bullet, not a checkbox
(none)
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toHaveLength(1);
    expect(unparsed).toEqual([]);
  });

  // A checkbox with no ID emphasis is a prose checklist, not a failed task.
  it('does not flag a bare checkbox bullet as unparsed', () => {
    const md = `## High

- [ ] **CORE-001** — real task
- [ ] follow up with the adopter
- [x]
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001']);
    expect(unparsed).toEqual([]);
  });

  it('does not flag lettered or nested-decimal ids as unparsed', () => {
    const md = `## High

- [ ] **FE-310.3a** [medium] | lettered — adopter subtask
- [ ] **FE-067.2.1** [light] | nested — adopter nested decimal
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['FE-310.3a', 'FE-067.2.1']);
    expect(unparsed).toEqual([]);
  });

  it('still flags a letter-only decimal segment as unparsed (not \\d+[a-z]?)', () => {
    const md = `## High

- [ ] **FE-310.a** — letter without leading digits
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(unparsed).toEqual([
      { line: 3, text: '- [ ] **FE-310.a** — letter without leading digits' },
    ]);
  });

  // Checkbox lines inside an HTML comment (e.g. the trailing
  // grammar-reference block) are non-rendered content — never tasks, never
  // diagnostics — regardless of which section the comment sits in.
  it('ignores checkbox lines inside a trailing HTML comment', () => {
    const md = `## High

- [ ] **CORE-001** [light] | real — a real task

## Completed

- [x] **CORE-000** — Completed 2026-07-01.

<!--
Task-line grammar:

  - [ ] **TASK-ID** [model] | shortname — long description

All segments optional.
-->
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001', 'CORE-000']);
    expect(unparsed).toEqual([]);
  });

  it('preserves accurate line numbers for a malformed line after a multi-line comment', () => {
    const md = [
      '## High', // 1
      '', // 2
      '<!--', // 3
      '  - [ ] **TASK-ID** | example — ignore me', // 4
      '-->', // 5
      '', // 6
      '- [ ] *CORE-002* — malformed real line', // 7
    ].join('\n');
    const { unparsed } = parsePlanWithDiagnostics(md);
    expect(unparsed).toEqual([
      { line: 7, text: '- [ ] *CORE-002* — malformed real line' },
    ]);
  });

  it('ignores malformed checkbox lines outside recognized section headings', () => {
    const md = `## Vision

- [ ] *CORE-999* — malformed but outside a known section

## High

- [ ] *CORE-998* — malformed inside a known section
`;
    const { unparsed } = parsePlanWithDiagnostics(md);
    expect(unparsed).toEqual([
      { line: 7, text: '- [ ] *CORE-998* — malformed inside a known section' },
    ]);
  });

  it('parsePlanWithDiagnostics tasks omit malformed lines', () => {
    const md = `## High

- [ ] **CORE-001** — fine
- [ ] *CORE-002* — malformed
`;
    expect(parsePlanWithDiagnostics(md).tasks.map((t) => t.id)).toEqual(['CORE-001']);
  });

  // Pre-flaitron legacy records (bold label with no <AREA>-NNN shape)
  // are excluded from both tasks and unparsed diagnostics — but only when
  // completed, to avoid masking a hand-authoring typo of a real ID.
  it('silently excludes completed legacy-label lines from both tasks and unparsed', () => {
    const md = `## Completed

- [x] **flowtron v5.2.0 bump** — Completed 2026-06-03 (\`d2c9766\`). Submodule pin reconciled.
- [x] **P1** — CLI core. Pre-flaitron historical task — no flaitron tasknote.
- [x] **P3-1** — OCR robustness fixes. Pre-flaitron tasknote: archive/P3-1.md.
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(unparsed).toEqual([]);
  });

  it('still flags a pending (unchecked) legacy-shaped line as unparsed', () => {
    const md = `## Low

- [ ] **P9** — future legacy-style line, not yet done
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(unparsed).toEqual([
      { line: 3, text: '- [ ] **P9** — future legacy-style line, not yet done' },
    ]);
  });

  it('still flags a completed case-typo of a real ID as unparsed (not treated as legacy)', () => {
    const md = `## Completed

- [x] **fe-065** — lowercase ID is a typo, not a legacy record
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(unparsed).toEqual([
      { line: 3, text: '- [x] **fe-065** — lowercase ID is a typo, not a legacy record' },
    ]);
  });

  it('still flags a completed legacy-shaped line carrying a [model] segment as unparsed', () => {
    const md = `## Completed

- [x] **P1** [medium] — a model segment means this isn't the bare legacy shape
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(unparsed).toEqual([
      { line: 3, text: '- [x] **P1** [medium] — a model segment means this isn\'t the bare legacy shape' },
    ]);
  });

  // A task row quoted inside a fenced code block (e.g. a grammar
  // reference example) is content the note is showing, not a real entry.
  it('does not parse a task row quoted inside a fenced code block', () => {
    const md = `## High

\`\`\`markdown
- [ ] **FE-001** — an example row, not a real task
\`\`\`

- [ ] **CORE-001** — a real task
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001']);
    expect(unparsed).toEqual([]);
  });

  it('does not switch section on a heading inside a fenced code block', () => {
    const md = `## Low

\`\`\`
## High
- [ ] **FE-002** — fenced example under a fenced High heading
\`\`\`

- [ ] **CORE-002** — real task, still under Low
`;
    const { tasks } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([
      expect.objectContaining({ id: 'CORE-002', priority: 'Low' }),
    ]);
  });

  it('flags a malformed line inside a fence as inert rather than unparsed', () => {
    const md = `## High

\`\`\`markdown
- [ ] *FE-064* [medium] | bad-bold — malformed, but only an example
\`\`\`
`;
    const { tasks, unparsed } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(unparsed).toEqual([]);
  });

  it('resumes normal parsing after a closed fence', () => {
    const md = `## Medium

\`\`\`
- [ ] **FE-003** — fenced, ignored
\`\`\`

- [ ] **CORE-003** — real task after the fence closes
`;
    const { tasks } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-003']);
  });

  // A heading that case-insensitively matches a Priority name is a
  // likely typo — flag it instead of silently dropping every task under it.
  it('flags a near-miss heading (case difference) and still drops its tasks', () => {
    const md = `## medium

- [ ] **CORE-001** — should not appear
`;
    const { tasks, nearMissHeadings } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual([]);
    expect(nearMissHeadings).toEqual([
      { line: 1, heading: 'medium', matched: 'Medium' },
    ]);
  });

  it('does not flag an exact-match heading as a near miss', () => {
    const md = `## Medium

- [ ] **CORE-001** — appears normally
`;
    const { tasks, nearMissHeadings } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.id)).toEqual(['CORE-001']);
    expect(nearMissHeadings).toEqual([]);
  });

  it('does not flag an unrelated heading as a near miss', () => {
    const md = `## Vision

- [ ] **CORE-999** — should not appear
`;
    const { nearMissHeadings } = parsePlanWithDiagnostics(md);
    expect(nearMissHeadings).toEqual([]);
  });

  it('collects multiple near-miss headings with 1-based line numbers', () => {
    const md = `## medium

- [ ] **CORE-001** — dropped

## LOW

- [ ] **CORE-002** — also dropped
`;
    const { nearMissHeadings } = parsePlanWithDiagnostics(md);
    expect(nearMissHeadings).toEqual([
      { line: 1, heading: 'medium', matched: 'Medium' },
      { line: 5, heading: 'LOW', matched: 'Low' },
    ]);
  });
});

describe('groupTasks', () => {
  const t = (id: string, completed = false, priority: Task['priority'] = 'Low'): Task => ({
    id,
    description: id,
    priority,
    critical: false,
    unattended: false,
    handoff: false,
    completed,
    relatedTasks: [],
    blockedBy: [],
  });

  it('returns standalone tasks as flat top-level nodes', () => {
    const { nodes } = groupTasks([t('FE-001'), t('CORE-002')]);
    expect(nodes).toHaveLength(2);
    expect(nodes.every((n) => n.children.length === 0)).toBe(true);
    expect(nodes.map((n) => n.task.id)).toEqual(['FE-001', 'CORE-002']);
  });

  it('attaches subtasks to their epic parent by ID convention', () => {
    const { nodes } = groupTasks([
      t('CORE-EPIC-009'),
      t('CORE-009.1', true),
      t('CORE-009.2'),
      t('CORE-009.3'),
    ]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].task.id).toBe('CORE-EPIC-009');
    expect(nodes[0].children.map((c) => c.id)).toEqual([
      'CORE-009.1',
      'CORE-009.2',
      'CORE-009.3',
    ]);
  });

  it('preserves original order across mixed standalone + epic + standalone', () => {
    const { nodes } = groupTasks([
      t('FE-001'),
      t('CORE-EPIC-009'),
      t('CORE-009.1'),
      t('FE-002'),
    ]);
    expect(nodes.map((n) => n.task.id)).toEqual([
      'FE-001',
      'CORE-EPIC-009',
      'FE-002',
    ]);
    expect(nodes[1].children.map((c) => c.id)).toEqual(['CORE-009.1']);
  });

  it('attaches a subtask to its epic even when listed above the epic', () => {
    const { nodes } = groupTasks([
      t('CORE-009.1'),
      t('CORE-EPIC-009'),
      t('CORE-009.2'),
    ]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].task.id).toBe('CORE-EPIC-009');
    expect(nodes[0].children.map((c) => c.id)).toEqual([
      'CORE-009.1',
      'CORE-009.2',
    ]);
  });

  // A `.N` audit child groups under its epic like any numeric child.
  it('attaches a `.N` audit subtask to its epic parent', () => {
    const { nodes } = groupTasks([
      t('CORE-EPIC-005'),
      t('CORE-005.1'),
      t('CORE-005.N'),
    ]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].task.id).toBe('CORE-EPIC-005');
    expect(nodes[0].children.map((c) => c.id)).toEqual(['CORE-005.1', 'CORE-005.N']);
  });

  // Lettered + nested-decimal children still group under the epic.
  it('attaches lettered and nested-decimal subtasks to their epic parent', () => {
    const { nodes } = groupTasks([
      t('FE-EPIC-310'),
      t('FE-310.3a'),
      t('FE-310.2.1'),
    ]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].task.id).toBe('FE-EPIC-310');
    expect(nodes[0].children.map((c) => c.id)).toEqual(['FE-310.3a', 'FE-310.2.1']);
  });

  it('treats orphan subtasks (no matching epic) as top-level rows', () => {
    const { nodes } = groupTasks([t('CORE-009.1'), t('FE-001')]);
    expect(nodes.map((n) => n.task.id)).toEqual(['CORE-009.1', 'FE-001']);
    expect(nodes.every((n) => n.children.length === 0)).toBe(true);
  });

  it('handles an epic with no children', () => {
    const { nodes } = groupTasks([t('CORE-EPIC-009')]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].task.id).toBe('CORE-EPIC-009');
    expect(nodes[0].children).toEqual([]);
  });

  it('returns no duplicate diagnostics when every epic ID is unique', () => {
    const { duplicateEpics } = groupTasks([t('CORE-EPIC-009'), t('CORE-009.1')]);
    expect(duplicateEpics).toEqual([]);
  });

  // A hand-authoring mistake filing the same epic ID under two
  // headings must not silently overwrite the first occurrence.
  it('keeps the first occurrence when an epic ID appears under two headings', () => {
    const first = t('CORE-EPIC-421', false, 'Medium');
    const second = t('CORE-EPIC-421', false, 'Low');
    const { nodes, duplicateEpics } = groupTasks([first, second]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].task.priority).toBe('Medium');
    expect(duplicateEpics).toEqual([{ id: 'CORE-EPIC-421' }]);
  });

  it('does not push the duplicated epic node into `nodes` twice', () => {
    const { nodes } = groupTasks([t('CORE-EPIC-421'), t('CORE-EPIC-421')]);
    expect(nodes).toHaveLength(1);
  });

  it('still attaches subtasks to the first-occurrence epic node when duplicated', () => {
    const { nodes, duplicateEpics } = groupTasks([
      t('CORE-EPIC-421'),
      t('CORE-421.1'),
      t('CORE-EPIC-421'),
    ]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].children.map((c) => c.id)).toEqual(['CORE-421.1']);
    expect(duplicateEpics).toEqual([{ id: 'CORE-EPIC-421' }]);
  });
});

describe('PRIORITIES registry', () => {
  it('recognizes every member as a section heading', () => {
    for (const [i, priority] of PRIORITIES.entries()) {
      const md = `## ${priority}\n\n- [ ] **CORE-${i}** — task under ${priority}.`;
      const tasks = parsePlan(md);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].priority).toBe(priority);
    }
  });

  it('surfaces no unparsed diagnostics for a PLAN built from every member', () => {
    const md = PRIORITIES.map(
      (priority, i) => `## ${priority}\n\n- [ ] **CORE-${i}** — task under ${priority}.`,
    ).join('\n\n');
    const { tasks, unparsed, nearMissHeadings } = parsePlanWithDiagnostics(md);
    expect(tasks.map((t) => t.priority)).toEqual([...PRIORITIES]);
    expect(unparsed).toEqual([]);
    expect(nearMissHeadings).toEqual([]);
  });
});

// SPEC/fixtures/plan/ is the cross-parser conformance suite: each
// `<case>.md` is a whole PLAN.md sample, its `<case>.json` the expected parse.
// The JSON is the contract and this parser is its reference consumer — a
// failing row here means either the parser regressed or SPEC prose changed
// and the fixture must be hand-edited in the same commit. Shape and the
// partial-consumption rule adopter parsers follow: SPEC/fixtures/plan/README.md.
describe('SPEC/fixtures/plan conformance', () => {
  const FIXTURE_DIR = join(__dirname, '..', '..', 'SPEC', 'fixtures', 'plan');
  const names = readdirSync(FIXTURE_DIR);
  const cases = names.filter((n) => n.endsWith('.md') && n !== 'README.md').map((n) => n.slice(0, -3));

  interface FixtureTask extends Omit<Task, 'model' | 'shortname' | 'completedDate'> {
    line: number;
    model: string | null;
    shortname: string | null;
    descriptionRaw: string | null;
    completedDate: string | null;
  }
  interface Fixture {
    describes: string;
    tasks: FixtureTask[];
    unparsed: { line: number; text: string }[];
    nearMissHeadings: { line: number; heading: string; matched: string }[];
  }

  // The fixture carries `line` and `descriptionRaw` for consumers that model
  // them (an awk row-counter, a Python reader storing the raw segment); this
  // parser exposes neither, so they drop out of the comparison, and JSON
  // `null` maps to the `undefined` this parser leaves on absent optionals.
  function toTask(f: FixtureTask): Task {
    return {
      id: f.id,
      description: f.description,
      priority: f.priority,
      critical: f.critical,
      unattended: f.unattended,
      handoff: f.handoff,
      completed: f.completed,
      completedDate: f.completedDate ?? undefined,
      model: f.model ?? undefined,
      shortname: f.shortname ?? undefined,
      relatedTasks: f.relatedTasks,
      blockedBy: f.blockedBy,
    };
  }

  it('pairs every sample with an expected-parse file, and is non-empty', () => {
    expect(cases.length).toBeGreaterThan(0);
    const jsons = names.filter((n) => n.endsWith('.json')).map((n) => n.slice(0, -5));
    expect([...jsons].sort()).toEqual([...cases].sort());
  });

  it.each(cases)('%s.md parses to its expected JSON', (name) => {
    const md = readFileSync(join(FIXTURE_DIR, `${name}.md`), 'utf8');
    const fixture = JSON.parse(readFileSync(join(FIXTURE_DIR, `${name}.json`), 'utf8')) as Fixture;
    const { tasks, unparsed, nearMissHeadings } = parsePlanWithDiagnostics(md);
    expect(tasks).toEqual(fixture.tasks.map(toTask));
    expect(unparsed).toEqual(fixture.unparsed);
    expect(nearMissHeadings).toEqual(fixture.nearMissHeadings);
  });
});
