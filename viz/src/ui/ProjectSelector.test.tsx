import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProjectSelector } from './ProjectSelector';

afterEach(() => {
  cleanup();
});

describe('ProjectSelector', () => {
  it('renders a chip per project and marks the active one pressed', () => {
    render(
      React.createElement(ProjectSelector, {
        projects: ['alpha', 'beta', 'gamma'],
        active: 'beta',
        onSelect: () => {},
      }),
    );

    expect(screen.getByRole('button', { name: 'Project: alpha', pressed: false })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Project: beta', pressed: true })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Project: gamma', pressed: false })).toBeTruthy();
  });

  it('calls onSelect with the clicked project name', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      React.createElement(ProjectSelector, {
        projects: ['alpha', 'beta'],
        active: 'alpha',
        onSelect,
      }),
    );

    await user.click(screen.getByRole('button', { name: 'Project: beta' }));

    expect(onSelect).toHaveBeenCalledWith('beta');
  });

  it('renders a green dot for a project at the latest release and a red dot for one behind', () => {
    render(
      React.createElement(ProjectSelector, {
        projects: ['fresh', 'stale'],
        active: 'fresh',
        onSelect: () => {},
        versions: { fresh: 'v5.6.0', stale: 'v5.4.0' },
        latestRelease: 'v5.6.0',
      }),
    );

    const fresh = screen.getByRole('button', {
      name: 'Project: fresh (flaitron up to date, v5.6.0)',
    });
    expect(fresh.querySelector('[data-currency="current"]')).toBeTruthy();
    expect(fresh.querySelector('[data-currency="behind"]')).toBeNull();

    const stale = screen.getByRole('button', {
      name: 'Project: stale (flaitron outdated: v5.4.0, latest v5.6.0)',
    });
    expect(stale.querySelector('[data-currency="behind"]')).toBeTruthy();
    expect(stale.querySelector('[data-currency="current"]')).toBeNull();
  });

  it('renders no dot when the version or latest release is unknown', () => {
    render(
      React.createElement(ProjectSelector, {
        projects: ['mystery', 'pinned'],
        active: 'mystery',
        onSelect: () => {},
        versions: { mystery: null, pinned: 'v5.6.0' },
        latestRelease: null,
      }),
    );

    for (const name of ['mystery', 'pinned']) {
      const chip = screen.getByRole('button', { name: `Project: ${name}` });
      expect(chip.querySelector('[data-currency]')).toBeNull();
    }
  });

  it('renders nothing when the project list is empty', () => {
    const { container } = render(
      React.createElement(ProjectSelector, {
        projects: [],
        active: null,
        onSelect: () => {},
      }),
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders no overflow toggle at or below the visible threshold', () => {
    render(
      React.createElement(ProjectSelector, {
        projects: ['p1', 'p2', 'p3', 'p4', 'p5'],
        active: 'p1',
        onSelect: () => {},
      }),
    );

    expect(screen.getByRole('button', { name: 'Project: p5' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /more projects/ })).toBeNull();
  });

  it('collapses projects past the visible threshold behind a "+N" toggle', () => {
    render(
      React.createElement(ProjectSelector, {
        projects: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
        active: 'p1',
        onSelect: () => {},
      }),
    );

    expect(screen.getByRole('button', { name: 'Project: p1' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Project: p5' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Project: p6' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Project: p7' })).toBeNull();
    expect(screen.getByRole('button', { name: '2 more projects' })).toBeTruthy();
  });

  it('pins the active project into the visible set when it would otherwise overflow', () => {
    render(
      React.createElement(ProjectSelector, {
        projects: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
        active: 'p7',
        onSelect: () => {},
      }),
    );

    expect(
      screen.getByRole('button', { name: 'Project: p7', pressed: true }),
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Project: p4' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '2 more projects' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Project: p5' })).toBeNull();
  });

  it('opens the overflow dropdown and selects a project from it', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      React.createElement(ProjectSelector, {
        projects: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
        active: 'p1',
        onSelect,
      }),
    );

    await user.click(screen.getByRole('button', { name: '2 more projects' }));
    const menu = screen.getByRole('group', { name: 'More projects' });
    const p6 = within(menu).getByRole('button', { name: 'Project: p6' });
    await user.click(p6);

    expect(onSelect).toHaveBeenCalledWith('p6');
    expect(screen.queryByRole('group', { name: 'More projects' })).toBeNull();
  });

  it('closes the overflow dropdown on Escape', async () => {
    const user = userEvent.setup();
    render(
      React.createElement(ProjectSelector, {
        projects: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
        active: 'p1',
        onSelect: () => {},
      }),
    );

    await user.click(screen.getByRole('button', { name: '2 more projects' }));
    expect(screen.getByRole('group', { name: 'More projects' })).toBeTruthy();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('group', { name: 'More projects' })).toBeNull();
  });

  it('closes the overflow dropdown on outside click', async () => {
    const user = userEvent.setup();
    render(
      React.createElement('div', null, [
        React.createElement(ProjectSelector, {
          key: 'selector',
          projects: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
          active: 'p1',
          onSelect: () => {},
        }),
        React.createElement('button', { key: 'outside' }, 'outside'),
      ]),
    );

    await user.click(screen.getByRole('button', { name: '2 more projects' }));
    expect(screen.getByRole('group', { name: 'More projects' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('group', { name: 'More projects' })).toBeNull();
  });
});
