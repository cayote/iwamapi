import dotenv from "dotenv";
import { Hono } from "hono";
import { getConfig } from "./config.js";
import { appendGoogleSheet } from "./googleSheets.js";

dotenv.config();

const app = new Hono();

const config = getConfig();
const WEBHOOK_SECRET_PATH = config.WEBHOOK_SECRET_PATH;
const GOOGLE_SERVICE_ACCOUNT_KEY = config.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!WEBHOOK_SECRET_PATH) {
	throw new Error("WEBHOOK_SECRET_PATH environment variable is not set.");
}

const welcomeStrings = [
	"Hello Hono!",
	"To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/hono",
];

app.get("/", (c) => {
	return c.text(welcomeStrings.join("\n\n"));
});

app.post(`/${WEBHOOK_SECRET_PATH}`, async (c) => {
	const body = await c.req.json<{
		name: string;
		age: number;
	}>();
	console.log("Webhook received:", body);

	// Example of how to call updateGoogleSheet within the webhook handler
	// You'll need to determine the spreadsheetId, range, and values based on your webhook payload
	if (GOOGLE_SERVICE_ACCOUNT_KEY) {
		try {
			const spreadsheetId = config.SPREADSHEET_ID; // Replace with actual spreadsheet ID
			const range = "Sheet1!A2"; // Replace with actual range
			const values = [Object.values(body)]; // Example: write webhook body to sheet
			await appendGoogleSheet(
				spreadsheetId,
				range,
				values,
				GOOGLE_SERVICE_ACCOUNT_KEY,
			);
			console.log("Google Sheet updated successfully via webhook.");
		} catch (error) {
			console.error("Failed to update Google Sheet via webhook:", error);
		}
	}

	return c.json({ message: "Webhook received successfully!" });
});

export default app;
