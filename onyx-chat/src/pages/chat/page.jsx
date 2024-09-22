/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { getGroqChatCompletion } from "@/services/groq/groq";
import { useRef, useState } from "react";

export default function ChatPage() {
    // input
    const [inputValue, setInputValue] = useState("");

    // messages
    const [dataMessages, set_dataMessages] = useState([]);

    // stream
    const [loading_stream, setLoading_stream] = useState(false);
    const [status_stream, setStatus_stream] = useState("stop"); // "streaming" | "stop"
    const [error_stream, setError_stream] = useState(null);
    const [dataStream, setDataStream] = useState({ role: "", content: "" });
    const dataStream_controllerRef = useRef(null);

    // handles
    const handleStop = async () => {
        if (status_stream !== "stop") {
            set_dataMessages((prev) => [...prev, dataStream]); //messages array
            setStatus_stream("stop"); // status change
            dataStream_controllerRef.current.abort();
        }
    };

    const handleSend = async () => {
        try {
            if (inputValue.length <= 0) return null;
            let accumulated = "";

            setInputValue("");
            setDataStream({ role: "assistant", content: "" }); //dataStream
            setLoading_stream(true);

            set_dataMessages((prev) => [...prev, { role: "user", content: inputValue }]); //messages array
            const stream = await getGroqChatCompletion({
                query: inputValue,
                history: dataMessages,
                model: "llama-3.1-8b-instant",
            });
            dataStream_controllerRef.current = stream.controller;
            setStatus_stream("streaming"); // status change
            for await (const { choices } of stream) {
                if (choices[0]?.finish_reason === "stop") {
                    set_dataMessages((prev) => [...prev, { role: "assistant", content: accumulated }]); //messages array
                    setStatus_stream("stop"); // status change
                    return;
                }
                accumulated = accumulated + choices[0]?.delta?.content || "";
                setDataStream({ role: "assistant", content: accumulated }); //dataStream
            }
        } catch (error) {
            setError_stream(error);
            set_dataMessages((prev) => [...prev, { role: "assistant", content: "something went wrong" }]); //messages array
        } finally {
            setLoading_stream(false);
        }
    };

    return (
        <main>
            <section>
                <div className="space-x-4">
                    <textarea
                        type="text"
                        value={inputValue}
                        onChange={({ target }) => setInputValue(target.value)}
                        placeholder="Enter your query."
                    />
                    {status_stream === "stop" ? (
                        <Button
                            disabled={loading_stream || status_stream === "streaming"}
                            className="bg-primary text-primary-foreground min-w-10 rounded-lg"
                            type="button"
                            onClick={handleSend}
                        >
                            send
                        </Button>
                    ) : (
                        <Button
                            className="bg-primary text-primary-foreground min-w-10 rounded-lg"
                            type="button"
                            variant="outline"
                            onClick={handleStop}
                        >
                            Stop
                        </Button>
                    )}
                </div>
                <div>
                    {dataMessages?.map((el, i) => (
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
                    {/*  */}
                    {status_stream === "pending" && (
                        <div>
                            <div className="flex mt-4">
                                <div className="bg-orange-600 text-orange-50 px-4 rounded-md">{dataStream.role}</div>
                            </div>
                            <p>loading...</p>
                        </div>
                    )}
                    {status_stream === "streaming" && (
                        <div>
                            <div className="flex mt-4">
                                <div className="bg-orange-600 text-orange-50 px-4 rounded-md">{dataStream.role}</div>
                            </div>
                            <p>{dataStream?.content}</p>
                        </div>
                    )}
                    {/*  */}
                </div>
            </section>
        </main>
    );
}
