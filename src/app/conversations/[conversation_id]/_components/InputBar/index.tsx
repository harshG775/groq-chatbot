"use client";
import { AutosizeTextarea } from "@/components/ui/AutosizeTextareaDemo";
import { Button } from "@/components/ui/button";
import useSolveQuery from "@/services/groq/useSolveQuery";
import { useUserPromptStore } from "@/store/zustand";
import { Plus, SendHorizonal } from "lucide-react";

export default function InputBar() {
    const userPrompt = useUserPromptStore((state) => state.userPrompt);
    const setUserPrompt = useUserPromptStore((state) => state.setUserPrompt);
    const { solveQuery } = useSolveQuery({ userPrompt });

    const handleSubmit = async () => {
        await solveQuery();
    };
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    return (
        <div className="w-full px-2">
            <div className="pb-4 px-2 space-y-1 max-w-[74rem] mx-auto">
                <div className="bg-secondary p-2 rounded-xl focus:border-none">
                    <AutosizeTextarea
                        name="userPrompt"
                        placeholder="Message"
                        className="bg-secondary w-full rounded-md max-h-48 px-2 focus:outline-none focus-visible:ring-1 border-none"
                        maxHeight={208}
                        minHeight={30}
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        onKeyDown={handleOnKeyDown}
                    />
                    <div className="flex mt-2 justify-between items-center">
                        <Button size={"icon"} variant={"ghost"} className="rounded-full">
                            <Plus />
                        </Button>
                        <Button size={"icon"} variant={"ghost"} className="rounded-full">
                            <SendHorizonal onClick={handleSubmit} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
