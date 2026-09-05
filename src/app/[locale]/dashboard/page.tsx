"use client";

import * as React from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ServiceCard } from "@/components/cards/service-card";
import { MetricCard } from "@/components/cards/metric-card";
import { mockServices } from "@/lib/mocks/services";
import { mockProfile } from "@/lib/mocks/profile";
import {
  ArrowRight,
  Activity,
  Calendar,
  Stethoscope,
  Eye,
  Footprints,
  Apple,
  Syringe,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function DashboardScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const isRtl = locale === "ar";

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Stethoscope":
        return <Stethoscope className="w-5 h-5" />;
      case "Calendar":
        return <Calendar className="w-5 h-5" />;
      case "Eye":
        return <Eye className="w-5 h-5" />;
      case "Footprints":
        return <Footprints className="w-5 h-5" />;
      case "Apple":
        return <Apple className="w-5 h-5" />;
      case "Syringe":
        return <Syringe className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Stethoscope className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))]">
      {/* Top Welcome Header */}
      <div className="w-full pt-[max(1.25rem,env(safe-area-inset-top,0px))] px-6 pb-4 flex items-center justify-between bg-gradient-to-b from-[#0A1B33] to-[#070F1E] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
            <Image
              src="/mascots/Robo head.png"
              alt="User Avatar"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">
              {t("greeting")}
            </span>
            <h2 className="text-base font-bold text-white leading-tight">
              {mockProfile.fullName}
            </h2>
          </div>
        </div>

        <Link
          href="/language"
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-all border border-white/10"
        >
          {isRtl ? "English" : "العربية"}
        </Link>
      </div>

      {/* Main Dashboard Content */}
      <div className="px-5 space-y-5 pt-2">
        {/* AI Chat Hero Card */}
        <div
          onClick={() => router.push("/chat")}
          className="relative w-full rounded-[28px] bg-gradient-to-r from-[#0094FF] via-[#006CD8] to-[#004DB3] p-5 shadow-xl shadow-cyan-900/30 overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all group"
        >
          {/* Subtle Glow & Background Watermark Mascot */}
          <div className="absolute -right-4 -bottom-6 rtl:-right-auto rtl:-left-4 w-32 h-32 opacity-25 pointer-events-none group-hover:scale-105 transition-transform">
            <Image
              src="/mascots/Robo head.png"
              alt="AI Background"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {/* Online Status Pill */}
            <div className="inline-flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-white tracking-wide">
                {t("online")}
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                {t("aiShortcut")}
              </h3>
              <p className="text-xs text-cyan-100/90 font-normal mt-0.5">
                {t("aiShortcutSubtitle")}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-white/90 underline underline-offset-4">
                {isRtl ? "ابدأ المحادثة الآن" : "Start conversation now"}
              </span>
              <div className="w-8 h-8 rounded-full bg-white text-[#006CD8] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform rtl:rotate-180">
                <ArrowRight className="w-4 h-4 text-[#006CD8]" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Health Biomarkers */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label={isRtl ? "مستوى السكر الحالي" : "Current Blood Sugar"}
            value="118"
            unit="mg/dL"
            statusText={isRtl ? "ضمن المعدل الطبيعي" : "Within target range"}
            statusType="normal"
            icon={<Activity className="w-4 h-4" />}
          />
          <MetricCard
            label={isRtl ? "الموعد القادم" : "Next Checkup"}
            value={isRtl ? "١٧ يوليو" : "17 Jul"}
            unit={isRtl ? "عيادة العيون" : "Eye Clinic"}
            statusText={isRtl ? "مؤكد" : "Confirmed"}
            statusType="normal"
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>

        {/* Services Directory Grid */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
              {t("allServices")}
            </h3>
            <Link
              href="/services"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isRtl ? "عرض الكل" : "View all"}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={isRtl ? service.name_ar : service.name_en}
                gradient={service.gradient}
                icon={getServiceIcon(service.iconName)}
                watermarkIcon={getServiceIcon(service.iconName)}
                onClick={() => router.push(`/services/${service.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Persistent Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
