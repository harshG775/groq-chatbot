import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomePage() {
    const [count, setCount] = useState(0);
    return (
        <main className="grid place-content-center min-h-screen gap-y-4">
            <div className="text-3xl font-bold underline">Root page</div>
            <Button onClick={() => setCount((pre) => pre + 1)}>
                Count: {count}
            </Button>
        </main>
    );
}
