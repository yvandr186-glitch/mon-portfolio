import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Routes protégées nécessitant une authentification
const protectedRoutes = ["/admin"];
// Routes d'authentification (rediriger si déjà connecté)
const authRoutes = ["/login", "/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier la présence du cookie de session Better Auth
  const sessionCookie = getSessionCookie(request);

  // Si l'utilisateur est sur une route protégée sans session → rediriger vers login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Si l'utilisateur est connecté et tente d'accéder aux routes d'auth → rediriger vers admin
  if (authRoutes.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/sign-in", "/sign-up"],
};
