import { describe, expect, it } from "vitest";
import { calculatePerformance, createDeterministicCoaching } from "./franchiseMetrics";

const referenceInputs = {
  operatingTarget: 80,
  wageBenchmark: 25,
  availabilityHours: 126,
  actualWorkHours: 64,
  completedBaskets: 148,
  customerSales: 7400,
  productCostPct: 60,
  deliveryCostPerBasket: 4,
  paymentCostPct: 2,
  royaltyPct: 3,
};

describe("Franchise Hub verified metric calculations", () => {
  it("calculates contribution, Earned Hours, productivity, and projections from saved inputs", () => {
    const metrics = calculatePerformance(referenceInputs);

    expect(metrics.averageBasket).toBe(50);
    expect(metrics.basketsPerHour).toBeCloseTo(2.3125);
    expect(metrics.operatingContribution).toBe(1998);
    expect(metrics.earnedHours).toBeCloseTo(79.92);
    expect(metrics.productivity).toBeCloseTo(1.24875);
    expect(metrics.targetProgressPct).toBe(80);
    expect(metrics.projectedSales).toBe(9250);
    expect(metrics.projectedEarnedHours).toBeCloseTo(99.9);
  });

  it("never divides by zero when no actual work or baskets are recorded", () => {
    const metrics = calculatePerformance({ ...referenceInputs, actualWorkHours: 0, completedBaskets: 0, customerSales: 0 });

    expect(metrics.averageBasket).toBe(0);
    expect(metrics.basketsPerHour).toBe(0);
    expect(metrics.productivity).toBe(0);
    expect(metrics.projectedSales).toBe(0);
  });

  it("raises deterministic flags for below-benchmark efficiency and workload above target", () => {
    const metrics = calculatePerformance({ ...referenceInputs, actualWorkHours: 100, completedBaskets: 150, customerSales: 6000 });
    const coaching = createDeterministicCoaching(metrics);

    expect(coaching.flags).toContain("low_baskets_per_hour");
    expect(coaching.flags).toContain("sub_benchmark_contribution");
    expect(coaching.flags).toContain("above_target_workload");
  });
});
