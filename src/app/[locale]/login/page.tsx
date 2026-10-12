"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { TextInput } from "@/components/inputs/text-input";
import { PasswordInput } from "@/components/inputs/password-input";
import { FieldGroup } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/auth-store";
import { User, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const isRtl = locale === "ar";

  const [isLoading, setIsLoading] = React.useState(false);
  const [isGuestLoading, setIsGuestLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const { signInWithEmail, signInAsGuest } = useAuthStore();

  const loginSchema = React.useMemo(
    () =>
      z.object({
        identifier: z
          .string()
          .min(1, {
            message: isRtl
              ? "يرجى إدخال البريد الإلكتروني"
              : "Please enter your email",
          })
          .email({
            message: isRtl
              ? "صيغة البريد الإلكتروني غير صحيحة"
              : "Invalid email format",
          }),
        password: z.string().min(1, {
          message: isRtl
            ? "يرجى إدخال كلمة المرور"
            : "Please enter your password",
        }),
      }),
    [isRtl]
  );

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    const res = await signInWithEmail(values.identifier, values.password);
    setIsLoading(false);

    if (res.success) {
      router.replace("/chat");
    } else {
      setAuthError(
        res.error?.includes("Invalid login credentials")
          ? isRtl
            ? "بيانات الدخول غير صحيحة. يرجى التأكد من البريد وكلمة المرور"
            : "Invalid login credentials. Please check your email and password."
          : res.error || (isRtl ? "حدث خطأ أثناء تسجيل الدخول" : "Failed to sign in")
      );
    }
  };

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    setAuthError(null);
    const res = await signInAsGuest();
    setIsGuestLoading(false);

    if (res.success) {
      router.replace("/chat");
    } else {
      setAuthError(
        res.error ||
          (isRtl
            ? "تعذر تسجيل الدخول كزائر، يرجى المحاولة لاحقاً"
            : "Unable to continue as guest. Please try again.")
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none px-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] justify-start gap-4">
      {/* Hero Mascot & Title Section */}
      <div className="flex flex-col items-center text-center my-2 z-10 flex-shrink-0">
        <div className="relative w-32 h-w-32 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,#4794FF_0%,#091A32_100%)] flex items-center justify-center my-2">
          <Image
            src="/mascots/login-avatar.png"
            alt="DiaPilot Mascot"
            width={125}
            height={125}
            className="object-contain drop-shadow-md"
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

      <div>
        {/* Login Card Form */}
        <div className="w-full max-w-sm mx-auto rounded-xl bg-brand-card border border-brand-border p-5 sm:p-6 shadow-2xl flex flex-col gap-4 z-10">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {t("welcomeBack")}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("signInSubtitle")}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
            <FieldGroup className="gap-3.5">
              <Controller
                control={control}
                name="identifier"
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    label={t("phoneOrEmail")}
                    placeholder={t("phonePlaceholder")}
                    leftIcon={<User className="w-4 h-4 text-slate-400" />}
                    autoComplete="username"
                    error={fieldState.error?.message}
                  />
                )}
              />

              <div>
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <PasswordInput
                      {...field}
                      label={t("password")}
                      placeholder={t("passwordPlaceholder")}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    className="text-xs font-semibold text-brand-teal hover:text-brand-cyan transition-colors cursor-pointer"
                  >
                    {t("forgotPassword")}
                  </button>
                </div>
              </div>
            </FieldGroup>

            <div className="pt-1">
              <PrimaryButton type="submit" isLoading={isLoading} fullWidth>
                {t("signIn")}
              </PrimaryButton>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-0.5">
            <div className="w-full border-t border-brand-border/60" />
            <span className="absolute bg-brand-card px-3 text-xs text-slate-400 font-medium">
              {tCommon("or")}
            </span>
          </div>

          {/* Continue as Guest Button */}
          <SecondaryButton
            type="button"
            onClick={handleGuestLogin}
            isLoading={isGuestLoading}
            rightIcon={
              <ArrowRight className="w-4 h-4 rtl:rotate-180 text-slate-400" />
            }
            fullWidth
          >
            {t("continueAsGuest")}
          </SecondaryButton>
        </div>

        {/* Bottom Create Account Link */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6 mb-1 flex-shrink-0">
          <span>{t("newPatient")}</span>
          <Link
            href="/register"
            replace
            className="font-bold text-brand-teal hover:underline cursor-pointer"
          >
            {t("createAccount")}
          </Link>
        </div>
      </div>
    </div>
  );
}
