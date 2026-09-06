"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type AppleEmojiName =
  | "apple"
  | "foot"
  | "eye"
  | "blood"
  | "syringe"
  | "flag_gb"
  | "flag_sa"
  | "stethoscope"
  | "calendar"
  | "salad"
  | "tooth"
  | "books"
  | "documents"
  | "bell"
  | "lock"
  | "question"
  | "globe"
  | "hospital"
  | "purple_heart"
  | "handshake"
  | "building"
  | "phone"
  | "telephone"
  | "handset"
  | "headset"
  | "chart"
  | "clipboard"
  | "memo"
  | "satellite"
  | "moon";

export interface AppleEmojiProps {
  name: AppleEmojiName;
  size?: number;
  className?: string;
  alt?: string;
}

export const AppleEmoji: React.FC<AppleEmojiProps> = ({
  name,
  size = 24,
  className,
  alt = "",
}) => {
  return (
    <Image
      src={`/emojis/apple/${name}.png`}
      alt={alt || name}
      width={size}
      height={size}
      className={cn("inline-block object-contain select-none flex-shrink-0", className)}
      loading="eager"
      priority={size >= 48}
    />
  );
};
