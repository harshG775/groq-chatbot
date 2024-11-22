import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    atomOneDark,
    atomOneLight,
    docco,
    dracula,
    github,
    monokai,
    vs,
    xcode,
    stackoverflowDark,
    stackoverflowLight,
    androidstudio,
    arta,
    tomorrow,
    tomorrowNight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function ReactSyntaxHighlighter({
    children,
    language = "javascript",
    theme = "atomOneDark",
    showLineNumbers = true,
    wrapLines = false,
    className = "",
    ...props
}) {
    const [copied, setCopied] = useState(false);

    // Extended theme mapping
    const themes = {
        atomOneDark,
        atomOneLight,
        docco,
        dracula,
        github,
        monokai,
        vs,
        xcode,
        stackoverflowDark,
        stackoverflowLight,
        androidstudio,
        arta,
        tomorrow,
        tomorrowNight,
    };

    // Extended language display names mapping
    const languageNames = {
        // Web Development
        javascript: "JavaScript",
        typescript: "TypeScript",
        jsx: "JSX",
        tsx: "TSX",
        html: "HTML",
        css: "CSS",
        scss: "SCSS",
        sass: "Sass",
        less: "Less",
        webassembly: "WebAssembly",

        // React & Framework Specific
        react: "React",
        vue: "Vue",
        angular: "Angular",
        svelte: "Svelte",
        nextjs: "Next.js",
        nuxt: "Nuxt.js",

        // Backend Languages
        python: "Python",
        java: "Java",
        cpp: "C++",
        c: "C",
        csharp: "C#",
        php: "PHP",
        ruby: "Ruby",
        go: "Go",
        rust: "Rust",
        kotlin: "Kotlin",
        swift: "Swift",
        scala: "Scala",
        perl: "Perl",
        haskell: "Haskell",
        elixir: "Elixir",
        erlang: "Erlang",

        // Database
        sql: "SQL",
        mysql: "MySQL",
        postgresql: "PostgreSQL",
        mongodb: "MongoDB",
        cassandra: "Cassandra",
        redis: "Redis",

        // DevOps & Cloud
        docker: "Docker",
        kubernetes: "Kubernetes",
        terraform: "Terraform",
        aws: "AWS",
        azure: "Azure",
        gcp: "GCP",

        // Shell & Scripts
        bash: "Bash",
        shell: "Shell",
        powershell: "PowerShell",
        batch: "Batch",

        // Config & Data
        json: "JSON",
        xml: "XML",
        yaml: "YAML",
        toml: "TOML",
        ini: "INI",
        env: "ENV",

        // Mobile
        objectivec: "Objective-C",
        dart: "Dart",
        flutter: "Flutter",

        // Documentation
        markdown: "Markdown",
        mdx: "MDX",
        latex: "LaTeX",

        // Other
        graphql: "GraphQL",
        regex: "RegEx",
        solidity: "Solidity",
        wasm: "WebAssembly",
        r: "R",
        matlab: "MATLAB",

        // Build Tools
        gradle: "Gradle",
        maven: "Maven",
        cmake: "CMake",

        // Testing
        jest: "Jest",
        mocha: "Mocha",
        cypress: "Cypress",

        // Version Control
        diff: "Diff",
        git: "Git",
    };

    // Get selected theme or default to atomOneDark
    const selectedTheme = themes[theme] || themes.atomOneDark;

    // Get proper display name for language
    const displayLanguage = languageNames[language] || language;

    // Handle copy functionality
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    // Language-specific configurations
    const getLanguageConfig = (lang) => {
        const config = {
            jsx: "javascript",
            tsx: "typescript",
            env: "shell",
            mdx: "markdown",
            nextjs: "javascript",
            nuxt: "javascript",
            vue: "javascript",
            svelte: "javascript",
            flutter: "dart",
        };
        return config[lang] || lang;
    };

    return (
        <div className={`relative ${className} py-8`}>
            {/* Sticky header bar with language and copy button */}
            <div className="sticky -top-2.5 right-0 left-0 rounded-t-lg flex justify-between items-center p-2 bg-secondary z-10">
                {/* Language indicator */}
                <div className="flex items-center">
                    <span className="px-2 py-1 rounded text-sm text-secondary-foreground">{displayLanguage}</span>
                </div>

                {/* Copy button */}
                <button
                    onClick={handleCopy}
                    className="px-2 py-1 rounded text-sm text-secondary-foreground 
                   hover:bg-secondary-foreground/10 focus:outline-none focus:ring-2 
                   focus:ring-input flex items-center gap-1
                   transition-colors duration-200"
                    aria-label={copied ? "Copied!" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <CheckIcon className="w-4 h-4" /> Copied!
                        </>
                    ) : (
                        <>
                            <CopyIcon className="w-4 h-4" /> Copy
                        </>
                    )}
                </button>
            </div>

            <SyntaxHighlighter
                language={getLanguageConfig(language)}
                style={selectedTheme}
                showLineNumbers={showLineNumbers}
                wrapLines={wrapLines}
                wrapLongLines={wrapLines}
                customStyle={{
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    padding: "1rem",
                }}
                {...props}
            >
                {String(children).trim()}
            </SyntaxHighlighter>
        </div>
    );
}
