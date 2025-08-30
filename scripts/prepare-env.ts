import fs from "node:fs";
import path from "node:path";

const serviceAccountPath = path.resolve("service-account.json");

try {
	const serviceAccountContent = fs.readFileSync(serviceAccountPath, "utf8");
	const base64Encoded = Buffer.from(serviceAccountContent).toString("base64");
	console.log(`GOOGLE_SERVICE_ACCOUNT_KEY="${base64Encoded}"`);
} catch (error) {
	console.error(
		"Error preparing service account key for environment variable:",
		error,
	);
	process.exit(1);
}
