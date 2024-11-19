import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMessagesContext } from "@/store/context/Messages-context";
import { PanelRightClose, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderArea({ className, ...props }) {
    const { setMessages } = useMessagesContext();
    const handleNewChat = () => {
        localStorage.removeItem("messages");
        setMessages([]);
    };
    return (
        <div className={cn("overflow-y-auto border flex items-center", className)} {...props}>
            <Button className="h-8 w-8 p-0" size={"icon"} variant="ghost">
                <PanelRightClose className="h-4 w-4 text-foreground" />
            </Button>
            <Button className="h-8 w-8 p-0" size={"icon"} variant="ghost" title="New chat" onClick={handleNewChat}>
                <SquarePen className="h-4 w-4 text-foreground" />
            </Button>

            <div className="font-semibold uppercase mx-auto">Heading</div>
            <Button className="h-8 w-8 p-0 rounded-full" size={"icon"} variant="secondary">
                <div className="border rounded-full h-8 w-8"></div>
            </Button>
            <Link
                to="/test"
                className="h-8 w-8 p-0"
                size={"icon"}
                variant="ghost"
                title="New chat"
                onClick={handleNewChat}
            >
                <div className="h-4 w-4 text-foreground">Test</div>
            </Link>
        </div>
    );
}
