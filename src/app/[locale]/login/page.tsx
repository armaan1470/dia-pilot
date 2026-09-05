"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { TextInput } from "@/components/inputs/text-input";
import { PasswordInput } from "@/components/inputs/password-input";
import { BackButton } from "@/components/navigation/back-button";
import { User, ArrowRight } from "lucide-react";

export default function LoginScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const isRtl = locale === "ar";

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError(
        isRtl
          ? "يرجى إدخال رقم الهاتف أو البريد الإلكتروني"
          : "Please enter your phone or email"
      );
      return;
    }
    if (!password) {
      setError(
        isRtl ? "يرجى إدخال كلمة المرور" : "Please enter your password"
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/otp");
    }, 600);
  };

  const handleGuestLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none px-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] justify-between">
      {/* Top Header Row with Back Button */}
      <div className="w-full flex items-center justify-between z-20 mb-1 flex-shrink-0">
        <BackButton />
        <Link
          href="/language"
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-all"
        >
          {isRtl ? "English" : "العربية"}
        </Link>
      </div>

      {/* Hero Mascot & Title Section */}
      <div className="flex flex-col items-center text-center my-2 z-10 flex-shrink-0">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#0F294D] via-[#133A6B] to-[#0A1B33] p-1.5 shadow-xl shadow-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-2">
          <Image
            src="/mascots/image 1.png"
            alt="DiaPilot Mascot"
            width={84}
            height={84}
            className="object-contain scale-110 drop-shadow-md"
            priority
          />
        </div>

        <h1 className="text-2xl font-black tracking-tight text-white">
          {isRtl ? "ديا-بايلوت" : "DiaPilot"}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 max-w-xs">
          {isRtl
            ? "المساعد الذكي الشامل لرعاية السكري"
            : "AI-Powered Diabetes Care Companion"}
        </p>
      </div>

      {/* Login Card Form */}
      <div className="w-full max-w-sm mx-auto rounded-[28px] bg-[#132238] border border-[#1E3557]/80 p-5 sm:p-6 shadow-2xl flex flex-col gap-4 z-10 my-auto">
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {t("welcomeBack")}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t("signInSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSignIn} className="flex flex-col gap-3.5">
          <TextInput
            label={t("phoneOrEmail")}
            placeholder={t("phonePlaceholder")}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            autoComplete="username"
          />

          <div>
            <PasswordInput
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {t("forgotPassword")}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-medium px-1">{error}</p>
          )}

          <div className="pt-1">
            <PrimaryButton type="submit" isLoading={isLoading} fullWidth>
              {t("signIn")}
            </PrimaryButton>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-0.5">
          <div className="w-full border-t border-slate-700/60" />
          <span className="absolute bg-[#132238] px-3 text-xs text-slate-400 font-medium">
            {tCommon("or")}
          </span>
        </div>

        {/* Continue as Guest Button */}
        <SecondaryButton
          type="button"
          onClick={handleGuestLogin}
          rightIcon={
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-slate-400" />
          }
          fullWidth
        >
          {t("continueAsGuest")}
        </SecondaryButton>
      </div>

      {/* Bottom Create Account Link */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4 mb-1 flex-shrink-0">
        <span>{t("newPatient")}</span>
        <Link
          href="/register"
          className="font-bold text-cyan-400 hover:underline cursor-pointer"
        >
          {t("createAccount")}
        </Link>
      </div>
    </div>
  );
}
