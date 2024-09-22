import { Button } from "@/components/ui/button";
import { getGroqChatCompletion } from "@/services/groq/groq";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
    const [messages, setMessages] = useState([]);
    const controller = useRef(null);
    useEffect(() => {
        setMessages([
            {
                role: "system",
                content: "You are a coding assistant.",
            },
        ]);
    }, [setMessages]);

    const [streaming, setStreaming] = useState(false);
    const [streamMessage, setStreamMessage] = useState();
    const handleSend = async (input) => {
        try {
            setStreamMessage({
                content: "",
                role: "assistant",
            });
            setMessages((prev) => [
                ...prev,
                {
                    content: input,
                    role: "user",
                },
            ]);
            const stream = await getGroqChatCompletion({
                query: input,
                history: messages,
                model: "llama-3.1-8b-instant",
            });
            controller.current = stream.controller;
            setStreaming(true);
            let accumulated = "";
            for await (const { choices } of stream) {
                await delay(40);
                if (choices[0]?.finish_reason === "stop") {
                    setMessages((prev) => [
                        ...prev,
                        {
                            content: accumulated || "something went wrong",
                            role: "assistant",
                        },
                    ]);
                    setStreaming(false);
                    return;
                }
                accumulated = accumulated + choices[0]?.delta?.content || "";
                setStreamMessage({
                    content: accumulated,
                    role: choices[0]?.delta?.role || "assistant",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <main className="mx-auto max-w-2xl min-h-96 border p-2">
                <section>
                    <nav>
                        <input type="text" className="w-full min-h-12" />
                        <Button onClick={() => handleSend("react counter")}>send</Button>
                        <Button
                            onClick={() => {
                                setStreaming(false);
                                setMessages((prev) => [
                                    ...prev,
                                    {
                                        content: streamMessage.content,
                                        role: "assistant",
                                    },
                                ]);
                                controller.current.abort();
                            }}
                        >
                            cancel
                        </Button>
                    </nav>
                </section>
                <div>
                    {messages?.map((el, i) => (
                        <div key={i}>
                            {el.role === "user" && (
                                <>
                                    <div className="flex justify-end mt-4">
                                        <div className="bg-cyan-600 text-orange-50 px-4 rounded-md">user</div>
                                    </div>
                                    <p className="text-end">{el.content}</p>
                                </>
                            )}
                            {el.role === "assistant" && (
                                <>
                                    <div className="flex mt-4">
                                        <div className="bg-orange-600 text-orange-50 px-4 rounded-md">assistant</div>
                                    </div>
                                    <p>{el.content}</p>
                                </>
                            )}
                        </div>
                    ))}
                    {streaming && (
                        <div>
                            <div className="flex mt-4">
                                <div className="bg-orange-600 text-orange-50 px-4 rounded-md">{streamMessage.role}</div>
                            </div>
                            <p>{streamMessage?.content}</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
