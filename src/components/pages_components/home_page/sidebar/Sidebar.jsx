import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useZustandStore from "@/store/zustand/useZustandStore";
import { ChartNoAxesGantt, SquarePen } from "lucide-react";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import ChatHistory from "./ConversationHistory";
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
                        <Button className="h-8 w-8 p-0" size={"icon"} variant="ghost" asChild>
                            <Link to="/">
                                <SquarePen />
                            </Link>
                        </Button>
                    </div>
                </div>
                <ChatHistory/>
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
