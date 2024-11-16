import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff, AlertCircle, Save } from "lucide-react";

const SpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcriptHistory, setTranscriptHistory] = useState([]);
    const [currentTranscript, setCurrentTranscript] = useState("");
    const [error, setError] = useState("");
    const [recognition, setRecognition] = useState(null);
    const [audioLevel, setAudioLevel] = useState(0);

    const audioContext = useRef(null);
    const analyzer = useRef(null);
    const microphone = useRef(null);
    const animationFrame = useRef(null);

    // Initialize speech recognition with browser compatibility
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onstart = () => {
                setIsListening(true);
                setError("");
                startAudioAnalysis();
            };

            recognition.onerror = (event) => {
                if (event.error === "not-allowed") {
                    setError("Microphone permission denied");
                } else {
                    setError(`Error: ${event.error}`);
                }
                setIsListening(false);
                stopAudioAnalysis();
            };

            recognition.onend = () => {
                if (isListening) {
                    // Restart if it was still supposed to be listening
                    recognition.start();
                } else {
                    stopAudioAnalysis();
                }
            };

            recognition.onresult = (event) => {
                let interimTranscript = "";
                let finalTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    setTranscriptHistory((prev) => [
                        ...prev,
                        {
                            text: finalTranscript.trim(),
                            timestamp: new Date().toLocaleTimeString(),
                        },
                    ]);
                }
                setCurrentTranscript(interimTranscript);
            };

            setRecognition(recognition);
        } else {
            setError("Speech recognition not supported in this browser");
        }

        return () => {
            stopAudioAnalysis();
        };
    }, []);

    const startAudioAnalysis = async () => {
        try {
            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
                analyzer.current = audioContext.current.createAnalyser();
                analyzer.current.fftSize = 256;
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            microphone.current = audioContext.current.createMediaStreamSource(stream);
            microphone.current.connect(analyzer.current);

            const dataArray = new Uint8Array(analyzer.current.frequencyBinCount);

            const updateAudioLevel = () => {
                analyzer.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                setAudioLevel(average);
                animationFrame.current = requestAnimationFrame(updateAudioLevel);
            };

            updateAudioLevel();
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopAudioAnalysis = () => {
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }
        if (microphone.current) {
            microphone.current.disconnect();
            microphone.current = null;
        }
        setAudioLevel(0);
    };

    const toggleListening = useCallback(() => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
            setIsListening(false);
            stopAudioAnalysis();
        } else {
            recognition.start();
            setError("");
        }
    }, [isListening, recognition]);

    const clearTranscripts = () => {
        setTranscriptHistory([]);
        setCurrentTranscript("");
    };

    const saveTranscripts = () => {
        const text = transcriptHistory.map((entry) => `[${entry.timestamp}] ${entry.text}`).join("\n");
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "speech-transcript.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            {error && (
                <div>
                    <AlertCircle className="h-4 w-4" />
                    <div>Error</div>
                    <div>{error}</div>
                </div>
            )}

            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <button
                        onClick={toggleListening}
                        disabled={!recognition}
                        className={`p-4 rounded-full transition-colors ${
                            isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isListening ? (
                            <MicOff className="h-6 w-6 text-white" />
                        ) : (
                            <Mic className="h-6 w-6 text-white" />
                        )}
                    </button>
                    {isListening && (
                        <div
                            className="absolute -inset-1 rounded-full bg-blue-500 -z-10 opacity-25"
                            style={{
                                transform: `scale(${1 + audioLevel / 255})`,
                                transition: "transform 0.1s ease-out",
                            }}
                        />
                    )}
                </div>

                <div className="text-center text-sm text-gray-600">{isListening ? "Tap to stop" : "Tap to start"}</div>

                {/* Current transcript */}
                <div className="w-full p-4 bg-gray-50 rounded-lg border min-h-12">
                    {currentTranscript || "Speaking..."}
                </div>

                {/* Transcript history */}
                <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">History</h3>
                        <div className="flex gap-2">
                            <button onClick={clearTranscripts} className="text-sm text-gray-600 hover:text-gray-900">
                                Clear
                            </button>
                            <button
                                onClick={saveTranscripts}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                                <Save className="h-4 w-4" /> Save
                            </button>
                        </div>
                    </div>
                    <div className="w-full max-h-64 overflow-y-auto bg-gray-50 rounded-lg border">
                        {transcriptHistory.length === 0 ? (
                            <div className="p-4 text-gray-500 text-center">No transcripts yet</div>
                        ) : (
                            transcriptHistory.map((entry, index) => (
                                <div key={index} className="p-3 border-b last:border-b-0">
                                    <div className="text-xs text-gray-500">{entry.timestamp}</div>
                                    <div>{entry.text}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeechRecognition;
