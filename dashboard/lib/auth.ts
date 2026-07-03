export const AUTH_COOKIE_NAME = "jn_auth";

export function getExpectedPassword(): string {
  return process.env.DASHBOARD_PASSWORD ?? "";
}
