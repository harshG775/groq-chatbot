import { Message } from "@/types/messages/message";
import Groq from "groq-sdk";
import { Stream } from "groq-sdk/lib/streaming.mjs";
const apiKey = "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";
export const groq = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
});

type GetGroqChatCompletion = {
    history?: Message[];
    query: string;
    model?: string;
};

export async function getGroqChatCompletion(params: GetGroqChatCompletion): Promise<Stream<Groq.Chat.Completions.ChatCompletionChunk>> {
    const { history = [], query, model = "llama3-8b-8192" } = params;

    const system = `you are a helpful assistant`;
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: system,
            },
            ...history,
            {
                role: "user",
                content: query,
            },
        ],
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        model: model,
        stream: true,
    });
}

export const getModels = async (): Promise<Groq.Models.ModelListResponse> => {
    return await groq.models.list();
};
