import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getModel } from "@/services/groq/groq.ai";
import { useMessagesContext } from "@/store/context/Messages-context";
import { PanelRightClose, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useModelsContext } from "@/store/context/Models-context";

function ModelsSelector() {
    const { models, currentModel, setCurrentModel } = useModelsContext();

    return (
        <Select
            value={currentModel}
            onValueChange={(value) => {
                setCurrentModel(value);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(models).map(([owner, models]) => (
                    <SelectGroup key={owner}>
                        <SelectLabel>{owner}</SelectLabel>
                        {models.map((model) => (
                            <SelectItem value={model} key={model} className={"cursor-pointer"}>
                                {model}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
}

export default function HeaderArea({ className, ...props }) {
    const { setMessages } = useMessagesContext();
    const handleNewChat = () => {
        localStorage.removeItem("messages");
        setMessages([]);
    };
    return (
        <div className={cn("overflow-y-auto border flex items-center", className)} {...props}>
            <Button className="h-8 w-8 p-0" size={"icon"} variant="ghost">
                <PanelRightClose className="h-4 w-4 text-foreground" />
            </Button>
            <Button className="h-8 w-8 p-0" size={"icon"} variant="ghost" title="New chat" onClick={handleNewChat}>
                <SquarePen className="h-4 w-4 text-foreground" />
            </Button>

            <div className="font-semibold uppercase mr-auto">
                <ModelsSelector />
            </div>
            <Button className="h-8 w-8 p-0 rounded-full" size={"icon"} variant="secondary">
                <div className="border rounded-full h-8 w-8"></div>
            </Button>
            <Link
                to="/test"
                className="h-8 w-8 p-0"
                size={"icon"}
                variant="ghost"
                title="New chat"
                onClick={handleNewChat}
            >
                <div className="h-4 w-4 text-foreground">Test</div>
            </Link>
        </div>
    );
}
