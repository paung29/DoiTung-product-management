import { NextRequest, NextResponse } from "next/server";

export function proxy(request : NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    const isAdminRoute = pathname.startsWith("/admin");
    const isStaffRoute = pathname.startsWith("/staff");

    if (!token && (isAdminRoute || isStaffRoute)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/login"],
};