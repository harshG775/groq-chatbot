import { Button } from "@/components/ui/button";
import { getGroqChatCompletion } from "@/services/groq/groq";
import { useMessagesContext } from "@/store/context/Messages-context";
import { useStreamMessageContext } from "@/store/context/StreamMessage-context";
import { useEffect, useState } from "react";

export default function HomePage() {
    const { messages, setMessages } = useMessagesContext();
    useEffect(() => {
        setMessages(histories[0].history);
    }, [setMessages]);

    const [streaming, setStreaming] = useState(false);
    const { streamMessage, setStreamMessage } = useStreamMessageContext();
    const handleSend = async () => {
        try {
            setStreamMessage({
                content: "",
                role: "assistant",
            });
            setMessages((prev) => [
                ...prev,
                {
                    content: "hello",
                    role: "user",
                },
            ]);
            const stream = await getGroqChatCompletion({
                query: "hello",
                history: messages,
                model: "llama-3.1-8b-instant",
            });
            setStreaming(true);
            let accumulated = "";
            for await (const { choices } of stream) {
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
    console.log(streaming);

    return (
        <>
            <main className="mx-auto max-w-2xl min-h-96 border p-2">
                <div>
                    {messages?.map((el, i) => (
                        <div key={i}>
                            {el.role === "user" && (
                                <>
                                    <div className="flex justify-end mt-4">
                                        <div className="bg-cyan-600 text-orange-50 px-4 rounded-md">
                                            user
                                        </div>
                                    </div>
                                    <p className="text-end">{el.content}</p>
                                </>
                            )}
                            {el.role === "assistant" && (
                                <>
                                    <div className="flex mt-4">
                                        <div className="bg-orange-600 text-orange-50 px-4 rounded-md">
                                            assistant
                                        </div>
                                    </div>
                                    <p>{el.content}</p>
                                </>
                            )}
                        </div>
                    ))}
                    {streaming && (
                        <div>
                            <div className="flex mt-4">
                                <div className="bg-orange-600 text-orange-50 px-4 rounded-md">
                                    {streamMessage.role}
                                </div>
                            </div>
                            <p>{streamMessage?.content}</p>
                        </div>
                    )}
                </div>
            </main>
            <section>
                <nav>
                    <input type="text" className="w-full min-h-12" />
                    <Button onClick={handleSend}>send</Button>
                </nav>
            </section>
        </>
    );
}

const histories = [
    {
        conversation_id: "1",
        history: [
            {
                role: "system",
                content: "You are a coding assistant.",
            },
            {
                role: "user",
                content: "Explain the use of functions in Python.",
            },
            {
                role: "assistant",
                content:
                    "Functions in Python are blocks of reusable code that perform a specific task.",
            },
        ],
        timestamp: "2024-09-21T10:00:00Z",
    },
    {
        conversation_id: "2",
        history: [
            {
                role: "system",
                content:
                    "You are an assistant that answers general knowledge questions.",
            },
            {
                role: "user",
                content: "What is the capital of France?",
            },
            {
                role: "assistant",
                content: "The capital of France is Paris.",
            },
        ],
        timestamp: "2024-09-22T11:30:00Z",
    },
];


const delay = (ms)=> new Promise(resolve => setTimeout(resolve, ms));
