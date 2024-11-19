import Groq from "groq-sdk";
import systemMessages from "./systemMessages";
const apiKey = import.meta.env.VITE_GROQ_API_KEY;
export const groq = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
});

export const getGroqChatCompletion = async (messages, inputValue, signal) => {
    return groq.chat.completions.create(
        {
            messages: [
                ...systemMessages,
                ...messages,
                {
                    role: "user",
                    content: inputValue,
                },
            ],
            model: "llama-3.1-70b-versatile",
            // max_tokens: 500,
            stream: true,
        },
        {
            signal: signal,
        }
    );
};
