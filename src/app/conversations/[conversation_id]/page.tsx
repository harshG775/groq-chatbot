"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserCircle } from "lucide-react";
import { useParams } from "next/navigation";
import ConversationsArea from "./_components/ConversationsArea";
import InputBar from "./_components/InputBar";

export default function ConversationPage() {
    const params = useParams();
    return (
        <>
            <div className={`fixed inset-0  flex flex-col`}>
                <header className="flex justify-between w-full p-4">
                    <div className="font-semibold">HEADER {params?.conversation_id}</div>
                    <div>
                        <ModeToggle className="rounded-full" />
                        <Button size={"icon"} variant={"ghost"} className="rounded-full">
                            <UserCircle />
                        </Button>
                    </div>
                </header>
                <ConversationsArea />
                <InputBar />
            </div>
        </>
    );
}
