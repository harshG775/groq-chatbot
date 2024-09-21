"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMessagesContext } from "@/store/context/Messages-context";
import { Message } from "@/types/messages/message";
import { PanelLeftDashed, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

type Conversations = {
    conversation_id: string;
    history: Message[];
    timestamp: string;
}[];

export default function Sidebar({ ...props }) {
    const { setMessages } = useMessagesContext();
    const [conversations, setConversations] = useState<Conversations>([]);
    const [currentConversation, setCurrentConversation] = useState("");

    // Initialize conversations on component mount
    useEffect(() => {
        setConversations(conversationsObject);
        // Set the first conversation as the default
        if (conversationsObject.length > 0) {
            setMessages(conversationsObject[0].history);
            setCurrentConversation(conversationsObject[0].conversation_id);
        }
    }, [setMessages]);

    // Handle switching conversations
    const handleSetCurrent = (id: string) => {
        const selectedConversation = conversations.find((convo) => convo.conversation_id === id);
        if (selectedConversation) {
            setCurrentConversation(id);
            setMessages(selectedConversation.history);
        }
    };
    // Handle creating a new conversation
    const handleCreateConversation = () => {
        const newConversation = {
            conversation_id: (conversations.length + 1).toString(), // Generate a new conversation ID
            history: [],
            timestamp: new Date().toISOString(),
        };

        setConversations((prevConversations) => [...prevConversations, newConversation]);
        setCurrentConversation(newConversation.conversation_id);
        setMessages(newConversation.history); // Set the new conversation's history in the messages context
    };
    // Handle deleting a conversation
    const handleDeleteConversation = (id: string) => {
        const updatedConversations = conversations.filter((convo) => convo.conversation_id !== id);

        setConversations(updatedConversations);

        // If the deleted conversation was the current one, reset to the first available conversation
        if (id === currentConversation && updatedConversations.length > 0) {
            setCurrentConversation(updatedConversations[0].conversation_id);
            setMessages(updatedConversations[0].history);
        } else if (updatedConversations.length === 0) {
            // If there are no conversations left, clear the messages and reset current conversation
            setCurrentConversation("");
            setMessages([]);
        }
    };
    return (
        <aside
            className={cn(
                "p-2 md:static fixed h-screen grid gap-2 grid-rows-[auto_1fr_auto] z-10 bg-background w-64 md:translate-x-0 -translate-x-[calc(100%+8px)]",
                props.className
            )}
        >
            {/* Header */}
            <div className="border rounded-md p-2 flex justify-between items-center">
                <Button variant={"ghost"} size={"icon"} className="text-foreground">
                    <PanelLeftDashed />
                </Button>
                <h2 className="text-lg font-semibold">History</h2>
                <Button variant={"ghost"} size={"icon"} className="text-foreground" onClick={handleCreateConversation}>
                    <PlusCircle />
                </Button>
            </div>

            {/* Scrollable Conversations List */}
            <ScrollArea className="h-full border p-2 rounded-md">
                <div className="space-y-2">
                    {conversations.map((el) => (
                        <div key={el.conversation_id} className="flex gap-2">
                            <Button
                                className="flex-1"
                                variant={el.conversation_id === currentConversation ? "secondary" : "outline"}
                                onClick={() => handleSetCurrent(el.conversation_id)}
                            >
                                {`Conversation ${el.conversation_id}`}
                            </Button>
                            <Button variant={"ghost"} size={"icon"} onClick={() => handleDeleteConversation(el.conversation_id)}>
                                <X />
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border p-2 rounded-md flex justify-between items-center">
                <div>Onyx.ai</div>
                <Button variant={"ghost"} size={"icon"} className="text-foreground"></Button>
            </div>
        </aside>
    );
}

const conversationsObject: Conversations = [
    {
        conversation_id: "1",
        history: [
            {
                role: "system",
                content: "You are a coding assistant.",
            },
            {
                role: "user",
                content: "Explain the use of functions in Python.",
            },
            {
                role: "assistant",
                content: "Functions in Python are blocks of reusable code that perform a specific task.",
            },
        ],
        timestamp: "2024-09-21T10:00:00Z",
    },
    {
        conversation_id: "2",
        history: [
            {
                role: "system",
                content: "You are an assistant that answers general knowledge questions.",
            },
            {
                role: "user",
                content: "What is the capital of France?",
            },
            {
                role: "assistant",
                content: "The capital of France is Paris.",
            },
        ],
        timestamp: "2024-09-22T11:30:00Z",
    },
];
