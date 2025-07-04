import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API: z.string({ required_error: "API is required." }),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
});
