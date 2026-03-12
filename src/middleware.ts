import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { hasPermission, ROUTE_PERMISSIONS, type Permission } from "./lib/permissions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set pathname header for layout conditional rendering
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check role-based permissions for the route
    const role = token.role as string | undefined;
    if (role) {
      const matchedRoute = Object.keys(ROUTE_PERMISSIONS)
        .sort((a, b) => b.length - a.length)
        .find((route) => pathname === route || pathname.startsWith(route + "/"));

      if (matchedRoute) {
        const requiredPermission = ROUTE_PERMISSIONS[matchedRoute] as Permission;
        if (!hasPermission(role, requiredPermission)) {
          return NextResponse.redirect(new URL("/admin?error=forbidden", request.url));
        }
      }
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
