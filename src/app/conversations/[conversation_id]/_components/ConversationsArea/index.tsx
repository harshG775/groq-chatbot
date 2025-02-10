"use client";
import { Button } from "@/components/ui/button";
import { useMessagesStore } from "@/store/zustand";
import { Bot } from "lucide-react";
// import Attachments from "./Attachments";
import { Fragment } from "react";

export default function ConversationsArea() {
    const messages = useMessagesStore((state) => state.messages);
    // const setMessages = useMessagesStore((state) => state.setMessages);

    return (
        <main className="overflow-auto scrollbar-color">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col">
                    {messages?.map((message) => (
                        <Fragment key={message?.id}>
                            {message?.role === "user" && (
                                <div className="mb-12 self-end">
                                    <div className="bg-primary max-w-max p-2 rounded-xl">
                                        <div>{message.content}</div>
                                    </div>
                                </div>
                            )}
                            {message?.role === "assistant" && (
                                <div className="mb-12 self-auto">
                                    <div>
                                        <Button variant={"ghost"} size={"icon"}>
                                            <Bot />
                                        </Button>
                                    </div>
                                    <div className="bg-secondary/20 p-2 rounded-xl">
                                        <div>{message.content}</div>
                                    </div>
                                </div>
                            )}
                            {/* {message?.attachments && <Attachments message={message} />} */}
                        </Fragment>
                    ))}
                </div>
            </div>
        </main>
    );
}
