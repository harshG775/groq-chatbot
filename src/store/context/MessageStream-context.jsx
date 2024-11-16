import { createContext, useContext, useState } from "react";

export const MessageContext = createContext(null);

export function MessageStreamProvider({ children }) {
    const [messageStream, setMessageStream] = useState("");

    const contextValue = { messageStream, setMessageStream };

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMessageStreamContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageStreamContext must be used within a MessageStreamProvider");
    }
    return context;
};
