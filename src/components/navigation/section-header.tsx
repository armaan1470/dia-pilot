"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full py-2 px-1 select-none",
        className
      )}
    >
      <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
        {title}
      </h3>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
