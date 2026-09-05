"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ChatBubbleAIProps {
  message: string;
  timestamp?: string;
  className?: string;
}

export const ChatBubbleAI: React.FC<ChatBubbleAIProps> = ({
  message,
  timestamp,
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

      <div className="flex flex-col items-start flex-1 min-w-0">
        <div className="bg-[#132238] border border-[#1E3557] text-slate-100 rounded-[20px] rounded-tl-[4px] rtl:rounded-tl-[20px] rtl:rounded-tr-[4px] px-4 py-3 shadow-md text-sm sm:text-base leading-relaxed break-words">
          {message}
        </div>
        {timestamp && (
          <span className="text-[10px] text-slate-500 mt-1 px-1 font-medium">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};
