"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variantStyle?: "gradient" | "solid" | "white";
}

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(
  (
    {
      className,
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      variantStyle = "gradient",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "h-14 rounded-full font-semibold text-base transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 px-6",
          fullWidth ? "w-full" : "w-auto",
          variantStyle === "gradient" &&
            "bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-white hover:opacity-95 shadow-lg shadow-cyan-500/25 border-none",
          variantStyle === "solid" &&
            "bg-[#00B4FF] text-white hover:bg-[#009CE0] shadow-md shadow-cyan-500/20",
          variantStyle === "white" &&
            "bg-white text-[#0066CC] hover:bg-slate-100 shadow-lg shadow-black/20 font-bold",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none shadow-none",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span className="truncate">{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </Button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
