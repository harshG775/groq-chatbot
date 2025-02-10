"use client";
import { useMessagesStore } from "@/store/zustand";
import { useLayoutEffect, useRef } from "react";
import { AssistantMessageBubble, AssistantStreamMessageBubble, UserMessageBubble } from "./MessageBubble";

function CurrentMessageDiv() {
    const messages = useMessagesStore((state) => state.messages);
    const currentMessageRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (currentMessageRef?.current) {
            currentMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    return <div ref={currentMessageRef} />;
}

export default function ConversationsArea() {
    const messages = useMessagesStore((state) => state.messages);
    // const setMessages = useMessagesStore((state) => state.setMessages);

    return (
        <main className="overflow-auto scrollbar-color">
            <div className="max-w-6xl mx-auto flex flex-col">
                {messages?.map((message) => (
                    <div key={message?.id} className={`mb-12 ${message?.role === "user" ? "self-end" : "self-auto"}`}>
                        {message?.role === "user" && <UserMessageBubble message={message} />}
                        {message?.role === "assistant" && <AssistantMessageBubble message={message} />}
                        <CurrentMessageDiv />
                    </div>
                ))}
                <AssistantStreamMessageBubble/>
            </div>
        </main>
    );
}
