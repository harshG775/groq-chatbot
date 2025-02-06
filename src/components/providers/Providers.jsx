import { StreamingMessageProvider } from "@/store/context/StreamingMessage-context";
import { RefsContextProvider } from "@/store/context/Refs-context";
import { InputMessageProvider } from "@/store/context/MessageInput-context";
import { MessagesProvider } from "@/store/context/Messages-context";
import { ModelsProvider } from "@/store/context/Models-context";

export default function Providers({ children }) {
    return (
        <>
            <ModelsProvider>
                <MessagesProvider>
                    <InputMessageProvider>
                        <StreamingMessageProvider>
                            <RefsContextProvider>
                                {children}
                            </RefsContextProvider>
                        </StreamingMessageProvider>
                    </InputMessageProvider>
                </MessagesProvider>
            </ModelsProvider>
        </>
    );
}
