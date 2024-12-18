import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useZustandStore from "@/store/zustand/useZustandStore";
import { ChartNoAxesGantt, SquarePen } from "lucide-react";
import { useLayoutEffect } from "react";
export default function Sidebar({ ...props }) {
    const { isSidebarOpen, setIsSidebarOpen } = useZustandStore((state) => state);
    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const handleMediaQueryChange = (e) => {
            setIsSidebarOpen(e.matches);
        };
        // Set the initial state
        setIsSidebarOpen(mediaQuery.matches);
        // Listen for changes
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, [setIsSidebarOpen]);
    return (
        <>
            <div {...props} className={cn("z-50 flex flex-col", props?.className)}>
                <div className="p-2 flex justify-between min-h-10">
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
                <ScrollArea className="h-full">
                    <ul className="p-4 flex flex-col gap-2">
                        <li className="min-h-56 border-2">Item 1</li>
                        <li className="min-h-56 border-2">Item 2</li>
                        <li className="min-h-56 border-2">Item 3</li>
                    </ul>
                </ScrollArea>
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
