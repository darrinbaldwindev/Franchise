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
const llmMocks = vi.hoisted(() => ({
  listLLMModels: vi.fn(),
  invokeLLM: vi.fn(),
}));

vi.mock("./db", () => dbMocks);
vi.mock("./_core/llm", () => llmMocks);

import { appRouter } from "./routers";

const performance = {
  sales: 7400,
  availabilityHours: 126,
  actualWorkHours: 64,
  operatingTarget: 80,
  wageBenchmark: 25,
  averageBasket: 50,
  basketsPerHour: 2.3125,
  productCost: 4440,
  deliveryCost: 592,
  paymentCost: 148,
  royalty: 222,
  operatingContribution: 1998,
  earnedHours: 79.92,
  productivity: 1.24875,
  targetProgressPct: 80,
  targetProgressBarPct: 80,
  remainingTargetHours: 16,
  projectedBaskets: 185,
  projectedSales: 9250,
  projectedContribution: 2497.5,
  projectedEarnedHours: 99.9,
};

function createContext(): TrpcContext {
  return {
    user: { id: 13, openId: "franchisee-13", email: "franchisee@example.test", name: "Franchisee", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("Franchise Hub LLM coaching safeguards", () => {
  it("grounds generated coaching in the authenticated franchisee's saved metrics and records it with that tenant", async () => {
    dbMocks.getFranchiseSnapshot.mockResolvedValue({
      monthKey: "2026-08",
      monthlyRecordId: 91,
      performance,
      deterministicCoaching: { headline: "Keep monitoring contribution.", actions: ["Keep monitoring contribution."], flags: [] },
    });
    llmMocks.listLLMModels.mockResolvedValue({ data: [{ id: "gpt-5-mini" }] });
    llmMocks.invokeLLM.mockResolvedValue({ choices: [{ message: { content: JSON.stringify({ headline: "Review basket-building offers.", recommendations: ["Consider product bundles.", "Monitor delivery batching."] }) } }] });

    const result = await appRouter.createCaller(createContext()).franchiseHub.generateCoaching("2026-08");

    expect(dbMocks.getFranchiseSnapshot).toHaveBeenCalledWith(13, "2026-08");
    expect(llmMocks.invokeLLM).toHaveBeenCalledTimes(1);
    expect(dbMocks.saveCoachingRecord).toHaveBeenCalledWith(expect.objectContaining({
      userId: 13,
      monthlyRecordId: 91,
      source: "llm",
      verifiedMetrics: performance,
    }));
    expect(result).toMatchObject({ source: "llm", headline: "Review basket-building offers." });
    expect(result.disclaimer).toContain("not financial");
  });
});
