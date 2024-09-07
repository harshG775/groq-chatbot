"use client";
import Chat from "./Chat";
import { useMessagesStore } from "@/store/zustand/chat/messages.store";

export default function ChatArea() {
    const { messages } = useMessagesStore();
    return (
        <main className="grid gap-10 container p-0">
            {messages?.map((message, i) => (
                <Chat key={i} message={message} />
            ))}
        </main>
    );
}
