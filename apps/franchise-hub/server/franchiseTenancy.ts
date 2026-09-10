export type FranchiseMembershipStatus = "active" | "inactive" | "expired";
export type FranchiseRole = "owner" | "manager" | "staff" | "viewer";

export type FranchiseMembership = {
  franchiseId: number;
  userId: number;
  role: FranchiseRole;
  status: FranchiseMembershipStatus;
  effectiveFrom: Date;
  effectiveTo: Date | null;
};

export type AuthorizedFranchiseContext = Readonly<{
  userId: number;
  franchiseId: number;
  role: FranchiseRole;
  membershipStatus: "active";
}>;

export class FranchiseAuthorizationError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "FranchiseAuthorizationError";
  }
}

function isActiveAt(membership: FranchiseMembership, now: Date): boolean {
  if (membership.status !== "active") return false;
  if (membership.effectiveFrom.getTime() > now.getTime()) return false;
  if (membership.effectiveTo && membership.effectiveTo.getTime() <= now.getTime()) return false;
  return true;
}

/**
 * Resolve one immutable tenant context from server-loaded memberships.
 *
 * `requestedFranchiseId` is never authority. It can only narrow an already
 * authorized membership set. Franchise #1 intentionally fails closed if the
 * user has more than one active membership and no requested scope is supplied;
 * no client-side franchise switching semantics are inferred here.
 */
export function resolveAuthorizedFranchiseContext(input: {
  authenticatedUserId: number | null | undefined;
  memberships: readonly FranchiseMembership[];
  requestedFranchiseId?: number | null;
  now?: Date;
}): AuthorizedFranchiseContext {
  const { authenticatedUserId, memberships, requestedFranchiseId = null } = input;
  const now = input.now ?? new Date();

  if (!Number.isInteger(authenticatedUserId) || Number(authenticatedUserId) <= 0) {
    throw new FranchiseAuthorizationError("AUTHENTICATION_REQUIRED");
  }
  if (!Array.isArray(memberships)) {
    throw new FranchiseAuthorizationError("MEMBERSHIP_EVIDENCE_REQUIRED");
  }

  const active = memberships.filter(
    membership => membership.userId === authenticatedUserId && isActiveAt(membership, now),
  );

  if (requestedFranchiseId !== null) {
    if (!Number.isInteger(requestedFranchiseId) || Number(requestedFranchiseId) <= 0) {
      throw new FranchiseAuthorizationError("INVALID_FRANCHISE_SCOPE");
    }
    const match = active.find(membership => membership.franchiseId === requestedFranchiseId);
    if (!match) throw new FranchiseAuthorizationError("FRANCHISE_SCOPE_NOT_AUTHORIZED");
    return Object.freeze({
      userId: authenticatedUserId as number,
      franchiseId: match.franchiseId,
      role: match.role,
      membershipStatus: "active" as const,
    });
  }

  if (active.length === 0) throw new FranchiseAuthorizationError("ACTIVE_MEMBERSHIP_REQUIRED");
  if (active.length !== 1) throw new FranchiseAuthorizationError("FRANCHISE_SCOPE_REQUIRED");

  const membership = active[0];
  return Object.freeze({
    userId: authenticatedUserId as number,
    franchiseId: membership.franchiseId,
    role: membership.role,
    membershipStatus: "active" as const,
  });
}

export function requireFranchiseRole(
  context: AuthorizedFranchiseContext,
  allowedRoles: readonly FranchiseRole[],
): AuthorizedFranchiseContext {
  if (!allowedRoles.includes(context.role)) {
    throw new FranchiseAuthorizationError("FRANCHISE_ROLE_NOT_AUTHORIZED");
  }
  return context;
}
