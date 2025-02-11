import { create, devtools } from ".";

interface StreamMessageStoreState {
    isLoading: boolean;
    isError: boolean;
    streamMessage: string;
    isStreaming: boolean;
    error: Error;
    setStreamMessage: (value: string | ((prev: string) => string)) => void;
    setIsStreaming: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
    setIsError: (value: boolean) => void;
    setError: (value: Error) => void;
}

export const useStreamMessageStore = create<StreamMessageStoreState>()(
    devtools((set) => ({
        streamMessage: "",
        isStreaming: false,
        isLoading: false,
        isError: false,
        error: null,

        setStreamMessage: (newState) => {
            return set(
                (prevState) => ({
                    streamMessage: typeof newState === "function" ? newState(prevState.streamMessage) : newState,
                }),
                undefined,
                "setStreamMessage"
            );
        },
        setIsStreaming: (newState) => set({ isStreaming: newState }, undefined, "setIsStreaming"),
        setIsLoading: (newState) => set({ isLoading: newState }, undefined, "setIsLoading"),
        setIsError: (newState) => set({ isError: newState }, undefined, "setIsError"),
        setError: (newState) => set({ error: newState }, undefined, "setError"),
    }))
);
