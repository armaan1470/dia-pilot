"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  maxLength = 4,
  className,
  disabled = false,
}) => {
  return (
    <div className={cn("flex justify-center items-center py-2", className)}>
      <InputOTP
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <InputOTPGroup className="gap-3 sm:gap-4">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="w-14 h-16 sm:w-16 sm:h-18 rounded-2xl bg-[#152438] border-[#223854] text-white text-2xl font-bold focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all shadow-inner"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};
