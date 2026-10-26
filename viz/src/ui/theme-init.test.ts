import { afterEach, describe, expect, it } from 'vitest';
import themeInitSource from '../../public/theme-init.js?raw';
import { readPreference, type ThemePreference } from './theme';

const originalMatchMedia = window.matchMedia;

type StorageCase = 'new-key' | 'legacy-key' | 'none';

function setSystemDark(dark: boolean): void {
  window.matchMedia = ((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && dark,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

// Keyed cells store the opposite of the system preference, so a reader that
// ignores storage fails. `none` follows the system.
function install(storage: StorageCase, systemDark: boolean): ThemePreference {
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
  setSystemDark(systemDark);
  if (storage === 'none') return systemDark ? 'dark' : 'light';
  const stored: ThemePreference = systemDark ? 'light' : 'dark';
  const key = storage === 'new-key' ? 'flaitron-viz-theme' : 'theme';
  window.localStorage.setItem(key, stored);
  return stored;
}

function runThemeInit(): void {
  document.documentElement.classList.remove('dark');
  const run = new Function(themeInitSource) as () => void;
  run();
}

describe('theme-init.js matches readPreference()', () => {
  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    window.matchMedia = originalMatchMedia;
  });

  const storages: StorageCase[] = ['new-key', 'legacy-key', 'none'];
  const systems = [true, false];

  for (const storage of storages) {
    for (const systemDark of systems) {
      const system = systemDark ? 'dark' : 'light';
      it(`${storage} × system ${system}`, () => {
        const expected = install(storage, systemDark);
        expect(readPreference()).toBe(expected);
        runThemeInit();
        expect(document.documentElement.classList.contains('dark')).toBe(expected === 'dark');
        expect(readPreference()).toBe(expected);
      });
    }
  }
});
