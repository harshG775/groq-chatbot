import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { useState } from "react";

export default function TestPage() {
    const [histories, setHistories] = useState([
        {
            id: "1",
            title: "First Chat",
            messages: [
                { role: "user", content: "Hi there!" },
                { role: "assistant", content: "Hello! How can I help?" },
            ],
        },
        {
            id: "2",
            title: "Second Chat",
            messages: [
                { role: "user", content: "What's the weather like?" },
                { role: "assistant", content: "It’s sunny today." },
            ],
        },
        {
            id: "3",
            title: "Third Chat",
            messages: [
                { role: "user", content: "Tell me a joke." },
                { role: "assistant", content: "Why don’t skeletons fight each other? They don’t have the guts!" },
            ],
        },
    ]);

    const [selectedHistory, setSelectedHistory] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    // Handle history selection
    const handleHistoryClick = (historyId) => {
        setSelectedHistory(historyId);
    };

    // Handle creating a new chat
    const handleCreateNewChat = () => {
        setSelectedHistory(null); // Clear current selection
        setNewMessage(""); // Clear input
    };

    // Add a new chat
    const handleStartNewChat = () => {
        if (!newMessage.trim()) return;

        const newChat = {
            id: (histories.length + 1).toString(),
            title: `New Chat ${histories.length + 1}`,
            messages: [{ role: "user", content: newMessage.trim() }],
        };

        setHistories([newChat, ...histories]); // Add new chat at the top
        setSelectedHistory(newChat.id); // Select the new chat
        setNewMessage(""); // Clear input
    };

    // Add a message to the selected history
    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedHistory) return;

        setHistories((prevHistories) =>
            prevHistories.map((history) =>
                history.id === selectedHistory
                    ? {
                          ...history,
                          messages: [...history.messages, { role: "user", content: newMessage.trim() }],
                      }
                    : history
            )
        );

        setNewMessage(""); // Clear input
    };

    const selectedMessages = selectedHistory
        ? histories.find((history) => history.id === selectedHistory)?.messages || []
        : [];

    return (
        <div className="flex h-screen">
            {/* Sidebar for history */}
            <div className="flex-shrink-0 w-1/4 bg-gray-100 p-4">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-bold">Chat Histories</p>
                    <Button
                        className="h-8 w-8 p-0"
                        size="icon"
                        variant="ghost"
                        title="Start a new chat"
                        aria-label="Start a new chat"
                        onClick={handleCreateNewChat}
                    >
                        <SquarePen className="h-4 w-4 text-foreground" />
                    </Button>
                </div>
                <ul className="flex flex-col-reverse">
                    {histories.map((history) => (
                        <li
                            key={history.id}
                            className={`p-2 cursor-pointer rounded ${
                                selectedHistory === history.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                            }`}
                            onClick={() => handleHistoryClick(history.id)}
                        >
                            {history.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main area for messages */}
            <main className="flex-1 overflow-y-auto p-4">
                {selectedHistory ? (
                    <>
                        <ul>
                            {selectedMessages.map((message, index) => (
                                <li
                                    key={index}
                                    className={`p-2 my-2 rounded ${
                                        message.role === "user" ? "bg-gray-200 text-left" : "bg-blue-100 text-right"
                                    }`}
                                >
                                    <span className="font-semibold capitalize">{message.role}: </span>
                                    {message.content}
                                </li>
                            ))}
                        </ul>
                        <div className="flex mt-4">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 border p-2 rounded-l"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-500 text-white px-4 rounded-r"
                                aria-label="Send message"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <input
                            type="text"
                            placeholder="Type your message to start a new chat..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="border p-2 rounded w-2/3"
                        />
                        <button
                            onClick={handleStartNewChat}
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                            aria-label="Start new chat"
                        >
                            Start New Chat
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
