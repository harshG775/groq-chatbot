import { create, devtools } from ".";

export type StreamMessage = {
    content: string;
    streaming: boolean;
};

interface StreamMessageStoreState {
    streamMessage: StreamMessage;
    setStreamMessage: (value: StreamMessage | ((prev: StreamMessage) => StreamMessage)) => void;
}

export const useStreamMessageStore = create<StreamMessageStoreState>()(
    devtools((set) => ({
        streamMessage: {
            content: "string",
            streaming: false,
        },
        setStreamMessage: (newState) => {
            return set((prevState) => ({
                streamMessage: typeof newState === "function" ? newState(prevState.streamMessage) : newState,
            }));
        },
    }))
);
