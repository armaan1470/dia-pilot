import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  language: "ar" | "en";
  conversationId?: string;
}

interface ChatResponse {
  conversationId: string;
  reply: string;
  language: "ar" | "en";
  safety: "emergency_escalation" | null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { message, language, conversationId } = body as Partial<ChatRequest>;
  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 4000 ||
    (language !== "ar" && language !== "en") ||
    (conversationId !== undefined && typeof conversationId !== "string")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const apiUrl = process.env.DIAPILOT_API_URL ?? "http://127.0.0.1:3002";
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim(), language, conversationId }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Chat service unavailable" }, { status: 502 });
    }

    const result = (await response.json()) as Partial<ChatResponse>;
    if (typeof result.conversationId !== "string" || typeof result.reply !== "string") {
      return NextResponse.json({ error: "Invalid chat response" }, { status: 502 });
    }

    return NextResponse.json({
      conversationId: result.conversationId,
      reply: result.reply,
      language: result.language,
      safety: result.safety,
    });
  } catch {
    return NextResponse.json({ error: "Chat service unavailable" }, { status: 502 });
  }
}
