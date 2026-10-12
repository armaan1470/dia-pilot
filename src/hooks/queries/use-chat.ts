"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import {
  sendChatMessage,
  type SendChatMessageParams,
  type ChatMessageResponse,
} from "@/lib/api/chat";

/**
 * Hook to send chat messages using TanStack Query mutation
 */
export function useChatMutation(
  options?: UseMutationOptions<
    ChatMessageResponse,
    Error,
    SendChatMessageParams
  >
) {
  return useMutation<ChatMessageResponse, Error, SendChatMessageParams>({
    mutationFn: sendChatMessage,
    ...options,
  });
}
