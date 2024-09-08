"use client";
import { Button } from "@/components/ui/button";
import { groq } from "@/services/groq.ai";
import { useMessagesContext } from "@/store/context/Messages-context";
import { CircleArrowUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
export default function AutoGrowingTextarea() {
    const [userInput, setUserInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [userInput]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey) {
            if (e.key === "z") {
                e.preventDefault();
                document.execCommand("undo");
            }
            if (e.shiftKey && e.key === "z") {
                e.preventDefault();
                document.execCommand("redo");
            }
        }
        if (e.key === "Enter") {
            if (e.shiftKey) {
                e.preventDefault();
                document.execCommand("insertLineBreak");
            } else if (userInput.trim() !== "") {
                e.preventDefault();
                handleSubmit();
            }
        }
    };

    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useMessagesContext();
    const handleSubmit = async () => {
        if (loading) {
            return;
        }
        setMessages((pre) => [
            ...pre,
            {
                role: "user",
                content: userInput,
            },
        ]);
        setUserInput("");

        // api request to ai api
        try {
            setLoading(true);
            const { choices } = await groq.chat.completions.create({
                messages: [
                    ...messages,
                    {
                        role: "user",
                        content: userInput,
                    },
                ],
                // model: "mixtral-8x7b-32768",
                model: "llama3-8b-8192",
                temperature: 0.5,
                max_tokens: 1024,
                stop: null,
                // stream: true,
            });
            setLoading(false);
            setMessages((pre) => [
                ...pre,
                {
                    role: choices[0]?.message?.role || "",
                    content: choices[0]?.message?.content || "",
                },
            ]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        //
    };

    return (
        <form className="flex justify-between items-center">
            <textarea
                ref={textareaRef}
                value={userInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"Type your message here..."}
                className={`min-h-10 max-h-52 p-2 m-0 resize-none border-0 bg-transparent text-token-text-primary focus:ring-0 focus-visible:ring-0 w-full  overflow-y-auto transition-height duration-300 `}
                tabIndex={0}
                rows={1}
                dir={"auto"}
            />
            <div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    type="submit"
                    disabled={loading}
                >
                    <CircleArrowUp />
                </Button>
            </div>
        </form>
    );
}
