"use client";
import { createContext, useContext, useState } from "react";

const StreamMessageContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useStreamMessageContext = () => {
    const context = useContext(StreamMessageContext);
    if (!context) {
        throw new Error(
            "useStreamMessageContext must be used within a StreamMessageProvider"
        );
    }
    return context;
};
export function StreamMessageProvider({ children }) {
    const [streamMessage, setStreamMessage] = useState({
        role: "assistant",
        content: "",
    });
    const [loading, setLoading] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [error, setError] = useState(null);

    return (
        <StreamMessageContext.Provider
            value={{
                streamMessage,
                setStreamMessage,

                loading,
                setLoading,

                canceled,
                setCanceled,

                error,
                setError,
            }}
        >
            {children}
        </StreamMessageContext.Provider>
    );
}
