"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Check, Info, ArrowRight, Globe } from "lucide-react";
import { AppleEmoji } from "@/components/ui/apple-emoji";
import { cn } from "@/lib/utils";

export default function LanguageScreen() {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("language");
  const isRtl = currentLocale === "ar";

  const [selectedLocale, setSelectedLocale] = React.useState<"ar" | "en">(
    currentLocale as "ar" | "en"
  );
  const [showConfirmDrawer, setShowConfirmDrawer] = React.useState(false);
  const [showSuccessDrawer, setShowSuccessDrawer] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleLanguageSelect = (locale: "ar" | "en") => {
    if (locale !== currentLocale) {
      setSelectedLocale(locale);
      setShowConfirmDrawer(true);
    }
  };

  const handleConfirmSwitch = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowConfirmDrawer(false);
      setShowSuccessDrawer(true);

      setTimeout(() => {
        router.replace("/language", { locale: selectedLocale });
      }, 1000);
    }, 500);
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
          theme="blue"
          watermark={<AppleEmoji name="globe" size={84} />}
        />
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
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shadow-inner border border-white/10">
                <AppleEmoji name="flag_gb" size={28} />
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
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shadow-inner border border-white/10">
                <AppleEmoji name="flag_sa" size={28} />
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

      {/* Language Switch Confirmation Bottom Sheet (Shadcn Drawer) */}
      <Drawer
        open={showConfirmDrawer}
        onOpenChange={setShowConfirmDrawer}
        showSwipeHandle={true}
      >
        <DrawerContent className="bg-[#081629] border-t border-[#42BEDD]/60 text-white rounded-t-[28px] p-6 pb-[max(2rem,env(safe-area-inset-bottom,0px))] shadow-2xl flex flex-col items-center">
          {/* Top Handle */}
          <div className="w-10 h-1 rounded-full bg-slate-600 mb-2" />

          {/* Language Switch Flag Indicators */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-2 shadow-inner">
              <AppleEmoji
                name={currentLocale === "en" ? "flag_gb" : "flag_sa"}
                size={32}
              />
              <span className="text-[10px] text-slate-400 font-semibold mt-1">
                {currentLocale === "en" ? "EN" : "AR"}
              </span>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2478BC] to-[#42BEDD] text-white flex items-center justify-center shadow-md rtl:rotate-180">
              <ArrowRight className="w-4 h-4" />
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-[#0F294D] border border-cyan-400/50 flex flex-col items-center justify-center p-2 text-cyan-300 shadow-md shadow-cyan-500/20">
              <AppleEmoji
                name={selectedLocale === "en" ? "flag_gb" : "flag_sa"}
                size={32}
              />
              <span className="text-[10px] text-cyan-300 font-bold mt-1">
                {selectedLocale === "en" ? "EN" : "AR"}
              </span>
            </div>
          </div>

          <DrawerHeader className="p-0 text-center items-center mt-2">
            <DrawerTitle className="text-xl font-black text-white text-center tracking-tight">
              {t("modalTitle")}
            </DrawerTitle>
            <DrawerDescription className="text-xs sm:text-sm text-slate-300 text-center max-w-xs mt-1 leading-relaxed">
              {t("modalDesc", {
                lang: selectedLocale === "ar" ? "العربية" : "English",
              })}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter className="p-0 w-full space-y-2.5 pt-5">
            <PrimaryButton
              onClick={handleConfirmSwitch}
              isLoading={isUpdating}
              fullWidth
            >
              {t("confirmRestart")}
            </PrimaryButton>
            <SecondaryButton
              onClick={() => setShowConfirmDrawer(false)}
              disabled={isUpdating}
              fullWidth
            >
              {t("cancel")}
            </SecondaryButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Success Bottom Sheet (Shadcn Drawer) */}
      <Drawer
        open={showSuccessDrawer}
        onOpenChange={setShowSuccessDrawer}
        showSwipeHandle={true}
      >
        <DrawerContent className="bg-[#081629] border-t border-[#42BEDD]/60 text-white rounded-t-[28px] p-6 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] shadow-2xl flex flex-col items-center text-center">
          {/* Top Handle */}
          <div className="w-10 h-1 rounded-full bg-slate-600 mb-3" />

          {/* Success Checkmark Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2478BC] to-[#42BEDD] text-white flex items-center justify-center shadow-xl shadow-cyan-500/30 ring-4 ring-cyan-400/20 my-2">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <DrawerHeader className="p-0 text-center items-center mt-2">
            <DrawerTitle className="text-xl font-black text-white text-center tracking-tight">
              {t("languageUpdated")}
            </DrawerTitle>
            <DrawerDescription className="text-xs sm:text-sm text-slate-300 text-center mt-1">
              {t("languageSetTo", {
                lang: selectedLocale === "ar" ? "العربية" : "English",
              })}
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
