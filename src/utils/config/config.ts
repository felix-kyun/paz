import { config } from "dotenv";
import { parseNumber } from "../parseNumber.js";

// load env file according to NODE_ENV
const ext = {
    development: ".dev.env",
    production: ".env",
    test: ".test.env",
};

// __dirname resolves to project root
export const __dirname = process.cwd();
export const ENV: string = process.env.NODE_ENV ?? "development";

/* load config file */
config({
    // @ts-ignore
    path: ext[ENV] ?? ".env",
    quiet: true,
});

export const PORT = parseNumber(process.env.PORT, 3000);
export const LOGFILE = process.env.LOGFILE ?? "app.log";
export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
