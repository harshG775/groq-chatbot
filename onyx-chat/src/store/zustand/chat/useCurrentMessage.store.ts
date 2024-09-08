import { create } from "zustand";

type CurrentMessage = {
    currentMessage: string;
    setCurrentMessage: (message: string) => void;
}

export const useCurrentMessage = create<CurrentMessage>((set) => ({
    currentMessage: "",
    setCurrentMessage: (message) => set({ currentMessage: message }),
}));
