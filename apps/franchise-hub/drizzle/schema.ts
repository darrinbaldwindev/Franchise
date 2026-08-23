import { boolean, decimal, index, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const franchiseProfiles = mysqlTable("franchiseProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  operatingTarget: decimal("operatingTarget", { precision: 8, scale: 2 }).notNull(),
  wageBenchmark: decimal("wageBenchmark", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const monthlyBusinessRecords = mysqlTable("monthlyBusinessRecords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  monthKey: varchar("monthKey", { length: 7 }).notNull(),
  operatingTarget: decimal("operatingTarget", { precision: 8, scale: 2 }).notNull(),
  wageBenchmark: decimal("wageBenchmark", { precision: 10, scale: 2 }).notNull(),
  availabilityHours: decimal("availabilityHours", { precision: 10, scale: 2 }).notNull(),
  actualWorkHours: decimal("actualWorkHours", { precision: 10, scale: 2 }).notNull(),
  completedBaskets: int("completedBaskets").notNull(),
  customerSales: decimal("customerSales", { precision: 12, scale: 2 }).notNull(),
  productCostPct: decimal("productCostPct", { precision: 5, scale: 2 }).notNull(),
  deliveryCostPerBasket: decimal("deliveryCostPerBasket", { precision: 10, scale: 2 }).notNull(),
  paymentCostPct: decimal("paymentCostPct", { precision: 5, scale: 2 }).notNull(),
  royaltyPct: decimal("royaltyPct", { precision: 5, scale: 2 }).notNull(),
  dataOrigin: varchar("dataOrigin", { length: 64 }).notNull().default("franchisee-attested"),
  attestationConfirmed: boolean("attestationConfirmed").notNull().default(false),
  attestedAt: timestamp("attestedAt"),
  reviewStatus: mysqlEnum("reviewStatus", ["awaiting-review", "approved", "needs-correction"]).notNull().default("awaiting-review"),
  reviewerId: int("reviewerId").references(() => users.id, { onDelete: "set null" }),
  reviewerNote: text("reviewerNote"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [
  uniqueIndex("monthlyBusinessRecords_user_month_unique").on(table.userId, table.monthKey),
  index("monthlyBusinessRecords_user_month_idx").on(table.userId, table.monthKey),
]);

export const monthlyBusinessRecordRevisions = mysqlTable("monthlyBusinessRecordRevisions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  monthlyRecordId: int("monthlyRecordId").notNull().references(() => monthlyBusinessRecords.id, { onDelete: "cascade" }),
  monthKey: varchar("monthKey", { length: 7 }).notNull(),
  action: mysqlEnum("action", ["created", "updated"]).notNull(),
  inputSnapshot: json("inputSnapshot").$type<Record<string, string | number | boolean>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  index("monthlyBusinessRecordRevisions_user_month_idx").on(table.userId, table.monthKey),
]);

export const monthlyBusinessRecordReviewEvents = mysqlTable("monthlyBusinessRecordReviewEvents", {
  id: int("id").autoincrement().primaryKey(),
  franchiseeUserId: int("franchiseeUserId").notNull().references(() => users.id, { onDelete: "cascade" }),
  monthlyRecordId: int("monthlyRecordId").notNull().references(() => monthlyBusinessRecords.id, { onDelete: "cascade" }),
  reviewerId: int("reviewerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  action: mysqlEnum("action", ["approved", "needs-correction"]).notNull(),
  reviewerNote: text("reviewerNote").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  index("recordReviewEvents_record_idx").on(table.monthlyRecordId, table.createdAt),
  index("recordReviewEvents_franchisee_idx").on(table.franchiseeUserId, table.createdAt),
]);

export const coachingRecords = mysqlTable("coachingRecords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  monthlyRecordId: int("monthlyRecordId").notNull().references(() => monthlyBusinessRecords.id, { onDelete: "cascade" }),
  source: mysqlEnum("source", ["llm", "deterministic-fallback"]).notNull(),
  headline: text("headline").notNull(),
  recommendations: json("recommendations").$type<string[]>().notNull(),
  verifiedMetrics: json("verifiedMetrics").$type<Record<string, number>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  index("coachingRecords_user_month_idx").on(table.userId, table.monthlyRecordId),
]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
