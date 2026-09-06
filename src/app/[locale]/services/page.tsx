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
import { ArrowRight } from "lucide-react";

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
      case "living":
        return "handshake";
      case "support":
        return "handset";
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
        // watermark={<AppleEmoji name="hospital" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-4">
        {/* AI Powered Online Banner */}
        <div
          onClick={() => router.push("/chat")}
          className="relative w-full rounded-xl bg-linear-to-br from-brand-teal via-brand-blue to-brand-dark-blue shadow-[0_8px_32px_rgba(36,120,188,0.40)] p-5 overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all flex items-end justify-between group"
        >
          {/* Background Mascot Watermark (Large, integrated organically on the right side) */}
          <div className="absolute right-10 rtl:right-auto rtl:left-10 top-1 size-36 pointer-events-none select-none opacity-20 -rotate-6 transition-transform group-hover:scale-105">
            <Image
              src="/mascots/Robo head.png"
              alt="DiaPilot Assistant"
              width={128}
              height={128}
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* Left Content Area */}
          <div className="flex flex-col gap-1.5 z-10 max-w-[210px] sm:max-w-[240px]">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
              <span className="size-1.5 rounded-full bg-[#7BF1A8] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-medium text-white tracking-wider">
                {isRtl ? "مدعوم بالذكاء الاصطناعي • متصل" : "AI Powered · Online"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-1">
              {isRtl ? "تحدث مع ديا-بايلوت" : "Chat with DiaPilot"}
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-cyan-100/60 font-normal">
              {isRtl ? "اسأل أي شيء عن صحتك" : "Ask anything about your health"}
            </p>
          </div>

          {/* Right Action Circular Arrow Button */}
          <div className="size-8 rounded-full bg-white/20 group-hover:bg-white/30 border border-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 group-hover:scale-105 flex-shrink-0 z-10">
            <ArrowRight className="size-4 rtl:rotate-180 text-white" />
          </div>
        </div>

        {/* Search Bar */}
        {/* <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          placeholder={isRtl ? "ابحث في الخدمات..." : "Search services..."}
        /> */}

        {/* All Services Grid with Emojis and Watermarks */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold tracking-[2px] text-slate-400/40 uppercase p-1">
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
