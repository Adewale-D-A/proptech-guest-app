/** @format */

import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  url.searchParams.set("viewport", viewport);
  const protectedRoutes = [
    "/dashboard",
    "/bookings",
    "/contact-us",
    "/notifications",
    "/referrals",
    "/make-a-request",
  ];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return redirectToLogin(request);
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        return redirectToLogin(request);
      }
    } catch (error) {
      return redirectToLogin(request);
    }
  }
  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/landing", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookings/:path*",
    "/contact-us/:path*",
    "/notifications/:path*",
    "/referrals/:path*",
    "/make-a-request/:path*",
  ],
};
