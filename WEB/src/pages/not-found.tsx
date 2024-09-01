import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <main className="grid place-content-center min-h-screen gap-y-4">
            <div className="text-3xl font-bold underline">404 Page Not Found</div>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
        </main>
    );
}
