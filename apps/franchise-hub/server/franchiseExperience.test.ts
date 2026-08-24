import { describe, expect, it } from "vitest";
import { getPlainReviewStatus } from "../shared/franchiseExperience";

describe("plain-language review status", () => {
  it("turns internal review states into clear next-step language", () => {
    expect(getPlainReviewStatus("awaiting-review")).toMatchObject({ label: "Being checked", message: expect.stringContaining("Nothing else") });
    expect(getPlainReviewStatus("approved")).toMatchObject({ label: "Checked and ready", message: expect.stringContaining("all set") });
    expect(getPlainReviewStatus("needs-correction")).toMatchObject({ label: "One small change needed", message: expect.stringContaining("save") });
  });
});
