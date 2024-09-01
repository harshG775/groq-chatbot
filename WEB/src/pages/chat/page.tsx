import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ArrowUp,
    Bot,
    Clipboard,
    RefreshCcw,
    ThumbsDown,
    ThumbsUp,
    User,
} from "lucide-react";
import { getGroqChatCompletion } from "@/services/groq/getGroqChatCompletion";

export default function ChatPage() {
    const myDivRef = useRef<null | HTMLDivElement>(null);

    const handleScrollToDiv = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (input.trim()) {
            setMessages((preMessage) => [
                ...preMessage,
                { role: "user", content: input },
            ]);
            // Here you would typically send the message to your AI backend
            // and then add the response to the messages

            try {
                setLoading(true);
                const { choices } = await getGroqChatCompletion({
                    content: input,
                });
                // Print the completion returned by the LLM.
                setMessages((preMessage) => [
                    ...preMessage,
                    {
                        role: choices[0].message.content || "assistant",
                        content:
                            choices[0].message.content ||
                            "something went wrong",
                    },
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setInput("");
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        handleScrollToDiv();
    }, [messages]);
    return (
        <>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={`flex ${
                                message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <Card
                                className={`max-w-[80%] ${
                                    message.role === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-white dark:bg-gray-800"
                                }`}
                            >
                                <CardContent className="p-4 flex">
                                    {message.role === "assistant" && (
                                        <Avatar className="mr-4">
                                            <AvatarFallback>
                                                <Bot />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="flex-1">
                                        <p className="font-semibold mb-1">
                                            {message.role === "user"
                                                ? "You"
                                                : "Assistant"}
                                        </p>
                                        <p>{message.content}</p>
                                        {message.role === "assistant" && (
                                            <div className="flex mt-2 space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Clipboard className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <ThumbsUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <ThumbsDown className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <RefreshCcw className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    {message.role === "user" && (
                                        <Avatar className="ml-4">
                                            <AvatarFallback>
                                                <User />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                    <div ref={myDivRef} />
                </div>
            </ScrollArea>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center">
                    <Input
                        disabled={loading}
                        placeholder="Type your message here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 mr-2"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </footer>
        </>
    );
}
