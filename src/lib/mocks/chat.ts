export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content_ar: string;
  content_en: string;
  timestamp: string;
}

export const mockInitialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    content_ar:
      "أهلاً بك يا محمد! أنا ديا-بايلوت، رفيقك الذكي لرعاية السكري. كيف يمكنني مساعدتك اليوم؟",
    content_en:
      "Hello Mohammed! I'm DiaPilot, your smart diabetes companion. How can I assist you today?",
    timestamp: "10:30 AM",
  },
];
