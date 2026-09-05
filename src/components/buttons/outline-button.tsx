"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface OutlineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const OutlineButton = React.forwardRef<
  HTMLButtonElement,
  OutlineButtonProps
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
        variant="outline"
        className={cn(
          "h-14 rounded-full font-semibold text-base transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 px-6 bg-transparent hover:bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
          fullWidth ? "w-full" : "w-auto",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
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

OutlineButton.displayName = "OutlineButton";
