import Sidebar from "@/components/pages_components/home_page/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import useZustandStore from "@/store/zustand/useZustandStore";
import { ChartNoAxesGantt } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    const { isSidebarOpen, setIsSidebarOpen } = useZustandStore((state) => state);
    return (
        <>
            <Sidebar
                className={`fixed inset-0 h-screen w-72 bg-background shadow-inner ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            />
            <div
                className={`${
                    isSidebarOpen ? "sm:ml-72" : "sm:ml-0"
                } transition-[margin-left] duration-300 ease-in-out p-2`}
            >
                <div className="flex justify-between min-h-16">
                    <div>
                        <Button
                            className={`h-8 w-8 p-0 block ${isSidebarOpen ? "sm:hidden" : "sm:block"}`}
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <ChartNoAxesGantt />
                        </Button>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    );
}
