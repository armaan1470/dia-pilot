"use client";

import * as React from "react";
import { useRouter, Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { TextInput } from "@/components/inputs/text-input";
import { EmailInput } from "@/components/inputs/email-input";
import { PasswordInput } from "@/components/inputs/password-input";
import { DatePicker } from "@/components/inputs/date-picker";
import { BackButton } from "@/components/navigation/back-button";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { FieldGroup } from "@/components/ui/field";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryOption {
  code: string;
  name: { en: string; ar: string };
  flag: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "+966", name: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" }, flag: "🇸🇦" },
  { code: "+971", name: { en: "UAE", ar: "الإمارات" }, flag: "🇦🇪" },
  { code: "+965", name: { en: "Kuwait", ar: "الكويت" }, flag: "🇰🇼" },
  { code: "+974", name: { en: "Qatar", ar: "قطر" }, flag: "🇶🇦" },
  { code: "+973", name: { en: "Bahrain", ar: "البحرين" }, flag: "🇧🇭" },
  { code: "+968", name: { en: "Oman", ar: "عمان" }, flag: "🇴🇲" },
  { code: "+20", name: { en: "Egypt", ar: "مصر" }, flag: "🇪🇬" },
  { code: "+962", name: { en: "Jordan", ar: "الأردن" }, flag: "🇯🇴" },
  { code: "+44", name: { en: "UK", ar: "المملكة المتحدة" }, flag: "🇬🇧" },
  { code: "+1", name: { en: "USA", ar: "الولايات المتحدة" }, flag: "🇺🇸" },
];

export default function RegisterScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const isRtl = locale === "ar";

  const [step, setStep] = React.useState<1 | 2>(1);
  const [selectedCountry, setSelectedCountry] = React.useState<CountryOption>(COUNTRIES[0]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Zod Schemas
  const step1Schema = React.useMemo(
    () =>
      z.object({
        fullName: z.string().min(1, {
          message: isRtl ? "يرجى إدخال اسمك الكامل" : "Please enter your full name",
        }),
        dob: z.union([z.date(), z.string()]).optional(),
        gender: z.enum(["male", "female", "other"]),
        diabetesType: z.enum(["type1", "type2", "gestational", "pre", "other"]),
      }),
    [isRtl]
  );

  const step2Schema = React.useMemo(
    () =>
      z
        .object({
          mobileNumber: z.string().min(1, {
            message: isRtl ? "يرجى إدخال رقم الجوال" : "Please enter your mobile number",
          }),
          email: z
            .string()
            .min(1, {
              message: isRtl ? "يرجى إدخال البريد الإلكتروني" : "Please enter your email address",
            })
            .email({
              message: isRtl ? "بريد إلكتروني غير صالح" : "Invalid email address",
            }),
          password: z.string().min(6, {
            message: isRtl
              ? "يجب أن تكون كلمة المرور ٦ أحرف على الأقل"
              : "Password must be at least 6 characters",
          }),
          confirmPassword: z.string().min(1, {
            message: isRtl ? "يرجى تأكيد كلمة المرور" : "Please confirm your password",
          }),
          agreed: z.boolean().refine((val) => val === true, {
            message: isRtl
              ? "يرجى الموافقة على شروط الخدمة وسياسة الخصوصية"
              : "Please agree to the Terms of Service & Privacy Policy",
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: isRtl ? "كلمتا المرور غير متطابقتين" : "Passwords do not match",
          path: ["confirmPassword"],
        }),
    [isRtl]
  );

  type Step1FormValues = z.infer<typeof step1Schema>;
  type Step2FormValues = z.infer<typeof step2Schema>;

  const form1 = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: "",
      dob: undefined,
      gender: "male",
      diabetesType: "type1",
    },
  });

  const form2 = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    },
  });

  const onStep1Submit = (_values: Step1FormValues) => {
    setStep(2);
  };

  const onStep2Submit = (_values: Step2FormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/chat");
    }, 600);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  const passwordVal = form2.watch("password");

  const getPasswordStrength = () => {
    if (!passwordVal) return 0;
    let strength = 1;
    if (passwordVal.length >= 8) strength++;
    if (/[0-9]/.test(passwordVal)) strength++;
    if (/[^A-Za-z0-9]/.test(passwordVal)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none px-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] justify-start gap-6">
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

      <div>
        {/* Main Card Container */}
        <div className="w-full max-w-sm mx-auto rounded-xl bg-brand-card border border-brand-border p-5 sm:p-6 shadow-2xl flex flex-col gap-4 z-10">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {step === 1 ? t("tellUsAboutYou") : t("setUpYourAccount")}
          </h2>

          {step === 1 ? (
            <form onSubmit={form1.handleSubmit(onStep1Submit)} className="flex flex-col gap-3.5">
              <FieldGroup className="gap-3.5">
                {/* Full Name */}
                <Controller
                  control={form1.control}
                  name="fullName"
                  render={({ field, fieldState }) => (
                    <TextInput
                      {...field}
                      label={t("fullName")}
                      placeholder={t("fullNamePlaceholder")}
                      leftIcon={<User className="w-4 h-4 text-slate-400" />}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* Date of Birth */}
                <Controller
                  control={form1.control}
                  name="dob"
                  render={({ field, fieldState }) => (
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t("dateOfBirth")}
                      placeholder={t("datePlaceholder")}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* Gender Selection */}
                <Controller
                  control={form1.control}
                  name="gender"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
                        {t("gender")}
                      </label>
                      <div className="flex flex-row flex-wrap gap-2">
                        {[
                          { key: "male", label: t("male") },
                          { key: "female", label: t("female") },
                          { key: "other", label: t("preferNotToSay") },
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => field.onChange(item.key)}
                            className={cn(
                              "py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 border text-center cursor-pointer",
                              field.value === item.key
                                ? "bg-brand-card-light border-brand-teal text-brand-teal shadow-sm shadow-brand-teal/20"
                                : "bg-brand-card-light border-brand-border text-slate-300 hover:border-slate-500"
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                />

                {/* Diabetes Type Selection */}
                <Controller
                  control={form1.control}
                  name="diabetesType"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
                        {t("diabetesType")}
                      </label>
                      <div className="flex flex-row flex-wrap gap-2">
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
                            onClick={() => field.onChange(item.key)}
                            className={cn(
                              "py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 border cursor-pointer",
                              field.value === item.key
                                ? "bg-brand-card-light border-brand-teal text-brand-teal shadow-sm shadow-brand-teal/20"
                                : "bg-brand-card-light border-brand-border text-slate-300 hover:border-slate-500"
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </FieldGroup>

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
            <form onSubmit={form2.handleSubmit(onStep2Submit)} className="flex flex-col gap-3.5">
              <FieldGroup className="gap-3.5">
                {/* Mobile Number */}
                <Controller
                  control={form2.control}
                  name="mobileNumber"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
                        {t("mobileNumber")}
                      </label>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            type="button"
                            className={cn(
                              "h-12 sm:h-13 px-3 rounded-lg bg-brand-card-light border border-brand-border text-white text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:border-brand-teal/50 transition-all select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal shrink-0",
                              fieldState.error && "border-rose-500/50"
                            )}
                          >
                            <span className="text-base leading-none">{selectedCountry.flag}</span>
                            <span dir="ltr" className="text-sm font-medium">
                              {selectedCountry.code}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 opacity-70" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align={isRtl ? "end" : "start"}
                            className="w-56 max-h-64 p-1.5 bg-brand-card border border-brand-border text-white rounded-xl shadow-2xl z-50 overflow-y-auto"
                          >
                            {COUNTRIES.map((country) => (
                              <DropdownMenuItem
                                key={country.code}
                                onClick={() => setSelectedCountry(country)}
                                className={cn(
                                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors hover:bg-white/10 focus:bg-white/10 outline-none",
                                  selectedCountry.code === country.code &&
                                    "bg-brand-teal/15 text-brand-teal font-medium"
                                )}
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  <span className="text-base">{country.flag}</span>
                                  <span className="truncate">
                                    {isRtl ? country.name.ar : country.name.en}
                                  </span>
                                </div>
                                <span dir="ltr" className="text-xs text-slate-400 font-mono">
                                  {country.code}
                                </span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex-1 min-w-0">
                          <TextInput
                            {...field}
                            placeholder={t("mobilePlaceholder")}
                            type="tel"
                            error={fieldState.error?.message}
                            hideErrorText
                          />
                        </div>
                      </div>
                      {fieldState.error && (
                        <p className="text-xs text-rose-400 font-medium px-1 mt-0.5">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Email Address */}
                <Controller
                  control={form2.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <EmailInput
                      {...field}
                      label={t("email")}
                      placeholder={t("emailPlaceholder")}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* Password */}
                <div>
                  <Controller
                    control={form2.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <PasswordInput
                        {...field}
                        label={t("password")}
                        placeholder={t("passwordMin")}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  {/* Password Strength Meter */}
                  {passwordVal && (
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
                <Controller
                  control={form2.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <PasswordInput
                      {...field}
                      label={t("confirmPassword")}
                      placeholder={t("confirmPasswordPlaceholder")}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* Terms of Service Checkbox */}
                <Controller
                  control={form2.control}
                  name="agreed"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 pt-1 px-1">
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className="mt-0.5 cursor-pointer flex-shrink-0"
                        >
                          <CustomCheckbox checked={field.value} size="sm" />
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
                      {fieldState.error && (
                        <p className="text-xs text-rose-400 font-medium px-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </FieldGroup>

              <div className="pt-2">
                <PrimaryButton type="submit" isLoading={isLoading} fullWidth>
                  {t("signUp")}
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Sign In Link */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6 mb-1 flex-shrink-0">
          <span>{t("alreadyHaveAccount")}</span>
          <Link
            href="/login"
            replace
            className="font-bold text-brand-teal hover:underline cursor-pointer"
          >
            {t("signIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
