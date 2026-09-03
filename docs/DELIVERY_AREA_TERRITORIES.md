# Delivery-Area Territories

## Status and authority

**Status:** Implementation-ready domain and operating specification.
**Authority:** The owner has confirmed that **franchise territories are defined by delivery area**. This document records that decision without defining unapproved exclusivity, commercial, contractual, price, provider, or production-release rules.

## 1. Purpose

This specification turns the delivery-area territory rule into the minimum domain, routing, audit, and testing requirements needed before Franchise #1 expands to multi-franchise commerce.

A delivery-area territory is not an arbitrary suburb, postcode, or sales allocation. It is the centrally configured set of customer delivery addresses that an approved franchise kitchen is currently authorised, able, and commercially configured to serve. It changes with operating hours, capacity, service mode, and approved delivery configuration. Customer-facing suburb and postcode lists may be used as explanatory aids, but they are not the authoritative territory boundary.

> **Territory = an active franchise delivery area evaluated at the delivery address, for a specific time and service mode.**

This design extends the target territory model in `docs/DOMAIN_MODEL.md` and must be implemented within the existing franchise-membership and request-scoped authorisation boundary in `docs/TENANCY_AUTHORIZATION.md`. A delivery area is an operating attribute of an authorised franchise. It never substitutes for franchise tenancy or makes a client-supplied `franchise_id` trustworthy.

## 2. Confirmed rule and scope boundary

| Item | Rule |
|---|---|
| Territory definition | A franchise territory is defined by its delivery area. |
| Authoritative service decision | The server evaluates the entered delivery address against the active delivery-area configuration and the relevant operating conditions. |
| Customer-facing aids | Suburbs, postcodes, maps, and coverage copy are explanatory only; they must not override the address-level serviceability decision. |
| Franchise assignment | Every completed order must be assigned to one authorised franchise context and the resolved delivery-area version. |
| Changes | Delivery-area changes must be versioned, effective-dated, authorised, and auditable. Historical orders retain the delivery-area result recorded at order time. |
| Overlap | Two or more active areas may overlap only through an explicit, centrally configured assignment/fallback rule. |
| Excluded scope | This document does not approve a delivery radius, geography, exclusivity promise, fee/free-delivery policy, provider, capacity threshold, franchise agreement term, or production deployment. |

## 3. Address-level serviceability

The server must determine whether a proposed customer order is serviceable. The decision is based on the **delivery address**, current order, requested time, and active franchise configuration.

```text
serviceable(address, order, requested_time) requires:
    1. an active delivery area matches the normalised service address;
    2. the assigned franchise is active and has an authorised operating context;
    3. the kitchen is open for the requested fulfilment window;
    4. capacity is available under the approved service policy;
    5. requested products/services are available to the delivery area;
    6. an approved delivery or pickup path is available; and
    7. any configured service or economic guardrail is satisfied.
```

The first version may be intentionally simple—for example, one active delivery area and one Franchise #1 membership—but it must use the same domain boundary and server-authorised routing flow required for future duplication. The application must not add a client-side-only map check or accept a requested franchise ID as a substitute for the server decision.

| Customer result | Required platform behaviour | Required audit outcome |
|---|---|---|
| **Serviceable now** | Permit checkout using the assigned delivery/pickup option and approved customer terms. | Persist the franchise ID, delivery-area version, routing decision time, and selected fulfilment path. |
| **Serviceable later** | Show the next approved fulfilment window only where preorder functionality exists. | Record the selected future service rule/version. |
| **Pickup only** | Permit pickup only if the kitchen/site configuration supports it. | Do not record a delivery territory assignment as a delivery order. |
| **Temporarily unavailable** | Explain that the area cannot currently be served without making an unsupported permanent promise. | Record the operational reason code: closed, capacity, provider, product, safety, or other approved state. |
| **Outside coverage** | Decline delivery and offer only approved alternatives. | Record a privacy-safe coverage outcome; do not create an order for an unauthorised franchise. |

## 4. Domain model

The system should model delivery areas as first-class, versioned records. The names below are domain names, not required physical database table names. Implementation must inspect the existing schema and follow the approved migration strategy; no production migration is authorised by this document.

| Entity | Required responsibility | Minimum fields / relationships |
|---|---|---|
| **Franchise** | The authorised commercial operating unit and tenant. | `franchise_id`, status, activation dates, configuration references. |
| **Franchise membership** | Connects an authenticated person to an authorised franchise role. | Membership ID, `franchise_id`, `user_id`, role, status, effective dates. |
| **Delivery area** | Identifies the active serviceable area associated with one franchise. | `delivery_area_id`, `franchise_id`, status, name/display label, active version reference, effective dates. |
| **Delivery-area version** | Preserves the rules used at a point in time. | Version ID, `delivery_area_id`, geometry/address-match rules, service modes, effective dates, change reason, approver/audit reference. |
| **Service policy** | Separates configurable delivery conditions from geometry. | Hours, capacity state/rules, applicable delivery paths, customer fee/free-delivery configuration, item/service restrictions, approved guardrails. |
| **Routing decision** | Creates immutable evidence of how an address/order was assigned. | Order/candidate reference, normalised address reference, selected `franchise_id`, `delivery_area_version_id`, decision time, service mode, precedence/fallback reason. |
| **Delivery performance record** | Captures real operating outcome for area analysis. | Actual delivery cost, distance/time where supplied, provider outcome, delay/failure reason, refund/exception links. |

### 4.1 Historical integrity

Every completed order must retain the commercial and routing context used at the time the customer was served. A later delivery-area edit must not rewrite the franchise assignment, customer terms, or performance analysis of historical orders. Reprocessing may be permitted for an explicit operational purpose, but it must create a new traceable decision rather than silently replacing the original.

### 4.2 Relationship to tenancy

The required tenancy flow remains:

```text
Authenticate user
  → resolve active franchise membership(s)
  → establish immutable authorised franchise context
  → access franchise-owned records only through that context
```

Customer address routing is separate from staff authorisation. The routing service may determine the intended franchise for a new customer order, but staff reading or mutating that order must use an authorised franchise context. All franchise-owned order, inventory, delivery, and financial queries must enforce the franchise scope in the service/repository layer.

## 5. Routing and overlap rules

### 5.1 Deterministic routing flow

1. Normalise and validate the entered delivery address using the approved address/serviceability mechanism.
2. Identify active delivery-area versions that match the address and requested service time.
3. Exclude candidates whose franchise is inactive, whose applicable service mode is disabled, whose kitchen is closed, whose capacity is unavailable, or whose approved product/service conditions are not met.
4. If one eligible candidate remains, assign that franchise and persist the routing decision.
5. If multiple eligible candidates remain, apply the **centrally configured precedence rule** and persist the rule/result.
6. If no eligible candidate remains, return an approved unavailable or pickup-only result and do not create a delivery order.

The precedence rule must be explicit and versioned. Examples that may be considered by the owner later include a primary-area assignment, approved capacity balancing, approved cost/time priority, or a temporary cross-coverage policy. This specification does not choose one because the choice affects franchisee opportunity, customer promise, economics, and agreement wording.

### 5.2 Overlap and fallback controls

| Event | Required control |
|---|---|
| New/changed area overlaps an active franchise area | The configuration requires review against the existing area, approved precedence, and relevant franchise agreement terms before activation. |
| Assigned kitchen is temporarily unavailable | Fallback is permitted only where an alternative franchise/area is active, authorised, and able to meet the approved customer terms. The reason must be recorded. |
| Provider coverage changes | The system marks the affected service path unavailable or revised according to the approved service policy; it must not assume previous coverage remains valid. |
| Kitchen reaches capacity | The customer sees the next approved option or temporary unavailability; capacity is not overridden by a local client action. |
| Customer changes address during checkout | The routing decision is recalculated before payment/order confirmation and the new outcome is retained. |
| Delivery fails after order acceptance | The exception/refund/retry path preserves the original routing decision and records the actual outcome/cost. |

## 6. Delivery-area lifecycle and change control

A delivery-area territory has a lifecycle. It must not be edited informally in a local map, static text list, or frontend constant.

| Lifecycle state | Meaning | Minimum evidence |
|---|---|---|
| **Draft** | A proposed area exists but is not visible to customers or routable. | Candidate map/rule, site/delivery feasibility evidence, owner/authorised review reference. |
| **Approved for test** | The area can be used for controlled serviceability tests or a soft launch. | Active kitchen, provider/service evidence, capacity rules, support process. |
| **Active** | Customer orders may be routed using the current version. | Approved policy, configuration audit, current operational status. |
| **Temporarily paused** | The area cannot currently accept delivery orders. | Reason code and effective time; customer-facing state is accurate. |
| **Superseded** | A newer version replaced the service rules/boundary. | Prior version preserved; change reason/approver recorded. |
| **Retired** | The franchise no longer serves the area. | Closeout reason, effective time, historical orders retained. |

Any change that affects customer delivery terms, a franchisee’s opportunity, price/free-delivery condition, or external contract must follow the relevant owner and legal approval process. The application can support the state and audit trail without deciding those commercial terms itself.

## 7. Metrics by delivery area

The network must report actual delivery-area performance, not only whole-franchise aggregates. This is necessary to decide whether an area is viable, whether it should be changed, and whether a new franchise should be opened nearby.

| Metric | Definition | Decision supported |
|---|---|---|
| Demand density | Completed and attempted orders by delivery-area version and time window. | Whether demand supports continuing, expanding, or duplicating service. |
| Average basket | Net sales divided by completed orders in the area. | Whether order values support delivery cost and contribution. |
| Actual delivery cost | Provider/driver cost attributed to the completed order. | Whether the delivery policy is economically viable. |
| Contribution per order | Net sales less direct product/food, packaging, delivery/platform, payment, and approved franchise costs. | Whether the territory is sustainable after actual costs. |
| Contribution per delivery distance/time | Contribution relative to recorded provider distance/time where data is available. | Whether fringe areas are structurally expensive to serve. |
| Delivery service quality | Acceptance, pickup, completion, delay, cancellation, failure, and refund results. | Whether the customer promise can be met. |
| Capacity utilisation | Order load, ticket time, capacity pauses, and delayed fulfilment. | Whether to increase capacity, reduce coverage, or open the next location. |
| Repeat demand | Repeat purchase observations under approved privacy rules. | Whether an area has durable demand instead of launch-only interest. |

## 8. Acceptance criteria and test matrix

The delivery-area feature is not complete merely because a map can be displayed. It is complete only when address routing, franchise tenancy, state handling, historical integrity, and financial attribution are proven with automated and operational tests.

| Test | Expected result |
|---|---|
| Address inside one active area | Server assigns the correct active franchise and delivery-area version. |
| Address outside every active area | Checkout cannot create a delivery order; approved alternative/response is returned. |
| Customer-supplied franchise ID conflicts with the resolved area | Server ignores/rejects the unauthorised requested scope and uses the authorised routing result. |
| Two active areas overlap | Server uses the configured precedence rule and retains the rule/reason in the routing decision. |
| Assigned franchise has no active staff membership | Authorised staff access is denied; operational escalation is required rather than silent unauthorised processing. |
| Franchise A user requests Franchise B order | Read/write access is denied even if the order’s address is in B’s active delivery area. |
| Kitchen is closed or capacity-paused | The address is not offered as immediately serviceable; no invalid order is created. |
| Address is changed during checkout | Routing and any delivery terms are recalculated before confirmation; the final decision is persisted. |
| Delivery area is revised after an order completes | Historical order retains its original delivery-area version and financial/routing attribution. |
| Provider cost changes after delivery | Actual delivery cost updates the order/financial record through an auditable reconciliation; original routing evidence remains. |

## 9. Implementation sequence

This work follows, rather than bypasses, the P0 tenancy gate. The order of work should be:

1. Implement the franchise and membership authorisation boundary described in `docs/TENANCY_AUTHORIZATION.md` and `docs/application/APP_TENANCY_IMPLEMENTATION_SPEC.md`.
2. Add the minimum delivery-area and versioned service-policy domain records through an approved, reversible migration plan.
3. Implement server-side address-level serviceability and deterministic routing for the simple Franchise #1 case.
4. Persist routing decisions and connect delivery-area attribution to orders, fulfilment/delivery, and contribution reporting.
5. Add the acceptance tests in this document, including cross-franchise isolation and overlap/fallback cases.
6. Configure the first area from verified delivery-provider, site, capacity, and commercial evidence.
7. Run controlled real-world tests before changing coverage or activating a second franchise delivery area.

No production migration, deployment, provider activation, customer communication, territory change, franchise offer, or commercial policy change is authorised by this specification.

## 10. Open owner decisions

| Decision | Why it remains open |
|---|---|
| Delivery-boundary method | The business must choose and validate the appropriate address-set, polygon, drive-time, radius, or hybrid method for the actual delivery provider and customer promise. |
| Serviceability/viability guardrails | Capacity, time, distance, fee, free-delivery, and contribution settings must be informed by Franchise #1 evidence and approved as commercial policy. |
| Overlap precedence/fallback | This determines order assignment and potential franchisee opportunity in adjacent areas. |
| Franchise territory terms | The legal agreement must define exclusivity/non-exclusivity, area changes, cross-coverage, dispute treatment, and customer order attribution where relevant. |
| Change authority | The organisation must assign who may draft, approve, activate, pause, and retire delivery areas and which changes require owner/legal review. |
| Data/privacy treatment | Address retention, aggregation, access, and reporting must be designed under the approved privacy/security model. |

## References

- `docs/DOMAIN_MODEL.md`
- `docs/TENANCY_AUTHORIZATION.md`
- `docs/application/APP_TENANCY_IMPLEMENTATION_SPEC.md`
- `docs/ORDER_ECONOMICS.md`
- `docs/OPENING_FRANCHISE_1.md`
- `docs/continuity/SHARED.md`
