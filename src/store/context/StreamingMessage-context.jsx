import { createContext, useContext, useState } from "react";

const StreamingMessageContext = createContext(null);

export function StreamingMessageProvider({ children }) {
    const [streamingMessage, setStreamingMessage] = useState({ role: "", content: "", streaming: false });

    return (
        <StreamingMessageContext.Provider value={{ streamingMessage, setStreamingMessage }}>
            {children}
        </StreamingMessageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStreamingMessageContext = () => {
    const context = useContext(StreamingMessageContext);
    if (!context) {
        throw new Error("useStreamingMessageContext must be used within a StreamingMessageProvider");
    }
    return context;
};
