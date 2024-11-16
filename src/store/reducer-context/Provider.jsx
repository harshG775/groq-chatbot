import { useReducer } from "react";
import { StoreContext } from "./context";
import { storeReducer, initialState } from "./reducer";

// Create a provider component
export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    const contextValue = { state, dispatch };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}
