"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
type UserInputContextType = {
    userInput: string;
    setUserInput: Dispatch<SetStateAction<string>>;
};

// Create the context with a default value
const UserInputContext = createContext<UserInputContextType | null>(null);

// Create a custom hook to use the UserInputContext
export const useUserInputContext = (): UserInputContextType => {
    const context = useContext(UserInputContext);
    if (!context) {
        throw new Error("useUserInputContext must be used within a UserInputProvider");
    }
    return context;
};

// Create a provider component
type MessagesProviderProps = {
    children: ReactNode;
};

export function UserInputProvider({ children }: MessagesProviderProps) {
    const [userInput, setUserInput] = useState<string>("");
    return <UserInputContext.Provider value={{ userInput, setUserInput }}>{children}</UserInputContext.Provider>;
}
