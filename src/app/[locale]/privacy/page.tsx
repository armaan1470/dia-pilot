"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { Switch } from "@/components/ui/switch";
import { Trash2, ArrowRight } from "lucide-react";
import { AppleEmoji } from "@/components/ui/apple-emoji";

export default function PrivacyScreen() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [privacySettings, setPrivacySettings] = React.useState({
    analytics: true,
    personalisation: true,
    thirdParty: false,
    marketing: false,
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const privacyItems = [
    {
      key: "analytics" as const,
      title_ar: "تحليلات الاستخدام",
      title_en: "Usage Analytics",
      desc_ar: "المساعدة في تحسين أداء التطبيق ببيانات مجهولة المصدر",
      desc_en: "Help improve the app with anonymous data",
    },
    {
      key: "personalisation" as const,
      title_ar: "تخصيص التجربة الصحية",
      title_en: "Personalised Experience",
      desc_ar: "تكييف المحتوى والإرشادات بناءً على ملفك الصحي",
      desc_en: "Tailor content to your health profile",
    },
    {
      key: "thirdParty" as const,
      title_ar: "مشاركة البيانات مع العيادات الشريكة",
      title_en: "Third-Party Data Sharing",
      desc_ar: "مشاركة تقارير السكري مع المراكز المعتمدة فقط",
      desc_en: "Share data with partner clinics",
    },
    {
      key: "marketing" as const,
      title_ar: "التواصل التوعوي",
      title_en: "Marketing Communications",
      desc_ar: "استقبال العروض والمبادرات الصحية التوعوية",
      desc_en: "Receive health promotions & offers",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "الخصوصية والبيانات" : "Privacy & Data"}
        subtitle={
          isRtl
            ? "التحكم في استخدام بياناتك وحمايتها"
            : "Control how your data is used"
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/profile"
        theme="amber"
        watermark={<AppleEmoji name="lock" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-3.5 pt-4">
        {/* Toggle Items */}
        {privacyItems.map((item) => (
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
              checked={privacySettings[item.key]}
              onCheckedChange={() => toggleSetting(item.key)}
              className="data-[state=checked]:bg-brand-teal cursor-pointer"
            />
          </div>
        ))}

        {/* Delete Account Danger Box */}
        <div className="rounded-lg bg-rose-950/20 border border-rose-900/40 p-5 space-y-3 mt-4">
          <div>
            <h4 className="text-sm font-bold text-rose-300">
              {isRtl ? "حذف الحساب والبيانات" : "Delete Account"}
            </h4>
            <p className="text-xs text-rose-200/70 mt-1 leading-relaxed">
              {isRtl
                ? "حذف كافة بياناتك وسجلاتك نهائياً. لا يمكن التراجع عن هذا الإجراء."
                : "Permanently remove all your data. This cannot be undone."}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-900/40 hover:bg-rose-900/60 border border-rose-700/50 text-rose-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>{isRtl ? "طلب حذف الحساب" : "Request deletion"}</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
