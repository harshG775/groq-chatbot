import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, StopCircle } from "lucide-react";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import VoiceInput from "./VoiceInput";
import { groq } from "@/services/groq.ai";
import { useMessageStreamContext } from "@/store/context/MessageStream-context";
import { useStoreContext } from "@/store/reducer-context/context";
import { ActionTypes } from "@/store/reducer-context/actions";

export default function InputArea({ className, ...props }) {
    const { setMessageStream } = useMessageStreamContext();
    const { state, dispatch } = useStoreContext();
    const { messages } = state;

    const [inputValue, setInputValue] = useState("");
    const [continuousListening, setContinuousListening] = useState(false); // Tracks if API is processing
    const [isProcessing, setIsProcessing] = useState(false);
    const abortControllerRef = useRef(null);
    // Initialize the custom hook
    const { isListening, startListening, stopListening, setRecognitionHandlers, error } = useSpeechRecognition({
        continuous: true,
        interimResults: true,
        language: "en-US",
    });

    // handle for speech recognition

    // Set up handlers for recognition events
    setRecognitionHandlers({
        onResult: ({ results }) => {
            const isFinal = results[results.length - 1].isFinal;
            const resultText = Array.from(results)
                .map((result) => result[0].transcript)
                .join("");
            setInputValue(resultText); // Update the transcript state
            if (isFinal) {
                handleQuery();
            }
        },
        onEnd: () => {
            if (!isProcessing && continuousListening) {
                startListening();
                setContinuousListening(false);
            }
            console.log("Speech recognition has stopped.");
        },
        onStart: () => {
            console.log("Speech recognition has started.");
        },
    });
    useEffect(() => {
        const restartListening = async () => {
            if (!isProcessing && continuousListening) {
                setTimeout(() => {
                    startListening();
                }, 2000); 
            } else {
                stopListening();
            }
        };
        restartListening();
        // ! eslint-disable-next-line
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProcessing, continuousListening]);

    const handleStartListing = () => {
        setInputValue("");
        setContinuousListening(true);
        startListening();
    };
    const handleStopListing = () => {
        setInputValue("");
        setContinuousListening(false);
        stopListening();
    };

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
            setIsProcessing(true);
            setInputValue("");
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { role: "user", content: inputValue },
            });
            // stream
            abortControllerRef.current = new AbortController();
            const stream = await groq.chat.completions.create(
                {
                    messages: [
                        ...messages,
                        {
                            role: "user",
                            content: inputValue,
                        },
                    ],
                    model: "llama3-8b-8192",
                    stream: true,
                },
                {
                    signal: abortControllerRef.current.signal,
                }
            );
            for await (const chunk of stream) {
                if (chunk?.choices[0]?.finish_reason === "stop") {
                    accumulatedStreamContent += "\n";
                    dispatch({
                        type: ActionTypes.SET_MESSAGE,
                        payload: { role: "assistant", content: accumulatedStreamContent },
                    });
                    setMessageStream({ role: "assistant", content: "", streaming: false });
                    setIsProcessing(false);
                    return;
                }
                accumulatedStreamContent += chunk.choices[0]?.delta?.content || "";
                setMessageStream({ role: "assistant", content: accumulatedStreamContent, streaming: true });
            }
        } catch (error) {
            console.log("error", error);
            setIsProcessing(false);
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { role: "assistant", content: accumulatedStreamContent },
            });
        }
    };
    const handleAbortQuery = async () => {
        abortControllerRef?.current?.abort();
        setIsProcessing(false);
    };
    return (
        <div className={cn("overflow-y-auto border", className)} {...props}>
            <div className="pl-2 pr-4 flex gap-2 items-end">
                <div className="w-full flex-1 flex gap-2 items-end">
                    {!continuousListening && (
                        <Input value={inputValue} setValue={setInputValue} handleQuery={handleQuery} />
                    )}
                    {isListening && (
                        <div className="self-center flex-1 flex gap-1 justify-center">
                            <div className="w-4 h-4 rounded-full bg-primary animate-scale delay-0"></div>
                            <div className="w-4 h-4 rounded-full bg-primary animate-scale delay-100"></div>
                            <div className="w-4 h-4 rounded-full bg-primary animate-scale delay-200"></div>
                        </div>
                    )}
                    {error && (
                        <div className="self-center flex-1 flex gap-1 justify-center text-destructive text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* buttons */}
                {!isProcessing && (
                    <VoiceInput
                        inputValue={inputValue}
                        continuousListening={continuousListening}
                        handleStartListing={handleStartListing}
                        handleStopListing={handleStopListing}
                    />
                )}
                {!isProcessing && (
                    <Button
                        disabled={inputValue.trim("")?.length === 0 || continuousListening}
                        size="icon"
                        variant="default"
                        className="rounded-full ml-auto"
                        onClick={handleQuery}
                    >
                        <Send className="h-6 w-6" />
                    </Button>
                )}
                {isProcessing && (
                    <Button
                        onClick={handleAbortQuery}
                        size="icon"
                        variant="destructive"
                        className="ml-auto rounded-full"
                    >
                        <StopCircle className="h-10 w-10" />
                    </Button>
                )}
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
