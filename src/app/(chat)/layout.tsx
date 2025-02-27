import Header from "@/components/partials/chat/Header";
import React, { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            {children}
        </div>
    );
}
