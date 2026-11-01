import { useEffect, type RefObject } from 'react';
import type { TasknoteStatus } from '../tasknote';

interface UseKeyboardNavParams {
  visibleIds: string[];
  epicIds: Set<string>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  expandedEpicIds: Set<string>;
  toggleEpic: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  statusFilter: Set<TasknoteStatus>;
  setStatusFilter: (s: Set<TasknoteStatus>) => void;
  readyOnly: boolean;
  setReadyOnly: (v: boolean) => void;
  load: () => void;
  onOpenShortcuts: () => void;
}

const scrollRowIntoView = (id: string) => {
  const el = document.getElementById(`row-${id}`);
  el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};

export function useKeyboardNav(params: UseKeyboardNavParams) {
  const {
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
    load,
    onOpenShortcuts,
  } = params;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (document.querySelector('dialog[open]')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || !!target?.isContentEditable;

      if (e.key === 'Escape') {
        // Only collapse when the expanded row is actually on screen — a stale
        // expandedId (filtered out, section collapsed, parent epic collapsed)
        // would otherwise swallow the keypress with no visible change.
        if (expandedId !== null && visibleIds.includes(expandedId)) {
          setExpandedId(null);
        } else if (query || statusFilter.size > 0 || readyOnly) {
          setQuery('');
          setStatusFilter(new Set());
          setReadyOnly(false);
        } else if (target === searchInputRef.current) {
          searchInputRef.current?.blur();
        } else {
          return;
        }
        e.preventDefault();
        return;
      }

      if (e.key === '/') {
        if (isTyping) return;
        searchInputRef.current?.focus();
        e.preventDefault();
        return;
      }

      if (e.key === '?') {
        if (isTyping) return;
        onOpenShortcuts();
        e.preventDefault();
        return;
      }

      if (isTyping) return;

      if (e.key === 'j' || e.key === 'k') {
        if (visibleIds.length === 0) return;
        const idx = selectedId ? visibleIds.indexOf(selectedId) : -1;
        const next =
          e.key === 'j'
            ? idx < 0
              ? 0
              : Math.min(idx + 1, visibleIds.length - 1)
            : idx < 0
              ? visibleIds.length - 1
              : Math.max(idx - 1, 0);
        // `next` is clamped to [0, length-1] and length > 0 (checked above).
        const nextId = visibleIds[next]!;
        setSelectedId(nextId);
        scrollRowIntoView(nextId);
        e.preventDefault();
        return;
      }

      if (e.key === 'Enter') {
        if (tag === 'BUTTON' || tag === 'A') return;
        if (!selectedId) return;
        if (epicIds.has(selectedId) && !expandedEpicIds.has(selectedId)) {
          toggleEpic(selectedId);
        } else {
          setExpandedId(expandedId === selectedId ? null : selectedId);
        }
        e.preventDefault();
        return;
      }

      if (e.key === 'r') {
        load();
        e.preventDefault();
        return;
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [
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
    load,
    onOpenShortcuts,
  ]);
}
