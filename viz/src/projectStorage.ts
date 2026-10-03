import { readLocal, writeLocal } from './storage';

const ACTIVE_PROJECT_KEY = 'flaitron-viz-active-project';

export const readStoredProject = (): string | null => readLocal(ACTIVE_PROJECT_KEY);

export const writeStoredProject = (name: string): void => writeLocal(ACTIVE_PROJECT_KEY, name);
