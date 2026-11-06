// Self-test for tools/drift-checks.sh (CORE-739.3).
// Zero-dep: node:test. Each check gets one seeded drift in a temp copy of this
// checkout, and must exit non-zero with its own finding line. A VACUOUS or
// other wrong-reason failure does not satisfy a case. The live repo's own
// drift is the CI `drift` job's business, so no case asserts a clean baseline.

import assert from 'node:assert/strict';
import { execFile, execFileSync } from 'node:child_process';
import { cpSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, afterEach, before, beforeEach, describe, it } from 'node:test';
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
  skill_name_invariant: {
    seed: () => write('claude/skills/ft-zz-drift/SKILL.md', '---\nname: ft-zz-old\n---\n'),
    finding: /^NAME MISMATCH {2}claude\/skills\/ft-zz-drift\/SKILL\.md :: name: ft-zz-old$/m,
  },
  shipped_skill_parity: {
    seed: () => write('codex/skills/zz-drift/SKILL.md', '---\nname: zz-drift\n---\n'),
    finding: /^\+zz-drift$/m,
  },
  skill_pin_guard_parity: {
    seed: () => edit('claude/skills/ft-seed-unattended/SKILL.md', (s) => s.replace('**Skill/pin guard.** ', '**Skill/pin guard.** zz ')),
    finding: /^GUARD DRIFT {2}copies-per-variant: (1 5|5 1) /m, // one copy seeded off the other five
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
  brand_nearmiss: {
    seed: () => edit('README.md', (s) => `${s}\nflatiron flatron flaitrn flaitorn flaiton flaytron fliatron falitron flaitrone flaitronn flaitrons\n`),
    finding: /^BRAND NEAR MISS {2}README\.md:[0-9]+:flatiron flatron flaitrn flaitorn flaiton flaytron fliatron falitron flaitrone flaitronn flaitrons$/m,
  },
  brand_casing: {
    seed: () => edit('README.md', (s) => `${s}\nFlaitron is built with flaitron.\n`),
    finding: /^BRAND CASING {2}README\.md:[0-9]+:Flaitron is built with flaitron\.$/m,
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
  installer_anchors: {
    // The ft-adopt marker install.sh greps for loses its exact text.
    seed: () => edit('claude/skills/ft-adopt/SKILL.md', (s) => s.replaceAll('Installer exception', 'Installer exemption')),
    finding: /^INSTALLER ANCHOR {2}claude\/skills\/ft-adopt\/SKILL\.md lacks 'Installer exception'$/m,
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
    seed: () => edit('claude/skills/ft-task/SKILL.md', (s) => `${s}\nAlso \`/ft-task --zz-drift\`.\n`),
    finding: /^MISSING HINT FLAG ft-task --zz-drift$/m,
  },
  pair_m: {
    seed: () => edit('claude/skills/ft-task/SKILL.md', (s) => s.replace(/^(argument-hint:.*)$/m, '$1 [--zz-drift]')),
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
  pair_s: {
    // The flags bullet is hard-wrapped in AGENTS.md and one line in the
    // paste block. The seed changes the normalized text, not the wrap.
    seed: () => edit('AGENTS.md', (s) => s.replace(
      'take `--unattended` too.',
      'take `--unattended` too. --zz-drift',
    )),
    finding: /^-.*--zz-drift/m,
  },
  pair_t: {
    // Drops one `tools/` line from the recipe body; AGENTS.md stays put.
    seed: () => edit('justfile', (s) => s.replace('    node --check tools/update-adopters.mjs\n', '')),
    finding: [/^CHECK DRIFT /m, /^-node --check tools\/update-adopters\.mjs$/m],
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

// An isolated git fixture keeps clean-input assertions independent of live
// roadmap prose and verifies tracked/untracked selection explicitly.
describe('brand near-miss matching', () => {
  let fixture;
  const source = readFileSync(join(REPO, SCRIPT), 'utf8');
  const variants = ['flatiron', 'flatron', 'flaitrn', 'flaitorn', 'flaiton', 'flaytron', 'fliatron', 'falitron', 'flaitrone', 'flaitronn', 'flaitrons'];
  before(() => {
    fixture = mkdtempSync(join(tmpdir(), 'brand-check-'));
    mkdirSync(join(fixture, 'tools'));
    writeFileSync(join(fixture, SCRIPT), source);
    writeFileSync(join(fixture, 'tools/drift-checks.test.mjs'), variants.join(' '));
    execFileSync('git', ['init', '-q'], { cwd: fixture });
    writeFileSync(join(fixture, 'copy with spaces.md'), 'flaitron Flaitron FLAITRON flaitronSpec prefixflatiron flatironSuffix _flatiron flatiron_\n');
    writeFileSync(join(fixture, 'image.bin'), Buffer.from('\0flatiron\n'));
    execFileSync('git', ['add', '.'], { cwd: fixture });
    writeFileSync(join(fixture, 'untracked.md'), variants.join(' '));
  });
  after(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

  it('accepts correct names and substrings and skips sources, binaries and untracked files', () => {
    const out = execFileSync('bash', [SCRIPT, 'brand_nearmiss'], { cwd: fixture, encoding: 'utf8' });
    assert.equal(out, 'brand_nearmiss ok\n');
  });

  it('rejects every standalone spelling in mixed case with punctuation and path/line evidence', () => {
    for (const variant of variants) {
      const text = `(${variant.toUpperCase()}), ${variant}\n`;
      writeFileSync(join(fixture, 'copy with spaces.md'), text);
      assert.throws(
        () => execFileSync('bash', [SCRIPT, 'brand_nearmiss'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' }),
        (e) => e.status === 1 && e.stdout === `BRAND NEAR MISS  copy with spaces.md:1:${text}brand_nearmiss FAILED\n`,
        variant,
      );
    }
  });

  // The git grep prefilter reads a symlink's link text, so the check must
  // still read a tracked symlink through to its target (CORE-869.2).
  it('reads a tracked symlink through to its target', () => {
    writeFileSync(join(fixture, 'copy with spaces.md'), 'flatiron\n');
    symlinkSync('copy with spaces.md', join(fixture, 'link.md'));
    execFileSync('git', ['add', 'link.md'], { cwd: fixture });
    try {
      assert.throws(
        () => execFileSync('bash', [SCRIPT, 'brand_nearmiss'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' }),
        (e) => e.status === 1 && e.stdout === 'BRAND NEAR MISS  copy with spaces.md:1:flatiron\nBRAND NEAR MISS  link.md:1:flatiron\nbrand_nearmiss FAILED\n',
      );
    } finally {
      execFileSync('git', ['rm', '-q', '--cached', 'link.md'], { cwd: fixture });
      rmSync(join(fixture, 'link.md'));
    }
  });
});

// pair_p reads the whole archive in one awk pass (CORE-869.2): per-note state
// must reset at each note, and a note's findings print in note order even
// though its stamp is read last. The fixture holds only the archive.
describe('pair_p across notes', () => {
  let fixture;
  const A = '.flaitron/tasknote/archive/core';
  before(() => {
    fixture = mkdtempSync(join(tmpdir(), 'pair-p-'));
    mkdirSync(join(fixture, 'tools'));
    writeFileSync(join(fixture, SCRIPT), readFileSync(join(REPO, SCRIPT), 'utf8'));
    mkdirSync(join(fixture, A), { recursive: true });
    const note = (status, box, stamp) => `---\nstatus: ${status}\n---\n## ✅ Acceptance\n\n${box}\n\n## 🧩 Subtasks\n\n- [ ] sub\n\n**Archived:** ${stamp}\n`;
    writeFileSync(join(fixture, A, 'ZZ-1.md'), note('in-progress', '- [ ] bare', '2026-10-01'));
    writeFileSync(join(fixture, A, 'ZZ-2.md'), note('completed', '- [x] done', '2026-10-01'));
    writeFileSync(join(fixture, A, 'ZZ-3.md'), note('in-progress', '- [ ] old', '2026-09-19'));
    writeFileSync(join(fixture, A, 'ZZ-4.md'), note('completed', '- [ ] N/A — dropped', '2026-10-01'));
    writeFileSync(join(fixture, A, 'ZZ-5.md'), note('completed', '- [ ] late', '2026-10-01'));
    // Unstamped, and stamped twice across the floor: the first stamp decides.
    writeFileSync(join(fixture, A, 'ZZ-6.md'), note('in-progress', '- [ ] unstamped', 'YYYY-MM-DD'));
    writeFileSync(join(fixture, A, 'ZZ-7.md'), `${note('in-progress', '- [ ] restamped', '2026-09-19')}\n**Archived:** 2026-10-01\n`);
  });
  after(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

  it('reports each post-floor note in order, status before boxes, and resets per note', () => {
    assert.throws(
      () => execFileSync('bash', [SCRIPT, 'pair_p'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' }),
      (e) => e.status === 1 && e.stdout === [
        `STATUS NOT COMPLETED  ${A}/ZZ-1.md`,
        `UNANNOTATED BOX  ${A}/ZZ-1.md  - [ ] bare`,
        `UNANNOTATED BOX  ${A}/ZZ-5.md  - [ ] late`,
        'pair_p FAILED',
        '',
      ].join('\n'),
    );
  });
});

// context_budget's NEAR CAP line (CORE-869.3): 95% up to the cap, in all three
// row shapes (exact, glob, `/**` total), never failing the check. The fixture
// holds only the Budgets table and the surfaces it names.
describe('context_budget near-cap report', () => {
  let fixture;
  const put = (rel, size) => {
    mkdirSync(dirname(join(fixture, rel)), { recursive: true });
    writeFileSync(join(fixture, rel), 'x'.repeat(size));
  };
  const rows = ['| `exact.md` | 100 |', '| `g/*.md` | 100 |', '| `d/**` | 100 |'];
  const run = () => execFileSync('bash', [SCRIPT, 'context_budget'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' });
  beforeEach(() => {
    fixture = mkdtempSync(join(tmpdir(), 'context-budget-'));
    mkdirSync(join(fixture, 'tools'));
    writeFileSync(join(fixture, SCRIPT), readFileSync(join(REPO, SCRIPT), 'utf8'));
    mkdirSync(join(fixture, 'docs'));
    writeFileSync(join(fixture, 'docs/CONTEXT-BUDGET.md'), `## Budgets\n\n| Surface | Budget |\n|---|---|\n${rows.join('\n')}\n\n## Known over budget\n`);
  });
  afterEach(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

  it('prints NEAR CAP from 95% to the cap and exits 0, in every row shape', () => {
    put('exact.md', 95); // exactly 95%
    put('g/hit.md', 100); // at the cap, not over it
    put('g/clear.md', 94); // below 95%
    put('d/a', 60);
    put('d/b', 36); // directory total 96
    assert.equal(run(), [
      'NEAR CAP  exact.md  95 of 100 (95%)',
      'NEAR CAP  g/hit.md  100 of 100 (100%)',
      'NEAR CAP  d/**  96 of 100 (96%)',
      'context_budget ok',
      '',
    ].join('\n'));
  });

  it('stays silent below 95% and prints OVER BUDGET, not NEAR CAP, above the cap', () => {
    put('exact.md', 94);
    put('g/over.md', 101);
    put('d/a', 10);
    assert.throws(run, (e) => e.status === 1 && /^OVER BUDGET {2}g\/over\.md +101 > 100\ncontext_budget FAILED\n$/.test(e.stdout)); // BSD wc pads the count
  });
});

// The installer's three anchors, one at a time, against the real install.sh
// (CORE-868.2). The fixture holds only what the check reads.
describe('installer anchor matching', () => {
  let fixture;
  const source = readFileSync(join(REPO, SCRIPT), 'utf8');
  const AGENTS = { claude: '.claude/skills', codex: '.agents/skills', cursor: '.cursor/skills', grok: '.grok/skills' };
  const run = () => execFileSync('bash', [SCRIPT, 'installer_anchors'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' });
  const fails = (out) => (e) => e.status === 1 && e.stdout === `${out}\ninstaller_anchors FAILED\n`;
  const put = (rel, text) => {
    mkdirSync(dirname(join(fixture, rel)), { recursive: true });
    writeFileSync(join(fixture, rel), text);
  };
  beforeEach(() => {
    fixture = mkdtempSync(join(tmpdir(), 'installer-anchors-'));
    put(SCRIPT, source);
    put('install.sh', readFileSync(join(REPO, 'install.sh'), 'utf8'));
    put('SPEC.md', '# flaitron — Workflow Specification\n');
    put('claude/skills/ft-adopt/SKILL.md', '**Installer exception.** continue\n');
    for (const [a, d] of Object.entries(AGENTS)) {
      put(`${a}/AGENTS-snippet.md`, `\`\`\`sh\nln -s ../../.flaitron/core/${a}/skills/ft-task ${d}/ft-task\n\`\`\`\n`);
    }
  });
  afterEach(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

  it('accepts both heading casings, four rosters and the marker', () => {
    assert.equal(run(), 'installer_anchors ok\n');
    put('SPEC.md', '# Flaitron — Workflow Specification\n'); // a pre-CORE-863 pin
    assert.equal(run(), 'installer_anchors ok\n');
  });

  it('rejects a SPEC.md line 1 is_flaitron_tree refuses', () => {
    put('SPEC.md', '# flaitron - Workflow Specification\n');
    assert.throws(run, fails('INSTALLER ANCHOR  SPEC.md line 1 fails is_flaitron_tree :: # flaitron - Workflow Specification'));
  });

  it('rejects a snippet whose ln -s block wire_project cannot read, in its own words', () => {
    // The link lands in another agent's dir, so the awk keeps no line.
    put('grok/AGENTS-snippet.md', '```sh\nln -s ../../.flaitron/core/grok/skills/ft-task .claude/skills/ft-task\n```\n');
    assert.throws(run, fails('INSTALLER ANCHOR  grok/AGENTS-snippet.md :: no ln -s roster for .grok/skills in .flaitron/core/grok/AGENTS-snippet.md'));
  });

  it('rejects a snippet install.sh does not map to an agent', () => {
    put('zz/AGENTS-snippet.md', '```sh\n```\n');
    assert.throws(run, fails("INSTALLER ANCHOR  zz/AGENTS-snippet.md :: agent_snippet zz names ''"));
  });

  it('rejects a deleted snippet install.sh still maps, in its own words', () => {
    rmSync(join(fixture, 'grok/AGENTS-snippet.md'));
    assert.throws(run, fails('INSTALLER ANCHOR  grok/AGENTS-snippet.md :: pinned snippet missing: .flaitron/core/grok/AGENTS-snippet.md'));
  });

  it('fails ANCHOR UNREAD on a second ft-adopt marker grep', () => {
    const src = readFileSync(join(REPO, 'install.sh'), 'utf8');
    const line = src.split('\n').find((l) => l.includes("grep -q 'Installer exception'"));
    put('install.sh', src.replace(line, `${line.replace('Installer exception', 'zz-other')}\n    :\n  fi\n${line}`));
    assert.throws(run, fails('ANCHOR UNREAD  install.sh has no single ft-adopt marker grep'));
  });

  it('rejects an ft-adopt body without the marker', () => {
    put('claude/skills/ft-adopt/SKILL.md', '**Installer carve-out.** continue\n');
    assert.throws(run, fails("INSTALLER ANCHOR  claude/skills/ft-adopt/SKILL.md lacks 'Installer exception'"));
  });

  it('fails ANCHOR UNREAD when install.sh no longer has a parsed function', () => {
    put('install.sh', readFileSync(join(REPO, 'install.sh'), 'utf8').replace('\nwire_project() {\n', '\nwire_all() {\n'));
    assert.throws(run, fails('ANCHOR UNREAD  install.sh has no wire_project()'));
  });
});

// Same isolated-fixture shape for the casing rule (brand/BRAND.md §"Name casing").
describe('brand casing matching', () => {
  let fixture;
  const source = readFileSync(join(REPO, SCRIPT), 'utf8');
  const run = () => execFileSync('bash', [SCRIPT, 'brand_casing'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' });
  before(() => {
    fixture = mkdtempSync(join(tmpdir(), 'brand-casing-'));
    mkdirSync(join(fixture, 'tools'));
    writeFileSync(join(fixture, SCRIPT), source);
    writeFileSync(join(fixture, 'tools/drift-checks.test.mjs'), 'Flaitron\n');
    mkdirSync(join(fixture, '.flaitron/tasknote/archive/core'), { recursive: true });
    writeFileSync(join(fixture, '.flaitron/tasknote/archive/core/ZZ-1.md'), 'Flaitron\n');
    writeFileSync(join(fixture, '.flaitron/PLAN-ARCHIVE.md'), 'Flaitron\n');
    execFileSync('git', ['init', '-q'], { cwd: fixture });
    writeFileSync(
      join(fixture, 'copy with spaces.md'),
      'flaitron FLAITRON .flaitron/core FLAITRON_HOME cachedFlaitronFile _Flaitron Flaitron_ Flaitrons\n' +
        'url = Org/Flaitron.git // brand-casing: fixture\n',
    );
    writeFileSync(join(fixture, 'image.bin'), Buffer.from('\0Flaitron\n'));
    execFileSync('git', ['add', '.'], { cwd: fixture });
    writeFileSync(join(fixture, 'untracked.md'), 'Flaitron\n');
  });
  after(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

  it('accepts both casings, identifiers, marked lines, history, sources, binaries and untracked files', () => {
    assert.equal(run(), 'brand_casing ok\n');
  });

  it('rejects every other casing, at line start and after a good occurrence', () => {
    // The last two: a backticked marker is a mention, not a mark; two bad
    // occurrences still report the line once.
    for (const text of ['Flaitron leads.', 'flaitron, then (fLAITRON).', 'end: FlaiTron', 'Flaitron: mark with `brand-casing: fixture`', 'Flaitron and FLAItron']) {
      writeFileSync(join(fixture, 'copy with spaces.md'), `ok\n${text}\n`);
      assert.throws(run, (e) => e.status === 1 && e.stdout === `BRAND CASING  copy with spaces.md:2:${text}\nbrand_casing FAILED\n`, text);
    }
  });
});
