const initializeSpeechRecognition = (config) => {
    // Default configuration
    const defaultConfig = {
        language: "en-US",
        continuous: true,
        interimResults: true,
        maxAlternatives: 1,
        silenceTimeout: 1500,
        onStart: () => {},
        onEnd: () => {},
        onResult: () => {},
        onError: () => {},
    };

    // Merge default config with provided config
    const finalConfig = { ...defaultConfig, ...config };

    // Check browser support
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        finalConfig.onError("Speech recognition is not supported in this browser");
        return null;
    }

    let isListening = false;
    let timeoutId = null;

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition settings
    recognition.continuous = finalConfig.continuous;
    recognition.interimResults = finalConfig.interimResults;
    recognition.maxAlternatives = finalConfig.maxAlternatives;
    recognition.lang = finalConfig.language;

    // Set up event handlers
    recognition.onstart = () => {
        isListening = true;
        finalConfig.onStart();
    };

    recognition.onend = () => {
        isListening = false;
        finalConfig.onEnd();

        // Restart if continuous mode is enabled and we're supposed to be listening
        if (finalConfig.continuous && isListening) {
            try {
                recognition.start();
            } catch (error) {
                finalConfig.onError("Error restarting speech recognition");
            }
        }
    };

    recognition.onerror = (event) => {
        finalConfig.onError(`Speech recognition error: ${event.error}`);
    };

    let finalTranscript = "";
    let interimTranscript = "";

    recognition.onresult = (event) => {
        // Clear existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Process results
        interimTranscript = "";
        finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        // Call result handler with current state
        finalConfig.onResult({
            transcript: finalTranscript,
            interimTranscript,
            isFinal: false,
        });

        // Set timeout for silence detection
        timeoutId = setTimeout(() => {
            if (finalTranscript) {
                finalConfig.onResult({
                    transcript: finalTranscript,
                    interimTranscript: "",
                    isFinal: true,
                });
            }
        }, finalConfig.silenceTimeout);
    };

    // Return control methods
    return {
        recognition,
        isListening,
        start: () => {
            if (!isListening) {
                try {
                    recognition.start();
                } catch (error) {
                    finalConfig.onError("Error starting speech recognition");
                }
            }
        },
        stop: () => {
            if (isListening) {
                recognition.stop();
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        },
    };
};

export default initializeSpeechRecognition;

// Example usage:
/*
const speechRecognition = initializeSpeechRecognition({
  language: 'en-US',
  continuous: true,
  interimResults: true,
  silenceTimeout: 1500,
  onStart: () => {
    console.log('Speech recognition started');
  },
  onEnd: () => {
    console.log('Speech recognition ended');
  },
  onResult: ({ transcript, interimTranscript, isFinal }) => {
    console.log('Final:', transcript);
    console.log('Interim:', interimTranscript);
    console.log('Is Final:', isFinal);
  },
  onError: (error) => {
    console.error('Error:', error);
  }
});

// Start listening
speechRecognition?.start();

// Stop listening
speechRecognition?.stop();
*/
