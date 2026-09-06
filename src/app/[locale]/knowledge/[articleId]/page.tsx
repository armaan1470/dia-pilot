"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { Badge } from "@/components/ui/badge";
import { mockArticles } from "@/lib/mocks/articles";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { AppleEmoji } from "@/components/ui/apple-emoji";

interface ArticleDetailPageProps {
  params: Promise<{ articleId: string }>;
}

export default function ArticleDetailScreen({
  params: _paramsPromise,
}: ArticleDetailPageProps) {
  const router = useRouter();
  const routeParams = useParams();
  const articleId = (routeParams?.articleId as string) || "carb-counting-guide";
  const locale = useLocale();
  const isRtl = locale === "ar";

  const article =
    mockArticles.find((a) => a.id === articleId) || mockArticles[0];

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-brand-dark text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "تفاصيل المقال" : "Article Detail"}
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        fallbackHref="/knowledge"
        theme="emerald"
        watermark={<AppleEmoji name="documents" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-4">
        {/* Article Meta */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-brand-card-light text-brand-teal border border-brand-border text-xs px-2.5 py-0.5 rounded-full">
              {isRtl ? article.category_ar : article.category_en}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{isRtl ? article.readTime_ar : article.readTime_en}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {isRtl ? article.title_ar : article.title_en}
          </h1>
        </div>

        {/* Key Takeaways Box */}
        <div className="rounded-lg bg-brand-card border border-brand-border p-4 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isRtl ? "النقاط الرئيسية" : "Key Takeaways"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isRtl ? article.summary_ar : article.summary_en}
          </p>
        </div>

        {/* Body Content */}
        <div className="rounded-lg bg-brand-card border border-brand-border p-5 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>{isRtl ? article.content_ar : article.content_en}</p>

          <p>
            {isRtl
              ? "ينصح دائماً باستشارة الطبيب المعالج أو أخصائي التغذية المعتمد قبل إجراء أي تعديل على نظامك الغذائي أو جرعات العلاج اليومية."
              : "Always consult your physician or certified diabetes educator before adjusting your insulin dosage or meal plans."}
          </p>
        </div>

        {/* Ask AI Contextual Prompt Card */}
        <div
          onClick={() => router.push("/chat")}
          className="mt-6 rounded-lg bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue p-4 flex items-center justify-between shadow-xl shadow-brand-blue/30 cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 p-1 flex items-center justify-center backdrop-blur-md">
              <Image
                src="/mascots/Robo head.png"
                alt="AI Robot"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isRtl ? "هل لديك استفسار حول هذا المقال؟" : "Have questions about this?"}
              </h4>
              <p className="text-[11px] text-cyan-100">
                {isRtl ? "تحدث مع ديا-بايلوت للحصول على إرشاد إضافي" : "Chat with DiaPilot for guidance"}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white text-brand-dark-blue flex items-center justify-center shadow-md rtl:rotate-180">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
