"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { ChevronLeft } from "lucide-react";
import { IconButton } from "@/components/buttons/icon-button";
import { cn } from "@/lib/utils";

export interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  variantStyle?: "glass" | "solid" | "ghost";
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  className,
  variantStyle = "glass",
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <IconButton
      icon={<ChevronLeft className="w-5 h-5 rtl:rotate-180" />}
      onClick={handleBack}
      variantStyle={variantStyle}
      size="md"
      className={cn("flex-shrink-0 cursor-pointer", className)}
      aria-label="Go Back"
    />
  );
};
