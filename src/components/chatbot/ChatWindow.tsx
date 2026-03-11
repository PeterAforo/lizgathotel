"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import type { Message } from "./ChatMessage";
import { findResponse } from "@/data/chatbotResponses";

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  text: "Welcome to LIZGAT Hotel! 🌟 I'm your virtual concierge. How can I assist you today? Whether you're looking to book a room, learn about our amenities, or plan your visit to Accra, I'm here to help!",
  sender: "bot",
  quickReplies: [
    { label: "View Rooms", value: "rooms" },
    { label: "Make a Booking", value: "booking" },
    { label: "Hotel Amenities", value: "amenities" },
    { label: "Contact Us", value: "contact" },
  ],
  timestamp: new Date(),
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      const response = findResponse(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.response,
        sender: "bot",
        quickReplies: response.quickReplies,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (value: string) => {
    sendMessage(value);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 space-y-4 overflow-y-auto p-4"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onQuickReply={handleQuickReply}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-dark">
              L
            </div>
            <div className="flex gap-1 rounded-lg bg-white px-4 py-3 shadow-sm">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray [animation-delay:0ms]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray [animation-delay:150ms]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-light p-3"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-light bg-cream px-4 py-2.5 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-dark transition-all hover:bg-primary-dark disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
