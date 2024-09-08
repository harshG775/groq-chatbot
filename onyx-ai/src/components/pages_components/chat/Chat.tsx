"use client";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "@/lib/ReactMarkdown";
import { message } from "@/store/context/Messages-context";
import { Bot, UserCircle } from "lucide-react";

export function Chat({ message }: { message: message }) {
    return (
        <div
            className={`mt-8 w-full flex ${
                message.role === "user"
                    ? "justify-end"
                    : "justify-start flex-wrap"
            }`}
        >
            {message.role === "assistant" && (
                <div className="">
                    <Bot className="w-8 h-8 mr-2 text-primary" />
                </div>
            )}
            <Card
                className={`${
                    message.role === "user"
                        ? "bg-muted w-4/5"
                        : "bg-secondary/10 border-none shadow-none w-full"
                } p-3 `}
            >
                <CardContent className="p-0 w-full">
                    <Markdown>{message.content}</Markdown>
                </CardContent>
            </Card>
            {message.role === "user" && (
                <UserCircle className="w-8 h-8 ml-2 text-primary" />
            )}
        </div>
    );
}

import { useState, useEffect, useRef } from "react";

export function StreamingChat({ message }: { message: message }) {
    const index = useRef(0);

    const typing = true;

    const text = message.content;
    const [displayText, setDisplayText] = useState("");
    useEffect(() => {
        if (!typing) return;

        const typingInterval = setInterval(() => {
            if (index.current < text.length) {
                setDisplayText((prevText) => {
                    return prevText + text.charAt(index.current);
                });
                index.current++;
            } else {
                clearInterval(typingInterval);
            }
        }, 10);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, 50, typing]);
    return (
        <div
            className={`mt-8 w-full flex ${
                message.role === "user"
                    ? "justify-end"
                    : "justify-start flex-wrap"
            }`}
        >
            {message.role === "assistant" && (
                <div className="">
                    <Bot className="w-8 h-8 mr-2 text-primary" />
                </div>
            )}
            <Card
                className={`${
                    message.role === "user"
                        ? "bg-muted w-4/5"
                        : "bg-secondary/10 border-none shadow-none w-full"
                } p-3 `}
            >
                <CardContent className="p-0 w-full">
                    <Markdown>{displayText}</Markdown>
                </CardContent>
            </Card>
            {message.role === "user" && (
                <UserCircle className="w-8 h-8 ml-2 text-primary" />
            )}
        </div>
    );
}
