import { describe, expect, it } from "vitest";
import {
  MANUS_DEBUG_COLLECTOR_PATH,
  MANUS_DEBUG_LOGS_PATH,
  isManusDebugCollectorRoute,
} from "../shared/debugCollectorBoundary";

describe("Manus debug collector production boundary", () => {
  it("recognizes the collector script and telemetry endpoint routes", () => {
    expect(isManusDebugCollectorRoute(MANUS_DEBUG_COLLECTOR_PATH)).toBe(true);
    expect(isManusDebugCollectorRoute(MANUS_DEBUG_LOGS_PATH)).toBe(true);
    expect(isManusDebugCollectorRoute(`${MANUS_DEBUG_LOGS_PATH}/nested`)).toBe(true);
  });

  it("does not block unrelated Manus metadata or application routes", () => {
    expect(isManusDebugCollectorRoute("/__manus__/version.json")).toBe(false);
    expect(isManusDebugCollectorRoute("/api/trpc/franchiseHub.snapshot")).toBe(false);
    expect(isManusDebugCollectorRoute("/")).toBe(false);
  });
});
