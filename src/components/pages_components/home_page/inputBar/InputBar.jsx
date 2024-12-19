import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Paperclip, SendHorizonal } from "lucide-react";
import { useLocation } from "react-router-dom";
export default function InputBar({ ...props }) {
    const location = useLocation();
    if (location.pathname === "/") {
        return null;
    }
    return (
        <div className={cn("", props?.className)}>
            <div className="pl-2 pr-6 pb-2">
                <textarea placeholder="Type your message..." className="border p-2 rounded w-full h-full" />
                <div className="flex justify-between">
                    <div>
                        <Button variant="ghost" size="icon">
                            <Paperclip />
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost" size="icon">
                            <SendHorizonal />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
