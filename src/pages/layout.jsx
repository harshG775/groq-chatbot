import Header from "@/components/pages_components/home_page/header/Header";
import InputBar from "@/components/pages_components/home_page/inputBar/InputBar";
import Sidebar from "@/components/pages_components/home_page/sidebar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useZustandStore from "@/store/zustand/useZustandStore";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    const { isSidebarOpen } = useZustandStore((state) => state);
    return (
        <>
            <Sidebar
                className={`
                    fixed inset-0 h-screen w-72 bg-background transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            />
            <div
                className={`${
                    isSidebarOpen ? "md:ml-72" : "md:ml-0"
                } transition-[margin-left] duration-300 ease-in-out  h-dvh overflow-hidden flex flex-col`}
            >
                <Header />

                <ScrollArea className="flex-1 p-2  //overflow-auto">
                    <Outlet />
                </ScrollArea>
                <InputBar />
            </div>
        </>
    );
}
