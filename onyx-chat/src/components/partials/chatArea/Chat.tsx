import { BotIcon, User } from "lucide-react";

export type message = {
    role: string | "user" | "assistant" | "system";
    content: string;
};
type ChatProps = {
    message: message;
};
export default function Chat({ message }: ChatProps) {
    return (
        <div
            className={`border rounded-lg p-2 ${
                message.role === "user" ? "max-w-[80%] justify-self-end" : "max-w-full"
            }`}
        >
            {message.role === "assistant" && (
                <div className="flex items-end gap-2 p-2 text-sm">
                    <BotIcon />
                    <span className="block">assistant</span>
                </div>
            )}
            {message.role === "user" && (
                <div className="flex items-end gap-2 p-2 text-sm justify-end">
                    <User />
                    <span className="block">H</span>
                </div>
            )}
            <div className="p-4">{message.content}</div>
        </div>
    );
}
