import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeTasknote, renderApp } from '../test/fixtures';
import { DENSITY_MODES, PALETTE_NAMES } from '../visibilityPrefs';
import { STARTER_SUBSECTION_KEYS } from '../tasknote';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App — navigateToTask', () => {
  const plan = `## Critical

- [ ] **CORE-EPIC-1** | epic — Parent epic
- [ ] **CORE-1.1** | sub one — Subtask one. Builds on parent.
- [ ] **CORE-1.2** | sub two — Subtask two.

## Low

- [ ] **CORE-900** | jumper — Has [[CORE-1.1]] in related.
`;

  // Real timers throughout. navigateToTask sequences its scroll + highlight
  // inside requestAnimationFrame, then a setTimeout(HIGHLIGHT_MS). The earlier
  // `vi.useFakeTimers({ shouldAdvanceTime: true })` variant was needed to fire
  // the mocked rAF, but that coupled the test to wall-clock: under the full
  // parallel run it intermittently timed out. Real timers reduce but
  // don't fully eliminate flakiness under parallel jsdom contention; the
  // shared-config timeouts (setup.ts asyncUtilTimeout + vite.config.ts
  // testTimeout) absorb the remaining slack — no per-call or per-test
  // overrides here, they only undercut those globals.
  it('clicking a wikilink in TaskDetail auto-expands the parent epic, scrolls, and clears highlight', async () => {
    const scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    const user = userEvent.setup();
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());

    const epicChevron = screen.getByRole('button', { name: 'Expand subtasks' });
    expect(epicChevron).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('button', { name: /CORE-900/, expanded: false }));

    const wikilink = await screen.findByRole('button', { name: /\[\[CORE-1\.1\]\]/ });
    await user.click(wikilink);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Collapse subtasks' })).toBeInTheDocument(),
    );
    expect(document.getElementById('row-CORE-1.1')).not.toBeNull();

    // scroll + highlight fire inside requestAnimationFrame — wait for them.
    await waitFor(() =>
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' }),
    );

    const targetRow = document.getElementById('row-CORE-1.1')!;
    await waitFor(() => expect(targetRow.className).toMatch(/ring-indigo/));

    // Highlight clears HIGHLIGHT_MS (1500ms) after navigation; the shared
    // asyncUtilTimeout covers the margin.
    await waitFor(() => expect(targetRow.className).not.toMatch(/ring-indigo/));
  });
});

describe('App — expand-on-click toggling', () => {
  const plan = `## High

- [ ] **CORE-100** | only — Only task
`;

  const active = [
    makeTasknote({
      id: 'CORE-100',
      goal: 'The goal sentence.',
      frontmatter: {
        title: 'only',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  it('reveals TaskDetail on first click and hides it on the second click', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    const toggle = screen.getByRole('button', { expanded: false, name: /CORE-100/ });
    expect(screen.queryByText('The goal sentence.')).not.toBeInTheDocument();

    await user.click(toggle);
    await waitFor(() => expect(screen.getByText('The goal sentence.')).toBeInTheDocument());
    expect(screen.getByRole('button', { expanded: true, name: /CORE-100/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { expanded: true, name: /CORE-100/ }));
    await waitFor(() =>
      expect(screen.queryByText('The goal sentence.')).not.toBeInTheDocument(),
    );
  });
});

describe('App — subtask expand-on-click toggling', () => {
  const plan = `## High

- [ ] **CORE-EPIC-1** | epic — Parent epic
- [ ] **CORE-1.1** | sub one — Subtask one
`;

  const active = [
    makeTasknote({
      id: 'CORE-1.1',
      goal: 'The subtask goal sentence.',
      frontmatter: {
        title: 'sub one',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  it('reveals TaskDetail on first click of a subtask and hides it on the second click', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Expand subtasks' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Collapse subtasks' })).toBeInTheDocument(),
    );

    const subtaskToggle = screen.getByRole('button', { name: /CORE-1\.1/, expanded: false });
    expect(screen.queryByText('The subtask goal sentence.')).not.toBeInTheDocument();

    await user.click(subtaskToggle);
    await waitFor(() =>
      expect(screen.getByText('The subtask goal sentence.')).toBeInTheDocument(),
    );
    expect(
      screen.getByRole('button', { name: /CORE-1\.1/, expanded: true }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /CORE-1\.1/, expanded: true }));
    await waitFor(() =>
      expect(screen.queryByText('The subtask goal sentence.')).not.toBeInTheDocument(),
    );
  });
});

describe('App — search reaches subtasks', () => {
  const plan = `## High

- [ ] **CORE-EPIC-1** | epic — Parent epic
- [ ] **CORE-1.1** | sub one — Subtask one
- [ ] **CORE-200** | other — Unrelated task
`;

  it('keeps the parent epic visible when only a subtask matches the query', async () => {
    const user = userEvent.setup();
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());

    await user.type(screen.getByRole('searchbox'), 'CORE-1.1');

    expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument();
    expect(screen.queryByText('CORE-200')).not.toBeInTheDocument();
  });

  it('still filters out an epic when neither it nor its children match', async () => {
    const user = userEvent.setup();
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());

    await user.type(screen.getByRole('searchbox'), 'CORE-200');

    await waitFor(() => expect(screen.queryByText('CORE-EPIC-1')).not.toBeInTheDocument());
    expect(screen.getByText('CORE-200')).toBeInTheDocument();
  });
});

describe('App — prune epic children under filter', () => {
  const plan = `## High

- [ ] **CORE-EPIC-1** | epic — Parent epic
- [ ] **CORE-1.1** | match me — Matching subtask
- [ ] **CORE-1.2** | other child — Non-matching subtask
- [ ] **CORE-200** | alone — Unrelated standalone
`;

  it('hides non-matching siblings when an epic is kept for a matching child', async () => {
    const user = userEvent.setup();
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());

    await user.type(screen.getByRole('searchbox'), 'match me');
    await user.click(screen.getByRole('button', { name: 'Expand subtasks' }));

    await waitFor(() => expect(screen.getByText('CORE-1.1')).toBeInTheDocument());
    expect(screen.queryByText('CORE-1.2')).not.toBeInTheDocument();
    expect(screen.queryByText('CORE-200')).not.toBeInTheDocument();
  });

  it('reports matching count from the pruned tree (parent + matching children only)', async () => {
    const user = userEvent.setup();
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());
    // 4 tasks total unfiltered (epic + 2 children + standalone)
    expect(screen.getByText(/4 tasks/)).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox'), 'match me');

    // Pruned set: epic + `CORE-1.1` only → "2 of 4 matching"
    await waitFor(() => expect(screen.getByText(/2 of 4 matching/)).toBeInTheDocument());
  });

  it('still shows every child when no filter is active', async () => {
    const user = userEvent.setup();
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Expand subtasks' }));

    await waitFor(() => expect(screen.getByText('CORE-1.1')).toBeInTheDocument());
    expect(screen.getByText('CORE-1.2')).toBeInTheDocument();
  });
});

describe('App — row StatusChip', () => {
  const plan = `## High

- [ ] **CORE-100** | active — Active task
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      frontmatter: {
        title: 'active',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  it('renders the glyph-only StatusChip in the row', async () => {
    renderApp({ plan, active });
    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(within(screen.getByRole('main')).getByText('●')).toBeInTheDocument();
  });
});

describe('App — Ready filter', () => {
  const plan = `## High

- [ ] **CORE-100** | blocked-open — Still blocked on an open task. Blocked by [[CORE-101]]
- [ ] **CORE-101** | opener — No blockers.
- [ ] **CORE-102** | blocked-closed — Blocker is already done. Blocked by [[CORE-103]]

## Completed

- [x] **CORE-103** | dep — Done dependency.
`;

  it('keeps only open rows whose blockers are all closed, and Esc clears it', async () => {
    const user = userEvent.setup();
    renderApp({ plan });

    // `CORE-103` lives under the (default-collapsed) Completed section, so it's
    // counted but not rendered — only the three High-section rows are in the DOM.
    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.getByText('CORE-101')).toBeInTheDocument();
    expect(screen.getByText('CORE-102')).toBeInTheDocument();
    expect(screen.getByText(/4 tasks/)).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: 'Ready' });
    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    // Ready set: `CORE-101` (no blockers) and `CORE-102` (blocker `CORE-103` closed).
    // Not ready: `CORE-100` (blocker `CORE-101` still open) and `CORE-103` (completed).
    await waitFor(() => expect(screen.queryByText('CORE-100')).not.toBeInTheDocument());
    expect(screen.getByText('CORE-101')).toBeInTheDocument();
    expect(screen.getByText('CORE-102')).toBeInTheDocument();
    expect(screen.getByText(/2 of 4 matching/)).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.getByText(/4 tasks/)).toBeInTheDocument();
  });
});

describe('App — project switching', () => {
  const plan = `## High

- [ ] **CORE-100** | one — Task one
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      frontmatter: {
        title: 'one',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('fetches /api/projects, renders chips, and marks the stored or first project active', async () => {
    window.localStorage.setItem('flaitron-viz-active-project', 'acme');
    renderApp({ plan, active, projects: ['flaitron', 'acme', 'globex'] });

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Project: acme' })).toHaveAttribute(
        'aria-pressed',
        'true',
      ),
    );
    expect(screen.getByRole('button', { name: 'Project: flaitron' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Flaitron — acme');
  });

  it('shows the pinned flaitron version in the header when known', async () => {
    renderApp({
      plan,
      active,
      projects: ['flaitron'],
      projectVersions: { flaitron: 'v5.16.0' },
    });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.getByText(/flaitron v5\.16\.0/)).toBeInTheDocument();
  });

  it('omits the header version segment when the project pin is unknown', async () => {
    renderApp({
      plan,
      active,
      projects: ['flaitron'],
      projectVersions: { flaitron: null },
    });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.queryByText(/· flaitron/)).not.toBeInTheDocument();
  });

  it('falls back to the first project when stored value is unknown', async () => {
    window.localStorage.setItem('flaitron-viz-active-project', 'gone-project');
    renderApp({ plan, active, projects: ['alpha', 'beta'] });

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Project: alpha' })).toHaveAttribute(
        'aria-pressed',
        'true',
      ),
    );
  });

  it('on switch: updates active state, persists to localStorage, and resets filters', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active, projects: ['flaitron', 'acme'] });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.type(screen.getByRole('searchbox'), 'one');
    expect(screen.getByRole('searchbox')).toHaveValue('one');

    await user.click(screen.getByRole('button', { name: 'Project: acme' }));

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Project: acme' })).toHaveAttribute(
        'aria-pressed',
        'true',
      ),
    );
    expect(window.localStorage.getItem('flaitron-viz-active-project')).toBe('acme');
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });
});

describe('App — load() partial failure on project switch', () => {
  const plan = `## High

- [ ] **CORE-100** | one — Task one
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      frontmatter: {
        title: 'one',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('clears stale rows when the new project /api/archive fails', async () => {
    const user = userEvent.setup();
    renderApp({
      plan,
      active,
      projects: ['flaitron', 'acme'],
      perProject: {
        acme: { fail: { archive: 500 } },
      },
    });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Project: acme' }));

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Flaitron — acme'),
    );
    await waitFor(() =>
      expect(screen.getByText(/Archive list failed: HTTP 500/)).toBeInTheDocument(),
    );

    expect(screen.queryByText('CORE-100')).not.toBeInTheDocument();
  });
});

describe('App — model chip row gate', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the 🧠 chip for a fable task in its row (model prefs default-on)', async () => {
    const plan = `## High\n\n- [ ] **CORE-100** [fable] | one — Task one\n`;
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it('renders no chip for a non-heavy (sonnet) task', async () => {
    const plan = `## High\n\n- [ ] **CORE-100** [sonnet] | one — Task one\n`;
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.queryByText('🧠')).not.toBeInTheDocument();
  });
});

describe('App — settings modal', () => {
  const plan = `## High

- [ ] **CORE-100** [opus] | one — Task one [[CORE-200]]
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      goal: 'The goal sentence.',
      subtasks: '- [ ] step a\n- [ ] step b',
      frontmatter: {
        title: 'one',
        status: 'in-progress',
        tags: ['viz', 'ui'],
        created: '2026-05-07',
        due: '2026-06-01',
        relatedTasks: [],
      },
    }),
  ];

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('gear opens the dialog; Done closes it', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.open).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await waitFor(() => expect(dialog.open).toBe(true));

    await user.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(dialog.open).toBe(false));
  });

  it('Escape while the settings modal is open does not clear the search query', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    const searchInput = screen.getByRole('searchbox', { name: 'Search tasks' });
    await user.type(searchInput, 'CORE-100');
    expect(searchInput).toHaveValue('CORE-100');

    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await waitFor(() => expect(dialog.open).toBe(true));

    await user.keyboard('{Escape}');

    expect(searchInput).toHaveValue('CORE-100');
  });

  it('toggling row-chip prefs surfaces hidden chips and hides shown ones', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.queryByText('viz')).not.toBeInTheDocument();
    expect(screen.getByText('🧠')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('checkbox', { name: 'Tags' }));
    await user.click(screen.getByRole('checkbox', { name: 'Model' }));

    await waitFor(() => expect(screen.getByText('viz')).toBeInTheDocument());
    expect(screen.getByText('ui')).toBeInTheDocument();
    expect(screen.queryByText('🧠')).not.toBeInTheDocument();
  });

  it('toggling rowChips.blocked surfaces PLAN blockedBy as a chip (default off)', async () => {
    const user = userEvent.setup();
    const blockedPlan = `## High

- [ ] **CORE-100** [opus] | one — Task one. Blocked by [[CORE-200]]
`;
    renderApp({ plan: blockedPlan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.queryByText('CORE-200')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('checkbox', { name: 'Blocked' }));

    await waitFor(() => expect(screen.getByText('CORE-200')).toBeInTheDocument());
    expect(screen.getByText('⊘')).toBeInTheDocument();
  });

  it('toggling detailSections.subtasks hides the Subtasks section when the row is expanded', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { expanded: false, name: /CORE-100/ }));
    await waitFor(() => expect(screen.getByText('The goal sentence.')).toBeInTheDocument());
    expect(screen.getByText('Subtasks', { selector: 'p' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('checkbox', { name: 'Subtasks' }));

    await waitFor(() =>
      expect(screen.queryByText('Subtasks', { selector: 'p' })).not.toBeInTheDocument(),
    );
    expect(screen.getByText('The goal sentence.')).toBeInTheDocument();
  });

  it('Reset to defaults restores tags OFF / model ON and detail-sections ON', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: true, model: false, related: false, due: false },
        detailSections: { goal: false, acceptance: true, subtasks: true },
      }),
    );
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('viz')).toBeInTheDocument());
    expect(screen.queryByText('🧠')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('button', { name: 'Reset to defaults' }));

    await waitFor(() => expect(screen.queryByText('viz')).not.toBeInTheDocument());
    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it('per-project: switching projects reloads prefs from that project key', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      'flaitron-viz-prefs:acme',
      JSON.stringify({
        version: 1,
        rowChips: { tags: true, model: false, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
      }),
    );
    renderApp({ plan, active, projects: ['flaitron', 'acme'] });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.queryByText('viz')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Project: acme' }));

    await waitFor(() => expect(screen.getByText('viz')).toBeInTheDocument());
  });
});

describe('App — optional YAML planning keys in TaskDetail', () => {
  const plan = `## High

- [ ] **CORE-100** [opus] | one — Task one
`;

  it('shows present YAML keys when the row is expanded', async () => {
    const user = userEvent.setup();
    renderApp({
      plan,
      active: [
        makeTasknote({
          id: 'CORE-100',
          goal: 'The goal sentence.',
          frontmatter: {
            title: 'one',
            status: 'in-progress',
            tags: [],
            created: '2026-05-07',
            relatedTasks: [],
            touches: ['viz/src/tasknote.ts'],
            blockedBy: ['CORE-445.2'],
          },
        }),
      ],
    });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(screen.queryByText('blocked-by')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { expanded: false, name: /CORE-100/ }));
    await waitFor(() => expect(screen.getByText('blocked-by')).toBeInTheDocument());
    expect(screen.getByText('touches')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\[\[CORE-445\.2\]\]/ })).toBeInTheDocument();
  });

  it('renders no planning meta when YAML keys are omitted', async () => {
    const user = userEvent.setup();
    renderApp({
      plan,
      active: [
        makeTasknote({
          id: 'CORE-100',
          goal: 'The goal sentence.',
        }),
      ],
    });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { expanded: false, name: /CORE-100/ }));
    await waitFor(() => expect(screen.getByText('The goal sentence.')).toBeInTheDocument());
    expect(screen.queryByText('blocked-by')).not.toBeInTheDocument();
    expect(screen.queryByText('touches')).not.toBeInTheDocument();
  });
});

describe('App — density modes', () => {
  const plan = `## High

- [ ] **CORE-100** [opus] | one — Task one
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      frontmatter: {
        title: 'one',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  beforeEach(() => {
    window.localStorage.clear();
  });

  const rowPadClasses = (): string => {
    const row = document.getElementById('row-CORE-100');
    const inner = row?.querySelector(':scope > div');
    return inner?.className ?? '';
  };

  it('renders three Density radios in the settings modal', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open settings' }));

    const densityGroup = screen.getByRole('group', { name: 'Density' });
    // One radio per DENSITY_MODES member — the picker maps the registry, it
    // does not keep its own list.
    expect(within(densityGroup).getAllByRole('radio')).toHaveLength(DENSITY_MODES.length);
    const comfortable = within(densityGroup).getByRole('radio', { name: 'Comfortable' });
    const def = within(densityGroup).getByRole('radio', { name: 'Default' });
    const compact = within(densityGroup).getByRole('radio', { name: 'Compact' });
    expect(comfortable).not.toBeChecked();
    expect(def).toBeChecked();
    expect(compact).not.toBeChecked();
  });

  it('selecting Compact tightens row padding', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(rowPadClasses()).toContain('px-2.5 py-1.5');

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('radio', { name: 'Compact' }));

    await waitFor(() => expect(rowPadClasses()).toContain('px-2 py-1'));
    expect(rowPadClasses()).not.toContain('px-2.5');
  });

  it('selecting Comfortable loosens row padding', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('radio', { name: 'Comfortable' }));

    await waitFor(() => expect(rowPadClasses()).toContain('px-3 py-2'));
    expect(rowPadClasses()).not.toContain('px-2.5');
  });

  it('Reset to defaults restores Default density', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 1,
        rowChips: { tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'compact',
      }),
    );
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    await waitFor(() => expect(rowPadClasses()).toContain('px-2 py-1'));

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('button', { name: 'Reset to defaults' }));

    await waitFor(() => expect(rowPadClasses()).toContain('px-2.5 py-1.5'));
  });

  it('per-project: switching projects reloads density from that project key', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      'flaitron-viz-prefs:acme',
      JSON.stringify({
        version: 1,
        rowChips: { tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        density: 'comfortable',
      }),
    );
    renderApp({ plan, active, projects: ['flaitron', 'acme'] });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());
    expect(rowPadClasses()).toContain('px-2.5 py-1.5');

    await user.click(screen.getByRole('button', { name: 'Project: acme' }));

    await waitFor(() => expect(rowPadClasses()).toContain('px-3 py-2'));
  });
});


describe('App — palette modes', () => {
  const plan = `## High

- [ ] **CORE-100** [opus] | one — Task one
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      frontmatter: {
        title: 'one',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders three Palette radios in the settings modal', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open settings' }));

    const paletteGroup = screen.getByRole('group', { name: 'Palette' });
    // One radio per PALETTE_NAMES member.
    expect(within(paletteGroup).getAllByRole('radio')).toHaveLength(PALETTE_NAMES.length);
    const def = within(paletteGroup).getByRole('radio', { name: 'Default' });
    const linear = within(paletteGroup).getByRole('radio', { name: 'Linear' });
    const github = within(paletteGroup).getByRole('radio', { name: 'GitHub' });
    expect(def).toBeChecked();
    expect(linear).not.toBeChecked();
    expect(github).not.toBeChecked();
  });

  it('renders one Starter context checkbox per STARTER_SUBSECTION_KEYS entry', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open settings' }));

    // The Settings fieldset maps the same registry TaskDetail renders from, so
    // the two can no longer disagree about which starter subsections exist.
    const starterGroup = screen.getByRole('group', { name: 'Starter context' });
    expect(within(starterGroup).getAllByRole('checkbox')).toHaveLength(
      STARTER_SUBSECTION_KEYS.length,
    );
  });

  it('selecting Linear checks the Linear radio', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.click(screen.getByRole('radio', { name: 'Linear' }));

    await waitFor(() => expect(screen.getByRole('radio', { name: 'Linear' })).toBeChecked());
  });

  it('Reset to defaults restores Default palette', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      'flaitron-viz-prefs:flaitron',
      JSON.stringify({
        version: 2,
        rowChips: { id: true, tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        starterSections: { whyExists: true, solutionShape: true, filesToTouch: true, outOfScope: true },
        density: 'default',
        palette: 'linear',
      }),
    );
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    expect(screen.getByRole('radio', { name: 'Linear' })).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Reset to defaults' }));

    await waitFor(() => expect(screen.getByRole('radio', { name: 'Linear' })).not.toBeChecked());
  });

  it('per-project: switching projects reloads palette from that project key', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      'flaitron-viz-prefs:acme',
      JSON.stringify({
        version: 2,
        rowChips: { id: true, tags: false, model: true, related: false, due: false },
        detailSections: { goal: true, acceptance: true, subtasks: true },
        starterSections: { whyExists: true, solutionShape: true, filesToTouch: true, outOfScope: true },
        density: 'default',
        palette: 'linear',
      }),
    );
    renderApp({ plan, active, projects: ['flaitron', 'acme'] });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Project: acme' }));

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Project: acme' })).toHaveAttribute(
        'aria-pressed',
        'true',
      ),
    );

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await waitFor(() => expect(screen.getByRole('radio', { name: 'Linear' })).toBeChecked());
  });
});

describe('App — [!critical] flag', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('floats [!critical] rows to the top of the High column (list view)', async () => {
    const plan = `## High

- [ ] **CORE-1** | normal-a — Normal task A
- [ ] **CORE-2** [!critical] | urgent — Urgent task
- [ ] **CORE-3** | normal-b — Normal task B
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-2')).toBeInTheDocument());

    const ids = Array.from(document.querySelectorAll('[id^="row-CORE-"]')).map(
      (el) => el.id,
    );
    expect(ids).toEqual(['row-CORE-2', 'row-CORE-1', 'row-CORE-3']);
  });

  it('renders the critical chip on flagged rows and not on unflagged rows', async () => {
    const plan = `## High

- [ ] **CORE-1** | normal — Normal task
- [ ] **CORE-2** [!critical] | urgent — Urgent task
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-2')).toBeInTheDocument());

    const urgentRow = document.getElementById('row-CORE-2')!;
    const normalRow = document.getElementById('row-CORE-1')!;
    expect(within(urgentRow).getByLabelText('Critical')).toBeInTheDocument();
    expect(within(normalRow).queryByLabelText('Critical')).toBeNull();
  });

  it('omits the Critical column from the board (no longer a Priority value)', async () => {
    window.localStorage.setItem('flaitron-viz-view', 'board');
    const plan = `## High

- [ ] **CORE-1** [!critical] | urgent — Urgent
- [ ] **CORE-2** | normal — Normal

## Medium

- [ ] **CORE-3** | med — Medium task
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-1')).toBeInTheDocument());

    const boardContainer = document.querySelector('.overflow-x-auto') as HTMLElement;
    expect(boardContainer).not.toBeNull();
    const columnLabels = Array.from(
      boardContainer.querySelectorAll('section > button > span:nth-child(2)'),
    ).map((el) => el.textContent);
    expect(columnLabels).toEqual(['High', 'Medium']);
    expect(columnLabels).not.toContain('Critical');
  });

  it('soft-migrates a legacy `## Critical` heading: rows render in High with the chip', async () => {
    const plan = `## Critical

- [ ] **CORE-99** | legacy-urgent — Legacy critical row

## High

- [ ] **CORE-100** | normal — Routine row
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-99')).toBeInTheDocument());

    const ids = Array.from(document.querySelectorAll('[id^="row-CORE-"]')).map(
      (el) => el.id,
    );
    expect(ids).toEqual(['row-CORE-99', 'row-CORE-100']);

    const legacyRow = document.getElementById('row-CORE-99')!;
    expect(within(legacyRow).getByLabelText('Critical')).toBeInTheDocument();
  });
});

describe('App — shortcuts modal', () => {
  const plan = `## High

- [ ] **CORE-100** | one — Task one
`;
  const active = [
    makeTasknote({
      id: 'CORE-100',
      frontmatter: {
        title: 'one',
        status: 'in-progress',
        tags: [],
        created: '2026-05-07',
        relatedTasks: [],
      },
    }),
  ];

  it('? button opens the dialog; Done closes it', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    const dialogs = document.querySelectorAll('dialog');
    const shortcutsDialog = Array.from(dialogs).find(
      (d) => d.getAttribute('aria-labelledby') === 'shortcuts-modal-title',
    ) as HTMLDialogElement;
    expect(shortcutsDialog.open).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Keyboard shortcuts' }));
    await waitFor(() => expect(shortcutsDialog.open).toBe(true));

    await user.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(shortcutsDialog.open).toBe(false));
  });

  it('pressing ? key opens the dialog', async () => {
    const user = userEvent.setup();
    renderApp({ plan, active });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    const dialogs = document.querySelectorAll('dialog');
    const shortcutsDialog = Array.from(dialogs).find(
      (d) => d.getAttribute('aria-labelledby') === 'shortcuts-modal-title',
    ) as HTMLDialogElement;
    expect(shortcutsDialog.open).toBe(false);

    await user.keyboard('?');
    await waitFor(() => expect(shortcutsDialog.open).toBe(true));
  });
});

describe('App — unparsed-line diagnostics', () => {
  const plan = `## High

- [ ] **CORE-100** | fine — Parses fine.
- [ ] *CORE-101* | broken — Single-asterisk ID fails TASK_LINE.
`;

  it('shows the "N unparsed" badge and the offending line text', async () => {
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    expect(screen.getByText(/1 unparsed/)).toBeInTheDocument();
    expect(
      screen.getByText(/1 line in PLAN\.md looks like a task but failed to parse/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/L4: - \[ \] \*CORE-101\* \| broken/),
    ).toBeInTheDocument();
  });

  it('renders no badge or strip when every task line parses', async () => {
    renderApp({ plan: '## High\n\n- [ ] **CORE-100** | fine — Parses fine.\n' });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    expect(screen.queryByText(/unparsed/)).not.toBeInTheDocument();
    expect(screen.queryByText(/failed to parse/)).not.toBeInTheDocument();
  });
});

describe('App — duplicate-epic diagnostics', () => {
  const plan = `## Medium

- [ ] **CORE-EPIC-421** | dup epic — Filed once under Medium.

## Low

- [ ] **CORE-EPIC-421** | dup epic — Same ID re-filed under Low.
`;

  it('shows the "N duplicate epics" badge and the duplicated ID', async () => {
    renderApp({ plan });

    await waitFor(() => expect(screen.getAllByText('CORE-EPIC-421').length).toBeGreaterThan(0));

    expect(screen.getByText(/1 duplicate epic/)).toBeInTheDocument();
    expect(
      screen.getByText(/1 epic ID appears under more than one PLAN\.md heading/),
    ).toBeInTheDocument();
  });

  it('keeps the epic under its first heading, not duplicated in both', async () => {
    renderApp({ plan });

    await waitFor(() => expect(screen.getAllByText('CORE-EPIC-421').length).toBeGreaterThan(0));

    // One row instance (`row-CORE-EPIC-421`) plus one mention in the
    // diagnostic strip's list — never a second row for the dropped duplicate.
    expect(document.querySelectorAll('#row-CORE-EPIC-421')).toHaveLength(1);
  });

  it('renders no badge or strip when no epic ID is duplicated', async () => {
    renderApp({ plan: '## High\n\n- [ ] **CORE-EPIC-421** | fine — Filed once.\n' });

    await waitFor(() => expect(screen.getByText('CORE-EPIC-421')).toBeInTheDocument());

    expect(screen.queryByText(/duplicate epic/)).not.toBeInTheDocument();
  });
});

describe('App — near-miss heading diagnostics', () => {
  const plan = `## medium

- [ ] **CORE-100** | dropped — Under a typo'd heading.

## High

- [ ] **CORE-101** | fine — Parses normally.
`;

  it('shows the "N near-miss headings" badge and the offending heading', async () => {
    renderApp({ plan });

    await waitFor(() => expect(screen.getByText('CORE-101')).toBeInTheDocument());

    expect(screen.getByText(/1 near-miss heading/)).toBeInTheDocument();
    expect(
      screen.getByText(/1 PLAN\.md heading looks like a typo'd priority section/),
    ).toBeInTheDocument();
    expect(screen.getByText(/L1: "medium" \(did you mean "Medium"\?\)/)).toBeInTheDocument();
    expect(screen.queryByText('CORE-100')).not.toBeInTheDocument();
  });

  it('renders no badge or strip when every heading matches exactly', async () => {
    renderApp({ plan: '## High\n\n- [ ] **CORE-100** | fine — Parses fine.\n' });

    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    expect(screen.queryByText(/near-miss heading/)).not.toBeInTheDocument();
  });
});

function sectionHeadingOf(id: string): string | null {
  const row = document.getElementById(`row-${id}`);
  return (
    row?.closest('section')?.querySelector('button > span.text-base')?.textContent ?? null
  );
}

describe('App — SSE disconnect visibility', () => {
  const plan = '## High\n\n- [ ] **CORE-100** | fine — Parses fine.\n';
  const esRegistry = () =>
    (globalThis.EventSource as unknown as { instances: { emit(t: string): void }[] })
      .instances;

  beforeEach(() => {
    esRegistry().length = 0;
  });

  it('shows no chip or banner while the stream is live', async () => {
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    expect(screen.queryByText(/live updates off/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Live updates disconnected/)).not.toBeInTheDocument();
  });

  it('shows the chip and banner on a drop, and clears both on reconnect', async () => {
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-100')).toBeInTheDocument());

    const instances = esRegistry();
    const es = instances[instances.length - 1]!;
    await act(async () => {
      es.emit('error');
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(screen.getByText(/live updates off/)).toBeInTheDocument();
    expect(screen.getByText(/Live updates disconnected/)).toBeInTheDocument();

    await act(async () => {
      es.emit('open');
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(screen.queryByText(/live updates off/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Live updates disconnected/)).not.toBeInTheDocument();
  });
});

describe('App — completed-bucket grouping', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders a top-level [x] row in Completed even when its heading is still Medium', async () => {
    const plan = `## Medium

- [x] **CORE-1** | done — Completed 2026-08-01.
- [ ] **CORE-2** | open — Still open
`;
    const user = userEvent.setup();
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-2')).toBeInTheDocument());
    expect(sectionHeadingOf('CORE-2')).toBe('Medium');

    // Completed starts collapsed (useBoardSelection); its rows aren't mounted
    // until expanded.
    await user.click(screen.getByRole('button', { name: /^Completed/ }));
    await waitFor(() => expect(screen.getByText('CORE-1')).toBeInTheDocument());
    expect(sectionHeadingOf('CORE-1')).toBe('Completed');
  });

  it('keeps a mixed epic in its heading; completed children stay nested, not top-level Completed', async () => {
    const plan = `## Medium

- [ ] **CORE-EPIC-1** | epic — Parent still open
- [x] **CORE-1.1** | done-child — Completed 2026-08-01.
- [ ] **CORE-1.2** | open-child — Still open
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-EPIC-1')).toBeInTheDocument());

    expect(sectionHeadingOf('CORE-EPIC-1')).toBe('Medium');
    expect(sectionHeadingOf('CORE-1.1')).toBe('Medium');
    expect(document.getElementById('row-CORE-1.1')?.closest('#row-CORE-EPIC-1')).not.toBeNull();
  });

  it('evicts a checked Medium row from the board Medium column into below-board Completed', async () => {
    window.localStorage.setItem('flaitron-viz-view', 'board');
    const plan = `## High

- [ ] **CORE-3** | high — High task

## Medium

- [x] **CORE-1** | done — Completed 2026-08-01.
- [ ] **CORE-2** | open — Still open
`;
    const user = userEvent.setup();
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-2')).toBeInTheDocument());

    const boardContainer = document.querySelector('.overflow-x-auto') as HTMLElement;
    expect(boardContainer).not.toBeNull();
    expect(within(boardContainer).queryByText('CORE-1')).toBeNull();
    expect(within(boardContainer).getByText('CORE-2')).toBeInTheDocument();

    // Completed (below-board) starts collapsed; expand before checking its row.
    await user.click(screen.getByRole('button', { name: /^Completed/ }));
    await waitFor(() => expect(sectionHeadingOf('CORE-1')).toBe('Completed'));
  });

  it('navigateToTask uncollapses Completed when jumping to a checked standalone still filed under Medium', async () => {
    const scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    const user = userEvent.setup();
    const plan = `## Medium

- [x] **CORE-1** | done — Completed 2026-08-01.

## High

- [ ] **CORE-2** | jumper — Has [[CORE-1]] in related.
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-2')).toBeInTheDocument());

    // Completed starts collapsed, so `CORE-1`'s row isn't mounted yet — locate
    // the section's own toggle by its header text instead of via the
    // (not-yet-rendered) row.
    const completedToggle = screen.getByRole('button', { name: /^Completed/ });
    expect(completedToggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('button', { name: /CORE-2/, expanded: false }));
    const wikilink = await screen.findByRole('button', { name: /\[\[CORE-1\]\]/ });
    await user.click(wikilink);

    await waitFor(() => expect(completedToggle).toHaveAttribute('aria-expanded', 'true'));
    await waitFor(() =>
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' }),
    );
  });
});

describe('App — App-level characterization gaps', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('the view-mode toggle group carries correct aria-pressed and clicking Board switches the view and persists the choice', async () => {
    const user = userEvent.setup();
    const plan = `## High

- [ ] **CORE-1** | one — Task one
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-1')).toBeInTheDocument());

    const group = screen.getByRole('group', { name: 'View mode' });
    const listButton = within(group).getByRole('button', { name: 'List' });
    const boardButton = within(group).getByRole('button', { name: 'Board' });
    expect(listButton).toHaveAttribute('aria-pressed', 'true');
    expect(boardButton).toHaveAttribute('aria-pressed', 'false');
    expect(document.querySelector('.overflow-x-auto')).toBeNull();

    await user.click(boardButton);

    await waitFor(() => expect(document.querySelector('.overflow-x-auto')).not.toBeNull());
    expect(boardButton).toHaveAttribute('aria-pressed', 'true');
    expect(listButton).toHaveAttribute('aria-pressed', 'false');
    expect(window.localStorage.getItem('flaitron-viz-view')).toBe('board');
  });

  it('shows "No tasks in this project" in list view when every priority section is empty', async () => {
    const plan = `## High
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('No tasks in this project')).toBeInTheDocument());
  });

  it('shows "No tasks in: <sections>" in list view when only some priority sections are empty', async () => {
    const plan = `## High

- [ ] **CORE-1** | one — Task one

## Medium

- [ ] **CORE-2** | two — Task two
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-2')).toBeInTheDocument());
    expect(
      screen.getByText('No tasks in: Low · Future Opportunities · Completed'),
    ).toBeInTheDocument();
  });

  it('shows "No matches. Press Esc to clear filters." when a query filter matches nothing', async () => {
    const user = userEvent.setup();
    const plan = `## High

- [ ] **CORE-1** | one — Task one
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-1')).toBeInTheDocument());

    await user.type(screen.getByRole('searchbox'), 'no-such-task');

    await waitFor(() =>
      expect(
        screen.getByText('No matches. Press Esc to clear filters.'),
      ).toBeInTheDocument(),
    );
  });

  it('pluralizes the header starter suffix and omits it when there are no starters', async () => {
    const plan = `## High

- [ ] **CORE-1** | one — Task one
- [ ] **CORE-2** | two — Task two
`;
    const active = [
      makeTasknote({
        id: 'CORE-1',
        frontmatter: {
          title: 'one',
          status: 'starter',
          tags: [],
          created: '2026-05-07',
          relatedTasks: [],
        },
      }),
    ];
    renderApp({ plan, active });
    await waitFor(() => expect(screen.getByText(/1 starter\b/)).toBeInTheDocument());
    expect(screen.queryByText(/starters/)).not.toBeInTheDocument();
  });

  it('shows the plural header starter suffix for more than one starter', async () => {
    const plan = `## High

- [ ] **CORE-1** | one — Task one
- [ ] **CORE-2** | two — Task two
`;
    const active = [
      makeTasknote({
        id: 'CORE-1',
        frontmatter: {
          title: 'one',
          status: 'starter',
          tags: [],
          created: '2026-05-07',
          relatedTasks: [],
        },
      }),
      makeTasknote({
        id: 'CORE-2',
        frontmatter: {
          title: 'two',
          status: 'starter',
          tags: [],
          created: '2026-05-07',
          relatedTasks: [],
        },
      }),
    ];
    renderApp({ plan, active });
    await waitFor(() => expect(screen.getByText(/2 starters/)).toBeInTheDocument());
  });

  it('omits the starter suffix entirely when no tasknote has starter status', async () => {
    const plan = `## High

- [ ] **CORE-1** | one — Task one
`;
    renderApp({ plan });
    await waitFor(() => expect(screen.getByText('CORE-1')).toBeInTheDocument());
    expect(screen.queryByText(/starter/)).not.toBeInTheDocument();
  });

  it('renders the error banner when the active project fails to load', async () => {
    const plan = `## High

- [ ] **CORE-1** | one — Task one
`;
    renderApp({
      plan,
      perProject: {
        flaitron: { fail: { plan: 500 } },
      },
    });

    await waitFor(() =>
      expect(screen.getByText('PLAN.md fetch failed: HTTP 500')).toBeInTheDocument(),
    );
  });
});
