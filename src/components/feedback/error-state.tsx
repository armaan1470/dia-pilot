"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An error occurred while loading content. Please try again.",
  retryLabel = "Retry",
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 my-auto gap-4",
        className
      )}
    >
      <div className="w-16 h-16 rounded-lg bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="max-w-xs space-y-1.5">
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <div className="pt-2 w-full max-w-xs">
          <PrimaryButton
            onClick={onRetry}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {retryLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
