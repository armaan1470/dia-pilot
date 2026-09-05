"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { Switch } from "@/components/ui/switch";
import { AppleEmoji } from "@/components/ui/apple-emoji";

export default function NotificationsScreen() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [settings, setSettings] = React.useState({
    appointments: true,
    medication: true,
    healthTips: false,
    newMessages: true,
    system: true,
    emailDigest: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    {
      key: "appointments" as const,
      title_ar: "تذكيرات المواعيد",
      title_en: "Appointment Reminders",
      desc_ar: "تنبيه قبل ٢٤ ساعة من كل موعد",
      desc_en: "24h before each appointment",
    },
    {
      key: "medication" as const,
      title_ar: "تنبيهات الأدوية والأنسولين",
      title_en: "Medication Alerts",
      desc_ar: "مواعيد الجرعات وقراءات السكر",
      desc_en: "Insulin & medication reminders",
    },
    {
      key: "healthTips" as const,
      title_ar: "نصائح صحية يومية",
      title_en: "Daily Health Tips",
      desc_ar: "إرشادات غذائية وطبية مخصصة",
      desc_en: "Personalised diabetes advice",
    },
    {
      key: "newMessages" as const,
      title_ar: "رسائل المساعد الذكي",
      title_en: "New Messages",
      desc_ar: "عند وصول رد أو متابعة من الفريق الطبي",
      desc_en: "When staff reply to your queries",
    },
    {
      key: "system" as const,
      title_ar: "إشعارات النظام",
      title_en: "System Notifications",
      desc_ar: "تحديثات التطبيق والتنبيهات العامة",
      desc_en: "App updates & maintenance alerts",
    },
    {
      key: "emailDigest" as const,
      title_ar: "التقرير الأسبوعي عبر البريد",
      title_en: "Email Digest",
      desc_ar: "ملخص أسبوعي يصل لبريدك الإلكتروني",
      desc_en: "Weekly summary to your inbox",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "الإشعارات" : "Notifications"}
        subtitle={isRtl ? "إدارة التنبيهات والتذكيرات" : "Manage your alerts"}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        theme="orange"
        watermark={<AppleEmoji name="bell" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-3 pt-4">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="w-full rounded-lg bg-brand-card border border-brand-border p-4 flex items-center justify-between gap-3"
          >
            <div className="flex flex-col min-w-0 pr-2">
              <h4 className="text-sm font-bold text-white leading-tight">
                {isRtl ? item.title_ar : item.title_en}
              </h4>
              <span className="text-xs text-slate-400 mt-1">
                {isRtl ? item.desc_ar : item.desc_en}
              </span>
            </div>

            <Switch
              checked={settings[item.key]}
              onCheckedChange={() => toggleSetting(item.key)}
              className="data-[state=checked]:bg-brand-teal cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
