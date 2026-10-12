"use client";

import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Data remains fresh for 1 minute
        gcTime: 5 * 60 * 1000, // Inactive cache kept for 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always make a new query client for each request
    return makeQueryClient();
  } else {
    // Browser: reuse the existing query client across renders
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
