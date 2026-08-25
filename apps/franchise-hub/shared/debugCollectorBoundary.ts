export const MANUS_DEBUG_COLLECTOR_PATH = "/__manus__/debug-collector.js";
export const MANUS_DEBUG_LOGS_PATH = "/__manus__/logs";

export function isManusDebugCollectorRoute(pathname: string) {
  return (
    pathname === MANUS_DEBUG_COLLECTOR_PATH ||
    pathname === MANUS_DEBUG_LOGS_PATH ||
    pathname.startsWith(`${MANUS_DEBUG_LOGS_PATH}/`)
  );
}
