import TanstackQueryProvider from "./tanstack-query-provider";
import { ThemeProvider } from "./theme-provider";

type ProvidersPropsType = { children: React.ReactNode };
export default function Providers({ children }: ProvidersPropsType) {
    return (
        <TanstackQueryProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange={true}
            >
                {children}
            </ThemeProvider>
        </TanstackQueryProvider>
    );
}
