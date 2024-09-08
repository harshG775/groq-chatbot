import AutoGrowingTextarea from "@/components/pages_components/chat/inputBar/AutoGrowingTextarea";
import { Button } from "@/components/ui/button";
import { CircleArrowUp } from "lucide-react";
export default function InputBar() {
    return (
        <div className="rounded-md border p-2 mb-2">
            <form className="flex justify-between items-center">
                <AutoGrowingTextarea />
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        type="submit"
                        disabled={false}
                    >
                        <CircleArrowUp />
                    </Button>
                </div>
            </form>
        </div>
    );
}
