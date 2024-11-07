/** @format */

import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  url.searchParams.set("viewport", viewport);
  const protectedPaths =
    /^\/(dashboard|bookings|contact-us|notifications|referrals|make-a-request)/;
  const authPaths = /^\/landing\/(shortlets)/;

  if (!token && url.pathname.match(protectedPaths)) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }
  if (token && url.pathname.match(authPaths)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
