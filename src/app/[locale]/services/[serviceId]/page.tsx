"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { PageHeader, HeaderTheme } from "@/components/navigation/page-header";
import { mockServices } from "@/lib/mocks/services";
import { ArrowRight, Phone, Clock } from "lucide-react";
import { AppleEmoji, type AppleEmojiName } from "@/components/ui/apple-emoji";

interface ServiceDetailPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function ServiceDetailScreen({
  params,
}: ServiceDetailPageProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [serviceId, setServiceId] = React.useState<string>("clinics");

  React.useEffect(() => {
    params.then((p) => setServiceId(p.serviceId));
  }, [params]);

  const service =
    mockServices.find((s) => s.id === serviceId) || mockServices[0];

  const getCategoryConfig = (
    id: string
  ): { theme: HeaderTheme; emojiName: AppleEmojiName } => {
    switch (id) {
      case "clinics":
        return { theme: "cyan", emojiName: "stethoscope" };
      case "appointments":
        return { theme: "purple", emojiName: "calendar" };
      case "eye-care":
        return { theme: "teal", emojiName: "eye" };
      case "foot-care":
        return { theme: "orange", emojiName: "foot" };
      case "nutrition":
        return { theme: "emerald", emojiName: "apple" };
      case "diabetes-management":
        return { theme: "pink", emojiName: "syringe" };
      case "oral-health":
        return { theme: "rose", emojiName: "tooth" };
      case "education":
        return { theme: "amber", emojiName: "books" };
      default:
        return { theme: "blue", emojiName: "stethoscope" };
    }
  };

  const { theme, emojiName } = getCategoryConfig(service.id);

  const topicsList = [
    {
      id: "01",
      title_ar: "استشارات السكري والمتابعة",
      title_en: "Diabetes Clinic",
      desc_ar: "إدارة السكري من النوع 1 والنوع 2",
      desc_en: "Type 1 & Type 2 management",
    },
    {
      id: "02",
      title_ar: "عيادة الغدد الصماء",
      title_en: "Endocrinology Clinic",
      desc_ar: "أخصائيو الهرمونات والغدة الدرقية",
      desc_en: "Hormone health specialists",
    },
    {
      id: "03",
      title_ar: "عيادة القدم السكري",
      title_en: "Diabetic Foot Clinic",
      desc_ar: "العناية بالجروح وفحص الأعصاب",
      desc_en: "Wound care & neuropathy prevention",
    },
    {
      id: "04",
      title_ar: "عيادة العيون وفحص الشبكية",
      title_en: "Ophthalmology & Retinopathy",
      desc_ar: "فحص قاع العين وصحة الإبصار",
      desc_en: "Eye health & retinal screening",
    },
    {
      id: "05",
      title_ar: "فحص البصريات والنظارات",
      title_en: "Optometry Clinic",
      desc_ar: "قياس حدة النظر والفحص الدوري",
      desc_en: "Vision testing & eyeglasses",
    },
    {
      id: "06",
      title_ar: "التغذية العلاجية",
      title_en: "Clinical Nutrition",
      desc_ar: "خطط غذائية مخصصة وحساب الكربوهيدرات",
      desc_en: "Personalised dietary counseling",
    },
    {
      id: "07",
      title_ar: "التثقيف والتوعية الصحية",
      title_en: "Health Education",
      desc_ar: "دورات، مقاطع توعوية وكتيبات إرشادية",
      desc_en: "Courses, videos & brochures",
    },
    {
      id: "08",
      title_ar: "صحة الفم والأسنان",
      title_en: "Oral & Dental Health",
      desc_ar: "علاج اللثة والفحص الوقائي لمرضى السكري",
      desc_en: "Gum disease & dental care",
    },
  ];

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
        theme={theme}
        watermark={<AppleEmoji name={emojiName} size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-3.5 pt-4">
        {/* Service Overview Card */}
        <div className="rounded-lg bg-brand-card border border-brand-border p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>{isRtl ? service.description_ar : service.description_en}</p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-brand-border/40 text-xs text-slate-400">
            {service.contact && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-teal" />
                <span className="dir-ltr">{service.contact}</span>
              </div>
            )}
            {service.workingHours && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-teal" />
                <span>{service.workingHours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Topics List Items */}
        <div className="space-y-2.5">
          {topicsList.map((topic) => (
            <div
              key={topic.id}
              onClick={() => router.push("/chat")}
              className="w-full rounded-lg bg-brand-card hover:bg-brand-card-light border border-brand-border hover:border-brand-teal/40 p-4 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-brand-card-light border border-brand-border text-brand-teal text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {topic.id}
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm font-bold text-white leading-tight truncate">
                    {isRtl ? topic.title_ar : topic.title_en}
                  </h4>
                  <span className="text-xs text-slate-400 mt-0.5 truncate">
                    {isRtl ? topic.desc_ar : topic.desc_en}
                  </span>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brand-teal flex-shrink-0 group-hover:bg-brand-teal/20 rtl:rotate-180 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Floating Ask AI Assistant Card */}
        <div
          onClick={() => router.push("/chat")}
          className="mt-6 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 p-4 flex items-center justify-between shadow-xl shadow-cyan-900/30 cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 p-1 flex items-center justify-center backdrop-blur-md">
              <Image
                src="/mascots/Robo head.png"
                alt="AI Robot"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isRtl ? "اسأل المساعد الذكي" : "Ask AI Assistant"}
              </h4>
              <p className="text-[11px] text-cyan-100">
                {isRtl
                  ? "احصل على إجابات فورية مخصصة"
                  : "Get personalised answers instantly"}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md rtl:rotate-180">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
