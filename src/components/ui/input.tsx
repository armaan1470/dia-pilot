import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-2xl border border-brand-border bg-brand-input px-4 py-2 text-sm sm:text-base text-white placeholder:text-slate-400 transition-colors outline-none focus-visible:border-brand-teal focus-visible:ring-1 focus-visible:ring-brand-teal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
