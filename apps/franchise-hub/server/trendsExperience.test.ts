import { describe, expect, it } from "vitest";
import { getTrendDisplayMode } from "../shared/trendsExperience";

describe("simple trends display", () => {
  it("uses a helpful first-month message instead of a one-point zero chart", () => {
    expect(getTrendDisplayMode([{ sales: 0, earnedHours: 0 }])).toBe("first-month");
  });

  it("shows charts only when comparison history can be useful", () => {
    expect(getTrendDisplayMode([{ sales: 0, earnedHours: 0 }, { sales: 0, earnedHours: 0 }])).toBe("needs-activity");
    expect(getTrendDisplayMode([{ sales: 10, earnedHours: 1 }, { sales: 20, earnedHours: 2 }])).toBe("charts");
  });
});
