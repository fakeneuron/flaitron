import { describe, it, expect } from 'vitest';
import {
  activePhaseIndex,
  closureDrift,
  countChecklist,
  extractArchivedDate,
  extractSection,
  extractStarterSubsections,
  parseFrontmatter,
} from './tasknote';
import { parseTasknote } from './tasknote-parse';

describe('parseFrontmatter', () => {
  it('returns null for empty data', () => {
    expect(parseFrontmatter({})).toBeNull();
    expect(parseFrontmatter(null)).toBeNull();
    expect(parseFrontmatter(undefined)).toBeNull();
  });

  it('returns null when required fields are missing', () => {
    expect(
      parseFrontmatter({
        title: 'X',
        status: 'in-progress',
        // created missing
      }),
    ).toBeNull();
  });

  it('parses a complete frontmatter object', () => {
    const fm = parseFrontmatter({
      title: 'Test task',
      status: 'in-progress',
      tags: ['ui', 'parser'],
      created: '2026-05-01',
      due: '2026-05-15',
      'related-tasks': ['FE-001', 'CORE-017'],
    });
    expect(fm).toEqual({
      title: 'Test task',
      status: 'in-progress',
      tags: ['ui', 'parser'],
      created: '2026-05-01',
      due: '2026-05-15',
      relatedTasks: ['FE-001', 'CORE-017'],
    });
  });

  it('handles optional fields gracefully', () => {
    const fm = parseFrontmatter({
      title: 'Test',
      status: 'not-started',
      created: '2026-05-01',
    });
    expect(fm).not.toBeNull();
    expect(fm?.tags).toEqual([]);
    expect(fm?.due).toBeUndefined();
    expect(fm?.relatedTasks).toEqual([]);
    expect(fm?.touches).toBeUndefined();
    expect(fm?.blockedBy).toBeUndefined();
    expect(fm?.parallelSafeWith).toBeUndefined();
    expect(fm?.supersedes).toBeUndefined();
  });

  it('maps omit-when-absent planning keys when present', () => {
    const fm = parseFrontmatter({
      title: 'Test',
      status: 'in-progress',
      created: '2026-08-17',
      touches: ['viz/src/tasknote.ts', 'SPEC.md'],
      'blocked-by': ['CORE-445.2'],
      'parallel-safe-with': ['CORE-445.3'],
      supersedes: ['CORE-157'],
    });
    expect(fm).toMatchObject({
      touches: ['viz/src/tasknote.ts', 'SPEC.md'],
      blockedBy: ['CORE-445.2'],
      parallelSafeWith: ['CORE-445.3'],
      supersedes: ['CORE-157'],
    });
  });

  it('omits empty planning-key arrays (undeclared, not an empty claim)', () => {
    const fm = parseFrontmatter({
      title: 'Test',
      status: 'in-progress',
      created: '2026-08-17',
      touches: [],
      'blocked-by': [],
      'parallel-safe-with': 'CORE-445.3',
      supersedes: [1, 'CORE-157'],
    });
    expect(fm?.touches).toBeUndefined();
    expect(fm?.blockedBy).toBeUndefined();
    expect(fm?.parallelSafeWith).toBeUndefined();
    expect(fm?.supersedes).toEqual(['CORE-157']);
  });

  it('rejects invalid status values', () => {
    expect(
      parseFrontmatter({
        title: 'X',
        status: 'bogus',
        created: '2026-05-01',
      }),
    ).toBeNull();
  });

  it('accepts status: starter', () => {
    const fm = parseFrontmatter({
      title: 'A starter',
      status: 'starter',
      created: '2026-05-03',
    });
    expect(fm).not.toBeNull();
    expect(fm?.status).toBe('starter');
  });

  it('tolerates legacy `model:` field on archived tasknotes (ignored, not rejected)', () => {
    const fm = parseFrontmatter({
      title: 'Old',
      status: 'completed',
      model: 'opus',
      created: '2026-04-30',
    });
    expect(fm).not.toBeNull();
    expect(fm?.title).toBe('Old');
    expect((fm as unknown as { model?: string }).model).toBeUndefined();
  });

  it('tolerates legacy `priority:` and `area:` fields on archived tasknotes (ignored, not rejected)', () => {
    const fm = parseFrontmatter({
      title: 'Old with retired frontmatter fields',
      status: 'completed',
      priority: 'High',
      area: 'core',
      created: '2026-04-30',
    });
    expect(fm).not.toBeNull();
    expect(fm?.title).toBe('Old with retired frontmatter fields');
    expect((fm as unknown as { priority?: string }).priority).toBeUndefined();
    expect((fm as unknown as { area?: string }).area).toBeUndefined();
  });
});

describe('extractSection', () => {
  const body = `# TASK-001 | Title

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

The goal text.

## ✅ Acceptance

- [ ] Criterion A
- [ ] Criterion B

## 🧩 Subtasks

- [ ] Step 1
- [ ] Step 2

## 🔗 Related

- [[FE-001]] — predecessor

---

## 📝 Phase 1: Discovery

Phase content goes here.
`;

  it('extracts the Goal section', () => {
    expect(extractSection(body, 'Goal')).toBe('The goal text.');
  });

  it('extracts a multi-line section with markdown checklist', () => {
    expect(extractSection(body, 'Subtasks')).toBe('- [ ] Step 1\n- [ ] Step 2');
  });

  it('stops at the next H2 (does not bleed into Phase 1)', () => {
    const related = extractSection(body, 'Related');
    expect(related).toBe('- [[FE-001]] — predecessor');
    expect(related).not.toContain('Phase content');
  });

  it('returns empty string for missing sections', () => {
    expect(extractSection(body, 'DoesNotExist')).toBe('');
  });

  it('does not match a heading substring across a word boundary', () => {
    const ambiguousBody = `## 📝 Phase 1: Discovery

Phase 1 content.

## 📝 Phase 10: Extended Discovery

Phase 10 content.

## 🎯 Goal

Singular goal text.

## 🎯 Goals

Plural goals text.
`;
    expect(extractSection(ambiguousBody, 'Phase 1')).toBe('Phase 1 content.');
    expect(extractSection(ambiguousBody, 'Phase 10')).toBe('Phase 10 content.');
    expect(extractSection(ambiguousBody, 'Goal')).toBe('Singular goal text.');
    expect(extractSection(ambiguousBody, 'Goals')).toBe('Plural goals text.');
  });

  it('does not end a section on a heading or rule inside a fenced code block', () => {
    const fencedBody = `## 🎯 Goal

The PLAN.md shape this task targets:

\`\`\`markdown
## High

- [ ] **FE-001** — an example row

---
\`\`\`

Trailing goal prose.

## ✅ Acceptance

- [ ] Real criterion
`;
    const goal = extractSection(fencedBody, 'Goal');
    expect(goal).toContain('## High');
    expect(goal).toContain('---');
    expect(goal).toContain('Trailing goal prose.');
    expect(extractSection(fencedBody, 'High')).toBe('');
    expect(extractSection(fencedBody, 'Acceptance')).toBe('- [ ] Real criterion');
  });

  it('recognises tilde fences and up to 3 spaces of fence indent', () => {
    const body = `## 🎯 Goal

   ~~~
## Not a heading
   ~~~

## ✅ Acceptance

- [ ] Real criterion
`;
    expect(extractSection(body, 'Goal')).toContain('## Not a heading');
    expect(extractSection(body, 'Acceptance')).toBe('- [ ] Real criterion');
  });

  it('closes a fence only on a run at least as long as the opening one', () => {
    const body = `## 🎯 Goal

\`\`\`\`
\`\`\`
## Not a heading
\`\`\`
\`\`\`\`

## ✅ Acceptance

- [ ] Real criterion
`;
    expect(extractSection(body, 'Goal')).toContain('## Not a heading');
    expect(extractSection(body, 'Acceptance')).toBe('- [ ] Real criterion');
  });

  it('runs an unclosed fence to end of input (CommonMark)', () => {
    const body = `## 🎯 Goal

\`\`\`markdown
## ✅ Acceptance

- [ ] Never reached
`;
    expect(extractSection(body, 'Acceptance')).toBe('');
  });
});

describe('extractStarterSubsections', () => {
  const fullStarterBody = `_Captured 2026-05-03 during mid-flow discovery._

### Why this exists

Rationale paragraph.
Spans two lines.

### Solution shape

- Decision one
- Decision two

### Files to touch (preliminary survey — drift-check at promotion)

- \`viz/src/tasknote.ts\` — add starter parsing

### Explicitly out of scope

- thing — why split

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| X | Y | Z |

### Open at promotion (Phase 1 should resolve)

- Question. Lean: answer.

### Related

- [[TASK-001]] — predecessor
`;

  it('extracts the four keep-keys from a complete starter body', () => {
    const subs = extractStarterSubsections(fullStarterBody);
    expect(subs.whyExists).toBe('Rationale paragraph.\nSpans two lines.');
    expect(subs.solutionShape).toBe('- Decision one\n- Decision two');
    expect(subs.filesToTouch).toBe('- `viz/src/tasknote.ts` — add starter parsing');
    expect(subs.outOfScope).toBe('- thing — why split');
  });

  it('returns empty strings (not undefined) for missing sub-headings', () => {
    const partial = `### Why this exists

Just this one.
`;
    const subs = extractStarterSubsections(partial);
    expect(subs.whyExists).toBe('Just this one.');
    expect(subs.solutionShape).toBe('');
    expect(subs.filesToTouch).toBe('');
    expect(subs.outOfScope).toBe('');
  });

  it('returns all empty strings for empty input', () => {
    expect(extractStarterSubsections('')).toEqual({
      whyExists: '',
      solutionShape: '',
      filesToTouch: '',
      outOfScope: '',
    });
  });

  it('does not collect content from Decisions / Open / Related sub-sections', () => {
    const subs = extractStarterSubsections(fullStarterBody);
    const joined = `${subs.whyExists}\n${subs.solutionShape}\n${subs.filesToTouch}\n${subs.outOfScope}`;
    expect(joined).not.toContain('Decisions locked');
    expect(joined).not.toContain('Open at promotion');
    expect(joined).not.toContain('TASK-001');
    expect(joined).not.toContain('| X | Y | Z |');
  });

  it('does not switch sub-section on a heading or rule inside a fenced code block', () => {
    const subs = extractStarterSubsections(`### Why this exists

The starter template looks like:

\`\`\`markdown
### Solution shape

---
\`\`\`

Still the why.

### Explicitly out of scope

Nothing.`);
    expect(subs.whyExists).toContain('### Solution shape');
    expect(subs.whyExists).toContain('Still the why.');
    expect(subs.solutionShape).toBe('');
    expect(subs.outOfScope).toBe('Nothing.');
  });
});

describe('countChecklist', () => {
  it('returns zero counts for empty input', () => {
    expect(countChecklist('')).toEqual({ total: 0, done: 0 });
  });

  it('counts unchecked, lowercase x, and uppercase X items', () => {
    const md = `- [ ] one
- [x] two
- [X] three
- [ ] four`;
    expect(countChecklist(md)).toEqual({ total: 4, done: 2 });
  });

  it('ignores non-checklist lines and indented sub-paragraphs', () => {
    const md = `- [x] item with body

  some note text under it

- [ ] another item
plain prose line`;
    expect(countChecklist(md)).toEqual({ total: 2, done: 1 });
  });

  it('does not count checklist lines inside a fenced code block', () => {
    const md = `- [x] Real done
- [ ] Real open

\`\`\`markdown
  - [ ] **CORE-098.2** [opus] | typography — example child row
  - [ ] **CORE-098.3** [opus] | settings-modal — example child row
\`\`\``;
    expect(countChecklist(md)).toEqual({ total: 2, done: 1 });
  });
});

describe('extractArchivedDate', () => {
  it('reads the Archived stamp', () => {
    expect(extractArchivedDate('**Final Summary:**\n\nDone.\n\n**Archived:** 2026-08-03\n')).toBe(
      '2026-08-03',
    );
  });

  it('returns undefined for an unfilled placeholder stamp', () => {
    expect(extractArchivedDate('**Archived:** YYYY-MM-DD\n')).toBeUndefined();
  });

  it('returns undefined when there is no stamp at all', () => {
    expect(extractArchivedDate('# ACTIVE-1 | still in flight\n')).toBeUndefined();
  });
});

describe('closureDrift', () => {
  const DIRTY = `- [x] one
- [ ] two
- [ ] three`;

  it('counts unticked criteria on a note archived under the rule', () => {
    expect(closureDrift(DIRTY, '2026-08-03')).toEqual({ unticked: 2, total: 3 });
  });

  it('excludes the rule landing day itself (date-only stamps cannot resolve 23:32)', () => {
    expect(closureDrift(DIRTY, '2026-08-01')).toBeNull();
  });

  it('returns null for a note archived before the rule existed', () => {
    expect(closureDrift(DIRTY, '2026-07-31')).toBeNull();
  });

  it('returns null when there is no archive date (active note or unfilled stamp)', () => {
    expect(closureDrift(DIRTY, undefined)).toBeNull();
  });

  it('returns null for a fully ticked Acceptance block', () => {
    expect(closureDrift('- [x] one\n- [X] two', '2026-08-03')).toBeNull();
  });

  it('treats an annotated unticked box as compliant', () => {
    const md = `- [x] one
- [ ] N/A — no frontend surface touched
- [ ] not met — deferred to CORE-420
- [ ] not-met — superseded`;
    expect(closureDrift(md, '2026-08-03')).toBeNull();
  });

  it('counts only the unannotated boxes when a block mixes both', () => {
    const md = `- [x] one
- [ ] N/A — nothing to do here
- [ ] Tag pushed to origin`;
    expect(closureDrift(md, '2026-08-03')).toEqual({ unticked: 1, total: 3 });
  });

  it('does not count fenced example checkboxes as unticked criteria', () => {
    const acceptance = `- [x] Children filed in the shape below

\`\`\`markdown
- [ ] **CORE-098.2** — example row quoted by the criterion above
\`\`\``;
    expect(closureDrift(acceptance, '2026-08-05')).toBeNull();
  });

  it('returns null for an empty Acceptance block', () => {
    expect(closureDrift('', '2026-08-03')).toBeNull();
  });
});

describe('activePhaseIndex', () => {
  it('returns 0 when no phases have been started', () => {
    expect(
      activePhaseIndex([
        { total: 6, done: 0 },
        { total: 4, done: 0 },
        { total: 4, done: 0 },
        { total: 6, done: 0 },
      ]),
    ).toBe(0);
  });

  it('returns the earliest phase with any incomplete box', () => {
    expect(
      activePhaseIndex([
        { total: 6, done: 6 },
        { total: 4, done: 1 },
        { total: 4, done: 0 },
        { total: 6, done: 0 },
      ]),
    ).toBe(1);
  });

  it('treats a zero-total phase as the active phase (e.g. archived/empty)', () => {
    expect(
      activePhaseIndex([
        { total: 6, done: 6 },
        { total: 0, done: 0 },
        { total: 4, done: 0 },
        { total: 6, done: 0 },
      ]),
    ).toBe(1);
  });

  it('returns the last phase when all are fully done', () => {
    expect(
      activePhaseIndex([
        { total: 6, done: 6 },
        { total: 4, done: 4 },
        { total: 4, done: 4 },
        { total: 6, done: 6 },
      ]),
    ).toBe(3);
  });
});

describe('parseTasknote', () => {
  it('parses a tasknote with frontmatter and section extraction', () => {
    const text = `---
title: Demo
status: in-progress
tags: [a, b]
created: 2026-05-01
due:
related-tasks: []
---

# DEMO-1 | Demo

## 🎯 Goal

Demo goal.

## 🧩 Subtasks

- [ ] One
- [ ] Two
`;
    const tn = parseTasknote('DEMO-1', '/abs/path/DEMO-1.md', text);
    expect(tn.id).toBe('DEMO-1');
    expect(tn.path).toBe('/abs/path/DEMO-1.md');
    expect(tn.frontmatter?.title).toBe('Demo');
    expect(tn.frontmatter?.tags).toEqual(['a', 'b']);
    expect(tn.frontmatter?.due).toBeUndefined();
    expect(tn.goal).toBe('Demo goal.');
    expect(tn.subtasks).toBe('- [ ] One\n- [ ] Two');
  });

  it('parses omit-when-absent YAML planning keys from a real frontmatter block', () => {
    const text = `---
title: Demo
status: in-progress
created: 2026-08-17
related-tasks: []
touches:
  - viz/src/tasknote.ts
blocked-by:
  - CORE-445.2
parallel-safe-with:
  - CORE-445.3
supersedes:
  - CORE-157
---

# DEMO-1 | Demo
`;
    const tn = parseTasknote('DEMO-1', '/abs/path/DEMO-1.md', text);
    expect(tn.frontmatter).toMatchObject({
      touches: ['viz/src/tasknote.ts'],
      blockedBy: ['CORE-445.2'],
      parallelSafeWith: ['CORE-445.3'],
      supersedes: ['CORE-157'],
    });
  });

  it('returns null frontmatter for an archived tasknote with no YAML block', () => {
    const text = `# OLD-1 | Old tasknote

## 🎯 Goal

Some legacy content with no frontmatter.
`;
    const tn = parseTasknote('OLD-1', '/abs/path/OLD-1.md', text);
    expect(tn.frontmatter).toBeNull();
    // A missing frontmatter block must not stop section scanning of what follows.
    expect(tn.goal).toBe('Some legacy content with no frontmatter.');
  });

  it('returns null frontmatter for malformed YAML missing required fields', () => {
    const text = `---
title: Missing fields
---

Body
`;
    const tn = parseTasknote('BAD-1', '/abs/path/BAD-1.md', text);
    expect(tn.frontmatter).toBeNull();
  });

  it('extracts per-phase checklist counts and subtasksProgress', () => {
    const text = `# T-1 | Title

## 🧩 Subtasks

- [x] one
- [x] two
- [ ] three

---

## 📝 Phase 1: Discovery

- [x] reviewed PLAN.md
- [x] relevance assessment
- [x] read source files
- [x] drift check
- [x] clarifying questions
- [x] subtasks populated

## 🛠️ Phase 2: Execution

- [ ] pattern survey
- [ ] minimal implementation
- [ ] tests
- [ ] targeted run

## 🧪 Phase 3: Testing & Linting

- [ ] targeted suite
- [ ] lint/type-check
- [ ] visual confirmation
- [ ] fixed introduced issues

## 🚀 Phase 4: Closure

- [ ] verified prior phases
- [ ] updated docs
- [ ] PLAN.md flipped
- [ ] nav header updated
- [ ] moved to archive
- [ ] recap confirmed
`;
    const tn = parseTasknote('T-1', '/abs/path/T-1.md', text);
    expect(tn.subtasksProgress).toEqual({ total: 3, done: 2 });
    expect(tn.phases).toHaveLength(4);
    expect(tn.phases[0]).toEqual({ total: 6, done: 6 }); // Phase 1 fully done
    expect(tn.phases[1]).toEqual({ total: 4, done: 0 }); // Phase 2 not started
    expect(tn.phases[2]).toEqual({ total: 4, done: 0 });
    expect(tn.phases[3]).toEqual({ total: 6, done: 0 });
  });

  it('reads a phase whose notes quote example rows in a fence (`CORE-098.1` shape)', () => {
    const text = `# CORE-098.1 | Discovery

## 🛠️ Phase 2: Execution

- [x] pattern survey
- [x] implemented the minimal solution
- [x] tests — N/A

**Implementation Notes:**

\`\`\`markdown
  - [ ] **CORE-098.2** [opus] | typography — example child row
  - [ ] **CORE-098.3** [opus] | settings-modal — example child row
\`\`\`

## 🧪 Phase 3: Testing & Linting

- [x] targeted suite — N/A
`;
    const tn = parseTasknote('CORE-098.1', '/abs/CORE-098.1.md', text);
    expect(tn.phases[1]).toEqual({ total: 3, done: 3 });
    expect(tn.phases[2]).toEqual({ total: 1, done: 1 });
  });

  it('returns zero phase counts for archived tasknotes with no phase headings', () => {
    const text = `# OLD-1 | Old\n\nNo phases here.\n`;
    const tn = parseTasknote('OLD-1', '/abs/OLD-1.md', text);
    expect(tn.phases).toEqual([
      { total: 0, done: 0 },
      { total: 0, done: 0 },
      { total: 0, done: 0 },
      { total: 0, done: 0 },
    ]);
    expect(tn.subtasksProgress).toEqual({ total: 0, done: 0 });
  });

  it('parses a `--micro` note: spec on top, one Notes log, no phase headings', () => {
    const text = `---
title: Demo micro
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: []
---

# DEMO-4 | Demo micro

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Fix one thing.

## ✅ Acceptance

- [x] The thing is fixed — \`npm test\`
- [x] No regression — \`judgment\`

## 🧩 Subtasks

- [x] Edit the file
- [ ] Re-run the suite

## 🔗 Related

- [[DEMO-1]] — predecessor

---

## ⚡ Notes

**Relevance:** Proceed — one file.
**Pattern survey:** Phase 2 reads the sibling module.
**Verification receipt:** \`npm test\` → 0

**Final Summary:**

Fixed the thing.

**Archived:** 2026-10-10
`;
    const tn = parseTasknote('DEMO-4', '/abs/DEMO-4.md', text);
    expect(tn.frontmatter?.status).toBe('completed');
    expect(tn.goal).toBe('Fix one thing.');
    expect(tn.acceptance).toBe(
      '- [x] The thing is fixed — `npm test`\n- [x] No regression — `judgment`',
    );
    expect(tn.subtasks).toBe('- [x] Edit the file\n- [ ] Re-run the suite');
    expect(tn.subtasksProgress).toEqual({ total: 2, done: 1 });
    // No phase headings: prose naming a phase never opens one, so every phase reads empty.
    expect(tn.phases).toEqual([
      { total: 0, done: 0 },
      { total: 0, done: 0 },
      { total: 0, done: 0 },
      { total: 0, done: 0 },
    ]);
    expect(extractArchivedDate(text)).toBe('2026-10-10');
  });

  it('parses a starter tasknote and populates starterContext', () => {
    const text = `---
title: Demo starter
status: starter
tags: []
created: 2026-05-03
---

# DEMO-2 | Demo starter

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-05-03)

## 🌱 Starter context

_Captured 2026-05-03._

### Why this exists

Rich context that would otherwise bloat PLAN.md.

### Files to touch

- \`viz/src/tasknote.ts\` — add starter status
`;
    const tn = parseTasknote('DEMO-2', '/abs/DEMO-2.md', text);
    expect(tn.frontmatter?.status).toBe('starter');
    expect(tn.goal).toBe('');
    expect(tn.acceptance).toBe('');
    expect(tn.subtasks).toBe('');
    expect(tn.starterContext).toContain('Why this exists');
    expect(tn.starterContext).toContain('Rich context that would otherwise bloat PLAN.md.');
    expect(tn.starterContext).toContain('viz/src/tasknote.ts');
    expect(tn.starterSubsections.whyExists).toBe(
      'Rich context that would otherwise bloat PLAN.md.',
    );
    expect(tn.starterSubsections.filesToTouch).toBe('- `viz/src/tasknote.ts` — add starter status');
    expect(tn.starterSubsections.solutionShape).toBe('');
    expect(tn.starterSubsections.outOfScope).toBe('');
  });

  it('computes closureDrift from the Acceptance block and the Archived stamp', () => {
    const text = `---
title: Demo
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: []
---

# DEMO-3 | Demo

## ✅ Acceptance

- [x] Shipped
- [ ] N/A — no frontend surface
- [ ] Tag pushed to origin

---

## 🚀 Phase 4: Closure

**Archived:** 2026-08-03
`;
    expect(parseTasknote('DEMO-3', '/abs/DEMO-3.md', text).closureDrift).toEqual({
      unticked: 1,
      total: 3,
    });
  });

  it('leaves closureDrift null on an active tasknote with unticked Acceptance', () => {
    const text = `---
title: Demo
status: in-progress
tags: []
created: 2026-08-02
due:
related-tasks: []
---

# DEMO-4 | Demo

## ✅ Acceptance

- [ ] Not done yet
`;
    expect(parseTasknote('DEMO-4', '/abs/DEMO-4.md', text).closureDrift).toBeNull();
  });

  it('never executes a --- js frontmatter block (gray-matter javascript engine disabled)', () => {
    const marker = '__FE071_JS_ENGINE_EVAL_MARKER__' as const;
    delete (globalThis as Record<string, unknown>)[marker];
    const text = `---js
(globalThis.${marker} = true, { title: 'pwned', status: 'in-progress', created: '2026-01-01' })
---

# EVIL-1 | Evil
`;
    expect(() => parseTasknote('EVIL-1', '/abs/EVIL-1.md', text)).toThrow();
    expect((globalThis as Record<string, unknown>)[marker]).toBeUndefined();
  });

  it('rejects !!omap frontmatter (yaml engine uses CORE_SCHEMA, not DEFAULT_SAFE_SCHEMA)', () => {
    const text = `---
title: pwned
status: in-progress
created: 2026-01-01
evil: !!omap
  - a: 1
  - b: 2
---

# EVIL-2 | Evil
`;
    expect(() => parseTasknote('EVIL-2', '/abs/EVIL-2.md', text)).toThrow(/omap|unknown tag|unresolved tag/i);
  });

  it('does not apply YAML merge keys under CORE_SCHEMA (`GHSA-2883`)', () => {
    const text = `---
title: kept
status: in-progress
created: 2026-01-01
<<:
  title: pwned
  tags: [pwned]
---

# EVIL-3 | Evil
`;
    const note = parseTasknote('EVIL-3', '/abs/EVIL-3.md', text);
    expect(note.frontmatter?.title).toBe('kept');
    expect(note.frontmatter?.tags).toEqual([]);
  });

  describe('frontmatter splitting (in-repo replacement for gray-matter)', () => {
    const fm = `title: Demo\nstatus: in-progress\ncreated: 2026-01-01\n`;

    it('treats a file with no leading --- as body only', () => {
      const note = parseTasknote('DEMO-5', '/abs/DEMO-5.md', '# DEMO-5 | Demo\n\n## 🎯 Goal\n\nG\n');
      expect(note.frontmatter).toBeNull();
      expect(note.goal).toBe('G');
    });

    it('splits CRLF-delimited frontmatter', () => {
      const text = `---\r\n${fm.replace(/\n/g, '\r\n')}---\r\n\r\n# DEMO-6 | Demo\r\n\r\n## 🎯 Goal\r\n\r\nG\r\n`;
      const note = parseTasknote('DEMO-6', '/abs/DEMO-6.md', text);
      expect(note.frontmatter?.title).toBe('Demo');
      expect(note.goal).toBe('G');
    });

    it('accepts a closing --- at end of file', () => {
      const note = parseTasknote('DEMO-7', '/abs/DEMO-7.md', `---\n${fm}---`);
      expect(note.frontmatter?.title).toBe('Demo');
      expect(note.goal).toBe('');
    });

    it('yields no frontmatter for an empty --- block', () => {
      const note = parseTasknote('DEMO-8', '/abs/DEMO-8.md', '---\n---\n\n# DEMO-8 | Demo\n');
      expect(note.frontmatter).toBeNull();
    });

    it('throws on an unclosed --- block instead of parsing the body as YAML', () => {
      expect(() => parseTasknote('DEMO-9', '/abs/DEMO-9.md', `---\n${fm}# DEMO-9 | Demo\n`)).toThrow(/unclosed/);
    });

    it('throws on a language-tagged open (---yaml), not just ---js', () => {
      expect(() => parseTasknote('DEMO-10', '/abs/DEMO-10.md', `---yaml\n${fm}---\n`)).toThrow(/bare ---/);
    });

    it('does not mistake a --- inside the body for a second delimiter', () => {
      const text = `---\n${fm}---\n\n# DEMO-11 | Demo\n\n## 🎯 Goal\n\nG\n\n---\n\n## ✅ Acceptance\n\n- [ ] A\n`;
      const note = parseTasknote('DEMO-11', '/abs/DEMO-11.md', text);
      expect(note.goal).toBe('G');
      expect(note.acceptance).toContain('- [ ] A');
    });
  });
});
