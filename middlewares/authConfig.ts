import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  // Read the token from cookies
  const token = request.cookies.get("token")?.value;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // If there's no token and trying to access a protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If there's a token and trying to access login/register
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
