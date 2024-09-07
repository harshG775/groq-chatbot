"use client";
import { useEffect, useRef } from "react";
import { Chat, StreamChat } from "./Chat";
import { useMessagesStore } from "@/store/zustand/chat/messages.store";
export default function ChatArea() {
    const { messages } = useMessagesStore();
    const scrollToViewRef = useRef<null | HTMLDivElement>(null);

    const handleScrollToDiv = () => {
        if (scrollToViewRef.current) {
            scrollToViewRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        // Using a timeout to ensure the DOM is updated before scrolling
        const timeoutId = setTimeout(() => {
            handleScrollToDiv();
        }, 100); // Short delay to ensure messages are rendered

        return () => clearTimeout(timeoutId); // Cleanup timeout
    }, [messages]);
    const arrayLastMessage = messages.at(-1);
    return (
        <div className="w-full rounded-md border p-4 overflow-y-auto">
            <main className="container">
                {arrayLastMessage ? (
                    <div className="flex flex-col gap-10 ">
                        {messages
                            ?.slice(0, messages.length - 1)
                            ?.map((message, i) => {
                                return <Chat key={i} message={message} />;
                            })}
                        {arrayLastMessage.role === "assistant" && (
                            <StreamChat message={arrayLastMessage} />
                        )}
                        <div ref={scrollToViewRef} />
                    </div>
                ) : (
                    <div className="grid place-content-center font-bold">
                        <h1>Welcome</h1>
                    </div>
                )}
            </main>
        </div>
    );
}
