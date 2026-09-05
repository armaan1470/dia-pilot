"use client";

import * as React from "react";
import { TextInput, TextInputProps } from "./text-input";
import { Mail } from "lucide-react";

export type EmailInputProps = Omit<TextInputProps, "type">;

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (props, ref) => {
    return (
      <TextInput
        ref={ref}
        type="email"
        autoComplete="email"
        leftIcon={<Mail className="w-5 h-5" />}
        {...props}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";
