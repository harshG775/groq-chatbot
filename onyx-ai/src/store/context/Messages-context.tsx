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
    const [messages, setMessages] = useState<message[]>([]);
    return (
        <MessagesContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessagesContext.Provider>
    );
}
