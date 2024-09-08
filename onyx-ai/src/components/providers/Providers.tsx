import { MessagesProvider } from "@/store/context/Messages-context";
import { ThemeProvider } from "./theme-provider";
import { UserInputProvider } from "@/store/context/UserInput-context";

type ProvidersPropsType = { children: React.ReactNode };
export default function Providers({ children }: ProvidersPropsType) {
    return (
        <UserInputProvider>
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
        </UserInputProvider>
    );
}
