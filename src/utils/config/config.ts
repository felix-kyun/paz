import { parseNumber } from "@utils/parseNumber.js";
import { config } from "dotenv";

// __dirname resolves to project root
export const __dirname = process.cwd();
export const ENV: string = process.env.NODE_ENV ?? "development";

/* load base config file */
config({
    path: ".env",
    quiet: true,
});

/* override if in testing mode */
if (ENV === "test")
    config({
        path: ".env.test",
        override: true,
        quiet: true,
    });

// app
export const PORT = parseNumber(process.env.PORT, 3000);
export const LOGFILE = process.env.LOGFILE ?? "app.log";
export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
// secrets
export const JWT_SECRET = process.env.JWT_SECRET ?? "your_jwt_secret";
export const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET ?? "your_jwt_refresh_secret";
// db
export const MONGO_URI =
    process.env.MONGO_URI ?? "mongodb://localhost:27017/Paz";
export const REDIS_URI = process.env.REDIS_URI ?? "redis://localhost:6379";
