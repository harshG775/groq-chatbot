import React, { createContext, useContext, useRef, ReactNode } from "react";

// Define the type for your refs
type RefContextType = {
    BottomDivRef: React.RefObject<HTMLDivElement>;
    // Add more refs as needed
};

// Create a default context with empty refs
const defaultRefs: RefContextType = {
    BottomDivRef: { current: null },
    // Initialize more refs as needed
};

// Create the context
const RefContext = createContext<RefContextType>(defaultRefs);

type RefProviderProps = {
    children: ReactNode;
};

export function RefProvider({ children }: RefProviderProps) {
    // Create refs
    const refs = {
        BottomDivRef: useRef<HTMLDivElement>(null),
        // Add more refs as needed
    };

    return <RefContext.Provider value={refs}>{children}</RefContext.Provider>;
}

export const useRefs = () => useContext(RefContext);
