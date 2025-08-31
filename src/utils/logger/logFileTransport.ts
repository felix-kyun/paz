import type { TransportSingleOptions } from "pino";
import { __dirname, LOGFILE } from "@config";
import { join } from "path";

export const logFileTransport: TransportSingleOptions = {
    target: "pino/file",
    options: {
        destination: join(__dirname, LOGFILE),
    },
};
