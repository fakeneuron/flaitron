import { afterEach, describe, expect, it } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { useViewPrefs } from './useViewPrefs';
import { DEFAULT_PREFS, type VisibilityPrefs } from '../visibilityPrefs';
import { VIEW_MODE_KEY } from '../viewMode';

const prefsKey = (project: string) => `flaitron-viz-prefs:${project}`;

const withDensity = (density: VisibilityPrefs['density']): VisibilityPrefs => ({
  ...DEFAULT_PREFS,
  density,
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('useViewPrefs — visibility prefs', () => {
  it('reads the active project’s stored prefs on mount', () => {
    window.localStorage.setItem(prefsKey('alpha'), JSON.stringify(withDensity('compact')));
    const { result } = renderHook(() => useViewPrefs('alpha'));
    expect(result.current.visibilityPrefs.density).toBe('compact');
  });

  it('re-reads prefs from the new project key when activeProject changes', () => {
    window.localStorage.setItem(prefsKey('alpha'), JSON.stringify(withDensity('compact')));
    window.localStorage.setItem(prefsKey('beta'), JSON.stringify(withDensity('comfortable')));
    const { result, rerender } = renderHook(({ p }) => useViewPrefs(p), {
      initialProps: { p: 'alpha' as string | null },
    });
    expect(result.current.visibilityPrefs.density).toBe('compact');
    rerender({ p: 'beta' });
    expect(result.current.visibilityPrefs.density).toBe('comfortable');
  });

  it('holds defaults and re-reads nothing while activeProject is null', () => {
    window.localStorage.setItem(prefsKey('alpha'), JSON.stringify(withDensity('compact')));
    const { result } = renderHook(() => useViewPrefs(null));
    expect(result.current.visibilityPrefs).toEqual(DEFAULT_PREFS);
  });

  it('updateVisibilityPrefs updates state and persists under the active project key', () => {
    const { result } = renderHook(() => useViewPrefs('alpha'));
    act(() => result.current.updateVisibilityPrefs(withDensity('compact')));
    expect(result.current.visibilityPrefs.density).toBe('compact');
    expect(JSON.parse(window.localStorage.getItem(prefsKey('alpha'))!).density).toBe('compact');
  });

  it('updateVisibilityPrefs updates state but writes nothing when no project is active', () => {
    const { result } = renderHook(() => useViewPrefs(null));
    act(() => result.current.updateVisibilityPrefs(withDensity('compact')));
    expect(result.current.visibilityPrefs.density).toBe('compact');
    expect(window.localStorage.length).toBe(0);
  });
});

describe('useViewPrefs — view mode', () => {
  it('initializes from the stored view mode', () => {
    window.localStorage.setItem(VIEW_MODE_KEY, 'board');
    const { result } = renderHook(() => useViewPrefs('alpha'));
    expect(result.current.viewMode).toBe('board');
  });

  it('falls back to list when nothing is stored', () => {
    const { result } = renderHook(() => useViewPrefs('alpha'));
    expect(result.current.viewMode).toBe('list');
  });

  it('updateViewMode updates state and persists the choice', () => {
    const { result } = renderHook(() => useViewPrefs('alpha'));
    act(() => result.current.updateViewMode('board'));
    expect(result.current.viewMode).toBe('board');
    expect(window.localStorage.getItem(VIEW_MODE_KEY)).toBe('board');
  });

  it('keeps the view mode across a project switch (it is global, not per-project)', () => {
    const { result, rerender } = renderHook(({ p }) => useViewPrefs(p), {
      initialProps: { p: 'alpha' as string | null },
    });
    act(() => result.current.updateViewMode('board'));
    rerender({ p: 'beta' });
    expect(result.current.viewMode).toBe('board');
  });
});
