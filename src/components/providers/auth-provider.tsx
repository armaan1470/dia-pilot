"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const PUBLIC_ROUTES = [
  "/",
  "/splash",
  "/language",
  "/onboarding",
  "/privacy",
  "/help",
];

const AUTH_ROUTES = ["/login", "/register"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, user, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // Client-side guard for SPA transitions
  React.useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = AUTH_ROUTES.some(
      (r) => pathname === r || pathname.startsWith(`${r}/`)
    );
    const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname === r);

    // 1. If logged in as full patient and on an auth or onboarding page, replace to /chat
    if (user && !user.is_anonymous) {
      if (
        isAuthRoute ||
        pathname === "/" ||
        pathname === "/splash" ||
        pathname === "/onboarding"
      ) {
        router.replace("/chat", { locale });
        return;
      }
    }

    // 2. If logged in as guest and on login, splash, or onboarding, replace to /chat
    if (user && user.is_anonymous) {
      if (
        pathname === "/login" ||
        pathname === "/" ||
        pathname === "/splash" ||
        pathname === "/onboarding"
      ) {
        router.replace("/chat", { locale });
        return;
      }
    }

    // 3. If unauthenticated and on a protected internal route, redirect to /login
    if (!user && !isPublicRoute && !isAuthRoute) {
      router.replace("/login", { locale });
      return;
    }
  }, [user, isLoading, pathname, router, locale]);

  return <>{children}</>;
}
