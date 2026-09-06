"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { AppleEmoji, type AppleEmojiName } from "@/components/ui/apple-emoji";
import { ArrowRight } from "lucide-react";

interface DocumentItem {
  id: string;
  icon: AppleEmojiName;
  title_en: string;
  title_ar: string;
  size_en: string;
  size_ar: string;
}

interface DocumentSection {
  id: string;
  sectionTitle_en: string;
  sectionTitle_ar: string;
  items: DocumentItem[];
}

export default function MyDocumentsScreen() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const documentSections: DocumentSection[] = [
    {
      id: "forms",
      sectionTitle_en: "FORMS",
      sectionTitle_ar: "النماذج والاستمارات",
      items: [
        {
          id: "doc-1",
          icon: "memo",
          title_en: "Patient Registration Form",
          title_ar: "نموذج تسجيل المريض",
          size_en: "PDF · 240 KB",
          size_ar: "PDF · ٢٤٠ ك.ب",
        },
        {
          id: "doc-2",
          icon: "memo",
          title_en: "Consent for Treatment",
          title_ar: "إقرار الموافقة على العلاج",
          size_en: "PDF · 185 KB",
          size_ar: "PDF · ١٨٥ ك.ب",
        },
      ],
    },
    {
      id: "nutrition",
      sectionTitle_en: "NUTRITION PLANS",
      sectionTitle_ar: "الخطط الغذائية",
      items: [
        {
          id: "doc-3",
          icon: "apple",
          title_en: "Personalised Meal Plan – Jul 2025",
          title_ar: "خطة الوجبات المخصصة – يوليو 2025",
          size_en: "PDF · 320 KB",
          size_ar: "PDF · ٣٢٠ ك.ب",
        },
        {
          id: "doc-4",
          icon: "chart",
          title_en: "Carbohydrate Counting Guide",
          title_ar: "دليل حساب الكربوهيدرات",
          size_en: "PDF · 410 KB",
          size_ar: "PDF · ٤١٠ ك.ب",
        },
      ],
    },
    {
      id: "educational",
      sectionTitle_en: "EDUCATIONAL MATERIALS",
      sectionTitle_ar: "المواد التثقيفية",
      items: [
        {
          id: "doc-5",
          icon: "syringe",
          title_en: "Insulin Administration Guide",
          title_ar: "دليل استخدام وحقن الأنسولين",
          size_en: "PDF · 560 KB",
          size_ar: "PDF · ٥٦٠ ك.ب",
        },
        {
          id: "doc-6",
          icon: "satellite",
          title_en: "CGM Usage Manual",
          title_ar: "دليل استخدام حساس الجلوكوز (CGM)",
          size_en: "PDF · 890 KB",
          size_ar: "PDF · ٨٩٠ ك.ب",
        },
        {
          id: "doc-7",
          icon: "moon",
          title_en: "Ramadan Fasting with Diabetes",
          title_ar: "إرشادات صيام رمضان لمرضى السكري",
          size_en: "PDF · 215 KB",
          size_ar: "PDF · ٢١٥ ك.ب",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header matching Figma Cyan theme */}
      <PageHeader
        title={isRtl ? "المستندات والكتيبات" : "My Documents"}
        subtitle={
          isRtl
            ? "النماذج والخطط والمواد التثقيفية"
            : "Forms, plans & educational materials"
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/profile"
        theme="emerald"
        watermark={<AppleEmoji name="documents" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-6 pt-4">
        {documentSections.map((section) => (
          <div key={section.id} className="space-y-2.5">
            <h3 className="text-xs font-bold tracking-[2px] text-slate-400 uppercase px-1">
              {isRtl ? section.sectionTitle_ar : section.sectionTitle_en}
            </h3>

            <div className="space-y-2.5">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="w-full rounded-lg bg-brand-card hover:bg-brand-card-light border border-brand-border hover:border-brand-teal/40 p-3.5 flex items-center justify-between gap-3 shadow-sm transition-all active:scale-[0.99] cursor-pointer group"
                >
                  {/* Left: Emoji Container & Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <AppleEmoji name={item.icon} size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-sm font-bold text-white leading-tight truncate">
                        {isRtl ? item.title_ar : item.title_en}
                      </h4>
                      <span className="text-xs text-slate-400 mt-0.5 font-normal">
                        {isRtl ? item.size_ar : item.size_en}
                      </span>
                    </div>
                  </div>

                  {/* Right: Circular Arrow Pill */}
                  <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 rtl:rotate-180 transition-colors group-hover:bg-emerald-500/25">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
