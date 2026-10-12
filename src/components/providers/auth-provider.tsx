"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/auth/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
