import type { TransportSingleOptions } from "pino";

export const pinoPrettyTransport: TransportSingleOptions = {
    target: "pino-pretty",
    options: {
        colorize: true,
    },
};
