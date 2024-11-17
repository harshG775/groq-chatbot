import { AlertCircle, Mic, MicOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function TestPage() {
    const [messages, setMessages] = useState([]);

    // SpeechRecognition
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState("");
    const recognitionRef = useRef(null);
    const timeoutRef = useRef(null);

    const initializeSpeechRecognition = useCallback(() => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            setError("Speech recognition is not supported in your browser");
            return null;
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognitionAPI();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        return recognition;
    }, []);

    const handleResult = useCallback((event) => {
        let finalTranscript = "";
        let currentInterim = "";

        // Clear the timeout on new speech
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                currentInterim = transcript;
            }
        }

        // Update interim transcript immediately
        setInterimTranscript(currentInterim);

        // Set timeout for silence detection
        timeoutRef.current = setTimeout(() => {
            if (finalTranscript) {
                setTranscript((prev) => prev + " " + finalTranscript);
                setMessages((prev) => [...prev, { role: "user", content: finalTranscript }]);

                setInterimTranscript("");
            }
        }, 1500);
    }, []);

    const startListening = useCallback(() => {
        if (!recognitionRef.current) {
            recognitionRef.current = initializeSpeechRecognition();
        }

        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setError("");
            } catch (err) {
                setError("Error starting speech recognition");
            }
        }
    }, [initializeSpeechRecognition]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            // Clear any pending timeouts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, []);

    useEffect(() => {
        if (!recognitionRef.current) {
            recognitionRef.current = initializeSpeechRecognition();
        }

        if (recognitionRef.current) {
            recognitionRef.current.onresult = handleResult;
            recognitionRef.current.onerror = (event) => {
                setError(`Speech recognition error: ${event.error}`);
                setIsListening(false);
            };
            recognitionRef.current.onend = () => {
                // Restart if we're supposed to be listening
                if (isListening) {
                    try {
                        recognitionRef.current.start();
                    } catch (err) {
                        setError("Error restarting speech recognition");
                        setIsListening(false);
                    }
                }
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleResult, initializeSpeechRecognition, isListening]);

    return (
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-4 rounded-full transition-colors ${
                        isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isListening ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
                </button>
                <div className="text-sm text-gray-500">{isListening ? "Tap to stop" : "Tap to start"}</div>
            </div>

            <div>
                {error && (
                    <div>
                        <AlertCircle className="h-4 w-4" />
                        <div>Error</div>
                        <div>{error}</div>
                    </div>
                )}
                <div className="space-y-2">
                    <div className="min-h-24 p-4 bg-gray-100 rounded-lg">
                        <p className="text-gray-900">{transcript}</p>
                        <p className="text-gray-500 italic">{interimTranscript}</p>
                    </div>

                    <button
                        onClick={() => setTranscript("")}
                        className="w-full px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Clear Transcript
                    </button>
                </div>
            </div>

            <div>
                {messages.map((el, i) => (
                    <div key={i}>
                        <div>{el.role}</div>
                        <div>{el.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
