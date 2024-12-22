import TanstackQueryProvider from "./TanstackQuery-Provider";
import ToasterProvider from "./Toaster-provider";

export default function Providers({ children }) {
    return (
        <>
            <TanstackQueryProvider>
                <ToasterProvider>
                    {children}
                </ToasterProvider>
            </TanstackQueryProvider>
        </>
    );
}
