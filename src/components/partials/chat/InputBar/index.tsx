"use client";
import { AutosizeTextarea } from "@/components/ui/AutosizeTextareaDemo";
import { Button } from "@/components/ui/button";
import useSolveQuery from "@/services/groq/useSolveQuery";
import { useStreamMessageStore, useUserPromptStore } from "@/store/zustand";
import { Plus, SendHorizonal, Squircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function InputBar() {
    const isNewChatPage = usePathname() === "/";
    const router = useRouter();

    const userPrompt = useUserPromptStore((state) => state.userPrompt);
    const setUserPrompt = useUserPromptStore((state) => state.setUserPrompt);
    const { handleSolveQuery, useAbortSolveQuery } = useSolveQuery({ userPrompt });
    const isLoading = useStreamMessageStore((state) => state.isLoading);

    const handleSubmit = async () => {
        if (isLoading) return;
        handleSolveQuery();
        if (isNewChatPage) {
            router.push("conversations/new-chat123");
        }
    };
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (isLoading) return;
            handleSubmit();
        }
        if (isLoading) return;
    };
    return (
        <div className="w-full px-2">
            <div className="pb-4 px-2 space-y-1 sm:max-w-3xl mx-auto">
                <div className="bg-secondary/60 p-2 rounded-2xl outline outline-1 outline-input/0 focus-within:outline-ring">
                    <AutosizeTextarea
                        name="userPrompt"
                        placeholder="Message"
                        className="bg-background/0 w-full rounded-md max-h-48 px-2 resize-none"
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
                        <div>
                            {!isLoading ? (
                                <Button
                                    disabled={isLoading || userPrompt?.trim()?.length < 1}
                                    size={"icon"}
                                    variant={"ghost"}
                                    className="rounded-full"
                                    onClick={handleSubmit}
                                >
                                    <SendHorizonal />
                                </Button>
                            ) : (
                                <Button
                                    disabled={!isLoading}
                                    size={"icon"}
                                    variant={"destructive"}
                                    className="rounded-full"
                                    onClick={useAbortSolveQuery}
                                >
                                    <Squircle />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
