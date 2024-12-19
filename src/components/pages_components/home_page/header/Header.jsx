import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useZustandStore from "@/store/zustand/useZustandStore";
import { ChartNoAxesGantt, SquarePen } from "lucide-react";

export default function Header({ ...props }) {
    const { isSidebarOpen, setIsSidebarOpen } = useZustandStore((state) => state);
    return (
        <div className={cn("p-2 flex justify-between", props?.className)}>
            <div>
                <Button
                    className={`h-8 w-8 p-0 block ${isSidebarOpen ? "invisible" : "visible"}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <ChartNoAxesGantt />
                </Button>
            </div>
            <div>Groq ChatGPT</div>
            <div>
                <Button className={`h-8 w-8 p-0 ${isSidebarOpen ? "invisible" : "visible"}`} size={"icon"} variant="ghost" onClick={() => setIsSidebarOpen(false)}>
                    <SquarePen />
                </Button>
            </div>
        </div>
    );
}
