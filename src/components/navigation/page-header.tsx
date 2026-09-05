"use client";

import * as React from "react";
import { BackButton } from "./back-button";
import { cn } from "@/lib/utils";

export type HeaderTheme =
  | "blue"
  | "cyan"
  | "purple"
  | "teal"
  | "orange"
  | "emerald"
  | "pink"
  | "rose"
  | "amber"
  | "slate"
  | "violet"
  | "red";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  brandTag?: string;
  theme?: HeaderTheme;
  watermark?: React.ReactNode;
  className?: string;
}

const themeGradients: Record<HeaderTheme, string> = {
  blue: "bg-gradient-to-b from-[#0284C7] via-[#1E6BBF] to-[#173F8A]",
  cyan: "bg-gradient-to-b from-[#0284C7] to-[#0369A1]",
  purple: "bg-gradient-to-b from-[#6366F1] to-[#3730A3]",
  teal: "bg-gradient-to-b from-[#06B6D4] to-[#0891B2]",
  orange: "bg-gradient-to-b from-[#EA580C] to-[#B91C1C]",
  emerald: "bg-gradient-to-b from-[#10B981] to-[#0EA5E9]",
  pink: "bg-gradient-to-b from-[#A855F7] to-[#7C3AED]",
  rose: "bg-gradient-to-b from-[#F43F5E] to-[#BE185D]",
  amber: "bg-gradient-to-b from-[#F59E0B] to-[#EA580C]",
  slate: "bg-gradient-to-b from-[#475569] to-[#334155]",
  violet: "bg-gradient-to-b from-[#9333EA] to-[#6D28D9]",
  red: "bg-gradient-to-b from-[#EF4444] to-[#B91C1C]",
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  brandTag,
  theme = "blue",
  watermark,
  className,
}) => {
  return (
    <header
      className={cn(
        "w-full pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-4 px-5 relative z-20 flex-shrink-0 text-white overflow-hidden select-none",
        themeGradients[theme],
        className
      )}
    >
      {/* Decorative Background Watermark Icon on the trailing side */}
      {watermark && (
        <div className="absolute right-10 top-5 rtl:right-auto rtl:left-10 opacity-20 pointer-events-none select-none text-white scale-100">
          {watermark}
        </div>
      )}

      {/* Main Single Row: Back Button + Title Block on Left (or Right in RTL), Right Action on Right */}
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3.5 min-w-0">
          {showBack && (
            <BackButton
              onClick={onBack}
              className="w-9 h-9 bg-white/20 hover:bg-white/30 border-none shadow-sm flex-shrink-0"
            />
          )}

          <div className="flex flex-col min-w-0">
            {brandTag && (
              <span className="text-[10px] font-black tracking-widest text-cyan-100/90 uppercase block font-heading leading-tight mb-0.5">
                {brandTag}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-white/80 mt-0.5 leading-relaxed font-normal truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightAction && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {rightAction}
          </div>
        )}
      </div>
    </header>
  );
};
