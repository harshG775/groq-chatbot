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
        <div className={`relative group ${className}`}>
            {/* Header bar with language and copy button */}
            <div className="absolute right-2 top-2 left-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Language indicator */}
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-sm bg-gray-700/50 text-gray-200 backdrop-blur-sm">
                        {displayLanguage}
                    </span>
                </div>

                {/* Copy button */}
                <button
                    onClick={handleCopy}
                    className="px-2 py-1 rounded text-sm bg-gray-700/50 text-gray-200 
                     hover:bg-gray-600 focus:outline-none focus:ring-2 
                     focus:ring-gray-500 backdrop-blur-sm flex items-center gap-1
                     transition-colors duration-200"
                    aria-label={copied ? "Copied!" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <CheckIcon /> Copied!
                        </>
                    ) : (
                        <>
                            <CopyIcon /> Copy
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
                    margin: "1rem 0",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    padding: "2.5rem 1rem 1rem 1rem",
                }}
                {...props}
            >
                {String(children).trim()}
            </SyntaxHighlighter>
        </div>
    );
}
