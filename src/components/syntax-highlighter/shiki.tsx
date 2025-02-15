import { bundledLanguages, codeToHtml, isSpecialLang, type BundledLanguage, type SpecialLanguage } from "shiki";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

type CodeBlockProps = {
    className?: string;
    code: string;
    language?: BundledLanguage | SpecialLanguage;
    theme?: "light-plus" | "one-dark-pro";
    disableCopy?: boolean;
};

export default function CodeBlock({
    className,
    code,
    language = "plaintext",
    theme = "one-dark-pro",
    disableCopy = false,
}: CodeBlockProps) {
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const highlightCode = async () => {
            try {
                // Verify if the language is supported
                if (language && !isSpecialLang(language) && !(language in bundledLanguages)) {
                    console.warn(`Language ${language} is not supported, falling back to plaintext`);
                    language = "plaintext";
                }

                const html = await codeToHtml(code, {
                    lang: language,
                    theme: theme,
                });

                setHtmlContent(html);
            } catch (error) {
                console.error("Error highlighting code:", error);
                setHtmlContent(`<pre><code>${code}</code></pre>`);
            }
        };

        highlightCode();
    }, [code, language, theme]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    return (
        <div className={`relative group mt-10 bg-secondary/20 rounded-md ${className || ""}`}>
            {!disableCopy && language != "plaintext" && (
                <>
                    <div className="absolute top-0 px-4 h-11 rounded-t-md w-full flex items-center">
                        {language}
                    </div>
                    <div className="sticky top-0  py-1 pr-1 flex justify-end">
                        <Button variant={"secondary"} onClick={handleCopy} aria-label="Copy code">
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    </div>
                </>
            )}
            <div dangerouslySetInnerHTML={{ __html: htmlContent ?? "" }} className="-mt-6" />
        </div>
    );
}
