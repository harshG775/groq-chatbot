import { create } from "zustand";

const useStore = create((set) => ({
    isSidebarOpen: false,
    currentHistory: null,
    setIsSidebarOpen: (newSidebar) => set({ isSidebarOpen: newSidebar }),
    setCurrentHistory: (newHistory) => set({ currentHistory: newHistory }),
}));

export default useStore;
