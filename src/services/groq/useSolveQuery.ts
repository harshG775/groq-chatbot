import { useMessagesStore, useStreamMessageStore } from "@/store/zustand";
import { groqClient } from ".";

export default function useSolveQuery({ userPrompt }: { userPrompt: string }): {
    solveQuery: () => void;
} {
    // const streamMessage = useStreamMessageStore((state)=>state.streamMessage)
    const setStreamMessage = useStreamMessageStore((state) => state.setStreamMessage);
    const setMessages = useMessagesStore((state) => state.setMessages);
    const systemPrompt = `
    You are an expert React developer using Vite and Tailwind CSS. Your task is to generate React code based on user requests.
    
    Rules:
    1. Use functional components
    2. Export components as default
    3. Use Tailwind classes for styling
    4. Keep components focused and modular
    5. Use ES6+ syntax
    6. Add typescript if user asks or PropTypes for component validation
    7. Use named exports for utilities
    8. Follow standard directory structure (npm create vite@latest)
    
    `;

    const solveQuery = async () => {
        const newUserMessageId = crypto.randomUUID();
        setMessages((prev) => [
            ...prev,
            {
                id: newUserMessageId,
                role: "user",
                content: userPrompt,
                attachments: null,
            },
        ]);

        const stream = await groqClient.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "deepseek-r1-distill-llama-70b",
            stream: true,
        });
        let accumulated = "";
        for await (const chunk of stream) {
            // stop
            if (chunk.choices[0].finish_reason === "stop") {
                const newAssistantMessageId = crypto.randomUUID();
                setMessages((prev) => [
                    ...prev,
                    {
                        id: newAssistantMessageId,
                        role: "assistant",
                        content: accumulated,
                        attachments: null,
                    },
                ]);
                accumulated = "";
                setStreamMessage({
                    content: accumulated,
                    streaming: false,
                });
            }
            // start
            setStreamMessage({
                content: accumulated,
                streaming: true,
            });
            accumulated += chunk?.choices?.[0]?.delta?.content || "";
        }
    };
    return { solveQuery };
}
