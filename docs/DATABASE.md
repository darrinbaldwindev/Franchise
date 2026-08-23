# Database Model

The production database should be relational and transactional.

## Core entities

- users
- franchises
- franchise_members
- territories
- service_areas
- franchise_packages
- franchise_applications
- agreements
- payments
- storefronts
- products
- product_prices
- inventory_items
- inventory_movements
- orders
- order_items
- order_events
- delivery_quotes
- deliveries
- work_sessions
- daily_metrics
- financial_transactions
- coaching_events
- training_assignments
- launch_checklists

## Important rules

### Franchise isolation

All franchise operational tables require a `franchise_id` where applicable. API queries must enforce tenant scope at the database/service layer, not only in UI code.

### Money

Store monetary values as integer minor units (for example cents) or a fixed-precision decimal consistently. Never use binary floating point for accounting values.

### Auditability

Orders, payments, refunds, stock movements, work sessions and royalty calculations should be append-oriented/auditable.

### Inventory

Inventory quantity should be derived from or reconciled against stock movements. Every adjustment requires a reason and actor.

### Configuration

These must be configurable, not hard-coded:

- royalty breakeven threshold
- royalty rates
- owner wage benchmark
- reserve percentage
- delivery policies
- basket/order limits
- territory rules

The current commercial assumptions are 3% through breakeven and 6% above breakeven, with a 20%/80% reserve/owner allocation concept. They are not immutable system constants.
