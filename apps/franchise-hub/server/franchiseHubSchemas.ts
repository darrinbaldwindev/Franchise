import { z } from "zod";

export const supportedOperatingTargets = [20, 40, 60, 80, 100, 150, 165] as const;

export const monthKeySchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use a valid month in YYYY-MM format.");
const nonNegative = z.number().finite().min(0, "Enter zero or a positive number.");
const percentage = nonNegative.max(100, "Percentages cannot exceed 100.");

export const saveMonthlyBusinessInputSchema = z.object({
  monthKey: monthKeySchema,
  operatingTarget: z.number().refine(value => supportedOperatingTargets.includes(value as typeof supportedOperatingTargets[number]), "Choose a supported workload target."),
  wageBenchmark: z.number().finite().positive("Enter a wage benchmark greater than zero."),
  availabilityHours: nonNegative,
  actualWorkHours: nonNegative,
  completedBaskets: z.number().int().min(0, "Completed baskets must be a whole number or zero."),
  customerSales: nonNegative,
  productCostPct: percentage,
  deliveryCostPerBasket: nonNegative,
  paymentCostPct: percentage,
  royaltyPct: percentage,
  attestationConfirmed: z.literal(true, { message: "Confirm that the saved figures are complete and accurate to the best of your knowledge." }),
});

export const reviewMonthlyRecordSchema = z.object({
  monthlyRecordId: z.number().int().positive(),
  decision: z.enum(["approved", "needs-correction"]),
  reviewerNote: z.string().trim().max(1200, "Keep reviewer notes to 1,200 characters or fewer.").default(""),
}).superRefine((value, ctx) => {
  if (value.decision === "needs-correction" && value.reviewerNote.length === 0) {
    ctx.addIssue({ code: "custom", path: ["reviewerNote"], message: "Add a note when returning a record for correction." });
  }
});

export type SaveMonthlyBusinessInput = z.infer<typeof saveMonthlyBusinessInputSchema>;
export type ReviewMonthlyRecordInput = z.infer<typeof reviewMonthlyRecordSchema>;
