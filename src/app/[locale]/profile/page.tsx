"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { mockProfile } from "@/lib/mocks/profile";
import {
  Calendar,
  Activity,
  FileText,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfileScreen() {
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const menuItems = [
    {
      id: "appointments",
      title_ar: "مواعيدي الطبية",
      title_en: "My Appointments",
      desc_ar: "استعراض وإدارة الحجوزات",
      desc_en: "View & manage bookings",
      icon: Calendar,
      color: "bg-cyan-950/80 text-cyan-400 border-cyan-800/40",
      href: "/appointments",
    },
    {
      id: "health-records",
      title_ar: "السجلات والفحوصات",
      title_en: "Health Records",
      desc_ar: "نتائج الفحوصات والتقارير الطبية",
      desc_en: "Test results & reports",
      icon: Activity,
      color: "bg-indigo-950/80 text-indigo-400 border-indigo-800/40",
      href: "/services/clinics",
    },
    {
      id: "documents",
      title_ar: "المستندات والكتيبات",
      title_en: "My Documents",
      desc_ar: "الخطط العلاجية والتثقيفية",
      desc_en: "Forms, plans & brochures",
      icon: FileText,
      color: "bg-emerald-950/80 text-emerald-400 border-emerald-800/40",
      href: "/knowledge",
    },
    {
      id: "notifications",
      title_ar: "الإشعارات والتنبيهات",
      title_en: "Notifications",
      desc_ar: "تذكيرات المواعيد والجرعات",
      desc_en: "Alerts & appointment reminders",
      icon: Bell,
      color: "bg-amber-950/80 text-amber-400 border-amber-800/40",
      href: "/notifications",
    },
    {
      id: "language",
      title_ar: "اللغة",
      title_en: "Language",
      desc_ar: "العربية / English",
      desc_en: "English / عربي",
      icon: Globe,
      color: "bg-pink-950/80 text-pink-400 border-pink-800/40",
      href: "/language",
    },
    {
      id: "privacy",
      title_ar: "الخصوصية والبيانات",
      title_en: "Privacy & Data",
      desc_ar: "إدارة بياناتك وحقوق الخصوصية",
      desc_en: "Manage your information",
      icon: Shield,
      color: "bg-teal-950/80 text-teal-400 border-teal-800/40",
      href: "/privacy",
    },
    {
      id: "help",
      title_ar: "المساعدة والدعم",
      title_en: "Help & Support",
      desc_ar: "الأسئلة الشائعة ومركز الاتصال",
      desc_en: "FAQs & contact center",
      icon: HelpCircle,
      color: "bg-blue-950/80 text-blue-400 border-blue-800/40",
      href: "/help",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))]">
      {/* Top Profile Header */}
      <div className="w-full pt-[max(1.25rem,env(safe-area-inset-top,0px))] px-6 pb-5 bg-gradient-to-b from-[#0284C7] via-[#1E6BBF] to-[#173F8A] z-20 flex-shrink-0 select-none">
        <div className="flex items-center gap-3.5">
          <div className="w-15 h-15 rounded-[22px] bg-white/20 border-2 border-white/30 flex items-center justify-center text-2xl font-black text-white shadow-lg backdrop-blur-md">
            M
          </div>
          <div className="space-y-0.5">
            <h1 className="text-xl font-black text-white leading-tight">
              {mockProfile.fullName}
            </h1>
            <p className="text-xs text-cyan-100/90 font-medium">
              {isRtl ? "رقم المريض: #DM-2847" : "Patient ID: #DM-2847"}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-200 border border-cyan-400/40">
                {isRtl ? "السكري من النوع 1" : "Type 1 Diabetes"}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {isRtl ? "نشط" : "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div className="rounded-2xl bg-white/10 border border-white/15 p-2.5 text-center backdrop-blur-md">
            <span className="text-lg font-black text-white block leading-tight">
              12
            </span>
            <span className="text-[10px] text-cyan-100 font-medium">
              {isRtl ? "المواعيد" : "Appointments"}
            </span>
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/15 p-2.5 text-center backdrop-blur-md">
            <span className="text-lg font-black text-white block leading-tight">
              3
            </span>
            <span className="text-[10px] text-cyan-100 font-medium">
              {isRtl ? "الخطط النشطة" : "Active Plans"}
            </span>
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/15 p-2.5 text-center backdrop-blur-md">
            <span className="text-lg font-black text-white block leading-tight">
              8.2%
            </span>
            <span className="text-[10px] text-cyan-100 font-medium">
              {isRtl ? "آخر تراكمي" : "Last HbA1c"}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Menu List */}
      <div className="px-5 space-y-2.5 pt-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(item.href as any)}
            className="w-full rounded-2xl bg-brand-card hover:bg-brand-card-light border border-brand-border hover:border-brand-teal/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.color}`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight truncate">
                  {isRtl ? item.title_ar : item.title_en}
                </h4>
                <span className="text-xs text-slate-400 mt-0.5 truncate">
                  {isRtl ? item.desc_ar : item.desc_en}
                </span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white rtl:rotate-180 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}

        {/* Log Out Button */}
        <div
          onClick={() => router.push("/login")}
          className="w-full rounded-2xl bg-brand-card hover:bg-rose-950/40 border border-rose-900/30 p-3.5 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all mt-4 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/40 text-rose-400 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-rose-300">
              {isRtl ? "تسجيل الخروج" : "Log Out"}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400/80 rtl:rotate-180" />
        </div>
      </div>

      {/* Persistent Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
