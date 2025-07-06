import { AUTH_CONSTANTS } from "@/lib/constants/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_CONSTANTS.TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = AUTH_CONSTANTS.ROUTES.PROTECTED.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = AUTH_CONSTANTS.ROUTES.PUBLIC.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
