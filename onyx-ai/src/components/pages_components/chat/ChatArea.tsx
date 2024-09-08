"use client";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessagesContext } from "@/store/context/Messages-context";
import { Chat } from "./Chat";
export default function ChatArea() {
    const { messages } = useMessagesContext();
    return (
        <div className="overflow-x-auto rounded-sm border">
            <div className="p-4 max-w-4xl  mx-auto">
                {messages.map((message, i) => (
                    <Chat key={i} message={message} />
                ))}
            </div>
        </div>
    );
}
