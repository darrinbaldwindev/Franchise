import { describe, expect, it } from "vitest";
import { buildMonthlyRevisionEntry } from "./franchiseAudit";

const attestedInput = {
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
  attestationConfirmed: true as const,
};

describe("Franchise Hub monthly revision entries", () => {
  it("creates an attested snapshot for the first saved monthly record", () => {
    const entry = buildMonthlyRevisionEntry({ userId: 7, monthlyRecordId: 41, input: attestedInput, alreadyExists: false });

    expect(entry).toMatchObject({
      userId: 7,
      monthlyRecordId: 41,
      monthKey: "2026-08",
      action: "created",
      inputSnapshot: { attestationConfirmed: true, dataOrigin: "franchisee-attested", customerSales: 7400 },
    });
  });

  it("marks a later saved record as updated while retaining the renewed attestation snapshot", () => {
    const entry = buildMonthlyRevisionEntry({ userId: 7, monthlyRecordId: 41, input: { ...attestedInput, customerSales: 7900 }, alreadyExists: true });

    expect(entry.action).toBe("updated");
    expect(entry.inputSnapshot).toMatchObject({ attestationConfirmed: true, customerSales: 7900, dataOrigin: "franchisee-attested" });
  });
});
