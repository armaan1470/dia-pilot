"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps {
  type?: "card" | "list" | "chat" | "profile";
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = "card",
  count = 1,
  className,
}) => {
  const items = Array.from({ length: count });

  if (type === "card") {
    return (
      <div className={cn("grid grid-cols-2 gap-3.5 w-full", className)}>
        {items.map((_, i) => (
          <div
            key={i}
            className="h-[140px] rounded-[24px] bg-[#132238]/60 border border-white/5 p-4 flex flex-col justify-between"
          >
            <Skeleton className="w-10 h-10 rounded-xl bg-slate-800/80" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 bg-slate-800/80" />
              <Skeleton className="h-3 w-1/2 bg-slate-800/80" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={cn("flex flex-col gap-3 w-full", className)}>
        {items.map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-2xl bg-[#132238]/60 border border-white/5 p-4 flex items-center gap-3.5"
          >
            <Skeleton className="w-11 h-11 rounded-xl bg-slate-800/80 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3 bg-slate-800/80" />
              <Skeleton className="h-3 w-1/3 bg-slate-800/80" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className={cn("flex flex-col gap-4 w-full py-4", className)}>
        <div className="flex items-start gap-2.5 max-w-[80%]">
          <Skeleton className="w-8 h-8 rounded-full bg-slate-800/80 flex-shrink-0" />
          <Skeleton className="h-16 w-52 rounded-[20px] rounded-tl-[4px] bg-slate-800/80" />
        </div>
        <div className="flex justify-end w-full">
          <Skeleton className="h-12 w-44 rounded-[20px] rounded-br-[4px] bg-cyan-950/60" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4 py-8", className)}>
      <Skeleton className="w-24 h-24 rounded-full bg-slate-800/80" />
      <Skeleton className="h-5 w-40 bg-slate-800/80" />
      <Skeleton className="h-4 w-28 bg-slate-800/80" />
    </div>
  );
};
