import { groqClient } from "@/services/groq";

export async function POST(request: Request) {
    const { message, messages } = await request.json();
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            try {
                // const resp = await queryClassifier({ userPrompt: message.content, messagesContext: messages });
                const groqStream = await groqClient.chat.completions.create({
                    messages: [
                        ...messages,
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
                        { role: "user", content: message.content },
                    ],
                    model: "deepseek-r1-distill-llama-70b",
                    stream: true,
                });
                for await (const chunk of groqStream) {
                    const text = chunk.choices[0].delta.content || "";

                    controller.enqueue(encoder.encode(`event: message\ndata: ${text}\n\n`));
                }
            } catch (error) {
                console.log(error);
                controller.enqueue(encoder.encode(`event: error\ndata: [ERROR] ${"error?.message"}\n\n`));
            } finally {
                controller.close();
            }
        },
    });
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}

// import { groqClient } from "@/services/groq";
// import { RequestOptions } from "groq-sdk/core.mjs";
// import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

// type QueryClassifierParams = {
//     newMessage: ChatCompletionMessageParam;
//     messages: ChatCompletionMessageParam[];
//     signal?: AbortSignal | null | undefined;
// };

// async function queryClassifier({ newMessage, messages }: QueryClassifierParams, { signal }: RequestOptions) {
//     const MODEL = "deepseek-r1-distill-llama-70b";

//     await groqClient.chat.completions.create(
//         {
//             model: MODEL,
//             messages: [...messages, newMessage],
//             stream: false,
//             // tools: tools,
//             // tool_choice: "auto",
//             max_completion_tokens: 4096,
//         },
//         {
//             signal,
//         }
//     );
// }
