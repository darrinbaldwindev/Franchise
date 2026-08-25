# Franchise App — Tenancy Implementation Handoff

## Purpose

This document translates the canonical `docs/TENANCY_AUTHORIZATION.md` contract into the smallest implementation sequence required for Franchise #1. It is an implementation handoff, not a competing architecture.

## Gate

No transactional commerce tables or Opening #1 commerce implementation should depend on the current `userId`-as-tenant pattern until this boundary is implemented and tested.

## Required implementation sequence

1. Add/confirm `franchises` as the tenant entity.
2. Add `franchise_memberships` with `id`, `franchise_id`, `user_id`, `role`, `status`, `effective_from`, `effective_to`, `created_at`, `updated_at`.
3. Resolve active membership(s) for the authenticated user in the server request context.
4. Establish an immutable authorized franchise context for the request.
5. Convert franchise-owned repository/service methods from `userId` input to authorized franchise context.
6. Ensure client-supplied `franchise_id` is treated only as a requested scope and is checked against membership before use.
7. Add franchise ownership to legacy reporting records where required for isolation; preserve historical values and do not fabricate transactions.
8. Add indexes/uniqueness constraints with `franchise_id` where tenant collisions are possible.
9. Keep migration generation separate from production migration execution.

## Minimum service contract

Prefer:

`getOrders(authorizedFranchiseContext)`

not:

`getOrders(userId)`

and never:

`getOrders(clientSuppliedFranchiseId)` without server-side authorization.

The context should contain the authenticated user identity plus the authorized franchise ID and applicable role/membership state. Downstream repository methods should not accept an arbitrary franchise ID as a substitute for this context.

## Franchise #1 simplification

Do not build a general franchise-switching UI yet. A Franchise #1 user can have one active membership. The server must still use the canonical membership model so future multi-franchise users cannot gain access by changing a request parameter.

## Required tests

Create genuine isolation tests, not `userId` propagation tests:

- no membership -> denied;
- Franchise A member -> can read A;
- Franchise A member -> cannot read B;
- Franchise A member -> cannot mutate B;
- inactive/expired membership -> denied;
- unauthorized franchise parameter -> denied;
- role-restricted operation -> denied/allowed according to policy;
- direct repository/service call cannot bypass tenant scope through ordinary router input;
- new franchise-owned record requires authorized context.

At least one test should create two distinct franchises and memberships and exercise the same endpoint/service against both scopes.

## Legacy dashboard handling

Existing dashboard/reporting functionality may remain temporarily user-oriented only where it does not expose cross-franchise data. Do not make monthly reporting aggregates the source of truth for orders, inventory or contribution. Migrate historical ownership conservatively.

## Completion evidence

Implementation is not complete until the following are available:

- schema/migration changes;
- request-context implementation;
- converted tenant-scoped repository/service calls;
- cross-tenant tests;
- `git diff --check`;
- frozen dependency install;
- tests;
- typecheck;
- production build;
- explicit statement distinguishing automated/Manus validation from independently reproduced validation.

No production deployment or production migration is part of this gate.
