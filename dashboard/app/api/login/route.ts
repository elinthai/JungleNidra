import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getExpectedPassword } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/");
  const expected = getExpectedPassword();

  const url = new URL(from || "/", request.url);

  if (!expected || password !== expected) {
    const failUrl = new URL("/login", request.url);
    failUrl.searchParams.set("from", from);
    failUrl.searchParams.set("error", "1");
    return NextResponse.redirect(failUrl, { status: 303 });
  }

  const response = NextResponse.redirect(url, { status: 303 });
  response.cookies.set(AUTH_COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
