"use client";

import * as React from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { PageHeader } from "@/components/navigation/page-header";
import { SearchInput } from "@/components/inputs/search-input";
import { ArticleCard } from "@/components/cards/article-card";
import { mockArticles } from "@/lib/mocks/articles";
import { cn } from "@/lib/utils";
import { AppleEmoji, type AppleEmojiName } from "@/components/ui/apple-emoji";

export default function KnowledgeHomeScreen() {
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const categories: { key: string; icon: AppleEmojiName; label_ar: string; label_en: string }[] = [
    { key: "all", icon: "documents", label_ar: "الكل", label_en: "All" },
    { key: "nutrition", icon: "apple", label_ar: "التغذية", label_en: "Nutrition" },
    { key: "management", icon: "syringe", label_ar: "إدارة السكري", label_en: "Management" },
    { key: "foot", icon: "foot", label_ar: "العناية بالقدم", label_en: "Foot Care" },
  ];

  const filteredArticles = mockArticles.filter((article) => {
    const title = isRtl ? article.title_ar : article.title_en;
    const summary = isRtl ? article.summary_ar : article.summary_en;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-[#070F1E] text-white relative overflow-y-auto no-scrollbar select-none pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Top Header */}
      <PageHeader
        title={isRtl ? "مكتبة التثقيف الصحي" : "My Documents"}
        subtitle={
          isRtl
            ? "مقالات وأدلة طبية معتمدة لإدارة السكري"
            : "Approved educational guides for diabetes care"
        }
        brandTag={isRtl ? "ديا - بايلوت" : "DIAPILOT"}
        showBack={true}
        theme="emerald"
        watermark={<AppleEmoji name="documents" size={80} />}
      />

      {/* Main Content Area */}
      <div className="px-5 space-y-4 pt-3">
        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          placeholder={isRtl ? "ابحث في المقالات..." : "Search articles..."}
        />

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer inline-flex items-center gap-1.5",
                selectedCategory === cat.key
                  ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20"
                  : "bg-[#132238] border-[#1E3557] text-slate-300 hover:border-slate-600"
              )}
            >
              <AppleEmoji name={cat.icon} size={14} />
              <span>{isRtl ? cat.label_ar : cat.label_en}</span>
            </button>
          ))}
        </div>

        {/* Article Cards List */}
        <div className="space-y-3 pt-2">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={isRtl ? article.title_ar : article.title_en}
              category={isRtl ? article.category_ar : article.category_en}
              readTime={isRtl ? article.readTime_ar : article.readTime_en}
              summary={isRtl ? article.summary_ar : article.summary_en}
              onClick={() => router.push(`/knowledge/${article.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
