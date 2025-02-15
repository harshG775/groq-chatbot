import ReactMarkdown, { type Components } from "react-markdown";
//remark-gfm for symbels table checkbox etc.
import remarkGfm from "remark-gfm";
//remark-math and rehype-katex for math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "katex/dist/katex.min.css";
import { PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/utils";
import CodeBlock from "@/components/syntax-highlighter/shiki";
import { BundledLanguage } from "shiki";
import { useTheme } from "next-themes";

export default function Markdown({
    children,
    className,
    ...props
}: PropsWithChildren<{ children: string; className?: string }>) {
    const { theme: mode } = useTheme();
    const components = useMemo(() => {
        return {
            img: ({ ...props }) => <img {...props} className="max-w-full h-auto my-4 rounded p-10" />,
            pre: ({ children, node, ...rest }) => {
                const [firstChild] = node?.children ?? [];
                if (
                    firstChild &&
                    firstChild.type === "element" &&
                    firstChild.tagName === "code" &&
                    firstChild.children[0].type === "text"
                ) {
                    const { className, ...rest } = firstChild.properties;
                    const [, language = "plaintext"] = /language-(\w+)/.exec(String(className) || "") ?? [];

                    return (
                        <CodeBlock
                            code={firstChild.children[0].value}
                            language={language as BundledLanguage}
                            theme={mode === "dark" ? "one-dark-pro" : "light-plus"}
                            {...rest}
                        />
                    );
                }
                return <pre {...rest}>{children}</pre>;
            },
        } as Components;
    }, [mode]);
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSanitize]}
            // remove components if not resetting CSS or using tailwind
            components={components}
            className={cn("prose dark:prose-invert", className)}
        >
            {children}
        </ReactMarkdown>
    );
}
