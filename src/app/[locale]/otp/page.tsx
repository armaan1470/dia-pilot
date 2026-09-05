"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { OTPInput } from "@/components/inputs/otp-input";
import { ShieldCheck, RotateCcw } from "lucide-react";

export default function OTPScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const isRtl = locale === "ar";

  const [otp, setOtp] = React.useState("");
  const [timer, setTimer] = React.useState(45);
  const [canResend, setCanResend] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(45);
    setCanResend(false);
    setOtp("");
    setError(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError(
        isRtl
          ? "يرجى إدخال الرمز المكون من 4 أرقام كاملاً"
          : "Please enter the full 4-digit code"
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none justify-between pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={t("verifyOtp")}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        variant="gradient"
      />

      {/* Main Content Area */}
      <div className="flex-1 px-6 pt-5 pb-6 flex flex-col justify-between z-10">
        <div className="flex flex-col items-center text-center gap-4 my-auto">
          {/* Glowing Shield Icon */}
          <div className="relative w-18 h-18 rounded-full bg-cyan-950/70 border border-cyan-500/40 p-2 shadow-2xl shadow-cyan-500/20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-30" />
            <ShieldCheck className="w-9 h-9 text-cyan-400" />
          </div>

          <div className="space-y-1 max-w-xs">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t("verifyOtp")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("otpSubtitle")}{" "}
              <span className="text-cyan-300 font-semibold dir-ltr inline-block">
                +966 50 ••• ••67
              </span>
            </p>
          </div>

          {/* 4-Digit OTP Input */}
          <form onSubmit={handleVerify} className="w-full max-w-xs space-y-4">
            <OTPInput value={otp} onChange={setOtp} maxLength={4} />

            {error && (
              <p className="text-xs text-rose-400 font-medium">{error}</p>
            )}

            {/* Countdown / Resend Action */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("resendCode")}</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400 font-medium">
                  {t("resendIn")} 00:{timer < 10 ? `0${timer}` : timer}
                </span>
              )}
            </div>

            <div className="pt-3">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                disabled={otp.length < 4}
                fullWidth
              >
                {isRtl ? "تأكيد ومتابعة" : "Verify & Continue"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
