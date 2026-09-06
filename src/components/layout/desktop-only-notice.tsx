"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Copy, Check, ExternalLink, Globe } from "lucide-react";
import QRCode from "qrcode";
import { SplashScreen } from "@/components/screens/splash-screen";

export function DesktopOnlyNotice() {
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar";
  const [copied, setCopied] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string>("");
  const targetUrl = "https://diapilot.vercel.app/";

  React.useEffect(() => {
    QRCode.toDataURL(
      targetUrl,
      {
        width: 220,
        margin: 1,
        color: {
          dark: "#061324",
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeUrl(url);
        }
      }
    );
  }, []);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="hidden md:flex h-screen max-h-screen w-full bg-[#080F1E] text-white relative overflow-hidden select-none flex-col justify-between px-8 lg:px-16 py-6 lg:py-8">
      
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/[0.06] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600/[0.05] rounded-full blur-[130px]" />
      </div>

      {/* 1. Header Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pb-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-sheet-from border border-brand-teal/40 p-1 flex items-center justify-center shadow-md">
            <Image
              src="/mascots/Robo head.png"
              alt="DiaPilot Logo"
              width={22}
              height={22}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xs font-black tracking-[0.2em] text-white uppercase font-heading">
            {t("common.appName")}
          </span>
        </div>

        {/* Language Switcher */}
        <Link
          href={isRtl ? "/en" : "/ar"}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-slate-200 transition-all active:scale-95"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isRtl ? "English" : "العربية"}</span>
        </Link>
      </header>

      {/* 2. Main 50/50 Viewport Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex items-center justify-between gap-10 lg:gap-16 py-3 min-h-0">
        
        {/* LEFT: Clean Brand Messaging & QR Code */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 max-w-lg">
          
          {/* Typography - Refined Hierarchy */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-cyan-300/90 tracking-wider uppercase">
              {isRtl ? "مرحباً بك في ديا-بايلوت" : "Welcome to DiaPilot"}
            </span>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {isRtl ? (
                <>
                  رفيقك الذكي
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                    لرعاية السكري
                  </span>
                </>
              ) : (
                <>
                  Your Smart
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                    Diabetes Companion
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm lg:text-base text-slate-300 leading-relaxed font-normal pt-1">
              {t("splash.subtitle")}
            </p>
          </div>

          {/* QR Code & Access Container (Concentric Harmonized Border Radii) */}
          <div className="bg-[#0E1B2E]/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
            
            <div className="flex items-center gap-4">
              {/* QR Image Frame with Matched Concentric Radius */}
              <div className="bg-white p-2.5 rounded-lg shadow-md flex-shrink-0 flex items-center justify-center">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Scan to open DiaPilot on mobile"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-slate-100 animate-pulse rounded-lg" />
                )}
              </div>

              {/* Text Instructions */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isRtl ? "امسح الرمز لفتح التطبيق" : "Scan to open on your phone"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isRtl
                    ? "وجه كاميرا هاتفك نحو الرمز للفتح المباشر في المتصفح."
                    : "Point your phone camera at the QR code to launch the web app instantly."}
                </p>
              </div>
            </div>

            {/* URL & Action Buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-700/60">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              >
                <span className="truncate max-w-[200px] text-slate-300">
                  {targetUrl}
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-sans font-bold flex-shrink-0 text-xs">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{isRtl ? "تم النسخ" : "Copied"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? "نسخ" : "Copy"}</span>
                    </>
                  )}
                </span>
              </button>

              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>{isRtl ? "فتح" : "Open"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* RIGHT: Straight Luxury Smartphone Mockup with Protective Overlay */}
        <div className="w-full lg:w-1/2 flex items-center justify-center my-auto py-2 relative">
          
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute w-64 h-64 bg-cyan-500/12 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Straight Smartphone Chassis */}
          <div className="relative w-[265px] lg:w-[280px] h-[530px] lg:h-[560px] rounded-[44px] bg-[#141F32] p-[2.5px] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.12)] ring-1 ring-slate-700/80 flex flex-col my-auto transition-transform duration-500 hover:scale-[1.01]">
            
            {/* Screen Bezel */}
            <div className="w-full h-full rounded-[41px] bg-brand-dark flex flex-col justify-between relative overflow-hidden border border-slate-800 text-white select-none">
              
              {/* Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <div className="w-1 h-1 rounded-full bg-emerald-500/80" />
              </div>

              {/* In-Phone Screen Content */}
              <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
                <SplashScreen isEmbedded={true} />
              </div>

              {/* Protective Transparent Overlay - prevents click/touch interaction */}
              <div className="absolute inset-0 z-40 bg-transparent cursor-default" />

              {/* Glass Reflection Sheen */}
              <div className="absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

              {/* iPhone Home Indicator Bar */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full z-30 pointer-events-none" />

            </div>
          </div>

        </div>

      </main>

      {/* 3. Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
        <span>© {new Date().getFullYear()} DiaPilot Healthcare</span>
        <span>{t("common.appTagline")}</span>
      </footer>

    </section>
  );
}
