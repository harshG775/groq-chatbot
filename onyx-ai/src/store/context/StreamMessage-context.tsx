"use client";
import { Message } from "@/types/messages/message";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type StreamMessageContextType = {
    streamMessage: Message;
    setStreamMessage: Dispatch<SetStateAction<Message>>;

    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;

    canceled: boolean;
    setCanceled: Dispatch<SetStateAction<boolean>>;

    error: unknown | null;
    setError: Dispatch<SetStateAction<unknown | null>>;

    streaming: boolean;
    setStreaming: Dispatch<SetStateAction<boolean>>;
};

// Create the context with a default value
const StreamMessageContext = createContext<StreamMessageContextType | null>(null);

// Create a custom hook to use the StreamMessageContext
export const useStreamMessageContext = (): StreamMessageContextType => {
    const context = useContext(StreamMessageContext);
    if (!context) {
        throw new Error("useStreamMessageContext must be used within a StreamMessageProvider");
    }
    return context;
};

// Create a provider component
type MessagesProviderProps = {
    children: ReactNode;
};

export function StreamMessageProvider({ children }: MessagesProviderProps) {
    const [streamMessage, setStreamMessage] = useState<Message>({
        role: "assistant",
        content: "",
    });
    const [loading, setLoading] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [error, setError] = useState<unknown | null>(null);
    const [streaming, setStreaming] = useState(false);
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
                streaming,
                setStreaming,
            }}
        >
            {children}
        </StreamMessageContext.Provider>
    );
}
