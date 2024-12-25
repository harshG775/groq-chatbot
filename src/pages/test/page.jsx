// // Default
// import Groq from "groq-sdk";

// const groq = new Groq({
//     apiKey: "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",
//     dangerouslyAllowBrowser: true,
// });

// const runConversation = async ({ userPrompt }) => {
//     const MODEL = "llama3-groq-70b-8192-tool-use-preview";

//     const systemPrompt = `
//     You are a query suggestion assistant. When provided with a user query, generate an array of related queries.
//     Use the "generate_query_suggestions" tool. Avoid responding directly in text.
//     `;

//     const tools = [
//         {
//             type: "function",
//             function: {
//                 name: "generate_query_suggestions",
//                 description: "A function to generate multiple related queries for a given user input. This tool must be used when the user provides a query.",
//                 parameters: {
//                     type: "object",
//                     properties: {
//                         expression: {
//                             type: "array",
//                             items: {
//                                 type: "string",
//                             },
//                         },
//                     },
//                     required: ["expression"],
//                 },
//             },
//         },
//     ];

//     const messages = [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt },
//     ];

//     try {
//         const response = await groq.chat.completions.create({
//             model: MODEL,
//             messages: messages,
//             stream: false,
//             tools: tools,
//             // tool_choice: "auto",
//             max_tokens: 4096,
//         });

//         const responseMessage = response.choices[0].message;
//         console.log("Response Message: ", responseMessage);

//         // if (responseMessage.tool_calls?.length > 0) {
//         //     const suggestions = responseMessage.tool_calls[0].parameters.suggestedQueries;
//         //     console.log("Suggested Queries: ", suggestions);
//         //     return suggestions;
//         // } else {
//         //     console.error("No tool calls detected.");
//         //     return [];
//         // }
//     } catch (error) {
//         console.error("Error in conversation: ", error);
//         return [];
//     }
// };

// export default function TestPage() {
//     return (
//         <div>
//             <button onClick={() => runConversation({ userPrompt: "how to create counter in reactjs" })}>call</button>
//         </div>
//     );
// }

import { Button } from "@/components/ui/button";
import useZustandStore from "@/store/zustand/useZustandStore";
import { catchError } from "@/utils/catchError";
import Groq from "groq-sdk";
import { MessageCircleMore, TextCursor } from "lucide-react";
const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
});

export default function TestPage() {
    const setContentStream = useZustandStore((state) => state.setContentStream);

    const handleSend = async () => {
        setContentStream({ content: "", status: "streaming" });
        await delay(2000);
        const [error, stream] = await catchError(
            groq.chat.completions.create({
                model: "llama3-70b-8192",
                messages: [{ role: "user", content: "how to create counter in reactjs" }],
                stream: true,
            })
        );
        if (error) {
            console.log(error);
            return;
        }
        let accumulated = "";
        for await (const chunk of stream) {
            accumulated += chunk.choices[0].delta.content || "";
            setContentStream({ content: accumulated, status: "streaming" });
            await delay(10);
        }
        setContentStream({ content: accumulated, status: "completed" });
    };
    return (
        <div>
            <div className="sticky top-0 bg-background">
                <h1>test page</h1>
                <Button onClick={handleSend}>send</Button>
            </div>
            <TestPage_nested />
        </div>
    );
}

function TestPage_nested() {
    const { content, status } = useZustandStore((state) => state.contentStream);

    // Function to split content
    const getFadedContent = (text) => {
        if (!text) return { mainText: "", fadedText: "" };
        const mainText = text.slice(0, -10); // All except the last 10 characters
        const fadedText = text.slice(-10); // Last 10 characters
        return { mainText, fadedText };
    };

    const { mainText, fadedText } = getFadedContent(content);

    return (
        <div className="p-8">
            <h1 className="text-2xl">test stream:</h1>
            {status === "streaming" && (
                <div>
                    {mainText}
                    <span className="text-gray-500 opacity-70">{fadedText}</span>
                    <TextCursor className="inline-flex ml-2 animate-bounce text-primary" />
                </div>
            )}
            {status === "completed" && <div>{content}</div>}
        </div>
    );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
