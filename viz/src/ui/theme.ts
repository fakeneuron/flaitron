import { readLocal, writeLocal } from '../storage';

export type ThemePreference = 'light' | 'dark';

const STORAGE_KEY = 'flaitron-viz-theme';
const LEGACY_STORAGE_KEY = 'theme';

export function readPreference(): ThemePreference {
  const stored = readLocal(STORAGE_KEY) ?? readLocal(LEGACY_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // No stored pref: resolve the system preference, matching theme-init.js so
  // the mount-time applyResolved() doesn't strip the init script's dark class.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function writePreference(pref: ThemePreference): void {
  writeLocal(STORAGE_KEY, pref);
}

export function applyResolved(pref: ThemePreference): 'light' | 'dark' {
  document.documentElement.classList.toggle('dark', pref === 'dark');
  return pref;
}
