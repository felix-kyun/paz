import { __dirname, LOGFILE } from "@config";
import { join } from "path";
import type { TransportSingleOptions } from "pino";

export const logFileTransport: TransportSingleOptions = {
    target: "pino/file",
    options: {
        destination: join(__dirname, LOGFILE),
    },
};
