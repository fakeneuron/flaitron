import { render, type RenderResult } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { App } from '../ui/App';
import { emptyStarterSubsections, type Tasknote } from '../tasknote';

interface ProjectFetchOverride {
  plan?: string;
  active?: Tasknote[];
  archive?: Tasknote[];
  fail?: { plan?: number; active?: number; archive?: number };
}

interface FetchSeed {
  plan: string;
  active?: Tasknote[];
  archive?: Tasknote[];
  projects?: string[];
  projectVersions?: Record<string, string | null>;
  latestRelease?: string | null;
  perProject?: Record<string, ProjectFetchOverride>;
}

export function makeTasknote(partial: Partial<Tasknote> & Pick<Tasknote, 'id'>): Tasknote {
  return {
    id: partial.id,
    path: partial.path ?? `/.flaitron/tasknote/${partial.id}.md`,
    frontmatter: partial.frontmatter ?? {
      title: partial.id,
      status: 'in-progress',
      tags: [],
      created: '2026-05-07',
      relatedTasks: [],
    },
    goal: partial.goal ?? '',
    acceptance: partial.acceptance ?? '',
    subtasks: partial.subtasks ?? '',
    starterContext: partial.starterContext ?? '',
    starterSubsections: partial.starterSubsections ?? emptyStarterSubsections(),
    subtasksProgress: partial.subtasksProgress ?? { total: 0, done: 0 },
    phases: partial.phases ?? [
      { total: 0, done: 0 },
      { total: 0, done: 0 },
      { total: 0, done: 0 },
      { total: 0, done: 0 },
    ],
    closureDrift: partial.closureDrift ?? null,
  };
}

function seedFetch(seed: FetchSeed): void {
  const defaultActive = seed.active ?? [];
  const defaultArchive = seed.archive ?? [];
  const projects = (seed.projects ?? ['flaitron']).map((name) => ({
    name,
    flaitronVersion: seed.projectVersions?.[name] ?? null,
  }));
  const projectsPayload = { latestRelease: seed.latestRelease ?? null, projects };
  const perProject = seed.perProject ?? {};
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const raw = typeof input === 'string' ? input : input.toString();
    const url = new URL(raw, 'http://localhost');
    const project = url.searchParams.get('project') ?? '';
    const override: ProjectFetchOverride = perProject[project] ?? {};
    const fail = override.fail ?? {};
    if (url.pathname.endsWith('/api/projects')) {
      return new Response(JSON.stringify(projectsPayload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (url.pathname.endsWith('/api/plan')) {
      if (fail.plan) return new Response('plan failed', { status: fail.plan });
      return new Response(override.plan ?? seed.plan, {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
    if (url.pathname.endsWith('/api/active')) {
      if (fail.active) return new Response('active failed', { status: fail.active });
      return new Response(JSON.stringify(override.active ?? defaultActive), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (url.pathname.endsWith('/api/archive')) {
      if (fail.archive) return new Response('archive failed', { status: fail.archive });
      return new Response(JSON.stringify(override.archive ?? defaultArchive), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('not found', { status: 404 });
  });
  globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;
}

export function renderApp(seed: FetchSeed): RenderResult {
  seedFetch(seed);
  return render(React.createElement(App));
}
