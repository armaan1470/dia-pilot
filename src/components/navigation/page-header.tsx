"use client";

import * as React from "react";
import { BackButton } from "./back-button";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  brandTag?: string;
  variant?: "gradient" | "transparent" | "solid";
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  brandTag,
  variant = "gradient",
  className,
}) => {
  return (
    <header
      className={cn(
        "w-full pt-[max(1rem,env(safe-area-inset-top,0px))] pb-4 px-5 flex flex-col justify-between relative z-20 flex-shrink-0",
        variant === "gradient" && "bg-diapilot-gradient text-white shadow-md",
        variant === "transparent" && "bg-transparent text-white",
        variant === "solid" && "bg-[#070F1E] border-b border-white/5 text-white",
        className
      )}
    >
      {/* Top navigation row */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          {showBack && <BackButton onClick={onBack} />}
          {brandTag && !showBack && (
            <span className="text-xs font-bold tracking-widest text-cyan-200 uppercase">
              {brandTag}
            </span>
          )}
        </div>

        {rightAction && (
          <div className="flex items-center gap-2">{rightAction}</div>
        )}
      </div>

      {/* Header title & subtitle */}
      <div className="mt-0.5">
        {brandTag && showBack && (
          <span className="text-[11px] font-bold tracking-widest text-cyan-200 uppercase block mb-0.5">
            {brandTag}
          </span>
        )}
        <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-cyan-100/80 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};
