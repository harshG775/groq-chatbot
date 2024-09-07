import { create } from "zustand";

export type message = {
    role: "user" | "assistant" | "system";
    content: string;
};

type MessagesStoreType = {
    messages: message[];
    // eslint-disable-next-line no-unused-vars
    addMessage: (newMessage: message) => void;
    clearMessages: () => void;
};

export const useMessagesStore = create<MessagesStoreType>((set) => ({
    messages: [
        { role: "assistant", content: "Hello! How can I assist you today?" },
    ],
    addMessage: (newMessage) => {
        set((state) => ({
            messages: [...state.messages, newMessage],
        }));
    },
    clearMessages: () => set({ messages: [] }),
}));
