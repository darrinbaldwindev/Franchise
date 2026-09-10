import { describe, expect, it } from "vitest";
import {
  FranchiseAuthorizationError,
  requireFranchiseRole,
  resolveAuthorizedFranchiseContext,
  type FranchiseMembership,
} from "./franchiseTenancy";

const now = new Date("2026-09-10T00:00:00Z");

function membership(overrides: Partial<FranchiseMembership> = {}): FranchiseMembership {
  return {
    franchiseId: 101,
    userId: 7,
    role: "owner",
    status: "active",
    effectiveFrom: new Date("2026-01-01T00:00:00Z"),
    effectiveTo: null,
    ...overrides,
  };
}

function expectCode(fn: () => unknown, code: string) {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(FranchiseAuthorizationError);
    expect((error as FranchiseAuthorizationError).code).toBe(code);
    return;
  }
  throw new Error(`expected ${code}`);
}

describe("server-derived franchise tenancy context", () => {
  it("denies unauthenticated requests", () => {
    expectCode(() => resolveAuthorizedFranchiseContext({ authenticatedUserId: null, memberships: [] }), "AUTHENTICATION_REQUIRED");
  });

  it("denies a user with no active membership", () => {
    expectCode(() => resolveAuthorizedFranchiseContext({ authenticatedUserId: 7, memberships: [], now }), "ACTIVE_MEMBERSHIP_REQUIRED");
  });

  it("allows the only active membership without trusting a client tenant id", () => {
    const context = resolveAuthorizedFranchiseContext({ authenticatedUserId: 7, memberships: [membership()], now });
    expect(context).toEqual({ userId: 7, franchiseId: 101, role: "owner", membershipStatus: "active" });
    expect(Object.isFrozen(context)).toBe(true);
  });

  it("rejects cross-tenant scope supplied by the client", () => {
    expectCode(() => resolveAuthorizedFranchiseContext({
      authenticatedUserId: 7,
      memberships: [membership()],
      requestedFranchiseId: 202,
      now,
    }), "FRANCHISE_SCOPE_NOT_AUTHORIZED");
  });

  it("allows requested scope only when the authenticated user has that active membership", () => {
    const context = resolveAuthorizedFranchiseContext({
      authenticatedUserId: 7,
      memberships: [membership({ franchiseId: 101 }), membership({ franchiseId: 202, role: "manager" })],
      requestedFranchiseId: 202,
      now,
    });
    expect(context).toMatchObject({ userId: 7, franchiseId: 202, role: "manager" });
  });

  it("fails closed when multiple memberships exist and scope is omitted", () => {
    expectCode(() => resolveAuthorizedFranchiseContext({
      authenticatedUserId: 7,
      memberships: [membership({ franchiseId: 101 }), membership({ franchiseId: 202 })],
      now,
    }), "FRANCHISE_SCOPE_REQUIRED");
  });

  it.each([
    membership({ status: "inactive" }),
    membership({ status: "expired" }),
    membership({ effectiveFrom: new Date("2027-01-01T00:00:00Z") }),
    membership({ effectiveTo: new Date("2026-09-09T23:59:59Z") }),
  ])("denies inactive, expired or out-of-window membership", candidate => {
    expectCode(() => resolveAuthorizedFranchiseContext({ authenticatedUserId: 7, memberships: [candidate], now }), "ACTIVE_MEMBERSHIP_REQUIRED");
  });

  it("does not use another user's membership as authority", () => {
    expectCode(() => resolveAuthorizedFranchiseContext({
      authenticatedUserId: 7,
      memberships: [membership({ userId: 8 })],
      requestedFranchiseId: 101,
      now,
    }), "FRANCHISE_SCOPE_NOT_AUTHORIZED");
  });

  it("enforces role restrictions after tenant context is established", () => {
    const viewer = resolveAuthorizedFranchiseContext({ authenticatedUserId: 7, memberships: [membership({ role: "viewer" })], now });
    expectCode(() => requireFranchiseRole(viewer, ["owner", "manager"]), "FRANCHISE_ROLE_NOT_AUTHORIZED");
    expect(requireFranchiseRole(viewer, ["viewer"])).toBe(viewer);
  });
});
