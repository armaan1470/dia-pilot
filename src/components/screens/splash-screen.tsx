"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { AppleEmoji } from "@/components/ui/apple-emoji";

interface SplashScreenProps {
  isEmbedded?: boolean;
}

export function SplashScreen({ isEmbedded = false }: SplashScreenProps) {
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar";

  return (
    <div className={`flex flex-col flex-1 ${isEmbedded ? "h-full" : "min-h-dvh"} bg-diapilot-gradient text-white relative overflow-y-auto no-scrollbar select-none ${isEmbedded ? "p-3.5 pt-4" : "px-6 pt-5 pb-[max(2rem,env(safe-area-inset-bottom,0px))]"}`}>
      
      {/* Brand Header */}
      <div className={`flex items-center justify-between z-20 ${isEmbedded ? "pt-2" : "pt-[max(1.25rem,env(safe-area-inset-top,0px))]"}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 p-0.5 flex items-center justify-center shadow-md">
            <Image
              src="/mascots/Robo head.png"
              alt="DiaPilot Mascot"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="text-[11px] font-extrabold tracking-[0.18em] text-white uppercase font-heading">
            {isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          </span>
        </div>

        {/* Locale Toggle */}
        <Link
          href="/"
          locale={isRtl ? "en" : "ar"}
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all active:scale-95 text-white"
        >
          {isRtl ? "English" : "العربية"}
        </Link>
      </div>

      {/* Main Hero Content */}
      <div className={`flex-1 flex flex-col justify-between z-10 ${isEmbedded ? "pt-3 pb-2" : "pt-6 pb-6"}`}>
        {/* Typography */}
        <div className="flex flex-col gap-2">
          <h1 className={`${isEmbedded ? "text-2xl" : "text-3xl sm:text-4xl"} font-black tracking-tight text-white leading-[1.14]`}>
            {isRtl ? (
              <>
                رفيقك الذكي لمرض
                <br />
                السكري
              </>
            ) : (
              <>
                Your Smart
                <br />
                Diabetes
                <br />
                Companion
              </>
            )}
          </h1>

          <p className={`${isEmbedded ? "text-[11px] line-clamp-2" : "text-xs sm:text-sm"} text-white/85 leading-relaxed font-normal`}>
            {t("splash.subtitle")}
          </p>

          {/* CTA Button */}
          <div className={isEmbedded ? "pt-1" : "py-3"}>
            <Link
              href="/language"
              className={`inline-flex items-center gap-2.5 ${isEmbedded ? "pl-2 pr-3.5 py-1.5 text-xs" : "pl-2.5 pr-5.5 py-2.5 text-sm sm:text-base"} rounded-full bg-white/[0.18] hover:bg-white/[0.28] border border-white/40 backdrop-blur-md text-white font-bold transition-all active:scale-[0.98] group`}
            >
              {!isRtl && (
                <div className={`${isEmbedded ? "w-6 h-6" : "w-8 h-8"} rounded-full bg-white text-brand-blue flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0`}>
                  <ArrowRight className={`${isEmbedded ? "w-3.5 h-3.5" : "w-4 h-4"} text-brand-blue`} />
                </div>
              )}

              <span className="tracking-wide">
                {t("splash.cta")}
              </span>

              {isRtl && (
                <div className={`${isEmbedded ? "w-6 h-6" : "w-8 h-8"} rounded-full bg-white text-brand-blue flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0`}>
                  <ArrowRight className={`${isEmbedded ? "w-3.5 h-3.5" : "w-4 h-4"} text-brand-blue rotate-180`} />
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Orbit Planet & Hero Mascot Visual */}
        <div className={`relative w-full ${isEmbedded ? "max-w-[200px] my-auto" : "max-w-[280px] sm:max-w-[310px] mt-10"} aspect-square mx-auto flex items-center justify-center`}>
          {/* Outer Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-brand-teal/25" />
          <div className="absolute inset-5 rounded-full border border-brand-teal/30" />

          {/* Mascot Center */}
          <div className={`relative ${isEmbedded ? "w-24 h-24" : "w-32 sm:w-36 h-32 sm:h-36"} rounded-full bg-gradient-to-tr from-brand-dark-blue via-brand-blue to-brand-cyan p-1 shadow-xl flex items-center justify-center ring-2 ring-white/20`}>
            <div className="w-full h-full rounded-full bg-brand-sheet-from flex items-center justify-center overflow-hidden relative">
              <Image
                src="/mascots/image 1.png"
                alt="DiaPilot Doctor Robot"
                width={isEmbedded ? 84 : 128}
                height={isEmbedded ? 84 : 128}
                className="object-contain scale-110 drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Satellites */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${isEmbedded ? "w-7 h-7" : "w-11 h-11"} rounded-full bg-[#DCFCE7] border-2 border-white shadow-md flex items-center justify-center`}>
            <AppleEmoji name="apple" size={isEmbedded ? 15 : 24} />
          </div>

          <div className={`absolute top-1/3 -right-1 ${isEmbedded ? "w-7 h-7" : "w-11 h-11"} rounded-full bg-[#FED7AA] border-2 border-white shadow-md flex items-center justify-center`}>
            <AppleEmoji name="foot" size={isEmbedded ? 15 : 24} />
          </div>

          <div className={`absolute bottom-2 right-2 ${isEmbedded ? "w-7 h-7" : "w-11 h-11"} rounded-full bg-[#E0F2FE] border-2 border-white shadow-md flex items-center justify-center`}>
            <AppleEmoji name="eye" size={isEmbedded ? 15 : 24} />
          </div>

          <div className={`absolute top-1/2 -left-1.5 -translate-y-1/2 ${isEmbedded ? "w-7 h-7" : "w-11 h-11"} rounded-full bg-[#FFEDD5] border-2 border-white shadow-md flex items-center justify-center`}>
            <AppleEmoji name="blood" size={isEmbedded ? 14 : 22} />
          </div>

          <div className={`absolute bottom-1 left-2 ${isEmbedded ? "w-7 h-7" : "w-11 h-11"} rounded-full bg-[#FCE7F3] border-2 border-white shadow-md flex items-center justify-center`}>
            <AppleEmoji name="syringe" size={isEmbedded ? 15 : 24} />
          </div>
        </div>

      </div>

    </div>
  );
}
