import { create } from "zustand";
import { message } from "./messages.store";

type MessageStoreType = {
    message: message;
    // eslint-disable-next-line no-unused-vars
    addMessage: (newMessage: message) => void;
    clearMessages: () => void;
};

export const useNewMessageStore = create<MessageStoreType>((set) => ({
    message: {
        role: "assistant",
        content: "",
    },
    addMessage: (newMessage) => {
        set(() => ({
            message: newMessage,
        }));
    },
    clearMessages: () => set({ message: { role: "assistant", content: "" } }),
}));
