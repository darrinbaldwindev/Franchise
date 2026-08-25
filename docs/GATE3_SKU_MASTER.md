# Gate 3 — Franchise #1 V1 SKU Master

**Status:** Working commercial master
**Owner:** Franchise Main
**Technical counterpart:** Franchise App / Manus App
**Purpose:** Convert supplier research into a controlled 40–60 SKU opening range.

## Rule

No SKU becomes an approved opening SKU merely because a public retail or catalogue price was found.

Approval requires verified supplier/account pricing or an explicitly documented temporary assumption.

## Required fields

| Field | Requirement |
|---|---|
| SKU | Unique product identifier |
| Category | Product category |
| Product | Exact product/pack description |
| Supplier | Primary supplier |
| Supplier SKU | Supplier identifier where available |
| Pack size | Units/volume/weight |
| Supplier price ex GST | Verified account price preferred |
| Freight allocation | Allocated landed freight |
| Landed cost ex GST | Supplier cost + allocated freight |
| GST treatment | Confirmed tax treatment |
| Retail price inc GST | Proposed customer price |
| Marketplace fee | Current applicable percentage/fee |
| Delivery cost | Internal delivery economics |
| Contribution | Retail revenue less verified direct costs |
| Margin % | Contribution relative to retail revenue |
| Opening quantity | Initial stock quantity |
| Reorder point | Operational minimum |
| Role | Core / traffic / margin / basket-builder / differentiator |
| Evidence | Source or supplier quote |
| Status | Research / priced / verified / approved / rejected |

## Initial V1 range architecture

Target: **40–60 SKUs**.

Recommended starting allocation:

- 10–12 drinks / soft drinks;
- 8–10 energy drinks;
- 5–7 bottled water / hydration;
- 8–10 chips / savoury snacks;
- 5–7 confectionery / sweet snacks;
- 4–6 biscuits / cookies;
- 3–5 nuts / healthier snacks;
- 3–5 protein / functional snacks.

The final count may move within 40–60 based on supplier availability, margin, basket usefulness and customer demand.

## Product selection rules

Prioritise products that are:

1. sealed and supplier packaged;
2. ambient/shelf-stable;
3. single-serve or convenient basket additions;
4. easy to pick and pack;
5. low breakage/spoilage risk;
6. familiar enough to generate demand;
7. sufficiently differentiated from convenience-store competitors;
8. economically viable after delivery/platform costs;
9. available consistently from a reliable supplier;
10. compatible with the $50 free-delivery proposition.

Avoid making the initial range unnecessarily broad.

## Basket architecture

The range must support a natural $50 basket.

Products should collectively provide:

- low-price impulse additions;
- core high-frequency products;
- higher-value items that lift basket size;
- margin-supporting products;
- a limited number of differentiated products.

Do not judge an individual SKU only by its standalone margin. Its effect on basket value, repeat purchase, convenience and delivery economics matters.

## Delivery economics

Model at least two delivery paths where available:

1. marketplace ordering;
2. direct/web ordering with delivery service.

Use current verified commercial terms at the time of pricing. Do not hard-code historical platform fees into the product master.

## Verification status

### Verified

Only supplier/account pricing or another reliable commercial source that can be reproduced should be marked **verified**.

### Assumption

Public catalogue pricing, market/RRP data or provisional freight assumptions may be recorded as **assumption**, but must never be presented as confirmed wholesale economics.

### Approved

A SKU can be marked **approved** only when:

- supplier availability is confirmed;
- cost is verified or explicitly approved as a launch assumption;
- retail price is commercially defensible;
- delivery/platform economics are modelled;
- contribution is acceptable;
- product meets operational criteria.

## Current research candidates

The working research set includes beverage, energy, water, snack, biscuit, confectionery, nut and functional-snack candidates identified in `docs/GATE3_PRODUCT_RESEARCH.md`.

Those candidates are **not yet automatically approved**.

## Next action

Convert the research candidates into 40–60 rows with evidence and status, then obtain/record actual business-account supplier pricing for the highest-priority products.

After the commercial master is sufficiently verified, Franchise App / Manus App can use it as the application catalogue seed rather than inventing product/pricing data independently.

## Change control

Commercial assumptions must be dated.

If supplier cost, platform fee, delivery cost or retail pricing changes materially, update the row and preserve the previous value in the commercial history rather than silently overwriting the decision basis.
