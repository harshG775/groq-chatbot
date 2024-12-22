import { Toaster } from "@/components/ui/toaster";

export default function ToasterProvider({ children }) {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
}
