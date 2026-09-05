"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { AppointmentCard } from "@/components/cards/appointment-card";
import { Calendar, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppleEmoji } from "@/components/ui/apple-emoji";

export default function AppointmentsScreen() {
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming");

  const upcomingAppointments = [
    {
      id: "apt-1",
      title_ar: "عيادة السكري والغدد الصماء",
      title_en: "Diabetes Clinic",
      doctor_ar: "د. سارة العتيبي",
      doctor_en: "Dr. Sarah Al-Otaibi",
      facility_ar: "مركز السكري والتخصصات الدقيقة",
      facility_en: "Diabetes & Endocrinology Center",
      date_ar: "الإثنين، ٢١ يوليو ٢٠٢٥",
      date_en: "Mon, 21 Jul 2025",
      time_ar: "١٠:٣٠ صباحاً",
      time_en: "10:30 AM",
      status: "confirmed" as const,
      statusText_ar: "مؤكد",
      statusText_en: "Confirmed",
    },
    {
      id: "apt-2",
      title_ar: "عيادة رعاية القدم السكري",
      title_en: "Diabetic Foot Clinic",
      doctor_ar: "د. خالد منصور",
      doctor_en: "Dr. Khalid Mansour",
      facility_ar: "عيادة الجروح والأعصاب الوقائية",
      facility_en: "Wound & Neuropathy Clinic",
      date_ar: "الأربعاء، ٣٠ يوليو ٢٠٢٥",
      date_en: "Wed, 30 Jul 2025",
      time_ar: "٠٢:٠٠ مساءً",
      time_en: "2:00 PM",
      status: "pending" as const,
      statusText_ar: "قيد الانتظار",
      statusText_en: "Pending",
    },
  ];

  const pastAppointments = [
    {
      id: "apt-3",
      title_ar: "فحص قاع العين والشبكية السنوي",
      title_en: "Annual Retinopathy Screening",
      doctor_ar: "د. فهد الغامدي",
      doctor_en: "Dr. Fahad Al-Ghamdi",
      facility_ar: "عيادة العيون التخصصية",
      facility_en: "Ophthalmology Clinic",
      date_ar: "١٥ يناير ٢٠٢٥",
      date_en: "15 Jan 2025",
      time_ar: "٠٩:٠٠ صباحاً",
      time_en: "9:00 AM",
      status: "completed" as const,
      statusText_ar: "مكتمل",
      statusText_en: "Completed",
    },
  ];

  const list = activeTab === "upcoming" ? upcomingAppointments : pastAppointments;

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "مواعيدي" : "My Appointments"}
        subtitle={
          isRtl
            ? "مركز السكري والغدد الصماء"
            : "Diabetes & Endocrinology Center"
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        theme="purple"
        watermark={<AppleEmoji name="calendar" size={80} />}
        rightAction={
          <button
            type="button"
            onClick={() => router.push("/chat")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isRtl ? "حجز" : "Book"}</span>
          </button>
        }
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-4">
        {/* Tab Segment Controls */}
        <div className="grid grid-cols-2 p-1 rounded-full bg-brand-card border border-brand-border">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === "upcoming"
                ? "bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue text-white shadow-md shadow-brand-blue/20"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isRtl ? "المواعيد القادمة" : "Upcoming"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={cn(
              "py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === "past"
                ? "bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue text-white shadow-md shadow-brand-blue/20"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isRtl ? "السابقة" : "Past"}
          </button>
        </div>

        {/* Appointment Cards List */}
        <div className="space-y-3 pt-1">
          {list.map((apt) => (
            <AppointmentCard
              key={apt.id}
              title={isRtl ? apt.title_ar : apt.title_en}
              facility={`${isRtl ? apt.doctor_ar : apt.doctor_en} • ${isRtl ? apt.facility_ar : apt.facility_en}`}
              date={isRtl ? apt.date_ar : apt.date_en}
              time={isRtl ? apt.time_ar : apt.time_en}
              status={apt.status}
              statusText={isRtl ? apt.statusText_ar : apt.statusText_en}
              onClick={() => router.push(`/appointments/${apt.id}`)}
            />
          ))}
        </div>

        {/* Book New Appointment CTA Button */}
        <div className="pt-4">
          <PrimaryButton
            onClick={() => router.push("/chat")}
            leftIcon={<Calendar className="w-5 h-5" />}
            fullWidth
            className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/25"
          >
            {isRtl ? "حجز موعد جديد" : "Book New Appointment"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
