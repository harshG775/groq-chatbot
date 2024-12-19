import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";

export default function ConversationPage() {
    // get id
    const params = useParams();

    return (
        <ScrollArea className="flex-1 p-2  //overflow-auto">
            <main className="mx-auto max-w-4xl">
                current conversation page
                <div>id: {params?.conversationId}</div>
                <div>Home start page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home page</div>
                <div>Home end page</div>
            </main>
        </ScrollArea>
    );
}
