import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SidebarHistory from "@/components/pages_components/chat/SidebarHistory";
import InputBar from "@/components/pages_components/chat/inputBar/InputBar";
import ChatArea from "@/components/pages_components/chat/chatArea/ChatArea";

export default function ChatPage() {
    return (
        <div className="fixed inset-0 h-svh grid md:grid-cols-[16rem_auto] grid-rows-[auto_1fr_auto] gap-2 px-2 bg-secondary/50">
            <SidebarHistory />
            <div className="rounded-md border p-2 mt-2 flex gap-2 ">
                <div className="p-2">Header</div>
                <Button variant={"ghost"} size={"icon"} className=" ml-auto">
                    <Avatar className="rounded-md h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>

                <ModeToggle />
            </div>

            <ChatArea />
            <InputBar />
        </div>
    );
}
