import { useCallback, useEffect, useState } from 'react';
import { readStoredProject, writeStoredProject } from '../projectStorage';

interface ProjectInfo {
  name: string;
  flaitronVersion: string | null;
}

interface ProjectsResponse {
  latestRelease: string | null;
  projects: ProjectInfo[];
}

export function useProjects(): {
  projects: string[];
  projectVersions: Record<string, string | null>;
  latestRelease: string | null;
  activeProject: string | null;
  setActiveProject: (name: string | null) => void;
  initialLoading: boolean;
  error: string | null;
} {
  const [projects, setProjects] = useState<string[]>([]);
  const [projectVersions, setProjectVersions] = useState<Record<string, string | null>>({});
  const [latestRelease, setLatestRelease] = useState<string | null>(null);
  const [activeProject, setActiveProjectState] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error(`Project list failed: HTTP ${res.status}`);
        const payload = (await res.json()) as ProjectsResponse;
        if (cancelled) return;
        const list = payload.projects;
        const names = list.map((p) => p.name);
        const versions: Record<string, string | null> = {};
        for (const p of list) versions[p.name] = p.flaitronVersion ?? null;
        setProjects(names);
        setProjectVersions(versions);
        setLatestRelease(payload.latestRelease ?? null);
        const stored = readStoredProject();
        const initial = stored && names.includes(stored) ? stored : (names[0] ?? null);
        setActiveProjectState(initial);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setActiveProject = useCallback((name: string | null) => {
    setActiveProjectState(name);
    if (name) writeStoredProject(name);
  }, []);

  return {
    projects,
    projectVersions,
    latestRelease,
    activeProject,
    setActiveProject,
    initialLoading,
    error,
  };
}
