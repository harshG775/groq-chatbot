import { useMessagesStore, useStreamMessageStore, useUserPromptStore } from "@/store/zustand";
import { useRef } from "react";
import { solveQuery } from "./solveQuery";
import { to } from "@/lib/utils/to";

const delay = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export default function useSolveQuery({ userPrompt }: { userPrompt: string }): {
    handleSolveQuery: () => void;
    useAbortSolveQuery: () => void;
} {
    let accumulated = "";
    let isThinking = false;

    const abortControllerRef = useRef<AbortController | null>(null);
    // const streamMessage = useStreamMessageStore((state)=>state.streamMessage)
    const setStreamMessage = useStreamMessageStore((state) => state.setStreamMessage);
    const setMessages = useMessagesStore((state) => state.setMessages);
    const setIsStreaming = useStreamMessageStore((state) => state.setIsStreaming);
    const setIsLoading = useStreamMessageStore((state) => state.setIsLoading);
    const setIsError = useStreamMessageStore((state) => state.setIsError);
    const setError = useStreamMessageStore((state) => state.setError);
    const setUserPrompt = useUserPromptStore((state) => state.setUserPrompt);

    const handleSolveQuery = async () => {
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
        setIsLoading(true);
        setError(null);
        abortControllerRef.current = new AbortController();
        const [error, stream] = await to(solveQuery({ userPrompt, signal: abortControllerRef.current.signal }));
        if (stream) {
            setUserPrompt("");
            for await (const chunk of stream) {
                // stream start
                setStreamMessage(accumulated);
                setIsStreaming(true);
                const content = chunk?.choices?.[0]?.delta?.content || "";
                if (content.includes("<think>")) {
                    accumulated += "<details><summary>Think</summary>";
                    isThinking = true;
                    continue; // Skip the "<think>" tag itself
                }
                if (content.includes("</think>")) {
                    isThinking = false;
                    accumulated += "</details>\n\n";
                    continue; // Skip the "</think>" tag itself
                }
                accumulated += content;
                await delay(20);
            }
            console.log(isThinking);
            // stream end
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
            setStreamMessage(accumulated);
            setIsStreaming(false);
            setIsLoading(false);
        }
        if (error) {
            setIsError(true);
            setError(error);
            accumulated = "";
            //
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
            setStreamMessage(accumulated);
            setIsStreaming(false);
            setIsLoading(false);
        }
    };
    const useAbortSolveQuery = async () => {
        abortControllerRef.current?.abort();
    };
    return { handleSolveQuery, useAbortSolveQuery };
}
