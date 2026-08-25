# Shared Continuity — Franchise

**Owner:** Darrin

**Agents:** ChatGPT + Manus

**Last reconciled:** 25 August 2026

## Authoritative rule

This file is the merged cross-agent project state. Both agents should read it before substantial work and update it after substantial work.

The user is the final decision authority.

## Strategic priority reset — CURRENT

The immediate objective is **not** to complete the entire eventual Franchise platform.

The immediate objective is:

> **Get Franchise #1 to opening stage, then operate and maintain it before expanding the platform for additional franchises.**

The project sequence is now:

**Build → Open → Operate → Maintain → Improve → Replicate**

The Franchise project is a micro home-delivery business first and a technology platform second. Technology exists to operate the business.

When Darrin says `cont` or `continue autonomously`, agents have standing permission to continue the highest-value work toward the current objective without routine confirmation, within their actual tool permissions and the decision boundaries in `docs/AI_COLLABORATION.md`.

## Scope-control rule

Before significant new work, ask:

> **Does this materially help Franchise #1 reach opening stage or operate successfully?**

If yes, prioritise it.

If no, defer it unless it is a genuine security, reliability, legal/compliance, architectural prerequisite, or required continuity/governance task.

Existing architecture documentation is retained. Future capability should not automatically become current implementation scope.

## Definition of opening stage

Franchise #1 is ready to open when:

1. products are loaded;
2. pricing is configured;
3. initial stock is available;
4. customer ordering works;
5. payment works;
6. the order reaches the franchisee;
7. the franchisee can fulfil the order;
8. delivery can occur;
9. inventory updates correctly;
10. financial results calculate correctly;
11. work/earned-hours results calculate correctly;
12. the complete workflow passes an end-to-end test;
13. the franchisee can operate the process without developer intervention.

## Minimum V1 operating system

### Customer

- product catalogue;
- product pricing;
- ordering;
- checkout/payment;
- delivery address;
- order confirmation.

### Franchisee

- secure login;
- receive orders;
- pick/pack workflow;
- stock adjustment;
- basic sales reporting;
- basic contribution/profit reporting;
- work-session recording;
- earned-hours calculation.

### Business

- product cost;
- selling price;
- delivery economics;
- $50 free-delivery threshold;
- basic franchise-fee calculation;
- daily/weekly reporting.

### Operations

- opening stock;
- packaging;
- equipment;
- supplier process;
- delivery process;
- opening hours;
- customer support procedure.

## Required V1 security gate

Scope reduction does **not** permit insecure tenancy shortcuts.

The minimum correct security relationship remains:

**User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**

The first franchise should implement the boundary correctly without prematurely building elaborate multi-franchise functionality.

Real tenant-isolation tests must prove, at minimum:

- Franchise A cannot read Franchise B;
- Franchise A cannot mutate Franchise B;
- inactive membership is denied;
- unauthorized franchise switching is denied;
- new franchise-owned records require authorized franchise scope.

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

## Product components — eventual platform

The eventual platform may include:

- customer storefront;
- franchisee dashboard;
- franchisor portal;
- backend/API;
- database;
- authentication/roles;
- franchise tenancy;
- territory/service-area engine;
- order lifecycle;
- delivery adapter;
- inventory/purchasing;
- payments/refunds;
- accounting/export;
- training;
- AI coach;
- network analytics;
- mobile apps;
- Windows/PWA experience.

These are not all required before Franchise #1 opens.

## Continuity structure

Exactly three primary continuity documents are used:

- `docs/continuity/CHATGPT.md` — ChatGPT working history;
- `docs/continuity/MANUS.md` — Manus working history and implementation verification;
- `docs/continuity/SHARED.md` — merged authoritative state.

An optional Manus sub-agent may reconcile the two agent logs, but must not silently resolve material business disputes.

## Collaboration protocol

`docs/AI_COLLABORATION.md` is the current operating protocol. It establishes autonomous operation for ChatGPT, Manus and authorised Manus sub-agents within their actual capabilities and permissions, while Darrin retains final authority. It also establishes the recommended continuity schedule: lightweight checks every 6 hours, a fast check on pushes to `main`, and a deeper weekly review, with Manus having final say on operational scheduling implementation.

## Agent coordination rules

Before substantial work:

1. read `SHARED.md`;
2. inspect recent commits and relevant implementation;
3. read the relevant agent log when context is needed;
4. identify whether the work is required for Opening #1.

After substantial work:

1. update the agent's own continuity log;
2. update `SHARED.md` when overall state materially changes;
3. record commit SHA/message where practical;
4. distinguish reported validation from independently verified validation.

Agents should coordinate through GitHub rather than using Darrin as a messenger.

## Conflict handling

- Darrin decisions override agent assumptions.
- Existing confirmed decisions override new suggestions.
- Unresolved material questions must be documented rather than silently decided.
- Agents should inspect current files and recent commits before modifying shared areas.
- Prefer small coherent commits.
- Historical continuity records must be retained as history but superseded by a newer reconciliation entry when the repository state changes.
- Never treat an old agent report as current merely because it is newer by file timestamp; compare its referenced commit/state with current GitHub state.

## Scope-freeze guidance

Defer until after Franchise #1 is operating unless a genuine prerequisite emerges:

- advanced AI systems;
- native mobile applications;
- Windows packaging;
- sophisticated multi-franchise analytics;
- complex territory algorithms;
- advanced accounting automation;
- elaborate network dashboards;
- advanced franchise automation;
- hypothetical enterprise infrastructure.

Do not delete existing documentation for these capabilities; simply avoid expanding their implementation before the first franchise proves the operating model.

## Current implementation state

The repository contains a substantial Manus-managed Franchise Hub dashboard/reporting foundation. Reported capabilities include tenant-scoped monthly records, server-side KPIs, Earned Hours, productivity/workload metrics, projections, deterministic and LLM coaching safeguards, attestation, immutable revisions, administrator review/audit events and Trends calculations.

The repository also contains the canonical domain, migration and tenancy documentation. These are architecture contracts, not evidence that all corresponding runtime functionality is complete.

The latest PR #6 integration work has reported successful dependency installation, tests, TypeScript validation and production build, with GitHub PR verification green at its current reviewed head. These are to be treated as reported/automated validation unless independently reproduced by the reviewing agent.

Known PR #6 acceptance concerns previously identified remain unless the current implementation demonstrably resolves them:

- the test named `franchiseTenantIsolation.test.ts` was identified as validating user-ID propagation rather than true cross-franchise isolation;
- the Manus browser debug collector under `apps/franchise-hub/client/public/__manus__/debug-collector.js` has been identified as an executable public asset and should be removed from canonical production source or provably development-gated;
- migration history must remain distinct from executing/applying production migrations.

Do not claim these concerns are resolved without inspecting the current commit.

## Historical continuity

Previous continuity records, prototype ZIPs and earlier PR states remain historical evidence. They must not be deleted merely because they are stale.

PR/continuity records that reference earlier PR #6 SHAs and earlier dependency failures should be treated as historical once superseded by later commits.

## Opening-first development sequence

1. secure franchise tenancy required for Franchise #1;
2. products/catalogue/pricing;
3. customer ordering and checkout/payment;
4. order fulfilment;
5. inventory;
6. delivery workflow/integration;
7. contribution/profit reporting;
8. work sessions and earned hours;
9. end-to-end operational testing;
10. opening readiness.

Only after Franchise #1 is operating should the project prioritise replication and broader network automation.

## Post-opening strategy

Once Franchise #1 opens, the project enters:

**Operate → Maintain → Improve → Replicate**

Development should then be driven primarily by real operating evidence such as checkout abandonment, fulfilment time, delivery problems, stock accuracy, supplier issues, customer support, pricing/margin problems and franchisee workload.

## Current health

**Strategic direction:** GREEN — explicitly reset to Opening #1 first.

**Governance/collaboration:** GREEN — three-log model and AI collaboration protocol established.

**Architecture:** AMBER — strong documentation exists, but not all runtime implementation is complete.

**Security/tenancy:** RED — must be correctly implemented and genuinely tested before commerce expands beyond the minimum necessary foundation.

**Build/CI:** GREEN — current PR validation is reported/automated healthy; distinguish this from production readiness.

**Production readiness:** RED — current integration still requires resolution of the identified tenancy/debug-telemetry gates.

**Commerce:** AMBER/RED — implementation remains downstream of the security foundation and must now be scoped to Opening #1.

**Scale/network features:** DEFERRED — not a current priority.

## Immediate next action

The next autonomous work should focus on the **highest-value blocker to opening Franchise #1**, not on completing the eventual platform.

If Manus has already implemented a blocker fix, ChatGPT/Overseer should inspect the new commit rather than repeat historical recommendations.

If no implementation change is available, work should shift to a concrete opening-readiness gap, test, or operational requirement rather than expanding architecture.
