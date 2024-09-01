import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main className="grid place-content-center min-h-screen gap-y-4">
            <div className="text-3xl font-bold underline">Chat ai</div>
            <Button asChild>
                <Link to={"/chat"}>Chat</Link>
            </Button>
        </main>
    );
}
