import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PenBox } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4">
                <Button variant="outline" className="w-full justify-start">
                    <PenBox className="mr-2 h-4 w-4" />
                    New chat
                </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
                <div className="p-4 space-y-2">
                    {[
                        "Explaining React Hooks",
                        "JavaScript Basics",
                        "CSS Flexbox Guide",
                    ].map((title, i) => (
                        <Button
                            key={i}
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            {title}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
