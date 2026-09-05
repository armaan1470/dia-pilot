"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomCheckboxProps {
  checked: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  iconSizes?: "sm" | "md" | "lg";
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  }[size];

  const iconSizes = {
    sm: "w-3 h-3 stroke-[3]",
    md: "w-3.5 h-3.5 stroke-[3.5]",
    lg: "w-4 h-4 stroke-[3.5]",
  }[size];

  if (checked) {
    return (
      <div
        className={cn(
          sizeClasses,
          "rounded-full glow-subtle bg-gradient-to-br from-brand-teal to-brand-blue flex items-center justify-center text-white flex-shrink-0 transition-all duration-200",
          className
        )}
      >
        <Check className={"size-3.5 mt-0.5"} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        sizeClasses,
        "rounded-full bg-gradient-to-br from-[#112A3F] to-[#3D516D] flex items-center justify-center flex-shrink-0 transition-all duration-200",
        className
      )}
    />
  );
};
