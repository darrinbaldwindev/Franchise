# Manus Continuity Log

## Agent

Manus

## Last updated

2026-08-24

## First-hand capabilities in this project environment

Manus can inspect and modify the authenticated GitHub repository, develop the managed full-stack web workspace, run TypeScript/Vitest/build validation, query the provisioned database, and verify browser-facing behaviour where an authenticated session is available. It can also perform structured web research, create project documentation, manage managed-environment deployment checkpoints, create bounded branches and pull requests, and coordinate scheduled sub-agent roles within the documented owner boundaries.

## Current implementation and verified state

The active implementation currently lives in the managed **Franchise Hub** workspace rather than this documentation-only repository checkout. It is an authenticated React/TypeScript, Express/tRPC, Drizzle/MySQL dashboard foundation for franchisee monthly performance reporting and franchisor review.

The following has been directly implemented and verified in that workspace:

- Tenant-scoped monthly business records, saved under the authenticated account, with server-side KPI calculations for sales, operating contribution, Earned Hours, productivity, workload progress and selected projections.
- Server-side deterministic coaching and an LLM coaching path that only receives a saved, server-derived metric snapshot. The numerical calculation engine remains deterministic and authoritative.
- Required franchisee attestation, immutable input-revision snapshots, administrator-only review procedures, reviewer attribution/notes and separate review events that do not alter calculation inputs.
- Tenant-scoped Trends reporting with server-calculated month-over-month metrics, first-month guidance, and hash-based routes that avoid the managed host's direct deep-link limitation.
- A simplified, plain-language franchisee workflow that protects the save action until the user completes a short accuracy check.

The latest full local validation recorded 28 passing Vitest tests, a passing TypeScript check, and a successful production build. The managed application has been checkpointed and published through its managed deployment workflow. One owner-confirmed record approval has also been verified through the protected review service and retained audit event; a browser-authenticated production decision-flow check with a distinct user-role franchisee remains outstanding.

On 24 August 2026, Manus added two security-boundary improvements in the managed workspace: OAuth now checks that the browser retained its nonce cookie before redirecting and gives a safe restart path on mismatch, while callback nonce validation remains fail-closed; and the franchisor review queue now excludes administrator-owned records at the database predicate and defensive filter layers. The latter change has focused regression coverage. A normal-browser owner sign-in reached the dashboard after the OAuth update. The managed review page was visually rechecked after the queue correction and showed an empty queue when the only awaiting records belonged to the administrator.

## Canonical source integration

Darrin approved controlled canonical source integration on 23 August 2026. Manus opened GitHub issue #5 and pull request #6 (`agent/manus/source-integration`) to stage the managed application source under `apps/franchise-hub/`, while preserving the repository’s root governance and design documentation.

The initial snapshot recorded managed checkpoint `69aeb7ef`; the integration branch was synchronised through checkpoint `12be6e21` with the OAuth and review-queue hardening. It excludes credentials, environment files, OAuth/session state, production data, local logs, dependencies, build output, deployment artifacts, and all live deployment/configuration changes. Canonical validation completed successfully from the staged application source: `git diff --check`; a clean `rm -rf node_modules && pnpm install --frozen-lockfile --ignore-scripts`; `pnpm test` with 14 test files and 28 tests; `pnpm check` without TypeScript errors; and `pnpm build`. The known Recharts bundle-size warning remains non-blocking.

On 24 August 2026, Manus repaired a reproducible source-install integrity failure previously found in isolated validation. The integration source now keeps `overrides` and `patchedDependencies` in `pnpm-workspace.yaml`, as required by the active package manager, and carries a corrected Wouter patch hunk header and lockfile patch hash. A disposable reproduction and a second empty-`node_modules` canonical install both passed under the frozen, scripts-disabled command. The same four dependency-control files were synchronised to the managed workspace and its frozen install, test suite, TypeScript check, and production build also passed. No application logic, business data, deployment setting, database schema, OAuth configuration, or credentials changed. Pull request #6 remains open, clean, unreviewed, and subject to owner-controlled review and merge; `main` is not changed by this integration.

## Governance foundation verified in this repository

- The repository default branch is `main`. Before the governance branch was created, it contained documentation and continuity material but no GitHub Actions workflow or application runtime manifest.
- Branch `agent/manus/governance-starter` adds `AGENTS.md`, a GitHub-first task board, a copy-ready ChatGPT prompt, a pull-request template, and a baseline pull-request verification workflow.
- The workflow passed on pull request #2. Until a canonical application runtime is committed here, it enforces governance-file presence, whitespace validation, and issue linkage for non-governance changes only.
- GitHub rejected `main` branch-protection configuration with HTTP 403 because the current private-repository plan requires GitHub Pro or a public repository. No protection setting changed; the owner and Manus Main must manually enforce the documented PR review and passing-check gate in the interim.

## Current boundaries, risks and unverified work

The current workspace is a dashboard/reporting and review foundation, **not** the complete central franchise platform described in this repository. It currently uses an account-scoped tenancy model and `user`/`admin` roles rather than the full `franchise_id` and multi-role model in the canonical architecture. It does not yet provide territory resolution, central catalogue, customer checkout, payments, order orchestration, inventory movements, delivery-provider integration, work-session capture, accounting exports, training, or mobile/Windows packaging.

The live database contains multi-month administrator-owned zero-activity records and only one saved month for the separate user-role franchisee account. Therefore, populated nonzero Trends chart acceptance and browser review-queue acceptance with a distinct user-role franchisee remain unverified. No fabricated records have been inserted for either purpose.

Commercial assumptions such as the 3%/6% royalty threshold and the 20% reserve / 80% owner-allocation layer have not been hard-coded as final contractual or accounting rules. Any expansion from the dashboard foundation must preserve configurable commercial assumptions, franchise-level isolation, and server-side source-of-truth calculations.

## Recommended next step

Review pull request #6 against issue #5 and merge only through the owner-controlled gate. Once merged, make the canonical application source the basis for future verification and bounded implementation issues. Continue to apply the manual PR review/check gate until platform branch protection becomes available. Franchisee-specific real-data acceptance remains separately paused at the owner’s request. Do not present the dashboard foundation as the complete ecommerce/delivery platform.

## Collaboration acknowledgement

ChatGPT's documented strengths in business logic, product architecture, requirements and cross-system consistency complement Manus's implementation, testing and managed-environment verification work. This record is based on direct inspection of the active workspace, its deployed data boundaries, and the GitHub repository state.
