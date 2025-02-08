import config from "@/config";
import Groq from "groq-sdk";
const apiKey = config.services.ai.groqSDK.apiKey;
console.log(apiKey);

export const groqClient = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
});
