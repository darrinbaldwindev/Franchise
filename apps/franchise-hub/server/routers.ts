import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getFranchisePerformanceHistory, getFranchiseRevisionHistory, getFranchiseSnapshot, getReviewQueue, reviewMonthlyRecord, saveCoachingRecord, saveFranchiseMonthlyRecord } from "./db";
import { monthKeySchema, reviewMonthlyRecordSchema, saveMonthlyBusinessInputSchema } from "./franchiseHubSchemas";

function currentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  franchiseHub: router({
    snapshot: protectedProcedure.input(monthKeySchema.optional()).query(({ ctx, input }) =>
      getFranchiseSnapshot(ctx.user.id, input ?? currentMonthKey()),
    ),
    saveMonthlyRecord: protectedProcedure.input(saveMonthlyBusinessInputSchema).mutation(({ ctx, input }) =>
      saveFranchiseMonthlyRecord(ctx.user.id, input),
    ),
    revisionHistory: protectedProcedure.input(monthKeySchema).query(({ ctx, input }) =>
      getFranchiseRevisionHistory(ctx.user.id, input),
    ),
    performanceHistory: protectedProcedure.query(({ ctx }) =>
      getFranchisePerformanceHistory(ctx.user.id),
    ),
    generateCoaching: protectedProcedure.input(monthKeySchema.optional()).mutation(async ({ ctx, input }) => {
      const snapshot = await getFranchiseSnapshot(ctx.user.id, input ?? currentMonthKey());
      if (!snapshot) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Save verified monthly figures before generating coaching." });
      }

      const verifiedContext = {
        month: snapshot.monthKey,
        metrics: snapshot.performance,
        deterministicFlags: snapshot.deterministicCoaching.flags,
        deterministicActions: snapshot.deterministicCoaching.actions,
      };
      try {
        const models = await listLLMModels();
        const model = models.data.find(candidate => candidate.id === "gpt-5-mini")?.id;
        const response = await invokeLLM({
          model,
          messages: [
            {
              role: "system",
              content: "You are a concise operations coach for a home-delivery franchise dashboard. Treat the supplied server-calculated metrics as the only source of truth. Do not calculate or restate financial figures, predict earnings, or give financial, tax, legal, pension, Centrelink, benefits, or eligibility advice. Provide practical, non-guaranteed operational suggestions about basket value, fulfilment flow, delivery batching, and workload intent. Use careful language such as consider, review, and monitor.",
            },
            { role: "user", content: JSON.stringify(verifiedContext) },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "franchise_hub_coaching",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  headline: { type: "string", maxLength: 220 },
                  recommendations: { type: "array", items: { type: "string", maxLength: 280 }, minItems: 2, maxItems: 3 },
                },
                required: ["headline", "recommendations"],
                additionalProperties: false,
              },
            },
          },
        });
        const raw = response.choices[0]?.message.content;
        if (typeof raw !== "string" || !raw) throw new Error("The coaching response was empty");
        const parsed = JSON.parse(raw) as { headline: string; recommendations: string[] };
        const coaching = { source: "llm" as const, ...parsed, disclaimer: "Operational planning guidance only; it is not financial, tax, legal, pension, government-payment, or eligibility advice." };
        await saveCoachingRecord({
          userId: ctx.user.id,
          monthlyRecordId: snapshot.monthlyRecordId,
          source: coaching.source,
          headline: coaching.headline,
          recommendations: coaching.recommendations,
          verifiedMetrics: snapshot.performance,
        });
        return coaching;
      } catch (error) {
        console.error("[Franchise Hub] LLM coaching unavailable", error);
        const coaching = {
          source: "deterministic-fallback" as const,
          headline: snapshot.deterministicCoaching.headline,
          recommendations: snapshot.deterministicCoaching.actions,
          disclaimer: "Live coaching is unavailable. Showing deterministic guidance from verified saved metrics only; it is not financial, tax, legal, pension, government-payment, or eligibility advice.",
        };
        await saveCoachingRecord({
          userId: ctx.user.id,
          monthlyRecordId: snapshot.monthlyRecordId,
          source: coaching.source,
          headline: coaching.headline,
          recommendations: coaching.recommendations,
          verifiedMetrics: snapshot.performance,
        });
        return coaching;
      }
    }),
  }),
  franchisorReviews: router({
    queue: adminProcedure.query(() => getReviewQueue()),
    decide: adminProcedure.input(reviewMonthlyRecordSchema).mutation(({ ctx, input }) =>
      reviewMonthlyRecord(ctx.user.id, input),
    ),
  }),
});

export type AppRouter = typeof appRouter;
