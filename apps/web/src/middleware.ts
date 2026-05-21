import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
  const url = request.nextUrl;

  // Prevent redirect loops by checking if already on maintenance page
  if (isMaintenanceMode && url.pathname !== "/maintenance") {
    // Avoid redirecting API routes and static files
    if (
      !url.pathname.startsWith("/api") &&
      !url.pathname.startsWith("/_next") &&
      !url.pathname.startsWith("/images")
    ) {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
