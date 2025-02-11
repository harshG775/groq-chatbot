import { ChatCompletionRole } from "groq-sdk/resources/chat/completions.mjs";
import { create, devtools } from ".";

export type Attachments = [
    {
        type: "document" | "image" | "code";
        code: string;
    }
];
export type Message = {
    id: string;
    role: ChatCompletionRole;
    content: string;
    attachments: Attachments | null;
};

interface MessagesStoreState {
    messages: Message[];
    setMessages: (value: Message[] | ((prev: Message[]) => Message[])) => void;
}

export const useMessagesStore = create<MessagesStoreState>()(
    devtools((set) => ({
        messages: [],
        setMessages: (newState) => {
            return set((prevState) => ({
                messages: typeof newState === "function" ? newState(prevState.messages) : newState,
            }));
        },
    }))
);
