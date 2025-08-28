import { writeFileSync } from "fs";
import { join } from "path";
import { __dirname, ENV, LOG_LEVEL, LOGFILE } from "@config";
import pino, {
    type Logger,
    type LoggerOptions,
    type TransportSingleOptions,
} from "pino";
import { logFileTransport } from "./logFileTransport.js";
import { pinoPrettyTransport } from "./pinoPrettyTransport.js";

/* clear log file */
// truncateSync(join(__dirname, LOGFILE), 0);
writeFileSync(join(__dirname, LOGFILE), "");

const targets: TransportSingleOptions[] = [logFileTransport];
/* add pino pretty only when in dev mode */
if (ENV === "development") targets.push(pinoPrettyTransport);

const config: LoggerOptions = {
    level: LOG_LEVEL,
    transport: {
        targets,
    },
};

export const logger: Logger = pino(config);
