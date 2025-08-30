import { z } from "zod";

const envSchema = z.object({
	WEBHOOK_SECRET_PATH: z.string(),
	SPREADSHEET_ID: z.string(),
	PORT: z.coerce.number().default(3000),
	GOOGLE_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),
	GOOGLE_REDIRECT_URI: z.string().optional(),
	GOOGLE_SERVICE_ACCOUNT_KEY: z.string().optional(),
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
