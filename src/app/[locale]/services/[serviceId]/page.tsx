"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { AppleEmoji } from "@/components/ui/apple-emoji";
import { CategoryTopicCard } from "@/components/cards/category-topic-card";
import { AskAIBanner } from "@/components/cards/ask-ai-banner";
import { serviceCategoryData } from "@/lib/data/services-categories";
import type { ServiceRecord } from "@/lib/api/services";

export default function ServiceDetailScreen() {
  const routeParams = useParams<{ serviceId: string }>();
  const serviceId = routeParams?.serviceId ?? "";

  return <ServiceDetailContent key={serviceId} serviceId={serviceId} />;
}

function ServiceDetailContent({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("services");
  const isRtl = locale === "ar";

  const [service, setService] = React.useState<ServiceRecord | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    fetch("/api/services/" + encodeURIComponent(serviceId))
      .then(async (response) => {
        if (response.status === 404) {
          if (active) setNotFound(true);
          return null;
        }
        if (!response.ok) throw new Error("Service request failed");
        return (await response.json()) as ServiceRecord;
      })
      .then((result) => {
        if (active && result) setService(result);
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
  }, [serviceId]);

  if (loading || !service) {
    return (
      <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar pb-10">
        <PageHeader
          title={loading ? t("loadingServices") : notFound ? t("serviceNotFound") : t("title")}
          brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          showBack
          fallbackHref="/services"
          theme="blue"
        />
        <p
          role={hasError ? "alert" : undefined}
          className="px-5 py-6 text-sm text-slate-400"
        >
          {hasError
            ? t("servicesError")
            : notFound
              ? t("serviceNotFound")
              : t("loadingServices")}
        </p>
      </div>
    );
  }

  const config = serviceCategoryData[service.slug] ?? serviceCategoryData["diabetes-care"];
  const topics = (isRtl ? service.topicsAr : service.topicsEn).map(
    (title, index) => ({
      id: String(index + 1).padStart(2, "0"),
      title,
      description: "",
    }),
  );
  const description = isRtl ? service.descriptionAr : service.descriptionEn;
  const targetAudience = isRtl
    ? service.targetAudienceAr
    : service.targetAudienceEn;
  const location = isRtl ? service.locationAr : service.locationEn;
  const workingHours = isRtl ? service.workingHoursAr : service.workingHoursEn;
  const contact = isRtl ? service.contactAr : service.contactEn;
  const bookingInstructions = isRtl
    ? service.bookingInstructionsAr
    : service.bookingInstructionsEn;
  const hasOperationalInfo = Boolean(
    location || workingHours || contact || service.bookingUrl || bookingInstructions,
  );
  const bookingUrl =
    service.bookingUrl && /^https?:\/\//i.test(service.bookingUrl)
      ? service.bookingUrl
      : undefined;

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      <PageHeader
        title={isRtl ? service.nameAr : service.nameEn}
        subtitle={
          isRtl
            ? String(topics.length) + " موضوعات"
            : String(topics.length) + " topics"
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack
        fallbackHref="/services"
        theme={config.theme}
        watermark={<AppleEmoji name={config.emojiName} size={80} />}
      />

      <div className="px-5 space-y-4 pt-4">
        {service.approvalStatus !== "approved" && (
          <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-3">
            <span className="text-xs font-bold text-amber-200">
              {t("draftStatus")}
            </span>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/80">
              {t("draftNotice")}
            </p>
          </div>
        )}

        <section className="rounded-lg bg-brand-card border border-brand-border p-4 space-y-2">
          <h2 className="text-sm font-bold text-white">{t("aboutService")}</h2>
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        </section>

        {targetAudience && (
          <section className="rounded-lg bg-brand-card border border-brand-border p-4 space-y-2">
            <h2 className="text-sm font-bold text-white">{t("targetAudience")}</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {targetAudience}
            </p>
          </section>
        )}

        {topics.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="px-1 text-sm font-bold text-white">
              {t("topicsCovered")}
            </h2>
            {topics.map((topic) => (
              <CategoryTopicCard
                key={topic.id}
                id={topic.id}
                title={topic.title}
                description={topic.description}
                numberColor={config.numberColor}
                arrowPillClass={config.arrowPillClass}
                arrowIconClass={config.arrowIconClass}
                onClick={() => router.push("/chat")}
              />
            ))}
          </section>
        )}

        {hasOperationalInfo ? (
          <section className="rounded-lg bg-brand-card border border-brand-border p-4 space-y-3">
            {location && <ServiceFact label={t("location")} value={location} />}
            {workingHours && (
              <ServiceFact label={t("workingHours")} value={workingHours} />
            )}
            {contact && <ServiceFact label={t("contact")} value={contact} />}
            {bookingInstructions && (
              <ServiceFact label={t("booking")} value={bookingInstructions} />
            )}
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-sm font-semibold text-brand-teal underline underline-offset-4"
              >
                {t("booking")}
              </a>
            )}
          </section>
        ) : (
          service.approvalStatus !== "approved" && (
            <p className="px-1 text-xs text-slate-400">{t("detailsPending")}</p>
          )
        )}

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
  );
}

function ServiceFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-slate-400">{label}</h3>
      <p className="text-sm leading-relaxed text-slate-200">{value}</p>
    </div>
  );
}
