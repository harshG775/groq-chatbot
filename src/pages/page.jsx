import HeaderArea from "@/components/pages_components/ai-chat/headerArea/HeaderArea";
import InputArea from "@/components/pages_components/ai-chat/inputArea/InputArea";
import MessageArea from "@/components/pages_components/ai-chat/messageArea/MessageArea";

export default function HomePage() {
    return (
        <div className="flex flex-col h-dvh fixed inset-0">
            <HeaderArea className="p-2" />
            <MessageArea className={"flex-1 p-2"} />
            <InputArea className="p-2" />
        </div>
    );
}
