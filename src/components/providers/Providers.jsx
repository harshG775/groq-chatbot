import { MessageStreamProvider } from "@/store/context/MessageStream-context";
import { RefsContextProvider } from "@/store/context/Refs-context";
import { StoreProvider } from "@/store/reducer-context/Provider";

export default function Providers({ children }) {
    return (
        <>
            <StoreProvider>
                <MessageStreamProvider>
                    <RefsContextProvider>
                        {children}
                    </RefsContextProvider>
                </MessageStreamProvider>
            </StoreProvider>
        </>
    );
}
