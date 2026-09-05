"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { Check, Info, ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LanguageScreen() {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("language");
  const isRtl = currentLocale === "ar";

  const [selectedLocale, setSelectedLocale] = React.useState<"ar" | "en">(
    currentLocale as "ar" | "en"
  );
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);

  const handleLanguageSelect = (locale: "ar" | "en") => {
    if (locale !== currentLocale) {
      setSelectedLocale(locale);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSwitch = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowConfirmModal(false);
      setShowSuccessToast(true);

      setTimeout(() => {
        router.replace("/language", { locale: selectedLocale });
      }, 700);
    }, 600);
  };

  const handleContinue = () => {
    router.push("/onboarding");
  };

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none justify-between pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header with Brand & Globe Accent */}
      <div className="relative flex-shrink-0">
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          showBack={true}
          variant="gradient"
        />
        {/* Globe Background Watermark */}
        <div className="absolute top-8 right-4 rtl:right-auto rtl:left-4 opacity-15 pointer-events-none text-white">
          <Globe className="w-28 h-28" />
        </div>
      </div>

      {/* Language Options List */}
      <div className="flex-1 px-6 pt-5 pb-6 flex flex-col justify-between z-10">
        <div className="flex flex-col gap-3.5">
          {/* English Card */}
          <button
            type="button"
            onClick={() => handleLanguageSelect("en")}
            className={cn(
              "w-full h-18 sm:h-20 rounded-[22px] px-5 flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.98] border text-left rtl:text-right",
              currentLocale === "en"
                ? "bg-[#132238] border-cyan-400 shadow-md shadow-cyan-500/15 ring-1 ring-cyan-400/30"
                : "bg-[#101C2E] border-[#1C3352] hover:border-cyan-500/40 opacity-85"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-2xl shadow-inner border border-white/10">
                🇬🇧
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">
                  English
                </span>
                <span className="text-xs text-slate-400 mt-0.5">English</span>
              </div>
            </div>

            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                currentLocale === "en"
                  ? "bg-cyan-400 text-[#070F1E] shadow-sm shadow-cyan-400/50"
                  : "bg-slate-800/80 border border-slate-700"
              )}
            >
              {currentLocale === "en" && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </button>

          {/* Arabic Card */}
          <button
            type="button"
            onClick={() => handleLanguageSelect("ar")}
            className={cn(
              "w-full h-18 sm:h-20 rounded-[22px] px-5 flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.98] border text-left rtl:text-right",
              currentLocale === "ar"
                ? "bg-[#132238] border-cyan-400 shadow-md shadow-cyan-500/15 ring-1 ring-cyan-400/30"
                : "bg-[#101C2E] border-[#1C3352] hover:border-cyan-500/40 opacity-85"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-2xl shadow-inner border border-white/10">
                🇸🇦
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">
                  {isRtl ? "العربية" : "Arabic"}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">العربية</span>
              </div>
            </div>

            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                currentLocale === "ar"
                  ? "bg-cyan-400 text-[#070F1E] shadow-sm shadow-cyan-400/50"
                  : "bg-slate-800/80 border border-slate-700"
              )}
            >
              {currentLocale === "ar" && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </button>

          {/* Info Notice Box */}
          <div className="mt-1 rounded-2xl bg-[#132238]/60 border border-[#1E3557] p-3.5 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Info className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-cyan-200/90 leading-relaxed">
              {t("notice")}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-6">
          <PrimaryButton onClick={handleContinue} fullWidth>
            {t("continue")}
          </PrimaryButton>
        </div>
      </div>

      {/* Confirmation Bottom Sheet Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full bg-[#0D1829] border-t border-cyan-800/40 rounded-t-[32px] p-6 pb-[max(2rem,env(safe-area-inset-bottom,0px))] shadow-2xl flex flex-col items-center gap-5 animate-in slide-in-from-bottom duration-300">
            {/* Grab Handle */}
            <div className="w-12 h-1 rounded-full bg-slate-700" />

            {/* Language Switch Flag Indicators */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-[#152438] border border-white/10 flex items-center justify-center text-3xl shadow-inner">
                {currentLocale === "en" ? "🇬🇧" : "🇸🇦"}
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center rtl:rotate-180">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-3xl shadow-md">
                {selectedLocale === "en" ? "🇬🇧" : "🇸🇦"}
              </div>
            </div>

            <div className="text-center space-y-1 max-w-xs">
              <h3 className="text-lg font-extrabold text-white">
                {t("modalTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t("modalDesc", {
                  lang: selectedLocale === "ar" ? "العربية" : "English",
                })}
              </p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <PrimaryButton
                onClick={handleConfirmSwitch}
                isLoading={isUpdating}
                fullWidth
              >
                {t("confirmRestart")}
              </PrimaryButton>
              <SecondaryButton
                onClick={() => setShowConfirmModal(false)}
                disabled={isUpdating}
                fullWidth
              >
                {t("cancel")}
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0D1829] border border-cyan-500/40 rounded-3xl p-6 flex flex-col items-center gap-3 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-cyan-400 text-[#070F1E] flex items-center justify-center shadow-lg shadow-cyan-400/40 animate-bounce">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h4 className="text-base font-bold text-white">
              {t("languageUpdated")}
            </h4>
            <p className="text-xs text-slate-400">
              {t("languageSetTo", {
                lang: selectedLocale === "ar" ? "العربية" : "English",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
