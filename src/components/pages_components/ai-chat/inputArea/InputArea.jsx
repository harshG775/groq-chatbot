import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, StopCircle } from "lucide-react";
import { useRef, useState } from "react";
import { getGroqChatCompletion } from "@/services/groq/groq.ai";
import { useMessagesContext } from "@/store/context/Messages-context";
import { useStreamingMessageContext } from "@/store/context/StreamingMessage-context";

export default function InputArea({ className, ...props }) {
    const { setStreamingMessage } = useStreamingMessageContext();
    const { messages, setMessages } = useMessagesContext();
    const [isProcessing, setIsProcessing] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const abortControllerRef = useRef(null);

    // handles for request
    const handleQuery = async () => {
        if (!inputValue?.trim("")?.length === 0) {
            return null;
        }
        if (isProcessing) {
            return null;
        }
        let accumulatedStreamContent = "\n";
        try {
            setMessages((prevMessages) => [...prevMessages, { role: "user", content: inputValue }]);
            setIsProcessing(true);
            // stream
            abortControllerRef.current = new AbortController();
            const stream = await getGroqChatCompletion(messages, inputValue, abortControllerRef.current.signal);
            setInputValue("");
            for await (const chunk of stream) {
                accumulatedStreamContent += chunk.choices[0]?.delta?.content || "";
                setStreamingMessage({ role: "assistant", content: accumulatedStreamContent, streaming: true });
            }
            accumulatedStreamContent += "\n";
            setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: accumulatedStreamContent }]);
            setStreamingMessage({ role: "assistant", content: "", streaming: false });
            setIsProcessing(false);
        } catch (error) {
            if (error.message === "Request was aborted.") {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: "assistant", content: accumulatedStreamContent },
                ]);
            }
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: `something went wrong\n ${error?.message}` },
            ]);
            console.log("error:\n", error);
            setInputValue("");
            setIsProcessing(false);
            setStreamingMessage({ role: "assistant", content: "", streaming: false });
        }
    };
    const handleAbortQuery = async () => {
        abortControllerRef?.current?.abort();
        setIsProcessing(false);
    };
    return (
        <div className={cn("overflow-y-auto border", className)} {...props}>
            <div className="pl-2 pr-4 flex gap-2 items-end">
                <form
                    className="flex-1 flex gap-2 items-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleQuery();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Type here..."
                        disabled={isProcessing}
                        className="
                                px-2 h-10 w-full rounded-md
                                focus:outline focus:outline-2 focus:outline-input 
                                shadow-inner 
                            "
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div>
                        {!isProcessing && (
                            <Button
                                disabled={isProcessing || inputValue.trim("")?.length === 0}
                                size="icon"
                                variant="default"
                                className="rounded-full ml-auto animate-in zoom-in-110"
                                type="submit"
                            >
                                <Send className="h-6 w-6" />
                            </Button>
                        )}
                        {isProcessing && (
                            <Button
                                onClick={handleAbortQuery}
                                size="icon"
                                variant="destructive"
                                className="ml-auto rounded-full animate-in zoom-in-110"
                                type="button"
                            >
                                <StopCircle className="h-6 w-6" />
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
