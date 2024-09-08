import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CircleArrowUp } from "lucide-react";
import ChatArea from "@/components/pages_components/chat/ChatArea";
import SidebarHistory from "@/components/pages_components/chat/SidebarHistory";

export default function ChatPage() {
    return (
        <div className="fixed inset-0 h-screen grid md:grid-cols-[16rem_auto] grid-rows-[auto_1fr_auto] gap-2 px-2 bg-secondary/50">
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
            <div className="rounded-md border p-2 mb-2">
                <form className="flex justify-between items-center">
                    <div>input</div>
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            type="submit"
                            disabled={false}
                        >
                            <CircleArrowUp />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
