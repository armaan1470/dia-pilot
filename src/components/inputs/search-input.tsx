"use client";

import * as React from "react";
import { TextInput, TextInputProps } from "./text-input";
import { Search, X } from "lucide-react";

export interface SearchInputProps extends Omit<TextInputProps, "leftIcon" | "rightIcon"> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear, placeholder = "Search...", ...props }, ref) => {
    const hasValue = Boolean(value);

    return (
      <TextInput
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        leftIcon={<Search className="w-5 h-5" />}
        rightIcon={
          hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";
