import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ActionTypes } from "@/store/reducer-context/actions";
import { useStoreContext } from "@/store/reducer-context/context";
import { PanelRightClose, SquarePen } from "lucide-react";

export default function HeaderArea({ className, ...props }) {
    const { dispatch } = useStoreContext();
    const handleNewChat = () => {
        dispatch({
            type: ActionTypes.SET_MESSAGES,
            payload: [],
        });
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
        </div>
    );
}
