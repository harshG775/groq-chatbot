import { Button } from "@/components/ui/button";
import { Paperclip, SendHorizonal } from "lucide-react";
export default function HomePage() {
    return (
        <div className="flex-1">
            <div className="h-full grid items-center mx-auto max-w-sm sm:max-w-xl ">
                <div className="p-2 rounded-lg bg-secondary/80">
                    <textarea placeholder="Type your message..." className="border p-2 rounded w-full h-full" />
                    <div className="flex justify-between">
                        <div>
                            <Button variant="ghost" size="icon">
                                <Paperclip />
                            </Button>
                        </div>
                        <div>
                            <Button variant="ghost" size="icon">
                                <SendHorizonal />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
