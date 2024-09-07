import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Next-Js App template",
    description: "with TailwindCSS and ShadeCn theme",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased`}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
