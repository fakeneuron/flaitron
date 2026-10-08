// Self-test for tools/drift-checks.sh (CORE-739.3).
// Zero-dep: node:test. Each check gets one seeded drift in a temp copy of this
// checkout, and must exit non-zero with its own finding line. A VACUOUS or
// other wrong-reason failure does not satisfy a case. The live repo's own
// drift is the CI `drift` job's business, so no case asserts a clean baseline.

import assert from 'node:assert/strict';
import { execFile, execFileSync } from 'node:child_process';
import { cpSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, afterEach, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const REPO = fileURLToPath(new URL('..', import.meta.url));
const SCRIPT = 'tools/drift-checks.sh';

let copy;

function write(rel, text) {
  mkdirSync(dirname(join(copy, rel)), { recursive: true });
  writeFileSync(join(copy, rel), text);
}

function edit(rel, fn) {
  const old = readFileSync(join(copy, rel), 'utf8');
  const next = fn(old);
  assert.notEqual(next, old, `seed did not change ${rel}`);
  writeFileSync(join(copy, rel), next);
}

// One seeded drift per check: `seed` mutates the copy, `finding` is the line
// the check must print. Keys are the check (function) names.
const CASES = {
  wrapper_name_invariant: {
    seed: () => write('claude/commands/ft-zz-drift.md', 'A stub that never names itself.\n'),
    finding: /^NO SELF-NAME {2}claude\/commands\/ft-zz-drift\.md$/m,
  },
  shipped_skill_parity: {
    seed: () => write('codex/skills/zz-drift/SKILL.md', '---\nname: zz-drift\n---\n'),
    finding: /^\+zz-drift$/m,
  },
  skill_pin_guard_parity: {
    seed: () => edit('claude/skills/ft-seed/SKILL.md', (s) => s.replace('**Skill/pin guard.** ', '**Skill/pin guard.** zz ')),
    finding: /^GUARD DRIFT {2}copies-per-variant: (1 6|6 1) /m, // one copy seeded off the other six
  },
  context_budget: {
    // The first non-glob Budgets row drops to a 1-byte budget.
    seed: () => edit('docs/CONTEXT-BUDGET.md', (s) => {
      const at = s.indexOf('\n## Budgets\n');
      return s.slice(0, at) + s.slice(at).replace(/^(\| `[^`*]+` \| )[0-9,]+ \|/m, '$11 |');
    }),
    finding: /^OVER BUDGET {2}\S+ +\d+ > 1$/m, // BSD wc pads the count
  },
  final_newline: {
    seed: () => edit('README.md', (s) => s.replace(/\n+$/, '')),
    finding: /^NO FINAL NEWLINE {2}README\.md$/m,
  },
  sidequest_orphan: {
    // One closed row per PLAN file: a rotated row, and a nested epic child.
    // Then one stub beside an active tasknote and one beside an archived one,
    // neither with a closed row.
    seed: () => {
      edit('.flaitron/PLAN-ARCHIVE.md', (s) => `${s}- [x] **ZZ-1** | zz-drift — Completed 2026-01-01.\n`);
      edit('.flaitron/PLAN.md', (s) => `${s}  - [x] **ZZ-2.1** | zz-drift — Completed 2026-01-01.\n`);
      write('.flaitron/sidequest/ZZ-1.md', '# ZZ-1 | zz-drift\n');
      write('.flaitron/sidequest/ZZ-2.1.md', '# ZZ-2.1 | zz-drift\n');
      write('.flaitron/sidequest/ZZ-3.md', '# ZZ-3 | zz-drift\n');
      write('.flaitron/tasknote/ZZ-3.md', 'status: in-progress\n');
      write('.flaitron/sidequest/ZZ-4.md', '# ZZ-4 | zz-drift\n');
      write('.flaitron/tasknote/archive/core/ZZ-4.md', 'status: completed\n');
    },
    finding: new RegExp(
      '^ORPHANED STUB {2}\\.flaitron/sidequest/ZZ-1\\.md\\n' +
        'ORPHANED STUB {2}\\.flaitron/sidequest/ZZ-2\\.1\\.md\\n' +
        'PROMOTED STUB {2}\\.flaitron/sidequest/ZZ-3\\.md {2}\\(tasknote \\.flaitron/tasknote/ZZ-3\\.md\\)\\n' +
        'PROMOTED STUB {2}\\.flaitron/sidequest/ZZ-4\\.md {2}\\(tasknote \\.flaitron/tasknote/archive/core/ZZ-4\\.md\\)$',
      'm',
    ),
  },
  skill_frontmatter_yaml: {
    // Undo CORE-744's quoting: the shipped `: ` shape returns.
    seed: () => edit('claude/skills/ft-close-epic/SKILL.md', (s) => s.replace(/^description: '(.*)'$/m, 'description: $1')),
    finding: /^BAD FRONTMATTER {2}claude\/skills\/ft-close-epic\/SKILL\.md :: description: Close /m,
  },
  pair_b: {
    seed: () => edit('codex/skills/ft-task/SKILL.md', (s) => s.replace(/^(description:.*)$/m, '$1 --zz-drift')),
    finding: /^MISMATCH ft-task \| .*codex:\[[^\]]*--zz-drift/m,
  },
  pair_c: {
    seed: () => write('templates/zz-drift.md', '[← PLAN.md](../../PLAN.md)\n'),
    finding: /^templates\/zz-drift\.md:1:/m,
  },
  pair_h: {
    seed: () => edit('.github/workflows/ci.yml', (s) => s.replace('      - run: npm --prefix viz ci\n', '$&      - run: echo zz-drift\n')),
    finding: /^\+echo zz-drift$/m,
  },
  pair_j: {
    seed: () => edit('claude/commands/ft-task.md', (s) => `${s}\nAlso \`/ft-task --zz-drift\`.\n`),
    finding: /^MISSING HINT FLAG ft-task --zz-drift$/m,
  },
  pair_m: {
    seed: () => edit('claude/commands/ft-task.md', (s) => s.replace(/^(argument-hint:.*)$/m, '$1 [--zz-drift]')),
    finding: /^UNDOCUMENTED FLAG ft-task --zz-drift$/m,
  },
  pair_n: {
    seed: () => write('claude/skills/zz-drift/notes.md', 'Reads SPEC/unattended-candidacy.md and emits nothing.\n'),
    finding: /^NO CANDIDATES LITERAL {2}claude\/skills\/zz-drift\/notes\.md$/m,
  },
  pair_o: {
    seed: () => write('claude/skills/zz-drift/notes.md', 'Set auto-commit = true and never read the index.\n'),
    finding: /^NO POST-STAGE DIFF {2}claude\/skills\/zz-drift\/notes\.md$/m,
  },
  pair_p: {
    seed: () => write('.flaitron/tasknote/archive/core/ZZ-1.md', 'status: in-progress\n\n**Archived:** 2026-10-01\n'),
    finding: /^STATUS NOT COMPLETED {2}\.flaitron\/tasknote\/archive\/core\/ZZ-1\.md$/m,
  },
  pair_q: {
    // One single-line stale citation, and one whose quoted title wraps onto an
    // indented, blockquoted continuation line that carries a second stale
    // citation of its own (CORE-749): both halves of the fold must report.
    seed: () =>
      edit(
        'README.md',
        (s) =>
          `${s}\nSee \`SPEC.md\` §"Zz Drift Nowhere".\n\n> See \`SPEC.md\` §"Zz Wrapped\n>   Nowhere" and \`SPEC.md\` §"Zz Tail Nowhere".\n`,
      ),
    finding: [
      /^STALE SECTION {2}README\.md — SPEC\.md §"Zz Drift Nowhere"$/m,
      /^STALE SECTION {2}README\.md — SPEC\.md §"Zz Wrapped Nowhere"$/m,
      /^STALE SECTION {2}README\.md — SPEC\.md §"Zz Tail Nowhere"$/m,
    ],
  },
  pair_r: {
    seed: () => edit('.flaitron/PLAN-ARCHIVE.md', (s) => `${s}- [x] **ZZ-1** Completed 2026-01-01.\n`),
    finding: /^NO SHORTNAME {2}\.flaitron\/PLAN-ARCHIVE\.md :: - \[x\] \*\*ZZ-1\*\* Completed 2026-01-01\.$/m,
  },
};

describe('drift-checks.sh self-test', () => {
  before(() => {
    // Tracked + untracked-not-ignored files, as `git ls-files -co` lists them
    // (CORE-739.2's recipe); a tracked file deleted in the worktree is skipped.
    // The copy gets its own git index: final_newline and pair_q read tracked
    // files, and without one they fail VACUOUS instead of on the seed.
    copy = mkdtempSync(join(tmpdir(), 'drift-self-test-'));
    const files = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '-z'], { cwd: REPO, encoding: 'utf8' })
      .split('\0')
      // An untracked nested repo is listed as `dir/`; it is not a check input.
      .filter((f) => f && !f.endsWith('/') && lstatSync(join(REPO, f), { throwIfNoEntry: false }));
    for (const f of new Set(files)) {
      mkdirSync(dirname(join(copy, f)), { recursive: true });
      cpSync(join(REPO, f), join(copy, f), { verbatimSymlinks: true });
    }
    execFileSync('git', ['init', '-q'], { cwd: copy });
    execFileSync('git', ['add', '-A', '-f'], { cwd: copy }); // -f: keep force-added tracked files tracked
  });

  after(() => {
    if (copy) rmSync(copy, { recursive: true, force: true });
  });

  afterEach(() => {
    execFileSync('git', ['checkout', '--', '.'], { cwd: copy });
    execFileSync('git', ['clean', '-fdqx'], { cwd: copy });
  });

  it('has exactly one case per check', () => {
    // The dispatcher's own function-name regex (drift-checks.sh, `fns=`).
    const src = readFileSync(join(REPO, SCRIPT), 'utf8');
    const checks = [...src.matchAll(/^([a-z][a-z0-9_]*)\(\) \{$/gm)].map((m) => m[1]);
    assert.deepEqual([...checks].sort(), Object.keys(CASES).sort());
  });

  it('floors every check but the two the header exempts', () => {
    // The header's rule: each check fails `VACUOUS <name>` on zero examined.
    const EXEMPT = ['skill_pin_guard_parity', 'pair_h'];
    const src = readFileSync(join(REPO, SCRIPT), 'utf8');
    const bodies = [...src.matchAll(/^([a-z][a-z0-9_]*)\(\) \{$\n([\s\S]*?)^\}$/gm)];
    const checks = [...src.matchAll(/^([a-z][a-z0-9_]*)\(\) \{$/gm)].map((m) => m[1]);
    assert.deepEqual(bodies.map((m) => m[1]), checks, 'a body regex truncated or swallowed a check');
    const unfloored = bodies
      .filter(([, name, body]) => !EXEMPT.includes(name) && !new RegExp(`^[^#\\n]*VACUOUS ${name}\\b.*exit 1`, 'm').test(body))
      .map(([, name]) => name);
    assert.deepEqual(unfloored, [], 'checks without a `VACUOUS <name>` floor');
    for (const name of EXEMPT) assert.ok(bodies.some((m) => m[1] === name), `exempt check ${name} no longer exists`);
  });

  for (const [check, { seed, finding }] of Object.entries(CASES)) {
    it(`${check} fails on its seeded drift`, async () => {
      seed();
      const r = await execFileAsync('bash', [SCRIPT, check], { cwd: copy }).then(
        ({ stdout, stderr }) => ({ code: 0, stdout: stdout + stderr }),
        (e) => ({ code: e.code, stdout: (e.stdout ?? '') + (e.stderr ?? '') }),
      );
      assert.equal(r.code, 1, `${check} exited ${r.code}:\n${r.stdout}`);
      assert.match(r.stdout, new RegExp(`^${check} FAILED$`, 'm'));
      for (const f of [finding].flat()) assert.match(r.stdout, f, `${check} failed without its finding:\n${r.stdout}`);
      assert.doesNotMatch(r.stdout, /^VACUOUS /m);
    });
  }
});
