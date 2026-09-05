"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { BackButton } from "@/components/navigation/back-button";
import { ArrowRight, Bot, Stethoscope, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("onboarding");
  const isRtl = locale === "ar";

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      id: 1,
      title: t("slide1Title"),
      description: t("slide1Desc"),
      icon: Bot,
      mascot: "/mascots/image 1.png",
      accent: "from-cyan-400 to-blue-600",
      pillBadge: isRtl ? "مساعد الذكاء الاصطناعي" : "AI Health Companion",
    },
    {
      id: 2,
      title: t("slide2Title"),
      description: t("slide2Desc"),
      icon: Stethoscope,
      mascot: "/mascots/Robo head.png",
      accent: "from-blue-500 to-indigo-600",
      pillBadge: isRtl ? "خدمات طبية شاملة" : "Specialized Care Hub",
    },
    {
      id: 3,
      title: t("slide3Title"),
      description: t("slide3Desc"),
      icon: CalendarCheck,
      mascot: "/mascots/image 1.png",
      accent: "from-teal-400 to-cyan-600",
      pillBadge: isRtl ? "متابعة وإرشاد مستمر" : "Continuous Guidance",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.push("/login");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none justify-between pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Navigation Row */}
      <div className="w-full pt-[max(1.25rem,env(safe-area-inset-top,0px))] px-6 flex items-center justify-between z-30 flex-shrink-0">
        <BackButton onClick={handleBack} />

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold tracking-widest text-brand-teal uppercase">
            {isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          {t("skip")}
        </button>
      </div>

      {/* Main Slide Carousel Area */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-4 z-10">
        {/* Slide Visual Anchor */}
        <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[300px] mx-auto my-auto flex items-center justify-center">
          {/* Ambient Glow */}
          <div
            className={cn(
              "absolute inset-4 rounded-full bg-gradient-to-tr opacity-25 blur-2xl transition-all duration-500",
              slide.accent
            )}
          />

          {/* Concentric Decorative Rings */}
          <div className="absolute inset-0 rounded-full border border-brand-teal/20" />
          <div className="absolute inset-6 rounded-full border border-brand-teal/30 animate-pulse" />

          {/* Central Hero Frame */}
          <div className="relative w-40 sm:w-44 h-40 sm:h-44 rounded-full bg-gradient-to-tr from-brand-card via-brand-card-light to-brand-dark p-1.5 shadow-2xl border border-brand-border flex items-center justify-center">
            <Image
              src={slide.mascot}
              alt="DiaPilot Onboarding Illustration"
              width={140}
              height={140}
              className="object-contain drop-shadow-xl transition-all duration-300 transform scale-105"
              priority
            />
          </div>

          {/* Feature Badge Pill */}
          <div className="absolute -bottom-2 bg-brand-card border border-brand-border px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2">
            <slide.icon className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-bold text-brand-cyan">
              {slide.pillBadge}
            </span>
          </div>
        </div>

        {/* Text & Content Container */}
        <div className="flex flex-col gap-3 text-center mt-auto">
          {/* Animated Pagination Dots */}
          <div className="flex items-center justify-center gap-2 py-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  idx === currentSlide
                    ? "w-8 bg-brand-teal shadow-sm shadow-brand-teal/50"
                    : "w-2 bg-slate-700 hover:bg-slate-600"
                )}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="space-y-1.5 max-w-xs mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed min-h-[44px]">
              {slide.description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2 w-full space-y-3">
            <PrimaryButton
              onClick={handleNext}
              rightIcon={
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              }
              fullWidth
            >
              {currentSlide === slides.length - 1
                ? t("getStarted")
                : t("next")}
            </PrimaryButton>

            {/* Bottom Sign In Link */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <span>{t("alreadyAccount")}</span>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-bold text-brand-teal hover:underline cursor-pointer"
              >
                {t("signIn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
