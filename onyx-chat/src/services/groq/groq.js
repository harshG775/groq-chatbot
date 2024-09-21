import Groq from "groq-sdk";
const apiKey = "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";
export const groq = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
});
export const getModels = async () => {
    return await groq.models.list();
};

const system = `
you are a helpful assistant
    
`;
export async function getGroqChatCompletion({
    history = [],
    query,
    model = "llama3-8b-8192",
}) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: system,
            },
            ...history,
            {
                role: "user",
                content: query,
            },
        ],
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        model: model,
        stream: true,
    });
}
