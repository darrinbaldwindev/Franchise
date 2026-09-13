# Territory Routing — Implementation Readiness Packet

Status: non-production implementation handoff only.

This packet translates the canonical territory model in `docs/TERRITORY_ROUTING_AND_AUDIT_MODEL.md` into concrete application seams that can be implemented after the membership/authorized-context gate in Issue #18. It does not choose geography, delivery economics, overlap precedence, provider, franchise agreement terms, or any production migration behavior.

## Dependency gate

Territory routing must consume a server-derived authorized franchise context. It must not create a parallel tenancy model and must not trust a client-supplied `franchise_id`.

Required dependency flow:

`authenticated user -> active franchise membership -> authorized franchise context -> tenant-scoped territory operation`

If that context is absent, inactive, expired, or unauthorized, territory reads/writes fail closed.

## Persistence seams

### `delivery_areas`

Minimum implementation-facing fields:

- `delivery_area_id` — immutable identifier.
- `franchise_id` — owning/serving tenant, populated from authorized context on create.
- `area_version` — monotonically increasing version for an area lineage.
- `status` — `draft | active | suspended | retired`.
- `effective_from` — nullable activation timestamp.
- `effective_to` — nullable retirement timestamp.
- `geometry_reference` — provider-neutral reference/value; exact geometry representation remains implementation-specific.
- `routing_priority` — nullable. No default precedence may be invented while overlap policy is unresolved.
- `created_at`, `updated_at`.

Implementation invariant: an update that changes service geometry or lifecycle meaning creates a new effective version or preserves enough immutable historical state for previous routing decisions to remain reproducible. Historical decisions must never be rewritten to point at a later area version.

### `routing_decisions`

Minimum immutable audit fields:

- `decision_id`.
- `decided_at`.
- `request_location_reference` — normalized/non-secret location reference suitable for later explanation.
- `candidate_delivery_area_ids`.
- `candidate_area_versions`.
- `selected_delivery_area_id` or null.
- `selected_franchise_id` or null.
- `result_code` — at minimum `ROUTED`, `UNSERVICEABLE`, `AMBIGUOUS`, `UNAUTHORIZED`.
- `decision_policy_version`.
- `match_evidence` — provider/matcher evidence reference, not credentials.
- `fallback_or_overlap_path`.
- `actor_id` / authorized-context reference sufficient for audit.

Implementation invariant: routing audit rows are append-only evidence. Later delivery-area changes do not mutate an earlier decision record.

## Service/API boundary

The application worker should expose a provider-neutral service seam equivalent to:

`resolveServiceability(location, authorizedContext, policyContext) -> RoutingDecision`

Rules:

1. `authorizedContext` is server-derived from canonical membership tenancy.
2. Candidate areas are tenant-safe reads of active/effective area versions.
3. No match returns `UNSERVICEABLE`.
4. Only expired/suspended/retired matches return `UNSERVICEABLE`.
5. Multiple eligible matches with no explicit approved precedence return `AMBIGUOUS`; never pick an arbitrary area.
6. A client-supplied franchise/area identifier is never authority. If accepted as a hint for UI continuity, it must be checked against the resolved server context and cannot broaden scope.
7. Every final decision writes one immutable audit record, including denied/ambiguous outcomes where safe and appropriate.
8. Order creation may consume a successful routing decision, but must bind the order to the exact selected franchise/area/version from that decision rather than re-resolving from client state.

## Ownership-preserving mutation contract

Area creation/update must be tenant-scoped from authorized context:

- create: `franchise_id` is injected from context; client attempts to set another tenant are rejected;
- read/list: filter by authorized tenant unless an explicitly separate privileged administrative path is later approved;
- update/status transition: fetch by `(delivery_area_id, franchise_id)` or equivalent tenant-scoped key before mutation;
- delete: prefer lifecycle retirement over destructive deletion where audit/history would otherwise break;
- cross-tenant identifiers fail as not-authorized/not-found without leaking whether another tenant owns the resource.

No territory service may become an alternate authority layer. Authorization is upstream; territory code only consumes the authorized context.

## Deterministic non-production acceptance matrix

| Case | Setup | Expected result | Required evidence |
| --- | --- | --- | --- |
| T1 single active match | location is inside one active/effective Area A for authorized Franchise A | `ROUTED` to A | decision records A id + exact version |
| T2 no match | location outside all active areas | `UNSERVICEABLE` | no selected franchise/area; audit row explains no match |
| T3 inactive-only | location matches only suspended/retired/expired area | `UNSERVICEABLE` | inactive version present in evidence, not selected |
| T4 unresolved overlap | two eligible active areas match and no approved precedence exists | `AMBIGUOUS` | both candidates recorded; no arbitrary winner |
| T5 forged tenant input | authorized Franchise A request contains client franchise B | reject/fail closed | zero B-scoped mutation/read; denial evidence |
| T6 A/B read isolation | Franchise A context queries identifier owned by B | denied/not found | no B data returned |
| T7 A/B write isolation | Franchise A context tries to mutate B area | denied | B row/version unchanged |
| T8 tenant-scoped create | A creates area while payload claims B | reject or persist as A only according to validated API contract | never create B-owned row from A context |
| T9 historical reproducibility | route at Area A v1, later activate v2 | old decision still explains v1 | decision evidence unchanged after v2 |
| T10 lifecycle transition | active area becomes suspended | new requests no longer route to it | prior successful decisions remain unchanged |
| T11 decision/order correlation | successful decision is used to create an order fixture | order stores exact decision/area/version/franchise linkage | correlation IDs match exactly |
| T12 unauthorized context | no active membership/authorized context | fail closed before territory operation | zero tenant-scoped mutation; no arbitrary default tenant |

## Migration/readiness constraints

- Schema/migration generation may be prepared in development, but this packet authorizes no production migration application.
- Existing reporting/history must not be backfilled with invented routing decisions.
- Legacy rows lacking territory evidence remain explicitly `UNKNOWN`/legacy rather than fabricated as if routing had occurred.
- Any backfill proposed later must distinguish deterministic derivation from inferred data and preserve source/provenance.
- Provider credentials, live map calls, delivery pricing, radii and customer promises remain out of scope.

## Definition of ready for implementation review

A worker implementation can be presented for review only when it supplies:

1. exact branch and head;
2. schema/migration files generated but not applied to production;
3. server-derived authorized-context consumption with no client tenant authority;
4. tenant-scoped repositories/services;
5. T1–T12 automated tests or an explicit mapping showing why a case is not yet executable;
6. frozen install, unit/integration tests, typecheck and production build results;
7. a migration-safety note proving no fabricated historical transactions/routing decisions;
8. independent reproduction after worker-reported validation.

## Explicit UNKNOWN / owner-gated policy values

The following remain intentionally unset and must not be hard-coded as implied policy:

- actual franchise delivery-area geometries;
- polygon/postcode/radius/provider method;
- delivery fee/free-delivery economics or maximum service radius;
- overlap precedence/fallback winner rules;
- authority to approve territory changes;
- franchise-agreement/legal effect of territory changes;
- customer-facing serviceability promises.

Until those decisions are approved, the safe behavior for unresolved overlap is `AMBIGUOUS` and for no approved service match is `UNSERVICEABLE`.