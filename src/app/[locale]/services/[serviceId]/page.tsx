"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { mockServices } from "@/lib/mocks/services";
import { AppleEmoji } from "@/components/ui/apple-emoji";
import { CategoryTopicCard } from "@/components/cards/category-topic-card";
import { AskAIBanner } from "@/components/cards/ask-ai-banner";
import { serviceCategoryData } from "@/lib/data/services-categories";

interface ServiceDetailPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function ServiceDetailScreen({
  params: _paramsPromise,
}: ServiceDetailPageProps) {
  const router = useRouter();
  const routeParams = useParams();
  const serviceId = (routeParams?.serviceId as string) || "clinics";
  const locale = useLocale();
  const isRtl = locale === "ar";

  const service =
    mockServices.find((s) => s.id === serviceId) || mockServices[0];

  const config =
    serviceCategoryData[serviceId] || serviceCategoryData.clinics;
  const topicsList = config.topics;

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Appbar Header matching CategoryScreen Figma */}
      <PageHeader
        title={isRtl ? service.name_ar : service.name_en}
        subtitle={
          isRtl
            ? `${topicsList.length} مواضيع متاحة`
            : `${topicsList.length} topics available`
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/services"
        theme={config.theme}
        watermark={<AppleEmoji name={config.emojiName} size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-3 pt-4">
        {/* Optional Emotional Support Quote Banner (e.g. for Living with Diabetes) */}
        {config.quoteBanner && (
          <div className="w-full rounded-lg bg-white/5 border border-purple-500/20 p-3.5 mb-1 backdrop-blur-sm">
            <p className="text-xs text-purple-300 font-semibold flex items-center gap-1.5 leading-snug">
              <span>💜</span>
              <span>
                &ldquo;
                {isRtl
                  ? config.quoteBanner.quote_ar
                  : config.quoteBanner.quote_en}
                &rdquo;
              </span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1 pl-4 rtl:pl-0 rtl:pr-4">
              {isRtl
                ? config.quoteBanner.sub_ar
                : config.quoteBanner.sub_en}
            </p>
          </div>
        )}

        {/* Topics List Items */}
        <div className="space-y-2.5">
          {topicsList.map((topic) => (
            <CategoryTopicCard
              key={topic.id}
              id={topic.id}
              title={isRtl ? topic.title_ar : topic.title_en}
              description={isRtl ? topic.desc_ar : topic.desc_en}
              numberColor={config.numberColor}
              arrowPillClass={config.arrowPillClass}
              arrowIconClass={config.arrowIconClass}
              onClick={() => router.push("/chat")}
            />
          ))}
        </div>

        {/* Bottom Ask AI Assistant Card */}
        <div className="mt-4">
          <AskAIBanner
            title={isRtl ? "اسأل المساعد الذكي" : "Ask AI Assistant"}
            subtitle={
              isRtl
                ? "احصل على إجابات فورية مخصصة"
                : "Get personalised answers instantly"
            }
            gradientClass={config.aiGradient}
            onClick={() => router.push("/chat")}
          />
        </div>
      </div>
    </div>
  );
}
