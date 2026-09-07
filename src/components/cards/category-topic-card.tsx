"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryTopicCardProps {
  id: string;
  title: string;
  description: string;
  numberColor: string;
  arrowPillClass: string;
  arrowIconClass: string;
  onClick?: () => void;
  className?: string;
}

export const CategoryTopicCard: React.FC<CategoryTopicCardProps> = ({
  id,
  title,
  description,
  numberColor,
  arrowPillClass,
  arrowIconClass,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full rounded-lg bg-brand-card hover:bg-brand-card-light border border-white/5 hover:border-brand-teal/40 flex items-stretch cursor-pointer active:scale-[0.99] transition-all shadow-sm group overflow-hidden",
        className
      )}
    >
      {/* Left Number Section with continuous vertical divider */}
      <div
        className={cn(
          "w-13 shrink-0 flex items-center justify-center border-r border-white/10 rtl:border-r-0 rtl:border-l text-sm font-bold tracking-tight select-none",
          numberColor
        )}
      >
        {id}
      </div>

      {/* Right Content Section */}
      <div className="flex-1 p-3.5 pl-4 rtl:pl-3.5 rtl:pr-4 flex items-center justify-between gap-3 min-w-0">
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="text-sm font-bold text-white leading-tight truncate">
            {title}
          </h4>
          <span className="text-xs text-slate-400 mt-0.5 truncate font-normal">
            {description}
          </span>
        </div>

        {/* Circular arrow button styled according to category */}
        <div
          className={cn(
            "w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 rtl:rotate-180 transition-colors",
            arrowPillClass
          )}
        >
          <ArrowRight className={cn("w-3.5 h-3.5", arrowIconClass)} />
        </div>
      </div>
    </div>
  );
};
