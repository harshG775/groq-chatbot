"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, PanelLeftDashed } from "lucide-react";
import { useMessagesContext } from "@/store/context/Messages-context";
import { Message } from "@/types/messages/message";

interface HistoryItem {
    id: number;
    text: string;
}

export default function SidebarHistory() {
    const { setMessages } = useMessagesContext();
    const [history, setHistory] = useState<HistoryItem[]>(
        Array(20)
            .fill("")
            .map((_, i) => ({ id: i, text: `History item ${i + 1}` }))
    );
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const handleClick = (id: number) => {
        console.log(`Clicked item ${id}`);
    };

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditText(text);
    };

    const handleSaveEdit = (id: number) => {
        setHistory(history.map((item) => (item.id === id ? { ...item, text: editText } : item)));
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        setHistory(history.filter((item) => item.id !== id));
    };

    useEffect(() => {
        setMessages(histories[0].history);
    }, [setMessages]);
    return (
        <div className=" p-2 md:row-span-3 md:static fixed h-screen grid gap-2 grid-rows-[auto_1fr_auto] z-10 bg-background w-64 md:translate-x-0 -translate-x-[calc(100%+8px)]">
            <div className="border rounded-md p-2 flex justify-between items-center">
                <Button variant={"ghost"} size={"icon"} className="text-foreground">
                    <PanelLeftDashed />
                </Button>
                <h2 className="text-lg font-semibold">History</h2>
            </div>
            <ScrollArea className="h-full border p-2 rounded-md">
                <div className="space-y-2">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className={`${item.id === 1 ? "bg-primary/20" : "bg-secondary/20"} flex items-center space-x-2 p-2 rounded-md`}
                        >
                            {editingId === item.id ? (
                                <Input
                                    value={editText}
                                    onChange={({ target }: { target: { value: string } }) => setEditText(target.value)}
                                    className="flex-grow"
                                />
                            ) : (
                                <span className="flex-grow cursor-pointer" onClick={() => handleClick(item.id)}>
                                    {item.text}
                                </span>
                            )}
                            {editingId === item.id ? (
                                <Button
                                    size="icon"
                                    variant={"ghost"}
                                    className="w-8 h-8 rounded-full"
                                    onClick={() => handleSaveEdit(item.id)}
                                >
                                    <Check className="h-3 w-3" />
                                </Button>
                            ) : (
                                <Button
                                    size="icon"
                                    variant={"ghost"}
                                    className="w-8 h-8 rounded-full"
                                    onClick={() => handleEdit(item.id, item.text)}
                                >
                                    <Pencil className="h-3 w-3" />
                                </Button>
                            )}
                            <Button
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8 rounded-full hover:text-destructive"
                                onClick={() => handleDelete(item.id)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="border p-2 rounded-md flex justify-between items-center">
                <div>Onyx.ai</div>
                <Button variant={"ghost"} size={"icon"} className="text-foreground"></Button>
            </div>
        </div>
    );
}

const histories: {
    conversation_id: string;
    history: Message[];
    timestamp: string;
}[] = [
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
