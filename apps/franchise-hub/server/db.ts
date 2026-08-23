import { and, asc, count, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, coachingRecords, franchiseProfiles, monthlyBusinessRecordReviewEvents, monthlyBusinessRecordRevisions, monthlyBusinessRecords, users } from "../drizzle/schema";
import { calculatePerformance, createDeterministicCoaching } from "./franchiseMetrics";
import { buildMonthlyRevisionEntry } from "./franchiseAudit";
import { buildReviewDecision } from "./franchisorReviewAudit";
import { buildPerformanceHistory } from "./franchiseHistory";
import type { ReviewMonthlyRecordInput, SaveMonthlyBusinessInput } from "./franchiseHubSchemas";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId, lastSignedIn: user.lastSignedIn ?? new Date() };
  const updateSet: Record<string, unknown> = { lastSignedIn: user.lastSignedIn ?? new Date() };
  for (const field of ["name", "email", "loginMethod"] as const) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

const asNumber = (value: string | number) => Number(value);

export async function getFranchiseSnapshot(userId: number, monthKey: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const [profile] = await db.select().from(franchiseProfiles).where(eq(franchiseProfiles.userId, userId)).limit(1);
  const [record] = await db.select().from(monthlyBusinessRecords).where(and(eq(monthlyBusinessRecords.userId, userId), eq(monthlyBusinessRecords.monthKey, monthKey))).limit(1);
  if (!profile || !record) return null;
  const [revisionSummary] = await db.select({ revisionCount: count(monthlyBusinessRecordRevisions.id) }).from(monthlyBusinessRecordRevisions).where(and(eq(monthlyBusinessRecordRevisions.userId, userId), eq(monthlyBusinessRecordRevisions.monthlyRecordId, record.id)));
  const [latestRevision] = await db.select().from(monthlyBusinessRecordRevisions).where(and(eq(monthlyBusinessRecordRevisions.userId, userId), eq(monthlyBusinessRecordRevisions.monthlyRecordId, record.id))).orderBy(desc(monthlyBusinessRecordRevisions.createdAt)).limit(1);

  const verifiedInputs = {
    operatingTarget: asNumber(record.operatingTarget),
    wageBenchmark: asNumber(record.wageBenchmark),
    availabilityHours: asNumber(record.availabilityHours),
    actualWorkHours: asNumber(record.actualWorkHours),
    completedBaskets: record.completedBaskets,
    customerSales: asNumber(record.customerSales),
    productCostPct: asNumber(record.productCostPct),
    deliveryCostPerBasket: asNumber(record.deliveryCostPerBasket),
    paymentCostPct: asNumber(record.paymentCostPct),
    royaltyPct: asNumber(record.royaltyPct),
  };
  const performance = calculatePerformance(verifiedInputs);

  return {
    monthKey,
    monthlyRecordId: record.id,
    profile: { operatingTarget: verifiedInputs.operatingTarget, wageBenchmark: verifiedInputs.wageBenchmark },
    record: {
      availabilityHours: verifiedInputs.availabilityHours,
      actualWorkHours: verifiedInputs.actualWorkHours,
      completedBaskets: verifiedInputs.completedBaskets,
      customerSales: verifiedInputs.customerSales,
      productCostPct: verifiedInputs.productCostPct,
      deliveryCostPerBasket: verifiedInputs.deliveryCostPerBasket,
      paymentCostPct: verifiedInputs.paymentCostPct,
      royaltyPct: verifiedInputs.royaltyPct,
      dataOrigin: record.dataOrigin,
      attestationConfirmed: record.attestationConfirmed,
      attestedAt: record.attestedAt,
      reviewStatus: record.reviewStatus,
      reviewerNote: record.reviewerNote,
      reviewedAt: record.reviewedAt,
      updatedAt: record.updatedAt,
    },
    audit: {
      revisionCount: Number(revisionSummary?.revisionCount ?? 0),
      latestAction: latestRevision?.action ?? null,
      latestRecordedAt: latestRevision?.createdAt ?? null,
    },
    performance,
    deterministicCoaching: createDeterministicCoaching(performance),
  };
}

export async function saveFranchiseMonthlyRecord(userId: number, input: SaveMonthlyBusinessInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  await db.insert(franchiseProfiles).values({
    userId,
    operatingTarget: input.operatingTarget.toFixed(2),
    wageBenchmark: input.wageBenchmark.toFixed(2),
  }).onDuplicateKeyUpdate({
    set: { operatingTarget: input.operatingTarget.toFixed(2), wageBenchmark: input.wageBenchmark.toFixed(2) },
  });

  const recordValues = {
    userId,
    monthKey: input.monthKey,
    operatingTarget: input.operatingTarget.toFixed(2),
    wageBenchmark: input.wageBenchmark.toFixed(2),
    availabilityHours: input.availabilityHours.toFixed(2),
    actualWorkHours: input.actualWorkHours.toFixed(2),
    completedBaskets: input.completedBaskets,
    customerSales: input.customerSales.toFixed(2),
    productCostPct: input.productCostPct.toFixed(2),
    deliveryCostPerBasket: input.deliveryCostPerBasket.toFixed(2),
    paymentCostPct: input.paymentCostPct.toFixed(2),
    royaltyPct: input.royaltyPct.toFixed(2),
    dataOrigin: "franchisee-attested",
    attestationConfirmed: true,
    attestedAt: new Date(),
    reviewStatus: "awaiting-review" as const,
    reviewerId: null,
    reviewerNote: null,
    reviewedAt: null,
  };
  const [existingRecord] = await db.select({ id: monthlyBusinessRecords.id }).from(monthlyBusinessRecords).where(and(eq(monthlyBusinessRecords.userId, userId), eq(monthlyBusinessRecords.monthKey, input.monthKey))).limit(1);
  await db.insert(monthlyBusinessRecords).values(recordValues).onDuplicateKeyUpdate({ set: recordValues });
  const [savedRecord] = await db.select({ id: monthlyBusinessRecords.id }).from(monthlyBusinessRecords).where(and(eq(monthlyBusinessRecords.userId, userId), eq(monthlyBusinessRecords.monthKey, input.monthKey))).limit(1);
  if (!savedRecord) throw new Error("The saved monthly record could not be retrieved");
  await db.insert(monthlyBusinessRecordRevisions).values(buildMonthlyRevisionEntry({
    userId,
    monthlyRecordId: savedRecord.id,
    input,
    alreadyExists: Boolean(existingRecord),
  }));
  const snapshot = await getFranchiseSnapshot(userId, input.monthKey);
  if (!snapshot) throw new Error("The saved monthly record could not be calculated");
  return snapshot;
}

export async function getFranchiseRevisionHistory(userId: number, monthKey: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select({
    id: monthlyBusinessRecordRevisions.id,
    action: monthlyBusinessRecordRevisions.action,
    createdAt: monthlyBusinessRecordRevisions.createdAt,
  }).from(monthlyBusinessRecordRevisions).where(and(eq(monthlyBusinessRecordRevisions.userId, userId), eq(monthlyBusinessRecordRevisions.monthKey, monthKey))).orderBy(desc(monthlyBusinessRecordRevisions.createdAt)).limit(5);
}

export async function getFranchisePerformanceHistory(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const records = await db.select({
    monthKey: monthlyBusinessRecords.monthKey,
    operatingTarget: monthlyBusinessRecords.operatingTarget,
    wageBenchmark: monthlyBusinessRecords.wageBenchmark,
    availabilityHours: monthlyBusinessRecords.availabilityHours,
    actualWorkHours: monthlyBusinessRecords.actualWorkHours,
    completedBaskets: monthlyBusinessRecords.completedBaskets,
    customerSales: monthlyBusinessRecords.customerSales,
    productCostPct: monthlyBusinessRecords.productCostPct,
    deliveryCostPerBasket: monthlyBusinessRecords.deliveryCostPerBasket,
    paymentCostPct: monthlyBusinessRecords.paymentCostPct,
    royaltyPct: monthlyBusinessRecords.royaltyPct,
    reviewStatus: monthlyBusinessRecords.reviewStatus,
  }).from(monthlyBusinessRecords)
    .where(eq(monthlyBusinessRecords.userId, userId))
    .orderBy(asc(monthlyBusinessRecords.monthKey))
    .limit(12);
  return buildPerformanceHistory(records);
}

export async function getReviewQueue() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select({
    monthlyRecordId: monthlyBusinessRecords.id,
    franchiseeUserId: monthlyBusinessRecords.userId,
    franchiseeName: users.name,
    franchiseeEmail: users.email,
    monthKey: monthlyBusinessRecords.monthKey,
    customerSales: monthlyBusinessRecords.customerSales,
    actualWorkHours: monthlyBusinessRecords.actualWorkHours,
    attestedAt: monthlyBusinessRecords.attestedAt,
    updatedAt: monthlyBusinessRecords.updatedAt,
    reviewStatus: monthlyBusinessRecords.reviewStatus,
  }).from(monthlyBusinessRecords)
    .innerJoin(users, eq(monthlyBusinessRecords.userId, users.id))
    .where(and(eq(monthlyBusinessRecords.attestationConfirmed, true), eq(monthlyBusinessRecords.reviewStatus, "awaiting-review")))
    .orderBy(desc(monthlyBusinessRecords.updatedAt));
}

export async function reviewMonthlyRecord(reviewerId: number, input: ReviewMonthlyRecordInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const [record] = await db.select().from(monthlyBusinessRecords).where(eq(monthlyBusinessRecords.id, input.monthlyRecordId)).limit(1);
  if (!record) throw new Error("Monthly record was not found");
  if (!record.attestationConfirmed) throw new Error("Only franchisee-attested monthly records can be reviewed");

  const reviewedAt = new Date();
  const decision = buildReviewDecision({
    franchiseeUserId: record.userId,
    monthlyRecordId: record.id,
    reviewerId,
    input,
    reviewedAt,
  });
  await db.update(monthlyBusinessRecords).set(decision.recordUpdate).where(eq(monthlyBusinessRecords.id, record.id));
  await db.insert(monthlyBusinessRecordReviewEvents).values(decision.auditEvent);
  return { monthlyRecordId: record.id, status: input.decision, reviewedAt };
}

export async function saveCoachingRecord({
  userId,
  monthlyRecordId,
  source,
  headline,
  recommendations,
  verifiedMetrics,
}: {
  userId: number;
  monthlyRecordId: number;
  source: "llm" | "deterministic-fallback";
  headline: string;
  recommendations: string[];
  verifiedMetrics: Record<string, number>;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.insert(coachingRecords).values({
    userId,
    monthlyRecordId,
    source,
    headline,
    recommendations,
    verifiedMetrics,
  });
}
