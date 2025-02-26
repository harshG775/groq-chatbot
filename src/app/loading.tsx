import { SnailIcon } from "lucide-react";

export function PageLoadingBasic() {
    return (
        <div className=" flex space-x-2 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-foreground rounded-full animate-bounce"></div>
        </div>
    );
}
export function PageLoadingBounceSpin() {
    return (
        <div className="flex gap-2 items-center justify-center h-screen">
            <span className="sr-only">Loading...</span>
            <div className="relative animate-bounce [animation-delay:-0.3s]">
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-primary animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
            </div>
            <div className="relative animate-bounce [animation-delay:-0.15s]">
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-primary animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
            </div>
            <div className="relative animate-bounce">
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-primary animate-bounce "></div>
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
            </div>
        </div>
    );
}
export default function loading() {
    return (
        <div className="fixed inset-0 grid place-content-center bg-background">
            <PageLoadingBounceSpin />
        </div>
    );
}

export function LoadingSnail() {
    return (
        <div className="animate-pulse">
            <div className="animate-bounce inline-block">
                <SnailIcon className="animate-spin text-primary" />
            </div>
        </div>
    );
}
