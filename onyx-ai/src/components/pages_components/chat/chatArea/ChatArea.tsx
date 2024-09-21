"use client";
import { useMessagesContext } from "@/store/context/Messages-context";
import { useRefs } from "@/store/context/Refs-context";
import MessageStream from "./message-stream/Message-Stream";
import Messages from "./Messages/Messages";
import { useEffect } from "react";

export default function ChatArea() {
    const { BottomDivRef } = useRefs();
    const { messages } = useMessagesContext();
    useEffect(() => {
        if (BottomDivRef.current) {
            BottomDivRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, BottomDivRef]);
    return (
        <div className="overflow-x-auto rounded-sm border">
            <div className="p-4 max-w-4xl  mx-auto">
                <Messages />
                <MessageStream />
                <div ref={BottomDivRef} className="h-20" />
            </div>
        </div>
    );
}
