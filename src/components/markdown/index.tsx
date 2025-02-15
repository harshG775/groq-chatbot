import ReactMarkdown from "react-markdown";
//remark-gfm for symbels table checkbox etc.
import remarkGfm from "remark-gfm";
//remark-math and rehype-katex for math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "katex/dist/katex.min.css";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function Markdown({
    children,
    className,
    ...props
}: PropsWithChildren<{ children: string; className?: string }>) {
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSanitize]}
            // remove components if not resetting CSS or using tailwind
            components={{
                img: ({ ...props }) => <img {...props} className="max-w-full h-auto my-4 rounded p-10" />,
            }}
            className={cn("prose dark:prose-invert", className)}
        >
            {children}
        </ReactMarkdown>
    );
}
