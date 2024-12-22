import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteConversationHistoryById, fetchConversationHistories } from "@/queries/fetchRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

export default function ConversationHistory() {
    const { data, isLoading, isError, error } = useQuery({
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
            {data && <ConversationHistoryList data={data} />}
        </ScrollArea>
    );
}

function ConversationHistoryList({ data }) {
    const params = useParams();
    return (
        <ul className="p-2 flex flex-col gap-1">
            {data.map((item) => (
                <ConversationHistoryListItem key={item.id} item={item} paramsConversationId={params.conversationId} />
            ))}
        </ul>
    );
}

function ConversationHistoryListItem({ item, paramsConversationId }) {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const { toast } = useToast();
    const { status, isLoading, error, refetch } = useQuery({
        queryKey: ["delete-conversation-history", item.id],
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
            queryClient.invalidateQueries(["conversation-history"]);
            toast({
                title: "Success",
                description: "Conversation history deleted successfully",
            });
            if (paramsConversationId === item.id) {
                navigate("/");
            }
        }
    }, [status]);

    const handleDeleteConversationHistory = () => {
        refetch();
    };
    return (
        <li className="w-full text-left flex justify-between items-center ">
            <Button
                variant={paramsConversationId === item.id ? "default" : "ghost"}
                disabled={isLoading}
                onClick={() => navigate(`/conversation/${item.id}`)}
                className="max-w-56 mx-0"
            >
                <p className="truncate">
                    {item.title}
                    {item.title}
                </p>
            </Button>
            <Button
                onClick={handleDeleteConversationHistory}
                variant={"ghost"}
                size="icon"
                className="flex-shrink-0 grid text-destructive hover:text-destructive/80"
                disabled={isLoading}
            >
                <Trash className="h-5 w-5" />
            </Button>
        </li>
    );
}
