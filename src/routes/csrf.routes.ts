import type { Request, Response } from "express";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

export const csrfRouter: Router = Router();

// middleware assigns csrf token cookie
csrfRouter.get("/", (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: "CSRF token set",
    });
});
