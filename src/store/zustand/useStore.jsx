import { create } from "zustand";

const useStore = create((set) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (newSidebar) => set({ isSidebarOpen: newSidebar }),
}));

export default useStore;
