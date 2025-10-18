import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    DB_URL: z.string().min(1, "DB is required"),
    PORT: z.string().min(1, "PORT is required"),
    NODE_ENV: z.enum(["development", "production"]),
});

export const env = envSchema.parse(process.env);