"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { MessageSquare, LayoutGrid, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  className,
}) => {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const tabs = [
    {
      key: "chat",
      label: t("chat"),
      href: "/chat",
      icon: MessageSquare,
      exactMatch: false,
    },
    {
      key: "services",
      label: t("services"),
      href: "/services",
      icon: LayoutGrid,
      exactMatch: false,
    },
    {
      key: "profile",
      label: t("profile"),
      href: "/profile",
      icon: User,
      exactMatch: false,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 w-full z-40 bg-[#0A1322]/95 backdrop-blur-2xl border-t border-white/10 px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] transition-all duration-300 flex-shrink-0",
        className
      )}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[72px] py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 group",
                isActive ? "text-cyan-400" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200",
                  isActive &&
                    "bg-cyan-950/80 border border-cyan-800/60 shadow-sm shadow-cyan-500/20"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "scale-110 text-cyan-400" : "group-hover:scale-105"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[11px] font-semibold tracking-tight transition-all",
                  isActive ? "text-cyan-400 font-bold" : "text-slate-400"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
