import { Button } from "@/components/ui/button";
import { Message } from "@/store/zustand";
import { Expand, Minimize } from "lucide-react";
import { useState } from "react";

function CodeAttachment() {
    const [isFullScreenPreview, setIsFullScreenPreview] = useState(false);

    return (
        <div
            className={` ${
                isFullScreenPreview ? "fixed inset-0" : "h-[28rem] rounded-lg"
            }  bg-secondary/80 border-x overflow-hidden flex flex-col`}
        >
            <div className="flex justify-between items-center w-full">
                <div className="p-2">
                    <Button variant={"ghost"} className="h-8 rounded-r-none ">
                        preview
                    </Button>
                    <Button variant={"ghost"} className="h-8 rounded-l-none border">
                        code
                    </Button>
                </div>
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => setIsFullScreenPreview((prev) => !prev)}
                    className="mr-1"
                >
                    {isFullScreenPreview ? <Minimize /> : <Expand />}
                </Button>
            </div>
            <div className="overflow-auto scrollbar-color">
                <ul className="px-2">
                    {Array.from({ length: 100 }, (_, i: number) => (
                        <li key={i}>CODE BLOCK</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function Attachments({ message }: { message: Message }) {
    if (message.role === "user") {
        return (
            <div>
                <CodeAttachment />
            </div>
        );
    }
    if (message.role === "assistant") {
        return (
            <div>
                <CodeAttachment />
            </div>
        );
    }
}
