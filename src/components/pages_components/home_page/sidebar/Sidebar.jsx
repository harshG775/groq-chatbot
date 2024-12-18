import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useZustandStore from "@/store/zustand/useZustandStore";
import { ChartNoAxesGantt, SquarePen } from "lucide-react";
export default function Sidebar({ ...props }) {
    const { isSidebarOpen, setIsSidebarOpen } = useZustandStore((state) => state);
    return (
        <>
            <div {...props} className={cn("p-2 z-50", props.className)}>
                <div className="flex justify-between">
                    <div>
                        <Button
                            className="h-8 w-8 p-0"
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <ChartNoAxesGantt />
                        </Button>
                    </div>

                    <div>
                        <Button
                            className="h-8 w-8 p-0"
                            size={"icon"}
                            variant="ghost"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <SquarePen />
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isSidebarOpen ? "z-40 fixed inset-0 bg-foreground opacity-[0.5]" : "opacity-0"
                } transition-opacity duration-200 md:hidden`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>
        </>
    );
}
