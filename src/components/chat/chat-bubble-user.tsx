"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChatBubbleUserProps {
  message: string;
  timestamp?: string;
  className?: string;
}

export const ChatBubbleUser: React.FC<ChatBubbleUserProps> = ({
  message,
  timestamp,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-end w-full max-w-[85%] self-end ms-auto my-1.5",
        className
      )}
    >
      <div className="bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue text-white rounded-[20px] rounded-br-[4px] rtl:rounded-br-[20px] rtl:rounded-bl-[4px] px-4 py-3 shadow-md shadow-brand-blue/20 text-sm sm:text-base leading-relaxed break-words">
        {message}
      </div>
      {timestamp && (
        <span className="text-[10px] text-slate-500 mt-1 px-1 font-medium">
          {timestamp}
        </span>
      )}
    </div>
  );
};
