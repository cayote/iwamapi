import { JWT } from "google-auth-library";
import { google } from "googleapis";

/**
 * Updates a specific range in a Google Sheet.
 * @param {string} spreadsheetId The ID of the Google Sheet.
 * @param {string} range The A1 notation of the range to update (e.g., 'Sheet1!A1:B2').
 * @param {unknown[][]} values The values to set in the specified range.
 * @param {string} keyFilePath The path to the service account JSON key file.
 */
export async function updateGoogleSheet(
	spreadsheetId: string,
	range: string,
	values: unknown[][],
	googleServiceAccountKey?: string,
) {
	try {
		let auth: JWT;
		if (googleServiceAccountKey) {
			const credentials = JSON.parse(
				Buffer.from(googleServiceAccountKey, "base64").toString("utf8"),
			);
			auth = new JWT({
				email: credentials.client_email,
				key: credentials.private_key,
				scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			});
		} else {
			// Fallback for local development or if key not provided
			// This part might need adjustment depending on how you want to handle local auth
			auth = new JWT({
				keyFile: "./service-account.json", // Assuming a default service account file
				scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			});
		}

		const sheets = google.sheets({ version: "v4", auth });

		const request = {
			spreadsheetId,
			range,
			valueInputOption: "RAW",
			resource: {
				values,
			},
		};

		const response = await sheets.spreadsheets.values.update(request);
		console.log("Sheet updated:", response.data);
		return response.data;
	} catch (error: unknown) {
		console.error(`The API returned an error: ${error}`);
		throw error;
	}
}

/**
 * Appends a new row to a Google Sheet.
 * @param {string} spreadsheetId The ID of the Google Sheet.
 * @param {string} range The A1 notation of the range to append to (e.g., 'Sheet1!A1').
 * @param {unknown[][]} values The values to set in the new row.
 * @param {string} googleServiceAccountKey The base64 encoded service account JSON key string.
 */
export async function appendGoogleSheet(
	spreadsheetId: string,
	range: string,
	values: unknown[][],
	googleServiceAccountKey?: string,
) {
	try {
		let auth: JWT;
		if (googleServiceAccountKey) {
			const credentials = JSON.parse(
				Buffer.from(googleServiceAccountKey, "base64").toString("utf8"),
			);
			auth = new JWT({
				email: credentials.client_email,
				key: credentials.private_key,
				scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			});
		} else {
			// Fallback for local development or if key not provided
			auth = new JWT({
				keyFile: "./service-account.json", // Assuming a default service account file
				scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			});
		}

		const sheets = google.sheets({ version: "v4", auth });

		const request = {
			spreadsheetId,
			range,
			valueInputOption: "RAW",
			resource: {
				values,
			},
		};

		const response = await sheets.spreadsheets.values.append(request);
		console.log("Sheet appended:", response.data);
		return response.data;
	} catch (error: unknown) {
		console.error(`The API returned an error when appending: ${error}`);
		throw error;
	}
}
