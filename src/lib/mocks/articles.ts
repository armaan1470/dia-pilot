export interface ArticleItem {
  id: string;
  title_ar: string;
  title_en: string;
  category_ar: string;
  category_en: string;
  readTime_ar: string;
  readTime_en: string;
  summary_ar: string;
  summary_en: string;
  content_ar: string;
  content_en: string;
}

export const mockArticles: ArticleItem[] = [
  {
    id: "carb-counting-guide",
    title_ar: "دليلك الشامل لحساب الكربوهيدرات لمرضى السكري",
    title_en: "The Comprehensive Guide to Carbohydrate Counting",
    category_ar: "التغذية",
    category_en: "Nutrition",
    readTime_ar: "٥ دقائق قراءة",
    readTime_en: "5 min read",
    summary_ar:
      "تعرف على كيفية قراءة الملصقات الغذائية وحساب حصص الكربوهيدرات بدقة لتحقيق استقرار مستويات السكر.",
    summary_en:
      "Learn how to read food labels and measure carb servings accurately for optimal glycemic stability.",
    content_ar:
      "يعد حساب الكربوهيدرات من أهم المهارات التي تمكن مريض السكري من ضبط جرعات الأنسولين السريع وموازنة الوجبات الغذائية...",
    content_en:
      "Carbohydrate counting is one of the most vital skills enabling people with diabetes to align rapid-acting insulin with their meals...",
  },
  {
    id: "hypoglycemia-prevention",
    title_ar: "علامات هبوط السكر وكيفية التصرف السريع (قاعدة 15-15)",
    title_en: "Recognizing Hypoglycemia & The 15-15 Rule",
    category_ar: "إدارة السكري",
    category_en: "Management",
    readTime_ar: "٤ دقائق قراءة",
    readTime_en: "4 min read",
    summary_ar:
      "خطوات عملية للتعامل مع انخفاض مستوى الجلوكوز في الدم بأمان ودون إفراط في تناول السكريات.",
    summary_en:
      "Practical protocol for treating low blood glucose safely using fast-acting carbohydrates.",
    content_ar:
      "عندما ينخفض سكر الدم إلى أقل من 70 ملغم/ديسيلتر، يجب تناول 15 غراماً من الكربوهيدرات سريعة الامتصاص والانتظار 15 دقيقة لإعادة القياس...",
    content_en:
      "When blood sugar falls below 70 mg/dL, consume 15 grams of fast-acting carbohydrate and wait 15 minutes before re-checking...",
  },
  {
    id: "daily-foot-inspection",
    title_ar: "٥ خطوات يومية لفحص القدمين والوقاية من المضاعفات",
    title_en: "5 Daily Steps for Diabetic Foot Care & Prevention",
    category_ar: "العناية بالقدم",
    category_en: "Foot Care",
    readTime_ar: "٣ دقائق قراءة",
    readTime_en: "3 min read",
    summary_ar:
      "الفحص اليومي بالمرآة، تجفيف ما بين الأصابع، واختيار الأحذية الطبية المناسبة.",
    summary_en:
      "Daily inspection with a mirror, interdigital drying, and selecting protective footwear.",
    content_ar:
      "تساعد العناية اليومية بالقدمين على اكتشاف أي جروح أو احمرار مبكراً وتجنب حدوث تقرحات أو التهابات...",
    content_en:
      "Daily foot examinations help identify micro-cuts, redness, or pressure points before ulcerations develop...",
  },
];
