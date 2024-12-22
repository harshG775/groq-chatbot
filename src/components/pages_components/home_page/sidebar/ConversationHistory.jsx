import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteConversationHistoryById, fetchConversationHistories } from "@/queries/fetchRequest";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

export default function ConversationHistory() {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch: refetchConversationHistories,
    } = useQuery({
        queryKey: ["conversation-history"],
        queryFn: fetchConversationHistories,
    });

    return (
        <ScrollArea className="h-full">
            {isLoading && (
                <ul className="p-2 flex flex-col gap-1">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <li key={index}>
                            <Skeleton className="h-10 rounded-md bg-foreground/20 w-full text-left flex justify-between items-center pr-2" />
                        </li>
                    ))}
                </ul>
            )}
            {isError && (
                <div className="p-2">
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error?.message}</AlertDescription>
                    </Alert>
                </div>
            )}
            {data && (
                <ConversationHistoryList data={data} refetchConversationHistories={refetchConversationHistories} />
            )}
        </ScrollArea>
    );
}

function ConversationHistoryList({ data, refetchConversationHistories }) {
    const params = useParams();
    return (
        <ul className="p-2 flex flex-col gap-1">
            {data.map((item) => (
                <ConversationHistoryListItem
                    key={item.id}
                    item={item}
                    paramsConversationId={params.conversationId}
                    refetchConversationHistories={refetchConversationHistories}
                />
            ))}
        </ul>
    );
}

import { useToast } from "@/hooks/use-toast";
function ConversationHistoryListItem({ item, paramsConversationId, refetchConversationHistories }) {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { status, isLoading, error, refetch } = useQuery({
        queryKey: ["conversation-history", item.id],
        queryFn: ({ signal }) => deleteConversationHistoryById({ id: item.id, signal }),
        enabled: false,
    });
    useEffect(() => {
        if (status === "error") {
            toast({
                variant: "destructive",
                title: "Error",
                description: error?.message || error?.response?.message,
            });
        }
        if (status === "success") {
            refetchConversationHistories();
            toast({
                title: "Success",
                description: "Conversation history deleted successfully",
            });
            navigate("/");
        }
    }, [status]);
    return (
        <li>
            <Link to={`/conversation/${item.id}`} asChild>
                <Button
                    variant={paramsConversationId === item.id ? "default" : "ghost"}
                    className="w-full text-left flex justify-between items-center p-2"
                    disabled={isLoading}
                >
                    <p className="flex-1 truncate max-w-52 mx-auto">
                        {item.title}
                        {item.title}
                    </p>
                    <Button
                        onClick={refetch}
                        variant={paramsConversationId === item.id ? "default" : "secondary"}
                        size="icon"
                        className="flex-shrink-0 h-8 w-8 grid"
                        disabled={isLoading}
                    >
                        <Trash className="h-5 w-5" />
                    </Button>
                </Button>
            </Link>
        </li>
    );
}
