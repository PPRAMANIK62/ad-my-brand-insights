import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Validate environment variables
function parseEnv() {
  try {
    // eslint-disable-next-line node/no-process-env
    return envSchema.parse(process.env);
  }
  catch (error) {
    if (error instanceof Error) {
      console.error("❌ Invalid environment variables:");
      console.error(error.message);
      process.exit(1);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = parseEnv();

// Type for the environment variables
export type Env = z.infer<typeof envSchema>;
