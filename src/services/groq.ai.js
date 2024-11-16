import Groq from "groq-sdk";
const apiKey = import.meta.env.VITE_GROQ_API_KEY;
export const groq = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
});
