export function Loader() {
    return (
        <div className="grid gap-4 grid-flow-col place-content-center w-full h-full">
            <span className="animate-pulse duration-1000 inline-flex h-4 w-4 rounded-full bg-primary"></span>
            <span className="animate-pulse duration-1000 delay-300 inline-flex h-4 w-4 rounded-full bg-primary"></span>
            <span className="animate-pulse duration-1000 delay-700 inline-flex h-4 w-4 rounded-full bg-primary"></span>
        </div>
    );
}
export default function loading() {
    return (
        <div className="fixed inset-0">
            <Loader />
        </div>
    );
}
