"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(
  (
    {
      className,
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        variant="secondary"
        className={cn(
          "h-14 rounded-full font-semibold text-base transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 px-6 bg-[#162842]/90 hover:bg-[#1C3354] text-slate-100 border border-white/10 shadow-sm",
          fullWidth ? "w-full" : "w-auto",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
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

SecondaryButton.displayName = "SecondaryButton";
