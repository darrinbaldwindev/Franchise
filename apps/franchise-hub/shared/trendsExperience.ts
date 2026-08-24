export type TrendDisplayPoint = { sales: number; earnedHours: number };

export function getTrendDisplayMode(history: TrendDisplayPoint[]) {
  if (history.length === 0) return "empty" as const;
  if (history.length === 1) return "first-month" as const;
  return history.some(point => point.sales > 0 || point.earnedHours > 0) ? "charts" as const : "needs-activity" as const;
}
