"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AskAIBannerProps {
  title: string;
  subtitle: string;
  gradientClass?: string;
  onClick?: () => void;
  className?: string;
}

export const AskAIBanner: React.FC<AskAIBannerProps> = ({
  title,
  subtitle,
  gradientClass = "from-brand-teal via-brand-cyan to-brand-blue",
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg bg-gradient-to-br p-3.5 flex items-center justify-between shadow-lg cursor-pointer active:scale-[0.98] transition-all",
        gradientClass,
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 p-1 flex items-center justify-center backdrop-blur-md flex-shrink-0">
          <Image
            src="/mascots/Robo head.png"
            alt="AI Assistant"
            width={34}
            height={34}
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-white leading-tight truncate">
            {title}
          </h4>
          <p className="text-xs text-white/90 font-medium mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white flex-shrink-0 rtl:rotate-180 shadow-sm">
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};
