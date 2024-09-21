"use client";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "@/lib/ReactMarkdown";
import { Message } from "@/types/messages/message";
import { Bot, UserCircle } from "lucide-react";

export function ChatStream({ message }: { message: Message }) {
    return (
        <div className={`mt-8 w-full flex ${message.role === "user" ? "justify-end" : "justify-start flex-wrap"}`}>
            {message.role === "assistant" && (
                <div className="">
                    <Bot className="w-8 h-8 mr-2 text-primary" />
                </div>
            )}
            <Card className={`${message.role === "user" ? "bg-muted w-4/5" : "bg-secondary/10 border-none shadow-none w-full"} p-3 `}>
                <CardContent className="p-0 w-full">
                    <Markdown>{message.content}</Markdown>
                </CardContent>
            </Card>
            {message.role === "user" && <UserCircle className="w-8 h-8 ml-2 text-primary" />}
        </div>
    );
}
