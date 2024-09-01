import Sidebar from "@/components/pages_components/chat/Sidebar";
import TopBar from "@/components/pages_components/chat/TopBar";
import { Outlet } from "react-router-dom";

export default function ChatLayout() {
    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <Outlet />
            </div>
        </div>
    );
}
