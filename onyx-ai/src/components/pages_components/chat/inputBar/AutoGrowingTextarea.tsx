"use client";
import React, { useEffect, useRef, useState } from "react";
interface AutoGrowingTextareaProps {}
export default function AutoGrowingTextarea({}: AutoGrowingTextareaProps) {
    const [userInput, setUserInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [userInput]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey) {
            if (e.key === "z") {
                e.preventDefault();
                document.execCommand("undo");
            }
            if (e.shiftKey && e.key === "z") {
                e.preventDefault();
                document.execCommand("redo");
            }
        }
        if (e.key === "Enter") {
            if (e.shiftKey) {
                e.preventDefault();
                document.execCommand("insertLineBreak");
            } else if (userInput.trim() !== "") {
                e.preventDefault();
                handleSubmit();
            }
        }
    };

    const handleSubmit = () => {
        console.log("Submitted Message: ");
        console.log(userInput);
        setUserInput("");

    };

    return (
        <textarea
            ref={textareaRef}
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={"Type your message here..."}
            className={`min-h-10 max-h-52 p-2 m-0 resize-none border-0 bg-transparent text-token-text-primary focus:ring-0 focus-visible:ring-0 w-full  overflow-y-auto transition-height duration-300 `}
            tabIndex={0}
            rows={1}
            dir={"auto"}
        />
    );
}
