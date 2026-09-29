"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { ChatBubbleUser } from "@/components/chat/chat-bubble-user";
import { ChatBubbleAI } from "@/components/chat/chat-bubble-ai";
import { SuggestionChip } from "@/components/chat/suggestion-chip";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { Send, ChevronRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export default function ChatScreen() {
  const locale = useLocale();
  const t = useTranslations("chat");

  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [error, setError] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const conversationIdRef = React.useRef<string | undefined>(undefined);
  const inFlightRef = React.useRef(false);
  const nextMessageIdRef = React.useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend ?? input).trim();
    if (!messageText || inFlightRef.current) return;

    inFlightRef.current = true;
    setError(false);

    const userMessage: Message = {
      id: String(++nextMessageIdRef.current),
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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          language: locale,
          conversationId: conversationIdRef.current,
        }),
      });
      if (!response.ok) throw new Error("Chat request failed");

      const result = (await response.json()) as { conversationId: string; reply: string };
      conversationIdRef.current = result.conversationId;
      const aiMessage: Message = {
        id: String(++nextMessageIdRef.current),
        role: "assistant",
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => prev.filter((message) => message.id !== userMessage.id));
      setInput(messageText);
      setError(true);
    } finally {
      inFlightRef.current = false;
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-[100dvh] max-h-[100dvh] bg-brand-dark text-white relative overflow-hidden select-none pb-[max(4.5rem,calc(3.75rem+env(safe-area-inset-bottom,0px)))]">
      {/* Header */}
      <div className="w-full pt-[max(1.25rem,env(safe-area-inset-top,0px))] px-6 pb-4 flex items-end justify-between bg-gradient-to-b from-brand-teal via-brand-blue to-brand-dark-blue z-20 flex-shrink-0 select-none">
        <div>
          <span className="text-[10px] font-bold leading-3.75 tracking-[1.8px] uppercase text-white/45 mb-0.5">
            {t("brand")}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight truncate">
            {t("title")}
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
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="px-5 pb-2 text-sm text-red-300">
          {t("sendError")}
        </p>
      )}

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
            aria-label={t("placeholder")}
            maxLength={4000}
            disabled={isTyping}
            className="flex-1 bg-transparent border-none text-white text-sm px-4 placeholder:text-slate-400 focus:outline-none"
          />

          <button
            type="submit"
            aria-label={t("send")}
            disabled={!input.trim() || isTyping}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-teal via-brand-blue to-brand-dark-blue text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer rtl:rotate-180 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Persistent Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
