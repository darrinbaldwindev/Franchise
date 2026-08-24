export type ReviewQueueRole = "admin" | "user";

export type ReviewQueueCandidate<T> = T & {
  franchiseeRole: ReviewQueueRole;
};

export function isFranchiseeReviewCandidate<T>(candidate: ReviewQueueCandidate<T>) {
  return candidate.franchiseeRole === "user";
}
