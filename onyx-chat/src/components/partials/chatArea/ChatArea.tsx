"use client";
import { useEffect, useRef } from "react";
import Chat from "./Chat";
import { useMessagesStore } from "@/store/zustand/chat/messages.store";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    return (
        <div className="w-full rounded-md border p-4 overflow-y-auto">
            <main className="container">
                <div className="flex flex-col gap-10 ">
                    {messages?.map((message, i) => (
                        <Chat key={i} message={message} />
                    ))}
                    {/* {newMessage &&
                    <div></div>
                } */}
                    <div ref={scrollToViewRef} />
                </div>
            </main>
        </div>
    );
}
