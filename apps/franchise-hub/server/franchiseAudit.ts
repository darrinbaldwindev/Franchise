import type { SaveMonthlyBusinessInput } from "./franchiseHubSchemas";

export type RevisionAction = "created" | "updated";

export function buildMonthlyRevisionEntry({
  userId,
  monthlyRecordId,
  input,
  alreadyExists,
}: {
  userId: number;
  monthlyRecordId: number;
  input: SaveMonthlyBusinessInput;
  alreadyExists: boolean;
}) {
  return {
    userId,
    monthlyRecordId,
    monthKey: input.monthKey,
    action: alreadyExists ? "updated" as RevisionAction : "created" as RevisionAction,
    inputSnapshot: {
      ...input,
      dataOrigin: "franchisee-attested",
    },
  };
}
