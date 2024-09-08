import { useMemo } from "react";

import ReactMarkdown from "react-markdown";
//remark-gfm for symbels table checkbox etc.
import remarkGfm from "remark-gfm";
//remark-math and rehype-katex for math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type MarkdownProps = {
    children: string | null | undefined;
};
export default function Markdown({ children, ...props }: MarkdownProps) {
    const components = useMemo(
        () => ({
            h1: ({ ...props }) => (
                <h1 className="text-wrap text-4xl font-bold my-4" {...props} />
            ),
            h2: ({ ...props }) => (
                <h2
                    className="text-wrap text-3xl font-semibold my-3"
                    {...props}
                />
            ),
            h3: ({ ...props }) => (
                <h3
                    className="text-wrap text-2xl font-medium my-2"
                    {...props}
                />
            ),
            h4: ({ ...props }) => (
                <h4 className="text-wrap text-xl font-normal my-1" {...props} />
            ),
            h5: ({ ...props }) => (
                <h5 className="text-wrap text-lg font-normal my-1" {...props} />
            ),
            h6: ({ ...props }) => (
                <h6
                    className="text-wrap text-base font-normal my-1"
                    {...props}
                />
            ),
            p: ({ ...props }) => (
                <p className="mb-4 leading-relaxed" {...props} />
            ),
            ul: ({ ...props }) => (
                <ul className="list-disc pl-5 mb-4" {...props} />
            ),
            ol: ({ ...props }) => (
                <ol className="list-decimal pl-5 mb-4" {...props} />
            ),
            blockquote: ({ ...props }) => (
                <blockquote
                    className="border-l-4 border-border pl-4 italic mb-4"
                    {...props}
                />
            ),
            table: ({ ...props }) => (
                <div className="overflow-x-auto">
                    <table
                        className="min-w-full divide-y divide-gray-200"
                        {...props}
                    />
                </div>
            ),
            th: ({ ...props }) => (
                <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    {...props}
                />
            ),
            td: ({ ...props }) => (
                <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    {...props}
                />
            ),
            a: ({ href, ...props }: { href?: string }) => (
                <a
                    aria-label={`Link to ${href}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    {...props}
                />
            ),
            code: ({ ...props }) => (
                <code className="bg-secondary p-1 rounded" {...props} />
            ),
            pre: ({ ...props }) => (
                <pre
                    className="my-4 bg-secondary text-secondary-foreground p-4 rounded overflow-auto"
                    {...props}
                />
            ),
            img: ({ ...props }) => (
                <img
                    loading="lazy"
                    className="w-full object-cover"
                    {...props}
                />
            ),
        }),
        []
    );
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            // remove components if not resetting CSS or using tailwind
            components={components}
        >
            {children}
        </ReactMarkdown>
    );
}
