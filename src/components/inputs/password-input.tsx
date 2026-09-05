"use client";

import * as React from "react";
import { TextInput, TextInputProps } from "./text-input";
import { Lock, Eye, EyeOff } from "lucide-react";

export type PasswordInputProps = Omit<TextInputProps, "type" | "rightIcon">;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextInput
      ref={ref}
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      leftIcon={<Lock className="w-5 h-5" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="focus:outline-none hover:text-cyan-400 p-1 transition-colors cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
          ) : (
            <Eye className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
          )}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
