# Versioning

> Lazy-loaded SPEC module. Loaded by `/ft-task` only for explicit version-bump tasks. See `SPEC.md` for the always-loaded core spec.

Flowtron uses semver tags. Each tagged release is consumable by adopting
projects via submodule checkout.

- **Patch** (`v1.2.3` → `v1.2.4`) — clarifications, doc fixes, no project-side
  changes needed.
- **Minor** (`v1.2.x` → `v1.3.0`) — additive features (new optional fields,
  new template sections). Adopting projects can ignore the new features and
  continue working.
- **Major** (`v1.x.y` → `v2.0.0`) — breaking change. The bump task's tasknote
  and the annotated tag message list explicit migration steps. Adopting
  projects must follow them when bumping.

The pin is the submodule gitlink itself — `git -C .flowtron/core describe --tags`
reads it, and `.flowtron/core/SPEC.md`'s `**Version:**` line carries the same
value on the contract side. No adopter file restates it, so there is nothing
to keep in sync on a bump. Bumping is a project-side task (e.g.,
`CORE-XYZ: Bump flowtron to vX.Y.Z`) that runs the migration steps from the
bump's annotated tag message (`git show vX.Y.Z` in the flowtron submodule)
and commits the new submodule SHA. `/ft-update` performs that mechanical bump
with no tasknote; wrap it in a PLAN line or `/ft-micro-task` when you want it
tracked.
