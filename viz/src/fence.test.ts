import { describe, it, expect } from 'vitest';
import { fenceMask } from './fence';
import fixture from '../../SPEC/fixtures/fence/cases.json';

// SPEC/fixtures/fence/cases.json pins the fence rules every line scanner in
// the repo shares; this mask is its reference consumer (CORE-922). The
// fixture comes in as a JSON module, so this stays a Node-free shared-pure
// test (no node:fs), like fence.ts itself.
const { cases } = fixture as {
  cases: { name: string; lines: string[]; mask: boolean[] }[];
};

describe('SPEC/fixtures/fence conformance', () => {
  it('has cases', () => {
    expect(cases.length).toBeGreaterThan(0);
  });

  it.each(cases.map((c) => [c.name, c] as const))('%s', (_name, c) => {
    expect(fenceMask(c.lines)).toEqual(c.mask);
  });
});
