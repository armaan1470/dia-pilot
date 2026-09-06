"use client";

import * as React from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ChatBubbleUser } from "@/components/chat/chat-bubble-user";
import { ChatBubbleAI } from "@/components/chat/chat-bubble-ai";
import { SuggestionChip } from "@/components/chat/suggestion-chip";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { Send, Mic, ChevronRight, Stethoscope } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  actionCard?: {
    title: string;
    href: string;
  };
}

export default function ChatScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("chat");
  const isRtl = locale === "ar";

  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = isRtl
        ? "بالنسبة لآلام القدم المرتبطة بالسكري، التقييم المبكر أمر بالغ الأهمية حيث يمكن أن تتطور المضاعفات بسرعة. يمكنني مساعدتك في حجز موعد مع عيادة القدم السكري لدينا — هل ترغب في التحقق من الأوقات المتاحة؟"
        : "For foot pain related to diabetes, early assessment is important. Diabetic foot complications can develop quickly. I can help you book an appointment with our Diabetic Foot Clinic — would you like to check available slots?";

      let actionCard = {
        title: isRtl ? "عيادة العناية بالقدم السكري" : "Diabetic Foot Care Clinic",
        href: "/services/foot-care",
      };

      if (messageText.includes("appointment") || messageText.includes("موعد")) {
        aiReply = isRtl
          ? "يسعدني مساعدتك في توجيهك إلى المواعيد الطبية المعتمدة. يمكنك استعراض العيادات المتوفرة واختيار الوقت المناسب لك."
          : "I would be glad to help guide your appointments. You can explore available specialized clinics and official booking schedules.";
        actionCard = {
          title: isRtl ? "استعراض المواعيد" : "Explore Appointments",
          href: "/services/appointments",
        };
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        actionCard,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex flex-col flex-1 h-[100dvh] max-h-[100dvh] bg-brand-dark text-white relative overflow-hidden select-none pb-[max(4.5rem,calc(3.75rem+env(safe-area-inset-bottom,0px)))]">
      {/* Header */}
      <div className="w-full pt-[max(1.25rem,env(safe-area-inset-top,0px))] px-6 pb-4 flex items-end justify-between bg-gradient-to-b from-brand-teal via-brand-blue to-brand-dark-blue z-20 flex-shrink-0 select-none">
        <div>
          <span className="text-[10px] font-bold leading-3.75 tracking-[1.8px] uppercase text-white/45 mb-0.5">
            {isRtl ? "ديا - بايلوت" : "DIAPILOT"}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight truncate">
            {isRtl ? "المساعد الذكي" : "AI Assistant"}
          </h1>
        </div>

        <div className="w-11 h-11 rounded-full bg-[#003989A6] p-1 flex items-center justify-center">
          <Image
            src="/mascots/Robo head.png"
            alt="DiaPilot Assistant"
            width={34}
            height={34}
            className="object-contain mb-1"
          />
        </div>
      </div>

      {/* Main Conversation / Greeting View */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-3 pb-3 flex flex-col justify-start">
        {messages.length === 0 ? (
          /* Empty / Initial State */
          <div className="flex flex-col items-center text-center my-auto py-4 gap-4">
            {/* Centered Robot Mascot */}
            <div className="relative size-[100px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,#4794FF_0%,#091A32_100%)] flex items-center justify-center animate-pulse">
              <Image
                src="/mascots/Robo head.png"
                alt="DiaPilot Mascot"
                width={76}
                height={76}
                className="object-contain mb-1.5"
                priority
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">{t("greeting")}</h2>
              <p className="text-xs sm:text-sm text-slate-300">{t("subtitle")}</p>
            </div>

            {/* Sample Prompt Box */}
            <div className="w-full max-w-sm rounded-lg bg-brand-card border border-brand-border p-3.5 text-xs text-slate-300 italic shadow-inner">
              {t("samplePrompt")}
            </div>

            <p className="text-xs text-slate-400 max-w-xs">{t("promptHint")}</p>

            {/* Suggestion Chips */}
            <div className="w-full max-w-sm flex flex-col gap-2 pt-1">
              <SuggestionChip
                label={t("suggestion1")}
                onClick={() => handleSendMessage(t("suggestion1"))}
                icon={<ChevronRight className="w-4 h-4 rtl:rotate-180" />}
              />
              <SuggestionChip
                label={t("suggestion2")}
                onClick={() => handleSendMessage(t("suggestion2"))}
                icon={<ChevronRight className="w-4 h-4 rtl:rotate-180" />}
              />
            </div>
          </div>
        ) : (
          /* Message List */
          <div className="flex flex-col gap-3 py-2">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col w-full">
                {msg.role === "user" ? (
                  <ChatBubbleUser
                    message={msg.content}
                    timestamp={msg.timestamp}
                  />
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    <ChatBubbleAI
                      message={msg.content}
                      timestamp={msg.timestamp}
                    />

                    {/* Integrated Service Action Card */}
                    {msg.actionCard && (
                      <div className="ms-10 me-auto max-w-[85%]">
                        <Link
                          href={msg.actionCard.href}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg bg-brand-card hover:bg-brand-card-light border border-brand-border text-brand-teal text-xs font-semibold shadow-md transition-all active:scale-[0.98]"
                        >
                          <div className="flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-brand-teal" />
                            <span>{msg.actionCard.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 rtl:rotate-180 text-brand-teal" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar (Sits directly in flex layout above bottom nav) */}
      <div className="w-full px-4 py-2 mb-4 z-30 bg-brand-dark/95 backdrop-blur-md flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center w-full bg-brand-input border border-brand-border rounded-lg p-1.5 shadow-2xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent border-none text-white text-sm px-4 placeholder:text-slate-400 focus:outline-none"
          />

          {input.trim() ? (
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer rtl:rotate-180"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

      {/* Persistent Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
