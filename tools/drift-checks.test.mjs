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
  plan_placeholder: {
    // Silent: `## Medium` reduced to a space-padded `(none)`, and an empty
    // non-priority section. Reported: an emptied `## Low`, `## Future
    // Opportunities` holding prose but no task row, a `(none)` left above
    // `## Completed`'s rows, and `## High` renamed out of the set.
    seed: () => edit('.flaitron/PLAN.md', (s) => {
      const body = (t, name, text) => t.replace(new RegExp(`(^## ${name}\\n)[\\s\\S]*?(?=^## )`, 'm'), `$1${text}`);
      let t = body(s, 'Medium', '\n  (none)  \n\n');
      t = body(t, 'Low', '\n\n');
      t = body(t, 'Future Opportunities', '\nzz-drift prose, no row.\n\n## Zz Notes\n\n');
      return t.replace(/^## Completed\n/m, '$&\n(none)\n').replace(/^## High$/m, '## High priority');
    }),
    // No `m` flag: the whole output, so a decoy that reports fails the case.
    finding: new RegExp(
      '^EMPTY SECTION {2}\\.flaitron/PLAN\\.md :: ## Low\\n' +
        'EMPTY SECTION {2}\\.flaitron/PLAN\\.md :: ## Future Opportunities\\n' +
        'STALE PLACEHOLDER {2}\\.flaitron/PLAN\\.md :: ## Completed\\n' +
        'MISSING SECTION {2}\\.flaitron/PLAN\\.md :: ## High\\n' +
        'plan_placeholder FAILED\\n$',
    ),
  },
  handoff_rows: {
    // Silent: a cite in a nested item, a bold-ID cite paragraph, an aliased
    // wikilink, "none deferred", a code-span heading, "pre-handoff", a fenced
    // heading, and a grandfathered note. Reported: a block citing only its
    // own note (a real row), a "to be completed" heading, and an epic child
    // citing only its parent epic (a real row).
    seed: () => {
      edit('.flaitron/PLAN.md', (s) =>
        `${s}- [ ] **ZZ-9** | zz-drift — operator step.\n- [ ] **ZZ-5** | zz-drift — x.\n- [ ] **ZZ-EPIC-7** | zz-drift — x.\n`);
      write('.flaitron/tasknote/archive/core/ZZ-5.md', [
        '# ZZ-5 | zz-drift', '',
        '- **Operator hand-off:**', '  - deploy **ZZ-9**', '',
        '**Operator hand-off:**', '', '**ZZ-9** deploy prod', '',
        '**Operator hand-off:** filed as [[ZZ-9|deploy row]].', '',
        '**Operator hand-off:** none deferred.', '',
        '### What `[handoff]` declares', '',
        '## Visual smoke (pre-handoff)', '',
        '## 🔄 Handoff', '', 'Run the deploy by hand ([[ZZ-5]] is this note).', '',
        '## Handoff (to be completed by operator)', '', 'Run it.', '',
        '```', '## Handoff', '```', '', '**Archived:** 2099-01-01', '',
      ].join('\n'));
      write('.flaitron/tasknote/archive/core/ZZ-6.md', '## Handoff\n\nRun it.\n\n**Archived:** 2026-01-01\n');
      write('.flaitron/tasknote/archive/core/ZZ-7.2.md', '## Handoff\n\nSee [[ZZ-EPIC-7]].\n\n**Archived:** 2099-01-01\n');
    },
    // No `m` flag: the whole output, so a decoy that reports fails the case.
    finding: new RegExp(
      '^UNFILED HANDOFF {2}\\.flaitron/tasknote/archive/core/ZZ-5\\.md:18 :: ## 🔄 Handoff\\n' +
        'UNFILED HANDOFF {2}\\.flaitron/tasknote/archive/core/ZZ-5\\.md:22 :: ## Handoff \\(to be completed by operator\\)\\n' +
        'UNFILED HANDOFF {2}\\.flaitron/tasknote/archive/core/ZZ-7\\.2\\.md:1 :: ## Handoff\\n' +
        'File each step[^\\n]*\\nhandoff_rows FAILED\\n$',
    ),
  },
  installer_anchors: {
    // The ft-adopt marker install.sh greps for loses its exact text.
    seed: () => edit('claude/skills/ft-adopt/SKILL.md', (s) => s.replaceAll('Installer exception', 'Installer exemption')),
    finding: /^INSTALLER ANCHOR {2}claude\/skills\/ft-adopt\/SKILL\.md lacks 'Installer exception'$/m,
  },
  supply_chain: {
    // install.sh: an env-prefixed command, a statement behind a one-line
    // function, an indented closer that reopens a function, and a statement
    // after main. Workflows: a job-level write-all, a dropped permissions
    // block, a mutable action tag, and (CORE-910) release fetches: a new
    // unpinned step whose only pin and verify sit in comments (and in the
    // next step), a fetch in another job at the same step position as a
    // pinned one, a verify dropped from the gitleaks step, and the shellcheck
    // pin dropped. CORE-911 adds a `releases/latest/download` URL and a
    // `gh release download`, each failing outright, beside two comment lines
    // naming them that must trip nothing. CORE-907 adds a multi-line quoted
    // install.sh assignment and a zz.yml with `uses :`, `"uses":`, a quoted
    // `"permissions":`, a next-line permissions scalar (under comments ending
    // in block indicators, which open no block), a null permissions and a
    // uses after a block body, beside `uses:` and `permissions:` text in `run:` values
    // that must trip nothing. None of the seeded commands runs.
    seed: () => {
      edit('install.sh', (s) => s.replace(/^USER_AGENT=.*\n/m, "$&ZZ_ML='a\nb'\n"));
      write(
        '.github/workflows/zz.yml',
        [
          'on: push', 'permissions:', '  contents: read', 'jobs:', '  a:', '    "permissions": write-all', '    steps:',
          '      - uses : zz/a@v1', '      - "uses": zz/b@v1', '      - run: echo uses: zz/c@v1',
          '      - run: |', '          echo "uses: zz/d@v1"', '          permissions: write-all', '        uses: zz/e@main',
          '  b:   # note: |', '    permissions:   # see: >', '      write-all', '  c:', '    permissions:', '',
        ].join('\n'),
      );
      edit('install.sh', (s) => s.replace(/^USER_AGENT=.*\n/m, '$&ZZ=1 echo zz-env\nzz() { :; }; echo zz-fn #}\n'));
      edit('install.sh', (s) => s.replace(/^usage\(\) \{\n/m, '$&  :; } ; echo zz-close; zz2() {\n'));
      edit('install.sh', (s) => `${s}echo zz-drift\n`);
      edit('.github/workflows/arch-health.yml', (s) => s.replace(/^( +)permissions:\n +issues: write$/m, '$1permissions: write-all'));
      edit('.github/workflows/ci.yml', (s) => s.replace(/^permissions:\n( .*\n)+/m, ''));
      edit('.github/workflows/ci.yml', (s) => s.replace(/(actions\/checkout)@[0-9a-f]{40}/, '$1@v5'));
      edit('.github/workflows/ci.yml', (s) =>
        s.replace(
          '      - name: Secret scan (gitleaks)\n',
          `      - name: zz fetch\n        run: curl -fsSL -o "$RUNNER_TEMP/zz" https://github.com/zz/zz/releases/download/v1/zz\n        # ZZ_SHA256: '${'0'.repeat(64)}'\n        # sha256sum -c\n$&`,
        ),
      );
      edit('.github/workflows/ci.yml', (s) =>
        s.replace(
          '  secret-scan:\n',
          '  zz-job:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo zz-a\n      - run: echo zz-b\n      - run: curl -fsSL -o "$RUNNER_TEMP/zz2" https://github.com/zz/zz2/releases/download/v1/zz2\n$&',
        ),
      );
      edit('.github/workflows/ci.yml', (s) => s.replace(/^ +echo "\$\{GITLEAKS_SHA256\}.*\n/m, ''));
      edit('.github/workflows/install-test.yml', (s) => s.replace(/^ +SHELLCHECK_SHA256:.*\n/m, ''));
      edit('.github/workflows/install-test.yml', (s) =>
        s.replace(
          '      - name: shellcheck (POSIX sh)\n',
          '      - name: zz latest\n        run: curl -fsSL -o "$RUNNER_TEMP/zz3" https://github.com/zz/zz3/releases/latest/download/zz3\n' +
            '      - name: zz gh\n        run: gh release download v1 --repo zz/zz4 --pattern zz4\n' +
            '        # gh release download v1 --repo zz/zz5 (a comment trips nothing)\n' +
            '        # https://github.com/zz/zz6/releases/latest/download/zz6\n$&',
        ),
      );
    },
    finding: new RegExp(
      '^INSTALL TOPLEVEL {2}install\\.sh:\\d+ :: ZZ=1 echo zz-env\\n' +
        'INSTALL TOPLEVEL {2}install\\.sh:\\d+ :: echo zz-fn\\n' +
        'INSTALL TOPLEVEL {2}install\\.sh:\\d+ :: echo zz-close\\n' +
        'INSTALL TOPLEVEL {2}install\\.sh:\\d+ :: echo zz-drift\\n' +
        'INSTALL MAIN NOT LAST {2}install\\.sh :: [^\\n]*\\n' +
        'INSTALL LAST LINE {2}install\\.sh :: not main "\\$@"\\n' +
        'BROAD PERMISSIONS {2}\\.github/workflows/arch-health\\.yml:\\d+ :: permissions: write-all\\n' +
        'NO PERMISSIONS {2}\\.github/workflows/ci\\.yml\\n' +
        'UNPINNED ACTION {2}\\.github/workflows/ci\\.yml:\\d+ :: - uses: actions/checkout@v5( #[^\\n]*)?\\n' +
        'NO SHA256 PIN {2}\\.github/workflows/ci\\.yml:\\d+ :: - run: curl [^\\n]*/zz/zz2/releases/download/[^\\n]*\\n' +
        'NO SHA256 VERIFY {2}\\.github/workflows/ci\\.yml:\\d+ :: - run: curl [^\\n]*/zz/zz2/releases/download/[^\\n]*\\n' +
        'NO SHA256 PIN {2}\\.github/workflows/ci\\.yml:\\d+ :: run: curl [^\\n]*/zz/zz/releases/download/[^\\n]*\\n' +
        'NO SHA256 VERIFY {2}\\.github/workflows/ci\\.yml:\\d+ :: run: curl [^\\n]*/zz/zz/releases/download/[^\\n]*\\n' +
        'NO SHA256 VERIFY {2}\\.github/workflows/ci\\.yml:\\d+ :: curl [^\\n]*/gitleaks/gitleaks/releases/download/[^\\n]*\\n' +
        'LATEST RELEASE FETCH {2}\\.github/workflows/install-test\\.yml:\\d+ :: run: curl [^\\n]*/zz/zz3/releases/latest/download/zz3\\n' +
        'GH RELEASE FETCH {2}\\.github/workflows/install-test\\.yml:\\d+ :: run: gh release download v1 [^\\n]*\\n' +
        'NO SHA256 PIN {2}\\.github/workflows/install-test\\.yml:\\d+ :: curl [^\\n]*/koalaman/shellcheck/releases/download/[^\\n]*\\n' +
        'BROAD PERMISSIONS {2}\\.github/workflows/zz\\.yml:6 :: "permissions": write-all\\n' +
        'BROAD PERMISSIONS {2}\\.github/workflows/zz\\.yml:17 :: write-all\\n' +
        'BROAD PERMISSIONS {2}\\.github/workflows/zz\\.yml:19 :: permissions: \\(null\\)\\n' +
        'UNPINNED ACTION {2}\\.github/workflows/zz\\.yml:8 :: - uses : zz/a@v1\\n' +
        'UNPINNED ACTION {2}\\.github/workflows/zz\\.yml:9 :: - "uses": zz/b@v1\\n' +
        'UNPINNED ACTION {2}\\.github/workflows/zz\\.yml:14 :: uses: zz/e@main\\n',
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
    // Both halves: a checked stub row with no shortname pipe, and an unchecked,
    // pipe-less one (nested, as epic children are) that still carries the stub tail (CORE-873).
    seed: () => {
      edit('.flaitron/PLAN-ARCHIVE.md', (s) => `${s}- [x] **ZZ-1** Completed 2026-01-01.\n`);
      edit('.flaitron/PLAN.md', (s) => `${s}\n  - [ ] **ZZ-2.1** Completed 2026-01-01.\n`);
    },
    finding: [
      /^NO SHORTNAME {2}\.flaitron\/PLAN-ARCHIVE\.md :: - \[x\] \*\*ZZ-1\*\* Completed 2026-01-01\.$/m,
      /^UNCHECKED STUB {2}\.flaitron\/PLAN\.md ::\s+- \[ \] \*\*ZZ-2\.1\*\* Completed 2026-01-01\.$/m,
    ],
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
  snippet_roster_parity: {
    // One grok line keeps its slug but wires into cursor's directory, as a
    // block copied across platforms would: a bad line, and a slug gone.
    seed: () => edit('grok/AGENTS-snippet.md', (s) => s.replace(' .grok/skills/ft-refactor\n', ' .cursor/skills/ft-refactor\n')),
    finding: [
      /^BAD WIRING {2}grok\/AGENTS-snippet\.md :: ln -s \.\.\/\.\.\/\.flaitron\/core\/claude\/skills\/ft-refactor \.cursor\/skills\/ft-refactor$/m,
      /^ROSTER DRIFT {2}grok\/AGENTS-snippet\.md$/m,
      /^-ft-refactor$/m,
    ],
  },
  coverage_pin: {
    // Moves ci.yml's pin and floor without the justfile, whatever they read.
    seed: () => edit('.github/workflows/ci.yml', (s) => s
      .replace(/DIFF_COVER_VERSION: '[^']+'/, "DIFF_COVER_VERSION: '0.0.0-zz'")
      .replace(/COVERAGE_MIN: '[0-9]+'/, "COVERAGE_MIN: '999'")),
    finding: [
      /^PIN DRIFT {2}diff-cover {2}justfile \S+ vs ci\.yml 0\.0\.0-zz$/m,
      /^PIN DRIFT {2}coverage-min {2}justfile [0-9]+ vs ci\.yml 999$/m,
    ],
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

// handoff_rows skips fenced lines by the rules SPEC/fixtures/fence/cases.json
// pins (CORE-922). The awk reports only unfiled blocks, so each case's plain
// word lines become `## Hand-off` probe headings in one archived note: the
// probes it reports must be exactly the unfenced ones.
describe('handoff_rows fence cases', () => {
  let fixture;
  const A = '.flaitron/tasknote/archive/core';
  const { cases } = JSON.parse(readFileSync(join(REPO, 'SPEC/fixtures/fence/cases.json'), 'utf8'));
  const want = [];
  before(() => {
    fixture = mkdtempSync(join(tmpdir(), 'handoff-fence-'));
    mkdirSync(join(fixture, 'tools'));
    writeFileSync(join(fixture, SCRIPT), readFileSync(join(REPO, SCRIPT), 'utf8'));
    mkdirSync(join(fixture, A), { recursive: true });
    writeFileSync(join(fixture, '.flaitron/PLAN.md'), '- [ ] **ZZ-0** | zz — x.\n');
    writeFileSync(join(fixture, '.flaitron/PLAN-ARCHIVE.md'), '');
    cases.forEach((c, k) => {
      const note = `${A}/ZZ-${k + 1}.md`;
      const body = c.lines.map((l, i) => {
        if (!/^[a-z]+$/.test(l)) return l;
        if (!c.mask[i]) want.push(`UNFILED HANDOFF  ${note}:${i + 2} :: ## Hand-off ${l}`);
        return `## Hand-off ${l}`;
      });
      writeFileSync(join(fixture, note), ['**Archived:** 2099-01-01', ...body, ''].join('\n'));
    });
  });
  after(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

  it('reports exactly the unfenced probes', () => {
    assert.ok(cases.length > 0 && want.length > 0);
    assert.throws(
      () => execFileSync('bash', [SCRIPT, 'handoff_rows'], { cwd: fixture, encoding: 'utf8', stdio: 'pipe' }),
      (e) => {
        assert.equal(e.status, 1);
        assert.deepEqual(e.stdout.split('\n').filter((l) => l.startsWith('UNFILED')).sort(), [...want].sort());
        return true;
      },
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

  // A row's own `NEAR CAP at N%` moves its line (CORE-891); unmarked rows keep 95%.
  it('honours a per-row NEAR CAP at N% override in every row shape', () => {
    const marked = ['| `exact.md` | 100 | sized small; NEAR CAP at 98% |', '| `g/*.md` | 100 | NEAR CAP at 97% |', '| `d/**` | 100 | NEAR CAP at 99% |', '| `e/**` | 100 | NEAR CAP at 99% |', '| `plain.md` | 100 | no token |'];
    writeFileSync(join(fixture, 'docs/CONTEXT-BUDGET.md'), `## Budgets\n\n| Surface | Budget | Why |\n|---|---|---|\n${marked.join('\n')}\n\n## Known over budget\n`);
    put('exact.md', 97); // under its 98% line, though over the default 95%
    put('g/hit.md', 97); // exactly its 97% line
    put('g/quiet.md', 96); // under its 97% line
    put('d/a', 99); // exactly its 99% line
    put('e/a', 98); // under its 99% line
    put('plain.md', 95); // unmarked row after marked ones: default 95% holds
    assert.equal(run(), [
      'NEAR CAP  g/hit.md  97 of 100 (97%)',
      'NEAR CAP  d/**  99 of 100 (99%)',
      'NEAR CAP  plain.md  95 of 100 (95%)',
      'context_budget ok',
      '',
    ].join('\n'));
  });

  it('fails a NEAR CAP at N% override outside 1 to 99', () => {
    const bad = ['| `a.md` | 100 | NEAR CAP at 100% |', '| `b.md` | 100 | NEAR CAP at 097% |', '| `c.md` | 100 | NEAR CAP at 0% |', '| `ok.md` | 100 | NEAR CAP at 97% |']; // ok.md keeps the read non-vacuous
    writeFileSync(join(fixture, 'docs/CONTEXT-BUDGET.md'), `## Budgets\n\n| Surface | Budget | Why |\n|---|---|---|\n${bad.join('\n')}\n\n## Known over budget\n`);
    for (const f of ['a.md', 'b.md', 'c.md', 'ok.md']) put(f, 50);
    assert.throws(run, (e) => e.status === 1 && e.stdout === 'BAD NEAR CAP  a.md  100%\nBAD NEAR CAP  b.md  097%\nBAD NEAR CAP  c.md  0%\ncontext_budget FAILED\n');
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
