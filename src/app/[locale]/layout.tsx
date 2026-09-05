import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { DesktopOnlyNotice } from "@/components/layout/desktop-only-notice";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DiaPilot — Your Smart Diabetes Companion",
  description: "Bilingual AI-powered diabetes education and health companion.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DiaPilot",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#070F1E",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${cairo.variable} ${inter.variable} min-h-[100dvh] antialiased dark`}
    >
      <body className={`min-h-[100dvh] bg-[#070F1E] text-white flex flex-col font-sans select-none overflow-x-hidden ${isRtl ? "font-cairo" : "font-inter"}`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          
          {/* 1. Desktop & Tablet View (>= 640px / md): Dedicated Banking-Grade M-Site Notice Screen */}
          <DesktopOnlyNotice />

          {/* 2. Mobile View (< 640px / md): Pure Mobile Application Shell */}
          <main className="flex md:hidden flex-col w-full min-h-[100dvh] bg-[#070F1E] relative overflow-x-hidden">
            {children}
          </main>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
