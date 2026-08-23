# Franchise Platform

Central operating platform for a home-based, locally fulfilled delivery franchise network.

## Product principles

- One central customer-facing brand and website/app.
- Franchisees operate within approved service areas.
- Customers are routed to the correct franchise server-side.
- Base franchise package: AUD $4,995.
- Core catalogue is centrally controlled; approved local products can be added.
- Customer delivery can be free while the actual delivery cost is tracked internally.
- Actual labour hours are tracked separately from storefront availability.
- Franchise performance is measured using sales, contribution, actual hours and earned-hours economics.
- The platform supports casual, limited-hours, part-time and full-time operators.

## Core financial model

The financial engine must keep these concepts separate:

1. Gross basket sales
2. Product COGS
3. Delivery cost
4. Payment processing cost
5. Franchisor royalty
6. Operating contribution
7. Reserve allocation
8. Owner allocation

The current commercial rule is 3% royalty through the contractually defined breakeven threshold and 6% on turnover above that threshold. The threshold must be configurable and formally defined in the franchise documentation before production use.

## Earned-hours model

The owner does not have to select a fixed workload first. The platform works backwards from business contribution.

`earned_hours = owner_wage_benchmark / contribution_available_for_owner_work`

More precisely, the production engine should calculate:

`earned_hours = owner_work_contribution / configured_wage_benchmark`

Actual hours come from recorded work sessions only. Storefront availability is never treated as labour.

Earned hours are an internal business-performance metric. They are not a statement about Centrelink, pension, tax or employment entitlements.

## Planned applications

- Central customer web app
- Franchisee mobile app
- Franchisor admin portal
- Windows desktop/PWA experience
- Order routing and fulfilment
- Inventory and purchasing
- Accounting/export integration
- Delivery-provider adapters
- Training and AI coaching
- Network reporting

## Repository status

This repository is the source of truth for the production platform. Business rules should be documented before implementation, and financial/legal assumptions must remain configurable rather than hard-coded.
