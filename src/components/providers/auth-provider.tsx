"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { usePathname, useRouter } from "@/i18n/routing";

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

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // Client-side route guarding for instant SPA navigation
  React.useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = AUTH_ROUTES.some(
      (r) => pathname === r || pathname.startsWith(`${r}/`)
    );
    const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname === r);

    // 1. If user is an authenticated patient and on /login or /register, redirect to /chat
    if (user && !user.is_anonymous && isAuthRoute) {
      router.replace("/chat");
      return;
    }

    // 2. If user is completely unauthenticated and on a protected route, redirect to /login
    if (!user && !isPublicRoute && !isAuthRoute) {
      router.replace("/login");
      return;
    }
  }, [user, isLoading, pathname, router]);

  return <>{children}</>;
}
