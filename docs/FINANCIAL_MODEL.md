# Financial Model

## Purpose

Provide transparent business-performance reporting for each franchise and the network.

## Order-level waterfall

```text
Gross basket sales
- discounts
- refunds
= net sales

- product COGS
- actual delivery cost
- payment processing
= pre-royalty contribution

- franchisor royalty
= operating contribution
```

The system should preserve each component rather than collapsing them into a single margin number.

## Royalty

Current commercial design:

- 3% of turnover through the contractually defined breakeven amount.
- 6% of turnover above that amount.

The phrase "breakeven amount" must be defined precisely in the legal/commercial model before implementation. The software should support a threshold schedule rather than assuming one interpretation.

## Reserve / owner layer

Current planning concept:

- 20% reserve
- 80% owner allocation

The allocation basis must be configurable and documented. It should not be silently applied to gross sales if the intended basis is operating contribution.

## Earned hours

The preferred business-performance metric is based on contribution available for owner work, not gross turnover.

```text
owner_work_contribution = operating contribution - non-owner allocations

earned_hours = owner_work_contribution / wage_benchmark
```

Example only:

If $250 of verified owner-work contribution is available and the configured planning benchmark is $25/hour, that represents 10 earned hours.

## Actual hours

Actual hours come from work sessions.

Do not infer labour from:

- website open time
- number of hours the app is logged in
- order acceptance alone

## Efficiency

Useful dashboard metrics:

```text
contribution per actual hour
baskets per actual hour
earned hours / actual hours
average basket
sales per actual hour
```

## Projections

Forecasts must be labelled as projections and show their assumptions:

- average basket
- baskets/hour
- COGS percentage or SKU costs
- delivery cost
- payment fees
- royalty schedule
- actual work hours

No projection should be presented as a guaranteed income result.
