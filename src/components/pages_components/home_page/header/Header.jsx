import { Button } from "@/components/ui/button";
import useZustandStore from "@/store/zustand/useZustandStore";
import { ChartNoAxesGantt } from "lucide-react";

export default function Header() {
    const { isSidebarOpen, setIsSidebarOpen } = useZustandStore((state) => state);
    return (
        <div className="p-2 flex justify-between min-h-10">
            <div>
                <Button
                    className={`h-8 w-8 p-0 block ${isSidebarOpen ? "sm:invisible" : "sm:visible"}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <ChartNoAxesGantt />
                </Button>
            </div>
        </div>
    );
}
