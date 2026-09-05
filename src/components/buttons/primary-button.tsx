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
          "h-12 sm:h-13 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 px-6",
          fullWidth ? "w-full" : "w-auto",
          variantStyle === "gradient" &&
            "bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue shadow-[0_6px_18px_rgba(36,120,188,0.28)] hover:brightness-110 text-white",
          variantStyle === "solid" &&
            "bg-brand-blue text-white hover:brightness-110 shadow-md shadow-blue-500/20",
          variantStyle === "white" &&
            "bg-white text-brand-dark-blue hover:bg-slate-100 shadow-md shadow-black/20 font-bold",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none shadow-none",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
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
