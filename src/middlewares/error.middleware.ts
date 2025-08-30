import { ServerError } from "@errors/ServerError.error.js";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (error instanceof ServerError) {
        res.status(error.statusCode).json({
            error: error.name,
            message: error.message,
        });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.name,
            message: error.message || "Internal Server Error",
        });
    }

    next();
}
