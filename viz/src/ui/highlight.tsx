import React from 'react';
import { splitHighlight } from './utils';

export function highlightMatch(text: string, query: string): React.ReactNode {
  const segments = splitHighlight(text, query);
  if (segments.length === 1 && !segments[0]!.matched) return text;
  return (
    <>
      {segments.map((seg, i) =>
        seg.matched ? (
          <mark
            key={i}
            className="rounded-[2px] bg-yellow-200 text-slate-900 dark:bg-yellow-500/40 dark:text-yellow-100"
          >
            {seg.text}
          </mark>
        ) : (
          seg.text
        ),
      )}
    </>
  );
}
