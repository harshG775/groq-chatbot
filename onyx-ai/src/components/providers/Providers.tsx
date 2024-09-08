import { MessagesProvider } from "@/store/context/Messages-context";
import { ThemeProvider } from "./theme-provider";

type ProvidersPropsType = { children: React.ReactNode };
export default function Providers({ children }: ProvidersPropsType) {
    return (
        <MessagesProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange={true}
            >
                {children}
            </ThemeProvider>
        </MessagesProvider>
    );
}
