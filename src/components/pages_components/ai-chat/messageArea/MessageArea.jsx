import useScrollToBottom from "@/hooks/useScrollToBottom";
import { useStoreContext } from "@/store/reducer-context/context";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import ChatBubble from "./ChatBubble";
import { useMessageStreamContext } from "@/store/context/MessageStream-context";
import { Bot } from "lucide-react";

export default function MessageArea({ className, ...props }) {
    const { messageStream } = useMessageStreamContext();
    const { state } = useStoreContext();
    const { messages } = state;
    const { scrollRef, scrollToBottom } = useScrollToBottom();

    // initialize
    useEffect(() => {
        scrollToBottom({ behavior: "auto" });
    }, [scrollToBottom]);

    // on every message change
    useEffect(() => {
        scrollToBottom({ behavior: "smooth" });
    }, [messages, scrollToBottom]);

    return (
        <div className={cn("overflow-y-auto border", className)} {...props} ref={scrollRef}>
            <div className="space-y-8 max-w-2xl mx-auto min-h-full">
                {messages.length < 1 && (
                    <div className="min-h-96 grid justify-center items-center">
                        <div>
                            <Bot className="h-10 w-10 mx-auto" />
                            <h1 className="text-xl font-medium">What can I help with?</h1>
                        </div>
                    </div>
                )}
                {messages?.map((el, i) => (
                    <ChatBubble key={i} message={el} />
                ))}
                {messageStream?.streaming && <ChatBubble message={messageStream} />}
                <div className="h-20" />
            </div>
        </div>
    );
}
