const config = {
    // Project metadata
    project: {
        name: "CodeWave.ai",
        version: "1.0.0",
        description: "Project description",
    },

    // API configurations
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
        timeout: 5000,
        endpoints: {
            auth: "/api/auth",
        },
    },

    // Feature flags
    features: {
        enableDarkMode: true,
    },

    // Third-party service integrations
    services: {
        ai: {
            groqSDK: {
                apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
            },
        },
    },

};

export default config;
