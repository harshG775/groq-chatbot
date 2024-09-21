"use client";
import { Button } from "@/components/ui/button";
import { getGroqChatCompletion } from "@/services/groq/groq";
import { useMessagesContext } from "@/store/context/Messages-context";
import { useStreamMessageContext } from "@/store/context/StreamMessage-context";
import { useUserInputContext } from "@/store/context/UserInput-context";
import { delay } from "@/utils/delay";
import { ArrowUp, Square } from "lucide-react";
import { FormEvent, useCallback } from "react";

export default function InputBar() {
    const { userInput, setUserInput } = useUserInputContext();
    const { setStreamMessage, setStreaming, loading, streaming, setLoading, setError } = useStreamMessageContext();
    const { messages, setMessages } = useMessagesContext();

    const handleSend = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!userInput.trim()) return;

            setLoading(true);
            setStreamMessage({ content: "", role: "assistant" });
            setMessages((prev) => [...prev, { content: userInput, role: "user" }]);

            try {
                const stream = await getGroqChatCompletion({
                    query: userInput,
                    history: messages,
                });
                stream.controller;
                let accumulated = "";
                setStreaming(true);
                for await (const { choices } of stream) {
                    await delay(4)
                    const choiceContent = choices[0]?.delta?.content || "";
                    accumulated += choiceContent;

                    if (choices[0]?.finish_reason === "stop") {
                        setMessages((prev) => [...prev, { content: accumulated || "something went wrong", role: "assistant" }]);
                        break;
                    }

                    setStreamMessage({
                        content: accumulated,
                        role: choices[0]?.delta?.role as "assistant",
                    });
                }
            } catch (error) {
                console.error("Error during message streaming:", error);
                setError(error);
            } finally {
                setLoading(false);
                setStreaming(false);
                setUserInput("");
            }
        },
        [userInput, messages, setLoading, setMessages, setStreamMessage, setStreaming, setError, setUserInput]
    );

    return (
        <div className="rounded-md border p-2 mb-2">
            <form onSubmit={handleSend}>
                <div className="flex gap-2 items-end">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="w-full resize-none p-2 border rounded"
                        rows={3}
                        placeholder="Type your message here..."
                        disabled={loading || streaming}
                    />
                    {loading || streaming ? (
                        <Button type="button" variant={"secondary"} className="rounded-full p-2.5" size={"icon"}>
                            <Square className="w-8 h-8" />
                        </Button>
                    ) : (
                        <Button type="submit" variant={"secondary"} className="rounded-full p-2.5" size={"icon"}>
                            <ArrowUp className="w-8 h-8" />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
