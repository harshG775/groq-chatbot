import { Card, CardContent } from "@/components/ui/card";
import { message } from "@/store/context/Messages-context";
import { Bot, UserCircle } from "lucide-react";

export function Chat({ message }: { message: message }) {
    return (
        <div
            className={`mb-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
            }`}
        >
            {message.role === "assistant" && (
                <Bot className="w-8 h-8 mr-2 text-primary" />
            )}
            <Card
                className={`${
                    message.role === "user"
                        ? "bg-muted w-4/5"
                        : "bg-secondary/10 border-none shadow-none w-full"
                } p-3 `}
            >
                <CardContent className="p-0">{message.content}</CardContent>
            </Card>
            {message.role === "user" && (
                <UserCircle className="w-8 h-8 ml-2 text-primary" />
            )}
        </div>
    );
}
