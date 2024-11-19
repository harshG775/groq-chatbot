import { createContext, useContext, useState } from "react";

const InputMessageContext = createContext(null);

export function InputMessageProvider({ children }) {
    const [inputMessage, setInputMessage] = useState("");

    return (
        <InputMessageContext.Provider value={{ inputMessage, setInputMessage }}>
            {children}
        </InputMessageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInputMessageContext = () => {
    const context = useContext(InputMessageContext);
    if (!context) {
        throw new Error("useInputMessageContext must be used within a InputMessageProvider");
    }
    return context;
};
