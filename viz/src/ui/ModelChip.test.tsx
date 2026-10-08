import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { ModelChip } from './ModelChip';

afterEach(() => {
  cleanup();
});

describe('ModelChip — 🧠 heavy-model glyph', () => {
  it('renders 🧠 for opus', () => {
    render(<ModelChip model="opus" />);
    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it('renders 🧠 for the heavy category token', () => {
    render(<ModelChip model="heavy" />);
    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it.each(['sonnet', 'grok', 'haiku', 'medium', 'light'])(
    'renders nothing for %s',
    (model) => {
      render(<ModelChip model={model} />);
      expect(screen.queryByText('🧠')).toBeNull();
      expect(screen.queryByText('💎')).toBeNull();
      expect(screen.queryByText('🔭')).toBeNull();
    }
  );
});

describe('ModelChip — 💎 frontier-model glyph', () => {
  it.each(['frontier', 'fable', 'mythos'])('renders 💎 for %s', (model) => {
    render(<ModelChip model={model} />);
    expect(screen.getByText('💎')).toBeInTheDocument();
    expect(screen.queryByText('🧠')).toBeNull();
    expect(screen.queryByText('🔭')).toBeNull();
  });

  it('does not render 💎 for the heavy or xheavy category tokens', () => {
    render(<ModelChip model="heavy" />);
    expect(screen.queryByText('💎')).toBeNull();
    cleanup();
    render(<ModelChip model="xheavy" />);
    expect(screen.queryByText('💎')).toBeNull();
    expect(screen.getByText('🔭')).toBeInTheDocument();
  });
});

describe('ModelChip — 🔭 xheavy-model glyph', () => {
  it('renders 🔭 for the xheavy category token', () => {
    render(<ModelChip model="xheavy" />);
    expect(screen.getByText('🔭')).toBeInTheDocument();
  });

  it('does not render 🧠 for xheavy', () => {
    render(<ModelChip model="xheavy" />);
    expect(screen.queryByText('🧠')).toBeNull();
  });

  it('does not render 🔭 for the heavy category token', () => {
    render(<ModelChip model="heavy" />);
    expect(screen.queryByText('🔭')).toBeNull();
  });
});
