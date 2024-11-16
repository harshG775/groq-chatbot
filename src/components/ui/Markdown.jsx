import { useMemo } from "react";

import ReactMarkdown from "react-markdown";
//remark-gfm for symbels table checkbox etc.
import remarkGfm from "remark-gfm";
//remark-math and rehype-katex for math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import ReactSyntaxHighlighter from "./ReactSyntaxHighlighter";

const components = {
    // Root
    root: ({ ...props }) => <div {...props} className="prose max-w-none" />,

    // Headings
    h1: ({ ...props }) => <h1 {...props} className="text-4xl font-bold mt-6 mb-4" />,
    h2: ({ ...props }) => <h2 {...props} className="text-3xl font-bold mt-5 mb-3" />,
    h3: ({ ...props }) => <h3 {...props} className="text-2xl font-bold mt-4 mb-2" />,
    h4: ({ ...props }) => <h4 {...props} className="text-xl font-bold mt-3 mb-2" />,
    h5: ({ ...props }) => <h5 {...props} className="text-lg font-bold mt-2 mb-1" />,
    h6: ({ ...props }) => <h6 {...props} className="text-base font-bold mt-2 mb-1" />,

    // Paragraphs and text
    p: ({ ...props }) => <p {...props} className="mb-4 leading-relaxed" />,
    strong: ({ ...props }) => <strong {...props} className="font-bold" />,
    em: ({ ...props }) => <em {...props} className="italic" />,
    del: ({ ...props }) => <del {...props} className="line-through" />,

    // Lists
    ul: ({ ...props }) => <ul {...props} className="list-disc mb-4 pl-4" />,
    ol: ({ ...props }) => <ol {...props} className="list-decimal mb-4 pl-4" />,
    li: ({ ...props }) => <li {...props} className="mb-1" />,
    task: ({ ...props }) => <div {...props} className="flex items-center space-x-2" />,

    // Definition Lists
    dl: ({ ...props }) => <dl {...props} className="mb-4" />,
    dt: ({ ...props }) => <dt {...props} className="font-bold mt-2" />,
    dd: ({ ...props }) => <dd {...props} className="ml-4 mb-2" />,
    // Links and images
    a: ({ ...props }) => <a {...props} className="text-blue-600 hover:text-blue-800 underline" />,
    img: ({ ...props }) => <img {...props} className="max-w-full h-auto my-4 rounded" />,

    // Code blocks
    code: ({ inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || ""); // Extract the language class
        return !inline ? (
            <ReactSyntaxHighlighter
                language={match?.[1] || "text"}
                theme="atomOneLight" // Set your default theme here
                showLineNumbers
                {...props}
            >
                {children}
            </ReactSyntaxHighlighter>
        ) : (
            <code {...props} className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
                {children}
            </code>
        );
    },
    pre: ({ ...props }) => <pre {...props} className="mb-4" />,
    // Blockquotes
    blockquote: ({ ...props }) => <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic my-4" />,

    // Tables
    table: ({ ...props }) => (
        <div className="overflow-x-auto mb-4">
            <table {...props} className="min-w-full border-collapse border border-gray-300" />
        </div>
    ),
    thead: ({ ...props }) => <thead {...props} className="bg-gray-100" />,
    tbody: ({ ...props }) => <tbody {...props} />,
    tr: ({ ...props }) => <tr {...props} className="border-b border-gray-300" />,
    td: ({ ...props }) => <td {...props} className="px-4 py-2 border border-gray-300" />,
    th: ({ ...props }) => <th {...props} className="px-4 py-2 border border-gray-300 font-bold text-left" />,

    // Horizontal rule
    hr: ({ ...props }) => <hr {...props} className="my-8 border-t border-gray-300" />,

    // Breaks
    br: ({ ...props }) => <br {...props} className="mb-4" />,

    // Math blocks
    math: ({ ...props }) => <div {...props} className="my-4 overflow-x-auto" />,
    inlineMath: ({ ...props }) => <span {...props} className="mx-1" />,

    // GFM specific
    input: ({ ...props }) => (
        <input {...props} className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    ),

    // Additional inline elements
    sup: ({ ...props }) => <sup {...props} className="text-xs" />,
    sub: ({ ...props }) => <sub {...props} className="text-xs" />,
    abbr: ({ ...props }) => <abbr {...props} className="cursor-help border-b border-dotted" />,
    kbd: ({ ...props }) => (
        <kbd
            {...props}
            className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg"
        />
    ),
    mark: ({ ...props }) => <mark {...props} className="bg-yellow-200 px-1 rounded" />,

    // Details/Summary
    details: ({ ...props }) => <details {...props} className="mb-4 border rounded-lg p-4" />,
    summary: ({ ...props }) => <summary {...props} className="font-bold cursor-pointer" />,
};

export default function Markdown({ children, ...props }) {
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
