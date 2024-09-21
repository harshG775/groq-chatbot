"use client";
import { useMessagesContext } from "@/store/context/Messages-context";
import { Bot } from "lucide-react";
import { Chat } from "./Chat";

export default function Messages() {
    const { messages } = useMessagesContext();
    return (
        <>
            {messages.length === 0 && (
                <div className="grid place-content-center min-h-96 font-bold text-2xl">
                    <div className="grid place-content-center">
                        <Bot height={100} width={100} />
                    </div>
                    <h1 className="uppercase">Welcome</h1>
                </div>
            )}
            {messages.length >= 0 && messages.map((message, i) => <Chat key={i} message={message} />)}
        </>
    );
}
