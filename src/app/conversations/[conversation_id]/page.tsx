"use client";
import { Button } from "@/components/ui/button";
import { Expand, Minimize, UserCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ConversationPage() {
    const params = useParams();
    const [isFullScreenPreview, setIsFullScreenPreview] = useState(true);
    return (
        <>
            <div className={`${isFullScreenPreview ? "select-none" : ""} fixed inset-0 w-1/2  flex flex-col`}>
                <header className="flex justify-between w-full p-4">
                    <div className="font-semibold">HEADER</div>
                    <Button variant={"ghost"}>
                        <UserCircle />
                    </Button>
                </header>
                <main className="overflow-auto scrollbar-color">
                    <ul>
                        {Array.from({ length: 200 }, (_: any, i: number) => (
                            <li key={i}>Conversation</li>
                        ))}
                    </ul>
                </main>
                <div className="bg-secondary">
                    <div className="p-4">
                        <textarea name="userPrompt" id="" className="w-full"></textarea>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isFullScreenPreview ? "fixed inset-0" : "fixed right-0 top-0 bottom-0 w-1/2"
                }    flex flex-col bg-background`}
            >
                <div className="flex justify-between w-full p-4">
                    <div>code/preview</div>
                    <Button variant={"ghost"} onClick={() => setIsFullScreenPreview((prev) => !prev)}>
                        {isFullScreenPreview ? <Minimize /> : <Expand />}
                    </Button>
                </div>
                <div className="overflow-auto scrollbar-color">
                    <ul>
                        {Array.from({ length: 200 }, (_: any, i: number) => (
                            <li key={i}>code block</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
