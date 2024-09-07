"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ArrowUp, CircleArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const InputValueSchema = z.object({
    inputValue: z.string(),
});

type SignUpSchemaType = z.infer<typeof InputValueSchema>;
export default function InputBar({ className }: { className?: string }) {
    const { register, handleSubmit } = useForm<SignUpSchemaType>({
        resolver: zodResolver(InputValueSchema),
    });
    const handleForm: SubmitHandler<SignUpSchemaType> = (data) => {
        console.log(data);
    };
    return (
        <div className={cn("", className)}>
            <form onSubmit={handleSubmit(handleForm)}>
                <div className="flex gap-2">
                    <textarea
                        tabIndex={0}
                        rows={1}
                        dir={"auto"}
                        placeholder="Message Chat"
                        className="p-2 m-0 resize-none border-0 bg-transparent text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-52 w-full"
                        {...register("inputValue")}
                    />
                    <Button variant="outline" size="icon">
                        <CircleArrowUp />
                    </Button>
                </div>
            </form>
        </div>
    );
}
