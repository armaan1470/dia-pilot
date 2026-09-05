"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight, Clock } from "lucide-react";

export interface ArticleCardProps {
  title: string;
  category: string;
  readTime?: string;
  summary?: string;
  onClick?: () => void;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  category,
  readTime,
  summary,
  onClick,
  className,
}) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl bg-brand-card border border-brand-border hover:border-brand-teal/40 p-4 flex flex-col gap-2.5 cursor-pointer transition-all duration-200 active:scale-[0.99] text-white shadow-sm hover:shadow-brand-blue/20",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="secondary"
          className="bg-brand-card-light text-brand-teal border border-brand-border text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
        >
          {category}
        </Badge>
        {readTime && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
            {title}
          </h4>
          {summary && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {summary}
            </p>
          )}
        </div>
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 flex-shrink-0 rtl:rotate-180">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
};
