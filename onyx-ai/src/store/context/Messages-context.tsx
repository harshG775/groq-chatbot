"use client";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
export type message = {
    role: "user" | "assistant" | "system";
    content: string;
};

type MessagesContextType = {
    messages: message[];
    setMessages: Dispatch<SetStateAction<message[]>>;
};

// Create the context with a default value
const MessagesContext = createContext<MessagesContextType | null>(null);

// Create a custom hook to use the MessagesContext
export const useMessagesContext = (): MessagesContextType => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error(
            "useMessagesContext must be used within a MessagesProvider"
        );
    }
    return context;
};

// Create a provider component
type MessagesProviderProps = {
    children: ReactNode;
};

export function MessagesProvider({ children }: MessagesProviderProps) {
    const [messages, setMessages] = useState<message[]>([
        { role: "assistant", content: "Hello! How can I help you today?" },
        { role: "user", content: "Hi there! I have a question about React." },
        {
            role: "assistant",
            content:
                "Sure, I'd be happy to help with any React-related questions. What would you like to know?",
        },
    ]);
    return (
        <MessagesContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessagesContext.Provider>
    );
}
