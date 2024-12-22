import { Button } from "@/components/ui/button";
import { createConversationHistory } from "@/queries/fetchRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, Paperclip, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const [creating, setCreating] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { data, isLoading, status, error, refetch } = useQuery({
        queryKey: ["create-conversation-history"],
        queryFn: ({ signal }) => createConversationHistory({ signal, data: {} }),
        enabled: false,
    });
    const queryClient = useQueryClient();
    const handleCreateConversationHistory = () => {
        setCreating(true);
        refetch();
    };
    useEffect(() => {
        if (status === "error") {
            toast({
                variant: "destructive",
                title: "Error",
                description: error?.message || error?.response?.message,
            });
        }
        if (status === "success") {
            queryClient.invalidateQueries(["conversation-history"]).then(() => {
                if (creating) {
                    console.log("creating", data);

                    queryClient.clear(["create-conversation-history"], () => null);
                    navigate(`/conversation/${data?.id}`);
                }
            });
        }
    }, [status]);
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
