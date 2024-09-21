import InputBar from "@/components/pages_components/chat/inputBar/InputBar";
import ChatArea from "@/components/pages_components/chat/chatArea/ChatArea";
import Header from "@/components/pages_components/chat/header/Header";
import Sidebar from "@/components/pages_components/chat/sidebar/Sidebar";

export default function ChatPage() {
    return (
        <div className="fixed inset-0 h-svh grid md:grid-cols-[16rem_auto] grid-rows-[auto_1fr_auto] gap-2 px-2 bg-secondary/50">
            <Sidebar className={"md:row-span-3"} />
            <Header />
            <ChatArea />
            <InputBar />
        </div>
    );
}
