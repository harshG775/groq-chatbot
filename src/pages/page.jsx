import HeaderArea from "@/components/pages_components/ai-chat/headerArea/HeaderArea";
import InputArea from "@/components/pages_components/ai-chat/inputArea/InputArea";
import MessageArea from "@/components/pages_components/ai-chat/messageArea/MessageArea";
import Sidebar from "@/components/pages_components/ai-chat/sidebar/Sidebar";
import useStore from "@/store/zustand/useStore";
export default function HomePage() {
    const { isSidebarOpen, currentHistory } = useStore();
    return (
        <>
            <Sidebar />
            <div
                className={`${
                    isSidebarOpen ? "md:ml-64" : "md:ml-0"
                } transition-[margin-left] flex flex-col h-dvh fixed inset-0`}
            >
                <HeaderArea className="p-2" />
                {currentHistory ? (
                    <>
                        <MessageArea className={"flex-1 p-2"} />
                        <InputArea className="p-2" />
                    </>
                ) : (
                    <div className="flex-1 p-2 flex items-center justify-center">
                        <div className="text-center">
                            <InputArea className="p-2" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
