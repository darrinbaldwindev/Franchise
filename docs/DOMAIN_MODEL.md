# Canonical Franchise Domain Model

## Purpose

Define the minimum domain boundary that the Franchise Hub must establish before inventory, order and financial features are implemented.

This is a target architecture, not a request to discard the existing application. Existing dashboard, coaching, review and audit functionality should be preserved where useful and progressively moved onto this model.

## Core tenancy

### Franchise

The commercial operating unit. Every franchise-owned transactional record must be attributable to a franchise.

Key concepts:
- franchise_id
- package/version
- status
- activation date
- initial investment
- territory assignment
- configuration/version references

### User / Membership

Users authenticate as people. A person may have one or more memberships/roles against a franchise according to the approved access model.

Do not use user_id as a substitute for franchise tenancy.

### Territory

Defines the operating territory available to a franchise.

The territory model must support:
- territory_id
- franchise_id
- geographic boundary/reference
- delivery eligibility rules
- status
- effective dates

Territory must be distinct from user identity.

## Commerce

### Product / SKU

The sellable catalogue item.

Must support SKU identity, product/category, supplier reference, cost, retail price, tax configuration, active dates and other stock metadata defined by STOCK_ECONOMICS.md.

### Inventory Movement

The authoritative stock ledger.

Every receipt, sale, refund, adjustment, damage, transfer or other material movement must be auditable.

### Order

The customer transaction header.

Must be attributable to the relevant franchise and territory and have a lifecycle independent from payment settlement and fulfilment.

### Order Line

Immutable commercial snapshot of the product/SKU sold, quantity and applicable price/cost references.

### Fulfilment / Delivery

Tracks preparation, dispatch/delivery state and actual delivery cost. Customer-facing free delivery does not remove the need to record the actual cost.

### Payment / Settlement

Tracks payment state, fees, settlement and refunds independently from order status.

## Finance

### Contribution Ledger

Canonical financial record of the inputs and calculated outputs needed for contribution reporting.

The system must retain the components rather than only a final profit number:

Gross sales
→ discounts
→ refunds
→ COGS
→ delivery cost
→ payment fees
→ royalty
→ contribution before reserve
→ reserve
→ owner-available contribution

### Investment Recovery

Tracks the franchisee's configured initial investment and cumulative owner-available contribution applied to the recovery calculation.

The current commercial planning input is $4,995. It must remain configurable/versioned.

### Work Session

Records actual work performed. This is separate from storefront availability or online status.

### Earned Hours

Derived internal planning metric based on verified work/contribution and configured benchmark rules. It is not an employment or wage guarantee.

## Reporting

Dashboards should derive from transactional/domain records.

Existing monthly business records may remain useful as reporting snapshots, but they must not become the sole source of truth for orders, inventory or financial contribution.

## Required tenant rule

Every franchise-owned transactional read/write path must establish franchise scope before accessing records.

Never rely on a client-supplied franchise_id alone. The authenticated membership/authorization context must determine which franchise records the user may access.

## Migration strategy

Do not execute production migrations as part of source integration.

Before implementing new domain tables, inspect the existing schema and determine:

1. which current tables can be retained;
2. which can be extended;
3. which new tables are required;
4. how existing records map to the new tenancy model;
5. how rollback and migration testing will work.

No destructive migration should be introduced without an explicit approved migration plan.

## Implementation order

1. Establish franchise/membership/authorization boundary.
2. Establish territory model.
3. Establish product/SKU and inventory ledger.
4. Establish order lifecycle and order lines.
5. Establish fulfilment/delivery and settlement.
6. Establish contribution ledger.
7. Establish investment recovery.
8. Establish work sessions and Earned Hours.
9. Rebuild dashboard/reporting queries over the canonical records.

## Security principles

- Least privilege.
- Server-side tenant enforcement.
- No secrets in source control.
- No production data in development snapshots.
- No default browser telemetry in production.
- Financial calculations must be auditable.
- Sensitive customer data must be minimised and access controlled.
