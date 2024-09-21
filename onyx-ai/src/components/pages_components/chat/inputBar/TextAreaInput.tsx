import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface TextAreaInputProps {
    // eslint-disable-next-line no-unused-vars
    onSend: (message: string) => void;
    placeholder?: string;
    maxHeight?: number;
}

export default function TextAreaInput({ onSend, placeholder = "Type your message here...", maxHeight = 200 }: TextAreaInputProps) {
    const [message, setMessage] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const adjustTextareaHeight = (): void => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setMessage(e.target.value);
    };

    const handleSend = (): void => {
        if (message.trim()) {
            onSend(message.trim());
            setMessage("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex items-end border border-gray-300 rounded-lg p-2 bg-white">
            <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="flex-grow resize-none overflow-y-auto outline-none min-h-[40px]"
                style={{ maxHeight: `${maxHeight}px` }}
                rows={1}
            />
            <button
                onClick={handleSend}
                className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
                aria-label="Send message"
                disabled={!message.trim()}
            >
                <Send size={20} />
            </button>
        </div>
    );
}
