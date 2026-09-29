import type { HeaderTheme } from "@/components/navigation/page-header";
import type { AppleEmojiName } from "@/components/ui/apple-emoji";

export interface CategoryConfig {
  theme: HeaderTheme;
  emojiName: AppleEmojiName;
  numberColor: string;
  arrowPillClass: string;
  arrowIconClass: string;
  aiGradient: string;
}

const colors = {
  cyan: {
    numberColor: "text-cyan-400",
    arrowPillClass:
      "bg-cyan-500/15 border-cyan-500/25 group-hover:bg-cyan-500/25",
    arrowIconClass: "text-cyan-400",
    aiGradient: "from-brand-teal via-brand-cyan to-brand-blue",
  },
  purple: {
    numberColor: "text-indigo-400",
    arrowPillClass:
      "bg-indigo-500/15 border-indigo-500/25 group-hover:bg-indigo-500/25",
    arrowIconClass: "text-indigo-400",
    aiGradient: "from-[#A78BFA] to-[#3730A3]",
  },
  teal: {
    numberColor: "text-teal-400",
    arrowPillClass:
      "bg-teal-500/15 border-teal-500/25 group-hover:bg-teal-500/25",
    arrowIconClass: "text-teal-400",
    aiGradient: "from-[#06B6D4] via-[#0891B2] to-[#0E7490]",
  },
  orange: {
    numberColor: "text-orange-400",
    arrowPillClass:
      "bg-orange-500/15 border-orange-500/25 group-hover:bg-orange-500/25",
    arrowIconClass: "text-orange-400",
    aiGradient: "from-[#FB923C] via-[#EA580C] to-[#C2410C]",
  },
  emerald: {
    numberColor: "text-emerald-400",
    arrowPillClass:
      "bg-emerald-500/15 border-emerald-500/25 group-hover:bg-emerald-500/25",
    arrowIconClass: "text-emerald-400",
    aiGradient: "from-[#34D399] via-[#10B981] to-[#059669]",
  },
  rose: {
    numberColor: "text-rose-400",
    arrowPillClass:
      "bg-rose-500/15 border-rose-500/25 group-hover:bg-rose-500/25",
    arrowIconClass: "text-rose-400",
    aiGradient: "from-[#FB7185] to-[#E11D48]",
  },
  amber: {
    numberColor: "text-amber-400",
    arrowPillClass:
      "bg-amber-500/15 border-amber-500/25 group-hover:bg-amber-500/25",
    arrowIconClass: "text-amber-400",
    aiGradient: "from-[#FBBF24] to-[#D97706]",
  },
  violet: {
    numberColor: "text-violet-400",
    arrowPillClass:
      "bg-violet-500/15 border-violet-500/25 group-hover:bg-violet-500/25",
    arrowIconClass: "text-violet-400",
    aiGradient: "from-[#A855F7] to-[#7C3AED]",
  },
  slate: {
    numberColor: "text-slate-400",
    arrowPillClass:
      "bg-slate-500/15 border-slate-500/25 group-hover:bg-slate-500/25",
    arrowIconClass: "text-slate-300",
    aiGradient: "from-[#64748B] to-[#334155]",
  },
};

export const serviceCategoryData: Record<string, CategoryConfig> = {
  "diabetes-care": {
    theme: "cyan",
    emojiName: "stethoscope",
    ...colors.cyan,
  },
  endocrinology: {
    theme: "blue",
    emojiName: "stethoscope",
    ...colors.cyan,
  },
  "optometry-eye-health": {
    theme: "teal",
    emojiName: "eye",
    ...colors.teal,
  },
  "diabetic-foot-care": {
    theme: "orange",
    emojiName: "foot",
    ...colors.orange,
  },
  nutrition: {
    theme: "emerald",
    emojiName: "apple",
    ...colors.emerald,
  },
  "oral-health-dentistry": {
    theme: "rose",
    emojiName: "tooth",
    ...colors.rose,
  },
  "health-education": {
    theme: "amber",
    emojiName: "books",
    ...colors.amber,
  },
  "living-coping": {
    theme: "violet",
    emojiName: "handshake",
    ...colors.violet,
  },
  "appointments-services": {
    theme: "purple",
    emojiName: "calendar",
    ...colors.purple,
  },
  "contact-support": {
    theme: "slate",
    emojiName: "handset",
    ...colors.slate,
  },
};
