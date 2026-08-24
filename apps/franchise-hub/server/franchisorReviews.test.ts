import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  getFranchiseSnapshot: vi.fn(), getFranchiseRevisionHistory: vi.fn(), getFranchisePerformanceHistory: vi.fn(), saveFranchiseMonthlyRecord: vi.fn(), saveCoachingRecord: vi.fn(),
  getReviewQueue: vi.fn(), reviewMonthlyRecord: vi.fn(),
}));
vi.mock("./db", () => dbMocks);
import { appRouter } from "./routers";

function createContext(role: "admin" | "user"): TrpcContext {
  return { user: { id: role === "admin" ? 1 : 2, openId: role, email: `${role}@example.test`, name: role, loginMethod: "manus", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"] };
}

describe("Franchisor review authorization", () => {
  it("allows an administrator to load the review queue and records their reviewer ID on a decision", async () => {
    dbMocks.getReviewQueue.mockResolvedValue([]);
    dbMocks.reviewMonthlyRecord.mockResolvedValue({ monthlyRecordId: 44, status: "approved" });
    const caller = appRouter.createCaller(createContext("admin"));
    await caller.franchisorReviews.queue();
    await caller.franchisorReviews.decide({ monthlyRecordId: 44, decision: "approved", reviewerNote: "Figures checked." });
    expect(dbMocks.getReviewQueue).toHaveBeenCalledTimes(1);
    expect(dbMocks.reviewMonthlyRecord).toHaveBeenCalledWith(1, { monthlyRecordId: 44, decision: "approved", reviewerNote: "Figures checked." });
  });

  it("blocks non-admin users from review queue and decision procedures", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.franchisorReviews.queue()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.franchisorReviews.decide({ monthlyRecordId: 44, decision: "approved", reviewerNote: "" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
