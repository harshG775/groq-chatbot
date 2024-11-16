import Markdown from "@/components/ui/Markdown";
import { BotMessageSquare, CircleUserRound } from "lucide-react";

export default function ChatBubble({ message }) {
    if (message?.role === "assistant") {
        return (
            <div className=" flex flex-col gap-1 shadow-md rounded-xl sm:p-2">
                <div>
                    <div className="w-8 h-8 grid place-content-center rounded-full bg-primary text-primary-foreground">
                        <BotMessageSquare className="w-6 h-6" />
                    </div>
                </div>
                <Markdown className="w-full p-2 rounded-2xl shadow-inner">{message.content}</Markdown>
            </div>
        );
    }
    if (message?.role === "user") {
        return (
            <div className="ml-auto max-w-max flex flex-col justify-end gap-1 sm:p-2">
                <div className="ml-auto">
                    <div className="w-8 h-8 grid place-content-center rounded-full bg-primary/80 text-primary-foreground ">
                        <CircleUserRound className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-2 rounded-l-2xl rounded-b-2xl bg-primary/80 text-primary-foreground shadow-inner shadow-primary">
                    {message.content}
                </div>
            </div>
        );
    }
}
