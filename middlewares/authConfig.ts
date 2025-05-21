import { getUser } from "@/graphql/query/GetUser";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Read the token and user from cookies
  const token = request.cookies.get("token")?.value;
  const userInCookies = JSON.parse(request.cookies.get("user")?.value || "{}");

  // If there's no token and trying to access a protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If there's a token, verify the user exists in database
  if (token && !isPublicPath) {
    const user = await getUser(userInCookies?.email || "");

    // If user doesn't exist in database but has cookies, clear them and redirect to login
    if (!user) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      response.cookies.delete("user");
      return response;
    }
  }

  // If there's a token and trying to access login/register
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
