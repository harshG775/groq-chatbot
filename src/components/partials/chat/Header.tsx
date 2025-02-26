"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { History } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Header() {
    return (
        <header className="flex justify-between w-full p-4">
            <div className="font-semibold">HEADER</div>
            <div>
                <ModeToggle className="rounded-full" />

                <HistoryModel
                    title={
                        <div>
                            <input type="text" placeholder="Query..." />
                        </div>
                    }
                    description="description"
                >
                    hello
                </HistoryModel>
            </div>
        </header>
    );
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode, useState } from "react";
import useMediaQuery, { mediaQueries } from "@/hooks/use-media-query";

function HistoryModel({
    title,
    description,
    children,
}: {
    title: ReactNode;
    description: ReactNode;
    children?: ReactNode;
}) {
    const isDesktop = useMediaQuery(mediaQueries.desktop);

    const [isModelOpen, setIsModelOpen] = useState(false);
    if (isDesktop) {
        return (
            <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
                <TooltipProvider>
                    <Tooltip>
                        <Button size={"icon"} variant={"ghost"} className="rounded-full" asChild>
                            <TooltipTrigger asChild>
                                <DialogTrigger>
                                    <History />
                                </DialogTrigger>
                            </TooltipTrigger>
                        </Button>
                        <TooltipContent>
                            <p>History</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Drawer open={isModelOpen} onOpenChange={setIsModelOpen}>
            <TooltipProvider>
                <Tooltip>
                    <Button size={"icon"} variant={"ghost"} className="rounded-full" asChild>
                        <TooltipTrigger asChild>
                            <DrawerTrigger>
                                <History />
                            </DrawerTrigger>
                        </TooltipTrigger>
                    </Button>
                    <TooltipContent>
                        <p>History</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
}
