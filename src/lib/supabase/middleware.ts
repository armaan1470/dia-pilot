import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Routes accessible by anyone without authentication
const PUBLIC_ROUTES = [
  "/",
  "/splash",
  "/language",
  "/onboarding",
  "/privacy",
  "/help",
];

// Routes strictly for authentication
const AUTH_ROUTES = [
  "/login",
  "/register",
];

export async function updateSession(request: NextRequest, response?: NextResponse) {
  let supabaseResponse = response ?? NextResponse.next({ request });

  // If next-intl already issued a redirect (e.g. adding /ar locale prefix), preserve it
  if (response?.headers.get("location")) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = response ?? NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Verify and refresh the current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ar";
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "") || "/";

  // Helper to construct locale-aware redirects while preserving session cookies
  const createRedirect = (targetPath: string) => {
    const redirectUrl = new URL(`/${locale}${targetPath === "/" ? "" : targetPath}`, request.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  };

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathWithoutLocale === route);

  // CASE 1: User is an authenticated patient (full account)
  if (user && !user.is_anonymous) {
    // Prevent logged-in users from visiting /login, /register, /, /splash, or /onboarding
    if (
      isAuthRoute ||
      pathWithoutLocale === "/" ||
      pathWithoutLocale === "/splash" ||
      pathWithoutLocale === "/onboarding"
    ) {
      return createRedirect("/chat");
    }
  }

  // CASE 2: User is an anonymous Guest
  if (user && user.is_anonymous) {
    // Prevent guests from visiting /, /splash, /onboarding, or /login
    if (
      pathWithoutLocale === "/" ||
      pathWithoutLocale === "/splash" ||
      pathWithoutLocale === "/onboarding" ||
      pathWithoutLocale === "/login" ||
      pathWithoutLocale.startsWith("/login/")
    ) {
      return createRedirect("/chat");
    }
    // Allow guests to visit /register (to upgrade)
    // and all core feature routes (/chat, /services, /profile, etc.)
  }

  // CASE 3: User is unauthenticated (no active session)
  if (!user) {
    // Allow public informational routes
    if (isPublicRoute) {
      return supabaseResponse;
    }
    // Allow login & registration
    if (isAuthRoute) {
      return supabaseResponse;
    }
    // Any protected route (e.g. /chat, /profile, /appointments, /services...) -> Redirect to login
    return createRedirect("/login");
  }

  return supabaseResponse;
}
