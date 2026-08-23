export type VerifiedMonthlyInputs = {
  operatingTarget: number;
  wageBenchmark: number;
  availabilityHours: number;
  actualWorkHours: number;
  completedBaskets: number;
  customerSales: number;
  productCostPct: number;
  deliveryCostPerBasket: number;
  paymentCostPct: number;
  royaltyPct: number;
};

export type DeterministicCoaching = {
  headline: string;
  actions: string[];
  flags: Array<"low_basket_value" | "low_baskets_per_hour" | "sub_benchmark_contribution" | "above_target_workload">;
};

const LOW_AVERAGE_BASKET = 50;
const LOW_BASKETS_PER_HOUR = 2;

export function calculatePerformance(input: VerifiedMonthlyInputs) {
  const averageBasket = input.completedBaskets > 0 ? input.customerSales / input.completedBaskets : 0;
  const basketsPerHour = input.actualWorkHours > 0 ? input.completedBaskets / input.actualWorkHours : 0;
  const productCost = input.customerSales * (input.productCostPct / 100);
  const deliveryCost = input.completedBaskets * input.deliveryCostPerBasket;
  const paymentCost = input.customerSales * (input.paymentCostPct / 100);
  const royalty = input.customerSales * (input.royaltyPct / 100);
  const operatingContribution = Math.max(0, input.customerSales - productCost - deliveryCost - paymentCost - royalty);
  const earnedHours = operatingContribution / input.wageBenchmark;
  const productivity = input.actualWorkHours > 0 ? earnedHours / input.actualWorkHours : 0;
  const targetProgressPct = input.operatingTarget > 0 ? (input.actualWorkHours / input.operatingTarget) * 100 : 0;
  const projectionRatio = input.actualWorkHours > 0 ? input.operatingTarget / input.actualWorkHours : 0;

  return {
    sales: input.customerSales,
    availabilityHours: input.availabilityHours,
    actualWorkHours: input.actualWorkHours,
    operatingTarget: input.operatingTarget,
    wageBenchmark: input.wageBenchmark,
    averageBasket,
    basketsPerHour,
    productCost,
    deliveryCost,
    paymentCost,
    royalty,
    operatingContribution,
    earnedHours,
    productivity,
    targetProgressPct,
    targetProgressBarPct: Math.min(100, Math.max(0, targetProgressPct)),
    remainingTargetHours: Math.max(0, input.operatingTarget - input.actualWorkHours),
    projectedBaskets: input.completedBaskets * projectionRatio,
    projectedSales: input.customerSales * projectionRatio,
    projectedContribution: operatingContribution * projectionRatio,
    projectedEarnedHours: earnedHours * projectionRatio,
  };
}

export function createDeterministicCoaching(metrics: ReturnType<typeof calculatePerformance>): DeterministicCoaching {
  const flags: DeterministicCoaching["flags"] = [];
  const actions: string[] = [];

  if (metrics.averageBasket < LOW_AVERAGE_BASKET) {
    flags.push("low_basket_value");
    actions.push("Consider focused product bundles or add-on placement to improve average basket value before increasing workload.");
  }
  if (metrics.basketsPerHour < LOW_BASKETS_PER_HOUR) {
    flags.push("low_baskets_per_hour");
    actions.push("Review picking workflow, order clustering, and delivery batching to improve baskets completed per work hour.");
  }
  if (metrics.productivity < 1 && metrics.actualWorkHours > 0) {
    flags.push("sub_benchmark_contribution");
    actions.push("Operating contribution is below the selected wage benchmark for the time recorded; prioritise margin and fulfilment efficiency before adding hours.");
  }
  if (metrics.targetProgressPct > 110) {
    flags.push("above_target_workload");
    actions.push("You are operating more than 10% above the selected workload target; confirm that the additional time remains intentional.");
  }

  if (actions.length === 0) {
    actions.push("Your current verified results are aligned with the selected operating target; continue monitoring contribution, basket value, and fulfilment efficiency.");
  }

  return {
    headline: actions[0],
    actions,
    flags,
  };
}
