# Project command interface — hand-authored, not generated from the
# operator-private fleet template. flaitron's only stack is the `viz/`
# visualizer: no root `package.json`/`pyproject.toml`, and `viz/` sits outside
# the `frontend`/`backend`/`landing`/`worker` subdir set that template detects.
# Every recipe below delegates to `npm --prefix viz …`, matching the commands
# CLAUDE.md §"Validation"/§"Dev Server" and viz/README.md already document
# running from the repo root (CORE-637). Rationale lives in the
# operator-private ~/Code/natabula/docs/STACK-TENDENCIES.md §"Non-standard
# repos hand-author bodies".
#
# Prerequisite: `just` (one-time `brew install just`). Run `just` with no
# args to list recipes.

# list available recipes
default:
    @just --list

# install viz dependencies
setup:
    npm --prefix viz install

# run the viz dev server
dev:
    npm --prefix viz run dev

# run the viz test suite
test:
    npm --prefix viz test

# lint viz
lint:
    npm --prefix viz run lint

# type-check viz
typecheck:
    npm --prefix viz run typecheck

# build viz
build:
    npm --prefix viz run build
