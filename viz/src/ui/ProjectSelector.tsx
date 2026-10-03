import React, { useEffect, useRef, useState } from 'react';
import { versionCurrency, visibleProjects } from './utils';

interface Props {
  projects: string[];
  active: string | null;
  onSelect: (name: string) => void;
  versions?: Record<string, string | null>;
  latestRelease?: string | null;
}

const MAX_VISIBLE = 5;

export const ProjectSelector: React.FC<Props> = ({
  projects,
  active,
  onSelect,
  versions,
  latestRelease,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (projects.length === 0) return null;

  const { visible, overflow } = visibleProjects(projects, active, MAX_VISIBLE);
  const hasOverflow = overflow.length > 0;
  const last = hasOverflow ? -1 : visible.length - 1;

  const renderChip = (name: string, corner: string, divider: string) => {
    const on = name === active;
    const version = versions?.[name] ?? null;
    const currency = versionCurrency(version, latestRelease ?? null);
    const currencyLabel =
      currency === 'current'
        ? ` (flaitron up to date, ${version})`
        : currency === 'behind'
          ? ` (flaitron outdated: ${version}, latest ${latestRelease})`
          : '';
    return (
      <button
        key={name}
        type="button"
        onClick={() => {
          onSelect(name);
          setOpen(false);
        }}
        aria-pressed={on}
        aria-label={`Project: ${name}${currencyLabel}`}
        title={currencyLabel ? currencyLabel.trim().replace(/^\(|\)$/g, '') : undefined}
        className={`${corner} ${divider} px-3 py-1.5 text-base focus:outline-hidden focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 ${
          on
            ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
            : 'hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
        }`}
      >
        {currency !== 'unknown' && (
          <span
            aria-hidden="true"
            data-currency={currency}
            className={`mr-1.5 inline-block h-2 w-2 rounded-full align-middle ${
              currency === 'current' ? 'bg-emerald-500' : 'bg-red-500'
            }`}
          />
        )}
        {name}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-slate-500 dark:text-slate-400">Project:</span>
      <div ref={containerRef} className="relative inline-flex">
        <div
          role="group"
          aria-label="Project"
          className="inline-flex rounded border border-slate-300 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900"
        >
          {visible.map((name, i) => {
            const corner = i === 0 ? 'rounded-l' : i === last ? 'rounded-r' : '';
            const divider = i > 0 ? 'border-l border-slate-300 dark:border-slate-700' : '';
            return renderChip(name, corner, divider);
          })}
          {hasOverflow && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={open}
              aria-label={`${overflow.length} more projects`}
              className="rounded-r border-l border-slate-300 px-3 py-1.5 text-base text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
            >
              +{overflow.length}
            </button>
          )}
        </div>
        {open && hasOverflow && (
          <div
            role="group"
            aria-label="More projects"
            className="absolute right-0 top-full z-10 mt-1 flex min-w-max flex-col overflow-hidden rounded border border-slate-300 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900"
          >
            {overflow.map((name) => renderChip(name, '', ''))}
          </div>
        )}
      </div>
    </div>
  );
};
