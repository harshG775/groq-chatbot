import { useStreamMessageContext } from "@/store/context/StreamMessage-context";
import { ChatStream } from "./Chat-Stream";

export default function MessageStream() {
    const { streamMessage, streaming } = useStreamMessageContext();
    return (
        <>
            {streaming && <ChatStream message={streamMessage} />}
        </>
    );
}
