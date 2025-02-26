import Header from "@/components/partials/chat/Header";
import React, { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
