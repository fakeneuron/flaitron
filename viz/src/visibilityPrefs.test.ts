import { beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_PREFS,
  DENSITY_MODES,
  PALETTE_NAMES,
  readVisibilityPrefs,
  writeVisibilityPrefs,
  type VisibilityPrefs,
} from './visibilityPrefs';

describe('visibilityPrefs', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns DEFAULT_PREFS when no value is stored', () => {
    expect(readVisibilityPrefs('flaitron')).toEqual(DEFAULT_PREFS);
  });

  it('round-trips a written value', () => {
    const next: VisibilityPrefs = {
      version: 2,
      rowChips: { id: false, tags: true, model: false, related: true, blocked: true, due: false },
      detailSections: { goal: false, acceptance: true, subtasks: true },
      starterSections: {
        whyExists: true,
        solutionShape: false,
        filesToTouch: true,
        outOfScope: false,
      },
      density: 'compact',
      palette: 'linear',
    };
    writeVisibilityPrefs('flaitron', next);
    expect(readVisibilityPrefs('flaitron')).toEqual(next);
  });

  it('isolates prefs across projects', () => {
    const a: VisibilityPrefs = {
      ...DEFAULT_PREFS,
      rowChips: { id: true, tags: true, model: false, related: false, blocked: false, due: false },
    };
    const b: VisibilityPrefs = {
      ...DEFAULT_PREFS,
      rowChips: { id: true, tags: false, model: true, related: true, blocked: false, due: false },
    };
    writeVisibilityPrefs('flaitron', a);
    writeVisibilityPrefs('fintown', b);
    expect(readVisibilityPrefs('flaitron').rowChips.tags).toBe(true);
    expect(readVisibilityPrefs('flaitron').rowChips.model).toBe(false);
    expect(readVisibilityPrefs('fintown').rowChips.tags).toBe(false);
    expect(readVisibilityPrefs('fintown').rowChips.related).toBe(true);
  });

  it('falls back to DEFAULT_PREFS on malformed JSON', () => {
    window.localStorage.setItem('flaitron-viz-prefs:flaitron', '{not json');
    expect(readVisibilityPrefs('flaitron')).toEqual(DEFAULT_PREFS);
  });

  it('falls back to DEFAULT_PREFS on unknown schema version', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({ version: 99, rowChips: {}, detailSections: {} }),
    );
    expect(readVisibilityPrefs('flaitron')).toEqual(DEFAULT_PREFS);
  });

  it('migrates stored v1 data to v2 on read', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { id: true, tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'compact',
      }),
    );
    const result = readVisibilityPrefs('flaitron');
    expect(result.version).toBe(2);
    expect(result.density).toBe('compact');
    expect(result.palette).toBe('default');
  });

  it('coerces missing booleans to defaults but preserves provided ones', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: true, model: false },
        detailSections: { goal: false },
      }),
    );
    const result = readVisibilityPrefs('flaitron');
    expect(result.rowChips.tags).toBe(true);
    expect(result.rowChips.model).toBe(false);
    expect(result.rowChips.related).toBe(DEFAULT_PREFS.rowChips.related);
    expect(result.rowChips.blocked).toBe(DEFAULT_PREFS.rowChips.blocked);
    expect(result.rowChips.id).toBe(DEFAULT_PREFS.rowChips.id);
    expect(result.detailSections.goal).toBe(false);
    expect(result.detailSections.acceptance).toBe(true);
  });

  it('falls back rowChips.id to true (default) on pre-id-toggle payloads', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'default',
      }),
    );
    expect(readVisibilityPrefs('flaitron').rowChips.id).toBe(true);
  });

  it('preserves rowChips.id when explicitly stored as false', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { id: false, tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'default',
      }),
    );
    expect(readVisibilityPrefs('flaitron').rowChips.id).toBe(false);
  });

  it('falls back density to "default" when the field is missing (v1 pre-density payload)', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: true, model: false, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
      }),
    );
    const result = readVisibilityPrefs('flaitron');
    expect(result.density).toBe('default');
    expect(result.rowChips.tags).toBe(true);
  });

  it('falls back density to "default" when the field is an unknown string', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'super-dense',
      }),
    );
    expect(readVisibilityPrefs('flaitron').density).toBe('default');
  });

  it('falls back starterSections to defaults when the field is missing (pre-starterSections payload)', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: true, model: false, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'compact',
      }),
    );
    const result = readVisibilityPrefs('flaitron');
    expect(result.starterSections).toEqual(DEFAULT_PREFS.starterSections);
    expect(result.density).toBe('compact');
    expect(result.rowChips.tags).toBe(true);
  });

  it('coerces missing starterSections booleans to defaults but preserves provided ones', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        starterSections: { whyExists: false, filesToTouch: false },
        density: 'default',
      }),
    );
    const result = readVisibilityPrefs('flaitron');
    expect(result.starterSections.whyExists).toBe(false);
    expect(result.starterSections.filesToTouch).toBe(false);
    expect(result.starterSections.solutionShape).toBe(DEFAULT_PREFS.starterSections.solutionShape);
    expect(result.starterSections.outOfScope).toBe(DEFAULT_PREFS.starterSections.outOfScope);
  });

  it('isolates density across projects', () => {
    const a: VisibilityPrefs = { ...DEFAULT_PREFS, density: 'compact' };
    const b: VisibilityPrefs = { ...DEFAULT_PREFS, density: 'comfortable' };
    writeVisibilityPrefs('flaitron', a);
    writeVisibilityPrefs('fintown', b);
    expect(readVisibilityPrefs('flaitron').density).toBe('compact');
    expect(readVisibilityPrefs('fintown').density).toBe('comfortable');
  });

  it('falls back palette to "default" when the field is missing (v1 pre-palette payload)', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: true, model: false, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'default',
      }),
    );
    const result = readVisibilityPrefs('flaitron');
    expect(result.palette).toBe('default');
    expect(result.density).toBe('default');
  });

  it('falls back palette to "default" when the field is an unknown string', () => {
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'default',
        palette: 'solarized',
      }),
    );
    expect(readVisibilityPrefs('flaitron').palette).toBe('default');
  });

  it('isolates palette across projects', () => {
    const a: VisibilityPrefs = { ...DEFAULT_PREFS, palette: 'linear' };
    const b: VisibilityPrefs = { ...DEFAULT_PREFS, palette: 'github' };
    writeVisibilityPrefs('flaitron', a);
    writeVisibilityPrefs('fintown', b);
    expect(readVisibilityPrefs('flaitron').palette).toBe('linear');
    expect(readVisibilityPrefs('fintown').palette).toBe('github');
  });

  // The guards are derived from these arrays, so a member added to either one
  // must survive a round-trip without a second edit to isDensity/isPalette.
  it('accepts every DENSITY_MODES member on read-back', () => {
    for (const density of DENSITY_MODES) {
      writeVisibilityPrefs('flaitron', { ...DEFAULT_PREFS, density });
      expect(readVisibilityPrefs('flaitron').density).toBe(density);
    }
  });

  it('accepts every PALETTE_NAMES member on read-back', () => {
    for (const palette of PALETTE_NAMES) {
      writeVisibilityPrefs('flaitron', { ...DEFAULT_PREFS, palette });
      expect(readVisibilityPrefs('flaitron').palette).toBe(palette);
    }
  });
});
