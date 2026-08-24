# Franchise Tenancy & Authorization Boundary

## Purpose

Define the security boundary required before transactional franchise features are implemented.

## Identity versus tenancy

Authentication answers: who is this person?

Authorization answers: which franchise(s), territory(s), records and actions may this person access?

A session `user_id` MUST NOT be treated as the permanent franchise tenant key.

## Required request flow

1. Authenticate the user.
2. Resolve active `franchise_memberships` for the authenticated user.
3. Determine the requested franchise context from an allowed server-side source.
4. Verify membership status, role and effective dates.
5. Establish an immutable request-scoped franchise authorization context.
6. Execute business queries/mutations using that context.
7. Enforce franchise ownership in the database query/write itself.

A client-supplied `franchise_id` is only a requested scope. It is never sufficient proof of authorization.

## Membership

Membership should contain at least:
- id
- franchise_id
- user_id
- role
- status
- effective_from
- effective_to
- created_at
- updated_at

Recommended roles should be policy/configuration, not hard-coded assumptions scattered throughout routers.

## Multi-franchise users

A user may have more than one active membership only when explicitly authorized.

The active franchise context must be explicit. Never silently select a franchise based on whichever membership happens to be returned first.

## Server enforcement

Every franchise-owned transactional query must include an authorization-derived franchise scope.

Bad pattern:

`getOrders(userId)`

Acceptable pattern:

`getOrders(authorizedFranchiseContext)`

The database access layer should not accept arbitrary user/client input as a substitute for the authorization context.

## Legacy compatibility

Existing Manus functionality currently keyed by `userId` may be retained temporarily while migrating. During migration:

- map users to an explicit franchise membership;
- add franchise scope to legacy records;
- keep historical values unchanged;
- prevent cross-franchise access;
- do not create fake historical transactions.

## Testing requirements

Tests must prove at minimum:

- authenticated user without a franchise membership cannot access franchise data;
- member of Franchise A cannot read Franchise B;
- member of Franchise A cannot mutate Franchise B;
- inactive/expired membership is denied;
- role restrictions are enforced server-side;
- multi-franchise users cannot switch to an unauthorized franchise by changing a request parameter;
- new inventory/order/finance records require an authorized franchise context;
- direct database helper calls cannot bypass the intended tenant scope through ordinary router input.

## Data isolation

Tenant ownership must be represented in the data model for franchise-owned records. Indexes and uniqueness constraints should include `franchise_id` where required to prevent accidental cross-tenant collisions.

For sensitive records, authorization should be enforced at the application service/repository boundary rather than relying on UI hiding.

## Migration gate

Do not introduce transactional commerce tables until this boundary has been implemented and tested.

Do not execute production migrations as part of this architecture work.

## Review checklist

- [ ] Authentication remains independent from franchise tenancy.
- [ ] Membership is explicit.
- [ ] Franchise context is server-derived/authorized.
- [ ] Client-supplied franchise IDs cannot bypass authorization.
- [ ] Legacy reporting paths are scoped.
- [ ] Cross-tenant tests exist.
- [ ] Inventory/order/finance designs depend on this context.
