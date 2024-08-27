/** @format */

import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  url.searchParams.set("viewport", viewport);
  const protectedPaths = /^\/(dashboard)/;
  const authPaths = /^\/landing\/(shortlets)/;
  const token = true;
  if (!token && url.pathname.match(protectedPaths)) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }
  if (token && url.pathname.match(authPaths)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
