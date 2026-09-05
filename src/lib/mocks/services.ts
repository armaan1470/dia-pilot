export interface ServiceItem {
  id: string;
  name_ar: string;
  name_en: string;
  category: string;
  description_ar: string;
  description_en: string;
  gradient:
    | "cyan"
    | "purple"
    | "orange"
    | "emerald"
    | "pink"
    | "rose"
    | "amber"
    | "blue";
  iconName: string;
  topics: { ar: string; en: string }[];
  contact?: string;
  workingHours?: string;
}

export const mockServices: ServiceItem[] = [
  {
    id: "clinics",
    name_ar: "العيادات",
    name_en: "Clinics",
    category: "clinical",
    description_ar: "حجز واستعراض العيادات المتخصصة لمرضى السكري والغدد الصماء.",
    description_en:
      "Browse specialized clinical departments for diabetes and endocrinology care.",
    gradient: "cyan",
    iconName: "Stethoscope",
    topics: [
      { ar: "استشارات السكري", en: "Diabetes Consultation" },
      { ar: "فحص دوري شامل", en: "Comprehensive Screening" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "8:00 AM - 5:00 PM",
  },
  {
    id: "appointments",
    name_ar: "المواعيد",
    name_en: "Appointments",
    category: "appointments",
    description_ar: "متابعة وإدارة مواعيدك الطبية وجداول المراجعة الدورية.",
    description_en:
      "Manage medical checkups, appointment schedules, and routine reminders.",
    gradient: "purple",
    iconName: "Calendar",
    topics: [
      { ar: "مواعيدي القادمة", en: "Upcoming Appointments" },
      { ar: "سجل المراجعات", en: "Visit History" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "24/7 Portal",
  },
  {
    id: "eye-care",
    name_ar: "العناية بالعيون والبصريات",
    name_en: "Eye Care & Optometry",
    category: "specialized",
    description_ar:
      "فحوصات شبكية العين الدورية لمرضى السكري والوقاية من اعتلال الشبكية.",
    description_en:
      "Regular diabetic retinopathy screening and preventative eye care.",
    gradient: "cyan",
    iconName: "Eye",
    topics: [
      { ar: "فحص قاع العين", en: "Fundus Examination" },
      { ar: "صحة النظر والسكري", en: "Vision Health & Glucose" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "8:00 AM - 4:00 PM",
  },
  {
    id: "foot-care",
    name_ar: "العناية بالقدم السكري",
    name_en: "Diabetic Foot Care",
    category: "specialized",
    description_ar:
      "فحص الأعصاب والتروية الدموية والعناية الوقائية بجروح القدم.",
    description_en:
      "Neuropathy screening, peripheral circulation checks, and wound prevention.",
    gradient: "orange",
    iconName: "Footprints",
    topics: [
      { ar: "فحص الإحساس بالأعصاب", en: "Neuropathy Check" },
      { ar: "العناية اليومية بالقدم", en: "Daily Foot Care" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "8:00 AM - 4:00 PM",
  },
  {
    id: "nutrition",
    name_ar: "التغذية",
    name_en: "Nutrition",
    category: "lifestyle",
    description_ar: "خطط وجبات مخصصة وحساب الكربوهيدرات مع أخصائيي التغذية.",
    description_en:
      "Customized meal planning and carbohydrate counting with certified dietitians.",
    gradient: "emerald",
    iconName: "Apple",
    topics: [
      { ar: "حساب الكربوهيدرات", en: "Carb Counting" },
      { ar: "تخطيط الوجبات الصحية", en: "Healthy Meal Planning" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "9:00 AM - 6:00 PM",
  },
  {
    id: "diabetes-management",
    name_ar: "إدارة السكري",
    name_en: "Diabetes Management",
    category: "education",
    description_ar:
      "برامج التثقيف ومتابعة قراءات السكر وجرعات الأنسولين اليومية.",
    description_en:
      "Educational guidance on monitoring glucose patterns and insulin protocols.",
    gradient: "pink",
    iconName: "Syringe",
    topics: [
      { ar: "قراءات السكر والهدف", en: "Target Glucose Ranges" },
      { ar: "أنواع الأنسولين", en: "Insulin Types & Delivery" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "24/7 Digital Hub",
  },
  {
    id: "oral-health",
    name_ar: "صحة الفم والأسنان",
    name_en: "Oral & Dental Health",
    category: "specialized",
    description_ar:
      "فحوصات اللثة والأسنان المتخصصة للوقاية من التهابات الفم لمرضى السكري.",
    description_en:
      "Gum health monitoring and periodontal care tailored for diabetes patients.",
    gradient: "rose",
    iconName: "Sparkles",
    topics: [
      { ar: "صحة اللثة والسكري", en: "Gum Health & Diabetes" },
      { ar: "الفحص السنوي للأسنان", en: "Annual Dental Screening" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "8:00 AM - 3:00 PM",
  },
  {
    id: "education",
    name_ar: "التثقيف الصحي",
    name_en: "Health Education",
    category: "education",
    description_ar: "مكتبة المعرفة الشاملة ومقالات إرشادية طبية معتمدة.",
    description_en:
      "Comprehensive knowledge library and approved clinical education guides.",
    gradient: "amber",
    iconName: "BookOpen",
    topics: [
      { ar: "أساسيات السكري", en: "Diabetes Fundamentals" },
      { ar: "التعامل مع هبوط السكر", en: "Hypoglycemia Protocols" },
    ],
    contact: "+966 800 123 4567",
    workingHours: "24/7 Access",
  },
];
