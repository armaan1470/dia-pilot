"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ServiceGradient =
  | "cyan"
  | "purple"
  | "orange"
  | "emerald"
  | "pink"
  | "rose"
  | "amber"
  | "blue";

export interface ServiceCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  watermarkIcon?: React.ReactNode;
  gradient?: ServiceGradient;
  onClick?: () => void;
  className?: string;
}

const gradientStyles: Record<ServiceGradient, string> = {
  cyan: "bg-gradient-to-br from-[#06B6D4] to-[#0284C7] shadow-cyan-500/15",
  purple: "bg-gradient-to-br from-[#818CF8] to-[#6366F1] shadow-indigo-500/15",
  orange: "bg-gradient-to-br from-[#FB923C] to-[#EA580C] shadow-orange-500/15",
  emerald: "bg-gradient-to-br from-[#34D399] to-[#059669] shadow-emerald-500/15",
  pink: "bg-gradient-to-br from-[#F472B6] to-[#DB2777] shadow-pink-500/15",
  rose: "bg-gradient-to-br from-[#FB7185] to-[#E11D48] shadow-rose-500/15",
  amber: "bg-gradient-to-br from-[#FBBF24] to-[#D97706] shadow-amber-500/15",
  blue: "bg-gradient-to-br from-[#38BDF8] to-[#0284C7] shadow-blue-500/15",
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  icon,
  watermarkIcon,
  gradient = "cyan",
  onClick,
  className,
}) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative w-full h-[140px] sm:h-[150px] rounded-lg p-4 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:brightness-105 active:scale-[0.98] border-none text-white shadow-lg",
        gradientStyles[gradient],
        className
      )}
    >
      {/* Background Watermark Icon if provided */}
      {watermarkIcon && (
        <div className="absolute -bottom-1 right-4 rtl:-right-auto rtl:left-4 opacity-40 pointer-events-none scale-100 text-white">
          {watermarkIcon}
        </div>
      )}

      {/* Top Section / Main Icon */}
      <div className="flex items-center justify-start z-10">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-xl shadow-inner">
            {icon}
          </div>
        )}
      </div>

      {/* Title & Subtitle */}
      <div className="z-10 mt-auto">
        <h3 className="text-base sm:text-lg font-bold text-white leading-tight line-clamp-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-white/80 font-medium mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
};
