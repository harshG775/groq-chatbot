import { groqClient } from ".";
import { queryClassifier } from "./queryClassifier";
import { Stream } from "groq-sdk/lib/streaming.mjs";
import { ChatCompletionChunk } from "groq-sdk/resources/chat/completions.mjs";

type SolveQueryParams = {
    userPrompt: string;
    signal?: AbortSignal | null | undefined;
};
export const solveQuery = async ({ userPrompt, signal }: SolveQueryParams): Promise<Stream<ChatCompletionChunk>> => {
    const classification = await queryClassifier(userPrompt, [], signal);

    if (classification?.classification === "programming") {
        return groqClient.chat.completions.create(
            {
                messages: [
                    {
                        role: "system",
                        content: `
                    You are an expert React developer using Vite and Tailwind CSS. Your task is to generate React code based on user requests.
                    
                    Rules:
                    1. always add file path inside the code example : '//file_path:src/components/<filename>.<file extension>'
                    2. Use functional components
                    3. Export components as default
                    4. Use Tailwind classes for styling
                    5. Keep components focused and modular
                    6. Use ES6+ syntax
                    7. Add typescript if user asks or PropTypes for component validation
                    8. Use named exports for utilities
                    9. Follow standard directory structure (npm create vite@latest)
                    
                    `,
                    },
                    { role: "user", content: userPrompt },
                ],
                model: "deepseek-r1-distill-llama-70b",
                stream: true,
            },
            {
                signal: signal,
            }
        );
    }
    if (classification?.classification === "non-programming") {
        return groqClient.chat.completions.create(
            {
                messages: [
                    {
                        role: "system",
                        content: `
                        You are an expert academic tutor specializing in education.Provide detailed,
                        - accurate and concise answers
                        - only when needed give step-by-step explanations else give concise answers
                        `,
                    },
                    { role: "user", content: `Student's question :${userPrompt}` },
                ],
                model: "llama-3.3-70b-specdec",
                stream: true,
            },
            {
                signal: signal,
            }
        );
    }
    if (classification?.classification === "ambiguous") {
        return groqClient.chat.completions.create(
            {
                messages: [
                    {
                        role: "system",
                        content: `
                        the user asked an ambiguous query
                        if you are enable to get context of query ask user for more context
                        `,
                    },
                    { role: "user", content: userPrompt },
                ],
                model: "llama-3.1-8b-instant",
                stream: true,
            },
            {
                signal: signal,
            }
        );
    }
    if (classification?.classification === "error") {
        throw new Error(classification.error);
    } else {
        throw new Error("unexpected error");
    }
};
