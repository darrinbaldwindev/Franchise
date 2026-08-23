# Franchisee Economics Model

## Purpose

This document defines the current working commercial and operational economics model for the Franchise platform. It is a product/business specification, not legal, tax, employment, Centrelink or pension advice.

## 1. Entry proposition

Current working entry package: **AUD $4,995**.

The package includes approximately **$2,000 cost-basis opening stock**, with a target retail value of **$3,300+**. The retail-value claim must be validated from actual SKUs, quantities and current selling prices before being used as a hard marketing claim.

Optional add-ons can include:

- technology;
- shelving;
- furniture;
- additional stock;
- related equipment.

The entry package should remain a common starting point. Franchisees can expand through add-ons rather than being forced into a larger package at signup.

## 2. Investment recovery principle

The system must not claim that $3,300 of sales recovers a $4,995 investment.

Opening stock creates revenue potential and gross margin, but sales also incur COGS and other costs.

Illustrative opening-stock economics:

- retail sales potential: $3,300;
- stock cost basis: $2,000;
- gross stock margin before other costs: $1,300.

The actual recovery calculation must use verified contribution, not revenue alone.

## 3. Canonical contribution waterfall

For each reporting period, retain the inputs behind the calculation:

`Gross Sales`
`- Discounts`
`- Refunds`
`= Net Sales`
`- COGS`
`- Delivery Cost`
`- Payment Fees`
`- Royalty`
`= Contribution Before Reserve`
`- Reserve`
`= Owner-Available Contribution`

The exact accounting treatment of reserve and owner allocation remains configurable and must not be represented as final legal or tax treatment.

## 4. Investment recovery

Track cumulative verified contribution against the original startup investment.

Required dashboard values:

- startup investment;
- cumulative net sales;
- cumulative contribution;
- cumulative owner-available contribution;
- investment recovered;
- investment recovery percentage;
- remaining unrecovered investment;
- opening stock cost;
- opening stock retail potential;
- current inventory value;
- additional stock investment.

Recommended calculation:

`Investment Recovered = min(Cumulative Owner-Available Contribution, Startup Investment)`

`Recovery % = Investment Recovered / Startup Investment * 100`

`Remaining Investment = max(Startup Investment - Cumulative Owner-Available Contribution, 0)`

The product must show the assumptions and period used for each figure.

## 5. Milestones

### Launch

Startup investment is recorded and opening stock is received.

### Initial stock turnover

Orders consume opening stock and generate verified contribution.

### Investment recovery

Cumulative owner-available contribution reaches the startup investment.

### Ongoing operation

Once the startup investment is recovered, reporting shifts emphasis toward ongoing contribution, efficiency, stock turnover and owner goals.

These are reporting milestones, not promises of a particular time-to-profit.

## 6. Earned Hours

The project uses an earned-hours model rather than a fixed-hours income promise.

Primary relationship:

`actual work -> sales -> contribution -> earned hours`

Actual work sessions are recorded independently from storefront availability. An 18-hour storefront window does not equal 18 hours of labour.

Earned Hours should be calculated from verified owner-work contribution divided by a configurable planning wage benchmark.

Example conceptual formula:

`Earned Hours = Owner-Available Contribution attributable to verified owner work / Wage Benchmark`

The allocation methodology must be explicit before production release, particularly where sales are fulfilled by staff or where multiple people contribute to an order.

Earned Hours is an internal planning/management metric. It is not an employment entitlement, minimum-wage calculation, Centrelink calculation, pension calculation, tax calculation or legal guarantee.

## 7. Free delivery

Customer-facing delivery is currently intended to be free.

The platform must nevertheless record actual delivery cost per order and aggregate it by:

- franchise;
- territory;
- order;
- period;
- delivery provider where available.

Free delivery is a pricing proposition, not a zero-cost operating assumption.

## 8. Royalty

Current working concept:

- 3% through the defined breakeven amount;
- 6% on turnover above the defined threshold.

The threshold, base, exclusions and legal treatment remain configurable and subject to commercial/legal validation.

Do not hard-code the current concept as immutable contractual truth.

## 9. Owner allocation / reserve

A 20% reserve / 80% owner allocation concept has been discussed.

This is a configurable business-planning layer only until formally approved and legally/accounting reviewed.

## 10. Franchisee dashboard

The primary dashboard should answer four questions:

1. How much have I sold?
2. What contribution have those sales generated?
3. How much of my startup investment has been recovered?
4. How much verified work have I performed and what Earned Hours has that generated?

Recommended headline metrics:

- Startup investment: $4,995
- Sales to date
- Contribution to date
- Investment recovered
- Recovery %
- Remaining investment
- Actual work hours
- Earned Hours
- Orders
- Average basket
- Delivery cost
- Stock remaining

## 11. Lifestyle flexibility

The product should not assume every franchisee wants a full-time income.

The same business should support different participation levels, including limited hours and supplementary-income goals.

The system should therefore show actual performance rather than prescribe a required number of hours.

A franchisee can leave the storefront available for a long operating window if they have fulfilment capacity, while actual labour remains separately recorded.

## 12. Sales messaging guardrails

Approved direction:

> Your $4,995 startup includes approximately $2,000 of opening inventory with a target retail value of $3,300+, giving you a revenue-generating stock base from day one.

Avoid claims such as:

- guaranteed income;
- guaranteed recovery period;
- guaranteed number of orders;
- guaranteed wage;
- guaranteed pension-compatible earnings;
- guaranteed profitability.

Any public financial claim must be based on validated current inputs and appropriately reviewed.

## 13. Required software behaviour

The economics engine must:

- retain calculation inputs;
- retain calculation timestamps/periods;
- distinguish gross sales from net sales;
- distinguish revenue from contribution;
- track delivery cost even when customer delivery is free;
- track refunds and discounts;
- track COGS from inventory movements;
- track royalty separately;
- support configurable reserve/allocation rules;
- support configurable wage benchmarks;
- track actual work sessions independently from availability;
- provide investment-recovery milestones;
- prevent unsupported claims from appearing as guaranteed outcomes.

## 14. Testing requirements

Automated tests should cover at minimum:

- $4,995 startup investment;
- $2,000 opening stock cost basis;
- $3,300 retail-value scenario;
- COGS calculation;
- free-delivery cost inclusion;
- payment fees;
- refunds;
- royalty threshold transition;
- reserve/allocation configuration;
- investment recovery percentage;
- recovery cap at 100%;
- remaining investment floor at $0;
- actual work versus storefront availability;
- Earned Hours calculation;
- multiple contributors to an order;
- additional stock purchases;
- partial refunds;
- reporting-period boundaries.

## 15. Implementation principle

This model must be implemented once in the central backend/business engine and exposed consistently to the web/PWA, Android, iPhone and Windows experiences.

Do not duplicate financial logic independently in each client.

## 16. Open decisions

The following require owner/business approval before being treated as final:

- exact SKU composition and validated retail value of opening stock;
- exact royalty threshold and contractual basis;
- exact reserve/allocation treatment;
- wage benchmark used for Earned Hours;
- attribution of contribution when staff fulfil orders;
- treatment of franchisee-funded delivery exceptions;
- treatment of add-on equipment in investment recovery;
- final accounting/tax treatment;
- legal wording of financial and income-related marketing claims.
