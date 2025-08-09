import { AUTH_CONSTANTS } from "@/lib/constants/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_CONSTANTS.TOKEN_KEY)?.value;
  const userCookie = request.cookies.get(AUTH_CONSTANTS.USER_KEY)?.value;
  const { pathname } = request.nextUrl;

  let userRole: string | null = null;
  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      userRole = userData.role;
    } catch {
    }
  }

  const isProtectedRoute = AUTH_CONSTANTS.ROUTES.PROTECTED.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = AUTH_CONSTANTS.ROUTES.PUBLIC.some((route) =>
    pathname.startsWith(route)
  );
  const isUserOnlyRoute = AUTH_CONSTANTS.ROUTES.USER_ONLY.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminOnlyRoute = AUTH_CONSTANTS.ROUTES.ADMIN_ONLY.some((route) =>
    pathname.startsWith(route)
  );


  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }


  if (token && userRole) {
    if (userRole === "ADMIN" && isUserOnlyRoute) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    
    if (userRole === "USER" && isAdminOnlyRoute) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
