import React, { useCallback, useMemo, useRef, useState } from 'react';
import { groupTasks, PRIORITIES, type Priority, type Task } from '../parser';
import { type TasknoteStatus } from '../tasknote';
import {
  collectEpicIds,
  collectVisibleIds,
  countFiltered,
  countInProgress,
  countStarters,
  emptySections,
  groupBySection,
  isReady,
  matchesFilter as matchesTaskFilter,
  pruneMatchingNodes,
} from './taskView';
import { DENSITY_TOKENS, TYPOGRAPHY } from './constants';
import { VisibilityProvider } from './VisibilityContext';
import { SearchProvider } from './SearchContext';
import { RowInteractionProvider } from './RowInteractionContext';
import { LoadingSkeleton } from './LoadingSkeleton';
import { PrioritySection } from './PrioritySection';
import { SettingsModal } from './SettingsModal';
import { ShortcutsModal } from './ShortcutsModal';
import { useBoardSelection } from './useBoardSelection';
import { useKeyboardNav } from './useKeyboardNav';
import { LIVE_RECOVERY_MS, useProjectData } from './useProjectData';
import { useProjects } from './useProjects';
import { useToggleSet } from './useToggleSet';
import { useViewPrefs } from './useViewPrefs';
import { BoardView } from './BoardView';
import { DiagnosticBanner } from './DiagnosticBanner';
import { AppHeader } from './AppHeader';

const SECTIONS = PRIORITIES;

// The three PLAN.md diagnostic banners below share this singular/plural
// shape; `plural` takes the count so each caller can phrase its own noun.
function diagnosticMessage(
  count: number,
  singular: string,
  plural: (count: number) => string,
): React.ReactNode {
  return <>⚠ {count === 1 ? singular : plural(count)}</>;
}

// Layout, not domain: which priorities render as board columns is the one
// section list this file still authors. Everything else falls below the board,
// so a priority added to PRIORITIES stays visible without an edit here.
const BOARD_SECTIONS: Priority[] = ['High', 'Medium', 'Low'];
const BELOW_BOARD_SECTIONS = PRIORITIES.filter((p) => !BOARD_SECTIONS.includes(p));

export const App: React.FC = () => {
  const {
    projects,
    projectVersions,
    latestRelease,
    activeProject,
    setActiveProject,
    initialLoading,
    error: projectsError,
  } = useProjects();
  const {
    tasks,
    unparsed,
    nearMissHeadings,
    unparsableTasknotes,
    tasknotesById,
    loading: dataLoading,
    error: dataError,
    liveDisconnected,
    degraded,
    refresh,
    reset,
  } = useProjectData(activeProject);
  const { visibilityPrefs, updateVisibilityPrefs, viewMode, updateViewMode } =
    useViewPrefs(activeProject);
  const loading = initialLoading || (activeProject !== null && dataLoading);
  const errorMessage = projectsError ?? dataError;

  const [query, setQuery] = useState<string>('');
  const [statusFilter, , setStatusFilter] = useToggleSet<TasknoteStatus>();
  const [readyOnly, setReadyOnly] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const {
    expandedId,
    setExpandedId,
    selectedId,
    setSelectedId,
    highlightId,
    collapsedSections,
    toggleSection,
    expandedEpicIds,
    toggleEpic,
    navigateToTask,
    resetForProjectSwitch,
  } = useBoardSelection(tasks);

  const tasksById = useMemo(() => new Map(tasks.map((t) => [t.id, t])), [tasks]);

  const matchesFilter = useCallback(
    (task: Task): boolean =>
      matchesTaskFilter(task, tasknotesById, query, statusFilter) &&
      (!readyOnly || isReady(task, tasksById, tasknotesById)),
    [tasknotesById, query, statusFilter, readyOnly, tasksById],
  );

  const { nodes: allNodes, duplicateEpics } = useMemo(() => groupTasks(tasks), [tasks]);

  const filteredNodes = useMemo(
    () => pruneMatchingNodes(allNodes, matchesFilter),
    [allNodes, matchesFilter],
  );

  const bySection = useMemo(() => groupBySection(filteredNodes), [filteredNodes]);

  const listViewEmptySections = useMemo(
    () => emptySections(SECTIONS, bySection),
    [bySection],
  );

  const epicIds = useMemo(() => collectEpicIds(allNodes), [allNodes]);

  const visibleIds = useMemo(
    () => collectVisibleIds(SECTIONS, bySection, collapsedSections, expandedEpicIds),
    [bySection, collapsedSections, expandedEpicIds],
  );

  const total = tasks.length;
  const filteredCount = useMemo(() => countFiltered(filteredNodes), [filteredNodes]);
  const inProgress = useMemo(
    () => countInProgress(tasks, tasknotesById),
    [tasks, tasknotesById],
  );
  const starterCount = useMemo(
    () => countStarters(tasks, tasknotesById),
    [tasks, tasknotesById],
  );

  const handleSelectProject = (name: string) => {
    if (name === activeProject) return;
    setQuery('');
    setStatusFilter(new Set());
    setReadyOnly(false);
    resetForProjectSwitch();
    window.scrollTo({ top: 0, behavior: 'auto' });
    reset();
    setActiveProject(name);
  };

  const rowInteraction = useMemo(
    () => ({
      tasknotesById,
      expandedId,
      setExpandedId,
      expandedEpicIds,
      toggleEpic,
      highlightId,
      selectedId,
      navigateToTask,
    }),
    [
      tasknotesById,
      expandedId,
      setExpandedId,
      expandedEpicIds,
      toggleEpic,
      highlightId,
      selectedId,
      navigateToTask,
    ],
  );

  const renderSection = (p: Priority) => {
    const nodes = bySection[p] ?? [];
    const collapsed = collapsedSections.has(p);
    return (
      <PrioritySection
        key={p}
        priority={p}
        nodes={nodes}
        collapsed={collapsed}
        onToggle={() => toggleSection(p)}
      />
    );
  };

  useKeyboardNav({
    visibleIds,
    epicIds,
    searchInputRef,
    selectedId,
    setSelectedId,
    expandedId,
    setExpandedId,
    expandedEpicIds,
    toggleEpic,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    readyOnly,
    setReadyOnly,
    load: refresh,
    onOpenShortcuts: () => setShortcutsOpen(true),
  });

  return (
    <VisibilityProvider value={visibilityPrefs}>
    <SearchProvider value={query}>
    <RowInteractionProvider value={rowInteraction}>
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppHeader
        activeProject={activeProject}
        projects={projects}
        projectVersions={projectVersions}
        latestRelease={latestRelease}
        onSelectProject={handleSelectProject}
        total={total}
        filteredCount={filteredCount}
        inProgress={inProgress}
        starterCount={starterCount}
        unparsedCount={unparsed.length}
        unparsableTasknoteCount={unparsableTasknotes.length}
        duplicateEpicCount={duplicateEpics.length}
        nearMissHeadingCount={nearMissHeadings.length}
        liveDisconnected={liveDisconnected}
        viewMode={viewMode}
        onViewModeChange={updateViewMode}
        query={query}
        onQueryChange={setQuery}
        readyOnly={readyOnly}
        onReadyOnlyChange={setReadyOnly}
        searchInputRef={searchInputRef}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {errorMessage && (
        <div className="mx-4 mt-3 rounded border border-red-300 bg-red-50 p-3 text-base text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {errorMessage}
        </div>
      )}

      {liveDisconnected && (
        <div
          role="status"
          className="mx-4 mt-3 rounded border border-amber-300 bg-amber-50 p-3 text-base text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
        >
          {degraded ? (
            <>
              ⚠ File watcher stopped — restart the dev server. Showing polled data (every{' '}
              {Math.round(LIVE_RECOVERY_MS / 1000)}s) meanwhile.
            </>
          ) : (
            <>
              ⚠ Live updates disconnected — showing polled data (every{' '}
              {Math.round(LIVE_RECOVERY_MS / 1000)}s) and retrying the live connection.
            </>
          )}
        </div>
      )}

      {!loading && unparsed.length > 0 && (
        <DiagnosticBanner
          message={diagnosticMessage(
            unparsed.length,
            '1 line in PLAN.md looks like a task but failed to parse:',
            (n) => `${n} lines in PLAN.md look like tasks but failed to parse:`,
          )}
        >
          {unparsed.map((u) => (
            <li key={u.line}>
              L{u.line}: {u.text}
            </li>
          ))}
        </DiagnosticBanner>
      )}

      {!loading && unparsableTasknotes.length > 0 && (
        <DiagnosticBanner
          message={diagnosticMessage(
            unparsableTasknotes.length,
            '1 active tasknote failed to parse:',
            (n) => `${n} active tasknotes failed to parse:`,
          )}
        >
          {unparsableTasknotes.map((note) => (
            <li key={note.id}>{note.id}: {note.reason}</li>
          ))}
        </DiagnosticBanner>
      )}

      {!loading && duplicateEpics.length > 0 && (
        <DiagnosticBanner
          message={diagnosticMessage(
            duplicateEpics.length,
            '1 epic ID appears under more than one PLAN.md heading; only its first occurrence is shown:',
            (n) =>
              `${n} epic IDs appear under more than one PLAN.md heading; only each first occurrence is shown:`,
          )}
        >
          {duplicateEpics.map((d, i) => (
            <li key={`${d.id}-${i}`}>{d.id}</li>
          ))}
        </DiagnosticBanner>
      )}

      {!loading && nearMissHeadings.length > 0 && (
        <DiagnosticBanner
          message={diagnosticMessage(
            nearMissHeadings.length,
            "1 PLAN.md heading looks like a typo'd priority section and its tasks were skipped:",
            (n) =>
              `${n} PLAN.md headings look like typo'd priority sections and their tasks were skipped:`,
          )}
        >
          {nearMissHeadings.map((h) => (
            <li key={h.line}>
              L{h.line}: "{h.heading}" (did you mean "{h.matched}"?)
            </li>
          ))}
        </DiagnosticBanner>
      )}

      <main className="mx-auto max-w-screen-xl px-4 py-4">
        {loading ? (
          <LoadingSkeleton density={visibilityPrefs.density} />
        ) : (statusFilter.size > 0 || query.trim() || readyOnly) && filteredCount === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className={`${TYPOGRAPHY.body} text-slate-500 dark:text-slate-400`}>
              No matches. Press Esc to clear filters.
            </p>
          </div>
        ) : viewMode === 'board' ? (
          <div className={`flex flex-col ${DENSITY_TOKENS[visibilityPrefs.density].betweenSectionsGap}`}>
            <BoardView
              sections={BOARD_SECTIONS}
              bySection={bySection}
              collapsedSections={collapsedSections}
              toggleSection={toggleSection}
            />
            {BELOW_BOARD_SECTIONS.map(renderSection)}
          </div>
        ) : (
          <>
            <div className={`flex flex-col ${DENSITY_TOKENS[visibilityPrefs.density].betweenSectionsGap}`}>
              {SECTIONS.filter((p) => (bySection[p] ?? []).length > 0).map(renderSection)}
            </div>
            {listViewEmptySections.length > 0 && (
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                {listViewEmptySections.length === SECTIONS.length
                  ? 'No tasks in this project'
                  : `No tasks in: ${listViewEmptySections.join(' · ')}`}
              </p>
            )}
          </>
        )}
      </main>
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        prefs={visibilityPrefs}
        onChange={updateVisibilityPrefs}
      />
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
    </RowInteractionProvider>
    </SearchProvider>
    </VisibilityProvider>
  );
};
