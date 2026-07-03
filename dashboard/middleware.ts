import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "./lib/auth";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const expected = process.env.DASHBOARD_PASSWORD ?? "";

  if (expected && cookie === expected) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!login|api/login|_next/static|_next/image|favicon.ico).*)",
  ],
};
