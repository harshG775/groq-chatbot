import Header from "@/components/pages_components/home_page/header/Header";
import Sidebar from "@/components/pages_components/home_page/sidebar/Sidebar";
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
                } transition-[margin-left] duration-300 ease-in-out `}
            >
                <Header className={"sticky top-0 z-50 bg-background "} />

                <Outlet />
            </div>
        </>
    );
}
