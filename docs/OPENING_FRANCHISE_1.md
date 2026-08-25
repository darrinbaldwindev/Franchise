# Franchise #1 — Opening Master Checklist

**Owner:** Darrin  
**Primary objective:** Get one franchise to opening stage, then operate and maintain it before expanding the platform.  
**Project sequence:** Build → Open → Operate → Maintain → Improve → Replicate

## How to use this document

This is the master operational milestone for the project. It deliberately starts at **Gate 3 — Products & Pricing** because Gates 1 and 2 are being deferred for now.

For every item, use one of:

- **[ ] Not started**
- **[~] In progress**
- **[x] Verified complete**
- **[!] Blocked**
- **[-] Deferred**

A task is not complete merely because it is documented. Where practical, completion requires evidence from the actual business, repository, test environment, or supplier.

---

# Gate 3 — Products, Catalogue & Pricing

**Goal:** Know exactly what Franchise #1 sells, what every SKU costs, what it sells for, and what contribution remains after delivery/platform economics.

## 3.1 Product range

- [ ] Define the initial V1 SKU list.
- [ ] Confirm all V1 products are packaged, shelf-stable goods suitable for the intended model.
- [ ] Exclude perishables from V1.
- [ ] Identify core/high-volume products.
- [ ] Identify entry-price products.
- [ ] Identify higher-margin products.
- [ ] Identify products that support basket building toward the $50 free-delivery threshold.
- [ ] Identify unsuitable/low-margin products and exclude or separately price them.

## 3.2 SKU master

For every SKU record:

- [ ] Product name.
- [ ] Brand.
- [ ] Pack size.
- [ ] Barcode/GTIN where available.
- [ ] Supplier.
- [ ] Wholesale cost.
- [ ] Freight/inbound cost where material.
- [ ] GST treatment.
- [ ] Shelf-life/storage requirements.
- [ ] Selling price.
- [ ] Expected gross margin.
- [ ] Expected contribution after delivery/platform costs.
- [ ] Reorder point.
- [ ] Opening quantity.

## 3.3 Pricing

- [ ] Establish V1 pricing methodology.
- [ ] Model 1.5x, 2x, 2.5x and 3x scenarios where useful.
- [ ] Compare relevant competitor pricing.
- [ ] Include free-delivery economics in the actual contribution model.
- [ ] Verify current delivery/platform commission and fee assumptions before final pricing.
- [ ] Establish minimum acceptable contribution per order.
- [ ] Establish minimum acceptable contribution by SKU/category.
- [ ] Confirm the $50 free-delivery threshold is economically viable under realistic delivery costs.
- [ ] Identify loss-leading/low-markup products deliberately rather than accidentally.

## 3.4 Product data/compliance

- [ ] Obtain supplier product/label information for every SKU.
- [ ] Confirm product descriptions and claims are accurate.
- [ ] Confirm required packaged-food label information is present on supplier packaging.
- [ ] Confirm allergen information can be supplied to customers.
- [ ] Confirm storage instructions where applicable.
- [ ] Confirm date-mark/stock-rotation process.
- [ ] Confirm country-of-origin information where required.
- [ ] Confirm any nutrition/health claims used online are supported and lawful.

**Evidence note:** FSANZ sets Australian food labelling standards; most packaged foods have specific labelling requirements, and allergen declarations are mandatory where applicable. citeturn0search6turn0search13

## 3.5 Gate 3 exit criteria

- [ ] V1 SKU list approved.
- [ ] SKU costs verified from supplier evidence.
- [ ] V1 retail prices approved.
- [ ] Delivery economics incorporated.
- [ ] Contribution model produces sensible results for a $50 basket.
- [ ] Product data ready for storefront import.

---

# Gate 4 — Minimum Technology Required to Sell

**Goal:** A customer can order and pay, and the franchisee can receive and process the order.

## 4.1 Franchise security

- [ ] Implement the minimum correct relationship: User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation.
- [ ] Prevent client-supplied franchise switching without server authorization.
- [ ] Test Franchise A cannot read Franchise B.
- [ ] Test Franchise A cannot mutate Franchise B.
- [ ] Test inactive membership is denied.
- [ ] Test unauthorized franchise switching is denied.
- [ ] Test franchise-owned records require authorized franchise scope.

## 4.2 Catalogue

- [ ] Load V1 products.
- [ ] Display price.
- [ ] Display pack/size information.
- [ ] Display availability.
- [ ] Display required customer-facing product information.
- [ ] Support product search/category navigation at V1 scale.

## 4.3 Basket and checkout

- [ ] Add/remove product.
- [ ] Change quantity.
- [ ] Calculate basket subtotal.
- [ ] Apply delivery policy.
- [ ] Apply $50 free-delivery threshold if confirmed.
- [ ] Calculate final payable amount.
- [ ] Collect delivery address.
- [ ] Process payment.
- [ ] Create durable order record.
- [ ] Send order confirmation.

## 4.4 Franchisee order workflow

- [ ] New order notification.
- [ ] View order details.
- [ ] Accept/process order.
- [ ] Pick items.
- [ ] Mark unavailable/substitute/cancel where required.
- [ ] Pack order.
- [ ] Handoff to delivery.
- [ ] Complete order.
- [ ] Record exceptions/refunds.

## 4.5 Inventory

- [ ] Opening stock loaded.
- [ ] Sale reduces available stock.
- [ ] Manual stock adjustment available.
- [ ] Out-of-stock state prevents invalid sales.
- [ ] Basic reorder visibility exists.

## 4.6 Financial output

- [ ] Record sale.
- [ ] Record product cost.
- [ ] Record delivery/platform cost.
- [ ] Calculate contribution.
- [ ] Calculate franchise fee according to approved/configurable rule.
- [ ] Expose basic daily/weekly reporting.

## 4.7 Work and earned hours

- [ ] Record actual work sessions.
- [ ] Distinguish actual work from store opening hours.
- [ ] Calculate earned hours from verified contribution and configured wage benchmark.
- [ ] Make clear that earned hours are an internal management metric, not an employment/tax/pension entitlement calculation.

## 4.8 Production readiness

- [ ] Remove or provably development-gate the public Manus debug collector.
- [ ] Verify secrets are not committed.
- [ ] Verify production error handling.
- [ ] Verify customer data is appropriately protected.
- [ ] Verify migration history is distinct from applying production migrations.
- [ ] Confirm backup/recovery approach appropriate to V1.

## 4.9 Gate 4 exit criteria

- [ ] Complete test order can travel from customer checkout to franchisee fulfilment.
- [ ] Payment is confirmed.
- [ ] Inventory updates.
- [ ] Contribution is calculated.
- [ ] Franchisee can see/process the order.
- [ ] Security tests pass.
- [ ] No known blocker prevents a controlled real-world test.

---

# Gate 5 — Physical Operating Procedure

**Goal:** The home-based franchise can physically fulfil and dispatch an order consistently.

## 5.1 Stock

- [ ] Opening stock received.
- [ ] Stock counted against purchase records.
- [ ] Storage locations assigned.
- [ ] FIFO/expiry rotation process defined where relevant.
- [ ] Damaged/expired stock procedure defined.
- [ ] Reorder procedure defined.

## 5.2 Pick/pack

- [ ] Standard picking sequence defined.
- [ ] Packing materials available.
- [ ] Order verification step defined.
- [ ] Tamper-evident packaging used where appropriate.
- [ ] Customer/order identification process defined.

## 5.3 Delivery

- [ ] Delivery provider selected for V1.
- [ ] Delivery coverage confirmed.
- [ ] Delivery fee/commission assumptions verified.
- [ ] Pickup process tested.
- [ ] Failed-delivery procedure defined.
- [ ] Customer notification procedure defined.
- [ ] Refund/cancellation procedure defined.

Queensland guidance notes that third-party delivery providers can be used and that fees/commission vary, so actual commercial terms must be verified before launch. citeturn0search1

## 5.4 Customer service

- [ ] Customer support contact established.
- [ ] Missing-item procedure.
- [ ] Damaged-item procedure.
- [ ] Incorrect-order procedure.
- [ ] Cancellation/refund procedure.
- [ ] Delivery-failure procedure.

## 5.5 Gate 5 exit criteria

- [ ] Three simulated orders can be picked and packed consistently.
- [ ] Delivery handoff works.
- [ ] Exception procedures are usable.

---

# Gate 6 — Franchisee Training

**Goal:** A franchisee can operate V1 without developer assistance.

- [ ] System login training.
- [ ] Product/catalogue training.
- [ ] Stock receiving/counting training.
- [ ] Pick/pack training.
- [ ] Order processing training.
- [ ] Delivery handoff training.
- [ ] Refund/cancellation training.
- [ ] Customer service training.
- [ ] Daily opening procedure.
- [ ] Daily closing procedure.
- [ ] Weekly stock/reorder procedure.
- [ ] Basic financial dashboard training.
- [ ] Work-session recording training.
- [ ] Earned-hours interpretation training.
- [ ] Troubleshooting guide.
- [ ] Escalation procedure.

## Gate 6 exit criteria

- [ ] Franchisee completes a simulated order without agent/developer intervention.
- [ ] Franchisee can explain what happens when stock, delivery or payment fails.
- [ ] Franchisee can perform opening/closing procedures independently.

---

# Gate 7 — End-to-End Test

**Goal:** Prove the entire business loop before public launch.

## Test A — Normal order

- [ ] Customer places order.
- [ ] Payment succeeds.
- [ ] Order reaches franchisee.
- [ ] Franchisee picks order.
- [ ] Order is packed.
- [ ] Delivery pickup occurs.
- [ ] Customer receives order.
- [ ] Order completes.
- [ ] Inventory decreases.
- [ ] Contribution is calculated.
- [ ] Earned hours update.

## Test B — Stock problem

- [ ] Customer attempts to order unavailable item.
- [ ] System prevents invalid fulfilment or provides approved exception path.
- [ ] Customer/franchisee outcome is correct.
- [ ] Financial records remain correct.

## Test C — Delivery failure

- [ ] Delivery fails.
- [ ] Franchisee sees exception.
- [ ] Customer is informed.
- [ ] Refund/retry process works.
- [ ] Financial records remain correct.

## Test D — Cancellation/refund

- [ ] Order cancellation requested.
- [ ] Refund processed correctly.
- [ ] Inventory state correct.
- [ ] Financial records correct.

## Test E — Security

- [ ] Unauthorized user cannot access franchise data.
- [ ] Franchise A cannot access Franchise B data.
- [ ] Franchise switching is server-authorized.
- [ ] Inactive membership is rejected.

## Gate 7 exit criteria

- [ ] All critical test cases pass.
- [ ] No unresolved P0/P1 launch blocker.
- [ ] Results are recorded with evidence/commit/version.

---

# Gate 8 — Controlled Opening

**Goal:** Open Franchise #1 to a small real customer group before broad promotion.

- [ ] Opening hours configured.
- [ ] Service area confirmed.
- [ ] V1 catalogue live.
- [ ] Opening stock live.
- [ ] Payment live.
- [ ] Delivery live.
- [ ] Customer support live.
- [ ] Monitoring/reporting live.
- [ ] Soft-launch customer group selected.
- [ ] First live order completed successfully.
- [ ] First 10 live orders reviewed.
- [ ] First 25 live orders reviewed.
- [ ] Pricing/margin assumptions compared against actuals.
- [ ] Delivery cost compared against model.
- [ ] Picking/packing time measured.
- [ ] Customer issues recorded.
- [ ] Repeat-order behaviour recorded.

## Opening exit criteria

Franchise #1 is considered **OPEN** when a real customer can place a real paid order, the franchisee can fulfil it, delivery can complete, the financial result is recorded correctly, and the franchisee can repeat the process without developer intervention.

---

# Post-Opening — Operate & Maintain

Once open, development priority changes from building features to improving the real business.

- [ ] Track average basket value.
- [ ] Track contribution per order.
- [ ] Track delivery cost.
- [ ] Track fulfilment time.
- [ ] Track stock accuracy.
- [ ] Track customer complaints.
- [ ] Track refunds/cancellations.
- [ ] Track repeat customers.
- [ ] Track actual work hours.
- [ ] Track earned hours.
- [ ] Compare actual economics against the franchise model.
- [ ] Fix operational bottlenecks before adding scale features.

Only after the first franchise demonstrates a stable operating model should the project prioritise replication/network features.

---

# Agent Ownership

## ChatGPT — primary suitability

ChatGPT is the **primary lead for Gate 3 and the commercial/requirements side of the opening plan** because this work requires:

- product/pricing analysis;
- margin and contribution reasoning;
- delivery economics;
- business-model consistency;
- market/compliance research;
- requirements definition;
- scope control;
- independent challenge of assumptions.

ChatGPT should create the decision framework and verified requirements, not merely write speculative product lists.

## Manus — primary suitability

Manus is the **primary lead for Gate 4 technology implementation and application validation** because its project environment provides direct implementation, testing, database and managed-workspace capabilities.

Manus should implement the smallest secure V1 required by this checklist and provide first-hand validation evidence.

## Shared / Manus + ChatGPT

Gate 5 onward should be collaborative:

- ChatGPT: business process, economics, requirements and challenge.
- Manus: implementation, integration, technical testing and operational tooling.
- Overseer: scope control, independent repository review, risk detection and cross-project recommendations.
- Continuity Steward: keep the logs and shared state synchronized.

## Darrin

Darrin remains final decision authority, particularly for:

- commercial assumptions;
- product selection;
- pricing;
- supplier choices;
- franchise package;
- launch timing;
- legal/compliance decisions.

---

# Current starting point

**Gates 1–2: DEFERRED by owner.**

**Gate 3: START HERE.**

The first immediate deliverable should be a verified V1 SKU/pricing/contribution model suitable for importing into the eventual storefront.

The next autonomous action should therefore be:

> **Build and validate the V1 product/pricing/economics dataset, using current Australian supplier/market evidence and the project's existing $50 free-delivery model.**

Do not expand the technology platform while Gate 3 remains materially unresolved unless the work is required to unblock Gate 3.

---

# Scope-control principle

> **One franchise first. Prove it works. Then maintain it. Then replicate it.**
