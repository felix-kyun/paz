import { pinoHttp } from "pino-http";
import { logger } from "./logger.js";

export const httpLogger = pinoHttp({
    logger: logger,
    customSuccessMessage: (req, res, time) =>
        `${req.method} ${res.statusCode} ${time}ms ${req.url}`,
});
