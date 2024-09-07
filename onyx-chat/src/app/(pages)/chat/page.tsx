import InputBar from "@/components/partials/inputbar/InputBar";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatPage() {
    return (
        <div className="h-screen grid lg:grid-cols-[16rem_auto] grid-rows-[auto_1fr_auto] gap-2 p-2">
            <aside className="rounded-md border p-2 lg:row-span-3 lg:static fixed h-full z-10 bg-background w-64 lg:translate-x-0 -translate-x-[calc(100%+8px)]">
                <section className="h-full grid gap-2 grid-rows-[auto_1fr_auto]">
                    <div className="border p-2 rounded-md">Aside</div>
                    <ScrollArea className="w-full h-full rounded-md border p-4">
                        <div className="space-y-4">
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                            <div className="bg-gray-500 h-10 rounded-md p-2">history</div>
                        </div>
                    </ScrollArea>
                    <div className="border p-2 rounded-md">
                        <ModeToggle />
                    </div>
                </section>
            </aside>
            <div className="rounded-md border p-2 mt-2">header</div>
            <ScrollArea className="w-full rounded-md border p-4">
                <main className="grid gap-5 container p-0">
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                    <div className="bg-gray-500 h-40"></div>
                </main>
            </ScrollArea>
            <InputBar className="rounded-md border p-2 mb-2" />
        </div>
    );
}
