import dotenv from "dotenv";
import { Auth, google } from "googleapis";
import { getConfig } from "./config.js";

dotenv.config();

const { JWT } = Auth;

interface GoogleServiceAccountCredentials {
	client_email: string;
	private_key: string;
	// Add other properties if necessary, e.g., client_id, project_id, etc.
}

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const config = getConfig();

/**
 * Service Account Authorization.
 *
 * @return {Promise<Auth.JWT>}
 */
async function authorize(): Promise<Auth.JWT> {
	if (!config.GOOGLE_SERVICE_ACCOUNT_KEY) {
		throw new Error(
			"GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set.",
		);
	}

	let credentials: GoogleServiceAccountCredentials;
	console.log(
		"Raw (Base64 Encoded) GOOGLE_SERVICE_ACCOUNT_KEY:",
		config.GOOGLE_SERVICE_ACCOUNT_KEY,
	);
	try {
		const decodedKey = Buffer.from(
			config.GOOGLE_SERVICE_ACCOUNT_KEY,
			"base64",
		).toString("utf8");
		credentials = JSON.parse(decodedKey);
		console.log("Parsed credentials:", credentials);
	} catch (error: unknown) {
		throw new Error(
			`Invalid JSON for GOOGLE_SERVICE_ACCOUNT_KEY environment variable: ${(error as Error).message}`,
		);
	}

	if (!credentials.client_email || !credentials.private_key) {
		throw new Error(
			"GOOGLE_SERVICE_ACCOUNT_KEY is missing client_email or private_key.",
		);
	}

	const jwtClient = new JWT({
		email: credentials.client_email,
		key: credentials.private_key,
		scopes: SCOPES,
	});

	await jwtClient.authorize();
	return jwtClient;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {Auth.JWT} auth The authenticated Google JWT client.
 */
async function listMajors(auth: Auth.JWT) {
	const sheets = google.sheets({ version: "v4", auth });
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
		range: "Class Data!A2:E",
	});
	const rows = res.data.values as unknown[][];
	if (!rows || rows.length === 0) {
		console.log("No data found.");
		return;
	}
	console.log("Name, Major:");
	rows.forEach((row: unknown[]) => {
		// Print columns A and E, which correspond to indices 0 and 4.
		console.log(`${row[0]}, ${row[4]}`);
	});
}

authorize()
	.then(listMajors)
	.catch((error: unknown) => console.error(error as Error));
