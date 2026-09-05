"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { AppleEmoji } from "@/components/ui/apple-emoji";

export default function SplashScreen() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-gradient-to-b from-[#00A8FF] via-[#006CD8] to-[#071326] text-white relative overflow-y-auto no-scrollbar select-none justify-between pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Brand Header */}
      <div className="pt-[max(1.25rem,env(safe-area-inset-top,0px))] px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-400/40 p-0.5 flex items-center justify-center shadow-md">
            <Image
              src="/mascots/Robo head.png"
              alt="DiaPilot Mascot"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-xs font-extrabold tracking-[0.2em] text-white/95 uppercase font-heading">
            {isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          </span>
        </div>

        {/* Quick Locale Toggle Pill */}
        <Link
          href="/"
          locale={isRtl ? "en" : "ar"}
          className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all active:scale-95"
        >
          {isRtl ? "English" : "العربية"}
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-4 pb-4 z-10">
        {/* Hero Typography */}
        <div className="flex flex-col gap-3 max-w-[340px]">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-[1.12]">
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

          <p className="text-xs sm:text-sm text-cyan-50/85 leading-relaxed font-normal">
            {isRtl
              ? "احصل على توجيهات فورية مدعومة بالذكاء الاصطناعي لمرض السكري والغدد الصماء والعناية بالقدم — في أي وقت وفي أي مكان."
              : "Get instant AI-powered guidance for diabetes, endocrinology & foot care — anytime, anywhere."}
          </p>

          {/* CTA Action Button */}
          <div className="pt-2">
            <Link
              href="/language"
              className="inline-flex items-center gap-3.5 h-12 sm:h-13 px-5 rounded-full bg-[#3B82F6]/85 hover:bg-[#3B82F6] border border-white/25 backdrop-blur-xl text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-900/40 active:scale-[0.97] transition-all group"
            >
              {!isRtl && (
                <div className="w-7 h-7 rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4 text-[#2563EB]" />
                </div>
              )}

              <span className="tracking-wide">
                {isRtl ? "ابدأ الآن" : "Get Started"}
              </span>

              {isRtl && (
                <div className="w-7 h-7 rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4 text-[#2563EB] rotate-180" />
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Orbit Planet & Core Pillars Visual */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto mt-4 flex items-center justify-center">
          {/* Outer Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-200/20" />
          <div className="absolute inset-8 rounded-full border border-cyan-200/25" />

          {/* Center Robot Hero Mascot Avatar */}
          <div className="relative w-32 sm:w-36 h-32 sm:h-36 rounded-full bg-gradient-to-tr from-[#1E40AF] via-[#0284C7] to-[#38BDF8] p-1.5 shadow-2xl shadow-cyan-500/30 flex items-center justify-center ring-4 ring-white/20">
            <div className="w-full h-full rounded-full bg-[#0E3A74] flex items-center justify-center overflow-hidden relative">
              <Image
                src="/mascots/image 1.png"
                alt="DiaPilot Doctor Robot"
                width={128}
                height={128}
                className="object-contain scale-110 drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Orbiting Satellite 1: Top Nutrition (Apple) */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#DCFCE7] border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <AppleEmoji name="apple" size={24} />
          </div>

          {/* Orbiting Satellite 2: Right / Foot Care */}
          <div className="absolute top-1/3 -right-1 w-11 h-11 rounded-full bg-[#FED7AA] border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <AppleEmoji name="foot" size={24} />
          </div>

          {/* Orbiting Satellite 3: Bottom Right / Eye Care */}
          <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-[#E0F2FE] border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <AppleEmoji name="eye" size={24} />
          </div>

          {/* Orbiting Satellite 4: Left / Diabetes Monitoring & Meter */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FFEDD5] border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <AppleEmoji name="blood" size={22} />
          </div>

          {/* Orbiting Satellite 5: Bottom Left / Insulin & Medication */}
          <div className="absolute bottom-2 left-6 w-11 h-11 rounded-full bg-[#FCE7F3] border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <AppleEmoji name="syringe" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
