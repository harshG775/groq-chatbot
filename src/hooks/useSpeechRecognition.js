// import { useState, useCallback, useEffect, useRef } from "react";

// export const useSpeechRecognition = (
//     options = {
//         continuous: true,
//         interimResults: true,
//         language: "en-US",
//     }
// ) => {
//     const [isListening, setIsListening] = useState(false);
//     const [error, setError] = useState(null);
//     const recognitionRef = useRef(null);
//     const hasRecognitionSupport = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

//     useEffect(() => {
//         if (!hasRecognitionSupport) {
//             setError("Speech recognition is not supported in this browser.");
//             return;
//         }

//         try {
//             const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//             recognitionRef.current = new SpeechRecognition();

//             recognitionRef.current.continuous = options.continuous ?? true;
//             recognitionRef.current.interimResults = options.interimResults ?? true;
//             recognitionRef.current.lang = options.language ?? "en-US";

//             recognitionRef.current.onerror = (event) => {
//                 const errorMessage = (() => {
//                     switch (event.error) {
//                         case "network":
//                             return "A network error occurred.";
//                         case "no-speech":
//                             return "No speech was detected.";
//                         case "not-allowed":
//                             return "Microphone access was denied.";
//                         case "aborted":
//                             return "Speech recognition was aborted.";
//                         case "audio-capture":
//                             return "No microphone was found or microphone is not working.";
//                         case "service-not-allowed":
//                             return "Speech recognition service is not allowed.";
//                         case "bad-grammar":
//                             return "Speech grammar error occurred.";
//                         case "language-not-supported":
//                             return "Selected language is not supported.";
//                         default:
//                             return "An unknown error occurred with speech recognition.";
//                     }
//                 })();

//                 setError(errorMessage);
//                 setIsListening(false);
//             };

//             return () => {
//                 if (recognitionRef.current) {
//                     recognitionRef.current.stop();
//                     recognitionRef.current = null;
//                 }
//                 setIsListening(false);
//             };
//         } catch (err) {
//             setError("Failed to initialize speech recognition.");
//             console.error("Speech Recognition initialization error:", err);
//         }
//     }, [hasRecognitionSupport, options.continuous, options.interimResults, options.language]);

//     const startListening = useCallback(() => {
//         if (!hasRecognitionSupport) {
//             setError("Speech recognition is not supported in this browser.");
//             return;
//         }

//         setError(null);
//         try {
//             if (recognitionRef.current && !isListening) {
//                 recognitionRef.current.start();
//                 setIsListening(true);
//             }
//         } catch (err) {
//             setError(err instanceof Error ? err.message : "An error occurred starting speech recognition.");
//             console.error("Speech Recognition start error:", err);
//             setIsListening(false);
//         }
//     }, [hasRecognitionSupport, isListening]);

//     const stopListening = useCallback(() => {
//         setError(null); // Reset error on stop
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

//     const setRecognitionHandlers = useCallback((handlers) => {
//         if (recognitionRef.current) {
//             if (handlers.onResult) recognitionRef.current.onresult = handlers.onResult;
//             if (handlers.onEnd) recognitionRef.current.onend = handlers.onEnd;
//             if (handlers.onStart) recognitionRef.current.onstart = handlers.onStart;
//         }
//     }, []);

//     return { isListening, startListening, stopListening, setRecognitionHandlers, error, hasRecognitionSupport };
// };
import { useEffect, useRef, useState } from "react";

const useSpeechRecognition = ({
    handlers: { onError, onStart, onEnd, onSpeechStart, onSpeechEnd, onResult },
    continuous = true,
    interimResults = true,
    lang = "en-US",
}) => {
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            setError({
                message: "Speech recognition is not supported in this browser.",
                code: "not-supported",
            });
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        recognitionRef.current.continuous = continuous;
        recognitionRef.current.interimResults = interimResults;
        recognitionRef.current.lang = lang;

        // Define event handlers
        recognitionRef.current.onerror = (event) => {
            const errorMessages = {
                network: "A network error occurred.",
                "no-speech": "No speech was detected.",
                "not-allowed": "Microphone access was denied.",
                aborted: "Speech recognition was aborted.",
                "audio-capture": "No microphone was found or microphone is not working.",
                "service-not-allowed": "Speech recognition service is not allowed.",
                "bad-grammar": "Speech grammar error occurred.",
                "language-not-supported": "Selected language is not supported.",
            };
            const errorMessage = errorMessages[event.error] || "An unknown error occurred with speech recognition.";
            setError({
                message: errorMessage,
                code: event.error,
            });
            event.errorMessage = errorMessage;
            if (onError) onError(event);
        };

        if (onStart) recognitionRef.current.onstart = onStart;

        if (onEnd) recognitionRef.current.onend = onEnd;

        if (onSpeechStart) recognitionRef.current.onspeechstart = onSpeechStart;

        if (onSpeechEnd) recognitionRef.current.onspeechend = onSpeechEnd;

        if (onResult) recognitionRef.current.onresult = onResult;

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, [continuous, interimResults, lang]);

    return {
        error,
        recognitionRef,
    };
};

export default useSpeechRecognition;
