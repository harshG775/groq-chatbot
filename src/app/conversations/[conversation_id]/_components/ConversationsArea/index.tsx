"use client";
import { useMessagesStore } from "@/store/zustand";
import { Bot } from "lucide-react";
import Attachments from "./Attachments";
import { useLayoutEffect, useRef } from "react";

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
                        {message?.role === "user" && (
                            <div className="bg-primary/20    max-w-max p-2 rounded-xl">
                                <div>{message.content}</div>
                                {message?.attachments && <Attachments message={message} />}
                            </div>
                        )}
                        {message?.role === "assistant" && (
                            <>
                                <div>
                                    <div className="w-10 h-10 grid place-content-center bg-secondary/20  rounded-t-full">
                                        <Bot />
                                    </div>
                                </div>
                                <div className="bg-secondary/20 p-2 rounded-b-xl rounded-r-xl">
                                    <div>{message.content}</div>
                                    {message?.attachments && <Attachments message={message} />}
                                </div>
                            </>
                        )}
                        <CurrentMessageDiv />
                    </div>
                ))}
            </div>
        </main>
    );
}
