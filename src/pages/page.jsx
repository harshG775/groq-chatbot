import HeaderArea from "@/components/pages_components/ai-chat/headerArea/HeaderArea";
import InputArea from "@/components/pages_components/ai-chat/inputArea/InputArea";
import MessageArea from "@/components/pages_components/ai-chat/messageArea/MessageArea";
import { Button } from "@/components/ui/button";
import useStore from "@/store/zustand/useStore";
import { PanelRightOpen } from "lucide-react";
export default function HomePage() {
    const { isSidebarOpen, setIsSidebarOpen } = useStore();
    return (
        <>
            <>
                <div
                    className={`${
                        isSidebarOpen ? "translate-x-[0%]" : "-translate-x-full"
                    } transition-transform w-64 z-50 fixed inset-y-0 bg bg-background`}
                >
                    <div className="flex justify-between items-center w-full p-2 shadow-md">
                        <div>history</div>
                        <Button
                            className="h-8 w-8 p-0"
                            size={"icon"}
                            variant="ghost"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <PanelRightOpen className="h-4 w-4 text-foreground" />
                        </Button>
                    </div>
                    <ul>
                        <li>sidebar</li>
                    </ul>
                </div>
                <div
                    className={`${
                        isSidebarOpen ? "z-40 fixed inset-0 bg-foreground opacity-[0.5]" : "opacity-0"
                    } transition-opacity duration-200
                    md:hidden 
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            </>
            <div
                className={`${
                    isSidebarOpen ? "md:ml-64" : "md:ml-0"
                } transition-[margin-left] flex flex-col h-dvh fixed inset-0`}
            >
                <HeaderArea className="p-2" />
                <MessageArea className={"flex-1 p-2"} />
                <InputArea className="p-2" />
            </div>
        </>
    );
}
