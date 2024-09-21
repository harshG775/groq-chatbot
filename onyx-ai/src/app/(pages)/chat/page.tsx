import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SidebarHistory from "@/components/pages_components/chat/SidebarHistory";
import InputBar from "@/components/pages_components/chat/inputBar/InputBar";
import ChatArea from "@/components/pages_components/chat/chatArea/ChatArea";
import Header from "@/components/pages_components/chat/header/Header";

export default function ChatPage() {
    return (
        <div className="fixed inset-0 h-svh grid md:grid-cols-[16rem_auto] grid-rows-[auto_1fr_auto] gap-2 px-2 bg-secondary/50">
            <SidebarHistory />
            <Header />
            <ChatArea />
            <InputBar />
        </div>
    );
}
