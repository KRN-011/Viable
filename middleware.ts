import { authMiddleware } from "./middlewares/authConfig";

export const middleware = authMiddleware;

// Define config directly in middleware.ts
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
