"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  hideErrorText?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      label,
      error,
      leftIcon,
      rightIcon,
      helperText,
      hideErrorText,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <Label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wider text-slate-400 uppercase select-none px-1"
          >
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute start-4 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <Input
            id={inputId}
            ref={ref}
            className={cn(
              "h-12 sm:h-13 w-full rounded-lg bg-brand-input border-brand-border text-white placeholder:text-slate-500 text-sm sm:text-base focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:border-brand-teal transition-all shadow-inner px-4",
              leftIcon && "ps-11",
              rightIcon && "pe-11",
              error && "border-rose-500 focus-visible:ring-rose-500 focus-visible:border-rose-500 hover:border-rose-500",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute end-4 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && !hideErrorText ? (
          <p className="text-xs text-rose-400 font-medium px-1 mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 px-1 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
