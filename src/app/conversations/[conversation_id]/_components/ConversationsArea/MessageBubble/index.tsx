import { Message, useStreamMessageStore } from "@/store/zustand";
import { Bot } from "lucide-react";

export function UserMessageBubble({ message }: { message: Message }) {
    return (
        <div className="bg-primary/20    max-w-max p-2 rounded-xl">
            <div>{message.content}</div>
        </div>
    );
}
export function AssistantMessageBubble({ message }: { message: Message }) {
    return (
        <>
            <div>
                <div className="w-10 h-10 grid place-content-center bg-secondary/20  rounded-t-full">
                    <Bot />
                </div>
            </div>
            <div className="bg-secondary/20 p-2 rounded-b-xl rounded-r-xl">
                <div>{message.content}</div>
            </div>
        </>
    );
}
export function AssistantStreamMessageBubble() {
    const streamMessage = useStreamMessageStore((state) => state.streamMessage);
    const isStreaming = useStreamMessageStore((state) => state.isStreaming);
    const isLoading = useStreamMessageStore((state) => state.isLoading);
    const error = useStreamMessageStore((state) => state.error);
    if (isLoading) {
        return (
            <>
                <div>
                    <div className="w-10 h-10 grid place-content-center bg-secondary/20  rounded-t-full">
                        <Bot />
                    </div>
                </div>
                <div className="bg-secondary/20 p-2 rounded-b-xl rounded-r-xl">
                    <div>{isStreaming && streamMessage}</div>
                    <div>{isLoading && "loading..."}</div>
                    <div>{error && JSON.stringify(error)}</div>
                </div>
            </>
        );
    }
}
