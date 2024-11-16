import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function TestPage() {
    const [messages, setMessages] = useState([]);

    const [transcript, setTranscript] = useState("");
    const [continuousListening, setContinuousListening] = useState(false); // Tracks if API is processing
    const [isProcessing, setIsProcessing] = useState(false);
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
            const transcriptResult = results[results.length - 1][0].transcript;
            setTranscript(transcriptResult);
            if (isFinal && !isProcessing) {
                handleQuery();
            }
        },
        onEnd: () => {
            if (continuousListening) {
                startListening();
            }
            console.log("Speech recognition has stopped.");
        },
        onStart: () => {
            console.log("Speech recognition has started.");
        },
    });

    const handleStartListing = () => {
        setTranscript("");
        setContinuousListening(true);
        startListening();
    };
    const handleStopListing = () => {
        setContinuousListening(false);
        stopListening();
    };

    // handles for request
    const handleQuery = async () => {
        try {
            setTranscript("");
            setIsProcessing(true);
            await delay(1000);
            setMessages((prev) => [...prev, { content: transcript }]);
            setIsProcessing(false);
            // stream
        } catch (error) {
            console.log("error", error);
            setTranscript("");
            setIsProcessing(false);
        }
    };
    return (
        <div className={"overflow-y-auto"}>
            <div className="flex flex-col gap-4 border p-4">
                <Button onClick={handleStartListing} className="w-10 h-8 p-0">
                    start
                </Button>
                <Button onClick={handleStopListing} className="w-10 h-8 p-0" variant={"destructive"}>
                    stop
                </Button>
                <input disabled={true} value={transcript} onChange={(e) => setTranscript(e.target.value)} />
                {isListening && (
                    <div className=" self-center flex-1 flex gap-1 justify-center">
                        <div className="w-4 h-4 rounded-full bg-primary animate-scale delay-0"></div>
                        <div className="w-4 h-4 rounded-full bg-primary animate-scale delay-100"></div>
                        <div className="w-4 h-4 rounded-full bg-primary animate-scale delay-200"></div>
                    </div>
                )}
                {error && (
                    <div className="self-center flex-1 flex gap-1 justify-center text-destructive text-sm">{error}</div>
                )}
            </div>
            <div>
                {messages?.map((el, i) => (
                    <div key={i}>{el.content}</div>
                ))}
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
