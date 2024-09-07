import { envServer } from "@/constants/env/server.env";
import Groq from "groq-sdk";

export const groq = new Groq({ apiKey: envServer.GROQ_API_KEY });
