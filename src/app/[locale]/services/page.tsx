"use client";

import * as React from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ServiceCard } from "@/components/cards/service-card";
import { SearchInput } from "@/components/inputs/search-input";
import { mockServices } from "@/lib/mocks/services";
import {
  Stethoscope,
  Calendar,
  Eye,
  Footprints,
  Apple,
  Syringe,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function ServicesScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("services");
  const isRtl = locale === "ar";

  const [searchQuery, setSearchQuery] = React.useState("");

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

  const filteredServices = mockServices.filter((service) => {
    const name = isRtl ? service.name_ar : service.name_en;
    const desc = isRtl ? service.description_ar : service.description_en;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))]">
      {/* Top Header */}
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        variant="gradient"
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-3">
        {/* AI Powered Online Banner */}
        <div
          onClick={() => router.push("/chat")}
          className="relative w-full rounded-[24px] bg-gradient-to-r from-[#00A3FF] to-[#0066FF] p-4 shadow-xl shadow-cyan-900/20 overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-between"
        >
          <div className="flex flex-col gap-1 z-10">
            <div className="inline-flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-cyan-100">
                {isRtl ? "مدعوم بالذكاء الاصطناعي • متصل" : "AI Powered • Online"}
              </span>
            </div>
            <h3 className="text-base font-bold text-white leading-tight">
              {isRtl ? "تحدث مع ديا-بايلوت" : "Chat with DiaPilot"}
            </h3>
            <p className="text-xs text-cyan-100/80">
              {isRtl ? "اسأل أي شيء عن صحتك" : "Ask anything about your health"}
            </p>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <Image
              src="/mascots/Robo head.png"
              alt="DiaPilot Assistant"
              width={54}
              height={54}
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Search Bar */}
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          placeholder={isRtl ? "ابحث في الخدمات..." : "Search services..."}
        />

        {/* All Services Grid */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase px-1">
            {isRtl ? "جميع الخدمات" : "ALL SERVICES"}
          </h4>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredServices.map((service) => (
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
