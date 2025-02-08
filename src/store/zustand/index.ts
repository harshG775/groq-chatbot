import { create } from "zustand";

export const useStore = create((set) => ({
    bears: 0,
    updateBears: (newBears: number) => set({ bears: newBears }),
}));
