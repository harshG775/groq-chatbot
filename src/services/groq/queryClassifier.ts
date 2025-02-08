import { ChatCompletionTool, ChatCompletionUserMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { groqClient } from ".";
import { to } from "@/lib/utils/to";

type Classification = {
    classification: "programming" | "none-programming" | "ambiguous" | "error";
    error: string;
};

export async function queryClassifier(
    userPrompt: string,
    messagesContext?: ChatCompletionUserMessageParam[]
): Promise<Classification | undefined> {
    const MODEL = "deepseek-r1-distill-llama-70b";

    const tools: ChatCompletionTool[] | null | undefined = [
        {
            type: "function",
            function: {
                name: "classify_query",
                description: "Classify the query as 'programming', 'none-programming', or 'ambiguous'.",
                parameters: {
                    type: "object",
                    properties: {
                        classification: {
                            type: "string",
                            enum: ["programming", "none-programming", "ambiguous"],
                            description: "The classification of the user query.",
                        },
                    },
                    required: ["classification"],
                },
            },
        },
    ];
    const systemPrompt = `
            Classify the user query into one of the following categories: 'programming', 'none-programming', or 'ambiguous'.

            *programming*: Queries related to coding, software development, algorithms, programming languages, debugging, or technical issues.
                Examples:
                - "How do I implement a binary search in Python?"
                - "What is the difference between 'let' and 'var' in JavaScript?"
                - "How can I optimize my SQL queries?"

            *none-programming*: Queries that are not related to programming or technical topics. These can include everyday questions, none-programming knowledge, or non-technical advice.
                Examples:
                - "What is the capital of France?"
                - "How do I bake a chocolate cake?"
                - "What are some good books to read?"

            *ambiguous*: Queries that are unclear, too vague, or could fit into multiple categories. These are queries where the intent is not clear or could be interpreted in different ways.
                Examples:
                - "Help me with this."
                - "What should I do?"
                - "Explain this."

            Based on the user's query, classify it into one of the above categories.
            `;
    const [error, response] = await to(
        groqClient.chat.completions.create({
            model: MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                ...(messagesContext || []),
                { role: "user", content: userPrompt },
            ],
            stream: false,
            tools: tools,
            tool_choice: "auto",
            max_completion_tokens: 4096,
        })
    );
    if (response) {
        const responseMessage = response.choices[0].message;
        const toolCalls = responseMessage.tool_calls || [];

        if (toolCalls.length > 0) {
            return JSON.parse(toolCalls[0].function.arguments);
        }
        return { classification: "error", error: "No tool calls detected." };
    }
    if (error) {
        console.log(error);
        return { classification: "error", error: JSON.stringify(error) };
    }
}
