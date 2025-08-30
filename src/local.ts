import { serve } from "@hono/node-server";
import { getConfig } from "./config.js";
import app from "./index.js";

const config = getConfig();

serve({
	...app,
	port: config.PORT,
});
