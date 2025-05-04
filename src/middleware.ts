import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("auth_token");

  if (!authToken && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products", "/settings"],
};
