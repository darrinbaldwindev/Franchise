import { describe, expect, it } from "vitest";
import { buildPerformanceHistory } from "./franchiseHistory";

const records = [
  { monthKey: "2026-06", operatingTarget: "80", wageBenchmark: "25", availabilityHours: "100", actualWorkHours: "60", completedBaskets: 100, customerSales: "5000", productCostPct: "60", deliveryCostPerBasket: "4", paymentCostPct: "2", royaltyPct: "3", reviewStatus: "approved" as const },
  { monthKey: "2026-07", operatingTarget: "80", wageBenchmark: "25", availabilityHours: "100", actualWorkHours: "72", completedBaskets: 132, customerSales: "6600", productCostPct: "60", deliveryCostPerBasket: "4", paymentCostPct: "2", royaltyPct: "3", reviewStatus: "awaiting-review" as const },
];

describe("Franchise Hub performance history", () => {
  it("derives trend points and month-over-month changes from saved records only", () => {
    const history = buildPerformanceHistory(records);

    expect(history).toHaveLength(2);
    expect(history[0]?.monthOverMonth).toBeNull();
    expect(history[1]).toMatchObject({ monthKey: "2026-07", sales: 6600, reviewStatus: "awaiting-review", monthOverMonth: { sales: 1600 } });
    expect(history[1]?.operatingContribution).toBeGreaterThan(history[0]?.operatingContribution ?? 0);
    expect(history[1]?.monthOverMonth?.earnedHours).toBeCloseTo(history[1]!.earnedHours - history[0]!.earnedHours);
  });
});
