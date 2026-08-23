import { describe, expect, it } from "vitest";
import { buildReviewDecision } from "./franchisorReviewAudit";
import { reviewMonthlyRecordSchema } from "./franchiseHubSchemas";

describe("Franchisor review safeguards", () => {
  it("requires an explanatory note when a record is returned for correction", () => {
    expect(reviewMonthlyRecordSchema.safeParse({ monthlyRecordId: 12, decision: "needs-correction", reviewerNote: "" }).success).toBe(false);
    expect(reviewMonthlyRecordSchema.safeParse({ monthlyRecordId: 12, decision: "needs-correction", reviewerNote: "Please reconcile delivery cost." }).success).toBe(true);
  });

  it("creates an immutable reviewer-attributed audit event without carrying any franchisee calculation inputs", () => {
    const reviewedAt = new Date("2026-08-23T00:00:00.000Z");
    const decision = buildReviewDecision({
      franchiseeUserId: 44,
      monthlyRecordId: 93,
      reviewerId: 1,
      input: { monthlyRecordId: 93, decision: "approved", reviewerNote: "Figures checked." },
      reviewedAt,
    });

    expect(decision.recordUpdate).toEqual({ reviewStatus: "approved", reviewerId: 1, reviewerNote: "Figures checked.", reviewedAt });
    expect(decision.auditEvent).toEqual({ franchiseeUserId: 44, monthlyRecordId: 93, reviewerId: 1, action: "approved", reviewerNote: "Figures checked." });
    expect(decision.recordUpdate).not.toHaveProperty("customerSales");
    expect(decision.recordUpdate).not.toHaveProperty("actualWorkHours");
    expect(decision.auditEvent).not.toHaveProperty("customerSales");
  });
});
