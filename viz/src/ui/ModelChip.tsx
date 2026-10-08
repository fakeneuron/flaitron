import React from 'react';
import type { TaskModel } from '../parser';

// Tier sets that draw a chip, per SPEC/model.md §"Tier ladder vs. the
// next-move suggestion glyph". Medium and light stay glyph-free.
// Frontier concrete tokens bucket here; no concrete token buckets to xheavy.
const FRONTIER_MODELS = new Set(['fable', 'mythos', 'frontier']);
const HEAVY_MODELS = new Set(['opus', 'heavy']);
const XHEAVY_MODELS = new Set(['xheavy']);

export const ModelChip: React.FC<{ model: TaskModel }> = ({ model }) => {
  if (XHEAVY_MODELS.has(model)) return <span className="text-xs">🔭</span>;
  if (FRONTIER_MODELS.has(model)) return <span className="text-xs">💎</span>;
  if (HEAVY_MODELS.has(model)) return <span className="text-xs">🧠</span>;
  return null;
};
