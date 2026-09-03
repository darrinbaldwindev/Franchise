# Franchise Territory Routing and Audit Model

**Status:** implementation handoff / non-production
**Scope:** Franchise #1 opening prerequisite; documentation only

## 1. Canonical territory definition

A franchise territory is the **active delivery area assigned to a franchise**. Territory is not derived from the authenticated user's identity and is not established by a client-supplied `franchise_id`.

Canonical relationship:

`User → Active Franchise Membership → Authorized Franchise Context → Territory eligibility → Tenant-scoped order/fulfilment operation`

A franchise may have one or more versioned delivery-area records over time. Only an active, effective record may participate in serviceability decisions.

## 2. Minimum territory record

A production implementation should support at least:

- `territory_id`
- `franchise_id`
- `status` (`draft`, `active`, `superseded`, `retired`)
- `effective_from`
- `effective_to` (nullable for the current version)
- geographic boundary/reference sufficient for the selected serviceability method
- serviceability method/version reference
- configuration/version metadata
- created/updated timestamps and actor references

Do not hard-code a delivery radius, postcode list, suburb list, fee, free-delivery threshold, or other commercial rule in the routing engine. Those are configuration/business decisions and remain subject to owner approval.

## 3. Serviceability decision

For an order address, the server should:

1. normalise the address using the approved address/serviceability method;
2. resolve the authenticated user's active franchise membership;
3. load the active territory version authorised for that franchise;
4. evaluate serviceability using the stored territory rule/version;
5. return a deterministic decision (`eligible`, `ineligible`, or `unable_to_resolve`);
6. bind the resulting order/fulfilment context to the resolved `franchise_id` and `territory_id` server-side.

The client must not be able to select an arbitrary franchise or territory and thereby change the routing scope.

## 4. Versioning and lifecycle

Territory changes must create a new version or otherwise preserve an auditable effective-dated history. Historical orders must retain the territory/routing version used when the order was accepted.

Rules:

- at most one effective territory version should be authoritative for a franchise at a given decision time;
- future changes may be staged without affecting the current version;
- superseding a territory must not rewrite historical routing decisions;
- retiring a territory must not erase its historical audit records;
- overlapping effective versions must be rejected or explicitly resolved before activation.

## 5. Overlap and fallback controls

For Franchise #1, the initial implementation should avoid ambiguous overlap by enforcing one authoritative territory for a given address/time within the franchise's service boundary.

If multiple franchise territories eventually overlap, routing precedence must be an explicit, versioned business rule rather than an incidental database/order-of-results behaviour. Until such a rule is approved, ambiguous overlap should fail closed as `unable_to_resolve` and require operator review rather than silently assigning an order.

There must be no implicit fallback to another franchise merely because the first candidate is unavailable.

## 6. Routing decision audit record

Each material serviceability/routing decision should retain enough evidence to reproduce the decision without storing unnecessary customer data.

Minimum audit fields:

- `routing_decision_id`
- timestamp
- request/correlation identifier
- authenticated actor/service context
- resolved `franchise_id`
- resolved `territory_id`
- territory configuration/version identifier
- serviceability method/version
- decision (`eligible`, `ineligible`, `unable_to_resolve`)
- reason/result code
- relevant non-sensitive address reference or normalised serviceability key
- order identifier once an order exists

Do not store raw sensitive address payloads in a general audit log when a minimal reproducible reference is sufficient. Apply the project's data-minimisation and access-control rules.

## 7. Order binding

Once serviceability is accepted for an order, the server must persist the resolved franchise and territory context with the order/fulfilment record. Later fulfilment operations must use that persisted authorised context rather than re-reading an untrusted client value.

A routing decision must never grant access to records belonging to a different franchise.

## 8. Metrics and operational reporting

Routing metrics should distinguish at least:

- serviceability requests;
- eligible requests;
- ineligible requests;
- unresolved/ambiguous requests;
- routed orders;
- routing failures;
- territory-version changes;
- manual routing interventions.

Metrics must be aggregated within authorised franchise scope. They must not expose another franchise's operational data to an unauthorised user.

## 9. Required acceptance tests

The implementation should include deterministic tests for:

1. an address inside the active territory is eligible;
2. an address outside the active territory is ineligible;
3. an expired territory version is not used;
4. a future territory version does not affect current decisions;
5. historical orders retain their original territory/version;
6. overlapping active versions fail closed unless an approved precedence rule exists;
7. an inactive franchise membership cannot obtain routing context;
8. Franchise A cannot route/read/mutate Franchise B data;
9. a client-supplied `franchise_id` cannot override the server-derived context;
10. a client-supplied `territory_id` cannot override the server-derived context;
11. ambiguous serviceability does not silently select a fallback franchise;
12. routing decisions have reproducible audit identifiers and version references.

## 10. Owner/legal/commercial gates retained

This document does **not** decide:

- the geographic boundary method for Franchise #1;
- the actual delivery area/radius/postcode set;
- delivery pricing or free-delivery rules;
- overlap precedence between independently operated franchises;
- contractual territory rights;
- regulatory/legal treatment of territory exclusivity;
- the external delivery provider or geocoding provider.

Those decisions must be confirmed before the corresponding production configuration is activated.

## 11. Security boundary

Territory routing is downstream of the canonical membership gate. It must not be used as a substitute for tenant authorisation.

Required security relationship:

`User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation`

No routing input, address, cookie, query parameter, or client-provided franchise identifier may elevate a user's authority.

## 12. Implementation sequence

1. Implement the approved membership/tenant boundary (Issue #15).
2. Introduce the minimal territory/version records within that authorised tenant context.
3. Implement server-side serviceability resolution.
4. Persist routing decisions and order territory binding.
5. Add the acceptance tests above.
6. Independently reproduce tests/build/typecheck before production consideration.

This handoff deliberately stops before provider-specific or commercial territory configuration so that implementation can proceed without inventing owner decisions.
