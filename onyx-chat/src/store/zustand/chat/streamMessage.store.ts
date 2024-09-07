import { create } from "zustand";

interface StoreState {
    streamMessage: string;
    setStreamMessage: (message: string) => void;
}

export const useStreamMessage = create<StoreState>((set) => ({
    streamMessage: "",
    setStreamMessage: (message) => set({ streamMessage: message }),
}));
