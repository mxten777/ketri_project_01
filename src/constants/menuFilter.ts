// Centralized whitelist for Phase-1 header/menu filtering.
// Keep this in sync with src/App.tsx (router = source of truth).
export const ALLOWED_MENU_BASE_PATHS: string[] = [
  "/about/greeting",
  "/about/history",
  "/about/organization",
  "/about/ci",
  "/about/location",
  "/about/equipment",
  "/about/certificates",

  "/services/industrial-health",
  "/services/water-testing",
  "/services/dialysis-water",
  "/services/indoor-air-quality",
  "/services/asbestos",

  "/board/notice",
];

export function normalizeBase(p: string) {
  return p.split("#")[0];
}

export function isAllowed(path: string) {
  const base = normalizeBase(path);
  return ALLOWED_MENU_BASE_PATHS.some((ap) => base === ap || base.startsWith(ap + "/"));
}
