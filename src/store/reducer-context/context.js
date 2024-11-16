import { createContext, useContext } from "react";
import { initialState } from "./reducer";

// Create the context with a default value
export const StoreContext = createContext({
    state: initialState,
    dispatch: () => {
        throw new Error("Dispatch function is not ready.");
    },
});

// Create a custom hook to use the StoreContext
export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("StoreContext must be used within a StoreProvider");
    }
    return context;
};
