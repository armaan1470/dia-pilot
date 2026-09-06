"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { PageHeader, HeaderTheme } from "@/components/navigation/page-header";
import { mockServices } from "@/lib/mocks/services";
import { ArrowRight } from "lucide-react";
import { AppleEmoji, type AppleEmojiName } from "@/components/ui/apple-emoji";

interface TopicItem {
  id: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
}

interface CategoryConfig {
  theme: HeaderTheme;
  emojiName: AppleEmojiName;
  numberColor: string;
  arrowPillClass: string;
  arrowIconClass: string;
  aiGradient: string;
  quoteBanner?: {
    quote_en: string;
    quote_ar: string;
    sub_en: string;
    sub_ar: string;
  };
  topics: TopicItem[];
}

const categoryData: Record<string, CategoryConfig> = {
  clinics: {
    theme: "cyan",
    emojiName: "stethoscope",
    numberColor: "text-cyan-400",
    arrowPillClass: "bg-cyan-500/15 border-cyan-500/25 group-hover:bg-cyan-500/25",
    arrowIconClass: "text-cyan-400",
    aiGradient: "from-brand-teal via-brand-cyan to-brand-blue",
    topics: [
      {
        id: "01",
        title_ar: "عيادة السكري",
        title_en: "Diabetes Clinic",
        desc_ar: "إدارة السكري من النوع 1 والنوع 2",
        desc_en: "Type 1 & Type 2 management",
      },
      {
        id: "02",
        title_ar: "عيادة الغدد الصماء",
        title_en: "Endocrinology Clinic",
        desc_ar: "أخصائيو الهرمونات والغدة الدرقية",
        desc_en: "Hormonal health specialists",
      },
      {
        id: "03",
        title_ar: "عيادة القدم السكري",
        title_en: "Diabetic Foot Clinic",
        desc_ar: "العناية بالجروح والوقاية",
        desc_en: "Wound care & prevention",
      },
      {
        id: "04",
        title_ar: "عيادة العيون",
        title_en: "Ophthalmology Clinic",
        desc_ar: "فحص قاع العين وصحة الإبصار",
        desc_en: "Eye health & retinal screening",
      },
      {
        id: "05",
        title_ar: "عيادة البصريات",
        title_en: "Optometry Clinic",
        desc_ar: "قياس حدة النظر والفحص الدوري",
        desc_en: "Vision testing & eyeglasses",
      },
      {
        id: "06",
        title_ar: "التغذية العلاجية",
        title_en: "Clinical Nutrition",
        desc_ar: "خطط غذائية مخصصة وحساب الكربوهيدرات",
        desc_en: "Personalised dietary counseling",
      },
      {
        id: "07",
        title_ar: "التثقيف والتوعية الصحية",
        title_en: "Health Education",
        desc_ar: "دورات، مقاطع توعوية وكتيبات إرشادية",
        desc_en: "Courses, videos & brochures",
      },
      {
        id: "08",
        title_ar: "صحة الفم والأسنان",
        title_en: "Oral & Dental Health",
        desc_ar: "علاج اللثة والفحص الوقائي لمرضى السكري",
        desc_en: "Gum disease & dental care",
      },
    ],
  },

  appointments: {
    theme: "purple",
    emojiName: "calendar",
    numberColor: "text-indigo-400",
    arrowPillClass: "bg-indigo-500/15 border-indigo-500/25 group-hover:bg-indigo-500/25",
    arrowIconClass: "text-indigo-400",
    aiGradient: "from-[#A78BFA] to-[#3730A3]",
    topics: [
      {
        id: "01",
        title_ar: "حجز موعد جديد",
        title_en: "Book an appointment",
        desc_ar: "جدولة زيارة طبية جديدة في العيادة",
        desc_en: "Schedule a new visit",
      },
      {
        id: "02",
        title_ar: "إعادة جدولة موعد",
        title_en: "Reschedule an appointment",
        desc_ar: "تعديل موعد حجز سابق بسهولة",
        desc_en: "Change an existing booking",
      },
      {
        id: "03",
        title_ar: "إلغاء موعد",
        title_en: "Cancel an appointment",
        desc_ar: "إلغاء حجز زيارة قادمة",
        desc_en: "Cancel an upcoming visit",
      },
      {
        id: "04",
        title_ar: "الاستفسار عن المواعيد",
        title_en: "Appointment inquiries",
        desc_ar: "تساؤلات واستفسارات حول حجزك الحالي",
        desc_en: "Questions about your booking",
      },
    ],
  },

  "eye-care": {
    theme: "teal",
    emojiName: "eye",
    numberColor: "text-teal-400",
    arrowPillClass: "bg-teal-500/15 border-teal-500/25 group-hover:bg-teal-500/25",
    arrowIconClass: "text-teal-400",
    aiGradient: "from-[#06B6D4] via-[#0891B2] to-[#0E7490]",
    topics: [
      {
        id: "01",
        title_ar: "متى أحتاج فحص العين؟",
        title_en: "When do I need an eye examination?",
        desc_ar: "إرشادات الفحص الدوري لمرضى السكري",
        desc_en: "Frequency guidelines for diabetics",
      },
      {
        id: "02",
        title_ar: "فحص الشبكية السنوي",
        title_en: "Retinal screening",
        desc_ar: "الكشف المبكر عن اعتلال الشبكية السكري",
        desc_en: "Diabetic retinopathy detection",
      },
      {
        id: "03",
        title_ar: "بصريات الأطفال",
        title_en: "Pediatric optometry",
        desc_ar: "صحة عيون الأطفال المصابين بالسكري",
        desc_en: "Children's eye health",
      },
      {
        id: "04",
        title_ar: "النظارات الطبية",
        title_en: "Eyeglasses",
        desc_ar: "فحص قياس النظر والوصفات الطبية",
        desc_en: "Prescriptions & frames",
      },
      {
        id: "05",
        title_ar: "مشاكل واضطرابات الرؤية",
        title_en: "Vision problems",
        desc_ar: "ضبابية الرؤية والأعراض الطارئة",
        desc_en: "Blurry vision & other concerns",
      },
    ],
  },

  "foot-care": {
    theme: "orange",
    emojiName: "foot",
    numberColor: "text-orange-400",
    arrowPillClass: "bg-orange-500/15 border-orange-500/25 group-hover:bg-orange-500/25",
    arrowIconClass: "text-orange-400",
    aiGradient: "from-[#FB923C] via-[#EA580C] to-[#C2410C]",
    topics: [
      {
        id: "01",
        title_ar: "تقييم مخاطر القدم",
        title_en: "Risk assessment",
        desc_ar: "فحص الحالة الصحية العامة للقدم",
        desc_en: "Check your foot health status",
      },
      {
        id: "02",
        title_ar: "العناية اليومية بالقدم",
        title_en: "Daily foot care",
        desc_ar: "نصائح الفحص المنزلي والنظافة",
        desc_en: "Inspection & hygiene tips",
      },
      {
        id: "03",
        title_ar: "العناية بالجروح والتقرحات",
        title_en: "Wound care",
        desc_ar: "علاج الجروح والوقاية من المضاعفات",
        desc_en: "Treatment for cuts & ulcers",
      },
      {
        id: "04",
        title_ar: "الأحذية والفرشات الطبية",
        title_en: "Medical footwear",
        desc_ar: "أحذية مخصصة لحماية القدم السكري",
        desc_en: "Diabetic-friendly shoes & insoles",
      },
      {
        id: "05",
        title_ar: "متى تجب زيارة العيادة؟",
        title_en: "When should I visit the clinic?",
        desc_ar: "العلامات التحذيرية التي تتطلب تدخلاً عاجلاً",
        desc_en: "Warning signs to watch for",
      },
    ],
  },

  nutrition: {
    theme: "emerald",
    emojiName: "apple",
    numberColor: "text-emerald-400",
    arrowPillClass: "bg-emerald-500/15 border-emerald-500/25 group-hover:bg-emerald-500/25",
    arrowIconClass: "text-emerald-400",
    aiGradient: "from-[#34D399] via-[#10B981] to-[#059669]",
    topics: [
      {
        id: "01",
        title_ar: "خطط غذائية مخصصة",
        title_en: "Personalised meal plans",
        desc_ar: "مصممة وفق أهدافك الصحية وجرعاتك",
        desc_en: "Tailored to your health goals",
      },
      {
        id: "02",
        title_ar: "حساب الكربوهيدرات",
        title_en: "Carbohydrate counting",
        desc_ar: "ضبط مستويات السكر عبر إدارة الوجبات",
        desc_en: "Managing blood sugar through diet",
      },
      {
        id: "03",
        title_ar: "توصيات وجبات صحية",
        title_en: "Healthy meal recommendations",
        desc_ar: "وصفات غذائية مناسبة لمرضى السكري",
        desc_en: "Diabetes-friendly recipes",
      },
      {
        id: "04",
        title_ar: "إدارة والتحكم بالوزن",
        title_en: "Weight management",
        desc_ar: "الوصول للوزن المثالي لضبط السكر",
        desc_en: "Healthy weight for diabetes control",
      },
    ],
  },

  "diabetes-management": {
    theme: "pink",
    emojiName: "syringe",
    numberColor: "text-pink-400",
    arrowPillClass: "bg-pink-500/15 border-pink-500/25 group-hover:bg-pink-500/25",
    arrowIconClass: "text-pink-400",
    aiGradient: "from-[#EC4899] via-[#D946EF] to-[#9333EA]",
    topics: [
      {
        id: "01",
        title_ar: "هبوط السكر (Hypoglycemia)",
        title_en: "Low blood sugar (Hypoglycemia)",
        desc_ar: "الأعراض والأسباب والعلاج الفوري",
        desc_en: "Signs, causes & treatment",
      },
      {
        id: "02",
        title_ar: "ارتفاع السكر (Hyperglycemia)",
        title_en: "High blood sugar (Hyperglycemia)",
        desc_ar: "كيفية التعامل مع ارتفاع القراءات",
        desc_en: "Managing elevated glucose",
      },
      {
        id: "03",
        title_ar: "الأنسولين وطرق الحقن",
        title_en: "Insulin",
        desc_ar: "الأنواع، الحفظ وطرق الحقن الصحيحة",
        desc_en: "Types, storage & administration",
      },
      {
        id: "04",
        title_ar: "مضخة الأنسولين",
        title_en: "Insulin pump",
        desc_ar: "طريقة عمل المضخة والضخ المستمر",
        desc_en: "Continuous subcutaneous delivery",
      },
      {
        id: "05",
        title_ar: "حساس قياس السكر المستمر (CGM)",
        title_en: "Continuous Glucose Monitor (CGM)",
        desc_ar: "متابعة قراءات السكر لحظياً",
        desc_en: "Real-time glucose tracking",
      },
      {
        id: "06",
        title_ar: "السكر التراكمي (HbA1c)",
        title_en: "HbA1c",
        desc_ar: "معدل السكر لثلاثة أشهر وأهدافه",
        desc_en: "3-month average blood glucose",
      },
    ],
  },

  "oral-health": {
    theme: "rose",
    emojiName: "tooth",
    numberColor: "text-rose-400",
    arrowPillClass: "bg-rose-500/15 border-rose-500/25 group-hover:bg-rose-500/25",
    arrowIconClass: "text-rose-400",
    aiGradient: "from-[#FB7185] via-[#F43F5E] to-[#E11D48]",
    topics: [
      {
        id: "01",
        title_ar: "أمراض اللثة والأسنان",
        title_en: "Gum disease",
        desc_ar: "التهابات اللثة وعلاقتها بالسكري",
        desc_en: "Periodontitis & the diabetes link",
      },
      {
        id: "02",
        title_ar: "العناية بصحة الفم",
        title_en: "Oral hygiene",
        desc_ar: "طرق تنظيف الأسنان بالفرشاة والخيط",
        desc_en: "Brushing, flossing & care tips",
      },
      {
        id: "03",
        title_ar: "مواعيد فحص الأسنان",
        title_en: "Dental appointments",
        desc_ar: "حجز فحص وقائي دوري لدى طبيب الأسنان",
        desc_en: "Book a dental checkup",
      },
    ],
  },

  education: {
    theme: "amber",
    emojiName: "books",
    numberColor: "text-amber-400",
    arrowPillClass: "bg-amber-500/15 border-amber-500/25 group-hover:bg-amber-500/25",
    arrowIconClass: "text-amber-400",
    aiGradient: "from-[#F59E0B] via-[#EA580C] to-[#D97706]",
    topics: [
      {
        id: "01",
        title_ar: "مقاطع فيديو تعليمية",
        title_en: "Educational videos",
        desc_ar: "شاهد وتعلّم بخطوات مبسطة",
        desc_en: "Watch & learn at your own pace",
      },
      {
        id: "02",
        title_ar: "كتيبات ومصادر PDF",
        title_en: "PDF resources",
        desc_ar: "أدلة تثقيفية قابلة للتحميل",
        desc_en: "Downloadable patient guides",
      },
      {
        id: "03",
        title_ar: "منشورات توعوية سريعة",
        title_en: "Educational brochures",
        desc_ar: "مطويات وإرشادات موجزة",
        desc_en: "Quick reference materials",
      },
      {
        id: "04",
        title_ar: "الدورات والبرامج التثقيفية",
        title_en: "Courses",
        desc_ar: "برامج تدريبية معتمدة لمرضى السكري",
        desc_en: "Structured learning programmes",
      },
      {
        id: "05",
        title_ar: "الأسئلة الشائعة",
        title_en: "Frequently Asked Questions",
        desc_ar: "إجابات الخبراء عن تساؤلات السكري",
        desc_en: "Common diabetes questions answered",
      },
    ],
  },

  living: {
    theme: "violet",
    emojiName: "purple_heart",
    numberColor: "text-purple-400",
    arrowPillClass: "bg-purple-500/15 border-purple-500/25 group-hover:bg-purple-500/25",
    arrowIconClass: "text-purple-400",
    aiGradient: "from-[#A855F7] via-[#9333EA] to-[#7E22CE]",
    quoteBanner: {
      quote_en: "I'm feeling anxious about living with diabetes.",
      quote_ar: "أشعر بالقلق حيال التعايش مع السكري.",
      sub_en: "Share how you're feeling — our AI is here to listen.",
      sub_ar: "شاركنا ما تشعر به — مساعدنا الذكي جاهز للاستماع إليك.",
    },
    topics: [
      {
        id: "01",
        title_ar: "التأقلم والتعايش مع السكري",
        title_en: "Coping with diabetes",
        desc_ar: "بناء المرونة النفسية يوماً بعد يوم",
        desc_en: "Building resilience day by day",
      },
      {
        id: "02",
        title_ar: "الدعم النفسي والعاطفي",
        title_en: "Emotional & psychological support",
        desc_ar: "لست وحدك في مواجهة هذا التحدي",
        desc_en: "You don't have to face this alone",
      },
      {
        id: "03",
        title_ar: "حياة مفعمة بالحيوية مع السكري",
        title_en: "Living well with diabetes",
        desc_ar: "تحقيق جودة الحياة والتفوق",
        desc_en: "Thriving, not just managing",
      },
      {
        id: "04",
        title_ar: "السكري في البيئة المدرسية",
        title_en: "Managing diabetes at school",
        desc_ar: "إرشادات للأطفال واليافعين والمعلمين",
        desc_en: "For children & young adults",
      },
      {
        id: "05",
        title_ar: "السفر والرحلات مع السكري",
        title_en: "Travelling with diabetes",
        desc_ar: "إرشادات الأمان وحمل الأدوية أثناء السفر",
        desc_en: "Stay safe while you explore the world",
      },
      {
        id: "06",
        title_ar: "النشاط البدني والرياضة",
        title_en: "Physical activity & exercise",
        desc_ar: "أهمية الحركة المنتظمة وتأثيرها على السكر",
        desc_en: "Move well, live well",
      },
      {
        id: "07",
        title_ar: "السكري في شهر رمضان المبارك",
        title_en: "Managing diabetes during Ramadan",
        desc_ar: "الصيام الآمن بإشراف وتوجيهات طبية",
        desc_en: "Fasting safely with expert guidance",
      },
    ],
  },

  support: {
    theme: "slate",
    emojiName: "handset",
    numberColor: "text-slate-300",
    arrowPillClass: "bg-slate-500/15 border-slate-500/25 group-hover:bg-slate-500/25",
    arrowIconClass: "text-slate-300",
    aiGradient: "from-[#64748B] via-[#475569] to-[#334155]",
    topics: [
      {
        id: "01",
        title_ar: "ساعات وأيام العمل",
        title_en: "Working hours",
        desc_ar: "أوقات تقديم الخدمات الطبية والإدارية",
        desc_en: "When we're available",
      },
      {
        id: "02",
        title_ar: "مواقع العيادات والمراكز",
        title_en: "Clinic locations",
        desc_ar: "عناوين المراكز التخصصية وأقرب فرع لك",
        desc_en: "Find a center near you",
      },
      {
        id: "03",
        title_ar: "تقديم الشكاوى والملاحظات",
        title_en: "Complaints",
        desc_ar: "صوتك مسموع لتحسين جودة الرعاية",
        desc_en: "Share your concerns",
      },
      {
        id: "04",
        title_ar: "المقترحات والأفكار التطويرية",
        title_en: "Suggestions",
        desc_ar: "شاركنا أفكارك لتطوير تجربة المريض",
        desc_en: "Help us improve our service",
      },
      {
        id: "05",
        title_ar: "بيانات وقنوات التواصل",
        title_en: "Contact information",
        desc_ar: "أرقام الهاتف، البريد الإلكتروني وخدمة العملاء",
        desc_en: "Phone, email & more",
      },
      {
        id: "06",
        title_ar: "النماذج والاستمارات الطبية",
        title_en: "Forms",
        desc_ar: "نماذج التسجيل والموافقات الطبية المعتمدة",
        desc_en: "Patient registration & consent",
      },
      {
        id: "07",
        title_ar: "الخدمات الإلكترونية الذكية",
        title_en: "Electronic services",
        desc_ar: "البوابة الرقمية والخدمات الذاتية",
        desc_en: "Online portal & digital tools",
      },
    ],
  },
};

interface ServiceDetailPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function ServiceDetailScreen({
  params: _paramsPromise,
}: ServiceDetailPageProps) {
  const router = useRouter();
  const routeParams = useParams();
  const serviceId = (routeParams?.serviceId as string) || "clinics";
  const locale = useLocale();
  const isRtl = locale === "ar";

  const service =
    mockServices.find((s) => s.id === serviceId) || mockServices[0];

  const config = categoryData[serviceId] || categoryData.clinics;
  const topicsList = config.topics;

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Appbar Header matching CategoryScreen Figma */}
      <PageHeader
        title={isRtl ? service.name_ar : service.name_en}
        subtitle={
          isRtl
            ? `${topicsList.length} مواضيع متاحة`
            : `${topicsList.length} topics available`
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/services"
        theme={config.theme}
        watermark={<AppleEmoji name={config.emojiName} size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-3 pt-4">
        {/* Optional Emotional Support Quote Banner (e.g. for Living with Diabetes) */}
        {config.quoteBanner && (
          <div className="w-full rounded-lg bg-white/5 border border-purple-500/20 p-3.5 mb-1 backdrop-blur-sm">
            <p className="text-xs text-purple-300 font-semibold flex items-center gap-1.5 leading-snug">
              <span>💜</span>
              <span>
                &ldquo;{isRtl ? config.quoteBanner.quote_ar : config.quoteBanner.quote_en}&rdquo;
              </span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1 pl-4 rtl:pl-0 rtl:pr-4">
              {isRtl ? config.quoteBanner.sub_ar : config.quoteBanner.sub_en}
            </p>
          </div>
        )}

        {/* Topics List Items */}
        <div className="space-y-2.5">
          {topicsList.map((topic) => (
            <div
              key={topic.id}
              onClick={() => router.push("/chat")}
              className="w-full rounded-lg bg-brand-card hover:bg-brand-card-light border border-white/5 hover:border-brand-teal/40 flex items-stretch cursor-pointer active:scale-[0.99] transition-all shadow-sm group overflow-hidden"
            >
              {/* Left Number Section with full-height border */}
              <div
                className={`w-13 shrink-0 flex items-center justify-center border-r border-white/10 rtl:border-r-0 rtl:border-l text-sm font-bold tracking-tight ${config.numberColor}`}
              >
                {topic.id}
              </div>

              {/* Right Content Section */}
              <div className="flex-1 p-3.5 pl-4 rtl:pl-3.5 rtl:pr-4 flex items-center justify-between gap-3 min-w-0">
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white leading-tight truncate">
                    {isRtl ? topic.title_ar : topic.title_en}
                  </h4>
                  <span className="text-xs text-slate-400 mt-0.5 truncate font-normal">
                    {isRtl ? topic.desc_ar : topic.desc_en}
                  </span>
                </div>

                {/* Smaller circular arrow button styled according to category */}
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 rtl:rotate-180 transition-colors ${config.arrowPillClass}`}
                >
                  <ArrowRight className={`w-3.5 h-3.5 ${config.arrowIconClass}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ask AI Assistant Card */}
        <div
          onClick={() => router.push("/chat")}
          className={`rounded-lg bg-gradient-to-br ${config.aiGradient} p-3.5 flex items-center justify-between shadow-lg cursor-pointer active:scale-[0.98] transition-all mt-4`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 p-1 flex items-center justify-center backdrop-blur-md flex-shrink-0">
              <Image
                src="/mascots/Robo head.png"
                alt="AI Robot"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white leading-tight truncate">
                {isRtl ? "اسأل المساعد الذكي" : "Ask AI Assistant"}
              </h4>
              <p className="text-xs text-white/90 font-medium mt-0.5 truncate">
                {isRtl
                  ? "احصل على إجابات فورية مخصصة"
                  : "Get personalised answers instantly"}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white flex-shrink-0 rtl:rotate-180 shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}


