import { calculatePerformance } from "./franchiseMetrics";

export type HistoricalMonthlyRecord = {
  monthKey: string;
  operatingTarget: string | number;
  wageBenchmark: string | number;
  availabilityHours: string | number;
  actualWorkHours: string | number;
  completedBaskets: number;
  customerSales: string | number;
  productCostPct: string | number;
  deliveryCostPerBasket: string | number;
  paymentCostPct: string | number;
  royaltyPct: string | number;
  reviewStatus: "awaiting-review" | "approved" | "needs-correction";
};

const numberValue = (value: string | number) => Number(value);

export function buildPerformanceHistory(records: HistoricalMonthlyRecord[]) {
  const calculated = records.map(record => {
    const metrics = calculatePerformance({
      operatingTarget: numberValue(record.operatingTarget),
      wageBenchmark: numberValue(record.wageBenchmark),
      availabilityHours: numberValue(record.availabilityHours),
      actualWorkHours: numberValue(record.actualWorkHours),
      completedBaskets: record.completedBaskets,
      customerSales: numberValue(record.customerSales),
      productCostPct: numberValue(record.productCostPct),
      deliveryCostPerBasket: numberValue(record.deliveryCostPerBasket),
      paymentCostPct: numberValue(record.paymentCostPct),
      royaltyPct: numberValue(record.royaltyPct),
    });
    return { monthKey: record.monthKey, reviewStatus: record.reviewStatus, ...metrics };
  });

  return calculated.map((point, index) => {
    const previous = calculated[index - 1];
    return {
      ...point,
      monthOverMonth: previous ? {
        sales: point.sales - previous.sales,
        operatingContribution: point.operatingContribution - previous.operatingContribution,
        earnedHours: point.earnedHours - previous.earnedHours,
        productivity: point.productivity - previous.productivity,
      } : null,
    };
  });
}
