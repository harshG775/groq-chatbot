"use client";
import { useMessagesContext } from "@/store/context/Messages-context";
import { Chat, StreamingChat } from "./Chat";
import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
export default function ChatArea() {
    const scrollToViewRef = useRef<null | HTMLDivElement>(null);
    const { messages } = useMessagesContext();

    const handleScrollToDiv = () => {
        if (scrollToViewRef.current) {
            scrollToViewRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const lastIndexMessage = messages.length - 1;

    const messagesToRender =
        messages[lastIndexMessage]?.role === "assistant"
            ? messages?.slice(0, messages.length - 1)
            : messages;

    useEffect(() => {
        handleScrollToDiv();
    }, [messages]);
    return (
        <div className="overflow-x-auto rounded-sm border">
            <div className="p-4 max-w-4xl  mx-auto">
                {messages.length === 0 && (
                    <div className="grid place-content-center min-h-96 font-bold text-2xl">
                        <div className="grid place-content-center">
                            <Bot height={100} width={100} />
                        </div>
                        <h1 className="uppercase">Welcome</h1>
                    </div>
                )}

                {messages.length >= 0 &&
                    messagesToRender.map((message, i) => (
                        <Chat key={i} message={message} />
                    ))}

                {messages.length >= 0 &&
                    messages[lastIndexMessage]?.role === "assistant" && (
                        <StreamingChat
                            message={messages[messages.length - 1]}
                        />
                    )}
                <div ref={scrollToViewRef} />
            </div>
        </div>
    );
}
