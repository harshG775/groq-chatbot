"use client";
import { useEffect, useRef } from "react";
import Chat from "./Chat";
import { useMessagesStore } from "@/store/zustand/chat/messages.store";

export default function ChatArea() {
    const { messages } = useMessagesStore();
    const scrollToViewRef = useRef<null | HTMLDivElement>(null);

    const handleScrollToDiv = () => {
        if (scrollToViewRef.current) {
            scrollToViewRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(()=>{
        handleScrollToDiv()
    },[messages])
    return (
        <main className="container ">
            <div className="grid gap-10 ">
                {messages?.map((message, i) => (
                    <Chat key={i} message={message} />
                ))}
                {/* {newMessage &&
                    <div></div>
                } */}
                <div ref={scrollToViewRef}/>
            </div>
        </main>
    );
}
