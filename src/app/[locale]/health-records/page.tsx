"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { AppleEmoji } from "@/components/ui/apple-emoji";

export default function HealthRecordsScreen() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const hba1cHistory = [
    {
      id: "hba1c-1",
      date_en: "Jul 2025",
      date_ar: "يوليو 2025",
      value: "8.2%",
      change: "▼ 0.5%",
      isPositive: true,
    },
    {
      id: "hba1c-2",
      date_en: "Apr 2025",
      date_ar: "أبريل 2025",
      value: "8.7%",
      change: "▼ 0.4%",
      isPositive: true,
    },
    {
      id: "hba1c-3",
      date_en: "Jan 2025",
      date_ar: "يناير 2025",
      value: "9.1%",
      change: "▲ 0.6%",
      isPositive: false,
    },
    {
      id: "hba1c-4",
      date_en: "Oct 2024",
      date_ar: "أكتوبر 2024",
      value: "8.5%",
      change: "▼ 0.8%",
      isPositive: true,
    },
  ];

  const glucoseReadings = [
    {
      id: "fasting",
      label_en: "Fasting (morning)",
      label_ar: "صائم (الصباح)",
      target_en: "Target: 80–130",
      target_ar: "الهدف: 80–130",
      value_en: "126 mg/dL",
      value_ar: "126 ملغ/ديسيلتر",
    },
    {
      id: "post-meal",
      label_en: "Post-meal (2h)",
      label_ar: "بعد الوجبة (ساعتان)",
      target_en: "Target: <180",
      target_ar: "الهدف: <180",
      value_en: "178 mg/dL",
      value_ar: "178 ملغ/ديسيلتر",
    },
    {
      id: "bedtime",
      label_en: "Bedtime",
      label_ar: "قبل النوم",
      target_en: "Target: 100–140",
      target_ar: "الهدف: 100–140",
      value_en: "142 mg/dL",
      value_ar: "142 ملغ/ديسيلتر",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header matching My Appointments purple theme */}
      <PageHeader
        title={isRtl ? "السجلات الصحية" : "Health Records"}
        subtitle={
          isRtl
            ? "نتائج المختبر وبيانات المراقبة"
            : "Lab results & monitoring data"
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/profile"
        theme="purple"
        watermark={<AppleEmoji name="chart" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-5 pt-4">
        {/* Latest HbA1c Highlight Card matching Figma & Header Gradient */}
        <div className="rounded-lg bg-gradient-to-b from-[#7B68EE] via-[#6C5CE7] to-[#4834D4] p-4 sm:p-5 shadow-xl text-white">
          <span className="text-[11px] font-bold tracking-wider text-purple-200/90 uppercase block">
            {isRtl ? "أحدث فحص مخزون السكر" : "LATEST HBA1C"}
          </span>

          <div className="flex items-center gap-4 mt-2">
            <h2 className="text-4xl font-extrabold tracking-tight">
              8.2<span className="text-2xl font-bold">%</span>
            </h2>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#4ADE80] flex items-center gap-1 leading-tight">
                <span>▼</span>
                <span>{isRtl ? "0.5% تحسن" : "0.5% improved"}</span>
              </span>
              <span className="text-[11px] text-purple-200/80 mt-1 font-normal leading-tight">
                {isRtl ? "مقارنة بأبريل 2025 (8.7%)" : "vs Apr 2025 (8.7%)"}
              </span>
            </div>
          </div>

          <p className="text-xs text-purple-200/80 font-normal mt-3.5 pt-3 border-t border-white/10">
            {isRtl
              ? "الهدف: أقل من 7.0% · آخر فحص: يوليو 2025"
              : "Target: below 7.0% · Last checked: Jul 2025"}
          </p>
        </div>

        {/* HbA1c History Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[2px] text-slate-400 uppercase px-1">
            {isRtl ? "سجل مخزون السكر (HBA1C)" : "HBA1C HISTORY"}
          </h3>

          <div className="space-y-2.5">
            {hba1cHistory.map((item) => (
              <div
                key={item.id}
                className="w-full rounded-lg bg-brand-card hover:bg-brand-card-light border border-brand-border p-3.5 flex items-center justify-between shadow-sm transition-all"
              >
                {/* Left: Clipboard Icon & Date */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <AppleEmoji name="clipboard" size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {isRtl ? item.date_ar : item.date_en}
                    </h4>
                    <span className="text-xs text-slate-400 mt-0.5 font-normal truncate">
                      {isRtl
                        ? "نتيجة مخزون السكر (HbA1c)"
                        : "HbA1c result"}
                    </span>
                  </div>
                </div>

                {/* Right: Value & Change Badge */}
                <div className="flex flex-col items-end rtl:items-start text-right rtl:text-left flex-shrink-0">
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.value}
                  </span>
                  <span
                    className={`text-xs font-semibold mt-0.5 ${
                      item.isPositive ? "text-[#4ADE80]" : "text-[#F87171]"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Glucose Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[2px] text-slate-400 uppercase px-1">
            {isRtl ? "سكر الدم" : "BLOOD GLUCOSE"}
          </h3>

          <div className="w-full rounded-lg bg-brand-card border border-brand-border p-4 divide-y divide-brand-border/60 shadow-sm">
            {glucoseReadings.map((reading, index) => (
              <div
                key={reading.id}
                className={`flex items-center justify-between ${
                  index === 0 ? "pb-3" : index === glucoseReadings.length - 1 ? "pt-3" : "py-3"
                }`}
              >
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-white">
                    {isRtl ? reading.label_ar : reading.label_en}
                  </h4>
                  <span className="text-xs text-slate-400 mt-0.5 font-normal">
                    {isRtl ? reading.target_ar : reading.target_en}
                  </span>
                </div>

                <span className="text-sm font-bold text-white">
                  {isRtl ? reading.value_ar : reading.value_en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
