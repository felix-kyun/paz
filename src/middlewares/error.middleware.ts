import { ENV } from "@config";
import { ServerError } from "@errors/ServerError.error.js";
import { logger } from "@logger";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

type KnownError = "CastError";
interface IErrorResponse {
    code: number;
    message: string;
}

const errorMap: Record<KnownError, IErrorResponse> = {
    CastError: {
        code: StatusCodes.BAD_REQUEST,
        message: "Invalid ID format",
    },
};

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    if (isKnownError(error.name)) {
        const { code, message } = errorMap[error.name];
        res.status(code).json({
            error: error.name,
            message,
        });
    } else if (error instanceof ServerError) {
        res.status(error.statusCode).json({
            error: error.name,
            message: error.message,
        });
    } else {
        logger.error(error, "Unhandled error");

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.name,
            message:
                ENV === "production"
                    ? "Internal Server Error"
                    : (error.message ?? "Internal Server Error"),
        });
    }
}

function isKnownError(name: string): name is KnownError {
    return name in errorMap;
}
