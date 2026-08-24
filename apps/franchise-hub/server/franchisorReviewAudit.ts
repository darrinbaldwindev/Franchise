import type { ReviewMonthlyRecordInput } from "./franchiseHubSchemas";

export function buildReviewDecision({
  franchiseeUserId,
  monthlyRecordId,
  reviewerId,
  input,
  reviewedAt,
}: {
  franchiseeUserId: number;
  monthlyRecordId: number;
  reviewerId: number;
  input: ReviewMonthlyRecordInput;
  reviewedAt: Date;
}) {
  return {
    recordUpdate: {
      reviewStatus: input.decision,
      reviewerId,
      reviewerNote: input.reviewerNote || null,
      reviewedAt,
    },
    auditEvent: {
      franchiseeUserId,
      monthlyRecordId,
      reviewerId,
      action: input.decision,
      reviewerNote: input.reviewerNote,
    },
  };
}
