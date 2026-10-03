import { readLocal, writeLocal } from './storage';

export type ViewMode = 'list' | 'board';

export const VIEW_MODE_KEY = 'flaitron-viz-view';

const DEFAULT_VIEW_MODE: ViewMode = 'list';

const isViewMode = (v: unknown): v is ViewMode => v === 'list' || v === 'board';

export const readStoredViewMode = (): ViewMode => {
  const raw = readLocal(VIEW_MODE_KEY);
  return isViewMode(raw) ? raw : DEFAULT_VIEW_MODE;
};

export const writeStoredViewMode = (mode: ViewMode): void => writeLocal(VIEW_MODE_KEY, mode);
