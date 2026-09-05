"use client";

import * as React from "react";
import { useRouter, Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { TextInput } from "@/components/inputs/text-input";
import { EmailInput } from "@/components/inputs/email-input";
import { PasswordInput } from "@/components/inputs/password-input";
import { BackButton } from "@/components/navigation/back-button";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { User, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const isRtl = locale === "ar";

  const [step, setStep] = React.useState<1 | 2>(1);

  // Step 1 State
  const [fullName, setFullName] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "other">("male");
  const [diabetesType, setDiabetesType] = React.useState<
    "type1" | "type2" | "gestational" | "pre" | "other"
  >("type1");

  // Step 2 State
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      setError(
        isRtl ? "يرجى إدخال اسمك الكامل" : "Please enter your full name"
      );
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber) {
      setError(
        isRtl ? "يرجى إدخال رقم الجوال" : "Please enter your mobile number"
      );
      return;
    }
    if (!email) {
      setError(
        isRtl
          ? "يرجى إدخال البريد الإلكتروني"
          : "Please enter your email address"
      );
      return;
    }
    if (password.length < 6) {
      setError(
        isRtl
          ? "يجب أن تكون كلمة المرور ٦ أحرف على الأقل"
          : "Password must be at least 6 characters"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError(
        isRtl
          ? "كلمتا المرور غير متطابقتين"
          : "Passwords do not match"
      );
      return;
    }
    if (!agreed) {
      setError(
        isRtl
          ? "يرجى الموافقة على شروط الخدمة وسياسة الخصوصية"
          : "Please agree to the Terms of Service & Privacy Policy"
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/chat");
    }, 600);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 1;
    if (password.length >= 8) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none px-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] justify-between">
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between z-20 mb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <BackButton onClick={handleBack} />
          <div>
            <h1 className="text-xl font-black text-white leading-tight">
              {t("createAccountTitle")}
            </h1>
            <span className="text-xs text-slate-400 font-medium">
              {step === 1 ? t("step1Of2") : t("step2Of2")}
            </span>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={cn(
              "h-full bg-gradient-to-r from-brand-teal to-brand-blue transition-all duration-300 rounded-full shadow-sm shadow-brand-teal/50",
              step === 1 ? "w-1/2" : "w-full"
            )}
          />
        </div>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-sm mx-auto rounded-xl bg-brand-card border border-brand-border p-5 sm:p-6 shadow-2xl flex flex-col gap-4 z-10 my-auto">
        <h2 className="text-lg font-bold text-white tracking-tight">
          {step === 1 ? t("tellUsAboutYou") : t("setUpYourAccount")}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleStep1Next} className="flex flex-col gap-3.5">
            {/* Full Name */}
            <TextInput
              label={t("fullName")}
              placeholder={t("fullNamePlaceholder")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-slate-400" />}
            />

            {/* Date of Birth */}
            <TextInput
              label={t("dateOfBirth")}
              placeholder={t("datePlaceholder")}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
            />

            {/* Gender Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
                {t("gender")}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "male", label: t("male") },
                  { key: "female", label: t("female") },
                  { key: "other", label: t("preferNotToSay") },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setGender(item.key as any)}
                    className={cn(
                      "py-2.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 border text-center cursor-pointer",
                      gender === item.key
                        ? "bg-brand-card-light border-brand-teal text-brand-teal shadow-sm shadow-brand-teal/20"
                        : "bg-brand-card-light border-brand-border text-slate-300 hover:border-slate-500"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diabetes Type Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
                {t("diabetesType")}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "type1", label: t("type1") },
                  { key: "type2", label: t("type2") },
                  { key: "gestational", label: t("gestational") },
                  { key: "pre", label: t("preDiabetes") },
                  { key: "other", label: t("other") },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setDiabetesType(item.key as any)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border cursor-pointer",
                      diabetesType === item.key
                        ? "bg-brand-card-light border-brand-teal text-brand-teal shadow-sm shadow-brand-teal/20"
                        : "bg-brand-card-light border-brand-border text-slate-300 hover:border-slate-500"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium px-1">{error}</p>
            )}

            <div className="pt-2">
              <PrimaryButton
                type="submit"
                rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                fullWidth
              >
                {t("next")}
              </PrimaryButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="flex flex-col gap-3.5">
            {/* Mobile Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
                {t("mobileNumber")}
              </label>
              <div className="flex items-center gap-2">
                <div className="h-13 px-3.5 rounded-lg bg-brand-card-light border border-brand-border text-white text-sm font-semibold flex items-center justify-center select-none">
                  {t("phoneCode")}
                </div>
                <div className="flex-1">
                  <TextInput
                    placeholder={t("mobilePlaceholder")}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <EmailInput
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div>
              <PasswordInput
                label={t("password")}
                placeholder={t("passwordMin")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Password Strength Meter */}
              {password && (
                <div className="grid grid-cols-4 gap-1.5 mt-2 px-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        strength >= level
                          ? strength >= 3
                            ? "bg-emerald-400"
                            : "bg-amber-400"
                          : "bg-slate-700"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <PasswordInput
              label={t("confirmPassword")}
              placeholder={t("confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Terms of Service Checkbox */}
            <div className="flex items-start gap-3 pt-1 px-1">
              <button
                type="button"
                onClick={() => setAgreed((prev) => !prev)}
                className="mt-0.5 cursor-pointer flex-shrink-0"
              >
                <CustomCheckbox checked={agreed} size="sm" />
              </button>

              <p className="text-xs text-slate-300 leading-relaxed">
                {t("agreeTermsText")}{" "}
                <Link
                  href="/privacy"
                  className="text-brand-teal font-semibold hover:underline"
                >
                  {t("termsOfService")}
                </Link>{" "}
                {t("and")}{" "}
                <Link
                  href="/privacy"
                  className="text-brand-teal font-semibold hover:underline"
                >
                  {t("privacyPolicy")}
                </Link>
              </p>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium px-1">{error}</p>
            )}

            <div className="pt-2">
              <PrimaryButton type="submit" isLoading={isLoading} fullWidth>
                {t("signUp")}
              </PrimaryButton>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Sign In Link */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4 mb-1 flex-shrink-0">
        <span>{t("alreadyHaveAccount")}</span>
        <Link
          href="/login"
          className="font-bold text-brand-teal hover:underline cursor-pointer"
        >
          {t("signIn")}
        </Link>
      </div>
    </div>
  );
}
