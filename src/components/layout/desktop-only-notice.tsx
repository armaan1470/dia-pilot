"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Smartphone, QrCode, Copy, Check, Sparkles, ShieldCheck } from "lucide-react";

export function DesktopOnlyNotice() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [copied, setCopied] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="hidden md:flex min-h-[100dvh] w-full bg-[#040812] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,180,255,0.18),rgba(255,255,255,0))] text-white flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden select-none">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full flex flex-col items-center text-center relative z-10 gap-6">
        
        {/* Top Branding Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0A1B33]/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">
            {isRtl ? "تطبيق ويب مخصص للجوال فقط" : "MOBILE WEB APP ONLY"}
          </span>
        </div>

        {/* Mascot & Device Graphic */}
        <div className="relative my-2">
          <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#0C1E38] via-[#13315C] to-[#071326] p-2 border border-cyan-400/30 shadow-2xl shadow-cyan-900/40 flex items-center justify-center">
            <Image
              src="/mascots/image 1.png"
              alt="DiaPilot Companion"
              width={120}
              height={120}
              className="object-contain drop-shadow-xl"
              priority
            />
            {/* Phone Badge floating icon */}
            <div className="absolute -bottom-3 -right-3 rtl:-right-auto rtl:-left-3 w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-[#040812] shadow-lg shadow-cyan-500/30">
              <Smartphone className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {isRtl
              ? "ديا-بايلوت مصمم حصرياً للهواتف الذكية"
              : "DiaPilot is Designed Exclusively for Mobile"}
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
            {isRtl
              ? "تم بناء ديا-بايلوت كرفيق تفاعلي محمول يعمل باللمس لرعاية مرضى السكري. يرجى فتح الموقع من خلال متصفح هاتفك المحمول أو مسح الرمز أدناه."
              : "DiaPilot is crafted exclusively as a touch-first mobile companion for smart diabetes care. Please open this web app on your mobile browser for the full experience."}
          </p>
        </div>

        {/* QR Code / Share Card */}
        <div className="w-full max-w-sm rounded-3xl bg-brand-dark/95 border border-brand-border p-5 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-teal">
            <QrCode className="w-4 h-4" />
            <span>{isRtl ? "امسح الرمز بكاميرا الجوال" : "Scan with your phone camera"}</span>
          </div>

          {/* Clean Stylized QR Code Frame */}
          <div className="p-3 bg-white rounded-2xl shadow-inner flex items-center justify-center">
            {/* Embedded High-Contrast QR Code Visual */}
            <svg
              viewBox="0 0 120 120"
              className="w-32 h-32 text-brand-dark"
              fill="currentColor"
            >
              {/* Corner 1 */}
              <rect x="10" y="10" width="30" height="30" rx="4" />
              <rect x="16" y="16" width="18" height="18" fill="white" rx="2" />
              <rect x="20" y="20" width="10" height="10" rx="1" />
              
              {/* Corner 2 */}
              <rect x="80" y="10" width="30" height="30" rx="4" />
              <rect x="86" y="16" width="18" height="18" fill="white" rx="2" />
              <rect x="90" y="20" width="10" height="10" rx="1" />
              
              {/* Corner 3 */}
              <rect x="10" y="80" width="30" height="30" rx="4" />
              <rect x="16" y="86" width="18" height="18" fill="white" rx="2" />
              <rect x="20" y="90" width="10" height="10" rx="1" />

              {/* Data Pattern Modules */}
              <rect x="46" y="12" width="8" height="8" rx="1" />
              <rect x="62" y="12" width="8" height="8" rx="1" />
              <rect x="46" y="26" width="8" height="8" rx="1" />
              <rect x="62" y="26" width="8" height="8" rx="1" />
              <rect x="12" y="48" width="8" height="8" rx="1" />
              <rect x="26" y="48" width="8" height="8" rx="1" />
              <rect x="44" y="44" width="32" height="32" rx="6" fill="#0072FF" />
              <circle cx="60" cy="60" r="8" fill="white" />
              <rect x="84" y="48" width="8" height="8" rx="1" />
              <rect x="98" y="48" width="8" height="8" rx="1" />
              <rect x="46" y="84" width="8" height="8" rx="1" />
              <rect x="62" y="84" width="8" height="8" rx="1" />
              <rect x="84" y="84" width="12" height="12" rx="2" />
              <rect x="98" y="98" width="12" height="12" rx="2" />
            </svg>
          </div>

          {/* Quick Copy Link Row */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="truncate max-w-[240px] text-slate-400">
              {currentUrl || "https://diapilot.app"}
            </span>
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold flex-shrink-0">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isRtl ? "تم النسخ" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isRtl ? "نسخ الرابط" : "Copy Link"}</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isRtl ? "مساعد ذكاء اصطناعي فوري" : "Instant AI Companion"}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isRtl ? "دخول موثوق وآمن" : "Secure Patient Access"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
