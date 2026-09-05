"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

export interface AppointmentCardProps {
  title: string;
  facility: string;
  date: string;
  time: string;
  status?: "confirmed" | "pending" | "completed";
  statusText?: string;
  onClick?: () => void;
  className?: string;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  title,
  facility,
  date,
  time,
  status = "confirmed",
  statusText,
  onClick,
  className,
}) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl bg-[#132238] border border-[#1E3557] hover:border-cyan-500/40 p-4 flex flex-col gap-3 cursor-pointer transition-all duration-200 active:scale-[0.99] text-white shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-white leading-tight">
            {title}
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="line-clamp-1">{facility}</span>
          </div>
        </div>

        {statusText && (
          <Badge
            className={cn(
              "text-[11px] font-semibold px-2.5 py-0.5 rounded-full border",
              status === "confirmed" &&
                "bg-emerald-950/70 text-emerald-300 border-emerald-800/40",
              status === "pending" &&
                "bg-amber-950/70 text-amber-300 border-amber-800/40",
              status === "completed" &&
                "bg-slate-800 text-slate-300 border-slate-700"
            )}
          >
            {statusText}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{time}</span>
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 rtl:rotate-180">
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Card>
  );
};
