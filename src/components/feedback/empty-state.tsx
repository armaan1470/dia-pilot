"use client";

import * as React from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  showMascot?: boolean;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  showMascot = true,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 my-auto gap-4",
        className
      )}
    >
      {showMascot && (
        <div className="relative w-28 h-28 mb-2">
          <Image
            src="/mascots/Robo head.png"
            alt="DiaPilot Mascot"
            width={112}
            height={112}
            className="object-contain"
          />
        </div>
      )}

      <div className="max-w-xs space-y-1.5">
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2 w-full max-w-xs">
          <PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>
        </div>
      )}
    </div>
  );
};
