"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { AppleEmoji } from "@/components/ui/apple-emoji";

interface AppointmentDetailPageProps {
  params: Promise<{ appointmentId: string }>;
}

export default function AppointmentDetailScreen({
  params,
}: AppointmentDetailPageProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [appointmentId, setAppointmentId] = React.useState("apt-1");

  React.useEffect(() => {
    params.then((p) => setAppointmentId(p.appointmentId));
  }, [params]);

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "تفاصيل الموعد" : "Appointment Details"}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/appointments"
        theme="purple"
        watermark={<AppleEmoji name="calendar" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-4">
        {/* Main Appointment Summary Card */}
        <div className="rounded-lg bg-brand-card border border-brand-border p-5 space-y-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black text-white">
                {isRtl ? "عيادة السكري والغدد الصماء" : "Diabetes Clinic"}
              </h2>
              <span className="text-xs text-slate-400">
                {isRtl ? "رقم الحجز: #DP-89241" : "Ref ID: #DP-89241"}
              </span>
            </div>
            <Badge className="bg-emerald-950/80 text-emerald-300 border border-emerald-700/40 text-xs px-3 py-1 rounded-full">
              {isRtl ? "مؤكد" : "Confirmed"}
            </Badge>
          </div>

          <div className="space-y-3 pt-2 border-t border-brand-border/40 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-card-light border border-brand-border flex items-center justify-center text-brand-teal">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">
                  {isRtl ? "الطبيب المعالج" : "Attending Physician"}
                </span>
                <span className="font-bold text-white">
                  {isRtl ? "د. سارة العتيبي" : "Dr. Sarah Al-Otaibi"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-card-light border border-brand-border flex items-center justify-center text-brand-teal">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">
                  {isRtl ? "التاريخ والوقت" : "Date & Time"}
                </span>
                <span className="font-bold text-white">
                  {isRtl ? "الإثنين، ٢١ يوليو ٢٠٢٥ • ١٠:٣٠ ص" : "Mon, 21 Jul 2025 • 10:30 AM"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-card-light border border-brand-border flex items-center justify-center text-brand-teal">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">
                  {isRtl ? "الموقع والعيادة" : "Location & Department"}
                </span>
                <span className="font-bold text-white">
                  {isRtl
                    ? "مستشفى الملك فهد التخصصي — مبنى العيادات، الطابق ٢"
                    : "King Fahad Specialist Hospital — Clinics Bldg, Floor 2"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Instructions Card */}
        <div className="rounded-lg bg-brand-card border border-brand-border p-4 space-y-2">
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>{isRtl ? "تعليمات التحضير للموعد" : "Appointment Preparation"}</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
            <li>
              {isRtl
                ? "الصيام لمدة ٨ ساعات قبل الموعد لإجراء فحص السكر التراكمي ومستوى الجلوكوز في الدم."
                : "Fasting 8 hours prior to the appointment for HbA1c and fasting blood glucose test."}
            </li>
            <li>
              {isRtl
                ? "إحضار سجل قراءات سكر الدم للأسبوعين الأخيرين."
                : "Bring your glucose monitoring log for the last two weeks."}
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <PrimaryButton
            onClick={() => router.push("/chat")}
            fullWidth
          >
            {isRtl ? "تعديل أو استفسار عبر المساعد الذكي" : "Reschedule via AI Assistant"}
          </PrimaryButton>

          <SecondaryButton
            onClick={() => router.push("/appointments")}
            fullWidth
          >
            {isRtl ? "العودة إلى المواعيد" : "Back to Appointments"}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
