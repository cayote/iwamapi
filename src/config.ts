import { z } from "zod";

const envSchema = z.object({
	WEBHOOK_SECRET_PATH: z.string(),
	SPREADSHEET_ID: z.string(),
	PORT: z.coerce.number().default(3000),
	ICOUNT_SECRET: z.string(),
	GOOGLE_SERVICE_ACCOUNT_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const getConfig = (): Env => {
	try {
		return envSchema.parse(process.env);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Environment variable validation failed:", error.issues);
			throw new Error("Missing or invalid environment variables.");
		}
		throw error;
	}
};
