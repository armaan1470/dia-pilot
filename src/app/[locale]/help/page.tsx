"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";

export default function HelpScreen() {
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const faqs = [
    {
      id: "faq-1",
      q_ar: "كيف يمكنني حجز موعد طبي في العيادة؟",
      q_en: "How do I book an appointment?",
      a_ar: "يمكنك استعراض العيادات المتخصصة واختيار اليوم والوقت المناسب من خلال قسم المواعيد أو التحدث مباشرة مع المساعد الذكي لتسهيل الحجز.",
      a_en: "You can browse specialized clinical departments and choose your preferred slot via the Appointments section, or ask DiaPilot AI to guide you.",
    },
    {
      id: "faq-2",
      q_ar: "ماذا أفعل إذا كان مستوى سكر الدم مرتفعاً جداً؟",
      q_en: "What should I do if my blood sugar is very high?",
      a_ar: "إذا كان سكر الدم أعلى من 250 ملغم/ديسيلتر مصحوباً بغثيان أو ضيق في التنفس، يرجى التوجه فوراً لأقرب قسم طوارئ أو الاتصال بالهلال الأحمر على الرقم 997.",
      a_en: "If blood glucose exceeds 250 mg/dL with nausea, ketones, or shortness of breath, seek emergency medical care immediately or call 997.",
    },
    {
      id: "faq-3",
      q_ar: "هل يمكنني التحدث مع أخصائي رعاية بشري؟",
      q_en: "Can I speak to a real person?",
      a_ar: "نعم، يمكنك الاتصال بفريق الدعم الطبي خلال ساعات العمل الرسمية عبر الرقم المجاني 800 123 4567.",
      a_en: "Yes, you can reach our licensed nursing support team during business hours at 800 123 4567.",
    },
    {
      id: "faq-4",
      q_ar: "كيف أقوم بتحديث معلوماتي الصحية في التطبيق؟",
      q_en: "How do I update my medical information?",
      a_ar: "يمكنك تعديل بياناتك وتشخيصك الصحي في أي وقت عبر صفحة الملف الشخصي.",
      a_en: "You can review and edit your diagnosis details anytime via the Profile screen.",
    },
    {
      id: "faq-5",
      q_ar: "ما هي ساعات عمل العيادات والمراكز الصحية؟",
      q_en: "What are the clinic working hours?",
      a_ar: "تعمل العيادات التخصصية من الأحد إلى الخميس، من الساعة 7:30 صباحاً وحتى 3:30 مساءً.",
      a_en: "Specialized clinical centers operate Sunday to Thursday, from 7:30 AM to 3:30 PM.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "المساعدة والدعم" : "Help & Support"}
        subtitle={isRtl ? "نحن هنا لمساعدتك" : "We're here for you"}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        variant="gradient"
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-5 pt-4">
        {/* 4 Quick Action Cards (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Chat Now */}
          <div
            onClick={() => router.push("/chat")}
            className="rounded-[22px] bg-gradient-to-br from-[#0094FF] to-[#0056CC] p-4 flex flex-col justify-between h-28 cursor-pointer active:scale-95 transition-all shadow-md"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isRtl ? "المحادثة الفورية" : "Chat Now"}
              </h4>
              <span className="text-[11px] text-cyan-100">
                {isRtl ? "ذكاء اصطناعي • ٢٤/٧" : "AI • 24/7"}
              </span>
            </div>
          </div>

          {/* Call Us */}
          <a
            href="tel:+9668001234567"
            className="rounded-[22px] bg-gradient-to-br from-[#06B6D4] to-[#0284C7] p-4 flex flex-col justify-between h-28 cursor-pointer active:scale-95 transition-all shadow-md"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isRtl ? "اتصل بنا" : "Call Us"}
              </h4>
              <span className="text-[11px] text-cyan-100">
                {isRtl ? "الأحد-الخميس ٧:٣٠-١٥:٣٠" : "Sun–Thu 7:30–15:30"}
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:support@diapilot.sa"
            className="rounded-[22px] bg-gradient-to-br from-[#10B981] to-[#059669] p-4 flex flex-col justify-between h-28 cursor-pointer active:scale-95 transition-all shadow-md"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isRtl ? "البريد الإلكتروني" : "Email"}
              </h4>
              <span className="text-[11px] text-emerald-100">
                {isRtl ? "الرد خلال ٢٤ ساعة" : "Reply within 24h"}
              </span>
            </div>
          </a>

          {/* Visit Us */}
          <div
            onClick={() => router.push("/services/clinics")}
            className="rounded-[22px] bg-[#162842] border border-white/10 p-4 flex flex-col justify-between h-28 cursor-pointer active:scale-95 transition-all shadow-md"
          >
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isRtl ? "زيارة العيادة" : "Visit Us"}
              </h4>
              <span className="text-[11px] text-slate-400">
                {isRtl ? "مواقع العيادات" : "Find the clinic"}
              </span>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase px-1">
            {isRtl ? "الأسئلة الشائعة" : "FREQUENTLY ASKED QUESTIONS"}
          </h3>

          <Accordion className="space-y-2.5">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-2xl bg-[#132238] border border-[#1E3557] px-4 py-1 border-none shadow-sm"
              >
                <AccordionTrigger className="text-xs sm:text-sm font-bold text-white hover:no-underline py-3 text-left rtl:text-right">
                  {isRtl ? faq.q_ar : faq.q_en}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-300 leading-relaxed pb-3 pt-1 border-t border-white/5">
                  {isRtl ? faq.a_ar : faq.a_en}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
