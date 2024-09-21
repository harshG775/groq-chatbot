import { MessagesProvider } from "@/store/context/Messages-context";
import { StreamMessageProvider } from "@/store/context/StreamMessage-context";

export default function Providers({ children }) {
    return (
        <>
            <MessagesProvider>
                <StreamMessageProvider>
                    {children}
                </StreamMessageProvider>
            </MessagesProvider>
        </>
    );
}
