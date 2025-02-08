"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Expand, Minimize, UserCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ConversationPage() {
    const params = useParams();
    const [isFullScreenPreview, setIsFullScreenPreview] = useState(false);
    return (
        <>
            <div className={`fixed inset-0  flex flex-col`}>
                <header className="flex justify-between w-full p-4">
                    <div className="font-semibold">HEADER</div>
                    <div>
                        <ModeToggle className="rounded-full" />

                        <Button size={"icon"} variant={"ghost"} className="rounded-full">
                            <UserCircle />
                        </Button>
                    </div>
                </header>
                <main className="overflow-auto scrollbar-color px-4">
                    <div className="max-w-6xl mx-auto">
                        <ul>
                            {Array.from({ length: 10 }, (_: any, i: number) => (
                                <li key={i}>Conversation</li>
                            ))}
                        </ul>
                        <div
                            className={` ${
                                isFullScreenPreview ? "fixed inset-0" : "h-[28rem] rounded-lg mt-16 mb-8"
                            }  bg-secondary border-x overflow-hidden flex flex-col`}
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
                                    {Array.from({ length: 100 }, (_: any, i: number) => (
                                        <li key={i}>CODE BLOCK</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <ul>
                            {Array.from({ length: 100 }, (_: any, i: number) => (
                                <li key={i}>Conversation</li>
                            ))}
                        </ul>
                    </div>
                </main>
                <div className="bg-secondary">
                    <div className="p-4">
                        <textarea name="userPrompt" id="" className="w-full"></textarea>
                    </div>
                </div>
            </div>
        </>
    );
}
