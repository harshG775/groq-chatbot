import { useStreamMessageContext } from "@/store/context/StreamMessage-context";
import { Chat } from "./Chat-Stream";

export default function MessageStream() {
    const { streamMessage, streaming } = useStreamMessageContext();
    return (
        <>
            {streaming && <Chat message={streamMessage} />}
        </>
    );
}
