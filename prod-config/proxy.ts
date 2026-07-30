import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const authRoutes = ["/login", "/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("better_auth.session_token")?.value;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (authRoutes.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/sign-in", "/sign-up"],
};
