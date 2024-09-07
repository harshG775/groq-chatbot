"use client";
import { z } from "zod";
const envClientSchema = z.object({
    NEXT_PUBLIC_ENV_VARIABLE: z.string().min(1, "ENV_VARIABLE not found"),
});
export const envClient = envClientSchema.parse({
    NEXT_PUBLIC_ENV_VARIABLE: process.env.NEXT_PUBLIC_ENV_VARIABLE,
});
