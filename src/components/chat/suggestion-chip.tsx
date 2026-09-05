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
        "w-full text-left rtl:text-right p-4 rounded-2xl bg-[#132238] hover:bg-[#162842] border border-[#1E3557] hover:border-cyan-400/40 text-slate-200 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-between gap-3 cursor-pointer",
        className
      )}
    >
      <span className="leading-snug">{label}</span>
      {icon && <span className="text-cyan-400 flex-shrink-0">{icon}</span>}
    </button>
  );
};
