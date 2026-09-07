"use client";

import * as React from "react";
import { format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  label?: string;
  value?: Date | string;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
  error,
  helperText,
  disabled = false,
  className,
  id,
}) => {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = isRtl ? arSA : enUS;

  const generatedId = React.useId();
  const inputId = id || generatedId;

  const parsedDate = React.useMemo(() => {
    if (!value) return undefined;
    if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value;
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }, [value]);

  const handleSelect = (selected: Date | undefined) => {
    onChange?.(selected);
    setOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <Label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wider text-slate-400 uppercase select-none px-1"
        >
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={inputId}
          disabled={disabled}
          className={cn(
            "h-12 sm:h-13 w-full rounded-lg bg-brand-input border border-brand-border text-white text-sm sm:text-base px-4 flex items-center justify-between cursor-pointer transition-all shadow-inner hover:border-brand-teal/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:border-brand-teal",
            !parsedDate && "text-slate-500",
            error && "border-rose-500 focus-visible:ring-rose-500 focus-visible:border-rose-500 hover:border-rose-500",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <CalendarIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="truncate">
              {parsedDate
                ? format(parsedDate, "P", { locale: dateLocale })
                : placeholder}
            </span>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400 opacity-60 flex-shrink-0" />
        </PopoverTrigger>

        <PopoverContent
          align="center"
          sideOffset={6}
          className="w-[304px] sm:w-[320px] p-3.5 bg-brand-card/95 border border-brand-border/80 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] text-white z-50 overflow-hidden flex flex-col items-center"
        >
          <Calendar
            mode="single"
            selected={parsedDate}
            onSelect={handleSelect}
            captionLayout="label"
            startMonth={new Date(1920, 0)}
            endMonth={new Date()}
            disabled={(date) => date > new Date()}
            locale={dateLocale}
            formatters={{
              formatWeekdayName: (date) =>
                isRtl
                  ? format(date, "EEEEEE", { locale: dateLocale })
                  : format(date, "EEE", { locale: dateLocale }),
            }}
            className="w-full text-white"
          />
        </PopoverContent>
      </Popover>

      {error ? (
        <p className="text-xs text-rose-400 font-medium px-1 mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 px-1 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};

DatePicker.displayName = "DatePicker";
