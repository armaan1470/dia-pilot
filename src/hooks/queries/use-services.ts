"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchServices,
  fetchServiceDetail,
  type ServiceRecord,
  ApiError,
} from "@/lib/api/services";

export const servicesQueryKeys = {
  all: ["services"] as const,
  lists: () => [...servicesQueryKeys.all, "list"] as const,
  detail: (slug: string) => [...servicesQueryKeys.all, "detail", slug] as const,
};

/**
 * Hook to fetch all services using TanStack Query
 */
export function useServices() {
  return useQuery<ServiceRecord[], ApiError>({
    queryKey: servicesQueryKeys.lists(),
    queryFn: fetchServices,
  });
}

/**
 * Hook to fetch a specific service detail by slug using TanStack Query
 */
export function useServiceDetail(slug: string) {
  return useQuery<ServiceRecord, ApiError>({
    queryKey: servicesQueryKeys.detail(slug),
    queryFn: () => fetchServiceDetail(slug),
    enabled: Boolean(slug),
    retry: (failureCount, error) => {
      // Do not retry 404 Not Found errors
      if (error instanceof ApiError && error.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
  });
}
