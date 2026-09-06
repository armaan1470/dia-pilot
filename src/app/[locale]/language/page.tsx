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
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { Check, Info, ArrowRight } from "lucide-react";
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
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none justify-between pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header with Brand & Concentric Circle Lines Watermark */}
      <div className="relative flex-shrink-0">
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          showBack={true}
          fallbackHref="/profile"
          theme="cyan"
          watermark={
            <svg
              width="130"
              height="130"
              viewBox="0 0 130 130"
              fill="none"
              className="pointer-events-none select-none opacity-40 -mt-2 -mr-2 rtl:-ml-2"
            >
              <circle
                cx="110"
                cy="20"
                r="90"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.2"
              />
              <circle
                cx="110"
                cy="20"
                r="64"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.28"
              />
              <circle
                cx="110"
                cy="20"
                r="38"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.38"
              />
            </svg>
          }
        />
      </div>

      {/* Language Options List */}
      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col justify-between z-10">
        <div className="flex flex-col gap-4">
          {/* English Card */}
          <SecondaryButton
            onClick={() => handleLanguageSelect("en")}
            className={cn(
              "h-auto! bg-[#FFFFFF12] border border-[#FFFFFF1A] p-4 flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.99] text-left rtl:text-right", 
              currentLocale === "en" ? "border-brand-cyan/40 bg-brand-cyan/10" : ""
            )}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-inner flex-shrink-0">
                  <AppleEmoji name="flag_gb" size={26} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white leading-tight">
                    English
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 font-normal">
                    English
                  </span>
                </div>
              </div>

              <CustomCheckbox checked={currentLocale === "en"} />
            </div>
          </SecondaryButton>

          {/* Arabic Card */}
          <SecondaryButton
            fullWidth
            onClick={() => handleLanguageSelect("ar")}
            className={cn(
              "h-auto! bg-[#FFFFFF12] border border-[#FFFFFF1A] p-4 flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.99] text-left rtl:text-right", 
              currentLocale === "ar" ? "border-brand-cyan/40 bg-brand-cyan/10" : ""
            )}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-inner flex-shrink-0">
                  <AppleEmoji name="flag_sa" size={26} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white leading-tight">
                    {isRtl ? "العربية" : "Arabic"}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 font-normal">
                    العربية
                  </span>
                </div>
              </div>

              <CustomCheckbox checked={currentLocale === "ar"} />
            </div>
          </SecondaryButton>

          {/* Info Notice Box */}
          <div className="p-4 flex items-center gap-2">
            <Info className="text-brand-cyan/85 w-3.5 h-3.5" />
            <p className="text-xs text-brand-cyan/85 leading-relaxed font-normal">
              {t("notice")}
            </p>
          </div>
        </div>

        {/* Continue to Onboarding Button with Convex Glow */}
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
        <DrawerContent className="bg-gradient-to-br from-brand-card to-brand-dark border border-brand-teal/20 text-white rounded-t-4xl! p-1 pb-[max(2rem,env(safe-area-inset-bottom,0px))] shadow-2xl flex flex-col items-center">
          {/* Language Switch Flag Indicators with Labels outside */}
          <div className="flex items-center justify-center gap-5 p-6">
            {/* From Lang */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shadow-inner">
                <AppleEmoji
                  name={currentLocale === "en" ? "flag_gb" : "flag_sa"}
                  size={32}
                />
              </div>
              <span className="text-xs text-slate-300 font-semibold mt-1.5">
                {currentLocale === "en" ? "English" : "العربية"}
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                {currentLocale === "en" ? "EN" : "AR"}
              </span>
            </div>

            {/* Arrow Button */}
            <div className="glow-primary w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue border-t border-white/40 text-white flex items-center justify-center mb-6 rtl:rotate-180 flex-shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* To Lang */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-brand-cyan/15 border border-brand-cyan/40 glow-primary flex items-center justify-center">
                <AppleEmoji
                  name={selectedLocale === "en" ? "flag_gb" : "flag_sa"}
                  size={32}
                />
              </div>
              <span className="text-xs text-brand-cyan font-bold mt-1.5">
                {selectedLocale === "en" ? "English" : "العربية"}
              </span>
              <span className="text-[10px] text-brand-cyan/70 font-bold uppercase">
                {selectedLocale === "en" ? "EN" : "AR"}
              </span>
            </div>
          </div>

          <DrawerHeader className="p-0 text-center items-center mt-3">
            <DrawerTitle className="text-xl font-bold text-white text-center tracking-tight">
              {t("modalTitle")}
            </DrawerTitle>
            <DrawerDescription className="text-xs sm:text-sm text-slate-300 text-center max-w-xs mt-1.5 leading-relaxed">
              {isRtl ? (
                <>
                  سيتم إعادة تشغيل التطبيق والتحويل إلى{" "}
                  <span className="text-brand-cyan font-bold">
                    {selectedLocale === "ar" ? "العربية" : "English"}
                  </span>
                  .
                </>
              ) : (
                <>
                  The app will restart and switch to{" "}
                  <span className="text-brand-cyan font-bold">
                    {selectedLocale === "ar" ? "العربية" : "English"}
                  </span>
                  .
                </>
              )}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter className="space-y-3 mt-6 w-full">
            <PrimaryButton
              onClick={handleConfirmSwitch}
              disabled={isUpdating}
              isLoading={isUpdating}
              rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
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
        <DrawerContent className="bg-gradient-to-br from-brand-card to-brand-dark border-t border-brand-teal/20 text-white rounded-t-4xl! p-2 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] shadow-2xl flex flex-col items-center justify-center text-center">
          <DrawerHeader className="text-center items-center my-4">
            {/* Success Checkmark Badge with Glowing 3D Convex Dome */}
            <div className="size-14 rounded-full bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue text-white flex items-center justify-center glow-primary border-t border-white/50 mb-6">
              <span className="font-jakarta text-2xl font-extrabold leading-9 tracking-normal">✓</span>
            </div>
            <DrawerTitle className="text-xl font-black text-white text-center tracking-tight">
              {t("languageUpdated")}
            </DrawerTitle>
            <DrawerDescription className="text-xs sm:text-sm text-slate-300 text-center mt-1.5">
              {isRtl ? (
                <>
                  تم تعيين لغة التطبيق إلى{" "}
                  <span className="text-brand-cyan font-bold">
                    {selectedLocale === "ar" ? "العربية" : "English"}
                  </span>
                </>
              ) : (
                <>
                  App language set to{" "}
                  <span className="text-brand-cyan font-bold">
                    {selectedLocale === "ar" ? "العربية" : "English"}
                  </span>
                </>
              )}
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
