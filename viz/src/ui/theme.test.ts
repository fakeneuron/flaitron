import { beforeEach, describe, expect, it } from 'vitest';
import { readPreference, writePreference } from './theme';

describe('theme storage key', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('reads the namespaced key when present', () => {
    window.localStorage.setItem('flaitron-viz-theme', 'dark');
    expect(readPreference()).toBe('dark');
  });

  it('falls back to the legacy bare key when the namespaced key is absent', () => {
    window.localStorage.setItem('theme', 'dark');
    expect(readPreference()).toBe('dark');
  });

  it('prefers the namespaced key over the legacy key when both are set', () => {
    window.localStorage.setItem('flaitron-viz-theme', 'light');
    window.localStorage.setItem('theme', 'dark');
    expect(readPreference()).toBe('light');
  });

  it('writes only to the namespaced key, leaving any legacy key untouched', () => {
    window.localStorage.setItem('theme', 'dark');
    writePreference('light');
    expect(window.localStorage.getItem('flaitron-viz-theme')).toBe('light');
    expect(window.localStorage.getItem('theme')).toBe('dark');
  });
});
