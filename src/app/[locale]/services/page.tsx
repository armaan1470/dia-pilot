"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ServiceCard } from "@/components/cards/service-card";
import { SearchInput } from "@/components/inputs/search-input";
import { AppleEmoji, type AppleEmojiName } from "@/components/ui/apple-emoji";
import { ArrowRight } from "lucide-react";
import type { ServiceRecord } from "@/lib/api/services";

const servicePresentation: Record<
  string,
  { emoji: AppleEmojiName; gradient: React.ComponentProps<typeof ServiceCard>["gradient"] }
> = {
  "diabetes-care": { emoji: "stethoscope", gradient: "cyan" },
  endocrinology: { emoji: "stethoscope", gradient: "blue" },
  "optometry-eye-health": { emoji: "eye", gradient: "cyan" },
  "diabetic-foot-care": { emoji: "foot", gradient: "orange" },
  nutrition: { emoji: "apple", gradient: "emerald" },
  "oral-health-dentistry": { emoji: "tooth", gradient: "rose" },
  "health-education": { emoji: "books", gradient: "amber" },
  "living-coping": { emoji: "handshake", gradient: "violet" },
  "appointments-services": { emoji: "calendar", gradient: "purple" },
  "contact-support": { emoji: "handset", gradient: "slate" },
};

export default function ServicesScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("services");
  const isRtl = locale === "ar";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [services, setServices] = React.useState<ServiceRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    fetch("/api/services")
      .then(async (response) => {
        if (!response.ok) throw new Error("Service request failed");
        return (await response.json()) as ServiceRecord[];
      })
      .then((result) => {
        if (active) setServices(result);
      })
      .catch(() => {
        if (active) setHasError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredServices = services.filter((service) => {
    const name = isRtl ? service.nameAr : service.nameEn;
    const description = isRtl ? service.descriptionAr : service.descriptionEn;
    const query = searchQuery.trim().toLocaleLowerCase(locale);
    return (
      name.toLocaleLowerCase(locale).includes(query) ||
      description.toLocaleLowerCase(locale).includes(query)
    );
  });

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))]">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        theme="blue"
      />

      <div className="px-5 space-y-4 pt-4">
        <div
          onClick={() => router.push("/chat")}
          className="relative w-full rounded-xl bg-linear-to-br from-brand-teal via-brand-blue to-brand-dark-blue shadow-[0_8px_32px_rgba(36,120,188,0.40)] p-5 overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all flex items-end justify-between group"
        >
          <div className="absolute right-10 rtl:right-auto rtl:left-10 top-1 size-36 pointer-events-none select-none opacity-20 -rotate-6 transition-transform group-hover:scale-105">
            <Image
              src="/mascots/Robo head.png"
              alt="DiaPilot Assistant"
              width={128}
              height={128}
              className="object-contain drop-shadow-xl"
            />
          </div>

          <div className="flex flex-col gap-1.5 z-10 max-w-[210px] sm:max-w-[240px]">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
              <span className="size-1.5 rounded-full bg-[#7BF1A8] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-medium text-white tracking-wider">
                {isRtl ? "مدعوم بالذكاء الاصطناعي • متصل" : "AI Powered · Online"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-1">
              {isRtl ? "تحدث مع ديا-بايلوت" : "Chat with DiaPilot"}
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100/60 font-normal">
              {isRtl ? "اسأل أي شيء عن صحتك" : "Ask anything about your health"}
            </p>
          </div>

          <div className="size-8 rounded-full bg-white/20 group-hover:bg-white/30 border border-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 group-hover:scale-105 flex-shrink-0 z-10">
            <ArrowRight className="size-4 rtl:rotate-180 text-white" />
          </div>
        </div>

        <SearchInput
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onClear={() => setSearchQuery("")}
          placeholder={t("searchPlaceholder")}
        />

        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold tracking-[2px] text-slate-400/40 uppercase p-1">
            {t("allServices")}
          </h4>

          {loading && <p className="px-1 text-sm text-slate-400">{t("loadingServices")}</p>}
          {hasError && <p role="alert" className="px-1 text-sm text-red-300">{t("servicesError")}</p>}
          {!loading && !hasError && filteredServices.length === 0 && (
            <p className="px-1 text-sm text-slate-400">{t("noServices")}</p>
          )}

          <div className="grid grid-cols-2 gap-3.5">
            {filteredServices.map((service) => {
              const presentation = servicePresentation[service.slug] ?? {
                emoji: "stethoscope" as const,
                gradient: "cyan" as const,
              };
              const name = isRtl ? service.nameAr : service.nameEn;
              const description = isRtl
                ? service.descriptionAr
                : service.descriptionEn;

              return (
                <div key={service.slug} className="relative">
                  <ServiceCard
                    title={name}
                    subtitle={description}
                    gradient={presentation.gradient}
                    icon={<AppleEmoji name={presentation.emoji} size={24} />}
                    watermarkIcon={
                      <AppleEmoji
                        name={presentation.emoji}
                        size={76}
                        className="opacity-20"
                      />
                    }
                    onClick={() => router.push("/services/" + service.slug)}
                  />
                  {service.approvalStatus !== "approved" && (
                    <span className="absolute end-2 top-2 rounded-full border border-white/20 bg-black/50 px-2 py-1 text-[9px] font-semibold text-white/80">
                      {t("draftStatus")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
