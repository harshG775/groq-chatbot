"use client";
import { useMessagesStore } from "@/store/zustand";
import Attachments from "./Attachments";

export default function ConversationsArea() {
    const messages = useMessagesStore((state) => state.messages);
    // const setMessages = useMessagesStore((state) => state.setMessages);

    return (
        <main className="overflow-auto scrollbar-color px-2">
            <div className="max-w-6xl mx-auto">
                <ul>
                    {messages?.map((message) => (
                        <li key={message?.id}>
                            {message?.role === "user" && (
                                <div>
                                    <div>User</div>
                                    <div>{message.content}</div>
                                </div>
                            )}
                            {message?.role === "assistant" && (
                                <div>
                                    <div>assistant</div>
                                    <div>{message.content}</div>
                                </div>
                            )}
                            {message?.attachments && <Attachments message={message} />}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
