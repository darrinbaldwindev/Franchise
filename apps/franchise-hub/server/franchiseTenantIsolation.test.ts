import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  getFranchiseSnapshot: vi.fn(),
  getFranchiseRevisionHistory: vi.fn(),
  getFranchisePerformanceHistory: vi.fn(),
  getReviewQueue: vi.fn(),
  reviewMonthlyRecord: vi.fn(),
  saveFranchiseMonthlyRecord: vi.fn(),
  saveCoachingRecord: vi.fn(),
}));

vi.mock("./db", () => dbMocks);

import { appRouter } from "./routers";

function createContext(userId: number): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `franchisee-${userId}`,
      email: `franchisee-${userId}@example.test`,
      name: "Franchisee",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const monthlyInput = {
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

describe("Franchise Hub tenant isolation", () => {
  it("uses the authenticated user ID for every monthly snapshot read", async () => {
    dbMocks.getFranchiseSnapshot.mockResolvedValue(null);
    const caller = appRouter.createCaller(createContext(42));

    await caller.franchiseHub.snapshot("2026-08");

    expect(dbMocks.getFranchiseSnapshot).toHaveBeenCalledWith(42, "2026-08");
  });

  it("uses the authenticated user ID for every monthly record write", async () => {
    dbMocks.saveFranchiseMonthlyRecord.mockResolvedValue({ monthKey: "2026-08" });
    const caller = appRouter.createCaller(createContext(73));

    await caller.franchiseHub.saveMonthlyRecord(monthlyInput);

    expect(dbMocks.saveFranchiseMonthlyRecord).toHaveBeenCalledWith(73, monthlyInput);
  });

  it("uses the authenticated user ID for revision-history reads", async () => {
    dbMocks.getFranchiseRevisionHistory.mockResolvedValue([]);
    const caller = appRouter.createCaller(createContext(88));

    await caller.franchiseHub.revisionHistory("2026-08");

    expect(dbMocks.getFranchiseRevisionHistory).toHaveBeenCalledWith(88, "2026-08");
  });

  it("uses the authenticated user ID for historical reporting reads", async () => {
    dbMocks.getFranchisePerformanceHistory.mockResolvedValue([]);
    const caller = appRouter.createCaller(createContext(91));

    await caller.franchiseHub.performanceHistory();

    expect(dbMocks.getFranchisePerformanceHistory).toHaveBeenCalledWith(91);
  });
});
