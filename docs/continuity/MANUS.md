# Manus Continuity Log

## Agent

Manus

## Last updated

2026-08-23

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

The latest full local validation before this continuity update recorded 25 passing Vitest tests, a passing TypeScript check, and a successful production build. The managed application has been checkpointed and published through its managed deployment workflow. One owner-confirmed record approval has also been verified through the protected review service and retained audit event; a browser-authenticated production decision-flow check remains outstanding.

## Governance foundation verified in this repository

- The repository default branch is `main`. Before the governance branch was created, it contained documentation and continuity material but no GitHub Actions workflow or application runtime manifest.
- Branch `agent/manus/governance-starter` adds `AGENTS.md`, a GitHub-first task board, a copy-ready ChatGPT prompt, a pull-request template, and a baseline pull-request verification workflow.
- The workflow passed on pull request #2. Until a canonical application runtime is committed here, it enforces governance-file presence, whitespace validation, and issue linkage for non-governance changes only.
- GitHub rejected `main` branch-protection configuration with HTTP 403 because the current private-repository plan requires GitHub Pro or a public repository. No protection setting changed; the owner and Manus Main must manually enforce the documented PR review and passing-check gate in the interim.

## Current boundaries, risks and unverified work

The current workspace is a dashboard/reporting and review foundation, **not** the complete central franchise platform described in this repository. It currently uses an account-scoped tenancy model and `user`/`admin` roles rather than the full `franchise_id` and multi-role model in the canonical architecture. It does not yet provide territory resolution, central catalogue, customer checkout, payments, order orchestration, inventory movements, delivery-provider integration, work-session capture, accounting exports, training, or mobile/Windows packaging.

The live database currently has only one saved month for the relevant franchisee account, so populated two-month Trends comparison acceptance remains unverified. No fabricated records have been inserted for that purpose. The latest non-mutating check still showed August 2026 as the only saved month for that account.

Commercial assumptions such as the 3%/6% royalty threshold and the 20% reserve / 80% owner-allocation layer have not been hard-coded as final contractual or accounting rules. Any expansion from the dashboard foundation must preserve configurable commercial assumptions, franchise-level isolation, and server-side source-of-truth calculations.

## Recommended next step

Merge pull request #2 after its conflict resolution is verified. Then manually apply its PR review/check gate until platform branch protection becomes available. Complete the real-data acceptance check when the franchisee saves a second distinct month, then plan canonical platform expansion deliberately: franchise/membership tenancy and roles first, followed by territory routing, orders, inventory, work sessions, and source-integrated financial reporting. Do not present the current dashboard foundation as the entire ecommerce/delivery platform.

## Collaboration acknowledgement

ChatGPT's documented strengths in business logic, product architecture, requirements and cross-system consistency complement Manus's implementation, testing and managed-environment verification work. This record is based on direct inspection of the active workspace, its deployed data boundaries, and the GitHub repository state.
