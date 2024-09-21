"use client";
import { createContext, useContext, useState } from "react";

const MessagesContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMessagesContext = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error(
            "useMessagesContext must be used within a MessagesProvider"
        );
    }

    return context;
};

export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState([]);

    return (
        <MessagesContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessagesContext.Provider>
    );
}
