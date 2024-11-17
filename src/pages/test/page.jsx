import initializeSpeechRecognition from "@/hooks/initializeSpeechRecognition";
import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

export default function TestPage() {
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [interimText, setInterimText] = useState("");
    const speechRecognitionRef = useRef(null);

    // Initialize speech recognition with proper cleanup
    useEffect(() => {
        speechRecognitionRef.current = initializeSpeechRecognition({
            language: "en-US",
            continuous: true,
            interimResults: true,
            silenceTimeout: 1500,
            onStart: () => {
                console.log("Speech recognition started");
                setIsListening(true);
            },
            onEnd: () => {
                console.log("Speech recognition ended");
                setIsListening(false);
            },
            onResult: ({ transcript, interimTranscript, isFinal }) => {
                setInterimText(interimTranscript);

                if (isFinal && transcript) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: "user",
                            content: transcript,
                            timestamp: new Date().toISOString(),
                        },
                    ]);
                    setInterimText("");
                }
            },
            onError: (error) => {
                console.error("Error:", error);
                setIsListening(false);
            },
        });

        // Cleanup on component unmount
        return () => {
            if (speechRecognitionRef.current) {
                speechRecognitionRef.current.stop();
            }
        };
    }, []);

    const toggleListening = useCallback(() => {
        if (!speechRecognitionRef.current) return;

        if (isListening) {
            speechRecognitionRef.current.stop();
        } else {
            speechRecognitionRef.current.start();
        }
    }, [isListening]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 min-h-screen">
            <div className="flex flex-col gap-6">
                {/* Control buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggleListening}
                        className={`p-4 rounded-full transition-colors ${
                            isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        aria-label={isListening ? "Stop listening" : "Start listening"}
                    >
                        {isListening ? (
                            <MicOff className="w-6 h-6 text-white" />
                        ) : (
                            <Mic className="w-6 h-6 text-white" />
                        )}
                    </button>

                    <button onClick={clearMessages} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
                        Clear Messages
                    </button>
                </div>

                {/* Interim text display */}
                {interimText && <div className="p-4 bg-gray-100 rounded-lg italic">{interimText}</div>}

                {/* Messages list */}
                <div className="space-y-4">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-lg ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}
                        >
                            <div className="text-sm text-gray-500 mb-1">{message.role}</div>
                            <div className="text-gray-900">{message.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
    