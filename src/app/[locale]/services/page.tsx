"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ServiceCard } from "@/components/cards/service-card";
import { SearchInput } from "@/components/inputs/search-input";
import { mockServices } from "@/lib/mocks/services";
import { AppleEmoji, type AppleEmojiName } from "@/components/ui/apple-emoji";

export default function ServicesScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("services");
  const isRtl = locale === "ar";

  const [searchQuery, setSearchQuery] = React.useState("");

  const getServiceEmoji = (id: string): AppleEmojiName => {
    switch (id) {
      case "clinics":
        return "stethoscope";
      case "appointments":
        return "calendar";
      case "eye-care":
        return "eye";
      case "foot-care":
        return "foot";
      case "nutrition":
        return "apple";
      case "diabetes-management":
        return "syringe";
      case "oral-health":
        return "tooth";
      case "education":
        return "books";
      default:
        return "stethoscope";
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
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))]">
      {/* Top Header - Appbar with crisp gradient and border */}
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        theme="blue"
        watermark={<AppleEmoji name="hospital" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-4">
        {/* AI Powered Online Banner */}
        <div
          onClick={() => router.push("/chat")}
          className="relative w-full rounded-lg bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue p-4 shadow-xl shadow-brand-blue/20 overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-between"
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

        {/* All Services Grid with Emojis and Watermarks */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase px-1">
            {isRtl ? "جميع الخدمات" : "ALL SERVICES"}
          </h4>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredServices.map((service) => {
              const emojiName = getServiceEmoji(service.id);
              return (
                <ServiceCard
                  key={service.id}
                  title={isRtl ? service.name_ar : service.name_en}
                  gradient={service.gradient}
                  icon={<AppleEmoji name={emojiName} size={24} />}
                  watermarkIcon={
                    <AppleEmoji
                      name={emojiName}
                      size={76}
                      className="opacity-20"
                    />
                  }
                  onClick={() => router.push(`/services/${service.id}`)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Persistent Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
