import { GROQ_API_KEY } from "@/constants/env";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function getGroqChatCompletion({ content }: { content: string }) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: content,
            },
        ],
        model: "llama3-8b-8192",
    });
}





export type Message = {
    content: string;
    role: string;
};
export type Choice = {
    finish_reason: string;
    index: number;
    logprobs: null | any; // Define a more specific type if possible
    message: Message;
};
export type Usage = {
    completion_time: number;
    completion_tokens: number;
    prompt_time: number;
    prompt_tokens: number;
    queue_time: number;
    total_time: number;
    total_tokens: number;
};

export type ChatCompletionResponse = {
    id: string;
    object: "chat.completion";
    created: number;
    model: string;
    choices: Choice[];
    system_fingerprint: string;
    usage: Usage;
    x_groq: {
        id: string;
    };
};