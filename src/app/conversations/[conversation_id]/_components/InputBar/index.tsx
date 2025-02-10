"use client";
import { Button } from "@/components/ui/button";
import { Plus, SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function InputBar() {
    const [userPrompt, setUserPrompt] = useState("");
    return (
        <div className="w-full px-2">
            <div className="pb-4 px-2 space-y-1 max-w-[74rem] mx-auto">
                <div className="bg-secondary p-2 rounded-xl focus:border-none">
                    <textarea
                        name="userPrompt"
                        placeholder="Message"
                        className="bg-secondary w-full rounded-2xl h-10 min-h-10 max-h-48 p-2"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between items-center">
                        <Button size={"icon"} variant={"ghost"} className="rounded-full">
                            <Plus />
                        </Button>
                        <Button size={"icon"} variant={"ghost"} className="rounded-full">
                            <SendHorizonal />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
