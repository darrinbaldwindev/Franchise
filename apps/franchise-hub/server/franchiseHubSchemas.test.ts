import { describe, expect, it } from "vitest";
import { saveMonthlyBusinessInputSchema } from "./franchiseHubSchemas";

const validInput = {
  monthKey: "2026-08",
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
  attestationConfirmed: true,
};

describe("Franchise Hub input validation", () => {
  it("accepts a complete, valid monthly record", () => {
    expect(saveMonthlyBusinessInputSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejects unsupported targets, invalid months, negative values, and zero wage benchmarks", () => {
    expect(saveMonthlyBusinessInputSchema.safeParse({ ...validInput, operatingTarget: 37 }).success).toBe(false);
    expect(saveMonthlyBusinessInputSchema.safeParse({ ...validInput, monthKey: "2026-13" }).success).toBe(false);
    expect(saveMonthlyBusinessInputSchema.safeParse({ ...validInput, customerSales: -1 }).success).toBe(false);
    expect(saveMonthlyBusinessInputSchema.safeParse({ ...validInput, wageBenchmark: 0 }).success).toBe(false);
    expect(saveMonthlyBusinessInputSchema.safeParse({ ...validInput, attestationConfirmed: false }).success).toBe(false);
  });
});
