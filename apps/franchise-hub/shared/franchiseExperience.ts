export type ReviewStatus = "awaiting-review" | "approved" | "needs-correction";

export function getPlainReviewStatus(status: ReviewStatus) {
  if (status === "approved") {
    return { label: "Checked and ready", message: "Your figures have been checked. You are all set for this month." };
  }
  if (status === "needs-correction") {
    return { label: "One small change needed", message: "Read the note below, make the change, and save your numbers again." };
  }
  return { label: "Being checked", message: "Your figures have been sent for a quick check. Nothing else is needed right now." };
}
