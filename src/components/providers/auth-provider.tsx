"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { usePathname, useRouter } from "@/i18n/routing";

// Routes that unauthenticated users can access
const UNAUTHENTICATED_ALLOWED_ROUTES = [
  "/",
  "/splash",
  "/language",
  "/onboarding",
  "/login",
  "/register",
  "/privacy",
  "/help",
];

// Routes strictly forbidden for logged-in users (both patients and guests)
const FORBIDDEN_FOR_LOGGED_IN_USERS = [
  "/",
  "/splash",
  "/onboarding",
  "/login",
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, user, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // Determine route permissions
  const isForbiddenForLoggedIn = React.useMemo(() => {
    if (!user) return false;
    // Splash, onboarding, and login are never accessible once logged in
    const isBaseForbidden = FORBIDDEN_FOR_LOGGED_IN_USERS.some(
      (r) => pathname === r || pathname.startsWith(`${r}/`)
    );
    if (isBaseForbidden) return true;

    // Full patients (non-guests) cannot visit /register (only guests can upgrade)
    if (!user.is_anonymous && (pathname === "/register" || pathname.startsWith("/register/"))) {
      return true;
    }

    return false;
  }, [user, pathname]);

  const isForbiddenForUnauthenticated = React.useMemo(() => {
    if (user || isLoading) return false;
    return !UNAUTHENTICATED_ALLOWED_ROUTES.some(
      (r) => pathname === r || pathname.startsWith(`${r}/`)
    );
  }, [user, isLoading, pathname]);

  // Client-side route guarding for instant SPA navigation & back-stack enforcement
  React.useEffect(() => {
    if (isLoading) return;

    if (isForbiddenForLoggedIn) {
      router.replace("/chat");
      return;
    }

    if (isForbiddenForUnauthenticated) {
      router.replace("/login");
      return;
    }
  }, [isLoading, isForbiddenForLoggedIn, isForbiddenForUnauthenticated, router]);

  // Popstate history trap: prevent back-button from popping into splash/auth routes
  React.useEffect(() => {
    if (typeof window === "undefined" || !user) return;

    const handlePopState = () => {
      const currentPath =
        window.location.pathname.replace(/^\/(ar|en)/, "") || "/";

      const isBaseForbidden = FORBIDDEN_FOR_LOGGED_IN_USERS.some(
        (r) => currentPath === r || currentPath.startsWith(`${r}/`)
      );

      const isRegisterForbidden =
        !user.is_anonymous &&
        (currentPath === "/register" || currentPath.startsWith("/register/"));

      if (isBaseForbidden || isRegisterForbidden) {
        // Prevent landing on auth/splash: force navigation back to /chat
        router.replace("/chat");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [user, router]);

  // Prevent flashing forbidden auth/splash screens while redirecting
  if (!isLoading && (isForbiddenForLoggedIn || isForbiddenForUnauthenticated)) {
    return <div className="flex flex-1 min-h-dvh bg-brand-dark" />;
  }

  return <>{children}</>;
}
