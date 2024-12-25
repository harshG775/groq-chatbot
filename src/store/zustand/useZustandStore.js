import { create } from "zustand";
import { devtools } from "zustand/middleware";
// Utility function for handling state updates
const createUpdater = (set, key) => {
    return (updater) => {
        return set((prevState) => ({
            [key]: typeof updater === "function" ? updater(prevState[key]) : updater,
        }));
    };
};

const useZustandStore = create()(
    devtools((set) => ({
        // Sidebar state
        isSidebarOpen: false,
        setIsSidebarOpen: createUpdater(set, "isSidebarOpen"),

        // Chat state
        contentStream: { content: "", status: "idle" },
        setContentStream: (newState) => {
            set(() => {
                return {
                    contentStream: newState,
                };
            });
        },
    }))
);

export default useZustandStore;
