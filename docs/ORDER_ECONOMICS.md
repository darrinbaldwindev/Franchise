# Order Economics & Contribution Flow

## Purpose

Define the canonical order-level financial flow connecting the storefront, inventory, delivery, payment fees, royalty and franchisee economics engine.

## Canonical flow

`Order created → payment status → fulfilment → delivery → settlement → COGS → contribution → investment recovery`

An order is not considered financially complete merely because checkout succeeded. The platform should preserve the lifecycle needed to reconcile payment, fulfilment, refunds and actual delivery cost.

## Order record requirements

At minimum, an order should be able to retain:

- order_id
- franchise_id
- customer reference
- territory/delivery area
- created timestamp
- payment status
- fulfilment status
- delivery status
- settlement status
- line items
- quantities
- selling prices
- discounts
- refunds
- SKU cost references
- COGS
- actual delivery cost
- payment processing fee
- applicable royalty
- contribution
- timestamps for material status changes

## Financial calculation

The canonical order contribution calculation is:

`Gross sales - discounts - refunds - COGS - actual delivery cost - payment fees - applicable royalty = contribution before reserve/allocation`

Reserve and owner allocation, if enabled by the configured business model, are calculated after contribution and must remain configurable.

## Important distinctions

The platform must keep these concepts separate:

- gross sales;
- net sales after discounts/refunds;
- retail value;
- COGS;
- gross margin;
- delivery cost;
- payment fees;
- royalty;
- contribution;
- reserve;
- owner allocation;
- owner income.

## Free delivery

The customer may see **free delivery** while the system records the actual delivery cost internally.

This is essential for determining whether a basket/order is economically viable.

## Order profitability views

The platform should eventually support:

- contribution per order;
- average order contribution;
- average basket value;
- delivery cost per order;
- contribution after delivery;
- contribution by SKU/category;
- contribution by territory;
- contribution by franchisee;
- refund impact;
- discount impact;
- payment fee impact.

## Order lifecycle and reconciliation

Orders should be auditable through status transitions.

A cancelled, refunded or partially refunded order must not remain represented as a fully realised sale in the economics engine.

Where a delivery provider supplies an actual charge after order creation, the financial record should be able to reconcile the estimated and actual delivery cost without losing the original audit trail.

## Territory economics

Because service coverage is constrained by delivery areas, the system should be able to aggregate order economics by territory/service area without exposing one franchisee's private financial data to another.

## Integration

This specification feeds:

- `docs/STOCK_ECONOMICS.md`
- `docs/FRANCHISEE_ECONOMICS.md`
- `docs/FRANCHISEE_ECONOMICS_EXAMPLES.md`

The order is the bridge between inventory economics and franchisee investment recovery.

## Tests

Automated tests should cover:

- successful order;
- discounts;
- refunds;
- partial refunds;
- COGS;
- free delivery with actual delivery cost;
- payment fee;
- royalty threshold/configuration;
- cancellation;
- delivery-cost reconciliation;
- investment-recovery contribution;
- tenant isolation.

## Commercial safeguard

Order contribution is an accounting/business-planning output of the configured model. It must not be represented as guaranteed owner income or as legal/tax advice.
