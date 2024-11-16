import { createContext, useContext, useRef } from "react";

const RefsContext = createContext(null);

export const RefsContextProvider = ({ children }) => {
    const abortControllerRef = useRef(null);

    return (
        <RefsContext.Provider
            value={{
                abortControllerRef,
            }}
        >
            {children}
        </RefsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRefContext = () => {
    const refs = useContext(RefsContext);

    if (!refs) {
        throw new Error("useRefContext must be used within a RefsContextProvider");
    }

    return refs;
};
