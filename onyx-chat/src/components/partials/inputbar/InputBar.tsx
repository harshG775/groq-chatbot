"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CircleArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMessagesStore } from "@/store/zustand/chat/messages.store";
import { groq } from "@/services/groq.ai";
import { useRef, useState } from "react";
import { useStreamMessage } from "@/store/zustand/chat/streamMessage.store";

const InputValueSchema = z.object({
    inputValue: z.string().min(1, "type something"),
});

type SignUpSchemaType = z.infer<typeof InputValueSchema>;
export default function InputBar({ className }: { className?: string }) {
    const [loading, setLoading] = useState(false);
    const streamMessage = useStreamMessage((state) => state.streamMessage);
    const index = useRef(0);
    const setStreamMessage = useStreamMessage(
        (state) => state.setStreamMessage
    );
    const { messages, addMessage } = useMessagesStore();
    const { register, handleSubmit, reset } = useForm<SignUpSchemaType>({
        resolver: zodResolver(InputValueSchema),
    });
    const handleForm: SubmitHandler<SignUpSchemaType> = async (data) => {
        addMessage({
            role: "user",
            content: data.inputValue,
        });
        try {
            setLoading(true);
            setStreamMessage("");

            const resp = await groq.chat.completions.create({
                messages: [
                    ...messages,
                    {
                        role: "user",
                        content: data.inputValue,
                    },
                ],
                // model: "mixtral-8x7b-32768",
                model: "llama3-8b-8192",
                temperature: 0.5,
                max_tokens: 1024,
                stop: null,
                stream: true,
            });
            let wholeText = "";
            // text streaming
            for await (const chunk of resp) {
                const typingInterval = setInterval(() => {
                    if (chunk.choices[0].finish_reason === null) {
                        setStreamMessage(wholeText);
                        wholeText += chunk?.choices[0]?.delta?.content || "";
                    } else {
                        clearInterval(typingInterval);
                    }
                }, 5000);
            }
            addMessage({
                role: "assistant",
                content: wholeText,
            });
        } catch (error) {
            console.log("groq.chat.completions error");
            console.log(error);
        } finally {
            setLoading(false);
        }

        reset();
    };
    console.log(streamMessage);
    return (
        <div className={cn("", className)}>
            <form onSubmit={handleSubmit(handleForm)}>
                <div className="flex gap-2">
                    <textarea
                        tabIndex={0}
                        rows={1}
                        dir={"auto"}
                        placeholder="Message Chat"
                        className="p-2 m-0 resize-none border-0 bg-transparent text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-52 w-full"
                        {...register("inputValue")}
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
                </div>
            </form>
        </div>
    );
}
