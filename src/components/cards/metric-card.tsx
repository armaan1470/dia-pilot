"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  statusText?: string;
  statusType?: "normal" | "warning" | "alert";
  icon?: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  statusText,
  statusType = "normal",
  icon,
  className,
}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl bg-brand-card border border-brand-border p-3.5 flex flex-col justify-between gap-2 text-white shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        {icon && <span className="text-brand-teal">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {value}
        </span>
        {unit && <span className="text-xs text-slate-400 font-medium">{unit}</span>}
      </div>

      {statusText && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              statusType === "normal" && "bg-emerald-400",
              statusType === "warning" && "bg-amber-400",
              statusType === "alert" && "bg-rose-400"
            )}
          />
          <span
            className={cn(
              statusType === "normal" && "text-emerald-300",
              statusType === "warning" && "text-amber-300",
              statusType === "alert" && "text-rose-300"
            )}
          >
            {statusText}
          </span>
        </div>
      )}
    </Card>
  );
};
