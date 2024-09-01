import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export default function ChatInputBox(props: any) {
    const { setMessages } = props;
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            setMessages((preMessages:any) => [
                ...preMessages,
                { role: "user", content: input },
            ]);
            setInput("");
            // Here you would typically send the message to your AI backend
            // and then add the response to the messages
        }
    };
    return (
        <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
                <Input
                    placeholder="Type your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 mr-2"
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                    <ArrowUp className="h-4 w-4" />
                </Button>
            </div>
        </section>
    );
}
