// import { envServer } from "@/constants/env/server.env";
import Groq from "groq-sdk";

// export const groq = new Groq({ apiKey: envServer.GROQ_API_KEY });
export const groq = new Groq({
    dangerouslyAllowBrowser: true,
    apiKey: "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",
});
export const getModels = async () => {
    return await groq.models.list();
};
