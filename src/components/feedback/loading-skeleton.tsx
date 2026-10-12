"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps {
  type?: "card" | "list" | "chat" | "profile" | "topic" | "detailCard";
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
            className="h-[148px] sm:h-[156px] rounded-2xl bg-brand-card/70 border border-brand-border/60 p-4 flex flex-col justify-between overflow-hidden relative"
          >
            <Skeleton className="w-10 h-10 rounded-xl bg-brand-card-light" />
            <div className="space-y-1.5 min-h-[2.6rem] flex flex-col justify-end">
              <Skeleton className="h-4 w-4/5 rounded bg-brand-card-light" />
              <Skeleton className="h-3 w-1/2 rounded bg-brand-card-light/60" />
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
            className="h-20 rounded-lg bg-brand-card border border-brand-border p-4 flex items-center gap-3.5"
          >
            <Skeleton className="w-11 h-11 rounded-xl bg-brand-card-light flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3 bg-brand-card-light" />
              <Skeleton className="h-3 w-1/3 bg-brand-card-light" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "detailCard") {
    return (
      <div className={cn("space-y-4 w-full", className)}>
        {items.map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-brand-card border border-brand-border p-4 space-y-2.5"
          >
            <Skeleton className="h-4 w-28 bg-brand-card-light rounded" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-full bg-brand-card-light/60 rounded" />
              <Skeleton className="h-3.5 w-5/6 bg-brand-card-light/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "topic") {
    return (
      <div className={cn("space-y-2.5 w-full", className)}>
        {items.map((_, i) => (
          <div
            key={i}
            className="w-full rounded-lg bg-brand-card border border-white/5 flex items-stretch overflow-hidden h-[54px]"
          >
            {/* Left Number Section */}
            <div className="w-13 shrink-0 flex items-center justify-center border-r border-white/10 rtl:border-r-0 rtl:border-l bg-brand-card-light/20">
              <Skeleton className="h-4 w-5 bg-brand-card-light rounded" />
            </div>

            {/* Right Content Section */}
            <div className="flex-1 p-3.5 pl-4 rtl:pl-3.5 rtl:pr-4 flex items-center justify-between gap-3 min-w-0">
              <div className="flex-1 space-y-1.5 min-w-0">
                <Skeleton className="h-3.5 w-3/5 bg-brand-card-light rounded" />
                <Skeleton className="h-2.5 w-2/5 bg-brand-card-light/60 rounded" />
              </div>

              {/* Arrow Pill placeholder */}
              <Skeleton className="w-7 h-7 rounded-full bg-brand-card-light shrink-0" />
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
          <Skeleton className="h-16 w-52 rounded-lg rounded-tl-[4px] bg-slate-800/80" />
        </div>
        <div className="flex justify-end w-full">
          <Skeleton className="h-12 w-44 rounded-lg rounded-br-[4px] bg-cyan-950/60" />
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
