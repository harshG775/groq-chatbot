import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="grid place-content-center gap-2 h-screen text-center">
            <h2 className="text-2xl font-bold text-primary">Not Found</h2>
            <p className=" text-xl max-w-96 text-foreground/50">
                Could not find requested resource
            </p>
            <Button asChild>
                <Link href="/">Return Home</Link>
            </Button>
        </main>
    );
}
