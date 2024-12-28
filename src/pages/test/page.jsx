// import { Button } from "@/components/ui/button";
// import { Mic, MicOff } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";

// export default function TestPage() {
//     const [isListening, setIsListening] = useState(false);
//     const [errorListening, setErrorListening] = useState(null);
//     const recognitionRef = useRef(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [transcript, setTranscript] = useState("");

//     const simulateResponse = async () => {
//         setIsLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setIsLoading(false);
//         console.log(transcript);
//         setTranscript("");
//     };

//     const startListening = () => {
//         // Check if speech recognition is supported
//         const hasRecognitionSupport = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
//         if (!hasRecognitionSupport) {
//             alert("Speech recognition is not supported in this browser.");
//             return;
//         }

//         // Create an instance of SpeechRecognition
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         recognitionRef.current = new SpeechRecognition();

//         // Apply options
//         recognitionRef.current.lang = "en-US"; // Set language (default to English)
//         recognitionRef.current.continuous = true; // Continuous recognition
//         recognitionRef.current.interimResults = false; // Interim results
//         recognitionRef.current.maxAlternatives = 1; // Number of alternatives

//         // Define event handlers
//         recognitionRef.current.onstart = () => {
//             console.log("Speech recognition started.");
//         };

//         recognitionRef.current.onend = () => {
//             console.log("Speech recognition ended.");
//             setIsListening(false);
//         };

//         recognitionRef.current.onspeechstart = () => {
//             console.log("Speech detected.");
//         };

//         recognitionRef.current.onspeechend = () => {
//             console.log("Speech has stopped.");
//         };

//         let debounceTimer;
//         recognitionRef.current.onresult = (event) => {
//             // console.log(result?.[event.results.length - 1]?.transcript);
//             // console.log(event.results[event.results.length - 1]);
//             let finalTranscript = "";
//             for (let i = 0; i < event.results.length; i++) {
//                 finalTranscript += event.results[i][0].transcript;
//             }
//             console.log(finalTranscript);

//             // clearTimeout(debounceTimer);
//             // debounceTimer = setTimeout(() => {
//             //     if (isLoading) {
//             //         return;
//             //     }

//             //     console.log("Speech recognition result:", );
//             //     simulateResponse(event);
//             // }, 200);
//         };

//         recognitionRef.current.onerror = (event) => {
//             const errorMessages = {
//                 network: "A network error occurred.",
//                 "no-speech": "No speech was detected.",
//                 "not-allowed": "Microphone access was denied.",
//                 aborted: "Speech recognition was aborted.",
//                 "audio-capture": "No microphone was found or microphone is not working.",
//                 "service-not-allowed": "Speech recognition service is not allowed.",
//                 "bad-grammar": "Speech grammar error occurred.",
//                 "language-not-supported": "Selected language is not supported.",
//             };
//             const errorMessage =
//                 errorMessages[event.error] || "An unknown error occurred with speech recognitionRef.current.";
//             console.error(errorMessage);
//         };

//         recognitionRef.current.onnomatch = () => {
//             console.log("No speech match found.");
//         };

//         // Start recognition
//         recognitionRef.current.start();
//         setIsListening(true);
//     };
//     const stopListening = useCallback(() => {
//         setErrorListening(null); // Reset error on stop
//         try {
//             if (recognitionRef.current && isListening) {
//                 recognitionRef.current.stop();
//                 setIsListening(false);
//             }
//         } catch (err) {
//             console.error("Speech Recognition stop error:", err);
//             setIsListening(false);
//         }
//     }, [isListening]);

//     useEffect(() => {}, []);
//     return (
//         <div className="p-4 space-y-4">
//             {errorListening && <div>{errorListening}</div>}
//             <div>{isListening ? "Listening" : "Not listening"}</div>
//             <div>
//                 {isListening ? (
//                     <Button onClick={stopListening}>
//                         <MicOff />
//                     </Button>
//                 ) : (
//                     <Button onClick={startListening} variant={"outline"}>
//                         <Mic />
//                     </Button>
//                 )}
//             </div>
//         </div>
//     );
// }

import { Button } from "@/components/ui/button";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { useCallback, useRef, useState } from "react";

export default function TestPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const simulateResponse = async (transcript) => {
        console.log(transcript);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMessages((prevMessages) => [...prevMessages, transcript]);
        setIsLoading(false);
    };

    //
    const debounceTimerRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    const { error, recognitionRef } = useSpeechRecognition({
        continuous: true,
        interimResults: true,
        language: "en-IN",
        handlers: {
            onResult: (event) => {
                if (isLoading) {
                    return;
                }
                console.log("before");
                clearTimeout(debounceTimerRef.current);
                debounceTimerRef.current = setTimeout(() => {
                    const resultTranscript = event.results?.[event.results.length - 1];
                    if (resultTranscript?.isFinal) {
                        let finalTranscript = resultTranscript?.[0].transcript;
                        simulateResponse(finalTranscript);
                    }
                }, 1000);
            },
            onEnd: () => {
                console.log("Speech recognition ended.");
                setIsListening(false);
            },
            onStart: () => {
                setIsListening(true);
                console.log("Speech recognition started.");
            },
            onError: (error) => {
                setIsListening(false);
                console.error("Speech Recognition error:", error);
            },
        },
    });

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
        }
    }, [recognitionRef, isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [recognitionRef, isListening]);

    return (
        <div>
            <div>
                {error && <div>{error.message}</div>}
                <div>{isListening ? "Listening" : "Not listening"}</div>
                <Button onClick={startListening} variant={"outline"}>
                    start
                </Button>
                <Button onClick={stopListening}>Stop</Button>
            </div>

            <div>
                <div>{isLoading ? "Loading..." : "Not loading"}</div>
                {messages?.map((message, i) => (
                    <div key={message + i}>{message}</div>
                ))}
            </div>
        </div>
    );
}
