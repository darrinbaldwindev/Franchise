import { describe, expect, it } from "vitest";
import { isFranchiseeReviewCandidate } from "./franchisorReviewQueue";

describe("franchisor review queue candidate boundary", () => {
  it("includes franchisee-owned records and excludes administrator-owned records", () => {
    expect(isFranchiseeReviewCandidate({ franchiseeRole: "user", monthlyRecordId: 12 })).toBe(true);
    expect(isFranchiseeReviewCandidate({ franchiseeRole: "admin", monthlyRecordId: 13 })).toBe(false);
  });
});
