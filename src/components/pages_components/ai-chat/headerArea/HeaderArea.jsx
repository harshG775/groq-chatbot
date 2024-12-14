import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMessagesContext } from "@/store/context/Messages-context";
import useStore from "@/store/zustand/useStore";
import { PanelRightClose, SquarePen } from "lucide-react";
export default function HeaderArea({ className, ...props }) {
    const { isSidebarOpen, setIsSidebarOpen,setCurrentHistory } = useStore();

    const { setMessages } = useMessagesContext();
    const handleNewChat = () => {
        localStorage.removeItem("messages");
        setCurrentHistory(null)
        setMessages([]);
    };
    const handleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className={cn("overflow-y-auto flex items-center shadow-md", className)} {...props}>
            <Button className={`${isSidebarOpen ? "md:w-0" : "md:w-8"} h-8 p-0 transition-[width]`} size={"icon"} variant="ghost" onClick={handleSidebar}>
                <PanelRightClose className="h-4 w-4 text-foreground" />
            </Button>
            <Button className="h-8 w-8 p-0" size={"icon"} variant="ghost" title="New chat" onClick={handleNewChat}>
                <SquarePen className="h-4 w-4 text-foreground" />
            </Button>

            <div className="font-semibold uppercase mx-auto">Heading</div>
            <Button className="h-8 w-8 p-0 rounded-full" size={"icon"} variant="secondary">
                <div className="border rounded-full h-8 w-8"></div>
            </Button>
        </div>
    );
}
