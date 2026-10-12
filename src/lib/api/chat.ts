export interface SendChatMessageParams {
  message: string;
  language: "ar" | "en";
  conversationId?: string;
}

export interface ChatMessageResponse {
  conversationId: string;
  reply: string;
  language: "ar" | "en";
  safety: "emergency_escalation" | null;
}

/**
 * Send a chat message to the DiaPilot AI assistant
 */
export async function sendChatMessage(
  params: SendChatMessageParams
): Promise<ChatMessageResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
}
