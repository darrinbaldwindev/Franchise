# Franchise Hub production readiness

## Delivered production foundation

Franchise Hub is prepared as an authenticated full-stack dashboard. Each signed-in franchisee receives a tenant-isolated profile, period-specific business records, and a separate coaching-history record. Every dashboard KPI is derived on the server from the stored monthly input values; the browser does not calculate or persist the source-of-truth business metrics.

| Capability | Implementation status |
|---|---|
| Authentication and tenant isolation | Implemented with authenticated procedures and user-ID-scoped database queries. |
| Durable business data | Implemented for monthly workload, cost assumptions, target, wage benchmark, and generated coaching history. |
| Core KPI calculations | Implemented server-side for sales, contribution, Earned Hours, productivity, target progress, and selected-target scenarios. |
| Deterministic coaching | Implemented and grounded in server-calculated performance metrics. |
| LLM-assisted coaching | Implemented server-side using only the saved metric snapshot; structured output and a deterministic fallback are provided. |
| Input validation | Implemented using shared Zod schemas, including supported targets, valid period identifiers, non-negative numeric values, bounded percentages, and a positive wage benchmark. |
| Consumer and planning safeguards | Implemented through visible government-payment, financial-projection, and internal-planning disclaimers. |
| Record provenance and audit history | Implemented through required franchisee attestation, origin metadata, immutable saved-input snapshots, and tenant-isolated revision history. |
| Franchisor review controls | Implemented with administrator-only review queue and decision procedures, reviewer attribution and notes, status reset on franchisee revision, and immutable reviewer decision events. |
| Performance history | Implemented with tenant-scoped server recalculation of up to twelve saved months, month-over-month changes, review-state context, and responsive private trend reporting. |

## Data boundaries

The current dashboard accepts franchisee-entered monthly operating inputs. It validates and stores them securely, but does **not** independently verify the accuracy of those inputs. “Verified” in the UI should only be used after a future source integration, reconciliation process, or authorised review workflow confirms the recorded figures.

OAuth sign-in binds the callback state to a short-lived, host-only browser nonce before redeeming any code. At login start, the browser now confirms that it retained that nonce cookie before it redirects to OAuth; if not, it stays in the application and explains that cookies must be allowed. If the secure callback check is missing, stale, or mismatched, the callback still fails closed and shows a plain-language **Sign-in needs to restart** page rather than returning raw JSON. Neither path exchanges a code, weakens CSRF protection, or alters account or business data. Cookie-blocking contexts remain unsupported for OAuth sign-in.

On 23 August 2026, the owner confirmed that a fresh sign-in from a normal browser reached the dashboard after the nonce-cookie preflight update. The production runtime records OAuth initialization and rejected/missing-session conditions but intentionally does not log successful session credentials or callback values; the user-confirmed dashboard access is the end-to-end acceptance evidence.

The LLM never receives browser-entered draft values. Its input is assembled server-side after a saved record is re-read under the authenticated franchisee’s user ID. The LLM is instructed not to generate financial, tax, legal, pension, Centrelink, benefit, eligibility, or income advice. Deterministic server calculations remain the numerical source of truth.

Each monthly save now requires a franchisee attestation that the record is complete and accurate to the best of their knowledge. The server stores the attestation timestamp and a revision snapshot under the authenticated user ID. Changing any operating input clears the confirmation in the interface, requiring a fresh acknowledgement before the revised record can be saved. The dashboard exposes the source label, attestation state, revision count, and the latest five history events for that franchisee and month.

Authorised administrators can access a separate queue containing only **user-role franchisee** attested records awaiting review. Administrator-owned records are excluded by the server-side query and a defensive queue filter, preventing self-review when an administrator has saved operational records. Administrators may approve a record or return it for correction; a correction decision requires an explanatory note. Each decision is associated with the reviewer’s authenticated user ID and is retained as a separate audit event. Saving a revised franchisee record clears reviewer attribution and returns the record to the awaiting-review state; neither review action changes the franchisee’s saved calculation inputs.

The review queue has been observed in an authenticated administrator preview at desktop and mobile breakpoints, including navigation, queue visibility, the reviewer-note field, and both **Approve record** and **Return for correction** controls. On 24 August 2026, the queue initially exposed awaiting records owned by the administrator; this was corrected by enforcing the user-role franchisee filter on the server. Revalidation showed the administrator queue empty when only administrator-owned awaiting records exist. The controls were deliberately not activated, so no review decision or business input was changed. Automated coverage and the separate protected-service validation cover the decision path, the required correction note, reviewer attribution, and the audit-event payload without inserting fabricated business records into the production database. A browser acceptance pass with a distinct user-role franchisee awaiting-review record remains required.

An authorised zero-value attested record was subsequently approved through the protected server review service after explicit owner confirmation. Its review status, reviewer attribution, and immutable reviewer audit event were verified without changing its saved calculation inputs. This verifies the service and persistence boundary, but a separate browser-authenticated production acceptance review remains required to confirm the same decision in the live UI.

The client now uses hash-based navigation for application views. This keeps authenticated dashboard routes, including the franchisor review queue, reachable from production links such as `/#/reviews` without depending on server-side SPA deep-link rewriting. The managed hosting layer resolves direct `/reviews` requests before application code and returns its own 404 page, so published links and navigation must use the supported `/#/reviews` route form. The public hash route has been checked on the production domain and reaches the application’s authenticated access screen rather than the host 404 page.

The Trends view derives sales, operating contribution, Earned Hours, productivity, target progress, and month-over-month change indicators only from the authenticated franchisee’s saved monthly records. It does not accept arbitrary browser values for historical calculations. With no saved months, it presents an explicit empty state; with saved data, it displays comparative charts and per-month review context. The trends view remains an internal operating report, not a financial forecast, tax or government-payment assessment, or recommendation to act. During the 24 August 2026 acceptance review, the available multi-month record history had zero sales and zero Earned Hours, so the app correctly showed saved month-by-month context rather than inventing a meaningful activity chart. A populated-chart acceptance pass still requires authorised nonzero operating history.

When a franchisee has saved only one month, the Trends view now avoids a misleading one-point zero-value chart. Instead, it provides a clear first-month summary and explains that a comparison will appear after the next month is saved. This keeps the page useful for new franchisees without forcing them to interpret empty axes or technical reporting states.

The first-month summary includes an **Add another month** action that takes the franchisee directly back to the simple four-figure monthly-entry screen. This reduces navigation effort and makes the next step available at the moment it is most useful.

## Plain-language franchisee journey

The franchisee home view now follows a short, low-technicality sequence: choose a comfortable hours goal, enter four familiar monthly figures, confirm they have been checked, and select **Save and see my results**. Cost and pay assumptions remain available but are hidden until the franchisee chooses **Change cost and pay settings**, reducing initial cognitive load without weakening validation or changing the server-side calculation source.

Technical workflow phrases have been replaced in the franchisee view with plain-language status. For example, a record awaiting review is shown as **Being checked** with the message that nothing else is needed, while an approved record reads **Checked and ready**. Review evidence, revision history, and the administrative queue remain available for authorised users without being required knowledge for everyday use.

The home view also includes a dedicated **What to do next** panel. It gives one unambiguous action before a record is saved, then changes to the relevant plain-language status once a record is being checked, needs correction, or is approved. Browser-like interaction coverage verifies that the guidance renders correctly and that hidden cost settings only appear after the franchisee chooses to open them. The authenticated dashboard flow has been reviewed at desktop and mobile breakpoints.

The main save action is now deliberately unavailable until the franchisee completes the plain-language quick check. The interface states what is needed to unlock the action, rather than surfacing a technical error after a click. Interaction tests verify that an unconfirmed save does not invoke the save action and that it is enabled once the confirmation is selected.

The simplified franchisee workflow has been inspected at desktop and mobile breakpoints through the authenticated project preview. The preview session received a successful `auth.me` response and the month snapshot request was scoped to that signed-in account, confirming that the simplified view continues to use protected, user-specific data access.

The authenticated dashboard layout has been checked in the managed preview at desktop and mobile breakpoints. Saving real franchisee figures and calling the live coaching model requires the relevant franchisee to sign in under their own account; automated router tests cover the authenticated user-ID scoping, save path, coaching path, and fallback boundaries without inserting test business records into the production database.

## Deployment checklist

The project is compatible with the platform’s managed autoscaling runtime. Before publishing, ensure that the latest database migrations are applied, test and build commands pass, and the project is checkpointed. Publishing itself should be triggered from the project interface after the checkpoint is created.

| Validation command | Expected outcome |
|---|---|
| `pnpm test` | Metrics, validation, tenant isolation, coaching safeguards, and auth tests pass. |
| `pnpm check` | TypeScript completes without errors. |
| `pnpm build` | Client and server production bundles build successfully. |

## Remaining production integrations

The next product phase should connect authorised commerce, payment, delivery, and accounting sources so operating data can be reconciled rather than entered manually. It should also define a franchisor administration model, data-retention policy, consent and privacy notices, role-based review, and professional legal, accounting, and government-payment review before commercial use. The application deliberately does not determine individual government-payment eligibility or make financial outcome promises.
