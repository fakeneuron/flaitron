# Codex verification

CORE-677.2 installation receipt, 2026-10-01. This is a dated observation,
not a second install roster. Canonical commands remain in
[codex/AGENTS-snippet.md](../codex/AGENTS-snippet.md); policy remains in
[PLATFORMS.md](PLATFORMS.md#installed-surface-policy).

Fresh Codex discovery now exposes all 12 shipped wrappers in the self-host
checkout and the eight expected repo skills in an isolated pinned adopter.
Repair installed 12 repo-scoped links and retired 16 verified Flowtron-owned
global links. The two discretionary global utilities and 19 unrelated global
entries were preserved. No shipped wrapper defect was found.

## Environment and evidence boundary

- CLI: `codex-cli 0.159.2`, macOS, zsh; upstream SPEC v5.33.0.
- Source and isolated submodule pin: `7b35a177012d2689505ce021855a6c20c874f25b`.
- Self-host root: `/Users/fakeneuron/Code/flowtron`.
- Disposable evidence and adopter root: `/private/tmp/core677-install/` and
  its `adopter/` child. Raw catalogs, sessions, inventories, routes, and
  temporary scripts remain there for this run; the deciding results and
  reproduction below are durable. Temporary files are not shipped tools.
- Fresh runtime: a newly launched `codex app-server --stdio`, initialized
  locally, then `skills/list` with the explicit root and `forceReload: true`.
  After repair, each process also created an ephemeral `thread/start` with
  read-only sandbox and `approvalPolicy: never`. No model turn was submitted.
- Sessions reported `gpt-6.1-sol` / `openai`; that is configuration metadata,
  not model-performance evidence. Self-host thread `01a0f9a1-a203-7de0-a2e3-6afbb616ecb4`; adopter
  thread `01a0f9a1-a7cd-7401-87a9-c2f9d91778e1`. The before receipt is a fresh app-server catalog
  without `thread/start`.
- All three catalog responses had zero errors; all returned Flowtron entries
  were enabled. Catalog discovery plus filesystem route checks does not prove
  lifecycle execution. Workflow/flag behavior remains [[CORE-677.3]], and
  comparison remains [[CORE-677.4]]. No compatibility/dogfood stamp refreshed.

Official OpenAI documentation supports repo-directory discovery, symlinked
skills, and possible same-name entries. It does not guarantee the scope
reported for a duplicate on every runtime version. This receipt uses live
results for that distinction.
[Build skills](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)
(fetched through the OpenAI Docs MCP on 2026-10-01).

## Before and after

Initially `.agents/skills/` did not exist in the self-host checkout. The user
skill directory had 18 Flowtron symlinks: ten resolving and eight dangling.
Every one targeted the exact absolute prefix
`/Users/fakeneuron/Code/flowtron/codex/skills/` plus its own slug. The first
fresh runtime returned the ten resolving links as user-scoped skills; it
silently omitted dangling links. `ft-refactor` and `ft-seed` were missing.

After repair, each of the 12 shipped self-host wrappers has a relative link
`.agents/skills/<slug> -> ../../codex/skills/<slug>`. The eight adopter links
have `.agents/skills/<slug> -> ../../.flowtron/core/codex/skills/<slug>`.
The following table records this run, including runtime scope:

| Slug | Global before | Global after | Before catalog | Self catalog after | Adopter catalog |
|---|---|---|---|---|---|
| `ft-audit` | resolving | retired | user | repo | absent |
| `ft-audit-context` | dangling | retired | absent | absent | absent |
| `ft-audit-repo` | resolving | retained | user | user | user |
| `ft-close-epic` | resolving | retired | user | repo | repo |
| `ft-epic-discovery` | resolving | retired | user | repo | repo |
| `ft-file-followup` | resolving | retired | user | repo | repo |
| `ft-flowtron` | dangling | retired | absent | absent | absent |
| `ft-goal-task` | dangling | retired | absent | absent | absent |
| `ft-micro-task` | resolving | retired | user | repo | repo |
| `ft-new-project` | resolving | retained | user | user | user |
| `ft-refactor` | missing | absent | absent | repo | repo |
| `ft-release` | resolving | retired | user | repo | absent |
| `ft-seed` | missing | absent | absent | repo | repo |
| `ft-spec` | dangling | retired | absent | absent | absent |
| `ft-starter-task` | dangling | retired | absent | absent | absent |
| `ft-stats` | dangling | retired | absent | absent | absent |
| `ft-task` | resolving | retired | user | repo | repo |
| `ft-update` | resolving | retired | user | repo | repo |
| `ft-worktree-end` | dangling | retired | absent | absent | absent |
| `ft-worktree-start` | dangling | retired | absent | absent | absent |

The self catalog returned 12 unique Flowtron names: ten at repo scope and two
at user scope. The latter utilities resolve to exactly the same wrapper
files as the self-host links. On this version, the same-target utility copies
did **not** appear twice in `skills/list`; the user-scope entry was reported.
The filesystem still contains two copies of those utility links. Retaining
those permitted discretionary utilities avoids changing their availability
outside Flowtron projects. Do not generalize this result to distinct bodies,
other versions, or the interactive selector. The historical duplication
hazard remains a reason to avoid global installation of project skills.

The adopter catalog returned eight repo entries whose resolved paths all
start with `/private/tmp/core677-install/adopter/.flowtron/core/codex/skills/`,
plus the two user utilities from the self-host checkout. The user utilities
are intentionally outside the adopter pin; the pinned subset is exactly eight.
No repo-scoped `ft-release`, `ft-audit`, or global-only utility was installed
in the adopter. The physical submodule HEAD and parent's staged gitlink both
identify the pin above. The fixture was not merged into the real PLAN.

## Repair and preservation

The repair checked all candidates **before** unlinking: each had to remain a
symlink, with its exact recorded target in this checkout. For the eight broken
links, both the link target and shipped directory had to remain absent. Their
retirement/replacement evidence is in
[MIGRATION.md](MIGRATION.md#retired-skills-leave-dangling-symlinks).
For the other eight, the skill still ships but global installation is outside
the permitted utility set: `ft-audit`, `ft-close-epic`, `ft-epic-discovery`,
`ft-file-followup`, `ft-micro-task`, `ft-release`, `ft-task`, `ft-update`.

All 16 exact links were backed up under
`/private/tmp/core677-install/retired-global-links/` before removal. That
backup is temporary, not a durable install. To reverse this machine repair,
recreate only these recorded symlinks from the table and absolute prefix,
after checking the destination is still absent. Normal installations should
follow the repo-scoped policy instead. No target directory/body was deleted.
The repaired repo wiring is ignored machine state, not a git deliverable.

Before/after snapshots covered every user-skill entry. A structural equality
assertion compared the entire remaining snapshot against the original minus
exactly the 16 retired keys. This includes symlink targets and file hashes for
non-symlink entries. All 19 unrelated entries and the two utility links were
unchanged. Unrelated names were `agents-sdk`, `caveman`, `caveman-commit`,
`caveman-compress`, `caveman-help`, `caveman-review`, `cloudflare`,
`cloudflare-email-service`, `cloudflare-one`, `cloudflare-one-migrations`,
`durable-objects`, `find-skills`, `sandbox-migrate-to-next`, `sandbox-next`,
`sandbox-stable`, `turnstile-spin`, `web-perf`, `workers-best-practices`,
`wrangler`. SHA-256 of the sorted compact JSON unrelated snapshot was identical
before and after:
`c7fdad8dc932fd9784d83f847d0c862b14574f290e1fdc8bfb6ad418018792a8`.

Sandbox execution initially failed on app-server state initialization under
`~/.codex`, and separately on creating the protected repo `.agents/` directory.
Escalated retries were approved. The first repair attempt had written only
the temporary backup; no repo/global links had changed. The retry checked that
backup's exact contents before proceeding. Home writes and protected wiring
writes require normal filesystem approval; this workflow does not bypass it.

## Wrapper route checks

Static verification checked all 12 wrapper frontmatter names against their
slugs and canonical Claude inventory, every relative backticked path, and the
translation-snippet target. `ft-task` routes first to
`SPEC/procedures/ft-task.md`; its fallback/lazy references also exist. Every
other primary route resolves to `claude/skills/<slug>/SKILL.md`. Those checks
were repeated for all eight installed adopter wrappers. The adopter roster
was derived from the canonical Claude snippet and compared as a set against
the Codex snippet; no new roster was invented. Wrapper targets and primary
body hashes were captured in `routes.json`.

These checks establish that discovered files can reach their instruction
sources. They do not establish that an agent obeyed those sources or every
flag works. Runtime discovery is tested; wrapper loading/routes are static;
lifecycle/mode behavior is still untested in this child.

## Reproduce

Use a disposable directory for evidence; keep private configuration out of
receipts. Start with `codex --version` and inventory symlink names, targets,
and whether each target resolves. Check global links under `~/.agents/skills`
and any legacy Flowtron links under `~/.codex/skills`, preserving unrelated
entries. From the Flowtron checkout root, install the full inventory using
[codex/AGENTS-snippet.md](../codex/AGENTS-snippet.md#pinning-notes). For an
adopter, use its eight literal `ln -s` commands from the same snippet through
the project's `.flowtron/core` pin. Do not glob wrappers into an agent home.
A cleanup must verify ownership/target for each link and obtain required
filesystem escalation; missing targets alone do not prove Flowtron ownership.

The fixture for this receipt was created without network access:

```sh
mkdir -p /private/tmp/core677-install/adopter
git init -q /private/tmp/core677-install/adopter
cd /private/tmp/core677-install/adopter
git -c protocol.file.allow=always submodule add --quiet /Users/fakeneuron/Code/flowtron .flowtron/core
```

It cloned the source HEAD above. For later reproduction, explicitly check out
the recorded SHA in `.flowtron/core` and stage that gitlink. Then copy the
Codex snippet's adopter wiring commands verbatim; do not copy self-host links.
For source-route checks, resolve symlinks before interpreting a wrapper's
relative references. Check `name:` against the slug, then each relative
backticked path and primary body. Compare installed names to the source
inventory (self) or the Claude snippet-derived set (adopter).

Save this as `discover.py` in a disposable evidence directory. It uses the
protocol generated by this CLI (`codex app-server generate-json-schema --out
<temporary-dir>`), starts a fresh process and session, and records full local
responses. It does not invoke any skill or start a model turn. Run it from
the evidence directory as `python3 discover.py <absolute-repo-root> <label>`.
Run once per root before/after the repair; do not reuse a cached session.

```python
import json, subprocess, selectors, sys, time
from pathlib import Path
cwd = str(Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve())
label = sys.argv[2] if len(sys.argv)>2 else 'catalog'
out = Path.cwd()  # run from a disposable evidence directory
p = subprocess.Popen(['codex','app-server','--stdio'],cwd=cwd,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=open(out/(label+'.stderr'),'w'),text=True,bufsize=1)
sel = selectors.DefaultSelector(); sel.register(p.stdout, selectors.EVENT_READ)
messages=[]
def send(m):
 p.stdin.write(json.dumps(m)+'\n'); p.stdin.flush()
def reply(i):
 end=time.monotonic()+30
 while time.monotonic()<end:
  if not sel.select(max(0,end-time.monotonic())):break
  line=p.stdout.readline()
  if not line:raise RuntimeError('server closed stdout')
  m=json.loads(line); messages.append(m)
  if m.get('id')==i:
   if 'error' in m:raise RuntimeError(m['error'])
   return m['result']
 raise TimeoutError('no response for '+str(i))
try:
 send({'id':1,'method':'initialize','params':{'clientInfo':{'name':'flowtron-install-verification','version':'1'}}})
 init=reply(1); send({'method':'initialized','params':{}})
 send({'id':2,'method':'skills/list','params':{'cwds':[cwd],'forceReload':True}})
 result=reply(2)
 send({'id':3,'method':'thread/start','params':{'cwd':cwd,'ephemeral':True,'approvalPolicy':'never','sandbox':'read-only'}})
 session=reply(3)
 (out/(label+'-session.json')).write_text(json.dumps(session,indent=2)+'\n')
 (out/(label+'.json')).write_text(json.dumps({'cwd':cwd,'initialize':init,'skillsList':result},indent=2)+'\n')
 data=result['data'][0]
 skills=[s for s in data['skills'] if s['name'].startswith('ft-')]
 print(json.dumps({'label':label,'cwd':cwd,'skills':[{k:s.get(k) for k in ['name','path','scope','enabled']} for s in skills],'errors':data.get('errors',[])},indent=2))
finally:
 p.terminate()
 try:p.wait(timeout=5)
 except subprocess.TimeoutExpired:p.kill();p.wait()
```

Inspect the Flowtron-only printed catalog for names, enabled state, scope,
resolved paths and errors. Confirm source bodies are readable, not just that
a symlink exists. The interactive cross-check is to restart Codex in the
project and inspect `/skills` or type `$ft-task`; that UI step was not run in
this child. The already-open parent app's roster is not an after-repair receipt.

## Command receipts

| Command/check as run | Exit/result |
|---|---|
| `codex --version` | 0, `codex-cli 0.159.2`; sandbox PATH-alias warning |
| `codex app-server generate-json-schema --out /private/tmp/core677-install/schema` | 0 |
| `python3 /private/tmp/core677-install/discover.py` (initial sandbox) | 1, `RuntimeError: server closed stdout`; stderr: failed to initialize state runtime under `~/.codex` |
| Same discovery command (escalated) | 0, ten enabled user entries, no errors |
| `python3 /private/tmp/core677-install/repair.py` (sandbox) | 1, `PermissionError` creating repo `.agents`; no install links changed |
| Same repair command (escalated) | 0, 12 repo links; 16 globals backed up/retired |
| Fixture initialization/submodule/wiring Python commands | 0, pinned core + eight links |
| `python3 /private/tmp/core677-install/verify.py` (first escalated run) | 1, assertion expected all 12 entries at repo scope; both fresh sessions/catalogs succeeded |
| Same verification after correcting scope assertion, using saved fresh responses | 0, ten repo + two same-target user utilities for self; eight repo + two user utilities for adopter; exact paths/names/enabled flags/errors and preservation pass |
| `python3 -m py_compile` on discovery/repair/verification temporary scripts | 0 |
| `node --test tools/update-adopters.test.mjs` (escalated after interrupted sandbox attempt) | 0, 54/54 pass; temporary real-checkout tag test needs git metadata access |
| `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` | 0 each |
| CI-extracted shipped-skill parity, context budget, final newline, Pair B, Pair Q checks (`bash -e`) | 0 each |
| `git -C /private/tmp/core677-install/adopter ls-files --stage .flowtron/core` | 0, mode 160000 and recorded pin |
| Independent read-only installation review | no blockers or notes; checked saved runtime catalogs, repair preconditions, live symlinks, preservation, routes, physical HEAD and staged gitlink |

The failed scope assertion was a test assumption, not a missing skill. The
corrected assertion requires all expected names and their exact resolved
paths, all enabled, no errors, and the observed repo/user scope split. Saved
responses came from fresh processes/sessions, not fabricated model output.
There is no remaining blocked discovery obligation. Interactive UI rendering,
workflow execution, SOP currency and compatibility qualification remain outside
this installation receipt and belong to the subsequent epic children.

## Workflow parity — CORE-677.3

2026-10-01, source checkout `5230396eebf83a798a3dc6d9c92ea13c3f1a0c14`
plus this task's uncommitted corrections. The matrix below is a dated review,
not an alternative dispatch contract. Wrapper targets and private fragments
resolve; the canonical bodies decide flags and lifecycle behavior.

All twelve wrappers apply the centralized Codex translation rules.
`ft-task` enters `SPEC/procedures/ft-task.md` first, with canonical-body
fallback. The other eleven enter `claude/skills/<slug>/SKILL.md` directly.
The self-host inventory includes all twelve; the adopter installation subset
remains the eight literal commands in the Codex snippet. The two utilities
are discretionary global/by-reference entries; audit is forked for adopters,
and release is self-only.

| Exported skill | Inputs and supported flags | Conditional fragments / applicability |
|---|---|---|
| `ft-task` | ID; `--fast/-f`, `--debug/-d`, `--loop`, `--unattended`; flags unordered | Flag dispatch, model edges, starter promotion, blocked resume, debug, loop, shared unattended; self/adopter |
| `ft-micro-task` | ID; `--fast/-f`, `--unattended`; unknown trailing arguments require clarification | Shared task model-edge and unattended fragments; self/adopter |
| `ft-close-epic` | Audit ID, including legacy numeric child; `--unattended`; no fast/debug | Own unattended-close plus shared unattended; self/adopter |
| `ft-epic-discovery` | Empty or `--deep`; unknown args require clarification; unattended stops before writes | Own deep pre-pass; self/adopter |
| `ft-file-followup` | Context/optional ID; `--park/-p`, `--starter`, `--unattended`; park priorities `--low`, `--med/--medium`, `--fut/--future`, `--high` | Flag dispatch, park, starter; self/adopter |
| `ft-refactor` | Target; `--fast/-f`; other tokens become target text | No private fragment; epic/starter/candidacy contracts; self/adopter |
| `ft-seed` | No args/flags; explicit rejection | Candidacy contract; self/adopter |
| `ft-update` | Declares no arguments; no dedicated unknown-flag parser | No private fragment; adopter only, rejects self |
| `ft-release` | Declares no arguments; no dedicated unknown-flag parser | Dogfood/SOP, standing checks, mirror pairs, tag-message fragments; self only, rejects adopter |
| `ft-new-project` | Conversational inputs; no defined flag grammar | No private fragment; fresh adoption utility; rejects existing adoption/legacy tooling |
| `ft-audit-repo` | Empty, `all`, or subtree scope; no fast/unattended support | No private fragment; first-contact utility |
| `ft-audit` | Eight domains; paths, `all`, `last-commit`, `staged`, domain scopes; no fast/unattended support | `passes/<domain>.md`, conditional bootstrap; self scaffold/adopter unprefixed `audit` fork |

Unsupported flags are not uniformly rejected by an executable parser:
refactor and audit scope parsing can absorb a flag-shaped token as text.
Do not infer live rejection from an unsupported declaration. Follow-up
explicitly rejects park+starter, park+unattended, and starter+unattended;
priority flags apply only to park. Passing fast+unattended to task is
redundant, rather than a documented parser rejection.

### Evidenced repairs and SOP currency

The full watched-surface check reads the task skill directory and template
(`source:`), plus `SPEC.md` (`restates:`) and the modules the SOP invokes.
Since its old 2026-09-12 stamp: 22 source commits, eight not touching the SOP,
and 22 SPEC.md commits. The eight candidates were adjudicated: CORE-616's
receipt-tail instruction and CORE-604.3's model-edge detail needed coverage;
CORE-658's Learnings was already repaired by CORE-675; CORE-673 is a
Claude-only review dispatch; CORE-664/622.3 are citation maintenance;
CORE-605 already matches placement; CORE-603.4 trims description text.
This task's complete recheck supports `v5.33.0 · 2026-10-01`; a targeted
patch alone would not have supported that stamp.

Corrections preserve the existing architecture:

- SOP explicitly loads the canonical flag/model/promotion/resume/loop
  fragments. Loop replaces the plain Phase 2/3 drive and runs review once
  after convergence. No copied implementation of a mode.
- Entry writes honor foreign-dirt and collision checks, including unattended
  mismatch parks; an approved model-row edit does not become foreign dirt
  on the same run. Existing starter/blocked content is preserved.
- SOP distinguishes attended dependency delete-or-park, fast park default,
  and unattended park; both unattended delegation differences are named.
- Filing-length advisory, Phase 1 tick-through, receipt-tail guidance,
  task-owned review range, trailing PLAN marker preservation, durable
  handoff filing, scope exclusions, and fresh next-candidate checks are explicit.
- Codex bootstrap wrapper chooses the Codex wiring block for installation,
  staging and symlink verification. Claude settings/entrypoint steps apply
  only when the project also uses Claude. AGENTS content remains canonical.
  This repair is statically reviewed; no bootstrap/submodule-network run.
- Platform structured/deep guidance now matches conditional prose fallback.
  Official [App Server docs](https://learn.chatgpt.com/docs/app-server#api-overview)
  expose experimental `tool/requestUserInput`; availability and UI rendering
  still depend on runtime and mode. The live CLI unknown-flag/model fixtures
  test prose questions and genuine stops, not a structured UI.

### Fixture protocol

Disposable repositories: `/private/tmp/core677-workflow/<case>/`.
Each contains the same inclusive interval calculator and four pre-existing
unit tests (positive interval, singleton, empty, negative interval), local
workflow metadata, eight adopter links, and a **source copy** under
`.flowtron/core`. That copy is deliberately not a pinned git submodule;
CORE-677.2 separately verifies real submodule installation. There is no
remote, production action, or fixture merge into this repository.
The epic fixture seeds a completed implementation and passing calculator;
the dirty fixture adds an operator README change after its baseline commit.

Saved per-case artifacts: `<case>.manifest.json` (prompt, root, source,
baseline and, for corrected-source cases, SOP hash), `.prompt.txt`,
`.events.jsonl`, `.stderr`, `.final.txt`, and `.receipt.json`.
Temporary `run.py` submits at most two independent runs concurrently and
caps each at 900 seconds. CLI invocations pin `gpt-6.1-sol`, effort `high`,
`--ephemeral --json --ignore-user-config --ignore-rules`, a fixture working
root, and workspace-write sandbox. The dirty run uses `-s workspace-write`;
the other runs use `--approve-for-me`, which retains workspace-write and
routes requests through automatic approval review. No approval bypass.

Reproduction after recreating a clean fixture from its manifest:

```sh
codex exec --ephemeral --json --ignore-user-config --ignore-rules \
  -m gpt-6.1-sol -c 'model_reasoning_effort="high"' \
  -C /private/tmp/core677-workflow/debug-fast --approve-for-me \
  -o /private/tmp/core677-workflow/debug-fast.final.txt - \
  < /private/tmp/core677-workflow/debug-fast.prompt.txt \
  > /private/tmp/core677-workflow/debug-fast.events.jsonl \
  2> /private/tmp/core677-workflow/debug-fast.stderr
```

The prompt is the skill invocation followed by: execute the actual workflow
in this isolated fixture; do not touch other repositories or install software;
do not invent operator assent; stop at a gate requiring a genuine reply;
use the supplied mode and existing tests; no remote operations; record
unavailable review capability honestly. Loop also supplies `loop-max is 2`.
Raw transcripts retain exact prompts/commands; summarized receipts below
are the durable evidence. These runs are conformance observations, not
cross-model rankings or qualifying report-only DOGFOOD sessions.

### Runtime receipts and coverage

CLI 0.159.2, `gpt-6.1-sol`, effort `high`, as explicitly invoked above.
The model-mismatch run described its identity as GPT-6; the configured
CLI model argument is the recorded provenance, not that conversational label.
Each initial fixture used a fresh process/thread. No gate was answered by
the test harness and no retag/deployment/parent-flip assent was fabricated.

| Case / exact skill invocation | Observed result and deciding evidence | CLI exit / elapsed |
|---|---|---|
| `dirty`: `$ft-task CORE-001` | Foreign-dirt STOP; only seeded `M README.md`; baseline HEAD unchanged, no tasknote | 0 / not captured |
| `model`: `$ft-task CORE-001` with `[nonexistent-model]` | Concrete mismatch asks switch or retag; clean baseline unchanged, no tasknote | 0 / 41.48s |
| `unknown`: `$ft-task CORE-001 --bogus` | Usage plus prose clarification; no execution, note, commit or row edit | 0 / 36.78s |
| `debug-fast`: `$ft-task CORE-001 --debug --fast` | Ranked hypotheses/falsifiers and exact singleton repro; repro 1→0, four-test suite 1→0, compilation 0; final source+PLAN+archive commit `9ca05977db42`, clean tree | 0 / 333.46s |
| `loop`: `$ft-task CORE-001 --loop --fast; loop-max is 2` | One converged iteration, all five Acceptance commands 0, loop keys/log; cycle `7fe84e004d25` amended into atomic source+PLAN+archive closure `1db13450768c`, clean tree | 0 / 441.71s |
| `drift`: `$ft-task CORE-001 --unattended` | Re-scope→`status: blocked`, `park-reason: drift`, blocked chip; PLAN/source/HEAD unchanged, no Phase 2–4 or archive | 0 / 152.86s |
| `epic-close`: `$ft-close-epic CORE-001.N --unattended` | Audit Acceptance/doc sweep, two declared validation commands 0; audit PLAN+archive commit `b15612fd9167`, parent unchecked and cohort nested under Medium; parent-flip explicitly deferred | 0 / 342.93s |

`python3 /private/tmp/core677-workflow/verify.py` → 0 for these seven
cases. It checks baseline preservation at entry, actual parked metadata,
completed YAML/date/Acceptance and retired-chip behavior, archive placement,
clean closure trees, passing calculator tests, real commit contents, loop
keys/iteration commit object, and deferred parent state. CLI exit 0 alone
is not a lifecycle pass: a legitimate stop also exits 0.

Snapshot distinction: the dirty case exercised unmodified source HEAD.
The six corrected-source cases used SOP SHA-256
`56bc4bad875277843ebd8cf6fd4dcfefa7cc7e668c1dbe1e12136d7ecee66777`.
Final SOP SHA-256 is
`f17baa7240f39a4514142253000891929f75f6fe2d317097704e8a41ffdefe13`.
The later model-edit guard/preserved-existing-note refinements, stamp and
summary trim received static parity review; those particular model-edit and
existing-note branches were not live-tested. The explicit loop/flag fragment
dispatch was already present in the tested snapshot.

Two evidence limits matter:

- Debug, loop and epic notes **record** a clean independent review. Saved
  CLI JSON does not contain a child reviewer result or identifiable spawn;
  loop/epic expose only a wait item with empty receiver IDs/states. These
  receipts prove review recording, not reviewer independence. The parent's
  separate read-only review of this task checks the captured claims and
  artifacts; it does not retroactively prove those child reviews. CORE-677.4
  must capture reviewer context/results where available or retain this limit.
- The original drift prompt instructed every gate to stop with a concrete
  question, including the unattended case. It parked correctly but ended
  with a question. That transcript cannot decide question suppression
  independently of the conflicting prompt. A corrected retry removes that
  instruction for unattended mode; its separate result is recorded below.

Failed checks were retained rather than presented as successful runs:
initial dirty/model/unknown sandbox launches exited 1 before model generation
(`failed to initialize in-process app-server client: Operation not permitted`).
Approved retries used the child sandbox described above. The first artifact
verifier exited 1 on a too-literal `root cause` substring: the note correctly
used `root-cause` and ranked hypotheses. Its revised check inspects the actual
hypothesis/repro evidence. An intermediate verifier then exited 1 solely
because epic execution was still pending; the complete seven-case run passed.
The loop checker accepts a real logged cycle commit object amended at closure,
rather than imposing a two-commit branch history the contract does not require.
An internal debug patch initially failed to match a checkbox line and was
corrected before closure. Drift's initial compilation cache under `.git` was
denied; the run used a writable temporary cache and preserved tracked files.
These are harness/iteration receipts, not silent green substitutions.

| Behavior | Coverage boundary |
|---|---|
| All exported names, primary routes, aliases, lazy targets, application scope | Static complete inventory; live discovery remains the separate .2 receipt |
| Entry dirt, concrete mismatch, unknown task flag / prose fallback | Live stop observations; no real retag/switch or structured UI exercised |
| Debug+fast, exact repro, strict loop Acceptance and one-cycle convergence | Live; no multi-failure retry/budget exhaustion or every flag ordering |
| Four-phase source change, receipts, archive/date/checkboxes, atomic SHA | Live debug/loop artifacts; independent-review **recording** only |
| Unattended drift and audit parent deferral | Live artifacts; question-suppression limit above; no destructive/prerequisite/visual park |
| Starter promotion/fidelity, blocked resume/reason-clear, legacy/under-tier model, PLAN marker rewrites | Static contract/dispatch review only |
| Epic filing, deep pre-pass, follow-up modes, micro, refactor, seed, release/update/bootstrap execution | Static routes/flags and applicability only; no lifecycle execution claim |
| Native structured question UI, bootstrap install/stage behavior | Static guidance/official API and current-app capability observations; no fresh CLI UI/bootstrap run |
| Grok comparison, same-model SOP control, report-only DOGFOOD and compatibility stamps | Not run in this child; assigned .4/.N, stamps unchanged |

Static regression checks: all twelve wrapper names and relative targets,
canonical bodies and eight SSOT-derived adopter names; CI Pair B flag parity,
Pair Q section citations, context budgets, final newlines, and
`git diff --check`. These checks complement reading the actual dispatch;
they do not prove live execution of untested cells. No permanent benchmark,
workflow runner, duplicated roster, or verification service was added.

Corrected `drift-retry`: `$ft-task CORE-001 --unattended`, replacing the
conflicting stop-with-question sentence with an instruction to record required
decisions in the park and stop without a live question. CLI → 0, 152.89s;
the thread ID is retained in its JSONL/verification receipt. This retry used
the final SOP hash above. It wrote blocked status, `park-reason: drift`, and
blocked chip; preserved PLAN/source/HEAD; did not enter Phase 2–4 or archive;
and its final response contained no live question. The final eight-run
artifact verifier (seven initial cases plus this prompt correction) → 0.
No source correction was inferred from the conflicting first prompt.
