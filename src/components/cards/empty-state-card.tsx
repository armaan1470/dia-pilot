"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { cn } from "@/lib/utils";

export interface EmptyStateCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <Card
      className={cn(
        "w-full rounded-lg bg-brand-card border border-brand-border p-8 flex flex-col items-center justify-center text-center gap-4 text-white",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-lg bg-brand-card-light border border-brand-border flex items-center justify-center text-brand-teal text-2xl shadow-inner">
          {icon}
        </div>
      )}

      <div className="max-w-xs space-y-1.5">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2 w-full max-w-xs">
          <PrimaryButton onClick={onAction} fullWidth>
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </Card>
  );
};
