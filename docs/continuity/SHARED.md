# Shared Continuity — Franchise

**Owner:** Darrin

**Agents:** ChatGPT + Manus

**Last reconciled:** 23 August 2026

## Authoritative rule

This file is the merged cross-agent project state. Both agents should read it before substantial work and update it after substantial work.

The user is the final decision authority.

## Current product

A central ecommerce/delivery franchise platform for home-based local operators. The customer interacts with one branded platform; orders are routed to an approved local franchise according to service coverage.

## Commercial model — current working assumptions

- Entry franchise package: AUD $4,995.
- Opening stock: approximately $2,000 cost basis.
- Target retail value of included stock: $3,300+, requiring SKU-level verification before being marketed as a hard value claim.
- Optional add-ons: technology, shelving, furniture, extra stock and related equipment.
- Customer-facing free delivery is part of the current proposition; actual delivery cost must be tracked internally.
- Royalty concept: 3% through the defined breakeven amount, then 6% on turnover above it. Contractual threshold and legal treatment remain to be finalised.
- 20% reserve / 80% owner allocation is a proposed configurable layer and must not be treated as final legal/accounting advice.

## Operating model

- Central branded website/app.
- Franchisee does not need to build an independent website.
- Territory is based on real service/delivery coverage.
- Customer cannot select a franchise manually; routing is server-side.
- Storefront availability can be long, including an 18-hour operating window, if fulfilment capability supports it.
- Actual labour is recorded through work sessions and is not inferred from store availability.

## Economics model — latest direction

The project moved from a fixed-hours model to an earned-hours model.

Primary relationship:

`actual work → sales → contribution → earned hours`

Earned hours are calculated from verified contribution available for owner work divided by a configurable wage benchmark.

Earned hours are an internal management metric. They are not a Centrelink, pension, tax, employment or legal entitlement calculation.

The dashboard should make efficiency visible rather than telling the owner how many hours they must work.

## Product components

- Customer storefront
- Franchisee dashboard
- Franchisor portal
- Backend/API
- Database
- Authentication/roles
- Franchise tenancy
- Territory/service-area engine
- Order lifecycle
- Delivery adapter
- Inventory/purchasing
- Payments/refunds
- Accounting/export
- Training
- AI coach
- Network analytics
- Mobile apps
- Windows/PWA experience

## Continuity structure

- `docs/continuity/CHATGPT.md` — ChatGPT working history.
- `docs/continuity/MANUS.md` — Manus working history and implementation verification.
- `docs/continuity/SHARED.md` — merged authoritative state.

An optional Manus sub-agent may reconcile the two agent logs, but must not silently resolve material business disputes.

## Existing GitHub documentation created by ChatGPT

- `README.md`
- `docs/AI_COLLABORATION.md`
- `docs/continuity/CHATGPT.md`
- `docs/continuity/MANUS.md`
- `docs/continuity/SHARED.md`

## Earlier prototype history

Before GitHub became the source of truth, the conversation produced conceptual/prototype stages covering franchise application, territory review, package provisioning, stock, central storefront, routing, delivery, order lifecycle, franchisee dashboard, work sessions, stock alerts, lifestyle targets and earned-hours economics. Those prototype ZIPs are historical reference only.

## Collaboration state

ChatGPT has asked Manus to:

1. introduce its strengths and capabilities;
2. inspect the collaboration protocol;
3. record first-hand implementation state in `MANUS.md`;
4. identify any existing implementation not yet captured;
5. acknowledge ChatGPT's strengths briefly;
6. update this shared log.

## New ChatGPT repository scan — 23 August 2026

ChatGPT reviewed the current continuity state after Manus implementation work. The repository records a substantial Manus-managed Franchise Hub dashboard/reporting foundation, including tenant-scoped monthly records, server-side KPIs, Earned Hours, productivity/workload metrics, projections, deterministic and LLM coaching safeguards, attestation, immutable revisions, administrator review/audit events and Trends calculations. Manus reported 25 passing Vitest tests, successful TypeScript validation and a production build in its managed workspace.

The major architectural issue identified by ChatGPT is **source-of-truth alignment**. We should not build a second competing application. The next collaboration decision is whether the Manus-managed Franchise Hub application is to become the production application represented by this repository. If yes, its source/runtime should be brought into this canonical repository in a controlled manner and verified here.

Known broader platform gaps remain: full franchise/membership tenancy, full role model, territory resolution, central catalogue, customer checkout, payments, order orchestration, inventory movements, delivery integration, work-session capture, accounting exports, training system and mobile/Windows packaging.

ChatGPT updated `docs/continuity/CHATGPT.md` with this scan and recommendation. Commit: `7163b1af0aa6bd442831077291339a73198b171d` (`docs: update ChatGPT continuity after repository scan`).

## Conflict handling

- User decisions override agent assumptions.
- Existing confirmed decisions override new suggestions.
- Unresolved material questions must be documented rather than silently decided.
- Agents should inspect current files and recent commits before modifying shared areas.
- Prefer small coherent commits.

## Next recommended implementation sequence

1. Review the owner-approved source-integration pull request #6, which stages the managed Franchise Hub application under `apps/franchise-hub/` and closes issue #5 when merged.
2. Merge only through the documented owner-controlled review gate; the managed deployment and database remain unchanged by the source integration.
3. Verify financial and earned-hours calculations in the canonical repository with automated tests.
4. Introduce production database migrations, authentication/roles and franchise tenancy.
6. Implement territory/service-area routing, catalogue and order lifecycle.
7. Connect inventory, delivery, payments and accounting.
8. Build/finish customer storefront and franchisee operations dashboard.
9. Add training, AI coaching and network reporting.
10. Package mobile/Windows experiences.
11. Harden security, privacy, compliance and production deployment.

## Latest agent activity

- ChatGPT created the collaboration documentation and continuity structure on 23 August 2026.
- Manus reviewed the collaboration protocol and recorded a first-hand implementation update on 23 August 2026. The current managed Franchise Hub workspace is an authenticated dashboard/reporting and franchisor-review foundation, not yet the full central ecommerce/delivery platform.
- Manus directly verified server-side KPI calculations, tenant-scoped monthly records, deterministic and LLM coaching safeguards, required attestation, immutable revision/review events, protected review procedures, and protected Trends calculations. The latest complete local validation recorded 25 passing Vitest tests, a successful TypeScript check and a successful production build.
- Current acceptance gaps: the populated two-month Trends comparison is waiting for a second authorised saved month for the same franchisee; a browser-authenticated production review decision-flow check also remains outstanding. No fabricated production business data has been inserted to close either gap.
- The current workspace uses account-scoped records and a simplified `user`/`admin` role split. Before the canonical platform expands into commerce, territory routing, orders, stock, delivery and work sessions, its implementation should introduce franchise/membership tenancy and the broader least-privilege role model described in `docs/ARCHITECTURE.md`.
- Manus continuity reconciliation: `1277c0a` — `docs: record Manus implementation continuity`.
- Manus created the multi-agent governance foundation on branch `agent/manus/governance-starter`: `AGENTS.md`, a task board, ChatGPT repository instructions, a PR template, and a baseline PR verification workflow.
- Pull request #2’s verification workflow passed. The workflow is intentionally limited to governance-file presence, whitespace validation, and issue linkage for non-governance PRs until a canonical runtime and its exact checks are committed to this repository.
- `main` branch protection is unavailable on the current private-repository plan: GitHub returned HTTP 403 that protection requires GitHub Pro or a public repository. Until the owner changes plan or visibility, the owner and Manus Main must manually enforce the documented PR-review and successful-check gate.
- Open governance actions: complete merge of pull request #2, choose whether enforced platform protection is worth a plan/visibility change, and create an owner-approved runtime/stack-selection issue before new application implementation.
- Darrin approved the controlled integration of the managed Franchise Hub source into this canonical repository. Manus opened issue #5 and pull request #6 on branch `agent/manus/source-integration`, staging the source beneath `apps/franchise-hub/` without secrets, production data, deployment artifacts, database changes, or live deployment changes.
- Pull request #6 validation completed from the staged canonical source: `git diff --check`, 12 passing Vitest files / 25 tests, TypeScript validation without errors, and a successful production build. The existing Recharts bundle-size warning remains non-blocking. PR #6 is open and requires the manual owner-controlled review/merge gate.
- Manus synchronised PR #6 on 24 August 2026 with managed OAuth nonce-cookie recovery/preflight hardening and a server-enforced franchisee-only review-queue filter. Canonical validation now passes `git diff --check`, 14 Vitest files / 28 tests, TypeScript validation, and production build; the Recharts bundle-size warning remains non-blocking. The live managed deployment was not changed by this source synchronisation.
- The remaining real-data acceptance gates are evidence-dependent: the available multi-month records are administrator-owned and have zero sales/Earned Hours, while the separate user-role franchisee has one saved month. The review queue now correctly excludes the administrator records. No fabricated or altered business data has been used to close these gates.
- Manus repaired PR #6's independently reproduced dependency-integrity gate on 24 August 2026. The source now places the Tailwind transitive override and Wouter patched-dependency declaration in `apps/franchise-hub/pnpm-workspace.yaml`, corrects the Wouter patch hunk source line, and aligns the lockfile patch hash. A disposable isolated copy and a clean canonical `node_modules` directory both passed `pnpm install --frozen-lockfile --ignore-scripts`; canonical and managed `pnpm test` (14 files / 28 tests), `pnpm check`, and `pnpm build` also passed. The Recharts bundle-size warning remains non-blocking. No data, migration, credential, OAuth, or live-deployment change occurred. PR #6 remains open, clean, and requires owner review/merge.
