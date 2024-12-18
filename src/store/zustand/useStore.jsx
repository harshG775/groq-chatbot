import { catchError } from "@/utils/catchError";
import { Fetch } from "@/utils/Fetch";
import parseCookies from "@/utils/parseCookies";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
// Utility function for handling state updates
const createUpdater = (set, key) => (updater) => {
    return set((prevState) => ({
        [key]: typeof updater === "function" ? updater(prevState[key]) : updater,
    }));
};

const useZustandStore = create()(
    devtools((set) => ({
        // Sidebar state
        isSidebarOpen: false,
        setIsSidebarOpen: createUpdater(set, "isSidebarOpen"),

        // Chat history state
        chatHistory_isLoading: false,
        chatHistory_error: null,
        chatHistory: [],
        fetchChatHistory: async () => {
            const token = parseCookies()?.token || null;
            if (!token) {
                set({ chatHistory_error: "No token found" });
                console.error("No token found");
                return;
            }
            set({ chatHistory_isLoading: true });
            set({ chatHistory_error: null });
            set({ chatHistory: [] });
            const [error, response] = await catchError(
                Fetch("https://onyx-ai-server.vercel.app/api/v1/histories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            );
            if (error) {
                console.error("Fetch error:", error.message, "\nResponse:", error.response);
                set({ chatHistory_error: `${error?.response?.message || error?.message}` });
            } else {
                const responseJson = await response.json();
                set({ chatHistory: responseJson?.data?.histories });
            }
            set({ chatHistory_isLoading: false });
        },

        // Current chat state
        currentChatHistory_isLoading: false,
        currentChatHistory_error: null,
        currentChatHistory: {
            id: null,
            title: null,
            messages: [],
        },
        setCurrentChatHistory: createUpdater(set, "currentChatHistory"),
    }))
);

// export default useZustandStore;
