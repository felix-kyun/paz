import { logger } from "@logger";
import type { NextFunction, Request, Response } from "express";

export async function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const startTime = process.hrtime.bigint();

    const log = {
        query: req.query,
        params: req.params,
    };

    res.on("finish", () => {
        const duration =
            Number(process.hrtime.bigint() - startTime) / 1_000_000;

        logger.info(
            {
                ...log,
                ip: req.ip,
                headers: req.headers,
            },
            `${res.statusCode} ${duration.toFixed(2)}ms - ${req.method} ${req.originalUrl || req.url}`,
        );
    });

    next();
}
