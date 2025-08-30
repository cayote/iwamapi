import dotenv from "dotenv";
import { getConfig } from "./config.js";
import { appendGoogleSheet } from "./googleSheets.js";

dotenv.config();

const config = getConfig();
const GOOGLE_SERVICE_ACCOUNT_KEY = config.GOOGLE_SERVICE_ACCOUNT_KEY;

export async function testSheetUpdate() {
	const spreadsheetId = config.SPREADSHEET_ID; // Replace with your spreadsheet ID
	const range = "Sheet1!A2"; // Replace with your desired sheet name and cell range
	const values = [["Hello from Cursor", `Date: ${new Date().toISOString()}`]]; // Replace with your data

	try {
		await appendGoogleSheet(
			spreadsheetId,
			range,
			values,
			GOOGLE_SERVICE_ACCOUNT_KEY,
		);
		console.log("Google Sheet update test completed successfully.");
	} catch (error) {
		console.error("Google Sheet update test failed:", error);
	}
}
