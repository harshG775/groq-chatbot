import { Button } from "@/components/ui/button";
import { createConversationHistory } from "@/queries/fetchRequest";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, Paperclip, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);
    const handleCreateConversationHistory = async () => {
        setIsLoading(true);
        try {
            const response = await createConversationHistory({ data: {} });
            console.log("creating", response);

            // queryClient.invalidateQueries(["conversation-history"]);
            queryClient.setQueryData(["conversation-history"], (oldData) => [...oldData, response]);
            navigate(`/conversation/${response?.id}`);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error while creating conversation",
                description: err?.message || err?.response?.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1">
            <div className="h-full grid items-center mx-auto max-w-sm sm:max-w-xl ">
                <div className="p-2 rounded-lg bg-secondary/80">
                    <textarea
                        disabled={isLoading}
                        placeholder="Type your message..."
                        className="border p-2 rounded w-full h-full"
                    />
                    <div className="flex justify-between">
                        <div>
                            <Button variant="ghost" size="icon">
                                <Paperclip />
                            </Button>
                        </div>
                        <div>
                            <Button
                                disabled={isLoading}
                                onClick={handleCreateConversationHistory}
                                variant="ghost"
                                size="icon"
                            >
                                {isLoading ? <Loader2Icon className="animate-spin" /> : <SendHorizonal />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
