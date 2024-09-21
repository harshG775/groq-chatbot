import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function Header() {
    return (
        <div className="rounded-md border p-2 mt-2 flex gap-2 ">
            <div className="p-2">Header</div>
            <Button variant={"ghost"} size={"icon"} className=" ml-auto">
                <Avatar className="rounded-md h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Button>
            <ModeToggle />
        </div>
    );
}
