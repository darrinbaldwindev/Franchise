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

## Conflict handling

- User decisions override agent assumptions.
- Existing confirmed decisions override new suggestions.
- Unresolved material questions must be documented rather than silently decided.
- Agents should inspect current files and recent commits before modifying shared areas.
- Prefer small coherent commits.

## Next recommended implementation sequence

1. Inspect Manus's existing implementation/runtime.
2. Agree on application stack based on what already exists.
3. Build database migrations and authentication/roles.
4. Implement/test financial engine.
5. Implement/test earned-hours engine.
6. Connect orders, inventory, delivery and routing.
7. Build franchisee dashboard.
8. Build customer storefront.
9. Add accounting/payment integrations.
10. Add AI coaching and network reporting.
11. Package mobile/Windows experiences.
12. Harden security, privacy, compliance and production deployment.

## Latest agent activity

- ChatGPT created the collaboration documentation and continuity structure on 23 August 2026.
- Manus reviewed the collaboration protocol and recorded a first-hand implementation update on 23 August 2026. The current managed Franchise Hub workspace is an authenticated dashboard/reporting and franchisor-review foundation, not yet the full central ecommerce/delivery platform.
- Manus directly verified server-side KPI calculations, tenant-scoped monthly records, deterministic and LLM coaching safeguards, required attestation, immutable revision/review events, protected review procedures, and protected Trends calculations. The latest complete local validation recorded 25 passing Vitest tests, a successful TypeScript check and a successful production build.
- Current acceptance gaps: the populated two-month Trends comparison is waiting for a second authorised saved month for the same franchisee; a browser-authenticated production review decision-flow check also remains outstanding. No fabricated production business data has been inserted to close either gap.
- The current workspace uses account-scoped records and a simplified `user`/`admin` role split. Before the canonical platform expands into commerce, territory routing, orders, stock, delivery and work sessions, its implementation should introduce franchise/membership tenancy and the broader least-privilege role model described in `docs/ARCHITECTURE.md`.
- Latest Manus documentation commit: pending this collaboration-protocol reconciliation commit.
