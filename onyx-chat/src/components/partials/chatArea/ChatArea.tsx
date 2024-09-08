"use client";
import { useEffect, useRef } from "react";
import { Chat, StreamChat } from "./Chat";
import { useMessagesStore } from "@/store/zustand/chat/messages.store";
import { useCurrentMessage } from "@/store/zustand/chat/useCurrentMessage.store";
import { Bot } from "lucide-react";
export default function ChatArea() {
    const { messages } = useMessagesStore();
    const currentMessage = useCurrentMessage((state) => state.currentMessage);

    const scrollToViewRef = useRef<null | HTMLDivElement>(null);

    const handleScrollToDiv = () => {
        if (scrollToViewRef.current) {
            scrollToViewRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        // Using a timeout to ensure the DOM is updated before scrolling
        // const timeoutId = setTimeout(() => {
        handleScrollToDiv();
        // }, 100); // Short delay to ensure messages are rendered

        // return () => clearTimeout(timeoutId); // Cleanup timeout
    }, [messages]);
    const arrayLastMessage = messages.at(-1);
    return (
        <div className="w-full rounded-md border p-4 overflow-y-auto">
            <main className="container">
                {arrayLastMessage ? (
                    <div className="flex flex-col gap-10 ">
                        {arrayLastMessage.role === "assistant"
                            ? messages
                                  ?.slice(0, messages.length - 1)
                                  ?.map((message, i) => {
                                      return <Chat key={i} message={message} />;
                                  })
                            : messages?.map((message, i) => {
                                  return <Chat key={i} message={message} />;
                              })}

                        {currentMessage && (
                            <StreamChat
                                message={{
                                    role: "assistant",
                                    content: currentMessage,
                                }}
                            />
                        )}
                        <div ref={scrollToViewRef} />
                    </div>
                ) : (
                    <div className="grid place-content-center min-h-96 font-bold text-2xl">
                        <div className="grid place-content-center">
                            <Bot height={100} width={100} />
                        </div>
                        <h1 className="uppercase">Welcome</h1>
                    </div>
                )}
            </main>
        </div>
    );
}
