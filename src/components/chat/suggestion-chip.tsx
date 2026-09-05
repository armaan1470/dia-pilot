"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SuggestionChipProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const SuggestionChip: React.FC<SuggestionChipProps> = ({
  label,
  onClick,
  icon,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rtl:text-right p-4 rounded-lg bg-brand-card hover:bg-brand-card-light border border-brand-border hover:border-brand-teal/40 text-slate-200 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-between gap-3 cursor-pointer",
        className
      )}
    >
      <span className="leading-snug">{label}</span>
      {icon && <span className="text-brand-teal flex-shrink-0">{icon}</span>}
    </button>
  );
};
