"use client";

import { motion } from "framer-motion";
import type { QuickReply } from "@/data/chatbotResponses";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  quickReplies?: QuickReply[];
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  onQuickReply?: (value: string) => void;
}

export default function ChatMessage({ message, onQuickReply }: ChatMessageProps) {
  const isBot = message.sender === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div className={`max-w-[85%] ${isBot ? "order-2" : "order-1"}`}>
        {isBot && (
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-dark">
              L
            </div>
            <span className="font-body text-[10px] text-gray">LIZGAT Bot</span>
          </div>
        )}
        <div
          className={`rounded-lg px-4 py-3 ${
            isBot
              ? "rounded-tl-none bg-white text-dark shadow-sm"
              : "rounded-tr-none bg-primary text-dark"
          }`}
        >
          <div className="font-body text-sm leading-relaxed whitespace-pre-line">
            {message.text.split("\n").map((line, i) => {
              const boldRegex = /\*\*(.*?)\*\*/g;
              const parts = [];
              let lastIndex = 0;
              let match;

              while ((match = boldRegex.exec(line)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(line.substring(lastIndex, match.index));
                }
                parts.push(
                  <strong key={`${i}-${match.index}`}>{match[1]}</strong>
                );
                lastIndex = match.index + match[0].length;
              }
              if (lastIndex < line.length) {
                parts.push(line.substring(lastIndex));
              }

              return (
                <span key={i}>
                  {parts.length > 0 ? parts : line}
                  {i < message.text.split("\n").length - 1 && <br />}
                </span>
              );
            })}
          </div>
        </div>

        {/* Quick Replies */}
        {isBot && message.quickReplies && message.quickReplies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.quickReplies.map((qr) => (
              <button
                key={qr.value}
                onClick={() => onQuickReply?.(qr.value)}
                className="rounded-full border border-primary/30 bg-white px-3 py-1 font-body text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-dark"
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        <p
          className={`mt-1 font-body text-[10px] ${
            isBot ? "text-gray" : "text-dark/50"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
