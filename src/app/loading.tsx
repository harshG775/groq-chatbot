export function PageLoading() {
    return (
        <div className=" flex space-x-2 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-foreground rounded-full animate-bounce"></div>
        </div>
    );
}

export default function loading() {
    return (
        <div className="fixed inset-0 grid place-content-center bg-background">
            <PageLoading />
        </div>
    );
}
