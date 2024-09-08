import { z } from "zod";
const envSchema = z.object({
    GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY not found"),
});
export const envServer = envSchema.parse(process.env);
