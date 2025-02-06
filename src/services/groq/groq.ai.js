//how to write function call in groq api with streaming enabled

import Groq from "groq-sdk";
import systemMessages from "./systemMessages";
import { to } from "@/utils/to";
const apiKey = import.meta.env.VITE_GROQ_API_KEY;
export const groq = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
});

export const getGroqChatCompletion = async (messages, inputValue, signal, model) => {
    return groq.chat.completions.create(
        {
            messages: [
                {
                    role: "system",
                    content: systemMessages,
                },
                ...messages,
                {
                    role: "user",
                    content: inputValue,
                },
            ],
            model: model,
            // max_tokens: 500,
            stream: true,
        },
        {
            signal: signal,
        }
    );
};

export const getModel = async () => {
    return to(groq.models.list());

};
