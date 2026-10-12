"use client";

import * as React from "react";
import { format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  AlertCircle,
} from "lucide-react";
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
  minDate?: Date;
  maxDate?: Date;
  minAge?: number;
  defaultMonth?: Date;
}

type ViewMode = "days" | "months" | "years";

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "DD / MM / YYYY",
  error,
  helperText,
  disabled = false,
  className,
  id,
  minDate,
  maxDate,
  minAge = 18,
  defaultMonth,
}) => {
  const [open, setOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>("days");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = isRtl ? arSA : enUS;

  const generatedId = React.useId();
  const inputId = id || generatedId;

  // Parsed selected date
  const parsedDate = React.useMemo(() => {
    if (!value) return undefined;
    if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value;
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }, [value]);

  // Boundaries calculation
  const effectiveMaxDate = React.useMemo(() => {
    if (maxDate) return maxDate;
    if (minAge !== undefined) {
      const today = new Date();
      return new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    }
    return new Date();
  }, [maxDate, minAge]);

  const effectiveMinDate = React.useMemo(() => {
    return minDate || new Date(1920, 0, 1);
  }, [minDate]);

  // Initial reference date
  const initialDate = React.useMemo(() => {
    if (parsedDate) return parsedDate;
    if (defaultMonth) return defaultMonth;
    if (minAge !== undefined) {
      const today = new Date();
      // Defaults to 22 years ago for comfortable adult UX
      return new Date(today.getFullYear() - Math.max(minAge, 22), 0, 1);
    }
    return new Date();
  }, [parsedDate, defaultMonth, minAge]);

  const [displayDate, setDisplayDate] = React.useState<Date>(initialDate);

  // Sync when parsedDate changes
  React.useEffect(() => {
    if (parsedDate) {
      setDisplayDate(parsedDate);
    }
  }, [parsedDate]);

  // Selected decade for year browser
  const currentDecadeStart = Math.floor(displayDate.getFullYear() / 10) * 10;
  const [selectedDecade, setSelectedDecade] = React.useState<number>(currentDecadeStart);

  React.useEffect(() => {
    setSelectedDecade(Math.floor(displayDate.getFullYear() / 10) * 10);
  }, [displayDate]);

  // Localized months list
  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(2024, i, 1);
      return {
        index: i,
        name: format(d, "LLLL", { locale: dateLocale }),
        shortName: format(d, "MMM", { locale: dateLocale }),
      };
    });
  }, [dateLocale]);

  // Decades available
  const availableDecades = React.useMemo(() => {
    const maxYear = effectiveMaxDate.getFullYear();
    const minYear = effectiveMinDate.getFullYear();
    const maxDec = Math.floor(maxYear / 10) * 10;
    const minDec = Math.floor(minYear / 10) * 10;
    const list: number[] = [];
    for (let dec = maxDec; dec >= minDec; dec -= 10) {
      list.push(dec);
    }
    return list;
  }, [effectiveMaxDate, effectiveMinDate]);

  // Years in the selected decade
  const yearsInDecade = React.useMemo(() => {
    const maxYear = effectiveMaxDate.getFullYear();
    const minYear = effectiveMinDate.getFullYear();
    const list: number[] = [];
    for (let y = selectedDecade + 9; y >= selectedDecade; y--) {
      if (y >= minYear && y <= maxYear) {
        list.push(y);
      }
    }
    return list;
  }, [selectedDecade, effectiveMaxDate, effectiveMinDate]);

  // Calculate live age for selected date
  const calculatedAge = React.useMemo(() => {
    if (!parsedDate) return null;
    const today = new Date();
    let age = today.getFullYear() - parsedDate.getFullYear();
    const m = today.getMonth() - parsedDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) {
      age--;
    }
    return age;
  }, [parsedDate]);

  // Selection handlers
  const handleSelectDay = (selected: Date | undefined) => {
    onChange?.(selected);
    if (selected) {
      setOpen(false);
      setViewMode("days");
    }
  };

  const handleSelectMonth = (monthIndex: number) => {
    const updated = new Date(displayDate.getFullYear(), monthIndex, 1);
    setDisplayDate(updated);
    setViewMode("days");
  };

  const handleSelectYear = (year: number) => {
    const updated = new Date(year, displayDate.getMonth(), 1);
    setDisplayDate(updated);
    setViewMode("months");
  };

  const handlePrevMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1)
    );
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

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setViewMode("days");
        }}
      >
        <PopoverTrigger
          id={inputId}
          disabled={disabled}
          className={cn(
            "h-12 sm:h-13 w-full rounded-lg bg-brand-input border border-brand-border text-white text-sm sm:text-base px-4 flex items-center justify-between cursor-pointer transition-all shadow-inner hover:border-brand-teal/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:border-brand-teal",
            !parsedDate && "text-slate-500",
            error &&
              "border-rose-500 focus-visible:ring-rose-500 focus-visible:border-rose-500 hover:border-rose-500",
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
          sideOffset={8}
          className="w-[320px] sm:w-[336px] p-3.5 bg-brand-card/98 border border-brand-border/90 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] text-white z-50 overflow-hidden select-none"
        >
          {/* 1. Header Toolbar with Mode Switcher Pills */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-brand-border/60">
            {/* Month & Year Interactive Switchers */}
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                type="button"
                onClick={() =>
                  setViewMode(viewMode === "months" ? "days" : "months")
                }
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  viewMode === "months"
                    ? "bg-brand-teal text-brand-dark shadow-sm shadow-brand-teal/40"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                )}
              >
                <span>{format(displayDate, "MMMM", { locale: dateLocale })}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode(viewMode === "years" ? "days" : "years")
                }
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 font-mono",
                  viewMode === "years"
                    ? "bg-brand-teal text-brand-dark shadow-sm shadow-brand-teal/40"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                )}
              >
                <span>{displayDate.getFullYear()}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
            </div>

            {/* Quick Next / Prev Arrows (in Days view) or Mode Reset */}
            {viewMode === "days" ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label={isRtl ? "الشهر السابق" : "Previous Month"}
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label={isRtl ? "الشهر التالي" : "Next Month"}
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode("days")}
                className="text-[11px] font-semibold text-brand-teal hover:underline px-1.5 py-1 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isRtl ? "الأيام" : "Days"}</span>
              </button>
            )}
          </div>

          {/* 2. Dynamic Content Area based on View Mode */}

          {/* VIEW MODE: YEARS */}
          {viewMode === "years" && (
            <div className="flex flex-col gap-2.5 py-1">
              {/* Decade Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {availableDecades.map((dec) => (
                  <button
                    key={dec}
                    type="button"
                    onClick={() => setSelectedDecade(dec)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer font-mono shrink-0",
                      selectedDecade === dec
                        ? "bg-brand-teal text-brand-dark shadow-sm shadow-brand-teal/30"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                    )}
                  >
                    {dec}s
                  </button>
                ))}
              </div>

              {/* Grid of Years for Selected Decade */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {yearsInDecade.map((year) => {
                  const isCurrent = displayDate.getFullYear() === year;
                  const isSelected = parsedDate?.getFullYear() === year;

                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => handleSelectYear(year)}
                      className={cn(
                        "h-10 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono flex items-center justify-center",
                        isSelected
                          ? "bg-brand-teal text-brand-dark shadow-md shadow-brand-teal/40 font-black scale-105"
                          : isCurrent
                          ? "bg-white/15 text-brand-teal border border-brand-teal/40"
                          : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5"
                      )}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE: MONTHS */}
          {viewMode === "months" && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {months.map((m) => {
                const isCurrent = displayDate.getMonth() === m.index;
                const isSelected =
                  parsedDate?.getFullYear() === displayDate.getFullYear() &&
                  parsedDate?.getMonth() === m.index;

                return (
                  <button
                    key={m.index}
                    type="button"
                    onClick={() => handleSelectMonth(m.index)}
                    className={cn(
                      "h-11 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center px-2",
                      isSelected
                        ? "bg-brand-teal text-brand-dark shadow-md shadow-brand-teal/40 font-black scale-105"
                        : isCurrent
                        ? "bg-white/15 text-brand-teal border border-brand-teal/40"
                        : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5"
                    )}
                  >
                    <span className="leading-tight">{m.shortName}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW MODE: DAYS (CALENDAR GRID) */}
          {viewMode === "days" && (
            <div className="flex flex-col items-center">
              <Calendar
                mode="single"
                month={displayDate}
                onMonthChange={setDisplayDate}
                selected={parsedDate}
                onSelect={handleSelectDay}
                captionLayout="label"
                startMonth={effectiveMinDate}
                endMonth={effectiveMaxDate}
                disabled={(date) =>
                  date > effectiveMaxDate || date < effectiveMinDate
                }
                locale={dateLocale}
                formatters={{
                  formatWeekdayName: (date) =>
                    isRtl
                      ? format(date, "EEEEEE", { locale: dateLocale })
                      : format(date, "EEE", { locale: dateLocale }),
                }}
                classNames={{
                  nav: "hidden", // We use our sleek toolbar arrows instead
                  month_caption: "hidden", // We use our interactive mode buttons instead
                }}
                className="w-full text-white"
              />
            </div>
          )}

          {/* 3. Footer Bar with Live Age Verification Status */}
          <div className="pt-2.5 mt-2 border-t border-brand-border/60 flex items-center justify-between text-xs">
            {parsedDate ? (
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="text-slate-400 text-[11px]">
                  {format(parsedDate, "dd MMMM yyyy", { locale: dateLocale })}
                </span>
                {calculatedAge !== null && (
                  <span
                    className={cn(
                      "text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                      calculatedAge >= (minAge ?? 18)
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                    )}
                  >
                    {calculatedAge >= (minAge ?? 18) ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>
                          {calculatedAge} {isRtl ? "سنة (مؤهل)" : "years (Eligible)"}
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        <span>
                          {calculatedAge} {isRtl ? "سنة (<18)" : "years (<18)"}
                        </span>
                      </>
                    )}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-400">
                {isRtl
                  ? "انقر على السنة أو الشهر لتغييرها فوراً"
                  : "Tap Year or Month to change directly"}
              </span>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {error ? (
        <p className="text-xs text-rose-400 font-medium px-1 mt-0.5 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 px-1 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};

DatePicker.displayName = "DatePicker";
