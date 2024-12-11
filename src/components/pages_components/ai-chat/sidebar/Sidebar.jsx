import { Button } from "@/components/ui/button";
import { useCookieContext } from "@/store/context/Cookie-context";
import { useMessagesContext } from "@/store/context/Messages-context";
import useStore from "@/store/zustand/useStore";
import { catchError } from "@/utils/catchError";
import { Fetch } from "@/utils/Fetch";
import { EllipsisVertical, PanelRightOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const { isSidebarOpen, setIsSidebarOpen } = useStore();
    const cookieStore = useCookieContext();
    
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    
    const [currentHistory, setCurrentHistory] = useState(null);
    const {messages, setMessages} = useMessagesContext()


    useEffect(() => {
        const handleFetchHistories = async () => {
            setIsLoading(true);
            setError("");
            setChatHistory(null);
            const token = cookieStore.get("token");
            const [error, response] = await catchError(
                Fetch("https://onyx-ai-server.vercel.app/api/v1/histories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            );
            if (error) {
                console.error("Fetch error:", error.message, "\nResponse:", error.response);

                setError(`${error?.response?.message || error?.message}`);
            }
            if (!error && response?.ok) {
                const data = await response.json();
                setChatHistory(data?.data?.histories);
            }
            setIsLoading(false);
        };
        handleFetchHistories();
    }, []);

    const handleSetCurrentHistory = async (history) => {
        if (currentHistory?.id === history?.id) {
            return;
        }
        setCurrentHistory(history);
        const token = cookieStore.get("token");
        const [error, response] = await catchError(
            fetch(`https://onyx-ai-server.vercel.app/api/v1/histories/${history.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
        );
        if (error) {
            console.error("Fetch error:", error.message, "\nResponse:", error.response);
            setError(`${error?.response?.message || error?.message}`);
            setCurrentHistory(null);
        }
        if (!error && response?.ok) {
            const data = await response.json();
            setCurrentHistory(data?.data?.history);
            setMessages(data?.data?.history?.messages);
        }
    };
    console.log(currentHistory);

    return (
        <>
            <div
                className={`${
                    isSidebarOpen ? "translate-x-[0%]" : "-translate-x-full"
                } transition-transform w-64 z-50 fixed inset-y-0 bg bg-background`}
            >
                <div className="flex justify-between items-center w-full p-2 shadow-md">
                    <div>history</div>
                    <Button
                        className="h-8 w-8 p-0"
                        size={"icon"}
                        variant="ghost"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <PanelRightOpen className="h-4 w-4 text-foreground" />
                    </Button>
                </div>
                <>
                    {isLoading && <div className="flex flex-col gap-1 p-2">Loading...</div>}
                    {error && <div className="flex flex-col gap-1 p-2">{error}</div>}
                    {chatHistory && (
                        <ul className="flex flex-col gap-1 p-2">
                            {chatHistory?.map((chat) => (
                                <li key={chat?.id} className="w-full flex text-left">
                                    <Button
                                        onClick={() => handleSetCurrentHistory(chat)}
                                        variant={currentHistory?.id === chat?.id ? "default" : "ghost"}
                                        className="flex-grow-0 truncate w-full block text-left rounded-none"
                                    >
                                        <div className="truncate">{chat?.title}</div>
                                    </Button>
                                    <Button
                                        variant={currentHistory?.id === chat?.id ? "default" : "ghost"}
                                        size={"icon"}
                                        className=" rounded-none"
                                    >
                                        <EllipsisVertical />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
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
