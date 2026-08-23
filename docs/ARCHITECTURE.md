# System Architecture

## High-level architecture

```text
Customer Web / Mobile
        |
        v
   Central API
        |
  +-----+------+----------------+
  |            |                |
Orders      Catalogue       Territories
  |            |                |
  +------------+----------------+
               |
        Franchise Engine
               |
       +-------+-------+
       |               |
 Franchisee App   Franchisor Admin
       |
 Orders / Stock / Work / Finance / Training
```

## Multi-tenant model

Every franchise-owned operational record should be scoped by `franchise_id`.

The customer experience is centralised. Franchisees do not create separate websites. The platform resolves the franchise from the delivery address and approved service-area rules.

## Core services

### Identity and access

Roles should include at minimum:

- customer
- franchisee_owner
- franchisee_staff
- franchisor_admin
- franchisor_operations
- support

Use least privilege. A franchisee must never be able to read another franchise's private operational data.

### Territory service

Responsibilities:

- approved service areas
- postcode/address eligibility
- overlap priority
- territory status
- delivery-provider availability

### Commerce

Responsibilities:

- catalogue
- pricing
- baskets
- checkout
- payment state
- promotions
- refunds

### Order orchestration

Responsibilities:

- route order to franchise
- inventory reservation
- fulfilment state
- delivery request
- order events
- exception handling

### Inventory

Use immutable stock movements rather than simply overwriting quantities.

Stock movements should support:

- purchase receipt
- sale
- return
- damage
- adjustment
- transfer
- opening stock

### Work tracking

Store actual work sessions separately from online availability.

A work session should contain:

- franchise_id
- actor
- start
- end
- activity/category where appropriate
- optional notes

### Financial engine

The engine should calculate and retain the inputs behind every reported figure. Do not store only a final profit number.

Required dimensions include:

- gross sales
- discounts
- refunds
- COGS
- delivery cost
- payment fees
- royalty
- contribution
- reserve
- owner allocation

### Earned-hours engine

The engine converts verified owner-work contribution into wage-equivalent hours using a configurable benchmark.

The benchmark is a business-planning setting. It is not an employment contract and must not be presented as a government entitlement calculation.

## Platform strategy

Build the backend once and expose it to:

- responsive web/PWA
- Android
- iPhone
- Windows

Avoid duplicating business logic in each client.
