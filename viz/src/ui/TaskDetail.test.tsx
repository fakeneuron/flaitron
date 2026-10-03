import { describe, expect, it } from 'vitest';
import { planningMetaRows, vscodeFileHref } from './TaskDetail';
import type { TasknoteFrontmatter } from '../tasknote';

const fm = (overrides: Partial<TasknoteFrontmatter> = {}): TasknoteFrontmatter => ({
  title: 'one',
  status: 'in-progress',
  tags: [],
  created: '2026-08-17',
  relatedTasks: [],
  ...overrides,
});

describe('vscodeFileHref', () => {
  it('builds a vscode://file link for an absolute path', () => {
    expect(vscodeFileHref('/Users/x/.flaitron/tasknote/FE-064.md')).toBe(
      'vscode://file/Users/x/.flaitron/tasknote/FE-064.md',
    );
  });

  it('encodes spaces and special characters', () => {
    expect(vscodeFileHref('/Users/x/my notes/FE 1.md')).toBe(
      'vscode://file/Users/x/my%20notes/FE%201.md',
    );
  });

  it('encodes # and ? so a segment cannot truncate the path as a fragment/query', () => {
    expect(vscodeFileHref('/Users/x/proj#2/what?/FE-1.md')).toBe(
      'vscode://file/Users/x/proj%232/what%3F/FE-1.md',
    );
  });

  it('returns null for a non-absolute path', () => {
    expect(vscodeFileHref('relative/path.md')).toBeNull();
    expect(vscodeFileHref('')).toBeNull();
  });
});

describe('planningMetaRows', () => {
  it('returns nothing when planning keys are omitted', () => {
    expect(planningMetaRows(fm())).toEqual([]);
  });

  it('formats present keys with YAML labels and wikilink IDs', () => {
    expect(
      planningMetaRows(
        fm({
          touches: ['viz/src/tasknote.ts'],
          blockedBy: ['CORE-445.2'],
          parallelSafeWith: ['CORE-445.3'],
          supersedes: ['CORE-157'],
        }),
      ),
    ).toEqual([
      { label: 'touches', markdown: '`viz/src/tasknote.ts`' },
      { label: 'blocked-by', markdown: '[[CORE-445.2]]' },
      { label: 'parallel-safe-with', markdown: '[[CORE-445.3]]' },
      { label: 'supersedes', markdown: '[[CORE-157]]' },
    ]);
  });
});
