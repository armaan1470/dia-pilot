"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variantStyle?: "glass" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      variantStyle = "glass",
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled}
        size="icon"
        className={cn(
          "rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer p-0",
          size === "sm" && "w-8 h-8 text-xs",
          size === "md" && "w-11 h-11 text-sm",
          size === "lg" && "w-14 h-14 text-base",
          variantStyle === "glass" &&
            "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15",
          variantStyle === "solid" &&
            "bg-brand-card hover:bg-brand-card-light text-white border border-brand-border",
          variantStyle === "ghost" &&
            "bg-transparent hover:bg-white/10 text-slate-300",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
