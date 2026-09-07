"use client"

import * as React from "react"
import { cn } from "cn"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-transparent p-0 [--cell-radius:0.5rem] [--cell-size:2.25rem] sm:[--cell-size:2.35rem] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent text-white",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full max-w-[280px] sm:max-w-[300px]", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-2.5",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-2.5", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between z-10",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "size-7.5 p-0 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 select-none aria-disabled:opacity-30 transition-colors flex items-center justify-center cursor-pointer",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "size-7.5 p-0 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 select-none aria-disabled:opacity-30 transition-colors flex items-center justify-center cursor-pointer",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-8 w-full items-center justify-center font-bold text-sm text-white px-7",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-8 w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-semibold select-none text-sm text-white",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse mt-0.5", defaultClassNames.month_grid),
        weekdays: cn("flex w-full justify-between mb-1", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 text-center text-[0.72rem] font-semibold text-slate-400 py-0.5 select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-0.5 flex w-full justify-between", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-xs text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-(--cell-size) w-(--cell-size) rounded-(--cell-radius) p-0 text-center select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0 rounded-s-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:end-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-e-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:start-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "border border-brand-teal/40 text-brand-teal font-semibold",
          defaultClassNames.today
        ),
        outside: cn(
          "text-slate-600 aria-selected:text-slate-600 opacity-40",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-slate-600 opacity-30 cursor-not-allowed pointer-events-none",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("rtl:rotate-180 size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("rtl:rotate-180 size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-(--cell-size) items-center justify-center rounded-xl text-sm font-medium transition-all text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer data-[selected-single=true]:bg-brand-teal data-[selected-single=true]:text-brand-dark data-[selected-single=true]:font-bold data-[selected-single=true]:shadow-md data-[selected-single=true]:shadow-brand-teal/30 disabled:opacity-30 disabled:pointer-events-none",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
