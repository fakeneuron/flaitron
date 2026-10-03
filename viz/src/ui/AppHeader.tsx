import React from 'react';
import { type ViewMode } from '../viewMode';
import { HeaderBadge } from './HeaderBadge';
import { ProjectSelector } from './ProjectSelector';
import { ReadyToggle } from './ReadyToggle';
import { ThemeToggle } from './ThemeToggle';
import { ViewModeToggle } from './ViewModeToggle';

interface AppHeaderProps {
  activeProject: string | null;
  projects: string[];
  projectVersions: Record<string, string | null>;
  latestRelease: string | null;
  onSelectProject: (name: string) => void;
  total: number;
  filteredCount: number;
  inProgress: number;
  starterCount: number;
  unparsedCount: number;
  duplicateEpicCount: number;
  nearMissHeadingCount: number;
  liveDisconnected: boolean;
  viewMode: ViewMode;
  onViewModeChange: (next: ViewMode) => void;
  query: string;
  onQueryChange: (next: string) => void;
  readyOnly: boolean;
  onReadyOnlyChange: (next: boolean) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onOpenShortcuts: () => void;
  onOpenSettings: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeProject,
  projects,
  projectVersions,
  latestRelease,
  onSelectProject,
  total,
  filteredCount,
  inProgress,
  starterCount,
  unparsedCount,
  duplicateEpicCount,
  nearMissHeadingCount,
  liveDisconnected,
  viewMode,
  onViewModeChange,
  query,
  onQueryChange,
  readyOnly,
  onReadyOnlyChange,
  searchInputRef,
  onOpenShortcuts,
  onOpenSettings,
}) => {
  const starterSuffix =
    starterCount > 0 ? ` · ${starterCount} ${starterCount === 1 ? 'starter' : 'starters'}` : '';

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-lg font-semibold">
              <img src="/LOGO.webp" alt="" aria-hidden="true" className="h-6 w-auto" />
              Flaitron — {activeProject ?? '…'}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {filteredCount === total
                ? `${total} tasks · ${inProgress} in progress${starterSuffix}`
                : `${filteredCount} of ${total} matching · ${inProgress} in progress${starterSuffix}`}
              {projectVersions[activeProject ?? '']
                ? ` · flaitron ${projectVersions[activeProject ?? '']}`
                : null}
              {unparsedCount > 0 && <HeaderBadge>⚠ {unparsedCount} unparsed</HeaderBadge>}
              {duplicateEpicCount > 0 && (
                <HeaderBadge>
                  ⚠ {duplicateEpicCount} duplicate epic{duplicateEpicCount === 1 ? '' : 's'}
                </HeaderBadge>
              )}
              {nearMissHeadingCount > 0 && (
                <HeaderBadge>
                  ⚠ {nearMissHeadingCount} near-miss heading{nearMissHeadingCount === 1 ? '' : 's'}
                </HeaderBadge>
              )}
              {liveDisconnected && <HeaderBadge>⚠ live updates off</HeaderBadge>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
            <ReadyToggle active={readyOnly} onChange={onReadyOnlyChange} />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search id, description, status"
              autoComplete="off"
              className="w-72 rounded border border-slate-300 bg-white px-3 py-1.5 text-base shadow-xs focus:outline-hidden focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-slate-600"
              aria-label="Search tasks"
            />
            <button
              type="button"
              onClick={onOpenShortcuts}
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts"
              className="rounded border border-slate-300 bg-white px-2 py-1.5 text-base shadow-xs hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
            >
              ⓘ
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Open settings"
              title="Settings"
              className="rounded border border-slate-300 bg-white px-2 py-1.5 text-base shadow-xs hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
            >
              ⚙️
            </button>
          </div>
        </div>
        <div className="text-sm">
          <ProjectSelector
            projects={projects}
            active={activeProject}
            onSelect={onSelectProject}
            versions={projectVersions}
            latestRelease={latestRelease}
          />
        </div>
      </div>
    </header>
  );
};
