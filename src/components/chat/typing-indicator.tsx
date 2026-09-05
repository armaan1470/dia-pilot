"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TypingIndicatorProps {
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 w-full max-w-[90%] self-start me-auto my-1.5",
        className
      )}
    >
      <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-700/50 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
        <Image
          src="/mascots/Robo head.png"
          alt="DiaPilot AI"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>

      <div className="bg-brand-card border border-brand-border rounded-[20px] rounded-tl-[4px] rtl:rounded-tl-[20px] rtl:rounded-tr-[4px] px-4 py-3.5 shadow-md flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-brand-teal animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-brand-teal animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-brand-teal animate-bounce" />
      </div>
    </div>
  );
};
