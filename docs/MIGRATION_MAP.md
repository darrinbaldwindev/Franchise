# Franchise Hub Migration Map

## Status

Architecture proposal for Issue #12. This document is a mapping and sequencing plan; it does not execute migrations.

## Current Manus source model

| Existing table | Current role | Canonical destination | Treatment |
|---|---|---|---|
| `users` | authenticated people | `users` + `franchise_memberships` | retain user identity; add explicit franchise membership |
| `franchiseProfiles` | one profile per user with workload/wage inputs | `franchises` + configurable operating profile | split commercial franchise identity from person identity |
| `monthlyBusinessRecords` | monthly attested operating/financial snapshot | reporting snapshot linked to `franchise_id` | preserve historical records; do not make transactional source of truth |
| `monthlyBusinessRecordRevisions` | audit trail for monthly snapshots | reporting audit/history | retain, add franchise scope |
| `monthlyBusinessRecordReviewEvents` | review workflow | reporting review/audit | retain, add franchise scope and authorization checks |
| `coachingRecords` | dashboard coaching output | reporting/coaching | retain; link to franchise and source snapshot |

## New canonical entities

### `franchises`

Commercial operating unit.

Minimum concepts:
- id
- package/version
- status
- activation date
- initial investment
- delivery-area territory reference
- configuration/version
- created/updated timestamps

### `franchise_memberships`

Authorizes people against franchises.

Minimum concepts:
- id
- franchise_id
- user_id
- role
- status
- effective dates
- audit timestamps

A user may have multiple memberships where the approved access model permits it.

### `territories` / `delivery_areas`

A franchise territory is defined by the delivery area it can serve. This is the address-level operating and delivery-eligibility boundary, not an arbitrary postcode or suburb allocation.

Minimum concepts:
- id
- franchise_id
- display name/label
- geographic boundary or address-match reference
- delivery eligibility and service-policy configuration
- status
- effective dates
- active version or version history reference
- explicit overlap/precedence configuration where relevant

Related records must preserve delivery-area versions, routing decisions, and actual delivery performance/cost. See `docs/DELIVERY_AREA_TERRITORIES.md` before selecting table names, writing migrations, or implementing routing.

### Commerce entities

Implement after tenancy:
- products / SKUs
- suppliers
- inventory movements
- orders
- order lines
- fulfilment/delivery records
- payment/settlement records
- refunds

### Finance entities

Implement after commerce:
- contribution ledger
- investment recovery
- work sessions
- Earned Hours configuration/derived records

## Mapping principles

1. Never infer franchise tenancy permanently from `userId`.
2. Existing monthly records should receive an explicit franchise reference before being treated as franchise-scoped reporting data.
3. Historical monthly values remain snapshots of what was attested at that time.
4. Do not fabricate transactional orders, inventory movements or settlements from monthly aggregate data.
5. If historical migration requires assumptions, mark the resulting data as migrated/estimated and retain provenance.
6. Do not delete the legacy fields/tables until replacement reporting has been validated.
7. Every new transactional table must have a server-enforced franchise ownership boundary.

## Non-destructive migration sequence

1. Create `franchises` and `franchise_memberships`.
2. Create the versioned delivery-area territory structure, service-policy configuration, and routing-decision audit boundary.
3. Establish deterministic mapping from existing `users` to initial franchise/membership records.
4. Add nullable `franchise_id` to legacy reporting tables.
5. Backfill only records with an unambiguous mapping.
6. Validate row counts and uniqueness constraints.
7. Make franchise scope required for the migrated reporting paths.
8. Update server-side queries and mutations to resolve franchise from authenticated membership.
9. Add tests proving cross-franchise access is denied.
10. Introduce commerce tables independently, including order attribution to the authorised franchise and resolved delivery-area version.
11. Introduce finance/contribution tables independently.
12. Migrate dashboard calculations from attested aggregates to canonical transactions where data exists.

## Explicitly prohibited during integration

- production migration execution;
- destructive/drop migrations;
- copying production customer/payment data into development;
- secrets in source control;
- treating `user_id` as permanent tenant identity;
- inventing historical orders or stock movements from aggregate monthly records;
- silently changing the meaning of historical attested values.

## Acceptance tests for the tenancy migration

At minimum:

- User A cannot read Franchise B's monthly records.
- User A cannot mutate Franchise B's records.
- An admin/reviewer can access only the franchisees allowed by the authorization policy.
- A user can belong to more than one franchise only when explicitly authorized.
- Legacy monthly records retain their original values and provenance after franchise linkage.
- New order/inventory records cannot be created without an authorized franchise scope.
